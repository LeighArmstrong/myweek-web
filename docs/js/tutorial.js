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
      title: 'Your week',
      copy: 'Tap a day to see or change the meals planned for it.',
    },
    {
      screen: 'week',
      section: 'My Week',
      selector: '.home-quick-actions',
      title: 'Choose your meals',
      copy: 'Use these buttons to generate meals or pick your own.',
    },
    {
      screen: 'week',
      section: 'My Week',
      selector: '.bottom-nav [data-nav="recipes"]',
      opens: 'recipes',
      title: 'Open All Recipes',
      copy: 'Tap All Recipes in the bottom bar.',
    },
    {
      screen: 'recipes',
      section: 'All Recipes',
      selector: '.library-search-row',
      title: 'Find a recipe',
      copy: 'Search here for a meal, or use the filter button.',
    },
    {
      screen: 'recipes',
      section: 'All Recipes',
      selector: '.bottom-nav [data-nav="myrecipes"]',
      opens: 'myrecipes',
      title: 'Open My Recipes',
      copy: 'Tap My Recipes in the bottom bar.',
    },
    {
      screen: 'myrecipes',
      section: 'My Recipes',
      selector: '.personal-search-row',
      title: 'Your saved recipes',
      copy: 'Find favourites here. Tap + to add your own recipe.',
    },
    {
      screen: 'myrecipes',
      section: 'My Recipes',
      selector: '.bottom-nav [data-nav="shopreview"]',
      opens: 'shopreview',
      title: 'Open Shopping List',
      copy: 'Tap Shopping List in the bottom bar.',
    },
    {
      screen: 'shopreview',
      section: 'Shopping List',
      selector: '.retail-group header, .shop-list-empty',
      title: 'Your ingredients, ready to buy',
      copy: 'Ingredients for the meals in My Week appear here automatically, grouped into a shopping list.',
      emptyCopy:
        'Once you plan meals in My Week, their ingredients will appear here automatically, ready to buy.',
      optional: true,
    },
    {
      screen: 'shopreview',
      section: 'Shopping List',
      selector: '.shop-item-shell .shop-item',
      title: 'Tick items off',
      copy: 'Tap an item when you have picked it up. Your ticks stay saved.',
      optional: true,
    },
    {
      screen: 'shopreview',
      section: 'Shopping List',
      selector: '.shop-add-items',
      title: 'Add anything else',
      copy: 'Type any other item you need and tap Add.',
      optional: true,
    },
    {
      screen: 'shopreview',
      section: 'Shopping List',
      selector: '#settingsButton',
      opens: 'settings',
      title: 'Open Settings',
      copy: 'Tap the cog at the top right.',
    },
    {
      screen: 'settings',
      section: 'Settings',
      selector: '#retailer',
      title: 'Choose your supermarket',
      copy: 'Pick your supermarket here. You can also change your budget and food preferences in Settings.',
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

  function placeCardInFlow(card, target) {
    const shell = root.querySelector('.shell');
    if (!shell) return false;
    if (target.closest('.bottom-nav,.appbar')) {
      shell.querySelector('.appbar')?.after(card);
      return true;
    }
    // Place the explanation immediately before its feature. A normal layout
    // slot makes it impossible for it to sit on top of a different button.
    const anchor = target.closest('.retail-group,.settings-section,.shop-item-shell') || target;
    const parent = anchor.parentElement;
    if (!parent) return false;
    parent.insertBefore(card, anchor);
    return true;
  }

  async function scrollCardAndFeature(card, target, generation) {
    if (!active || active.generation !== generation) return;
    const navigation = root.querySelector('.bottom-nav');
    const availableBottom = (navigation?.getBoundingClientRect().top ?? window.innerHeight) - 12;
    const cardBounds = card.getBoundingClientRect();
    const featureBounds = target.getBoundingClientRect();
    if (target.closest('.bottom-nav,.appbar')) {
      // Navigation remains fixed. Its explanation sits just below the normal
      // page header, so it never overlays shopping rows or header actions.
      if (window.scrollY > 8) {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
        await pause(prefersReducedMotion() ? 35 : 470);
      }
      return;
    }
    const span = Math.max(cardBounds.height, featureBounds.bottom - cardBounds.top);
    const desiredTop = Math.max(12, Math.min(75, (availableBottom - span) / 2));
    const delta = cardBounds.top - desiredTop;
    if (Math.abs(delta) < 10) return;
    window.scrollTo({
      top: Math.max(0, window.scrollY + delta),
      behavior: prefersReducedMotion() ? 'instant' : 'smooth',
    });
    await pause(prefersReducedMotion() ? 35 : 470);
  }

  async function present(index) {
    if (!active) return;
    const generation = ++active.generation;
    active.changing = true;
    clearLayer();
    const step = steps[index];
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

    // The app moves to the feature first; explanation and spotlight appear only
    // once the scroll has finished, maintaining a clear point of reference.
    await scrollToFeature(target, generation);
    if (!active || active.generation !== generation || !target.isConnected) return;

    const shell = root.querySelector('.shell');
    const nav = shell?.querySelector('.bottom-nav');
    if (!shell || !nav) {
      stop(false);
      return;
    }

    const card = document.createElement('section');
    card.className = 'mw-tour-card';
    card.style.visibility = 'hidden';
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
      (step.emptyCopy && target.matches('.shop-list-empty') ? step.emptyCopy : step.copy) +
      '</p><div class="mw-tour-actions"><button type="button" class="btn secondary" id="mwTourSkip">Skip tour</button>' +
      '<button type="button" class="btn primary" id="mwTourNext">' +
      (index === steps.length - 1 ? 'Finish' : step.opens ? 'Open' : 'Next') +
      '</button></div>';
    card.querySelector('#mwTourSkip').addEventListener('click', () => stop(true));
    card.querySelector('#mwTourNext').addEventListener('click', () => advance());
    if (!placeCardInFlow(card, target)) {
      stop(false);
      return;
    }
    await scrollCardAndFeature(card, target, generation);
    if (!active || active.generation !== generation || !target.isConnected) return;

    active.target = target;
    target.classList.add('mw-tour-target');
    if (step.opens) target.classList.add('mw-tour-tap');
    nav.classList.add('mw-tour-front');
    if (target.closest('.appbar')) shell.querySelector('.appbar')?.classList.add('mw-tour-front');
    const shade = document.createElement('div');
    shade.className = 'mw-tour-shade';
    shade.setAttribute('aria-hidden', 'true');
    document.body.classList.add('mw-tour-open');
    shell.append(shade);
    card.style.visibility = '';
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
