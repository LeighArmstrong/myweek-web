window.MW=window.MW||{};
(function(){
  'use strict';
  const FORMAT='myweek-transfer-v3',V2_FORMAT='myweek-transfer-v2',LEGACY_FORMAT='myweek-transfer-v1';
  const MAX_CODE_CHARS=5*1024*1024,MAX_TRANSFER_BYTES=10*1024*1024;
  const enc=new TextEncoder(),dec=new TextDecoder();
  const clone=x=>JSON.parse(JSON.stringify(x));
  function checksum(text){
    let h=2166136261;
    for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619);}
    return (h>>>0).toString(36).padStart(7,'0');
  }
  function toB64(bytes){
    let out='';for(let i=0;i<bytes.length;i+=0x8000)out+=String.fromCharCode(...bytes.subarray(i,i+0x8000));
    return btoa(out).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  }
  function fromB64(text){
    text=String(text).replace(/-/g,'+').replace(/_/g,'/');while(text.length%4)text+='=';
    const raw=atob(text),bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);return bytes;
  }
  async function compress(bytes){
    if(window.fflate&&typeof window.fflate.gzipSync==='function')return window.fflate.gzipSync(bytes,{level:6});
    if(typeof CompressionStream==='function'){const stream=new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'));return new Uint8Array(await new Response(stream).arrayBuffer());}
    return null;
  }
  async function decompress(bytes){
    if(window.fflate&&typeof window.fflate.gunzipSync==='function')return window.fflate.gunzipSync(bytes);
    if(typeof DecompressionStream==='function'){const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));return new Uint8Array(await new Response(stream).arrayBuffer());}
    throw new Error('This device cannot read compressed transfer codes. Use a My Week transfer file instead.');
  }
  function wrapper(state){
    const clean=clone(state),localRecipes=MW.onlineRecipes&&MW.onlineRecipes.exportData?MW.onlineRecipes.exportData():{recipes:[],syncedAt:null};const personalRecipes=MW.personalRecipes.exportData();const raw=JSON.stringify({state:clean,localRecipes,personalRecipes});return {format:FORMAT,exportedAt:new Date().toISOString(),checksum:checksum(raw),state:clean,localRecipes,personalRecipes};
  }
  function validate(packet){
    if(!packet||![FORMAT,V2_FORMAT,LEGACY_FORMAT].includes(packet.format)||!packet.state||packet.state.schema!==1)throw new Error('This is not a valid My Week transfer.');
    const raw=packet.format===LEGACY_FORMAT?JSON.stringify(packet.state):packet.format===V2_FORMAT?JSON.stringify({state:packet.state,localRecipes:packet.localRecipes||{recipes:[],syncedAt:null}}):JSON.stringify({state:packet.state,localRecipes:packet.localRecipes||{recipes:[],syncedAt:null},personalRecipes:packet.personalRecipes});if(packet.format===FORMAT)MW.personalRecipes.validateData(packet.personalRecipes);if(checksum(raw)!==packet.checksum)throw new Error('The transfer code is incomplete or corrupted.');
    return packet;
  }
  async function createCode(){
    const packet=wrapper(MW.state.get()),bytes=enc.encode(JSON.stringify(packet)),gz=await compress(bytes);
    return gz?'MWG1.'+toB64(gz):'MWJ1.'+toB64(bytes);
  }
  async function readCode(code){
    code=String(code||'').trim();if(code.length>MAX_CODE_CHARS)throw new Error('This transfer code is too large to import safely.');const i=code.indexOf('.');if(i<0)throw new Error('Transfer code is incomplete.');
    const prefix=code.slice(0,i),payload=fromB64(code.slice(i+1));
    const bytes=prefix==='MWG1'?await decompress(payload):prefix==='MWJ1'?payload:null;if(!bytes)throw new Error('Unsupported My Week transfer code.');if(bytes.length>MAX_TRANSFER_BYTES)throw new Error('This transfer expands beyond the safe import limit.');
    return validate(JSON.parse(dec.decode(bytes)));
  }
  function createFile(){
    const packet=wrapper(MW.state.get()),stamp=packet.exportedAt.slice(0,10);
    return new File([JSON.stringify(packet,null,2)],'my-week-'+stamp+'.myweek',{type:'application/json'});
  }
  async function readFile(file){
    if(file&&Number(file.size)>MAX_TRANSFER_BYTES)throw new Error('This transfer file is too large to import safely.');
    const text=await file.text();
    try{const parsed=JSON.parse(text);if(parsed&&parsed.schema===1)return wrapper(parsed);return validate(parsed);}catch(e){return readCode(text);}
  }
  function apply(packet){
    packet=validate(packet);
    const incomingState=clone(packet.state);
    const currentWeekKey=MW.planner&&typeof MW.planner.currentWeekKey==='function'?MW.planner.currentWeekKey():'';
    if(currentWeekKey&&incomingState.week&&incomingState.week.weekKey!==currentWeekKey){
      incomingState.ui=incomingState.ui||{};
      incomingState.ui.dismissedRolloverFor=currentWeekKey;
    }
    const previousState=clone(MW.state.get());
    const previousRecipes=MW.onlineRecipes&&MW.onlineRecipes.exportData?MW.onlineRecipes.exportData():null;
    const previousPersonal=MW.personalRecipes.exportData();
    let stateApplied=false;
    try{
      const result=MW.state.replace(incomingState);
      stateApplied=true;
      if(MW.onlineRecipes&&MW.onlineRecipes.replaceData)MW.onlineRecipes.replaceData(packet.localRecipes||{recipes:[],syncedAt:null});
      if(packet.format===FORMAT)MW.personalRecipes.replaceData(packet.personalRecipes);
      return result;
    }catch(error){
      let restored=true;
      if(stateApplied){try{MW.state.replace(previousState);}catch{restored=false;}}
      if(previousRecipes&&MW.onlineRecipes&&MW.onlineRecipes.replaceData){try{MW.onlineRecipes.replaceData(previousRecipes);}catch{restored=false;}}
      try{MW.personalRecipes.replaceData(previousPersonal);}catch{restored=false;}
      if(!restored)throw new Error('The transfer could not be completed and automatic recovery also failed. Do not make further changes until recovery is checked.');
      throw new Error('The transfer could not be completed. Your previous data was restored.');
    }
  }
  async function shareFile(){
    const file=createFile(),plugins=window.Capacitor&&window.Capacitor.Plugins||{},fs=plugins.Filesystem,share=plugins.Share;
    if(fs&&share&&typeof fs.writeFile==='function'&&typeof share.share==='function'){
      const transferDir='transfers',path=transferDir+'/'+file.name;
      try{
        const listing=await fs.readdir({path:transferDir,directory:'CACHE'});
        for(const entry of listing.files||[]){const name=typeof entry==='string'?entry:entry&&entry.name;if(name&&name!==file.name&&/^my-week-\d{4}-\d{2}-\d{2}\.myweek$/.test(name)){try{await fs.deleteFile({path:transferDir+'/'+name,directory:'CACHE'});}catch{}}}
      }catch{}
      const bytes=enc.encode(await file.text()),data=toB64(bytes).replace(/-/g,'+').replace(/_/g,'/');
      const result=await fs.writeFile({path,data,directory:'CACHE',recursive:true});
      await share.share({title:'My Week transfer',text:'My Week device transfer',url:result.uri,dialogTitle:'Send My Week to another device'});
      return 'shared-native';
    }
    if(navigator.canShare&&navigator.share&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:'My Week transfer'});return 'shared';}
    const url=URL.createObjectURL(file),a=document.createElement('a');a.href=url;a.download=file.name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);return 'downloaded';
  }
  MW.syncTransfer={format:FORMAT,createCode,readCode,createFile,readFile,apply,shareFile};
})();
