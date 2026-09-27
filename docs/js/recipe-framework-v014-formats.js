window.MW = window.MW || {};
(function(){
  const F=MW.recipeFrameworkV014;if(!F) throw new Error('My Week v0.14 recipe framework data missing.');
  const lower=text=>text.charAt(0).toLowerCase()+text.slice(1);
  const isQuick=name=>/spinach|kale|leaf|leaves|peas|sweetcorn|spring onions/i.test(String(name||''));
  const isDense=name=>/butternut|sweet potato/i.test(String(name||''));
  const isFirm=name=>/butternut|sweet potato|carrot|broccoli|cauliflower|aubergine/i.test(String(name||''));
  function panVegStep(v1,v2,samePan){
    const names=[v1,v2];
    const quick=names.filter(isQuick);
    const solid=names.filter(x=>!isQuick(x));
    const intro=samePan
      ?'Use the same frying pan. Add 1 tbsp cooking oil if the pan looks dry and set it over a medium-high heat. '
      :'Heat 1 tbsp cooking oil in a large frying pan over a medium-high heat. ';
    if(solid.length&&quick.length){
      const first=solid.join(' and ');
      const mins=solid.some(isDense)?'12-15':(solid.some(isFirm)?'8-10':'5-7');
      return intro+'Add the '+first+' first and cook for '+mins+' minutes, stirring every minute or so, until almost tender and lightly coloured. Add the '+quick.join(' and ')+' for the final 1-2 minutes and cook just until hot, bright and tender.';
    }
    if(!solid.length){
      return intro+'Add the '+quick.join(' and ')+' and cook for 1-3 minutes, stirring regularly, just until hot and tender.';
    }
    const mins=solid.some(isDense)?'12-15':(solid.some(isFirm)?'8-10':'5-7');
    return intro+'Add the '+solid.join(' and ')+' and cook for '+mins+' minutes, stirring every minute or so, until tender with lightly browned edges.';
  }
  const transferName=m=>String(m.ingredient||'').replace(/^raw\s+/i,'').replace(/^cooked\s+/i,'');
  const cookMainThenRest=m=>{
    const id=String(m.id||'');
    const oilIntro=(/^(chicken-breast|chicken-thighs|turkey-mince|beef-mince|beef-strips|pork-mince|pork-strips|salmon|cod|prawns|tofu|aubergine)$/i.test(id))
      ?'Heat 1 tbsp cooking oil in a large frying pan. '
      :'';
    const rawMethod=String(m.cook||'');
    const method=oilIntro?rawMethod.replace(/ in a large frying pan/gi,''):rawMethod;
    return oilIntro+method+' Transfer the cooked '+transferName(m)+' to a clean plate and keep it warm while you cook the vegetables.';
  };
  const tacoMain=m=>{
    const id=String(m.id||'');
    if(id==='chicken-breast') return 'sliced chicken';
    if(id==='chicken-thighs') return 'sliced chicken thighs';
    if(id==='salmon') return 'salmon, flaked into large pieces';
    if(id==='cod') return 'cod, flaked into large pieces';
    if(id==='tofu') return 'crispy tofu';
    if(id==='cauliflower') return 'roasted cauliflower';
    return transferName(m);
  };
  const returnMain=m=>{
    const id=String(m.id||'');
    if(id==='salmon') return 'Flake the cooked salmon into large pieces and return it to the pan.';
    if(id==='cod') return 'Flake the cooked cod into large pieces and return it to the pan.';
    return 'Return the cooked '+transferName(m)+' to the pan.';
  };
  const vegAfterMain=(m,v1,v2)=>panVegStep(v1,v2,!/^(cauliflower|red lentils)$/i.test(String(m.ingredient||'')));
  const potAction=p=>String(p.action||'').replace(/frying pan/gi,'saucepan').replace(/the pan/gi,'the saucepan');
  function curryVegStep(v1,v2){
    const dense=[v1,v2].filter(isDense);
    const quick=[v1,v2].filter(isQuick);
    const normal=[v1,v2].filter(x=>!isDense(x)&&!isQuick(x));
    let out='Use the same frying pan. Add 1 tbsp cooking oil if the pan looks dry, reduce to a medium heat, add the diced onion and cook for 5-7 minutes until soft and lightly golden.';
    if(dense.length) out+=' Add the '+dense.join(' and ')+' and cook for 10-12 minutes, stirring regularly, until almost tender.';
    if(normal.length) out+=' Add the '+normal.join(' and ')+' and cook for 4-6 minutes until starting to soften.';
    if(quick.length) out+=' Add the '+quick.join(' and ')+' for the final 1-2 minutes and cook just until hot and tender.';
    return out;
  }
  const trayMainPrep=m=>{
    const id=String(m.id||'');
    if(id==='chicken-breast') return 'Cut the chicken breast into even 3 cm chunks.';
    if(id==='chicken-thighs') return 'Cut the boneless chicken thighs into even 3 cm pieces.';
    if(id==='tofu') return 'Pat the tofu dry and cut it into 2 cm cubes.';
    if(id==='chickpeas') return 'Drain the chickpeas and pat them dry.';
    if(id==='aubergine') return 'Cut the aubergine into 2 cm cubes.';
    if(id==='cauliflower') return 'Cut the cauliflower into bite-sized florets.';
    return 'Prepare the '+m.ingredient+' into even bite-sized pieces.';
  };
  const trayFlavourStep=p=>{
    if(p.name==='Rosemary Garlic') return 'After 10 minutes, scatter the rosemary and crushed garlic over the tray, add 2 tablespoons of water around the food and turn everything gently so the flavour coats it without the garlic sitting exposed on top.';
    if(p.name==='Lemon Herb') return 'After 10 minutes, scatter over the crushed garlic and mixed herbs, add half the lemon juice and 2 tablespoons of water, then turn everything gently to coat.';
    if(p.name==='Maple Paprika') return 'After 10 minutes, mix the maple syrup, smoked paprika, mustard and crushed garlic with 1 tablespoon of water. Spoon the glaze over the tray and turn everything gently to coat.';
    if(p.name==='Harissa Lemon') return 'After 10 minutes, mix the harissa, tomato puree and cumin with 2 tablespoons of water. Spoon it over the tray and turn everything gently to coat.';
    if(p.name==='Tomato Oregano') return 'After 10 minutes, mix the crushed garlic, tomato puree and oregano with 2 tablespoons of water. Add the cherry tomatoes, spoon the mixture over the tray and turn everything gently to coat.';
    return 'After 10 minutes, add the flavouring ingredients and turn everything gently to coat.';
  };
  const trayDoneness=m=>{
    const id=String(m.id||'');
    if(id==='chicken-breast'||id==='chicken-thighs') return 'the chicken is browned and completely cooked through with no pink remaining';
    if(id==='tofu') return 'the tofu is golden at the edges and piping hot';
    if(id==='chickpeas') return 'the chickpeas are piping hot with lightly crisp edges';
    if(id==='aubergine') return 'the aubergine is completely tender and browned at the edges';
    if(id==='cauliflower') return 'the cauliflower is tender with browned, crisp edges';
    return 'the main ingredient is fully cooked';
  };
  const trayFinish=p=>{
    if(p.name==='Rosemary Garlic') return 'Remove the tray from the oven, add the lemon juice and zest, then taste and adjust the salt and black pepper.';
    if(p.name==='Lemon Herb') return 'Remove the tray from the oven, add the remaining lemon juice, then taste and adjust the salt and black pepper.';
    if(p.name==='Maple Paprika') return 'Remove the tray from the oven, check the glaze is sticky and lightly caramelised, then taste and add black pepper and a pinch of salt only if needed.';
    if(p.name==='Harissa Lemon') return 'Remove the tray from the oven, finish with lemon juice, then taste and balance with salt, black pepper and a tiny pinch of sugar if needed.';
    if(p.name==='Tomato Oregano') return 'Remove the tray from the oven, taste and season with salt and black pepper, pressing a few cherry tomatoes with the spoon if you want a saucier finish.';
    return 'Remove the tray from the oven and taste before serving.';
  };
  const slowMeat=/^(chicken-thighs|beef-mince|beef-strips|pork-mince|pork-strips|lamb-mince)$/;
  const slowMainStep=m=>{
    const id=String(m.id||'');
    if(slowMeat.test(id)) return 'Heat 1 tbsp cooking oil in a large frying pan over a high heat. Add the '+m.ingredient+', season with salt and black pepper and brown for 4-6 minutes, turning or breaking it up as needed. Transfer it to the slow cooker; it does not need to be fully cooked yet.';
    if(id==='chickpeas'||id==='black-beans'||id==='butter-beans') return 'Drain and rinse the '+m.ingredient+' thoroughly, then add them to the slow cooker.';
    if(id==='aubergine') return 'Cut the aubergine into 2 cm cubes and add it to the slow cooker.';
    return 'Prepare the '+m.ingredient+' and add it to the slow cooker.';
  };
  const slowFlavourStep=p=>{
    if(p.name==='Rosemary Garlic') return 'Add the rosemary, crushed garlic and lemon zest to the slow cooker. Reserve the lemon juice for serving.';
    if(p.name==='Smoky Paprika') return 'Add the crushed garlic, smoked paprika, tomato puree and sugar to the slow cooker with 2 tablespoons of water. Reserve the lime for serving.';
    if(p.name==='Tomato Basil') return 'Add the crushed garlic, tomato puree, chopped tomatoes and half the basil to the slow cooker. Reserve the remaining basil for serving.';
    if(p.name==='Harissa Lemon') return 'Add the harissa, tomato puree and cumin to the slow cooker with 2 tablespoons of water. Reserve the lemon for serving.';
    if(p.name==='Coconut Curry') return 'Add the crushed garlic, finely grated ginger, cumin, garam masala, chilli powder, tomato puree and coconut milk to the slow cooker. Stir thoroughly and reserve the lime for serving.';
    return 'Add the flavouring ingredients to the slow cooker and stir thoroughly.';
  };
  const airMainPrep=m=>{
    const id=String(m.id||'');
    if(id==='chicken-breast') return 'Cut the chicken breast into even 3 cm chunks.';
    if(id==='chicken-thighs') return 'Cut the boneless chicken thighs into even 3 cm pieces.';
    if(id==='beef-strips'||id==='pork-strips') return 'Separate the '+m.ingredient+' so the pieces are not stuck together.';
    if(id==='salmon'||id==='cod') return 'Pat the '+m.ingredient+' dry and leave the fillets whole.';
    if(id==='prawns') return 'Pat the prawns dry.';
    if(id==='tofu') return 'Pat the tofu very dry and cut it into 2 cm cubes.';
    if(id==='chickpeas') return 'Drain, rinse and pat the chickpeas dry.';
    if(id==='halloumi') return 'Cut the halloumi into 2 cm cubes.';
    if(id==='aubergine') return 'Cut the aubergine into 2 cm cubes.';
    if(id==='cauliflower') return 'Cut the cauliflower into bite-sized florets.';
    return 'Prepare the '+m.ingredient+' into even pieces.';
  };
  const airFlavourStep=(m,p)=>{
    if(p.name==='Lemon Herb') return 'Mix the crushed garlic, mixed herbs, half the lemon juice and 1 tbsp cooking oil. Toss or brush this over the '+transferName(m)+', then reserve the remaining lemon for serving.';
    if(p.name==='Maple Paprika') return 'Mix the maple syrup, smoked paprika, mustard, crushed garlic and 1 tbsp cooking oil. Coat the '+transferName(m)+' evenly with the glaze.';
    if(p.name==='Teriyaki') return 'Mix the teriyaki sauce, finely grated ginger and crushed garlic. Coat the '+transferName(m)+' evenly and reserve the spring onions and sesame seeds for serving.';
    if(p.name==='Harissa Lemon') return 'Mix the harissa, tomato puree, cumin, half the lemon juice and 1 tbsp cooking oil. Coat the '+transferName(m)+' evenly and reserve the remaining lemon for serving.';
    if(p.name==='Smoky Paprika') return 'Mix the smoked paprika, tomato puree, crushed garlic, sugar and 1 tbsp cooking oil. Coat the '+transferName(m)+' evenly and reserve the lime for serving.';
    return 'Coat the '+transferName(m)+' evenly with the flavouring ingredients.';
  };
  const airMainStep=m=>{
    const id=String(m.id||'');
    const details={
      'chicken-breast':['12-15','completely cooked through with no pink remaining'],
      'chicken-thighs':['14-18','completely cooked through with no pink remaining'],
      'beef-strips':['7-9','browned at the edges and cooked to your liking'],
      'pork-strips':['10-12','browned and completely cooked through'],
      salmon:['8-11','caramelised outside and just opaque through the centre'],
      cod:['8-10','opaque through the centre and beginning to flake'],
      prawns:['6-8','pink, opaque and piping hot'],
      tofu:['10-12','crisp and deeply golden at the edges'],
      chickpeas:['12-15','piping hot with crisp edges'],
      halloumi:['8-10','deeply golden at the edges'],
      aubergine:['12-15','deeply browned and completely tender'],
      cauliflower:['14-18','tender with browned, crisp edges']
    }[id]||['10-15','browned and completely cooked through'];
    if(id==='salmon'||id==='cod') return 'Air fry at 190°C for '+details[0]+' minutes without turning, until '+details[1]+'.';
    if(id==='prawns'||id==='chickpeas') return 'Air fry at 190°C for '+details[0]+' minutes, shaking the basket once halfway, until '+details[1]+'.';
    return 'Air fry at 190°C for '+details[0]+' minutes, turning the pieces halfway, until '+details[1]+'.';
  };
  const airFinish=p=>{
    if(p.name==='Lemon Herb') return 'Finish with the reserved lemon juice, then taste and adjust the salt and black pepper.';
    if(p.name==='Maple Paprika') return 'Taste the finished bowl and add black pepper and a pinch of salt only if needed.';
    if(p.name==='Teriyaki') return 'Scatter over the sliced spring onions and sesame seeds, then taste before adding any extra salt.';
    if(p.name==='Harissa Lemon') return 'Finish with the reserved lemon juice, then taste and balance with salt and black pepper.';
    if(p.name==='Smoky Paprika') return 'Finish with lime juice, then taste and adjust the salt and black pepper.';
    return 'Taste and adjust the seasoning before serving.';
  };
  const bbqPrep=m=>{
    const id=String(m.id||'');
    if(id==='chicken-breast'||id==='chicken-thighs') return 'Cut the '+m.ingredient+' into even 3 cm pieces.';
    if(id==='beef-strips'||id==='pork-strips') return 'Fold any long '+m.ingredient+' pieces so they sit securely on the skewers.';
    if(id==='salmon') return 'Pat the salmon dry and cut each fillet into even 3 cm cubes.';
    if(id==='prawns') return 'Pat the prawns dry.';
    if(id==='tofu'||id==='halloumi'||id==='aubergine') return 'Cut the '+m.ingredient+' into even 2-3 cm pieces.';
    if(id==='cauliflower') return 'Cut the cauliflower into small bite-sized florets.';
    return 'Prepare the '+m.ingredient+' into even skewer-sized pieces.';
  };
  const bbqFlavourStep=(m,p)=>{
    if(p.name==='Lemon Herb') return 'Mix the crushed garlic, mixed herbs, half the lemon juice and 1 tbsp cooking oil, then toss with the '+transferName(m)+' and vegetables. Reserve the remaining lemon for serving.';
    if(p.name==='Cumin Lime') return 'Mix the crushed garlic, cumin, paprika, half the lime juice and 1 tbsp cooking oil, then toss with the '+transferName(m)+' and vegetables. Reserve the remaining lime for serving.';
    if(p.name==='Jerk Lime') return 'Mix the sliced spring onions, crushed garlic, finely grated ginger, jerk seasoning, soy sauce, half the lime juice and 1 tbsp cooking oil, then toss with the '+transferName(m)+' and vegetables. Reserve the remaining lime for serving.';
    if(p.name==='Harissa Lemon') return 'Mix the harissa, tomato puree, cumin, half the lemon juice and 1 tbsp cooking oil, then toss with the '+transferName(m)+' and vegetables. Reserve the remaining lemon for serving.';
    if(p.name==='Maple Paprika') return 'Mix the maple syrup, smoked paprika, mustard, crushed garlic and 1 tbsp cooking oil, then toss with the '+transferName(m)+' and vegetables.';
    return 'Toss the '+transferName(m)+' and vegetables with the flavouring ingredients and 1 tbsp cooking oil.';
  };
  const bbqCookStep=m=>{
    const id=String(m.id||'');
    const details={
      'chicken-breast':['10-12','the chicken is charred at the edges and completely cooked through with no pink remaining'],
      'chicken-thighs':['12-14','the chicken is charred at the edges and completely cooked through with no pink remaining'],
      'beef-strips':['6-8','the beef is browned and cooked to your liking'],
      'pork-strips':['8-10','the pork is browned and completely cooked through'],
      salmon:['6-8','the salmon is lightly charred outside and just opaque through the centre'],
      prawns:['5-7','the prawns are pink, opaque and piping hot'],
      tofu:['8-10','the tofu is browned and crisp at the edges'],
      halloumi:['6-8','the halloumi is deeply golden at the edges'],
      aubergine:['8-10','the aubergine is charred and completely tender'],
      cauliflower:['10-12','the cauliflower is tender with charred edges']
    }[id]||['8-12','everything is browned and completely cooked'];
    return 'Barbecue over a medium-high heat for '+details[0]+' minutes, turning every 2-3 minutes, until '+details[1]+'.';
  };
  const bbqVegPrep=name=>{
    const n=String(name||'').toLowerCase();
    if(/pepper/.test(n)) return 'cut the '+name+' into 3 cm pieces';
    if(/courgette/.test(n)) return 'cut the '+name+' into thick 2 cm half-moons';
    if(/aubergine/.test(n)) return 'cut the '+name+' into 3 cm cubes';
    if(/red onion|onion/.test(n)) return 'cut the '+name+' into chunky wedges';
    if(/mushroom/.test(n)) return 'wipe the '+name+' clean and halve any large ones';
    if(/cherry tomato/.test(n)) return 'leave the '+name+' whole';
    if(/^tomatoes?$/.test(n)) return 'cut the '+name+' into firm wedges';
    if(/broccoli|cauliflower/.test(n)) return 'cut the '+name+' into small florets';
    return 'cut the '+name+' into even 3 cm pieces';
  };
  const bbqFinish=p=>{
    if(p.name==='Lemon Herb') return 'Finish with the reserved lemon juice, then taste and adjust the salt and black pepper.';
    if(p.name==='Cumin Lime') return 'Finish with the reserved lime juice and a little zest, then taste and adjust the salt and black pepper.';
    if(p.name==='Jerk Lime') return 'Finish with the reserved lime juice, then taste and add extra jerk seasoning only if you want more heat.';
    if(p.name==='Harissa Lemon') return 'Finish with the reserved lemon juice, then taste and adjust the salt and black pepper.';
    if(p.name==='Maple Paprika') return 'Taste the skewers and add black pepper and a pinch of salt only if needed.';
    return 'Taste and adjust the seasoning before serving.';
  };
  const formatDefs={
    rice:{label:'Rice Bowl',photo:'rice',time:30,base:[['150 g','basmati rice']],tags:['rice','bowl'],steps:(m,v1,v2,p)=>[
      'Rinse the basmati rice, then cook it for about 10-12 minutes, or according to the packet instructions, until tender. Drain if needed, cover and rest for 5 minutes.',
      'Prepare the '+v1+' and '+v2+' into even bite-sized pieces.',
      cookMainThenRest(m),
      vegAfterMain(m,v1,v2),
      p.action,
      'Divide the rice between bowls, add the '+m.label.toLowerCase()+' and vegetables, then '+lower(p.finish)
    ]},
    pasta:{label:'Pasta',photo:'pasta',time:30,base:[['180 g','pasta']],tags:['pasta'],steps:(m,v1,v2,p)=>[
      'Cook the pasta in salted boiling water until al dente, usually 9-12 minutes depending on shape, then reserve a mug of cooking water before draining.',
      'Prepare the '+v1+' and '+v2+' so they are ready to cook.',
      cookMainThenRest(m),
      vegAfterMain(m,v1,v2),
      p.action,
      returnMain(m)+' Add the drained pasta and toss for 1-2 minutes until everything is piping hot and evenly coated, adding 1 tablespoon of reserved cooking water at a time only if the sauce needs loosening, then '+lower(p.finish)
    ]},
    noodles:{label:'Noodles',photo:'noodles',time:25,base:[['2 nests','egg noodles']],tags:['noodles','quick'],steps:(m,v1,v2,p)=>[
      'Bring a medium saucepan of water to the boil. Add the noodles and cook according to the packet instructions, usually 3-5 minutes, until tender with a slight bite, then drain well in a colander.',
      'Slice or chop the '+v1+' and '+v2+' into small pieces for quick cooking.',
      cookMainThenRest(m),
      vegAfterMain(m,v1,v2),
      p.action,
      returnMain(m)+' Add the drained noodles and toss over a medium heat for 1-2 minutes until everything is piping hot and evenly coated, then '+lower(p.finish)
    ]},
    tacos:{label:'Tacos',photo:'tacos',time:25,base:[['6','small tortillas'],['1','lettuce']],tags:['tacos','quick'],steps:(m,v1,v2,p)=>[
      'Prepare the '+v1+', '+v2+' and lettuce, keeping the fresh ingredients separate.',
      cookMainThenRest(m),
      vegAfterMain(m,v1,v2),
      p.action,
      'Warm the tortillas in a dry pan for 20-30 seconds per side until hot and flexible.',
      'Fill the tortillas with the '+tacoMain(m)+', vegetables and lettuce, then '+lower(p.finish)
    ]},
    tray:{label:'Traybake',photo:'tray',time:45,base:[['450 g','baby potatoes']],tags:['oven','traybake'],steps:(m,v1,v2,p)=>[
      'Heat the oven to 200°C fan. Cut the baby potatoes into 2 cm pieces, toss them with 1 tbsp cooking oil, half the salt and half the black pepper, then spread them over a large roasting tray.',
      'Roast the potatoes for 15 minutes. Meanwhile, '+lower(trayMainPrep(m))+' Prepare the '+v1+' and '+v2+' so they are ready to roast.',
      'Add the '+m.ingredient+', '+v1+' and '+v2+' to the hot tray. Add the remaining salt and black pepper, turn everything through the potatoes and spread it into a single layer.',
      'Return the tray to the oven and roast for 10 minutes.',
      trayFlavourStep(p),
      'Roast for another 8-12 minutes, turning the tray once if one side is colouring faster, until '+trayDoneness(m)+' and the vegetables are tender and browned. '+trayFinish(p)
    ]},
    curry:{label:'Curry',photo:'curry',time:40,base:[['150 g','basmati rice'],['1','onion']],tags:['curry','rice'],steps:(m,v1,v2,p)=>[
      'Bring a medium saucepan of water to the boil. Rinse the basmati rice, add it to the pan and cook for about 10-12 minutes until tender, then drain if needed, cover and keep warm.',
      'Finely dice the onion and prepare the '+v1+' and '+v2+' so everything is ready before the pan gets hot.',
      cookMainThenRest(m),
      curryVegStep(v1,v2),
      p.action,
      returnMain(m)+' Turn everything gently through the sauce over a low-medium heat for 2-3 minutes until piping hot and evenly coated. '+p.finish+' Serve with the rice.'
    ]},
    stirfry:{label:'Stir Fry',photo:'noodles',time:30,base:[['150 g','basmati rice']],tags:['stir-fry','quick'],steps:(m,v1,v2,p)=>[
      'Bring a medium saucepan of water to the boil. Rinse the basmati rice, add it to the pan and cook for about 10-12 minutes until tender, then drain if needed, cover and keep warm.',
      'Prepare the '+v1+' and '+v2+' into thin, even pieces so they cook quickly.',
      cookMainThenRest(m),
      vegAfterMain(m,v1,v2),
      p.action,
      returnMain(m)+' Toss everything together over a medium-high heat for 1-2 minutes until piping hot and evenly coated, then serve over the rice and '+lower(p.finish)
    ]},
    couscous:{label:'Couscous Bowl',photo:'couscous',time:30,base:[['120 g','couscous']],tags:['couscous','bowl'],steps:(m,v1,v2,p)=>[
      'Cover the couscous with the amount of boiling water stated on the packet, leave for about 8-10 minutes, then fluff it thoroughly with a fork.',
      'Prepare the '+v1+' and '+v2+' into bite-sized pieces.',
      cookMainThenRest(m),
      vegAfterMain(m,v1,v2),
      p.action,
      'Fold the vegetables through the couscous, top with the '+m.label.toLowerCase()+', then '+lower(p.finish)
    ]},
    orzo:{label:'Orzo',photo:'pasta',time:30,base:[['180 g','orzo']],tags:['orzo','pasta'],steps:(m,v1,v2,p)=>[
      'Bring a medium saucepan of salted water to the boil. Add the orzo and cook for about 8-10 minutes until tender with a little bite, then reserve 4 tablespoons of cooking water and drain in a colander.',
      'Prepare the '+v1+' and '+v2+'.',
      cookMainThenRest(m),
      vegAfterMain(m,v1,v2),
      p.action,
      returnMain(m)+' Fold through the drained orzo and cook for 1-2 minutes until piping hot, adding 1 tablespoon of reserved cooking water at a time only if it needs loosening, then '+lower(p.finish)
    ]},
    stew:{label:'Stew',photo:'soup',time:50,base:[['350 g','potatoes'],['1','onion'],['400 ml','vegetable stock']],tags:['stew','comfort'],steps:(m,v1,v2,p)=>[
      'Finely dice the onion, cut the potatoes into 2 cm pieces and prepare the '+v1+' and '+v2+' into even bite-sized pieces.',
      cookMainThenRest(m),
      'Heat 1 tbsp cooking oil in a large saucepan over a medium heat. Add the onion and cook for 5 minutes, stirring occasionally, until soft and translucent. '+potAction(p),
      returnMain(m)+' Add the potatoes, '+v1+', '+v2+' and vegetable stock. Bring to the boil, then reduce to a gentle simmer.',
      'Part-cover the saucepan and simmer gently for 18-25 minutes, stirring every 5 minutes, until the potatoes and vegetables are completely tender and the stew has thickened.',
      p.finish.charAt(0).toUpperCase()+p.finish.slice(1)
    ]},
    soup:{label:'Soup',photo:'soup',time:40,base:[['1','onion'],['700 ml','vegetable stock']],tags:['soup','lighter'],steps:(m,v1,v2,p)=>[
      'Finely dice the onion and prepare the '+v1+' and '+v2+' into small, even pieces.',
      cookMainThenRest(m),
      'Heat 1 tbsp cooking oil in a large saucepan over a medium heat. Add the onion and cook for 5 minutes, stirring occasionally, until soft and translucent. '+potAction(p),
      returnMain(m)+' Add the '+v1+', '+v2+' and vegetable stock. Bring to the boil, then reduce to a gentle simmer.',
      'Part-cover the saucepan and simmer for 15-20 minutes, stirring occasionally, until the vegetables are completely tender and the soup is piping hot throughout.',
      p.finish.charAt(0).toUpperCase()+p.finish.slice(1)
    ]},
    grainsalad:{label:'Warm Grain Salad',photo:'salad',time:30,base:[['150 g','bulgur wheat']],tags:['grain','salad','lighter'],steps:(m,v1,v2,p)=>[
      'Bring a medium saucepan of water to the boil. Add the bulgur wheat and cook according to the packet instructions, usually 10-12 minutes, until tender but still slightly chewy, then drain well.',
      'Prepare the '+v1+' and '+v2+' into bite-sized pieces.',
      cookMainThenRest(m),
      vegAfterMain(m,v1,v2),
      p.action,
      'Toss the warm grains, vegetables and '+m.label.toLowerCase()+' together, then '+lower(p.finish)
    ]},
    potato:{label:'Loaded Baked Potato',photo:'generic',time:45,base:[['2 large','baking potatoes']],tags:['potato','comfort'],steps:(m,v1,v2,p)=>[
      'Heat the oven to 200°C fan, prick the potatoes and bake for 45-60 minutes until crisp outside and completely soft inside.',
      'Prepare the '+v1+' and '+v2+' while the potatoes bake.',
      cookMainThenRest(m),
      vegAfterMain(m,v1,v2),
      p.action,
      returnMain(m)+' Stir gently so the '+transferName(m)+' is coated with the vegetables and flavouring. Split the potatoes, fluff the centres and spoon the mixture over them, then '+lower(p.finish)
    ]},
    flatbread:{label:'Flatbread',photo:'flatbread',time:25,base:[['2 large','flatbreads']],tags:['flatbread','quick'],steps:(m,v1,v2,p)=>[
      'Prepare the '+v1+' and '+v2+' into small pieces that will sit easily on the flatbreads.',
      cookMainThenRest(m),
      vegAfterMain(m,v1,v2),
      p.action,
      'Warm the flatbreads for 1-2 minutes per side in a dry pan, or briefly in the oven, until soft with lightly toasted edges.',
      'Pile on the '+m.label.toLowerCase()+' and vegetables, then '+lower(p.finish)
    ]},
    stuffed:{label:'Stuffed Peppers',photo:'tray',time:45,base:[['2 large','peppers'],['120 g','basmati rice']],tags:['oven','stuffed'],steps:(m,v1,v2,p)=>[
      'Heat the oven to 190°C fan, halve the peppers and remove the seeds.',
      'Rinse the basmati rice, then cook it in a saucepan of gently boiling water for about 10-12 minutes until tender; drain if needed. While it cooks, prepare the '+v1+' and '+v2+'.',
      cookMainThenRest(m),
      vegAfterMain(m,v1,v2)+' '+p.action+' '+returnMain(m)+' Stir gently until everything is evenly coated.',
      'Mix the cooked rice through the pan mixture, spoon it into the pepper halves and bake for 18-22 minutes until the peppers are tender and the filling is piping hot throughout.',
      'Rest for 2 minutes before serving, then '+lower(p.finish)
    ]},
    onepan:{label:'One Pan Rice',photo:'rice',time:35,base:[['150 g','basmati rice'],['350 ml','vegetable stock']],tags:['rice','one-pan'],steps:(m,v1,v2,p)=>[
      'Rinse the basmati rice and prepare the '+v1+' and '+v2+'.',
      cookMainThenRest(m),
      vegAfterMain(m,v1,v2),
      p.action,
      returnMain(m)+' Stir in the rice and vegetable stock, bring to a gentle simmer, cover and cook over a low heat for 12-15 minutes until the rice is tender and most of the liquid has been absorbed.',
      'Rest off the heat for 5 minutes, fluff with a fork and '+lower(p.finish)
    ]},
    slow:{label:'Slow Cooker Dinner',photo:'soup',time:420,base:[['1','onion'],['400 ml','vegetable stock']],tags:['slow-cooker','batch'],equipment:['slow-cooker'],steps:(m,v1,v2,p)=>[
      'Finely dice the onion and prepare the '+v1+' and '+v2+' into even bite-sized pieces.',
      slowMainStep(m),
      'Add the onion, '+v1+', '+v2+' and vegetable stock to the slow cooker and stir.',
      slowFlavourStep(p),
      'Cover and cook on low for 6-7 hours without lifting the lid repeatedly, until the vegetables are completely tender and any meat is cooked through and tender.',
      'Stir well, make sure everything is piping hot, then '+lower(p.finish)
    ]},
    air:{label:'Air Fryer Bowl',photo:'airfryer',time:35,base:[['150 g','basmati rice']],tags:['air-fryer','quick'],equipment:['air-fryer'],steps:(m,v1,v2,p)=>[
      'Bring a medium saucepan of water to the boil. Rinse the basmati rice, add it to the pan and cook for about 10-12 minutes until tender, then drain if needed, cover and keep warm.',
      airMainPrep(m)+' Prepare the '+v1+' and '+v2+' into even bite-sized pieces.',
      airFlavourStep(m,p),
      airMainStep(m),
      panVegStep(v1,v2,false),
      'Divide the rice between bowls and add the cooked '+transferName(m)+' and vegetables. '+airFinish(p)
    ]},
    bbq:{label:'Barbecue Skewers',photo:'barbecue',time:35,base:[['120 g','couscous']],tags:['barbecue','outdoor'],equipment:['barbecue'],steps:(m,v1,v2,p)=>[
      'Put the couscous in a heatproof bowl, cover with the amount of boiling water stated on the packet, cover and leave for 8-10 minutes, then fluff thoroughly with a fork.',
      bbqPrep(m)+' Prepare the vegetables: '+bbqVegPrep(v1)+', then '+bbqVegPrep(v2)+'.',
      bbqFlavourStep(m,p),
      'Thread the '+transferName(m)+' and vegetables onto skewers, keeping the pieces close but not tightly packed so heat can circulate.',
      bbqCookStep(m),
      'Rest the skewers for 2 minutes, serve them over the couscous. '+bbqFinish(p)
    ]},
    salad:{label:'Warm Salad Bowl',photo:'salad',time:25,base:[['120 g','mixed leaves']],tags:['salad','lighter','quick'],steps:(m,v1,v2,p)=>[
      'Wash and dry the mixed leaves, then prepare the '+v1+' and '+v2+'.',
      cookMainThenRest(m),
      vegAfterMain(m,v1,v2),
      p.action,
      'Arrange the mixed leaves in bowls and add the warm vegetables and '+m.label.toLowerCase()+'.',
      p.finish.charAt(0).toUpperCase()+p.finish.slice(1)
    ]}
  };

  F.formatDefs=formatDefs;
})();