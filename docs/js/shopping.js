window.MW = window.MW || {};
(function(){
  const norm=x=>String(x||'').toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim();

  function scaleAmount(text,factor){
    if(MW.pricing&&MW.pricing.scaleAmount) return MW.pricing.scaleAmount(text,factor);
    factor=Number(factor)||1;
    if(Math.abs(factor-1)<0.001) return String(text);
    const m=String(text||'').trim().match(/^([0-9]+(?:\.[0-9]+)?)\s*(.*)$/);
    if(!m) return String(text);
    let value=Number(m[1])*factor;
    const unit=(m[2]||'').trim();
    if(!unit) value=Math.ceil(value);
    return ((Number.isInteger(value)?String(value):value.toFixed(1))+(unit?' '+unit:'')).trim();
  }

  const getRecipe=id=>(MW.catalog&&MW.catalog.get(id))||MW.RECIPES.find(x=>x.id===id);

  const itemKey=x=>String(x||'');
  function substitutionMap(state){
    state=state||MW.state.get();
    if(!state.week)return {};
    state.week.shoppingSubstitutions=state.week.shoppingSubstitutions||{};
    return state.week.shoppingSubstitutions;
  }
  function getSubstitution(key,state){
    return substitutionMap(state)[itemKey(key)]||null;
  }
  function setSubstitution(key,data){
    const cleanKey=itemKey(key);
    if(!cleanKey)throw new Error('The shopping item could not be identified.');
    return MW.state.transaction(st=>{
      if(!st.week)throw new Error('Create a week before recording a shop swap.');
      const originalName=String(data&&data.originalName||'').trim(),replacementName=String(data&&data.replacementName||'').trim();
      const plannedAmount=String(data&&data.plannedAmount||'').trim(),replacementAmount=String(data&&data.replacementAmount||'').trim();
      if(!originalName||!replacementName||!replacementAmount)throw new Error('Choose what you bought and enter the amount.');
      const originalKey=MW.inventory?MW.inventory.stockKey(originalName):norm(originalName),replacementKey=MW.inventory?MW.inventory.stockKey(replacementName):norm(replacementName);
      if(originalKey&&replacementKey&&originalKey===replacementKey)throw new Error('That matches the planned ingredient, so it does not need to be recorded as a swap.');
      const map=substitutionMap(st);
      map[cleanKey]={
        key:cleanKey,
        originalName,
        replacementName,
        plannedAmount,
        replacementAmount,
        comparable:data&&data.comparable!==false,
        recordedAt:new Date().toISOString()
      };
      st.events=st.events||[];
      st.events.push({at:new Date().toISOString(),type:'shopping_substitution_recorded',data:{key:cleanKey,originalName,replacementName,plannedAmount,replacementAmount}});
      st.events=st.events.slice(-500);
      return map[cleanKey];
    });
  }
  function clearSubstitution(key){
    return MW.state.transaction(st=>{
      if(!st.week)return;
      const map=substitutionMap(st),cleanKey=itemKey(key),old=map[cleanKey];
      if(old){
        delete map[cleanKey];
        st.events=st.events||[];
        st.events.push({at:new Date().toISOString(),type:'shopping_substitution_cleared',data:{key:cleanKey,originalName:old.originalName,replacementName:old.replacementName}});
        st.events=st.events.slice(-500);
      }
    });
  }
  function substitutionForIngredient(name,state){
    const target=MW.inventory?MW.inventory.stockKey(name):norm(name);
    if(!target)return null;
    return Object.values(substitutionMap(state)).find(x=>(MW.inventory?MW.inventory.stockKey(x.originalName):norm(x.originalName))===target)||null;
  }

  function signature(){
    const s=MW.state.get(),w=s.week||{};
    return JSON.stringify({
      meals:(w.meals||[]).map(x=>[x.day,x.recipeId]),
      lunch:w.lunchId||'',
      lunchDays:(s.plan.lunchDays||[]).slice(),
      lunchPeople:Number(s.plan.lunchPeople)||1,
      people:Number(s.household.people)||2,
      regulars:(s.regulars||[]).filter(x=>x.selected).map(x=>[x.id,x.count,x.unit]),
      extras:(w.extras||[]).map(x=>[x.name,x.qty,x.estimatedCost]),
      forceBuy:(w.forceBuy||[]).slice().sort(),
      inventory:s.inventory||{},
      savingMode:Boolean(s.plan.priceMode),
      priceAsOf:MW.pricing&&MW.pricing.asOf||'',
      priceRevision:MW.pricing&&MW.pricing.revision||''
    });
  }

  MW.shopping={
    scaleAmount,
    signature,
    substitutionMap,
    getSubstitution,
    setSubstitution,
    clearSubstitution,
    substitutionForIngredient,
    build(options){
      const s=MW.state.get();
      if(!s.week||!Array.isArray(s.week.meals)) throw new Error('No weekly plan is available yet.');
      options=options||{};
      const savingMode=options.savingMode==null?Boolean(s.plan.priceMode):Boolean(options.savingMode);
      const estimate=MW.basket.calculate(s.week.meals,{savingMode});
      const {groups,inventoryUsed,lunchPortions}=estimate;
      const estimated=estimate.total,raw=estimate.normalTotal,estimatedSavings=estimate.saving;
      const savingTips=[];
      if(savingMode&&inventoryUsed.length) savingTips.push('Use what is already in the cupboard');
      if(savingMode&&estimate.lines.some(x=>x.reasons.length>1)) savingTips.push('Shared ingredients are already consolidated');
      s.week.inventoryUsed=inventoryUsed;
      s.week.savingMode=savingMode;
      const validSubstitutions=new Map();
      for(const [group,rows] of Object.entries(groups||{}))for(const row of rows||[])validSubstitutions.set(group+'|'+row.name,row);
      const savedSubstitutions=substitutionMap(s);
      for(const key of Object.keys(savedSubstitutions)){
        const row=validSubstitutions.get(key),sub=savedSubstitutions[key];
        const planned=row&&String(row.inventoryAmount||row.displayAmount||'').trim();
        if(!row||(sub.plannedAmount&&planned&&String(sub.plannedAmount).trim()!==planned))delete savedSubstitutions[key];
      }
      s.week.shop={
        groups,
        estimatedTotal:Math.round(estimated*100)/100,
        rawEstimate:Math.round(raw*100)/100,
        estimatedSavings:Math.round(estimatedSavings*100)/100,
        savingMode,
        savingTips,
        itemCount:estimate.lines.length,
        lunchPortions,
        priceAsOf:MW.pricing&&MW.pricing.asOf||null,
        priceRetailer:MW.pricing&&MW.pricing.retailer||s.household.retailer,
        priceCoverage:estimate.lines.length?Math.round(estimate.matched/estimate.lines.length*100):100,
        quantityReviewCount:estimate.unresolved,
        planSignature:signature(),
        createdAt:new Date().toISOString()
      };
      if(!options.preserveChecks) s.ui.shopChecks={};
      MW.state.log('shop_built',{count:s.week.shop.itemCount,estimatedTotal:s.week.shop.estimatedTotal,savingMode,priceCoverage:s.week.shop.priceCoverage});
      MW.state.save();
      return s.week.shop;
    }
  };
})();