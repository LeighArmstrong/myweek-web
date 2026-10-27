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
      title: 'Plan each day',
      copy: 'Tap a day to turn lunch or dinner on or off, or choose what to cook.',
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
      selector: '.shop-item-shell',
      title: 'Tick items off',
      copy: 'Tap the tick box beside an item when you pick it up. Your ticks stay saved.',
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
    root
      .querySelectorAll('.mw-tour-overlay,.mw-tour-shade,.mw-tour-card')
      .forEach((element) => element.remove());
    document.body.classList.remove('mw-tour-open');
    if (active) active.refresh = null;
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

  const TOUR_GAP = 14;
  const TOUR_PAD = 4;
  const TOUR_MARGIN = 12;

  function targetCornerRadii(target, width, height) {
    const computed = window.getComputedStyle(target);
    const cap = Math.min(width, height) / 2;
    const cssValue = (value, axis) => {
      const token = String(value || '0').split(' ')[0];
      const number = parseFloat(token);
      if (!Number.isFinite(number)) return 0;
      return Math.max(0, token.includes('%') ? (number * axis) / 100 : number);
    };
    const corners = [
      computed.borderTopLeftRadius,
      computed.borderTopRightRadius,
      computed.borderBottomRightRadius,
      computed.borderBottomLeftRadius,
    ];
    const minSide = Math.min(width, height);
    return corners.map((value) => {
      const x = cssValue(value, width);
      const y = cssValue(value.includes(' ') ? value.split(' ')[1] : value, height);
      // The cutout is padded beyond the real element; its corner grows
      // by exactly the same padding rather than using a universal radius.
      return Math.min(cap, Math.max(0, Math.min(x, y) + TOUR_PAD), minSide / 2);
    });
  }

  function roundedCutoutPath(x, y, width, height, radii) {
    const [tl, tr, br, bl] = radii;
    const right = x + width;
    const bottom = y + height;
    return [
      'M',
      x + tl,
      y,
      'L',
      right - tr,
      y,
      'Q',
      right,
      y,
      right,
      y + tr,
      'L',
      right,
      bottom - br,
      'Q',
      right,
      bottom,
      right - br,
      bottom,
      'L',
      x + bl,
      bottom,
      'Q',
      x,
      bottom,
      x,
      bottom - bl,
      'L',
      x,
      y + tl,
      'Q',
      x,
      y,
      x + tl,
      y,
      'Z',
    ].join(' ');
  }

  function spotlightRect(target) {
    const rect = target.getBoundingClientRect();
    const x = Math.max(0, rect.left - TOUR_PAD);
    const y = Math.max(0, rect.top - TOUR_PAD);
    const right = Math.min(window.innerWidth, rect.right + TOUR_PAD);
    const bottom = Math.min(window.innerHeight, rect.bottom + TOUR_PAD);
    return {
      x,
      y,
      right,
      bottom,
      width: Math.max(1, right - x),
      height: Math.max(1, bottom - y),
    };
  }

  function svgElement(name, attributes) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', name);
    for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));
    return element;
  }

  function showSpotlight(shell, target) {
    // A transparent hole with the target's real corner shape. No glow,
    // added white border, or extra space in the underlying screen.
    const overlay = document.createElement('div');
    overlay.className = 'mw-tour-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    const svg = svgElement('svg', { 'aria-hidden': 'true' });
    const defs = svgElement('defs', {});
    const mask = svgElement('mask', { id: 'mwTourMask', maskUnits: 'userSpaceOnUse' });
    const body = svgElement('rect', { fill: 'white' });
    const hole = svgElement('path', { class: 'mw-tour-hole', fill: 'black' });
    const shade = svgElement('rect', {
      class: 'mw-tour-shade',
      fill: 'rgba(17, 32, 26, 0.66)',
      mask: 'url(#mwTourMask)',
    });
    mask.append(body, hole);
    defs.append(mask);
    svg.append(defs, shade);
    overlay.append(svg);
    shell.append(overlay);
    const refresh = () => {
      if (!target.isConnected) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const rect = spotlightRect(target);
      const radii = targetCornerRadii(target, rect.width, rect.height);
      svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
      for (const shape of [body, shade]) {
        for (const [key, value] of Object.entries({ x: 0, y: 0, width, height }))
          shape.setAttribute(key, String(value));
      }
      hole.setAttribute('d', roundedCutoutPath(rect.x, rect.y, rect.width, rect.height, radii));
      for (const [key, value] of Object.entries(rect)) hole.setAttribute('data-' + key, String(value));
      hole.setAttribute('data-radii', radii.map((v) => v.toFixed(2)).join(','));
      mask.setAttribute('x', '0');
      mask.setAttribute('y', '0');
      mask.setAttribute('width', String(width));
      mask.setAttribute('height', String(height));
    };
    refresh();
    return refresh;
  }

  function cardPlacementCandidates(card, target) {
    const bounds = spotlightRect(target);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const navTop = root.querySelector('.bottom-nav')?.getBoundingClientRect().top ?? height;
    const limitBottom = Math.min(height - TOUR_MARGIN, navTop - 8);
    const cardRect = card.getBoundingClientRect();
    const panelWidth = cardRect.width;
    const panelHeight = cardRect.height;
    const maxX = Math.max(16, width - panelWidth - 16);
    const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
    const cx = (bounds.x + bounds.right) / 2;
    const cy = (bounds.y + bounds.bottom) / 2;
    const centeredX = clamp(cx - panelWidth / 2, 16, maxX);
    const centeredY = clamp(
      cy - panelHeight / 2,
      TOUR_MARGIN,
      Math.max(TOUR_MARGIN, limitBottom - panelHeight),
    );
    const candidates = [];
    const add = (side, left, top) => {
      const right = left + panelWidth,
        bottom = top + panelHeight;
      if (left >= 15 && right <= width - 15 && top >= TOUR_MARGIN - 0.5 && bottom <= limitBottom + 0.5) {
        candidates.push({ side, left, top, right, bottom, bounds });
      }
    };
    add('below', centeredX, bounds.bottom + TOUR_GAP);
    add('above', centeredX, bounds.y - TOUR_GAP - panelHeight);
    add('right', bounds.right + TOUR_GAP, centeredY);
    add('left', bounds.x - TOUR_GAP - panelWidth, centeredY);
    return { candidates, bounds, navTop, limitBottom, cardRect };
  }

  async function createRoomForCard(card, target, generation) {
    if (target.closest('.bottom-nav,.appbar')) return;
    const first = cardPlacementCandidates(card, target);
    if (first.candidates.length) return;
    const rect = target.getBoundingClientRect();
    const requiredTop = first.limitBottom - first.cardRect.height - TOUR_GAP - TOUR_PAD - rect.height;
    if (rect.top > requiredTop + 2 && window.scrollY > 0) {
      const distance = Math.min(window.scrollY, Math.ceil(rect.top - requiredTop));
      window.scrollTo({
        top: window.scrollY + distance,
        behavior: prefersReducedMotion() ? 'instant' : 'smooth',
      });
      await pause(prefersReducedMotion() ? 35 : 470);
      if (!active || active.generation !== generation) return;
    }
    const second = cardPlacementCandidates(card, target);
    if (!second.candidates.length) {
      // Only on unusually short screens: keep the gap precise and let the
      // explanation scroll internally, never cover the cutout itself.
      const availableBelow = second.limitBottom - second.bounds.bottom - TOUR_GAP;
      if (availableBelow >= 95) card.style.maxHeight = Math.floor(availableBelow) + 'px';
    }
  }

  function positionCard(card, target) {
    const positioned = cardPlacementCandidates(card, target);
    const isTab = Boolean(target.closest('.bottom-nav'));
    const isHeader = Boolean(target.closest('.appbar'));
    let choices = positioned.candidates;
    if (isTab) choices = choices.filter((candidate) => candidate.side === 'above');
    if (isHeader) choices = choices.filter((candidate) => candidate.side === 'below');
    // The exact measured gap wins over covering unrelated controls. All valid
    // positions are adjacent to the cutout by the same TOUR_GAP.
    const controls = Array.from(
      root.querySelectorAll(
        '.shell button,.shell input,.shell select,.shell textarea,.shell [role="button"]',
      ),
    )
      .filter(
        (element) =>
          !card.contains(element) &&
          element !== target &&
          !target.contains(element) &&
          !element.contains(target) &&
          element.getClientRects().length > 0,
      )
      .map((element) => element.getBoundingClientRect());
    const intersect = (a, b) =>
      Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) *
      Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    choices.sort((a, b) => {
      const score = (item) =>
        controls.reduce((sum, other) => sum + intersect(item, other), 0) +
        (item.side === 'below' ? 0 : item.side === 'above' ? 1 : 2);
      return score(a) - score(b);
    });
    const candidate = choices[0] || {
      side: isTab ? 'above' : isHeader ? 'below' : 'below',
      left: Math.max(16, (window.innerWidth - positioned.cardRect.width) / 2),
      top: Math.max(
        TOUR_MARGIN,
        Math.min(positioned.limitBottom - positioned.cardRect.height, positioned.bounds.bottom + TOUR_GAP),
      ),
    };
    card.style.left = Math.round(candidate.left) + 'px';
    card.style.top = Math.round(candidate.top) + 'px';
    card.classList.toggle('mw-tour-card-tab', isTab);
    if (isTab) {
      const center = (positioned.bounds.x + positioned.bounds.right) / 2;
      card.style.setProperty(
        '--mw-tour-arrow-x',
        Math.max(16, Math.min(positioned.cardRect.width - 16, center - candidate.left)) + 'px',
      );
    } else {
      card.style.removeProperty('--mw-tour-arrow-x');
    }
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
    shell.append(card);
    await createRoomForCard(card, target, generation);
    if (!active || active.generation !== generation || !target.isConnected) return;
    target.classList.add('mw-tour-target');
    const refreshHole = showSpotlight(shell, target);
    document.body.classList.add('mw-tour-open');
    active.target = target;
    active.refresh = () => {
      refreshHole();
      if (card.isConnected) positionCard(card, target);
    };
    active.refresh();
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

  // Keep the cut-out aligned on orientation changes and screen resizing.
  const refreshPosition = () => {
    if (active && !active.changing && active.refresh) active.refresh();
  };
  window.addEventListener('resize', refreshPosition);
  window.addEventListener('orientationchange', refreshPosition);
  window.addEventListener('scroll', refreshPosition, { passive: true });

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
