window.MW=window.MW||{};
(function(){
  'use strict';
  const MANIFEST_URL='https://raw.githubusercontent.com/LeighArmstrong/myweek-updates/main/latest.json';
  const CACHE_KEY='myweek_update_check_v2';
  const CHECK_INTERVAL=12*60*60*1000;
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
    if(!manual){
      try{
        const cached=JSON.parse(localStorage.getItem(CACHE_KEY)||'null');
        if(cached&&now-Number(cached.checkedAt||0)<CHECK_INTERVAL&&cached.result)return cached.result;
      }catch{}
    }    const local=await appInfo();
    try{
      const manifest=await fetchManifest();
      const result={supported:true,available:newer(manifest,local),manifest,local,checkedAt:now};
      try{localStorage.setItem(CACHE_KEY,JSON.stringify({checkedAt:now,result}));}catch{}
      return result;
    }catch(error){
      const result={supported:true,available:false,error:String(error&&error.message||error),local,checkedAt:now};
      if(manual)throw error;
      return result;
    }
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
    await bindProgress();
    return updater.installUpdate({url:manifest.apkUrl,sha256:String(manifest.sha256).toLowerCase()});
  }

  MW.updates={MANIFEST_URL,isNativeAndroid,appInfo,check,install,validManifest,newer,bindProgress};
})();