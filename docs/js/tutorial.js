window.MW = window.MW || {};
(function () {
  'use strict';

  if (typeof document === 'undefined') return;
  const root = document.getElementById('app');
  if (!root || !MW.state) return;

  const steps = [
    {
      selector: '.bottom-nav [data-nav="week"]',
      title: 'Your meal plan',
      copy: 'Your meals for the week live here. Tap a day to see or change what you will cook.',
    },
    {
      selector: '.bottom-nav [data-nav="recipes"]',
      title: 'Discover recipes',
      copy: 'Browse dishes and add any you like to your weekly plan.',
    },
    {
      selector: '.bottom-nav [data-nav="myrecipes"]',
      title: 'Keep your favourites',
      copy: 'Find your saved favourites and recipes you have added yourself.',
    },
    {
      selector: '.bottom-nav [data-nav="shopreview"]',
      title: 'Your shopping list',
      copy: 'Ingredients appear together here. Tick things off and add any extras you need.',
    },
    {
      selector: '#settingsButton',
      title: 'Make it yours',
      copy: 'Change your supermarket, budget, meal days and food preferences in Settings.',
    },
  ];

  let active = null;
  let queued = false;

  function clearLayer() {
    root.querySelectorAll('.mw-tour-target').forEach((el) => el.classList.remove('mw-tour-target'));
    root.querySelectorAll('.mw-tour-front').forEach((el) => el.classList.remove('mw-tour-front'));
    root.querySelectorAll('.mw-tour-shade,.mw-tour-card').forEach((el) => el.remove());
    document.body.classList.remove('mw-tour-open');
  }

  function stop(persist) {
    if (!active) return;
    const target = active.target;
    active = null;
    document.removeEventListener('keydown', onKeydown, true);
    clearLayer();
    if (persist) {
      const state = MW.state.get();
      state.ui.tutorialStatus = 'done';
      MW.state.save();
    }
    if (target && target.isConnected) target.focus({ preventScroll: true });
  }

  function advance() {
    if (!active) return;
    active.index += 1;
    if (active.index === steps.length) stop(true);
    else show(active.index);
  }

  function show(index) {
    clearLayer();
    const shell = root.querySelector('.shell');
    const step = steps[index];
    const target = shell && shell.querySelector(step.selector);
    if (!target) {
      stop(false);
      return;
    }
    active.target = target;
    target.classList.add('mw-tour-target');
    const parent = target.closest('.bottom-nav,.appbar');
    if (parent) parent.classList.add('mw-tour-front');

    const shade = document.createElement('button');
    shade.type = 'button';
    shade.className = 'mw-tour-shade';
    shade.setAttribute('tabindex', '-1');
    shade.setAttribute('aria-hidden', 'true');
    shade.addEventListener('click', advance);

    const card = document.createElement('section');
    card.className = 'mw-tour-card' + (index === steps.length - 1 ? ' mw-tour-card-top' : '');
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'true');
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
    card.addEventListener('click', (event) => {
      if (!event.target.closest('button')) advance();
    });
    card.querySelector('#mwTourSkip').addEventListener('click', () => stop(true));
    card.querySelector('#mwTourNext').addEventListener('click', advance);
    document.body.classList.add('mw-tour-open');
    shell.append(shade, card);
    card.querySelector('#mwTourNext').focus({ preventScroll: true });
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
      if (event.shiftKey && document.activeElement === skip) {
        event.preventDefault();
        next.focus();
      } else if (!event.shiftKey && document.activeElement === next) {
        event.preventDefault();
        skip.focus();
      }
    }
  }

  function maybeStart() {
    if (active || document.hidden || MW.state.recoveryStatus?.().blocked) return;
    const state = MW.state.get();
    if (!state.onboarded || state.ui.screen !== 'week' || state.ui.tutorialStatus !== 'pending') return;
    if (!root.querySelector('.bottom-nav [data-nav="week"]')) return;
    active = { index: 0, target: null };
    document.addEventListener('keydown', onKeydown, true);
    show(0);
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
    if (active && !root.querySelector('.mw-tour-card')) stop(false);
    addReplayLink();
    maybeStart();
  }

  const observer = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    queueMicrotask(() => {
      queued = false;
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
