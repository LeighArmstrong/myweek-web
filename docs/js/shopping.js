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