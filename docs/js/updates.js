window.MW=window.MW||{};
(function(){
  'use strict';
  const MANIFEST_URL='https://raw.githubusercontent.com/LeighArmstrong/myweek-updates/main/latest.json';
  const CACHE_KEY='myweek_update_check_v2';
  const CHECK_INTERVAL=12*60*60*1000;
  const PENDING_KEY='myweek_update_pending_v1';
  let progressBound=false;

  function isNativeAndroid(){
    try{return Boolean(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform()&&Capacitor.getPlatform&&Capacitor.getPlatform()==='android');}
    catch{return false;}
  }

  function nativeUpdater(){
    return window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.MyWeekUpdater;
  }

  async function appInfo(){
    if(!isNativeAndroid()){
      const build=MW.APP_BUILD||{};
      return {version:build.versionName||'Web app',build:String(build.versionCode||0),platform:'web'};
    }
    const updater=nativeUpdater();
    if(updater&&typeof updater.getInstalledInfo==='function'){
      const info=await updater.getInstalledInfo();
      return {version:String(info.versionName||''),build:String(info.versionCode||0),packageName:info.packageName,canRequestPackageInstalls:info.canRequestPackageInstalls};
    }
    const app=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.App;
    if(!app||typeof app.getInfo!=='function')return {version:'unknown',build:'0'};
    return app.getInfo();
  }  function newer(remote,local){
    const r=Number(remote&&remote.versionCode),l=Number(local&&local.build);
    return Number.isFinite(r)&&Number.isFinite(l)&&r>l;
  }

  function validManifest(data){
    if(!data||typeof data!=='object')return false;
    if(!Number.isInteger(Number(data.versionCode))||Number(data.versionCode)<=0||!String(data.versionName||'').trim())return false;
    if(!/^https:\/\/github\.com\/LeighArmstrong\/myweek-updates\/releases\/download\//i.test(String(data.apkUrl||'')))return false;
    if(!/^[a-f0-9]{64}$/i.test(String(data.sha256||'')))return false;
    if(data.releaseNotes!=null&&!Array.isArray(data.releaseNotes))return false;
    return true;
  }

  async function fetchManifest(){
    const response=await fetch(MANIFEST_URL,{cache:'no-store',headers:{Accept:'application/json'}});
    if(!response.ok)throw new Error('Update service returned HTTP '+response.status);
    const data=await response.json();
    if(!validManifest(data))throw new Error('Update manifest was not valid.');
    data.versionCode=Number(data.versionCode);
    data.releaseNotes=(data.releaseNotes||[]).slice(0,8).map(String);
    return data;
  }

  async function check(options={}){
    if(!isNativeAndroid())return {supported:false,reason:'web',local:await appInfo(),automatic:true};
    const now=Date.now(),manual=Boolean(options.manual);
    const local=await appInfo();
    if(!manual){
      try{
        const cached=JSON.parse(localStorage.getItem(CACHE_KEY)||'null');
        if(cached&&now-Number(cached.checkedAt||0)<CHECK_INTERVAL&&validManifest(cached.manifest)){
          const manifest=cached.manifest;
          return {supported:true,available:newer(manifest,local),manifest,local,checkedAt:Number(cached.checkedAt||now),cached:true};
        }
      }catch{}
    }
    try{
      const manifest=await fetchManifest();
      const result={supported:true,available:newer(manifest,local),manifest,local,checkedAt:now};
      try{localStorage.setItem(CACHE_KEY,JSON.stringify({checkedAt:now,manifest}));}catch{}
      return result;
    }catch(error){
      const result={supported:true,available:false,error:String(error&&error.message||error),local,checkedAt:now};
      if(manual)throw error;
      return result;
    }
  }

  async function pendingStatus(){
    if(!isNativeAndroid())return null;
    let pending=null;
    try{pending=JSON.parse(localStorage.getItem(PENDING_KEY)||'null');}catch{}
    if(!pending||!Number.isFinite(Number(pending.versionCode)))return null;
    const local=await appInfo();
    const installed=Number(local.build)>=Number(pending.versionCode);
    if(installed){
      try{localStorage.removeItem(PENDING_KEY);localStorage.removeItem(CACHE_KEY);}catch{}
    }
    return {pending,local,installed};
  }

  async function bindProgress(){
    if(progressBound)return;
    const updater=nativeUpdater();
    if(!updater||typeof updater.addListener!=='function')return;
    progressBound=true;
    try{
      await updater.addListener('downloadProgress',event=>{
        try{window.dispatchEvent(new CustomEvent('mw:update-progress',{detail:{percent:Number(event&&event.percent)||0}}));}catch{}
      });
    }catch{progressBound=false;}
  }

  async function install(manifest){
    if(!validManifest(manifest))throw new Error('This update could not be verified from its release manifest.');
    if(!isNativeAndroid())throw new Error('The web app updates itself automatically.');
    const updater=nativeUpdater();
    if(!updater||typeof updater.installUpdate!=='function')throw new Error('This My Week build cannot install updates safely yet.');
    try{
      localStorage.setItem(PENDING_KEY,JSON.stringify({
        versionCode:Number(manifest.versionCode),
        versionName:String(manifest.versionName||''),
        requestedAt:new Date().toISOString()
      }));
      localStorage.removeItem(CACHE_KEY);
    }catch{}
    await bindProgress();
    try{
      return await updater.installUpdate({url:manifest.apkUrl,sha256:String(manifest.sha256).toLowerCase()});
    }catch(error){
      try{localStorage.removeItem(PENDING_KEY);}catch{}
      throw error;
    }
  }

  MW.updates={MANIFEST_URL,isNativeAndroid,appInfo,check,install,pendingStatus,validManifest,newer,bindProgress};
})();