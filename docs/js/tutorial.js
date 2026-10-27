window.MW = window.MW || {};
(function () {
  'use strict';

  if (typeof document === 'undefined') return;
  const root = document.getElementById('app');
  if (!root || !MW.state) return;

  // The user opens each new page with its real tab. No recipe or preference is changed.
  const steps = [
    {
      screen: 'week',
      section: 'My Week',
      selector: '.day-strip',
      title: 'Your meal days',
      copy: 'These are the days in your plan. Tap a day after the tour to see its meals.',
    },
    {
      screen: 'week',
      section: 'My Week',
      selector: '.home-quick-actions',
      title: 'Pick your meals',
      copy: 'Use these buttons to get new meal ideas or choose meals yourself.',
    },
    {
      screen: 'week',
      section: 'My Week',
      selector: '.bottom-nav [data-nav="recipes"]',
      opens: 'recipes',
      title: 'Open All Recipes',
      copy: 'Tap the All Recipes tab at the bottom.',
    },
    {
      screen: 'recipes',
      section: 'All Recipes',
      selector: '.library-search-row',
      title: 'Find something to cook',
      copy: 'Search for a meal here. Tap the filter icon to narrow the choices.',
    },
    {
      screen: 'recipes',
      section: 'All Recipes',
      selector: '.bottom-nav [data-nav="myrecipes"]',
      opens: 'myrecipes',
      title: 'Open My Recipes',
      copy: 'Tap the My Recipes tab at the bottom.',
    },
    {
      screen: 'myrecipes',
      section: 'My Recipes',
      selector: '.personal-search-row',
      title: 'Your own recipes',
      copy: 'Find your favourites here. Tap the + button to add a recipe of your own.',
    },
    {
      screen: 'myrecipes',
      section: 'My Recipes',
      selector: '.bottom-nav [data-nav="shopreview"]',
      opens: 'shopreview',
      title: 'Open Shopping List',
      copy: 'Tap the Shopping List tab at the bottom.',
    },
    {
      screen: 'shopreview',
      section: 'Shopping List',
      selector: '.shop-add-items',
      title: 'Add an extra item',
      copy: 'Type any extra shopping here, then tap Add.',
      optional: true,
    },
    {
      screen: 'shopreview',
      section: 'Shopping List',
      selector: '.shop-item-shell',
      title: 'Tick off what you buy',
      copy: 'Tap the square next to an item to tick it off while shopping.',
      optional: true,
    },
    {
      screen: 'shopreview',
      section: 'Shopping List',
      selector: '#settingsButton',
      opens: 'settings',
      title: 'Open Settings',
      copy: 'Tap the cog at the top right to open Settings.',
    },
    {
      screen: 'settings',
      section: 'Settings',
      selector: '#dinnerDays',
      title: 'Choose dinner days',
      copy: 'Turn dinner days on or off here.',
    },
    {
      screen: 'settings',
      section: 'Settings',
      selector: '#lunchDays',
      title: 'Choose lunch days',
      copy: 'Turn lunch days on or off here. Your changes save automatically.',
    },
  ];

  let active = null;
  let observerQueued = false;
  let internalNavigation = false;
  const prefersReducedMotion = () =>
    Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function clearLayer() {
    root
      .querySelectorAll('.mw-tour-target')
      .forEach((element) => element.classList.remove('mw-tour-target', 'mw-tour-tap'));
    root.querySelectorAll('.mw-tour-front').forEach((element) => element.classList.remove('mw-tour-front'));
    root.querySelectorAll('.mw-tour-shade,.mw-tour-card').forEach((element) => element.remove());
    document.body.classList.remove('mw-tour-open');
  }

  function stop(persist) {
    if (!active) return;
    active = null;
    document.removeEventListener('click', onOutsideTap, true);
    document.removeEventListener('keydown', onKeydown, true);
    clearLayer();
    if (persist) {
      const state = MW.state.get();
      state.ui.tutorialStatus = 'done';
      MW.state.save();
    }
  }

  function openScreen(screen) {
    if (MW.state.get().ui.screen === screen) return true;
    const button =
      screen === 'settings'
        ? root.querySelector('#settingsButton')
        : root.querySelector('.bottom-nav [data-nav="' + screen + '"]');
    if (!button) return false;
    internalNavigation = true;
    try {
      button.click();
    } finally {
      internalNavigation = false;
    }
    return true;
  }

  function afterNavigation(nextIndex) {
    if (!active) return;
    active.changing = true;
    clearLayer();
    active.index = nextIndex;
    const generation = ++active.generation;
    // Let the app's own slide transition show which tab was opened.
    setTimeout(
      () => {
        if (!active || active.generation !== generation) return;
        present(nextIndex).catch(() => stop(false));
      },
      prefersReducedMotion() ? 35 : 330,
    );
  }

  function advance(navigatedByUser = false) {
    if (!active || (active.changing && !navigatedByUser)) return;
    const index = active.index;
    const step = steps[index];
    const next = index + 1;
    if (next >= steps.length) {
      stop(true);
      return;
    }
    if (step.opens) {
      if (!navigatedByUser && !openScreen(step.opens)) {
        stop(false);
        return;
      }
      afterNavigation(next);
      return;
    }
    active.index = next;
    present(next).catch(() => stop(false));
  }

  function onOutsideTap(event) {
    if (!active || internalNavigation) return;
    if (active.changing) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    const card = root.querySelector('.mw-tour-card');
    if (card && card.contains(event.target) && event.target.closest('button')) return;
    const step = steps[active.index];
    if (step.opens && active.target && active.target.contains(event.target)) {
      // Allow this exact highlighted tab's own click handler to navigate.
      // The next step is shown only once the app's page transition has played.
      advance(true);
      return;
    }
    // Outside taps still advance, without activating a different control by accident.
    event.preventDefault();
    event.stopImmediatePropagation();
    advance();
  }

  function onKeydown(event) {
    if (!active) return;
    if (event.key === 'Escape' || event.key === 'Backspace') {
      event.preventDefault();
      stop(true);
      return;
    }
    if (active.changing) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      advance();
    } else if (event.key === 'Tab') {
      const card = root.querySelector('.mw-tour-card');
      if (!card) return;
      const controls = [
        card.querySelector('#mwTourSkip'),
        ...(steps[active.index].opens && active.target ? [active.target] : []),
        card.querySelector('#mwTourNext'),
      ].filter(Boolean);
      const current = controls.indexOf(document.activeElement);
      if (event.shiftKey && (current <= 0 || document.activeElement === card)) {
        event.preventDefault();
        controls[controls.length - 1].focus();
      } else if (!event.shiftKey && (current === controls.length - 1 || document.activeElement === card)) {
        event.preventDefault();
        controls[0].focus();
      }
    }
  }

  async function findTarget(step, generation) {
    for (let attempt = 0; attempt < 75; attempt++) {
      if (!active || active.generation !== generation) return null;
      const target =
        MW.state.get().ui.screen === step.screen ? root.querySelector('.shell ' + step.selector) : null;
      if (target && target.getClientRects().length) return target;
      await pause(65);
    }
    return null;
  }

  async function scrollToFeature(target, generation) {
    if (!target || !target.isConnected) return;
    const nav = root.querySelector('.bottom-nav');
    if (target.closest('.bottom-nav')) return;
    if (target.closest('.appbar')) {
      if (window.scrollY > 12) {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
        await pause(prefersReducedMotion() ? 40 : 470);
      }
      return;
    }
    const bounds = target.getBoundingClientRect();
    const availableBottom = nav ? nav.getBoundingClientRect().top : window.innerHeight;
    const isVisible = bounds.top >= 65 && bounds.bottom <= availableBottom - 22;
    const desiredTop = Math.min(115, Math.max(65, Math.round(availableBottom * 0.17)));
    if (isVisible && bounds.top <= desiredTop + 45) return;
    const before = window.scrollY;
    const destination = Math.max(0, before + bounds.top - desiredTop);
    if (Math.abs(destination - before) < 14) return;
    // No mask or highlight is shown while the screen moves: users can follow the scroll.
    window.scrollTo({ top: destination, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
    await pause(prefersReducedMotion() ? 40 : 470);
    if (!active || active.generation !== generation) return;
  }

  function positionCard(card, target) {
    const nav = root.querySelector('.bottom-nav');
    const topLimit = 12;
    const bottomLimit = Math.min(
      window.innerHeight - 10,
      (nav?.getBoundingClientRect().top ?? window.innerHeight) - 8,
    );
    const height = card.getBoundingClientRect().height;
    let bounds = target.getBoundingClientRect();
    let below = bounds.bottom + 12;
    let above = bounds.top - height - 12;

    if (below + height > bottomLimit && above < topLimit && !target.closest('.bottom-nav,.appbar')) {
      const move = bounds.top - 26;
      window.scrollBy({ top: move, behavior: 'instant' });
      bounds = target.getBoundingClientRect();
      below = bounds.bottom + 12;
      above = bounds.top - height - 12;
    }
    const top =
      below + height <= bottomLimit
        ? below
        : above >= topLimit
          ? above
          : Math.max(topLimit, Math.min(below, bottomLimit - height));
    card.style.top = Math.round(top) + 'px';
  }

  async function present(index) {
    if (!active) return;
    const generation = ++active.generation;
    active.changing = true;
    clearLayer();
    const step = steps[index];
    // This normally matches already; only a missing/optional step may need reconciliation.
    if (!openScreen(step.screen)) {
      stop(false);
      return;
    }
    const target = await findTarget(step, generation);
    if (!active || active.generation !== generation) return;
    if (!target) {
      if (!step.optional) {
        stop(false);
        return;
      }
      active.changing = false;
      advance();
      return;
    }
    await pause(prefersReducedMotion() ? 45 : 145);
    if (!active || active.generation !== generation || !target.isConnected) return;
    await scrollToFeature(target, generation);
    if (!active || active.generation !== generation || !target.isConnected) return;

    const shell = root.querySelector('.shell');
    const nav = shell?.querySelector('.bottom-nav');
    if (!shell || !nav) {
      stop(false);
      return;
    }
    active.target = target;
    target.classList.add('mw-tour-target');
    if (step.opens) target.classList.add('mw-tour-tap');
    // Both navigation landmarks retain their normal appearance. The active tab remains clear.
    nav.classList.add('mw-tour-front');
    if (target.closest('.appbar')) shell.querySelector('.appbar')?.classList.add('mw-tour-front');

    const shade = document.createElement('div');
    shade.className = 'mw-tour-shade';
    shade.setAttribute('aria-hidden', 'true');
    const card = document.createElement('section');
    card.className = 'mw-tour-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'true');
    card.setAttribute('tabindex', '-1');
    card.setAttribute('aria-labelledby', 'mwTourTitle');
    card.setAttribute('aria-describedby', 'mwTourCopy');
    card.innerHTML =
      '<span class="eyebrow">' +
      step.section +
      ' · ' +
      (index + 1) +
      ' OF ' +
      steps.length +
      '</span><h2 id="mwTourTitle">' +
      step.title +
      '</h2><p id="mwTourCopy">' +
      step.copy +
      '</p>' +
      (step.opens ? '<p class="mw-tour-tap-hint">Tap the highlighted button to continue</p>' : '') +
      '<div class="mw-tour-actions"><button type="button" class="btn secondary" id="mwTourSkip">Skip tour</button>' +
      '<button type="button" class="btn primary" id="mwTourNext">' +
      (index === steps.length - 1 ? 'Finish' : step.opens ? 'Open tab' : 'Next') +
      '</button></div>';
    card.querySelector('#mwTourSkip').addEventListener('click', () => stop(true));
    card.querySelector('#mwTourNext').addEventListener('click', () => advance());
    document.body.classList.add('mw-tour-open');
    shell.append(shade, card);
    positionCard(card, target);
    card.focus({ preventScroll: true });
    active.changing = false;
  }

  function start() {
    if (active) return;
    active = { index: 0, generation: 0, changing: true, target: null };
    document.addEventListener('click', onOutsideTap, true);
    document.addEventListener('keydown', onKeydown, true);
    present(0).catch(() => stop(false));
  }

  function maybeStart() {
    if (active || document.hidden || MW.state.recoveryStatus?.().blocked) return;
    const state = MW.state.get();
    if (!state.onboarded || state.ui.screen !== 'week' || state.ui.tutorialStatus !== 'pending') return;
    if (!root.querySelector('.bottom-nav [data-nav="week"]')) return;
    start();
  }

  function addReplayLink() {
    const state = MW.state.get();
    const status = root.querySelector('#settingsSaveStatus');
    if (state.ui.screen !== 'settings' || !status || root.querySelector('#mwReplayTour')) return;
    const section = document.createElement('section');
    section.className = 'settings-section';
    section.innerHTML =
      '<button type="button" class="settings-link" id="mwReplayTour">' +
      '<i class="fa-solid fa-circle-question" aria-hidden="true"></i>' +
      '<span><strong>Show tutorial</strong><small>See how the main screens work</small></span>' +
      '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>';
    status.before(section);
    section.querySelector('button').addEventListener('click', () => {
      const state = MW.state.get();
      state.ui.tutorialStatus = 'pending';
      MW.state.save();
      root.querySelector('.bottom-nav [data-nav="week"]')?.click();
    });
  }

  function sync() {
    if (active && !active.changing && !root.querySelector('.mw-tour-card')) stop(false);
    addReplayLink();
    maybeStart();
  }

  const observer = new MutationObserver(() => {
    if (observerQueued) return;
    observerQueued = true;
    queueMicrotask(() => {
      observerQueued = false;
      sync();
    });
  });
  observer.observe(root, { childList: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) sync();
  });
  window.addEventListener('mw:storage-error', () => stop(false));
  MW.tutorial = {
    dismiss() {
      if (!active) return false;
      stop(true);
      return true;
    },
  };
  sync();
})();
