window.MW = window.MW || {};
(function(){
  const photo=(id,source,label,cue)=>({label,cue,src:MW.images.pexels(id),source,imageLicense:'Pexels License',imageProvenance:'Pexels photography bundled locally during the Android build'});
  const ingredientBanks={
    'halloumi-pan':[photo('8751408','https://www.pexels.com/photo/brown-bread-on-black-pan-8751408/','Cook the halloumi until golden','The halloumi should have a deep golden crust on the surface while staying soft inside.')],
    'prawn-prep':[photo('32664528','https://www.pexels.com/photo/fresh-shrimp-marinating-with-garlic-and-chili-32664528/','Prepare the prawns','The prawns should be evenly coated and ready to go straight into the hot pan.')],
    'prawn-pan':[photo('19359941','https://www.pexels.com/photo/person-preparing-seafood-on-a-frying-pan-19359941/','Cook the prawns until pink','The prawns should turn pink and opaque without becoming dry or tightly curled.')],
    'tofu-pan':[photo('7009334','https://www.pexels.com/photo/a-close-up-shot-of-a-cooked-tofu-on-a-pan-7009334/','Brown the tofu','Let the tofu sit against the hot pan long enough to build colour before turning it.')],
    'chicken-pan':[photo('27831791','https://www.pexels.com/photo/fried-chicken-in-a-frying-pan-on-a-stove-27831791/','Cook the chicken evenly','The chicken should colour on the outside while cooking through safely in the centre.')],
    'beef-pan':[photo('4661807','https://www.pexels.com/photo/close-up-photo-of-meat-cooking-in-frying-pan-4661807/','Brown the beef','Keep the pan hot enough to brown the meat rather than steaming it.')],
    'beef-stirfry':[photo('31088694','https://www.pexels.com/photo/cooking-beef-stir-fry-in-a-home-kitchen-31088694/','Stir-fry the beef','Keep the ingredients moving over high heat so the beef browns quickly without overcooking.')],
    'salmon-prep':[photo('18585656','https://www.pexels.com/photo/a-person-cutting-up-a-piece-of-salmon-with-herbs-18585656/','Prepare the salmon','Season the salmon evenly before it goes into the pan, oven or air fryer.')],
    'salmon-cooked':[photo('10942354','https://www.pexels.com/photo/cooked-salmon-in-close-up-photography-10942354/','Cook the salmon until just done','The salmon should look opaque at the edges and flake easily while remaining moist inside.')],
    'cod-cooked':[photo('37222940','https://www.pexels.com/photo/cooked-white-fish-on-a-plate-37222940/','Cook the cod until it flakes','The cod should turn opaque and separate into moist flakes when pressed gently.')],
    'chickpea-cooked':[photo('7364662','https://www.pexels.com/photo/cooked-chickpea-dish-7364662/','Cook the chickpeas with the sauce','The chickpeas should be hot through and coated in the sauce rather than dry.')],
    'lentil-cooked':[photo('33430562','https://www.pexels.com/photo/cooked-lentil-dish-33430562/','Simmer the lentils until tender','The lentils should be tender and the sauce should look cohesive rather than watery.')],
    'bean-cooked':[photo('6066051','https://www.pexels.com/photo/bean-dish-in-a-bowl-6066051/','Warm the beans through','The beans should be hot and coated with the other ingredients without breaking down.')],
    'aubergine-cooked':[photo('9394526','https://www.pexels.com/photo/cooked-aubergine-dish-9394526/','Cook the aubergine until tender','The aubergine should be soft through the centre with coloured edges.')],
    'cauliflower-cooked':[photo('3872366','https://www.pexels.com/photo/roasted-cauliflower-on-a-tray-3872366/','Cook the cauliflower until coloured','Look for a tender centre with browned edges rather than pale steamed florets.')]
  };
  const banks={
    'prep-veg':[photo('6249475','https://www.pexels.com/photo/cut-vegetables-on-cutting-board-6249475/','Prep evenly','Cut the ingredients into similar sized pieces so they cook at the same speed.'),photo('4252139','https://www.pexels.com/photo/person-slicing-red-onion-on-cutting-board-4252139/','Prepare the vegetables','Use a stable board and keep the pieces reasonably even.')],
    'couscous':[photo('21531368','https://www.pexels.com/photo/close-up-of-delicious-dish-in-plate-on-table-21531368/','Fluff the couscous','The grains should look swollen, separate and fluffy rather than wet or clumped.')],
    'drain-pulses':[photo('4968570','https://www.pexels.com/photo/hand-cleaning-fava-beans-in-colander-4968570/','Drain the chickpeas or beans','Use a colander or sieve and let the liquid drain away fully before adding the pulses.')],
    'drain-pasta':[photo('5907595','https://www.pexels.com/photo/crop-females-draining-cooked-homemade-pasta-5907595/','Drain the pasta','Let the excess cooking water run off before adding the pasta to the next stage.')],
    'boil-pasta':[photo('10608701','https://www.pexels.com/photo/uncooked-pasta-in-a-pot-with-boiling-water-10608701/','Boil steadily','Keep the water at a steady boil until the pasta is just tender.')],
    'cook-rice':[photo('8996219','https://www.pexels.com/photo/meal-with-rice-on-plate-8996219/','Cook the rice until tender','The grains should be tender and separate rather than hard or waterlogged.')],
    'fry':[photo('15322739','https://www.pexels.com/photo/frying-vegetables-on-pan-15322739/','Cook in a hot pan','Give the food contact with the pan so it can colour before you move it too much.')],
    'stirfry':[photo('175754','https://www.pexels.com/photo/vegetables-sauteed-on-wok-175754/','Keep it moving','Use a fairly high heat and keep turning the ingredients so they cook quickly and evenly.')],
    'simmer':[photo('4543005','https://www.pexels.com/photo/cooked-food-on-black-pan-4543005/','Simmer gently','Look for small regular bubbles rather than a hard rolling boil.')],
    'roast':[photo('3872366','https://www.pexels.com/photo/photo-of-broccoli-on-tray-3872366/','Roast in one layer','Leave some space around the ingredients so the edges brown instead of steaming.'),photo('6546425','https://www.pexels.com/photo/baked-carrots-and-bell-pepper-on-baking-sheet-6546425/','Roast until coloured','Look for tender centres and lightly browned edges.')],
    'mix-salad':[photo('19295808','https://www.pexels.com/photo/greek-salad-in-a-bowl-19295808/','Combine gently','Toss the ingredients just enough to distribute everything evenly.')],
    'blend':[photo('6605167','https://www.pexels.com/photo/chef-using-blender-6605167/','Blend smooth','Keep blending until the texture is even, stopping to scrape or stir if needed.')],
    'slow':[photo('10692537','https://www.pexels.com/photo/cooked-food-on-white-ceramic-bowl-10692537/','Cook low and slow','Keep the lid on and let the gentle heat make the ingredients tender.')],
    'airfry':[photo('35285814','https://www.pexels.com/photo/crispy-chicken-pieces-in-modern-air-fryer-35285814/','Air fry in one layer','Leave room for hot air to circulate and turn or shake the food part way through.')],
    'barbecue':[photo('37667711','https://www.pexels.com/photo/grilled-chicken-skewers-on-outdoor-barbecue-37667711/','Barbecue evenly','Turn the food regularly and look for cooked centres with lightly charred edges.')],
    'assemble':[photo('4519052','https://www.pexels.com/photo/photo-of-a-salad-in-a-bowl-4519052/','Assemble the dish','Bring the cooked components together so each portion gets a balanced amount of everything.')],
    'serve':[photo('6646151','https://www.pexels.com/photo/a-person-holding-a-plate-6646151/','Finish and serve','Taste, make the final adjustment and serve while the food is at its best.')]
  };
  function hash(text){let h=2166136261;for(const ch of String(text||'')){h^=ch.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
  function pick(key,seed){const arr=banks[key]||[];return arr.length?arr[hash(seed)%arr.length]:null;}
  function context(recipe){return [recipe&&recipe.title,recipe&&recipe.subtitle,recipe&&Array.isArray(recipe.ingredients)?recipe.ingredients.map(x=>x[1]).join(' '):''].filter(Boolean).join(' ').toLowerCase();}
  function detect(recipe,step){
    const s=String(step||'').toLowerCase(),ctx=context(recipe);
    if(/^(heat|preheat) (the )?oven|preheat.*oven|heat your oven/.test(s)) return {key:null,type:'setup'};
    if(/air fry|air-fryer|air fryer/.test(s)) return {key:'airfry',type:'airfry'};
    if(/barbecue|barbeque|bbq|grill over|thread.*skewer/.test(s)) return {key:'barbecue',type:'barbecue'};
    if(/slow cook|slow-cooker|slow cooker/.test(s)) return {key:'slow',type:'slow'};
    if(/blend|blitz|pur[eé]e/.test(s)) return {key:'blend',type:'blend'};
    if(/drain|rinse|colander|sieve/.test(s)){
      if(/chickpea|bean|lentil|pulse/.test(s)||(!/pasta|spaghetti|penne|noodle|orzo/.test(s)&&/chickpea|bean|lentil|pulse/.test(ctx))) return {key:'drain-pulses',type:'drain'};
      if(/pasta|spaghetti|penne|noodle|orzo/.test(s)||/pasta|spaghetti|penne|noodle|orzo/.test(ctx)) return {key:'drain-pasta',type:'drain'};
    }
    if(/couscous/.test(s)&&/prepare|cook|fluff|fork|water|stock/.test(s)) return {key:'couscous',type:'couscous'};
    if(/cook.*rice|boil.*rice|rice.*tender|basmati|jasmine/.test(s)) return {key:'cook-rice',type:'boil'};
    if(/cook.*pasta|boil.*pasta|cook.*noodle|boil.*noodle|spaghetti|penne/.test(s)) return {key:'boil-pasta',type:'boil'};
    if(/stir[- ]?fry|wok/.test(s)) return {key:'stirfry',type:'stir'};
    if(/roast|bake|oven/.test(s)) return {key:'roast',type:'roast'};
    if(/fry|brown|sear|golden/.test(s)) return {key:'fry',type:'fry'};
    if(/simmer|reduce|thicken|gentle bubble/.test(s)) return {key:'simmer',type:'simmer'};
    if(/slice|dice|chop|cut|grate|peel|prepare the/.test(s)) return {key:'prep-veg',type:'prep'};
    if(/toss|fold|combine|mix/.test(s)&&/salad|couscous|lettuce|cucumber|tomato|chickpea|feta|olive/.test(ctx+s)) return {key:'mix-salad',type:'mix'};
    if(/serve|plate|finish|divide|top with|assemble|build the/.test(s)) return {key:/serve|plate/.test(s)?'serve':'assemble',type:/serve|plate/.test(s)?'serve':'assemble'};
    return {key:null,type:'context'};
  }
  function forStep(step,index,recipe,skipSource){
    const sourceStep=!skipSource&&recipe&&Array.isArray(recipe.sourceStepImages)&&recipe.sourceStepImages[index];
    if(sourceStep){
      const src=typeof sourceStep==='string'?sourceStep:sourceStep.src||sourceStep.link;
      if(src) return {
        type:'reference',
        index:Number(index)||0,
        usedFallback:false,
        label:(typeof sourceStep==='object'&&sourceStep.caption)||('Reference recipe step '+(Number(index)+1)),
        cue:(typeof sourceStep==='object'&&sourceStep.caption)||'Use this exact source photograph as a visual check for the current step.',
        src,
        source:recipe.sourceUrl||recipe.recipeSourceUrl||'',
        imageLicense:'Reference source image',
        imageProvenance:'Exact step photograph from the published recipe source'
      };
    }
    const exact=recipe&&MW.referenceMedia&&MW.referenceMedia[recipe.id];
    if(exact&&Array.isArray(exact.steps)&&exact.steps[index]){
      return {
        type:'reference',
        index:Number(index)||0,
        usedFallback:false,
        label:'Reference recipe step '+(Number(index)+1),
        cue:'Use the image as a visual check for this exact referenced step.',
        src:exact.steps[index],
        source:exact.url,
        imageLicense:'Reference source image',
        imageProvenance:'Exact step photograph from the recipe source used by this private build'
      };
    }
    // Chia thickens during cold soaking; that is not a simmering instruction.
    const coldText=String(step||'').toLowerCase();
    if(/chill|overnight|refrigerat|fridge/.test(coldText)&&/oats|chia/.test(context(recipe)+' '+coldText)&&!/\b(?:cook|heat|boil|simmer|warm|bake|roast|fry)\b/.test(coldText))return null;
    const match=detect(recipe,step);
    const ctx=context(recipe);
    const text=String(step||'').toLowerCase();
    let ingredientVisual=null;
    if(/prawn|shrimp/.test(text)){
      if(/marinat|season|coat|prepare/.test(text)) ingredientVisual=ingredientBanks['prawn-prep'][0];
      else if(['fry','stir','simmer','airfry','barbecue','roast'].includes(match.type)||/cook|add the prawns|add prawns/.test(text)) ingredientVisual=ingredientBanks['prawn-pan'][0];
    }
    if(!ingredientVisual&&/halloumi/.test(text)&&(['fry','airfry','barbecue','roast'].includes(match.type)||/cook(?: the)? halloumi|halloumi.*(?:until|through|golden)/.test(text))) ingredientVisual=ingredientBanks['halloumi-pan'][0];
    if(!ingredientVisual&&/tofu/.test(text)&&(['fry','stir','airfry','roast'].includes(match.type)||/cook(?: the)? tofu|tofu.*(?:until|through|golden)/.test(text))) ingredientVisual=ingredientBanks['tofu-pan'][0];
    if(!ingredientVisual&&/chicken/.test(text)&&(['fry','stir','airfry','roast'].includes(match.type)||/cook(?: the)? chicken|chicken.*(?:until|through|golden)/.test(text))) ingredientVisual=ingredientBanks['chicken-pan'][0];
    if(!ingredientVisual&&/beef/.test(text)&&match.type==='stir') ingredientVisual=ingredientBanks['beef-stirfry'][0];
    if(!ingredientVisual&&/beef/.test(text)&&(['fry','simmer'].includes(match.type)||/cook(?: the)? beef|beef.*(?:until|through|brown)/.test(text))) ingredientVisual=ingredientBanks['beef-pan'][0];
    if(!ingredientVisual&&/salmon/.test(text)){
      if(/season|brush|marinat|prepare/.test(text)) ingredientVisual=ingredientBanks['salmon-prep'][0];
      else if(['fry','airfry','barbecue','roast'].includes(match.type)||/cook(?: the)? salmon|salmon.*(?:until|through|opaque|flake)/.test(text)) ingredientVisual=ingredientBanks['salmon-cooked'][0];
    }
    if(!ingredientVisual&&/\bcod\b/.test(text)&&(['fry','simmer','airfry','barbecue','roast'].includes(match.type)||/cook(?: the)? cod|cod.*(?:until|through|opaque|flake)/.test(text))) ingredientVisual=ingredientBanks['cod-cooked'][0];
    if(!ingredientVisual&&/chickpea/.test(text)&&(['fry','stir','simmer','airfry','barbecue','roast'].includes(match.type)||/cook(?: the)? chickpea|chickpea.*(?:until|through|hot)/.test(text))) ingredientVisual=ingredientBanks['chickpea-cooked'][0];
    if(!ingredientVisual&&/lentil/.test(text)&&(['fry','stir','simmer','slow'].includes(match.type)||/cook(?: the)? lentil|lentil.*(?:until|through|tender)/.test(text))) ingredientVisual=ingredientBanks['lentil-cooked'][0];
    if(!ingredientVisual&&/black bean|butter bean|beans/.test(text)&&(['fry','stir','simmer','slow'].includes(match.type)||/cook(?: the)? (?:black beans?|butter beans?|beans?)|(?:black beans?|butter beans?|beans?).*(?:until|through|hot|tender)/.test(text))) ingredientVisual=ingredientBanks['bean-cooked'][0];
    if(!ingredientVisual&&/aubergine/.test(text)&&(['fry','stir','simmer','airfry','barbecue','roast'].includes(match.type)||/cook(?: the)? aubergine|aubergine.*(?:until|through|tender|golden)/.test(text))) ingredientVisual=ingredientBanks['aubergine-cooked'][0];
    if(!ingredientVisual&&/cauliflower/.test(text)&&(['fry','stir','simmer','airfry','barbecue','roast'].includes(match.type)||/cook(?: the)? cauliflower|cauliflower.*(?:until|through|tender|golden)/.test(text))) ingredientVisual=ingredientBanks['cauliflower-cooked'][0];
    const chosen=ingredientVisual||(match.key?pick(match.key,(recipe&&recipe.id||'')+'|'+index+'|'+step):null);
    if(chosen) return Object.assign({type:match.type,index:Number(index)||0,usedFallback:false},chosen);
    if(match.type==='setup') return null;
    // Fail closed for guide photography. A missing image is preferable to showing
    // a different ingredient, finished dish or unrelated cooking action.
    return null;
    return Object.assign({type:'serve',index:Number(index)||0,usedFallback:true},pick('serve',step));
  }
  function fallbackForStep(step,index,recipe){
    return forStep(step,index,recipe,true);
  }
  MW.cookingVisuals={forStep,fallbackForStep,detect,banks,ingredientBanks};
})();