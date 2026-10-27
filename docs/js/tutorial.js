window.MW = window.MW || {};
(function () {
  'use strict';

  if (typeof document === 'undefined') return;
  const root = document.getElementById('app');
  if (!root || !MW.state) return;

  // A brief tour of the real screens: it never creates, swaps or checks off user data.
  const steps = [
    {
      screen: 'week',
      selector: '.day-strip',
      title: 'Your week at a glance',
      copy: 'See which days have meals planned. Tap a day whenever you want to change its dinner.',
    },
    {
      screen: 'week',
      selector: '.home-quick-actions',
      title: 'Make the plan yours',
      copy: 'Generate a fresh selection or choose your own meals. Unfinished dinners are not replaced automatically.',
    },
    {
      screen: 'recipes',
      selector: '.library-search-row',
      title: 'Discover recipes',
      copy: 'Search or filter meals, then tap any recipe to see its ingredients and cooking guide.',
    },
    {
      screen: 'myrecipes',
      selector: '.personal-search-row',
      title: 'Your saved recipes',
      copy: 'Find recipes you have favourited here. Use the plus button to add your own.',
    },
    {
      screen: 'shopreview',
      selector: '.shop-add-items',
      title: 'Add anything extra',
      copy: 'Add items that are not in your recipes. They appear in Additions at the top of the list.',
    },
    {
      screen: 'shopreview',
      selector: '.shop-item-shell',
      title: 'Tick things off',
      copy: 'Tick items as you shop. Your checklist stays saved, even if you come back later.',
    },
    {
      screen: 'settings',
      selector: '.settings-section',
      title: 'Make it yours',
      copy: 'Change your supermarket, budget and meal preferences in Settings. Changes save automatically.',
    },
  ];

  let active = null;
  let observerQueued = false;
  let internalNavigation = false;

  function clearLayer() {
    root.querySelectorAll('.mw-tour-target').forEach((el) => el.classList.remove('mw-tour-target'));
    root.querySelectorAll('.mw-tour-front').forEach((el) => el.classList.remove('mw-tour-front'));
    root.querySelectorAll('.mw-tour-shade,.mw-tour-card').forEach((el) => el.remove());
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

  function advance() {
    if (!active || active.changing) return;
    const next = active.index + 1;
    if (next >= steps.length) stop(true);
    else {
      active.index = next;
      present(next).catch(() => stop(false));
    }
  }

  function onOutsideTap(event) {
    if (!active || internalNavigation) return;
    const card = root.querySelector('.mw-tour-card');
    if (card && card.contains(event.target) && event.target.closest('button')) return;
    // Even a tap on another real control should only move the tour, not act on the app.
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!active.changing) advance();
  }

  function onKeydown(event) {
    if (!active) return;
    if (event.key === 'Escape' || event.key === 'Backspace') {
      event.preventDefault();
      stop(true);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      advance();
    } else if (event.key === 'Tab') {
      const card = root.querySelector('.mw-tour-card');
      if (!card) return;
      const skip = card.querySelector('#mwTourSkip');
      const next = card.querySelector('#mwTourNext');
      if (event.shiftKey && (document.activeElement === skip || document.activeElement === card)) {
        event.preventDefault();
        next.focus();
      } else if (!event.shiftKey && document.activeElement === next) {
        event.preventDefault();
        skip.focus();
      }
    }
  }

  function pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

  async function findTarget(step, generation) {
    for (let tries = 0; tries < 65; tries++) {
      if (!active || active.generation !== generation) return null;
      const target =
        MW.state.get().ui.screen === step.screen ? root.querySelector('.shell ' + step.selector) : null;
      if (target && target.getClientRects().length) return target;
      await pause(70);
    }
    return null;
  }

  function positionCard(card, target) {
    const nav = root.querySelector('.bottom-nav');
    const topLimit = 12;
    const bottomLimit = Math.min(
      window.innerHeight - 12,
      (nav?.getBoundingClientRect().top ?? window.innerHeight) - 10,
    );
    const height = card.getBoundingClientRect().height;
    let box = target.getBoundingClientRect();
    let below = box.bottom + 12;
    let above = box.top - height - 12;

    // On landscape devices there may not initially be room above or below.
    // Move the real target towards the top rather than placing the card over it.
    if (below + height > bottomLimit && above < topLimit) {
      window.scrollBy({ top: box.top - 18, behavior: 'instant' });
      box = target.getBoundingClientRect();
      below = box.bottom + 12;
      above = box.top - height - 12;
    }
    const top =
      below + height <= bottomLimit
        ? below
        : above >= topLimit
          ? above
          : Math.min(Math.max(topLimit, below), Math.max(topLimit, bottomLimit - height));
    card.style.top = Math.round(top) + 'px';
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
      // An empty week may have no ingredient rows. Do not trap anyone in the tour.
      active.changing = false;
      advance();
      return;
    }
    // A page transition may finish its own scroll after rendering.
    await pause(100);
    if (!active || active.generation !== generation || !target.isConnected) return;
    const initial = target.getBoundingClientRect();
    const bottomNav = root.querySelector('.bottom-nav')?.getBoundingClientRect().top ?? window.innerHeight;
    if (initial.top < 0 || initial.bottom > bottomNav - 12) {
      target.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'instant' });
      window.scrollBy({ top: -Math.min(78, Math.round(window.innerHeight * 0.15)), behavior: 'instant' });
    }

    const shell = root.querySelector('.shell');
    const nav = shell?.querySelector('.bottom-nav');
    if (!shell || !nav) {
      stop(false);
      return;
    }
    active.target = target;
    target.classList.add('mw-tour-target');
    // The bottom navigation retains its usual white background and active-tab state.
    nav.classList.add('mw-tour-front');

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
      '<span class="eyebrow">QUICK TOUR · ' +
      (index + 1) +
      ' OF ' +
      steps.length +
      '</span><h2 id="mwTourTitle">' +
      step.title +
      '</h2><p id="mwTourCopy">' +
      step.copy +
      '</p><div class="mw-tour-actions"><button type="button" class="btn secondary" id="mwTourSkip">Skip</button>' +
      '<button type="button" class="btn primary" id="mwTourNext">' +
      (index === steps.length - 1 ? 'Finish' : 'Next') +
      '</button></div>';
    card.querySelector('#mwTourSkip').addEventListener('click', () => stop(true));
    card.querySelector('#mwTourNext').addEventListener('click', advance);
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
      '<span><strong>Show tutorial</strong><small>A quick tour of the essentials</small></span>' +
      '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>';
    status.before(section);
    section.querySelector('button').addEventListener('click', () => {
      const latest = MW.state.get();
      latest.ui.tutorialStatus = 'pending';
      MW.state.save();
      root.querySelector('.bottom-nav [data-nav="week"]')?.click();
    });
  }

  function sync() {
    // During intentional screen navigation the app replaces the whole shell.
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
