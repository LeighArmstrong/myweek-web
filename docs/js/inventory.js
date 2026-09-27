window.MW = window.MW || {};
(function(){
  'use strict';
  const norm=x=>String(x||'').toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim();

  const unitAliases={
    packs:'pack',tins:'tin',cans:'can',cartons:'carton',bottles:'bottle',jars:'jar',tubs:'tub',boxes:'box',bags:'bag',pots:'pot',trays:'tray',rolls:'roll',packets:'packet',
    cloves:'clove',nests:'nest',fillets:'fillet',wraps:'wrap',tortillas:'tortilla',sachets:'sachet',bunches:'bunch',balls:'ball',rashers:'rasher',slices:'slice',pouches:'pouch',bananas:'banana',
    each:'count',unit:'count',units:'count',item:'count',items:'count'
  };
  const pluralUnits={pack:'packs',tin:'tins',can:'cans',carton:'cartons',bottle:'bottles',jar:'jars',tub:'tubs',box:'boxes',bag:'bags',pot:'pots',tray:'trays',roll:'rolls',packet:'packets',clove:'cloves',nest:'nests',fillet:'fillets',wrap:'wraps',tortilla:'tortillas',sachet:'sachets',bunch:'bunches',ball:'balls',rasher:'rashers',slice:'slices',pouch:'pouches',banana:'bananas'};
  const unitPattern='fl\\s*oz|floz|oz|lb|lbs|kg|g|ml|l|tbsp|tsp|pack|packs|tin|tins|can|cans|carton|cartons|bottle|bottles|jar|jars|tub|tubs|box|boxes|bag|bags|pot|pots|tray|trays|roll|rolls|packet|packets|clove|cloves|nest|nests|fillet|fillets|wrap|wraps|tortilla|tortillas|sachet|sachets|bunch|bunches|ball|balls|rasher|rashers|slice|slices|pouch|pouches|banana|bananas|each|unit|units|item|items';

  function parseAmount(text){
    const m=String(text||'').trim().match(new RegExp('^([0-9]+(?:\\.[0-9]+)?)\\s*('+unitPattern+')?$','i'));
    if(!m) return null;
    let value=Number(m[1]),unit=(m[2]||'count').toLowerCase();
    if(unit==='kg'){value*=1000;unit='g';}
    if(unit==='oz'){value*=28.349523125;unit='g';}
    if(unit==='lb'||unit==='lbs'){value*=453.59237;unit='g';}
    if(unit==='l'){value*=1000;unit='ml';}
    if(unit==='floz'||/^fl\s*oz$/.test(unit)){value*=28.4130625;unit='ml';}
    unit=unitAliases[unit]||unit;
    return {value,unit};
  }

  function formatAmount(parsed){
    if(!parsed) return '';
    let value=Number(parsed.value)||0,unit=parsed.unit||'count';
    if(unit==='g'&&value>=1000) return ((value/1000)%1?String(Math.round(value)/1000):String(value/1000))+' kg';
    if(unit==='ml'&&value>=1000) return ((value/1000)%1?String(Math.round(value)/1000):String(value/1000))+' l';
    const display=Number.isInteger(value)?String(value):String(Math.round(value*1000)/1000);
    if(unit==='count') return display;
    return display+' '+(value===1?unit:(pluralUnits[unit]||unit));
  }

  function partsForEdit(text){
    const raw=String(text||'').trim();
    const m=raw.match(new RegExp('^([0-9]+(?:\\.[0-9]+)?)\\s*('+unitPattern+')?$','i'));
    if(!m){const parsed=parseAmount(raw);return parsed?{value:parsed.value,unit:parsed.unit==='count'?'each':parsed.unit}:null;}
    let unit=(m[2]||'each').toLowerCase();
    if(unit==='floz'||/^fl\s*oz$/.test(unit))unit='fl oz';
    else unit=unitAliases[unit]||unit;
    if(unit==='count')unit='each';
    return {value:Number(m[1]),unit};
  }

  function stockKey(name){
    const n=norm(name);
    const aliases={'garlic powder':'garlic granules','garlic granule':'garlic granules','garlic granules':'garlic granules','ground black pepper':'black pepper','vegetable oil':'cooking oil','sunflower oil':'cooking oil','barbecue sauce':'bbq sauce','bbq sauce':'bbq sauce'};
    const basic=aliases[n]||n;
    const resolved=MW.foodIdentity&&MW.foodIdentity.resolveExact?(MW.foodIdentity.resolveExact(name)||MW.foodIdentity.resolveExact(basic)):null;
    return resolved&&resolved.canonical||basic;
  }

  function find(name){
    const s=MW.state.get(),n=stockKey(name),keys=Object.keys(s.inventory||{});
    const key=keys.find(k=>stockKey(k)===n);
    return key?{key,item:s.inventory[key]}:null;
  }

  const pieceUnits=new Set(['count','clove','fillet','wrap','tortilla','ball','rasher','slice','banana']);
  function valueInUnit(parsed,targetUnit,name){
    if(!parsed||!targetUnit)return null;
    if(parsed.unit===targetUnit)return parsed.value;
    if(pieceUnits.has(parsed.unit)&&pieceUnits.has(targetUnit))return parsed.value;
    const entry=MW.pricing&&typeof MW.pricing.entryFor==='function'?MW.pricing.entryFor(name):null;
    if(entry&&['tbsp','tsp'].includes(parsed.unit)&&['g','ml'].includes(targetUnit)&&entry.unit===targetUnit){
      const factor=Number(entry[parsed.unit+'Weight']);if(Number.isFinite(factor)&&factor>0)return parsed.value*factor;
    }
    if(entry&&['tbsp','tsp'].includes(targetUnit)&&['g','ml'].includes(parsed.unit)&&entry.unit===parsed.unit){
      const factor=Number(entry[targetUnit+'Weight']);if(Number.isFinite(factor)&&factor>0)return parsed.value/factor;
    }
    return null;
  }

  function covers(name,requiredText){
    const match=find(name);if(!match)return false;
    const have=parseAmount(match.item.amountText),need=parseAmount(requiredText);
    const needed=have&&need?valueInUnit(need,have.unit,name):null;
    return Boolean(have&&Number.isFinite(needed)&&have.value>0&&have.value>=needed);
  }

  function setQuantity(name,amountText,meta){
    const s=MW.state.get(),clean=String(name||'').trim();if(!clean)return;
    const parsed=parseAmount(amountText);
    if(!parsed||!Number.isFinite(parsed.value)||parsed.value<=0){remove(clean);return;}
    meta=meta||{};
    const resolved=!meta.custom&&MW.foodIdentity&&MW.foodIdentity.resolveExact?MW.foodIdentity.resolveExact(meta.canonical||clean):null;
    const canonical=meta.canonical||resolved&&resolved.canonical||null;
    const existing=find(canonical||clean),key=existing?existing.key:(canonical||stockKey(clean));
    const display=canonical&&MW.foodIdentity&&MW.foodIdentity.canonicalLabel?MW.foodIdentity.canonicalLabel(canonical):clean;
    const item={name:existing&&existing.item&&existing.item.name||display,amountText:formatAmount(parsed),updatedAt:new Date().toISOString()};
    if(canonical)item.canonical=canonical;else item.custom=true;
    s.inventory[key]=item;
    MW.state.save();
  }

  // Compatibility wrapper for older callers. Quantity is now the source of truth.
  function set(name,status,amountText){
    if(status==='out'||!String(amountText||'').trim()){remove(name);return;}
    setQuantity(name,amountText);
  }

  function remove(name){
    const s=MW.state.get(),match=find(name);
    if(match){delete s.inventory[match.key];MW.state.save();}
  }

  function plannedNames(){
    const s=MW.state.get();if(!s.week)return [];
    const names=[];
    (s.week.meals||[]).forEach(m=>{const r=MW.catalog&&MW.catalog.get?MW.catalog.get(m.recipeId):MW.RECIPES.find(x=>x.id===m.recipeId);if(r)(r.ingredients||[]).forEach(x=>names.push(x[1]));});
    const lunch=MW.LUNCHES.find(x=>x.id===s.week.lunchId);if(lunch&&(s.plan.lunchDays||[]).length)(lunch.ingredients||[]).forEach(x=>names.push(x[1]));
    return [...new Set(names.map(norm))];
  }

  // Old Have/Low/Out prompts are intentionally retired. Exact quantities are authoritative.
  function questions(){return [];}

  function addPurchase(name,amountText){
    const s=MW.state.get(),clean=String(name||'').trim(),incoming=parseAmount(amountText);if(!clean||!incoming||incoming.value<=0)return;
    const resolved=MW.foodIdentity&&MW.foodIdentity.resolveExact?MW.foodIdentity.resolveExact(clean):null;
    const canonical=resolved&&resolved.canonical||stockKey(clean);
    const match=find(canonical),have=match&&parseAmount(match.item.amountText),incomingInHave=have?valueInUnit(incoming,have.unit,clean):null;
    const total=have&&Number.isFinite(incomingInHave)?{value:have.value+incomingInHave,unit:have.unit}:incoming;
    const key=match?match.key:canonical;
    const display=MW.foodIdentity&&MW.foodIdentity.canonicalLabel?MW.foodIdentity.canonicalLabel(canonical):clean;
    s.inventory[key]={name:match&&match.item.name||display,canonical,amountText:formatAmount(total),updatedAt:new Date().toISOString()};
    MW.state.save();
  }

  // Missing delivery items should not create vague zero-stock records.
  function markUndelivered(){}

  function plannedUsage(name){
    const state=MW.state.get(),target=stockKey(name),hits=[],seen=new Set();
    if(!state.week||!target)return hits;
    const rowMatches=row=>{
      const original=row&&row[1];
      if(stockKey(original)===target)return true;
      const sub=MW.shopping&&MW.shopping.substitutionForIngredient?MW.shopping.substitutionForIngredient(original,state):null;
      return Boolean(sub&&stockKey(sub.replacementName)===target);
    };
    (state.week.meals||[]).forEach(meal=>{
      const recipe=MW.catalog&&MW.catalog.get?MW.catalog.get(meal.recipeId):MW.RECIPES.find(x=>x.id===meal.recipeId);
      if(!recipe||!(recipe.ingredients||[]).some(rowMatches))return;
      const key='dinner:'+recipe.id;
      if(seen.has(key))return;
      seen.add(key);
      hits.push({type:'Dinner',recipeId:recipe.id,label:recipe.title||recipe.name||'Dinner'});
    });
    const lunch=MW.LUNCHES.find(x=>x.id===state.week.lunchId);
    if(lunch&&(state.plan.lunchDays||[]).length&&(lunch.ingredients||[]).some(rowMatches)){
      const key='lunch:'+lunch.id;
      if(!seen.has(key)){seen.add(key);hits.push({type:'Lunch',recipeId:lunch.id,label:lunch.title||lunch.name||'Lunch'});}
    }
    return hits;
  }

  function isPlannedIngredient(name){return plannedUsage(name).length>0;}

  function applyUse(state,uses){
    state.inventory=state.inventory||{};const uncertain=[];
    for(const use of uses||[]){
      const key=Object.keys(state.inventory).find(k=>stockKey(k)===stockKey(use.name));if(!key)continue;
      const item=state.inventory[key],have=parseAmount(item.amountText),used=parseAmount(use.amountText),usedInHave=have&&used?valueInUnit(used,have.unit,use.name):null;
      if(have&&Number.isFinite(usedInHave)){
        const left=Math.max(0,have.value-usedInHave);
        if(left<=0.000001)delete state.inventory[key];
        else{item.amountText=formatAmount({value:left,unit:have.unit});delete item.status;delete item.confidence;item.updatedAt=new Date().toISOString();}
      }else uncertain.push(use.name);
    }
    return uncertain;
  }

  function commitUse(uses){
    return MW.state.transaction(st=>{
      const uncertain=applyUse(st,uses);
      st.events.push({at:new Date().toISOString(),type:'inventory_forecast_used',data:{count:(uses||[]).length,uncertain}});
      st.events=st.events.slice(-500);return uncertain;
    });
  }

  function consumeRecipe(recipe,people){
    if(!recipe)return;
    const factor=recipe.scaleSafe===false?1:(Number(people)||2)/(recipe.servings||2);
    const rows=MW.pricing&&MW.pricing.rowsForRecipe?MW.pricing.rowsForRecipe(recipe):recipe.ingredients||[],uses=[],substitutionUncertain=[];
    for(const [q,n] of rows){
      const plannedAmount=recipe.scaleSafe===false?String(q):(MW.shopping?MW.shopping.scaleAmount(q,factor):String(q));
      const sub=MW.shopping&&MW.shopping.substitutionForIngredient?MW.shopping.substitutionForIngredient(n):null;
      if(!sub){uses.push({name:n,amountText:plannedAmount});continue;}
      const planned=parseAmount(plannedAmount),replacement=parseAmount(sub.replacementAmount);
      const converted=planned&&replacement?valueInUnit(planned,replacement.unit,sub.replacementName):null;
      if(!planned||!replacement||sub.comparable===false||!Number.isFinite(converted)){
        substitutionUncertain.push({original:n,replacement:sub.replacementName,plannedAmount,replacementAmount:sub.replacementAmount});
        continue;
      }
      uses.push({name:sub.replacementName,amountText:formatAmount({value:converted,unit:replacement.unit}),substitutedFor:n});
    }
    const uncertain=commitUse(uses);
    MW.state.log('recipe_inventory_consumed',{recipeId:recipe.id,count:uses.length,uncertain,substitutionUncertain});
  }

  MW.inventory={applyUse,stockKey,find,covers,set,setQuantity,remove,questions,commitUse,consumeRecipe,addPurchase,markUndelivered,isPlannedIngredient,plannedUsage,plannedNames,parseAmount,formatAmount,partsForEdit,valueInUnit};
})();