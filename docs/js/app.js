window.MW = window.MW || {};
(function () {
  const root = document.getElementById('app');
  const s = () => MW.state.get();
  let animateNextPage = true;
  let accountEntryChosen = false;
  let pendingMotion = 'context';
  let activeViewTransition = null;
  let navigationRenderGeneration = 0;
  let libraryObserver = null;
  let libraryFilterEvents = null;
  MW.onboarding.startViewport();
  const navStack = [];
  // The last main tab remains the directional reference while a header shortcut
  // (Favourites, Account or Settings) is open.
  let lastMainTabIndex = null;
  let lastMainTabTapAt = -Infinity;
  let pendingMainTab = null;
  let pendingMainTabTimer = null;
  const keepScreenAwakeEnabled = MW.screenAwake.enabled;
  const wakeLockSupported = MW.screenAwake.supported;
  function refreshKeepAwakeControls() {
    const enabled = keepScreenAwakeEnabled();
    root.querySelectorAll('[data-keep-awake-toggle]').forEach((input) => {
      input.checked = enabled;
    });
    root
      .querySelectorAll('.screen-awake-control,.cook-awake-toggle')
      .forEach((row) => row.classList.toggle('is-on', enabled));
  }
  function setKeepScreenAwake(enabled) {
    MW.screenAwake.setEnabled(enabled);
    refreshKeepAwakeControls();
  }
  function keepAwakeControl(mode) {
    const enabled = keepScreenAwakeEnabled(),
      supported = wakeLockSupported();
    return (
      '<div class="screen-awake-control ' +
      esc(mode || '') +
      (enabled ? ' is-on' : '') +
      '">' +
      '<span class="screen-awake-icon"><i class="fa-solid fa-sun"></i></span>' +
      '<span class="screen-awake-copy"><strong>Keep screen awake</strong><small>' +
      (supported ? 'Only while My Week is on screen' : 'Not supported on this device') +
      '</small></span>' +
      '<label class="toggle"><input type="checkbox" data-keep-awake-toggle ' +
      (enabled ? 'checked ' : '') +
      (supported ? '' : 'disabled ') +
      'aria-label="Keep screen awake while using My Week"><span></span></label>' +
      '</div>'
    );
  }
  function keepAwakeHeader() {
    const enabled = keepScreenAwakeEnabled(),
      supported = wakeLockSupported();
    return (
      '<label class="cook-awake-toggle' +
      (enabled ? ' is-on' : '') +
      (supported ? '' : ' is-unavailable') +
      '" title="' +
      (supported
        ? 'Keep screen awake while using My Week'
        : 'Screen wake lock is not supported on this device') +
      '">' +
      '<span class="cook-awake-label">Keep awake</span>' +
      '<input type="checkbox" data-keep-awake-toggle ' +
      (enabled ? 'checked ' : '') +
      (supported ? '' : 'disabled ') +
      'aria-label="Keep screen awake while using My Week">' +
      '<span class="cook-awake-switch" aria-hidden="true"></span></label>'
    );
  }
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionClass = (motion) => 'motion-' + String(motion || 'context').replace(/[^a-z-]/g, '');
  const clearMotionDataset = () => {
    if (document.documentElement.dataset.mwMotion) delete document.documentElement.dataset.mwMotion;
  };
  const finishInterruptedMotion = () => {
    if (activeViewTransition) {
      try {
        activeViewTransition.skipTransition();
      } catch {}
      activeViewTransition = null;
    }
    animateNextPage = false;
    clearMotionDataset();
    const page = root.firstElementChild;
    if (page)
      [
        'page-enter',
        'motion-context',
        'motion-drill-forward',
        'motion-drill-back',
        'motion-continuity-forward',
        'motion-continuity-back',
        'motion-flow-forward',
        'motion-flow-back',
        'motion-tab-forward',
        'motion-tab-back',
      ].forEach((x) => page.classList.remove(x));
  };
  const animatePage = (motion) => {
    const page = root.firstElementChild;
    if (!page || reducedMotion()) return;
    [
      'page-enter',
      'motion-context',
      'motion-drill-forward',
      'motion-drill-back',
      'motion-continuity-forward',
      'motion-continuity-back',
      'motion-flow-forward',
      'motion-flow-back',
      'motion-tab-forward',
      'motion-tab-back',
    ].forEach((x) => page.classList.remove(x));
    void page.offsetWidth;
    const type = motionClass(motion || pendingMotion);
    page.classList.add('page-enter', type);
    // Fallback WebViews do not clear this class via the View Transition API.
    // Remove it when the short entrance has finished, including after a rapid tap.
    setTimeout(() => {
      page.classList.remove('page-enter', type);
    }, 320);
  };
  const pageObserver = new MutationObserver(() => {
    if (!animateNextPage) return;
    animateNextPage = false;
    requestAnimationFrame(() => animatePage(pendingMotion));
  });
  pageObserver.observe(root, { childList: true });
  function paintUpdateState() {
    const state = MW.updates?.getState();
    const view = MW.updates?.view(state);
    // A completed previous install must not overwrite a newly available update.
    // The settings check itself shows "Updated successfully" only when up to date.
    if (!view || state?.phase === 'installed') return;
    const activeVersion = Number(state?.pending?.versionCode || state?.versionCode || 0);
    const matchesUpdate = (element) => {
      const shownVersion = Number(element?.dataset.updateVersionCode || 0);
      return !shownVersion || !activeVersion || shownVersion === activeVersion;
    };
    const releasePanel = document.getElementById('updateRelease');
    if (matchesUpdate(releasePanel)) {
      const status = document.getElementById('updateStatus');
      if (status) status.textContent = view.title + ' · ' + view.message;
      const updateProgress = document.getElementById('updateDownloadProgress');
      if (updateProgress) {
        updateProgress.hidden = !['starting', 'queued', 'downloading', 'paused', 'checking'].includes(
          state?.phase,
        );
        if (view.progressPercent == null) updateProgress.removeAttribute('value');
        else updateProgress.value = view.progressPercent;
        updateProgress.setAttribute('aria-valuetext', view.message);
      }
      const settingsButton = document.getElementById('installUpdate');
      if (settingsButton) {
        settingsButton.textContent = view.label;
        settingsButton.disabled = view.busy;
      }
    }
    const notice = document.getElementById('homeUpdateNotice');
    if (notice && matchesUpdate(notice)) {
      notice.disabled = view.busy;
      notice.setAttribute('aria-busy', String(view.busy));
      notice.classList.toggle('is-loading', view.busy);
      const copy = notice.querySelector('span');
      if (copy)
        copy.innerHTML = '<strong>' + esc(view.title) + '</strong><small>' + esc(view.message) + '</small>';
    }
  }
  window.addEventListener('mw:update-state', paintUpdateState);

  function transitionRender(motion, fn) {
    const request = ++navigationRenderGeneration;
    const interrupted = Boolean(activeViewTransition);
    finishInterruptedMotion();
    pendingMotion = motion || 'context';
    // A rapid sequence must never overlap WebKit View Transitions. Show the
    // latest requested page immediately rather than starting and cancelling
    // multiple native animations within the same short interaction.
    const renderLatest = () => {
      if (request === navigationRenderGeneration) fn();
    };
    if (reducedMotion() || pendingMotion === 'context' || interrupted) {
      animateNextPage = false;
      clearMotionDataset();
      renderLatest();
      return;
    }
    // Ordinary, unhurried tab changes retain their directional animation.
    // Header and bottom bar are separately named and stay stationary.
    document.documentElement.dataset.mwMotion = pendingMotion;
    if (typeof document.startViewTransition === 'function') {
      animateNextPage = false;
      const transition = document.startViewTransition(renderLatest);
      activeViewTransition = transition;
      // Skipping an in-flight animation deliberately rejects its ready promise.
      // Observe that cancellation so rapid taps cannot emit page errors.
      Promise.resolve(transition.ready).catch(() => {});
      Promise.resolve(transition.updateCallbackDone).catch((error) => {
        console.error('Could not render the requested page', error);
      });
      Promise.resolve(transition.finished)
        .catch(() => {})
        .finally(() => {
          if (activeViewTransition === transition) {
            activeViewTransition = null;
            clearMotionDataset();
          }
        });
      return;
    }
    animateNextPage = true;
    renderLatest();
    requestAnimationFrame(() => setTimeout(clearMotionDataset, 320));
  }

  const samePage = (fn, motion) => {
    const x = window.scrollX,
      y = window.scrollY;
    if (motion) {
      transitionRender(motion, () => {
        fn();
        requestAnimationFrame(() => window.scrollTo({ left: x, top: y, behavior: 'instant' }));
      });
      return;
    }
    animateNextPage = false;
    fn();
    requestAnimationFrame(() => window.scrollTo({ left: x, top: y, behavior: 'instant' }));
  };

  function updateControlNames() {
    root
      .querySelectorAll('.back-button,.back-on-photo')
      .forEach((b) => b.setAttribute('aria-label', 'Go back'));
    root
      .querySelectorAll('.stock-delete')
      .forEach((b) => b.setAttribute('aria-label', 'Delete ' + (b.dataset.name || 'cupboard item')));
    const labelled = {
      savingToggle: 'Lower-cost planning',
      profileName: 'First name',
      retailer: 'Supermarket',
      budget: 'Weekly food budget',
      avoidFoods: 'Foods to exclude',
      priceMode: 'Lower-cost planning',
      stockName: 'Cupboard item name',
      stockAmount: 'Cupboard quantity',
      stockUnit: 'Cupboard unit',
      addStock: 'Add cupboard item',
      lunchToggle: 'Plan lunch on this day',
      dinnerToggle: 'Plan dinner on this day',
      recipeSearch: 'Search recipes',
    };
    Object.entries(labelled).forEach(([id, label]) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('aria-label', label);
    });
    root
      .querySelectorAll(
        '.food-choice button,.onboard-chips button,.equipment-grid button,.day-toggle-row button,.numeric-choice-row button,.stock-state button[data-action],.cat-tab',
      )
      .forEach((b) => {
        const value = String(b.classList.contains('active') || b.classList.contains('selected'));
        if (b.getAttribute('aria-pressed') !== value) b.setAttribute('aria-pressed', value);
      });
    root
      .querySelectorAll('.shop-item')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.classList.contains('done'))));
    root
      .querySelectorAll('.delivery-status')
      .forEach((b) =>
        b.setAttribute('aria-pressed', String(!b.closest('.delivery-item').classList.contains('missing'))),
      );
  }
  new MutationObserver(updateControlNames).observe(root, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });
  const routeParent = (screen) => {
    screen = String(screen || '');
    if (screen.indexOf('day:') === 0) return 'week';
    if (screen.indexOf('recipe:') === 0) return 'recipes';
    if (screen === 'library' || screen === 'history') return 'recipes';
    if (screen === 'favourites') return 'myrecipes';
    if (screen === 'myrecipes') return 'week';
    if (screen.indexOf('cookprep:') === 0) return 'recipe:' + screen.slice(9);
    if (screen.indexOf('cookstep:') === 0) {
      const p = screen.split(':');
      return 'cookprep:' + p[1];
    }
    if (screen === 'cupboard' || screen === 'sync' || screen === 'account') return 'settings';
    if (screen === 'settings' || screen === 'recipes') return 'week';
    if (screen === 'delivery') return 'shopreview';
    if (screen === 'shopping') return 'shopreview';
    if (screen === 'shopreview') return 'week';
    if (screen === 'check') return 'shopreview';
    return '';
  };
  const screenFamily = (screen) => {
    screen = String(screen || '');
    if (screen.indexOf('day:') === 0) return 'week';
    if (
      screen.indexOf('recipe:') === 0 ||
      screen.indexOf('cookprep:') === 0 ||
      screen.indexOf('cookstep:') === 0 ||
      screen === 'library'
    )
      return 'recipes';
    if (screen === 'myrecipes' || screen === 'favourites') return 'saved';
    if (['check', 'shopreview', 'shopping', 'delivery'].includes(screen)) return 'shop';
    if (['settings', 'cupboard', 'sync', 'account'].includes(screen)) return 'settings';
    return screen;
  };
  const tabIndex = (screen) => {
    const family = screenFamily(screen);
    return { week: 0, recipes: 1, saved: 2, shop: 3 }[family] ?? -1;
  };
  const motionFor = (from, to) => {
    from = String(from || '');
    to = String(to || '');
    if (from === to) return 'continuity-forward';
    if (from.indexOf('cookstep:') === 0 && to.indexOf('cookstep:') === 0) {
      const a = from.split(':'),
        b = to.split(':');
      if (a[1] === b[1]) return Number(b[2]) >= Number(a[2]) ? 'continuity-forward' : 'continuity-back';
    }
    if (routeParent(to) === from) return 'drill-forward';
    if (routeParent(from) === to) return 'drill-back';
    const flow = ['week', 'shopreview', 'shopping', 'delivery', 'recipes'];
    const ai = flow.indexOf(from),
      bi = flow.indexOf(to);
    if (ai >= 0 && bi >= 0 && Math.abs(ai - bi) === 1) return bi > ai ? 'flow-forward' : 'flow-back';
    if (screenFamily(from) === screenFamily(to)) return 'continuity-forward';
    return 'context';
  };
  function withLoading(button, action) {
    if (!button || button.classList.contains('is-loading')) return;
    const previous = button.innerHTML;
    button.classList.add('is-loading');
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    button.insertAdjacentHTML(
      'afterbegin',
      '<i class="fa-solid fa-circle-notch mw-loading-icon" aria-hidden="true"></i>',
    );
    requestAnimationFrame(() =>
      setTimeout(async () => {
        try {
          await action();
        } catch (error) {
          const message = document.createElement('p');
          message.className = 'operation-error';
          message.setAttribute('role', 'alert');
          message.textContent =
            'This action could not be completed. ' + ((error && error.message) || 'Please try again.');
          (button.parentElement || root).appendChild(message);
        } finally {
          if (button.isConnected) {
            button.innerHTML = previous;
            button.disabled = false;
            button.classList.remove('is-loading');
            button.removeAttribute('aria-busy');
          }
        }
      }, 120),
    );
  }

  const esc = MW.display.escape;
  const icon = (name) => '<i class="fa-solid fa-' + name + '" aria-hidden="true"></i>';
  const recipe = (id) =>
    MW.weeks.snapshot(id) ||
    (MW.catalog && MW.catalog.get(id)) ||
    MW.RECIPES.find((x) => x.id === id) ||
    MW.LUNCHES.find((x) => x.id === id);
  const timeText = (r) => {
    if (!(r && r.time)) return r && r.online ? 'Online recipe' : 'Recipe';
    const mins = Number(r.time);
    if (mins >= 120 && mins % 60 === 0) return mins / 60 + ' hrs';
    if (mins >= 120) return Math.floor(mins / 60) + ' hr ' + (mins % 60) + ' mins';
    return mins + ' mins';
  };
  const ingredientName = (x, amount) => {
    const label = MW.display ? MW.display.ingredient(x, amount) : String(x || '');
    return MW.markets.current() === 'AU' ? MW.markets.ingredientSearchTerm(label, 'AU') : label;
  };
  const displayAmount = (x) => (MW.display && MW.display.amount ? MW.display.amount(x) : String(x || ''));
  const practicalQuantity = (recipe, ingredientIndex, factor = 1, multiplier = 1) =>
    MW.practicalQuantities && MW.practicalQuantities.resolve
      ? MW.practicalQuantities.resolve(recipe, ingredientIndex, factor, multiplier)
      : null;
  const cookingAmount = (value, approximate) =>
    MW.practicalQuantities && MW.practicalQuantities.label
      ? MW.practicalQuantities.label(value, approximate)
      : approximate
        ? 'About ' + displayAmount(value)
        : displayAmount(value);
  const displayEquipment = (x) =>
    MW.display && MW.display.equipment ? MW.display.equipment(x) : String(x || '');
  const displayInstruction = (x, recipeContext, factor, portions) =>
    MW.display && MW.display.instruction
      ? MW.display.instruction(x, { recipe: recipeContext, factor, portions })
      : String(x || '');
  const inventoryUnitChoices = [
    ['g', 'g'],
    ['kg', 'kg'],
    ['oz', 'oz'],
    ['lb', 'lb'],
    ['ml', 'ml'],
    ['l', 'L'],
    ['fl oz', 'fl oz'],
    ['tsp', 'tsp'],
    ['tbsp', 'tbsp'],
    ['each', 'Each'],
    ['banana', 'Banana'],
    ['pack', 'Pack'],
    ['tin', 'Tin'],
    ['can', 'Can'],
    ['bottle', 'Bottle'],
    ['carton', 'Carton'],
    ['jar', 'Jar'],
    ['tub', 'Tub'],
    ['box', 'Box'],
    ['bag', 'Bag'],
    ['pot', 'Pot'],
    ['tray', 'Tray'],
    ['roll', 'Roll'],
    ['packet', 'Packet'],
    ['clove', 'Clove'],
    ['bunch', 'Bunch'],
    ['sachet', 'Sachet'],
    ['pouch', 'Pouch'],
    ['nest', 'Nest'],
    ['fillet', 'Fillet'],
    ['wrap', 'Wrap'],
    ['tortilla', 'Tortilla'],
    ['rasher', 'Rasher'],
    ['slice', 'Slice'],
    ['ball', 'Ball'],
  ];
  const wholeInventoryUnits = new Set([
    'each',
    'banana',
    'pack',
    'tin',
    'can',
    'bottle',
    'carton',
    'jar',
    'tub',
    'box',
    'bag',
    'pot',
    'tray',
    'roll',
    'packet',
    'clove',
    'bunch',
    'sachet',
    'pouch',
    'nest',
    'fillet',
    'wrap',
    'tortilla',
    'rasher',
    'slice',
    'ball',
  ]);
  const inventoryUnitOptions = (selected) =>
    inventoryUnitChoices
      .map(
        ([v, l]) =>
          '<option value="' + esc(v) + '" ' + (v === selected ? 'selected' : '') + '>' + esc(l) + '</option>',
      )
      .join('');
  const alternativeSearchPrompt = (name) => MW.markets.alternativeSearchPrompt(name);
  const alternativeAiModeUrl = (name) =>
    'https://www.google.com/search?udm=50&q=' + encodeURIComponent(alternativeSearchPrompt(name));
  const alternativeSearchFallbackUrl = (name) =>
    'https://www.google.com/search?q=' + encodeURIComponent(alternativeSearchPrompt(name));
  async function openAlternativeSearch(name) {
    const browser = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Browser;
    const aiUrl = alternativeAiModeUrl(name);
    try {
      if (browser && typeof browser.open === 'function') {
        await browser.open({ url: aiUrl });
        return;
      }
      const opened = window.open(aiUrl, '_blank', 'noopener,noreferrer');
      if (opened) return;
    } catch {}
    const fallback = alternativeSearchFallbackUrl(name);
    if (browser && typeof browser.open === 'function') {
      await browser.open({ url: fallback });
      return;
    }
    window.open(fallback, '_blank', 'noopener,noreferrer');
  }
  function closeIngredientActions() {
    const el = document.getElementById('ingredientActionSheet');
    if (el) el.remove();
  }
  function confirmAction(options = {}) {
    return new Promise((resolve) => {
      const previous = document.getElementById('confirmActionSheet');
      if (previous) previous.remove();
      const backdrop = document.createElement('div');
      backdrop.id = 'confirmActionSheet';
      backdrop.className = 'ingredient-action-backdrop';
      const title = String(options.title || 'Are you sure?'),
        message = String(options.message || ''),
        confirmLabel = String(options.confirmLabel || 'Continue'),
        cancelLabel = String(options.cancelLabel || 'Cancel'),
        alternativeLabel = options.alternativeLabel ? String(options.alternativeLabel) : '',
        eyebrow = String(options.eyebrow || 'PLEASE CHECK');
      backdrop.innerHTML =
        '<section class="ingredient-action-sheet" role="dialog" aria-modal="true" aria-labelledby="confirmActionTitle" aria-describedby="confirmActionMessage"><div class="ingredient-action-handle"></div><div class="ingredient-action-head"><div><span class="eyebrow">' +
        esc(eyebrow) +
        '</span><h2 id="confirmActionTitle">' +
        esc(title) +
        '</h2></div><button type="button" class="ingredient-action-close" aria-label="Close">' +
        icon('xmark') +
        '</button></div><p id="confirmActionMessage" class="' +
        (options.friendly ? 'setting-help' : 'operation-error') +
        '">' +
        esc(message) +
        '</p><div class="shop-swap-actions' +
        (alternativeLabel ? ' has-alternative' : '') +
        '">' +
        (alternativeLabel
          ? '<button type="button" class="btn secondary" id="confirmActionAlternative">' +
            esc(alternativeLabel) +
            '</button>'
          : '<button type="button" class="btn secondary" id="confirmActionCancel">' +
            esc(cancelLabel) +
            '</button>') +
        '<button type="button" class="btn ' +
        (options.danger ? 'danger' : 'primary') +
        '" id="confirmActionConfirm">' +
        esc(confirmLabel) +
        '</button>' +
        (alternativeLabel
          ? '<button type="button" class="text-action" id="confirmActionCancel">' +
            esc(cancelLabel) +
            '</button>'
          : '') +
        '</div></section>';
      let settled = false;
      const finish = (value) => {
        if (settled) return;
        settled = true;
        document.removeEventListener('keydown', onKey);
        backdrop.remove();
        resolve(alternativeLabel ? value : Boolean(value));
      };
      const onKey = (e) => {
        if (e.key === 'Escape') finish(false);
      };
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) finish(false);
      });
      backdrop.querySelector('.ingredient-action-close').onclick = () => finish(false);
      backdrop.querySelector('#confirmActionCancel').onclick = () => finish(false);
      backdrop.querySelector('#confirmActionConfirm').onclick = () => finish(true);
      const alternate = backdrop.querySelector('#confirmActionAlternative');
      if (alternate) alternate.onclick = () => finish('fresh');
      document.addEventListener('keydown', onKey);
      document.body.appendChild(backdrop);
      backdrop.querySelector('#confirmActionCancel').focus();
    });
  }
  function showShopSubstitution(options) {
    closeIngredientActions();
    const key = String((options && options.shopKey) || ''),
      originalName = String((options && options.name) || '').trim(),
      plannedAmount = String((options && options.plannedAmount) || '').trim();
    if (!key || !originalName) return;
    const existing = MW.shopping && MW.shopping.getSubstitution ? MW.shopping.getSubstitution(key) : null;
    const planned = MW.inventory && MW.inventory.parseAmount ? MW.inventory.parseAmount(plannedAmount) : null;
    const current = existing && MW.inventory.parseAmount(existing.replacementAmount);
    const defaultUnit = (current && current.unit) || (planned && planned.unit) || 'g',
      defaultValue =
        current && current.value != null
          ? current.value
          : planned && planned.value != null
            ? planned.value
            : '';
    const sheet = document.createElement('div');
    sheet.id = 'ingredientActionSheet';
    sheet.className = 'ingredient-action-backdrop';
    sheet.innerHTML =
      '<section class="ingredient-action-sheet shop-substitution-sheet" role="dialog" aria-modal="true" aria-labelledby="shopSwapTitle"><div class="ingredient-action-handle"></div><div class="ingredient-action-head"><div><span class="eyebrow">IN STORE SWAP</span><h2 id="shopSwapTitle">What did you buy instead?</h2></div><button type="button" class="ingredient-action-close" aria-label="Close">' +
      icon('xmark') +
      '</button></div><div class="shop-swap-original"><span>Planned</span><strong>' +
      esc(ingredientName(originalName)) +
      '</strong><small>' +
      esc(displayAmount(plannedAmount)) +
      '</small></div><label class="shop-swap-label"><span>Bought instead</span><div class="food-autocomplete-host"><input id="shopSwapName" value="' +
      esc(existing ? ingredientName(existing.replacementName) : '') +
      '" placeholder="Start typing an ingredient"><span class="food-link-status" id="shopSwapMatch"></span></div></label><div class="shop-swap-quantity"><label><span>Amount</span><input id="shopSwapAmount" type="number" min="0" inputmode="decimal" step="' +
      (wholeInventoryUnits.has(defaultUnit) ? '1' : '0.1') +
      '" value="' +
      esc(defaultValue) +
      '"></label><label><span>Unit</span><span class="select-control stock-unit-control"><select id="shopSwapUnit">' +
      inventoryUnitOptions(defaultUnit) +
      '</select>' +
      icon('chevron-down') +
      '</span></label></div><p class="shop-swap-help">This records what you actually bought. The recipe keeps its original wording and My Week will show the swap when you cook it. It will not guess a conversion if the quantity types cannot be compared safely.</p><div class="shop-swap-actions">' +
      (existing
        ? '<button type="button" class="btn secondary" id="clearShopSwap">Use planned item</button>'
        : '<button type="button" class="btn secondary" id="cancelShopSwap">Cancel</button>') +
      '<button type="button" class="btn primary" id="saveShopSwap">Save swap</button></div></section>';
    document.body.appendChild(sheet);
    const close = () => closeIngredientActions(),
      nameInput = sheet.querySelector('#shopSwapName'),
      match = sheet.querySelector('#shopSwapMatch'),
      amountInput = sheet.querySelector('#shopSwapAmount'),
      unitSelect = sheet.querySelector('#shopSwapUnit');
    sheet.addEventListener('click', (e) => {
      if (e.target === sheet) close();
    });
    sheet.querySelector('.ingredient-action-close').onclick = close;
    const cancel = sheet.querySelector('#cancelShopSwap');
    if (cancel) cancel.onclick = close;
    const updateMatch = () => {
      const raw = nameInput.value.trim();
      if (!raw) {
        match.innerHTML = '';
        return;
      }
      const exact = nameInput.dataset.mwCanonical
        ? { canonical: nameInput.dataset.mwCanonical }
        : MW.foodIdentity && MW.foodIdentity.resolveExact(raw);
      match.innerHTML = exact
        ? '<span class="linked">' +
          icon('link') +
          ' Recognised: ' +
          esc(MW.foodIdentity.canonicalLabel(exact.canonical)) +
          '</span>'
        : '<span class="custom">' + icon('circle-question') + ' Custom ingredient</span>';
    };
    if (MW.foodIdentity) MW.foodIdentity.attach(nameInput, { limit: 5, onSelect: updateMatch });
    nameInput.addEventListener('input', updateMatch);
    updateMatch();
    unitSelect.onchange = () => {
      amountInput.step = wholeInventoryUnits.has(unitSelect.value) ? '1' : '0.1';
    };
    const clear = sheet.querySelector('#clearShopSwap');
    if (clear)
      clear.onclick = () => {
        MW.shopping.clearSubstitution(key);
        const st = s();
        if (st.ui && st.ui.shopChecks) delete st.ui.shopChecks[key];
        MW.state.save();
        close();
        if (typeof options.onCleared === 'function') options.onCleared();
        else samePage(shopReview);
      };
    sheet.querySelector('#saveShopSwap').onclick = () => {
      const raw = nameInput.value.trim(),
        value = Number(amountInput.value),
        unit = unitSelect.value;
      if (!raw) {
        nameInput.focus();
        return;
      }
      if (!Number.isFinite(value) || value <= 0) {
        amountInput.focus();
        return;
      }
      if (wholeInventoryUnits.has(unit) && !Number.isInteger(value)) {
        amountInput.setCustomValidity('Use a whole number for ' + unit + '.');
        amountInput.reportValidity();
        return;
      }
      amountInput.setCustomValidity('');
      const exact = nameInput.dataset.mwCanonical
        ? { canonical: nameInput.dataset.mwCanonical }
        : MW.foodIdentity && MW.foodIdentity.resolveExact(raw);
      const replacementName = (exact && exact.canonical) || raw,
        replacementAmount = MW.inventory.formatAmount({ value, unit });
      const parsedReplacement = MW.inventory.parseAmount(replacementAmount),
        comparison =
          planned && parsedReplacement
            ? MW.inventory.valueInUnit(parsedReplacement, planned.unit, replacementName)
            : null,
        comparable = !planned || Number.isFinite(comparison);
      if (
        !comparable &&
        !confirm(
          'This replacement uses a different quantity type, so My Week cannot safely compare it with the planned amount. It will still record what you bought and show the swap when cooking. Save it anyway?',
        )
      )
        return;
      try {
        const saved = MW.shopping.setSubstitution(key, {
          originalName,
          replacementName,
          plannedAmount,
          replacementAmount,
          comparable,
        });
        const st = s();
        st.ui.shopChecks = st.ui.shopChecks || {};
        st.ui.shopChecks[key] = true;
        MW.state.save();
        close();
        if (typeof options.onSaved === 'function') options.onSaved(saved);
        else samePage(shopReview);
      } catch (error) {
        match.innerHTML =
          '<span class="custom">' +
          icon('circle-exclamation') +
          ' ' +
          esc((error && error.message) || 'This swap could not be saved.') +
          '</span>';
      }
    };
    nameInput.focus();
  }
  function showIngredientActions(name, options = {}) {
    closeIngredientActions();
    const shopKey = String(options.shopKey || ''),
      existing =
        shopKey && MW.shopping && MW.shopping.getSubstitution ? MW.shopping.getSubstitution(shopKey) : null;
    const swapAction = shopKey
      ? '<button type="button" class="ingredient-online-alternative ingredient-shop-substitute">' +
        icon('right-left') +
        '<span><strong>' +
        (existing ? 'Edit what I bought instead' : 'I bought something different') +
        '</strong><small>' +
        (existing
          ? esc(ingredientName(existing.replacementName)) + ' is currently recorded instead.'
          : 'Record an in store substitute without silently changing the recipe.') +
        '</small></span><i class="fa-solid fa-chevron-right"></i></button>'
      : '';
    const sheet = document.createElement('div');
    sheet.id = 'ingredientActionSheet';
    sheet.className = 'ingredient-action-backdrop';
    sheet.innerHTML =
      '<section class="ingredient-action-sheet" role="dialog" aria-modal="true" aria-labelledby="ingredientActionTitle"><div class="ingredient-action-handle"></div><div class="ingredient-action-head"><div><span class="eyebrow">INGREDIENT</span><h2 id="ingredientActionTitle">' +
      esc(ingredientName(name)) +
      '</h2></div><button type="button" class="ingredient-action-close" aria-label="Close">' +
      icon('xmark') +
      '</button></div><div class="ingredient-action-options">' +
      swapAction +
      '<button type="button" class="ingredient-online-alternative ingredient-google-alternative">' +
      icon('magnifying-glass') +
      '<span><strong>Find an easy alternative with Google AI</strong><small>Opens Google AI Mode for a practical local supermarket substitute. Nothing changes automatically.</small></span><i class="fa-solid fa-arrow-up-right-from-square"></i></button></div><button type="button" class="ingredient-action-cancel">Cancel</button></section>';
    document.body.appendChild(sheet);
    const close = () => closeIngredientActions();
    sheet.addEventListener('click', (e) => {
      if (e.target === sheet) close();
    });
    sheet.querySelector('.ingredient-action-close').onclick = close;
    sheet.querySelector('.ingredient-action-cancel').onclick = close;
    const swap = sheet.querySelector('.ingredient-shop-substitute');
    if (swap)
      swap.onclick = () =>
        showShopSubstitution({
          shopKey,
          name,
          plannedAmount: options.plannedAmount,
        });
    const google = sheet.querySelector('.ingredient-google-alternative');
    google.onclick = async () => {
      google.disabled = true;
      try {
        await openAlternativeSearch(name);
      } finally {
        google.disabled = false;
        close();
      }
    };
    (swap || sheet.querySelector('.ingredient-online-alternative')).focus();
  }
  function bindIngredientActions(scope) {
    (scope || document).querySelectorAll('.ingredient-more').forEach(
      (b) =>
        (b.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          showIngredientActions(b.dataset.ingredient || '', {
            shopKey: b.dataset.shopKey || '',
            plannedAmount: b.dataset.plannedAmount || '',
          });
        }),
    );
  }

  const recipeCost = (r, people) => {
    if (!r) return 0;
    if (MW.pricing) return MW.pricing.recipeCost(r, people);
    if (r.scaleSafe === false) return Number(r.cost || 0);
    return Number(r.cost || 0) * ((Number(people) || 2) / (r.servings || 2));
  };
  const day = (id) => MW.DAYS.find((x) => x.key === id) || { key: id, label: id, short: id };
  const money = (n) => MW.markets.money(n);
  const recipeCostLabel = (r, people) => {
    if (!r) return '';
    const estimate = recipeCost(r, people);
    return estimate == null || !Number.isFinite(Number(estimate))
      ? ''
      : '~' + money(estimate) + ' ingredients' + (r.scaleSafe === false ? '' : ' for ' + people);
  };
  const helloFreshMirror = (src, width) => {
    const value = String(src || '');
    const m = value.match(/^https:\/\/d3hvwccx09j84u\.cloudfront\.net\/0,0\/(.+)$/i);
    if (!m) return '';
    return 'https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_' + (width || 960) + '/hellofresh_s3/' + m[1];
  };
  const photo = (src, cls, alt, fallback) => {
    if (!src) return '';
    const raw = []
      .concat(fallback || [])
      .map(String)
      .filter(Boolean);
    const fbs = [...new Set(raw.filter((x) => x !== src))];
    const attrs = fbs.map((x, i) => 'data-fallback' + i + '="' + esc(x) + '"').join(' ');
    const onerr =
      "var i=Number(this.dataset.fallbackIndex||0),n=this.dataset['fallback'+i];if(n){this.dataset.fallbackIndex=String(i+1);this.src=n;return;}this.style.display='none';if(this.parentElement.classList.contains('cook-photo')){this.parentElement.style.display='none';var p=this.closest('.cook-visual-panel');if(p)p.style.display='none';var s=this.closest('.cook-scroll');if(s){s.classList.remove('has-visual');s.classList.add('no-visual');}}else this.parentElement.classList.add('photo-fallback')";
    const eager = String(cls || '')
      .split(/\s+/)
      .some((name) =>
        ['cook-photo', 'recipe-hero-photo', 'home-featured-photo', 'library-priority-photo'].includes(name),
      );
    return (
      '<div class="' +
      cls +
      '"><img src="' +
      esc(src || '') +
      '" ' +
      attrs +
      ' alt="' +
      esc(alt || '') +
      '" loading="' +
      (eager ? 'eager' : 'lazy') +
      '" ' +
      (eager ? 'fetchpriority="high" ' : '') +
      'decoding="async" referrerpolicy="no-referrer" onerror="' +
      esc(onerr) +
      '"></div>'
    );
  };
  // Only warm photos for the current cooking session. Background downloads must
  // never block step text, and a small cache avoids decoding dozens of large photos.
  const warmedCookingPhotos = new Map();
  function warmCookingPhotos(r, steps) {
    if (typeof Image !== 'function' || !r || !Array.isArray(steps)) return;
    for (const step of steps) {
      if (!step) continue;
      const meta = (r.sourceStepImages || [])[step.sourceIndex] || {};
      const source =
        (MW.sourcedImageMap?.steps?.[r.id] || {})[step.sourceIndex] ||
        helloFreshMirror(meta.src, 900) ||
        meta.src ||
        helloFreshMirror(meta.originalSrc, 900) ||
        meta.originalSrc ||
        MW.cookingVisuals?.fallbackForStep?.(step.text, step.sourceIndex, r)?.src;
      if (!source || warmedCookingPhotos.has(source)) continue;
      const image = new Image();
      image.decoding = 'async';
      image.referrerPolicy = 'no-referrer';
      image.fetchPriority = 'low';
      image.src = source;
      image.decode?.().catch(() => {});
      warmedCookingPhotos.set(source, image);
      if (warmedCookingPhotos.size > 4) {
        warmedCookingPhotos.delete(warmedCookingPhotos.keys().next().value);
      }
    }
  }
  const fallbackRecipeImage = (r) => {
    const sourcedOnly = Boolean(r && (r.sourcedCatalogue || (r.imageQa && r.imageQa.status !== 'verified')));
    if (sourcedOnly) return '';
    const exact = r && MW.referenceMedia && MW.referenceMedia[r.id];
    return (exact && exact.final) || (r && r.image) || '';
  };
  const sourcedLocalFinal = (r) => {
    const mapped =
      (r && MW.sourcedImageMap && MW.sourcedImageMap.final && MW.sourcedImageMap.final[r.id]) || '';
    // A stale map may contain a method photo. Do not promote it to a final dish image.
    return r && [r.sourceImageUrl, r.sourceImageOriginalUrl].filter(Boolean).includes(mapped) ? mapped : '';
  };
  const cachedFinal = (r) => {
    const item = r && MW.sourcedFinalCache && MW.sourcedFinalCache[r.id];
    if (!item || item.role !== 'declared-final' || item.source !== r.sourceImageUrl) return '';
    const extension =
      item.encodingVersion === 'qa31-webp700-q72'
        ? '.webp'
        : item.encodingVersion === 'qa31-original-jpeg-perceptual-preservation' ||
            ((MW.PRACTICAL_LUNCHES || []).some((meal) => meal.id === r.id) && !item.encodingVersion)
          ? '.jpg'
          : '';
    return extension && item.src === 'assets/images/sourced-final/' + r.id + extension ? item.src : '';
  };
  const sourceImageCandidates = (r) => {
    if (!r || (r.imageQa && r.imageQa.status !== 'verified')) return [];
    if (r.personal) return r.sourceImageUrl ? [r.sourceImageUrl] : [];
    if (!r.sourcedCatalogue) return [fallbackRecipeImage(r)].filter(Boolean);
    const remote = String(r.sourceImageUrl || '');
    const original = String(r.sourceImageOriginalUrl || '');
    return [
      ...new Set(
        [
          cachedFinal(r),
          sourcedLocalFinal(r),
          helloFreshMirror(remote, 1100),
          remote,
          helloFreshMirror(original, 1100),
          original,
        ].filter(Boolean),
      ),
    ];
  };
  const displayRecipeImage = (r) => sourceImageCandidates(r)[0] || fallbackRecipeImage(r);
  const recipePhoto = (r, cls, alt) => {
    const c = sourceImageCandidates(r);
    const generic = r && r.sourcedCatalogue ? '' : fallbackRecipeImage(r);
    const fallbacks = c.slice(1);
    if (generic) fallbacks.push(generic);
    return photo(c[0] || generic, cls, alt, fallbacks);
  };
  const countLabel = (n, singular, plural) => n + ' ' + (n === 1 ? singular : plural);
  const regularQty = (x) => {
    const count = Math.max(1, Number(x.count) || 1);
    let unit = String(x.unit || 'item').trim();
    if (count !== 1) {
      if (unit === 'banana') unit = 'bananas';
      else if (!/s$/i.test(unit)) unit += 's';
    }
    return count + ' ' + unit;
  };
  const foodProfile = () =>
    s().foodProfile || {
      diet: 'omnivore',
      goals: [],
      allergens: [],
      lunchStyle: 'any',
    };
  const foodChoice = (id, items, selected) =>
    '<div class="food-choice" id="' +
    id +
    '">' +
    items
      .map(
        (x) =>
          '<button type="button" data-v="' +
          x.id +
          '" class="' +
          (String(selected) === String(x.id) ? 'active' : '') +
          '">' +
          esc(x.label) +
          '</button>',
      )
      .join('') +
    '</div>';
  const multiFoodChoice = (id, items, selected) => {
    const set = new Set(selected || []);
    return (
      '<div class="food-choice multi" id="' +
      id +
      '">' +
      items
        .map(
          (x) =>
            '<button type="button" data-v="' +
            x.id +
            '" class="' +
            (set.has(x.id) ? 'active' : '') +
            '">' +
            esc(x.label) +
            '</button>',
        )
        .join('') +
      '</div>'
    );
  };
  function stepIngredients(r, step, factor, stepIndex) {
    if (MW.stepIngredients && typeof MW.stepIngredients.forStep === 'function')
      return MW.stepIngredients.forStep(r, step, factor, stepIndex);
    return [];
  }
  function tipsForRecipe(r) {
    const text = (
      (r.tags || []).join(' ') +
      ' ' +
      (r.ingredients || []).map((x) => x[1]).join(' ')
    ).toLowerCase();
    const tips = [];
    if (text.includes('rice'))
      tips.push(
        'Rinse the rice until the water is much less cloudy, then leave it covered for a few minutes after cooking.',
      );
    if (text.includes('pasta') || text.includes('orzo'))
      tips.push(
        'Keep a mug of cooking water before draining so you can loosen the sauce without making it watery.',
      );
    if (text.includes('tofu'))
      tips.push('Pat the tofu dry before cooking and give it time against the hot pan before turning it.');
    if (text.includes('stir') || text.includes('asian') || text.includes('noodle'))
      tips.push(
        'Have everything sliced and measured before the pan gets hot because the cooking moves quickly.',
      );
    if (text.includes('chicken'))
      tips.push(
        'Keep the pieces similar in size so they cook at the same rate, then check the thickest piece is cooked through.',
      );
    if (text.includes('couscous'))
      tips.push(
        'Cover the couscous while it absorbs the liquid, then fluff it with a fork rather than stirring.',
      );
    if (text.includes('wrap') || text.includes('taco') || text.includes('flatbread'))
      tips.push('Warm the bread briefly just before serving so it stays flexible rather than cracking.');
    if (text.includes('salmon') || text.includes('cod') || text.includes('fish'))
      tips.push('Stop cooking once the centre is opaque and flakes easily so the fish stays moist.');
    if (text.includes('slow'))
      tips.push(
        'Keep the lid on during slow cooking because lifting it repeatedly drops the temperature and lengthens the cook.',
      );
    return [...new Set(tips)].slice(0, 2);
  }
  function cookingEquipment(r) {
    if (r && Array.isArray(r.sourceEquipment) && r.sourceEquipment.length) {
      return [
        ...new Set(r.sourceEquipment.map((x) => displayEquipment(String(x || '').trim())).filter(Boolean)),
      ];
    }
    const text =
      ((r && r.title) || '') + ' ' + ((r && r.tags) || []).join(' ') + ' ' + ((r && r.steps) || []).join(' ');
    const t = text.toLowerCase();
    const items = [];
    const add = (x) => {
      if (x && !items.includes(x)) items.push(x);
    };
    if (/oven|roast|bake|traybake|stuffed/.test(t)) add('Oven');
    if (/roast|bake|traybake|stuffed/.test(t)) add('Baking tray');
    if (/fry|pan|sear|brown|stir fry|stir-fry/.test(t)) add('Large frying pan');
    if (/rice|pasta|orzo|noodle|couscous|simmer|soup|stew|boil/.test(t)) add('Saucepan');
    if (/slow cooker|slow-cooker/.test(t)) add('Slow cooker');
    if (/air fry|air-fryer/.test(t)) add('Air fryer');
    if (/barbecue|bbq/.test(t)) add('Barbecue');
    if (/skewer/.test(t)) add('Skewers');
    if (/drain|pasta|orzo|noodle/.test(t)) add('Colander');
    if (/grate|zest/.test(t)) add('Grater or zester');
    if (/chop|slice|dice|cut|prepare/.test(t)) {
      add('Chopping board');
      add('Sharp knife');
    }
    add('Wooden spoon or spatula');
    return items;
  }
  function substitutedIngredient(name, plannedAmount) {
    const sub =
      MW.shopping && MW.shopping.substitutionForIngredient
        ? MW.shopping.substitutionForIngredient(name)
        : null;
    if (!sub)
      return {
        name,
        amount: plannedAmount,
        originalName: name,
        originalAmount: plannedAmount,
        substitution: null,
        comparable: true,
      };
    const planned = MW.inventory && MW.inventory.parseAmount ? MW.inventory.parseAmount(plannedAmount) : null,
      replacement =
        MW.inventory && MW.inventory.parseAmount ? MW.inventory.parseAmount(sub.replacementAmount) : null;
    const converted =
      planned && replacement && sub.comparable !== false
        ? MW.inventory.valueInUnit(planned, replacement.unit, sub.replacementName)
        : null;
    return {
      name: sub.replacementName,
      amount: Number.isFinite(converted)
        ? MW.inventory.formatAmount({
            value: converted,
            unit: replacement.unit,
          })
        : sub.replacementAmount,
      originalName: name,
      originalAmount: plannedAmount,
      substitution: sub,
      comparable: Number.isFinite(converted),
    };
  }
  function prepIngredients(r, factor) {
    return (r.ingredients || []).map(([q, n], ingredientIndex) => {
      const practical = practicalQuantity(r, ingredientIndex, factor),
        planned = practical
          ? practical.amount
          : MW.preparation && MW.preparation.scaleAmount
            ? MW.preparation.scaleAmount(r, q, n, factor)
            : r.scaleSafe === false
              ? q
              : MW.shopping.scaleAmount(q, factor);
      const shown = substitutedIngredient(n, planned);
      shown.practicalApproximate = !shown.substitution && Boolean(practical && practical.approximate);
      return shown;
    });
  }
  function gatheredIngredients(r) {
    return MW.preparation && MW.preparation.gathered ? MW.preparation.gathered(r) : {};
  }
  function gatherToggleButton(r, index, label, checked) {
    return (
      '<button type="button" class="ingredient-check-toggle ' +
      (checked ? 'is-checked' : '') +
      '" data-recipe-id="' +
      esc(String(r.id)) +
      '" data-gather-index="' +
      index +
      '" data-gather-label="' +
      esc(label) +
      '" aria-pressed="' +
      checked +
      '" aria-label="' +
      (checked ? 'Mark ' + esc(label) + ' not gathered' : 'Mark ' + esc(label) + ' gathered') +
      '">' +
      '<span class="ingredient-checkmark" aria-hidden="true">' +
      icon('check') +
      '</span></button>'
    );
  }
  function updateGatherControls(recipeId, index, checked) {
    root.querySelectorAll('[data-gather-index]').forEach((control) => {
      if (
        String(control.dataset.recipeId) !== String(recipeId) ||
        Number(control.dataset.gatherIndex) !== Number(index)
      )
        return;
      control.classList.toggle('is-checked', checked);
      control.setAttribute('aria-pressed', String(checked));
      const label = control.dataset.gatherLabel || 'ingredient';
      control.setAttribute('aria-label', 'Mark ' + label + (checked ? ' not gathered' : ' gathered'));
      const row = control.closest('.ingredient-row,.cook-prep-check');
      if (row) row.classList.toggle('is-gathered', checked);
    });
  }
  function toggleGatheredIngredient(control) {
    const r = recipe(control.dataset.recipeId);
    if (!r) return;
    const count = MW.preparation.portions(r);
    if (!count) return;
    MW.preparation.begin(r, count);
    const index = Number(control.dataset.gatherIndex),
      current = Boolean(gatheredIngredients(r)[String(index)]);
    const checked = MW.preparation.setGathered(r, index, !current);
    updateGatherControls(r.id, index, checked);
  }
  function stepSubstitutionNotes(r, step, stepIndex) {
    if (!(MW.shopping && MW.shopping.substitutionForIngredient)) return [];
    const notes = [],
      seen = new Set();
    (r.ingredients || []).forEach((row, ingredientIndex) => {
      const original = row[1],
        sub = MW.shopping.substitutionForIngredient(original);
      if (!sub) return;
      const ev =
        MW.stepIngredients && MW.stepIngredients.evidence
          ? MW.stepIngredients.evidence(r, step, ingredientIndex, stepIndex)
          : null;
      if (!(ev && ev.matched)) return;
      const key = MW.inventory.stockKey(original) + '>' + MW.inventory.stockKey(sub.replacementName);
      if (seen.has(key)) return;
      seen.add(key);
      notes.push({
        originalName: original,
        replacementName: sub.replacementName,
      });
    });
    return notes;
  }

  function recipeSubtitle(r) {
    const value = String((r && r.subtitle) || '').trim();
    if (!value) return '';
    const lowValue = [
      /^this .+ is inspired by .+ (?:cuisine|street food)\.?$/i,
      /^inspired by (?:the )?(?:vibrant |bustling )?(?:streets?|markets?) of\b/i,
      /^head to\b/i,
      /^take a trip to\b/i,
      /^transport (?:your|you)\b/i,
      /^escape to\b/i,
      /^tick .+ bucket list\b/i,
      /^bring (?:some )?sunshine\b/i,
      /^bring sunshine\b/i,
      /^let the taste of\b/i,
      /^take your tastebuds on holiday\b/i,
      /^fill your kitchen with .+ street food flavours\b/i,
      /^the stradas of\b/i,
      /^this dish is inspired by .+ sunshine\.?$/i,
      /^inspired by (?:spongebob squarepants|mean girls|dora)\.?$/i,
      /^this is the perfect for a sunny evening\.?$/i,
      /^nothing compares to a traditional pie/i,
      /^add more sunshine to your plate\b/i,
      /^bring the taste of long .+ evenings\b/i,
      /^these .+ transport you straight to\b/i,
      /^bite into .+ street food scene\b/i,
    ];
    return value
      .split(/(?<=[.!?])\s+(?=[A-Z])/)
      .filter((sentence) => !lowValue.some((re) => re.test(sentence)))
      .join(' ');
  }

  function tipForStep(r, step) {
    const text = String(step || '').toLowerCase();
    const context = ((r && r.title) || '') + ' ' + ((r && r.subtitle) || '');
    if (/dice|slice|chop|cut|prepare/.test(text))
      return 'Keep pieces roughly the same size so they cook at the same rate.';
    if (/rinse.*rice|cook.*rice|basmati|jasmine/.test(text))
      return 'Rinse the rice until the water is much less cloudy, then keep the lid on while it cooks.';
    if (/pasta|orzo|noodle/.test(text) && /cook|boil/.test(text))
      return 'Taste a piece a minute before the packet time ends. It should be tender with a little bite.';
    if (/drain/.test(text) && /chickpea|bean|lentil/.test(text + ' ' + context.toLowerCase()))
      return 'Let the pulses drain well so excess liquid does not thin the sauce.';
    if (/brown|sear/.test(text))
      return 'Let the pan get properly hot and avoid moving the food constantly so it can build colour.';
    if (/stir[- ]?fry|wok/.test(text))
      return 'Use a fairly high heat and keep the ingredients moving so they colour without turning soft.';
    if (/simmer|reduce|thicken/.test(text))
      return 'Aim for small steady bubbles rather than a hard boil. Add a splash of water only if the pan starts to look dry.';
    if (/roast|bake/.test(text) && !/heat|preheat/.test(text))
      return 'Spread everything into a single layer with a little space around it so the edges roast rather than steam.';
    if (/couscous/.test(text) && /prepare|cook|fluff/.test(text))
      return 'Cover it while it absorbs the liquid, then separate the grains gently with a fork.';
    if (/chicken/.test(text) && /cook|fry|roast|sear|brown/.test(text))
      return 'Check the thickest piece is piping hot and cooked through before moving on.';
    if (/salmon|cod|fish/.test(text) && /cook|fry|roast|simmer|air/.test(text))
      return 'Stop once the centre is opaque and flakes easily so the fish stays moist.';
    if (/halloumi/.test(text) && /cook|fry|grill|brown/.test(text))
      return 'Turn it once the underside is deeply golden. Overcooking makes halloumi firmer and saltier.';
    if (/prawn|shrimp/.test(text) && /cook|fry|stir/.test(text))
      return 'Take the prawns off the heat as soon as they are pink and opaque to keep them tender.';
    if (/slow cooker|slow-cooker|cook on low/.test(text))
      return 'Keep the lid on while it cooks. Opening it repeatedly can add a surprising amount of time.';
    return '';
  }

  function globalNav(active) {
    const tabs = [
      {
        destination: 'week',
        section: 'plan',
        icon: 'calendar-days',
        label: 'My Week',
      },
      {
        destination: 'recipes',
        section: 'cook',
        icon: 'book-open',
        label: 'All Recipes',
      },
      {
        destination: 'myrecipes',
        section: 'saved',
        icon: 'heart',
        label: 'My Recipes',
      },
      {
        destination: 'shopreview',
        section: 'shop',
        icon: 'cart-shopping',
        label: 'Shopping List',
      },
    ];
    return (
      '<nav class="bottom-nav" aria-label="Main navigation">' +
      tabs
        .map(
          (tab) =>
            '<button type="button" class="navbtn ' +
            (active === tab.section ? 'active' : '') +
            '" data-nav="' +
            tab.destination +
            '" ' +
            (active === tab.section ? 'aria-current="page" ' : '') +
            '><span class="navicon">' +
            icon(tab.icon) +
            '</span><span>' +
            tab.label +
            '</span></button>',
        )
        .join('') +
      '</nav>'
    );
  }

  function weekRange(key) {
    const now = key ? new Date(key + 'T12:00:00') : new Date();
    const d = (now.getDay() + 6) % 7;
    const monday = new Date(now);
    monday.setDate(now.getDate() - d);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const fmt = (x) => x.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    return fmt(monday) + ' – ' + fmt(sunday);
  }

  function currentDayMeta() {
    const now = new Date();
    const index = (now.getDay() + 6) % 7;
    const d = MW.DAYS[index] || MW.DAYS[0];
    return { index, key: d.key, label: d.label, short: d.short };
  }

  function remainingDinnerDays() {
    return MW.planner && MW.planner.remainingDinnerDays
      ? MW.planner.remainingDinnerDays(new Date(), s().plan.dinnerDays || [])
      : s().plan.dinnerDays || [];
  }

  function favouriteButton(recipeItem, extraClass = '') {
    const saved = MW.favourites.has(recipeItem.id);
    return (
      '<button type="button" class="favourite-toggle ' +
      (saved ? 'is-saved ' : '') +
      esc(extraClass) +
      '" data-favourite-id="' +
      esc(recipeItem.id) +
      '" data-favourite-title="' +
      esc(recipeItem.title) +
      '" aria-label="' +
      (saved ? 'Remove ' : 'Add ') +
      esc(recipeItem.title) +
      (saved ? ' from favourites' : ' to favourites') +
      '" aria-pressed="' +
      saved +
      '" title="' +
      (saved ? 'Remove from favourites' : 'Add to favourites') +
      '"><i class="fa-' +
      (saved ? 'solid' : 'regular') +
      ' fa-heart" aria-hidden="true"></i></button>'
    );
  }

  function bindFavouriteButtons(host = root) {
    host.querySelectorAll('[data-favourite-id]').forEach((button) => {
      button.onclick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const id = button.dataset.favouriteId;
        let saved;
        try {
          saved = MW.favourites.toggle(id);
        } catch (error) {
          button.title = (error && error.message) || 'Could not save favourite';
          return;
        }
        root.querySelectorAll('[data-favourite-id]').forEach((other) => {
          if (other.dataset.favouriteId !== id) return;
          other.classList.toggle('is-saved', saved);
          other.setAttribute('aria-pressed', String(saved));
          other.setAttribute(
            'aria-label',
            (saved ? 'Remove ' : 'Add ') +
              (other.dataset.favouriteTitle || 'recipe') +
              (saved ? ' from favourites' : ' to favourites'),
          );
          other.title = saved ? 'Remove from favourites' : 'Add to favourites';
          other.querySelector('i').className = 'fa-' + (saved ? 'solid' : 'regular') + ' fa-heart';
        });
        if (!saved) button.classList.remove('is-popping');
        if (saved) {
          button.classList.add('is-popping');
          button.addEventListener('animationend', (animation) => {
            if (animation.animationName === 'favourite-ring') button.classList.remove('is-popping');
          });
        }
        if (!saved && s().ui.screen === 'myrecipes' && !MW.personalRecipes.byId(id)) {
          const card = button.closest('.favourite-card-shell');
          if (card) {
            card.remove();
            if (!root.querySelector('#personalResults .library-card')) myRecipes();
          }
        }
      };
    });
  }

  function shell(body, active, pageHeader) {
    const st = s();
    const home = st.onboarded && st.ui.screen === 'week';
    const title = 'My Week';
    const cooked = new Set(st.week?.completedRecipes || []);
    const outstanding = (st.week?.meals || []).filter((meal) => !cooked.has(meal.recipeId)).length;
    const sub = st.onboarded
      ? outstanding
        ? countLabel(outstanding, 'dinner to cook', 'dinners to cook')
        : ''
      : 'Simple meals. Happier weeks.';
    const previousPlan = home ? MW.weeks.all()[0] : null;
    const nav = st.onboarded ? globalNav(active) : '';
    const header =
      '<header class="appbar"><div class="appbar-greeting">' +
      (pageHeader
        ? '<h1 class="' +
          (pageHeader.hideTitle ? 'visually-hidden' : 'account-name') +
          '">' +
          esc(pageHeader.title) +
          '</h1>' +
          (pageHeader.leading || '')
        : '<div class="appbar-title"><h1 class="account-name">' +
          esc(title) +
          '</h1>' +
          (sub && (home || !st.onboarded) ? '<span class="account-sub">' + esc(sub) + '</span>' : '') +
          '</div>') +
      (previousPlan
        ? '<button type="button" class="week-history-shortcut" id="weekHistoryButton" aria-label="View previous meal plans">' +
          icon('chevron-left') +
          '<span>' +
          esc(weekRange(previousPlan.weekKey)) +
          '</span></button>'
        : '') +
      '</div>' +
      (st.onboarded
        ? '<div class="appbar-actions">' +
          '<button type="button" class="account-shortcut' +
          (st.ui.screen === 'account' ? ' is-current' : '') +
          '" id="accountTopButton"' +
          (st.ui.screen === 'account' ? ' aria-current="page"' : '') +
          ' aria-label="' +
          (MW.accounts.status().user ? 'Account & sync' : 'Sign in') +
          '" title="Account">' +
          icon('circle-user') +
          '</button><button type="button" class="settings-button' +
          (st.ui.screen === 'settings' ? ' is-current' : '') +
          '" id="settingsButton" aria-label="Settings"' +
          (st.ui.screen === 'settings' ? ' aria-current="page"' : '') +
          '>' +
          icon('gear') +
          '</button></div>'
        : '') +
      '</header>';
    const selected = ((st.foodProfile && st.foodProfile.allergens) || []).slice().sort(),
      noticeKey = JSON.stringify(selected);
    const allergyNotice =
      selected.length && st.ui.dismissedAllergyNoticeFor !== noticeKey
        ? '<section class="allergy-notice"><button type="button" class="allergy-notice-close" aria-label="Dismiss allergy reminder">' +
          icon('xmark') +
          '</button><strong>Allergy filters are on</strong><p>Check product labels and cross-contamination warnings.</p><details><summary>How filters work ' +
          icon('chevron-down') +
          '</summary><p>Recipes with selected allergens, “may contain” warnings or missing verified records are excluded.</p></details></section>'
        : '';
    return (
      '<main class="shell' +
      (pageHeader ? ' page-header-shell' : '') +
      (st.ui.screen === 'settings' ? ' settings-page' : '') +
      (st.ui.screen === 'check' ? ' shopping-check-page' : '') +
      '">' +
      header +
      allergyNotice +
      body +
      nav +
      '</main>'
    );
  }

  function bindNav() {
    bindFavouriteButtons();
    const historyButton = document.getElementById('weekHistoryButton');
    if (historyButton)
      historyButton.onclick = () => {
        s().ui.weekHistoryKey = MW.weeks.all()[0]?.weekKey || '';
        go('history');
      };
    const dismiss = root.querySelector('.allergy-notice-close');
    if (dismiss)
      dismiss.onclick = () => {
        const notice = dismiss.closest('.allergy-notice');
        s().ui.dismissedAllergyNoticeFor = JSON.stringify((foodProfile().allergens || []).slice().sort());
        MW.state.save();
        notice.remove();
      };
    root.querySelectorAll('[data-nav]').forEach((button) => {
      button.onclick = () => requestMainTab(button.dataset.nav);
    });
    const settings = document.getElementById('settingsButton');
    if (settings) settings.onclick = () => go('settings', { motion: 'drill-forward' });
    const shortcut = document.getElementById('accountTopButton');
    if (shortcut) shortcut.onclick = () => go('account', { motion: 'drill-forward' });
  }

  function clearPendingMainTab() {
    if (pendingMainTabTimer != null) clearTimeout(pendingMainTabTimer);
    pendingMainTabTimer = null;
    pendingMainTab = null;
  }

  function navigateMainTab(destination) {
    if (destination === 'recipes') {
      s().ui.libraryQuery = '';
      s().ui.libraryCategory = '';
      s().ui.libraryFilters = null;
    }
    if (destination === 'myrecipes') s().ui.libraryTargetDay = '';
    const fromIndex = tabIndex(s().ui.screen);
    const previous = fromIndex >= 0 ? fromIndex : lastMainTabIndex;
    const next = tabIndex(destination);
    const motion =
      previous == null || next < 0 || previous === next
        ? 'context'
        : next > previous
          ? 'tab-forward'
          : 'tab-back';
    lastMainTabIndex = next >= 0 ? next : previous;
    go(destination, { motion, mainNavigation: true });
  }

  function requestMainTab(destination) {
    // Render the first tap immediately, then coalesce an implausibly fast
    // burst to the last destination. This avoids rendering multiple large
    // recipe and shopping screens within one brief WebKit interaction.
    const now = performance.now();
    const rapidTapWindow = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--motion-fast'),
    );
    const quietMs = Number.isFinite(rapidTapWindow) && rapidTapWindow > 0 ? rapidTapWindow : 160;
    const rapid = pendingMainTabTimer != null || now - lastMainTabTapAt < quietMs;
    lastMainTabTapAt = now;
    if (!rapid) return navigateMainTab(destination);
    pendingMainTab = destination;
    if (pendingMainTabTimer != null) clearTimeout(pendingMainTabTimer);
    pendingMainTabTimer = setTimeout(() => {
      const latest = pendingMainTab;
      pendingMainTabTimer = null;
      pendingMainTab = null;
      if (latest) navigateMainTab(latest);
    }, quietMs);
  }

  function go(screen, options) {
    const st = s(),
      from = st.ui.screen || 'week',
      changed = from !== screen;
    options = options || {};
    if (!options.mainNavigation) {
      clearPendingMainTab();
      lastMainTabTapAt = -Infinity;
    }
    if (libraryObserver) {
      libraryObserver.disconnect();
      libraryObserver = null;
    }
    if (changed) {
      if (screen === 'week') navStack.length = 0;
      else if (options.back) {
        if (navStack[navStack.length - 1] === screen) navStack.pop();
      } else if (navStack[navStack.length - 1] === screen) navStack.pop();
      else navStack.push(from);
    }
    if (['week', 'recipes', 'library', 'myrecipes'].includes(screen) || screen.startsWith('day:'))
      st.ui.weekHistoryKey = '';
    if (['week', 'recipes'].includes(screen)) st.ui.libraryTargetDay = '';
    st.ui.screen = screen;
    MW.state.save();
    if (!changed) {
      animateNextPage = false;
      render();
      return;
    }
    // Cooking instructions must respond immediately; avoid a 200 ms ghost of
    // the previous step whilst the user is following timings or ingredients.
    if (from.startsWith('cookstep:') || screen.startsWith('cookstep:')) {
      finishInterruptedMotion();
      render();
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const motion = options.motion || motionFor(from, screen);
    transitionRender(motion, () => {
      render();
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }
  function leaveCookingFlow(target) {
    const idx = navStack.lastIndexOf(target);
    if (idx >= 0) navStack.length = idx;
    else
      while (
        navStack.length &&
        /^(?:recipe:|cookprep:|cookstep:)/.test(String(navStack[navStack.length - 1] || ''))
      )
        navStack.pop();
    document.body.classList.remove('cooking-active');
    go(target, { motion: 'drill-back', back: true });
  }

  window.MyWeekAndroidBack = () => {
    if (MW.tutorial && MW.tutorial.dismiss()) return true;
    const sheet = document.getElementById('ingredientActionSheet');
    if (sheet) {
      sheet.remove();
      return true;
    }
    const st = s(),
      current = st.ui.screen || 'week';
    if (current === 'week') return false;
    let target = navStack.length ? navStack.pop() : '';
    if (!target) {
      if (current === 'library' && st.ui.libraryTargetDay) target = 'day:' + st.ui.libraryTargetDay;
      else target = routeParent(current);
    }
    if (!target || target === current) return false;
    if (current === 'library' && target !== 'library') {
      st.ui.libraryTargetDay = '';
      MW.state.save();
    }
    go(target, { motion: 'drill-back', back: true });
    return true;
  };

  function storageRecovery() {
    document.body.classList.remove('cooking-active');
    const status = MW.state.recoveryStatus();
    const messages = {
      invalid: 'Your saved data could not be read. It has not been replaced with a new week.',
      unavailable:
        'My Week cannot access saved data on this device. Changes are paused to protect your existing data.',
      conflict: 'Saved data changed in another app window. Reload it before making more changes.',
      'write-failed': 'Your latest changes could not be saved. The previous saved record has been kept.',
    };
    root.innerHTML =
      '<main class="storage-recovery"><section class="empty-state" aria-labelledby="recoveryTitle">' +
      '<h1 id="recoveryTitle" tabindex="-1">Saved data needs attention</h1>' +
      '<p>' +
      esc(messages[status.reason] || 'Please reload your saved data before continuing.') +
      '</p>' +
      '<p>No week will be reset unless you choose to reset it.</p>' +
      '<div class="storage-recovery-actions"><button class="btn primary" id="retrySavedData">Try loading again</button>' +
      (status.hasBackup
        ? '<button class="btn secondary" id="restoreSavedData">Restore previous saved copy</button>'
        : '') +
      '<button class="btn secondary" id="exportSavedData">Export recovery data</button>' +
      '<button class="btn secondary" id="resetSavedData">Reset all My Week data</button></div>' +
      '<p id="recoveryMessage" role="status" aria-live="polite"></p></section></main>';
    const attempt = (action) => {
      try {
        action();
        render();
      } catch (e) {
        const message = document.getElementById('recoveryMessage');
        if (message) message.textContent = e.message || 'Saved data is still unavailable.';
      }
    };
    document.getElementById('retrySavedData').onclick = () => attempt(() => MW.state.retryLoad());
    const restore = document.getElementById('restoreSavedData');
    if (restore)
      restore.onclick = () => {
        if (
          confirm(
            'Restore the previous saved copy? More recent changes may be missing. The current record will be retained for recovery.',
          )
        )
          attempt(() => MW.state.restoreBackup());
      };
    document.getElementById('exportSavedData').onclick = () => {
      try {
        const blob = new Blob([JSON.stringify(MW.state.recoveryExport(), null, 2)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob),
          link = document.createElement('a');
        link.href = url;
        link.download = 'myweek-recovery-data.json';
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        document.getElementById('recoveryMessage').textContent =
          'A recovery export was requested. Check that the file was saved before resetting. It may contain your personal meal and household data.';
      } catch (e) {
        document.getElementById('recoveryMessage').textContent =
          'The recovery export could not be started. Do not reset until you have saved any data you need.';
      }
    };
    document.getElementById('resetSavedData').onclick = () => {
      if (
        confirm(
          'Permanently reset all My Week data on this device, including saved weeks, cupboard stock and recovery copies? This cannot be undone.',
        )
      )
        attempt(() => {
          MW.state.reset();
          if (MW.onboarding) MW.onboarding.reset();
        });
    };
    document.getElementById('recoveryTitle').focus();
  }

  // Native Android draws beneath its status bar; browser chrome already sits outside the page.
  document.documentElement.classList.toggle(
    'native-android',
    Boolean(
      window.Capacitor &&
      typeof window.Capacitor.isNativePlatform === 'function' &&
      window.Capacitor.isNativePlatform(),
    ),
  );

  function render() {
    if (libraryFilterEvents) libraryFilterEvents.abort();
    libraryFilterEvents = null;
    if (MW.state.recoveryStatus && MW.state.recoveryStatus().blocked) return storageRecovery();
    const st = s();
    if (!st.onboarded) {
      document.body.classList.remove('cooking-active');
      if (MW.accounts && !MW.accounts.status().user) {
        if (!accountEntryChosen && MW.onboarding.intro)
          return MW.onboarding.intro(
            root,
            () => {
              accountEntryChosen = true;
              accountScreen(true, 'create');
              window.scrollTo(0, 0);
            },
            () => {
              accountEntryChosen = true;
              accountScreen(true, 'signin');
              window.scrollTo(0, 0);
            },
            async () => {
              const confirmed = await confirmAction({
                eyebrow: 'YOUR CHOICE',
                title: 'Continue as guest?',
                message:
                  'Your meals and lists stay on this device. They won’t sync, and may be lost if you delete the app.',
                confirmLabel: 'Continue as guest',
                cancelLabel: 'Go back',
                friendly: true,
              });
              if (!confirmed) return;
              // Account ownership already maintains an isolated local guest scope.
              // Onboarding writes there normally; sign-in later offers safe transfer.
              accountEntryChosen = true;
              welcome();
              window.scrollTo(0, 0);
            },
          );
        return accountScreen(true);
      }
      return welcome();
    }
    const screen = st.ui.screen || 'week';
    document.body.classList.toggle('cooking-active', screen.indexOf('cookstep:') === 0);
    if (screen === 'week') return week();
    if (screen === 'check') {
      // Existing saved routes now open the automatically generated list.
      st.ui.screen = 'shopreview';
      MW.state.save();
      return shopReview();
    }
    if (screen === 'shopreview') return shopReview();
    if (screen === 'shopping') return guidedShopping();
    if (screen === 'delivery') return deliveryCheck();
    if (screen === 'recipes') return recipes();
    if (screen === 'library') return library();
    if (screen === 'history') return history();
    if (screen === 'myrecipes') return myRecipes();
    if (screen === 'favourites') {
      st.ui.screen = 'myrecipes';
      MW.state.save();
      return myRecipes();
    }
    if (screen.indexOf('cookprep:') === 0) return cookPrep(screen.slice(9));
    if (screen.indexOf('cookstep:') === 0) {
      const parts = screen.split(':');
      return cookStep(parts[1], Number(parts[2]) || 0);
    }
    if (screen.indexOf('recipe:') === 0) return recipeView(screen.slice(7));
    if (screen.indexOf('day:') === 0) return dayEditor(screen.slice(4));
    if (screen === 'settings') return settings();
    if (screen === 'cupboard') return cupboard();
    if (screen === 'sync') return syncScreen();
    if (screen === 'account') return accountScreen();
    return week();
  }

  function selectionButtons(id, values, selected, extraClass) {
    return (
      '<div class="choice-row ' +
      (extraClass || '') +
      '" id="' +
      id +
      '">' +
      values
        .map(
          (x) =>
            '<button data-v="' +
            x.v +
            '" class="' +
            (String(x.v) === String(selected) ? 'active' : '') +
            '">' +
            esc(x.label) +
            '</button>',
        )
        .join('') +
      '</div>'
    );
  }

  function welcome() {
    if (MW.onboarding) {
      MW.onboarding.render(
        root,
        () => {
          render();
          window.scrollTo({ top: 0, behavior: 'instant' });
        },
        { skipWelcome: accountEntryChosen },
      );
      return;
    }
  }

  function week() {
    const st = s();
    if (!st.week) MW.planner.buildWeek();
    // The active plan belongs to its owner, not to the calendar week. A date
    // change must never move, regenerate or replace unfinished meals.
    const meals = (st.week.meals || [])
      .map((m) => ({ ...m, recipe: recipe(m.recipeId) }))
      .filter((x) => x.recipe);
    const todayMeta = currentDayMeta();
    const currentCalendarWeek = st.week.weekKey === MW.planner.currentWeekKey();
    const cooked = new Set(st.week.completedRecipes || []);
    const pending = meals.filter((meal) => !cooked.has(meal.recipeId));
    const dayOrder = MW.DAYS.map((x) => x.key);
    const upcoming = pending
      .filter((meal) => dayOrder.indexOf(meal.day) >= todayMeta.index)
      .sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
    // An unfinished dinner stays prominent even if the calendar has moved on.
    const featured =
      (currentCalendarWeek && pending.find((meal) => meal.day === todayMeta.key)) ||
      (currentCalendarWeek && upcoming[0]) ||
      pending[0] ||
      meals[0] ||
      null;
    const featuredLabel = featured
      ? cooked.has(featured.recipeId)
        ? 'Cooked'
        : currentCalendarWeek
          ? day(featured.day).label + "'s dinner"
          : 'Next to cook'
      : '';
    const compactMeals = featured ? meals.filter((meal) => meal.day !== featured.day) : meals;
    const lunch = MW.LUNCHES.find((x) => x.id === st.week.lunchId);
    const lunchPortions =
      (MW.weeks.currentPlanning(st).lunchDays || []).length *
      Math.max(1, Number(MW.weeks.currentPlanning(st).lunchPeople) || 1);
    const calculatedCost = MW.planner.plannedBasketCost
      ? MW.planner.plannedBasketCost()
      : MW.planner.plannedMealCost();
    const marketBasket =
      !MW.markets.hasPricing() && MW.basket
        ? MW.basket.calculate(st.week.meals, {
            people: MW.weeks.currentPlanning(st).people,
          })
        : null;
    const plannedCost = marketBasket ? marketBasket.total : calculatedCost;
    const budget = MW.markets.normaliseBudget(st.household.country, st.household.budget);
    const hasBudgetLimit = budget > 0;
    const pricesUnavailable = plannedCost == null;
    const budgetPct =
      pricesUnavailable || !hasBudgetLimit ? 0 : Math.min(100, Math.round((plannedCost / budget) * 100));
    const savingResult = st.week && st.week.savingResult;
    const budgetWarning =
      hasBudgetLimit && st.plan.priceMode && savingResult && savingResult.metBudget === false
        ? '<section class="budget-over-note">' +
          icon('triangle-exclamation') +
          '<div><strong>' +
          money(savingResult.overBudgetBy) +
          ' above your weekly budget</strong><small>Change a meal or regenerate to fit your ' +
          money(budget) +
          ' budget.</small></div></section>'
        : '';

    const homeDelivery = st.week && st.week.delivery;
    const orderedPlan = MW.planner.orderedPlanLocked(st);
    const homeMissing =
      homeDelivery && Array.isArray(homeDelivery.missingKeys) ? homeDelivery.missingKeys.length : 0;
    const homeDeliveryNotice =
      st.week && st.week.status === 'order-placed'
        ? '<button class="delivery-notice" id="homeDeliveryCheck">' +
          icon('truck-ramp-box') +
          '<span><strong>Has your shopping arrived?</strong><small>Check the delivery before My Week adds it to your inventory.</small></span><i class="fa-solid fa-chevron-right"></i></button>'
        : homeDelivery && homeDelivery.confirmed && homeMissing
          ? '<button class="delivery-notice has-missing" id="homeDeliveryCheck">' +
            icon('triangle-exclamation') +
            '<span><strong>' +
            homeMissing +
            ' delivery item' +
            (homeMissing === 1 ? '' : 's') +
            ' missing</strong><small>Review what arrived if the supermarket makes another change.</small></span><i class="fa-solid fa-chevron-right"></i></button>'
          : '';

    const dayStrip =
      '<div class="day-strip">' +
      MW.DAYS.map((d) => {
        const meal = meals.find((x) => x.day === d.key);
        const hasLunch = (MW.weeks.currentPlanning(st).lunchDays || []).includes(d.key);
        return (
          '<button class="day-pill day-open ' +
          (meal ? 'has-dinner' : '') +
          '" data-day="' +
          d.key +
          '" aria-label="Edit ' +
          esc(d.label) +
          '"><span>' +
          esc(d.short) +
          '</span><div class="day-dots">' +
          (meal ? '<i title="Dinner"></i>' : '') +
          (hasLunch ? '<i class="lunch-dot" title="Lunch"></i>' : '') +
          '</div></button>'
        );
      }).join('') +
      '</div>';

    const featuredMeal = featured
      ? '<article class="home-featured-meal tappable-card" data-card-recipe="' +
        featured.recipe.id +
        '" tabindex="0" role="link" aria-label="Open ' +
        esc(featured.recipe.title) +
        '">' +
        recipePhoto(featured.recipe, 'home-featured-photo', featured.recipe.title) +
        favouriteButton(featured.recipe) +
        '<div class="home-featured-body"><span class="eyebrow">' +
        esc(featuredLabel) +
        '</span><h3>' +
        esc(featured.recipe.title) +
        '</h3>' +
        (recipeSubtitle(featured.recipe) ? '<p>' + esc(recipeSubtitle(featured.recipe)) + '</p>' : '') +
        '<div class="home-featured-meta"><span>' +
        icon('clock') +
        ' ' +
        esc(timeText(featured.recipe)) +
        '</span><span>' +
        esc(recipeCostLabel(featured.recipe, MW.weeks.currentPlanning(st).people)) +
        '</span></div>' +
        '<div class="home-featured-actions"><button class="btn primary featured-open" data-recipe="' +
        featured.recipe.id +
        '">View recipe</button><button class="btn secondary featured-swap" data-day="' +
        featured.day +
        '" ' +
        (orderedPlan ? 'disabled title="Shopping already ordered" ' : '') +
        '>' +
        icon('rotate') +
        ' Change</button></div></div>' +
        '</article>'
      : '';
    const list = meals.length
      ? featuredMeal +
        (compactMeals.length
          ? '<div class="meal-list home-meal-list">' +
            compactMeals
              .map(
                (m) =>
                  '<article class="meal-row tappable-card" data-card-recipe="' +
                  m.recipe.id +
                  '" tabindex="0" role="link" aria-label="Open ' +
                  esc(m.recipe.title) +
                  '">' +
                  '<div class="meal-photo-wrap">' +
                  recipePhoto(m.recipe, 'meal-thumb', m.recipe.title) +
                  favouriteButton(m.recipe) +
                  '</div><button class="meal-open" data-recipe="' +
                  m.recipe.id +
                  '" aria-label="Open ' +
                  esc(m.recipe.title) +
                  '">' +
                  '<span class="meal-day">' +
                  esc(day(m.day).short + (cooked.has(m.recipeId) ? ' · Cooked' : '')) +
                  '</span><strong>' +
                  esc(m.recipe.title) +
                  '</strong>' +
                  (recipeSubtitle(m.recipe) ? '<small>' + esc(recipeSubtitle(m.recipe)) + '</small>' : '') +
                  '<span class="meal-meta"><span>' +
                  icon('clock') +
                  ' ' +
                  esc(timeText(m.recipe)) +
                  '</span><span>' +
                  esc(recipeCostLabel(m.recipe, MW.weeks.currentPlanning(st).people)) +
                  '</span></span>' +
                  '</button>' +
                  '<button class="row-swap swap" data-day="' +
                  m.day +
                  '" aria-label="Change ' +
                  esc(day(m.day).label) +
                  ' meal" ' +
                  (orderedPlan ? 'disabled title="Shopping already ordered" ' : '') +
                  '>' +
                  icon('rotate') +
                  '</button>' +
                  '</article>',
              )
              .join('') +
            '</div>'
          : '')
      : '<div class="home-empty-plan"><span class="empty-state-icon">' +
        icon('calendar-plus') +
        '</span><div><strong>No dinners planned</strong></div></div>';
    const deliveryBlocking = Boolean(
      st.week?.delivery && (st.week.weekKey === MW.planner.currentWeekKey() || !st.week.delivery.confirmed),
    );
    const regenerateAction =
      '<div class="home-quick-actions">' +
      '<button class="home-action" id="regenerateWeek" ' +
      (deliveryBlocking ? 'disabled title="Complete the delivery first" ' : '') +
      '>' +
      icon('arrows-rotate') +
      '<span><strong>' +
      (meals.length ? 'Generate new meals' : 'Generate my meals') +
      '</strong></span></button>' +
      '<button class="home-action" id="customWeekStart" ' +
      (deliveryBlocking ? 'disabled title="Complete the delivery first" ' : '') +
      '>' +
      icon('calendar-plus') +
      '<span><strong>Choose my own meals</strong></span></button></div>';

    root.innerHTML = shell(
      '<section class="home-intro"><div><h1>' +
        'My meals</h1><p>' +
        countLabel(meals.length, 'dinner', 'dinners') +
        ' · ' +
        countLabel((MW.weeks.currentPlanning(st).lunchDays || []).length, 'lunch day', 'lunch days') +
        ' · ' +
        esc(st.household.retailer) +
        '</p></div><div class="budget-text"><strong>' +
        (hasBudgetLimit ? MW.markets.money(Math.round(budget)) : 'Flexible') +
        '</strong><span>budget</span></div></section>' +
        dayStrip +
        homeDeliveryNotice +
        '<section class="list-section home-dinners"><div class="section-title"><div><span class="eyebrow">DINNERS</span><h2>Planned dinners</h2></div><span>' +
        meals.length +
        ' planned</span></div>' +
        list +
        '</section>' +
        regenerateAction +
        (lunchPortions && lunch
          ? '<section class="lunch-feature tappable-card ' +
            (!displayRecipeImage(lunch) ? 'no-photo' : '') +
            '" data-card-recipe="' +
            lunch.id +
            '" tabindex="0" role="link" aria-label="Open ' +
            esc(lunch.title) +
            '">' +
            recipePhoto(lunch, 'lunch-photo', lunch.title) +
            favouriteButton(lunch) +
            '<div class="lunch-body"><span class="eyebrow">LUNCH PREP</span><h2>' +
            esc(lunch.title) +
            '</h2><p>' +
            lunchPortions +
            ' ' +
            (lunchPortions === 1 ? 'lunch' : 'lunches') +
            ' across ' +
            (MW.weeks.currentPlanning(st).lunchDays || []).length +
            ' ' +
            ((MW.weeks.currentPlanning(st).lunchDays || []).length === 1 ? 'day' : 'days') +
            ' for ' +
            Math.max(1, Number(MW.weeks.currentPlanning(st).lunchPeople) || 1) +
            ' ' +
            (Math.max(1, Number(MW.weeks.currentPlanning(st).lunchPeople) || 1) === 1 ? 'person' : 'people') +
            '</p><button class="text-action" id="openLunch">Prepare lunch</button>' +
            (orderedPlan ? '' : '<button class="text-action" id="changeLunch">Change lunch</button>') +
            '</div></section>'
          : '<section class="lunch-feature no-photo"><div class="lunch-body"><span class="eyebrow">LUNCH</span><h2>No lunches planned</h2><button class="text-action" id="editPlan">Add lunches</button></div></section>') +
        (pricesUnavailable || !hasBudgetLimit
          ? ''
          : '<section class="budget-progress"><div><strong>' +
            money(plannedCost) +
            '</strong><span>estimated trolley</span></div><div><strong>' +
            money(budget) +
            '</strong><span>weekly budget</span></div><div class="progress"><span style="width:' +
            budgetPct +
            '%"></span></div></section>') +
        budgetWarning +
        (!st.household.equipmentConfigured
          ? '<section class="kitchen-nudge"><span>' +
            icon('utensils') +
            '</span><div><strong>Match recipes to your kitchen</strong><small>Specialist recipes stay out until you tell My Week what equipment you have.</small></div><button id="kitchenSetup">Set up</button></section>'
          : '') +
        '<button class="btn primary full-action" id="accept">View my shopping list ' +
        icon('arrow-right') +
        '</button>',
      'plan',
    );

    const generateWeek = async (button) => {
      const active = s();
      const current = active.week || {};
      const sameWeek = current.weekKey === MW.planner.currentWeekKey();
      if (current.delivery && (sameWeek || !current.delivery.confirmed)) return;
      let keepUnfinished = false;
      if (!sameWeek) {
        const unfinished = MW.planner.unfinishedMeals(current);
        if (unfinished.length) {
          const configuredDays = (active.plan.dinnerDays || []).length;
          if (unfinished.length > configuredDays) {
            const startFresh = await confirmAction({
              title: 'You still have unfinished dinners',
              message:
                'Your current plan has more unfinished meals than your saved dinner days. Keep your existing plan or generate a fresh one.',
              confirmLabel: 'Start fresh',
              cancelLabel: 'Keep my meals',
            });
            if (!startFresh) return;
          } else {
            const choice = await confirmAction({
              title: 'Keep your unfinished dinners?',
              message:
                'You still have ' +
                countLabel(unfinished.length, 'dinner', 'dinners') +
                ' to cook. Keep them and fill any free days, or start a fresh plan.',
              confirmLabel: 'Keep unfinished',
              alternativeLabel: 'Start fresh',
              cancelLabel: 'Not now',
            });
            if (choice === false) return;
            keepUnfinished = choice === true;
          }
        }
      } else {
        const progressItems = Object.values(current.shopProgress?.items || {});
        const shoppingStarted = progressItems.some(
          (row) => row && Object.keys(row).some((key) => /(?:Amount|Text)$/.test(key) && row[key]),
        );
        if (shoppingStarted || (current.completedRecipes || []).length) {
          const confirmed = await confirmAction({
            title: 'Replace your planned meals?',
            message:
              'You have started shopping or cooking. This will change the meals and ingredients you need.',
            confirmLabel: 'Generate new meals',
          });
          if (!confirmed) return;
        }
      }
      withLoading(button, () => {
        MW.planner.regenerateAll({
          planMode: sameWeek ? 'manual-full' : 'new-week-full',
          keepUnfinished,
          rebuildShop: sameWeek,
        });
        week();
      });
    };
    const homeDeliveryCheck = document.getElementById('homeDeliveryCheck');
    if (homeDeliveryCheck) homeDeliveryCheck.onclick = () => go('delivery');
    root.querySelectorAll('.day-open').forEach((b) => (b.onclick = () => go('day:' + b.dataset.day)));
    root.querySelectorAll('.swap').forEach((b) => (b.onclick = () => swap(b.dataset.day)));
    root
      .querySelectorAll('.meal-open,.featured-open')
      .forEach((b) => (b.onclick = () => go('recipe:' + b.dataset.recipe)));
    bindRecipeCards();
    root.querySelectorAll('.featured-swap').forEach((b) => (b.onclick = () => swap(b.dataset.day)));
    const startCustom = document.getElementById('customWeekStart');
    if (startCustom)
      startCustom.onclick = async () => {
        const existing = (st.week && st.week.meals) || [];
        if (existing.length || st.week?.delivery) {
          const confirmed = await confirmAction({
            eyebrow: 'MAKE YOUR OWN WEEK',
            title: 'Start choosing your dinners?',
            message:
              'Your current dinners and shopping checklist will be cleared. Favourites, recipes, cupboard and previous weeks stay saved.',
            confirmLabel: 'Start a custom week',
          });
          if (!confirmed) return;
        }
        MW.planner.startCustomWeek({ confirmed: true });
        st.ui.libraryQuery = '';
        st.ui.libraryCategory = '';
        st.ui.libraryFilters = null;
        MW.state.save();
        go('recipes');
      };
    const regenerate = document.getElementById('regenerateWeek');
    if (regenerate) regenerate.onclick = () => generateWeek(regenerate);
    const changeLunch = document.getElementById('changeLunch');
    if (changeLunch) changeLunch.onclick = () => changeLunchScreen();
    const editPlan = document.getElementById('editPlan');
    if (editPlan) editPlan.onclick = () => go('settings');
    const kitchenSetup = document.getElementById('kitchenSetup');
    if (kitchenSetup) kitchenSetup.onclick = () => go('settings');
    document.getElementById('accept').onclick = () => go('shopreview');
    bindNav();
    if (MW.updates && MW.updates.isNativeAndroid()) {
      MW.updates
        .pendingStatus()
        .then(async (pending) => {
          const checked = await MW.updates.check();
          return pending && !pending.installed
            ? {
                ...checked,
                available: true,
                manifest: { ...pending.pending, releaseNotes: [] },
              }
            : checked;
        })
        .then((result) => {
          if (!result || !result.available || !result.manifest || document.getElementById('homeUpdateNotice'))
            return;
          const intro = root.querySelector('.home-intro');
          if (!intro) return;
          const notice = document.createElement('button');
          notice.id = 'homeUpdateNotice';
          notice.className = 'delivery-notice';
          notice.dataset.updateVersionCode = String(result.manifest.versionCode);
          notice.innerHTML =
            icon('cloud-arrow-down') +
            '<span><strong>Update available</strong><small>Tap to download the latest version.</small></span>' +
            '<i class="fa-solid fa-chevron-right"></i>';
          intro.insertAdjacentElement('afterend', notice);
          notice.onclick = async () => {
            if (notice.disabled) return;
            try {
              await MW.updates.install(result.manifest);
            } catch {
              /* Shared state shows the failure. */
            }
            paintUpdateState();
          };
          paintUpdateState();
        })
        .catch(() => {});
    }
  }

  function swap(dayKey) {
    animateNextPage = true;
    const slot = s().week.meals.find((x) => x.day === dayKey);
    if (!slot) return;
    const current = recipe(slot.recipeId);
    const alts = MW.planner.alternatives(current.id, 5);
    const randomPool = MW.planner.randomAlternativePool ? MW.planner.randomAlternativePool(current.id) : [];
    root.innerHTML = shell(
      '<section class="subpage-head"><button class="back-button" id="back">' +
        icon('arrow-left') +
        '</button><div><span class="eyebrow">' +
        esc(day(dayKey).label.toUpperCase()) +
        '</span><h1>Choose another dinner</h1></div></section>' +
        '<button class="planner-utility random-pick" id="randomPick">' +
        icon('shuffle') +
        '<span><strong>Choose one for me</strong><small>Randomly pick from all ' +
        randomPool.length +
        ' dinners that match your current settings</small></span><i class="fa-solid fa-chevron-right"></i></button>' +
        '<div class="choice-divider"><span>' +
        alts.length +
        ' best alternative' +
        (alts.length === 1 ? '' : 's') +
        '</span></div>' +
        '<div class="alternative-list">' +
        alts
          .map(
            (r) =>
              '<button class="alternative-card alt" data-id="' +
              r.id +
              '">' +
              recipePhoto(r, 'alternative-photo', r.title) +
              '<span><strong>' +
              esc(r.title) +
              '</strong>' +
              (recipeSubtitle(r) ? '<small>' + esc(recipeSubtitle(r)) + '</small>' : '') +
              '<em>' +
              esc(timeText(r)) +
              ' · ' +
              esc(recipeCostLabel(r, s().household.people)) +
              '</em></span><i class="fa-solid fa-chevron-right"></i></button>',
          )
          .join('') +
        '</div>' +
        '<button class="browse-library" id="browseLibrary">' +
        icon('magnifying-glass') +
        '<span><strong>Browse recipe library</strong><small>Search your local recipe collection</small></span><i class="fa-solid fa-chevron-right"></i></button>',
      'plan',
    );
    root.querySelectorAll('.alt').forEach(
      (b) =>
        (b.onclick = () => {
          MW.planner.replace(dayKey, b.dataset.id);
          go('week');
        }),
    );
    document.getElementById('randomPick').onclick = (e) =>
      withLoading(e.currentTarget, () => {
        const pick = MW.planner.randomAlternative(current.id);
        if (pick && MW.planner.replace(dayKey, pick.id)) go('week');
      });
    document.getElementById('browseLibrary').onclick = () => {
      s().ui.libraryTargetDay = dayKey;
      MW.state.save();
      go('library');
    };
    document.getElementById('back').onclick = () => go('week');
    bindNav();
  }

  function changeLunchScreen(showAll = false) {
    animateNextPage = true;
    const st = s();
    const profile = foodProfile();
    const current = MW.LUNCHES.find((x) => x.id === st.week.lunchId);
    const rankedBase =
      MW.planner && MW.planner.lunchAlternatives
        ? MW.planner.lunchAlternatives()
        : MW.LUNCHES.filter((x) => !current || x.id !== current.id).filter((x) =>
            MW.planner && MW.planner.lunchAllowed
              ? MW.planner.lunchAllowed(x)
              : !MW.food || MW.food.lunchAllowed(x, profile),
          );
    const preferredStyles =
      MW.food && MW.food.lunchPreferences ? MW.food.lunchPreferences(profile) : [profile.lunchStyle || 'any'];
    const filterItems = preferredStyles.includes('any')
      ? MW.food.lunchStyles
      : [
          { id: 'any', label: 'Any of my styles' },
          ...MW.food.lunchStyles.filter((x) => preferredStyles.includes(x.id)),
        ];
    st.ui = st.ui || {};
    let browseStyle = st.ui.lunchBrowseStyle || 'any';
    if (!filterItems.some((x) => x.id === browseStyle)) browseStyle = 'any';
    const ranked =
      browseStyle === 'any' || !MW.food || !MW.food.lunchMatchesStyle
        ? rankedBase
        : rankedBase.filter((x) => MW.food.lunchMatchesStyle(x, browseStyle));
    const randomBase = MW.planner.randomLunchPool
      ? MW.planner.randomLunchPool(current && current.id)
      : rankedBase;
    const randomLunchPool =
      browseStyle === 'any' || !MW.food || !MW.food.lunchMatchesStyle
        ? randomBase
        : randomBase.filter((x) => MW.food.lunchMatchesStyle(x, browseStyle));
    const practicalRanked = ranked.filter((x) =>
      MW.food && MW.food.practicalLunchCandidate ? MW.food.practicalLunchCandidate(x) : x.practicalLunch,
    );
    const practicalIds = new Set(practicalRanked.map((x) => x.id));
    const shortlist = [...practicalRanked, ...ranked.filter((x) => !practicalIds.has(x.id))].slice(0, 5);
    const shown = showAll ? ranked : shortlist;
    const plan = MW.weeks.cookingWeek(st)?.planning || MW.weeks.planning(st),
      days = (plan.lunchDays || []).length,
      eaters = Math.max(1, Number(plan.lunchPeople) || 1),
      planned = days * eaters;
    const card = (r) => {
      const style = r.prepStyle === 'no-cook' ? 'Prep at home' : 'Cook at home',
        meta = [r.time ? r.time + ' mins' : 'Quick prep', style].join(' · ');
      return (
        '<button class="alternative-card lunch-alt lunch-swap-card" data-id="' +
        r.id +
        '">' +
        recipePhoto(r, 'alternative-photo', r.title) +
        '<span class="lunch-alt-copy"><strong>' +
        esc(r.title) +
        '</strong>' +
        (recipeSubtitle(r) ? '<small>' + esc(recipeSubtitle(r)) + '</small>' : '') +
        '<em>' +
        esc(meta) +
        '</em></span><i class="fa-solid fa-chevron-right"></i></button>'
      );
    };
    root.innerHTML = shell(
      '<section class="subpage-head lunch-swap-head"><button class="back-button" id="back">' +
        icon('arrow-left') +
        '</button><div><span class="eyebrow">CHANGE LUNCH</span><h1>Choose another lunch</h1><p>' +
        planned +
        ' ' +
        (planned === 1 ? 'lunch' : 'lunches') +
        ' this week</p></div></section>' +
        '<button class="planner-utility random-pick lunch-random" id="randomLunch">' +
        icon('shuffle') +
        '<span><strong>Choose one for me</strong><small>Pick from ' +
        randomLunchPool.length +
        ' suitable lunches</small></span><i class="fa-solid fa-chevron-right"></i></button>' +
        '<section class="lunch-swap-filters"><span class="eyebrow">LUNCH STYLE</span>' +
        foodChoice('lunchFilter', filterItems, browseStyle) +
        '</section>' +
        '<div class="choice-divider lunch-choice-divider"><span>' +
        (showAll
          ? ranked.length + ' matching ' + (ranked.length === 1 ? 'lunch' : 'lunches')
          : shortlist.length + ' best alternative' + (shortlist.length === 1 ? '' : 's')) +
        '</span></div>' +
        '<div class="alternative-list lunch-swap-list">' +
        shown.map(card).join('') +
        '</div>' +
        (!ranked.length
          ? '<div class="empty-state">' +
            icon('utensils') +
            '<h2>No lunches match</h2><p>Try another lunch style or change your food preferences.</p></div>'
          : '') +
        (ranked.length > 5
          ? '<button class="browse-library lunch-browse-all" id="lunchBrowseAll">' +
            icon(showAll ? 'arrow-up' : 'magnifying-glass') +
            '<span><strong>' +
            (showAll ? 'Show 5 best alternatives' : 'Browse all ' + ranked.length + ' lunches') +
            '</strong><small>' +
            (showAll ? 'Return to the shortlist' : 'See every lunch matching this style') +
            '</small></span><i class="fa-solid fa-chevron-right"></i></button>'
          : ''),
      'plan',
    );
    root.querySelectorAll('#lunchFilter button').forEach(
      (b) =>
        (b.onclick = () => {
          st.ui.lunchBrowseStyle = b.dataset.v;
          MW.state.save();
          changeLunchScreen(false);
        }),
    );
    root.querySelectorAll('.lunch-alt').forEach(
      (b) =>
        (b.onclick = () => {
          MW.planner.replaceLunch(b.dataset.id);
          go('week');
        }),
    );
    const randomLunch = document.getElementById('randomLunch');
    if (randomLunch)
      randomLunch.onclick = (e) =>
        withLoading(e.currentTarget, () => {
          const pick = randomLunchPool.length
            ? randomLunchPool[Math.floor(Math.random() * randomLunchPool.length)]
            : null;
          if (pick) {
            MW.planner.replaceLunch(pick.id);
            go('week');
          }
        });
    const browse = document.getElementById('lunchBrowseAll');
    if (browse) browse.onclick = () => changeLunchScreen(!showAll);
    document.getElementById('back').onclick = () => go('week');
    bindNav();
  }

  function shopReview() {
    const st = s();
    if (!st.week) return go('week');
    const delivery = st.week.delivery;
    const orderLocked = Boolean(
      delivery &&
      Array.isArray(delivery.items) &&
      ['order-placed', 'delivery-checked'].includes(st.week.status),
    );
    let shop = st.week && st.week.shop;
    const currentSignature = MW.shopping && MW.shopping.signature ? MW.shopping.signature() : null;
    if (
      !shop ||
      (!orderLocked &&
        (shop.pricedSubtotal == null || (currentSignature && shop.planSignature !== currentSignature)))
    ) {
      try {
        shop = MW.shopping.build({
          savingMode: st.plan.priceMode,
          preserveChecks: true,
        });
      } catch (error) {
        root.innerHTML = shell(
          '<section class="empty-state"><h2>Could not update the shopping list</h2>' +
            '<p>' +
            esc(error.message || 'Please try again.') +
            '</p>' +
            '<button type="button" class="btn primary" id="retryShoppingList">Try again</button></section>',
          'shop',
          { title: 'Shopping list' },
        );
        document.getElementById('retryShoppingList').onclick = () => samePage(shopReview);
        bindNav();
        return;
      }
    }
    if (!shop) return go('week');
    // A locked historical order can belong to the previous country. Preserve it,
    // but never render its old GBP money figures under the currently selected AUD symbol.
    const countryMismatch = Boolean(shop.country && shop.country !== MW.markets.current());
    const pricesUnavailable =
      countryMismatch ||
      (shop.estimatedTotal == null &&
        !(delivery && delivery.receipt && Number.isFinite(Number(delivery.receipt.total))));
    const retailSection = (x) => (MW.retailGroups ? MW.retailGroups.section(x.name, x.sourceGroup) : 'Other');
    const retailOrder = MW.retailGroups
      ? MW.retailGroups.order
      : ['Fruit & Veg', 'Chilled', 'Cupboard', 'Frozen', 'Bakery', 'Household', 'Other'];
    const sourceGroups = Object.keys(shop.groups || {});
    const rawItems = sourceGroups.flatMap((g) =>
      shop.groups[g].map((x) => ({
        ...x,
        key: g + '|' + x.name,
        sourceGroup: g,
      })),
    );
    const isAddedRow = (x) => (x.reasons || []).includes('Added this week');
    const allItems = rawItems.map((x) => {
      const substitution =
        x.substitution ||
        (MW.shopping && MW.shopping.getSubstitution && MW.shopping.getSubstitution(x.key, st)) ||
        null;
      return { ...x, group: isAddedRow(x) ? 'Additions' : x.group || retailSection(x), substitution };
    });
    const progress = MW.shopping.reconcileProgress(allItems, st);
    // Existing cupboard checks remain intact. New taps now belong to the same
    // basket checklist; users do not have to switch shopping modes.
    if (!orderLocked && progress.stage === 'cupboard') MW.shopping.setStage('basket', st);
    const inventoryCovered = MW.shopping.coveredInventory(st);
    const retailGroups = [
      ...(allItems.some((x) => x.group === 'Additions') ? ['Additions'] : []),
      ...retailOrder.filter((g) => allItems.some((x) => x.group === g)),
    ];
    const done = allItems.filter((x) => MW.shopping.progressFor(x, st).complete).length;
    const purchasedLines = MW.shopping.purchaseLines(allItems, st);
    const pct = allItems.length ? Math.round((done / allItems.length) * 100) : 0;
    const substitutionCount = allItems.filter((x) => x.substitution).length;
    const receiptTotal =
      !pricesUnavailable &&
      delivery &&
      delivery.receipt &&
      delivery.receipt.total != null &&
      Number.isFinite(Number(delivery.receipt.total))
        ? Number(delivery.receipt.total)
        : null;
    const orderLine = (x) => {
      const sub = x.substitution;
      if (!(orderLocked && delivery && delivery.confirmed)) {
        if (sub) return 'Bought instead · ' + esc(displayAmount(sub.replacementAmount));
        return (
          esc(x.displayAmount) +
          (x.quantityNeedsReview && !isAddedRow(x) ? ' retail minimum' : '') +
          (x.savingNote ? ' · ' + esc(x.savingNote) : '')
        );
      }
      if (!delivery.items.some((item) => item.key === x.key))
        return esc(x.displayAmount) + ' · Not included in the confirmed order';
      const actual =
          (delivery.actualAmounts && delivery.actualAmounts[x.key]) || (sub && sub.replacementAmount) || '0',
        short = delivery.shortfallAmounts && delivery.shortfallAmounts[x.key],
        surplus = delivery.surplusApplied && delivery.surplusApplied[x.key];
      return (
        (sub ? 'Bought ' : 'Planned ' + esc(x.displayAmount) + ' · Bought ') +
        esc(actual) +
        (short
          ? ' · Short ' + esc(short)
          : surplus && !/^0(?:\s|$)/.test(surplus)
            ? ' · Extra ' + esc(surplus)
            : '')
      );
    };
    const itemHtml = (x) => {
      const fulfilment = MW.shopping.progressFor(x, st);
      const sub = x.substitution,
        shownName = sub ? sub.replacementName : x.name;
      const subNote = sub
        ? '<span class="shop-substitution-note">' +
          icon('right-left') +
          ' Instead of ' +
          esc(ingredientName(x.name)) +
          ' · planned ' +
          esc(displayAmount(sub.plannedAmount || x.displayAmount)) +
          '</span>'
        : '';
      const quantityNote =
        !sub && x.quantityNeedsReview && !isAddedRow(x)
          ? '<span class="shop-quantity-note">' +
            icon('triangle-exclamation') +
            ' Recipe uses ' +
            esc((x.sourceAmounts || x.amounts || []).join(' + ')) +
            ' · check this pack is enough</span>'
          : '';
      const progressNote = fulfilment.partial
        ? '<span class="shop-fulfilment-note">' +
          esc(
            MW.inventory.formatAmount({
              value: fulfilment.covered,
              unit: fulfilment.unit || 'count',
            }),
          ) +
          ' accounted for · ' +
          esc(fulfilment.remainingText) +
          ' remaining</span>'
        : fulfilment.complete
          ? '<span class="shop-fulfilment-note">' +
            (fulfilment.legacy && !fulfilment.home && !fulfilment.basket
              ? 'Previously checked'
              : fulfilment.home && !fulfilment.basket
                ? 'At home'
                : 'In shopping basket') +
            '</span>'
          : '';
      const reason = isAddedRow(x) ? '' : (x.reasons || [])[0] || '';
      const price =
        !countryMismatch && !sub && x.estimatedPrice != null && Number.isFinite(Number(x.estimatedPrice))
          ? '<span class="shop-price">~' + money(x.estimatedPrice) + '</span>'
          : '';
      const removableExtra =
        !orderLocked &&
        (st.week.extras || []).find(
          (extra) => MW.inventory.stockKey(extra.name) === MW.inventory.stockKey(x.name),
        );
      const removableRegular =
        !orderLocked &&
        (st.regulars || []).find(
          (regular) =>
            regular.selected && MW.inventory.stockKey(regular.name) === MW.inventory.stockKey(x.name),
        );
      const more = orderLocked
        ? ''
        : isAddedRow(x) && (removableExtra || removableRegular)
          ? '<button type="button" class="shop-item-more shop-extra-remove" ' +
            (removableExtra ? 'data-extra-name="' + esc(removableExtra.name) + '" ' : '') +
            (removableRegular ? 'data-regular-id="' + esc(removableRegular.id) + '" ' : '') +
            'aria-label="Remove ' +
            esc(ingredientName(x.name)) +
            ' from additions">' +
            icon('xmark') +
            '</button>'
          : '<button type="button" class="ingredient-more shop-item-more" data-ingredient="' +
            esc(x.name) +
            '" data-shop-key="' +
            esc(x.key) +
            '" data-planned-amount="' +
            esc(x.inventoryAmount || x.displayAmount || '') +
            '" aria-label="More options for ' +
            esc(ingredientName(x.name)) +
            '">' +
            icon('ellipsis-vertical') +
            '</button>';
      return (
        '<div class="shop-item-shell ' +
        (sub ? 'has-substitution ' : '') +
        (orderLocked ? 'order-locked' : '') +
        '"><button class="shop-item ' +
        (fulfilment.complete ? 'done' : fulfilment.partial ? 'partly-done' : '') +
        '" data-key="' +
        esc(x.key) +
        '" aria-pressed="' +
        fulfilment.complete +
        '"><span class="shop-check">' +
        (fulfilment.complete ? icon('check') : fulfilment.partial ? icon('minus') : '') +
        '</span><span class="shop-info"><strong>' +
        esc(ingredientName(shownName)) +
        '</strong><span class="shop-item-details"><small>' +
        orderLine(x) +
        '</small>' +
        price +
        '</span>' +
        subNote +
        quantityNote +
        progressNote +
        (reason ? '<span class="shop-reason" title="' + esc(reason) + '">' + esc(reason) + '</span>' : '') +
        '</span></button>' +
        more +
        '</div>'
      );
    };
    const groupHtml = (g) =>
      '<section class="retail-group" data-retail-section="' +
      esc(g) +
      '"><header><span class="retail-icon">' +
      icon(
        g === 'Additions'
          ? 'plus'
          : g === 'Fruit & Veg'
            ? 'leaf'
            : g === 'Chilled'
              ? 'snowflake'
              : g === 'Cupboard'
                ? 'jar'
                : g === 'Frozen'
                  ? 'snowflake'
                  : g === 'Bakery'
                    ? 'bread-slice'
                    : g === 'Household'
                      ? 'spray-can-sparkles'
                      : 'basket-shopping',
      ) +
      '</span><span class="retail-heading"><strong>' +
      esc(g) +
      '</strong></span><small>' +
      allItems.filter((x) => x.group === g).length +
      '</small></header><div class="retail-items">' +
      allItems
        .filter((x) => x.group === g)
        .map(itemHtml)
        .join('') +
      '</div></section>';
    const groupedHtml = retailGroups.map(groupHtml).join('');
    const missingCount = delivery && Array.isArray(delivery.missingKeys) ? delivery.missingKeys.length : 0;
    const issueCount = delivery
      ? new Set([...(delivery.missingKeys || []), ...(delivery.shortKeys || [])]).size
      : 0;
    const deliveryNotice =
      st.week && st.week.status === 'order-placed'
        ? '<button class="delivery-notice" id="checkDelivery">' +
          icon('truck-ramp-box') +
          '<span><strong>Check what you actually got</strong><small>Confirm missing items and the pack quantities you came home with.</small></span><i class="fa-solid fa-chevron-right"></i></button>'
        : delivery && delivery.confirmed
          ? '<button class="delivery-notice ' +
            (issueCount ? 'has-missing' : 'complete') +
            '" id="checkDelivery">' +
            icon(issueCount ? 'triangle-exclamation' : 'circle-check') +
            '<span><strong>' +
            (issueCount
              ? issueCount + ' item' + (issueCount === 1 ? '' : 's') + ' missing or short'
              : 'Shop quantities saved') +
            '</strong><small>' +
            (issueCount ? 'Original order shown below.' : 'Bought quantities saved in your cupboard.') +
            '</small></span><i class="fa-solid fa-chevron-right"></i></button>'
          : '';

    const postOrderActions = orderLocked
      ? '<div class="plan-actions"><button class="btn secondary" id="checkDeliveryBottom">' +
        (delivery.confirmed ? 'Review delivery' : 'Check delivery') +
        '</button><button class="btn primary" id="continuePlan">Back to My Week</button></div>'
      : allItems.length
        ? '<div class="plan-actions"><button class="btn secondary" id="guided">Shop step by step</button>' +
          '<button class="btn primary" id="doneShop" ' +
          (purchasedLines.length ? '' : 'disabled ') +
          '>Order placed</button></div>'
        : '';

    const pricedSubtotal =
      !countryMismatch &&
      shop.estimatedTotal == null &&
      Number(shop.pricedLineCount) > 0 &&
      Number.isFinite(shop.pricedSubtotal)
        ? shop.pricedSubtotal
        : null;
    const totalValue = receiptTotal != null ? receiptTotal : (shop.estimatedTotal ?? pricedSubtotal);
    const totalMeta =
      receiptTotal != null
        ? 'receipt total'
        : pricedSubtotal != null
          ? 'Priced items'
          : substitutionCount
            ? substitutionCount + ' swap' + (substitutionCount === 1 ? '' : 's') + ' not priced'
            : shop.savingMode
              ? 'after ~' + money(shop.estimatedSavings) + ' saving'
              : 'Estimate';

    const stockPanel = inventoryCovered.length
      ? '<details class="shop-stock-covered" id="shopStockCovered"><summary>' +
        icon('check-circle') +
        ' ' +
        inventoryCovered.length +
        ' ingredients automatically covered by your cupboard ' +
        icon('chevron-down') +
        '</summary><div class="shop-stock-covered-list">' +
        inventoryCovered
          .map(
            (x) =>
              '<div class="shop-stock-covered-item"><span class="stock-covered-tick">' +
              icon('check') +
              '</span><span><strong>' +
              esc(ingredientName(x.name)) +
              '</strong><small>' +
              esc(x.amountText) +
              (x.partial ? ' at home; buy the remainder below' : ' already at home') +
              '</small></span></div>',
          )
          .join('') +
        '</div><button type="button" class="shop-edit-cupboard" id="shopEditCupboard">' +
        'Edit cupboard</button></details>'
      : '';

    // Retail sections already label the ingredients. No second category selector is needed.

    const extraItemControls =
      '<section class="shop-add-items" aria-label="Add items to your shopping list">' +
      '<form id="shopExtraForm" class="add-custom shop-add-form">' +
      '<label class="visually-hidden" for="shopExtraName">Item to add</label>' +
      '<input id="shopExtraName" type="text" maxlength="100" required placeholder="Add an item" autocomplete="off">' +
      '<button type="submit">' +
      icon('plus') +
      ' Add</button></form>' +
      '<p id="shopAddError" class="shop-add-error" role="alert"></p></section>';

    root.innerHTML = shell(
      (allItems.length && totalValue != null
        ? '<div class="shop-overview"><section class="page-head shop-head"><div class="shop-summary">' +
          (totalValue == null
            ? ''
            : '<div class="shop-total shop-total-simple"><strong>' +
              money(totalValue) +
              '</strong><span>' +
              esc(totalMeta) +
              '</span></div>') +
          '</div></section></div>'
        : '') +
        (orderLocked ? '' : extraItemControls) +
        deliveryNotice +
        (allItems.length
          ? '<section class="shop-surface"><div class="shop-group show grouped-shop" data-shopgroup="__all">' +
            groupedHtml +
            '</div></section>'
          : inventoryCovered.length
            ? '<section class="empty-state shop-list-empty">' +
              icon('check-circle') +
              '<h2>Nothing to buy</h2><p>Your cupboard covers this plan.</p></section>'
            : '<section class="empty-state shop-list-empty">' +
              icon('basket-shopping') +
              '<h2>Your list is empty</h2>' +
              '<p>Choose meals in All Recipes to add their ingredients automatically.</p>' +
              '<button class="btn primary" id="shopChooseMeals">Browse recipes</button></section>') +
        stockPanel +
        postOrderActions,
      'shop',
      { title: 'Shopping list' },
    );

    const addForm = document.getElementById('shopExtraForm');
    if (addForm)
      addForm.onsubmit = (event) => {
        event.preventDefault();
        const input = document.getElementById('shopExtraName');
        const status = document.getElementById('shopAddError');
        try {
          MW.shopping.addExtra(input.value);
          samePage(shopReview);
          document.getElementById('shopExtraName')?.focus({ preventScroll: true });
        } catch (error) {
          if (status) status.textContent = error.message;
        }
      };
    root.querySelectorAll('.shop-extra-remove').forEach(
      (button) =>
        (button.onclick = () => {
          if (button.dataset.extraName) MW.shopping.removeExtra(button.dataset.extraName);
          if (button.dataset.regularId) MW.shopping.setRegular(button.dataset.regularId, false);
          samePage(shopReview);
        }),
    );
    const emptyBrowse = document.getElementById('shopChooseMeals');
    if (emptyBrowse) emptyBrowse.onclick = () => go('recipes');
    const editCupboard = document.getElementById('shopEditCupboard');
    if (editCupboard) editCupboard.onclick = () => go('cupboard');
    bindIngredientActions(root);
    root.querySelectorAll('.shop-item').forEach((button) => {
      button.onclick = () => {
        const row = allItems.find((item) => item.key === button.dataset.key);
        if (!row) return;
        MW.shopping.markProgress(row, st);
        if (orderLocked && !delivery.confirmed)
          MW.delivery.updatePending(MW.shopping.purchaseLines(allItems));
        samePage(shopReview);
      };
    });
    const guided = document.getElementById('guided');
    if (guided)
      guided.onclick = () => {
        const flat = allItems
          .filter((x) => !MW.shopping.progressFor(x, st).complete)
          .map((x) => ({
            name: x.name,
            amount: x.displayAmount,
            inventoryAmount: x.inventoryAmount || x.displayAmount,
            category: x.group,
            key: x.key,
            substitution: x.substitution || null,
            quantityNeedsReview: Boolean(x.quantityNeedsReview),
            sourceAmounts: (x.sourceAmounts || x.amounts || []).slice(),
          }));
        st.ui.shopping = { items: flat, index: 0, done: [] };
        MW.state.save();
        go('shopping');
      };
    const checkDelivery = document.getElementById('checkDelivery'),
      checkDeliveryBottom = document.getElementById('checkDeliveryBottom');
    if (checkDelivery) checkDelivery.onclick = () => go('delivery');
    if (checkDeliveryBottom) checkDeliveryBottom.onclick = () => go('delivery');
    const doneShop = document.getElementById('doneShop');
    if (doneShop)
      doneShop.onclick = () => {
        MW.delivery.begin(purchasedLines);
        MW.learning.acceptWeek();
        MW.shopping.setStage('ordered');
        samePage(shopReview);
      };
    const continuePlan = document.getElementById('continuePlan');
    if (continuePlan) continuePlan.onclick = () => go('week');
    bindNav();
  }

  function guidedShopping() {
    const st = s(),
      q = st.ui.shopping;
    if (!q || q.index >= q.items.length) {
      st.ui.shopping = null;
      MW.state.save();
      return go('shopreview');
    }
    const item = q.items[q.index],
      pct = Math.round((q.index / q.items.length) * 100),
      currentSub =
        MW.shopping && MW.shopping.getSubstitution ? MW.shopping.getSubstitution(item.key, st) : null;
    const shownName = currentSub ? currentSub.replacementName : item.name,
      shownAmount = currentSub ? currentSub.replacementAmount : item.amount;
    root.innerHTML = shell(
      '<section class="guided-card"><div class="guided-icon">' +
        icon('basket-shopping') +
        '</div><div class="progress"><span style="width:' +
        pct +
        '%"></span></div><small>' +
        (q.index + 1) +
        ' of ' +
        q.items.length +
        ' · ' +
        esc(item.category) +
        '</small><h1>' +
        esc(ingredientName(shownName)) +
        '</h1><strong>' +
        esc(displayAmount(shownAmount)) +
        '</strong>' +
        (currentSub
          ? '<p class="guided-substitution-note">' +
            icon('right-left') +
            ' Instead of ' +
            esc(ingredientName(item.name)) +
            '</p>'
          : '') +
        (!currentSub && item.quantityNeedsReview && !(item.reasons || []).includes('Added this week')
          ? '<p class="guided-quantity-note">' +
            icon('triangle-exclamation') +
            ' Retail minimum. Recipe uses ' +
            esc((item.sourceAmounts || []).join(' + ')) +
            '. Check this pack is enough.</p>'
          : '') +
        '<button class="btn primary" id="added">Got it</button><button class="btn secondary" id="guidedSubstitute">' +
        icon('right-left') +
        ' I bought something different</button><button class="btn secondary" id="skip">Skip</button><button class="text-action" id="stop">Back to full list</button></section>',
      'shop',
    );
    function next(status) {
      q.done.push({ name: item.name, status });
      if (status === 'added' || status === 'substituted')
        MW.shopping.markProgress({ ...item, displayAmount: item.amount }, st);
      q.index++;
      MW.state.save();
      samePage(guidedShopping, 'continuity-forward');
    }
    document.getElementById('added').onclick = () => next(currentSub ? 'substituted' : 'added');
    document.getElementById('guidedSubstitute').onclick = () =>
      showShopSubstitution({
        shopKey: item.key,
        name: item.name,
        plannedAmount: item.inventoryAmount || item.amount,
        onSaved: () => next('substituted'),
        onCleared: () => samePage(guidedShopping),
      });
    document.getElementById('skip').onclick = () => next('skipped');
    document.getElementById('stop').onclick = () => go('shopreview');
    bindNav();
  }

  function deliveryCheck() {
    const st = s();
    const shop = st.week && st.week.shop;
    if (!shop) return go('shopreview');
    if (!st.week.delivery || !Array.isArray(st.week.delivery.items)) {
      const items = Object.keys(shop.groups || {}).flatMap((group) =>
        (shop.groups[group] || []).map((x) => {
          const key = group + '|' + x.name,
            substitution =
              MW.shopping && MW.shopping.getSubstitution ? MW.shopping.getSubstitution(key, st) : null;
          return {
            key,
            sourceGroup: group,
            group: MW.retailGroups ? MW.retailGroups.section(x.name, group) : 'Other',
            ...x,
            substitution,
          };
        }),
      );
      MW.delivery.begin(MW.shopping.purchaseLines(items, st));
      MW.shopping.setStage('ordered');
    }
    const delivery = s().week.delivery,
      items = delivery.items,
      missing = new Set(delivery.missingKeys || []);
    const actual = Object.assign({}, delivery.actualAmounts || {});
    let receiptSummary = delivery.receipt || null;
    const receiptFilled = new Map();
    const plannedParts = (x) =>
      MW.inventory.parseAmount(x.inventoryAmount || x.displayAmount) ||
      (Number.isFinite(Number(x.needed)) && x.unit ? { value: Number(x.needed), unit: x.unit } : null);
    const expectedParts = (x) =>
      MW.inventory.parseAmount(
        (x.substitution && x.substitution.replacementAmount) || x.inventoryAmount || x.displayAmount,
      ) || { value: '', unit: x.unit || 'count' };
    const actualParts = (x) => {
      const expected = expectedParts(x),
        parsed = MW.inventory.parseAmount(actual[x.key] || MW.inventory.formatAmount(expected));
      return parsed || expected;
    };
    const comparison = (x) => {
      const need = plannedParts(x),
        a = actualParts(x);
      if (!need || !a) return null;
      if (!x.substitution) return a.unit === need.unit ? a.value : null;
      if (x.substitution.comparable === false) return null;
      const converted = MW.inventory.valueInUnit(a, need.unit, x.substitution.replacementName);
      return Number.isFinite(converted) ? converted : null;
    };
    const summary = () => {
      let full = 0,
        partial = 0,
        none = 0,
        swapped = 0;
      for (const x of items) {
        const need = plannedParts(x),
          a = actualParts(x),
          comp = comparison(x);
        if (missing.has(x.key) || Number(a.value) === 0) {
          none++;
          continue;
        }
        if (x.substitution && comp == null) {
          swapped++;
          continue;
        }
        if (need && Number.isFinite(comp) && comp + 1e-9 < need.value) partial++;
        else full++;
      }
      return { full, partial, none, swapped };
    };
    const row = (x) => {
      const a = actualParts(x),
        isMissing = missing.has(x.key),
        sub = x.substitution,
        shown = sub ? sub.replacementName : x.name,
        meta = sub
          ? 'Instead of ' +
            ingredientName(x.name) +
            ' · planned ' +
            displayAmount(sub.plannedAmount || x.displayAmount)
          : 'Planned ' + displayAmount(x.displayAmount) + ' · ' + (x.group || x.sourceGroup),
        state = isMissing ? 'Missing' : sub ? 'Swapped' : 'Expected';
      return (
        '<article class="delivery-item ' +
        (isMissing ? 'missing ' : '') +
        (sub ? 'substituted' : '') +
        '" data-key="' +
        esc(x.key) +
        '"><button type="button" class="delivery-status" data-key="' +
        esc(x.key) +
        '"><span class="delivery-state">' +
        icon(isMissing ? 'xmark' : sub ? 'right-left' : 'check') +
        '</span><span><strong>' +
        esc(ingredientName(shown)) +
        '</strong><small>' +
        esc(meta) +
        '</small><small class="receipt-match-note"></small></span><em>' +
        state +
        '</em></button><label class="delivery-qty"><span>Actual quantity</span><span class="delivery-qty-control"><input class="delivery-actual" data-key="' +
        esc(x.key) +
        '" type="number" min="0" step="any" inputmode="decimal" value="' +
        esc(a.value) +
        '" ' +
        (isMissing ? 'disabled' : '') +
        '><b>' +
        esc(a.unit === 'count' ? 'each' : a.unit) +
        '</b></span></label></article>'
      );
    };
    root.innerHTML = shell(
      '<section class="subpage-head"><button class="back-button" id="backDelivery">' +
        icon('arrow-left') +
        '</button><div><span class="eyebrow">SHOP CHECK</span><h1>What did you actually get?</h1><p>Everything starts with the expected pack quantity. Only change an amount when the pack was different, or mark it missing.</p></div></section>' +
        '<section class="receipt-reference"><div>' +
        icon('receipt') +
        '<span><strong>Scan a receipt</strong><small>Read a receipt on this device to prefill what you actually bought. Nothing is uploaded and nothing changes until you save.</small></span></div><label class="receipt-picker">Take photo or choose image<input id="receiptFile" type="file" accept="image/*" capture="environment"></label><div class="receipt-key"><span class="receipt-key-direct">Green: quantity read directly</span><span class="receipt-key-review">Amber: best guess, check it</span><span>Plain: expected quantity, not confirmed by receipt</span></div><div id="receiptPreview"></div></section>' +
        '<section class="delivery-summary">' +
        icon('boxes-stacked') +
        '<div><strong id="deliverySummary"></strong><small>The quantity you actually bought is added to your cupboard. Cooking deducts what you use, leaving the real excess for later.</small></div></section>' +
        '<div class="delivery-list quantity-delivery-list">' +
        items.map(row).join('') +
        '</div>' +
        '<div class="delivery-actions"><button class="btn primary" id="confirmDelivery">Save quantities & update inventory</button><button class="btn secondary" id="allDelivered">Reset to expected quantities</button></div>',
      'shop',
    );
    const refreshSummary = () => {
      const x = summary(),
        el = document.getElementById('deliverySummary');
      if (el)
        el.textContent =
          x.full +
          ' as expected' +
          (x.swapped ? ' · ' + x.swapped + ' swapped' : '') +
          (x.partial ? ' · ' + x.partial + ' short' : '') +
          (x.none ? ' · ' + x.none + ' missing' : '');
    };
    const clearReceiptMark = (key, card) => {
      receiptFilled.delete(key);
      if (!card) return;
      card.classList.remove('receipt-match-direct', 'receipt-match-review');
      const note = card.querySelector('.receipt-match-note');
      if (note) {
        note.textContent = '';
        note.removeAttribute('data-kind');
      }
    };
    const markReceipt = (key, card, match) => {
      if (!card || !match) return;
      receiptFilled.set(key, match);
      card.classList.remove('receipt-match-direct', 'receipt-match-review');
      card.classList.add(match.needsReview ? 'receipt-match-review' : 'receipt-match-direct');
      const note = card.querySelector('.receipt-match-note');
      if (note) {
        note.dataset.kind = match.needsReview ? 'review' : 'direct';
        note.textContent = match.needsReview
          ? 'Receipt match · check this quantity'
          : 'Receipt matched · quantity prefilled';
      }
      card.querySelector('.delivery-status em').textContent = match.needsReview ? 'Check' : 'Receipt';
    };
    const setMissing = (key, on) => {
      const card = root.querySelector('.delivery-item[data-key="' + CSS.escape(key) + '"]');
      if (!card) return;
      clearReceiptMark(key, card);
      const x = items.find((v) => v.key === key),
        input = card.querySelector('.delivery-actual'),
        expected = expectedParts(x),
        sub = x.substitution;
      card.classList.toggle('missing', on);
      card.querySelector('.delivery-state').innerHTML = icon(on ? 'xmark' : sub ? 'right-left' : 'check');
      card.querySelector('.delivery-status em').textContent = on ? 'Missing' : sub ? 'Swapped' : 'Expected';
      input.disabled = on;
      if (on) {
        missing.add(key);
        input.value = '0';
        actual[key] = '0 ' + (expected.unit || '');
      } else {
        missing.delete(key);
        input.value = expected.value;
        actual[key] = MW.inventory.formatAmount(expected);
      }
      refreshSummary();
    };
    root
      .querySelectorAll('.delivery-status')
      .forEach((b) => (b.onclick = () => setMissing(b.dataset.key, !missing.has(b.dataset.key))));
    root.querySelectorAll('.delivery-actual').forEach(
      (input) =>
        (input.oninput = () => {
          const key = input.dataset.key,
            x = items.find((v) => v.key === key),
            u = expectedParts(x).unit || 'count';
          actual[key] = String(Math.max(0, Number(input.value) || 0)) + ' ' + (u === 'count' ? 'each' : u);
          missing.delete(key);
          const card = input.closest('.delivery-item');
          if (card) {
            clearReceiptMark(key, card);
            card.classList.remove('missing');
            card.querySelector('.delivery-state').innerHTML = icon(x.substitution ? 'right-left' : 'check');
            card.querySelector('.delivery-status em').textContent = 'Edited';
          }
          refreshSummary();
        }),
    );
    document.getElementById('allDelivered').onclick = () => {
      for (const x of items) {
        const p = expectedParts(x);
        actual[x.key] = MW.inventory.formatAmount(p);
        missing.delete(x.key);
        const card = root.querySelector('.delivery-item[data-key="' + CSS.escape(x.key) + '"]');
        if (card) {
          clearReceiptMark(x.key, card);
          const input = card.querySelector('.delivery-actual');
          input.disabled = false;
          input.value = p.value;
          card.classList.remove('missing');
          card.querySelector('.delivery-state').innerHTML = icon(x.substitution ? 'right-left' : 'check');
          card.querySelector('.delivery-status em').textContent = x.substitution ? 'Swapped' : 'Expected';
        }
      }
      refreshSummary();
    };
    const receipt = document.getElementById('receiptFile');
    const fileDataUrl = (file) =>
      new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(String(fr.result || ''));
        fr.onerror = () => reject(fr.error || new Error('The receipt image could not be read.'));
        fr.readAsDataURL(file);
      });
    const setActual = (key, value, match) => {
      const input = root.querySelector('.delivery-actual[data-key="' + CSS.escape(key) + '"]');
      if (!input || !value) return false;
      const parsed = MW.inventory.parseAmount(value);
      if (!parsed) return false;
      const x = items.find((v) => v.key === key),
        expected = expectedParts(x);
      if (expected.unit !== parsed.unit) return false;
      input.value = parsed.value;
      actual[key] = MW.inventory.formatAmount(parsed);
      missing.delete(key);
      const card = input.closest('.delivery-item');
      if (card) {
        card.classList.remove('missing');
        card.querySelector('.delivery-state').innerHTML = icon(x.substitution ? 'right-left' : 'check');
        if (match) markReceipt(key, card, match);
        else card.querySelector('.delivery-status em').textContent = x.substitution ? 'Swapped' : 'Expected';
      }
      return true;
    };
    const receiptItems = items.map((x) =>
      x.substitution
        ? {
            ...x,
            name: x.substitution.replacementName,
            displayAmount: x.substitution.replacementAmount,
            inventoryAmount: x.substitution.replacementAmount,
          }
        : x,
    );
    receipt.onchange = async () => {
      const file = receipt.files && receipt.files[0],
        host = document.getElementById('receiptPreview');
      host.innerHTML = '';
      if (!file) return;
      const url = URL.createObjectURL(file),
        img = document.createElement('img');
      img.src = url;
      img.alt = 'Receipt preview';
      img.onload = () => URL.revokeObjectURL(url);
      host.appendChild(img);
      const status = document.createElement('div');
      status.className = 'receipt-scan-status';
      status.innerHTML =
        '<span class="loading-spinner"></span><strong>Reading receipt on this device…</strong>';
      host.appendChild(status);
      try {
        const nativeOcr =
          window.Capacitor &&
          window.Capacitor.Plugins &&
          window.Capacitor.Plugins.CapacitorPluginMlKitTextRecognition;
        let result;
        if (nativeOcr && typeof nativeOcr.detectText === 'function') {
          const dataUrl = await fileDataUrl(file),
            base64Image = String(dataUrl).replace(/^data:image\/[^;]+;base64,/i, '');
          result = await nativeOcr.detectText({ base64Image, rotation: 0 });
        } else if (MW.webOcr && typeof MW.webOcr.detectText === 'function') {
          result = await MW.webOcr.detectText(file, (progress) => {
            const pct = Math.round((Number(progress.progress) || 0) * 100);
            if (pct > 0)
              status.innerHTML =
                '<span class="loading-spinner"></span><strong>Reading receipt on this device… ' +
                pct +
                '%</strong>';
          });
        } else
          throw new Error(
            'Receipt text reading is not available in this build. You can still enter the quantities below.',
          );
        const parsed = MW.receipt.parse((result && result.text) || ''),
          matched = MW.receipt.match(receiptItems, parsed);
        let applied = 0;
        for (const m of matched.matches) if (setActual(m.key, m.actualAmount, m)) applied++;
        const review = matched.matches.filter((x) => x.needsReview).length,
          direct = matched.matches.length - review;
        receiptSummary = {
          scannedAt: new Date().toISOString(),
          source: 'on-device-ocr',
          total: Number.isFinite(parsed.total) ? parsed.total : null,
          itemLines: parsed.itemLineCount,
          matched: matched.matches.length,
          directMatches: direct,
          reviewMatches: review,
          unmatchedReceipt: matched.unmatchedReceipt.length,
          matchDetails: matched.matches.map((x) => ({
            key: x.key,
            receiptLabel: x.receiptLabel,
            score: x.score,
            amountBasis: x.amountBasis,
            needsReview: x.needsReview,
          })),
        };
        status.innerHTML =
          '<i class="fa-solid fa-circle-check"></i><div><strong>' +
          applied +
          ' shopping item' +
          (applied === 1 ? '' : 's') +
          ' prefilled</strong><small>' +
          (Number.isFinite(parsed.total) ? 'Receipt total ' + money(parsed.total) + ' · ' : '') +
          direct +
          ' green match' +
          (direct === 1 ? '' : 'es') +
          ' · ' +
          review +
          ' amber check' +
          (review === 1 ? '' : 's') +
          ' · ' +
          matched.unmatchedReceipt.length +
          ' unmatched receipt line' +
          (matched.unmatchedReceipt.length === 1 ? '' : 's') +
          '. Green rows came directly from the receipt. Amber rows used a likely match or known pack size, so check those before saving.</small></div>';
        refreshSummary();
      } catch (error) {
        status.innerHTML =
          '<i class="fa-solid fa-circle-info"></i><div><strong>Receipt kept as a reference</strong><small>' +
          esc((error && error.message) || 'Text could not be read automatically.') +
          '</small></div>';
      }
    };
    document.getElementById('backDelivery').onclick = () => go('shopreview');
    document.getElementById('confirmDelivery').onclick = (e) =>
      withLoading(e.currentTarget, () => {
        MW.delivery.reconcile({
          missingKeys: [...missing],
          actualAmounts: actual,
          receipt: receiptSummary,
        });
        go('shopreview');
      });
    refreshSummary();
    bindNav();
  }

  function dayEditor(dayKey) {
    const st = s();
    const orderedPlan = MW.planner.orderedPlanLocked(st);
    const d = day(dayKey);
    const slot = st.week && st.week.meals.find((x) => x.day === dayKey);
    const r = slot ? recipe(slot.recipeId) : null;
    const dinnerOn = Boolean(slot);
    const lunchOn = (MW.weeks.currentPlanning(st).lunchDays || []).includes(dayKey);
    const lunch = MW.LUNCHES.find((x) => x.id === st.week.lunchId);
    root.innerHTML = shell(
      '<section class="subpage-head"><button class="back-button" id="back">' +
        icon('arrow-left') +
        '</button><div><span class="eyebrow">YOUR WEEK</span><h1>' +
        esc(d.label) +
        '</h1></div></section>' +
        '<section class="day-editor">' +
        '<div class="day-setting"><div><strong>Dinner</strong><small>' +
        (dinnerOn ? (r ? esc(r.title) : 'Planned') : 'No dinner planned') +
        '</small></div><label class="toggle"><input id="dinnerToggle" type="checkbox" ' +
        (dinnerOn ? 'checked' : '') +
        (orderedPlan ? ' disabled' : '') +
        '><span></span></label></div>' +
        (!dinnerOn && !orderedPlan
          ? '<button type="button" class="browse-library" id="chooseDinner">' +
            icon('utensils') +
            '<span><strong>Choose a dinner</strong><small>Browse categories, favourites and your recipes</small></span>' +
            icon('chevron-right') +
            '</button>'
          : '') +
        (dinnerOn && r
          ? '<div class="favourite-card-shell day-favourite-shell"><button class="day-meal-card" id="dayViewRecipe" aria-label="Open ' +
            esc(r.title) +
            '">' +
            recipePhoto(r, 'day-meal-photo', r.title) +
            '<span><strong>' +
            esc(r.title) +
            '</strong><small>' +
            esc(timeText(r)) +
            '</small></span></button>' +
            favouriteButton(r) +
            '</div>' +
            (orderedPlan
              ? ''
              : '<div class="day-meal-actions"><button class="btn secondary" id="changeDinner">Change meal</button><button class="day-random" id="randomDinner">' +
                icon('dice') +
                '<span><strong>Choose one for me</strong><small>Swap ' +
                esc(d.label) +
                ' for another suitable dinner</small></span></button></div>')
          : '') +
        '<div class="day-setting"><div><strong>Lunch</strong><small>' +
        (lunchOn && lunch ? esc(lunch.title) : 'No planned lunch') +
        '</small></div><label class="toggle"><input id="lunchToggle" type="checkbox" ' +
        (lunchOn ? 'checked' : '') +
        (orderedPlan ? ' disabled' : '') +
        '><span></span></label></div>' +
        '</section>' +
        (orderedPlan
          ? '<p class="micro-copy">Your meals are locked because shopping has been ordered.</p>'
          : '<p class="micro-copy">Turn a meal off when you are eating out, using leftovers or simply do not need it planned.</p>'),
      'plan',
    );
    document.getElementById('back').onclick = () => go('week');
    document.getElementById('dinnerToggle').onchange = (e) => {
      MW.planner.toggleDinner(dayKey, e.target.checked);
      samePage(() => dayEditor(dayKey));
    };
    document.getElementById('lunchToggle').onchange = (e) => {
      MW.planner.toggleLunch(dayKey, e.target.checked);
      samePage(() => dayEditor(dayKey));
    };
    const dayViewRecipe = document.getElementById('dayViewRecipe');
    if (dayViewRecipe) dayViewRecipe.onclick = () => go('recipe:' + r.id);
    const chooseDinner = document.getElementById('chooseDinner');
    if (chooseDinner)
      chooseDinner.onclick = () => {
        st.ui.libraryTargetDay = dayKey;
        MW.state.save();
        go('library');
      };
    const change = document.getElementById('changeDinner');
    if (change) change.onclick = () => swap(dayKey);
    const random = document.getElementById('randomDinner');
    if (random)
      random.onclick = (e) =>
        withLoading(e.currentTarget, () => {
          const current = slot && recipe(slot.recipeId);
          const pick = current && MW.planner.randomAlternative(current.id);
          if (pick) MW.planner.replace(dayKey, pick.id);
          samePage(() => dayEditor(dayKey), 'continuity-forward');
        });
    bindNav();
  }

  function libraryRecipeCard(recipeItem, index = 0) {
    return (
      '<article class="favourite-card-shell">' +
      '<button type="button" class="library-card ' +
      (!displayRecipeImage(recipeItem) ? 'text-recipe-card' : '') +
      '" data-id="' +
      esc(recipeItem.id) +
      '">' +
      (recipePhoto(
        recipeItem,
        index < 2 ? 'library-photo library-priority-photo' : 'library-photo',
        recipeItem.title,
      ) ||
        '<div class="recipe-text-cover" aria-hidden="true">' +
          icon('utensils') +
          '<span>' +
          esc(timeText(recipeItem)) +
          '</span></div>') +
      '<span><strong>' +
      esc(recipeItem.title) +
      '</strong>' +
      (recipeSubtitle(recipeItem) ? '<small>' + esc(recipeSubtitle(recipeItem)) + '</small>' : '') +
      '</span></button>' +
      favouriteButton(recipeItem) +
      '</article>'
    );
  }

  async function library() {
    libraryFilterEvents = new AbortController();
    const st = s(),
      target = st.ui.libraryTargetDay || '',
      local = [...MW.RECIPES, ...(target ? [] : MW.LUNCHES)],
      profile = foodProfile();
    const filters = [
      ['all', 'All'],
      ['quick', 'Quick'],
      ['lighter', 'Lighter'],
      ['chicken', 'Chicken'],
      ['beef', 'Beef'],
      ['pork', 'Pork'],
      ['fish', 'Fish'],
      ['vegetarian', 'Vegetarian'],
      ['vegan', 'Vegan'],
      ['pescatarian', 'Pescatarian'],
      ['pasta', 'Pasta'],
      ['rice', 'Rice'],
      ['curry', 'Curry'],
      ['air-fryer', 'Air fryer'],
      ['slow-cooker', 'Slow cooker'],
    ];
    const defaults = [];
    if (['vegetarian', 'vegan', 'pescatarian'].includes(profile.diet)) defaults.push(profile.diet);
    for (const g of profile.goals || [])
      if (['quick', 'lighter'].includes(g) && !defaults.includes(g)) defaults.push(g);
    const profileKey = JSON.stringify({
      diet: profile.diet,
      goals: [...(profile.goals || [])].sort(),
      allergens: [...(profile.allergens || [])].sort(),
      avoid: [...(st.household.restrictions || [])].sort(),
    });
    if (st.ui.libraryFilterProfileKey !== profileKey) {
      st.ui.libraryFilters = defaults.slice();
      st.ui.libraryFilterProfileKey = profileKey;
      st.ui.libraryLimit = 80;
      MW.state.save();
    }
    const active = new Set(Array.isArray(st.ui.libraryFilters) ? st.ui.libraryFilters : defaults),
      locked = new Set(['vegetarian', 'vegan', 'pescatarian'].includes(profile.diet) ? [profile.diet] : []);
    const categoryOptions = MW.planner.mealCategories || [];
    let activeCategory = categoryOptions.some((c) => c.id === st.ui.libraryCategory)
      ? st.ui.libraryCategory
      : '';
    const grouped = new Map(categoryOptions.map((c) => [c.id, []]));
    const coverRecipes = new Map();
    MW.RECIPES.forEach((r) => {
      if (!MW.planner.allowed(r)) return;
      const category = MW.planner.categoryFor(r);
      grouped.get(category)?.push(r);
      if (
        !coverRecipes.has(category) &&
        displayRecipeImage(r) &&
        MW.planner.categoryFor({
          title: r.title,
          ingredients: [],
          tags: [],
        }) === category
      )
        coverRecipes.set(category, r);
    });
    const categoryTiles = categoryOptions
      .filter((c) => grouped.get(c.id)?.length)
      .map((c) => {
        const matching = grouped.get(c.id);
        // Category imagery is a visual reference, not a recipe recommendation.
        // Keep deliberately selected photographs even when equipment settings
        // exclude the photographed recipe from selectable results.
        const curatedCover = c.coverRecipeId
          ? MW.RECIPES.find(
              (r) => r.id === c.coverRecipeId && MW.planner.categoryFor(r) === c.id && displayRecipeImage(r),
            )
          : null;
        const photoRecipe =
          curatedCover || coverRecipes.get(c.id) || matching.find(displayRecipeImage) || matching[0];
        return (
          '<button type="button" class="recipe-category-card" data-recipe-category="' +
          esc(c.id) +
          '" aria-label="Browse ' +
          esc(c.label) +
          '">' +
          '<span class="recipe-category-fallback" aria-hidden="true">' +
          icon(c.icon) +
          '</span>' +
          (displayRecipeImage(photoRecipe)
            ? recipePhoto(photoRecipe, 'recipe-category-photo', c.label)
            : '') +
          '<span class="recipe-category-caption"><strong>' +
          esc(c.label) +
          '</strong>' +
          '<small>' +
          matching.length.toLocaleString('en-GB') +
          ' recipes</small></span></button>'
        );
      });
    let showAllCategories = false;
    let showAllResults = false;
    const hay = (r) =>
      [
        r.title,
        r.subtitle,
        r.category,
        ...(r.tags || []),
        ...(r.requiredEquipment || []),
        ...(r.ingredients || []).map((x) => x[1]),
      ]
        .join(' ')
        .toLowerCase();
    const filterMatch = (r, key) => {
      const t = hay(r);
      if (key === 'quick')
        return Number(r.time || 999) <= 30 || /\bquick\b|speedy|10.minute|20.minute/.test(t);
      if (key === 'lighter')
        return (
          /calorie smart|lighter|under 600|under 650|healthy options/.test(t) ||
          MW.food.analyse(r).vegCount >= 3
        );
      if (key === 'chicken') return /\bchicken\b/.test(t);
      if (key === 'beef') return /\bbeef\b|steak/.test(t);
      if (key === 'pork') return /\bpork\b|sausage|bacon|chorizo|ham\b/.test(t);
      if (key === 'fish') return /salmon|cod\b|prawn|tuna|basa|haddock|pollock|sea bass|fish\b/.test(t);
      if (['vegetarian', 'vegan', 'pescatarian'].includes(key)) return MW.food.dietAllows(r, key);
      if (key === 'pasta')
        return /pasta|spaghetti|linguine|rigatoni|penne|orzo|tortelloni|macaroni|tagliatelle/.test(t);
      if (key === 'rice') return /\brice\b|biryani|pilaf|risotto/.test(t);
      if (key === 'curry') return /curry|korma|tikka|dhal|dal\b|masala/.test(t);
      if (key === 'air-fryer') return /air[ -]?fryer/.test(t);
      if (key === 'slow-cooker') return /slow[ -]?cooker/.test(t);
      return true;
    };
    const savedMatch = () => active.size === defaults.length && defaults.every((x) => active.has(x));
    root.innerHTML = shell(
      (target
        ? '<section class="subpage-head library-head"><button class="back-button" id="libraryBack" aria-label="Back">' +
          icon('arrow-left') +
          '</button><div><h1>Choose a meal</h1></div></section>'
        : '') +
        '<div class="library-search-row"><form class="library-search" id="librarySearchForm"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i><input id="recipeSearch" value="' +
        esc(st.ui.libraryQuery || '') +
        '" aria-label="Search recipes or ingredients" placeholder="Search recipes" inputmode="search" enterkeyhint="search"></form>' +
        '<details class="library-filters" id="libraryFilters"><summary aria-label="Recipe filters">' +
        icon('sliders') +
        '<span id="libraryFilterLabel" aria-hidden="true" hidden></span></summary><div class="library-filter-panel">' +
        '<div class="library-filter-head"><button type="button" id="savedLibraryFilters" aria-label="Reset filters to your saved preferences" class="saved-filter-reset ' +
        (savedMatch() ? 'is-default' : '') +
        '">' +
        icon('rotate-left') +
        ' Reset</button><button type="button" class="library-filter-close" id="closeLibraryFilters" aria-label="Close filters">' +
        icon('xmark') +
        '</button></div><div class="category-tabs library-cats">' +
        filters
          .map(
            ([key, label]) =>
              '<button type="button" class="cat-tab ' +
              ((key === 'all' ? active.size === 0 : active.has(key)) ? 'active ' : '') +
              (locked.has(key) ? 'locked' : '') +
              '" data-cat="' +
              key +
              '" aria-pressed="' +
              (key === 'all' ? active.size === 0 : active.has(key)) +
              '" ' +
              (locked.has(key) ? 'disabled' : '') +
              '>' +
              label +
              '</button>',
          )
          .join('') +
        '</div></div></details></div>' +
        (target
          ? '<div class="library-target">' +
            icon('calendar-day') +
            ' Choosing dinner for <strong>' +
            esc(day(target).label) +
            '</strong><button type="button" class="library-collection-link" id="openMyRecipes">' +
            icon('bookmark') +
            ' My Recipes</button></div>'
          : '') +
        '<div id="recipeCategoryHost"></div><div id="libraryResults"></div>',
      'cook',
      target ? null : { title: 'All Recipes' },
    );
    const resultsHost = document.getElementById('libraryResults'),
      categoryHost = document.getElementById('recipeCategoryHost'),
      search = document.getElementById('recipeSearch');
    const renderResults = () => {
      if (libraryObserver) libraryObserver.disconnect();
      const query = String(search.value || '')
        .trim()
        .toLowerCase();
      st.ui.libraryQuery = search.value;
      st.ui.libraryFilters = [...active];
      st.ui.libraryCategory = activeCategory;
      MW.state.save();
      const onLanding = !activeCategory && !query && savedMatch() && !showAllResults;
      categoryHost.innerHTML = onLanding
        ? '<section class="recipe-category-intro"><h2>What do you fancy?</h2></section>' +
          '<div class="recipe-category-grid">' +
          categoryTiles.slice(0, showAllCategories ? undefined : 6).join('') +
          '</div><div class="recipe-category-actions">' +
          (!showAllCategories && categoryTiles.length > 6
            ? '<button type="button" class="btn secondary recipe-category-action" id="showMoreCategories">' +
              'More categories ' +
              icon('chevron-down') +
              '</button>'
            : '') +
          '<button type="button" class="btn primary recipe-category-action" id="showAllRecipeResults">' +
          'Browse all recipes ' +
          icon('arrow-right') +
          '</button></div>'
        : activeCategory
          ? '<section class="recipe-category-selected"><button type="button" class="btn secondary recipe-category-back" id="allRecipeCategories">' +
            icon('arrow-left') +
            ' All categories</button><h2>' +
            esc(categoryOptions.find((c) => c.id === activeCategory)?.label || 'Recipes') +
            '</h2></section>'
          : '';
      categoryHost.querySelectorAll('[data-recipe-category]').forEach(
        (button) =>
          (button.onclick = () => {
            activeCategory = button.dataset.recipeCategory;
            st.ui.libraryLimit = 80;
            search.value = '';
            active.clear();
            locked.forEach((key) => active.add(key));
            showAllResults = false;
            repaintFilters();
            renderResults();
          }),
      );
      const moreCategories = document.getElementById('showMoreCategories');
      if (moreCategories)
        moreCategories.onclick = () => {
          showAllCategories = true;
          renderResults();
        };
      const showAll = document.getElementById('showAllRecipeResults');
      if (showAll)
        showAll.onclick = () => {
          showAllResults = true;
          renderResults();
        };
      const clearCategory = document.getElementById('allRecipeCategories');
      if (clearCategory)
        clearCategory.onclick = () => {
          activeCategory = '';
          active.clear();
          defaults.forEach((key) => active.add(key));
          st.ui.libraryLimit = 80;
          repaintFilters();
          renderResults();
        };
      const allResults = local.filter((r) => {
        const allowed = MW.planner ? MW.planner.allowed(r) : !MW.food || MW.food.allowed(r, st.foodProfile);
        return (
          allowed &&
          (!activeCategory || (!r.isLunch && MW.planner.categoryFor(r) === activeCategory)) &&
          (!query || hay(r).includes(query)) &&
          [...active].every((key) => filterMatch(r, key))
        );
      });
      const limit = Math.max(80, Number(st.ui.libraryLimit) || 80),
        results = allResults.slice(0, limit);
      resultsHost.innerHTML = onLanding
        ? ''
        : '<div class="visually-hidden" role="status" aria-live="polite">' +
          allResults.length.toLocaleString('en-GB') +
          ' recipes found</div><div class="library-grid">' +
          results.map((r, index) => libraryRecipeCard(r, index)).join('') +
          '</div>' +
          (!results.length
            ? '<div class="empty-state">' +
              icon('magnifying-glass') +
              '<h2>No matches</h2><p>Try another search or filter.</p></div>'
            : '') +
          (results.length < allResults.length
            ? '<button class="refresh-library" id="loadMoreRecipes">' +
              icon('plus') +
              ' Show 80 more</button>'
            : '');
      bindFavouriteButtons(resultsHost);
      resultsHost.querySelectorAll('.library-card').forEach(
        (b) =>
          (b.onclick = () => {
            go('recipe:' + b.dataset.id);
          }),
      );
      const more = document.getElementById('loadMoreRecipes');
      if (more) {
        more.onclick = () => {
          st.ui.libraryLimit = (Number(st.ui.libraryLimit) || 80) + 80;
          MW.state.save();
          renderResults();
        };
        if (typeof IntersectionObserver === 'function') {
          const observer = new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting)) {
                observer.disconnect();
                if (more.isConnected) more.click();
              }
            },
            { rootMargin: '300px' },
          );
          libraryObserver = observer;
          observer.observe(more);
        }
      }
      updateControlNames();
    };
    const repaintFilters = () => {
      root.querySelectorAll('.library-cats .cat-tab').forEach((b) => {
        b.setAttribute(
          'aria-pressed',
          String(b.dataset.cat === 'all' ? active.size === 0 : active.has(b.dataset.cat)),
        );
        b.classList.toggle('active', b.dataset.cat === 'all' ? active.size === 0 : active.has(b.dataset.cat));
      });
      document.getElementById('savedLibraryFilters').classList.toggle('is-default', savedMatch());
      const filterCount = document.getElementById('libraryFilterLabel');
      filterCount.textContent = active.size ? String(active.size) : '';
      filterCount.hidden = !active.size;
      root
        .querySelector('#libraryFilters > summary')
        .setAttribute('aria-label', 'Recipe filters' + (active.size ? ', ' + active.size + ' active' : ''));
    };
    let timer;
    search.addEventListener('input', () => {
      clearTimeout(timer);
      if (search.value.trim()) activeCategory = '';
      st.ui.libraryLimit = 80;
      timer = setTimeout(renderResults, 120);
    });
    document.getElementById('librarySearchForm').addEventListener('submit', (e) => {
      e.preventDefault();
      clearTimeout(timer);
      if (search.value.trim()) activeCategory = '';
      st.ui.libraryLimit = 80;
      renderResults();
      search.focus();
    });
    root.querySelectorAll('.library-cats .cat-tab').forEach(
      (b) =>
        (b.onclick = () => {
          const key = b.dataset.cat;
          if (key === 'all') {
            active.clear();
          } else {
            if (locked.has(key)) return;
            if (active.has(key)) active.delete(key);
            else active.add(key);
          }
          st.ui.libraryLimit = 80;
          repaintFilters();
          renderResults();
        }),
    );
    document.getElementById('savedLibraryFilters').onclick = () => {
      active.clear();
      defaults.forEach((x) => active.add(x));
      st.ui.libraryLimit = 80;
      repaintFilters();
      renderResults();
    };
    const libraryBack = document.getElementById('libraryBack');
    if (libraryBack)
      libraryBack.onclick = () => {
        st.ui.libraryTargetDay = '';
        MW.state.save();
        go(target ? 'day:' + target : 'week', { motion: 'drill-back' });
      };
    repaintFilters();
    renderResults();
    const filtersPanel = document.getElementById('libraryFilters');
    const fitFilters = () => {
      if (!filtersPanel.open) return;
      const panel = filtersPanel.querySelector('.library-filter-panel');
      const anchor = filtersPanel.getBoundingClientRect();
      const viewportBottom =
        (window.visualViewport?.height || innerHeight) + (window.visualViewport?.offsetTop || 0);
      const bottom =
        Math.min(
          viewportBottom,
          root.querySelector('.bottom-nav')?.getBoundingClientRect().top || viewportBottom,
        ) - 12;
      const below = anchor.bottom + 8;
      const top = bottom - below >= 140 ? below : Math.max(8, bottom - 180);
      panel.style.top = top - anchor.top + 'px';
      panel.style.setProperty('--filter-panel-height', Math.max(80, bottom - top) + 'px');
    };
    filtersPanel.addEventListener('toggle', fitFilters);
    const filterListener = {
      signal: libraryFilterEvents.signal,
      passive: true,
    };
    window.addEventListener('resize', fitFilters, filterListener);
    window.addEventListener('scroll', fitFilters, {
      ...filterListener,
      capture: true,
    });
    window.visualViewport?.addEventListener('resize', fitFilters, filterListener);
    document.getElementById('closeLibraryFilters').onclick = () => {
      filtersPanel.open = false;
      filtersPanel.querySelector('summary').focus();
    };
    const closeFilters = (event) => {
      if (!filtersPanel.contains(event.target)) filtersPanel.open = false;
    };
    filtersPanel.closest('.shell').addEventListener('click', closeFilters);
    filtersPanel.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        filtersPanel.open = false;
        filtersPanel.querySelector('summary').focus();
      }
    });
    bindNav();
  }

  function myRecipes() {
    const target = s().ui.libraryTargetDay || '';
    root.innerHTML = shell(
      '<div class="personal-search-row ' +
        (target ? 'with-back' : '') +
        '">' +
        (target
          ? '<button class="back-button" id="personalBack" aria-label="Back to recipe choices">' +
            icon('arrow-left') +
            '</button>'
          : '') +
        '<form class="library-search" id="personalSearchForm">' +
        '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>' +
        '<input id="personalSearch" placeholder="Search saved recipes" aria-label="Search My Recipes" inputmode="search" enterkeyhint="search"></form>' +
        '<button type="button" class="btn primary" id="importRecipe" aria-label="Add a recipe" title="Add a recipe">' +
        icon('plus') +
        '</button></div>' +
        '<div class="personal-sync-row" id="personalSyncRow" hidden>' +
        '<span id="personalSyncStatus" role="status" aria-live="polite"></span>' +
        '<button type="button" class="text-action" id="personalSyncNow">Sync now</button></div>' +
        '<div id="personalResults"></div>',
      'saved',
      { title: 'My Recipes' },
    );
    const host = document.getElementById('personalResults'),
      search = document.getElementById('personalSearch');
    const paint = () => {
      try {
        const own = MW.personalRecipes.all(),
          ownIds = new Set(own.map((r) => r.id)),
          favourites = MW.favourites
            .ids()
            .filter((id) => !ownIds.has(id))
            .map((id) => recipe(id))
            .filter(Boolean),
          query = search.value.trim().toLowerCase(),
          entries = [
            ...own.map((r) => ({ recipe: r, editable: true })),
            ...favourites.map((r) => ({ recipe: r, editable: false })),
          ].filter(
            ({ recipe: r }) =>
              !query ||
              [r.title, ...(r.ingredients || []).map((x) => x[1])].join(' ').toLowerCase().includes(query),
          );
        host.innerHTML = entries.length
          ? '<div class="library-grid">' +
            entries
              .map(({ recipe: r, editable }, index) =>
                editable
                  ? '<article class="personal-card tappable-card" data-card-recipe="' +
                    esc(r.id) +
                    '" tabindex="0" role="link" aria-label="Open ' +
                    esc(r.title) +
                    '"><button class="library-card" data-open="' +
                    esc(r.id) +
                    '">' +
                    recipePhoto(r, 'library-photo', r.title) +
                    '<span><strong>' +
                    esc(r.title) +
                    '</strong><small>' +
                    esc(r.source || 'Your recipe') +
                    '</small></span></button>' +
                    favouriteButton(r) +
                    '<button class="personal-edit" data-edit="' +
                    esc(r.id) +
                    '" aria-label="Edit ' +
                    esc(r.title) +
                    '">' +
                    icon('pen') +
                    ' Edit</button></article>'
                  : libraryRecipeCard(r, index),
              )
              .join('') +
            '</div>'
          : '<section class="empty-state">' +
            icon('heart') +
            '<h2>' +
            (query ? 'No matching recipes' : 'No saved recipes yet') +
            '</h2>' +
            (query ? '' : '<p>Save a favourite or add your own recipe.</p>') +
            '<button class="btn primary" id="browseSavedRecipes">' +
            'Browse All Recipes</button></section>';
        host
          .querySelectorAll('[data-open]')
          .forEach((button) => (button.onclick = () => go('recipe:' + button.dataset.open)));
        host
          .querySelectorAll('.library-card[data-id]')
          .forEach((button) => (button.onclick = () => go('recipe:' + button.dataset.id)));
        const browse = document.getElementById('browseSavedRecipes');
        if (browse) browse.onclick = () => go('recipes');
        bindRecipeCards();
        bindFavouriteButtons(host);
        host
          .querySelectorAll('[data-edit]')
          .forEach(
            (button) => (button.onclick = () => personalEditor(MW.personalRecipes.byId(button.dataset.edit))),
          );
      } catch (error) {
        host.innerHTML = '<p class="operation-error" role="alert">' + esc(error.message) + '</p>';
      }
    };
    document.getElementById('personalSyncNow').onclick = (event) => {
      if (!MW.accounts.status().user || MW.accounts.status().status === 'conflict') return go('account');
      return withLoading(event.currentTarget, async () => {
        await MW.accounts.sync();
        paintPersonalSyncStatus();
      });
    };
    paintPersonalSyncStatus();
    search.oninput = paint;
    document.getElementById('personalSearchForm').onsubmit = (event) => {
      event.preventDefault();
      paint();
    };
    document.getElementById('importRecipe').onclick = () => personalEditor();
    const back = document.getElementById('personalBack');
    if (back) back.onclick = () => go('library', { motion: 'drill-back' });
    paint();
    bindNav();
  }
  function personalEditor(existing) {
    let draft = existing ? JSON.parse(JSON.stringify(existing)) : null;
    root.innerHTML = shell(
      '<section class="subpage-head"><button class="back-button" id="personalEditorBack" aria-label="Back to My Recipes">' +
        icon('arrow-left') +
        '</button><div><span class="eyebrow">MY RECIPES</span><h1>' +
        (existing ? 'Edit recipe' : 'Add a recipe') +
        '</h1></div></section><section class="settings-section personal-import"><form id="recipeLinkForm"><label class="personal-label" for="recipeLink">Recipe link</label><input id="recipeLink" type="url" placeholder="https://…" value="' +
        esc((existing && existing.sourceUrl) || '') +
        '" autocomplete="url"><button class="btn primary" id="readRecipeLink" type="submit">' +
        icon('link') +
        ' Read recipe</button></form><div id="recipeImportStatus" role="status" aria-live="polite"></div><div id="recipeImportChoices"></div></section><form id="personalRecipeForm" class="settings-section personal-form"><label class="personal-label" for="personalTitle">Recipe name</label><input id="personalTitle" required maxlength="180"><div class="personal-meta-fields"><div><label class="personal-label" for="personalServings">Source servings</label><input id="personalServings" type="number" min="1" max="100" inputmode="numeric" placeholder="If listed"></div><div><label class="personal-label" for="personalTime">Total minutes</label><input id="personalTime" type="number" min="1" max="10080" inputmode="numeric" placeholder="If listed"></div></div><label class="personal-label" for="personalIngredients">Ingredients · one per line</label><textarea id="personalIngredients" rows="7" required placeholder="1 onion&#10;400 g chopped tomatoes"></textarea><label class="personal-label" for="personalMethod">Method · one step per line</label><textarea id="personalMethod" rows="9" required placeholder="Peel and chop the onion.&#10;…"></textarea><div id="personalSaveStatus" role="alert"></div><div class="personal-actions"><button type="submit" class="btn primary">Save recipe</button>' +
        (existing
          ? '<button type="button" class="btn secondary" id="deletePersonalRecipe">Delete recipe</button>'
          : '') +
        '</div></form>',
      'saved',
    );
    const fill = (r) => {
      draft = r;
      document.getElementById('personalTitle').value = r.title || '';
      document.getElementById('personalServings').value = r.servings || '';
      document.getElementById('personalTime').value = r.time || '';
      document.getElementById('personalIngredients').value = (
        r.ingredientLines || r.ingredients.map((x) => (x[0] === 'As listed' ? x[1] : x.join(' ')))
      ).join('\n');
      document.getElementById('personalMethod').value = (r.steps || []).join('\n');
    };
    if (draft) fill(draft);
    document.getElementById('personalEditorBack').onclick = () => go('myrecipes');
    document.getElementById('recipeLinkForm').onsubmit = async (e) => {
      e.preventDefault();
      const button = document.getElementById('readRecipeLink'),
        status = document.getElementById('recipeImportStatus'),
        choices = document.getElementById('recipeImportChoices');
      button.disabled = true;
      status.textContent = 'Reading recipe…';
      choices.innerHTML = '';
      try {
        const found = await MW.personalRecipes.importUrl(document.getElementById('recipeLink').value);
        if (found.length === 1) {
          fill({
            ...found[0],
            ...(existing ? { id: existing.id, createdAt: existing.createdAt } : {}),
          });
          status.textContent = 'Recipe loaded. Check it below.';
        } else {
          status.textContent = 'Choose a recipe from this page.';
          choices.innerHTML = found
            .map(
              (r, i) =>
                '<button type="button" class="btn secondary" data-choice="' +
                i +
                '">' +
                esc(r.title) +
                '</button>',
            )
            .join('');
          choices.querySelectorAll('button').forEach(
            (b) =>
              (b.onclick = () => {
                fill({
                  ...found[Number(b.dataset.choice)],
                  ...(existing ? { id: existing.id, createdAt: existing.createdAt } : {}),
                });
                choices.innerHTML = '';
                status.textContent = 'Recipe loaded. Check it below.';
              }),
          );
        }
      } catch (error) {
        status.textContent = error.message || 'The recipe could not be read.';
      } finally {
        button.disabled = false;
      }
    };
    document.getElementById('personalRecipeForm').onsubmit = (e) => {
      e.preventDefault();
      const status = document.getElementById('personalSaveStatus');
      try {
        const lines = document
          .getElementById('personalIngredients')
          .value.split(/\n+/)
          .map((x) => x.trim())
          .filter(Boolean);
        const r = MW.personalRecipes.save({
          ...draft,
          title: document.getElementById('personalTitle').value,
          sourceUrl: document.getElementById('recipeLink').value.trim(),
          servings: document.getElementById('personalServings').value,
          time: document.getElementById('personalTime').value,
          ingredients: lines.map(MW.personalRecipes.splitIngredient),
          ingredientLines: lines,
          steps: document
            .getElementById('personalMethod')
            .value.split(/\n+/)
            .map((x) => x.trim())
            .filter(Boolean),
        });
        go('myrecipes');
      } catch (error) {
        status.innerHTML = '<p class="operation-error">' + esc(error.message) + '</p>';
      }
    };
    const del = document.getElementById('deletePersonalRecipe');
    if (del)
      del.onclick = async () => {
        if (
          !(await confirmAction({
            title: 'Delete this recipe?',
            message: 'This removes ' + existing.title + ' from My Recipes on your synced devices.',
            confirmLabel: 'Delete recipe',
            danger: true,
          }))
        )
          return;
        try {
          MW.personalRecipes.remove(existing.id);
          go('myrecipes');
        } catch (error) {
          document.getElementById('personalSaveStatus').textContent = error.message;
        }
      };
    bindNav();
  }

  function recipes() {
    return library();
  }

  function bindRecipeCards() {
    root.querySelectorAll('[data-card-recipe]').forEach((card) => {
      card.onclick = (e) => {
        if (!e.target.closest('button,a,input,label')) go('recipe:' + card.dataset.cardRecipe);
      };
      card.onkeydown = (e) => {
        if (e.target === card && ['Enter', ' '].includes(e.key)) {
          e.preventDefault();
          go('recipe:' + card.dataset.cardRecipe);
        }
      };
    });
  }
  function history() {
    const st = s(),
      weeks = MW.weeks.all(),
      chosen = weeks.find((w) => w.weekKey === st.ui.weekHistoryKey) || weeks[0];
    st.ui.weekHistoryKey = chosen?.weekKey || '';
    MW.state.save();
    const items = chosen
      ? [
          ...(chosen.meals || []).map((m) => ({
            ...m,
            kind: day(m.day)?.label || 'Dinner',
          })),
          ...(chosen.lunchId ? [{ recipeId: chosen.lunchId, kind: 'Lunch prep' }] : []),
        ]
          .map((m) => ({ ...m, recipe: recipe(m.recipeId) }))
          .filter((m) => m.recipe)
      : [];
    root.innerHTML = shell(
      '<section class="subpage-head"><button class="back-button" id="historyBack" aria-label="Back to this week">' +
        icon('arrow-left') +
        '</button><div><span class="eyebrow">SAVED MEAL PLANS</span><h1>Previous weeks</h1></div></section>' +
        (chosen
          ? '<div class="history-week-picker"><label for="historyWeek">Choose a week</label><span class="select-control"><select id="historyWeek">' +
            weeks
              .map(
                (w) =>
                  '<option value="' +
                  esc(w.weekKey) +
                  '" ' +
                  (w === chosen ? 'selected' : '') +
                  '>' +
                  esc(weekRange(w.weekKey)) +
                  '</option>',
              )
              .join('') +
            '</select>' +
            icon('chevron-down') +
            '</span></div><p class="setting-help">Open a recipe to cook anything you missed.</p><div class="recipe-grid history-recipes">' +
            items
              .map(
                (m) =>
                  '<article class="favourite-card-shell"><button class="recipe-card history-recipe" data-id="' +
                  esc(m.recipeId) +
                  '">' +
                  recipePhoto(m.recipe, 'recipe-card-photo', m.recipe.title) +
                  '<div><span class="meal-day">' +
                  esc(m.kind) +
                  '</span><h2>' +
                  esc(m.recipe.title) +
                  '</h2><small>' +
                  esc(timeText(m.recipe)) +
                  '</small>' +
                  ((chosen.completedRecipes || []).includes(m.recipeId)
                    ? '<em class="history-cooked">' + icon('check') + ' Cooked</em>'
                    : '') +
                  '</div></button>' +
                  favouriteButton(m.recipe) +
                  '</article>',
              )
              .join('') +
            '</div>'
          : '<section class="empty-state">' +
            icon('calendar-days') +
            '<h2>No earlier meal plan yet</h2><p>Your meals will appear here when you start a new week.</p></section>'),
      'cook',
    );
    root.querySelectorAll('.history-recipe').forEach((b) => (b.onclick = () => go('recipe:' + b.dataset.id)));
    const select = document.getElementById('historyWeek');
    if (select)
      select.onchange = () => {
        st.ui.weekHistoryKey = select.value;
        history();
      };
    document.getElementById('historyBack').onclick = () => go('week');
    bindNav();
  }

  function recipeBlocked(r) {
    if (!r.personal && !MW.planner.allowed(r)) {
      const selected = foodProfile().allergens || [];
      const verified =
        r.allergenEvidence &&
        r.allergenEvidence.status === 'verified' &&
        Array.isArray(r.allergenEvidence.reviewedAllergens) &&
        selected.every((id) => r.allergenEvidence.reviewedAllergens.includes(id)) &&
        Array.isArray(r.allergens);
      let reason = 'This recipe does not match your food or equipment settings.';
      if (selected.length && !verified)
        reason = 'This recipe has no verified allergy information for your selection.';
      else if (
        selected.length &&
        (selected.some((id) => r.allergens.includes(id)) || MW.food.allergenHits(r, selected).length)
      )
        reason = 'This recipe lists an allergen you avoid.';
      root.innerHTML = shell(
        '<section class="empty-state recipe-unavailable"><span class="empty-state-icon">' +
          icon('sliders') +
          '</span><h1>Recipe unavailable</h1><p>' +
          esc(reason) +
          '</p><div class="empty-state-actions"><button class="btn primary" id="blockedBack">Back to your week</button><button class="btn secondary" id="blockedSettings">Review settings</button></div></section>',
        'cook',
      );
      document.getElementById('blockedBack').onclick = () => go('week');
      document.getElementById('blockedSettings').onclick = () => go('settings');
      bindNav();
      return true;
    }
    return false;
  }
  function recipeView(id) {
    const r = recipe(id);
    if (!r) return go('recipes');
    if (recipeBlocked(r)) return;
    const st = s();
    const people = MW.preparation.portions(r);
    const factor = r.scaleSafe === false ? 1 : people / (r.servings || 2);
    const mealCost =
      people && !r.personal ? (r.isLunch ? recipeCostLabel(r, people) : recipeCostLabel(r, people)) : '';
    const meta = [
      timeText(r),
      r.scaleSafe === false
        ? r.personal && r.servings
          ? countLabel(r.servings, 'source portion', 'source portions')
          : 'Source quantities'
        : r.isLunch
          ? countLabel(
              people,
              MW.preparation.quantities(r).standalone ? 'portion' : 'planned lunch',
              MW.preparation.quantities(r).standalone ? 'portions' : 'planned lunches',
            )
          : countLabel(people, 'portion', 'portions'),
      mealCost,
    ].filter(Boolean);
    const method = MW.display.method(r);
    const tips = r.isLunch ? [] : tipsForRecipe(r);
    const toolsNeeded = cookingEquipment(r);
    const gathered = gatheredIngredients(r);
    const targetDay = st.ui.libraryTargetDay || '';
    const selectedAllergens = (st.foodProfile && st.foodProfile.allergens) || [];
    const personalWarning =
      r.personal && !MW.planner.allowed(r)
        ? '<details class="allergy-guidance personal-recipe-warning"><summary>' +
          icon('circle-info') +
          '<span>Check this recipe for your needs</span>' +
          icon('chevron-down') +
          '</summary><p>' +
          esc(
            selectedAllergens.length
              ? 'Allergy information has not been verified. Check ingredients, product labels and cross-contamination warnings.'
              : 'This recipe may not match your food preferences or available equipment.',
          ) +
          '</p></details>'
        : '';
    root.innerHTML = shell(
      '<section class="recipe-hero ' +
        (r.isLunch ? 'lunch-recipe-hero ' : '') +
        (!displayRecipeImage(r) ? 'text-only' : '') +
        '">' +
        recipePhoto(r, 'recipe-hero-photo', r.title) +
        favouriteButton(r, 'on-hero') +
        '<div class="recipe-hero-overlay"><button class="back-on-photo" id="back">' +
        icon('arrow-left') +
        '</button><div><span class="eyebrow light">' +
        esc(r.personal ? 'MY RECIPES' : r.online ? 'ONLINE RECIPE' : 'MY WEEK RECIPE') +
        '</span><h1>' +
        esc(r.title) +
        '</h1>' +
        (recipeSubtitle(r) ? '<p>' + esc(recipeSubtitle(r)) + '</p>' : '') +
        '<div class="hero-meta">' +
        meta.map((x) => '<span>' + esc(x) + '</span>').join('') +
        '</div></div></div></section>' +
        (r.isLunch
          ? (() => {
              const q = MW.preparation.quantities(r),
                plan = MW.weeks.cookingWeek(st)?.planning || MW.weeks.planning(st),
                days = (plan.lunchDays || []).length,
                eaters = Math.max(1, Number(plan.lunchPeople) || 1),
                equation =
                  days +
                  ' lunch day' +
                  (days === 1 ? '' : 's') +
                  ' × ' +
                  eaters +
                  ' ' +
                  (eaters === 1 ? 'person' : 'people') +
                  ' = ' +
                  q.planned +
                  ' ' +
                  (q.planned === 1 ? 'lunch' : 'lunches');
              if (q.standalone) return '';
              return (
                '<section class="preparation-note lunch-plan-note lunch-plan-compact"><span class="eyebrow">YOUR LUNCH PLAN · PREP AT HOME</span><h2>' +
                q.planned +
                ' ' +
                (q.planned === 1 ? 'lunch' : 'lunches') +
                ' this week</h2><div class="lunch-plan-equation">' +
                esc(equation) +
                '</div></section>'
              );
            })()
          : '') +
        (targetDay
          ? '<section class="recipe-plan-choice"><button class="btn primary" id="chooseRecipeForDay" ' +
            (!MW.planner.allowed(r) || MW.planner.orderedPlanLocked(st) ? 'disabled' : '') +
            '>Use for ' +
            esc(day(targetDay).label) +
            '</button><p class="recipe-add-feedback" id="recipeAddFeedback" role="status"></p></section>'
          : !r.isLunch
            ? '<section class="recipe-plan-choice"><button type="button" class="btn primary" id="addRecipeToWeek" ' +
              (!MW.planner.allowed(r) || MW.planner.orderedPlanLocked(st) ? 'disabled' : '') +
              '>' +
              icon('calendar-plus') +
              ' Add to my week</button>' +
              '<div class="recipe-day-picker" id="recipeDayPicker" hidden>' +
              '<p>Which day would you like this for?</p><div class="recipe-day-options">' +
              MW.DAYS.map((d) => {
                const existing = (st.week?.meals || []).find((m) => m.day === d.key);
                const elsewhere = (st.week?.meals || []).some((m) => m.day !== d.key && m.recipeId === r.id);
                return (
                  '<button type="button" data-add-day="' +
                  d.key +
                  '" ' +
                  (elsewhere ? 'disabled ' : '') +
                  '>' +
                  esc(d.label) +
                  (existing ? '<small>Change dinner</small>' : '<small>Add dinner</small>') +
                  '</button>'
                );
              }).join('') +
              '</div><p class="recipe-add-feedback" id="recipeAddFeedback" role="status"></p></div></section>'
            : '') +
        '<button class="start-cooking" id="startCooking" ' +
        (r.isLunch && !people ? 'disabled' : '') +
        '>' +
        icon('play') +
        '<span><strong>' +
        (r.isLunch ? 'Prep at home step by step' : 'Cook step by step') +
        '</strong></span><i class="fa-solid fa-chevron-right"></i></button>' +
        (MW.planner.doubleProteinPortion(r)
          ? '<div class="source-note double-portion-note">' +
            icon('circle-info') +
            '<span>Double portion recipe: this published protein quantity is larger than usual. Choose another recipe for a lighter serving.</span></div>'
          : '') +
        (MW.planner.sourceReviewHold(r)
          ? '<div class="source-note source-review-note" role="note">' +
            icon('circle-exclamation') +
            '<span>This published method or pack quantity needs checking. Confirm the ingredient packaging and supplier cooking instructions before making this recipe.</span></div>'
          : '') +
        (r.online
          ? '<div class="source-note">' +
            icon('circle-info') +
            '<span>Recipe from ' +
            esc(r.source || 'online source') +
            '. Ingredient quantities are kept as published.</span></div>'
          : '') +
        (!r.online && r.sourcedCatalogue && r.sourceUrl
          ? '<a class="photo-credit" href="' +
            esc(r.sourceUrl) +
            '" target="_blank" rel="noopener">Recipe source · ' +
            esc(r.source || 'Published recipe') +
            '</a>'
          : !r.online && r.imageSource && displayRecipeImage(r)
            ? '<a class="photo-credit" href="' +
              esc(r.imageSource) +
              '" target="_blank" rel="noopener">Photo source · ' +
              esc(r.imageLicense || 'Source') +
              '</a>'
            : '') +
        (MW.equipment && MW.equipment.requirements(r).length
          ? '<div class="equipment-note">' +
            icon('utensils') +
            '<span>Requires ' +
            esc(MW.equipment.requirements(r).map(MW.equipment.label).join(', ')) +
            '.</span></div>'
          : '') +
        personalWarning +
        (selectedAllergens.length && !r.personal
          ? '<details class="allergy-guidance"><summary>' +
            icon('circle-info') +
            '<span>Check ingredient labels</span>' +
            icon('chevron-down') +
            '</summary><p>Filters use the recipe source’s allergen records. Recipes without verified records are excluded. Always check product labels and cross-contamination warnings.</p></details>'
          : '') +
        '<section class="recipe-section ingredients-section"><div class="section-title"><div><h2>What you need</h2></div></div>' +
        r.ingredients
          .map((x, ingredientIndex) => {
            const practical = practicalQuantity(r, ingredientIndex, factor),
              planned = practical
                ? practical.amount
                : MW.preparation && MW.preparation.scaleAmount
                  ? MW.preparation.scaleAmount(r, x[0], x[1], factor)
                  : r.scaleSafe === false
                    ? x[0]
                    : MW.shopping.scaleAmount(x[0], factor),
              shown = substitutedIngredient(x[1], planned),
              approximate = !shown.substitution && Boolean(practical && practical.approximate),
              stocked = MW.inventory && MW.inventory.covers(shown.name, shown.amount),
              label = ingredientName(shown.name),
              checked = Boolean(gathered[String(ingredientIndex)]),
              subNote = shown.substitution
                ? '<small class="ingredient-substitution-note">' +
                  icon('right-left') +
                  ' Instead of ' +
                  esc(ingredientName(shown.originalName)) +
                  ' · recipe calls for ' +
                  esc(displayAmount(shown.originalAmount)) +
                  (shown.comparable ? '' : ' · quantity comparison needs judgement') +
                  '</small>'
                : '';
            return (
              '<div class="ingredient-row ' +
              (stocked ? 'from-cupboard ' : '') +
              (shown.substitution ? 'has-substitution ' : '') +
              (checked ? 'is-gathered' : '') +
              '">' +
              gatherToggleButton(r, ingredientIndex, label, checked) +
              '<span>' +
              esc(label) +
              (stocked ? '<small>In your cupboard</small>' : '') +
              subNote +
              '</span><strong>' +
              esc(cookingAmount(shown.amount, approximate)) +
              '</strong><button type="button" class="ingredient-more" data-ingredient="' +
              esc(x[1]) +
              '" aria-label="More options for ' +
              esc(ingredientName(x[1])) +
              '">' +
              icon('ellipsis-vertical') +
              '</button></div>'
            );
          })
          .join('') +
        '</section>' +
        '<section class="recipe-section equipment-section"><div class="section-title"><div><h2>Equipment</h2></div></div><div class="cook-equipment-list">' +
        toolsNeeded.map((x) => '<span>' + icon('check') + esc(x) + '</span>').join('') +
        '</div></section>' +
        preparationGuidance(method, r, factor, people) +
        '<section class="recipe-section method-section"><div class="section-title"><div><h2>Method</h2></div></div><div class="steps">' +
        method.steps
          .map(({ text: x, sourceIndex }, i) => {
            const used = stepIngredients(r, x, factor, sourceIndex);
            return (
              '<div class="step"><span>' +
              (i + 1) +
              '</span><div><p>' +
              esc(displayInstruction(x, r, factor, people)) +
              '</p>' +
              (used.length
                ? '<div class="step-amounts">' +
                  used
                    .map((v) => {
                      const shown = substitutedIngredient(v.name, v.amount),
                        approximate = !shown.substitution && Boolean(v.practicalApproximate);
                      return (
                        '<em>' +
                        esc(cookingAmount(shown.amount, approximate)) +
                        ' ' +
                        esc(ingredientName(shown.name)) +
                        (shown.substitution ? ' ' + icon('right-left') : '') +
                        '</em>'
                      );
                    })
                    .join('') +
                  '</div>'
                : '') +
              '</div></div>'
            );
          })
          .join('') +
        '</div></section>' +
        (tips.length
          ? '<section class="recipe-section tips-section"><div class="section-title"><div><span class="eyebrow">HELPFUL</span><h2>Tips & tricks</h2></div></div>' +
            tips
              .map((t) => '<div class="tip-row">' + icon('lightbulb') + '<span>' + esc(t) + '</span></div>')
              .join('') +
            '</section>'
          : ''),
      'cook',
    );
    document.getElementById('back').onclick = () => {
      if (!window.MyWeekAndroidBack()) go('recipes', { motion: 'drill-back' });
    };
    bindIngredientActions(root);
    const chooseRecipe = document.getElementById('chooseRecipeForDay');
    if (chooseRecipe)
      chooseRecipe.onclick = () => {
        if (MW.planner.chooseForDay(targetDay, r.id)) {
          s().ui.libraryTargetDay = '';
          MW.state.save();
          go('day:' + targetDay);
        } else {
          document.getElementById('recipeAddFeedback').textContent =
            'This recipe is already planned for another day or does not match your food settings.';
        }
      };
    const addRecipe = document.getElementById('addRecipeToWeek');
    if (addRecipe)
      addRecipe.onclick = () => {
        const picker = document.getElementById('recipeDayPicker');
        picker.hidden = !picker.hidden;
        addRecipe.setAttribute('aria-expanded', String(!picker.hidden));
      };
    root.querySelectorAll('[data-add-day]').forEach(
      (button) =>
        (button.onclick = () => {
          if (MW.planner.chooseForDay(button.dataset.addDay, r.id)) {
            s().ui.libraryTargetDay = '';
            MW.state.save();
            go('week');
          } else {
            const feedback = document.getElementById('recipeAddFeedback');
            if (feedback)
              feedback.textContent =
                'Choose another day or review your food preferences before adding this recipe.';
          }
        }),
    );
    document.getElementById('startCooking').onclick = () => {
      MW.preparation.begin(r, people);
      // Ingredients, equipment and gathering ticks already appear above.
      // Begin with the first real cooking instruction, not a second checklist.
      const first = MW.display.method(r).steps[0];
      go(first ? 'cookstep:' + r.id + ':' + first.sourceIndex : 'recipe:' + r.id);
    };
    bindNav();
  }

  function preparationGuidance(method, r, factor, people) {
    return method.preparation.length
      ? '<section class="preparation-guidance"><h2>Before cooking</h2>' +
          method.preparation
            .map((text) => '<p>' + esc(displayInstruction(text, r, factor, people)) + '</p>')
            .join('') +
          '</section>'
      : '';
  }

  function cookPrep(id) {
    const r = recipe(id);
    if (!r) return go('recipes');
    if (recipeBlocked(r)) return;
    if (!MW.preparation.portions(r)) return go('recipe:' + id);
    MW.preparation.begin(r, MW.preparation.portions(r));
    const st = s();
    const people = MW.preparation.portions(r);
    const factor = r.scaleSafe === false ? 1 : people / (r.servings || 2);
    const ingredients = prepIngredients(r, factor);
    const equipment = cookingEquipment(r);
    const gathered = gatheredIngredients(r);
    root.innerHTML =
      '<main class="cook-screen cook-prep-screen">' +
      '<header class="cook-topbar">' +
      '<button class="cook-close" id="closePrep" aria-label="Pause cooking">' +
      icon('xmark') +
      '</button>' +
      '<div class="cook-title"><span>Before you start</span><strong>' +
      esc(r.title) +
      '</strong></div>' +
      '<div class="cook-header-tools"><span class="cook-count prep-count">' +
      icon('list-check') +
      '</span>' +
      keepAwakeHeader() +
      '</div>' +
      '</header>' +
      '<section class="cook-prep-scroll">' +
      '<article class="cook-prep-intro">' +
      '<h1>Get ready to cook</h1>' +
      '</article>' +
      '<section class="cook-prep-card">' +
      '<div class="cook-prep-heading">' +
      icon('basket-shopping') +
      '<div><strong>Ingredients</strong></div></div>' +
      '<div class="cook-prep-list">' +
      ingredients
        .map((v, ingredientIndex) => {
          const label = ingredientName(v.name),
            checked = Boolean(gathered[String(ingredientIndex)]);
          return (
            '<button type="button" class="cook-prep-check ' +
            (v.substitution ? 'has-substitution ' : '') +
            (checked ? 'is-gathered is-checked' : '') +
            '" data-recipe-id="' +
            esc(String(r.id)) +
            '" data-gather-index="' +
            ingredientIndex +
            '" data-gather-label="' +
            esc(label) +
            '" aria-pressed="' +
            checked +
            '" aria-label="' +
            (checked ? 'Mark ' + esc(label) + ' not gathered' : 'Mark ' + esc(label) + ' gathered') +
            '"><span class="cook-prep-checkmark">' +
            icon('check') +
            '</span><span class="cook-prep-name">' +
            esc(label) +
            (v.substitution
              ? '<small>' +
                icon('right-left') +
                ' Instead of ' +
                esc(ingredientName(v.originalName)) +
                '</small>'
              : '') +
            '</span><strong>' +
            esc(cookingAmount(v.amount, v.practicalApproximate)) +
            '</strong></button>'
          );
        })
        .join('') +
      '</div>' +
      '</section>' +
      '<section class="cook-prep-card">' +
      '<div class="cook-prep-heading">' +
      icon('utensils') +
      '<div><strong>Equipment</strong></div></div>' +
      '<div class="cook-equipment-list">' +
      equipment.map((x) => '<span>' + icon('check') + esc(x) + '</span>').join('') +
      '</div>' +
      '</section>' +
      preparationGuidance(MW.display.method(r), r, factor, people) +
      (r.isLunch
        ? (() => {
            const q = MW.preparation.quantities(r),
              plan = MW.weeks.cookingWeek(st)?.planning || MW.weeks.planning(st),
              days = (plan.lunchDays || []).length,
              eaters = Math.max(1, Number(plan.lunchPeople) || 1),
              equation =
                days +
                ' lunch day' +
                (days === 1 ? '' : 's') +
                ' × ' +
                eaters +
                ' ' +
                (eaters === 1 ? 'person' : 'people') +
                ' = ' +
                q.planned +
                ' ' +
                (q.planned === 1 ? 'lunch' : 'lunches');
            if (q.standalone)
              return (
                '<section class="preparation-note lunch-plan-note"><span class="eyebrow">LUNCH PREP</span><h2>' +
                people +
                ' ' +
                (people === 1 ? 'portion' : 'portions') +
                ' to prepare</h2><details class="lunch-storage-note"><summary>Storage & reheating</summary><p>' +
                esc(
                  r.storageNote || 'Keep prepared food chilled and follow the recipe’s storage instructions.',
                ) +
                '</p>' +
                (r.restText ? '<p>' + esc(r.restText) + '</p>' : '') +
                '</details></section>'
              );
            return (
              '<section class="preparation-note lunch-plan-note lunch-plan-compact"><span class="eyebrow">WEEKLY LUNCH PREP · AT HOME</span><h2>' +
              people +
              ' ' +
              (people === 1 ? 'lunch' : 'lunches') +
              ' to prepare</h2><div class="lunch-plan-equation">' +
              esc(equation) +
              '</div>' +
              (q.prepared
                ? '<p class="lunch-plan-summary">' +
                  q.prepared +
                  ' already prepared · ' +
                  q.remaining +
                  ' remaining</p>'
                : '') +
              '<details class="lunch-storage-note"><summary>Workday storage & reheating</summary><p>' +
              esc(r.storageNote) +
              '</p>' +
              (r.restText ? '<p>' + esc(r.restText) + '</p>' : '') +
              '</details></section>'
            );
          })()
        : '') +
      '<button type="button" class="text-action cancel-cooking" id="cancelCooking">Cancel cooking</button>' +
      '</section>' +
      '<nav class="cook-controls prep-controls" aria-label="Start cooking">' +
      '<button class="cook-control secondary" id="backToRecipe">' +
      icon('arrow-left') +
      '<span>Recipe</span></button>' +
      '<button class="cook-control primary" id="beginSteps"><span>Start Step 1</span>' +
      icon('arrow-right') +
      '</button>' +
      '</nav>' +
      globalNav('cook') +
      '</main>';
    document.body.classList.add('cooking-active');
    document.getElementById('cancelCooking').onclick = () => {
      MW.preparation.cancel(r);
      leaveCookingFlow('recipe:' + id);
    };
    document.getElementById('closePrep').onclick = () => leaveCookingFlow('recipe:' + id);
    document.getElementById('backToRecipe').onclick = () => leaveCookingFlow('recipe:' + id);
    document.getElementById('beginSteps').onclick = () => go('cookstep:' + id + ':0');
    bindNav();
    requestAnimationFrame(() => warmCookingPhotos(r, MW.display.method(r).steps.slice(0, 2)));
  }

  function guidedStepTitle(caption, instruction) {
    const clean = (value) =>
      String(value || '')
        .replace(/[*#]/g, '')
        .replace(/\[(s|es)\]/gi, '$1')
        .replace(/\([^)]*\)/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    const supplied = clean(caption)
      .replace(/^(?:step|instruction)\s*\d+(?:\s*(?:of|\/)\s*\d+)?\s*[:.\-]?\s*/i, '')
      .replace(/[.!?:]+$/, '')
      .trim();
    const generic =
      /^(?:get started|get prepping|get prepped|get chopping|get frying|get baking|prep time|finish the prep|preparation|method|all together now|all together|finishing touches|add the flavour|dinner's ready|serve up)$/i;
    // A caption names the stage; the complete method stays in the instructions.
    if (
      /^(?:prepare|preheat|heat|cook|roast|bake|fry|brown|sear|simmer|boil|mix|combine|make|assemble|serve|finish|coat|layer|add|stir|whisk|blend|dress|toast|fluff|mash|knead|roll|shape|rest|cool|rinse|drain|soak|cover|chill|season|wrap|melt)\b/i.test(
        supplied,
      ) &&
      supplied &&
      supplied.length <= 36 &&
      supplied.split(/\s+/).length <= 5 &&
      !generic.test(supplied) &&
      !/^(?:peel|chop|dice|slice|cut|grate|crush)\b/i.test(supplied)
    )
      return supplied;
    const text = clean(instruction || caption),
      match =
        /\b(preheat|heat|boil|bring|prepare|peel|chop|dice|slice|cut|grate|crush|halve|prick|pat|wash|zest|squeeze|separate|coat|layer|top|sprinkle|dress|shred|pull|melt|warm|wrap|cover|chill|rest|put|transfer|return|share|drain|rinse|mix|combine|whisk|stir|add|cook|roast|bake|fry|brown|sear|simmer|blend|blitz|assemble|divide|serve|toss|season|spread|fluff|mash|toast|pour|place|pop|remove)\b/i.exec(
          text,
        );
    if (/^Use this time to/i.test(text) && /clear up|set the table|cup of tea/i.test(text))
      return 'While it cooks';
    if (!match) return 'Follow the method';
    const verb = match[1].toLowerCase(),
      action = text.slice(match.index).split(/[.!?;]/)[0];
    if (/^(?:heat|preheat)$/.test(verb)) {
      const equipment = /\b(oven|pan|pot|saucepan)\b/i.exec(action);
      if (equipment) return equipment[1].toLowerCase() === 'oven' ? 'Preheat the oven' : 'Heat the pan';
      if (verb === 'preheat') return 'Preheat the oven';
    }
    if (/^(?:heat|pop|return)$/.test(verb) && /\b(?:pan|pot|saucepan|heat)\b/i.test(action))
      return 'Heat the pan';
    if (/^wash\s+(?:(?:your|the)\s+)?hands\b/i.test(action)) return 'Wash your hands';
    if (
      /^(?:wash|rinse)\s+(?:(?:your|the|a)\s+)?(?:pan|knife|chopping board|cutting board|equipment)\b/i.test(
        action,
      )
    )
      return 'Clean the equipment';
    if (verb === 'boil' && /\bkettle\b/i.test(action)) return 'Boil the kettle';
    if (verb === 'bring' && /\bwater\b/i.test(action)) return 'Boil the water';
    if (
      verb === 'serve' ||
      (/^(?:divide|share)$/.test(verb) && /\b(?:plates?|serving bowls?|serve)\b/i.test(action))
    )
      return 'Assemble and serve';
    if (verb === 'assemble' && /\blasagne\b/i.test(action)) return 'Assemble the lasagne';
    if (verb === 'put' && /\boven\b/i.test(action)) return 'Cook in the oven';
    if (verb === 'layer' && /\blasagne\b/i.test(action)) return 'Assemble the lasagne';
    if (verb === 'transfer' && /\bshred\b/i.test(action) && /\bchicken\b/i.test(action))
      return 'Shred the chicken';
    const vegetables =
      /\b(?:onions?|garlic|carrots?|courgettes?|zucchini|aubergines?|eggplants?|tomatoes?|peppers?|leeks?|mushrooms?|broccoli|cauliflower|cabbage|kale|spinach|cucumbers?|lettuce|celery|potatoes?|ginger|vegetables?)\b/i;
    const prep = /^(?:prepare|peel|chop|dice|slice|cut|grate|crush|halve|prick)$/.test(verb);
    const protein = /\b(chicken|beef|pork|lamb|fish|salmon|tofu|halloumi)\b/i.exec(action);
    if (prep && vegetables.test(action))
      return protein ? 'Prepare the ingredients' : 'Prepare the vegetables';
    const targets = [
      ['pasta', /\bpasta\b/i],
      ['rice', /\brice\b/i],
      ['noodles', /\bnoodles?\b/i],
      ['sauce', /\bsauce\b/i],
      ['dressing', /\bdressing\b/i],
      ['filling', /\bfilling\b/i],
      ['chicken', /\bchicken\b/i],
      ['beef', /\bbeef\b/i],
      ['pork', /\bpork\b/i],
      ['lamb', /\blamb\b/i],
      ['fish', /\b(?:fish|salmon|cod|haddock|prawns?|tuna)\b/i],
      ['potatoes', /\bpotatoes?\b/i],
      ['beans', /\bbeans?\b/i],
      ['lentils', /\blentils?\b/i],
      ['tofu', /\btofu\b/i],
      ['eggs', /\beggs?\b/i],
      ['bread', /\b(?:bread|flatbreads?|ciabattas?|naans?|tortillas?)\b/i],
      ['lemon', /\blemons?\b/i],
      ['lime', /\blimes?\b/i],
      ['butter', /\bbutter\b/i],
      ['dough', /\bdough\b/i],
      ['batter', /\bbatter\b/i],
      ['soup', /\bsoup\b/i],
      ['stock', /\bstock\b/i],
      ['herbs', /\b(?:herbs?|parsley|coriander|basil|mint)\b/i],
      ['cheese', /\b(?:cheese|feta|halloumi|cheddar|parmesan)\b/i],
      ['salad', /\b(?:salad|lettuce)\b/i],
      ['couscous', /\bcouscous\b/i],
      ['bulgur', /\bbulgur\b/i],
      ['quinoa', /\bquinoa\b/i],
      ['oats', /\boats\b/i],
      ['spices', /\bspices?\b/i],
      ['bacon', /\bbacon\b/i],
      ['tomatoes', /\btomatoes?\b/i],
      ['vegetables', vegetables],
    ];
    const target = targets
      .map(([label, pattern]) => ({ label, index: action.search(pattern) }))
      .filter((x) => x.index >= 0)
      .sort((a, b) => a.index - b.index)[0];
    const labels = {
      prepare: 'Prepare',
      peel: 'Prepare',
      chop: 'Prepare',
      dice: 'Prepare',
      slice: 'Prepare',
      cut: 'Prepare',
      grate: 'Prepare',
      crush: 'Prepare',
      halve: 'Prepare',
      prick: 'Prepare',
      pat: 'Dry',
      top: 'Finish',
      pull: 'Shred',
      layer: 'Assemble',
      return: 'Cook',
      bring: 'Heat',
      stir: 'Mix',
      blitz: 'Blend',
      place: 'Add',
      pop: 'Add',
    };
    const label = labels[verb] || verb.charAt(0).toUpperCase() + verb.slice(1);
    if (target) return label + ' the ' + target.label;
    const fallback = {
      coat: 'Coat the ingredients',
      cover: 'Cover the dish',
      transfer: 'Transfer the ingredients',
      wash: 'Wash the ingredients',
      zest: 'Prepare the citrus',
      separate: 'Separate the eggs',
      top: 'Finish the dish',
      boil: 'Boil the water',
      heat: 'Heat the pan',
      mix: 'Mix the ingredients',
      combine: 'Combine the ingredients',
      whisk: 'Whisk the mixture',
      stir: 'Stir the mixture',
      add: 'Combine the ingredients',
      place: 'Assemble the dish',
      pop: 'Assemble the dish',
      remove: 'Finish the cooking',
      spread: 'Assemble the dish',
      fluff: 'Fluff the grains',
      season: 'Season the dish',
      pour: 'Add the liquid',
      mash: 'Mash the ingredients',
      blend: 'Blend the mixture',
      blitz: 'Blend the mixture',
    };
    return fallback[verb] || label + ' the ingredients';
  }

  function cookStep(id, index) {
    const r = recipe(id);
    if (!r) return go('recipes');
    if (recipeBlocked(r)) return;
    const st = s();
    const active = MW.weeks.cookingWeek(st) && MW.weeks.cookingWeek(st).preparation;
    // An expired deep link must reopen the recipe instead of presenting a
    // second ingredients/equipment screen or silently starting new portions.
    if (!active || active.recipeId !== id || active.finished) return go('recipe:' + id);
    const method = MW.display.method(r);
    const steps = method.steps;
    if (!steps.length) return go('recipe:' + id);
    // Saved routes use the source index, so removing a preparation introduction
    // cannot advance an existing cooking session to a different instruction.
    const sourcePosition = steps.findIndex((step) => step.sourceIndex === index);
    index = sourcePosition < 0 ? 0 : sourcePosition;

    const people = MW.preparation.portions(r);
    const factor = r.scaleSafe === false ? 1 : people / (r.servings || 2);
    const { text: currentStep, sourceIndex } = steps[index];
    const used = stepIngredients(r, currentStep, factor, sourceIndex);
    const stepSwapNotes = stepSubstitutionNotes(r, currentStep, sourceIndex);
    const stepMeta = (r && Array.isArray(r.sourceStepImages) && r.sourceStepImages[sourceIndex]) || null;
    const exactStep = (stepMeta && stepMeta.src) || '';
    const originalStep = (stepMeta && stepMeta.originalSrc) || '';
    const localStep =
      (r &&
        MW.sourcedImageMap &&
        MW.sourcedImageMap.steps &&
        MW.sourcedImageMap.steps[r.id] &&
        MW.sourcedImageMap.steps[r.id][sourceIndex]) ||
      '';
    const safeStepFallback =
      MW.cookingVisuals && MW.cookingVisuals.fallbackForStep
        ? MW.cookingVisuals.fallbackForStep(currentStep, sourceIndex, r)
        : null;
    const stepCandidates = [
      ...new Set(
        [
          localStep,
          helloFreshMirror(exactStep, 900),
          exactStep,
          helloFreshMirror(originalStep, 900),
          originalStep,
          safeStepFallback && safeStepFallback.src,
        ].filter(Boolean),
      ),
    ];
    const stepTitle = guidedStepTitle(stepMeta && stepMeta.caption, currentStep);
    const displayedStep = displayInstruction(currentStep, r, factor, people);
    const instructionParts = MW.display.splitInstructionActions(displayedStep);
    const rawFacts = [
      ...(String(currentStep).match(/\b\d{2,3}°C(?:\/\d{2,3}°C fan)?(?:\/gas mark \d+)?/gi) || []),
      ...(String(currentStep).match(/\b\d+(?:-\d+)?\s*(?:mins?|minutes?|hours?|hrs?|seconds?|secs?)\b/gi) ||
        []),
      ...(String(currentStep).match(/\b\d+(?:\.\d+)?\s*(?:cm|mm)\b/gi) || []),
    ].map((x) =>
      x
        .replace(/(\d)(cm|mm)\b/gi, '$1 $2')
        .replace(/\s+/g, ' ')
        .trim(),
    );
    const stepFacts = [...new Set(rawFacts.map((x) => x.toLowerCase()))]
      .map((x) => rawFacts.find((y) => y.toLowerCase() === x))
      .slice(0, 4);
    const pct = Math.round(((index + 1) / steps.length) * 100);
    const last = index === steps.length - 1;
    const tip = tipForStep(r, currentStep);

    root.innerHTML =
      '<main class="cook-screen">' +
      '<header class="cook-topbar">' +
      '<button class="cook-close" id="closeCook" aria-label="Pause cooking">' +
      icon('xmark') +
      '</button>' +
      '<div class="cook-title"><strong>' +
      esc(r.title) +
      '</strong></div>' +
      '<div class="cook-header-tools"><span class="cook-count" aria-label="Step ' +
      (index + 1) +
      ' of ' +
      steps.length +
      '">' +
      (index + 1) +
      '/' +
      steps.length +
      '</span>' +
      keepAwakeHeader() +
      '</div>' +
      '</header>' +
      '<div class="cook-progress-track" aria-hidden="true"><span style="width:' +
      pct +
      '%"></span></div>' +
      '<section class="cook-scroll ' +
      (stepCandidates.length ? 'has-visual' : 'no-visual') +
      '" id="cookScroll">' +
      '<article class="cook-step-summary">' +
      '<h1>' +
      esc(stepTitle) +
      '</h1>' +
      (stepFacts.length
        ? '<div class="cook-step-facts">' +
          stepFacts.map((x) => '<span>' + esc(x) + '</span>').join('') +
          '</div>'
        : '') +
      '</article>' +
      (stepCandidates.length
        ? '<aside class="cook-visual-panel">' +
          photo(stepCandidates[0], 'cook-photo', stepTitle, stepCandidates.slice(1)) +
          '</aside>'
        : '') +
      '<article class="cook-instruction"><div class="cook-instruction-scroll" tabindex="0" aria-label="Cooking instructions">' +
      (stepSwapNotes.length
        ? '<div class="cook-substitution-banner">' +
          icon('right-left') +
          '<div><strong>Your shop swap applies here</strong>' +
          stepSwapNotes
            .map(
              (x) =>
                '<small>Use ' +
                esc(ingredientName(x.replacementName)) +
                ' instead of ' +
                esc(ingredientName(x.originalName)) +
                '.</small>',
            )
            .join('') +
          '</div></div>'
        : '') +
      (index === 0 && method.preparation.length
        ? '<details class="cook-before-note"><summary>Preparation notes ' +
          icon('chevron-down') +
          '</summary>' +
          method.preparation
            .map((note) => '<p>' + esc(displayInstruction(note, r, factor, people)) + '</p>')
            .join('') +
          '</details>'
        : '') +
      '<div class="cook-action-list">' +
      instructionParts
        .map((part, i) => '<div><span>' + (i + 1) + '</span><p>' + esc(part) + '</p></div>')
        .join('') +
      '</div>' +
      (used.length
        ? '<div class="cook-ingredients"><span>For this step</span>' +
          used
            .map((v) => {
              const shown = substitutedIngredient(v.name, v.amount),
                approximate = !shown.substitution && Boolean(v.practicalApproximate);
              const splitPrepared = v.reused && Number(v.multiplier) < 1;
              const label = v.reused
                ? splitPrepared
                  ? esc(cookingAmount(shown.amount, approximate)) +
                    ' ' +
                    esc(ingredientName(shown.name, shown.amount)) +
                    ' · prepared earlier'
                  : esc(ingredientName(shown.name, shown.amount)) + ' · prepared earlier'
                : esc(cookingAmount(shown.amount, approximate)) +
                  ' ' +
                  esc(ingredientName(shown.name, shown.amount));
              return (
                '<strong class="' +
                (shown.substitution ? 'has-substitution' : '') +
                '">' +
                label +
                (shown.substitution ? ' ' + icon('right-left') : '') +
                '</strong>'
              );
            })
            .join('') +
          '</div>'
        : '') +
      (tip
        ? '<div class="cook-tip">' +
          icon('lightbulb') +
          '<span><strong>Top tip</strong><small>' +
          esc(tip) +
          '</small></span></div>'
        : '') +
      '<div class="cook-session-tools"><button type="button" class="text-action cancel-cooking" id="cancelCooking">Cancel cooking</button></div>' +
      '</div></article>' +
      '</section>' +
      '<nav class="cook-controls" aria-label="Cooking steps">' +
      '<button class="cook-control secondary" id="prevStep">' +
      icon('arrow-left') +
      '<span>' +
      (index === 0 ? 'Back' : 'Previous') +
      '</span></button>' +
      '<button class="cook-control primary" id="nextStep"><span>' +
      (last ? 'Finish' : 'Next') +
      '</span>' +
      (!last ? icon('arrow-right') : icon('check')) +
      '</button>' +
      '</nav>' +
      globalNav('cook') +
      '</main>';

    document.body.classList.add('cooking-active');
    document.getElementById('cancelCooking').onclick = () => {
      MW.preparation.cancel(r);
      leaveCookingFlow('recipe:' + id);
    };
    document.getElementById('closeCook').onclick = () => leaveCookingFlow('recipe:' + id);
    document.getElementById('prevStep').onclick = () => {
      if (index > 0) go('cookstep:' + id + ':' + steps[index - 1].sourceIndex);
      else go('recipe:' + id, { motion: 'drill-back', back: true });
    };
    document.getElementById('nextStep').onclick = () => {
      if (index < steps.length - 1) go('cookstep:' + id + ':' + steps[index + 1].sourceIndex);
      else {
        MW.preparation.finish(r);
        leaveCookingFlow('week');
      }
    };
    bindNav();
    requestAnimationFrame(() => warmCookingPhotos(r, steps.slice(index + 1, index + 3)));
  }

  function dayToggles(id, selected) {
    const set = new Set(selected || []);
    return (
      '<div class="day-toggle-row" id="' +
      id +
      '">' +
      MW.DAYS.map(
        (d) =>
          '<button data-day="' +
          d.key +
          '" class="' +
          (set.has(d.key) ? 'active' : '') +
          '"><span>' +
          d.short.slice(0, 2) +
          '</span></button>',
      ).join('') +
      '</div>'
    );
  }

  function accountScreen(onboarding = false, mode = 'signin') {
    const account = MW.accounts.status(),
      user = account.user;
    root.innerHTML = shell(
      '<section class="subpage-head">' +
        '<button class="back-button" id="accountBack" aria-label="' +
        (onboarding ? 'Back to welcome' : 'Go back') +
        '">' +
        icon('arrow-left') +
        '</button>' +
        '<div><span class="eyebrow">MY WEEK ACCOUNT</span><h1>' +
        (user ? 'Your account' : mode === 'create' ? 'Create an account' : 'Sign in') +
        '</h1></div></section>' +
        (user
          ? '<section class="settings-section account-summary"><h2>' +
            esc(user.email) +
            '</h2><p id="accountSyncStatus" role="status" aria-live="polite"></p><div id="accountConflict"></div><button class="btn primary" id="accountSyncNow">Sync now</button><button class="btn secondary" id="accountSignOut">Sign out</button><div id="accountError" role="alert"></div></section>'
          : '<section class="settings-section account-auth"><p class="setting-help">Sign in on your devices to sync your week, cupboard and My Recipes.</p><div class="category-tabs"><button class="cat-tab ' +
            (mode === 'signin' ? 'active' : '') +
            '" id="accountSignInTab">Sign in</button><button class="cat-tab ' +
            (mode === 'create' ? 'active' : '') +
            '" id="accountCreateTab">Create account</button></div><form id="accountAuthForm"><label class="personal-label" for="accountEmail">Email address</label><input id="accountEmail" type="email" required autocomplete="email" inputmode="email"><label class="personal-label" for="accountPassword">Password</label><div class="account-password"><input id="accountPassword" type="password" required minlength="' +
            (mode === 'create' ? 8 : 1) +
            '" autocomplete="' +
            (mode === 'create' ? 'new-password' : 'current-password') +
            '"><button type="button" id="showAccountPassword" aria-label="Show password">' +
            icon('eye') +
            '</button></div>' +
            (mode === 'create'
              ? '<p class="setting-help">At least 8 characters.</p><label class="personal-label" for="accountConfirmPassword">Confirm password</label><input id="accountConfirmPassword" type="password" required minlength="8" autocomplete="new-password">'
              : '') +
            '<div id="accountError" role="alert"></div><button class="btn primary" type="submit" id="accountAuthSubmit">' +
            (mode === 'create' ? 'Create account' : 'Sign in') +
            '</button>' +
            (mode === 'signin'
              ? '<button type="button" class="text-action" id="accountForgotPassword">Forgot password?</button>'
              : '') +
            '</form><div id="accountDataChoice"></div></section>') +
        (!onboarding
          ? '<section class="settings-section"><button class="settings-link" id="accountTransfer">' +
            icon('file-export') +
            '<span><strong>Manual transfer & backup</strong></span><i class="fa-solid fa-chevron-right"></i></button></section>'
          : ''),
      'more',
    );
    if (onboarding) {
      const shell = root.querySelector('.shell');
      shell.classList.add('onboarding-account');
      const scroll = document.createElement('div');
      scroll.className = 'onboard-content';
      [...shell.children].filter((e) => !e.matches('.appbar')).forEach((e) => scroll.appendChild(e));
      shell.appendChild(scroll);
      const submit = root.querySelector('#accountAuthSubmit');
      if (submit) {
        const actions = document.createElement('div');
        actions.className = 'onboard-actions';
        submit.setAttribute('form', 'accountAuthForm');
        actions.appendChild(submit);
        shell.appendChild(actions);
      }
    }
    const errorHost = document.getElementById('accountError'),
      fail = (error) => {
        errorHost.textContent = error.message || 'This action could not be completed.';
      };
    document.getElementById('accountBack').onclick = () => {
      if (onboarding) {
        accountEntryChosen = false;
        render();
        window.scrollTo(0, 0);
      } else window.MyWeekAndroidBack();
    };
    if (!onboarding) document.getElementById('accountTransfer').onclick = () => go('sync');
    if (user) {
      paintAccountStatus();
      document.getElementById('accountSyncNow').onclick = (e) =>
        withLoading(e.currentTarget, async () => {
          await MW.accounts.sync();
          paintAccountStatus();
        });
      document.getElementById('accountSignOut').onclick = async () => {
        const status = MW.accounts.status();
        if (
          status.status !== 'synced' &&
          !(await confirmAction({
            title: 'Sign out with unsynced changes?',
            message:
              'Changes will stay on this device for this account. They will sync after you sign in here again.',
            confirmLabel: 'Sign out',
          }))
        )
          return;
        try {
          await MW.accounts.signOut();
          accountEntryChosen = false;
          render();
          window.scrollTo(0, 0);
        } catch (error) {
          fail(error);
        }
      };
    } else {
      document.getElementById('accountSignInTab').onclick = () => accountScreen(onboarding, 'signin');
      document.getElementById('accountCreateTab').onclick = () => accountScreen(onboarding, 'create');
      document.getElementById('showAccountPassword').onclick = (e) => {
        const input = document.getElementById('accountPassword'),
          show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        e.currentTarget.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      };
      document.getElementById('accountAuthForm').onsubmit = async (e) => {
        e.preventDefault();
        errorHost.textContent = '';
        const password = document.getElementById('accountPassword'),
          submit = document.getElementById('accountAuthSubmit');
        if (mode === 'create' && password.value !== document.getElementById('accountConfirmPassword').value) {
          fail(new Error('The passwords do not match.'));
          return;
        }
        submit.disabled = true;
        try {
          const result = await MW.accounts.connect(
            document.getElementById('accountEmail').value,
            password.value,
            mode === 'create',
          );
          password.value = '';
          const confirm = document.getElementById('accountConfirmPassword');
          if (confirm) confirm.value = '';
          if (result.needsChoice) {
            const choices = document.getElementById('accountDataChoice');
            choices.innerHTML =
              '<h2>Which data should this account use?</h2><p class="setting-help">This device already has a week. Keep the account’s saved week, or replace it with this device’s data. A local backup is kept.</p><button class="btn primary" id="useAccountData">Use saved account data</button><button class="btn secondary" id="useDeviceData">Use this device’s data</button>';
            for (const [id, choice] of [
              ['useAccountData', 'cloud'],
              ['useDeviceData', 'device'],
            ])
              document.getElementById(id).onclick = async () => {
                try {
                  await MW.accounts.finishConnect(choice);
                  render();
                  window.scrollTo(0, 0);
                } catch (error) {
                  fail(error);
                }
              };
          } else {
            render();
            window.scrollTo(0, 0);
          }
        } catch (error) {
          fail(error);
        } finally {
          submit.disabled = false;
        }
      };
      const forgot = document.getElementById('accountForgotPassword');
      if (forgot)
        forgot.onclick = async () => {
          try {
            errorHost.textContent = await MW.accounts.passwordReset(
              document.getElementById('accountEmail').value,
            );
          } catch (error) {
            fail(error);
          }
        };
    }
    bindNav();
  }
  function paintPersonalSyncStatus() {
    const host = document.getElementById('personalSyncStatus');
    if (!host) return;
    const a = MW.accounts.status();
    const labels = {
      synced: 'Recipes up to date',
      pending: 'Recipes waiting to sync',
      syncing: 'Syncing recipes…',
      offline: 'Saved here · sync unavailable',
      conflict: 'Sync needs your choice',
    };
    host.textContent = a.user ? labels[a.status] || 'Recipes saved on this device' : '';
    const row = document.getElementById('personalSyncRow');
    if (row) row.hidden = !a.user || a.status === 'synced';
    const button = document.getElementById('personalSyncNow');
    if (button) {
      button.textContent = !a.user ? 'Sign in' : a.status === 'conflict' ? 'Review sync' : 'Sync now';
      button.disabled = a.status === 'syncing';
      button.hidden = Boolean(a.user && a.status === 'synced');
    }
  }
  function paintAccountStatus() {
    paintPersonalSyncStatus();
    const host = document.getElementById('accountSyncStatus');
    if (!host) return;
    const a = MW.accounts.status(),
      labels = {
        synced: 'Up to date',
        pending: 'Changes waiting to sync',
        syncing: 'Syncing…',
        offline: 'Offline · changes saved on this device',
        conflict: 'Choose which changes to keep',
      };
    host.textContent = (labels[a.status] || a.status) + (a.detail ? ' · ' + a.detail : '');
    const conflict = document.getElementById('accountConflict');
    if (a.status === 'conflict' && !conflict.querySelector('button')) {
      conflict.innerHTML =
        '<p>Both devices edited the same data. A backup of both versions will be kept.</p><button class="btn primary" id="keepDeviceChanges">Keep this device’s changes</button><button class="btn secondary" id="keepAccountChanges">Use account changes</button>';
      for (const [id, choice] of [
        ['keepDeviceChanges', 'device'],
        ['keepAccountChanges', 'cloud'],
      ])
        document.getElementById(id).onclick = async () => {
          try {
            await MW.accounts.resolve(choice);
            paintAccountStatus();
          } catch (error) {
            document.getElementById('accountError').textContent = error.message;
          }
        };
    } else if (a.status !== 'conflict') conflict.innerHTML = '';
  }

  function settings() {
    const st = s();
    const avoidValue = [...(st.household.restrictions || []), ...(st.household.dislikes || [])].join(', ');
    root.innerHTML = shell(
      '<section class="settings-section"><label>Country</label><span class="select-control settings-select-control"><select id="country">' +
        MW.markets.choices
          .map(
            (x) =>
              '<option value="' +
              x.id +
              '" ' +
              (MW.markets.normalise(st.household.country) === x.id ? 'selected' : '') +
              '>' +
              esc(x.label) +
              '</option>',
          )
          .join('') +
        '</select>' +
        icon('chevron-down') +
        '</span></section>' +
        '<section class="settings-section"><label>Supermarket</label><span class="select-control settings-select-control"><select id="retailer">' +
        MW.markets
          .availableRetailers(st.household.country)
          .map(
            (x) => '<option ' + (x === st.household.retailer ? 'selected' : '') + '>' + esc(x) + '</option>',
          )
          .join('') +
        '</select>' +
        icon('chevron-down') +
        '</span></section>' +
        '<section class="settings-section"><label>Weekly food budget</label><div class="prefix-input"><span id="budgetCurrency">' +
        MW.markets.forCountry(st.household.country).currencySymbol +
        '</span><input id="budget" type="number" inputmode="decimal" min="0" step="1" value="' +
        st.household.budget +
        '"></div></section>' +
        '<details class="settings-expand settings-section food-settings"><summary><span><strong>Food preferences</strong><small>Eating style, allergies and foods to avoid</small></span>' +
        icon('chevron-down') +
        '</summary><div class="settings-expand-content"><label>Eating style</label>' +
        foodChoice('settingsDiet', MW.food.patterns, foodProfile().diet) +
        '<label class="sub-label">Meal priorities</label>' +
        multiFoodChoice('settingsGoals', MW.food.goals, foodProfile().goals) +
        '<label class="sub-label">Lunch styles you like</label>' +
        multiFoodChoice(
          'settingsLunchStyles',
          MW.food.lunchStyles,
          MW.food.lunchPreferences
            ? MW.food.lunchPreferences(foodProfile())
            : [foodProfile().lunchStyle || 'any'],
        ) +
        '<small class="setting-help">Choose one or more. My Week still picks one lunch recipe for the week by default.</small><label class="sub-label">Foods you do not want</label><div class="food-autocomplete-host"><input id="avoidFoods" value="' +
        esc(avoidValue) +
        '" placeholder="Start typing a food"></div><small class="setting-help">Type foods normally or choose a suggestion. Add commas for more than one. Applied filters appear below.</small><span class="avoid-feedback" id="settingsAvoidFeedback"></span><details class="allergen-details compact"><summary><span><strong>Allergens</strong><small>' +
        ((foodProfile().allergens || []).length
          ? foodProfile().allergens.length + ' selected'
          : 'None selected') +
        '</small></span>' +
        icon('chevron-down') +
        '</summary>' +
        multiFoodChoice('settingsAllergens', MW.food.allergens, foodProfile().allergens) +
        '<p class="allergen-warning">Excludes selected allergens and “may contain” warnings from the recipe source. Always check product labels and cross-contamination warnings. For disliked foods, use “Foods you do not want”.</p></details></div></details>' +
        '<details class="settings-expand settings-section equipment-settings"><summary><span><strong>Kitchen equipment</strong><small>Specialist appliances and cooking options</small></span>' +
        icon('chevron-down') +
        '</summary><div class="settings-expand-content"><div class="setting-title"><div><label>Kitchen equipment</label><small>Standard oven, hob, pans and utensils are assumed. Select specialist appliances you can use.</small></div></div><div class="equipment-grid" id="settingsEquipment">' +
        MW.equipment.items
          .map(
            (x) =>
              '<button type="button" data-v="' +
              x.id +
              '" class="' +
              ((st.household.equipment || []).includes(x.id) ? 'active' : '') +
              '">' +
              icon(x.icon || 'utensils') +
              '<span>' +
              esc(x.label) +
              '</span></button>',
          )
          .join('') +
        '</div></div></details>' +
        '<section class="settings-section cooking-display-setting">' +
        keepAwakeControl('settings') +
        '</section>' +
        '<section class="settings-section"><div class="setting-title"><div><label>Dinner days</label><small>Choose the days you want dinner planned.</small></div></div>' +
        dayToggles('dinnerDays', st.plan.dinnerDays) +
        '<label class="sub-label">People eating dinner</label>' +
        selectionButtons(
          'dinnerPeople',
          [1, 2, 3, 4, 5, 6].map((v) => ({ v, label: String(v) })),
          MW.weeks.currentPlanning(st).people,
          'numeric-choice-row',
        ) +
        '<small class="setting-help">Sets recipe quantities for this week and future plans. If you have already shopped, check your list before buying more.</small>' +
        '</section>' +
        '<section class="settings-section"><div class="setting-title"><div><label>Lunch days</label><small>Used for your next meal plan.</small></div></div>' +
        dayToggles('lunchDays', st.plan.lunchDays) +
        '<label class="sub-label">People eating the planned lunch</label>' +
        selectionButtons(
          'lunchPeople',
          [1, 2, 3, 4].map((v) => ({ v, label: String(v) })),
          st.plan.lunchPeople,
          'numeric-choice-row',
        ) +
        '</section>' +
        '<section class="settings-section"><button class="settings-link" id="cupboard">' +
        icon('box-open') +
        '<span><strong>My cupboard</strong><small>' +
        Object.keys(st.inventory || {}).length +
        ' tracked items</small></span><i class="fa-solid fa-chevron-right"></i></button></section>' +
        (MW.updates
          ? '<section class="settings-section app-update-section" id="appUpdatePanel"><button class="settings-link" id="checkUpdates">' +
            icon('cloud-arrow-down') +
            '<span><strong>App updates</strong><small id="updateStatus">' +
            (MW.updates.isNativeAndroid() ? 'Checking installed version…' : 'Web app updates automatically') +
            '</small></span><i class="fa-solid fa-chevron-right"></i></button><div class="update-release" id="updateRelease" hidden></div></section>'
          : '') +
        '<section class="settings-section" id="priceModeSection" ' +
        (MW.markets.canPlanWithPrices() ? '' : 'hidden ') +
        '><div class="switch-row"><span><strong>Lower-cost planning</strong><small id="priceModeHelp">' +
        'Applies when you next generate meals. Your current choices stay.' +
        '</small></span><label class="toggle"><input id="priceMode" type="checkbox" ' +
        (!MW.markets.canPlanWithPrices() ? 'disabled ' : '') +
        (MW.markets.canPlanWithPrices() && st.plan.priceMode ? 'checked' : '') +
        '><span></span></label></div></section>' +
        '<p class="settings-save-status" id="settingsSaveStatus" role="status" aria-live="polite">' +
        icon('check') +
        ' Changes save automatically</p>' +
        '<button class="danger-link" id="reset">Reset My Week</button>',
      'more',
      { title: 'Settings' },
    );

    function toggleDays(id) {
      root
        .querySelectorAll('#' + id + ' button')
        .forEach((b) => (b.onclick = () => b.classList.toggle('active')));
    }
    toggleDays('dinnerDays');
    toggleDays('lunchDays');
    const budgetInput = document.getElementById('budget');
    if (budgetInput)
      budgetInput.onkeydown = (e) => {
        if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
      };
    root
      .querySelectorAll('#dinnerPeople button')
      .forEach(
        (b) =>
          (b.onclick = () =>
            root
              .querySelectorAll('#dinnerPeople button')
              .forEach((x) => x.classList.toggle('active', x === b))),
      );
    root
      .querySelectorAll('#lunchPeople button')
      .forEach(
        (b) =>
          (b.onclick = () =>
            root
              .querySelectorAll('#lunchPeople button')
              .forEach((x) => x.classList.toggle('active', x === b))),
      );
    ['settingsDiet'].forEach((id) =>
      root
        .querySelectorAll('#' + id + ' button')
        .forEach(
          (b) =>
            (b.onclick = () =>
              root
                .querySelectorAll('#' + id + ' button')
                .forEach((x) => x.classList.toggle('active', x === b))),
        ),
    );
    ['settingsGoals', 'settingsAllergens'].forEach((id) =>
      root
        .querySelectorAll('#' + id + ' button')
        .forEach((b) => (b.onclick = () => b.classList.toggle('active'))),
    );
    root.querySelectorAll('#settingsLunchStyles button').forEach(
      (b) =>
        (b.onclick = () => {
          const value = b.dataset.v,
            buttons = [...root.querySelectorAll('#settingsLunchStyles button')];
          if (value === 'any') buttons.forEach((x) => x.classList.toggle('active', x === b));
          else {
            buttons.find((x) => x.dataset.v === 'any')?.classList.remove('active');
            b.classList.toggle('active');
            if (!buttons.some((x) => x.classList.contains('active')))
              buttons.find((x) => x.dataset.v === 'any')?.classList.add('active');
          }
        }),
    );
    root
      .querySelectorAll('#settingsEquipment button')
      .forEach((b) => (b.onclick = () => b.classList.toggle('active')));
    const avoidFoods = document.getElementById('avoidFoods');
    const settingsAvoidFeedback = document.getElementById('settingsAvoidFeedback');
    const renderAvoidFeedback = () => {
      if (!avoidFoods || !settingsAvoidFeedback || !MW.foodIdentity) return;
      const parsed = MW.foodIdentity.parseList(avoidFoods.value);
      if (!parsed.items.length) {
        settingsAvoidFeedback.innerHTML = '';
        return;
      }
      const applied = parsed.items.map((item, index) => ({ item, index })).filter((x) => x.item.matched);
      const unresolved = parsed.items.map((item, index) => ({ item, index })).filter((x) => !x.item.matched);
      const chips = applied
        .map(
          ({ item, index }) =>
            '<button type="button" class="avoid-applied-chip" data-avoid-remove="' +
            index +
            '" aria-label="Remove ' +
            esc(MW.foodIdentity.canonicalLabel(item.canonical)) +
            '"><span>' +
            esc(MW.foodIdentity.canonicalLabel(item.canonical)) +
            '</span>' +
            icon('xmark') +
            '</button>',
        )
        .join('');
      const unresolvedText = unresolved.length
        ? '<span class="avoid-unresolved-note">' +
          icon('circle-question') +
          ' Not applied: ' +
          unresolved.map((x) => esc(x.item.raw)).join(', ') +
          '. Choose a recognised suggestion or correct the wording.</span>'
        : '';
      settingsAvoidFeedback.innerHTML =
        (chips
          ? '<span class="avoid-feedback-label">Applied</span><span class="avoid-chip-list">' +
            chips +
            '</span>'
          : '') + unresolvedText;
      settingsAvoidFeedback.querySelectorAll('[data-avoid-remove]').forEach(
        (button) =>
          (button.onclick = () => {
            const removeIndex = Number(button.dataset.avoidRemove);
            avoidFoods.value = parsed.items
              .filter((_, index) => index !== removeIndex)
              .map((x) => x.raw)
              .join(', ');
            renderAvoidFeedback();
            saveSettings();
          }),
      );
    };
    if (avoidFoods) {
      MW.foodIdentity &&
        MW.foodIdentity.attach(avoidFoods, {
          multi: true,
          limit: 5,
          requireMatch: true,
          onSelect: () => {
            renderAvoidFeedback();
            saveSettings();
          },
        });
      avoidFoods.addEventListener('input', renderAvoidFeedback);
      avoidFoods.addEventListener('blur', renderAvoidFeedback);
      renderAvoidFeedback();
    }
    document.getElementById('cupboard').onclick = () => go('cupboard');
    const updateButton = document.getElementById('checkUpdates'),
      updateStatus = document.getElementById('updateStatus'),
      updateRelease = document.getElementById('updateRelease');
    const renderUpdate = async (manual) => {
      if (!updateButton || !MW.updates) return;
      updateButton.disabled = true;
      let justInstalled = '';
      if (updateStatus) updateStatus.textContent = 'Checking installed and available versions…';
      try {
        const pending = MW.updates.pendingStatus ? await MW.updates.pendingStatus() : null;
        if (pending && pending.installed)
          justInstalled = String(
            (pending.pending && pending.pending.versionName) ||
              (pending.local && pending.local.version) ||
              '',
          );
        const result = await MW.updates.check({ manual: Boolean(manual) });
        const local = result.local || (await MW.updates.appInfo());
        if (result.reason === 'web') {
          if (updateStatus) updateStatus.textContent = 'Web app updates automatically';
          if (updateRelease) {
            updateRelease.hidden = true;
            updateRelease.innerHTML = '';
          }
          return;
        }
        const installed = String(local.version || 'unknown');
        if (result.error && !(pending && !pending.installed)) {
          if (updateStatus)
            updateStatus.textContent = 'Could not check for new updates · Installed ' + installed;
          if (updateRelease) {
            updateRelease.hidden = true;
            updateRelease.innerHTML = '';
          }
          return;
        }
        if (!result.available && !(pending && !pending.installed)) {
          if (updateStatus)
            updateStatus.textContent = justInstalled
              ? 'Updated successfully · Installed ' + installed
              : 'Installed ' + installed + ' · Up to date';
          if (updateRelease) {
            updateRelease.hidden = true;
            updateRelease.innerHTML = '';
          }
          return;
        }
        const release =
          pending && !pending.installed
            ? {
                ...pending.pending,
                releaseNotes:
                  result.manifest?.versionCode === pending.pending.versionCode
                    ? result.manifest.releaseNotes
                    : [],
              }
            : result.manifest || {};
        if (updateStatus)
          updateStatus.textContent =
            'Installed ' + installed + ' · ' + String(release.versionName || 'New version') + ' available';
        if (updateRelease) {
          updateRelease.dataset.updateVersionCode = String(release.versionCode);
          const notes = Array.isArray(release.releaseNotes) ? release.releaseNotes : [];
          updateRelease.innerHTML =
            '<div class="update-release-copy"><span class="eyebrow">UPDATE AVAILABLE</span><strong>' +
            esc(release.versionName) +
            '</strong>' +
            (notes.length
              ? '<ul>' +
                notes
                  .slice(0, 5)
                  .map((x) => '<li>' + esc(x) + '</li>')
                  .join('') +
                '</ul>'
              : '') +
            '<small>Installed: ' +
            esc(installed) +
            '. Your week, cupboard and preferences stay on this device during a normal update.</small></div><progress id="updateDownloadProgress" class="update-download-progress" max="100" aria-label="Update download progress" hidden></progress><button class="btn primary" id="installUpdate">Update My Week</button>';
          updateRelease.hidden = false;
          document.getElementById('installUpdate').onclick = async () => {
            try {
              await MW.updates.install(release);
            } catch {
              /* Shared state shows the failure. */
            }
            paintUpdateState();
          };
          paintUpdateState();
        }
      } catch (error) {
        if (updateStatus)
          updateStatus.textContent = manual ? 'Could not check for updates' : 'Update check unavailable';
        if (manual && updateRelease) {
          updateRelease.innerHTML =
            '<p class="operation-error" role="alert">' +
            esc((error && error.message) || 'Could not check for updates.') +
            '</p>';
          updateRelease.hidden = false;
        }
      } finally {
        updateButton.disabled = false;
      }
    };
    if (updateButton) {
      updateButton.onclick = () => renderUpdate(true);
      renderUpdate(false);
    }
    const countrySelect = document.getElementById('country');
    if (countrySelect)
      countrySelect.addEventListener('change', () => {
        const market = MW.markets.forCountry(countrySelect.value);
        const budgetCurrency = document.getElementById('budgetCurrency');
        if (budgetCurrency) budgetCurrency.textContent = market.currencySymbol;
        const previousMarket = MW.markets.forCountry(st.household.country);
        const budgetInput = document.getElementById('budget');
        if (budgetInput && Number(budgetInput.value) === previousMarket.defaultBudget)
          budgetInput.value = market.defaultBudget;
        const priceMode = document.getElementById('priceMode');
        if (priceMode) {
          priceMode.disabled = !MW.markets.canPlanWithPrices(countrySelect.value);
          if (priceMode.disabled) priceMode.checked = false;
        }
        const priceModeSection = document.getElementById('priceModeSection');
        if (priceModeSection) priceModeSection.hidden = !MW.markets.canPlanWithPrices(countrySelect.value);
        const retailerSelect = document.getElementById('retailer');
        retailerSelect.innerHTML = market.retailers
          .map((name) => '<option>' + esc(name) + '</option>')
          .join('');
        retailerSelect.value = market.defaultRetailer;
        document.getElementById('settingsSaveStatus').textContent =
          'Country updated. Existing meals are preserved.';
      });
    const saveSettings = () => {
      if (st.week && !st.week.planning) st.week.planning = MW.weeks.planning(st);
      const country = MW.markets.normalise(document.getElementById('country').value);
      const changedCountry = country !== MW.markets.normalise(st.household.country);
      st.household.country = country;
      if (!MW.markets.canPlanWithPrices(country)) st.plan.priceMode = false;
      if (changedCountry && st.week) {
        // Keep meals and purchase checkoffs, but never carry a UK cost or savings claim into Australia.
        st.week.savingMode = false;
        st.week.savingResult = null;
        st.week.budgetResult = null;
        if (!st.week.delivery) st.week.shop = null;
      }
      st.household.retailer = MW.markets.validRetailer(country, document.getElementById('retailer').value)
        ? document.getElementById('retailer').value
        : MW.markets.forCountry(country).defaultRetailer;
      const dinnerPeople = root.querySelector('#dinnerPeople button.active');
      const people = Math.max(1, Math.min(6, Number(dinnerPeople && dinnerPeople.dataset.v) || 2));
      st.household.people = people;
      if (st.week && st.week.planning) st.week.planning.people = people;
      const budgetValue = document.getElementById('budget').value;
      if (budgetValue !== '' && Number.isFinite(Number(budgetValue)) && Number(budgetValue) >= 0)
        st.household.budget = Number(budgetValue);
      st.plan.dinnerDays = [...root.querySelectorAll('#dinnerDays button.active')].map((x) => x.dataset.day);
      st.plan.lunchDays = [...root.querySelectorAll('#lunchDays button.active')].map((x) => x.dataset.day);
      const lp = root.querySelector('#lunchPeople button.active');
      st.plan.lunchPeople = Math.max(1, Math.min(st.household.people, Number(lp && lp.dataset.v) || 1));
      root
        .querySelectorAll('#lunchPeople button')
        .forEach((button) =>
          button.classList.toggle('active', Number(button.dataset.v) === st.plan.lunchPeople),
        );
      const dietBtn = root.querySelector('#settingsDiet button.active');
      const selectedLunchStyles = [...root.querySelectorAll('#settingsLunchStyles button.active')].map(
        (x) => x.dataset.v,
      );
      const avoidParsed = MW.foodIdentity
        ? MW.foodIdentity.parseList((document.getElementById('avoidFoods') || {}).value || '')
        : { linked: [], custom: [] };
      st.household.restrictions = [...new Set(avoidParsed.linked || [])];
      st.household.dislikes = [...new Set(avoidParsed.custom || [])];
      const lunchStyles = selectedLunchStyles.length ? selectedLunchStyles : ['any'];
      st.foodProfile = {
        diet: dietBtn ? dietBtn.dataset.v : 'omnivore',
        goals: [...root.querySelectorAll('#settingsGoals button.active')].map((x) => x.dataset.v),
        allergens: [...root.querySelectorAll('#settingsAllergens button.active')].map((x) => x.dataset.v),
        lunchStyle: 'any',
        lunchStyles: lunchStyles.includes('any') ? ['any'] : [...new Set(lunchStyles)],
      };
      st.household.equipment = [...root.querySelectorAll('#settingsEquipment button.active')].map(
        (x) => x.dataset.v,
      );
      st.household.equipmentConfigured = true;
      st.plan.priceMode =
        MW.markets.canPlanWithPrices(country) && document.getElementById('priceMode').checked;
      MW.state.save();
      document.getElementById('settingsSaveStatus').innerHTML = icon('check') + ' Saved';
    };
    root
      .querySelectorAll('.settings-section input:not([data-keep-awake-toggle]),.settings-section select')
      .forEach((input) => {
        // The food autocomplete commits on selection or blur. Saving partial
        // keystrokes here would wrongly apply an unfinished exclusion.
        if (input === avoidFoods) return;
        input.addEventListener(
          input.tagName === 'SELECT' || input.type === 'checkbox' ? 'change' : 'input',
          saveSettings,
        );
      });
    root
      .querySelectorAll(
        '#dinnerPeople button,#dinnerDays button,#lunchDays button,#lunchPeople button,#settingsDiet button,#settingsGoals button,#settingsAllergens button,#settingsLunchStyles button,#settingsEquipment button',
      )
      .forEach((button) => button.addEventListener('click', saveSettings));
    if (avoidFoods) avoidFoods.addEventListener('blur', saveSettings);
    document.getElementById('reset').onclick = async () => {
      const confirmed = await confirmAction({
        eyebrow: 'RESET MY WEEK',
        title: 'Erase My Week data on this device?',
        message:
          'This permanently erases your current week, cupboard, shopping progress, preferences and history. This cannot be undone. Export a transfer first if you want a backup.',
        confirmLabel: 'Reset My Week',
        danger: true,
      });
      if (!confirmed) return;
      MW.state.reset();
      if (MW.onboarding) MW.onboarding.reset();
      render();
    };
    bindNav();
  }

  function syncScreen() {
    const st = s();
    let pending = null;
    const summary = (packet) => {
      const x = (packet && packet.state) || {};
      const inv = Object.keys(x.inventory || {}).length,
        week = (x.week && x.week.weekKey) || 'No current week';
      return (
        '<div class="sync-preview-card"><span class="eyebrow">TRANSFER FOUND</span><strong>' +
        esc((x.profile && x.profile.name) || 'My Week') +
        '</strong><small>' +
        esc(week) +
        ' · ' +
        inv +
        ' cupboard item' +
        (inv === 1 ? '' : 's') +
        ' · exported ' +
        esc(packet.exportedAt || '') +
        '</small></div>'
      );
    };
    root.innerHTML = shell(
      '<section class="subpage-head"><button class="back-button" id="back">' +
        icon('arrow-left') +
        '</button><div><span class="eyebrow">YOUR DATA</span><h1>Device sync & transfer</h1><p>Move your complete My Week state directly between devices. Use either a transfer file or a transfer code; you do not need both. This transfers a snapshot. Account sign-in details are not included.</p></div></section>' +
        '<section class="sync-explainer">' +
        icon('shield-halved') +
        '<div><strong>Two ways to transfer</strong><small>The .myweek file and transfer code contain the same snapshot. Choose whichever is easier for the devices you are moving between.</small></div></section>' +
        '<section class="settings-section sync-section"><span class="eyebrow">SEND FROM THIS DEVICE</span><h2>Create a transfer</h2><p>The transfer includes your week, cupboard, My Recipes, preferences and shopping progress. Receipt images are only a temporary local reference while checking a shop and are not included.</p><div class="sync-actions"><button class="btn primary" id="shareSyncFile">Share transfer file</button><button class="btn secondary" id="createSyncCode">Create transfer code</button></div><div id="syncCodeArea"></div></section>' +
        '<section class="settings-section sync-section"><span class="eyebrow">RECEIVE ON THIS DEVICE</span><h2>Import a transfer</h2><p>Choose a .myweek file or paste a transfer code. You only need one method. Nothing is replaced until you review the transfer and confirm.</p><textarea id="syncImportCode" rows="5" placeholder="Paste a My Week transfer code"></textarea><div class="sync-actions"><button class="btn secondary" id="readSyncCode">Check transfer code</button><label class="btn secondary sync-file-picker"><span>Choose .myweek file</span><input id="syncFile" type="file" accept=".myweek,application/json,text/plain"></label></div><div id="syncImportPreview"></div></section>',
      'more',
    );
    const preview = document.getElementById('syncImportPreview');
    const showPending = (packet) => {
      pending = packet;
      preview.innerHTML =
        summary(packet) +
        '<p class="setting-help">This transfer is ready to import. Your current data will not change until you confirm below.</p><button class="btn primary" id="applySyncTransfer">Replace this device with this transfer</button>';
      document.getElementById('applySyncTransfer').onclick = async () => {
        const confirmed = await confirmAction({
          eyebrow: 'REPLACE DEVICE DATA',
          title: 'Replace the My Week data on this device?',
          message:
            'Your current week, cupboard, shopping progress, preferences and history will be overwritten by the transfer you just checked.',
          confirmLabel: 'Replace this device',
          danger: true,
        });
        if (!confirmed) return;
        try {
          MW.syncTransfer.apply(pending);
          pending = null;
          preview.innerHTML =
            '<div class="sync-preview-card"><span class="eyebrow">IMPORT COMPLETE</span><strong>My Week data replaced successfully</strong><small>The transferred week, cupboard, preferences and history are now active on this device.</small></div>';
        } catch (error) {
          preview.innerHTML =
            '<p class="operation-error" role="alert">' +
            esc((error && error.message) || 'This transfer could not be applied.') +
            '</p>';
        }
      };
    };
    document.getElementById('createSyncCode').onclick = (e) =>
      withLoading(e.currentTarget, async () => {
        const code = await MW.syncTransfer.createCode(),
          area = document.getElementById('syncCodeArea');
        area.innerHTML =
          '<div class="sync-code-card"><div><strong>Transfer code</strong><small>' +
          code.length.toLocaleString() +
          ' characters · self-contained</small></div><textarea id="syncCode" rows="5" readonly>' +
          esc(code) +
          '</textarea><button class="btn secondary" id="copySyncCode">Copy code</button></div>';
        document.getElementById('copySyncCode').onclick = async () => {
          const box = document.getElementById('syncCode');
          try {
            await navigator.clipboard.writeText(box.value);
          } catch {
            box.select();
            document.execCommand('copy');
          }
          document.getElementById('copySyncCode').textContent = 'Copied';
        };
      });
    document.getElementById('shareSyncFile').onclick = (e) =>
      withLoading(e.currentTarget, async () => {
        await MW.syncTransfer.shareFile();
      });
    document.getElementById('readSyncCode').onclick = (e) =>
      withLoading(e.currentTarget, async () => {
        const value = document.getElementById('syncImportCode').value.trim();
        pending = null;
        if (!value) {
          preview.innerHTML =
            '<p class="operation-error" role="alert">Paste a My Week transfer code first.</p>';
          return;
        }
        preview.innerHTML = '<p class="setting-help" role="status">Checking transfer code…</p>';
        try {
          showPending(await MW.syncTransfer.readCode(value));
        } catch (error) {
          preview.innerHTML =
            '<p class="operation-error" role="alert">' +
            esc((error && error.message) || 'This transfer code could not be read.') +
            '</p>';
        }
      });
    document.getElementById('syncFile').onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      try {
        showPending(await MW.syncTransfer.readFile(file));
      } catch (error) {
        preview.innerHTML =
          '<p class="operation-error" role="alert">' +
          esc(error.message || 'This transfer file could not be read.') +
          '</p>';
      }
    };
    document.getElementById('back').onclick = () => go('settings');
    bindNav();
  }

  function cupboard() {
    const st = s();
    const items = Object.entries(st.inventory || {})
      .map(([key, item]) => ({ ...item, _key: key }))
      .filter((x) => MW.inventory.parseAmount(x.amountText))
      .sort((a, b) => String(a.name).localeCompare(String(b.name)));
    const unverifiedStarterCount = items.filter((x) => x.starterUnverified).length;
    const wholeStockUnits = wholeInventoryUnits;
    const unitOptions = inventoryUnitOptions;
    const itemRow = (x) => {
      const p = MW.inventory.partsForEdit(x.amountText) || {
          value: '',
          unit: 'g',
        },
        keyMatch = MW.foodIdentity && MW.foodIdentity.resolveExact(x._key),
        nameMatch = MW.foodIdentity && MW.foodIdentity.resolveExact(x.name),
        resolved = x.canonical || (keyMatch && keyMatch.canonical) || (nameMatch && nameMatch.canonical),
        linked = Boolean(resolved);
      const usage = linked && MW.inventory.plannedUsage ? MW.inventory.plannedUsage(resolved) : [];
      const usageMarkup = usage.length
        ? '<details class="cupboard-usage"><summary>' +
          icon('link') +
          '<span>Used in ' +
          usage.length +
          ' ' +
          (usage.length === 1 ? 'meal' : 'meals') +
          '</span>' +
          icon('chevron-down') +
          '</summary><ul>' +
          usage.map((u) => '<li>' + esc(u.label) + '</li>').join('') +
          '</ul></details>'
        : '<small class="cupboard-recipe-link">' + icon('circle-minus') + ' Not used this week</small>';
      return (
        '<article class="cupboard-row cupboard-quantity-row ' +
        (linked ? 'linked-food' : 'custom-food') +
        '" data-name="' +
        esc(x._key) +
        '"><div class="cupboard-item-name"><strong>' +
        esc(ingredientName(x.name)) +
        '</strong><small class="cupboard-save-note">' +
        (x.starterUnverified
          ? 'Starter estimate · Review before automatic use'
          : linked
            ? 'Recognised ingredient'
            : 'Custom item · Not linked to recipes') +
        '</small>' +
        (linked ? usageMarkup : '') +
        '</div><div class="stock-quantity cupboard-current-quantity"><input class="stock-current-amount" type="number" inputmode="decimal" min="0" step="' +
        (wholeStockUnits.has(p.unit) ? '1' : '0.1') +
        '" value="' +
        esc(p.value) +
        '" aria-label="Amount of ' +
        esc(ingredientName(x.name)) +
        '"><span class="select-control stock-unit-control"><select class="stock-current-unit" aria-label="Unit for ' +
        esc(ingredientName(x.name)) +
        '">' +
        unitOptions(p.unit) +
        '</select>' +
        icon('chevron-down') +
        '</span></div><button class="stock-delete" data-name="' +
        esc(x._key) +
        '" aria-label="Remove ' +
        esc(ingredientName(x.name)) +
        '">' +
        icon('trash') +
        '</button></article>'
      );
    };
    root.innerHTML = shell(
      '<section class="subpage-head"><button class="back-button" id="back">' +
        icon('arrow-left') +
        '</button><div><span class="eyebrow">INVENTORY</span><h1>My cupboard</h1><p>Keep the real amount you have. Confirmed shopping adds what you bought and completed recipes subtract what they use.</p></div></section>' +
        '<section class="cupboard-add"><div class="food-autocomplete-host cupboard-food-search"><input id="stockName" placeholder="Start typing an ingredient"><span class="food-link-status" id="stockMatchStatus"></span></div><div class="stock-quantity"><input id="stockAmount" type="number" inputmode="decimal" min="0" step="0.1" placeholder="Amount"><span class="select-control stock-unit-control"><select id="stockUnit">' +
        unitOptions('g') +
        '</select>' +
        icon('chevron-down') +
        '</span></div><button id="addStock" aria-label="Add inventory item">' +
        icon('plus') +
        '</button></section>' +
        (unverifiedStarterCount
          ? '<section class="cupboard-starter-warning"><strong>Check your starter quantities</strong><p>' +
            unverifiedStarterCount +
            ' amounts were originally suggested by an older version of MyWeek. They are not automatically counted until you check them.</p>' +
            '<button type="button" class="btn secondary" id="confirmStarterStock">I have checked these quantities</button></section>'
          : '') +
        '<div class="cupboard-list">' +
        (items.length
          ? items.map(itemRow).join('')
          : '<div class="empty-state">' +
            icon('box-open') +
            '<h2>No cupboard items yet</h2><p>Add anything you already have and My Week will count it down as recipes use it.</p></div>') +
        '</div>' +
        (items.length
          ? '<button type="button" class="text-action cupboard-clear" id="clearCupboard">Clear all cupboard stock</button>'
          : ''),
      'more',
    );
    document.getElementById('back').onclick = () => go('settings');
    const confirmStarter = document.getElementById('confirmStarterStock');
    if (confirmStarter)
      confirmStarter.onclick = () => {
        if (
          !confirm(
            'Have you checked the quantities of these starter ingredients against what you actually own?',
          )
        )
          return;
        MW.inventory.confirmStarterStock();
        samePage(cupboard);
      };
    const clearCupboard = document.getElementById('clearCupboard');
    if (clearCupboard)
      clearCupboard.onclick = () => {
        if (!confirm('Clear all cupboard quantities? Your meals and completed shopping checks will be kept.'))
          return;
        MW.inventory.clearAll();
        samePage(cupboard);
      };
    const stockName = document.getElementById('stockName'),
      stockMatchStatus = document.getElementById('stockMatchStatus'),
      stockAmount = document.getElementById('stockAmount'),
      stockUnit = document.getElementById('stockUnit');
    const updateStockMatch = () => {
      const raw = stockName.value.trim();
      if (!raw) {
        stockMatchStatus.innerHTML = '';
        return;
      }
      const exact = stockName.dataset.mwCanonical
        ? { canonical: stockName.dataset.mwCanonical }
        : MW.foodIdentity && MW.foodIdentity.resolveExact(stockName.value);
      if (exact) {
        const usage = MW.inventory.plannedUsage ? MW.inventory.plannedUsage(exact.canonical) : [];
        stockMatchStatus.innerHTML =
          '<span class="linked">' +
          icon('link') +
          ' Recognised: ' +
          esc(MW.foodIdentity.canonicalLabel(exact.canonical)) +
          (usage.length
            ? ' · Used in ' + usage.length + ' ' + (usage.length === 1 ? 'meal' : 'meals')
            : ' · Not used this week') +
          '</span>';
        return;
      }
      const options = MW.foodIdentity ? MW.foodIdentity.suggest(raw, 5) : [];
      stockMatchStatus.innerHTML = options.length
        ? '<span class="choose">' + icon('magnifying-glass') + ' Choose a suggestion to link this item</span>'
        : '<span class="custom">' + icon('circle-question') + ' Custom item · Not linked to recipes</span>';
    };
    if (MW.foodIdentity)
      MW.foodIdentity.attach(stockName, {
        limit: 5,
        onSelect: updateStockMatch,
      });
    stockName.addEventListener('input', updateStockMatch);
    updateStockMatch();
    const syncStep = (input, unit) => {
      input.step = wholeStockUnits.has(unit.value) ? '1' : '0.1';
    };
    syncStep(stockAmount, stockUnit);
    stockUnit.onchange = () => syncStep(stockAmount, stockUnit);
    stockAmount.onkeydown = (e) => {
      if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
    };
    document.getElementById('addStock').onclick = () => {
      const n = stockName.value.trim(),
        value = Number(stockAmount.value),
        unit = stockUnit.value;
      if (!n || !Number.isFinite(value) || value <= 0) return;
      if (wholeStockUnits.has(unit) && !Number.isInteger(value)) {
        stockAmount.setCustomValidity('Use a whole number for ' + unit + '.');
        stockAmount.reportValidity();
        return;
      }
      stockAmount.setCustomValidity('');
      const exact = stockName.dataset.mwCanonical
          ? { canonical: stockName.dataset.mwCanonical }
          : MW.foodIdentity && MW.foodIdentity.resolveExact(n),
        canonical = (exact && exact.canonical) || null;
      const incoming = MW.inventory.parseAmount(unit === 'each' ? String(value) : String(value) + ' ' + unit);
      const existing = canonical ? MW.inventory.find(canonical) : null;
      if (existing && incoming) {
        const have = MW.inventory.parseAmount(existing.item.amountText),
          converted = have ? MW.inventory.valueInUnit(incoming, have.unit, canonical) : null;
        if (Number.isFinite(converted)) {
          const label = ingredientName(existing.item.name || MW.foodIdentity.canonicalLabel(canonical));
          const next = MW.inventory.formatAmount({
            value: have.value + converted,
            unit: have.unit,
          });
          if (
            !confirm(
              label +
                ' is already in your inventory with ' +
                existing.item.amountText +
                '. Add this quantity to make ' +
                next +
                '?',
            )
          )
            return;
          MW.inventory.setQuantity(existing.key, next, { canonical });
          samePage(cupboard);
          return;
        }
        alert(
          'This matches an ingredient already in your inventory, but the units cannot be combined safely. Edit the existing quantity instead.',
        );
        return;
      }
      MW.inventory.setQuantity(canonical || n, unit === 'each' ? String(value) : String(value) + ' ' + unit, {
        canonical,
        custom: !canonical,
      });
      samePage(cupboard);
    };
    const saveRow = (row) => {
      const input = row.querySelector('.stock-current-amount'),
        unit = row.querySelector('.stock-current-unit'),
        name = row.dataset.name,
        value = Number(input.value);
      if (!Number.isFinite(value) || value < 0) return;
      if (wholeStockUnits.has(unit.value) && !Number.isInteger(value)) {
        input.setCustomValidity('Use a whole number for ' + unit.value + '.');
        input.reportValidity();
        return;
      }
      input.setCustomValidity('');
      if (value === 0) {
        MW.inventory.remove(name);
        samePage(cupboard);
        return;
      }
      MW.inventory.setQuantity(
        name,
        unit.value === 'each' ? String(value) : String(value) + ' ' + unit.value,
      );
      const note = row.querySelector('.cupboard-save-note'),
        baseNote = row.classList.contains('custom-food')
          ? 'Custom item · Not linked to recipes'
          : 'Recognised ingredient · In cupboard now';
      if (note) {
        note.textContent = 'Saved automatically';
        setTimeout(() => {
          if (note.isConnected) note.textContent = baseNote;
        }, 1200);
      }
    };
    root.querySelectorAll('.cupboard-quantity-row').forEach((row) => {
      const input = row.querySelector('.stock-current-amount'),
        unit = row.querySelector('.stock-current-unit');
      input.onkeydown = (e) => {
        if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
        if (e.key === 'Enter') {
          e.preventDefault();
          input.blur();
        }
      };
      input.onchange = () => saveRow(row);
      unit.onchange = () => {
        syncStep(input, unit);
        saveRow(row);
      };
    });
    root.querySelectorAll('.stock-delete').forEach(
      (b) =>
        (b.onclick = () => {
          MW.inventory.remove(b.dataset.name);
          samePage(cupboard);
        }),
    );
    bindNav();
  }

  function bindNativeBack() {
    const app = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
    if (!app || typeof app.addListener !== 'function') return;
    app.addListener('backButton', () => {
      if (window.MyWeekAndroidBack && window.MyWeekAndroidBack()) return;
      if (typeof app.minimizeApp === 'function') app.minimizeApp();
      else if (typeof app.exitApp === 'function') app.exitApp();
    });
    app.addListener('appStateChange', (state) => {
      if (state && state.isActive) finishInterruptedMotion();
    });
  }
  root.addEventListener('change', (e) => {
    const toggle = e.target.closest && e.target.closest('[data-keep-awake-toggle]');
    if (toggle) setKeepScreenAwake(toggle.checked);
  });
  root.addEventListener('click', (e) => {
    const gather = e.target.closest && e.target.closest('[data-gather-index][data-recipe-id]');
    if (gather) {
      e.preventDefault();
      toggleGatheredIngredient(gather);
      return;
    }
    if (e.target.closest('#openLunch')) {
      const id = s().week && s().week.lunchId;
      if (id) go('recipe:' + id);
    }
  });
  window.addEventListener('mw:storage-error', storageRecovery);
  bindNativeBack();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) finishInterruptedMotion();
  });
  window.addEventListener('myweek:account-data-changed', () => {
    // Update collection results without replacing a focused search or its query.
    const search = root.querySelector('#personalSearch');
    if (search) {
      search.dispatchEvent(new Event('input'));
      paintPersonalSyncStatus();
      return;
    }
    // Keep in-progress form entries and the current cooking scroll position.
    if (
      root.querySelector('#personalRecipeForm,#accountAuthForm,#onboardNext') ||
      document.body.classList.contains('cooking-active') ||
      (document.activeElement && document.activeElement.matches('input,textarea,select'))
    )
      return;
    render();
  });
  window.addEventListener('myweek:account-changed', paintAccountStatus);
  MW.accounts.start();
  render();
  MW.screenAwake.start();
})();
