window.MW=window.MW||{};
(function(){
  'use strict';
  const normaliseCache=new Map();
  function normalise(value){const raw=String(value||'');if(normaliseCache.has(raw))return normaliseCache.get(raw);const result=raw.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();if(normaliseCache.size<100000)normaliseCache.set(raw,result);return result;}
  const ignored=new Set(['the','and','with','for','style','mixed','large','small','medium','fresh','baby','grated','diced','chopped','sliced','extra','lean','british','mature','hard','italian','ready','prepared','cooking','skinless','finely','hot']);
  const generic=new Set(['sauce','paste','mix','seasoning','bread']);
  const safeGeneric=new Set(['oil','water','cheese','stock']);
  const rootGeneric=new Set([...generic,...safeGeneric]);
  const pluralMap=new Map(Object.entries({rotis:'roti',leaves:'leaf',potatoes:'potato',tomatoes:'tomato',peas:'pea',beans:'bean',lentils:'lentil',peanuts:'peanut',breadcrumbs:'breadcrumb',olives:'olive',cloves:'clove',breasts:'breast',thighs:'thigh',portions:'portion',strips:'strip',samosas:'samosa',baguettes:'baguette',cubes:'cube',pods:'pod',herbs:'herb',sausages:'sausage',greens:'green'}));
  function singular(word){if(pluralMap.has(word))return pluralMap.get(word);if(/(?:ss|us|is|ous)$/.test(word))return word;if(word.length>4&&/ies$/.test(word))return word.slice(0,-3)+'y';if(word.length>4&&/sses$/.test(word))return word.slice(0,-2);if(word.length>3&&/s$/.test(word))return word.slice(0,-1);return word;}
  const tokenCache=new Map();
  function tokens(value){const key=normalise(value);if(tokenCache.has(key))return tokenCache.get(key);const result=key.split(' ').map(singular).filter(x=>x.length>=3&&!ignored.has(x));if(tokenCache.size<100000)tokenCache.set(key,result);return result;}
  function wordSet(value){return new Set(tokens(value));}
  function openEndedAmount(value){return /^(?:to taste|as needed|as required|as much as needed|a pinch|pinch|a drizzle|drizzle|a splash|splash)$/i.test(String(value||'').trim());}
  function matchText(value){return normalise(value).split(' ').map(singular).join(' ');}
  function headTokens(value){return tokens(String(value||'').split(/\bfor\b/i)[0]);}
  function isQualified(value){return /\bfor\b/i.test(String(value||''));}
  const quantityCue=/use (?:the )?quantit(?:y|ies) listed in the ingredient(?:s)?|use (?:the )?quantit(?:y|ies) listed|as listed in the ingredient(?:s)?/;
  function qualifiedTargetContext(recipe,target,clause){
    const t=matchText(clause);
    if(/breadcrumb/.test(target))return /\b(?:breadcrumb|coat|coating)\b/.test(t)&&/\b(?:combine|mix|season|dip|coat)\b/.test(t);
    if(/meatball/.test(target))return /\b(?:breadcrumb|mince)\b/.test(t)&&/\b(?:combine|mix|roll)\b/.test(t);
    if(/tofu/.test(target))return /\btofu\b/.test(t)&&/\b(?:flour|coat|coating|sprinkle|toss)\b/.test(t);
    if(/onion/.test(target))return /\bonion\b/.test(t)&&/\b(?:caramelis|golden|soften|fry|cook)\w*\b/.test(t);
    if(/pickl/.test(target))return /\b(?:pickle|pickling|vinegar|cucumber|shallot|radish)\w*\b/.test(t);
    if(/dressing/.test(target))return /\b(?:dressing|salad|vinegar|lemon|lime|mustard)\b/.test(t);
    if(/salsa/.test(target))return /\b(?:salsa|tomato|lime|coriander|onion)\b/.test(t);
    if(/relish/.test(target))return /\b(?:relish|parsley|mustard|vinegar|garlic)\b/.test(t);
    if(/rice/.test(target))return /\brice\b/.test(t);
    if(/couscous/.test(target))return /\bcouscous\b/.test(t);
    if(/bulgur/.test(target))return /\bbulgur\b/.test(t);
    if(/gravy/.test(target))return /\b(?:gravy|roux|guinness)\b/.test(t);
    if(/curry/.test(target))return /\b(?:curry|tikka|masala|korma|coconut|curry paste)\b/.test(t);
    if(/soup/.test(target))return /\b(?:soup|minestrone|laksa|chowder|broth|passata|stock)\b/.test(t)&&/\b(?:simmer|boil|add|stir|pour)\b/.test(t);
    if(/chowder/.test(target))return /\bchowder\b/.test(t);
    if(/marinade/.test(target))return /\b(?:marinade|marinat|coat)\w*\b/.test(t);
    if(/greens?/.test(target))return /\b(?:greens?|spring green)\b/.test(t);
    if(/sauce/.test(target))return /\b(?:sauce|passata|puree|stock|paste|curry|chowder|simmer|thicken)\w*\b/.test(t);
    return tokens(target).some(word=>new RegExp('\\b'+word+'\\b').test(t));
  }
  function qualifiedReference(recipe,name,step){
    if(!isQualified(name))return false;
    const parts=String(name||'').split(/\bfor\b/i),head=normalise(parts.shift()),target=normalise(parts.join(' for '));
    if(!head||!target)return false;
    const full=normalise(name),headWords=tokens(head),clauses=stepClauses(step);
    if(clauses.some(clause=>{
      const headMatch=headWords.some(word=>new RegExp('\\b'+word+'\\b').test(clause));
      if(!headMatch)return false;
      if(hasPhrase(clause,full)&&activePhrase(clause,full))return true;
      return quantityCue.test(clause)&&qualifiedTargetContext(recipe,target,clause);
    }))return true;
    const whole=matchText(step),headMatch=headWords.some(word=>new RegExp('\\b'+word+'\\b').test(whole));
    if(!headMatch||!quantityCue.test(whole))return false;
    if(qualifiedTargetContext(recipe,target,whole))return true;
    const sameHead=(recipe&&recipe.ingredients||[]).filter(row=>isQualified(row[1])&&normalise(String(row[1]).split(/\bfor\b/i)[0])===head).length;
    return sameHead===1;
  }
  function sourceMapped(recipe,stepIndex){const ids=recipe&&Array.isArray(recipe.sourceStepIngredientIds)&&Number.isInteger(stepIndex)?recipe.sourceStepIngredientIds[stepIndex]:null;if(!Array.isArray(ids)||!ids.length||!Array.isArray(recipe.ingredientMeta))return null;return new Set(recipe.ingredientMeta.filter(x=>ids.includes(x.id)).map(x=>normalise(x.name)));}
  const tokenCountCache=new WeakMap();
  function tokenCounts(recipe){if(recipe&&typeof recipe==='object'&&tokenCountCache.has(recipe))return tokenCountCache.get(recipe);const counts=new Map();for(const row of recipe.ingredients||[]){const list=isQualified(row[1])?headTokens(row[1]):tokens(row[1]);for(const t of new Set(list))counts.set(t,(counts.get(t)||0)+1);}if(recipe&&typeof recipe==='object')tokenCountCache.set(recipe,counts);return counts;}
  function countMatchingIngredients(recipe,predicate){return (recipe.ingredients||[]).reduce((n,row)=>n+(predicate(normalise(row[1]))?1:0),0);}
  const phraseRegexCache=new Map(),aliasCache=new Map();
  function hasPhrase(text,phrase){const p=normalise(phrase);if(!p)return false;let re=phraseRegexCache.get(p);if(!re){const escaped=p.replace(/[.*+?^()[\]{}|\\]/g,'\\$&').replace(/\$/g,'\\$&').replace(/\s+/g,'\\s+');re=new RegExp('(?:^|\\b)'+escaped+'(?:\\b|$)');phraseRegexCache.set(p,re);}return re.test(normalise(text));}
  function aliasPhrases(name){
    const n=normalise(name);if(aliasCache.has(n))return aliasCache.get(n);const a=new Set([n]);
    if(isQualified(name)){const head=normalise(String(name||'').split(/\bfor\b/i)[0]);if(head)a.add(head);}
    if(/\bmayonnaise\b/.test(n)){a.add('mayo');a.add('mayonnaise');}
    if(/\bbaby leaf (?:mix|salad)\b/.test(n)||n==='seasonal salad'){a.add('baby leaves');a.add('salad leaves');}
    if(/\b(?:wild )?rocket\b/.test(n))a.add('rocket');
    if(/\b(?:basmati|jasmine|sushi|steamed basmati) rice\b/.test(n))a.add('rice');
    if(/\bwhite potato\b/.test(n)||/\bsweet potato\b/.test(n))a.add(n.includes('sweet')?'sweet potato':'potato');
    if(/\b(?:mature )?cheddar cheese\b/.test(n)){a.add('cheddar');a.add('cheddar cheese');}
    if(/\bred leicester\b/.test(n))a.add('red leicester');
    if(/\b(?:grated )?(?:hard italian|italian hard|italian style) (?:style )?cheese\b/.test(n)){a.add('parmesan');a.add('italian cheese');a.add('hard cheese');a.add('hard italian style cheese');a.add('italian hard cheese');}
    if(/\bgreek (?:style )?salad cheese\b/.test(n)){a.add('feta');a.add('salad cheese');a.add('greek cheese');}
    if(n==='cashew nuts'){a.add('cashew');a.add('cashews');}
    if(/^finely chopped tomatoes(?: with basil)?$/.test(n))a.add('chopped tomatoes');
    if(/\b(?:greek (?:style )?(?:natural )?|low fat natural |natural )?yoghurt\b/.test(n))a.add('yoghurt');
    if(/\bbulgur wheat\b/.test(n))a.add('bulgur');
    if(/\btortilla wrap\b/.test(n)){a.add('tortilla');a.add('wrap');}
    if(/\btomato ketchup\b/.test(n))a.add('ketchup');
    if(/\bvegetable stock cubes?\b/.test(n)){a.add('stock');a.add('vegetable stock');}
    if(/\bvegetable stock paste\b/.test(n)){a.add('veg stock paste');a.add('vegetable stock paste');a.add('veg stock');}
    if(/\bsoffritto mix\b/.test(n)){a.add('soffritto');a.add('soffrito');}
    if(/\b(?:red split )?lentils?\b/.test(n))a.add('lentils');
    if(/\bwholegrain mustard\b/.test(n))a.add('mustard');
    if(/\b(?:plain )?flour\b/.test(n))a.add('flour');
    if(/\bvegan xo sauce\b/.test(n))a.add('xo sauce');
    if(/\bthai style spice mix\b/.test(n))a.add('spice mix');
    if(/\bsliced carrot and cabbage mix\b/.test(n)){a.add('carrot and cabbage');a.add('slaw');a.add('coleslaw');}
    if(/\byoung pea pods\b/.test(n)){a.add('pea pods');a.add('peas');}
    if(/\bvegetable samosa\b/.test(n))a.add('samosa');
    if(/\bgarlic and herb dip\b/.test(n))a.add('dip');
    if(/\bcheese garlic and basil baguette\b/.test(n)){a.add('baguette');a.add('garlic bread');}
    if(/\bjolly hog pork sausagemeat\b/.test(n)){a.add('sausagemeat');a.add('sausage meat');}
    if(/\bcheese and jalapeno hot link sausage\b/.test(n))a.add('sausage');
    if(/\bcured ham tortelloni\b/.test(n)){a.add('tortelloni');a.add('pasta');}
    if(/\bpremium tomato mix\b/.test(n)){a.add('tomatoes');a.add('tomato mix');}
    if(/\b(?:wholewheat |wholemeal |fresh )?(?:macaroni|spaghetti|tortiglioni|farfalle|orzo|linguine|tagliatelle|penne|tortelloni)\b/.test(n))a.add('pasta');
    const result=[...a];aliasCache.set(n,result);return result;
  }
  function specialEvidence(recipe,name,stepText){
    const n=normalise(name),t=normalise(stepText);
    if(/\bgarlic clove\b/.test(n)){const clean=t.replace(/\bgarlic\s+(?:bread|baguette|butter|oil|sauce|paste|mayo(?:nnaise)?)\b/g,' ');if(!/\bgarlic\b/.test(clean))return false;return /(?:peel|grate|crush|chop|mince|press|add|stir|mix|fry|cook|roast|pop|squeeze|mash|spread|half|remaining|rest of|reserve)[a-z ]{0,45}\bgarlic\b/.test(clean)||/\bgarlic\b[a-z ]{0,30}(?:press|clove|roast|squeeze|mash|half|remaining|rest)/.test(clean);}
    if(n==='black pepper')return /\bblack pepper\b/.test(t)||/\bsalt and pepper\b/.test(t)||/\bseason(?:ing|ed)?\b/.test(t);
    if(n==='salt')return /\bsalt\b/.test(t)||/\bseason(?:ing|ed)?\b/.test(t);
    if(/\b(?:cooking oil|oil for cooking)\b/.test(n))return /\boil\b/.test(t)&&!/\bolive oil\b/.test(t);
    if(/\bolive oil\b/.test(n)){if(isQualified(name))return qualifiedReference(recipe,name,stepText);return /\bolive oil\b/.test(t)||(countMatchingIngredients(recipe,x=>/\boil\b/.test(x))===1&&/\boil\b/.test(t));}
    if(n==='pepper')return /\bpepper\b/.test(t);
    if(/\b(?:red|yellow|green|bell) pepper\b/.test(n)){const colour=(n.match(/\b(red|yellow|green)\b/)||[])[1];if(colour)return new RegExp('\\b'+colour+'\\s+pepper\\b').test(t)||(/\bpepper\b/.test(t)&&!(/\bsalt and pepper\b|\bseason(?:ing|ed)?\b/.test(t)));return /\bpepper\b/.test(t)&&!(/\bsalt and pepper\b|\bblack pepper\b|\bseason(?:ing|ed)?\b/.test(t));}
    if(/\b(?:diced )?(?:british )?chicken (?:breast|breasts|thigh|thighs|breast portions|breast strips)\b/.test(n)||/\bskinless chicken thighs\b/.test(n))return /\bchicken\b/.test(t)&&!/\bchicken stock\b/.test(t);
    if(/\b(?:diced )?pollock\b/.test(n))return /\bpollock\b|\bfish\b/.test(t);
    if(/\b(?:basa|cod) fillets?\b/.test(n))return /\b(?:basa|cod|fish) fillets?\b|\b(?:basa|cod|fish)\b/.test(t);
    if(/\bfirm tofu\b/.test(n))return /\btofu\b/.test(t);
    if(/\b(?:vegetable|chicken|beef) stock (?:paste|mix|cubes?)\b/.test(n)||/\bintense (?:vegetable|chicken|beef) stock mix\b/.test(n)){const type=(n.match(/\b(vegetable|chicken|beef)\b/)||[])[1];const stocks=countMatchingIngredients(recipe,x=>/\bstock\b/.test(x));return new RegExp('\\b'+type+'\\s+stock\\b').test(t)||(stocks===1&&/\bstock\b/.test(t));}
    if(/\bintense tomato\b/.test(n)){const fresh=countMatchingIngredients(recipe,x=>/\b(?:intense tomato|plum tomatoes?|medium tomato|premium tomato mix|chopped tomatoes?)\b/.test(x));return /\btomatoes?\b/.test(t)&&!/\btomato (?:paste|puree|concentrate)\b/.test(t)&&(fresh===1||/\bintense tomato\b/.test(t));}
    if(n==='butter')return /\bbutter\b/.test(t)&&!/\bbutter beans?\b/.test(t);
    if(/\bsalted peanuts?\b/.test(n))return /\bpeanuts?\b/.test(t)&&!/\bpeanut butter\b/.test(t);
    if(/\b(?:baby plum tomatoes?|medium tomato|finely chopped tomatoes?|premium tomato mix)\b/.test(n)){const fresh=countMatchingIngredients(recipe,x=>/\b(?:plum tomatoes?|medium tomato|chopped tomatoes?|premium tomato mix|tomato)$/.test(x));return /\btomatoes?\b/.test(t)&&!/\btomato (?:paste|puree|concentrate)\b/.test(t)&&(fresh===1||hasPhrase(t,n));}
    if(n==='lemon')return /\blemon\b/.test(t);
    if(n==='onion')return /\bonion\b/.test(t)&&!/\b(?:spring|red) onion\b/.test(t);
    if(n==='peas')return /\bpeas\b/.test(t)&&!/\bpea pods?\b/.test(t);
    if(n==='apple')return /\bapple\b/.test(t)&&!/\bapple cider\b/.test(t);
    if(n==='mixed herbs')return /\bherbs?\b/.test(t);
    if(n==='black olives')return /\bolives?\b/.test(t);
    if(n==='potatoes')return /\bpotatoes?\b/.test(t)&&!/\bsweet potatoes?\b/.test(t);
    if(n==='courgette')return /\bcourgette\b/.test(t);
    if(n==='sage')return /\bsage\b/.test(t);
    if(n==='smoked paprika')return /\bsmoked paprika\b|\bpaprika\b/.test(t);
    if(n==='pine nuts')return /\bpine nuts?\b/.test(t);
    if(/\bgreek style natural yoghurt\b/.test(n))return /\byoghurt\b/.test(t);
    if(n==='hot sauce')return /\bhot sauce\b/.test(t);
    if(n==='ranch dressing')return /\branch(?: dressing)?\b/.test(t);
    if(/\bdiced butternut squash\b/.test(n))return /\bbutternut(?: squash)?\b|\bsquash\b/.test(t);
    if(/\b(?:basmati|jasmine|sushi|steamed basmati) rice\b/.test(n)){const c=countMatchingIngredients(recipe,x=>!/^water for\b/.test(x)&&(/(?:^| )rice$/.test(x)||/\b(?:basmati|jasmine|sushi|steamed basmati) rice\b/.test(x)));return /\brice\b/.test(t)&&c===1;}
    if(/\b(?:macaroni|spaghetti|tortiglioni|farfalle|orzo|linguine|tagliatelle|penne|tortelloni)\b/.test(n)){const c=countMatchingIngredients(recipe,x=>/\b(?:macaroni|spaghetti|tortiglioni|farfalle|orzo|linguine|tagliatelle|penne|tortelloni|pasta)\b/.test(x));return tokens(n).some(x=>new RegExp('\\b'+x+'\\b').test(t))||(c===1&&/\bpasta\b/.test(t));}
    if(/\b(?:mature cheddar cheese|cheddar cheese|red leicester|hard italian|italian hard|greek style salad cheese)\b/.test(n)){if(aliasPhrases(n).some(a=>hasPhrase(t,a)))return true;const c=countMatchingIngredients(recipe,x=>/\bcheese\b|\bred leicester\b/.test(x));return c===1&&/\b(?:remaining )?cheese\b/.test(t);}
    if(/\b(?:rocket|wild rocket)\b/.test(n))return /\brocket\b/.test(t);
    if(/\bfinely chopped tomatoes?\b/.test(n)){const fresh=countMatchingIngredients(recipe,x=>/\b(?:intense tomato|plum tomatoes?|medium tomato|premium tomato mix|chopped tomatoes?)\b/.test(x));return /\b(?:chopped )?tomatoes?\b/.test(t)&&!/\btomato (?:paste|puree|concentrate)\b/.test(t)&&(fresh===1||hasPhrase(t,n));}
    if(/^sugar(?:\b| for)/.test(n)){const c=countMatchingIngredients(recipe,x=>/^sugar(?:\b| for)/.test(x));if(isQualified(name))return qualifiedReference(recipe,name,stepText);if(n==='sugar'&&/\bsugar\b/.test(t)&&!/\bsugar for (?:the )?(?:pickle|pickling|salsa|sauce|dressing)\b/.test(t))return true;return c===1&&/\bsugar\b/.test(t);}
    if(/^salt for\b/.test(n))return qualifiedReference(recipe,name,stepText);
    if(/^(?:boiled )?water(?:\b| for)/.test(n)){const c=countMatchingIngredients(recipe,x=>/^(?:boiled )?water\b/.test(x));if(isQualified(name))return qualifiedReference(recipe,name,stepText);if(n==='water'&&/\bwater\b/.test(t)&&!/\bwater for (?:the )?(?:rice|sauce|couscous|bulgur|spring greens)\b/.test(t))return true;return c===1&&/\bwater\b/.test(t);}
    return aliasPhrases(n).some(a=>hasPhrase(t,a));
  }
  function lexicalEvidence(recipe,step,ingredientIndex){
    const row=(recipe.ingredients||[])[ingredientIndex];if(!row)return {matched:false,reason:'missing-row'};
    const name=row[1],stepNorm=normalise(step),stepWords=wordSet(step),nameNorm=normalise(name);
    if(/^(?:salt|black pepper)$/.test(nameNorm)&&!openEndedAmount(row[0])){const quantityCue=/use (?:the )?quantit(?:y|ies) listed in the ingredients|use the quantities listed|as listed in the ingredients/.test(stepNorm),named=nameNorm==='salt'?/\bsalt\b/.test(stepNorm):/\bblack pepper\b/.test(stepNorm);return {matched:Boolean(quantityCue&&named),reason:quantityCue&&named?'measured-seasoning-cue':'measured-seasoning-context'};}
    if(specialEvidence(recipe,name,stepNorm))return {matched:true,reason:'semantic-reference'};
    const list=tokens(name),head=headTokens(name),counts=tokenCounts(recipe),unique=list.filter(t=>(counts.get(t)||0)===1),uniqueHead=head.filter(t=>(counts.get(t)||0)===1);
    if(isQualified(name)){if(qualifiedReference(recipe,name,step))return {matched:true,reason:'qualified-ingredient-cue'};return {matched:false,reason:'qualified-context-only'};}
    const allPhrase=list.length>1&&list.every(t=>stepWords.has(t));if(allPhrase)return {matched:true,reason:'full-ingredient-words'};
    if(unique.some(t=>stepWords.has(t)&&(!generic.has(t)||safeGeneric.has(t))))return {matched:true,reason:'unique-ingredient-word'};
    if(list.length===1&&(counts.get(list[0])||0)===1&&stepWords.has(list[0]))return {matched:true,reason:'single-ingredient-word'};
    return {matched:false,reason:'no-high-confidence-reference'};
  }
  function evidence(recipe,step,ingredientIndex,stepIndex){const row=(recipe.ingredients||[])[ingredientIndex];if(!row)return {matched:false,reason:'missing-row',lexical:false};const n=normalise(row[1]),mapped=sourceMapped(recipe,stepIndex),lex=lexicalEvidence(recipe,step,ingredientIndex);if(mapped&&mapped.has(n))return {matched:true,reason:'source-step-id',lexical:lex.matched,lexicalReason:lex.reason};return {...lex,lexical:lex.matched,lexicalReason:lex.reason};}
  function rootToken(recipe,index,step){
    const row=(recipe.ingredients||[])[index];if(!row)return '';
    const list=tokens(row[1]),head=headTokens(row[1]),counts=tokenCounts(recipe),base=isQualified(row[1])&&head.length?head:list;
    if(/garlic clove/i.test(row[1]))return 'garlic';
    const text=step==null?'':matchText(step),present=t=>new RegExp('\\b'+t+'\\b').test(text);
    const unique=base.filter(t=>(counts.get(t)||0)===1&&!rootGeneric.has(t));
    if(text){
      const presentUnique=unique.filter(present);if(presentUnique.length)return presentUnique[presentUnique.length-1];
      if(unique.length)return unique[0];
      const presentMeaningful=base.filter(t=>!rootGeneric.has(t)&&present(t));if(presentMeaningful.length)return presentMeaningful[presentMeaningful.length-1];
      const presentAny=base.filter(present);if(presentAny.length)return presentAny[presentAny.length-1];
    }
    return unique[0]||base.find(t=>!rootGeneric.has(t))||base[0]||'';
  }
  const interactionAction='(?:mash|add|stir(?: in| through)?|mix(?: in| through)?|combine|fold|toss|stir fry|fry|cook|roast|bake|simmer|boil|pour|scatter|spread|drizzl(?:e|ing|ed)|coat|dip|top|season|melt|whisk|sprinkl(?:e|ing|ed)|crumbl(?:e|ing|ed)|squeeze|dissolve|put|pop|place|lay|transfer|arrange|return|tip|heat|warm|brush|rub|marinate|peel|deseed|chop|dice|slice|cut|halve|quarter|grate|crush|mince|trim|drain|rinse|zest|juice|shred|tear|pick|pat dry|pat|wash|soak|toast|reserve|set aside|spoon|dollop|smear|swirl|dress|garnish|pack|fill|stuff|wrap|roll|shape|press|glaze|dust|remove|bring|pile|break(?: up)?|divide|butter|crack)';
  const clauseCache=new Map(),activeRegexCache=new Map(),purposeRegexCache=new Map(),rootRegexCache=new Map();
  function stepClauses(step){const raw=String(step||'');if(clauseCache.has(raw))return clauseCache.get(raw);const interactionText=raw.replace(/\([^)]*[?!][^)]*\)/g,' ');const result=interactionText.split(/[!?;]+|\.(?!\d)/).map(matchText).filter(Boolean);if(clauseCache.size<50000)clauseCache.set(raw,result);return result;}
  function activePhrase(step,phrase){
    const words=tokens(phrase);if(!words.length)return false;
    // Keep the identity of compound ingredients, rather than matching their shared food root.
    const target=words.join('\\b[a-z0-9 ]{0,24}\\b'),key=words.join(' ');
    let before=activeRegexCache.get(key);if(!before){before=new RegExp(interactionAction+'[a-z0-9 ]{0,240}\\b'+target+'\\b');activeRegexCache.set(key,before);}
    let phraseRe=rootRegexCache.get(key);if(!phraseRe){phraseRe=new RegExp('\\b'+target+'\\b');rootRegexCache.set(key,phraseRe);}
    let purpose=purposeRegexCache.get(key);if(!purpose){purpose=new RegExp('\\bfor (?:the )?'+target+'\\b','g');purposeRegexCache.set(key,purpose);}
    return stepClauses(step).some(part=>{if(!phraseRe.test(part))return false;purpose.lastIndex=0;const direct=part.replace(purpose,' ');return phraseRe.test(direct)&&before.test(direct);});
  }
  const splitDescriptors=new Set(['of','the','your','our','remaining','rest','prepared','cooked','drained','chopped','diced','sliced','grated','crushed','minced','roasted','toasted','mixed','reserved']);
  const splitDerivatives=new Set(['zest','juice','wedge']);
  function splitBridgeAllowed(value){return String(value||'').trim().split(/\s+/).filter(Boolean).every(word=>splitDescriptors.has(word));}
  function halfTargetsRoot(step,root){
    const text=matchText(String(step||'').replace(/½/g,' half ')),re=new RegExp('\\bhalf\\b([a-z ]{0,48}?)\\b'+root+'\\b(?:\\s+([a-z]+))?','g');
    for(const match of text.matchAll(re)){
      if(splitBridgeAllowed(match[1])&&!splitDerivatives.has(String(match[2]||'')))return true;
    }
    return false;
  }
  function remainingTargetsRoot(step,root){
    const text=matchText(step),re=new RegExp('\\b(?:remaining|rest of(?: the)?)\\b([a-z ]{0,48}?)\\b'+root+'\\b(?:\\s+([a-z]+))?','g');
    for(const match of text.matchAll(re)){
      if(splitBridgeAllowed(match[1])&&!splitDerivatives.has(String(match[2]||'')))return true;
    }
    return false;
  }
  const preparedComponents=new Set(['wedge','zest','juice','slice','piece','leaf']);
  function remainingPreparedComponent(step,root){
    const text=matchText(step),re=new RegExp('\\b(?:remaining|rest of(?: the)?)\\b([a-z ]{0,48}?)\\b'+root+'\\b(?:\\s+([a-z]+))?','g');
    for(const match of text.matchAll(re)){
      const component=String(match[2]||'');
      if(splitBridgeAllowed(match[1])&&(!component||preparedComponents.has(component)))return true;
    }
    return false;
  }
  function splitMultiplier(recipe,ingredientIndex,step,stepIndex){
    const row=(recipe.ingredients||[])[ingredientIndex];if(!row||openEndedAmount(row[0]))return 1;
    const root=rootToken(recipe,ingredientIndex,step);if(!root)return 1;
    if(halfTargetsRoot(step,root))return 0.5;
    if(!remainingTargetsRoot(step,root))return 1;
    for(let i=0;i<(recipe.steps||[]).length;i++){if(i!==stepIndex&&halfTargetsRoot(recipe.steps[i],root))return 0.5;}
    return 1;
  }
  function finalAssemblyEvidence(recipe,ingredientIndex,step){
    const row=(recipe.ingredients||[])[ingredientIndex];if(!row)return false;
    const n=normalise(row[1]),t=normalise(step),root=rootToken(recipe,ingredientIndex,step);
    if(root&&/(?:\bserve\b|\bgarnish\b|\bsprinkl(?:e|ing|ed)\b|\btop\b|\bfinish\b|\balongside\b|\bsqueez(?:e|ing)\b)/.test(t)&&remainingPreparedComponent(step,root))return true;
    const ready=/^(?:mayonnaise|aioli|soured cream|balsamic glaze|tortilla chips|wild rocket|rocket|baby leaf mix|baby leaf salad|natural yoghurt|greek yoghurt|harissa paste|sriracha sauce|sweet chilli sauce|tomato ketchup|redcurrant jelly|garlic and herb dip|burger sauce|mango chutney|traditional italian pesto)$/;
    if(!ready.test(n))return false;
    if(!/(?:\bserve\b|\bshare\b|\balongside\b|\bdipping\b|\bdollop(?:ed)?\b|\bdrizzl(?:e|ing|ed)\b|\btop\b|\bsprinkl(?:e|ing|ed)\b|\bbuild your own\b|\bbring everything\b)/.test(t))return false;
    if(aliasPhrases(row[1]).some(a=>hasPhrase(t,a)))return true;
    if(/^(?:wild rocket|rocket|baby leaf mix|baby leaf salad)$/.test(n)){
      const leafy=countMatchingIngredients(recipe,x=>/\b(?:rocket|baby leaf|salad leaves|seasonal salad)\b/.test(x));
      return leafy===1&&/\b(?:salad|salad leaves|baby leaves|leaves)\b/.test(t);
    }
    return false;
  }
  function compoundIngredientName(n){return /\b(?:sauce|paste|dressing|stock|mix)\b/.test(n);}
  function usageEvidence(recipe,ingredientIndex,step){
    const row=(recipe.ingredients||[])[ingredientIndex];if(!row)return false;
    const n=normalise(row[1]);
    const measuredSeasoning=/^(?:salt|black pepper)$/.test(n)&&!openEndedAmount(row[0]);
    if(measuredSeasoning){const t=normalise(step),quantityCue=/use (?:the )?quantit(?:y|ies) listed in the ingredients|use the quantities listed|as listed in the ingredients/.test(t),named=n==='salt'?/\bsalt\b/.test(t):/\bblack pepper\b/.test(t);return Boolean(quantityCue&&named);}
    let probe=String(step||'');
    if(n==='chipotle paste')probe=probe.replace(/\bchipotle (?:dressing|tofu)\b/gi,'prepared component');
    if(n==='toasted sesame oil')return /\b(?:toasted )?sesame oil\b/.test(normalise(probe))&&activePhrase(probe,'sesame oil');
    if(/\b(?:macaroni|spaghetti|tortiglioni|farfalle|orzo|linguine|tagliatelle|penne|tortelloni)\b/.test(n))probe=probe.replace(/\b(?:starchy\s+)?pasta water\b/gi,'starchy water');
    if(/\bchicken\b/.test(n)&&!/\bstock\b/.test(n))probe=probe.replace(/\bchicken stock(?: paste| mix| cubes?)?\b/gi,'stock');
    if(n==='butter'){probe=probe.replace(/\bbutter beans?\b/gi,'beans');if(/\bbutter\s+(?:the\s+)?(?:bread|bun|roll|toast)\b/i.test(probe))return true;}
    if(n==='peas')probe=probe.replace(/\bpea pods?\b/gi,'pods');
    if(/\b(?:cooking oil|oil for cooking)\b/.test(n))probe=probe.replace(/\bolive oil\b/gi,'olive');
    if(/\b(?:red|yellow|green|bell) pepper\b/.test(n))probe=probe.replace(/\bblack pepper\b|\bsalt and pepper\b/gi,'seasoning');
    if(/\b(?:intense tomato|medium tomato|baby plum tomatoes?|premium tomato mix)\b/.test(n)||/\btomato(?:es)?\b/.test(n)&&!/\b(?:paste|puree|sauce|stock|concentrate|ketchup|dressing|powder|passata)\b/.test(n))probe=probe.replace(/\b(?:sun[- ]dried )?tomato (?:paste|puree|sauce|stock|concentrate|ketchup)\b/gi,'prepared sauce').replace(/\bpassata\b/gi,'prepared sauce');
    if(isQualified(row[1])&&hasPhrase(probe,row[1])&&activePhrase(probe,row[1]))return true;
    if(hasPhrase(probe,row[1])&&/\b(?:spread|coat|rub|marinat)\w*\b/.test(normalise(probe)))return true;
    const semantic=specialEvidence(recipe,row[1],probe);
    if(/\bgarlic clove\b/.test(n))return semantic;
    if(isQualified(row[1]))return semantic||qualifiedReference(recipe,row[1],probe);
    if(n==='salt'||n==='black pepper'||(n==='pepper'&&openEndedAmount(row[0])))return semantic;
    const phrases=new Set(aliasPhrases(row[1]));
    if(n==='black olives')phrases.add('olive');
    if(/\bmushroom/.test(n)&&!compoundIngredientName(n))phrases.add('mushroom');
    if(/\bplant based burger/.test(n)||/\bplant-based burger/.test(String(row[1]).toLowerCase())){probe=probe.replace(/\bburger buns?\b/gi,'buns');phrases.add('burger');phrases.add('veggie burger');}
    if(n==='free range egg'){probe=probe.replace(/\begg noodles?\b/gi,'noodles');phrases.add('egg');}
    if(n==='whole cloves'){probe=probe.replace(/\bgarlic cloves?\b/gi,'garlic');phrases.add('clove');}
    if(/\b(?:red|yellow|green|bell|pointed) pepper/.test(n)){
      const pluralPrep=/\b(?:deseed|halve|slice|cut|chop|add|roast|fry)\b[^.!?]{0,100}\b(?:your |the |sliced |chopped )?peppers\b/i.test(String(step));
      if(pluralPrep)phrases.add('pepper');
    }
    const root=rootToken(recipe,ingredientIndex,probe);
    const compound=/\b(?:paste|puree|concentrate|sauce|dressing|stock|vinegar|ketchup|jam|dip|bread|ciabatta|baguette)\b/.test(n);
    const ambiguousRoot=/^(?:tomato|chicken|garlic|apple|peanut|pepper|onion|butter|lemon|lime|ginger|sesame|cider)$/.test(root);
    if(root&&(!compound||!ambiguousRoot))phrases.add(root);
    if(!compound&&/\btomato(?:es)?\b/.test(n))phrases.add('tomato');
    if(/\bsalted peanut/.test(n)){probe=probe.replace(/\bpeanut butter\b/gi,'prepared spread');phrases.add('peanut');}
    if(/\b(?:red|yellow|green|bell) pepper\b/.test(n)&&countMatchingIngredients(recipe,x=>/\b(?:red|yellow|green|bell) pepper\b/.test(x))===1)phrases.add('pepper');

    if(/\btomato (?:paste|puree|concentrate)\b/.test(n)){phrases.add('tomato paste');phrases.add('tomato puree');phrases.add('tomato concentrate');}

    if(/^(?:wild )?rocket$/.test(n)&&countMatchingIngredients(recipe,x=>/\b(?:rocket|baby leaf|salad leaves|seasonal salad)\b/.test(x))===1)phrases.add('salad');
    if(semantic){
      if(/\b(?:basa|cod|pollock)\b/.test(n))phrases.add('fish');
      if(/\b(?:goat|red leicester|cheddar|hard italian|italian hard|salad cheese)\b/.test(n))phrases.add('cheese');
      if(/\bchicken\b/.test(n)&&!/\bstock\b/.test(n))phrases.add('chicken');
      if(/\brice\b/.test(n)&&!/\bvinegar\b/.test(n))phrases.add('rice');
      if(/\btomato\b/.test(n)&&!compound)phrases.add('tomato');
      if(/\b(?:red|yellow|green|bell) pepper\b/.test(n))phrases.add('pepper');
      if(/^water\b/.test(n))phrases.add('water');
      if(/\bstock\b/.test(n))phrases.add('stock');
      if(n==='olive oil'&&countMatchingIngredients(recipe,x=>/\boil\b/.test(x))===1)phrases.add('oil');
    }
    return [...phrases].some(phrase=>activePhrase(probe,phrase));
  }
  const preparationAction=/\b(?:peel|chop|dice|slice|cut|halve|quarter|grate|crush|mince|trim|drain|rinse|zest|juice|shred|tear|pick|pat|wash|reserve|set aside)\b/;
  const useAction=/\b(?:mash|add|stir|mix|combine|fold|toss|fry|cook|roast|bake|simmer|boil|pour|scatter|spread|drizzle|coat|dip|top|season|melt|whisk|sprinkle|crumble|squeeze|dissolve|put|pop|place|lay|transfer|arrange|return|tip|heat|warm|brush|rub|marinate|toast|spoon|dollop|smear|swirl|dress|garnish|pack|fill|stuff|wrap|roll|shape|press|glaze|dust|bring|pile|butter|crack|serve)\b/;
  function preparationOnlyEvidence(recipe,ingredientIndex,step){
    const row=(recipe.ingredients||[])[ingredientIndex];if(!row)return false;
    const phrases=new Set(aliasPhrases(row[1])),root=rootToken(recipe,ingredientIndex,step);if(root)phrases.add(root);
    const relevant=stepClauses(step).filter(clause=>[...phrases].some(phrase=>hasPhrase(clause,phrase)));
    if(!relevant.length)return false;
    let prepared=false,used=false;
    for(const clause of relevant){
      if(preparationAction.test(clause))prepared=true;
      if(useAction.test(clause))used=true;
    }
    return prepared&&!used;
  }
  function repeatFullAmount(name,amount){return openEndedAmount(amount);}
  function scaledAmount(recipe,row,factor,multiplier){let total=MW.preparation&&MW.preparation.scaleAmount?MW.preparation.scaleAmount(recipe,row[0],row[1],factor):(recipe.scaleSafe===false?row[0]:MW.shopping.scaleAmount(row[0],factor));if(multiplier===1)return total;const parsed=MW.inventory&&MW.inventory.parseAmount?MW.inventory.parseAmount(total):null;if(!parsed)return total;return MW.inventory.formatAmount({value:parsed.value*multiplier,unit:parsed.unit});}
  const allocationCache=new WeakMap();
  function allocations(recipe){
    if(recipe&&typeof recipe==='object'&&allocationCache.has(recipe))return allocationCache.get(recipe);
    const steps=recipe&&recipe.steps||[],map=new Map();
    for(let ingredientIndex=0;ingredientIndex<(recipe.ingredients||[]).length;ingredientIndex++){
      const hits=[];
      for(let stepIndex=0;stepIndex<steps.length;stepIndex++){
        const step=steps[stepIndex],ev=evidence(recipe,step,ingredientIndex,stepIndex);
        const activeUse=usageEvidence(recipe,ingredientIndex,step),assemblyUse=finalAssemblyEvidence(recipe,ingredientIndex,step);
        const usage=activeUse||assemblyUse,prepOnly=preparationOnlyEvidence(recipe,ingredientIndex,step);
        const reason=assemblyUse&&!activeUse?'final-assembly-use':(ev.matched?ev.reason:'active-ingredient-reference');
        if(ev.matched||usage)hits.push({stepIndex,reason,lexical:Boolean(ev.lexical),usage,prepOnly,multiplier:splitMultiplier(recipe,ingredientIndex,step,stepIndex)});
      }
      if(!hits.length)continue;
      const chosen=hits.filter(x=>x.reason==='source-step-id'||x.usage);
      let occurrence=0,preparedEarlier=false;
      for(const hit of chosen){
        const row=recipe.ingredients[ingredientIndex],repeatable=repeatFullAmount(row[1],row[0]);
        const reused=occurrence>0&&!repeatable&&(hit.multiplier===1||preparedEarlier);
        const firstRepeated=occurrence===0&&chosen.length>1&&hit.multiplier===1&&!repeatable;
        if(!map.has(hit.stepIndex))map.set(hit.stepIndex,[]);
        map.get(hit.stepIndex).push({ingredientIndex,reason:hit.reason,multiplier:hit.multiplier,reused,firstRepeated,prepOnly:hit.prepOnly,repeatCount:chosen.length});
        if(hit.prepOnly)preparedEarlier=true;
        occurrence++;
      }
    }
    if(recipe&&typeof recipe==='object')allocationCache.set(recipe,map);return map;
  }
  function forStep(recipe,step,factor,stepIndex){
    const rows=allocations(recipe).get(stepIndex)||[],merged=new Map();
    for(const x of rows){
      const row=recipe.ingredients[x.ingredientIndex],name=row[1],key=normalise(name),current=merged.get(key);
      const practical=MW.practicalQuantities&&MW.practicalQuantities.resolve?MW.practicalQuantities.resolve(recipe,x.ingredientIndex,factor,x.multiplier):null;
      let amount=practical?practical.amount:scaledAmount(recipe,row,factor,x.multiplier),practicalApproximate=Boolean(practical&&practical.approximate);
      if(x.reused&&x.multiplier===1){amount='From measured amount';practicalApproximate=false;}
      else if(x.firstRepeated)amount=String(amount)+' total';
      if(!current){merged.set(key,{name,amount,ingredientIndex:x.ingredientIndex,ingredientIndices:[x.ingredientIndex],reason:x.reason,multiplier:x.multiplier,reused:x.reused,firstRepeated:x.firstRepeated,prepOnly:x.prepOnly,repeatCount:x.repeatCount,practicalApproximate,sourceKitAmount:practical&&practical.sourceAmount||''});continue;}
      current.ingredientIndices.push(x.ingredientIndex);current.reused=current.reused&&x.reused;current.prepOnly=current.prepOnly&&x.prepOnly;current.practicalApproximate=current.practicalApproximate||practicalApproximate;
      const a=MW.inventory&&MW.inventory.parseAmount?MW.inventory.parseAmount(current.amount):null,b=MW.inventory&&MW.inventory.parseAmount?MW.inventory.parseAmount(amount):null;
      if(a&&b&&a.unit===b.unit)current.amount=MW.inventory.formatAmount({value:a.value+b.value,unit:a.unit});
      else if(String(current.amount)!==String(amount))current.amount=String(current.amount)+' + '+String(amount);
    }
    return [...merged.values()];
  }
  function audit(recipe){const steps=recipe&&recipe.steps||[],rows=[];for(let i=0;i<steps.length;i++)rows.push({stepIndex:i,used:forStep(recipe,steps[i],1,i)});return rows;}
  MW.stepIngredients={forStep,evidence,audit,normalise,tokens,rootToken,usageEvidence,preparationOnlyEvidence,remainingTargetsRoot,finalAssemblyEvidence,aliasPhrases};
})();