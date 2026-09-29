window.MW=window.MW||{};
(function(){
  'use strict';
  const normalise=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const exact=new Map([
    ['tomato passata',{amount:'200 ml',reason:'HelloFresh UK states its passata carton is 200 ml.'}]
  ]);
  const approximate=new Map([
    ['mixed herbs','1 tsp'],['chilli flakes','0.5 tsp'],['dried oregano','1 tsp'],['dried rosemary','1 tsp'],
    ['smoked paprika','1 tsp'],['ground cumin','1 tsp'],['ground turmeric','0.5 tsp'],['white cumin seeds','1 tsp'],
    ['dried thyme','0.5 tsp'],['dried mint','1 tsp'],['ground cinnamon','0.5 tsp'],['chinese five spice','1 tsp'],
    ['cracked black pepper','1 tsp'],['dried basil','1 tsp'],['mustard seeds','1 tsp'],['truffle zest','1 tsp'],
    ['crispy onions','15 g'],['white wine stock powder','10 g'],
    ['sushi rice','150 g'],['steamed basmati rice','250 g']
  ]);
  const beanOrTomatoCarton=/^(?:chickpeas|butter beans|lentils|black beans|mixed beans|red kidney beans|borlotti beans|finely chopped tomatoes(?: with onion and garlic| with basil)?)$/;
  const customSachet=/(?:spice mix|seasoning|spice and herb blend|curry powder mix|style curry powder|caribbean style jerk|gunpowder spice mix)$/;
  function ruleFor(amount,name){
    const source=String(amount||'').trim().toLowerCase(),key=normalise(name);
    if(!/\b(?:carton|sachet|pouch)\b/.test(source))return null;
    if(exact.has(key))return {...exact.get(key),approximate:false};
    if(beanOrTomatoCarton.test(key)&&/carton/.test(source))return {amount:'390 g',approximate:true,reason:'Practical supermarket equivalent for a meal-kit pulse or tomato carton; drain pulses where the method says to drain them.'};
    if(approximate.has(key))return {amount:approximate.get(key),approximate:true,reason:'Practical household equivalent for an opaque meal-kit pack quantity.'};
    if(/sachet/.test(source)&&customSachet.test(key))return {amount:'2 tsp',approximate:true,reason:'Practical household equivalent for a supplier-specific seasoning sachet; adjust to taste if the blend is especially strong.'};
    if(/sachet/.test(source))return {amount:'2 tsp',approximate:true,reason:'Practical household equivalent for an unpublished meal-kit sachet size; adjust to taste.'};
    if(/pouch/.test(source)&&/rice/.test(key))return {amount:'250 g',approximate:true,reason:'Practical supermarket cooked-rice pouch equivalent.'};
    return null;
  }
  function scale(value,factor){
    const text=String(value||'').trim(),m=text.match(/^([0-9]+(?:\.[0-9]+)?)\s*(.*)$/);
    if(!m||!Number.isFinite(Number(factor)))return text;
    const n=Number(m[1])*Number(factor),rounded=Math.round(n*100)/100;
    return (Number.isInteger(rounded)?String(rounded):String(rounded))+((m[2]||'')?' '+m[2].trim():'');
  }
  function resolve(recipe,ingredientIndex,factor=1,multiplier=1){
    const row=recipe&&recipe.ingredients&&recipe.ingredients[ingredientIndex];if(!row)return null;
    const rule=ruleFor(row[0],row[1]);if(!rule)return null;
    const recipeFactor=recipe.scaleSafe===false?1:Number(factor)||1;
    return {
      amount:scale(rule.amount,recipeFactor*(Number(multiplier)||1)),
      approximate:Boolean(rule.approximate),
      sourceAmount:String(row[0]),
      reason:rule.reason
    };
  }
  function label(amount,isApproximate){
    const shown=MW.display&&MW.display.amount?MW.display.amount(amount):String(amount||'');
    return isApproximate?'About '+String(shown).replace(/^About\s+/i,''):shown;
  }
  MW.practicalQuantities={resolve,label,ruleFor};
})();