window.MW = window.MW || {};
(function(){
  const KEY='myweek_online_recipes_v1';
  let cache=null;

  function splitSteps(text){
    const raw=String(text||'').replace(/\r/g,'').trim();
    if(!raw) return [];
    let parts=raw.split(/\n+/).map(x=>x.trim()).filter(Boolean);
    if(parts.length<2){
      parts=raw.split(/(?<=[.!?])\s+(?=[A-Z0-9])/).map(x=>x.trim()).filter(x=>x.length>3);
    }
    return parts;
  }

  function estimateCost(category,ingredients){
    const c=String(category||'').toLowerCase();
    let base=5.25+(ingredients.length*0.22);
    if(/seafood|beef|lamb|goat/.test(c)) base+=2.25;
    else if(/chicken|pork/.test(c)) base+=1.35;
    else if(/vegetarian|vegan/.test(c)) base-=0.4;
    return Math.round(Math.max(4.5,Math.min(12.5,base))*10)/10;
  }

  function normaliseMeal(m){
    if(!m||!m.idMeal||!m.strMeal) return null;
    const ingredients=[];
    for(let i=1;i<=20;i++){
      const name=String(m['strIngredient'+i]||'').trim();
      if(!name) continue;
      const measure=String(m['strMeasure'+i]||'').trim()||'as needed';
      ingredients.push([measure,name]);
    }
    const category=String(m.strCategory||'').trim();
    const area=String(m.strArea||'').trim();
    return {
      id:'mealdb-'+m.idMeal,
      externalId:String(m.idMeal),
      title:String(m.strMeal).trim(),
      subtitle:[area,category].filter(Boolean).join(' · '),
      time:null,
      cost:estimateCost(category,ingredients),
      costEstimated:true,
      servings:null,
      scaleSafe:false,
      tags:[category,area].filter(Boolean).map(x=>x.toLowerCase()),
      category,
      area,
      image:MW.images.heroForOnline({title:String(m.strMeal).trim(),category,area}),
      imageSource:'',
      imageLicense:'Pexels License',
      imageProvenance:'Bundled local fallback selected for optional online recipes',
      sourceImageUrl:String(m.strMealThumb||'').trim(),
      ingredients,
      steps:splitSteps(m.strInstructions),
      source:'TheMealDB',
      sourceUrl:String(m.strSource||('https://www.themealdb.com/meal/'+m.idMeal)),
      online:true
    };
  }

  function load(){
    if(cache) return cache;
    try{
      const parsed=JSON.parse(localStorage.getItem(KEY));
      cache=parsed&&Array.isArray(parsed.recipes)?parsed:{recipes:[],syncedAt:null};
    }catch(e){
      cache={recipes:[],syncedAt:null};
    }
    return cache;
  }

  function save(recipes){
    const payload={recipes,syncedAt:new Date().toISOString()};
    try{
      localStorage.setItem(KEY,JSON.stringify(payload));
      cache=payload;
    }catch(e){
      const trimmed=recipes.slice(0,450);
      cache={recipes:trimmed,syncedAt:payload.syncedAt,trimmed:true};
      try{localStorage.setItem(KEY,JSON.stringify(cache));}catch(ignore){}
    }
    return cache;
  }

  async function fetchLetter(letter){
    try{
      const r=await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f='+encodeURIComponent(letter),{cache:'no-store'});
      if(!r.ok) return [];
      const j=await r.json();
      return Array.isArray(j.meals)?j.meals:[];
    }catch(e){return [];}
  }

  async function sync(force,onProgress){
    const current=load();
    if(current.recipes.length&&!force) return current;
    const letters='abcdefghijklmnopqrstuvwxyz'.split('');
    const meals=[];
    const seen=new Set();
    const batchSize=5;
    for(let i=0;i<letters.length;i+=batchSize){
      const batch=letters.slice(i,i+batchSize);
      const results=await Promise.all(batch.map(fetchLetter));
      results.flat().forEach(m=>{
        if(!m||seen.has(String(m.idMeal))) return;
        seen.add(String(m.idMeal));
        meals.push(m);
      });
      if(typeof onProgress==='function') onProgress({done:Math.min(i+batch.length,letters.length),total:letters.length,count:meals.length});
    }
    const recipes=meals.map(normaliseMeal).filter(Boolean).sort((a,b)=>a.title.localeCompare(b.title));
    return save(recipes);
  }

  function all(){return load().recipes.slice();}
  function byId(id){return load().recipes.find(x=>x.id===id)||null;}
  function categories(){
    return [...new Set(load().recipes.map(x=>x.category).filter(Boolean))].sort();
  }
  function search(query,category,limit,offset){
    const q=String(query||'').trim().toLowerCase();
    const c=String(category||'').trim().toLowerCase();
    const start=Math.max(0,Number(offset)||0);
    const max=Math.max(1,Math.min(100,Number(limit)||40));
    return load().recipes.filter(r=>{
      const matchesQ=!q||(r.title+' '+r.subtitle+' '+r.ingredients.map(x=>x[1]).join(' ')).toLowerCase().includes(q);
      const matchesC=!c||String(r.category||'').toLowerCase()===c;
      return matchesQ&&matchesC;
    }).slice(start,start+max);
  }

  function clear(){cache={recipes:[],syncedAt:null};try{localStorage.removeItem(KEY);}catch(e){}}

  function exportData(){const x=load();return JSON.parse(JSON.stringify(x));}
  function replaceData(value){const safe=value&&Array.isArray(value.recipes)?{recipes:value.recipes,syncedAt:value.syncedAt||null}:{recipes:[],syncedAt:null};localStorage.setItem(KEY,JSON.stringify(safe));cache=safe;return exportData();}
  MW.onlineRecipes={load,all,byId,categories,search,sync,clear,normaliseMeal,exportData,replaceData};
  MW.catalog={
    get(id){return MW.RECIPES.find(x=>x.id===id)||byId(id);},
    all(){return MW.RECIPES.concat(all());}
  };
})();