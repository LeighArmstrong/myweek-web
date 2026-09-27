window.MW = window.MW || {};
(function(){
  const TARGET_LOCAL_RECIPES=2000;
  const F=MW.recipeFrameworkV014;if(!F||!F.formatDefs) throw new Error('My Week v0.14 recipe framework missing.');
  const {mains,vegPairs,profiles,formatProfiles,formatDefs}=F;
  const formats=Object.keys(formatProfiles);
  const compatible={
    rice:mains.map(x=>x.id),
    pasta:mains.map(x=>x.id),
    noodles:['chicken-breast','chicken-thighs','turkey-mince','beef-mince','beef-strips','pork-mince','pork-strips','salmon','prawns','tofu','cauliflower'],
    tacos:['chicken-breast','chicken-thighs','turkey-mince','beef-mince','beef-strips','pork-mince','pork-strips','lamb-mince','salmon','cod','prawns','tofu','chickpeas','black-beans','butter-beans','red-lentils','green-lentils','halloumi','cauliflower'],
    tray:['chicken-breast','chicken-thighs','tofu','chickpeas','aubergine','cauliflower'],
    curry:mains.map(x=>x.id),
    stirfry:['chicken-breast','chicken-thighs','beef-strips','pork-strips','prawns','tofu','halloumi','cauliflower'],
    couscous:mains.map(x=>x.id),
    orzo:mains.map(x=>x.id),
    stew:['chicken-thighs','beef-mince','beef-strips','pork-mince','pork-strips','lamb-mince','chickpeas','black-beans','butter-beans','red-lentils','green-lentils','aubergine','cauliflower'],
    soup:['chicken-breast','chicken-thighs','turkey-mince','chickpeas','black-beans','butter-beans','red-lentils','green-lentils','tofu','aubergine','cauliflower'],
    grainsalad:mains.map(x=>x.id),
    potato:mains.map(x=>x.id),
    flatbread:mains.map(x=>x.id),
    stuffed:['turkey-mince','beef-mince','pork-mince','lamb-mince','tofu','chickpeas','black-beans','butter-beans','red-lentils','green-lentils','halloumi','aubergine','cauliflower'],
    onepan:['chicken-breast','chicken-thighs','turkey-mince','beef-mince','beef-strips','pork-mince','pork-strips','lamb-mince','tofu','chickpeas','black-beans','butter-beans','halloumi','aubergine','cauliflower'],
    slow:['chicken-thighs','beef-mince','beef-strips','pork-mince','pork-strips','lamb-mince','chickpeas','black-beans','butter-beans','aubergine'],
    air:['chicken-breast','chicken-thighs','beef-strips','pork-strips','salmon','cod','prawns','tofu','chickpeas','halloumi','aubergine','cauliflower'],
    bbq:['chicken-breast','chicken-thighs','beef-strips','pork-strips','salmon','prawns','tofu','halloumi','aubergine','cauliflower'],
    salad:mains.map(x=>x.id)
  };

  const existingIds=new Set((MW.RECIPES||[]).map(r=>r.id));
  const existingTitles=new Set((MW.RECIPES||[]).map(r=>String(r.title||'').toLowerCase()));
  const generated=[];

  function lower(text){return text.charAt(0).toLowerCase()+text.slice(1);}
  function titleCase(text){return String(text).replace(/\b\w/g,x=>x.toUpperCase());}
  function slug(text){return String(text).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
  function hash(text){let h=2166136261;for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
  function qtyForVeg(name){
    const n=String(name||'').toLowerCase();
    if(/spinach|kale|peas|sweetcorn/.test(n)) return '100 g';
    if(/green beans|mushrooms|cabbage/.test(n)) return '150 g';
    if(/broccoli|cauliflower|butternut|sweet potato/.test(n)) return '200 g';
    if(/tomato/.test(n)) return '200 g';
    if(n==='spring onions') return '2';
    if(n==='peppers') return '2';
    return '1';
  }
  function photo(id){
    return {
      imageBase:MW.images.pexels(id),
      imageSource:'https://www.pexels.com/photo/'+id+'/',
      imageLicense:'Pexels License',
      imageProvenance:'Pexels photography bundled locally during the Android build'
    };
  }
  function visualPrompt(format,main,profile,veg){
    return 'Natural editorial food photograph of the actual recipe '+profile.name+' '+main.label+' '+formatDefs[format].label+' with '+veg[0]+' and '+veg[1]+'. The main ingredient and format must be visibly correct. Make it look genuinely home cooked and achievable, with realistic portions, natural texture, slight human imperfections and believable kitchen lighting. Use only ingredients that belong in the dish. Avoid glossy synthetic surfaces, impossible garnishes, excessive steam, perfect symmetry, floating ingredients, decorative clutter, hyper-saturated colour, dramatic fantasy lighting, fake depth of field, text, labels, illustration and other stereotypical AI food-image styling.';
  }
  const recentHeroSources={};
  function chooseHero(pool,key,seedText){
    const list=(pool||[]).filter(Boolean);
    if(!list.length) return null;
    const recent=recentHeroSources[key]||[];
    const preferred=list.filter(x=>!recent.includes(x));
    const candidates=preferred.length?preferred:list;
    const picked=candidates[hash(seedText)%candidates.length];
    recentHeroSources[key]=[picked,...recent.filter(x=>x!==picked)].slice(0,2);
    return picked;
  }
  function visualFor(format,main,profile,veg,id){
    // Hero photography is fail-closed. Every ID below was visually reviewed as
    // food-focused. New source photos do not become recipe heroes until added
    // to this allowlist deliberately.
    const HERO_APPROVED=new Set(["10165873","10201739","10267339","10608701","10692537","10914154","10942354","11015917","11044248","11432286","11527489","15322739","15508173","15615007","15655166","15667778","15820587","16010637","1630495","17308538","175754","17615597","18285312","18585656","19037599","19295808","19359941","19359972","20802635","21531368","22698511","2336674","25749300","27039855","27098516","27603293","2781537","27831791","27850091","28442544","29535635","29707560","3009323","30700759","31423004","31779535","31953510","32167350","32664528","33430562","33515064","34429484","34429488","34683317","35064908","35285814","35685909","35718863","36964109","37053394","37074444","37107041","37297725","37297732","37520728","37667711","38163945","3872366","3872385","38935442","4368803","4374555","4374558","4374560","4543005","4661807","5191822","5250392","5670958","5713767","5836624","5848470","5848471","5848480","5848482","5848714","5950480","5950848","5956831","6066051","6120231","6120248","6249475","6541639","6544375","6544380","6546425","6646038","6947606","7009334","7239441","725997","7353487","7364662","7538076","8286754","8286760","8286766","8751405","8751408","8753778","8983397","8996219","9026808","9213853","9213979","9213985","9218768","9266855","9394526","9544251","9692057"]);
    const approvedPool=list=>(Array.isArray(list)?list:(list?[list]:[])).filter(x=>HERO_APPROVED.has(String(x)));
    const specific={
      'chicken-breast':{rice:['28442544'],pasta:['33515064','27831791'],couscous:['31423004','25749300'],tray:['5956831','27831791'],curry:['7353487','38908930'],stirfry:['28442544','27831791'],onepan:['38908930','25749300'],air:['35285814','27831791'],bbq:['37667711','27831791'],salad:['17615597','25749300']},
      'chicken-thighs':{rice:['27831791'],pasta:['33515064','27831791'],couscous:['31423004','25749300'],tray:['5956831','27831791'],curry:['7353487','38908930'],stew:['10692537','27831791'],slow:['10692537','25749300'],air:['35285814','27831791'],bbq:['37667711','27831791']},
      'turkey-mince':{rice:['35064908'],pasta:['10165873','38908930'],tacos:['2336674','38908930'],curry:['30700759','38908930'],stew:['10692537','30700759'],stuffed:['6546425','38908930']},
      'beef-mince':{noodles:['4368803'],tacos:['2336674','4661807'],curry:['30700759','4661807'],rice:['4661807'],pasta:['10165873','4661807'],stew:['10692537','4661807'],slow:['10692537','31088694'],stuffed:['6546425','4661807']},
      'beef-strips':{noodles:['4368803'],stirfry:['17308538','4661807'],rice:['30700759'],curry:['30700759'],stew:['10692537','4661807'],slow:['10692537','31088694'],bbq:['37667711','31088694']},
      'pork-mince':{pasta:['16010637','10692537'],rice:['17308538'],tacos:['2336674','17308538'],stew:['10692537','17308538'],slow:['10692537','16010637'],stuffed:['6546425','17308538']},
      'pork-strips':{stirfry:['17308538','10692537'],rice:['16010637'],noodles:['4368803','17308538'],pasta:['16010637','17308538'],stew:['10692537','17308538'],slow:['10692537','16010637'],bbq:['37667711','17308538']},
      'lamb-mince':{tacos:['2336674','10692537'],curry:['30700759','10692537'],rice:['10692537'],stew:['10692537','30700759'],slow:['10692537','30700759'],stuffed:['6546425','10692537']},
      'salmon':{
        rice:['36964109'],
        potato:['5670958','10942354'],
        air:['36964109','10942354'],
        salad:['36964109','10942354'],
        pasta:['31779535','10942354'],
        couscous:['36964109','10942354'],
        bbq:['37667711','10942354']
      },
      'cod':{
        rice:['5713767'],
        potato:['11044248','5713767'],
        salad:['11044248','5713767'],
        couscous:['11044248','5713767'],
        bbq:['5713767'],
        air:['11044248']
      },
      'prawns':{
        pasta:['18285312','4374555','4374560','4374558','3009323','9544251','725997'],
        orzo:['29707560','15655166'],
        rice:['11015917','11527489','15615007','1630495','34683317','8286766','15655166','10914154','15508173'],
        noodles:['8286760','6646038','8286754','10201739'],
        stirfry:['19359941','7538076','8286760','10201739','8983397'],
        salad:['8286766','11527489','11015917','8983397']
      },
      'tofu':{
        rice:['34429484'],
        stirfry:['9213853','5848480','5848470','5848471','5848482','7009334','6120248'],
        noodles:['5848480','9213853','7009334'],
        salad:['5848482','9218768','34429488','37074444'],
        curry:['9218768','7009334','35064908'],
        air:['5848470','5848482','7009334'],
        pasta:['7009334','9218768'],
        couscous:['9218768','5848482','34429488'],
        tacos:['5848482','7009334','37074444']
      },
      'chickpeas':{couscous:['6947606','6066051'],salad:['6066051','9692057'],grainsalad:['6066051','9692057','6947606'],curry:['7364662'],rice:['7364662'],tray:['6541639','6947606'],potato:['6541639','7364662'],flatbread:['11432286','7364662'],soup:['27098516','7364662'],tacos:['27603293','9213985','9213979']},
      'black-beans':{tacos:['27603293','9213985','9213979','5848714'],salad:['6066051','9692057'],grainsalad:['6066051','9692057'],curry:['6544380'],rice:['6947606'],stuffed:['6546425','27603293']},
      'butter-beans':{salad:'6066051',grainsalad:'6066051',curry:'6544375',rice:'6544380',stew:'10692537',soup:'27098516'},
      'red-lentils':{pasta:['19037599','33430562'],curry:['33430562','8996219','6544380'],rice:['8996219'],soup:['27098516','33430562'],stew:['10692537','33430562'],grainsalad:['6066051','8996219']},
      'green-lentils':{curry:['33430562','6544380'],rice:['33430562'],soup:['27098516','33430562'],stew:['10692537','33430562'],grainsalad:['6066051','8996219'],salad:['6066051','9692057']},
      'halloumi':{
        rice:['5950480'],
        pasta:['8751405','5950848','10267339'],
        noodles:['8751405','5950480'],
        tacos:['8751405','5950848'],
        tray:['8751405','5950480','8753778'],
        curry:['8751405','5950480'],
        stirfry:['8751405','5950480','8751408'],
        couscous:['8751405','5950848','5950480','17615597','10267339'],
        orzo:['9266855','8751405','5950848'],
        stew:['8751405','5950480'],
        soup:['8751405','5950848'],
        grainsalad:['38935442','5950848','8751405','17615597','10267339','5191822'],
        potato:['8751405','5950480'],
        flatbread:['8751405','5950480','5836624'],
        stuffed:['8751405','5950848'],
        onepan:['8751405','5950480'],
        air:['8751405','5950480','8751408'],
        bbq:['8751405','5950480','8751408'],
        salad:['5950848','38935442','8751405','17615597','10267339','5191822','12605538']
      },
      'aubergine':{tray:['9394526','20802635','6546425'],curry:['27039855'],salad:['20802635','19295808'],grainsalad:['20802635','19295808'],flatbread:['9394526','3872385'],stuffed:['6546425','20802635'],rice:['27039855']},
      'cauliflower':{tray:['3872366','6541639'],curry:['3872366'],salad:['4519052','3872366'],grainsalad:['4519052','3872366'],air:['3872366'],bbq:['32167350','3872366'],rice:['3872366'],couscous:['3872366','4519052'],tacos:['3872366','5848714'],onepan:['3872366','6541639']}
    };
    const formatDefaults={
      rice:['38908930','28442544','6544380','8996219'],pasta:['19037599','33515064','16010637','31779535'],noodles:['4368803','175754'],tacos:['2336674','5848714'],
      tray:['5956831','6541639','6546425','3872366'],curry:['7364662','6544380','7353487','30700759'],stirfry:['17308538','5848480','175754'],couscous:['31423004','17615597','6947606','37520728'],
      orzo:['19037599','31779535'],stew:['10692537','7353487'],soup:['27098516','10692537'],grainsalad:['19295808','6066051','9692057','17615597'],potato:['5670958','5956831','6541639'],
      flatbread:['3872385','5848714'],stuffed:['6546425','6541639'],onepan:['38908930','6544380','7364662'],slow:['10692537','7353487'],air:['36964109','35285814'],bbq:['37667711','32167350'],salad:['19295808','6066051','17615597','9692057']
    };
    const mainDefaults={
      'chicken-breast':['27831791','25749300','38163945','35285814'],
      'chicken-thighs':['27831791','25749300','38163945','35285814'],
      'turkey-mince':['38908930','30700759'],
      'beef-mince':['4661807','31088694','38908930'],
      'beef-strips':['31088694','4661807','38908930'],
      'pork-mince':['10692537','30700759'],
      'pork-strips':['17308538','10692537'],
      'lamb-mince':['10692537','30700759'],
      salmon:['36964109','38097915','36110523','10942354'],
      cod:['37222940','38719619'],
      prawns:['19359941','8286760','8286766','11527489','11015917','18285312'],
      halloumi:['8751405','5950848','38935442'],
      tofu:['7009334','9218768','5848482'],
      chickpeas:['6066051','6947606','7364662'],
      'black-beans':['27603293','9213985','6066051'],
      'butter-beans':['6066051','6544375'],
      'red-lentils':['33430562','8996219'],
      'green-lentils':['33430562','6066051'],
      aubergine:['9394526','20802635','27039855'],
      cauliflower:['3872366','4519052']
    };
    const kindDefaults={fish:['36964109','31779535','5670958'],vegetarian:['17615597','19295808','15667778'],plant:['6066051','7364662','6544380','11432286'],meat:['38908930','30700759','10692537']};
    const exactFormatPool=(()=>{
      if(format==='stuffed') return ['22698511','19359972','35718863','31953510','5250392','15820587','37297725','37297732','37053394'];
      if(format==='orzo'){
        if(main.id==='chicken-breast'||main.id==='chicken-thighs') return ['25749300','38163945'];
        if(main.id==='prawns') return ['29707560'];
        return ['7239441'];
      }
      return [];
    })();
    const direct=specific[main.id]&&specific[main.id][format];
    const pool=approvedPool(formatDefaults[format]||kindDefaults[main.kind]||kindDefaults.plant);
    const directPool=approvedPool(direct);
    let mainPool=approvedPool(mainDefaults[main.id]||[]);
    const exactApproved=approvedPool(exactFormatPool);
    // A protected main must always retain at least one approved ingredient-specific
    // hero. If an old source is rejected, borrow only from that main's approved
    // direct format pools rather than dropping to an unrelated food-family image.
    if(!mainPool.length&&specific[main.id]){
      mainPool=approvedPool(Object.values(specific[main.id]).flatMap(v=>Array.isArray(v)?v:[v]));
    }
    const visualSeed=main.id+'|'+format+'|'+profile.id+'|'+id;
    const sequenceKey=format+'|'+profile.id;
    const candidatePool=exactApproved.length
      ?exactApproved
      :(directPool.length
        ?directPool
        :(mainPool.length?mainPool:pool));
    const selected=chooseHero(candidatePool,sequenceKey,visualSeed);
    const base=photo(selected);
    return Object.assign({},base,{
      image:'assets/images/recipes/'+id+'.jpg',
      imagePrompt:visualPrompt(format,main,profile,veg),
      imageFallbackQuality:exactApproved.length
        ?'exact-dish-format-match'
        :(directPool.length?'main-and-format-match':(mainPool.length?'main-ingredient-match':'format-and-food-family-match'))
    });
  }
  function escapeSvg(text){return String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));}
  function costFor(main,format,index){
    const mainBase={meat:7.4,fish:8.8,vegetarian:6.8,plant:5.6}[main.kind]||6.5;
    const formatAdd={pasta:.3,noodles:.4,tacos:.7,tray:.8,curry:.5,couscous:.2,orzo:.4,stew:.5,soup:0,grainsalad:.3,potato:0,flatbread:.5,stuffed:.5,onepan:.3,slow:.6,air:.4,bbq:.8,salad:.2,rice:.2,stirfry:.4}[format]||0;
    return Math.round((mainBase+formatAdd+((index%5)*.18))*10)/10;
  }
  function stepsFor(main,format,veg,p){
    return formatDefs[format].steps(main,veg[0],veg[1],p);
  }
  function prepStyle(name){
    const n=String(name||'').toLowerCase();
    if(/spring onion/.test(n)) return 'thinly slice the '+name;
    if(/red onion|onion/.test(n)) return 'finely dice the '+name;
    if(/pepper/.test(n)) return 'slice the '+name+' into 1 cm strips';
    if(/courgette/.test(n)) return 'halve the '+name+' lengthways and slice into 1 cm half-moons';
    if(/carrot/.test(n)) return 'peel the '+name+' and cut into thin half-moons';
    if(/broccoli/.test(n)) return 'cut the '+name+' into small florets and slice the stalk thinly';
    if(/cauliflower/.test(n)) return 'cut the '+name+' into bite-sized florets';
    if(/aubergine/.test(n)) return 'cut the '+name+' into 2 cm cubes';
    if(/sweet potato|butternut/.test(n)) return 'peel the '+name+' and cut into 2 cm cubes';
    if(/cabbage/.test(n)) return 'finely shred the '+name;
    if(/green beans/.test(n)) return 'trim the '+name+' and halve any long ones';
    if(/tomato/.test(n)) return 'dice the '+name+' into 2 cm pieces';
    if(/mushroom/.test(n)) return 'wipe the '+name+' clean and slice them about 5 mm thick';
    if(/kale/.test(n)) return 'strip out any tough kale stems and roughly chop the leaves';
    if(/spinach/.test(n)) return 'have the '+name+' washed and ready to add';
    if(/peas|sweetcorn/.test(n)) return 'have the '+name+' ready to add';
    return 'cut the '+name+' into even bite-sized pieces';
  }
  function precisionPass(steps,main,veg){
    return (steps||[]).map(step=>{
      let x=String(step);
      x=x.replace('Prepare the '+veg[0]+' and '+veg[1]+' into even bite-sized pieces.', 'Prepare the vegetables: '+prepStyle(veg[0])+', then '+prepStyle(veg[1])+'.');
      x=x.replace('Prepare the '+veg[0]+' and '+veg[1]+' into bite-sized pieces.', 'Prepare the vegetables: '+prepStyle(veg[0])+', then '+prepStyle(veg[1])+'.');
      x=x.replace('Prepare the '+veg[0]+' and '+veg[1]+' so they are ready to cook.', 'Prepare the vegetables: '+prepStyle(veg[0])+', then '+prepStyle(veg[1])+'.');
      x=x.replace('Slice or chop the '+veg[0]+' and '+veg[1]+' into small pieces for quick cooking.', 'Prepare the vegetables: '+prepStyle(veg[0])+', then '+prepStyle(veg[1])+'.');
      x=x.replace('Prepare the '+veg[0]+', '+veg[1]+' and lettuce, keeping the fresh ingredients separate.', 'Prepare the vegetables: '+prepStyle(veg[0])+', then '+prepStyle(veg[1])+'. Wash and dry the lettuce, then shred it into thin strips and keep it separate for serving.');
      x=x.replace('Prepare the '+veg[0]+' and '+veg[1]+' so they are ready to roast.', 'Prepare the vegetables for roasting: '+prepStyle(veg[0])+', then '+prepStyle(veg[1])+'.');
      x=x.replace('Finely dice the onion and prepare the '+veg[0]+' and '+veg[1]+' so everything is ready before the pan gets hot.', 'Finely dice the onion. Prepare the vegetables: '+prepStyle(veg[0])+', then '+prepStyle(veg[1])+'.');
      x=x.replace('Finely dice the onion and prepare the '+veg[0]+' and '+veg[1]+' into even bite-sized pieces.', 'Finely dice the onion. Prepare the vegetables: '+prepStyle(veg[0])+', then '+prepStyle(veg[1])+'.');
      x=x.replace('Finely dice the onion and prepare the '+veg[0]+' and '+veg[1]+' into small, even pieces.', 'Finely dice the onion. Prepare the vegetables: '+prepStyle(veg[0])+', then '+prepStyle(veg[1])+'.');
      x=x.replace('Finely dice the onion, cut the potatoes into 2 cm pieces and prepare the '+veg[0]+' and '+veg[1]+' into even bite-sized pieces.', 'Finely dice the onion and cut the potatoes into 2 cm pieces. Prepare the vegetables: '+prepStyle(veg[0])+', then '+prepStyle(veg[1])+'.');
      x=x.replace('Prepare the '+veg[0]+' and '+veg[1]+' into thin, even pieces so they cook quickly.', 'Prepare the vegetables: '+prepStyle(veg[0])+', then '+prepStyle(veg[1])+'.');
      x=x.replace('Wash and dry the mixed leaves, then prepare the '+veg[0]+' and '+veg[1]+'.', 'Wash and dry the mixed leaves. Prepare the vegetables: '+prepStyle(veg[0])+', then '+prepStyle(veg[1])+'.');
      x=x.replace('Prepare the '+veg[0]+' and '+veg[1]+'.', 'Prepare the vegetables: '+prepStyle(veg[0])+', then '+prepStyle(veg[1])+'.');
      x=x.replace('Dice the onion and prepare the '+veg[0]+' and '+veg[1]+'.', 'Finely dice the onion. Then '+prepStyle(veg[0])+', and '+prepStyle(veg[1])+'.');
      x=x.replace('Dice the onion and prepare the '+veg[0]+' and '+veg[1]+' into small pieces.', 'Finely dice the onion. Then '+prepStyle(veg[0])+', and '+prepStyle(veg[1])+'.');
      x=x.replace('Dice the onion and prepare the '+veg[0]+' and '+veg[1]+' into even pieces.', 'Finely dice the onion. Then '+prepStyle(veg[0])+', and '+prepStyle(veg[1])+'.');
      x=x.replace(/Add the garlic and ginger/g,'Add the crushed garlic and finely grated ginger');
      x=x.replace(/Add the garlic/g,'Add the crushed garlic');
      x=x.replace(/with the garlic/g,'with the crushed garlic');
      x=x.replace(/the garlic, ginger/g,'the crushed garlic and finely grated ginger');
      x=x.replace(/the garlic and ginger/g,'the crushed garlic and finely grated ginger');
      return x;
    });
  }

  function makeRecipe(main,format,profileKey,index,variant){
    const def=formatDefs[format],p=profiles[profileKey];
    const startVeg=(hash(main.id+'|'+format+'|'+profileKey)+(variant*7))%vegPairs.length;
    const profileIngredientNames=new Set((p.ingredients||[]).map(x=>String(x[1]||'').toLowerCase()));
    let veg=vegPairs[startVeg];
    for(let offset=0;offset<vegPairs.length;offset++){
      const candidate=vegPairs[(startVeg+offset)%vegPairs.length];
      const noProfileCollision=candidate.every(name=>!profileIngredientNames.has(String(name).toLowerCase()));
      const traySafe=format!=='tray'||candidate.every(name=>!/spinach|kale|peas|sweetcorn|spring onions/i.test(String(name)));
      const bbqSafe=format!=='bbq'||candidate.every(name=>/^(red pepper|peppers|courgette|cherry tomatoes|tomatoes|aubergine|red onion|mushrooms|broccoli|cauliflower)$/i.test(String(name)));
      const stuffedSafe=format!=='stuffed'||candidate.every(name=>!/\bpeppers?\b/i.test(String(name)));
      const slowSafe=format!=='slow'||candidate.every(name=>/^(red pepper|peppers|aubergine|green beans|tomatoes|red onion|carrot|cabbage|butternut squash|sweet potato)$/i.test(String(name)));
      if(noProfileCollision&&traySafe&&bbqSafe&&stuffedSafe&&slowSafe){veg=candidate;break;}
    }
    const suffix=variant?'-v'+(variant+1):'';
    const id='mw14-'+slug(profileKey)+'-'+slug(main.id)+'-'+slug(format)+suffix;
    const baseTitle=(format==='curry'&&p.name==='Coconut Curry')
      ?('Coconut '+main.label+' Curry')
      :(p.name+' '+main.label+' '+def.label);
    const title=baseTitle+(variant?' with '+titleCase(veg[0]):'');
    const steps=precisionPass(stepsFor(main,format,veg,p),main,veg);
    const methodText=steps.join(' ').toLowerCase();
    const oilUses=(methodText.match(/\b1 tbsp cooking oil\b/g)||[]).length;
    const pantryBasics=[
      [oilUses>1?'2 tbsp':'1 tbsp','cooking oil',/\b(?:cooking )?oil\b/],
      ['0.5 tsp','salt',/\bsalt\b/],
      ['0.25 tsp','black pepper',/\bblack pepper\b/]
    ].filter(x=>x[2].test(methodText)).map(x=>[x[0],x[1]]);
    const ingredients=[[main.qty,main.ingredient],...def.base,[qtyForVeg(veg[0]),veg[0]],[qtyForVeg(veg[1]),veg[1]],...p.ingredients,...pantryBasics];
    const dedup=[];const seen=new Set();
    ingredients.forEach(x=>{const k=String(x[1]).toLowerCase();if(!seen.has(k)){seen.add(k);dedup.push(x);}});
    return {
      id,title,subtitle:'with '+veg[0]+', '+veg[1]+' and '+p.name.toLowerCase()+' flavours',
      time:def.time,cost:costFor(main,format,index),servings:2,
      tags:[main.kind,p.cuisine.toLowerCase(),format,...def.tags].filter(Boolean),
      flavourProfile:profileKey,
      requiredEquipment:(def.equipment||[]).slice(),
      ...visualFor(format,main,p,veg,id),
      ingredients:dedup,
      steps,
      referenceSources:(p.referenceSources||[]).map(x=>Object.assign({},x)),
      chosenReference:(p.referenceSources&&p.referenceSources.length)?Object.assign({},p.referenceSources[hash(id)%p.referenceSources.length]):null,
      finalImagePolicy:'use-finished-dish-image-from-chosen-reference',
      recipeSource:(p.referenceSources&&p.referenceSources[0]&&p.referenceSources[0].name)||'My Week original',
      recipeProvenance:'My Week adaptation built from reviewed online recipe techniques and flavour structure; quantities and method are rewritten for the local two-person format. If multiple references contribute, the finished-dish image must come from one selected reference rather than a synthetic or unrelated image.',
      catalogueVersion:'0.14',
      curatedFramework:true
    };
  }

  const combos=[];
  let candidateIndex=0;
  for(const format of formats){
    const allowed=new Set(compatible[format]||[]);
    for(const profileKey of formatProfiles[format]){
      for(const main of mains){
        if(!allowed.has(main.id)) continue;
        combos.push({main,format,profileKey,index:candidateIndex++});
      }
    }
  }

  function addRecipe(combo,variant){
    const recipe=makeRecipe(combo.main,combo.format,combo.profileKey,combo.index,variant);
    if(existingIds.has(recipe.id)||existingTitles.has(recipe.title.toLowerCase())) return false;
    generated.push(recipe);existingIds.add(recipe.id);existingTitles.add(recipe.title.toLowerCase());return true;
  }

  for(const combo of combos){
    if((MW.RECIPES.length+generated.length)>=TARGET_LOCAL_RECIPES) break;
    addRecipe(combo,0);
  }
  for(let i=0;(MW.RECIPES.length+generated.length)<TARGET_LOCAL_RECIPES && i<combos.length;i++){
    const combo=combos[(i*37)%combos.length];
    addRecipe(combo,1);
  }

  if((MW.RECIPES.length+generated.length)<TARGET_LOCAL_RECIPES){
    throw new Error('My Week v0.14 curated framework did not generate enough local recipes.');
  }

  MW.RECIPE_CATALOGUE_V014={
    target:TARGET_LOCAL_RECIPES,
    generated:generated.length,
    compatibleBaseCombinations:combos.length,
    mains:mains.length,
    formats:formats.length,
    profiles:Object.keys(profiles).length,
    provenance:'My Week original recipe framework. Generated recipe hero images are built locally from matched Pexels photography, with a unique packaged image file for each recipe.'
  };
  MW.RECIPES.push(...generated);
})();