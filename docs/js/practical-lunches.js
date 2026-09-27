window.MW=window.MW||{};
(function(){
'use strict';
const common={
  isLunch:true,sourcedCatalogue:true,catalogueVersion:'0.36-practical-lunch',
  source:'Good Food',prepLocation:'home',workplaceEquipment:['microwave','kettle'],workplaceReady:true,
  imageQa:{status:'verified',role:'exact-final'},
  preparationNote:'Prepare this lunch at home. My Week scales the quantities to the lunch days and people selected for this week.',
  storageNote:'Prepare ahead where suitable, keep chilled and follow normal food-safety guidance. Pack bread and fresh leaves close enough to eating that they stay at their best.'
};
const rows=[
{
 id:'practical-goodfood-ham-sandwich',sourceId:'goodfood-ham-sandwich',title:'Ham sandwich',
 subtitle:'Ham, cheddar, tomato and a honey-mustard mayo',servings:2,time:10,prepStyle:'no-cook',lunchBucket:'sandwich',practicalLunch:true,
 sourceUrl:'https://www.bbcgoodfood.com/recipes/ham-sandwich',
 sourceImageUrl:'https://images.immediate.co.uk/production/volatile/sites/30/2024/04/HamSandwich-0d4e4ff.jpg?quality=90&resize=708%2C643',
 ingredients:[['0.25','red onion'],['1 tbsp','butter'],['1 tbsp','Dijon mustard'],['2 tbsp','mayonnaise'],['1 tsp','honey'],['4 slices','bread'],['8 slices','ham'],['40 g','cheddar cheese'],['40 g','rocket'],['1','tomato']],
 steps:['Thinly slice the red onion. For a milder flavour, soak it in very cold water for 5 minutes, then drain and pat dry.','Mix the mustard, mayonnaise and honey. Butter the bread lightly, then spread the mustard mayo over the inside surfaces.','Slice the tomato. Layer the ham, cheddar, rocket, onion and tomato between the bread, then close each sandwich and halve it.']
},
{
 id:'practical-goodfood-chicken-pesto-wrap',sourceId:'goodfood-chicken-pesto-wrap',title:'Chicken pesto wrap',
 subtitle:'Cooked chicken, pesto, cheese and crunchy vegetables',servings:2,time:10,prepStyle:'no-cook',lunchBucket:'wrap',practicalLunch:true,
 sourceUrl:'https://www.bbcgoodfood.com/recipes/chicken-pesto-wrap',
 sourceImageUrl:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chicken-pesto-wrap-b147add.jpg?quality=90&resize=570%2C518',
 ingredients:[['200 g','cooked chicken breast'],['2 tbsp','mayonnaise'],['2 tsp','green pesto'],['2 slices','cheddar cheese'],['2','tortilla wraps'],['50 g','red pepper'],['40 g','lettuce']],
 steps:['Shred the cooked chicken and mix it with the mayonnaise and pesto. Slice the pepper and shred the lettuce.','Lay the cheese on the wraps, divide over the chicken mixture, pepper and lettuce, then fold the sides in and roll tightly.']
},
{
 id:'practical-goodfood-chicken-tzatziki-wrap',sourceId:'goodfood-chicken-tzatziki-wraps',title:'Chicken & tzatziki wraps',
 subtitle:'Chicken, cucumber, tomato and a quick yoghurt tzatziki',servings:4,time:25,prepStyle:'quick',lunchBucket:'wrap',practicalLunch:true,
 sourceUrl:'https://www.bbcgoodfood.com/recipes/chicken-tzatziki-wraps/',
 sourceImageUrl:'https://images.immediate.co.uk/production/volatile/sites/30/2023/10/Chicken-and-tzatziki-wraps-fb41f04.jpg?quality=90&resize=708%2C643',
 ingredients:[['1','cucumber'],['250 g','Greek yoghurt'],['500 g','chicken breast'],['2 tbsp','olive oil'],['4','tortilla wraps'],['4','tomatoes']],
 steps:['Coarsely grate most of the cucumber and mix it with the yoghurt. Slice the remaining cucumber and tomatoes.','Slice the chicken, season it and coat with half the oil. Heat the remaining oil in a frying pan over medium heat and cook the chicken for 8 to 10 minutes, turning, until golden and cooked through.','Warm the wraps briefly. Spread with tzatziki, add the chicken, tomato and sliced cucumber, then fold in the sides and roll tightly.']
},{
 id:'practical-goodfood-overnight-oats',sourceId:'goodfood-overnight-oats',title:'Overnight oats',
 subtitle:'Oats, yoghurt, berries, honey and nut butter',servings:1,time:10,prepStyle:'no-cook',lunchBucket:'other',practicalLunch:true,light:true,
 sourceUrl:'https://www.bbcgoodfood.com/recipes/overnight-oats',
 sourceImageUrl:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/overnight-oats-32a2747.jpg?quality=90&resize=500%2C454',
 ingredients:[['0.25 tsp','ground cinnamon'],['50 g','porridge oats'],['100 ml','skimmed milk'],['2 tbsp','natural yoghurt'],['50 g','mixed berries'],['1 tsp','honey'],['0.5 tbsp','peanut butter']],
 steps:['The night before, stir the cinnamon, oats and milk together with a small pinch of salt. Cover and chill overnight.','When ready to eat, loosen with a splash of milk if needed, then add the yoghurt, berries, honey and peanut butter.']
},
{
 id:'practical-goodfood-lunchbox-pasta-salad',sourceId:'goodfood-lunchbox-pasta-salad',title:'Lunchbox pasta salad',
 subtitle:'Pesto pasta with vegetables, yoghurt dressing and ham',servings:4,time:26,prepStyle:'quick',lunchBucket:'pasta',practicalLunch:true,
 sourceUrl:'https://www.bbcgoodfood.com/recipes/lunchbox-pasta-salad',
 sourceImageUrl:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/lunchbox-pasta-salad-2932c62.jpg?quality=90&resize=440%2C400',
 ingredients:[['400 g','pasta'],['4 tbsp','green pesto'],['1 tbsp','mayonnaise'],['2 tbsp','Greek yoghurt'],['0.5','lemon'],['100 g','peas'],['100 g','green beans'],['100 g','cherry tomatoes'],['200 g','ham']],
 steps:['Cook the pasta in boiling water until just tender. Add the peas and chopped green beans for the final 2 minutes, then drain well. Stir through the pesto and leave to cool.','Mix the mayonnaise, yoghurt and lemon juice. Once the pasta is cool, stir in the dressing and quartered tomatoes, then divide into lunch boxes and add the ham. Keep chilled until needed.']
},
{
 id:'practical-goodfood-tuna-pasta-salad',sourceId:'goodfood-tuna-pasta-salad',title:'Tuna pasta salad',
 subtitle:'Tuna, sweetcorn and peppers in a light yoghurt dressing',servings:4,time:40,prepStyle:'quick',lunchBucket:'pasta',practicalLunch:true,light:true,
 sourceUrl:'https://www.bbcgoodfood.com/recipes/pasta-salad-with-tuna-mayo',
 sourceImageUrl:'https://images.immediate.co.uk/production/volatile/sites/30/2021/05/Pasta-salad-with-tuna-mayo-b5001bd-e1676046413752.jpg?quality=90&resize=440%2C400',
 ingredients:[['250 g','wholemeal penne'],['240 g','natural yoghurt'],['2 tsp','English mustard powder'],['2 tbsp','extra virgin olive oil'],['4 tsp','apple cider vinegar'],['1','red onion'],['15 g','fresh basil'],['320 g','tinned tuna'],['2','red peppers'],['340 g','sweetcorn']],
 steps:['Cook the pasta until al dente, drain it and rinse under cold water, then drain thoroughly.','Finely chop the onion and basil and dice the peppers. Mix them with the yoghurt, mustard, olive oil and vinegar, then fold in the drained tuna and sweetcorn.','Stir the cooled pasta through the tuna mixture. Divide into containers and keep chilled until needed.']
},
{
 id:'practical-goodfood-ploughmans-sandwich',sourceId:'goodfood-ploughmans-sandwich',title:'Ploughman’s sandwich',
 subtitle:'Ham, cheddar, apple, chutney and mustard mayo',servings:2,time:10,prepStyle:'no-cook',lunchBucket:'sandwich',practicalLunch:true,
 sourceUrl:'https://www.bbcgoodfood.com/recipes/ploughmans-sandwich',
 sourceImageUrl:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/ploughmans-sandwich-d42271a.jpg?quality=90&resize=440%2C400',
 ingredients:[['1','baguette'],['2 tbsp','mayonnaise'],['1 tsp','wholegrain mustard'],['0.5','apple'],['3 slices','ham'],['50 g','cheddar cheese'],['2 tbsp','mango chutney'],['40 g','rocket']],
 steps:['Split the baguette lengthways. Mix the mayonnaise and mustard, and slice the apple thinly.','Spread the mustard mayo over the baguette, then layer on the ham, cheddar, apple, chutney and rocket. Close the baguette and cut into two portions.']
},
{
 id:'practical-goodfood-veggie-olive-wrap',sourceId:'goodfood-veggie-olive-wraps-mustard-vinaigrette',title:'Veggie olive wrap',
 subtitle:'Crunchy vegetables and olives with a mustard vinaigrette',servings:1,time:10,prepStyle:'no-cook',lunchBucket:'wrap',practicalLunch:true,light:true,
 sourceUrl:'https://www.bbcgoodfood.com/recipes/veggie-olive-wraps-mustard-vinaigrette/',
 sourceImageUrl:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/olive-wrap-c866064.jpg?quality=90&resize=440%2C400',
 ingredients:[['1','carrot'],['80 g','red cabbage'],['2','spring onions'],['1','courgette'],['10 g','fresh basil'],['5','green olives'],['0.5 tsp','English mustard powder'],['2 tsp','extra virgin rapeseed oil'],['1 tbsp','apple cider vinegar'],['1','large seeded tortilla wrap']],
 steps:['Coarsely grate the carrot, finely shred the red cabbage, slice the spring onions and grate the courgette. Tear the basil and roughly chop the olives.','Whisk the mustard powder with the rapeseed oil and cider vinegar, then toss it through the prepared vegetables and olives.','Lay out the tortilla, pile the dressed vegetables into the centre, fold in the sides and roll tightly. Wrap or box it for lunch and keep chilled until needed.']
},
{
 id:'practical-goodfood-chia-almond-overnight-oats',sourceId:'goodfood-chia-almond-overnight-oats',title:'Chia & almond overnight oats',
 subtitle:'Vegan overnight oats with raspberries, blueberries and almonds',servings:4,time:10,prepStyle:'no-cook',lunchBucket:'other',practicalLunch:true,light:true,
 sourceUrl:'https://www.bbcgoodfood.com/recipes/chia-almond-overnight-oats',
 sourceImageUrl:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chia-almond-overnight-oats-with-raspberries-and-blueberries-1-440-400-98ea1d8.jpg?quality=90&resize=440%2C400',
 ingredients:[['200 g','jumbo porridge oats'],['50 g','chia seeds'],['600 ml','unsweetened almond milk'],['2 tsp','vanilla extract'],['125 g','raspberries'],['100 g','almond yoghurt'],['250 g','blueberries'],['20 g','flaked almonds']],
 steps:['Stir the oats and chia seeds with the almond milk and vanilla extract. Cover and chill overnight so the oats soften and the chia thickens the mixture.','The next day, loosen with a little extra almond milk if needed. Divide into containers and top with the raspberries, almond yoghurt, blueberries and flaked almonds. Keep chilled until needed.']
},
{
 id:'practical-goodfood-tuna-salad-sandwich',sourceId:'goodfood-tuna-salad-sandwich',title:'Tuna salad sandwich',
 subtitle:'Tuna mayo with celery, red onion, cucumber and crisp lettuce',servings:2,time:10,prepStyle:'no-cook',lunchBucket:'sandwich',practicalLunch:true,
 sourceUrl:'https://www.bbcgoodfood.com/recipes/tuna-salad-sandwich',
 sourceImageUrl:'https://images.immediate.co.uk/production/volatile/sites/30/2024/04/TunaSandwich-81a36a8.jpg?quality=90&resize=708%2C643',
 ingredients:[['1 tin','Tinned tuna'],['0.5','Celery'],['0.5','Red onion'],['5 tsp','Mayonnaise'],['0.25 tsp','Paprika'],['4 slices','Bread'],['8 slices','Cucumber'],['4 leaves','Lettuce']],
 steps:['Drain the tuna well. Finely dice the celery and red onion, then mix them with the tuna, most of the mayonnaise and a small pinch of paprika. Season to taste.','Divide the tuna filling between two slices of bread. Add the cucumber and lettuce, spread the remaining mayonnaise over the other slices, close the sandwiches and halve them. Keep chilled until lunch.']
},
{
 id:'practical-goodfood-caprese-sandwich',sourceId:'goodfood-caprese-sandwich',title:'Caprese sandwich',
 subtitle:'Mozzarella, tomato, pesto, rocket and basil in bread or focaccia',servings:4,time:10,prepStyle:'no-cook',lunchBucket:'sandwich',practicalLunch:true,
 sourceUrl:'https://www.bbcgoodfood.com/recipes/caprese-sandwich',
 sourceImageUrl:'https://images.immediate.co.uk/production/volatile/sites/30/2022/05/Caprese-sandwich-e1fb6a4.jpg?quality=90&resize=708%2C643',
 ingredients:[['8 slices','Bread'],['2 tbsp','Basil pesto'],['2 tsp','Extra virgin olive oil'],['1 handful','Rocket'],['250 g','Mozzarella'],['2','Tomato'],['1 small handful','Fresh basil'],['0.5','Red onion'],['2 tsp','Balsamic vinegar']],
 steps:['Spread the pesto over half the bread and drizzle the remaining slices with the olive oil. Slice the mozzarella, tomatoes and red onion.','Layer the rocket, mozzarella, tomato, basil and red onion over the pesto. Drizzle with balsamic vinegar, close the sandwiches and wrap or box them for lunch.']
},
{
 id:'practical-goodfood-red-lentil-chickpea-soup',sourceId:'goodfood-red-lentil-chickpea-chilli-soup',title:'Red lentil, chickpea & chilli soup',
 subtitle:'A simple batch soup with cumin, tomato and chickpeas',servings:4,time:35,prepStyle:'cook',lunchBucket:'soup',practicalLunch:true,light:true,
 sourceUrl:'https://www.bbcgoodfood.com/recipes/red-lentil-chickpea-chilli-soup',
 sourceImageUrl:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-265545_11-90c5919.jpg?quality=90&resize=440%2C400',
 ingredients:[['2 tsp','cumin seeds'],['0.5 tsp','chilli flakes'],['1 tbsp','olive oil'],['1','red onion'],['140 g','red lentils'],['2','vegetable stock cubes'],['400 g','tinned chopped tomatoes'],['200 g','chickpeas'],['20 g','fresh coriander'],['4 tbsp','Greek yoghurt']],
 steps:['Heat a large saucepan over medium heat and toast the cumin seeds and chilli flakes for about 1 minute until fragrant.','Add the olive oil and chopped red onion. Cook for about 5 minutes until softened.','Add the red lentils, stock made with 850 ml hot water and the tomatoes. Bring to the boil, then simmer for about 15 minutes until the lentils are soft.','Blend to a rough puree, return to the pan and stir in the drained chickpeas. Heat through, season, then stir in most of the coriander. Serve with the yoghurt and remaining coriander.']
}
];for(const r of rows){
 Object.assign(r,common);
 r.shoppingIngredients=r.ingredients.map(x=>x.slice());
 r.sourceIngredients=r.ingredients.map(x=>x.slice());
 r.imageSource=r.sourceUrl;
 r.recipeSource='Good Food';
 r.recipeSourceUrl=r.sourceUrl;
 r.recipeProvenance='Published Good Food recipe used as the cooking source. My Week retains the dish identity and presents a concise preparation method for weekly planning.';
 r.imageLicense='Recipe source image';
 r.imageProvenance='Exact finished-dish photograph from the published Good Food recipe.';
 r.tags=[...new Set([...(r.tags||[]),r.lunchBucket,r.prepStyle,'practical-lunch'])];
}
MW.PRACTICAL_LUNCHES=rows;
const current=Array.isArray(MW.LUNCHES)?MW.LUNCHES:[];
const practicalIds=new Set(rows.map(x=>x.id));
MW.LUNCHES=[...rows,...current.filter(x=>!practicalIds.has(x.id))];
})();