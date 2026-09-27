window.MW=window.MW||{};
(function(){
  'use strict';
  function isNative(){
    try{return Boolean(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform());}catch{return false;}
  }
  async function register(){
    if(isNative()||!('serviceWorker' in navigator))return;
    try{
      const registration=await navigator.serviceWorker.register('./service-worker.js',{scope:'./'});
      registration.update().catch(()=>{});
      MW.pwa={registration,web:true};
    }catch(error){
      MW.pwa={registration:null,web:true,error:String(error&&error.message||error)};
    }
  }
  if(typeof document==='undefined')return;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',register,{once:true});
  else register();
})();