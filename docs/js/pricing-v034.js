window.MW = window.MW || {};
(function(){
  const p=MW.pricing;
  if(!p) return;

  const AS_OF='2026-09-25';
  const RETAILER='UK supermarket estimate';
  const legacyEntryFor=p.entryFor.bind(p);
  const round=n=>Math.round((Number(n)||0)*100)/100;
  const norm=x=>String(x||'').toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9' ]/g,' ').replace(/\s+/g,' ').trim();
  const byLabel=label=>p.book.find(x=>x.label===label)||null;
  const clone=(label,extra)=>{
    const base=byLabel(label);
    if(!base) throw new Error('Missing pricing base: '+label);
    return Object.assign({},base,extra||{},{marketChecked:false,marketAverage:false,marketEvidence:[],confidence:'unverified-benchmark'});
  };
  const current=(packQty,unit,price,label,extra)=>{
    const e=Object.assign({
      packQty,unit,price,savingPrice:price,label,confidence:'current-estimate',
      marketChecked:false,marketAverage:false,marketAsOf:AS_OF,marketEvidence:[]
    },extra||{});
    e.marketChecked=false;e.marketAverage=false;e.confidence='unverified-benchmark';
    e.marketEvidence=[]; // No product URLs or retained checks support these inputs.
    return e;
  };
  const calibrated=(packQty,unit,price,label,extra)=>Object.assign({
    packQty,unit,price,savingPrice:price,label,confidence:'unverified-benchmark',
    marketChecked:false,marketAverage:false,marketAsOf:AS_OF,marketEvidence:[]
  },extra||{});

  const water=current(1000,'ml',0,'tap water',{confidence:'recipe-only',marketChecked:false,marketEvidence:[]});
  const exact=new Map();
  const put=(names,entry)=>[].concat(names).forEach(name=>exact.set(norm(name),entry));
  const from=(names,label,extra)=>put(names,clone(label,extra));

  // Pantry and context phrases must be resolved before any broad legacy aliases.
  put(['water','tap water'],water);
  from(['cooking oil','olive oil'],'cooking oil 1 litre',{gramsPerMl:0.92,defaultUsage:15});
  from(['salt'],'table salt 750g',{defaultUsage:1});
  from(['black pepper','cracked black pepper'],'black pepper 50g',{defaultUsage:1});
  from(['sugar'],'granulated sugar 1kg',{defaultUsage:4});

  // High-frequency source ingredients that previously had no safe identity.
  put('Chicken Stock Paste',current(112,'g',1.45,'chicken stock pots 112g',{gramsPerMl:1}));
  put('Vegetable Stock Paste',current(112,'g',1.45,'vegetable stock pots 112g',{gramsPerMl:1}));
  from(['Bell Pepper','Green Pepper','Mini Bell Pepper Mix'],'peppers pack',{eachWeight:160});
  put('Baby Leaf Mix',current(90,'g',0.90,'baby leaf salad 90g'));
  put(['ham','smoked ham','honey roast ham'],current(120,'g',2.00,'Sainsburys honey roast ham 120g',{sliceWeight:20}));
  put('Ciabatta',current(4,'each',1.30,'ciabatta rolls x4',{eachWeight:90}));
  put('Jasmine Rice',current(1000,'g',3.20,'jasmine rice 1kg'));
  from(['Plain Taco Tortillas','Super Soft Tortillas with Whole Wheat','large seeded tortilla wrap'],'wraps or tortillas x8');
  from(['extra virgin rapeseed oil'],'cooking oil 1 litre',{gramsPerMl:0.92});
  put(['green olives'],calibrated(330,'g',1.31,'pitted green olives 330g',{eachWeight:4.5}));
  put(['Basil pesto','basil pesto'],calibrated(190,'g',2.50,'traditional Italian pesto 190g',{tbspWeight:16,tspWeight:5}));
  put(['Fresh basil','fresh basil'],calibrated(30,'g',0.55,'fresh basil 30g'));
  put(['chia seeds'],calibrated(300,'g',2.50,'chia seeds 300g'));
  put(['unsweetened almond milk','almond milk'],calibrated(1000,'ml',1.50,'unsweetened almond milk 1 litre'));
  put(['vanilla extract'],calibrated(38,'ml',1.50,'vanilla extract 38ml'));
  put(['almond yoghurt','almond yogurt'],calibrated(400,'g',2.00,'almond yoghurt 400g'));
  from(['lettuce'],'lettuce or salad leaves',{eachWeight:300});
  from(['tinned tuna'],'tuna tin',{tinWeight:145});
  put(['vegetable stock cubes'],calibrated(12,'each',1.25,'vegetable stock cubes x12'));
  from(['tinned chopped tomatoes'],'chopped tomatoes 400g',{tinWeight:400});
  put('Plain Naans',current(2,'each',1.50,'plain naan breads x2',{eachWeight:130}));
  from(['Salad Potatoes','Baking Potato'],'potatoes 2kg',{eachWeight:220});
  from('Onion','brown onions 1kg',{eachWeight:150});
  from('Sweet Potato','sweet potatoes 1kg',{eachWeight:250});
  from('Leek','leeks 500g',{eachWeight:180});
  put('Ginger Puree',calibrated(90,'g',1.50,'ginger puree 90g',{tbspWeight:15,tspWeight:5}));
  put('Beef Stock Paste',current(112,'g',1.45,'beef stock pots 112g',{gramsPerMl:1}));
  put('Intense™ Tomato',calibrated(100,'g',1.00,'concentrated tomato paste 100g',{eachWeight:25,tbspWeight:18,tspWeight:6}));
  from('Echalion Shallot','brown onions 1kg',{eachWeight:45,label:'shallots equivalent'});
  from('Medium Tomato','tomatoes pack',{eachWeight:80});
  from(['Rigatoni Pasta','Ditali Pasta','Linguine','Macaroni'],'pasta 500g');
  put('Gnocchi',calibrated(500,'g',1.25,'gnocchi 500g'));
  put('Mozzarella',calibrated(125,'g',1.05,'mozzarella 125g ball',{ballWeight:125,eachWeight:125}));
  put('milk',current(2272,'ml',1.65,'British skimmed milk 4 pint carton',{cartonWeight:2272}));
  put('Milk',current(2272,'ml',1.65,'British skimmed milk 4 pint carton',{cartonWeight:2272}));
  put('skimmed milk',current(2272,'ml',1.65,'British skimmed milk 4 pint carton',{cartonWeight:2272}));
  put('bread',calibrated(20,'slice',0.75,'sliced bread loaf 20 slices',{sliceWeight:38}));
  put('cheese',clone('cheddar cheese pack',{packQty:400,unit:'g',label:'mature cheddar 400g'}));
  from('onions','brown onions 1kg',{eachWeight:150});
  from('pork sausages','pork sausages x8',{eachWeight:62.5});
  put('Sweetcorn',calibrated(200,'g',0.46,'sweetcorn 200g tin',{tinWeight:200}));
  from('Worcester Sauce','Worcestershire sauce 150ml',{gramsPerMl:1.05});
  from(['Red Thai Style Paste','Yellow Thai Style Paste','Thai Green Style Paste'],'curry paste jar');
  put('British Chicken Mini Fillets',current(400,'g',4.00,'British chicken breast mini fillets 400g'));
  put('Red Leicester',current(400,'g',2.95,'Red Leicester 400g'));
  from(['Chopped Cavolo Nero','Chopped Kale'],'kale 200g');
  put('Brioche Hot Dog Buns',calibrated(6,'each',1.50,'brioche hot dog buns x6'));
  put('Burger Buns',current(4,'each',0.86,'burger buns x4',{eachWeight:70}));
  put('Paneer',current(200,'g',1.80,'paneer 200g'));
  from('Smashed Avocado','avocado each',{eachWeight:150});
  put('Romanesco',calibrated(1,'each',1.35,'romanesco head',{eachWeight:500}));
  put('Bao Buns',calibrated(6,'each',2.00,'bao buns x6'));
  put('Creamed Coconut',calibrated(200,'g',1.20,'creamed coconut 200g'));
  put('Serrano Ham',calibrated(100,'g',2.50,'Serrano ham 100g',{sliceWeight:15}));
  put('Smoked Ham Slices',calibrated(120,'g',2.00,'smoked ham slices 120g',{sliceWeight:15}));
  put('Tortilla Chips',calibrated(200,'g',1.35,'tortilla chips 200g'));
  put('21 Day Aged British Sirloin Steaks',current(400,'g',10.88,'sirloin steaks 400g',{eachWeight:200,marketAverage:true,marketEvidence:[{retailer:'Tesco',price:10.50,asOf:AS_OF},{retailer:'Sainsbury’s',price:11.25,asOf:AS_OF}]}));
  put('21 Day Aged British Rump Steaks',calibrated(400,'g',6.50,'rump steaks 400g',{eachWeight:200}));
  put('Venison Leg Steaks',calibrated(300,'g',6.50,'venison steaks 300g',{eachWeight:150}));
  put('Pomegranate Molasses',calibrated(250,'ml',2.75,'pomegranate molasses 250ml',{gramsPerMl:1.3,tbspWeight:20}));
  put('Chorizo Slices',calibrated(120,'g',2.25,'chorizo slices 120g',{eachWeight:10,sliceWeight:10}));
  put('Steamed Basmati Rice',calibrated(250,'g',0.70,'steamed basmati rice pouch 250g',{pouchWeight:250}));
  put('Sushi Rice',calibrated(250,'g',1.00,'sushi rice pouch 250g',{pouchWeight:250}));
  put('Blood Orange',calibrated(4,'each',2.00,'blood oranges x4',{eachWeight:150}));
  put('Instant Gravy Powder',calibrated(170,'g',1.50,'gravy granules 170g',{tbspWeight:12,tspWeight:4}));
  put('Pineapple Rings',calibrated(1,'tin',0.95,'pineapple rings tin',{tinWeight:260}));
  put('Unconventional Plant-Based Burgers',calibrated(2,'each',2.50,'plant-based burgers x2',{eachWeight:113}));
  put('Pizza Dough',calibrated(2,'each',2.00,'pizza dough balls x2',{ballWeight:220,eachWeight:220}));
  put('Pork Rib Rack',calibrated(500,'g',5.00,'pork rib rack 500g',{eachWeight:500}));
  put('Onion Marmalade',calibrated(300,'g',1.75,'onion marmalade 300g',{tbspWeight:18}));
  put('Filo Pastry Sheets',calibrated(8,'each',1.50,'filo pastry sheets x8'));
  put('Monkfish Medallions',calibrated(250,'g',6.00,'monkfish medallions 250g'));
  put('Premium Tomato Mix',calibrated(250,'g',1.75,'mixed tomatoes 250g'));

  // Known identity collisions from the v0.27 broad alias layer.
  from('Baby Plum Tomatoes','cherry tomatoes 250g',{eachWeight:18});
  put('Mango Chutney',calibrated(360,'g',1.50,'mango chutney 360g',{tbspWeight:18,tspWeight:6}));
  put('Salted Peanuts',calibrated(200,'g',1.50,'salted peanuts 200g'));
  from('Pearl Couscous','couscous 500g');
  from('Basil Pesto with Cashew Nuts','green pesto 190g',{tbspWeight:16,tspWeight:5});
  put('Breadcrumbs',calibrated(175,'g',0.95,'breadcrumbs 175g'));
  put('Breaded Fish Burgers',calibrated(2,'each',3.00,'breaded fish burgers x2',{eachWeight:100}));
  from(['British Cumberland Sausages','British Hickory Smoked Sausages','British Honey Mustard Sausages'],'pork sausages x8',{eachWeight:62.5});
  from('Parmigiano Reggiano','parmesan 170g');
  put("Goat's Cheese",calibrated(100,'g',1.85,"goat's cheese 100g"));
  from('Apple and Sage Jelly','apple and sage jelly jar');
  from('Lemon & Herb Seasoning','garam masala jar',{label:'seasoning blend equivalent'});
  from('Spinach and Ricotta Tortelloni','pasta 500g',{label:'fresh tortelloni equivalent'});
  from("'Nduja and Red Pepper Ravioli",'pasta 500g',{label:'fresh ravioli equivalent'});
  from('Garlic & Herb Seasoning','garam masala jar',{label:'seasoning blend equivalent'});
  put('Garlic and Mixed Herbs Mature Cheddar',calibrated(400,'g',3.01,'mature cheddar 400g'));
  from('Pumpkin and Sage Girasoli','pasta 500g',{label:'fresh filled pasta equivalent'});
  from('Dried Cranberries','raisins 500g',{label:'dried fruit equivalent'});
  put('Pieminister Big Cheese Vintage Cheddar & Leek Pie',calibrated(1,'each',4.00,'individual cheese and leek pie'));
  put('Ginger, Garlic & Lemongrass Puree',calibrated(90,'g',1.70,'ginger garlic lemongrass puree 90g',{tbspWeight:15,tspWeight:5}));
  put('Red Pepper Chilli Jelly',calibrated(250,'g',1.85,'chilli jelly 250g',{tbspWeight:18,tspWeight:6}));
  put('Caramelised Onion Paste',calibrated(100,'g',1.35,'caramelised onion paste 100g',{tbspWeight:18,tspWeight:6}));
  from('Slow Cooked Wild Garlic British Porchetta','pork strips 400g',{label:'prepared pork equivalent'});
  put('Red Wine Stock Paste',calibrated(112,'g',1.80,'red wine stock concentrate 112g',{sachetWeight:14}));
  put('Red Wine Jus Paste',calibrated(112,'g',1.80,'red wine jus concentrate 112g',{sachetWeight:14}));
  put('Guinness® Paste',calibrated(112,'g',1.80,'stout cooking concentrate 112g',{sachetWeight:14}));
  put('White Wine Stock Powder',calibrated(80,'g',1.50,'white wine stock powder 80g',{sachetWeight:10}));
  put('White Cabbage and Broccoli Slaw',calibrated(300,'g',1.25,'cabbage and broccoli slaw 300g'));
  from('Cashew Butter','peanut butter 340g',{label:'cashew butter equivalent'});
  from('Oil for the Breadcrumbs','cooking oil 1 litre');
  from('Olive Oil for the Garlic Bread','cooking oil 1 litre');
  from('Salt for the Tofu','table salt 750g');
  put('Salted Barramundi',calibrated(240,'g',5.00,'barramundi fillets equivalent',{eachWeight:120}));
  from('Sliced Carrot and Cabbage Mix','cabbage',{packQty:300,unit:'g',price:1.10,label:'carrot and cabbage mix 300g'});

  // Dairy and cheese source lines are given in grams, not generic "packs".
  from(['Mature Cheddar Cheese'],'cheddar cheese pack',{packQty:400,unit:'g',label:'mature cheddar 400g'});
  from(['Grated Hard Italian Style Cheese'],'parmesan 170g',{label:'hard Italian cheese equivalent'});
  from(['Greek Style Salad Cheese'],'feta 200g',{label:'Greek style salad cheese 200g'});
  from(['Greek Style Natural Yoghurt'],'Greek style natural yoghurt 1kg');
  put('Low Fat Natural Yoghurt',calibrated(500,'g',1.10,'low fat natural yoghurt 500g'));
  from(['Cream Cheese'],'soft cheese 300g');
  put('Ricotta Cheese',calibrated(250,'g',1.50,'ricotta 250g'));
  put('Crumbled Blue Cheese',calibrated(150,'g',2.20,'blue cheese 150g'));
  put('Yoghurt Sauce',calibrated(200,'g',1.25,'yoghurt sauce 200g'));
  put('Dill',calibrated(20,'g',0.60,'fresh dill 20g',{bunchWeight:20}));

  // More specific prepared items that broad ingredient words used to steal.
  put('Mustard Seeds',calibrated(100,'g',1.20,'mustard seeds 100g',{tspWeight:3}));
  put('Dried Basil',clone('dried herbs jar',{label:'dried basil jar'}));
  put('Dried Mint',clone('dried herbs jar',{label:'dried mint jar'}));
  from('Pitta Breads','bread loaf',{packQty:6,unit:'each',price:1.00,label:'pitta breads x6'});
  put('Garlic Baguette',calibrated(2,'each',1.25,'garlic baguettes x2'));
  put('Black Garlic Paste',calibrated(75,'g',2.25,'black garlic paste 75g',{tbspWeight:15,tspWeight:5}));
  put('British Pork Loin Steaks',current(480,'g',2.99,'British pork loin steaks 480g',{eachWeight:120}));
  put('Gammon Steaks',calibrated(400,'g',3.50,'gammon steaks 400g',{eachWeight:200}));
  put('Lamb Steaks',calibrated(300,'g',5.50,'lamb steaks 300g',{eachWeight:150}));
  put('British Streaky Bacon',calibrated(300,'g',2.50,'streaky bacon 300g',{rasherWeight:25}));
  put('British Smoked Bacon Lardons',current(200,'g',1.69,'smoked bacon lardons 200g'));
  put('Diced Chorizo',current(130,'g',2.55,'diced chorizo 130g'));
  put('British Beef and Pork Mince',current(500,'g',4.00,'beef and pork mince 500g'));
  put('British Beef Mince',current(500,'g',5.05,'5% fat British beef mince 500g',{marketAverage:true,marketEvidence:[{retailer:'Tesco',price:5.05,asOf:AS_OF},{retailer:'Sainsbury’s',price:5.05,asOf:AS_OF}]}));
  put('Butter Beans',current(1,'tin',0.45,'butter beans 400g tin',{tinWeight:400}));
  put('Lentils',current(1,'tin',0.45,'green lentils 390g tin',{tinWeight:390}));
  put('Chermoula Spice Mix',calibrated(40,'g',1.50,'chermoula seasoning 40g',{sachetWeight:10}));
  put('Puff Pastry Sheet',calibrated(320,'g',1.50,'puff pastry sheet 320g',{eachWeight:320,packWeight:320}));
  put('Lasagne Sheets',calibrated(500,'g',0.95,'lasagne sheets 500g',{packWeight:500}));
  put('Vegetable Gyozas',calibrated(240,'g',2.25,'vegetable gyozas 240g',{eachWeight:20}));
  put('Creamed Coconut',calibrated(200,'g',1.20,'creamed coconut 200g'));

  // Product entries that are physically sold by piece but recipes specify grams.
  put('Salmon Fillets',current(240,'g',4.73,'Scottish salmon fillets x2 240g',{eachWeight:120,marketAverage:true,marketEvidence:[{retailer:'Tesco',price:4.50,asOf:AS_OF},{retailer:'Sainsbury’s',price:4.95,asOf:AS_OF}]}));
  put('Basa Fillets',current(250,'g',1.79,'basa fillets 250g',{eachWeight:125}));
  put('Haddock Fillets',current(360,'g',6.50,'haddock fillets 360g',{eachWeight:180}));
  put('Skin-On Hake Fillets',current(240,'g',4.75,'hake fillets 240g',{eachWeight:120}));
  put('Sea Bream Fillets',current(180,'g',5.75,'sea bream fillets 180g',{eachWeight:90}));
  put('Fish Pie Mix',current(400,'g',6.00,'fish pie mix 400g'));
  put('Smoked Salmon',current(100,'g',3.80,'smoked salmon 100g'));
  from('Egg Noodle Nest','egg noodles 4 nests',{nestWeight:62.5});
  from('Udon Noodles','egg noodles 4 nests',{packQty:300,unit:'g',price:1.50,label:'udon noodles 300g'});
  put(['British Chicken Breasts','Diced British Chicken Breast','Skin-On British Chicken Breasts','chicken breast'],current(1000,'g',6.69,'British chicken breast fillets 1kg',{eachWeight:180,marketAverage:true,marketEvidence:[{retailer:'Tesco',price:6.69,asOf:AS_OF},{retailer:'Sainsbury’s',price:6.69,asOf:AS_OF}]}));
  put(['King Prawns','Large King Prawns'],current(150,'g',2.74,'large king prawns 150g',{marketAverage:true,marketEvidence:[{retailer:'Tesco',price:2.49,asOf:AS_OF},{retailer:'Sainsbury’s',price:2.99,asOf:AS_OF}]}));
  put('Mussels',current(500,'g',2.65,'fresh mussels 500g'));
  put('Orkney Crab Meat',current(100,'g',7.20,'white crab meat 100g'));
  put('Confit British Duck Legs',calibrated(2,'each',7.00,'confit duck legs x2',{eachWeight:220}));
  put('Fresh Tagliatelle',current(300,'g',1.50,'fresh tagliatelle 300g'));
  put(['Cured Ham Tortelloni','Spinach and Ricotta Tortelloni',"'Nduja and Red Pepper Ravioli",'Pumpkin and Sage Girasoli'],current(300,'g',2.25,'fresh filled pasta 300g'));
  from('British Chicken Thighs','British chicken thigh fillets 1kg',{eachWeight:110});

  // Gousto source identities retained verbatim. These are pricing benchmarks only; they do not substitute the recipe ingredient.
  put("intense chicken stock mix",calibrated(100,"g",1.5,"intense chicken stock mix 100g"));
  put("white long grain rice",calibrated(1000,"g",1.5,"white long grain rice 1kg"));
  put("solid creamed coconut",calibrated(200,"g",1.2,"solid creamed coconut 200g"));
  put("curry powder",calibrated(90,"g",1.25,"curry powder 90g",{"tspWeight":4,"tbspWeight":12}));
  put("fresh root ginger",calibrated(200,"g",1.5,"fresh root ginger 200g"));
  put("chopped dates",calibrated(200,"g",1.75,"chopped dates 200g"));
  put("tamarind paste",calibrated(200,"g",2,"tamarind paste 200g"));
  put("brown onion",calibrated(3,"each",0.9,"brown onions x3",{"eachWeight":150}));
  put("tomato paste",calibrated(200,"g",0.75,"tomato paste 200g"));
  put("Henderson's Relish",calibrated(284,"ml",2,"Henderson's Relish 284ml"));
  put("white potato",calibrated(9,"each",1.8,"white potatoes 2kg",{"eachWeight":220}));
  put("diced pollock",calibrated(300,"g",4,"diced pollock 300g"));
  put("shallot",calibrated(4,"each",1,"shallots x4",{"eachWeight":45}));
  put("brown long grain rice",calibrated(1000,"g",1.75,"brown long grain rice 1kg"));
  put("waxy potatoes",calibrated(1000,"g",1.25,"waxy potatoes 1kg"));
  put("blanched peas",calibrated(900,"g",1.55,"peas 900g"));
  put("green chilli",calibrated(3,"each",0.7,"green chillies x3",{"eachWeight":20}));
  put("flaked almonds",calibrated(200,"g",2.5,"flaked almonds 200g"));
  put("plain naan",calibrated(2,"each",1.25,"plain naan breads x2",{"eachWeight":130}));
  put("chicken stock mix",calibrated(100,"g",1.5,"chicken stock mix 100g"));
  put("skewers",calibrated(100,"each",1.5,"bamboo skewers x100"));
  put("fresh orecchiette",calibrated(300,"g",2.25,"fresh orecchiette 300g"));
  put("arborio rice",calibrated(500,"g",1.75,"arborio rice 500g"));
  put("Chinese rice wine",calibrated(150,"ml",2.5,"Chinese rice wine 150ml"));
  put("yellow pepper",calibrated(3,"each",1.5,"yellow peppers x3",{"eachWeight":160}));
  put("white wine vinegar",calibrated(350,"ml",1.5,"white wine vinegar 350ml"));
  put("sourdough pittas",calibrated(4,"each",1.5,"sourdough pittas x4",{"eachWeight":75}));
  put("sriracha hot chilli sauce",calibrated(455,"ml",2.5,"sriracha hot chilli sauce 455ml"));
  put("4 vegetable samosas",calibrated(250,"g",2,"vegetable samosas 250g"));
  put("sultanas",calibrated(500,"g",1.75,"sultanas 500g"));
  put("heritage tomatoes",calibrated(250,"g",2,"heritage tomatoes 250g"));
  put("sun-dried tomato pesto",calibrated(190,"g",2.5,"sun-dried tomato pesto 190g"));
  put("tomato & mozzarella tortelloni",calibrated(300,"g",2.25,"tomato and mozzarella tortelloni 300g"));
  put("dried chilli flakes",calibrated(45,"g",1.2,"dried chilli flakes 45g",{"tspWeight":2}));
  put("bacon lardons",calibrated(200,"g",1.69,"bacon lardons 200g"));
  put("crème fraîche",calibrated(300,"g",1.35,"crème fraîche 300g"));
  put("puff pastry",calibrated(320,"g",1.5,"puff pastry 320g"));
  put("'Nduja",calibrated(100,"g",2.5,"'Nduja 100g"));
  put("fennel seeds",calibrated(50,"g",1.25,"fennel seeds 50g",{"tspWeight":3}));
  put("baby leaf salad",calibrated(90,"g",0.9,"baby leaf salad 90g"));
  put("ras el hanout",calibrated(45,"g",1.5,"ras el hanout 45g",{"tspWeight":4,"tbspWeight":12}));
  put("ground sumac",calibrated(40,"g",1.5,"ground sumac 40g",{"tspWeight":4}));
  put("sweet pointed pepper",calibrated(2,"each",1.5,"sweet pointed peppers x2",{"eachWeight":160}));
  put("wholewheat tortiglioni",calibrated(500,"g",1.25,"wholewheat tortiglioni 500g"));
  put("Cornish clotted cream",calibrated(227,"g",2.5,"Cornish clotted cream 227g"));
  put("ginger paste",calibrated(90,"g",1.5,"ginger paste 90g",{"tspWeight":5,"tbspWeight":15}));
  put("brioche style buns",calibrated(4,"each",1.5,"brioche buns x4",{"eachWeight":70}));
  put("pine kernel & seed mix",calibrated(100,"g",2,"pine kernel and seed mix 100g"));
  put("farfalle",calibrated(500,"g",1.1,"farfalle 500g"));
  put("tortiglioni",calibrated(500,"g",1.1,"tortiglioni 500g"));
  put("slow cooked duck legs",calibrated(2,"each",7,"slow cooked duck legs x2",{"eachWeight":220}));
  put("blanched edamame beans",calibrated(500,"g",2.25,"edamame beans 500g"));
  put("toasted sesame oil",calibrated(250,"ml",2.5,"toasted sesame oil 250ml"));
  put("cumin seeds",calibrated(80,"g",1.25,"cumin seeds 80g",{"tspWeight":3}));
  put("sweet pea pods",calibrated(150,"g",1.5,"sweet pea pods 150g"));
  put("traditional Italian pesto",calibrated(190,"g",2.5,"traditional Italian pesto 190g"));
  put("seasonal salad",calibrated(100,"g",1,"seasonal salad 100g"));
  put("nigella seeds",calibrated(45,"g",1.25,"nigella seeds 45g",{"tspWeight":3}));
  put("cooked brown long grain rice",calibrated(250,"g",0.75,"cooked brown long grain rice 250g"));
  put("smoked streaky bacon",calibrated(300,"g",2.5,"smoked streaky bacon 300g"));
  put("ground almonds",calibrated(200,"g",2.5,"ground almonds 200g"));
  put("cardamom pod",calibrated(25,"each",1.5,"cardamom pods x25"));
  put("cayenne pepper",calibrated(40,"g",1.25,"cayenne pepper 40g",{"tspWeight":3}));
  put("agave nectar",calibrated(250,"g",2.5,"agave nectar 250g"));
  put("cultured coconut",calibrated(350,"g",2,"cultured coconut 350g"));
  put("vegan mayonnaise",calibrated(500,"ml",2,"vegan mayonnaise 500ml"));
  put("mirin",calibrated(150,"ml",2,"mirin 150ml"));
  put("ultimate vegan burger patties",calibrated(2,"each",2.5,"vegan burger patties x2",{"eachWeight":113}));
  put("meat-free chick'n",calibrated(300,"g",3,"meat-free chick'n 300g"));
  put("roti",calibrated(6,"each",1.5,"roti x6",{"eachWeight":55}));

  // Gousto recipes use exact source labels and sometimes express a packaged
  // ingredient by its gram weight while the old broad matcher returned a
  // generic "pack" identity. Keep the source ingredient, but price it with a
  // compatible physical unit so trolley totals and cupboard depletion remain
  // measurable.
  put('Pepper',clone('black pepper 50g',{defaultUsage:1}));
  put('cheddar cheese',current(400,'g',2.95,'mature cheddar 400g',{sliceWeight:20}));
  put(['grated Italian hard cheese','Italian hard cheese'],current(170,'g',2.50,'Italian hard cheese 170g'));
  put('finely chopped tomatoes',current(400,'g',0.55,'finely chopped tomatoes 400g'));
  put('natural yoghurt',current(500,'g',1.10,'natural yoghurt 500g'));
  put(['chicken breast portions','chicken breast portion','free range chicken breast portions'],current(1000,'g',6.69,'British chicken breast fillets 1kg',{eachWeight:180}));
  put('panko breadcrumbs',current(175,'g',0.95,'panko breadcrumbs 175g'));
  put('roasted garlic paste',current(100,'g',1.50,'roasted garlic paste 100g',{tbspWeight:15,tspWeight:5}));
  put('Greek salad cheese',current(200,'g',1.65,'Greek style salad cheese 200g'));
  put('black beans',current(400,'g',0.60,'black beans 400g tin'));
  put('Proper Porker sausages',current(1,'pack',3.00,'Proper Porker sausages pack'));
  put('chickpeas',current(400,'g',0.60,'chickpeas 400g tin'));
  put('creamy single oat',current(250,'ml',1.50,'single oat cream 250ml'));
  put('ginger & garlic paste',current(100,'g',1.50,'ginger and garlic paste 100g',{tbspWeight:15,tspWeight:5}));
  put('red chilli relish',current(250,'g',1.75,'red chilli relish 250g',{tbspWeight:18,tspWeight:6}));
  put('Meatless Farm sausages',current(1,'pack',2.50,'meat-free sausages pack'));
  put('pak choi',current(400,'g',1.50,'pak choi 400g',{eachWeight:200}));
  put('spiced plum chutney',current(300,'g',1.75,'spiced plum chutney 300g',{tbspWeight:18}));
  put(['skin-on salmon fillets','skin on salmon fillets'],current(240,'g',4.73,'Scottish salmon fillets x2 240g',{eachWeight:120}));
  put('lighter cheese',current(400,'g',2.75,'lighter cheddar 400g'));
  put('Large Salmon Fillet',current(400,'g',7.50,'large salmon fillet 400g',{eachWeight:200}));
  put('wild garlic paste',current(100,'g',1.75,'wild garlic paste 100g',{tbspWeight:15,tspWeight:5}));
  put('lemongrass and lime leaf paste',current(100,'g',1.75,'lemongrass and lime leaf paste 100g',{tbspWeight:15,tspWeight:5}));
  put('diced chorizo',current(1,'pack',2.55,'diced chorizo 130g pack',{packWeight:130}));
  put('red kidney beans',current(1,'tin',0.60,'red kidney beans 400g tin',{tinWeight:400}));

  // Additional sourced lunch identities. Pricing only; no ingredient substitution is performed.
  put('flame-baked pizza bases',calibrated(2,'each',2.00,'flame-baked pizza bases x2',{eachWeight:220}));
  put('Wildfarmed pizza bases',calibrated(2,'each',2.50,'Wildfarmed pizza bases x2',{eachWeight:220}));
  put('French Camembert',calibrated(250,'g',3.00,'French Camembert 250g'));
  put('shichimi togarashi',calibrated(15,'g',2.50,'shichimi togarashi 15g',{tspWeight:3}));
  put('sweet pepper relish',calibrated(300,'g',1.50,'sweet pepper relish 300g'));
  put('fish sauce',calibrated(150,'ml',1.50,'fish sauce 150ml'));
  put('hake fillets',calibrated(240,'g',4.75,'hake fillets 240g',{eachWeight:120}));

  put("THIS™ Isn't Pork Sausages",current(6,'each',3.00,"THIS Isn't Pork Sausages x6",{eachWeight:60}));
  put('blue stilton® cheese',current(200,'g',2.50,'Blue Stilton 200g'));
  put('garlic & herb dip',current(100,'g',1.50,'garlic and herb dip 100g'));
  put('smoked mackerel fillet',current(240,'g',2.50,'smoked mackerel 240g',{eachWeight:80}));
  put('tuna chunks in spring water',current(1,'tin',1.10,'tuna chunks in spring water 145g tin',{tinWeight:145}));
  put('ground cumin',current(40,'g',1.25,'ground cumin 40g',{tspWeight:2.2,eachWeight:4}));
  put('canned sweetcorn',current(1,'tin',0.65,'sweetcorn 200g tin',{tinWeight:200}));
  put('THIS plant based sausages',current(1,'pack',3.00,'THIS plant based sausages pack'));

  // Public retail snapshots: a price observation is not whole-recipe verification.
  const retailSnapshots=[{"aliases":["British Cumberland Sausages","Cumberland sausages"],"entry":{"packQty":8,"unit":"each","price":1.79,"label":"Cumberland sausages x8 454g","eachWeight":56.75,"savingPrice":1.79,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-butcher-s-choice-cumberland-british-pork-sausage-x8-454g","note":"Butcher's Choice range, not premium sausages. Average piece weight: 454 g divided by eight.","price":1.79}}},{"aliases":["pork sausages","sausages"],"entry":{"packQty":8,"unit":"each","price":1.79,"label":"pork sausages x8 454g","eachWeight":56.75,"savingPrice":1.79,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-butcher-s-choice-british-pork-sausage-x8-454g","note":"Butcher's Choice range, not premium sausages.","price":1.79}}},{"aliases":["Tenderstem® Broccoli","Tenderstem Broccoli"],"entry":{"packQty":200,"unit":"g","price":1.6,"label":"Tenderstem broccoli 200g","savingPrice":1.6,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-tenderstem-broccoli-200g","note":"Correct vegetable identity. Temporary GBP 1.25 Nectar price not assumed.","price":1.6}}},{"aliases":["butter","salted butter"],"entry":{"packQty":250,"unit":"g","price":1.85,"label":"salted butter 250g","savingPrice":1.85,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-british-butter-salted-250g","note":"Actual retail pack, not a normalised 500 g equivalent.","price":1.85}}},{"aliases":["Potatoes","Maris Piper potatoes"],"entry":{"packQty":2000,"unit":"g","price":1.8,"label":"Maris Piper potatoes 2kg","savingPrice":1.8,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-maris-piper-potatoes-2kg","note":"Not automatically applied to salad or specialist varieties.","price":1.8}}},{"aliases":["Carrot","carrots"],"entry":{"packQty":1000,"unit":"g","price":0.69,"label":"carrots 1kg","eachWeight":80,"savingPrice":0.69,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-1kg-carrots","note":"80 g per medium carrot is a sizing estimate; weights vary.","price":0.69}}},{"aliases":["Garlic Clove","garlic","garlic cloves"],"entry":{"packQty":40,"unit":"clove","price":0.87,"label":"garlic x4 bulbs (about 40 cloves)","savingPrice":0.87,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-garlic-x4","note":"Four bulbs sold. Ten cloves per bulb is an estimate, not a retailer guarantee.","price":0.87}}},{"aliases":["milk","skimmed milk"],"entry":{"packQty":2270,"unit":"ml","cartonWeight":2270,"price":1.65,"label":"skimmed milk 2.27 litres (4 pints)","savingPrice":1.65,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-british-skimmed-milk-2-27l-4-pint","note":"Published 2.27 litre pack size; not used for whole milk.","price":1.65}}},{"aliases":["Green Beans","fine green beans"],"entry":{"packQty":200,"unit":"g","price":1.4,"label":"fine green beans 200g","eachWeight":8,"savingPrice":1.4,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-fine-green-beans-200g","note":"Piece weight, when needed, remains an estimate.","price":1.4}}},{"aliases":["Leek","leeks"],"entry":{"packQty":500,"unit":"g","price":1.37,"label":"leeks 500g","eachWeight":180,"savingPrice":1.37,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-leeks-500g","note":"180 g per leek is a sizing estimate.","price":1.37}}},{"aliases":["chicken breast","British Chicken Breasts"],"entry":{"packQty":1000,"unit":"g","price":6.69,"label":"British skinless chicken breast fillets 1kg","eachWeight":180,"savingPrice":6.69,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-1kg-british-fresh-skinless-boneless-chicken-breast-fillets","note":"Skinless boneless raw chicken; not proof for skin-on, prepared or frozen chicken.","price":6.69}}}];
  retailSnapshots.forEach(x=>put(x.aliases,x.entry));

  const contextualEntry=name=>{
    const n=norm(name);
    if(!n) return null;
    if(/^water\b/.test(n)||/^(?:boiled|boiling|hot) water\b/.test(n)||/^reserved .* water$/.test(n)) return water;
    if(/^(?:olive )?oil\b/.test(n)) return exact.get(norm('cooking oil'));
    if(/^salt\b/.test(n)) return exact.get(norm('salt'));
    if(/^sugar\b/.test(n)) return exact.get(norm('sugar'));
    if(/^butter\b/.test(n)) return exact.get(norm('butter'))||byLabel('butter 500g');
    if(/^honey\b/.test(n)) return byLabel('runny honey 340g');
    return null;
  };

  const entryCache=new Map();
  function entryFor(name){
    const key=String(name||'');
    if(entryCache.has(key))return entryCache.get(key);
    const n=norm(name);
    const e=exact.get(n)||contextualEntry(name)||legacyEntryFor(name)||null;
    if(e){e.marketChecked=false;e.marketAverage=false;e.marketEvidence=[];e.confidence="unverified-benchmark";}
    entryCache.set(key,e);
    return e;
  }

  const unitAlias=u=>{
    u=String(u||'').toLowerCase();
    if(/^tins?$|^cans?$/.test(u)) return 'tin';
    if(/^cloves?$/.test(u)) return 'clove';
    if(/^nests?$/.test(u)) return 'nest';
    if(/^cartons?$/.test(u)) return 'carton';
    if(/^bottles?$/.test(u)) return 'bottle';
    if(/^packs?$/.test(u)) return 'pack';
    if(/^sachets?$/.test(u)) return 'sachet';
    if(/^bunch(?:es)?$/.test(u)) return 'bunch';
    if(/^balls?$/.test(u)) return 'ball';
    if(/^rashers?$/.test(u)) return 'rasher';
    if(/^slices?$/.test(u)) return 'slice';
    if(/^pouches?$/.test(u)) return 'pouch';
    if(/^fillets?$/.test(u)) return 'fillet';
    if(/^wraps?$/.test(u)) return 'wrap';
    if(/^tortillas?$/.test(u)) return 'tortilla';
    if(/^sticks?$/.test(u)) return 'stick';
    if(/^bananas?$/.test(u)) return 'banana';
    return u;
  };
  const pieceWeight=(entry,unit)=>{
    const key={each:'eachWeight',fillet:'eachWeight',wrap:'eachWeight',tortilla:'eachWeight',banana:'eachWeight',stick:'eachWeight',nest:'nestWeight',sachet:'sachetWeight',bunch:'bunchWeight',ball:'ballWeight',rasher:'rasherWeight',slice:'sliceWeight',pouch:'pouchWeight',pack:'packWeight',tin:'tinWeight',carton:'cartonWeight',bottle:'bottleWeight'}[unit];
    return key&&Number(entry[key])>0?Number(entry[key]):null;
  };

  function amountFor(text,entry){
    if(!entry) return null;
    let raw=String(text||'').trim().toLowerCase().replace(/,/g,'');
    if(!raw) return null;
    if(raw==='to taste'||raw==='as needed'){
      const fallback={g:10,ml:50,each:1,tin:1,pack:1,carton:1,bottle:1,clove:1,nest:1,fillet:1,wrap:1,tortilla:1,stick:1,banana:1,sachet:1,bunch:1,ball:1,rasher:1,slice:1,pouch:1};
      return Number(entry.defaultUsage)||fallback[entry.unit]||null;
    }
    raw=raw.replace(/^½\s*/,'0.5 ').replace(/^¼\s*/,'0.25 ').replace(/^¾\s*/,'0.75 ');
    const m=raw.match(/^([0-9]+(?:\.[0-9]+)?)\s*(kg|g|ml|l|tbsp|tsp|tins?|cans?|cloves?|nests?|fillets?|wraps?|tortillas?|sticks?|cartons?|bottles?|packs?|bananas?|sachets?|bunch(?:es)?|balls?|rashers?|slices?|pouch(?:es)?)?\s*$/);
    if(!m) return null;
    const value=Number(m[1]);
    let unit=unitAlias(m[2]||'');
    if(!Number.isFinite(value)||value<=0) return null;
    if(unit==='kg') return entry.unit==='g'?value*1000:null;
    if(unit==='l') return entry.unit==='ml'?value*1000:null;
    if(unit==='g'){
      if(entry.unit==='g') return value;
      if(entry.unit==='ml'){
        const density=Number(entry.gramsPerMl)||(/sauce|glaze|vinegar|syrup|stock|paste/i.test(entry.label)?1:null);
        if(density) return value/density;
      }
      const w=pieceWeight(entry,entry.unit);
      return w?value/w:null;
    }
    if(unit==='ml'){
      if(entry.unit==='ml') return value;
      if(entry.unit==='g'&&entry.gramsPerMl) return value*Number(entry.gramsPerMl);
      return null;
    }
    if(unit==='tbsp'){
      if(entry.unit==='ml') return value*15;
      if(entry.unit==='g') return value*Number(entry.tbspWeight||15);
      return null;
    }
    if(unit==='tsp'){
      if(entry.unit==='ml') return value*5;
      if(entry.unit==='g') return value*Number(entry.tspWeight||4);
      return null;
    }
    if(!unit){
      if(['each','tin','pack','carton','bottle','clove','nest'].includes(entry.unit)) return value;
      if(entry.eachWeight&&(entry.unit==='g'||entry.unit==='ml')) return value*Number(entry.eachWeight);
      return null;
    }
    if(unit===entry.unit) return value;
    if(['fillet','wrap','tortilla','banana','stick'].includes(unit)&&entry.unit==='each') return value;
    if(unit==='can'&&entry.unit==='tin') return value;
    if(unit==='carton'&&entry.unit==='tin') return value;
    if(unit==='sachet'&&entry.unit==='g') return value*Number(entry.sachetWeight||Math.min(Number(entry.packQty)||10,10));
    if(unit==='bunch'&&entry.unit==='g') return value*Number(entry.bunchWeight||entry.packQty||20);
    if(unit==='pack'&&entry.unit==='g') return value*Number(entry.packWeight||entry.packQty||1);
    if(unit==='pack'&&entry.unit==='ml') return value*Number(entry.packWeight||entry.packQty||1);
    if(unit==='ball'&&entry.unit==='each') return value;
    if(unit==='bunch'&&entry.unit==='each') return value;
    if(unit==='sachet'&&entry.unit==='each') return value;
    const w=pieceWeight(entry,unit);
    if(w&&entry.unit==='g') return value*w;
    if(w&&entry.unit==='ml') return value*w;
    if(entry.unit==='g'&&unit==='carton'&&entry.packQty) return value*entry.packQty;
    if(entry.unit==='ml'&&unit==='carton'&&entry.packQty) return value*entry.packQty;
    return null;
  }

  function scaleAmount(text,factor){
    factor=factor==null?1:Number(factor);
    if(!Number.isFinite(factor)||factor<0)throw new RangeError("Invalid recipe scaling factor");
    if(Math.abs(factor-1)<0.001) return String(text);
    const m=String(text||'').trim().match(/^([0-9]+(?:\.[0-9]+)?)\s*(.*)$/);
    if(!m) return String(text);
    let value=Number(m[1])*factor;
    const unit=(m[2]||'').trim();
    const discrete=/^(tin|tins|can|cans|pack|packs|carton|cartons|bottle|bottles|clove|cloves|nest|nests|sachet|sachets|bunch|bunches|ball|balls|rasher|rashers|slice|slices|pouch|pouches|fillet|fillets|wrap|wraps|tortilla|tortillas|stick|sticks|banana|bananas)$/i.test(unit);
    // Keep recipe ratios exact. Retail packs are rounded in basket.calculate, not here.
    const display=Number.isInteger(value)?String(value):value.toFixed(2).replace(/0+$/,'').replace(/\.$/,'');
    return (display+(unit?' '+unit:'')).trim();
  }

  const priceFor=(entry,savingMode)=>savingMode&&Number.isFinite(entry.savingPrice)?Math.min(Number(entry.price),entry.savingPrice):Number(entry.price);
  function quote(name,amount,savingMode){
    const entry=entryFor(name);
    if(!entry){
      return {matched:false,resolved:false,name,amount,cost:2.50,normalCost:2.50,saving:0,confidence:'unpriced-estimate',label:'unpriced item estimate',asOf:null,benchmarkAsOf:AS_OF,marketChecked:false,marketAverage:false,marketEvidence:[],retailer:'Unverified price estimate'};
    }
    const needed=amountFor(amount,entry);
    const unitPrice=priceFor(entry,Boolean(savingMode));
    const normalPrice=Number(entry.price)||0;
    const resolved=Number.isFinite(needed)&&needed>0;
    const packs=resolved?Math.max(1,Math.ceil(needed/Number(entry.packQty||1))):(normalPrice===0?0:1);
    const cost=round(packs*unitPrice), normalCost=round(packs*normalPrice);
    return {
      matched:true,resolved,name,amount,packs,cost,normalCost,saving:round(Math.max(0,normalCost-cost)),
      confidence:'unverified-benchmark',label:entry.label,asOf:null,benchmarkAsOf:AS_OF,
      retailer:'Unverified price estimate',marketAverage:false,marketChecked:false,marketEvidence:[]
    };
  }

  function usageCostDetail(name,amount){
    const entry=entryFor(name);
    if(!entry) return {matched:false,resolved:false,cost:2.50,label:'unpriced item fallback'};
    const needed=amountFor(amount,entry);
    if(!Number.isFinite(needed)||needed<=0){
      // Never make an unparseable premium ingredient look artificially cheap.
      return {matched:true,resolved:false,cost:round(Number(entry.price)||0),label:entry.label};
    }
    return {matched:true,resolved:true,cost:round((needed/Number(entry.packQty||1))*(Number(entry.price)||0)),label:entry.label};
  }
  const usageCost=(name,amount)=>usageCostDetail(name,amount).cost;

  function rowsForRecipe(recipe){
    if(!recipe) return [];
    // The sourced catalogue's shoppingIngredients were generated with the old broad matcher.
    // v0.34 prices the original published ingredient identities instead, now that they resolve safely.
    if(recipe.sourcedCatalogue&&Array.isArray(recipe.ingredients)&&recipe.ingredients.length) return recipe.ingredients;
    return (Array.isArray(recipe.shoppingIngredients)&&recipe.shoppingIngredients.length)?recipe.shoppingIngredients:(recipe.ingredients||[]);
  }

  function recipeCost(recipe,people){
    if(!recipe||!Array.isArray(recipe.ingredients)) return Number(recipe&&recipe.cost||0);
    const factor=recipe.scaleSafe===false?1:(people==null?2:Number(people))/(recipe.servings||2);
    const rows=rowsForRecipe(recipe);
    const total=rows.reduce((sum,row)=>{
      const amount=recipe.scaleSafe===false?String(row[0]):scaleAmount(row[0],factor);
      return sum+usageCost(row[1],amount);
    },0);
    return round(total);
  }

  const isFreeWater=name=>entryFor(name)===water;
  p.entryFor=entryFor;
  p.scaleAmount=scaleAmount;
  p.amountFor=amountFor;
  p.quote=quote;
  p.usageCostDetail=usageCostDetail;
  p.usageCost=usageCost;
  p.recipeCost=recipeCost;
  p.rowsForRecipe=rowsForRecipe;
  p.isFreeWater=isFreeWater;
  p.asOf=null;
  p.benchmarkAsOf=AS_OF;
  p.retailer='Unverified UK price benchmarks';
  p.version='0.34';
  p.revision='qa4-retail-20260925';
  p.invalidateCache=()=>{entryCache.clear();p.revision+=':updated';};
})();
