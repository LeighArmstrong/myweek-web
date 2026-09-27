window.MW = window.MW || {};

MW.DAYS=[
  {key:'mon',label:'Monday',short:'Mon'},
  {key:'tue',label:'Tuesday',short:'Tue'},
  {key:'wed',label:'Wednesday',short:'Wed'},
  {key:'thu',label:'Thursday',short:'Thu'},
  {key:'fri',label:'Friday',short:'Fri'},
  {key:'sat',label:'Saturday',short:'Sat'},
  {key:'sun',label:'Sunday',short:'Sun'}
];

MW.RETAILERS=["Sainsbury's","Tesco","Asda","Morrisons","Ocado","Waitrose","Other"];

const P=id=>MW.images.pexels(id);

MW.RECIPES=[
  {
    id:'sticky-beef-noodles',title:'Sticky Beef Noodles',subtitle:'with peppers and spring onion',
    time:25,cost:7.40,servings:2,tags:['beef','asian','quick','noodles'],
    image:P('4368803'),imageSource:'https://www.pexels.com/photo/top-view-photo-of-noodles-with-meat-4368803/',
    ingredients:[['250 g','beef mince'],['2 nests','egg noodles'],['1','red pepper'],['3','spring onions'],['2 tbsp','soy sauce'],['2 tbsp','sweet chilli sauce'],['15 g','fresh ginger'],['2 cloves','garlic'],['1','lime']],
    steps:['Bring a medium saucepan of water to the boil. Add the noodles and cook according to the packet instructions, usually 3-5 minutes, until just tender. Reserve 4 tablespoons of cooking water, then drain well in a colander.','Heat 1 tbsp cooking oil in a large frying pan over a high heat. Add the beef, season with black pepper and cook for 5-7 minutes until deeply browned, breaking it up as it cooks.','Slice the pepper and spring onions. Add the pepper, garlic and ginger and stir fry for 2-3 minutes until the pepper is just tender.','Stir in the soy sauce and sweet chilli sauce with 2 tbsp noodle water and bubble for 1-2 minutes until glossy.','Add the noodles and toss over a high heat for 1 minute until every strand is hot and coated.','Take off the heat, squeeze over lime and finish with the spring onions. Taste before adding any extra salt.']
  },
  {
    id:'chicken-fajita-rice',title:'Chicken Fajita Rice Bowls',subtitle:'with peppers, tomato and yoghurt',
    time:30,cost:7.80,servings:2,tags:['chicken','mexican','rice'],
    image:P('38908930'),imageSource:'https://www.pexels.com/photo/delicious-chicken-rice-bowl-on-terrazzo-table-38908930/',
    ingredients:[['300 g','chicken breast'],['150 g','basmati rice'],['2','peppers'],['2','tomatoes'],['75 g','Greek style yoghurt'],['2 tsp','paprika'],['1 tsp','ground cumin'],['2 cloves','garlic'],['1','lime']],
    steps:['Rinse the rice, then cook for about 10-12 minutes until tender. Drain if needed, cover and rest for 5 minutes.','Slice the chicken and peppers. Toss the chicken with paprika, cumin, salt and black pepper.','Heat 1 tbsp cooking oil in a large frying pan over a medium-high heat. Cook the chicken for 5-6 minutes until browned, then add the peppers and garlic and cook for another 4-5 minutes until the peppers soften and the chicken is fully cooked with no pink remaining.','Dice the tomatoes and toss with half the lime juice and black pepper.','Fluff the rice, divide it between bowls and spoon over the chicken and peppers.','Top with the fresh tomato and yoghurt, then finish with the remaining lime.']
  },
  {
    id:'sausage-tomato-pasta',title:'Speedy Sausage Pasta',subtitle:'with spinach and tomato',
    time:25,cost:8.40,servings:2,tags:['pork','italian','pasta','quick'],
    image:'assets/images/reference/sausage-tomato-pasta/final.jpg',imageSource:'https://www.hellofresh.co.uk/recipes/speedy-sausage-pasta-6023a3512003245a4a2e4d15',
    referenceSource:{name:'HelloFresh UK · Speedy Sausage Pasta',url:'https://www.hellofresh.co.uk/recipes/speedy-sausage-pasta-6023a3512003245a4a2e4d15'},
    ingredients:[['225 g','pork sausage meat'],['200 g','pasta'],['12 ml','balsamic vinegar'],['30 g','tomato puree'],['1 tin','chopped tomatoes'],['1','chicken stock cube'],['100 g','spinach'],['25 g','sun-dried tomato paste'],['40 g','parmesan'],['50 ml','water'],['0.5 tsp','sugar']],
    steps:['Heat 1 tbsp cooking oil in a large frying pan over a medium-high heat. Add the sausage meat and fry for 3-4 minutes until browned, breaking it into rough pieces as it cooks.','Cook the pasta in boiling water with 0.5 tsp salt for about 10-12 minutes, or until al dente. Reserve 4 tablespoons of cooking water, then drain well.','Add the balsamic vinegar to the sausage and let it bubble away for 30 seconds. Stir in the tomato puree and cook for 2 minutes.','Add the chopped tomatoes, crumbled stock cube, sugar and 50 ml water. Bring to the boil, then simmer for 5-6 minutes until thick and rich and the sausage is fully cooked with no pink remaining.','Add the spinach a handful at a time and cook for 2-3 minutes until wilted. Stir in the sun-dried tomato paste and season with black pepper.','Toss through the pasta with half the parmesan. If the sauce is too thick, add 1 tablespoon of reserved pasta water at a time until it coats the pasta easily. Serve with the remaining parmesan.']
  },
  {
    id:'med-chicken-couscous',title:'Mediterranean Chicken Couscous',subtitle:'with colourful vegetables',
    time:35,cost:7.20,servings:2,tags:['chicken','mediterranean','couscous'],
    image:P('31423004'),imageSource:'https://www.pexels.com/photo/delicious-pulled-chicken-meal-with-couscous-31423004/',
    ingredients:[['300 g','chicken breast'],['120 g','couscous'],['1','cucumber'],['2','tomatoes'],['75 g','Greek style yoghurt'],['1','carrot'],['1','lemon'],['2 cloves','garlic'],['2 tsp','mixed herbs']],
    steps:['Put the couscous in a bowl with a pinch of salt, cover with the packet amount of boiling water and leave for 8-10 minutes, then fluff well with a fork.','Season the chicken with mixed herbs, salt and black pepper. Heat 1 tbsp cooking oil in a frying pan and cook the chicken for 6-8 minutes until golden and fully cooked through, adding the garlic for the final minute.','Dice the cucumber and tomatoes and grate or finely slice the carrot while the chicken cooks.','Fold the vegetables through the couscous with half the lemon juice and a little zest.','Rest the chicken for 2 minutes, then slice it over the couscous and spoon over the garlicky pan juices.','Finish with yoghurt, the remaining lemon and plenty of black pepper.']
  },
  {
    id:'beef-tacos',title:'Smoky Beef Tacos',subtitle:'with lettuce and fresh salsa',
    time:25,cost:7.60,servings:2,tags:['beef','mexican','quick','tacos'],
    image:P('2336674'),imageSource:'https://www.pexels.com/photo/food-on-white-paper-2336674/',
    ingredients:[['250 g','beef mince'],['6','small tortillas'],['1','lettuce'],['2','tomatoes'],['1','red onion'],['2 tsp','paprika'],['1 tsp','ground cumin'],['75 g','Greek style yoghurt'],['2 cloves','garlic'],['1','lime']],
    steps:['Heat 1 tbsp cooking oil in a frying pan over a high heat. Add the beef, season with salt and black pepper and cook for 5-7 minutes until deeply browned with no pink remaining, breaking it into small pieces with a wooden spoon as it cooks.','Add the garlic, paprika and cumin and cook for 30 seconds, then add 2 tbsp water and simmer for 1-2 minutes until the beef is juicy but not wet.','Finely shred the lettuce and dice the tomatoes and red onion. Toss the tomato and onion with half the lime juice.','Warm the tortillas in a dry pan for 20-30 seconds per side until hot and flexible.','Fill with the smoky beef, lettuce and fresh tomato salsa.','Finish with yoghurt and the remaining lime, then add black pepper to taste.']
  },
  {
    id:'lemon-salmon-potatoes',title:'Salmon in Lemon, Garlic and Chive Butter',subtitle:'with roast potatoes and broccoli',
    time:45,cost:9.20,servings:2,tags:['pescatarian','fish','potato'],
    image:'assets/images/reference/lemon-salmon-potatoes/final.jpg',imageSource:'https://www.hellofresh.co.uk/recipes/salmon-in-lemon-garlic-and-chive-butter-6304dd0909326eb34e0a07ed',
    referenceSource:{name:'HelloFresh UK · Salmon in Lemon, Garlic and Chive Butter',url:'https://www.hellofresh.co.uk/recipes/salmon-in-lemon-garlic-and-chive-butter-6304dd0909326eb34e0a07ed'},
    ingredients:[['2','salmon fillets'],['450 g','potatoes'],['1','broccoli'],['10 g','fresh chives'],['1 clove','garlic'],['0.5','lemon'],['30 g','butter']],
    steps:['Heat the oven to 200°C fan. Cut the potatoes into 2 cm chunks, toss with 1 tbsp cooking oil, salt and black pepper, and roast for 25-35 minutes until golden, turning halfway.','Chop the chives, zest and quarter the lemon, grate the garlic and cut the broccoli into florets. Toss the broccoli with a little oil, salt and pepper.','When the potatoes have cooked for 15-20 minutes, roast the broccoli for 10-15 minutes until tender with lightly charred edges.','Pat the salmon dry and season. Melt the butter with a small drizzle of oil in a frying pan over a medium-high heat. Cook the salmon skin-side down for 4-5 minutes, turn and cook for 3-4 minutes more.','Add the chives, garlic and half the lemon juice. Spoon the flavoured butter over the salmon for 1-2 minutes, then remove from the heat once the fish is opaque in the centre and flakes easily.','Serve the salmon with the roast potatoes and broccoli. Spoon over the garlic chive butter and finish with lemon zest and the remaining lemon.']
  },
  {
    id:'pork-stir-fry',title:'Honey Soy Pork Stir Fry',subtitle:'with rice and crunchy vegetables',
    time:25,cost:7.50,servings:2,tags:['pork','asian','quick','rice'],
    image:P('17308538'),imageSource:'https://www.pexels.com/photo/a-black-plate-with-food-on-it-and-garnish-17308538/',
    ingredients:[['300 g','pork strips'],['150 g','basmati rice'],['1','red pepper'],['1','carrot'],['1','onion'],['2 tbsp','soy sauce'],['1 tbsp','honey'],['15 g','fresh ginger'],['2 cloves','garlic'],['1','lime']],
    steps:['Rinse the rice, then cook for about 10-12 minutes until tender. Cover and keep warm.','Heat 1 tbsp cooking oil in a wok or large frying pan over a high heat. Season the pork with black pepper and stir fry for 5-6 minutes until browned and cooked through. Remove it briefly if the pan is crowded.','Thinly slice the red pepper and onion, then peel the carrot and cut it into thin matchsticks. Add the red pepper, carrot and onion to the pan and stir fry for 3-4 minutes until just tender but still bright, then add the crushed garlic and finely grated ginger for the final 30 seconds.','Mix the soy sauce, honey and half the lime juice with 2 tbsp water.','Return the pork if needed, pour in the sauce and toss over a high heat for 1-2 minutes until glossy and lightly sticky.','Serve over rice and finish with the remaining lime.']
  },
  {
    id:'roast-chicken-tray',title:'Roast Chicken Tray Dinner',subtitle:'with potatoes and vegetables',
    time:45,cost:8.20,servings:2,tags:['chicken','british','oven','potato'],
    image:P('5956831'),imageSource:'https://www.pexels.com/photo/roasted-chicken-and-potatoes-on-white-ceramic-plate-5956831/',
    ingredients:[['4','chicken thighs'],['600 g','potatoes'],['4','carrots'],['1','broccoli'],['2 tsp','mixed herbs'],['3 cloves','garlic'],['1','lemon']],
    steps:['Heat the oven to 200°C fan. Season the chicken thighs with salt, black pepper and mixed herbs.','Cut the potatoes and carrots into bite-sized pieces and toss with 1 tbsp cooking oil, the garlic, salt and pepper.','Arrange the chicken, potatoes and carrots in one layer and roast for 30-35 minutes, turning the vegetables halfway, until deeply golden and the chicken is fully cooked with no pink remaining.','Steam the broccoli for 5-7 minutes until just tender, then season and squeeze over a little lemon.','Rest the chicken for 5 minutes and toss the potatoes and carrots through the tray juices.','Serve together with the remaining lemon squeezed over the chicken.']
  },
  {
    id:'beef-curry-rice',title:'Mild Beef Curry Rice',subtitle:'with peas and warming spices',
    time:30,cost:7.10,servings:2,tags:['beef','curry','rice'],
    image:P('30700759'),imageSource:'https://www.pexels.com/photo/delicious-japanese-curry-rice-with-pickles-30700759/',
    ingredients:[['250 g','beef mince'],['150 g','basmati rice'],['100 g','frozen peas'],['1','onion'],['1 tin','chopped tomatoes'],['1 tsp','ground cumin'],['2 tsp','garam masala'],['1 tsp','paprika'],['2 cloves','garlic'],['15 g','fresh ginger'],['1 tbsp','tomato puree']],
    steps:['Rinse the rice, then cook for about 10-12 minutes until tender. Cover and keep warm.','Heat 1 tbsp cooking oil in a large frying pan over a medium-high heat. Brown the beef for 5-7 minutes, then add the onion and cook for another 4-5 minutes until soft.','Add the garlic, ginger, cumin, garam masala, paprika and tomato puree and cook for 1 minute until fragrant.','Add the chopped tomatoes and 75 ml water, then simmer for 8-10 minutes until rich, glossy and reduced.','Stir in the peas and cook for 2-3 minutes until piping hot, then taste and season with salt and black pepper.','Fluff the rice and serve with the curry.']
  },
  {
    id:'teriyaki-chicken-rice',title:'Teriyaki Sesame Chicken',subtitle:'with pak choi and basmati rice',
    time:20,cost:8.20,servings:2,tags:['chicken','japanese','rice','quick'],
    image:'assets/images/reference/teriyaki-chicken-rice/final.jpg',imageSource:'https://www.hellofresh.co.uk/recipes/teriyaki-sesame-chicken-66101df2c415e87791185db7',
    referenceSource:{name:'HelloFresh UK · Teriyaki Sesame Chicken',url:'https://www.hellofresh.co.uk/recipes/teriyaki-sesame-chicken-66101df2c415e87791185db7'},
    ingredients:[['260 g','chicken thighs'],['150 g','basmati rice'],['1','red onion'],['2','pak choi'],['1 clove','garlic'],['150 g','teriyaki sauce'],['0.5','red chilli'],['5 g','sesame seeds'],['2 tbsp','water']],
    steps:['Bring a pan of water to the boil with 0.25 tsp salt. Add the rice and cook for 10-12 minutes until tender, then drain, cover and keep warm.','Heat 1 tbsp cooking oil in a large frying pan over a medium-high heat. Add the diced chicken, season with black pepper and stir fry for 5-6 minutes until browned all over.','Thinly slice the red onion. Trim the pak choi, separate the leaves and slice the thicker stems into 2 cm pieces. Add the onion and pak choi stems to the chicken and stir fry for 2-3 minutes, then add the leaves and crushed garlic and cook for another 1 minute until the leaves wilt.','Add the teriyaki sauce and 2 tbsp water. Lower the heat and simmer for 3-4 minutes until the sauce is sticky, the vegetables are tender and the chicken is fully cooked with no pink remaining.','Taste before adding any salt, then stir in the sesame seeds. If the glaze is too thick, stir in 1 tablespoon of water at a time until it coats the chicken and vegetables easily.','Fluff the rice with a fork, spoon over the teriyaki chicken and finish with thinly sliced chilli.']
  },
  {
    id:'creamy-chicken-pasta',title:'Creamy Chicken and Spinach Pasta',subtitle:'with lemon and garlic',
    time:30,cost:7.30,servings:2,tags:['chicken','italian','pasta'],
    image:P('33515064'),imageSource:'https://www.pexels.com/photo/delicious-creamy-chicken-pasta-dish-33515064/',
    ingredients:[['300 g','chicken breast'],['180 g','pasta'],['100 g','spinach'],['150 g','soft cheese'],['1','lemon'],['3 cloves','garlic'],['30 g','parmesan'],['1 tsp','mixed herbs']],
    steps:['Cook the pasta in well salted boiling water for about 9-12 minutes until al dente, reserving a mug of cooking water before draining.','Season the sliced chicken with salt, black pepper and mixed herbs. Heat 1 tbsp cooking oil in a frying pan and cook for 6-8 minutes until deeply golden and fully cooked through.','Add the garlic and cook for 30 seconds until fragrant.','Turn the heat low and stir in the soft cheese with 3-4 tbsp pasta water for 1-2 minutes until smooth and glossy.','Add the spinach and half the parmesan and cook for 1-2 minutes until the spinach has wilted.','Toss through the pasta, finish with lemon juice, zest, the remaining parmesan and plenty of black pepper.']
  },
  {
    id:'halloumi-salad',title:'Halloumi and Chermoula Couscous',subtitle:'with roasted vegetables and lemon dressing',
    time:30,cost:8.10,servings:2,tags:['vegetarian','mediterranean','couscous'],
    image:'assets/images/reference/halloumi-salad/final.jpg',imageSource:'https://www.hellofresh.co.uk/recipes/halloumi-and-chermoula-spiced-couscous-5b7fc816ae08b501c5190282',
    referenceSource:{name:'HelloFresh UK · Halloumi & Chermoula-spiced Couscous',url:'https://www.hellofresh.co.uk/recipes/halloumi-and-chermoula-spiced-couscous-5b7fc816ae08b501c5190282'},
    ingredients:[['250 g','halloumi'],['150 g','couscous'],['2','carrots'],['1','red onion'],['1','lemon'],['20 g','rocket'],['20 g','raisins'],['10 g','fresh coriander'],['2 tsp','chermoula seasoning'],['1','vegetable stock cube'],['2 tbsp','olive oil'],['0.5 tsp','sugar'],['300 ml','water']],
    steps:['Heat the oven to 200°C fan. Cut the carrots and red onion into bite-sized pieces, toss with 1 tbsp olive oil, half the chermoula and a pinch of salt, then roast for 18-20 minutes until golden, turning halfway.','Put the couscous in a bowl with the crumbled stock cube, remaining chermoula and lemon zest. Pour over 300 ml boiling water, cover tightly and leave for 10 minutes.','Chop the coriander. Mix half with 1 tbsp olive oil, half the lemon juice, sugar, salt and black pepper. Drain and slice the halloumi into three pieces per person.','Heat a dry frying pan over a medium-high heat. Fry the halloumi for 3-4 minutes on each side until deeply golden.','Fluff the couscous with a fork, then fold through the rocket, remaining coriander, half the raisins and the rest of the lemon juice. Season to taste.','Fold in the roasted vegetables, top with the halloumi, drizzle over the lemon coriander dressing and finish with the remaining raisins.']
  },
  {
    id:'tofu-veg-stir-fry',title:'Tofu Vegetable Stir Fry',subtitle:'with rice, peppers and broccoli',
    time:25,cost:6.80,servings:2,tags:['vegan','asian','quick','rice'],
    image:P('5848480'),imageSource:'https://www.pexels.com/photo/close-up-photo-of-a-tofu-dish-5848480/',
    ingredients:[['280 g','firm tofu'],['150 g','basmati rice'],['1','red pepper'],['1','broccoli'],['2 tbsp','soy sauce'],['1','lime'],['15 g','fresh ginger'],['2 cloves','garlic'],['1 tbsp','sweet chilli sauce']],
    steps:['Rinse the basmati rice, then cook for about 10-12 minutes until tender. Cover and keep warm.','Pat the tofu very dry, cut it into cubes and season with black pepper. Heat 1 tbsp cooking oil in a frying pan and cook the tofu for 7-9 minutes, turning every couple of minutes, until crisp and golden on several sides.','Slice the red pepper and broccoli, then stir fry over a high heat with the garlic and ginger for 3-4 minutes until just tender.','Add the soy sauce and sweet chilli sauce with 2 tbsp water, return the tofu and toss for 1-2 minutes until glossy.','Serve the tofu and vegetables over the rice and spoon over any sauce left in the pan.','Finish with lime and taste before adding any extra salt.']
  },
  {
    id:'chickpea-couscous',title:'Chickpea Couscous Salad',subtitle:'with tomato, cucumber and lemon',
    time:20,cost:5.90,servings:2,tags:['vegan','mediterranean','quick','couscous'],
    image:P('6947606'),imageSource:'https://www.pexels.com/photo/close-up-photo-of-a-food-on-plate-6947606/',
    ingredients:[['120 g','couscous'],['1 tin','chickpeas'],['2','tomatoes'],['1','cucumber'],['1','red onion'],['1','lemon'],['1 tsp','ground cumin'],['1 tsp','paprika'],['10 g','fresh mint']],
    steps:['Put the couscous in a bowl with a pinch of salt, cover with the packet amount of boiling water and leave for 8-10 minutes, then fluff with a fork.','Drain the chickpeas well and toss them with cumin, paprika, salt and black pepper.','Dice the tomatoes, cucumber and red onion and finely chop the mint.','Fold the vegetables, chickpeas and mint through the couscous for about 1 minute so everything is evenly distributed.','Add the lemon juice and a little zest, then toss well.','Taste and adjust the salt, pepper and lemon before serving.']
  },
  {
    id:'black-bean-tacos',title:'Black Bean Tacos',subtitle:'with avocado, salsa and crunchy lettuce',
    time:20,cost:6.40,servings:2,tags:['vegan','mexican','quick','tacos'],
    image:P('5848714'),imageSource:'https://www.pexels.com/photo/scrumptious-tacos-on-a-plate-5848714/',
    ingredients:[['1 tin','black beans'],['6','small tortillas'],['1','avocado'],['2','tomatoes'],['1','lettuce'],['1','lime'],['1 tsp','ground cumin'],['1 tsp','paprika'],['2 cloves','garlic']],
    steps:['Drain the black beans, then warm them with the garlic, cumin, paprika and 3 tbsp water over a medium heat for 4-5 minutes until piping hot and lightly saucy. Season to taste.','Dice the tomatoes, shred the lettuce and season the tomatoes with a squeeze of lime and black pepper.','Mash the avocado with a little lime juice, salt and black pepper.','Warm the tortillas in a dry pan for 20-30 seconds per side until soft and flexible.','Fill each tortilla with the seasoned beans, lettuce, tomato and avocado.','Finish with the remaining lime and serve straight away.']
  },
  {
    id:'tomato-lentil-pasta',title:'Tomato Lentil Pasta',subtitle:'with spinach, garlic and herbs',
    time:30,cost:5.70,servings:2,tags:['vegan','italian','pasta'],
    image:P('19037599'),imageSource:'https://www.pexels.com/photo/fusilli-pasta-with-tomato-and-basil-19037599/',
    ingredients:[['180 g','pasta'],['100 g','red lentils'],['1 tin','chopped tomatoes'],['100 g','spinach'],['3 cloves','garlic'],['2 tsp','mixed herbs'],['1 tbsp','tomato puree']],
    steps:['Cook the pasta in well salted boiling water for about 9-12 minutes until al dente, reserving a mug of cooking water before draining.','Rinse the red lentils well.','Heat 1 tbsp cooking oil in a saucepan. Cook the garlic, tomato puree and mixed herbs for 1 minute, then add the chopped tomatoes and lentils.','Add 300 ml water and simmer gently for 15-20 minutes until the lentils are soft and the sauce is thick and rich. If the pan begins to dry before the lentils are tender, add 1 tablespoon of water at a time.','Stir in the spinach and cook for 1-2 minutes until wilted, then taste and season with salt and black pepper.','Toss with the pasta, adding 1 tablespoon of reserved pasta water at a time only if needed to make the sauce cling.']
  },
  {
    id:'coconut-chickpea-curry',title:'Coconut Chickpea and Spinach Curry',subtitle:'with fragrant basmati rice',
    time:35,cost:7.20,servings:2,tags:['vegan','curry','rice'],
    image:'assets/images/reference/coconut-chickpea-curry/final.jpg',imageSource:'https://www.bbcgoodfood.com/recipes/coconut-chickpea-spinach-curry',
    referenceSource:{name:'Good Food · Chickpea & spinach curry',url:'https://www.bbcgoodfood.com/recipes/coconut-chickpea-spinach-curry'},
    ingredients:[['150 g','basmati rice'],['1 tbsp','cooking oil'],['1','onion'],['2 cloves','garlic'],['0.5 tsp','turmeric'],['2 tsp','ground cumin'],['1 tbsp','garam masala'],['0.5 tsp','chilli powder'],['400 ml','coconut milk'],['1 tin','chickpeas'],['2','whole cloves'],['0.25 tsp','ground cinnamon'],['100 g','spinach'],['1','lime']],
    steps:['Rinse the rice in cold water and set aside. Heat half the oil in a deep frying pan and cook the onion over a medium heat for about 8-10 minutes until soft.','Add the garlic and cook for 1 minute. Stir in the turmeric, cumin, garam masala and chilli powder and toast for 30 seconds until fragrant.','Add the coconut milk and drained chickpeas. Bring to a gentle simmer and cook for 15 minutes until the sauce has reduced slightly.','Meanwhile, heat the remaining oil in a saucepan with the cloves and cinnamon for about 30 seconds. Add the drained rice and stir to coat, then add 300 ml boiling water, cover and simmer gently for about 10 minutes without lifting the lid.','Stir the spinach into the curry for the final 4-5 minutes until wilted and piping hot. Season with salt and black pepper.','Fluff the rice, remove the whole cloves if visible, then serve with the curry and finish with lime juice to balance the coconut.']
  },
  {
    id:'roasted-veg-hummus',title:'Roasted Vegetable Hummus Bowls',subtitle:'with potatoes, peppers and lemon',
    time:35,cost:6.30,servings:2,tags:['vegan','mediterranean','oven'],
    image:P('6541642'),imageSource:'https://www.pexels.com/photo/close-up-shot-of-a-hummus-in-a-bowl-6541642/',
    ingredients:[['500 g','baby potatoes'],['1','red pepper'],['1','courgette'],['1','red onion'],['150 g','hummus'],['1','lemon'],['1 tsp','ground cumin'],['1 tsp','paprika']],
    steps:['Heat the oven to 200°C fan.','Cut the baby potatoes into 2 cm pieces, toss with 1 tbsp cooking oil, cumin, paprika, salt and black pepper, then roast for 20 minutes.','Add the sliced red pepper, courgette and red onion, toss through the spiced tray juices and roast for another 15-18 minutes until the potatoes are tender and the vegetables are caramelised at the edges.','Loosen the hummus with half the lemon juice and 1-2 tbsp water, then divide it between bowls.','Pile the hot roasted vegetables over the hummus and spoon over any crisp, spiced bits from the tray.','Finish with the remaining lemon and plenty of black pepper.']
  },
  {
    id:'warm-chickpea-potato-tray',title:'Warm Chickpea and Potato Tray',subtitle:'with peppers, spinach and lemon',
    time:35,cost:5.80,servings:2,tags:['vegan','mediterranean','oven','potato'],
    image:P('6541639'),imageSource:'https://www.pexels.com/photo/chickpeas-and-vegetables-on-a-tray-6541639/',
    ingredients:[['500 g','baby potatoes'],['1 tin','chickpeas'],['1','red pepper'],['100 g','spinach'],['1','lemon'],['2 tsp','paprika'],['1 tsp','ground cumin'],['2 cloves','garlic']],
    steps:['Heat the oven to 200°C fan.','Cut the baby potatoes into 2 cm pieces and toss with 1 tbsp cooking oil, paprika, cumin, salt and black pepper, then roast for 20-25 minutes until almost tender.','Drain the chickpeas well, slice the red pepper and finely chop the garlic.','Add the chickpeas, red pepper and garlic to the tray, toss through the spiced oil and roast for another 12-15 minutes until the potatoes are tender and the chickpeas have crisp edges.','Fold through the spinach for 1 minute so it starts to wilt in the residual heat.','Finish with lemon juice and zest, taste and adjust the seasoning.']
  },
  {
    id:'lentil-tomato-rice-bowl',title:'Tomato Lentil Rice Bowls',subtitle:'with spinach and warming spices',
    time:30,cost:5.60,servings:2,tags:['vegan','rice','quick','curry'],
    image:P('6544380'),imageSource:'https://www.pexels.com/photo/lentil-curry-with-rice-6544380/',
    ingredients:[['150 g','basmati rice'],['120 g','red lentils'],['1 tin','chopped tomatoes'],['100 g','spinach'],['1','onion'],['1 tsp','ground cumin'],['2 tsp','garam masala'],['2 cloves','garlic'],['15 g','fresh ginger'],['1 tbsp','tomato puree'],['1','lime']],
    steps:['Rinse the basmati rice, then cook for about 10-12 minutes until tender. Cover and keep warm.','Dice the onion and cook in 1 tbsp cooking oil over a medium heat for 5-7 minutes until soft and lightly golden.','Add the garlic, ginger, cumin, garam masala and tomato puree and cook for 1 minute until fragrant.','Add the red lentils, chopped tomatoes and 300 ml water, then simmer gently for 15-20 minutes until the lentils are soft and creamy.','Stir in the spinach and cook for 1-2 minutes until wilted, then season with salt and black pepper.','Serve over the rice and finish with lime juice.']
  }
];

