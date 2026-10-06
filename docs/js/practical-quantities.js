window.MW=window.MW||{};
(function(){
  'use strict';
  const normalise=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const exact=new Map([
    ['tomato passata',{amount:'200 ml',reason:'HelloFresh UK states its passata carton is 200 ml.'}],
    ['passata di pomodoro',{amount:'200 ml',reason:'HelloFresh UK uses the same 200 ml passata carton for this source ingredient.'}]
  ]);
  const approximate=new Map([
    ['mixed herbs','1 tsp'],['chilli flakes','0.5 tsp'],['dried oregano','1 tsp'],['dried rosemary','1 tsp'],
    ['smoked paprika','1 tsp'],['ground cumin','1 tsp'],['ground turmeric','0.5 tsp'],['white cumin seeds','1 tsp'],
    ['dried thyme','0.5 tsp'],['dried mint','1 tsp'],['ground cinnamon','0.5 tsp'],['chinese five spice','1 tsp'],
    ['cracked black pepper','1 tsp'],['dried basil','1 tsp'],['mustard seeds','1 tsp'],['truffle zest','1 tsp'],
    ['crispy onions','15 g'],['white wine stock powder','10 g'],
    ['sushi rice','150 g'],['steamed basmati rice','250 g']
  ]);
  const bunchWeights=new Map([
    ['coriander','30 g'],['flat leaf parsley','30 g'],['chives','20 g'],['mint','30 g'],['dill','20 g'],
    ['tarragon','20 g'],['rosemary','20 g'],['sage','20 g'],['thyme','20 g']
  ]);
  const packagedWeights=new Map([
    ['mozzarella','125 g'],['lasagne sheets','500 g'],['skipjack tuna in water','145 g'],['tinned tuna','145 g'],
    ['pineapple rings','260 g'],['pizza dough','220 g'],['puff pastry sheet','320 g'],['vegetable gyozas','240 g'],['tortilla chips','200 g']
  ]);
  const beanOrTomatoCarton=/^(?:chickpeas|butter beans|lentils|black beans|mixed beans|red kidney beans|borlotti beans|finely chopped tomatoes(?: with onion and garlic| with basil)?)$/;
  const customSachet=/(?:spice mix|seasoning|spice and herb blend|curry powder mix|style curry powder|caribbean style jerk|gunpowder spice mix)$/;
  function packageCount(source){
    const m=String(source||'').match(/^([0-9]+(?:\.[0-9]+)?)\s+/);
    return m?Number(m[1]):1;
  }
  function scaledBase(amount,count){
    return scale(amount,Number.isFinite(count)&&count>0?count:1);
  }
  function ruleFor(amount,name){
    const source=String(amount||'').trim().toLowerCase(),key=normalise(name),count=packageCount(source);
    if(!/\b(?:cartons?|sachets?|pouch(?:es)?|bunch(?:es)?|balls?|packs?|tins?)\b/.test(source))return null;
    if(exact.has(key)){const row=exact.get(key);return {...row,amount:scaledBase(row.amount,count),approximate:false};}
    if(beanOrTomatoCarton.test(key)&&/cartons?/.test(source))return {amount:scaledBase('390 g',count),approximate:true,reason:'Practical supermarket equivalent for a meal-kit pulse or tomato carton; drain pulses where the method says to drain them.'};
    if(approximate.has(key))return {amount:scaledBase(approximate.get(key),count),approximate:true,reason:'Practical household equivalent for an opaque meal-kit pack quantity.'};
    if(/sachets?/.test(source)&&customSachet.test(key))return {amount:scaledBase('2 tsp',count),approximate:true,reason:'Practical household equivalent for a supplier-specific seasoning sachet; adjust to taste if the blend is especially strong.'};
    if(/sachets?/.test(source))return {amount:scaledBase('2 tsp',count),approximate:true,reason:'Practical household equivalent for an unpublished meal-kit sachet size; adjust to taste.'};
    if(/pouch(?:es)?/.test(source)&&/rice/.test(key))return {amount:scaledBase('250 g',count),approximate:true,reason:'Practical supermarket cooked-rice pouch equivalent.'};
    if(/bunch(?:es)?/.test(source)&&bunchWeights.has(key))return {amount:scaledBase(bunchWeights.get(key),count),approximate:true,reason:'Practical supermarket fresh-herb pack equivalent for a meal-kit bunch.'};
    if(/(?:balls?|packs?|tins?)/.test(source)&&packagedWeights.has(key))return {amount:scaledBase(packagedWeights.get(key),count),approximate:true,reason:'Practical supermarket pack equivalent for the meal-kit quantity.'};
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