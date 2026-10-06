// My Week canonical pricing module. Historical layers consolidated in execution order for behavioural equivalence.

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
    if(/^nests?$/.test(unit)){
      if(entry.unit==='nest') return value;
      if(entry.unit==='g'&&entry.nestWeight) return value*entry.nestWeight;
      return null;
    }
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

// Market benchmark extensions

window.MW = window.MW || {};
(function(){
  const AS_OF='2026-09-24';
  const RETAILER='UK supermarket market check';
  const p=MW.pricing;
  if(!p||!Array.isArray(p.book)) throw new Error('pricing-v027 requires pricing-v017 first');

  const round=x=>Math.round(Number(x)*100)/100;
  const mean=values=>round(values.reduce((a,b)=>a+Number(b),0)/values.length);
  const stores=(sainsburys,tesco,asda,morrisons)=>{
    const out=[];
    if(Number.isFinite(sainsburys)) out.push({retailer:"Sainsbury's",price:round(sainsburys)});
    if(Number.isFinite(tesco)) out.push({retailer:'Tesco',price:round(tesco)});
    if(Number.isFinite(asda)) out.push({retailer:'ASDA',price:round(asda)});
    if(Number.isFinite(morrisons)) out.push({retailer:'Morrisons',price:round(morrisons)});
    return out;
  };
  const market=(label,values,note)=>{
    const e=p.book.find(x=>x.label===label);
    if(!e||!values.length) return;
    const prices=values.map(x=>x.price);
    e.price=mean(prices);
    if(Number.isFinite(e.savingPrice)&&e.savingPrice>e.price) e.savingPrice=e.price;
    e.marketChecked=true;
    e.marketAverage=values.length>=2;
    e.confidence=e.marketAverage?'market-average':'current-market-check';
    e.marketAsOf=AS_OF;
    e.marketEvidence=values;
    if(note) e.marketNote=note;
  };

  market('British chicken breast fillets 1kg',stores(6.69,7.00,6.94,6.99),'Normal shelf price, comparable 1kg packs.');
  market('British chicken thigh fillets 1kg',stores(6.95,7.25,9.12,7.25),'Prices normalised to 1kg where the comparable pack was smaller.');
  market('5% fat beef mince 500g',stores(5.05,5.05,5.15,5.19),'Comparable fresh own-brand lean mince.');
  market('pork mince 500g',stores(2.49,2.49,2.11,2.39),'Comparable normal shelf packs.');
  market('Cypriot halloumi 225g',stores(1.99,1.99,1.97,1.99),'Comparable 225g own-brand halloumi.');
  market('chickpeas 400g, 240g drained',stores(0.41,0.41,0.41,0.37),'Comparable own-brand 400g tins.');
  market('basmati rice 2kg',stores(3.58,3.60,3.60,3.60),'Comparable 2kg own-brand basmati.');
  market('pasta 500g',stores(0.69,0.69,0.71,0.75),'Comparable own-brand dry pasta.');
  market('potatoes 2kg',stores(1.80,1.80,1.80,1.80),'Comparable 2kg potato packs.');
  market('couscous 500g',stores(1.30,1.30,1.20,1.30),'Comparable plain couscous.');
  market('porridge oats 1kg',stores(1.25,1.25,1.30,1.35),'Comparable own-brand porridge oats.');
  market('soft cheese 300g',stores(1.95,1.95,1.80,1.95),'Smaller comparable packs normalised to 300g.');
  market('feta 200g',stores(2.35,2.25,2.04,2.25),'Comparable Greek-style feta packs.');
  market('spinach 200g',stores(1.04,0.71,1.07,1.25),'Fresh spinach prices normalised to 200g.');
  market('peppers pack',stores(1.99,2.10,2.10,1.69),'Comparable mixed pepper packs.');
  market('courgettes pack',stores(1.45,1.39,1.26,1.39),'Comparable packs normalised where required.');
  market('cherry tomatoes 250g',stores(0.68,0.83,0.75,0.83),'Fresh cherry tomato packs normalised to 250g.');
  market('carrots 1kg',stores(0.69,0.69,0.69,0.69),'Comparable 1kg packs or loose equivalent.');
  market('brown onions 1kg',stores(0.95,0.95,0.98,0.99),'Comparable 1kg packs.');
  market('coconut milk 400ml tin',stores(0.75,0.75,0.85,1.25),'Comparable own-brand 400ml tins.');
  market('passata 500g',stores(0.60,0.60,0.60,0.65),'Plain own-brand passata.');
  market('tomato puree 200g',stores(0.59,0.59,0.65,0.60),'Comparable own-brand tomato puree.');
  market('soy sauce 150ml',stores(0.55,0.55,0.57,0.65),'Comparable own-brand soy sauce.');
  market('peanut butter 340g',stores(1.10,0.95,0.97,1.25),'Comparable own-brand smooth peanut butter.');
  market('paprika jar',stores(1.15,1.10,1.03,1.10),'Own-brand smoked paprika, normalised to the existing jar size where needed.');
  market('chicken stock cubes',stores(1.32,1.32,1.25,1.30),'Prices normalised to 12 cubes.');
  market('medium eggs x12',stores(2.84,2.85,2.85,2.80),'Normal shelf free-range medium egg packs or pack-equivalent.');
  market('bread loaf',stores(0.75,0.75,0.75,0.85),'Comparable own-brand 800g everyday loaves.');
  market('Greek style natural yoghurt 1kg',stores(1.70,1.70,1.70,1.95),'Current comparable 1kg own-brand Greek style yoghurt.');
  market('red lentils 500g',stores(2.10,2.10,2.00,2.10),'Current comparable own-brand red split lentils 500g.');
  market('tuna tin',stores(0.65,0.65,0.72,0.74),'Current own-brand tuna chunks in brine, Morrisons four-pack normalised to one 145g tin.');
  market('cucumber',stores(0.99,0.99,undefined,0.99),'Current standard whole cucumber prices; three-retailer average where ASDA public price was not reliably exposed.');
  market('bananas x5',stores(0.78,0.78,undefined,0.78),'Current five-pack banana prices; three-retailer average where ASDA public price was not reliably exposed.');
  market('red onions x3',stores(0.95,0.95,0.95,0.95),'Current three-pack red onion prices.');
  market('sesame seeds 100g',stores(1.20,1.20,1.20,1.20),'Current prices normalised to 100g.');
  market('green beans 200g',stores(1.10,1.40,1.36,1.31),'Current fresh green bean prices normalised to 200g.');
  market('sweetcorn tin',stores(0.30,0.50,0.50,0.55),'Current own-brand sweetcorn tins around 198g to 200g; larger cans excluded from the comparison.');
  market('aubergine',stores(0.95,0.95,0.98,0.95),'Current standard whole aubergine prices.');
  market('baby potatoes 1kg',stores(0.99,1.05,0.99,0.99),'Current own-brand 1kg baby potato packs.');
  market('cauliflower',stores(1.18,1.18,undefined,1.19),'Current standard medium cauliflower prices; ASDA excluded where only a non-comparable size was exposed.');
  market('cabbage',stores(0.77,0.77,0.77,0.79),'Current comparable Savoy cabbage prices.');
  market('butternut squash',stores(1.50,1.50,1.49,1.50),'Current whole butternut squash prices.');
  market('lettuce or salad leaves',stores(0.95,0.95,undefined,0.89),'Current standard whole lettuce prices; three-retailer average where ASDA equivalent was not exposed cleanly.');
  market('black beans tin',stores(0.45,0.46,0.46,0.50),'Current own-brand black beans in water, 400g tins.');
  market('cooked green lentils 250g',stores(0.50,0.45,0.45,0.50),'Current canned green lentil prices; pack sizes around 390g to 400g, used as the nearest directly comparable ready-cooked product.');
  market('7% fat British turkey mince 500g',stores(3.95,4.25,4.17,4.00),'Current comparable turkey thigh or 7% fat mince 500g.');
  market('lamb mince 500g',stores(6.00,5.75,6.42,6.88),'Current regular lamb mince, Morrisons 454g pack normalised to 500g.');
  market('balsamic vinegar 250ml',stores(1.65,1.65,1.63,1.60),'Current comparable balsamic vinegar of Modena 250ml.');
  market('beef stock cubes',stores(1.32,1.20,1.25,1.30),'Own-brand beef stock cubes normalised to 12 cubes.');
  market('black pepper 50g',stores(1.61,1.60,1.60,1.28),'Ground black pepper normalised to a 50g pack.');
  market('bulgur wheat 500g',stores(2.10,2.10,2.00,2.05),'Current own-brand bulgur wheat 500g.');
  market('butter 500g',stores(3.70,3.70,3.70,3.70),'Current own-brand salted butter, normalised to 500g.');
  market('cornflour 250g',stores(1.33,1.28,undefined,1.25),'Current own-brand cornflour normalised to 250g; ASDA excluded where a directly comparable own-brand listing was not exposed.');
  market('chopped tomatoes 400g',stores(0.45,0.47,0.47,0.45),'Current own-brand chopped tomatoes 400g.');
  market('egg noodles 4 nests',stores(0.95,0.95,0.89,0.95),'Current own-brand egg noodles normalised to a 250g four-nest equivalent.');
  market('tofu 300g',stores(1.42,1.47,1.61,1.80),'Current firm or super-firm tofu prices normalised to 300g.');
  market('wraps or tortillas x8',stores(1.30,1.30,1.32,1.35),'Current own-brand eight-pack plain tortilla wraps.');
  market('green pesto 190g',stores(1.00,0.89,1.30,0.89),'Current own-brand green pesto 190g.');
  market('mustard 185g',stores(0.45,undefined,0.45,0.47),'Current own-brand wholegrain mustard normalised to 185g; Tesco excluded where a directly comparable own-brand listing was not exposed.');
  market('runny honey 340g',stores(1.04,1.31,1.19,0.94),'Current own-brand runny or clear honey normalised to 340g.');
  market('fresh basil 30g',stores(0.50,0.50,0.50,0.70),'Current fresh basil 30g packs.');
  market('fresh coriander 30g',stores(0.55,0.50,0.50,0.70),'Current fresh coriander 30g packs.');
  market('fresh parsley 30g',stores(0.50,0.50,0.50,0.70),'Current fresh parsley 30g packs.');
  market('fresh mint 30g',stores(0.50,0.50,0.50,0.70),'Current fresh mint 30g packs.');
  market('fresh chives 20g',stores(0.60,0.50,0.48,0.85),'Current fresh chives normalised to 20g.');
  market('fresh ginger 100g',stores(1.25,1.25,0.37,0.56),'Current fresh ginger normalised to 100g; bulk and loose formats included.');
  market('ground cumin jar',stores(1.07,0.93,0.98,1.32),'Current own-brand ground cumin normalised to the existing 40g jar.');
  market('ground cinnamon jar',stores(1.21,1.11,1.05,1.36),'Current own-brand ground cinnamon normalised to the existing 40g jar.');
  market('garam masala jar',stores(1.27,1.11,undefined,1.20),'Current own-brand garam masala normalised to the existing 42g jar; ASDA excluded where the exposed pack was not directly comparable.');
  market('garlic bulbs equivalent',stores(0.87,0.87,0.87,0.87),'Current standard four-bulb garlic packs.');
  const garlicMarketEntry=p.book.find(x=>x.label==='garlic bulbs equivalent');
  if(garlicMarketEntry) garlicMarketEntry.packQty=40;
  market('British skimmed milk 4 pint carton',stores(1.65,1.65,undefined,1.65),'Current standard British skimmed milk 4-pint cartons; three-retailer average where a directly comparable ASDA line was not exposed.');
  market('garden peas 910g',stores(1.55,1.55,1.49,1.37),'Current standard own-brand garden peas normalised to 910g from comparable 900g to 1kg packs.');
  market('raisins 500g',stores(2.30,2.30,1.80,2.30),'Current own-brand seedless raisins 500g.');
  market('Scottish salmon fillets x2 240g',stores(4.95,4.52,3.51,4.53),'Current standard two-fillet salmon packs normalised to 240g from comparable 220g to 260g packs.');
  market('lemons x4',stores(1.40,1.45,0.97,0.89),'Current standard four-pack lemons.');
  market('limes x4',stores(0.92,1.40,0.94,0.92),'Current limes normalised to four fruit from comparable loose, four-pack and five-pack lines.');
  market('spring onions bunch',stores(0.69,0.69,0.70,undefined),'Current standard spring onion bunches normalised to roughly 100g; Morrisons excluded where only jumbo/red lines were exposed.');
  market('sweet potatoes 1kg',stores(1.19,1.19,1.24,1.19),'Current standard sweet potatoes normalised to 1kg.');
  market('ground turmeric jar',stores(1.08,1.00,1.00,1.09),'Current own-brand ground turmeric normalised to 45g.');
  market('vegetable stock cubes',stores(1.32,1.20,1.25,1.30),'Current own-brand vegetable stock cubes normalised to 12 cubes.');
  market('celery bunch',stores(0.69,0.75,undefined,0.69),'Current standard whole celery; three-retailer average where ASDA whole celery was not exposed cleanly.');
  market('pak choi x2',stores(1.15,1.55,1.40,1.55),'Current mature pak choi prices normalised to roughly 250g, the usual two-head equivalent.');
  market('rocket 60g',stores(1.00,0.67,0.96,1.00),'Current wild rocket prices normalised to 60g.');
  market('red chillies x3',stores(0.55,0.51,0.53,0.59),'Current standard red chilli packs, typically around three chillies per 50g to 65g pack.');
  market('Worcestershire sauce 150ml',stores(1.30,1.30,1.30,1.30),'Current comparable own-brand Worcester sauce 150ml.');
  market('teriyaki sauce 150ml',stores(1.35,1.30,undefined,1.30),'Current directly comparable own-brand teriyaki sauce 150ml; ASDA excluded because the exposed line uses a materially different 300g format.');
  market('harissa paste 130g',stores(2.82,2.60,2.74,undefined),'Current own-brand harissa paste normalised to 130g from 90g jars; Morrisons excluded where no directly comparable own-brand line was exposed.');
  market('tahini 300g',stores(3.00,3.10,undefined,undefined),'Current directly comparable own-brand tahini 300g from Sainsburyâ€™s and Tesco; other retailers excluded where no directly comparable own-brand line was exposed.');
  market('cod fillets equivalent pack',stores(7.25,6.75,7.56,undefined),'Current standard two-pack skinless or boneless cod fillets; Morrisons excluded where the exposed comparable pack format was ambiguous.');
  market('large king prawns 150g',stores(2.20,2.20,3.00,2.83),'Current raw peeled king prawns normalised to 150g from comparable 170g to 225g packs.');
  market('flatbreads x4',stores(1.80,1.90,1.48,undefined),'Current plain or Greek-style four-pack flatbreads; Morrisons excluded where no directly comparable four-pack was exposed.');
  market('parmesan 170g',stores(3.40,3.40,3.33,3.85),'Current Parmigiano Reggiano wedges normalised to 170g from comparable 170g to 200g packs.');
  market('broccoli head',stores(0.90,0.90,0.86,0.90),'Current standard broccoli heads normalised to roughly a 360g to 375g head.');
  market('dried herbs jar',stores(1.15,0.78,0.56,1.09),'Current own-brand mixed herbs normalised to the existing 14g jar size.');
  market('table salt 750g',stores(0.75,undefined,0.82,0.65),'Current own-brand table salt 750g; Tesco excluded where no directly comparable own-brand table salt line was exposed.');
  market('brown sugar 500g',stores(2.05,2.00,1.80,undefined),'Current own-brand light or dark soft brown sugar 500g; Morrisons excluded where no directly comparable own-brand line was exposed.');
  market('cooking oil 1 litre',stores(1.45,1.49,1.55,1.45),'Current own-brand vegetable or rapeseed cooking oil 1 litre.');
  market('curry paste jar',stores(1.94,2.25,1.88,1.90),'Current own-brand curry pastes normalised to the existing 180g jar size from comparable 180g to 220g packs.');
  market('sun-dried tomato paste',stores(0.81,undefined,undefined,0.80),'Current sun-dried tomato paste normalised to the existing 90g size from Sainsburyâ€™s and Morrisons comparable jars.');
  market('whole cloves jar',stores(1.10,1.00,undefined,undefined),'Current directly comparable own-brand whole cloves 30g from Sainsburyâ€™s and Tesco.');
  market('beef strips 300g',stores(5.36,4.80,5.27,5.50),'Current beef stir-fry strips normalised to 300g from comparable 300g to 400g packs.');
  market('pork strips 400g',stores(3.76,4.80,3.97,undefined),'Current plain or closest directly comparable pork stir-fry/diced pork normalised to 400g; Morrisons excluded because its exposed product was not sufficiently comparable.');
  market('pork sausages x8',stores(1.79,1.79,undefined,1.79),'Current standard British pork sausage eight-packs; ASDA excluded where the exact like-for-like eight-pack was not reliably exposed.');
  market('butter beans tin',stores(0.45,0.45,0.50,0.45),'Current own-brand butter beans in water 400g.');
  market('yoghurts pack',stores(1.50,0.95,1.50,undefined),'Current six-pack low-fat fruit yoghurt benchmark; Morrisons excluded where a directly comparable own-brand six-pack was not exposed.');
  market('tomatoes pack',stores(0.99,0.99,undefined,undefined),'Current six-pack classic round tomatoes from Sainsburyâ€™s and Tesco; other retailers excluded where only materially different packs were exposed.');
  market('kale 200g',stores(0.89,0.89,0.96,0.89),'Current standard curly kale normalised to 200g.');
  market('berries 300g',stores(4.33,3.50,undefined,3.41),'Current mixed berry packs normalised to 300g; ASDA excluded where a directly comparable fresh mix was not exposed.');
  market('miso paste 150g',stores(2.85,2.70,2.22,2.39),'Current supermarket miso paste normalised to 150g from comparable 100g to 135g packs.');
  market('sweet chilli sauce 300ml',stores(1.77,1.77,1.95,1.96),'Current comparable sweet chilli sauce normalised to 300ml from larger branded packs sold across the four supermarkets.');
  market('maple syrup 250ml',stores(5.20,5.19,4.64,4.00),'Current pure maple syrup benchmark normalised to roughly 250ml/250g from directly comparable supermarket lines.');
  market('jerk seasoning jar',stores(2.50,2.55,2.54,2.55),'Current Dunnâ€™s River Jamaican jerk seasoning 300g across all four supermarkets.');
  const jerkMarketEntry=p.book.find(x=>x.label==='jerk seasoning jar');
  if(jerkMarketEntry){jerkMarketEntry.packQty=300;jerkMarketEntry.unit='g';}
  market('chermoula seasoning',stores(undefined,7.49,undefined,undefined),'Current 35g Chermoula spice blend available through Tesco Marketplace; no sufficiently comparable mainstream lines were exposed at the other three supermarkets.');
  const chermoulaMarketEntry=p.book.find(x=>x.label==='chermoula seasoning');
  if(chermoulaMarketEntry){chermoulaMarketEntry.packQty=35;chermoulaMarketEntry.unit='g';}
  market('granulated sugar 1kg',stores(1.20,1.09,1.09,1.09),'Current granulated sugar 1kg using own-brand or equivalent standard shelf lines.');
  market('cereal pack',stores(4.50,4.50,5.48,5.50),'Current 48-pack Weetabix benchmark across the four supermarkets, used for the generic cereal regular-item estimate.');
  market('cheese pack',stores(2.95,2.95,3.17,2.95),'Current standard British mild/mature cheddar 400g benchmark across the four supermarkets.');

  const add=(re,packQty,unit,price,label,evidence,note,extra)=>{
    const e=Object.assign({re,packQty,unit,price:round(price),label,confidence:evidence&&evidence.length>1?'market-average':evidence&&evidence.length?'current-market-check':'current',marketChecked:Boolean(evidence&&evidence.length),marketAverage:Boolean(evidence&&evidence.length>1),marketAsOf:AS_OF,marketEvidence:evidence||[]},extra||{});
    if(note) e.marketNote=note;
    p.book.unshift(e);
    return e;
  };
  // High-frequency sourced-recipe staples. Chilled dairy and mayonnaise
  // are sold by ml but HelloFresh commonly specifies them by g. For shopping
  // pack maths we use a 1 g/ml kitchen conversion and retain the shelf pack
  // size/price in the evidence note.
  add(/^creme fraiche$|^crÃ¨me fraÃ®che$/,300,'g',mean([1.05,0.75,0.80,0.75]),'creme fraiche 300ml',
    stores(1.05,0.75,0.80,0.75),
    'Current own-brand full-fat crÃ¨me fraÃ®che 300ml. Source recipes commonly state grams; shopping conversion uses approximately 1g per ml.',{tbspWeight:15,gramsPerMl:1});
  add(/^mayonnaise$|^mayo$/,500,'g',mean([0.89,0.89,0.89,0.99]),'mayonnaise 500ml',
    stores(0.89,0.89,0.89,0.99),
    'Current own-brand standard mayonnaise 500ml. Source recipes may state grams or tablespoons; shopping conversion uses approximately 1g per ml.',{tbspWeight:15,gramsPerMl:1});
  add(/^soured cream$|^sour cream$/,300,'g',mean([0.85,0.85,0.85,0.85]),'soured cream 300ml',
    stores(0.85,0.85,0.85,0.85),
    'Current own-brand soured cream 300ml. Source recipes commonly state grams; shopping conversion uses approximately 1g per ml.',{tbspWeight:15,gramsPerMl:1});
  add(/^cider vinegar$|^apple cider vinegar$/,350,'ml',mean([1.58,1.55,1.55,1.16]),'cider vinegar 350ml',
    stores(1.58,1.55,1.55,1.16),
    'Current standard cider vinegar, normalised to 350ml. Sainsburyâ€™s 500ml bottle normalised to 350ml.');

  add(/^apples?$/,6,'each',1.80,'crisp apples x6',stores(1.80,2.16,1.67,1.80),'Granny Smith style packs; Tesco five-pack normalised to six.');
  add(/^avocados?$/,1,'each',0.70,'avocado each',stores(0.69,0.69,0.72,0.70),'Standard loose or single avocado, excluding organic premium lines.');
  add(/^hummus$|^houmous$/,200,'g',1.28,'hummus 200g',stores(1.35,1.25,1.15,1.35),'Comparable own-brand classic hummus.');
  add(/^mushrooms?$/,400,'g',1.29,'closed cup mushrooms 400g',stores(1.29,1.29,1.29,1.29),'Comparable closed cup mushrooms, normalised to 400g.');
  add(/^olives?$/,330,'g',1.31,'pitted olives 330g',stores(1.35,1.35,1.25,1.30),'Comparable pitted olives in brine.');
  add(/^plain flour$/,1500,'g',0.76,'plain flour 1.5kg',stores(0.70,0.80,0.78),'Normal shelf own-brand plain flour.');
  add(/^risotto rice$/,500,'g',2.37,'risotto rice 500g',stores(2.00,2.50,2.60),'Comparable Arborio/Carnaroli own-brand rice.');
  add(/^diced beef$/,500,'g',6.04,'diced beef 500g',stores(6.00,6.07,5.69,6.40),'Comparable stewing beef prices normalised to 500g.');
  add(/^chilli flakes$/,45,'g',1.26,'chilli flakes 45g',stores(1.30,1.34,1.13,1.25),'Own-brand chilli flakes, normalised to 45g.',{tspWeight:2});
  add(/^chilli powder$/,45,'g',1.08,'chilli powder 45g',stores(1.10,1.10,1.00,1.10),'Comparable own-brand spice jars.',{tspWeight:2.5});
  add(/^kale$/,200,'g',0.88,'curly kale 200g',stores(0.89,0.89,0.96,0.79),'Pack prices normalised to 200g.');
  add(/^chicken stock$/,6000,'ml',1.30,'chicken stock cubes',stores(1.32,1.32,1.25,1.30),'12-cube equivalent; assumes roughly 500ml stock per cube.');

  // Exact aliases deliberately sit before legacy patterns. Several v0.17 regexes
  // contained damaged word-boundary characters, which caused valid generic names
  // to miss and fall through to the old Â£2.50 fallback.
  add(/^pasta$|^spaghetti$|^penne$|^fusilli$|^orzo$/,500,'g',0.71,'pasta 500g',stores(0.69,0.69,0.71,0.75),'Comparable own-brand dry pasta.');
  add(/^potatoes?$/,2000,'g',1.80,'potatoes 2kg',stores(1.80,1.80,1.80,1.80),'Comparable 2kg packs.');
  add(/^sweet potato$|^sweet potatoes$/,1000,'g',1.50,'sweet potatoes 1kg',[], 'Retained calibrated pack price pending a four-retailer refresh.');
  add(/^onion$|^onions$/,1000,'g',0.97,'brown onions 1kg',stores(0.95,0.95,0.98,0.99),'Comparable 1kg packs.');
  add(/^peas$|^garden peas$|^frozen peas$/,910,'g',1.55,'garden peas 910g',[], 'Retained calibrated frozen pea price pending a four-retailer refresh.');
  add(/^pepper$|^peppers$|^red pepper$|^red peppers$/,3,'each',1.97,'peppers pack',stores(1.99,2.10,2.10,1.69),'Comparable mixed pepper packs.',{eachWeight:160});
  add(/^tomato$|^tomatoes$/,6,'each',1.25,'tomatoes pack',[], 'Retained calibrated fresh tomato pack price pending a four-retailer refresh.');
  add(/^milk$|^skimmed milk$/,1,'carton',1.65,'British skimmed milk 4 pint carton',[], 'Retained calibrated 4-pint price pending a four-retailer refresh.');
  add(/^cheese$/,1,'pack',2.95,'cheddar cheese pack',stores(2.95),'Current Sainsbury\'s mature cheddar pack; more retailer checks still required.');
  add(/^water$|^tap water$/,1,'each',0,'tap water',[], 'Recipe-only ingredient. Shopping explicitly excludes it.');

  // Refresh exact aliases after they have been unshifted into the lookup book.
  // These aliases intentionally win over older broad regex entries, so they
  // must carry the same current market evidence as the public quote path.
  market('sweet potatoes 1kg',stores(1.19,1.19,1.24,1.19),'Current standard sweet potatoes normalised to 1kg.');
  market('garden peas 910g',stores(1.55,1.55,1.49,1.37),'Current standard own-brand garden peas normalised to 910g.');
  market('tomatoes pack',stores(0.99,0.99,undefined,undefined),'Current six-pack classic round tomatoes from Sainsburyâ€™s and Tesco.');
  market('British skimmed milk 4 pint carton',stores(1.65,1.65,undefined,1.65),'Current standard British skimmed milk 4-pint cartons.');
  market('cheddar cheese pack',stores(2.95,2.95,3.17,2.95),'Current standard British mild/mature cheddar 400g benchmark across the four supermarkets.');

  // v0.29 catalogue coverage aliases. Preserve the source ingredient name in
  // recipes while pricing meal-kit labels against ordinary supermarket equivalents.
  // Every rule is explicit: there is no catch-all unknown-item price.
  const cloneAlias=(re,target,label)=>{
    const base=p.entryFor(target);
    if(!base) throw new Error('Missing explicit pricing target: '+target);
    p.book.unshift(Object.assign({},base,{re,label:label||base.label,aliasTarget:target}));
  };
  const explicit=(re,packQty,unit,price,label,extra={})=>{
    p.book.unshift(Object.assign({
      re,packQty,unit,price,savingPrice:price,label,
      confidence:'calibrated-explicit',marketChecked:false,marketAverage:false,marketEvidence:[]
    },extra));
  };

  // Current spot checks where a direct ordinary supermarket line is available.
  explicit(/^leeks?$/i,500,'g',1.37,'leeks 500g',{confidence:'current',marketChecked:true,marketEvidence:[{retailer:"Sainsbury's",price:1.37,asOf:AS_OF}]});
  explicit(/^crispy onions$/i,75,'g',1.75,'crispy onions 75g',{confidence:'current',marketChecked:true,marketEvidence:[{retailer:'Tesco',price:1.75,asOf:AS_OF}]});

  // Non-food recipe kit item and exact pantry lines that are not represented by
  // the core supermarket book yet. These are explicit calibrated lines, never
  // reported as retailer-checked.
  explicit(/^bamboo skewers$/i,100,'each',1.50,'bamboo skewers pack');
  explicit(/^(?:boiled|boiling|hot|reserved) water(?: for (?:the )?(?:risotto|bulgur|rice|dressing|sauce|soup|stock))?$|^reserved (?:potato|pasta) water$/i,1000,'ml',0,'tap water');
  explicit(/^sour cherry compote$/i,300,'g',2.50,'sour cherry compote jar');
  explicit(/^apple and sage jelly$/i,250,'g',2.00,'apple and sage jelly jar');
  explicit(/^redcurrant jelly$/i,250,'g',1.85,'redcurrant jelly jar');
  explicit(/^fig jam$/i,340,'g',2.00,'fig jam jar');
  explicit(/^apricot jam$/i,454,'g',1.75,'apricot jam jar');
  explicit(/^desiccated coconut$/i,200,'g',1.75,'desiccated coconut 200g');
  explicit(/^sesame oil$/i,250,'ml',2.50,'sesame oil 250ml');
  explicit(/^flour$/i,1500,'g',0.80,'plain flour 1.5kg');
  explicit(/^british duck breasts$/i,2,'each',7.50,'British duck breasts x2');
  explicit(/^vegetable spring rolls$/i,6,'each',2.50,'vegetable spring rolls pack');

  [
    [/intense.*tomato|marinara sauce/i,'tomato puree','tomato cooking sauce equivalent'],
    [/balsamic glaze/i,'balsamic vinegar','balsamic glaze equivalent'],
    [/mango chutney|pineapple chutney|green chutney|tamarind chutney/i,'raisins','chutney jar equivalent'],
    [/red wine stock paste|red wine jus paste|guinnessÂ®? paste/i,'beef stock','beef cooking concentrate equivalent'],
    [/white wine stock powder/i,'vegetable stock','vegetable stock concentrate equivalent'],
    [/diced chorizo|chorizo slices|british smoked bacon lardons|british streaky bacon|serrano ham|smoked ham slices/i,'pork strips','prepared pork product equivalent'],
    [/young pea pods|fresh edamame beans/i,'garden peas','fresh green vegetable equivalent'],
    [/ketjap manis|hoisin sauce|bulgogi sauce|oyster sauce|vegan fish sauce|vegan xo sauce|signature sauce|cantonese style stir fry sauce/i,'teriyaki sauce','Asian cooking sauce equivalent'],
    [/tomato ketchup|burger sauce|ranch dressing|aioli|hot sauce|sriracha sauce|south carolina style bbq sauce/i,'sweet chilli sauce','table sauce equivalent'],
    [/rice vinegar|red wine vinegar/i,'balsamic vinegar','cooking vinegar equivalent'],
    [/central american style spice mix|peri peri seasoning|mediterranean style seasoning|indonesian style spice mix|roasted spice and herb blend|mexican style spice mix|cajun spice mix|thai style spice mix|brazilian style spice mix|north indian style spice mix|savoury seasoning|tandoori masala mix|middle eastern style spice mix|lahori style spice mix|west african style seasoning|gunpowder spice mix|zanzibar style curry powder|kashmiri style spice mix|chinese five spice|pasanda style seasoning|sri lankan style curry powder|truffle zest/i,'garam masala','seasoning blend equivalent'],
    [/toasted flaked almonds|walnuts|pumpkin seeds|cashew nuts|pecan nut halves|pine nuts/i,'sesame seeds','nuts and seeds equivalent'],
    [/curry powder mix/i,'garam masala','curry spice blend equivalent'],
    [/21 day aged british rump steaks|21 day aged british sirloin steaks|venison leg steaks/i,'beef strips','red meat steak equivalent'],
    [/british pork loin steaks|gammon steaks|pork belly|pork rib rack|slow cooked british pork/i,'pork strips','pork cut equivalent'],
    [/burger buns|baguette|pizza dough/i,'bread','bakery product equivalent'],
    [/chipotle paste|green chilli paste|sambal paste|amarillo chilli paste|smoky base paste|jerk paste|gochujang paste|tikka masala paste|chettinad style paste|west african style paste|zhoug style paste|katsu paste|malaysian style paste|char siu paste/i,'curry paste','cooking paste equivalent'],
    [/pear|kiwi|passion fruit|plum|blood orange|orange|mango|pomegranate|pineapple rings/i,'bananas','fresh fruit equivalent'],
    [/caramelised onion paste|onion marmalade/i,'red onions','onion preserve equivalent'],
    [/bbq sauce/i,'sweet chilli sauce','BBQ sauce equivalent'],
    [/udon noodles/i,'egg noodles','noodle pack equivalent'],
    [/lentils|red split lentils/i,'red lentils','lentils equivalent'],
    [/puff pastry sheet|filo pastry sheets|lasagne sheets|cured ham tortelloni|pumpkin and sage girasoli|fresh tagliatelle/i,'pasta','prepared pasta or pastry equivalent'],
    [/vegan .?nduja|vegan mince|ready to eat falafels|vegetable gyozas|unconventional plant based burgers/i,'tofu','plant protein equivalent'],
    [/radishes|asparagus|cooked beetroot|baby corn|parsnip|stringless runner beans|samphire|corn on the cob|hokkaido pumpkin|soffritto mix|padron peppers|mini bell pepper mix|sliced spring greens|blanched broad beans/i,'green beans','fresh vegetable equivalent'],
    [/basa fillets|haddock fillets|skin on hake fillets|sea bream fillets|fish pie mix|monkfish medallions/i,'cod fillet','white fish equivalent'],
    [/orkney crab meat/i,'king prawns','shellfish equivalent'],
    [/smoked salmon/i,'salmon fillet','smoked salmon equivalent'],
    [/british cumberland sausages|british hickory smoked sausages/i,'pork sausage','pork sausages equivalent'],
    [/white cumin seeds/i,'ground cumin','cumin equivalent'],
    [/dried thyme|dill|tarragon|thyme|sage/i,'oregano','herb equivalent'],
    [/^dried bay (?:leaf|leaves)$/i,'oregano','dried herb equivalent'],
    [/^ground allspice$/i,'ground cinnamon','ground spice equivalent'],
    [/red kidney beans|mixed beans|borlotti beans/i,'black beans','beans equivalent'],
    [/black olives|capers/i,'green pesto','jarred savoury ingredient equivalent'],
    [/lamb steaks/i,'lamb mince','lamb equivalent'],
    [/mussels/i,'king prawns','shellfish equivalent'],
    [/confit british duck legs/i,'chicken thigh','duck leg equivalent'],
    [/cooked spelt/i,'bulgur wheat','cooked grain equivalent'],
    [/sous vide seasoned chicken wings|slow cooked british chicken/i,'chicken thigh','prepared chicken equivalent'],
    [/slow cooked beef/i,'beef strips','prepared beef equivalent'],
    [/tortilla chips/i,'small tortillas','tortilla product equivalent'],
    [/pomegranate molasses/i,'maple syrup','fruit molasses equivalent'],
    [/prunes|dried apricots/i,'raisins','dried fruit equivalent'],
    [/pecorino vegetariano/i,'parmesan','hard cheese equivalent'],
    [/caribbean style jerk/i,'jerk seasoning','jerk seasoning equivalent'],
    [/sushi rice/i,'basmati rice','rice equivalent'],
    [/oil for the chicken|oil for cooking/i,'cooking oil','cooking oil'],
    [/instant gravy powder/i,'beef stock','gravy equivalent'],
    [/diced sweet potato/i,'sweet potatoes','sweet potato'],
    [/burrata/i,'feta','soft cheese equivalent'],
    [/^vegetable oil$/i,'cooking oil','vegetable oil 1 litre equivalent'],
    [/^sliced mushrooms$/i,'mushrooms','sliced mushrooms 400g equivalent'],
    [/^plain tortillas?$/i,'small tortillas','plain tortillas x8 equivalent'],
    [/^cooked white long grain rice$/i,'steamed basmati rice','cooked long grain rice pouch equivalent'],
    [/^cannellini beans$/i,'butter beans','cannellini beans 400g tin equivalent'],
    [/^wholemeal pittas?$/i,'pitta bread','wholemeal pittas equivalent'],
    [/^five[- ]spice mix$/i,'chinese five spice','five-spice mix equivalent'],
    [/^spring greens$/i,'kale','spring greens 200g equivalent']
  ].forEach(x=>cloneAlias(x[0],x[1],x[2]));

  explicit(/^wholewheat noodle nests?$/i,4,'nest',0.94,'wholewheat noodle nests x4 equivalent',{nestWeight:62.5});
  explicit(/^creamy single soy$/i,250,'ml',1.50,'soy single cream 250ml equivalent');
  cloneAlias(/^5 bean medley$/i,'mixed beans','5 bean medley equivalent');
  cloneAlias(/^coconut flakes$/i,'desiccated coconut','coconut flakes equivalent');
  cloneAlias(/^wholemeal tortillas?$/i,'small tortillas','wholemeal tortillas x8 equivalent');
  explicit(/^pistachios?$/i,150,'g',3.00,'pistachios 150g equivalent');

  // QA25 plant-expansion retail checks, refreshed 2026-10-06.
  add(/^quinoa$/i,300,'g',3.10,'quinoa 300g',stores(3.10,3.10,undefined,undefined),'Current normal shelf price at Sainsbury\'s and Tesco; promotional prices excluded.');
  add(/^dried bay (?:leaf|leaves)$/i,3,'g',1.00,'dried bay leaves 3g',stores(undefined,1.00,undefined,undefined),'Current Tesco own-brand dried bay leaves 3g normal shelf price.');
  add(/^mangetout$/i,80,'g',1.00,'mangetout 80g',stores(undefined,1.00,undefined,undefined),'Current Tesco mangetout 80g normal shelf price.');
  add(/^gram flour$/i,2000,'g',4.50,'gram flour 2kg',stores(undefined,4.50,undefined,undefined),'Current Tesco-listed Virani gram flour 2kg normal shelf price; promotional price excluded.');
  add(/^seasonal squash$/i,1,'each',1.50,'seasonal squash each',stores(undefined,1.50,undefined,undefined),'Current Tesco autumnal squash normal shelf price used for the provider\'s generic seasonal squash.');
  add(/^hazelnuts?$/i,250,'g',3.25,'hazelnuts 250g',stores(undefined,3.25,undefined,undefined),'Current Tesco hazelnuts 250g normal shelf price.');
  add(/^onion bhajis?$/i,10,'each',1.75,'onion bhajis 10 pack 200g',stores(undefined,1.75,undefined,undefined),'Current Tesco frozen onion bhajis 10 pack 200g normal shelf price.',{eachWeight:20});

  // QA.10 sourced-catalogue market gaps checked 2026-09-26.
  add(/^kumato tomato$/i,6,'each',2.00,'premium tomatoes pack',stores(undefined,2.00,undefined,undefined),'Tesco Finest Rossafina tomatoes used as the current premium tomato equivalent where Kumato is not listed directly.');
  add(/^fennel$/i,250,'g',1.25,'fresh fennel 250g equivalent',stores(1.25,1.25,undefined,undefined),'Sainsburyâ€™s loose fennel at Â£5/kg and Tesco whole fennel at Â£1.25 normalised to an approximately 250g bulb.');
  add(/^tabascoÂ®? original red sauce$/i,57,'ml',2.50,'Tabasco Original Red Sauce 57ml',stores(undefined,2.50,undefined,undefined),'Current Tesco normal shelf price; promotional Clubcard price is not used.');
  add(/^jersey royal potatoes$/i,450,'g',2.20,'Jersey Royal potatoes 450g',stores(2.20,2.20,undefined,undefined),'Current normal shelf benchmark from Sainsburyâ€™s and Tesco; temporary promotional prices excluded.');
  add(/^rhubarb$/i,400,'g',2.50,'fresh rhubarb 400g',stores(2.50,2.50,undefined,undefined),'Current 400g fresh rhubarb price at Sainsburyâ€™s and Tesco.');
  add(/^21 day aged british fillet steaks$/i,2,'each',14.55,'British beef fillet steaks x2',stores(14.10,15.00,undefined,undefined),'Sainsburyâ€™s x2 approximately 300g and two Tesco 170g fillet steaks averaged as the closest two-steak basket requirement.');

  add(/^falafel$/i,200,'g',2.60,'falafel 200g',stores(undefined,2.60,undefined,undefined),'Current Tesco normal shelf price for Cauldron Foods Falafel 200g.');
  add(/^brussels sprouts$/i,500,'g',0.89,'Brussels sprouts 500g',stores(undefined,0.89,undefined,undefined),'Current Tesco standard Brussels sprouts 500g pack.');
  explicit(/^asian broth paste$/i,100,'g',2.85,'Asian broth paste 100g equivalent',{marketNote:'Calibrated against a premium supermarket miso/stock-paste equivalent because the HelloFresh meal-kit paste is not sold as a directly comparable retail line.'});

  add(/^szechuan paste$/i,505,'g',1.25,'Szechuan style sauce 505g',stores(undefined,1.25,undefined,undefined),'Tesco Szechuan inspired sauce used as the closest current retail equivalent.');
  add(/^plant based soy protein chicken pieces$/i,170,'g',3.50,'plant-based chicken pieces 170g',stores(undefined,3.50,undefined,undefined),'Current Tesco THIS plant-based chicken pieces benchmark.');
  add(/^rice noodles$/i,300,'g',1.15,'rice noodles 300g',stores(undefined,1.15,undefined,undefined),'Current Tesco rice noodles 300g normal shelf price.');

  // QA.10 common Gousto source ingredients, checked against normal Tesco shelf prices on 2026-09-26.
  add(/^mozzarella$/i,250,'g',2.50,'mozzarella 250g',stores(undefined,2.50,undefined,undefined),'Tesco grated or sliced mozzarella 250g normal shelf price.');
  add(/^paneer$/i,200,'g',1.80,'paneer 200g',stores(undefined,1.80,undefined,undefined),'Tesco paneer 200g normal shelf price.');
  add(/^(?:roasted )?peanuts$/i,200,'g',1.40,'peanuts 200g',stores(undefined,1.40,undefined,undefined),'Tesco dry roasted peanuts 200g normal shelf price.');
  add(/^gnocchi$/i,500,'g',2.00,'gnocchi 500g',stores(undefined,2.00,undefined,undefined),'Tesco gnocchi 500g normal shelf price.');
  add(/^sliced pepperoni$/i,130,'g',0.99,'pepperoni slices 130g',stores(undefined,0.99,undefined,undefined),'Tesco pepperoni slices 130g normal shelf price.');
  add(/^sun-?dried tomatoes$/i,285,'g',2.50,'sun-dried tomatoes 285g',stores(undefined,2.50,undefined,undefined),'Tesco sun dried tomatoes 285g normal shelf price.');
  add(/^smoked mackerel fillets?$/i,240,'g',6.00,'smoked mackerel 240g',stores(undefined,6.00,undefined,undefined),'Tesco smoked mackerel typical 240g pack at normal shelf price.');
  add(/^sliced prosciutto$/i,84,'g',1.32,'prosciutto 84g',stores(undefined,1.32,undefined,undefined),'Tesco Prosciutto Crudo six slices 84g normal shelf price.');

  const oldQuote=p.quote.bind(p);
  p.quote=function(name,amount,savingMode){
    const out=oldQuote(name,amount,savingMode);
    const entry=p.entryFor(name);
    return Object.assign({},out,{
      asOf:AS_OF,
      retailer:entry&&entry.marketAverage?'UK supermarket average':entry&&entry.marketChecked?'Current retailer check':'Calibrated estimate',
      marketAverage:Boolean(entry&&entry.marketAverage),
      marketChecked:Boolean(entry&&entry.marketChecked),
      marketEvidence:entry&&entry.marketEvidence?entry.marketEvidence.slice():[]
    });
  };
  p.asOf=AS_OF;
  p.retailer=RETAILER;
  p.marketAverageCount=p.book.filter(x=>x.marketAverage).length;
  p.marketCheckedCount=p.book.filter(x=>x.marketChecked).length;
  p.version='0.27';
})();

