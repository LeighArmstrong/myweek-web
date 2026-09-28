window.MW = window.MW || {};
(function(){
  const P=id=>MW.images.pexels(id);
  const pexels=(id,url)=>({image:P(id),imageSource:url,imageLicense:'Pexels License'});
  const original={recipeSource:'My Week original',recipeProvenance:'Curated locally for My Week'};

  MW.CURATED_RECIPES=[
    {
      id:'slow-cooker-beef-stew',title:'Slow Cooker Beef and Root Veg Stew',subtitle:'with carrots, potatoes and rich tomato gravy',time:480,cost:9.20,servings:4,
      tags:['beef','british','slow-cooker','batch','comfort'],requiredEquipment:['slow-cooker'],
      ...pexels('10692537','https://www.pexels.com/photo/cooked-food-on-white-ceramic-bowl-10692537/'),...original,
      ingredients:[['500 g','diced beef'],['500 g','potatoes'],['3','carrots'],['1','onion'],['2','celery sticks'],['2 tbsp','tomato puree'],['2 tbsp','Worcestershire sauce'],['500 ml','beef stock'],['1 tsp','mixed herbs'],['1 tbsp','plain flour'],['1 tbsp','cornflour']],
      steps:['Cut the potatoes and carrots into even bite-sized pieces and dice the onion and celery.','Season the beef, toss with the plain flour and brown in 1 tbsp cooking oil over a high heat for 6-8 minutes in batches.','Lower the heat and cook the onion and celery for 5 minutes. Stir in the tomato puree and Worcestershire sauce and cook for 1 minute, scraping up the browned bits.','Transfer everything to the slow cooker with the potatoes, carrots, beef stock and mixed herbs. Stir well, cover and cook on low for 7-8 hours until the beef is very tender.','For a thicker gravy, mix the cornflour with 2 tbsp cold water, stir it in and cook on high for another 20-30 minutes.','Taste the gravy, add black pepper and only add extra salt if needed because the stock and Worcestershire sauce are already seasoned.']
    },
    {
      id:'slow-cooker-coconut-chicken-curry',title:'Slow Cooker Coconut Chicken Curry',subtitle:'with tomato, spinach and warming spices',time:390,cost:8.60,servings:4,
      tags:['chicken','indian-inspired','slow-cooker','curry','batch'],requiredEquipment:['slow-cooker'],
      ...pexels('7353487','https://www.pexels.com/photo/chicken-curry-in-a-bowl-7353487/'),...original,
      ingredients:[['600 g','chicken thighs'],['1','onion'],['4 cloves','garlic'],['25 g','fresh ginger'],['1 tin','chopped tomatoes'],['400 ml','coconut milk'],['2 tbsp','curry paste'],['1 tsp','ground cumin'],['300 g','sweet potato'],['150 g','spinach'],['150 g','basmati rice'],['10 g','fresh coriander'],['1','lime']],
      steps:['Dice the onion, grate the garlic and ginger, cut the chicken thighs into large pieces and chop the sweet potato into 2 cm chunks.','For deeper flavour, heat 1 tbsp cooking oil in a frying pan. Cook the onion for 6-8 minutes, add the chicken and sear for 3-4 minutes, then add the garlic, ginger, curry paste and cumin for 1 minute.','Transfer to the slow cooker with the chopped tomatoes, coconut milk and sweet potato. Cover and cook on low for 6-8 hours, until the chicken is tender and fully cooked through.','Rinse the basmati rice and cook for about 10-12 minutes shortly before you are ready to eat. Cover and rest for 5 minutes.','Stir the spinach through the curry for the final 5 minutes until wilted. Taste and adjust the salt, black pepper and lime.','Serve over the rice and finish with chopped coriander and the remaining lime.']
    },
    {
      id:'air-fryer-miso-salmon-bowl',title:'Air Fryer Miso Salmon Rice Bowls',subtitle:'with cucumber, carrot and sticky soy glaze',time:30,cost:10.20,servings:2,
      tags:['fish','asian-inspired','air-fryer','rice','quick'],requiredEquipment:['air-fryer'],
      ...pexels('36964109','https://www.pexels.com/photo/salmon-and-rice-bowl-with-fresh-cilantro-36964109/'),...original,
      ingredients:[['2','salmon fillets'],['150 g','basmati rice'],['1 tbsp','miso paste'],['1 tbsp','soy sauce'],['1 tsp','honey'],['1','carrot'],['0.5','cucumber'],['1','lime']],
      steps:['Rinse the basmati rice and cook for about 10-12 minutes until tender, then cover and keep warm.','Mix the miso paste, soy sauce and honey with 1 tsp warm water, then brush it evenly over the salmon fillets.','Air fry the salmon at 190°C for 8-11 minutes, depending on thickness, until the glaze is caramelised and the centre is just opaque and flakes easily.','Peel the carrot into ribbons and slice the cucumber while the salmon cooks. Season the vegetables with a little lime juice.','Rest the salmon for 2 minutes. Divide the rice between bowls and add the cucumber and carrot.','Place the salmon on top, spoon over any glaze juices and finish with the remaining lime.']
    },
    {
      id:'bbq-lemon-chicken-skewers',title:'Barbecue Lemon Herb Chicken Skewers',subtitle:'with peppers, couscous and cooling yoghurt',time:35,cost:8.30,servings:2,
      tags:['chicken','barbecue','mediterranean','couscous'],requiredEquipment:['barbecue'],
      ...pexels('37667711','https://www.pexels.com/photo/grilled-chicken-skewers-on-outdoor-barbecue-37667711/'),...original,
      ingredients:[['350 g','chicken breast'],['2','peppers'],['1','red onion'],['1','lemon'],['2 tsp','mixed herbs'],['2 cloves','garlic'],['1 tbsp','olive oil'],['120 g','couscous'],['100 g','Greek style yoghurt']],
      steps:['Cut the chicken, peppers and red onion into similar 3 cm pieces.','Mix half the lemon juice and zest with the mixed herbs, garlic, olive oil, salt and black pepper. Toss with the chicken and vegetables, then thread onto skewers.','Prepare the couscous with the packet amount of boiling water, cover for 8-10 minutes, then fluff with a fork.','Barbecue the skewers over a medium-high heat for 10-12 minutes, turning every 2-3 minutes, until charred at the edges and the chicken is fully cooked with no pink remaining.','Rest the skewers for 2 minutes. Stir the remaining lemon juice through the yoghurt and season with black pepper.','Serve the skewers over couscous with the lemon yoghurt.']
    },
    {
      id:'roasted-tomato-lentil-soup',title:'Roasted Tomato and Red Lentil Soup',subtitle:'with garlic, basil and a smooth finish',time:45,cost:5.40,servings:4,
      tags:['vegan','soup','lighter','batch','blender'],requiredEquipment:['blender'],
      ...pexels('27098516','https://www.pexels.com/photo/bowl-of-tomato-soup-27098516/'),...original,
      ingredients:[['800 g','tomatoes'],['1','red onion'],['1 bulb','garlic'],['120 g','red lentils'],['700 ml','vegetable stock'],['10 g','fresh basil'],['1 tbsp','tomato puree'],['1 tbsp','olive oil']],
      steps:['Heat the oven to 200°C fan. Cut the tomatoes and red onion into chunks, halve the garlic bulb and drizzle everything with the olive oil, salt and black pepper.','Roast for 30-35 minutes until the tomatoes have collapsed and browned at the edges and the garlic is soft.','Rinse the red lentils. Cook the tomato puree in a saucepan for 1 minute, then add the lentils, vegetable stock and basil stalks and bring to a simmer.','Simmer for 15-18 minutes until the lentils are soft, then squeeze in the roasted garlic and add the roasted tomatoes and onion.','Remove any tough basil stalks and blend until as smooth as you like, adding hot water a little at a time if it is too thick.','Taste, season with salt and black pepper and finish with the basil leaves.']
    },
    {
      id:'pressure-cooker-chickpea-curry',title:'Pressure Cooker Chickpea and Spinach Curry',subtitle:'with tomato, coconut and lime',time:28,cost:6.10,servings:4,
      tags:['vegan','curry','pressure-cooker','batch','quick'],requiredEquipment:['pressure-cooker'],
      ...pexels('6544375','https://www.pexels.com/photo/food-healthy-beans-dinner-6544375/'),...original,
      ingredients:[['2 tins','chickpeas'],['1','onion'],['3 cloves','garlic'],['20 g','fresh ginger'],['1 tin','chopped tomatoes'],['200 ml','coconut milk'],['2 tsp','garam masala'],['1 tsp','ground cumin'],['0.5 tsp','chilli powder'],['1 tbsp','tomato puree'],['150 g','spinach'],['1','lime']],
      steps:['Dice the onion, grate the garlic and ginger and drain the chickpeas.','Use the sauté setting with 1 tbsp cooking oil to cook the onion for 5-6 minutes. Add the garlic, ginger, garam masala, cumin, chilli powder and tomato puree and cook for 1 minute.','Add the chickpeas, chopped tomatoes, coconut milk and 100 ml water, scraping the base completely clean before sealing the lid.','Pressure cook on high for 6 minutes, then carefully release the pressure according to your cooker instructions.','Stir in the spinach and simmer on sauté for 2-3 minutes until wilted and the sauce is as thick as you like.','Finish with lime, taste and season with salt and black pepper before serving.']
    },
    {
      id:'greek-chickpea-feta-salad',title:'Greek Chickpea and Feta Salad',subtitle:'with cucumber, tomato, olives and lemon',time:15,cost:6.70,servings:2,
      tags:['vegetarian','mediterranean','no-cook','lighter','quick'],
      ...pexels('19295808','https://www.pexels.com/photo/greek-salad-in-a-bowl-19295808/'),...original,
      ingredients:[['1 tin','chickpeas'],['0.5','cucumber'],['250 g','tomatoes'],['80 g','feta'],['60 g','olives'],['0.5','red onion'],['1','lemon'],['1 tbsp','olive oil'],['1 tsp','oregano']],
      steps:['Drain and rinse the chickpeas, then leave them for 5 minutes so excess water runs off.','Dice the cucumber and tomatoes and finely slice the red onion.','Whisk the lemon juice with the olive oil, oregano, salt and black pepper until emulsified.','Toss the chickpeas, cucumber, tomatoes, onion and olives with the dressing for about 30 seconds so everything is evenly coated.','Crumble the feta over the top and add another grind of black pepper.','Serve straight away, or chill for 10-15 minutes if you prefer the flavours slightly more settled.']
    },
    {
      id:'mushroom-spinach-risotto',title:'Mushroom and Spinach Risotto',subtitle:'with parmesan, garlic and lemon',time:40,cost:7.10,servings:2,
      tags:['vegetarian','italian','rice','comfort'],
      ...pexels('15667778','https://www.pexels.com/photo/risotto-in-pan-15667778/'),...original,
      ingredients:[['180 g','risotto rice'],['250 g','mushrooms'],['1','onion'],['2 cloves','garlic'],['700 ml','vegetable stock'],['80 g','spinach'],['40 g','parmesan'],['25 g','butter'],['10 g','fresh parsley'],['0.5','lemon']],
      steps:['Slice the mushrooms, dice the onion, finely chop the garlic and keep the stock hot in a separate pan.','Melt half the butter with 1 tbsp cooking oil. Fry the mushrooms over a medium-high heat for 5-7 minutes until well browned, then scoop half onto a plate for the topping.','Lower the heat, cook the onion for 5 minutes, then add the garlic and risotto rice and stir for 1 minute until the grains look slightly translucent at the edges.','Add the hot stock a ladle at a time over 20-25 minutes, stirring often and allowing each addition to absorb before adding the next, until the rice is creamy with a little bite.','Stir in the spinach for 2-3 minutes until wilted, then add the remaining butter, half the parmesan, parsley and lemon juice. Taste and season.','Rest off the heat for 2 minutes, then top with the reserved mushrooms and remaining parmesan and serve immediately.']
    },
    {
      id:'garlic-prawn-tomato-pasta',title:'Garlic Prawn and Tomato Pasta',subtitle:'with lemon, chilli and parsley',time:25,cost:9.30,servings:2,
      tags:['pescatarian','seafood','italian','pasta','quick'],
      ...pexels('31779535','https://www.pexels.com/photo/delicious-shrimp-pasta-in-elegant-bowl-31779535/'),...original,
      ingredients:[['180 g','spaghetti'],['220 g','raw king prawns'],['250 g','cherry tomatoes'],['3 cloves','garlic'],['0.5 tsp','chilli flakes'],['1','lemon'],['10 g','fresh parsley'],['1 tbsp','olive oil']],
      steps:['Cook the spaghetti in well-salted boiling water for about 9-11 minutes until al dente, reserving a mug of pasta water before draining.','Halve the cherry tomatoes, finely chop the garlic and parsley and pat the prawns dry.','Warm the olive oil over a medium heat. Cook the garlic and chilli flakes for 30 seconds, then add the tomatoes and cook for 4-5 minutes until they start to collapse.','Add the prawns and cook for 2-3 minutes, turning once, until pink, opaque and piping hot.','Toss in the drained spaghetti with the lemon juice and 3-4 tbsp pasta water for 1 minute until glossy and well coated.','Take off the heat, fold through the parsley, taste and adjust the salt, black pepper and lemon before serving.']
    },
    {
      id:'red-lentil-dal-lime-rice',title:'Red Lentil Dal with Lime Rice',subtitle:'with tomato, spinach and cumin',time:35,cost:5.80,servings:2,
      tags:['vegan','indian-inspired','rice','lighter','batch'],
      ...pexels('8996219','https://www.pexels.com/photo/meal-with-rice-on-plate-8996219/'),...original,
      ingredients:[['150 g','red lentils'],['150 g','basmati rice'],['1','onion'],['1 tin','chopped tomatoes'],['1 tsp','ground cumin'],['0.5 tsp','turmeric'],['1 tsp','garam masala'],['0.25 tsp','chilli powder'],['20 g','fresh ginger'],['2 cloves','garlic'],['100 g','spinach'],['1','lime']],
      steps:['Rinse the red lentils and basmati rice separately.','Cook the basmati rice for about 10-12 minutes until tender, then cover and rest for 5 minutes before fluffing with a fork.','Heat 1 tbsp cooking oil in a saucepan. Cook the diced onion for 5-7 minutes until golden, then add the ginger, garlic, cumin, turmeric, garam masala and chilli powder for 30-60 seconds until fragrant.','Add the red lentils, chopped tomatoes and 350 ml water. Simmer gently for 18-22 minutes until the lentils are soft and creamy, stirring occasionally.','Fold in the spinach and cook for 1-2 minutes until wilted. Add a splash of water if the dal is thicker than you like, then season with salt and black pepper.','Finish with lime juice and serve with the rice.']
    }
  ];

  const pantryBasics=[
    ['1 tbsp','cooking oil',/\b(?:cooking )?oil\b/],
    ['0.5 tsp','salt',/\bsalt\b/],
    ['0.25 tsp','black pepper',/\bblack pepper\b/]
  ];
  MW.CURATED_RECIPES.forEach(r=>{
    const existing=new Set((r.ingredients||[]).map(x=>String(x[1]).toLowerCase()));
    const methodText=(r.steps||[]).join(' ').toLowerCase();
    pantryBasics.forEach(row=>{if(row[2].test(methodText)&&!existing.has(row[1])) r.ingredients.push([row[0],row[1]]);});
    MW.RECIPES.push(r);
  });
  MW.RECIPES.forEach(r=>{
    if(!r.recipeSource) r.recipeSource='My Week original';
    if(!r.recipeProvenance) r.recipeProvenance='Curated locally for My Week';
    if(!r.imageLicense && /^https:\/\/www\.pexels\.com\//.test(String(r.imageSource||''))) r.imageLicense='Pexels License';
  });
})();