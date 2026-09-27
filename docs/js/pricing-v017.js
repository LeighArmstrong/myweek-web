window.MW = window.MW || {};
(function(){
  const AS_OF='2026-09-22';
  const RETAILER="Sainsbury's";

  const book=[
    {re:/chicken breast/,packQty:1000,unit:'g',price:6.69,label:'British chicken breast fillets 1kg',confidence:'current'},
    {re:/chicken thigh/,packQty:1000,unit:'g',price:6.95,label:'British chicken thigh fillets 1kg',confidence:'current',eachWeight:110},
    {re:/turkey mince/,packQty:500,unit:'g',price:4.25,label:'7% fat British turkey mince 500g',confidence:'current'},
    {re:/beef mince/,packQty:500,unit:'g',price:5.05,label:'5% fat beef mince 500g',confidence:'current'},
    {re:/beef strips/,packQty:300,unit:'g',price:5.50,label:'beef strips 300g',confidence:'calibrated'},
    {re:/pork mince/,packQty:500,unit:'g',price:2.49,label:'pork mince 500g',confidence:'current'},
    {re:/pork strips/,packQty:400,unit:'g',price:4.25,label:'pork strips 400g',confidence:'calibrated'},
    {re:/lamb mince/,packQty:500,unit:'g',price:6.50,label:'lamb mince 500g',confidence:'calibrated'},
    {re:/pork sausage/,packQty:8,unit:'each',price:2.50,label:'pork sausages x8',confidence:'calibrated'},
    {re:/salmon fillet/,packQty:2,unit:'each',price:4.95,label:'Scottish salmon fillets x2 240g',confidence:'current'},
    {re:/cod fillet/,packQty:2,unit:'each',price:7.00,label:'cod fillets equivalent pack',confidence:'current'},
    {re:/king prawn|raw prawn|prawns?/,packQty:150,unit:'g',price:2.99,label:'large king prawns 150g',confidence:'current'},
    {re:/firm tofu|tofu/,packQty:300,unit:'g',price:1.42,label:'tofu 300g',confidence:'current'},
    {re:/halloumi/,packQty:225,unit:'g',price:1.99,label:'Cypriot halloumi 225g',confidence:'current'},
    {re:/chickpeas?/,packQty:1,unit:'tin',price:0.41,label:'chickpeas 400g, 240g drained',confidence:'current'},
    {re:/black beans?/,packQty:1,unit:'tin',price:0.75,label:'black beans tin',confidence:'calibrated'},
    {re:/butter beans?/,packQty:1,unit:'tin',price:0.65,label:'butter beans tin',confidence:'calibrated'},
    {re:/red lentils?/,packQty:500,unit:'g',price:1.35,label:'red lentils 500g',confidence:'calibrated'},
    {re:/green lentils?/,packQty:250,unit:'g',price:1.20,label:'cooked green lentils 250g',confidence:'calibrated'},
    {re:/tuna/,packQty:1,unit:'tin',price:0.85,label:'tuna tin',confidence:'calibrated'},

    {re:/basmati rice/,packQty:2000,unit:'g',price:3.58,label:'basmati rice 2kg',confidence:'current'},
    {re:/pasta|spaghetti|penne|fusilli|orzo/,packQty:500,unit:'g',price:0.75,savingPrice:0.69,label:'pasta 500g',confidence:'current'},
    {re:/egg noodles?/,packQty:4,unit:'nest',price:1.25,label:'egg noodles 4 nests',confidence:'calibrated'},
    {re:/small tortillas?|large wraps?|wraps?/,packQty:8,unit:'each',price:1.40,savingPrice:0.99,label:'wraps or tortillas x8',confidence:'calibrated'},
    {re:/baby potatoes?/,packQty:1000,unit:'g',price:0.99,label:'baby potatoes 1kg',confidence:'current'},
    {re:/potatoes?|baking potatoes?/,packQty:2000,unit:'g',price:1.80,label:'potatoes 2kg',confidence:'current',eachWeight:220},
    {re:/couscous/,packQty:500,unit:'g',price:1.30,label:'couscous 500g',confidence:'current'},
    {re:/bulgur wheat/,packQty:500,unit:'g',price:1.45,label:'bulgur wheat 500g',confidence:'calibrated'},
    {re:/flatbreads?/,packQty:4,unit:'each',price:1.50,label:'flatbreads x4',confidence:'calibrated'},
    {re:/oats?/,packQty:1000,unit:'g',price:1.35,label:'porridge oats 1kg',confidence:'calibrated'},

    {re:/greek style yoghurt|greek yoghurt/,packQty:1000,unit:'g',price:1.70,label:'Greek style natural yoghurt 1kg',confidence:'current'},
    {re:/soft cheese/,packQty:300,unit:'g',price:1.25,label:'soft cheese 300g',confidence:'calibrated'},
    {re:/parmesan/,packQty:170,unit:'g',price:3.00,label:'parmesan 170g',confidence:'calibrated'},
    {re:/feta/,packQty:200,unit:'g',price:2.35,label:'feta 200g',confidence:'current'},
    {re:/skimmed milk|milk/,packQty:1,unit:'carton',price:1.65,label:'British skimmed milk 4 pint carton',confidence:'current'},
    {re:/yoghurts?/,packQty:1,unit:'pack',price:1.10,label:'yoghurts pack',confidence:'current'},

    {re:/spinach/,packQty:200,unit:'g',price:1.50,label:'spinach 200g',confidence:'current'},
    {re:/red peppers?|peppers?/,packQty:3,unit:'each',price:1.99,label:'peppers pack',confidence:'calibrated',eachWeight:160},
    {re:/courgettes?/,packQty:3,unit:'each',price:1.35,label:'courgettes pack',confidence:'calibrated',eachWeight:180},
    {re:/cherry tomatoes?/,packQty:250,unit:'g',price:1.50,label:'cherry tomatoes 250g',confidence:'calibrated',eachWeight:18},
    {re:/tomatoes?/,packQty:6,unit:'each',price:1.25,label:'tomatoes pack',confidence:'calibrated',eachWeight:80},
    {re:/broccoli/,packQty:1,unit:'each',price:0.95,label:'broccoli head',confidence:'calibrated',eachWeight:350},
    {re:/carrots?/,packQty:1000,unit:'g',price:0.69,label:'carrots 1kg',confidence:'current',eachWeight:80},
    {re:/frozen peas|peas|garden peas/,packQty:910,unit:'g',price:1.55,label:'garden peas 910g',confidence:'current'},
    {re:/aubergine/,packQty:1,unit:'each',price:0.95,label:'aubergine',confidence:'calibrated',eachWeight:300},
    {re:/green beans?/,packQty:200,unit:'g',price:1.50,label:'green beans 200g',confidence:'calibrated',eachWeight:8},
    {re:/sweetcorn/,packQty:1,unit:'tin',price:0.65,label:'sweetcorn tin',confidence:'calibrated'},
    {re:/kale/,packQty:200,unit:'g',price:1.00,label:'kale 200g',confidence:'calibrated'},
    {re:/butternut squash/,packQty:1,unit:'each',price:1.35,label:'butternut squash',confidence:'calibrated',eachWeight:900},
    {re:/spring onions?/,packQty:6,unit:'each',price:0.65,label:'spring onions bunch',confidence:'calibrated'},
    {re:/red onions?/,packQty:3,unit:'each',price:0.95,label:'red onions x3',confidence:'calibrated'},
    {re:/onions?/,packQty:1000,unit:'g',price:0.95,label:'brown onions 1kg',confidence:'calibrated',eachWeight:150},
    {re:/cabbage/,packQty:1,unit:'each',price:0.80,label:'cabbage',confidence:'calibrated',eachWeight:700},
    {re:/sweet potatoes?/,packQty:1000,unit:'g',price:1.50,label:'sweet potatoes 1kg',confidence:'calibrated',eachWeight:250},
    {re:/cauliflower/,packQty:1,unit:'each',price:1.20,label:'cauliflower',confidence:'calibrated',eachWeight:600},
    {re:/lettuce|mixed leaves/,packQty:1,unit:'each',price:0.85,label:'lettuce or salad leaves',confidence:'calibrated'},
    {re:/cucumber/,packQty:1,unit:'each',price:0.95,label:'cucumber',confidence:'calibrated'},
    {re:/mixed berries|berries/,packQty:300,unit:'g',price:2.50,label:'berries 300g',confidence:'calibrated'},
    {re:/bananas?/,packQty:5,unit:'each',price:0.78,label:'bananas x5',confidence:'current'},

    {re:/chopped tomatoes?/,packQty:1,unit:'tin',price:0.45,label:'chopped tomatoes 400g',confidence:'current'},
    {re:/passata/,packQty:500,unit:'g',price:0.60,label:'passata 500g',confidence:'calibrated'},
    {re:/coconut milk/,packQty:400,unit:'ml',price:1.30,label:'coconut milk 400ml tin',confidence:'current'},
    {re:/vegetable stock/,packQty:5000,unit:'ml',price:1.25,label:'vegetable stock cubes',confidence:'calibrated'},
    {re:/beef stock/,packQty:5000,unit:'ml',price:1.25,label:'beef stock cubes',confidence:'calibrated'},
    {re:/tomato puree/,packQty:200,unit:'g',price:0.75,label:'tomato puree 200g',confidence:'calibrated',tbspWeight:18,tspWeight:6},
    {re:/green pesto/,packQty:190,unit:'g',price:1.75,label:'green pesto 190g',confidence:'calibrated',tbspWeight:16,tspWeight:5},
    {re:/harissa paste/,packQty:130,unit:'g',price:1.75,label:'harissa paste 130g',confidence:'calibrated',tbspWeight:18,tspWeight:6},
    {re:/miso paste/,packQty:150,unit:'g',price:2.60,label:'miso paste 150g',confidence:'calibrated',tbspWeight:18,tspWeight:6},
    {re:/tahini/,packQty:300,unit:'g',price:2.10,label:'tahini 300g',confidence:'calibrated',tbspWeight:15,tspWeight:5},
    {re:/peanut butter/,packQty:340,unit:'g',price:1.50,label:'peanut butter 340g',confidence:'calibrated',tbspWeight:16,tspWeight:5},
    {re:/soy sauce/,packQty:150,unit:'ml',price:1.00,label:'soy sauce 150ml',confidence:'calibrated'},
    {re:/teriyaki sauce/,packQty:150,unit:'ml',price:2.00,label:'teriyaki sauce 150ml',confidence:'calibrated'},
    {re:/sweet chilli sauce/,packQty:300,unit:'ml',price:1.00,label:'sweet chilli sauce 300ml',confidence:'calibrated'},
    {re:/maple syrup/,packQty:250,unit:'ml',price:2.50,label:'maple syrup 250ml',confidence:'calibrated'},
    {re:/honey/,packQty:340,unit:'g',price:1.04,label:'runny honey 340g',confidence:'current',tbspWeight:21,tspWeight:7},
    {re:/mustard/,packQty:185,unit:'g',price:0.70,label:'mustard 185g',confidence:'calibrated',tbspWeight:15,tspWeight:5},
    {re:/garlic/,packQty:12,unit:'clove',price:0.80,label:'garlic bulbs equivalent',confidence:'calibrated'},
    {re:/fresh ginger/,packQty:100,unit:'g',price:0.70,label:'fresh ginger 100g',confidence:'calibrated',tspWeight:5},
    {re:/mixed herbs|oregano|rosemary/,packQty:14,unit:'g',price:0.85,label:'dried herbs jar',confidence:'calibrated',tspWeight:1},
    {re:/smoked paprika|paprika/,packQty:45,unit:'g',price:1.10,label:'paprika jar',confidence:'calibrated',tspWeight:2.3},
    {re:/ground cumin/,packQty:40,unit:'g',price:1.25,label:'ground cumin jar',confidence:'calibrated',tspWeight:2.2},
    {re:/garam masala/,packQty:42,unit:'g',price:1.25,label:'garam masala jar',confidence:'calibrated',tspWeight:2.2},
    {re:/jerk seasoning/,packQty:35,unit:'g',price:1.50,label:'jerk seasoning jar',confidence:'calibrated',tspWeight:2.5},
    {re:/sesame seeds/,packQty:100,unit:'g',price:1.50,label:'sesame seeds 100g',confidence:'calibrated',tspWeight:3},
    {re:/brown sugar/,packQty:500,unit:'g',price:1.20,label:'brown sugar 500g',confidence:'calibrated',tspWeight:4},
    {re:/lemons?/,packQty:4,unit:'each',price:1.00,label:'lemons x4',confidence:'calibrated'},
    {re:/limes?/,packQty:4,unit:'each',price:1.00,label:'limes x4',confidence:'calibrated'},
    {re:/pak choi|bok choy/,packQty:2,unit:'each',price:1.20,label:'pak choi x2',confidence:'calibrated'},
    {re:/rocket/,packQty:60,unit:'g',price:1.00,label:'rocket 60g',confidence:'calibrated'},
    {re:/fresh coriander|coriander/,packQty:30,unit:'g',price:0.52,label:'fresh coriander 30g',confidence:'calibrated'},
    {re:/fresh chives|chives/,packQty:20,unit:'g',price:0.60,label:'fresh chives 20g',confidence:'calibrated'},
    {re:/fresh basil|basil/,packQty:30,unit:'g',price:0.70,label:'fresh basil 30g',confidence:'calibrated'},
    {re:/fresh mint|mint/,packQty:30,unit:'g',price:0.70,label:'fresh mint 30g',confidence:'calibrated'},
    {re:/fresh parsley|parsley/,packQty:30,unit:'g',price:0.70,label:'fresh parsley 30g',confidence:'calibrated'},
    {re:/celery/,packQty:8,unit:'each',price:0.85,label:'celery bunch',confidence:'calibrated'},
    {re:/worcestershire sauce/,packQty:150,unit:'ml',price:1.90,label:'Worcestershire sauce 150ml',confidence:'calibrated',tbspWeight:15,tspWeight:5},
    {re:/cornflour/,packQty:250,unit:'g',price:1.50,label:'cornflour 250g',confidence:'calibrated',tbspWeight:8,tspWeight:3},
    {re:/curry paste/,packQty:180,unit:'g',price:2.25,label:'curry paste jar',confidence:'calibrated',tbspWeight:18,tspWeight:6},
    {re:/raisins?/,packQty:500,unit:'g',price:2.25,label:'raisins 500g',confidence:'calibrated'},
    {re:/chermoula/,packQty:30,unit:'g',price:1.25,label:'chermoula seasoning',confidence:'calibrated',tspWeight:3},
    {re:/olive oil|cooking oil/,packQty:1000,unit:'ml',price:3.60,label:'cooking oil 1 litre',confidence:'calibrated',tbspWeight:15,tspWeight:5},
    {re:/balsamic vinegar/,packQty:250,unit:'ml',price:1.75,label:'balsamic vinegar 250ml',confidence:'calibrated'},
    {re:/sun[- ]dried tomato paste/,packQty:90,unit:'g',price:1.50,label:'sun-dried tomato paste',confidence:'calibrated',tbspWeight:18,tspWeight:6},
    {re:/chicken stock cube|chicken stock powder/,packQty:12,unit:'each',price:1.25,label:'chicken stock cubes',confidence:'calibrated'},
    {re:/butter/,packQty:500,unit:'g',price:3.65,label:'butter 500g',confidence:'calibrated'},
    {re:/turmeric/,packQty:45,unit:'g',price:1.10,label:'ground turmeric jar',confidence:'calibrated',tspWeight:2.5},
    {re:/ground cinnamon|cinnamon/,packQty:40,unit:'g',price:1.20,label:'ground cinnamon jar',confidence:'calibrated',tspWeight:2.5},
    {re:/whole cloves?|cloves?/,packQty:30,unit:'g',price:1.20,label:'whole cloves jar',confidence:'calibrated',eachWeight:0.2,tspWeight:2},
    {re:/red chilli|chilli pepper/,packQty:3,unit:'each',price:0.75,label:'red chillies x3',confidence:'calibrated'},
    {re:/sugar/,packQty:1000,unit:'g',price:1.10,label:'granulated sugar 1kg',confidence:'calibrated',tspWeight:4},
    {re:/salt/,packQty:750,unit:'g',price:0.65,label:'table salt 750g',confidence:'calibrated',tspWeight:6},
    {re:/black pepper/,packQty:50,unit:'g',price:1.25,label:'black pepper 50g',confidence:'calibrated',tspWeight:2.3},

    {re:/eggs?/,packQty:12,unit:'each',price:2.95,label:'medium eggs x12',confidence:'current'},
    {re:/bread/,packQty:1,unit:'pack',price:1.35,label:'bread loaf',confidence:'calibrated'},
    {re:/cereal/,packQty:1,unit:'pack',price:3.00,label:'cereal pack',confidence:'calibrated'},
    {re:/cheese/,packQty:1,unit:'pack',price:2.75,label:'cheese pack',confidence:'calibrated'}
  ];

  const norm=x=>String(x||'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();

  function entryFor(name){
    const n=norm(name);
    return book.find(x=>x.re.test(n))||null;
  }

  function amountFor(text,entry){
    const raw=String(text||'').trim().toLowerCase();
    const m=raw.match(/^([0-9]+(?:\.[0-9]+)?)\s*(kg|g|ml|l|tbsp|tsp|tins?|cans?|cloves?|nests?|fillets?|wraps?|tortillas?|sticks?|cartons?|bottles?|packs?|bananas?|sachets?|bunch(?:es)?|balls?|rashers?|slices?|pouches?)?/);
    if(!m) return null;
    const value=Number(m[1]);
    const unit=m[2]||'';
    if(!Number.isFinite(value)||value<=0) return null;
    if(unit==='kg') return entry.unit==='g'?value*1000:null;
    if(unit==='g'){
      if(entry.unit==='g') return value;
      if(entry.unit==='ml'&&entry.gramsPerMl) return value/entry.gramsPerMl;
      return null;
    }
    if(unit==='l') return entry.unit==='ml'?value*1000:null;
    if(unit==='ml'){
      if(entry.unit==='ml') return value;
      if(entry.unit==='g'&&entry.gramsPerMl) return value*entry.gramsPerMl;
      return null;
    }
    if(unit==='tbsp'){
      if(entry.unit==='ml') return value*15;
      if(entry.unit==='g') return value*(entry.tbspWeight||15);
      return null;
    }
    if(unit==='tsp'){
      if(entry.unit==='ml') return value*5;
      if(entry.unit==='g') return value*(entry.tspWeight||4);
      return null;
    }
    if(/^tins?$|^cans?$/.test(unit)) return entry.unit==='tin'?value:null;
    if(/^cloves?$/.test(unit)) return entry.unit==='clove'?value:null;
    if(/^nests?$/.test(unit)) return entry.unit==='nest'?value:null;
    if(/^(cartons?|bottles?)$/.test(unit)) return ['carton','bottle'].includes(entry.unit)?value:null;
    if(/^packs?$/.test(unit)) return entry.unit==='pack'?value:null;
    if(/^(sachets?|bunch(?:es)?|balls?|rashers?|slices?|pouches?|fillets?|wraps?|tortillas?|sticks?|bananas?)$/.test(unit)) return entry.unit==='each'?value:null;
    if(entry.unit==='each'||entry.unit==='tin'||entry.unit==='pack'||entry.unit==='carton'||entry.unit==='bottle'||entry.unit==='clove'||entry.unit==='nest') return value;
    if(entry.eachWeight&&(entry.unit==='g'||entry.unit==='ml')) return value*entry.eachWeight;
    return null;
  }

  function priceFor(entry,savingMode){
    return Number(savingMode&&Number.isFinite(entry.savingPrice)?entry.savingPrice:entry.price);
  }

  function quote(name,amount,savingMode){
    const entry=entryFor(name);
    if(!entry){
      return {matched:false,name,amount,cost:2.50,normalCost:2.50,saving:0,confidence:'fallback',label:'unpriced item fallback',asOf:AS_OF};
    }
    const needed=amountFor(amount,entry);
    const unitPrice=priceFor(entry,Boolean(savingMode));
    const normalPrice=Number(entry.price);
    if(!Number.isFinite(needed)||needed<=0){
      return {matched:true,name,amount,cost:unitPrice,normalCost:normalPrice,saving:Math.max(0,normalPrice-unitPrice),confidence:entry.confidence,label:entry.label,asOf:AS_OF};
    }
    const packs=Math.max(1,Math.ceil(needed/entry.packQty));
    const cost=packs*unitPrice;
    const normalCost=packs*normalPrice;
    return {
      matched:true,name,amount,packs,
      cost:Math.round(cost*100)/100,
      normalCost:Math.round(normalCost*100)/100,
      saving:Math.round(Math.max(0,normalCost-cost)*100)/100,
      confidence:entry.confidence,label:entry.label,asOf:AS_OF
    };
  }

  function usageCost(name,amount){
    const entry=entryFor(name);
    if(!entry) return 0.55;
    const needed=amountFor(amount,entry);
    if(!Number.isFinite(needed)||needed<=0) return Math.min(Number(entry.price)||0,0.65);
    return Math.max(0,(needed/entry.packQty)*(Number(entry.price)||0));
  }

  function scaleAmount(text,factor){
    factor=Number(factor)||1;
    if(Math.abs(factor-1)<0.001) return String(text);
    const m=String(text||'').trim().match(/^([0-9]+(?:\.[0-9]+)?)\s*(.*)$/);
    if(!m) return String(text);
    let value=Number(m[1])*factor;
    const unit=(m[2]||'').trim();
    const discrete=/^(tin|tins|can|cans|pack|packs|carton|cartons|bottle|bottles|clove|cloves|nest|nests|sachet|sachets|bunch|bunches|ball|balls|rasher|rashers|slice|slices|pouch|pouches|fillet|fillets|wrap|wraps|tortilla|tortillas|stick|sticks|banana|bananas|salmon fillets|cod fillets|pork sausages|chicken thighs|large wraps|small tortillas)$/i.test(unit);
    if(discrete||!unit) value=Math.ceil(value);
    const display=Number.isInteger(value)?String(value):value.toFixed(1).replace(/\.0$/,'');
    return (display+(unit?' '+unit:'')).trim();
  }

  function recipeCost(recipe,people){
    if(!recipe||!Array.isArray(recipe.ingredients)) return Number(recipe&&recipe.cost||0);
    const factor=recipe.scaleSafe===false?1:(Number(people)||2)/(recipe.servings||2);
    const rows=(Array.isArray(recipe.shoppingIngredients)&&recipe.shoppingIngredients.length)?recipe.shoppingIngredients:recipe.ingredients;
    const total=rows.reduce((sum,row)=>{
      const amount=recipe.scaleSafe===false?String(row[0]):scaleAmount(row[0],factor);
      return sum+usageCost(row[1],amount);
    },0);
    return Math.round(total*100)/100;
  }

  function coverage(items){
    const rows=(items||[]).map(x=>Array.isArray(x)?x[1]:x&&x.name).filter(Boolean);
    if(!rows.length) return 1;
    return rows.filter(x=>entryFor(x)).length/rows.length;
  }

  MW.pricing={
    asOf:AS_OF,
    retailer:RETAILER,
    book,
    entryFor,
    amountFor,
    quote,
    usageCost,
    recipeCost,
    coverage
  };
})();