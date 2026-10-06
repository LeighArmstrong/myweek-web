window.MW = window.MW || {};
(function(){
  'use strict';
  const norm=x=>String(x||'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
  const round=x=>Math.round((Number(x)||0)*100)/100;
  const wholeUnits=new Set(['each','clove','nest','fillet','wrap','tortilla','stick','banana','rasher','slice','ball']);
  const quantity=(n,unit)=>String(Math.round(n*1000)/1000)+(unit&&unit!=='each'?' '+unit:'');
  const recipeFor=id=>(MW.catalog&&MW.catalog.get(id))||MW.RECIPES.find(r=>r.id===id);

  // Unlike recipe estimates, stock deduction requires a known compatible unit.
  // Unrecognised amounts remain on the list instead of being treated as unlimited.
  function stockQuantity(text,entry){
    const parsed=MW.inventory.parseAmount(text);
    if(!parsed||!entry) return null;
    const unit=parsed.unit==='count'?'each':parsed.unit;
    if(unit===entry.unit) return parsed.value;
    const weights={pack:'packWeight',tin:'tinWeight',can:'tinWeight',carton:'cartonWeight',bottle:'bottleWeight',clove:'cloveWeight',nest:'nestWeight',fillet:'eachWeight',wrap:'eachWeight',tortilla:'eachWeight',sachet:'sachetWeight',bunch:'bunchWeight',ball:'ballWeight',rasher:'rasherWeight',slice:'sliceWeight',pouch:'pouchWeight',banana:'eachWeight',each:'eachWeight'};
    if((unit==='g'||unit==='ml')&&(entry.unit==='g'||entry.unit==='ml')&&Number(entry.gramsPerMl)>0){
      return unit==='g'?parsed.value/entry.gramsPerMl:parsed.value*entry.gramsPerMl;
    }
    if(['g','ml'].includes(entry.unit)&&weights[unit]&&Number(entry[weights[unit]])>0) return parsed.value*Number(entry[weights[unit]]);
    if(['g','ml'].includes(unit)&&weights[entry.unit]&&Number(entry[weights[entry.unit]])>0) return parsed.value/Number(entry[weights[entry.unit]]);
    return null;
  }

  function calculate(meals,options){
    options=options||{};
    const s=MW.state.get(),p=MW.pricing;
    const savingMode=options.savingMode==null?Boolean(s.plan.priceMode):Boolean(options.savingMode);
    const force=new Set((s.week&&s.week.forceBuy||[]).map(norm));
    const remaining=new Map(),buckets=new Map(),usageReasons=new Map(),inventoryUsed=[];
    let unresolved=0,matched=0;
    function add(name,amount,reason,category,buyExplicitly,fallbackCost,sourceQuantity){
      if(p.isFreeWater(name)){inventoryUsed.push({name,amountText:amount,reason,implicit:true});return;}
      const entry=p.entryFor(name);
      let needed=entry?p.amountFor(amount,entry):null;
      const garnishName=norm(name);
      const tinyGarnish=savingMode&&entry&&Number.isFinite(needed)&&needed>0&&(
        (entry.unit==='g'&&needed<=10&&/^(fresh )?(parsley|coriander|cilantro|chives|dill|mint)$/.test(garnishName))||
        (entry.unit==='g'&&needed<=10&&/^(sesame seeds|pumpkin seeds|sunflower seeds)$/.test(garnishName))
      );
      if(tinyGarnish)return;
      // Keep provenance for every planned recipe using this retail line, even
      // when cupboard stock covers that recipe's own contribution.
      const bucketKey=entry?JSON.stringify([/equivalent/i.test(entry.label)?norm(name):entry.label,entry.unit,entry.packQty,entry.price,entry.savingPrice]):'unpriced:'+norm(name);
      if(reason){
        const allReasons=usageReasons.get(bucketKey)||[];
        if(!allReasons.includes(reason))allReasons.push(reason);
        usageReasons.set(bucketKey,allReasons);
      }
      const known=Number.isFinite(needed)&&needed>0;
      if(!known) unresolved++;
      if(known&&!buyExplicitly&&!options.ignoreInventory&&!force.has(norm(name))){
        const match=MW.inventory.find(name);
        if(match&&MW.inventory.parseAmount(match.item.amountText)){
          const key=match.key+'|'+entry.unit;
          if(!remaining.has(key)) remaining.set(key,stockQuantity(match.item.amountText,entry));
          const have=remaining.get(key);
          if(Number.isFinite(have)&&have>0){
            const used=Math.min(have,needed);
            needed=Math.max(0,needed-used);remaining.set(key,Math.max(0,have-used));
            inventoryUsed.push({name,amountText:quantity(used,entry.unit),reason,partial:needed>0});
          }
        }
      }
      if(known&&needed<0.000001) return;
      // Entries with distinct units, pack sizes or prices must never be merged.
      const key=entry?JSON.stringify([/equivalent/i.test(entry.label)?norm(name):entry.label,entry.unit,entry.packQty,entry.price,entry.savingPrice]):'unpriced:'+norm(name);
      const b=buckets.get(key)||{name,entry,needed:0,unknown:0,amounts:[],reasons:[],category:category||'Ingredients',fallbackCost:0,sourceQuantity:false};
      if(known) b.needed+=needed;else b.unknown++;
      b.amounts.push(known?quantity(needed,entry.unit):String(amount));
      if(reason&&!b.reasons.includes(reason)) b.reasons.push(reason);
      b.sourceQuantity=b.sourceQuantity||Boolean(sourceQuantity);
      if(!entry){
        const supplied=Number(fallbackCost);
        b.fallbackCost+=fallbackCost!=null&&Number.isFinite(supplied)&&supplied>=0?supplied:2.5;
      }
      buckets.set(key,b);
    }
    (meals||[]).forEach(m=>{
      const r=m&&Array.isArray(m.ingredients)?m:recipeFor(typeof m==='string'?m:m.recipeId||m.id);
      if(!r){unresolved++;return;}
      const factor=r.scaleSafe===false?1:(Number(options.people==null?s.household.people:options.people)||2)/(r.servings||2);
      p.rowsForRecipe(r).forEach(([q,n])=>add(n,r.scaleSafe===false?String(q):p.scaleAmount(q,factor),r.title,'Dinner ingredients',false,null,r.scaleSafe===false));
    });
    const lunchId=Object.prototype.hasOwnProperty.call(options,'lunchId')?options.lunchId:s.week&&s.week.lunchId;
    const lunch=MW.LUNCHES.find(r=>r.id===lunchId);
    const lunchPortions=(s.plan.lunchDays||[]).length*Math.max(1,Number(s.plan.lunchPeople)||1);
    if(lunch&&lunchPortions){
      const factor=lunchPortions/(lunch.servings||5);
      p.rowsForRecipe(lunch).forEach(([q,n])=>add(n,p.scaleAmount(q,factor),lunch.title,'Lunch ingredients',false));
    }
    (options.includeRegulars===false?[]:s.regulars||[]).filter(r=>r.selected).forEach(r=>{
      const count=Math.max(1,Number(r.count)||1),unit=String(r.unit||'item');
      add(r.name,count+' '+unit+(count!==1&&!/s$/.test(unit)?'s':''),'Added this week',r.category,true,Number.isFinite(Number(r.estimatedUnitCost))?count*Number(r.estimatedUnitCost):null);
    });
    (options.includeExtras===false?[]:s.week&&s.week.extras||[]).forEach(r=>add(r.name,r.qty==null?'1':String(r.qty),'Added this week',r.category||'Extras',true,r.estimatedCost));
    const groups=Object.create(null),lines=[];
    let total=0,normalTotal=0;
    for(const b of buckets.values()){
      const e=b.entry;
      const purchaseNeed=e&&wholeUnits.has(String(e.unit||'').toLowerCase())?Math.ceil(b.needed-1e-9):b.needed;
      const packs=e?Math.max(1,Math.ceil(purchaseNeed/Math.max(0.000001,Number(e.packQty)||1))+b.unknown):0;
      const normal=e?Math.max(0,Number(e.price)||0)*packs:b.fallbackCost;
      const price=e&&savingMode&&Number.isFinite(e.savingPrice)?Math.max(0,Math.min(Number(e.price),e.savingPrice)):e?Math.max(0,Number(e.price)||0):0;
      const cost=e?price*packs:b.fallbackCost;
      const retailAmount=e?quantity(Number(e.packQty)*packs,e.unit):null;
      const x={name:b.name,amounts:b.amounts,reasons:b.reasons,category:b.category,sourceQuantity:b.sourceQuantity,
        displayAmount:e?(b.unknown?retailAmount:quantity(purchaseNeed,e.unit)):b.amounts.join(' + '),
        sourceAmounts:b.amounts.slice(),
        estimatedPrice:round(cost),normalEstimatedPrice:round(normal),priceConfidence:'unverified-benchmark',
        priceLabel:e?e.label:'Unpriced item estimate',quantityNeedsReview:Boolean(b.unknown),packs,
        quantityNote:b.unknown&&e?'Recipe uses '+b.amounts.join(' + ')+'; this is the minimum retail pack because that recipe measure cannot be converted safely.':null,
        retailEvidence:e&&e.observedRetail||null,packSize:e?quantity(e.packQty,e.unit):null,packPrice:e?price:null,
        label:e?e.label:b.name,needed:Math.round(b.needed*1000)/1000,unit:e?e.unit:null,cost:round(cost),normalCost:round(normal),sources:b.reasons};
      if(e){x.inventoryAmount=retailAmount;matched++;}
      else{x.inventoryAmount=x.displayAmount;x.priceConfidence='unpriced-estimate';}
      if(!groups[x.category]) groups[x.category]=[];
      groups[x.category].push(x);lines.push(x);total+=x.estimatedPrice;normalTotal+=x.normalEstimatedPrice;
    }
    Object.values(groups).forEach(rows=>rows.sort((a,b)=>a.name.localeCompare(b.name)));
    return {total:round(total),normalTotal:round(normalTotal),saving:round(Math.max(0,normalTotal-total)),unresolved,lines,groups,inventoryUsed,lunchPortions,matched,savingMode};
  }
  function recipeEstimate(recipe,people,ignoreInventory=true){return calculate([recipe],{people,lunchId:null,includeRegulars:false,includeExtras:false,ignoreInventory,savingMode:false});}
  MW.basket={calculate,stockQuantity,recipeEstimate};
})();
