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
  market('tahini 300g',stores(3.00,3.10,undefined,undefined),'Current directly comparable own-brand tahini 300g from Sainsbury’s and Tesco; other retailers excluded where no directly comparable own-brand line was exposed.');
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
  market('sun-dried tomato paste',stores(0.81,undefined,undefined,0.80),'Current sun-dried tomato paste normalised to the existing 90g size from Sainsbury’s and Morrisons comparable jars.');
  market('whole cloves jar',stores(1.10,1.00,undefined,undefined),'Current directly comparable own-brand whole cloves 30g from Sainsbury’s and Tesco.');
  market('beef strips 300g',stores(5.36,4.80,5.27,5.50),'Current beef stir-fry strips normalised to 300g from comparable 300g to 400g packs.');
  market('pork strips 400g',stores(3.76,4.80,3.97,undefined),'Current plain or closest directly comparable pork stir-fry/diced pork normalised to 400g; Morrisons excluded because its exposed product was not sufficiently comparable.');
  market('pork sausages x8',stores(1.79,1.79,undefined,1.79),'Current standard British pork sausage eight-packs; ASDA excluded where the exact like-for-like eight-pack was not reliably exposed.');
  market('butter beans tin',stores(0.45,0.45,0.50,0.45),'Current own-brand butter beans in water 400g.');
  market('yoghurts pack',stores(1.50,0.95,1.50,undefined),'Current six-pack low-fat fruit yoghurt benchmark; Morrisons excluded where a directly comparable own-brand six-pack was not exposed.');
  market('tomatoes pack',stores(0.99,0.99,undefined,undefined),'Current six-pack classic round tomatoes from Sainsbury’s and Tesco; other retailers excluded where only materially different packs were exposed.');
  market('kale 200g',stores(0.89,0.89,0.96,0.89),'Current standard curly kale normalised to 200g.');
  market('berries 300g',stores(4.33,3.50,undefined,3.41),'Current mixed berry packs normalised to 300g; ASDA excluded where a directly comparable fresh mix was not exposed.');
  market('miso paste 150g',stores(2.85,2.70,2.22,2.39),'Current supermarket miso paste normalised to 150g from comparable 100g to 135g packs.');
  market('sweet chilli sauce 300ml',stores(1.77,1.77,1.95,1.96),'Current comparable sweet chilli sauce normalised to 300ml from larger branded packs sold across the four supermarkets.');
  market('maple syrup 250ml',stores(5.20,5.19,4.64,4.00),'Current pure maple syrup benchmark normalised to roughly 250ml/250g from directly comparable supermarket lines.');
  market('jerk seasoning jar',stores(2.50,2.55,2.54,2.55),'Current Dunn’s River Jamaican jerk seasoning 300g across all four supermarkets.');
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
  add(/^creme fraiche$|^crème fraîche$/,300,'g',mean([1.05,0.75,0.80,0.75]),'creme fraiche 300ml',
    stores(1.05,0.75,0.80,0.75),
    'Current own-brand full-fat crème fraîche 300ml. Source recipes commonly state grams; shopping conversion uses approximately 1g per ml.',{tbspWeight:15,gramsPerMl:1});
  add(/^mayonnaise$|^mayo$/,500,'g',mean([0.89,0.89,0.89,0.99]),'mayonnaise 500ml',
    stores(0.89,0.89,0.89,0.99),
    'Current own-brand standard mayonnaise 500ml. Source recipes may state grams or tablespoons; shopping conversion uses approximately 1g per ml.',{tbspWeight:15,gramsPerMl:1});
  add(/^soured cream$|^sour cream$/,300,'g',mean([0.85,0.85,0.85,0.85]),'soured cream 300ml',
    stores(0.85,0.85,0.85,0.85),
    'Current own-brand soured cream 300ml. Source recipes commonly state grams; shopping conversion uses approximately 1g per ml.',{tbspWeight:15,gramsPerMl:1});
  add(/^cider vinegar$|^apple cider vinegar$/,350,'ml',mean([1.58,1.55,1.55,1.16]),'cider vinegar 350ml',
    stores(1.58,1.55,1.55,1.16),
    'Current standard cider vinegar, normalised to 350ml. Sainsbury’s 500ml bottle normalised to 350ml.');

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
  // to miss and fall through to the old £2.50 fallback.
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
  market('tomatoes pack',stores(0.99,0.99,undefined,undefined),'Current six-pack classic round tomatoes from Sainsbury’s and Tesco.');
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
    [/red wine stock paste|red wine jus paste|guinness®? paste/i,'beef stock','beef cooking concentrate equivalent'],
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
    [/burrata/i,'feta','soft cheese equivalent']
  ].forEach(x=>cloneAlias(x[0],x[1],x[2]));

  // QA.10 sourced-catalogue market gaps checked 2026-09-26.
  add(/^kumato tomato$/i,6,'each',2.00,'premium tomatoes pack',stores(undefined,2.00,undefined,undefined),'Tesco Finest Rossafina tomatoes used as the current premium tomato equivalent where Kumato is not listed directly.');
  add(/^fennel$/i,250,'g',1.25,'fresh fennel 250g equivalent',stores(1.25,1.25,undefined,undefined),'Sainsbury’s loose fennel at £5/kg and Tesco whole fennel at £1.25 normalised to an approximately 250g bulb.');
  add(/^tabasco®? original red sauce$/i,57,'ml',2.50,'Tabasco Original Red Sauce 57ml',stores(undefined,2.50,undefined,undefined),'Current Tesco normal shelf price; promotional Clubcard price is not used.');
  add(/^jersey royal potatoes$/i,450,'g',2.20,'Jersey Royal potatoes 450g',stores(2.20,2.20,undefined,undefined),'Current normal shelf benchmark from Sainsbury’s and Tesco; temporary promotional prices excluded.');
  add(/^rhubarb$/i,400,'g',2.50,'fresh rhubarb 400g',stores(2.50,2.50,undefined,undefined),'Current 400g fresh rhubarb price at Sainsbury’s and Tesco.');
  add(/^21 day aged british fillet steaks$/i,2,'each',14.55,'British beef fillet steaks x2',stores(14.10,15.00,undefined,undefined),'Sainsbury’s x2 approximately 300g and two Tesco 170g fillet steaks averaged as the closest two-steak basket requirement.');

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