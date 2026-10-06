window.MW=window.MW||{};
(function(){
  'use strict';
  function quantities(recipe){
    const st=MW.state.get();
    if(!recipe.isLunch)return {planned:Number(st.household.people)||2,prepared:0,remaining:Number(st.household.people)||2,defaultPortions:Number(st.household.people)||2};
    const planned=(st.plan.lunchDays||[]).length*Math.max(1,Number(st.plan.lunchPeople)||1);
    const prepared=Number(st.week&&st.week.preparedLunchPortions&&st.week.preparedLunchPortions[recipe.id])||0;
    const remaining=Math.max(0,planned-prepared);
    return {planned,prepared,remaining,defaultPortions:remaining};
  }
  function portions(recipe){
    const st=MW.state.get(),active=st.week&&st.week.preparation,q=quantities(recipe);
    if(recipe.isLunch){
      if(active&&active.recipeId===recipe.id&&!active.finished&&Number(active.portions)===q.remaining)return active.portions;
      return q.defaultPortions;
    }
    if(active&&active.recipeId===recipe.id&&!active.finished)return active.portions;
    return q.defaultPortions;
  }
  const discreteUnits=new Set(['each','clove','nest','fillet','wrap','tortilla','stick','banana','rasher','slice','ball']);
  function scaleAmount(recipe,amount,name,factor){
    if(recipe.scaleSafe===false)return String(amount);
    const scaled=MW.shopping.scaleAmount(amount,factor);
    if(!recipe.isLunch)return scaled;
    const m=String(scaled).trim().match(/^([0-9]+(?:\.[0-9]+)?)\s*(.*)$/);
    if(!m)return scaled;
    const entry=MW.pricing&&MW.pricing.entryFor?MW.pricing.entryFor(name):null;
    const unit=String(m[2]||'').toLowerCase();
    const explicit=unit.replace(/s$/,'');
    const isWhole=(entry&&discreteUnits.has(String(entry.unit||'').toLowerCase()))||discreteUnits.has(explicit);
    if(!isWhole)return scaled;
    const n=Math.max(1,Math.ceil(Number(m[1])-1e-9));
    if(!unit)return String(n);
    const label=n===1?explicit:(explicit+'s');
    return n+' '+label;
  }
  function begin(recipe,count){
    const q=quantities(recipe);count=recipe.isLunch?q.remaining:Number(count);
    if(!Number.isInteger(count)||count<1||count>q.remaining)throw new Error('Choose a valid number of preparation portions.');
    if(!MW.planner.allowed(recipe))throw new Error('This recipe does not match your current settings.');
    return MW.state.transaction(st=>{
      if(!st.week)throw new Error('Create a week before cooking.');
      const old=st.week.preparation;
      if(old&&old.recipeId===recipe.id&&old.portions===count&&!old.finished){
        old.gatheredIngredients=old.gatheredIngredients&&typeof old.gatheredIngredients==='object'?old.gatheredIngredients:{};
        return old;
      }
      const gathered={};
      st.week.preparation={id:Date.now().toString(36)+'-'+Math.random().toString(36).slice(2),recipeId:recipe.id,portions:count,finished:false,gatheredIngredients:{...gathered}};
      return st.week.preparation;
    });
  }
  function gathered(recipe){
    const st=MW.state.get(),a=st.week&&st.week.preparation;
    if(!a||a.recipeId!==recipe.id||a.finished||!a.gatheredIngredients||typeof a.gatheredIngredients!=='object')return {};
    return {...a.gatheredIngredients};
  }
  function setGathered(recipe,index,checked){
    if(!Number.isInteger(index)||index<0||index>=(recipe.ingredients||[]).length)throw new Error('Choose a valid ingredient.');
    return MW.state.transaction(st=>{
      const a=st.week&&st.week.preparation;
      if(!a||a.recipeId!==recipe.id||a.finished)throw new Error('Open this recipe before changing the gathering checklist.');
      a.gatheredIngredients=a.gatheredIngredients&&typeof a.gatheredIngredients==='object'?a.gatheredIngredients:{};
      const key=String(index);
      if(checked)a.gatheredIngredients[key]=true;else delete a.gatheredIngredients[key];
      a.updatedAt=new Date().toISOString();
      return Boolean(a.gatheredIngredients[key]);
    });
  }
  function cancel(recipe){
    return MW.state.transaction(st=>{
      const a=st.week&&st.week.preparation;
      if(!a||a.recipeId!==recipe.id||a.finished)return false;
      st.week.preparation=null;return true;
    });
  }
  function finish(recipe){
    return MW.state.transaction(st=>{
      const a=st.week&&st.week.preparation;
      if(!a||a.recipeId!==recipe.id)throw new Error('Open the preparation screen before finishing this recipe.');
      if(a.finished)return false;
      st.week.completedRecipes=st.week.completedRecipes||[];
      if(!recipe.isLunch&&st.week.completedRecipes.includes(recipe.id)){a.finished=true;a.gatheredIngredients={};return false;}
      const f=recipe.scaleSafe===false?1:a.portions/(recipe.servings||2);
      const rows=MW.pricing.rowsForRecipe(recipe),uses=[],substitutionUncertain=[];
      for(const [amount,name] of rows){
        const plannedAmount=scaleAmount(recipe,amount,name,f);
        const sub=MW.shopping&&MW.shopping.substitutionForIngredient?MW.shopping.substitutionForIngredient(name,st):null;
        if(!sub){uses.push({name,amountText:plannedAmount});continue;}
        const planned=MW.inventory.parseAmount(plannedAmount),replacement=MW.inventory.parseAmount(sub.replacementAmount);
        const converted=planned&&replacement&&sub.comparable!==false?MW.inventory.valueInUnit(planned,replacement.unit,sub.replacementName):null;
        if(!planned||!replacement||!Number.isFinite(converted)){
          substitutionUncertain.push({original:name,replacement:sub.replacementName,plannedAmount,replacementAmount:sub.replacementAmount});
          continue;
        }
        uses.push({name:sub.replacementName,amountText:MW.inventory.formatAmount({value:converted,unit:replacement.unit}),substitutedFor:name});
      }
      const uncertain=MW.inventory.applyUse(st,uses);
      if(recipe.isLunch){
        st.week.preparedLunchPortions=st.week.preparedLunchPortions||{};
        st.week.preparedLunchPortions[recipe.id]=(Number(st.week.preparedLunchPortions[recipe.id])||0)+a.portions;
      }else st.week.completedRecipes.push(recipe.id);
      a.finished=true;a.gatheredIngredients={};a.finishedAt=new Date().toISOString();
      st.events.push({at:a.finishedAt,type:'preparation_finished',data:{recipeId:recipe.id,portions:a.portions,uncertain,substitutionUncertain}});
      st.events=st.events.slice(-500);return true;
    });
  }
  MW.preparation={quantities,portions,scaleAmount,begin,gathered,setGathered,cancel,finish};
})();
