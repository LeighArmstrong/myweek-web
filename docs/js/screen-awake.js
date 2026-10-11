window.MW = window.MW || {};
(function () {
  'use strict';

  let lock = null;
  let pending = null;
  let generation = 0;
  let started = false;
  let nativeActive = true;
  const enabled = () => Boolean(MW.state.get().ui?.keepScreenAwake);
  const supported = () =>
    typeof navigator !== 'undefined' && typeof navigator.wakeLock?.request === 'function';
  const visible = () => nativeActive && !document.hidden;

  async function release() {
    generation++;
    const previous = lock;
    lock = null;
    if (previous && !previous.released) {
      try {
        await previous.release();
      } catch {
        /* A revoked platform lock is already inactive. */
      }
    }
  }

  async function sync() {
    if (!enabled() || !supported() || !visible()) {
      await release();
      return false;
    }
    if (lock && !lock.released) return true;
    if (pending) return pending;

    const requestedGeneration = generation;
    pending = (async () => {
      await Promise.resolve();
      try {
        const requested = await navigator.wakeLock.request('screen');
        // Turning the switch off or hiding the app while the platform prompt is
        // pending must not leave a newly granted lock holding the screen awake.
        if (requestedGeneration !== generation || !enabled() || !visible()) {
          await requested.release();
          return false;
        }
        lock = requested;
        requested.addEventListener?.('release', () => {
          if (lock === requested) lock = null;
        });
        return true;
      } catch {
        return false;
      } finally {
        pending = null;
        if (requestedGeneration !== generation && enabled() && visible()) sync();
      }
    })();
    return pending;
  }

  function setEnabled(value) {
    const state = MW.state.get();
    state.ui.keepScreenAwake = Boolean(value);
    MW.state.save();
    return sync();
  }

  function start() {
    if (started) return;
    started = true;
    MW.state.onCommit?.(() => sync());
    document.addEventListener('visibilitychange', () => (document.hidden ? release() : sync()));
    const app = window.Capacitor?.Plugins?.App;
    if (app?.addListener) {
      const listener = app.addListener('appStateChange', (event) => {
        nativeActive = Boolean(event?.isActive);
        return nativeActive ? sync() : release();
      });
      listener?.catch?.(() => {});
    }
    sync();
  }

  MW.screenAwake = { enabled, supported, setEnabled, sync, release, start };
})();
