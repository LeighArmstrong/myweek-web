window.MW=window.MW||{};
(function(){
  'use strict';
  const KEY='myweek_personal_recipes_v1',MAX_RECIPES=500,MAX_BYTES=2*1024*1024;
  const clone=x=>JSON.parse(JSON.stringify(x));
  let cache=null,lastRaw;
  const entities={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' ',frac12:'½',frac14:'¼',frac34:'¾',deg:'°',ndash:'–',mdash:'—',rsquo:'’',lsquo:'‘'};
  function text(value){return String(value==null?'':value).replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi,' ').replace(/<br\s*\/?\s*>|<\/(?:p|li|div)>/gi,'\n').replace(/<[^>]*>/g,'').replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi,(_,e)=>{if(e[0]==='#'){const n=e[1].toLowerCase()==='x'?parseInt(e.slice(2),16):Number(e.slice(1));return n>0&&n<=0x10ffff?String.fromCodePoint(n):'';}return entities[e.toLowerCase()]||'&'+e+';';}).replace(/[ \t]+/g,' ').trim();}
  function publicUrl(value,base){
    let u;try{u=new URL(String(value||''),base);}catch{throw new Error('Enter a valid recipe link.');}const host=u.hostname.toLowerCase();
    if(u.protocol!=='https:'||u.username||u.password||u.port&&u.port!=='443'||!host.includes('.')||/^(?:localhost|.*\.(?:localhost|local|internal|test|invalid))$/.test(host)||/^[\d.]+$/.test(host)||host.includes(':'))throw new Error('Use a public https recipe link.');
    u.hash='';return u.href;
  }
  function splitIngredient(line){
    const clean=text(line);
    const m=clean.match(/^((?:(?:\d+(?:[.,]\d+)?(?:\s*\/\s*\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞])(?:\s+(?:\d+\/\d+|[¼½¾⅓⅔⅛⅜⅝⅞]))?(?:\s*[-–]\s*\d+(?:\.\d+)?)?)(?:\s*(?:kg|grams?|g|ml|litres?|liters?|l|teaspoons?|tsp|tablespoons?|tbsp|cups?|oz|ounces?|lb|pounds?|cloves?|tins?|cans?|cartons?|packs?|sachets?|bunches?|slices?|pinch(?:es)?|handfuls?))?)\s+(.+)$/i);
    return m?[m[1].trim(),m[2].trim()]:['As listed',clean];
  }
  function instructions(value){
    if(Array.isArray(value))return value.flatMap(instructions);
    if(typeof value==='string')return text(value).split(/\n+/).map(x=>x.trim()).filter(Boolean);
    if(!value||typeof value!=='object')return [];
    if(value.itemListElement)return instructions(value.itemListElement);
    if(value.text)return instructions(value.text);
    return [];
  }
  function minutes(value){const m=String(value||'').match(/^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i);if(!m)return null;const n=Number(m[1]||0)*1440+Number(m[2]||0)*60+Number(m[3]||0)+Number(m[4]||0)/60;return n>0?Math.ceil(n):null;}
  function sourceRecipe(value,url){
    const lines=Array.isArray(value.recipeIngredient)?value.recipeIngredient.map(text).filter(Boolean):[];
    const steps=instructions(value.recipeInstructions);
    if(!text(value.name)||!lines.length||!steps.length)return null;
    const yieldText=text([].concat(value.recipeYield||[]).join(' ')),match=yieldText.match(/(?:^|\b)(\d+)\s*(?:servings?|portions?|people|persons?)\b/i)||yieldText.match(/^\d+$/);
    const servings=match?Number(match[1]||match[0]):null;
    const image=[].concat(value.image||[]).map(x=>typeof x==='string'?x:x&&x.url||x&&x.contentUrl).find(Boolean);
    let imageUrl='';try{if(image)imageUrl=publicUrl(image,url);}catch{}
    return validateRecipe({title:text(value.name),ingredients:lines.map(splitIngredient),ingredientLines:lines,steps,servings:servings>0&&servings<=100?servings:null,scaleSafe:false,time:minutes(value.totalTime)||((minutes(value.prepTime)||0)+(minutes(value.cookTime)||0))||null,sourceUrl:url,source:new URL(url).hostname.replace(/^www\./,''),sourceImageUrl:imageUrl,sourceYield:yieldText});
  }
  function parseHtml(html,url){
    url=publicUrl(url);if(typeof html!=='string'||html.length>3*1024*1024)throw new Error('This page is too large to import.');
    const found=[],seen=new Set();
    function walk(value,depth){if(!value||depth>15)return;if(Array.isArray(value)){value.forEach(x=>walk(x,depth+1));return;}if(typeof value!=='object')return;
      if([].concat(value['@type']||[]).some(x=>String(x).split(/[\/#]/).pop().toLowerCase()==='recipe')){const r=sourceRecipe(value,url);if(r&&!seen.has(r.title)){seen.add(r.title);found.push(r);}}
      for(const [key,child] of Object.entries(value)){if(key!=='recipeInstructions'&&typeof child==='object')walk(child,depth+1);}
    }
    for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)){if(!/\btype\s*=\s*["']application\/ld\+json["']/i.test(m[1]))continue;try{walk(JSON.parse(m[2].trim()),0);}catch(error){if(error.message&&/limit|too many/.test(error.message))throw error;}}
    if(!found.length)throw new Error('This website did not provide a readable recipe. You can paste the ingredients and method instead.');
    return found.slice(0,20);
  }
  function validateRecipe(input){
    if(!input||typeof input!=='object')throw new Error('Invalid recipe.');
    const title=text(input.title);if(!title||title.length>180)throw new Error('Add a recipe name of up to 180 characters.');
    if(!Array.isArray(input.ingredients)||!input.ingredients.length||input.ingredients.length>100)throw new Error('Add between 1 and 100 ingredients.');
    const ingredients=input.ingredients.map(row=>{if(!Array.isArray(row)||row.length!==2||row.some(x=>typeof x!=='string'))throw new Error('Invalid ingredient.');const amount=text(row[0]),name=text(row[1]);if(!amount||!name||amount.length>160||name.length>400)throw new Error('Check the ingredient quantities and names.');return [amount,name];});
    if(!Array.isArray(input.steps)||!input.steps.length||input.steps.length>100)throw new Error('Add between 1 and 100 cooking steps.');
    const steps=input.steps.map(x=>{if(typeof x!=='string')throw new Error('Invalid cooking step.');const s=text(x);if(!s||s.length>6000)throw new Error('A cooking step is blank or too long.');return s;});
    let sourceUrl='',sourceImageUrl='';if(input.sourceUrl)sourceUrl=publicUrl(input.sourceUrl);if(input.sourceImageUrl)sourceImageUrl=publicUrl(input.sourceImageUrl);
    const id=String(input.id||'');if(id&&!/^personal-[a-z0-9-]{8,80}$/.test(id))throw new Error('Invalid personal recipe ID.');
    const n=Number(input.servings),servings=Number.isInteger(n)&&n>0&&n<=100?n:null;
    const time=Number(input.time)>0&&Number(input.time)<=10080?Number(input.time):null;
    const r={id,title,subtitle:'',ingredients,steps,servings,time,scaleSafe:false,personal:true,online:true,tags:[],source:sourceUrl?new URL(sourceUrl).hostname.replace(/^www\./,''):'My recipe',sourceUrl,sourceImageUrl,sourceYield:text(input.sourceYield).slice(0,160),allergenVerification:'unverified',createdAt:String(input.createdAt||new Date().toISOString()),updatedAt:String(input.updatedAt||new Date().toISOString())};
    r.ingredientLines=Array.isArray(input.ingredientLines)&&input.ingredientLines.length===ingredients.length?input.ingredientLines.map(text):ingredients.map(x=>x[0]==='As listed'?x[1]:x.join(' '));
    return r;
  }
  function validateData(value){if(!value||value.schema!==1||!Array.isArray(value.recipes)||value.recipes.length>MAX_RECIPES)throw new Error('Invalid My Recipes data.');const recipes=value.recipes.map(validateRecipe);if(new Set(recipes.map(r=>r.id)).size!==recipes.length||recipes.some(r=>!r.id))throw new Error('Invalid or duplicate recipe IDs.');return {schema:1,recipes};}
  function load(){if(cache)return cache;lastRaw=localStorage.getItem(KEY);cache=lastRaw===null?{schema:1,recipes:[]}:validateData(JSON.parse(lastRaw));return cache;}
  function replaceData(value){load();const next=validateData(value),raw=JSON.stringify(next);if(raw.length>MAX_BYTES)throw new Error('My Recipes is full. Export a backup before removing recipes.');if(localStorage.getItem(KEY)!==lastRaw)throw new Error('My Recipes changed in another window. Reload before saving.');localStorage.setItem(KEY,raw);cache=next;lastRaw=raw;if(typeof window.dispatchEvent==='function')window.dispatchEvent(new Event('myweek:recipes-changed'));return clone(next);}
  function all(){return clone(load().recipes);}
  function byId(id){return load().recipes.find(r=>r.id===id)||null;}
  function save(input){const r=validateRecipe(input),next=all(),existing=next.find(x=>x.id===r.id);if(!r.id)r.id='personal-'+(window.crypto&&window.crypto.randomUUID?window.crypto.randomUUID():Date.now().toString(36)+'-'+Math.random().toString(36).slice(2));r.createdAt=existing?existing.createdAt:r.createdAt;r.updatedAt=new Date().toISOString();const i=next.findIndex(x=>x.id===r.id);if(i<0)next.push(r);else next[i]=r;replaceData({schema:1,recipes:next});return byId(r.id);}
  function remove(id){const st=MW.state.get(),used=Boolean(st.week&&((st.week.meals||[]).some(x=>x.recipeId===id)||st.week.lunchId===id));if(used)throw new Error('Remove this recipe from your week before deleting it.');replaceData({schema:1,recipes:all().filter(r=>r.id!==id)});}
  async function importUrl(url){
    url=publicUrl(url);const endpoint=MW.cloudConfig&&MW.cloudConfig.recipeImportUrl;if(!endpoint)throw new Error('Recipe-link import is unavailable. You can paste a recipe below.');
    const token=MW.accounts&&await MW.accounts.idToken();if(!token)throw new Error('Sign in from Settings to import a recipe link. You can also paste a recipe below.');
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),22000);let html,finalUrl=url;
    try{const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify({url}),signal:controller.signal,cache:'no-store'});if(!/application\/json/i.test(r.headers.get('Content-Type')||''))throw new Error('Recipe-link import is temporarily unavailable. You can paste the ingredients and method below.');const data=await r.json();if(!r.ok)throw new Error(data.error||'The website could not be read.');html=data.html;finalUrl=publicUrl(data.url||url);}catch(error){if(error.name==='AbortError')throw new Error('The website took too long to respond. Try pasting the recipe instead.');throw error;}finally{clearTimeout(timer);}
    return parseHtml(html,finalUrl);
  }
  MW.personalRecipes={all,byId,save,remove,replaceData,validateData,validateRecipe,exportData:()=>clone(load()),parseHtml,splitIngredient,publicUrl,text,importUrl,minutes};
  const catalog=MW.catalog;MW.catalog={get:id=>byId(id)||catalog.get(id),all:()=>catalog.all().concat(all())};
})();
