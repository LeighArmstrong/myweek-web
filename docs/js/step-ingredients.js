window.MW=window.MW||{};
(function(){
  'use strict';
  const normalise=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
  const ignored=new Set(['the','and','with','for','style','mixed','large','small','medium','fresh','baby','grated','diced','chopped','sliced','extra','lean','british','mature','hard','italian','ready','prepared']);
  const generic=new Set(['sauce','paste','mix','seasoning','stock','oil','water','bread','cheese']);
  function singular(word){
    if(word.length>4&&/ies$/.test(word))return word.slice(0,-3)+'y';
    if(word.length>4&&/sses$/.test(word))return word.slice(0,-2);
    if(word.length>3&&/s$/.test(word)&&!/ss$/.test(word))return word.slice(0,-1);
    return word;
  }
  function tokens(value){
    return normalise(value).split(' ').map(singular).filter(x=>x.length>=3&&!ignored.has(x));
  }
  function wordSet(value){return new Set(tokens(value));}
  function headTokens(value){return tokens(String(value||'').split(/\bfor\b/i)[0]);}
  function isQualified(value){return /\bfor\b/i.test(String(value||''));}
  function sourceMapped(recipe,stepIndex){
    const ids=recipe&&Array.isArray(recipe.sourceStepIngredientIds)&&Number.isInteger(stepIndex)?recipe.sourceStepIngredientIds[stepIndex]:null;
    if(!Array.isArray(ids)||!ids.length||!Array.isArray(recipe.ingredientMeta))return null;
    const names=new Set(recipe.ingredientMeta.filter(x=>ids.includes(x.id)).map(x=>normalise(x.name)));
    return names;
  }
  function tokenCounts(recipe){
    const counts=new Map();
    for(const row of recipe.ingredients||[])for(const t of new Set(tokens(row[1])))counts.set(t,(counts.get(t)||0)+1);
    return counts;
  }
  function specialEvidence(name,stepText){
    const n=normalise(name),t=normalise(stepText);
    if(/\bgarlic clove\b/.test(n)){
      const clean=t.replace(/\bgarlic\s+(?:bread|baguette|butter|oil|sauce|paste|mayo(?:nnaise)?)\b/g,' ');
      if(!/\bgarlic\b/.test(clean))return false;
      return /(?:peel|grate|crush|chop|mince|press|add|stir|mix|fry|cook|spread|half|remaining|rest of|reserve)[a-z ]{0,45}\bgarlic\b/.test(clean)||
        /\bgarlic\b[a-z ]{0,30}(?:press|clove|half|remaining|rest)/.test(clean);
    }
    return false;
  }
  function lexicalEvidence(recipe,step,ingredientIndex){
    const row=(recipe.ingredients||[])[ingredientIndex];if(!row)return {matched:false,reason:'missing-row'};
    const name=row[1],stepNorm=normalise(step),stepWords=wordSet(step);
    if(/\bgarlic clove\b/i.test(String(name||''))){const matched=specialEvidence(name,stepNorm);return {matched,reason:matched?'ingredient-context':'no-high-confidence-reference'};}
    const list=tokens(name),head=headTokens(name),counts=tokenCounts(recipe);
    const unique=list.filter(t=>(counts.get(t)||0)===1);
    const uniqueHead=head.filter(t=>(counts.get(t)||0)===1);
    const allPhrase=list.length>1&&list.every(t=>stepWords.has(t));
    if(allPhrase)return {matched:true,reason:'full-ingredient-words'};
    if(isQualified(name)){
      const quantityCue=/use (?:the )?quantit(?:y|ies) listed in the ingredients|use the quantities listed|as listed in the ingredients/.test(stepNorm);
      if(quantityCue&&uniqueHead.some(t=>stepWords.has(t)))return {matched:true,reason:'qualified-ingredient-cue'};
      return {matched:false,reason:'qualified-context-only'};
    }
    if(unique.some(t=>stepWords.has(t)&&(!generic.has(t)||list.length===1)))return {matched:true,reason:'unique-ingredient-word'};
    if(list.length===1&&(counts.get(list[0])||0)===1&&stepWords.has(list[0]))return {matched:true,reason:'single-ingredient-word'};
    if(specialEvidence(name,stepNorm))return {matched:true,reason:'ingredient-context'};
    return {matched:false,reason:'no-high-confidence-reference'};
  }
  function evidence(recipe,step,ingredientIndex,stepIndex){
    const row=(recipe.ingredients||[])[ingredientIndex];if(!row)return {matched:false,reason:'missing-row',lexical:false};
    const name=row[1],n=normalise(name),mapped=sourceMapped(recipe,stepIndex),lex=lexicalEvidence(recipe,step,ingredientIndex);
    if(mapped&&mapped.has(n))return {matched:true,reason:'source-step-id',lexical:lex.matched,lexicalReason:lex.reason};
    if(mapped)return {matched:false,reason:'source-step-id',lexical:lex.matched,lexicalReason:lex.reason};
    return {...lex,lexical:lex.matched,lexicalReason:lex.reason};
  }
  function rootToken(recipe,index){
    const row=(recipe.ingredients||[])[index];if(!row)return '';
    const list=tokens(row[1]),head=headTokens(row[1]),counts=tokenCounts(recipe);
    const base=isQualified(row[1])&&head.length?head:list;
    const unique=base.filter(t=>(counts.get(t)||0)===1&&!generic.has(t));
    if(/garlic clove/i.test(row[1]))return 'garlic';
    return unique[0]||base.find(t=>!generic.has(t))||base[0]||'';
  }
  function splitMultiplier(recipe,ingredientIndex,step,stepIndex){
    const root=rootToken(recipe,ingredientIndex);if(!root)return 1;
    const t=normalise(step),near='(?:[a-z ]{0,32})';
    const half=new RegExp('(?:half|1 2)'+near+'\\b'+root+'\\b|\\b'+root+'\\b'+near+'(?:half|1 2)');
    if(half.test(t))return 0.5;
    const remaining=new RegExp('(?:remaining|rest of(?: the)?)'+near+'\\b'+root+'\\b');
    if(!remaining.test(t))return 1;
    const steps=recipe.steps||[];
    for(let i=0;i<steps.length;i++){
      if(i===stepIndex)continue;
      if(half.test(normalise(steps[i])))return 0.5;
    }
    return 1;
  }
  function usageEvidence(recipe,ingredientIndex,step){
    const root=rootToken(recipe,ingredientIndex);if(!root)return false;
    const near='[a-z ]{0,42}',action='(?:add|stir(?: in| through)?|mix(?: in| through)?|combine|fold|toss|fry|cook|roast|bake|simmer|boil|pour|scatter|spread|drizzle|coat|dip|top|serve|season|melt|whisk)';
    const re=new RegExp(action+near+'\\b'+root+'\\b|\\b'+root+'\\b'+near+action);
    return String(step||'').split(/[.!?;]+/).map(normalise).filter(Boolean).some(part=>new RegExp('\\b'+root+'\\b').test(part)&&re.test(part));
  }
  function scaledAmount(recipe,row,factor,multiplier){
    let total=MW.preparation&&MW.preparation.scaleAmount?
      MW.preparation.scaleAmount(recipe,row[0],row[1],factor):
      (recipe.scaleSafe===false?row[0]:MW.shopping.scaleAmount(row[0],factor));
    if(multiplier===1)return total;
    const parsed=MW.inventory&&MW.inventory.parseAmount?MW.inventory.parseAmount(total):null;
    if(!parsed)return total;
    return MW.inventory.formatAmount({value:parsed.value*multiplier,unit:parsed.unit});
  }
  const allocationCache=new WeakMap();
  function allocations(recipe){
    if(recipe&&typeof recipe==='object'&&allocationCache.has(recipe))return allocationCache.get(recipe);
    const steps=recipe&&recipe.steps||[],map=new Map();
    for(let ingredientIndex=0;ingredientIndex<(recipe.ingredients||[]).length;ingredientIndex++){
      const hits=[];
      for(let stepIndex=0;stepIndex<steps.length;stepIndex++){
        const ev=evidence(recipe,steps[stepIndex],ingredientIndex,stepIndex);
        if(ev.matched)hits.push({stepIndex,reason:ev.reason,lexical:Boolean(ev.lexical),usage:usageEvidence(recipe,ingredientIndex,steps[stepIndex]),multiplier:splitMultiplier(recipe,ingredientIndex,steps[stepIndex],stepIndex)});
      }
      let chosen=[];
      if(hits.length===1)chosen=hits;
      else if(hits.length>1){
        const lexical=hits.filter(x=>x.lexical);
        if(lexical.length===1)chosen=lexical;
        else if(lexical.length>1){
          const split=lexical.filter(x=>x.multiplier>0&&x.multiplier<1);
          const splitTotal=split.reduce((n,x)=>n+x.multiplier,0);
          if(split.length===lexical.length&&splitTotal<=1.001)chosen=split;
          else{
            const used=lexical.filter(x=>x.usage);
            if(used.length===1)chosen=used;
            else if(used.length>1){
              const usedSplit=used.filter(x=>x.multiplier>0&&x.multiplier<1),usedTotal=usedSplit.reduce((n,x)=>n+x.multiplier,0);
              if(usedSplit.length===used.length&&usedTotal<=1.001)chosen=usedSplit;
            }
          }
        }
      }
      for(const hit of chosen){
        if(!map.has(hit.stepIndex))map.set(hit.stepIndex,[]);
        map.get(hit.stepIndex).push({ingredientIndex,reason:hit.reason,multiplier:hit.multiplier});
      }
    }
    if(recipe&&typeof recipe==='object')allocationCache.set(recipe,map);
    return map;
  }
  function forStep(recipe,step,factor,stepIndex){
    const rows=allocations(recipe).get(stepIndex)||[],merged=new Map();
    for(const x of rows){
      const row=recipe.ingredients[x.ingredientIndex],name=row[1],amount=scaledAmount(recipe,row,factor,x.multiplier),key=normalise(name);
      const current=merged.get(key);
      if(!current){merged.set(key,{name,amount,ingredientIndex:x.ingredientIndex,ingredientIndices:[x.ingredientIndex],reason:x.reason,multiplier:x.multiplier});continue;}
      current.ingredientIndices.push(x.ingredientIndex);
      const a=MW.inventory&&MW.inventory.parseAmount?MW.inventory.parseAmount(current.amount):null,b=MW.inventory&&MW.inventory.parseAmount?MW.inventory.parseAmount(amount):null;
      if(a&&b&&a.unit===b.unit)current.amount=MW.inventory.formatAmount({value:a.value+b.value,unit:a.unit});
      else if(String(current.amount)!==String(amount))current.amount=String(current.amount)+' + '+String(amount);
    }
    return [...merged.values()];
  }
  function audit(recipe){
    const steps=recipe&&recipe.steps||[],rows=[];
    for(let i=0;i<steps.length;i++)rows.push({stepIndex:i,used:forStep(recipe,steps[i],1,i)});
    return rows;
  }
  MW.stepIngredients={forStep,evidence,audit,normalise,tokens,usageEvidence};
})();
