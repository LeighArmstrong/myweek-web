window.MW = window.MW || {};
(function(){
  const mains=[
    {id:'chicken-breast',label:'Chicken',ingredient:'chicken breast',qty:'300 g',kind:'meat',cook:'Season the chicken with salt and black pepper. Cook in a large frying pan over a medium-high heat for 6-8 minutes, turning occasionally, until deeply golden outside and fully cooked through with no pink remaining.'},
    {id:'chicken-thighs',label:'Chicken Thigh',ingredient:'boneless chicken thighs',qty:'350 g',kind:'meat',cook:'Season the chicken thighs with salt and black pepper. Cook in a large frying pan over a medium-high heat for 8-10 minutes, turning occasionally, until well browned outside and completely cooked through with no pink remaining.'},
    {id:'turkey-mince',label:'Turkey',ingredient:'turkey mince',qty:'300 g',kind:'meat',cook:'Season the turkey mince with salt and black pepper, then cook in a large frying pan over a high heat for 5-7 minutes, breaking it into small pieces with a wooden spoon, until browned and completely cooked through.'},
    {id:'beef-mince',label:'Beef',ingredient:'beef mince',qty:'300 g',kind:'meat',cook:'Season the beef mince with salt and black pepper, then cook in a large frying pan over a high heat for 5-7 minutes, breaking it into small pieces with a wooden spoon, until deeply browned with no pink remaining.'},
    {id:'beef-strips',label:'Beef Strip',ingredient:'beef strips',qty:'300 g',kind:'meat',cook:'Season the beef strips with salt and black pepper, then sear in a large frying pan over a high heat for 2-4 minutes, turning once or twice, until well browned and cooked to your liking.'},
    {id:'pork-mince',label:'Pork',ingredient:'pork mince',qty:'300 g',kind:'meat',cook:'Season the pork mince with salt and black pepper, then cook in a large frying pan over a medium-high heat for 5-7 minutes, breaking it into small pieces with a wooden spoon, until deeply browned with no pink remaining and piping hot throughout.'},
    {id:'pork-strips',label:'Pork Strip',ingredient:'pork strips',qty:'300 g',kind:'meat',cook:'Season the pork strips with salt and black pepper, then stir fry in a large frying pan over a high heat for 5-6 minutes, turning regularly, until browned and completely cooked through.'},
    {id:'lamb-mince',label:'Lamb',ingredient:'lamb mince',qty:'300 g',kind:'meat',cook:'Season the lamb mince with salt and black pepper, then cook in a large frying pan over a high heat for 5-7 minutes, breaking it into small pieces with a wooden spoon, until well browned with no pink remaining.'},
    {id:'salmon',label:'Salmon',ingredient:'salmon fillets',qty:'2',kind:'fish',cook:'Pat the salmon dry and season with salt and black pepper. Cook skin-side down in a large frying pan over a medium-high heat for 4-5 minutes, then turn and cook for another 3-4 minutes, until opaque through the centre and easily flaked but still moist.'},
    {id:'cod',label:'Cod',ingredient:'cod fillets',qty:'2',kind:'fish',cook:'Pat the cod dry and season with salt and black pepper. Cook in a large frying pan over a medium heat for about 3-4 minutes on each side, depending on thickness, until opaque through the centre and just beginning to flake.'},
    {id:'prawns',label:'Prawn',ingredient:'raw king prawns',qty:'250 g',kind:'fish',cook:'Season the prawns with salt and black pepper, then cook in a large frying pan over a high heat for 2-3 minutes, turning once, until pink, opaque and piping hot throughout.'},
    {id:'tofu',label:'Crispy Tofu',ingredient:'firm tofu',qty:'280 g',kind:'plant',cook:'Pat the tofu very dry and season with salt and black pepper. Fry in a large frying pan over a medium-high heat for 7-9 minutes, turning every couple of minutes, until crisp and deeply golden on several sides.'},
    {id:'chickpeas',label:'Chickpea',ingredient:'chickpeas',qty:'1 tin',kind:'plant',cook:'Drain and dry the chickpeas well, then season with salt and black pepper. Heat a large frying pan over a medium-high heat, add the chickpeas and cook for 5-7 minutes, stirring regularly, until piping hot with lightly crisp, golden edges.'},
    {id:'black-beans',label:'Black Bean',ingredient:'black beans',qty:'1 tin',kind:'plant',cook:'Drain the black beans and season with salt and black pepper. Put them in a large frying pan with 2 tablespoons of water and cook over a medium heat for 3-4 minutes, stirring occasionally, until piping hot without drying out.'},
    {id:'butter-beans',label:'Butter Bean',ingredient:'butter beans',qty:'1 tin',kind:'plant',cook:'Drain the butter beans and season with salt and black pepper. Put them in a large frying pan with 2 tablespoons of water and cook over a medium-low heat for 3-4 minutes, stirring gently, until piping hot while keeping their centres creamy.'},
    {id:'red-lentils',label:'Red Lentil',ingredient:'red lentils',qty:'160 g',kind:'plant',cook:'Rinse the red lentils, then put them in a medium saucepan with 400 ml water. Bring to the boil, reduce to a gentle simmer and cook for 15-20 minutes, stirring occasionally, until soft and creamy; add 1 tablespoon of water at a time only if they begin to catch before tender.'},
    {id:'green-lentils',label:'Green Lentil',ingredient:'cooked green lentils',qty:'250 g',kind:'plant',cook:'Season the cooked green lentils with salt and black pepper, then put them in a large frying pan with 2 tablespoons of water and cook over a medium heat for 4-5 minutes, stirring gently, until piping hot while keeping their shape.'},
    {id:'halloumi',label:'Halloumi',ingredient:'halloumi',qty:'225 g',kind:'vegetarian',cook:'Slice the halloumi, then cook in a dry pan over a medium-high heat for 2-3 minutes per side until deeply golden. Add black pepper once it is off the heat.'},
    {id:'aubergine',label:'Aubergine',ingredient:'aubergine',qty:'1 large',kind:'plant',cook:'Season the aubergine with salt and black pepper and cook in a large frying pan over a medium-high heat for 8-10 minutes, turning regularly, until deeply browned at the edges and completely tender in the centre.'},
    {id:'cauliflower',label:'Roasted Cauliflower',ingredient:'cauliflower',qty:'1 small',kind:'plant',cook:'Cut the cauliflower into bite-sized florets, season with salt and black pepper and spread on a baking tray. Roast in a 200°C fan oven for 18-22 minutes, turning once halfway, until tender with browned, crisp edges.'}
  ];

  const vegPairs=[
    ['red pepper','spinach'],['courgette','cherry tomatoes'],['broccoli','carrot'],['frozen peas','spinach'],
    ['aubergine','red pepper'],['green beans','tomatoes'],['sweetcorn','red pepper'],['mushrooms','spinach'],
    ['kale','carrot'],['butternut squash','spinach'],['broccoli','spring onions'],['courgette','peas'],
    ['red onion','tomatoes'],['carrot','cabbage'],['peppers','green beans'],['sweet potato','spinach'],
    ['broccoli','peas'],['courgette','red onion'],['tomatoes','spinach'],['carrot','peas']
  ];

  const profiles={
    lemonHerb:{
      name:'Lemon Herb',cuisine:'Mediterranean',
      ingredients:[['1','lemon'],['2 tsp','mixed herbs'],['3 cloves','garlic']],
      action:'Set the frying pan over a medium heat. Add the crushed garlic and mixed herbs and cook for 30 seconds, stirring constantly, then add half the lemon juice and 2 tablespoons of water and scrape up the browned bits from the base of the pan.',
      finish:'Take the pan off the heat, add the remaining lemon juice, then taste and adjust the salt and black pepper.',
      referenceSources:[
        {name:'Good Food · Garlic chicken with herbed potatoes',url:'https://www.bbcgoodfood.com/recipes/garlic-chicken-herbed-potatoes'},
        {name:'HelloFresh UK · Quick Roasted Herb and Spice Chicken',url:'https://www.hellofresh.co.uk/recipes/quick-roasted-herb-and-spice-chicken-64639a326ced9aa0d6353be2'}
      ]
    },
    smokyPaprika:{
      name:'Smoky Paprika',cuisine:'Spanish-inspired',
      ingredients:[['2 tsp','smoked paprika'],['1 tbsp','tomato puree'],['2 cloves','garlic'],['1','lime'],['0.5 tsp','sugar']],
      action:'Stir in the garlic, smoked paprika and tomato puree and cook for 1 minute until fragrant, then add 2 tablespoons of water and scrape up the browned bits.',
      finish:'Finish with lime juice. Taste and balance with salt, black pepper and a small pinch of sugar if the tomato tastes sharp.',
      referenceSources:[
        {name:'HelloFresh UK · Gambas Pil Pil Inspired Chicken',url:'https://www.hellofresh.co.uk/recipes/gambas-pil-pil-inspired-chicken-69cd40a7a4f29fefb8a5c27a'},
        {name:'HelloFresh UK · Smoky Mexican Style Bean and Chicken Breast Stew',url:'https://www.hellofresh.co.uk/recipes/smoky-mexican-style-bean-stew-smoky-mexican-style-bean-and-chicken-breast-stew-68687e16787da57249e28eaf'}
      ]
    },
    cuminLime:{
      name:'Cumin Lime',cuisine:'Mexican-inspired',
      ingredients:[['2 tsp','ground cumin'],['1 tsp','paprika'],['2 cloves','garlic'],['1','lime']],
      action:'Add the garlic, cumin and paprika and cook for 30 seconds until aromatic, then add 2 tablespoons of water and stir for 30-60 seconds so the spices coat everything rather than catching.',
      finish:'Finish with plenty of lime juice and a little zest. Taste and adjust the salt and black pepper.',
      referenceSources:[
        {name:'HelloFresh UK · Cumin Chicken with Garlic Yogurt Dressing',url:'https://www.hellofresh.co.uk/recipes/cumin-chicken-5d94bb9931422d4cf9329f15'},
        {name:'HelloFresh UK · Spicy Beef Wrap',url:'https://www.hellofresh.co.uk/recipes/spicy-beef-wrap-5bd1e595ae08b507fd4fbcc2'}
      ]
    },
    coconutCurry:{
      name:'Coconut Curry',cuisine:'South Asian-inspired',
      ingredients:[['200 ml','coconut milk'],['2 tsp','garam masala'],['1 tsp','ground cumin'],['0.25 tsp','chilli powder'],['2 cloves','garlic'],['15 g','fresh ginger'],['1 tbsp','tomato puree'],['1','lime']],
      action:'Set the pan over a medium heat. Add the crushed garlic, finely grated ginger, cumin, garam masala, chilli powder and tomato puree and cook for 1 minute, stirring constantly. Pour in the coconut milk, bring to a gentle simmer and cook for 5-7 minutes, stirring occasionally, until the sauce is glossy and slightly reduced.',
      finish:'Taste and season with salt and black pepper, adding a squeeze of lime if the sauce needs more brightness.',
      referenceSources:[
        {name:'Good Food · Tandoori coconut chicken curry',url:'https://www.bbcgoodfood.com/recipes/tandoori-coconut-chicken-curry'},
        {name:'HelloFresh UK · Chicken Tikka Style Curry',url:'https://www.hellofresh.co.uk/recipes/chicken-tikka-style-curry-5fd75e7d1befce091560de84'}
      ]
    },
    gingerSoy:{
      name:'Ginger Soy',cuisine:'East Asian-inspired',
      ingredients:[['2 tbsp','soy sauce'],['15 g','fresh ginger'],['2 cloves','garlic'],['1','lime']],
      action:'Add the garlic and ginger and stir fry for 30 seconds, then add the soy sauce with 2 tablespoons of water and bubble for 1 minute, tossing everything until glossy and well coated.',
      finish:'Take off the heat and finish with lime juice, then taste before adding any extra salt.',
      referenceSources:[
        {name:'HelloFresh UK · Soy Ginger Veg Noodles',url:'https://www.hellofresh.co.uk/recipes/ginger-sesame-veggie-noodles-6406134cec3f2299c81e742a'},
        {name:'HelloFresh UK · Soy, Ginger & Lime Pork Meatballs',url:'https://www.hellofresh.co.uk/recipes/soy-ginger-lime-pork-meatballs-6200d9fd2f563e07fc1e0c9b'}
      ]
    },
    teriyaki:{
      name:'Teriyaki',cuisine:'Japanese-inspired',
      ingredients:[['3 tbsp','teriyaki sauce'],['15 g','fresh ginger'],['1 clove','garlic'],['2','spring onions'],['1 tsp','sesame seeds']],
      action:'Add the garlic and ginger and stir fry for 30 seconds, then pour in the teriyaki sauce with 2 tablespoons of water and bubble for 1-2 minutes until sticky and glossy.',
      finish:'Take off the heat, fold through half the spring onion and sesame seeds, then scatter the rest over the top.',
      referenceSources:[
        {name:'HelloFresh UK · Teriyaki Sesame Chicken',url:'https://www.hellofresh.co.uk/recipes/teriyaki-sesame-chicken-5fd8e1e64e8db00df90bafdf'},
        {name:'HelloFresh UK · Sticky Sesame Chicken',url:'https://www.hellofresh.co.uk/recipes/chicken-teriyaki-5a57394d2c3e086496797381'}
      ]
    },
    misoGinger:{
      name:'Miso Ginger',cuisine:'Japanese-inspired',
      ingredients:[['1 tbsp','miso paste'],['15 g','fresh ginger'],['1 tbsp','soy sauce'],['1 clove','garlic'],['1 tsp','sugar']],
      action:'Mix the miso, ginger, soy, garlic and sugar with 2 tablespoons of warm water, then stir it through over a medium heat for 1-2 minutes until glossy and lightly sticky.',
      finish:'Taste before adding salt; if the glaze is too strong or thick, stir in 1 tablespoon of warm water at a time until it coats the noodles lightly.',
      referenceSources:[
        {name:'HelloFresh UK · Honey and Miso Glazed Chicken Bao',url:'https://www.hellofresh.co.uk/recipes/honey-and-miso-glazed-chicken-bao-63986f761a7a33166c062b1b'}
      ]
    },
    sweetChilli:{
      name:'Sweet Chilli Lime',cuisine:'Southeast Asian-inspired',
      ingredients:[['2 tbsp','sweet chilli sauce'],['1 tbsp','soy sauce'],['15 g','fresh ginger'],['2 cloves','garlic'],['1','lime']],
      action:'Add the garlic and ginger and stir fry for 30 seconds, then add the sweet chilli and soy sauce and bubble over a medium heat for 1-2 minutes, tossing until the sauce clings to everything.',
      finish:'Finish with lime juice, taste, and add an extra squeeze if the sauce needs more freshness.',
      referenceSources:[
        {name:'HelloFresh UK · Protein-Packed Double Shredded Satay Chicken Noodles',url:'https://www.hellofresh.co.uk/recipes/protein-packed-double-shredded-satay-chicken-noodles-6a1814697200e2f203e90783'},
        {name:'Good Food · Teriyaki salmon bowl',url:'https://www.bbcgoodfood.com/recipes/teriyaki-salmon-bowl'}
      ]
    },
    satay:{
      name:'Peanut Satay',cuisine:'Southeast Asian-inspired',
      ingredients:[['2 tbsp','peanut butter'],['1 tbsp','soy sauce'],['1 tbsp','sweet chilli sauce'],['15 g','fresh ginger'],['1 clove','garlic'],['1','lime']],
      action:'Reduce the frying pan to a medium heat. Add the garlic and ginger and cook for 30 seconds, then mix the peanut butter with the soy, sweet chilli, half the lime juice and 3 tablespoons of hot water. Stir the sauce through for 1-2 minutes until smooth and glossy.',
      finish:'Take off the heat and add the remaining lime juice; taste and, if the sauce is too thick, stir in 1 tablespoon of hot water at a time until it coats the noodles easily.',
      referenceSources:[
        {name:'HelloFresh UK · Protein-Packed Double Shredded Satay Chicken Noodles',url:'https://www.hellofresh.co.uk/recipes/protein-packed-double-shredded-satay-chicken-noodles-6a1814697200e2f203e90783'},
        {name:'Good Food · Satay chicken pieces',url:'https://www.bbcgoodfood.com/recipes/satay-chicken-pieces'}
      ]
    },
    harissa:{
      name:'Harissa Lemon',cuisine:'North African-inspired',
      ingredients:[['1 tbsp','harissa paste'],['1 tbsp','tomato puree'],['1 tsp','ground cumin'],['1','lemon']],
      action:'Stir in the harissa, tomato puree and cumin and cook for 1 minute until fragrant, then add 2 tablespoons of water and stir for 30-60 seconds so the spices coat everything evenly.',
      finish:'Finish with lemon juice. Taste and balance with salt, black pepper and a tiny pinch of sugar if needed.',
      referenceSources:[
        {name:'HelloFresh UK · Harissa Chicken and Couscous',url:'https://www.hellofresh.co.uk/recipes/harissa-chicken-and-couscous-661ea54f5c9ad41013c0aafc'},
        {name:'Good Food · Spicy couscous salad',url:'https://www.bbcgoodfood.com/recipes/spicy-couscous-salad'}
      ]
    },
    tomatoBasil:{
      name:'Tomato Basil',cuisine:'Italian-inspired',
      ingredients:[['1 tin','chopped tomatoes'],['1 tbsp','tomato puree'],['3 cloves','garlic'],['10 g','fresh basil']],
      action:'Set the frying pan over a medium heat. Add the crushed garlic and tomato puree and cook for 1 minute, stirring constantly. Add the chopped tomatoes and half the basil, bring to a gentle simmer and cook for 6-8 minutes, stirring occasionally, until the sauce has thickened and no longer tastes raw.',
      finish:'Take off the heat, tear in the remaining basil, then taste and adjust the salt, black pepper and acidity.',
      referenceSources:[
        {name:'HelloFresh UK · Italian Inspired Chicken Milanese and Tomato Spaghetti',url:'https://www.hellofresh.co.uk/recipes/italian-inspired-chicken-milanese-and-tomato-spaghetti-65255c076720825b47fd1d39'},
        {name:'HelloFresh UK · Chicken and Roasted Aubergine Spaghetti',url:'https://www.hellofresh.co.uk/recipes/chicken-and-roasted-aubergine-spaghetti-685f3c72b3c183c7dd02dd39'}
      ]
    },
    pestoLemon:{
      name:'Pesto Lemon',cuisine:'Italian-inspired',
      ingredients:[['3 tbsp','green pesto'],['1','lemon'],['30 g','parmesan'],['1 clove','garlic']],
      action:'Set the frying pan over a medium-low heat. Add the crushed garlic and cook for 30 seconds, stirring constantly. Reduce to a low heat, stir through the pesto with 2 tablespoons of reserved cooking water and cook for 1 minute until the sauce coats everything evenly.',
      finish:'Finish with lemon zest, a squeeze of lemon juice and the parmesan. Add black pepper to taste.',
      referenceSources:[
        {name:'HelloFresh UK · Lemony Pesto Chicken Pasta',url:'https://www.hellofresh.co.uk/recipes/superquick-lemony-pesto-chicken-pasta-5faacbd1bce34363f47a7f2a'},
        {name:'Good Food · Broccoli pesto pasta',url:'https://www.bbcgoodfood.com/recipes/broccoli-pesto-pasta'}
      ]
    },
    creamyTomato:{
      name:'Creamy Tomato',cuisine:'Italian-inspired',
      ingredients:[['150 g','soft cheese'],['250 g','passata'],['1 tbsp','tomato puree'],['3 cloves','garlic'],['1 tsp','mixed herbs'],['30 g','parmesan']],
      action:'Set the frying pan over a medium heat. Add the crushed garlic, tomato puree and herbs and cook for 1 minute, stirring constantly. Add the passata and simmer for 4-5 minutes until slightly reduced. Reduce to a low heat, stir in the soft cheese and cook for 1-2 minutes until completely smooth.',
      finish:'Stir in the parmesan, taste and season with salt and black pepper; if the sauce is too thick, stir in 1 tablespoon of reserved cooking water at a time until it coats the food easily.',
      referenceSources:[
        {name:'HelloFresh UK · Herby Creamy Tomato Chicken Penne',url:'https://www.hellofresh.co.uk/recipes/herby-creamy-tomato-chicken-penne-66b22e33a1293bffe8e018cd'},
        {name:'HelloFresh UK · Creamy Chicken and Tomato Pasta',url:'https://www.hellofresh.co.uk/recipes/creamy-chicken-and-tomato-pasta-684cc2aa06685a8854e63202'}
      ]
    },
    garlicYoghurt:{
      name:'Garlic Yoghurt',cuisine:'Greek-inspired',
      ingredients:[['120 g','Greek style yoghurt'],['1','lemon'],['2 cloves','garlic'],['10 g','fresh mint']],
      action:'Mix the yoghurt with finely grated garlic, chopped mint, half the lemon juice and plenty of black pepper while the rest cooks.',
      finish:'Spoon over the garlic yoghurt, finish with the remaining lemon juice and taste before adding extra salt.',
      referenceSources:[
        {name:'HelloFresh UK · Cumin Chicken with Garlic Yogurt Dressing',url:'https://www.hellofresh.co.uk/recipes/cumin-chicken-5d94bb9931422d4cf9329f15'},
        {name:'HelloFresh UK · Portuguese Style Chicken',url:'https://www.hellofresh.co.uk/recipes/portuguese-style-chicken-5a16a78c51d3f13cc727d152'}
      ]
    },
    tomatoOregano:{
      name:'Tomato Oregano',cuisine:'Mediterranean',
      ingredients:[['250 g','cherry tomatoes'],['2 tsp','oregano'],['3 cloves','garlic'],['1 tbsp','tomato puree']],
      action:'Add the crushed garlic and tomato puree to the frying pan over a medium heat and cook for 1 minute, stirring so the garlic does not catch. Add the cherry tomatoes and oregano, then cook for 4-6 minutes, stirring occasionally, until the tomatoes soften, blister and release a glossy sauce.',
      finish:'Taste and season with salt and black pepper, pressing a few tomatoes with the spoon if you want a saucier finish.',
      referenceSources:[
        {name:'HelloFresh UK · Italian Inspired Chicken Milanese and Tomato Spaghetti',url:'https://www.hellofresh.co.uk/recipes/italian-inspired-chicken-milanese-and-tomato-spaghetti-65255c076720825b47fd1d39'}
      ]
    },
    jerkLime:{
      name:'Jerk Lime',cuisine:'Caribbean-inspired',
      ingredients:[['2 tsp','jerk seasoning'],['2','spring onions'],['2 cloves','garlic'],['15 g','fresh ginger'],['1 tbsp','soy sauce'],['1','lime']],
      action:'Set the frying pan over a medium heat. Add the sliced spring onions, crushed garlic, finely grated ginger and jerk seasoning and cook for 1 minute, stirring constantly, then stir in the soy sauce and half the lime juice and cook for 30 seconds.',
      finish:'Finish with the remaining lime juice. Taste and add a little extra jerk seasoning if you want more heat.',
      referenceSources:[
        {name:'Good Food · Jerk chicken with rice and peas',url:'https://www.bbcgoodfood.com/recipes/jerk-chicken-rice-peas'},
        {name:'Good Food · Jamaican jerk chicken',url:'https://www.bbcgoodfood.com/recipes/jamaican-jerk-chicken'}
      ]
    },
    maplePaprika:{
      name:'Maple Paprika',cuisine:'North American-inspired',
      ingredients:[['1 tbsp','maple syrup'],['2 tsp','smoked paprika'],['1 tbsp','mustard'],['1 clove','garlic']],
      action:'Set the frying pan over a medium heat. Add the crushed garlic and smoked paprika and cook for 30 seconds, stirring constantly. Stir in the maple syrup and mustard with 2 tablespoons of water and cook for 1-2 minutes, tossing until everything is evenly coated.',
      finish:'Keep the pan over a medium heat for another 1-2 minutes, stirring or turning regularly, until the glaze is sticky and lightly caramelised, then taste and add black pepper and a pinch of salt if needed.',
      referenceSources:[
        {name:'Good Food · BBQ chicken platter',url:'https://www.bbcgoodfood.com/recipes/bbq-chicken-platter'},
        {name:'HelloFresh UK · Maple Soy Glazed Tofu',url:'https://www.hellofresh.co.uk/recipes/maple-soy-glazed-tofu-5ed8b3c05d47247f7e4d4ad5'}
      ]
    },
    mustardHerb:{
      name:'Mustard Herb',cuisine:'British-inspired',
      ingredients:[['1 tbsp','wholegrain mustard'],['2 tsp','mixed herbs'],['150 ml','vegetable stock'],['2 cloves','garlic']],
      action:'Set the frying pan over a medium heat. Add the crushed garlic and cook for 30 seconds, stirring constantly. Stir in the mustard and herbs, pour in the 150 ml vegetable stock and simmer for 4-6 minutes, stirring occasionally, until the sauce is reduced enough to coat the food.',
      finish:'Taste the sauce and adjust the salt and black pepper; if it has reduced too far, stir in 1 tablespoon of water at a time until it coats the food without being watery.',
      referenceSources:[
        {name:'HelloFresh UK · Chicken and Creamy Parsley Mustard Sauce',url:'https://www.hellofresh.co.uk/recipes/chicken-and-creamy-parsley-mustard-sauce-68e8c26da267a9c2fbff7257'},
        {name:'HelloFresh UK · Parisienne Chicken',url:'https://www.hellofresh.co.uk/recipes/ve2020-parisienne-chicken-689e88321597ca63310a465b'}
      ]
    },
    rosemaryGarlic:{
      name:'Rosemary Garlic',cuisine:'European-inspired',
      ingredients:[['2 tsp','rosemary'],['3 cloves','garlic'],['1','lemon']],
      action:'Set the frying pan over a medium heat. Add the rosemary and crushed garlic and cook for 30-45 seconds, stirring constantly, until aromatic without letting the garlic brown. Add 2 tablespoons of water and scrape up the pan juices.',
      finish:'Take off the heat, add lemon juice and zest, then taste and adjust the salt and black pepper.',
      referenceSources:[
        {name:'Good Food · One-pan roast chicken and potatoes',url:'https://www.bbcgoodfood.com/recipes/one-pan-roast-chicken-potatoes'},
        {name:'Good Food · Garlic chicken with herbed potatoes',url:'https://www.bbcgoodfood.com/recipes/garlic-chicken-herbed-potatoes'}
      ]
    },
    tahiniLemon:{
      name:'Tahini Lemon',cuisine:'Middle Eastern-inspired',
      ingredients:[['2 tbsp','tahini'],['1','lemon'],['1 tsp','ground cumin'],['1 clove','garlic']],
      action:'Whisk the tahini with the garlic, cumin, half the lemon juice and 2 to 3 tablespoons of warm water until smooth and pourable.',
      finish:'Drizzle over the finished dish, add the remaining lemon to taste and season with salt and black pepper.',
      referenceSources:[
        {name:'Good Food · Layered hummus with spiced tortilla chips',url:'https://www.bbcgoodfood.com/recipes/layered-houmous-spiced-tortilla-chips'},
        {name:'Good Food · Hummus',url:'https://www.bbcgoodfood.com/recipes/hummus'}
      ]
    }
  };

  const formatProfiles={
    rice:['teriyaki','cuminLime','coconutCurry','harissa','lemonHerb'],
    pasta:['tomatoBasil','creamyTomato','pestoLemon','smokyPaprika','rosemaryGarlic'],
    noodles:['gingerSoy','teriyaki','misoGinger','sweetChilli','satay'],
    tacos:['cuminLime','smokyPaprika','jerkLime','harissa','sweetChilli'],
    tray:['rosemaryGarlic','lemonHerb','maplePaprika','harissa','tomatoOregano'],
    curry:['coconutCurry','harissa','cuminLime','tomatoBasil','misoGinger'],
    stirfry:['gingerSoy','teriyaki','sweetChilli','satay','misoGinger'],
    couscous:['harissa','lemonHerb','cuminLime','garlicYoghurt','tomatoOregano'],
    orzo:['lemonHerb','tomatoOregano','harissa','pestoLemon','garlicYoghurt'],
    stew:['rosemaryGarlic','smokyPaprika','tomatoBasil','harissa','coconutCurry'],
    soup:['tomatoBasil','coconutCurry','lemonHerb','smokyPaprika','misoGinger'],
    grainsalad:['lemonHerb','harissa','cuminLime','garlicYoghurt','tahiniLemon'],
    potato:['smokyPaprika','cuminLime','mustardHerb','garlicYoghurt','tomatoBasil'],
    flatbread:['harissa','garlicYoghurt','pestoLemon','cuminLime','tomatoOregano'],
    stuffed:['tomatoBasil','cuminLime','smokyPaprika','harissa','lemonHerb'],
    onepan:['smokyPaprika','tomatoBasil','cuminLime','coconutCurry','lemonHerb'],
    slow:['rosemaryGarlic','smokyPaprika','tomatoBasil','harissa','coconutCurry'],
    air:['lemonHerb','maplePaprika','teriyaki','harissa','smokyPaprika'],
    bbq:['lemonHerb','cuminLime','jerkLime','harissa','maplePaprika'],
    salad:['lemonHerb','tahiniLemon','cuminLime','garlicYoghurt','pestoLemon']
  };

  MW.recipeFrameworkV014={mains,vegPairs,profiles,formatProfiles};
})();