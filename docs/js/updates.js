window.MW = window.MW || {};
(function () {
  'use strict';
  const MANIFEST_URL = 'https://raw.githubusercontent.com/LeighArmstrong/myweek-updates/main/latest.json';
  const CACHE_KEY = 'myweek_update_check_v2';
  const CHECK_INTERVAL = 12 * 60 * 60 * 1000;
  const PENDING_KEY = 'myweek_update_pending_v1';
  let progressBound = false;

  function isNativeAndroid() {
    try {
      return Boolean(
        window.Capacitor &&
        Capacitor.isNativePlatform &&
        Capacitor.isNativePlatform() &&
        Capacitor.getPlatform &&
        Capacitor.getPlatform() === 'android',
      );
    } catch {
      return false;
    }
  }

  function nativeUpdater() {
    return window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.MyWeekUpdater;
  }

  async function appInfo() {
    if (!isNativeAndroid()) {
      const build = MW.APP_BUILD || {};
      return {
        version: build.versionName || 'Web app',
        build: String(build.versionCode || 0),
        platform: 'web',
      };
    }
    const updater = nativeUpdater();
    if (updater && typeof updater.getInstalledInfo === 'function') {
      const info = await updater.getInstalledInfo();
      return {
        version: String(info.versionName || ''),
        build: String(info.versionCode || 0),
        packageName: info.packageName,
        canRequestPackageInstalls: info.canRequestPackageInstalls,
      };
    }
    const app = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
    if (!app || typeof app.getInfo !== 'function') return { version: 'unknown', build: '0' };
    return app.getInfo();
  }
  function newer(remote, local) {
    const r = Number(remote && remote.versionCode),
      l = Number(local && local.build);
    return Number.isFinite(r) && Number.isFinite(l) && r > l;
  }

  function validManifest(data) {
    if (!data || typeof data !== 'object') return false;
    if (
      !Number.isInteger(Number(data.versionCode)) ||
      Number(data.versionCode) <= 0 ||
      !String(data.versionName || '').trim()
    )
      return false;
    if (
      !/^https:\/\/github\.com\/LeighArmstrong\/myweek-updates\/releases\/download\//i.test(
        String(data.apkUrl || ''),
      )
    )
      return false;
    if (!/^[a-f0-9]{64}$/i.test(String(data.sha256 || ''))) return false;
    if (data.releaseNotes != null && !Array.isArray(data.releaseNotes)) return false;
    return true;
  }

  async function fetchManifest() {
    const response = await fetch(MANIFEST_URL, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error('Update service returned HTTP ' + response.status);
    const data = await response.json();
    if (!validManifest(data)) throw new Error('Update manifest was not valid.');
    data.versionCode = Number(data.versionCode);
    data.releaseNotes = (data.releaseNotes || []).slice(0, 8).map(String);
    return data;
  }

  async function check(options = {}) {
    if (!isNativeAndroid())
      return { supported: false, reason: 'web', local: await appInfo(), automatic: true };
    const now = Date.now(),
      manual = Boolean(options.manual);
    const local = await appInfo();
    if (!manual) {
      try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
        if (
          cached &&
          now - Number(cached.checkedAt || 0) < CHECK_INTERVAL &&
          validManifest(cached.manifest) &&
          newer(cached.manifest, local)
        ) {
          const manifest = cached.manifest;
          return {
            supported: true,
            available: true,
            manifest,
            local,
            checkedAt: Number(cached.checkedAt || now),
            cached: true,
          };
        }
      } catch {}
    }
    try {
      const manifest = await fetchManifest();
      const result = { supported: true, available: newer(manifest, local), manifest, local, checkedAt: now };
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ checkedAt: now, manifest }));
      } catch {}
      return result;
    } catch (error) {
      const result = {
        supported: true,
        available: false,
        error: String((error && error.message) || error),
        local,
        checkedAt: now,
      };
      if (manual) throw error;
      return result;
    }
  }

  function readPending() {
    try {
      return JSON.parse(localStorage.getItem(PENDING_KEY) || 'null');
    } catch {
      return null;
    }
  }
  function writePending(manifest, extra = {}) {
    const previous = readPending();
    const same = previous && previous.sha256 === String(manifest.sha256).toLowerCase();
    const pending = {
      ...(same ? previous : {}),
      versionCode: Number(manifest.versionCode),
      versionName: String(manifest.versionName || ''),
      apkUrl: String(manifest.apkUrl || ''),
      sha256: String(manifest.sha256 || '').toLowerCase(),
      requestedAt: same ? previous.requestedAt : new Date().toISOString(),
      awaitingPermission: false,
      ...extra,
    };
    try {
      localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
      localStorage.removeItem(CACHE_KEY);
    } catch {}
    return pending;
  }

  let active = true,
    state = { phase: 'idle' },
    timer = null;
  let installFlight = null,
    refreshFlight = null,
    resumeFlight = null;
  const transferring = (value) => ['starting', 'downloading', 'paused', 'checking'].includes(value.phase);
  function stopPolling() {
    if (timer != null) clearTimeout(timer);
    timer = null;
  }
  function emit(type, detail) {
    try {
      window.dispatchEvent(new CustomEvent(type, { detail }));
    } catch {}
  }
  function publish(next) {
    state = { ...next, percent: Math.max(0, Math.min(100, Number(next.percent) || 0)) };
    emit('mw:update-state', state);
    emit('mw:update-progress', state);
    stopPolling();
    if (
      active &&
      (transferring(state) || (state.phase === 'ready' && state.installerDeferred)) &&
      nativeUpdater()?.getUpdateStatus
    ) {
      timer = setTimeout(() => {
        timer = null;
        recover().catch(() => {});
      }, 1500);
    }
    return state;
  }
  function view(value = state) {
    const percent = Number(value.percent) || 0;
    switch (value.phase) {
      case 'starting':
        return {
          title: 'Preparing update',
          message: 'Preparing the download…',
          label: 'Preparing…',
          busy: true,
        };
      case 'downloading':
        return {
          title: percent ? 'Downloading ' + percent + '%' : 'Downloading update',
          message: 'You can leave MyWeek while it downloads.',
          label: percent ? 'Downloading ' + percent + '%' : 'Downloading…',
          busy: true,
        };
      case 'paused':
        return {
          title: 'Download paused' + (percent ? ' · ' + percent + '%' : ''),
          message: value.message || 'Waiting for a connection.',
          label: 'Waiting for connection',
          busy: true,
        };
      case 'checking':
        return {
          title: 'Checking update',
          message: 'Checking the downloaded package…',
          label: 'Checking…',
          busy: true,
        };
      case 'permission':
        return {
          title: 'Install permission needed',
          message: 'Turn on Allow from this source, then return to MyWeek.',
          label: 'Allow update',
          busy: false,
        };
      case 'ready':
        return {
          title: 'Update ready',
          message: 'The download is saved. Continue to open Android’s installer.',
          label: 'Continue update',
          busy: false,
        };
      case 'installer-opened':
        return {
          title: 'Android installer opened',
          message: 'If you dismissed it, tap Continue update.',
          label: 'Continue update',
          busy: false,
        };
      case 'failed':
        return {
          title: 'Update needs attention',
          message: value.message || 'Please try again.',
          label: 'Retry update',
          busy: false,
        };
      case 'installed':
        return {
          title: 'Updated successfully',
          message: 'Your update is installed.',
          label: 'Updated',
          busy: false,
        };
      default:
        return null;
    }
  }
  function manifestFrom(pending) {
    return { ...pending, releaseNotes: [] };
  }

  async function pendingStatus() {
    if (!isNativeAndroid()) return null;
    let pending = readPending();
    const updater = nativeUpdater();
    let nativeState = null;
    if (updater && typeof updater.getUpdateStatus === 'function') {
      nativeState = await updater.getUpdateStatus();
      if (nativeState && nativeState.url && nativeState.sha256 && Number(nativeState.versionCode) > 0) {
        pending = writePending(
          { ...nativeState, apkUrl: nativeState.url },
          {
            awaitingPermission: Boolean(pending?.sha256 === nativeState.sha256 && pending.awaitingPermission),
            error:
              transferring(nativeState) || pending?.sha256 !== nativeState.sha256 ? '' : pending?.error || '',
            ...(nativeState.phase === 'installer-opened'
              ? { installerOpenedAt: pending?.installerOpenedAt || new Date().toISOString() }
              : {}),
          },
        );
      }
    }
    if (!pending || !Number.isFinite(Number(pending.versionCode))) return null;
    const local = await appInfo();
    const installed = Number(local.build) >= Number(pending.versionCode);
    if (installed) {
      try {
        localStorage.removeItem(PENDING_KEY);
        localStorage.removeItem(CACHE_KEY);
      } catch {}
      publish({ phase: 'installed', versionCode: Number(pending.versionCode) });
    } else if (pending.awaitingPermission && !local.canRequestPackageInstalls) {
      publish({ phase: 'permission', pending });
    } else if (nativeState && nativeState.phase !== 'idle' && nativeState.phase !== 'installed') {
      const installerError = pending.error && ['ready', 'installer-opened'].includes(nativeState.phase);
      publish({
        ...nativeState,
        ...(installerError ? { phase: 'failed', message: pending.error } : {}),
        pending,
      });
    } else if (pending.awaitingPermission) {
      publish({ phase: 'permission', pending });
    } else if (pending.error) {
      publish({ phase: 'failed', message: pending.error, pending });
    } else if (pending.installerOpenedAt) {
      publish({ phase: 'installer-opened', pending });
    } else if (nativeState?.phase === 'idle') {
      // Missing Android job is an explicit retry, never an automatic new download on resume.
      publish({ phase: 'failed', message: 'The saved download is no longer available. Try again.', pending });
    }
    return { pending, local, installed, state };
  }

  async function bindProgress() {
    if (progressBound) return;
    const updater = nativeUpdater();
    if (!updater || typeof updater.addListener !== 'function') return;
    progressBound = true;
    try {
      await updater.addListener('downloadProgress', (event) => {
        publish({ ...state, phase: 'downloading', percent: Number(event?.percent) || 0 });
      });
    } catch {
      progressBound = false;
    }
  }
  function install(manifest) {
    if (installFlight) return installFlight;
    const operation = async () => {
      if (!validManifest(manifest))
        throw new Error('This update could not be verified from its release manifest.');
      if (!isNativeAndroid()) throw new Error('The web app updates itself automatically.');
      const updater = nativeUpdater();
      if (!updater || typeof updater.installUpdate !== 'function')
        throw new Error('This MyWeek build cannot install updates safely yet.');
      const local = await appInfo();
      if (!newer(manifest, local)) throw new Error('This update is already installed.');
      const pending = writePending(manifest, { error: '' });
      publish({ ...state, phase: transferring(state) ? state.phase : 'starting', pending });
      await bindProgress();
      try {
        const result = await updater.installUpdate({
          url: manifest.apkUrl,
          sha256: String(manifest.sha256).toLowerCase(),
          versionCode: Number(manifest.versionCode),
          versionName: String(manifest.versionName),
        });
        if (result?.needsInstallPermission) {
          publish({ phase: 'permission', pending: writePending(manifest, { awaitingPermission: true }) });
        } else if (result?.installerOpened) {
          publish({
            ...result,
            phase: 'installer-opened',
            pending: writePending(manifest, { installerOpenedAt: new Date().toISOString(), error: '' }),
          });
        } else if (result?.phase) {
          publish({ ...result, pending });
        } else publish({ phase: 'ready', pending });
        return result;
      } catch (error) {
        const message = String(error?.message || error);
        publish({ phase: 'failed', message, pending: writePending(manifest, { error: message }) });
        throw error;
      }
    };
    installFlight = operation().finally(() => {
      installFlight = null;
    });
    return installFlight;
  }
  function resumePendingPermission() {
    if (resumeFlight) return resumeFlight;
    resumeFlight = (async () => {
      if (!active || !isNativeAndroid()) return null;
      const pending = readPending();
      if (!pending || pending.awaitingPermission !== true) return null;
      const local = await appInfo();
      if (Number(local.build) >= Number(pending.versionCode)) {
        await pendingStatus();
        return null;
      }
      if (!local.canRequestPackageInstalls) return { resumed: false, waitingForPermission: true };
      const manifest = manifestFrom(pending);
      if (!validManifest(manifest)) throw new Error('The pending update information is no longer valid.');
      const result = await install(manifest);
      return { resumed: true, result };
    })().finally(() => {
      resumeFlight = null;
    });
    return resumeFlight;
  }
  function recover() {
    if (refreshFlight) return refreshFlight;
    refreshFlight = (async () => {
      if (!active || !isNativeAndroid()) return null;
      const status = await pendingStatus();
      if (!active || !status || status.installed) return status;
      if (status.pending.awaitingPermission) {
        const detail = await resumePendingPermission();
        if (detail) emit('mw:update-permission-resume', detail);
      } else if (state.phase === 'ready' && !status.pending.installerOpenedAt && !status.pending.error) {
        await install(manifestFrom(status.pending));
      }
      return status;
    })()
      .catch((error) => {
        publish({ ...state, phase: 'failed', message: String(error?.message || error) });
        return null;
      })
      .finally(() => {
        refreshFlight = null;
      });
    return refreshFlight;
  }
  let appResumeBound = false;
  async function bindAppResume() {
    if (appResumeBound || !isNativeAndroid()) return;
    const app = window.Capacitor?.Plugins?.App;
    if (!app || typeof app.addListener !== 'function') return;
    appResumeBound = true;
    try {
      await app.addListener('appStateChange', (value) => {
        active = Boolean(value && value.isActive);
        if (active) recover();
        else stopPolling();
      });
      if (typeof app.getState === 'function') active = Boolean((await app.getState()).isActive);
      if (active && nativeUpdater()?.getUpdateStatus) recover();
    } catch {
      appResumeBound = false;
    }
  }
  MW.updates = {
    MANIFEST_URL,
    isNativeAndroid,
    appInfo,
    check,
    install,
    pendingStatus,
    resumePendingPermission,
    validManifest,
    newer,
    bindProgress,
    recover,
    getState: () => state,
    view,
  };
  bindAppResume();
})();
