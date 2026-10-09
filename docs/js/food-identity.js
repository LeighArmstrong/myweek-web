window.MW=window.MW||{};
(function(){
  'use strict';

  const normalise=x=>String(x||'').toLowerCase().normalize('NFKD').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
  const singular=x=>MW.avoidance&&MW.avoidance.singular?MW.avoidance.singular(x):normalise(x).replace(/s$/,'');
  const title=x=>MW.display&&MW.display.ingredient?MW.display.ingredient(x):String(x||'').replace(/\b\w/g,m=>m.toUpperCase());

  const groups=[
    ['mushroom','mushrooms'],
    ['tomato','tomatoes'],
    ['cherry tomato','cherry tomatoes'],
    ['potato','potatoes','spud','spuds'],
    ['sweet potato','sweet potatoes'],
    ['black pepper','ground black pepper','pepper'],
    ['bell pepper','bell peppers','peppers'],
    ['red pepper','red peppers'],
    ['green pepper','green peppers'],
    ['yellow pepper','yellow peppers'],
    ['onion','onions'],
    ['red onion','red onions'],
    ['spring onion','spring onions','scallion','scallions'],
    ['courgette','courgettes','zucchini'],
    ['aubergine','aubergines','eggplant'],
    ['chickpea','chickpeas','garbanzo','garbanzo beans'],
    ['lentil','lentils'],
    ['red lentil','red lentils'],
    ['green lentil','green lentils'],
    ['black bean','black beans'],
    ['butter bean','butter beans'],
    ['green bean','green beans'],
    ['prawn','prawns','shrimp'],
    ['salmon','salmon fillet','salmon fillets'],
    ['cod','cod fillet','cod fillets'],
    ['chicken breast','chicken breasts','chicken breast fillet','chicken breast fillets','chicken fillet','chicken fillets'],
    ['chicken thigh','chicken thighs','chicken thigh fillet','chicken thigh fillets'],
    ['beef mince','minced beef','ground beef'],
    ['pork mince','minced pork','ground pork'],
    ['halloumi'],
    ['tofu'],
    ['coriander','cilantro'],
    ['sweetcorn','corn'],
    ['broccoli'],
    ['cauliflower'],
    ['spinach'],
    ['kale'],
    ['garlic'],
    ['garlic clove','garlic cloves'],
    ['garlic granules','garlic powder'],
    ['ginger','fresh ginger'],
    ['basmati rice','basmati'],
    ['cooking oil','vegetable oil','sunflower oil'],
    ['bbq sauce','barbecue sauce'],
    ['skimmed milk','skim milk'],
    ['mangetout','mange tout','pea pod','pea pods','young pea pods'],
    ['sugar snap pea','sugar snap peas'],
    ['rocket','wild rocket'],
    ['egg','eggs'],
    ['yoghurt','yogurt','yoghurts','yogurts'],
    ['greek style yoghurt','greek style yogurt','greek yoghurt','greek yogurt']
  ];
  (MW.INGREDIENT_CATALOGUE||[]).forEach(group=>{if(Array.isArray(group)&&group.length)groups.push(group);});

  const common=new Map();
  const canonicalLabels=new Map();
  groups.forEach(group=>{
    const canonical=singular(group[0]);
    if(!canonicalLabels.has(canonical))canonicalLabels.set(canonical,title(group[0]));
    group.forEach(alias=>{
      const key=normalise(alias);
      if(!common.has(key))common.set(key,canonical);
    });
  });

  function learned(){
    try{
      const st=MW.state&&MW.state.get?MW.state.get():null;
      const map=st&&st.household&&st.household.foodAliases;
      return map&&typeof map==='object'&&!Array.isArray(map)?map:{};
    }catch{return {};}
  }

  let exactMap=null;
  function knownExact(){
    if(exactMap)return exactMap;
    const map=new Map(common);
    const recipes=[...(MW.RECIPES||[]),...(MW.LUNCHES||[])];
    recipes.forEach(recipe=>(recipe.ingredients||[]).forEach(row=>{
      const raw=Array.isArray(row)?row[1]:row&&row.name,n=normalise(raw);
      if(!n)return;
      const canonical=common.get(n)||singular(n);
      if(!map.has(n))map.set(n,canonical);
      const single=singular(n);if(!map.has(single))map.set(single,canonical);
    }));
    exactMap=map;return map;
  }

  function baseResolve(raw){
    const n=normalise(raw);
    if(!n)return null;
    const learnedMap=learned();
    if(learnedMap[n])return {raw:String(raw).trim(),canonical:learnedMap[n],matched:true,method:'learned'};
    const map=knownExact(),canonical=map.get(n)||map.get(singular(n));
    if(canonical)return {raw:String(raw).trim(),canonical,matched:true,method:common.has(n)?'alias':'exact'};
    const avoidance=MW.avoidance&&typeof MW.avoidance.resolveOne==='function'?MW.avoidance.resolveOne(raw):null;
    if(avoidance&&avoidance.matched&&avoidance.method==='category')return {raw:String(raw).trim(),canonical:avoidance.canonical,matched:true,method:'category'};
    return null;
  }

  function canonicalLabel(canonical){
    const label=canonicalLabels.has(canonical)?canonicalLabels.get(canonical):title(canonical);
    return MW.display&&MW.display.plainIngredientNames?title(MW.display.plainIngredientNames(label)):label;
  }

  let cache=null;
  function catalogue(){
    if(cache)return cache;
    const map=new Map();
    const add=(label,canonical)=>{
      label=String(label||'').trim();canonical=String(canonical||'').trim();
      if(!label||!canonical)return;
      const key=normalise(label)+'|'+canonical;
      if(!map.has(key))map.set(key,{label:title(label),canonical,search:normalise(label),canonicalSearch:normalise(canonical)});
      if(!canonicalLabels.has(canonical))canonicalLabels.set(canonical,title(canonical));
    };
    for(const group of groups){
      const canonical=singular(group[0]);
      add(group[0],canonical);
      group.slice(1).forEach(alias=>add(alias,canonical));
    }
    const recipes=[...(MW.RECIPES||[]),...(MW.LUNCHES||[])];
    recipes.forEach(recipe=>(recipe.ingredients||[]).forEach(row=>{
      const raw=Array.isArray(row)?row[1]:row&&row.name;
      const n=normalise(raw);
      if(!n||n.length<2||n.length>70)return;
      const resolved=baseResolve(raw);
      add(raw,resolved?resolved.canonical:singular(raw));
    }));
    cache=[...map.values()];
    return cache;
  }

  function levenshtein(a,b){
    a=String(a);b=String(b);
    const prev=Array.from({length:b.length+1},(_,i)=>i);
    for(let i=1;i<=a.length;i++){
      let diagonal=prev[0];prev[0]=i;
      for(let j=1;j<=b.length;j++){
        const old=prev[j];
        prev[j]=Math.min(prev[j]+1,prev[j-1]+1,diagonal+(a[i-1]===b[j-1]?0:1));
        diagonal=old;
      }
    }
    return prev[b.length];
  }

  function fuzzyLimit(text){
    const n=normalise(text).replace(/ /g,'').length;
    if(n<=3)return 0;
    if(n<=7)return 1;
    if(n<=14)return 2;
    return 3;
  }

  function score(query,item){
    const q=normalise(query),s=item.search,c=item.canonicalSearch;
    if(!q)return Infinity;
    if(s===q)return 0;
    if(c===q)return 1;
    if(s.startsWith(q))return 10+(s.length-q.length)/100;
    if(c.startsWith(q))return 11+(c.length-q.length)/100;
    const qTokens=q.split(' ').filter(Boolean),tokens=s.split(' ');
    if(qTokens.length&&qTokens.every(qt=>tokens.some(t=>t.startsWith(qt))))return 20+(s.length-q.length)/100;
    if(s.includes(q))return 30+s.indexOf(q)/100;
    if(c.includes(q))return 31+c.indexOf(q)/100;
    const compactQ=q.replace(/ /g,''),compactS=s.replace(/ /g,''),limit=fuzzyLimit(q);
    if(limit){
      const d=levenshtein(compactQ,compactS);
      if(d<=limit)return 50+d+(compactS.length-compactQ.length)/100;
      let best=Infinity;
      for(const token of tokens){
        if(Math.abs(token.length-q.length)>limit)continue;
        best=Math.min(best,levenshtein(q,token));
      }
      if(best<=limit)return 55+best;
    }
    return Infinity;
  }

  function suggest(query,limit=5){
    const q=normalise(query);
    if(!q)return [];
    const learnedMap=learned(),extra=[];
    for(const [alias,canonical] of Object.entries(learnedMap)){
      extra.push({label:title(alias),canonical,search:normalise(alias),canonicalSearch:normalise(canonical),learned:true});
    }
    const seen=new Set(),ranked=[];
    for(const item of [...extra,...catalogue()]){
      const sc=score(q,item);
      if(!Number.isFinite(sc))continue;
      const key=item.canonical+'|'+normalise(item.label);
      if(seen.has(key))continue;
      seen.add(key);
      ranked.push({...item,score:sc});
    }
    ranked.sort((a,b)=>a.score-b.score||a.label.localeCompare(b.label));
    const result=[],canonSeen=new Set();
    for(const item of ranked){
      if(canonSeen.has(item.canonical))continue;
      result.push({label:canonicalLabel(item.canonical),matchedLabel:item.label,canonical:item.canonical,score:item.score,learned:Boolean(item.learned)});
      canonSeen.add(item.canonical);
      if(result.length>=limit)break;
    }
    return result;
  }

  function resolveExact(raw){
    return baseResolve(raw);
  }

  function learnAlias(raw,canonical){
    const alias=normalise(raw),target=normalise(canonical);
    if(!alias||!target||alias===target)return;
    if(!MW.state||!MW.state.transaction)return;
    MW.state.transaction(st=>{
      st.household=st.household||{};
      st.household.foodAliases=st.household.foodAliases&&typeof st.household.foodAliases==='object'?st.household.foodAliases:{};
      st.household.foodAliases[alias]=target;
    });
  }

  function parseList(text){
    const rawItems=String(text||'').split(/[,;\n]+/).map(x=>x.trim()).filter(Boolean);
    const items=rawItems.map(raw=>{
      const resolved=resolveExact(raw);
      return resolved?{raw,canonical:resolved.canonical,matched:true,method:resolved.method}:{raw,canonical:normalise(raw),matched:false,method:'custom'};
    });
    return {
      items,
      linked:[...new Set(items.filter(x=>x.matched).map(x=>x.canonical))],
      custom:[...new Set(items.filter(x=>!x.matched).map(x=>x.raw))]
    };
  }

  function currentToken(input,multi){
    const value=String(input.value||'');
    if(!multi)return {raw:value.trim(),start:0,end:value.length};
    const pos=input.selectionStart==null?value.length:input.selectionStart;
    const before=value.slice(0,pos);
    const idx=Math.max(before.lastIndexOf(','),before.lastIndexOf(';'),before.lastIndexOf('\n'));
    const start=idx+1;
    return {raw:value.slice(start,pos).trim(),start,end:pos};
  }

  function replaceToken(input,token,value,multi){
    if(!multi){input.value=value;return;}
    const full=input.value;
    const leading=full.slice(0,token.start);
    const trailing=full.slice(token.end);
    const prefix=leading&&/[,;\n]\s*$/.test(leading)?leading.replace(/\s*$/,' '):leading;
    input.value=prefix+value+trailing;
    const pos=(prefix+value).length;
    input.setSelectionRange(pos,pos);
  }

  function attach(input,opts={}){
    if(!input||input.dataset.foodAutocompleteBound==='1')return null;
    input.dataset.foodAutocompleteBound='1';
    input.setAttribute('autocomplete','off');
    const multi=Boolean(opts.multi),host=input.closest('.food-autocomplete-host')||input.parentElement;
    if(host)host.classList.add('food-autocomplete-host');
    const menu=document.createElement('div');
    menu.className='food-autocomplete-menu';
    menu.setAttribute('role','listbox');
    menu.hidden=true;
    input.insertAdjacentElement('afterend',menu);
    let active=-1,lastToken=null;

    const close=()=>{menu.hidden=true;menu.innerHTML='';active=-1;input.removeAttribute('aria-activedescendant');};
    const choose=(item,raw)=>{
      const token=lastToken||currentToken(input,multi);
      const label=canonicalLabel(item.canonical);
      replaceToken(input,token,label,multi);
      if(!multi){input.dataset.mwCanonical=item.canonical;delete input.dataset.mwCustom;}
      if(normalise(raw)!==normalise(item.canonical))learnAlias(raw,item.canonical);
      input.dispatchEvent(new Event('input',{bubbles:true}));
      if(typeof opts.onSelect==='function')opts.onSelect({type:'linked',canonical:item.canonical,label,raw});
      close();
    };
    const chooseCustom=raw=>{
      if(!multi){input.dataset.mwCustom='1';delete input.dataset.mwCanonical;}
      if(typeof opts.onSelect==='function')opts.onSelect({type:'custom',raw});
      close();
    };
    const render=()=>{
      const token=currentToken(input,multi);lastToken=token;
      const q=token.raw;
      if(!q){close();return;}
      if(!multi){delete input.dataset.mwCanonical;delete input.dataset.mwCustom;}
      const exact=resolveExact(q);
      const rows=suggest(q,Number(opts.limit)||5);
      const html=rows.map((x,i)=>'<button type="button" role="option" data-i="'+i+'" class="food-autocomplete-option"><span><strong>'+escapeHtml(x.label)+'</strong><small>'+(normalise(x.matchedLabel)!==normalise(x.label)?'Matches “'+escapeHtml(x.matchedLabel)+'” · ':'')+'Recognised ingredient</small></span><i class="fa-solid fa-link" aria-hidden="true"></i></button>').join('')+
        (!opts.requireMatch&&!exact&&q.length>=2?'<button type="button" class="food-autocomplete-option custom" data-custom="1"><span><strong>Use “'+escapeHtml(q)+'”</strong><small>Custom item · Not linked to recipes</small></span><i class="fa-regular fa-circle-question" aria-hidden="true"></i></button>':'');
      menu.innerHTML=html;
      menu.hidden=!html;
      menu.querySelectorAll('[data-i]').forEach(btn=>{
        btn.onmousedown=e=>e.preventDefault();
        btn.onclick=()=>choose(rows[Number(btn.dataset.i)],q);
      });
      const custom=menu.querySelector('[data-custom]');
      if(custom){custom.onmousedown=e=>e.preventDefault();custom.onclick=()=>chooseCustom(q);}
      if(exact&&!multi){input.dataset.mwCanonical=exact.canonical;}
      active=-1;
    };
    input.addEventListener('input',render);
    input.addEventListener('focus',render);
    input.addEventListener('keydown',e=>{
      if(menu.hidden)return;
      const buttons=[...menu.querySelectorAll('button')];
      if(e.key==='ArrowDown'||e.key==='ArrowUp'){
        e.preventDefault();
        active=e.key==='ArrowDown'?Math.min(buttons.length-1,active+1):Math.max(0,active-1);
        buttons.forEach((b,i)=>b.classList.toggle('active',i===active));
        if(buttons[active])buttons[active].scrollIntoView({block:'nearest'});
      }else if(e.key==='Enter'&&active>=0){
        e.preventDefault();buttons[active].click();
      }else if(e.key==='Escape'){close();}
    });
    input.addEventListener('blur',()=>setTimeout(close,140));
    return {render,close};
  }

  function escapeHtml(x){
    return String(x==null?'':x).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  MW.foodIdentity={normalise,resolveExact,suggest,learnAlias,parseList,attach,canonicalLabel,catalogue};
})();