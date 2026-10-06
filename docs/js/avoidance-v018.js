window.MW = window.MW || {};
(function(){
  const aliasGroups=[
    ['mushroom','mushrooms'],
    ['olive','olives'],
    ['tomato','tomatoes'],
    ['potato','potatoes'],
    ['pepper','peppers','bell pepper','bell peppers'],
    ['onion','onions'],
    ['red onion','red onions'],
    ['spring onion','spring onions','scallion','scallions'],
    ['courgette','courgettes','zucchini'],
    ['aubergine','aubergines','eggplant'],
    ['chickpea','chickpeas','garbanzo','garbanzo beans'],
    ['lentil','lentils'],
    ['red lentil','red lentils'],
    ['green lentil','green lentils'],
    ['bean','beans'],
    ['black bean','black beans'],
    ['butter bean','butter beans'],
    ['green bean','green beans'],
    ['prawn','prawns','shrimp'],
    ['salmon','salmon fillet','salmon fillets'],
    ['cod','cod fillet','cod fillets'],
    ['halloumi'],
    ['tofu'],
    ['coriander','cilantro'],
    ['sweetcorn','corn'],
    ['broccoli'],
    ['cauliflower'],
    ['spinach'],
    ['kale'],
    ['garlic'],
    ['ginger','fresh ginger']
  ];

  const normalise=x=>String(x||'')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9 ]/g,' ')
    .replace(/\s+/g,' ')
    .trim();

  function singular(text){
    const s=normalise(text);
    if(/tomatoes$/.test(s)) return s.replace(/tomatoes$/,'tomato');
    if(/potatoes$/.test(s)) return s.replace(/potatoes$/,'potato');
    if(/berries$/.test(s)) return s.replace(/berries$/,'berry');
    if(/ies$/.test(s)&&s.length>4) return s.slice(0,-3)+'y';
    if(/ses$/.test(s)&&s.length>4) return s.slice(0,-2);
    if(/s$/.test(s)&&!/(ss|us)$/.test(s)&&s.length>3) return s.slice(0,-1);
    return s;
  }

  const broadGroups=new Map([
    ['meat',['beef','steak','sirloin','rump steak','brisket','chicken','turkey','duck','venison','pork','bacon','ham','gammon','chorizo','pancetta','prosciutto','pepperoni','salami','nduja','lamb']],
    ['beef',['beef','beef mince','minced beef','ground beef','beef steak','rump steak','sirloin','brisket']],
    ['chicken',['chicken','chicken breast','chicken thigh','chicken mince','chicken fillet','chicken mini fillet']],
    ['pork',['pork','pork mince','minced pork','ground pork','bacon','ham','gammon','chorizo','pancetta','prosciutto','pepperoni','salami','nduja']],
    ['lamb',['lamb','lamb mince','lamb steak']],
    ['fish',['fish','fish fillet','salmon','tuna','cod','haddock','barramundi','basa','pangasius','hake','sea bream','sea bass','seabass','trout','pollock','pollack','tilapia','monkfish','swordfish','mackerel','sardine','anchovy','fish sauce','worcester sauce','worcestershire sauce']],
    ['shellfish',['prawn','shrimp','crab','lobster','crayfish','mussel','oyster','squid','octopus','scallop','clam']],
    ['crustaceans',['prawn','shrimp','crab','lobster','crayfish']],
    ['molluscs',['mussel','oyster','squid','octopus','scallop','clam']]
  ].map(([key,values])=>[key,values.map(normalise)]));

  const aliasMap=new Map();
  aliasGroups.forEach(group=>{
    const canonical=singular(group[0]);
    group.forEach(x=>{
      aliasMap.set(normalise(x),canonical);
      aliasMap.set(singular(x),canonical);
    });
  });

  function levenshtein(a,b){
    a=String(a);b=String(b);
    const prev=Array.from({length:b.length+1},(_,i)=>i);
    for(let i=1;i<=a.length;i++){
      let diagonal=prev[0];
      prev[0]=i;
      for(let j=1;j<=b.length;j++){
        const old=prev[j];
        prev[j]=Math.min(
          prev[j]+1,
          prev[j-1]+1,
          diagonal+(a[i-1]===b[j-1]?0:1)
        );
        diagonal=old;
      }
    }
    return prev[b.length];
  }

  let cachedVocabulary=null;
  function vocabulary(){
    if(cachedVocabulary) return cachedVocabulary;
    const set=new Set();
    const all=[...(MW.RECIPES||[]),...(MW.LUNCHES||[])];
    all.forEach(r=>(r.ingredients||[]).forEach(row=>{
      const name=normalise(Array.isArray(row)?row[1]:row&&row.name);
      if(!name) return;
      set.add(name);
      set.add(singular(name));
      name.split(/\s+(?:and|with)\s+/).forEach(part=>{if(part) set.add(singular(part));});
    }));
    aliasGroups.forEach(group=>group.forEach(x=>set.add(singular(x))));
    cachedVocabulary=[...set].filter(Boolean);
    return cachedVocabulary;
  }

  function maxDistance(text){
    const n=normalise(text).replace(/ /g,'').length;
    if(n<=3) return 0;
    if(n<=8) return 1;
    return 2;
  }

  function resolveOne(raw){
    const input=normalise(raw);
    if(!input) return null;
    const broad=singular(input);
    if(broadGroups.has(broad)) return {raw:String(raw).trim(),canonical:broad,matched:true,corrected:input!==broad,method:'category'};
    const direct=aliasMap.get(input)||aliasMap.get(broad);
    if(direct) return {raw:String(raw).trim(),canonical:direct,matched:true,corrected:normalise(raw)!==direct,method:'alias'};

    const target=broad;
    const words=vocabulary();
    if(words.includes(target)) return {raw:String(raw).trim(),canonical:target,matched:true,corrected:input!==target,method:'exact'};

    const limit=maxDistance(target);
    if(!limit) return {raw:String(raw).trim(),canonical:target,matched:false,corrected:false,method:'unresolved'};

    let best=null,bestDist=Infinity;
    for(const candidate of words){
      if(Math.abs(candidate.length-target.length)>limit) continue;
      const d=levenshtein(target,candidate);
      if(d<bestDist){best=candidate;bestDist=d;}
    }
    if(best&&bestDist<=limit){
      const canonical=aliasMap.get(best)||singular(best);
      return {raw:String(raw).trim(),canonical,matched:true,corrected:true,method:'fuzzy',distance:bestDist};
    }
    return {raw:String(raw).trim(),canonical:target,matched:false,corrected:false,method:'unresolved'};
  }

  function parse(text){
    const rawItems=String(text||'').split(/[,;\n]+/).map(x=>x.trim()).filter(Boolean);
    const results=rawItems.map(resolveOne).filter(Boolean);
    const canonical=[...new Set(results.map(x=>x.canonical).filter(Boolean))];
    return {
      input:String(text||''),
      items:results,
      canonical,
      corrected:results.filter(x=>x.corrected),
      unresolved:results.filter(x=>!x.matched)
    };
  }

  function termMatches(text,term){
    const hay=' '+normalise(text)+' ';
    const needle=singular(term);
    if(!needle) return false;
    const exact=' '+needle+' ';
    if(hay.includes(exact)) return true;
    const words=normalise(text).split(' ').map(singular);
    return words.includes(needle);
  }

  const recipeSearchCache=new WeakMap();
  const resolvedTermsCache=new Map();
  function recipeContains(recipe,terms){
    if(!recipe||!Array.isArray(terms)||!terms.length)return false;
    const ingredientNames=(recipe.ingredients||[]).map(x=>Array.isArray(x)?x[1]:x&&x.name).filter(Boolean);
    const signature=JSON.stringify([recipe.title,recipe.subtitle,ingredientNames]);
    let prepared=recipeSearchCache.get(recipe);
    if(!prepared||prepared.signature!==signature){
      const text=[recipe.title,recipe.subtitle,...ingredientNames].filter(Boolean).join(' ');
      const normal=normalise(text),ingredients=new Set();
      ingredientNames.forEach(name=>{const n=singular(name);ingredients.add(n);const alias=aliasMap.get(normalise(name))||aliasMap.get(n);if(alias)ingredients.add(alias);});
      prepared={signature,hay:' '+normal+' ',words:new Set(normal.split(' ').map(singular)),ingredients};recipeSearchCache.set(recipe,prepared);
    }
    const key=JSON.stringify(terms);let canonical=resolvedTermsCache.get(key);
    if(!canonical){canonical=terms.map(term=>{const resolved=resolveOne(term);return resolved&&resolved.canonical||singular(term);}).filter(Boolean);resolvedTermsCache.set(key,canonical);}
    return canonical.some(term=>{
      const group=broadGroups.get(term);
      const candidates=group&&group.length?group:[term];
      return candidates.some(candidate=>{
        const singularCandidate=singular(candidate);
        return prepared.hay.includes(' '+candidate+' ')
          ||prepared.hay.includes(' '+singularCandidate+' ')
          ||prepared.words.has(candidate)
          ||prepared.words.has(singularCandidate)
          ||prepared.ingredients.has(candidate)
          ||prepared.ingredients.has(singularCandidate);
      });
    });
  }

  function display(text){
    const parsed=parse(text);
    return parsed.items.map(x=>x.matched?(x.corrected?x.raw+' → '+x.canonical:x.canonical):x.raw);
  }

  MW.avoidance={normalise,singular,resolveOne,parse,recipeContains,display};
})();