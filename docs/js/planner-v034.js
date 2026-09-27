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