const CORE_PANTRY=[
  ['1 tbsp','cooking oil',/\b(?:cooking )?oil\b/],
  ['0.5 tsp','salt',/\bsalt\b/],
  ['0.25 tsp','black pepper',/\bblack pepper\b/]
];
MW.RECIPES.forEach(r=>{
  const existing=new Set((r.ingredients||[]).map(x=>String(x[1]).toLowerCase()));
  const methodText=(r.steps||[]).join(' ').toLowerCase();
  CORE_PANTRY.forEach(row=>{if(row[2].test(methodText)&&!existing.has(row[1])) r.ingredients.push([row[0],row[1]]);});
});

MW.LUNCHES=[
  {
    id:'chicken-pasta-lunch',title:'Creamy Chicken Pasta Prep',subtitle:'Easy make-ahead portions',servings:5,cost:8.50,time:25,prepStyle:'cook',light:false,tags:['chicken','pasta'],
    image:P('10165873'),imageSource:'https://www.pexels.com/photo/cooked-pasta-with-meat-on-white-ceramic-plate-10165873/',
    ingredients:[['500 g','chicken breast'],['400 g','pasta'],['200 g','spinach'],['200 g','soft cheese'],['1','lemon'],['2 cloves','garlic']]
  },
  {
    id:'wrap-lunch',title:'Chicken Crunch Wrap Prep',subtitle:'Fresh, quick and portable',servings:5,cost:8.00,time:15,prepStyle:'quick',light:true,tags:['chicken','wrap','quick'],
    image:P('29535635'),
    imageSource:'https://www.pexels.com/photo/healthy-chicken-wrap-with-fresh-vegetables-29535635/',
    ingredients:[['500 g','chicken breast'],['5','large wraps'],['1','lettuce'],['2','tomatoes'],['150 g','Greek style yoghurt']]
  },
  {
    id:'couscous-lunch',title:'Roasted Vegetable Couscous Boxes',subtitle:'Colourful make-ahead lunches',servings:5,cost:6.50,time:15,prepStyle:'quick',light:true,tags:['vegetarian','couscous','quick'],
    image:P('37520728'),imageSource:'https://www.pexels.com/photo/healthy-salad-and-couscous-bowl-on-wooden-table-37520728/',
    ingredients:[['350 g','couscous'],['2','peppers'],['2','carrots'],['1','red onion'],['200 g','Greek style yoghurt']]
  },
  {
    id:'rice-bowl-lunch',title:'Chicken Rice Bowl Prep',subtitle:'Filling bowls for the week',servings:5,cost:8.50,time:25,prepStyle:'cook',light:false,tags:['chicken','rice'],
    image:P('2781537'),imageSource:'https://www.pexels.com/photo/close-up-of-food-in-bowl-2781537/',
    ingredients:[['500 g','chicken breast'],['375 g','basmati rice'],['2','peppers'],['1 tin','sweetcorn'],['150 g','Greek style yoghurt']]
  },
  {
    id:'yoghurt-fruit-pots',title:'Yoghurt and Fruit Pots',subtitle:'No cooking, light and quick',servings:5,cost:6.50,time:5,prepStyle:'no-cook',light:true,tags:['vegetarian','no-cook','light'],
    image:P('31472330'),imageSource:'https://www.pexels.com/photo/delicious-breakfast-yogurt-bowl-with-fruits-31472330/',
    ingredients:[['750 g','Greek style yoghurt'],['5','bananas'],['300 g','mixed berries'],['150 g','oats'],['5 tsp','honey']]
  },
  {
    id:'hummus-crunch-wraps',title:'Hummus Crunch Wraps',subtitle:'Plant-based, fresh and no-cook',servings:5,cost:6.80,time:10,prepStyle:'no-cook',light:true,tags:['vegan','wrap','no-cook','light'],
    image:P('3872385'),imageSource:'https://www.pexels.com/photo/photo-of-sliced-tomatoes-on-pita-bread-3872385/',
    ingredients:[['5','large wraps'],['250 g','hummus'],['1','cucumber'],['2','tomatoes'],['2','carrots'],['100 g','spinach']]
  },
  {
    id:'overnight-oats-berries',title:'Overnight Oats and Berries',subtitle:'Make ahead in five minutes',servings:5,cost:6.20,time:5,prepStyle:'no-cook',light:true,tags:['vegetarian','oats','no-cook','light'],
    image:P('27850091'),imageSource:'https://www.pexels.com/photo/a-bowl-of-oatmeal-with-berries-and-milk-27850091/',
    ingredients:[['300 g','oats'],['750 ml','skimmed milk'],['250 g','Greek style yoghurt'],['300 g','mixed berries'],['2','bananas']]
  },
  {
    id:'chickpea-couscous-jars',title:'Chickpea Couscous Jars',subtitle:'Light plant-based lunch prep',servings:5,cost:6.40,time:15,prepStyle:'quick',light:true,tags:['vegan','couscous','light','quick'],
    image:P('9692057'),imageSource:'https://www.pexels.com/photo/a-bowl-of-salad-9692057/',
    ingredients:[['300 g','couscous'],['2 tins','chickpeas'],['1','cucumber'],['3','tomatoes'],['1','red onion'],['2','lemons']]
  },
  {
    id:'tuna-cucumber-wraps',title:'Tuna and Cucumber Wraps',subtitle:'No-cook pescatarian lunch',servings:5,cost:7.20,time:10,prepStyle:'no-cook',light:true,tags:['pescatarian','wrap','no-cook','light'],
    image:P('9026808'),
    imageSource:'https://www.pexels.com/photo/green-leaves-on-white-ceramic-plate-9026808/',
    ingredients:[['3 tins','tuna'],['5','large wraps'],['1','cucumber'],['1','lettuce'],['150 g','Greek style yoghurt'],['1','lemon']]
  },
  {
    id:'chickpea-crunch-salad',title:'Chickpea Crunch Salad',subtitle:'No-cook, light and plant-based',servings:5,cost:5.90,time:10,prepStyle:'no-cook',light:true,tags:['vegan','no-cook','light','gluten-free'],
    image:P('6066051'),imageSource:'https://www.pexels.com/photo/close-up-shot-of-a-chickpea-salad-6066051/',
    ingredients:[['2 tins','chickpeas'],['1','cucumber'],['3','tomatoes'],['2','carrots'],['1','red pepper'],['2','lemons']]
  }
];

