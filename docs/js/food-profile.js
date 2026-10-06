window.MW = window.MW || {};
(function(){
  const analysisCache=new WeakMap();
  const norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();

  const patterns=[
    {id:'omnivore',label:'Anything'},
    {id:'meat-or-fish',label:'Meat or fish'},
    {id:'vegetarian',label:'Vegetarian'},
    {id:'vegan',label:'Vegan'},
    {id:'pescatarian',label:'Pescatarian'}
  ];
  const goals=[
    {id:'balanced',label:'Balanced'},
    {id:'lighter',label:'Lighter'},
    {id:'more-veg',label:'More veg'},
    {id:'quick',label:'Quick'}
  ];
  const lunchStyles=[
    {id:'any',label:'Any lunch'},
    {id:'sandwich',label:'Sandwiches'},
    {id:'wrap',label:'Wraps & tacos'},
    {id:'soup',label:'Soups'},
    {id:'salad',label:'Salads'},
    {id:'pasta',label:'Pasta & noodles'},
    {id:'rice',label:'Rice bowls'},
    {id:'grain',label:'Couscous & grains'},
    {id:'potato',label:'Loaded potatoes'},
    {id:'hot',label:'Hot lunches'},
    {id:'light',label:'Light'},
    {id:'no-cook',label:'No-cook'},
    {id:'quick',label:'Quick prep'}
  ];
  const allergens=[
    {id:'celery',label:'Celery',terms:['celery','celeriac']},
    {id:'gluten',label:'Gluten',terms:['wheat','flour','bread','pasta','noodles','couscous','wrap','tortilla','oats','barley','rye']},
    {id:'crustaceans',label:'Crustaceans',terms:['prawn','shrimp','crab','lobster','crayfish']},
    {id:'eggs',label:'Eggs',terms:['egg','mayonnaise','mayo']},
    {id:'fish',label:'Fish',terms:['fish','barramundi','basa','pangasius','hake','sea bream','sea bass','seabass','trout','pollock','pollack','tilapia','monkfish','swordfish','salmon','tuna','cod','haddock','octopus','clam','mackerel','sardine','anchovy']},
    {id:'lupin',label:'Lupin',terms:['lupin']},
    {id:'milk',label:'Milk',terms:['milk','cheese','yoghurt','yogurt','cream','butter','halloumi','parmesan','feta','cheddar','mascarpone','stilton','whey','casein']},
    {id:'molluscs',label:'Molluscs',terms:['mussel','oyster','squid','octopus','scallop','clam']},
    {id:'mustard',label:'Mustard',terms:['mustard']},
    {id:'peanuts',label:'Peanuts',terms:['peanut']},
    {id:'sesame',label:'Sesame',terms:['sesame','tahini','hummus']},
    {id:'soya',label:'Soya',terms:['soy','soya','tofu','edamame']},
    {id:'sulphites',label:'Sulphites',terms:['sulphite','sulfite','sulphur dioxide']},
    {id:'tree-nuts',label:'Tree nuts',terms:['almond','hazelnut','walnut','cashew','pecan','pistachio','brazil nut','macadamia']}
  ];

  const meatTerms=['beef','chicken','pork','sausage','ham','bacon','lamb','turkey','duck','venison','chorizo','salami','prosciutto','nduja','pancetta','pepperoni','pastrami','gammon','steak','sirloin','rump','gelatine','gelatin','lard'];
  const fishTerms=['fish','barramundi','basa','pangasius','hake','sea bream','sea bass','seabass','trout','pollock','pollack','tilapia','monkfish','swordfish','salmon','tuna','cod','haddock','octopus','clam','mackerel','sardine','anchovy','prawn','shrimp','crab','lobster','mussel','oyster','squid','scallop'];
  const animalTerms=['egg','mayonnaise','mayo','cheese','yoghurt','yogurt','cream','butter','halloumi','parmesan','feta','cheddar','mascarpone','stilton','whey','casein','parmigiano','pecorino','burrata','mozzarella','paneer','ricotta','red leicester','creme fraiche','pesto','brioche','honey','gelatine','gelatin','lard'];
  const vegTerms=['pepper','tomato','spinach','broccoli','carrot','courgette','cucumber','peas','onion','chickpea','beans','lentil','vegetable','sweet potato','avocado'];

  const hasAny=(text,terms)=>terms.some(term=>new RegExp('(?:^| )'+term+'(?:s|es)?(?: |$)').test(text));
  const plantMilkSafeText=text=>text
    .replace(/coconut milk/g,'coconutdrink')
    .replace(/almond milk/g,'almonddrink')
    .replace(/oat milk/g,'oatdrink')
    .replace(/soy milk/g,'soydrink')
    .replace(/soya milk/g,'soyadrink')
    .replace(/(?:coconut|oat|soy|soya) cream/g,'plantcream')
    .replace(/(?:peanut|almond|cashew) butter/g,'plantspread')
    .replace(/(?:almond|coconut|oat|soy|soya) (?:yoghurt|yogurt)/g,'plantyoghurt')
    .replace(/(?:vegan|plant based|dairy free) (?:cheese|cheddar|mozzarella|parmesan|feta|cream|butter|mayo|mayonnaise|pesto|yoghurt|yogurt)/g,'plant substitute');

  function analyse(recipe){
    if(recipe&&typeof recipe==='object'&&analysisCache.has(recipe)) return analysisCache.get(recipe);
    const text=norm([
      recipe&&recipe.title,
      recipe&&recipe.subtitle,
      recipe&&recipe.category,
      ...(recipe&&recipe.tags||[]),
      ...(recipe&&recipe.ingredients||[]).map(x=>x[1])
    ].filter(Boolean).join(' '));
    const plantSafe=plantMilkSafeText(text);
    const proteinText=text
      .replace(/vegan (?:fish sauce|nduja|xo sauce)/g,'plant substitute')
      .replace(/(?:vegan|vegetarian|veggie|plant based|meat free|meatless) (?:chicken|beef|pork|lamb|turkey|duck|bacon|ham|sausage|sausages|meatball|meatballs|fish|tuna|salmon|prawn|prawns)/g,'plant substitute');
    const data={
      text,
      plantSafe,
      hasMeat:hasAny(proteinText,meatTerms),
      hasAnimalRennet:hasAny(text,['parmigiano reggiano']),
      hasFish:hasAny(proteinText,fishTerms)||hasAny(text,['worcester sauce','worcestershire sauce','anchovies']),
      hasAnimalDairy:/(^| )milk( |$)/.test(plantSafe),
      hasAnimal:hasAny(plantSafe,animalTerms),
      vegCount:vegTerms.reduce((n,x)=>n+(text.includes(x)?1:0),0)
    };
    if(recipe&&typeof recipe==='object') analysisCache.set(recipe,data);
    return data;
  }

  function dietAllows(recipe,diet){
    const a=analyse(recipe),e=recipe&&recipe.dietEvidence;
    const verified=Boolean(e&&e.status==='verified');
    const noMeatFish=!a.hasMeat&&!a.hasFish;
    const veganSafe=noMeatFish&&!a.hasAnimalDairy&&!a.hasAnimal&&!a.hasAnimalRennet;
    if(diet==='meat-or-fish'){
      if(verified&&(e.vegan||e.vegetarian)&&noMeatFish)return false;
      return a.hasMeat||a.hasFish;
    }
    if(diet==='vegetarian'){
      if(verified&&(e.vegan||e.vegetarian)&&noMeatFish&&!a.hasAnimalRennet)return true;
      return noMeatFish&&!a.hasAnimalRennet;
    }
    if(diet==='pescatarian'){
      if(verified&&(e.vegan||e.vegetarian)&&!a.hasMeat&&!a.hasAnimalRennet)return true;
      return !a.hasMeat&&!a.hasAnimalRennet;
    }
    if(diet==='vegan'){
      if(verified&&e.vegan===true&&veganSafe)return true;
      return veganSafe;
    }
    return true;
  }

  function allergenHits(recipe,selected){
    if(!(selected||[]).length) return [];
    const a=analyse(recipe);
    return allergens.filter(allergen=>{
      if(!selected.includes(allergen.id)) return false;
      const text=allergen.id==='milk'?a.plantSafe:a.text;
      return hasAny(text,allergen.terms);
    }).map(x=>x.id);
  }

  function allowed(recipe,profile){
    profile=profile||{};
    // An absence of guessed name matches is not verified allergen evidence.
    // Until each product/composite ingredient is reviewed, selected allergies
    // block recommendation rather than quietly supplying an unsafe fallback.
    const selected=profile.allergens||[];
    const verified=Boolean(recipe&&recipe.allergenEvidence&&recipe.allergenEvidence.status==='verified'
      &&Array.isArray(recipe.allergenEvidence.reviewedAllergens)
      &&selected.every(id=>recipe.allergenEvidence.reviewedAllergens.includes(id))
      &&Array.isArray(recipe.allergens));
    return dietAllows(recipe,profile.diet||'omnivore')
      &&(!selected.length||(verified&&!selected.some(id=>recipe.allergens.includes(id))
        &&allergenHits(recipe,selected).length===0));
  }

  function score(recipe,profile){
    profile=profile||{};
    const a=analyse(recipe);
    const selected=new Set(profile.goals||[]);
    let value=0;
    if(selected.has('balanced')) value+=Math.min(2.4,a.vegCount*0.35);
    if(selected.has('more-veg')) value+=Math.min(3,a.vegCount*0.55);
    if(selected.has('lighter')){
      value+=Math.min(2,a.vegCount*0.3);
      if(hasAny(a.text,['cream','soft cheese','sausage','halloumi'])) value-=0.9;
      if(hasAny(a.text,['salmon','chicken breast','chickpea','tofu','beans','lentil'])) value+=0.45;
    }
    if(selected.has('quick')){
      if(recipe.time&&recipe.time<=25) value+=1.4;
      else if(recipe.time&&recipe.time<=35) value+=0.55;
    }
    return value;
  }

  const lunchStyleIds=new Set(lunchStyles.map(x=>x.id));

  function lunchPreferences(profile){
    const raw=Array.isArray(profile&&profile.lunchStyles)
      ? profile.lunchStyles
      : [profile&&profile.lunchStyle||'any'];
    const clean=[...new Set(raw.filter(x=>lunchStyleIds.has(x)))];
    if(!clean.length||clean.includes('any')) return ['any'];
    return clean;
  }

  function lunchMatchesStyle(lunch,style){
    if(!style||style==='any') return true;
    if(style==='no-cook') return lunch.prepStyle==='no-cook';
    if(style==='light') return Boolean(lunch.light);
    if(style==='quick') return lunch.prepStyle==='no-cook'||lunch.prepStyle==='quick';
    if(['sandwich','wrap','soup','salad','pasta','rice','grain','potato','hot'].includes(style)) return lunch.lunchBucket===style;
    return false;
  }

  function lunchAllowed(lunch,profile,styleOverride){
    if(!allowed(lunch,profile)) return false;
    const styles=styleOverride?[styleOverride]:lunchPreferences(profile);
    return styles.includes('any')||styles.some(style=>lunchMatchesStyle(lunch,style));
  }

  function practicalLunchCandidate(lunch){
    if(!lunch)return false;
    if(lunch.practicalLunch)return true;
    const bucket=String(lunch.lunchBucket||''),prep=String(lunch.prepStyle||''),time=Number(lunch.time)||0;
    if(prep==='no-cook'&&time>0&&time<=15&&['sandwich','wrap','other'].includes(bucket))return true;
    return false;
  }

  function lunchScore(lunch,profile,styleOverride){
    const styles=styleOverride?[styleOverride]:lunchPreferences(profile);
    const any=styles.includes('any');
    let value=score({...lunch,time:lunch.time||15,tags:lunch.tags||[]},profile);
    if(any){
      const practicalBuckets=new Set(['sandwich','wrap','soup','pasta','rice','grain','other']);
      if(lunch.practicalLunch)value+=8;
      if(lunch.prepStyle==='no-cook')value+=4.5;
      else if(lunch.prepStyle==='quick')value+=2.5;
      if(Number(lunch.time||0)>0&&Number(lunch.time)<=15)value+=2;
      else if(Number(lunch.time||0)>30)value-=2.5;
      if(practicalBuckets.has(lunch.lunchBucket))value+=1.75;
      if(['hot','potato'].includes(lunch.lunchBucket)&&lunch.prepStyle!=='no-cook')value-=1;
    }else{
      if(lunch.practicalLunch)value+=4;
      for(const style of styles){
        if(!lunchMatchesStyle(lunch,style))continue;
        if(style==='no-cook')value+=3.5;
        else if(style==='light')value+=2;
        else if(style==='quick')value+=2.5;
        else value+=3;
      }
    }
    return value;
  }

  function labelsFor(recipe){
    const labels=[];
    if(recipe&&recipe.online){
      const explicit=norm([recipe.category,...(recipe.tags||[])].join(' '));
      if(explicit.includes('vegetarian')) labels.push('Vegetarian');
      else if(explicit.includes('vegan')) labels.push('Vegan');
    }else{
      if(dietAllows(recipe,'vegan')) labels.push('Vegan');
      else if(dietAllows(recipe,'vegetarian')) labels.push('Vegetarian');
      else if(dietAllows(recipe,'pescatarian')&&!dietAllows(recipe,'vegetarian')) labels.push('Pescatarian');
    }
    if(recipe&&recipe.time&&recipe.time<=25) labels.push('Quick');
    return labels.slice(0,2);
  }

  MW.food={patterns,goals,lunchStyles,allergens,analyse,dietAllows,allergenHits,allowed,score,lunchPreferences,lunchMatchesStyle,lunchAllowed,practicalLunchCandidate,lunchScore,labelsFor};
})();