// Final canonical pricing resolver

window.MW = window.MW || {};
(function(){
  const p=MW.pricing;
  if(!p) return;

  const AS_OF='2026-09-25';
  const RETAILER='UK supermarket estimate';
  const legacyEntryFor=p.entryFor.bind(p);
  const round=n=>Math.round((Number(n)||0)*100)/100;
  const norm=x=>String(x||'').toLowerCase().replace(/[\u2018\u2019]/g,"'").replace(/[^a-z0-9' ]/g,' ').replace(/\s+/g,' ').trim();
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
  put('Intenseâ„¢ Tomato',calibrated(100,'g',1.00,'concentrated tomato paste 100g',{eachWeight:25,tbspWeight:18,tspWeight:6}));
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
  put('21 Day Aged British Sirloin Steaks',current(400,'g',10.88,'sirloin steaks 400g',{eachWeight:200,marketAverage:true,marketEvidence:[{retailer:'Tesco',price:10.50,asOf:AS_OF},{retailer:'Sainsburyâ€™s',price:11.25,asOf:AS_OF}]}));
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
  put(['Guinness® Paste','Guinness Paste'],current(200,'g',3.15,'Guinness Cooking Paste 200g',{tbspWeight:15,tspWeight:5}));
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
  put('British Beef Mince',current(500,'g',5.05,'5% fat British beef mince 500g',{marketAverage:true,marketEvidence:[{retailer:'Tesco',price:5.05,asOf:AS_OF},{retailer:'Sainsburyâ€™s',price:5.05,asOf:AS_OF}]}));
  put('Butter Beans',current(1,'tin',0.45,'butter beans 400g tin',{tinWeight:400}));
  put('Lentils',current(1,'tin',0.45,'green lentils 390g tin',{tinWeight:390}));
  put('Chermoula Spice Mix',calibrated(40,'g',1.50,'chermoula seasoning 40g',{sachetWeight:10}));
  put('Puff Pastry Sheet',calibrated(320,'g',1.50,'puff pastry sheet 320g',{eachWeight:320,packWeight:320}));
  put('Lasagne Sheets',calibrated(500,'g',0.95,'lasagne sheets 500g',{packWeight:500}));
  put('Vegetable Gyozas',calibrated(240,'g',2.25,'vegetable gyozas 240g',{eachWeight:20}));
  put('Creamed Coconut',calibrated(200,'g',1.20,'creamed coconut 200g'));

  // Product entries that are physically sold by piece but recipes specify grams.
  put('Salmon Fillets',current(240,'g',4.73,'Scottish salmon fillets x2 240g',{eachWeight:120,marketAverage:true,marketEvidence:[{retailer:'Tesco',price:4.50,asOf:AS_OF},{retailer:'Sainsburyâ€™s',price:4.95,asOf:AS_OF}]}));
  put('Basa Fillets',current(250,'g',1.79,'basa fillets 250g',{eachWeight:125}));
  put('Haddock Fillets',current(360,'g',6.50,'haddock fillets 360g',{eachWeight:180}));
  put('Skin-On Hake Fillets',current(240,'g',4.75,'hake fillets 240g',{eachWeight:120}));
  put('Sea Bream Fillets',current(180,'g',5.75,'sea bream fillets 180g',{eachWeight:90}));
  put('Fish Pie Mix',current(400,'g',6.00,'fish pie mix 400g'));
  put('Smoked Salmon',current(100,'g',3.80,'smoked salmon 100g'));
  from('Egg Noodle Nest','egg noodles 4 nests',{nestWeight:62.5});
  from('Udon Noodles','egg noodles 4 nests',{packQty:300,unit:'g',price:1.50,label:'udon noodles 300g'});
  put(['British Chicken Breasts','Diced British Chicken Breast','Skin-On British Chicken Breasts','chicken breast'],current(1000,'g',6.69,'British chicken breast fillets 1kg',{eachWeight:180,marketAverage:true,marketEvidence:[{retailer:'Tesco',price:6.69,asOf:AS_OF},{retailer:'Sainsburyâ€™s',price:6.69,asOf:AS_OF}]}));
  put(['King Prawns','Large King Prawns'],current(150,'g',2.74,'large king prawns 150g',{marketAverage:true,marketEvidence:[{retailer:'Tesco',price:2.49,asOf:AS_OF},{retailer:'Sainsburyâ€™s',price:2.99,asOf:AS_OF}]}));
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
  put("crÃ¨me fraÃ®che",calibrated(300,"g",1.35,"crÃ¨me fraÃ®che 300g"));
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
  put(['TABASCO® Original Red Sauce','TABASCO Original Red Sauce','Tabasco Original Red Pepper Hot Sauce'],current(57,'ml',2.50,'Tabasco Original Red Pepper Hot Sauce 57ml'));
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

  // QA25 expansion identities. Preserve the meal-box ingredient name; these
  // entries exist only so quantity conversion and retail-pack pricing use the
  // correct physical unit.
  put('cannellini beans',calibrated(400,'g',0.65,'cannellini beans 400g tin equivalent'));
  put('5 bean medley',calibrated(400,'g',0.75,'5 bean medley 400g tin equivalent'));
  put('black bean paste',calibrated(200,'g',2.00,'black bean paste 200g',{tbspWeight:18,tspWeight:6}));
  put('wholewheat noodle nests',calibrated(4,'nest',1.50,'wholewheat noodle nests x4',{nestWeight:62.5}));
  put('Grilling Cheese',calibrated(225,'g',1.99,'grilling cheese 225g'));
  put('Maple Syrup',calibrated(250,'ml',2.50,'maple syrup 250ml',{sachetWeight:15}));
  put('Steamed Brown Basmati Rice',calibrated(250,'g',0.75,'steamed brown basmati rice pouch 250g',{pouchWeight:250}));
  put('KNORR Vegetable Stock',calibrated(4,'each',1.50,'vegetable stock pots x4'));

  // Additional sourced lunch identities. Pricing only; no ingredient substitution is performed.
  put('flame-baked pizza bases',calibrated(2,'each',2.00,'flame-baked pizza bases x2',{eachWeight:220}));
  put('Wildfarmed pizza bases',calibrated(2,'each',2.50,'Wildfarmed pizza bases x2',{eachWeight:220}));
  put('French Camembert',calibrated(250,'g',3.00,'French Camembert 250g'));
  put('shichimi togarashi',calibrated(15,'g',2.50,'shichimi togarashi 15g',{tspWeight:3}));
  put('sweet pepper relish',calibrated(300,'g',1.50,'sweet pepper relish 300g'));
  put('fish sauce',calibrated(150,'ml',1.50,'fish sauce 150ml'));
  put('hake fillets',calibrated(240,'g',4.75,'hake fillets 240g',{eachWeight:120}));

  put("THISâ„¢ Isn't Pork Sausages",current(6,'each',3.00,"THIS Isn't Pork Sausages x6",{eachWeight:60}));
  put('blue stiltonÂ® cheese',current(200,'g',2.50,'Blue Stilton 200g'));
  put('garlic & herb dip',current(100,'g',1.50,'garlic and herb dip 100g'));
  put('smoked mackerel fillet',current(240,'g',2.50,'smoked mackerel 240g',{eachWeight:80}));
  put('tuna chunks in spring water',current(1,'tin',1.10,'tuna chunks in spring water 145g tin',{tinWeight:145}));
  put('ground cumin',current(40,'g',1.25,'ground cumin 40g',{tspWeight:2.2,eachWeight:4}));
  put('canned sweetcorn',current(1,'tin',0.65,'sweetcorn 200g tin',{tinWeight:200}));
  put('THIS plant based sausages',current(1,'pack',3.00,'THIS plant based sausages pack'));
  put(['Meatless Farm mince','meat free mince','meat-free mince','plant-based mince','plant based mince'],calibrated(454,'g',1.58,'plant-based mince 454g'));
  put(['flat white mushrooms','baby button mushrooms','chestnut mushrooms','white cup mushrooms'],calibrated(400,'g',1.29,'closed cup mushrooms 400g'));
  from(['shredded kale','cavolo nero'],'kale 200g');
  put(['pineapple slices'],calibrated(1,'tin',0.95,'pineapple rings tin',{tinWeight:260}));

  // Public retail snapshots: a price observation is not whole-recipe verification.
  const retailSnapshots=[{"aliases":["British Cumberland Sausages","Cumberland sausages"],"entry":{"packQty":8,"unit":"each","price":1.79,"label":"Cumberland sausages x8 454g","eachWeight":56.75,"savingPrice":1.79,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-butcher-s-choice-cumberland-british-pork-sausage-x8-454g","note":"Butcher's Choice range, not premium sausages. Average piece weight: 454 g divided by eight.","price":1.79}}},{"aliases":["pork sausages","sausages"],"entry":{"packQty":8,"unit":"each","price":1.79,"label":"pork sausages x8 454g","eachWeight":56.75,"savingPrice":1.79,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-butcher-s-choice-british-pork-sausage-x8-454g","note":"Butcher's Choice range, not premium sausages.","price":1.79}}},{"aliases":["TenderstemÂ® Broccoli","Tenderstem Broccoli"],"entry":{"packQty":200,"unit":"g","price":1.6,"label":"Tenderstem broccoli 200g","savingPrice":1.6,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-tenderstem-broccoli-200g","note":"Correct vegetable identity. Temporary GBP 1.25 Nectar price not assumed.","price":1.6}}},{"aliases":["butter","salted butter"],"entry":{"packQty":250,"unit":"g","price":1.85,"label":"salted butter 250g","savingPrice":1.85,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-british-butter-salted-250g","note":"Actual retail pack, not a normalised 500 g equivalent.","price":1.85}}},{"aliases":["Potatoes","Maris Piper potatoes"],"entry":{"packQty":2000,"unit":"g","price":1.8,"label":"Maris Piper potatoes 2kg","savingPrice":1.8,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-maris-piper-potatoes-2kg","note":"Not automatically applied to salad or specialist varieties.","price":1.8}}},{"aliases":["Carrot","carrots"],"entry":{"packQty":1000,"unit":"g","price":0.69,"label":"carrots 1kg","eachWeight":80,"savingPrice":0.69,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-1kg-carrots","note":"80 g per medium carrot is a sizing estimate; weights vary.","price":0.69}}},{"aliases":["Garlic Clove","garlic","garlic cloves"],"entry":{"packQty":40,"unit":"clove","price":0.87,"label":"garlic x4 bulbs (about 40 cloves)","savingPrice":0.87,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-garlic-x4","note":"Four bulbs sold. Ten cloves per bulb is an estimate, not a retailer guarantee.","price":0.87}}},{"aliases":["milk","skimmed milk"],"entry":{"packQty":2270,"unit":"ml","cartonWeight":2270,"price":1.65,"label":"skimmed milk 2.27 litres (4 pints)","savingPrice":1.65,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-british-skimmed-milk-2-27l-4-pint","note":"Published 2.27 litre pack size; not used for whole milk.","price":1.65}}},{"aliases":["Green Beans","fine green beans"],"entry":{"packQty":200,"unit":"g","price":1.4,"label":"fine green beans 200g","eachWeight":8,"savingPrice":1.4,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-fine-green-beans-200g","note":"Piece weight, when needed, remains an estimate.","price":1.4}}},{"aliases":["Leek","leeks"],"entry":{"packQty":500,"unit":"g","price":1.37,"label":"leeks 500g","eachWeight":180,"savingPrice":1.37,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-leeks-500g","note":"180 g per leek is a sizing estimate.","price":1.37}}},{"aliases":["chicken breast","British Chicken Breasts"],"entry":{"packQty":1000,"unit":"g","price":6.69,"label":"British skinless chicken breast fillets 1kg","eachWeight":180,"savingPrice":6.69,"confidence":"unverified-benchmark","marketChecked":false,"marketAverage":false,"marketEvidence":[],"observedRetail":{"retailer":"Sainsbury's","date":"2026-09-25","url":"https://www.sainsburys.co.uk/groceries/product/sainsburys-1kg-british-fresh-skinless-boneless-chicken-breast-fillets","note":"Skinless boneless raw chicken; not proof for skin-on, prepared or frozen chicken.","price":6.69}}}];
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
    if(/^pots?$/.test(u)) return 'each';
    return u;
  };
  const pieceWeight=(entry,unit)=>{
    const key={each:'eachWeight',fillet:'eachWeight',wrap:'eachWeight',tortilla:'eachWeight',banana:'eachWeight',stick:'eachWeight',nest:'nestWeight',sachet:'sachetWeight',bunch:'bunchWeight',ball:'ballWeight',rasher:'rasherWeight',slice:'sliceWeight',pouch:'pouchWeight',pack:'packWeight',tin:'tinWeight',carton:'cartonWeight',bottle:'bottleWeight'}[unit];
    return key&&Number(entry[key])>0?Number(entry[key]):null;
  };

  function amountFor(text,entry){
    if(!entry) return null;
    let raw=String(text||'').trim().toLowerCase().replace(/,/g,'').replace(/pot\(s\)/g,'pot');
    if(!raw) return null;
    if(raw==='to taste'||raw==='as needed'){
      const fallback={g:10,ml:50,each:1,tin:1,pack:1,carton:1,bottle:1,clove:1,nest:1,fillet:1,wrap:1,tortilla:1,stick:1,banana:1,sachet:1,bunch:1,ball:1,rasher:1,slice:1,pouch:1};
      return Number(entry.defaultUsage)||fallback[entry.unit]||null;
    }
    raw=raw.replace(/^Â½\s*/,'0.5 ').replace(/^Â¼\s*/,'0.25 ').replace(/^Â¾\s*/,'0.75 ');
    const m=raw.match(/^([0-9]+(?:\.[0-9]+)?)\s*(kg|g|ml|l|tbsp|tsp|tins?|cans?|cloves?|nests?|fillets?|wraps?|tortillas?|sticks?|cartons?|bottles?|packs?|bananas?|sachets?|bunch(?:es)?|balls?|rashers?|slices?|pouch(?:es)?|pots?)?\s*$/);
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
