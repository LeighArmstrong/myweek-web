window.MW=window.MW||{};
(function(){
  'use strict';
  let workerPromise=null,loaderPromise=null;

  function assetUrl(path){
    return new URL(path,document.baseURI).href;
  }

  async function ensureLibrary(){
    if(window.Tesseract&&typeof window.Tesseract.createWorker==='function')return window.Tesseract;
    if(loaderPromise)return loaderPromise;
    loaderPromise=new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src=assetUrl('vendor/tesseract/tesseract.min.js');
      script.async=true;
      script.onload=()=>{
        if(window.Tesseract&&typeof window.Tesseract.createWorker==='function')resolve(window.Tesseract);
        else reject(new Error('The local receipt reader did not initialise.'));
      };
      script.onerror=()=>reject(new Error('The local receipt reader could not be loaded.'));
      document.head.appendChild(script);
    }).catch(error=>{loaderPromise=null;throw error;});
    return loaderPromise;
  }

  async function getWorker(onProgress){
    const tesseract=await ensureLibrary();
    if(!workerPromise){
      workerPromise=tesseract.createWorker('eng',1,{
        workerPath:assetUrl('vendor/tesseract/worker.min.js'),
        langPath:assetUrl('vendor/tesseract/lang/'),
        corePath:assetUrl('vendor/tesseract/core/'),
        logger:event=>{
          try{
            const progress=Number(event&&event.progress);
            if(typeof onProgress==='function'&&Number.isFinite(progress))onProgress({status:String(event.status||''),progress});
          }catch{}
        }
      }).catch(error=>{workerPromise=null;throw error;});
    }
    return workerPromise;
  }

  async function detectText(file,onProgress){
    const worker=await getWorker(onProgress);
    const result=await worker.recognize(file);
    return {text:String(result&&result.data&&result.data.text||'')};
  }

  async function terminate(){
    if(!workerPromise)return;
    try{const worker=await workerPromise;await worker.terminate();}catch{}
    workerPromise=null;
  }

  MW.webOcr={detectText,terminate};
})();