MW.EXTRA_SUGGESTIONS=[
  {name:'Bread',category:'Regulars',estimatedCost:1.35},
  {name:'Eggs',category:'Regulars',estimatedCost:2.50},
  {name:'Cereal',category:'Regulars',estimatedCost:3.00},
  {name:'Cheese',category:'Regulars',estimatedCost:2.75},
  {name:'Ice cream',category:'Desserts',estimatedCost:3.00},
  {name:'Chocolate',category:'Desserts',estimatedCost:2.25},
  {name:'Cake',category:'Desserts',estimatedCost:3.00},
  {name:'Pastries',category:'Desserts',estimatedCost:2.50},
  {name:'Crisps',category:'Snacks',estimatedCost:2.00},
  {name:'Biscuits',category:'Snacks',estimatedCost:1.75},
  {name:'Soft drinks',category:'Drinks',estimatedCost:2.25},
  {name:'Fruit juice',category:'Drinks',estimatedCost:2.00},
  {name:'Washing up liquid',category:'Household',estimatedCost:2.00},
  {name:'Surface cleaner',category:'Household',estimatedCost:2.00},
  {name:'Toilet roll',category:'Household',estimatedCost:4.50},
  {name:'Laundry detergent',category:'Household',estimatedCost:5.00}
];

MW.SAVING_FRIENDLY=[
  'pasta','basmati rice','chopped tomatoes','greek style yoghurt','soft cheese',
  'tortillas','frozen peas','couscous','milk','yoghurts'
];