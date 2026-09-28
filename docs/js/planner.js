window.MW = window.MW || {};
(function(){
  const norm=x=>String(x||'').toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim();
  const visualKey=r=>{
    const photo=r&&MW.sourcedFinalCache&&MW.sourcedFinalCache[r.id];
    if(photo&&photo.role==='declared-final'&&photo.source===r.sourceImageUrl&&/^[a-f0-9]{64}$/.test(photo.sha256))return 'sha256:'+photo.sha256;
    return (r&&r.sourceImageUrl)||(r&&r.imageBase)||(r&&r.image)||'';
  };
  const sourceFamilyKey=r=>{
    const src=String(r&&r.sourceImageUrl||'');
    const match=src.match(/_UK_([^_/?#]+)_/i);
    return match?match[1].toLowerCase():'';
  };
  const titleTokens=r=>String(r&&r.title||'').toLowerCase().match(/[a-z0-9]+/g)||[];
  const titleSimilarity=(a,b)=>{
    const stop=new Set(['with','and','the','a','an','style','of','in','on','your','our']);
    const aa=new Set(titleTokens(a).filter(x=>!stop.has(x)));
    const bb=new Set(titleTokens(b).filter(x=>!stop.has(x)));
    if(!aa.size||!bb.size) return 0;
    let shared=0;
    aa.forEach(x=>{if(bb.has(x)) shared++;});
    const union=new Set([...aa,...bb]).size;
    return union?shared/union:0;
  };
  const isNearClone=(recipe,chosen)=>chosen.some(x=>{
    const a=sourceFamilyKey(recipe),b=sourceFamilyKey(x);
    if(a&&b&&a===b) return true;
    const sim=titleSimilarity(recipe,x);
    const short=Math.min(titleTokens(recipe).length,titleTokens(x).length);
    return short>=4&&sim>=0.72;
  });
  const getRecipe=id=>(MW.catalog&&MW.catalog.get(id))||MW.RECIPES.find(x=>x.id===id);

  function startOfWeek(date){
    const d=new Date(date||new Date());
    d.setHours(12,0,0,0);
    const offset=(d.getDay()+6)%7;
    d.setDate(d.getDate()-offset);
    return d;
  }

  function dateKey(date){
    const d=new Date(date);
    return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
  }

  function currentWeekKey(date){return dateKey(startOfWeek(date||new Date()));}

  function todayKey(date){
    const order=MW.DAYS.map(x=>x.key);
    return order[(new Date(date||new Date()).getDay()+6)%7]||'mon';
  }

  function remainingDinnerDays(date,days){
    const order=MW.DAYS.map(x=>x.key);
    const todayIndex=(new Date(date||new Date()).getDay()+6)%7;
    return (days||MW.state.get().plan.dinnerDays||[]).filter(x=>order.indexOf(x)>=todayIndex);
  }

  function allowed(recipe){
    const s=MW.state.get();
    const avoid=['mushroom',...(s.household.restrictions||[])].filter(Boolean);
    const basic=MW.avoidance
      ?!MW.avoidance.recipeContains(recipe,avoid)
      :!avoid.some(x=>(recipe.title+' '+recipe.subtitle+' '+recipe.ingredients.map(y=>y[1]).join(' ')).toLowerCase().includes(String(x).toLowerCase()));
    const foodOk=!MW.food || MW.food.allowed(recipe,s.foodProfile);
    const equipmentOk=!MW.equipment || MW.equipment.allows(recipe,s.household);
    return basic && foodOk && equipmentOk;
  }

  const knownProfiles=[
    ['lemonHerb','lemon herb'],['smokyPaprika','smoky paprika'],['cuminLime','cumin lime'],
    ['coconutCurry','coconut curry'],['gingerSoy','ginger soy'],['teriyaki','teriyaki'],
    ['misoGinger','miso ginger'],['sweetChilli','sweet chilli'],['satay','peanut satay'],
    ['harissa','harissa'],['tomatoBasil','tomato basil'],['pestoLemon','pesto lemon'],
    ['creamyTomato','creamy tomato'],['garlicYoghurt','garlic yoghurt'],['tomatoOregano','tomato oregano'],
    ['jerkLime','jerk lime'],['maplePaprika','maple paprika'],['mustardHerb','mustard herb'],
    ['rosemaryGarlic','rosemary garlic'],['tahiniLemon','tahini lemon']
  ];

  function flavourProfile(recipe){
    if(recipe&&recipe.flavourProfile) return recipe.flavourProfile;
    const title=String(recipe&&recipe.title||'').toLowerCase();
    const found=knownProfiles.find(x=>title.includes(x[1]));
    if(found) return found[0];
    if(/\blemon\b/.test(title)) return 'lemonHerb';
    return '';
  }

  function flavourFamily(recipe){
    const p=flavourProfile(recipe);
    if(['lemonHerb','pestoLemon','harissa','garlicYoghurt','rosemaryGarlic','tahiniLemon'].includes(p)) return 'citrus-herb';
    if(['cuminLime','jerkLime'].includes(p)) return 'lime-spice';
    if(['teriyaki','gingerSoy','misoGinger','sweetChilli','satay'].includes(p)) return 'east-asian';
    if(['tomatoBasil','creamyTomato','tomatoOregano'].includes(p)) return 'tomato-mediterranean';
    return p||'';
  }

  function mainKey(recipe){
    const text=((recipe&&recipe.ingredients)||[]).map(x=>norm(x[1])).join(' ');
    const groups=[
      ['chicken',/\bchicken\b/],['pork',/\bpork\b|\bsausages?\b|\bbacon\b|\bchorizo\b/],
      ['beef',/\bbeef\b/],['lamb',/\blamb\b/],['duck',/\bduck\b/],['turkey',/\bturkey\b/],
      ['salmon',/\bsalmon\b/],['white-fish',/\bcod\b|\bhaddock\b|\bbarramundi\b|\bsea bass\b|\bbasa\b|\btilapia\b/],
      ['shellfish',/\bprawns?\b|\bshrimps?\b|\bcrabs?\b/],['tofu',/\btofu\b/],['halloumi',/\bhalloumi\b/],
      ['chickpeas',/\bchickpeas?\b/],['lentils',/\blentils?\b/],['beans',/\bbeans?\b|\bedamame\b/],['eggs',/\beggs?\b/]
    ];
    const found=groups.find(x=>x[1].test(text));
    if(found) return found[0];
    const diet=MW.food&&MW.food.analyse?MW.food.analyse(recipe):null;
    return MW.food&&MW.food.dietAllows(recipe,'vegan')?'plant':'other';
  }

  function formatKey(recipe){
    const hay=[recipe&&recipe.title,recipe&&recipe.subtitle,...((recipe&&recipe.tags)||[])].map(norm).join(' ');
    const formats=[
      ['rice',/\brice\b|\brisotto\b/],['pasta',/\bpasta\b|\bspaghetti\b|\blinguine\b|\bpenne\b/],
      ['noodles',/\bnoodle/],['tacos',/\btaco/],['wraps',/\bwrap/],['curry',/\bcurry\b|\bkorma\b|\btikka\b/],
      ['traybake',/\btraybake\b|\btray bake\b/],['stirfry',/\bstir[ -]?fry/],['couscous',/\bcouscous\b/],['orzo',/\borzo\b/],
      ['stew',/\bstew\b/],['soup',/\bsoup\b/],['salad',/\bsalad\b/],['flatbread',/\bflatbread/],['burger',/\bburger/],
      ['pie',/\bpie\b/],['roast',/\broast/],['bowl',/\bbowl\b/]
    ];
    const found=formats.find(x=>x[1].test(hay));
    return found?found[0]:'';
  }

  const recipePriceCache=new WeakMap();
  function priceOf(recipe){
    const s=MW.state.get(),p=MW.pricing;
    if(!p)return Number(recipe.cost||0);
    const key=JSON.stringify([p.revision||p.version,s.household.people,recipe.servings,recipe.scaleSafe,p.rowsForRecipe?p.rowsForRecipe(recipe):(recipe.shoppingIngredients||recipe.ingredients||[])]);
    const cached=recipePriceCache.get(recipe);
    if(cached&&cached.key===key)return cached.value;
    const value=p.recipeCost(recipe,s.household.people);recipePriceCache.set(recipe,{key,value});return value;
  }

  function scoringContext(chosen){
    const profiles={},families={},formats={},primaries={},images={};
    const usedIngredients=new Set();
    chosen.forEach(x=>{
      const p=flavourProfile(x),f=flavourFamily(x),fmt=formatKey(x),main=mainKey(x),img=visualKey(x);
      if(p) profiles[p]=(profiles[p]||0)+1;
      if(f) families[f]=(families[f]||0)+1;
      if(fmt) formats[fmt]=(formats[fmt]||0)+1;
      primaries[main]=(primaries[main]||0)+1;
      if(img) images[img]=(images[img]||0)+1;
      (x.ingredients||[]).forEach(y=>usedIngredients.add(norm(y[1])));
    });
    return {profiles,families,formats,primaries,images,usedIngredients};
  }

  function candidateScore(recipe,chosen,priceMode,context){
    const s=MW.state.get();
    const {profiles,families,formats,primaries,images,usedIngredients}=context||scoringContext(chosen);
    const p=flavourProfile(recipe),family=flavourFamily(recipe),fmt=formatKey(recipe),main=mainKey(recipe),img=visualKey(recipe);
    const overlap=(recipe.ingredients||[]).filter(x=>usedIngredients.has(norm(x[1]))).length;
    const overlapBonus=(priceMode?0.25:0.06)*Math.min(overlap,4);
    const costPenalty=priceOf(recipe)*(priceMode?0.16:0.018);
    const profilePenalty=p?(profiles[p]||0)*25:0;
    const familyPenalty=family?Math.max(0,(families[family]||0)-1)*6:0;
    const formatPenalty=fmt?(formats[fmt]||0)*0.75:0;
    const primaryPenalty=Math.max(0,(primaries[main]||0)-1)*1.4;
    const imagePenalty=img?(images[img]||0)*3.2:0;
    const foodScore=MW.food?MW.food.score(recipe,s.foodProfile):0;
    return MW.learning.score(recipe)+foodScore+overlapBonus-costPenalty-profilePenalty-familyPenalty-formatPenalty-primaryPenalty-imagePenalty;
  }

  function choose(count,priceMode,opts){
    opts=opts||{};
    const excluded=new Set(opts.excludeIds||[]);
    const basePool=MW.RECIPES.filter(allowed);
    let pool=basePool.filter(r=>!excluded.has(r.id));
    if(pool.length<count) pool=basePool.slice();
    const chosen=[];
    while(chosen.length<count && chosen.length<pool.length){
      const ranked=[];
      const context=scoringContext(chosen);
      const usedImages=new Set(chosen.map(x=>visualKey(x)).filter(Boolean));
      const proteinCounts=chosen.reduce((acc,x)=>{const key=mainKey(x);acc[key]=(acc[key]||0)+1;return acc;},{});
      for(const r of pool){
        if(chosen.includes(r)) continue;
        const image=visualKey(r);
        ranked.push({
          recipe:r,
          score:candidateScore(r,chosen,priceMode,context),
          repeatsImage:Boolean(image&&usedImages.has(image)),
          repeatsProtein:Boolean(proteinCounts[mainKey(r)]),
          overusedProtein:(proteinCounts[mainKey(r)]||0)>=2,
          nearClone:isNearClone(r,chosen)
        });
      }
      ranked.sort((a,b)=>{
        if(a.nearClone!==b.nearClone) return a.nearClone?1:-1;
        if(a.overusedProtein!==b.overusedProtein) return a.overusedProtein?1:-1;
        if(a.repeatsProtein!==b.repeatsProtein) return a.repeatsProtein?1:-1;
        if(a.repeatsImage!==b.repeatsImage) return a.repeatsImage?1:-1;
        return b.score-a.score;
      });
      if(!ranked.length) break;
      const distinct=ranked.filter(x=>!x.nearClone&&!x.overusedProtein&&!x.repeatsImage);
      const nonClone=ranked.filter(x=>!x.nearClone&&!x.overusedProtein);
      const usable=distinct.length?distinct:(nonClone.length?nonClone:ranked);
      let pick=usable[0].recipe;
      if(opts.randomise){
        const span=Math.max(1,Math.min(72,Math.ceil(usable.length*0.04)));
        pick=usable[Math.floor(Math.random()*span)].recipe;
      }
      chosen.push(pick);
    }
    return chosen;
  }

  function lunchAllowed(recipe){
    const s=MW.state.get();
    const avoid=['mushroom',...(s.household.restrictions||[])].filter(Boolean);
    const basic=MW.avoidance
      ?!MW.avoidance.recipeContains(recipe,avoid)
      :!avoid.some(x=>(recipe.title+' '+recipe.subtitle+' '+recipe.ingredients.map(y=>y[1]).join(' ')).toLowerCase().includes(String(x).toLowerCase()));
    const equipmentOk=!MW.equipment||MW.equipment.allows(recipe,s.household);
    return basic && equipmentOk && (!MW.food||MW.food.lunchAllowed(recipe,s.foodProfile));
  }

  function alternatives(currentId,count){
    const s=MW.state.get();
    const usedIds=new Set((s.week&&s.week.meals||[]).map(x=>x.recipeId).filter(x=>x!==currentId));
    const chosen=(s.week&&s.week.meals||[]).map(x=>getRecipe(x.recipeId)).filter(x=>x&&x.id!==currentId);
    const usedImages=new Set(chosen.map(x=>visualKey(x)).filter(Boolean));
    const context=scoringContext(chosen);
    return MW.RECIPES
      .filter(r=>r.id!==currentId&&!usedIds.has(r.id)&&allowed(r))
      .map(r=>({recipe:r,repeatsImage:usedImages.has(visualKey(r)),nearClone:isNearClone(r,chosen),score:candidateScore(r,chosen,Boolean(s.plan.priceMode),context)}))
      .sort((a,b)=>{
        if(a.nearClone!==b.nearClone) return a.nearClone?1:-1;
        if(a.repeatsImage!==b.repeatsImage) return a.repeatsImage?1:-1;
        return b.score-a.score;
      })
      .slice(0,count||4)
      .map(x=>x.recipe);
  }

  function randomAlternativePool(currentId){
    const st=MW.state.get();
    const usedIds=new Set((st.week&&st.week.meals||[]).map(x=>x.recipeId).filter(x=>x!==currentId));
    const chosen=(st.week&&st.week.meals||[]).map(x=>getRecipe(x.recipeId)).filter(x=>x&&x.id!==currentId);
    const images=new Set(chosen.map(visualKey).filter(Boolean));
    return MW.RECIPES.filter(r=>r.id!==currentId&&!usedIds.has(r.id)&&allowed(r)&&!isNearClone(r,chosen)&&!images.has(visualKey(r)));
  }

  function randomAlternative(currentId){
    const pool=randomAlternativePool(currentId);
    return pool.length?pool[Math.floor(Math.random()*pool.length)]:null;
  }

  function rankedLunchPool(currentId){
    const s=MW.state.get();
    return MW.LUNCHES
      .filter(x=>x.id!==currentId&&lunchAllowed(x))
      .sort((a,b)=>(MW.food?MW.food.lunchScore(b,s.foodProfile)-MW.food.lunchScore(a,s.foodProfile):0));
  }

  function randomLunchPool(currentId){
    const ranked=rankedLunchPool(currentId);
    const practical=ranked.filter(x=>MW.food&&MW.food.practicalLunchCandidate?MW.food.practicalLunchCandidate(x):x.practicalLunch);
    if(practical.length)return practical;
    if(!ranked.length)return ranked;
    const score=x=>MW.food?MW.food.lunchScore(x,MW.state.get().foodProfile):0;
    const best=score(ranked[0]);
    const shortlist=ranked.filter(x=>score(x)>=best-1.5).slice(0,20);
    return shortlist.length?shortlist:ranked.slice(0,12);
  }

  function randomLunchAlternative(currentId){
    const pool=randomLunchPool(currentId);
    if(!pool.length)return null;
    const groups=new Map();
    for(const lunch of pool){
      const key=lunch.lunchBucket||'other';
      if(!groups.has(key))groups.set(key,[]);
      groups.get(key).push(lunch);
    }
    const buckets=[...groups.keys()];
    const bucket=buckets[Math.floor(Math.random()*buckets.length)];
    const candidates=groups.get(bucket).slice(0,6);
    return candidates[Math.floor(Math.random()*candidates.length)]||null;
  }

  function regenerateAll(opts){
    const s=MW.state.get();
    opts=opts||{};
    const validDays=new Set(MW.DAYS.map(x=>x.key));
    const configured=Array.isArray(opts.dinnerDaysOverride)?opts.dinnerDaysOverride:(s.plan.dinnerDays||[]);
    const dinnerDays=[...new Set(configured.filter(x=>validDays.has(x)))];
    const previous=s.week||{};
    if(previous.weekKey&&previous.weekKey!==currentWeekKey()){s.weekHistory=Array.isArray(s.weekHistory)?s.weekHistory:[];s.weekHistory.push(JSON.parse(JSON.stringify(previous)));}
    const previousIds=(previous.meals||[]).map(x=>x.recipeId).filter(Boolean);
    const chosen=choose(dinnerDays.length,Boolean(s.plan.priceMode),{
      excludeIds:previousIds,
      randomise:true
    });
    const lunch=randomLunchAlternative(previous.lunchId);
    const hadShop=Boolean(previous.shop);

    s.week={
      createdAt:new Date().toISOString(),
      weekKey:currentWeekKey(),
      planMode:opts.planMode||'normal',
      status:previous.weekKey===currentWeekKey()&&previous.delivery?previous.status:'draft',
      delivery:previous.weekKey===currentWeekKey()?previous.delivery||null:null,
      completedRecipes:previous.weekKey===currentWeekKey()?previous.completedRecipes||[]:[],
      preparedLunchPortions:previous.weekKey===currentWeekKey()?previous.preparedLunchPortions||{}:{},
      preparation:previous.weekKey===currentWeekKey()?previous.preparation||null:null,
      meals:dinnerDays.map((day,i)=>({day,recipeId:chosen[i]&&chosen[i].id})).filter(x=>x.recipeId),
      lunchId:lunch&&lunch.id,
      extras:Array.isArray(previous.extras)?previous.extras:[],
      shop:null,
      inventoryUsed:[],
      forceBuy:Array.isArray(previous.forceBuy)?previous.forceBuy.slice():[],
      savingMode:Boolean(s.plan.priceMode)
    };
    MW.state.log('week_regenerated',{
      previousRecipeIds:previousIds,
      recipeIds:s.week.meals.map(x=>x.recipeId),
      previousLunchId:previous.lunchId||'',
      lunchId:s.week.lunchId||''
    });
    MW.state.save();
    if(hadShop&&opts.rebuildShop!==false&&MW.shopping) MW.shopping.build({savingMode:Boolean(s.plan.priceMode),preserveChecks:true});
    return s.week;
  }

  function invalidateShop(s,rebuild){
    const hadShop=Boolean(s.week&&s.week.shop);
    if(!s.week) return;
    s.week.shop=null;
    s.week.inventoryUsed=[];
    // Preserve explicit buy decisions when a meal changes.
    MW.state.save();
    if(rebuild&&hadShop&&MW.shopping) MW.shopping.build({savingMode:Boolean(s.plan.priceMode),preserveChecks:true});
  }

  function buildWeek(opts){
    const s=MW.state.get();
    opts=opts||{};
    const validDays=new Set(MW.DAYS.map(x=>x.key));
    const configured=Array.isArray(opts.dinnerDaysOverride)?opts.dinnerDaysOverride:(s.plan.dinnerDays||[]);
    const dinnerDays=[...new Set(configured.filter(x=>validDays.has(x)))];
    const chosen=choose(dinnerDays.length,Boolean(s.plan.priceMode));
    const previous=s.week||{};
    if(previous.weekKey&&previous.weekKey!==currentWeekKey()){s.weekHistory=Array.isArray(s.weekHistory)?s.weekHistory:[];s.weekHistory.push(JSON.parse(JSON.stringify(previous)));}
    const lunchPool=MW.LUNCHES.filter(lunchAllowed);
    const existingLunch=lunchPool.find(x=>x.id===previous.lunchId);
    const lunch=existingLunch||randomLunchAlternative(null)||null;

    s.week={
      createdAt:new Date().toISOString(),
      weekKey:currentWeekKey(),
      planMode:opts.planMode||'normal',
      status:previous.weekKey===currentWeekKey()&&previous.delivery?previous.status:'draft',
      delivery:previous.weekKey===currentWeekKey()?previous.delivery||null:null,
      completedRecipes:previous.weekKey===currentWeekKey()?previous.completedRecipes||[]:[],
      preparedLunchPortions:previous.weekKey===currentWeekKey()?previous.preparedLunchPortions||{}:{},
      preparation:previous.weekKey===currentWeekKey()?previous.preparation||null:null,
      meals:dinnerDays.map((day,i)=>({day,recipeId:chosen[i]&&chosen[i].id})).filter(x=>x.recipeId),
      lunchId:lunch?lunch.id:null,
      extras:opts.preserveExtras&&Array.isArray(previous.extras)?previous.extras:[],
      shop:null,
      inventoryUsed:[],
      forceBuy:Array.isArray(previous.forceBuy)?previous.forceBuy.slice():[],
      savingMode:Boolean(s.plan.priceMode)
    };
    MW.state.log('week_created',{
      recipeIds:s.week.meals.map(x=>x.recipeId),
      dinnerDays:dinnerDays,
      lunchDays:(s.plan.lunchDays||[]).slice(),
      priceMode:Boolean(s.plan.priceMode)
    });
    MW.state.save();
    return s.week;
  }

  MW.planner={
    allowed,
    flavourProfile,
    flavourFamily,
    buildWeek,
    currentWeekKey,
    todayKey,
    remainingDinnerDays,
    lunchAllowed,
    alternatives,
    randomAlternativePool,
    randomAlternative,
    randomLunchPool,
    randomLunchAlternative,
    regenerateAll,
    replace(day,newId){
      const s=MW.state.get();
      const slot=s.week&&s.week.meals.find(x=>x.day===day);
      const next=getRecipe(newId);
      if(!slot||!next||!allowed(next)) return false;
      const old=getRecipe(slot.recipeId);
      if(old) MW.learning.reject(old);
      slot.recipeId=newId;
      MW.state.log('meal_replaced',{day,old:old&&old.id,new:newId});
      invalidateShop(s,true);
      return true;
    },
    lunchAlternatives(){
      const s=MW.state.get();
      return MW.LUNCHES
        .filter(x=>lunchAllowed(x)&&(!s.week||x.id!==s.week.lunchId))
        .sort((a,b)=>(MW.food?MW.food.lunchScore(b,s.foodProfile)-MW.food.lunchScore(a,s.foodProfile):0));
    },
    replaceLunch(newId){
      const s=MW.state.get();
      const old=s.week&&s.week.lunchId;
      const next=MW.LUNCHES.find(x=>x.id===newId);
      if(!s.week||!next||!lunchAllowed(next)) return false;
      s.week.lunchId=newId;
      MW.state.log('lunch_replaced',{old,new:newId});
      invalidateShop(s,true);
      return true;
    },
    rebuildForPriceMode(on){
      const s=MW.state.get();
      s.plan.priceMode=Boolean(on);
      MW.state.save();
      return buildWeek({preserveExtras:true});
    },
    rebuildForSavings(){
      return this.rebuildForPriceMode(true);
    },
    toggleDinner(dayKey,on){
      const s=MW.state.get();
      const valid=MW.DAYS.some(x=>x.key===dayKey);
      if(!valid||!s.week) return;
      const days=new Set(s.plan.dinnerDays||[]);
      const existing=s.week.meals.find(x=>x.day===dayKey);
      if(on){
        days.add(dayKey);
        if(!existing){
          const used=new Set(s.week.meals.map(x=>x.recipeId));
          const chosen=s.week.meals.map(x=>getRecipe(x.recipeId)).filter(Boolean);
          // Score each eligible recipe once, not repeatedly inside a sort comparator.
          const context=scoringContext(chosen);
          let pick=null,bestScore=-Infinity;
          for(const candidate of MW.RECIPES){
            if(used.has(candidate.id)||!allowed(candidate))continue;
            const score=candidateScore(candidate,chosen,Boolean(s.plan.priceMode),context);
            if(!pick||score>bestScore){pick=candidate;bestScore=score;}
          }
          if(pick) s.week.meals.push({day:dayKey,recipeId:pick.id});
        }
      }else{
        days.delete(dayKey);
        s.week.meals=s.week.meals.filter(x=>x.day!==dayKey);
      }
      const order=MW.DAYS.map(x=>x.key);
      s.plan.dinnerDays=[...days].sort((a,b)=>order.indexOf(a)-order.indexOf(b));
      s.week.meals.sort((a,b)=>order.indexOf(a.day)-order.indexOf(b.day));
      MW.state.log('dinner_day_toggled',{day:dayKey,on:Boolean(on)});
      invalidateShop(s,true);
    },
    toggleLunch(dayKey,on){
      const s=MW.state.get();
      const valid=MW.DAYS.some(x=>x.key===dayKey);
      if(!valid) return;
      const days=new Set(s.plan.lunchDays||[]);
      if(on) days.add(dayKey); else days.delete(dayKey);
      const order=MW.DAYS.map(x=>x.key);
      s.plan.lunchDays=[...days].sort((a,b)=>order.indexOf(a)-order.indexOf(b));
      if(s.week) invalidateShop(s,true);
      MW.state.log('lunch_day_toggled',{day:dayKey,on:Boolean(on)});
      MW.state.save();
    },
    visualKey,
    visualFamilyKey:sourceFamilyKey,
    proteinKey:mainKey,
    titleSimilarity,
    plannedMealCost(){
      const s=MW.state.get();
      if(!s.week) return 0;
      const dinner=(s.week.meals||[]).reduce((sum,m)=>{
        const r=getRecipe(m.recipeId);
        return sum+(r?(MW.pricing?MW.pricing.recipeCost(r,s.household.people):Number(r.cost||0)):0);
      },0);
      const lunch=MW.LUNCHES.find(x=>x.id===s.week.lunchId);
      const portions=(s.plan.lunchDays||[]).length*Math.max(1,Number(s.plan.lunchPeople)||1);
      const lunchCost=lunch&&portions?(MW.pricing?MW.pricing.recipeCost(lunch,portions):lunch.cost*(portions/lunch.servings)):0;
      return Math.round((dinner+lunchCost)*100)/100;
    }
  };
})();

// Lower-cost planner optimisation

window.MW = window.MW || {};
(function(){
  if(!MW.planner||!MW.pricing) return;
  const planner=MW.planner;
  const p=MW.pricing;
  const norm=x=>String(x||'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
  const round=n=>Math.round((Number(n)||0)*100)/100;
  const getRecipe=id=>(MW.catalog&&MW.catalog.get(id))||MW.RECIPES.find(x=>x.id===id);
  const productKey=(name,entry)=>entry&&entry.label&&!/equivalent/i.test(entry.label)?norm(entry.label):norm(name);

  function regularQtyText(x){
    const count=Math.max(1,Number(x.count)||1);
    let unit=String(x.unit||'item').trim();
    if(count!==1&&!/s$/i.test(unit)) unit+='s';
    return count+' '+unit;
  }

  function basketEstimate(meals,options){
    return MW.basket.calculate(meals,options);
  }

  const valueCostCache=new Map();
  function valueCost(r){
    const people=Number(MW.state.get().household.people)||2;
    const key=(p.version||'')+'|'+people+'|'+r.id;
    if(valueCostCache.has(key)) return valueCostCache.get(key);
    const cost=p.recipeCost(r,people);valueCostCache.set(key,cost);return cost;
  }

  const recipeText=r=>norm([r.title,r.subtitle,...(r.ingredients||[]).map(x=>x[1])].join(' '));
  function premiumPenalty(r){
    const t=recipeText(r);
    let score=0;
    if(/\b(sirloin|rump steak|beef steak|venison|duck breast|lamb steak)\b/.test(t)) score+=5;
    if(/\b(salmon|monkfish|sea bream|crab|king prawn|prawns|shellfish)\b/.test(t)) score+=4;
    if(/\b(pork rib rack|pork belly|burrata)\b/.test(t)) score+=2.5;
    if(/\b(chicken breast|mini fillet|fish fillet)\b/.test(t)) score+=1;
    if(/\b(premium|ultimate|deluxe|feast)\b/.test(t)) score+=1.5;
    const proteinWords=['chicken','beef','pork','lamb','duck','turkey','salmon','prawn','crab','fish','tofu','halloumi','paneer'];
    const present=proteinWords.filter(x=>new RegExp('\\b'+x+'\\b').test(t));
    if(new Set(present).size>=2) score+=2;
    if(/\bdouble\b/.test(t)&&present.length) score+=3;
    return score;
  }
  function formatKey(r){
    const t=norm([r.title,r.subtitle,...(r.tags||[])].join(' '));
    const rows=[['curry',/\bcurry\b|\bkorma\b|\btikka\b|\bdal\b|\bdhal\b/],['soup',/\bsoup\b/],['salad',/\bsalad\b/],['tacos',/\btaco/],['wraps',/\bwrap/],['stirfry',/\bstir ?fry\b/],['noodles',/\bnoodle/],['pasta',/\bpasta\b|\bspaghetti\b|\blinguine\b|\bpenne\b|\bravioli\b|\btortell/],['rice',/\brice\b|\brisotto\b/],['traybake',/\btray ?bake\b/],['couscous',/\bcouscous\b/],['burger',/\bburger\b/],['pie',/\bpie\b/]];
    const hit=rows.find(x=>x[1].test(t));return hit?hit[0]:'';
  }
  const visualKey=r=>planner.visualKey(r);
  function overlapCount(r,chosen){
    const used=new Set();
    chosen.forEach(x=>(x.ingredients||[]).forEach(row=>{const e=p.entryFor(row[1]);used.add(productKey(row[1],e));}));
    return (r.ingredients||[]).reduce((n,row)=>{const e=p.entryFor(row[1]);return n+(used.has(productKey(row[1],e))?1:0);},0);
  }
  function hashJitter(id,seed){
    const str=String(id||'')+'|'+seed;let h=2166136261;
    for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}
    return ((h>>>0)%1000)/1000;
  }
  function candidateSet(priced,count,seed,strictProtein){
    const s=MW.state.get();
    const chosen=[];
    while(chosen.length<count&&priced.length){
      const proteinCounts={},formatCounts={},images=new Set(chosen.map(visualKey).filter(Boolean));
      chosen.forEach(r=>{const pk=planner.proteinKey(r);proteinCounts[pk]=(proteinCounts[pk]||0)+1;const f=formatKey(r);if(f)formatCounts[f]=(formatCounts[f]||0)+1;});
      const ranked=priced.filter(x=>!chosen.includes(x.r)).map(x=>{
        const r=x.r,pk=planner.proteinKey(r),fmt=formatKey(r),img=visualKey(r);
        let score=0;
        score-=x.cost*1.4;
        score-=x.premium*3.8;
        score+=Math.min(5,overlapCount(r,chosen))*0.75;
        score-=(proteinCounts[pk]||0)*(strictProtein?12:4.5);
        score-=(fmt?formatCounts[fmt]||0:0)*(strictProtein?5:3);
        if(img&&images.has(img)) score-=40;
        if(chosen.some(c=>planner.titleSimilarity(r,c)>=0.70)) score-=45;
        if(MW.food&&MW.food.score) score+=Number(MW.food.score(r,s.foodProfile)||0)*0.25;
        if(MW.learning&&MW.learning.score) score+=Number(MW.learning.score(r)||0)*0.15;
        score+=hashJitter(r.id,seed)*0.9;
        return {r,score,pk,fmt,repeatsProtein:Boolean(proteinCounts[pk]),repeatsImage:Boolean(img&&images.has(img)),nearClone:chosen.some(c=>planner.titleSimilarity(r,c)>=0.70)};
      }).sort((a,b)=>b.score-a.score);
      if(!ranked.length) break;
      const distinct=ranked.filter(x=>!x.repeatsProtein&&!x.repeatsImage&&!x.nearClone);
      const varied=ranked.filter(x=>(proteinCounts[x.pk]||0)<2&&!x.repeatsImage&&!x.nearClone);
      const visualDistinct=ranked.filter(x=>!x.repeatsImage&&!x.nearClone);
      const pick=strictProtein?(distinct[0]||varied[0]||visualDistinct[0]||ranked[0]):(varied[0]||visualDistinct[0]||ranked[0]);
      chosen.push(pick.r);
    }
    return chosen;
  }

  function relaxedBudgetVariety(recipes){
    const ids=new Set(),images=new Set(),proteins={},formats={};
    for(let i=0;i<recipes.length;i++){
      const r=recipes[i];if(!r||ids.has(r.id))return false;ids.add(r.id);
      const img=visualKey(r);if(img&&images.has(img))return false;if(img)images.add(img);
      for(let j=0;j<i;j++)if(planner.titleSimilarity(r,recipes[j])>=0.70)return false;
      const pk=planner.proteinKey(r);proteins[pk]=(proteins[pk]||0)+1;if(proteins[pk]>2)return false;
      if(i>0&&planner.proteinKey(recipes[i-1])===pk)return false;
      const fmt=formatKey(r);if(fmt){formats[fmt]=(formats[fmt]||0)+1;if(formats[fmt]>4)return false;}
    }
    return true;
  }

  function budgetRescue(days,budget,maxUnresolved){
    maxUnresolved=Number.isFinite(Number(maxUnresolved))?Number(maxUnresolved):Infinity;
    const pool=MW.RECIPES.filter(r=>planner.allowed(r))
      .map(r=>({r,cost:valueCost(r),premium:premiumPenalty(r)}))
      .sort((a,b)=>(a.cost+a.premium*1.8)-(b.cost+b.premium*1.8))
      .slice(0,Math.min(100,MW.RECIPES.length)).map(x=>x.r);
    const width=60;
    let beam=[{recipes:[],estimate:null,score:0}];
    const canAdd=(list,r)=>{
      if(list.some(x=>x.id===r.id))return false;
      const image=visualKey(r);if(image&&list.some(x=>visualKey(x)===image))return false;
      if(list.some(x=>planner.titleSimilarity(r,x)>=0.70))return false;
      const protein=planner.proteinKey(r);
      if(list.filter(x=>planner.proteinKey(x)===protein).length>=3)return false;
      if(list.length&&planner.proteinKey(list[list.length-1])===protein)return false;
      const fmt=formatKey(r);
      if(fmt&&list.filter(x=>formatKey(x)===fmt).length>=3)return false;
      return true;
    };
    for(let i=0;i<days.length;i++){
      const next=[];
      for(const state of beam){
        for(const r of pool){
          if(!canAdd(state.recipes,r))continue;
          const recipes=state.recipes.concat(r);
          const estimate=basketEstimate(recipes.map((x,j)=>({day:days[j],recipeId:x.id})),{savingMode:true});
          const unresolvedPenalty=Math.max(0,estimate.unresolved-maxUnresolved)*20;
          next.push({recipes,estimate,score:estimate.total+unresolvedPenalty});
        }
      }
      if(!next.length)return null;
      next.sort((a,b)=>a.score-b.score);
      beam=next.slice(0,width);
    }
    const valid=beam.filter(x=>x.estimate&&x.estimate.unresolved<=maxUnresolved);
    const chosen=(valid.length?valid:beam)[0];
    return chosen?{recipes:chosen.recipes,estimate:chosen.estimate}:null;
  }

  function optimiseForSavings(){
    const s=MW.state.get();
    if(!s.week||!Array.isArray(s.week.meals)) return {changed:false,reason:'no-week'};
    const days=s.week.meals.map(x=>x.day);
    const currentMeals=s.week.meals.slice();
    const currentRecipes=currentMeals.map(x=>getRecipe(x.recipeId)).filter(Boolean);
    if(currentRecipes.length!==days.length) return {changed:false,reason:'missing-recipe'};
    const currentIds=new Set(currentMeals.map(x=>x.recipeId));
    const baseline=basketEstimate(currentMeals,{savingMode:true});
    const target=(Number(s.household.budget)||0)>0?round(Number(s.household.budget)*0.94):0;
    const acceptable=estimate=>estimate&&estimate.unresolved<=baseline.unresolved;

    const varietyIssues=recipes=>{
      let issues=0;
      const ids=new Set(),images=new Set(),proteins={},formats={};
      for(let i=0;i<recipes.length;i++){
        const r=recipes[i];if(!r){issues+=100;continue;}
        if(ids.has(r.id)) issues+=100;ids.add(r.id);
        const img=visualKey(r);if(img&&images.has(img)) issues+=20;if(img) images.add(img);
        const pk=planner.proteinKey(r);proteins[pk]=(proteins[pk]||0)+1;if(proteins[pk]>2) issues+=10;
        if(i>0&&planner.proteinKey(recipes[i-1])===pk) issues+=3;
        const fmt=formatKey(r);if(fmt){formats[fmt]=(formats[fmt]||0)+1;if(formats[fmt]>2) issues+=3;}
        for(let j=0;j<i;j++) if(planner.titleSimilarity(r,recipes[j])>=0.70) issues+=20;
      }
      return issues;
    };
    const variedSet=recipes=>varietyIssues(recipes)===0;

    const base=MW.RECIPES.filter(r=>planner.allowed(r)&&!currentIds.has(r.id));
    const priced=base.map(r=>({r,cost:valueCost(r),premium:premiumPenalty(r)}))
      .sort((a,b)=>(a.cost+a.premium*1.8)-(b.cost+b.premium*1.8))
      .slice(0,Math.min(320,base.length));
    const cheapPool=priced.slice(0,80).map(x=>x.r);

    // First preserve as much of the user's existing week as possible. Apply only the
    // single best genuine basket-saving swap at a time, and never worsen variety.
    let working=currentRecipes.slice(),workingEstimate=baseline,workingIssues=varietyIssues(working),swapCount=0;
    const maxTargetedSwaps=Math.min(5,days.length);
    for(let pass=0;pass<maxTargetedSwaps;pass++){
      if(target&&workingEstimate.total<=target) break;
      let bestSwap=null;
      for(let i=0;i<working.length;i++){
        for(const candidate of cheapPool){
          if(candidate.id===working[i].id||working.some((r,j)=>j!==i&&r.id===candidate.id)) continue;
          const trial=working.slice();trial[i]=candidate;
          const issues=varietyIssues(trial);
          if(issues>workingIssues) continue;
          const estimate=basketEstimate(days.map((day,j)=>({day,recipeId:trial[j].id})),{savingMode:true});
          if(!acceptable(estimate)||estimate.total+0.01>=workingEstimate.total) continue;
          const saving=round(workingEstimate.total-estimate.total);
          const candidatePremium=premiumPenalty(candidate);
          if(!bestSwap||saving>bestSwap.saving+0.01||(Math.abs(saving-bestSwap.saving)<=0.01&&candidatePremium<bestSwap.premium)){
            bestSwap={i,candidate,estimate,issues,saving,premium:candidatePremium};
          }
        }
      }
      if(!bestSwap||bestSwap.saving<0.25) break;
      working[bestSwap.i]=bestSwap.candidate;
      workingEstimate=bestSwap.estimate;
      workingIssues=bestSwap.issues;
      swapCount++;
    }

    let best={recipes:working,estimate:workingEstimate,swapCount};

    // If a few sensible swaps still cannot get the trolley comfortably under budget,
    // compare complete value-led weeks. These still obey the user's dietary, dislike,
    // equipment and variety rules, and are only accepted when the basket is genuinely lower.
    if(!target||best.estimate.total>target){
      for(let seed=0;seed<6;seed++){
        const recipes=candidateSet(priced,days.length,seed,seed<4);
        if(recipes.length!==days.length||!variedSet(recipes)) continue;
        const meals=days.map((day,i)=>({day,recipeId:recipes[i].id}));
        const estimate=basketEstimate(meals,{savingMode:true});
        if(acceptable(estimate)&&estimate.total+0.01<best.estimate.total) best={recipes,estimate,swapCount:days.length};
      }
    }

    // One final greedy pass can exploit shared packs inside the best candidate week.
    if(!target||best.estimate.total>target){
      working=best.recipes.slice();workingEstimate=best.estimate;workingIssues=varietyIssues(working);
      for(let i=0;i<working.length;i++){
        let slotBest=working[i],slotEstimate=workingEstimate,slotIssues=workingIssues;
        for(const candidate of cheapPool){
          if(candidate.id===working[i].id||working.some((r,j)=>j!==i&&r.id===candidate.id)) continue;
          const trial=working.slice();trial[i]=candidate;
          const issues=varietyIssues(trial);if(issues>workingIssues) continue;
          const estimate=basketEstimate(days.map((day,j)=>({day,recipeId:trial[j].id})),{savingMode:true});
          if(acceptable(estimate)&&estimate.total+0.01<slotEstimate.total){slotBest=candidate;slotEstimate=estimate;slotIssues=issues;}
        }
        if(slotBest!==working[i]){working[i]=slotBest;workingEstimate=slotEstimate;workingIssues=slotIssues;}
        if(target&&workingEstimate.total<=target) break;
      }
      if(workingEstimate.total<best.estimate.total) best={recipes:working,estimate:workingEstimate,swapCount:days.length};
    }

    let rescued=false;
    const budget=Number(s.household.budget)||0;
    const originalLunchId=s.week.lunchId||null;
    let selectedLunchId=originalLunchId;
    const lunchDays=(s.plan.lunchDays||[]).length;
    if(lunchDays&&best.estimate&&budget&&best.estimate.total>budget){
      const candidateMeals=days.map((day,i)=>({day,recipeId:best.recipes[i].id}));
      let lunchBest=best.estimate;
      for(const lunch of MW.LUNCHES){
        if(!planner.lunchAllowed(lunch)||lunch.id===selectedLunchId)continue;
        s.week.lunchId=lunch.id;
        const estimate=basketEstimate(candidateMeals,{savingMode:true});
        if(acceptable(estimate)&&estimate.total+0.01<lunchBest.total){
          lunchBest=estimate;
          selectedLunchId=lunch.id;
        }
      }
      s.week.lunchId=selectedLunchId;
      best={...best,estimate:lunchBest};
    }
    if(budget&&best.estimate.total>budget){
      const rescue=budgetRescue(days,budget,baseline.unresolved);
      if(rescue&&rescue.recipes.length===days.length&&acceptable(rescue.estimate)&&rescue.estimate.total+0.01<best.estimate.total){
        best={recipes:rescue.recipes,estimate:rescue.estimate,swapCount:days.length};
        rescued=true;
      }
    }
    if(lunchDays&&best.estimate&&(!budget||best.estimate.total>budget)){
      const candidateMeals=days.map((day,i)=>({day,recipeId:best.recipes[i].id}));
      let lunchBest=best.estimate;
      for(const lunch of MW.LUNCHES){
        if(!planner.lunchAllowed(lunch)||lunch.id===selectedLunchId)continue;
        s.week.lunchId=lunch.id;
        const estimate=basketEstimate(candidateMeals,{savingMode:true});
        if(acceptable(estimate)&&estimate.total+0.01<lunchBest.total){
          lunchBest=estimate;
          selectedLunchId=lunch.id;
        }
      }
      s.week.lunchId=selectedLunchId;
      best={...best,estimate:lunchBest};
    }
    const lunchChanged=selectedLunchId!==originalLunchId;

    s.plan.priceMode=true;
    const improvement=round(baseline.total-best.estimate.total);
    const threshold=Math.max(0.50,round(baseline.total*0.015));
    const changed=improvement>=threshold&&best.recipes.length===days.length&&acceptable(best.estimate);
    if(!changed&&lunchChanged)s.week.lunchId=originalLunchId;
    const hadShop=Boolean(s.week.shop);
    if(changed){
      s.week.meals=days.map((day,i)=>({day,recipeId:best.recipes[i].id}));
      s.week.shop=null;s.week.inventoryUsed=[];
    }
    s.week.savingMode=true;
    const finalTotal=changed?best.estimate.total:baseline.total;
    s.week.savingResult={
      at:new Date().toISOString(),changed,currentTotal:baseline.total,candidateTotal:finalTotal,
      saved:changed?improvement:0,budget,targetTotal:target||null,
      metBudget:!budget||finalTotal<=budget,overBudgetBy:budget?round(Math.max(0,finalTotal-budget)):0,
      swaps:changed?best.recipes.reduce((n,r,i)=>n+(r.id!==currentRecipes[i].id?1:0),0):0,
      lunchChanged:Boolean(changed&&lunchChanged),
      reason:changed?(rescued?'budget-rescue':(lunchChanged?'cheaper-lunch-and-plan':'cheaper-plan')):'no-genuine-saving'
    };
    MW.state.log('lower_cost_optimised',s.week.savingResult);
    MW.state.save();
    if(hadShop&&MW.shopping) MW.shopping.build({savingMode:true,preserveChecks:true});
    return s.week.savingResult;
  }

  planner.budgetRescue=budgetRescue;
  planner.basketEstimate=basketEstimate;
  planner.plannedBasketCost=function(savingMode){
    const s=MW.state.get();
    if(!s.week) return 0;
    return basketEstimate(s.week.meals||[],{savingMode:savingMode==null?Boolean(s.plan.priceMode):Boolean(savingMode)}).total;
  };
  planner.optimiseForSavings=optimiseForSavings;
  planner.rebuildForPriceMode=function(on){
    const s=MW.state.get();
    if(on) return optimiseForSavings();
    s.plan.priceMode=false;
    if(s.week){s.week.savingMode=false;s.week.savingResult=null;s.week.shop=null;}
    MW.state.log('lower_cost_disabled',{});MW.state.save();
    return {changed:false,reason:'disabled',currentTotal:planner.plannedBasketCost(false)};
  };
  planner.rebuildForSavings=optimiseForSavings;
})();
