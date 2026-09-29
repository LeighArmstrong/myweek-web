window.MW = window.MW || {};
(function(){
  const root=document.getElementById('app');
  const s=()=>MW.state.get();
  let animateNextPage=true;
  let pendingMotion='context';
  let previewRolloverFor='';
  const navStack=[];
  const reducedMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionClass=motion=>'motion-'+String(motion||'context').replace(/[^a-z-]/g,'');
  const clearMotionDataset=()=>{if(document.documentElement.dataset.mwMotion) delete document.documentElement.dataset.mwMotion;};
  const animatePage=(motion)=>{
    const page=root.firstElementChild;
    if(!page||reducedMotion()) return;
    ['page-enter','motion-context','motion-drill-forward','motion-drill-back','motion-continuity-forward','motion-continuity-back','motion-flow-forward','motion-flow-back'].forEach(x=>page.classList.remove(x));
    void page.offsetWidth;
    page.classList.add('page-enter',motionClass(motion||pendingMotion));
  };
  const pageObserver=new MutationObserver(()=>{
    if(!animateNextPage) return;
    animateNextPage=false;
    requestAnimationFrame(()=>animatePage(pendingMotion));
  });
  pageObserver.observe(root,{childList:true});
  window.addEventListener('mw:update-permission-resume',event=>{
    const detail=event&&event.detail||{};
    const status=document.getElementById('updateStatus');
    const settingsButton=document.getElementById('installUpdate');
    const homeNotice=document.getElementById('homeUpdateNotice');
    const homeCopy=homeNotice&&homeNotice.querySelector('span');
    if(detail.error){
      if(status)status.textContent='Update could not resume automatically';
      if(homeCopy)homeCopy.innerHTML='<strong>Update needs attention</strong><small>'+esc(detail.error)+'</small>';
      return;
    }
    if(detail.waitingForPermission){
      if(status)status.textContent='Allow My Week to install verified updates, then return here';
      if(homeCopy)homeCopy.innerHTML='<strong>One permission needed</strong><small>Turn on Allow from this source, then return to My Week.</small>';
      return;
    }
    if(detail.resumed){
      const result=detail.result||{};
      if(result.installerOpened){
        if(status)status.textContent='Permission granted · verified update resumed · Android installer opened';
        if(settingsButton)settingsButton.textContent='Installer opened';
        if(homeCopy)homeCopy.innerHTML='<strong>Android installer opened</strong><small>Finish the update in Android. Your My Week data stays on this device.</small>';
      }else{
        if(status)status.textContent='Permission granted · continuing verified update';
        if(settingsButton)settingsButton.textContent='Continuing update…';
        if(homeCopy)homeCopy.innerHTML='<strong>Continuing update</strong><small>My Week is resuming the verified download automatically.</small>';
      }
    }
  });

  function transitionRender(motion,fn){
    pendingMotion=motion||'context';
    if(reducedMotion()){
      animateNextPage=false;
      clearMotionDataset();
      fn();
      return;
    }
    document.documentElement.dataset.mwMotion=pendingMotion;
    if(typeof document.startViewTransition==='function'){
      animateNextPage=false;
      const transition=document.startViewTransition(()=>fn());
      Promise.resolve(transition.finished).catch(()=>{}).finally(clearMotionDataset);
      return;
    }
    animateNextPage=true;
    fn();
    requestAnimationFrame(()=>setTimeout(clearMotionDataset,320));
  }

  const samePage=(fn,motion)=>{
    const x=window.scrollX,y=window.scrollY;
    if(motion){
      transitionRender(motion,()=>{
        fn();
        requestAnimationFrame(()=>window.scrollTo({left:x,top:y,behavior:'instant'}));
      });
      return;
    }
    animateNextPage=false;
    fn();
    requestAnimationFrame(()=>window.scrollTo({left:x,top:y,behavior:'instant'}));
  };

  function updateControlNames(){
    root.querySelectorAll('.back-button,.back-on-photo').forEach(b=>b.setAttribute('aria-label','Go back'));
    root.querySelectorAll('.stock-delete').forEach(b=>b.setAttribute('aria-label','Delete '+(b.dataset.name||'cupboard item')));
    const labelled={savingToggle:'Lower-price mode',homeSavingToggle:'Lower-cost planning',normalPrice:'Lower-price mode',profileName:'First name',retailer:'Supermarket',budget:'Weekly food budget',avoidFoods:'Foods to exclude',priceMode:'Lower-price planning',stockName:'Cupboard item name',stockAmount:'Cupboard quantity',stockUnit:'Cupboard unit',addStock:'Add cupboard item',lunchToggle:'Plan lunch on this day',dinnerToggle:'Plan dinner on this day',recipeSearch:'Search recipes'};
    Object.entries(labelled).forEach(([id,label])=>{const el=document.getElementById(id);if(el) el.setAttribute('aria-label',label);});
    root.querySelectorAll('.food-choice button,.onboard-chips button,.equipment-grid button,.day-toggle-row button,.numeric-choice-row button,.stock-state button[data-action],.cat-tab').forEach(b=>{
      const value=String(b.classList.contains('active')||b.classList.contains('selected'));
      if(b.getAttribute('aria-pressed')!==value)b.setAttribute('aria-pressed',value);
    });
    root.querySelectorAll('.shop-item').forEach(b=>b.setAttribute('aria-pressed',String(b.classList.contains('done'))));
    root.querySelectorAll('.delivery-status').forEach(b=>b.setAttribute('aria-pressed',String(!b.closest('.delivery-item').classList.contains('missing'))));
  }
  new MutationObserver(updateControlNames).observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  const routeParent=screen=>{
    screen=String(screen||'');
    if(screen.indexOf('day:')===0) return 'week';
    if(screen.indexOf('recipe:')===0) return 'recipes';
    if(screen==='library') return 'recipes';
    if(screen.indexOf('cookprep:')===0) return 'recipe:'+screen.slice(9);
    if(screen.indexOf('cookstep:')===0){const p=screen.split(':');return 'cookprep:'+p[1];}
    if(screen==='cupboard'||screen==='sync') return 'settings';
    if(screen==='settings'||screen==='recipes') return 'week';
    if(screen==='delivery') return 'shopreview';
    if(screen==='shopping') return 'shopreview';
    if(screen==='shopreview') return 'check';
    if(screen==='check') return 'week';
    return '';
  };
  const screenFamily=screen=>{
    screen=String(screen||'');
    if(screen.indexOf('day:')===0) return 'week';
    if(screen.indexOf('recipe:')===0||screen.indexOf('cookprep:')===0||screen.indexOf('cookstep:')===0||screen==='library') return 'recipes';
    if(['check','shopreview','shopping','delivery'].includes(screen)) return 'shop';
    if(['settings','cupboard','sync'].includes(screen)) return 'more';
    return screen;
  };
  const motionFor=(from,to)=>{
    from=String(from||'');to=String(to||'');
    if(from===to) return 'continuity-forward';
    if(from.indexOf('cookstep:')===0&&to.indexOf('cookstep:')===0){
      const a=from.split(':'),b=to.split(':');
      if(a[1]===b[1]) return Number(b[2])>=Number(a[2])?'continuity-forward':'continuity-back';
    }
    if(routeParent(to)===from) return 'drill-forward';
    if(routeParent(from)===to) return 'drill-back';
    const flow=['week','check','shopreview','shopping','delivery','recipes'];
    const ai=flow.indexOf(from),bi=flow.indexOf(to);
    if(ai>=0&&bi>=0&&Math.abs(ai-bi)===1) return bi>ai?'flow-forward':'flow-back';
    if(screenFamily(from)===screenFamily(to)) return 'continuity-forward';
    return 'context';
  };
  function withLoading(button,action){
    if(!button||button.classList.contains('is-loading')) return;
    const previous=button.innerHTML;
    button.classList.add('is-loading');button.disabled=true;button.setAttribute('aria-busy','true');
    button.insertAdjacentHTML('afterbegin','<i class="fa-solid fa-circle-notch mw-loading-icon" aria-hidden="true"></i>');
    requestAnimationFrame(()=>setTimeout(async()=>{
      try{await action();}
      catch(error){
        const message=document.createElement('p');message.className='operation-error';message.setAttribute('role','alert');
        message.textContent='This action could not be completed. '+(error&&error.message||'Please try again.');
        (button.parentElement||root).appendChild(message);
      }finally{
        if(button.isConnected){button.innerHTML=previous;button.disabled=false;button.classList.remove('is-loading');button.removeAttribute('aria-busy');}
      }
    },120));
  }

  function priceToggle(input,selector,renderAgain){
    const card=input.closest(selector),copy=card&&card.querySelector('small'),previous=copy&&copy.textContent;
    const enabled=input.checked;
    if(card){card.classList.add('is-loading');card.setAttribute('aria-busy','true');}
    input.disabled=true;
    requestAnimationFrame(()=>setTimeout(async()=>{
      try{await MW.planner.rebuildForPriceMode(enabled);samePage(renderAgain);}
      catch(error){
        input.checked=Boolean(s().plan.priceMode);
        if(copy)copy.textContent=previous;
        const message=document.createElement('p');message.className='operation-error';message.setAttribute('role','alert');
        message.textContent='The price update could not be completed. '+(error&&error.message||'Please try again.');
        (card||root).appendChild(message);
      }finally{input.disabled=false;if(card){card.classList.remove('is-loading');card.removeAttribute('aria-busy');}}
    },120));
  }

  const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const icon=name=>'<i class="fa-solid fa-'+name+'" aria-hidden="true"></i>';
  const recipe=id=>(MW.catalog&&MW.catalog.get(id))||MW.RECIPES.find(x=>x.id===id)||MW.LUNCHES.find(x=>x.id===id);
  const timeText=r=>{
    if(!(r&&r.time)) return r&&r.online?'Online recipe':'Recipe';
    const mins=Number(r.time);
    if(mins>=120&&mins%60===0) return (mins/60)+' hrs';
    if(mins>=120) return Math.floor(mins/60)+' hr '+(mins%60)+' mins';
    return mins+' mins';
  };
  const ingredientName=x=>MW.display?MW.display.ingredient(x):String(x||'');
  const displayAmount=x=>MW.display&&MW.display.amount?MW.display.amount(x):String(x||'');
  const practicalQuantity=(recipe,ingredientIndex,factor=1,multiplier=1)=>MW.practicalQuantities&&MW.practicalQuantities.resolve?MW.practicalQuantities.resolve(recipe,ingredientIndex,factor,multiplier):null;
  const cookingAmount=(value,approximate)=>MW.practicalQuantities&&MW.practicalQuantities.label?MW.practicalQuantities.label(value,approximate):(approximate?'About '+displayAmount(value):displayAmount(value));
  const displayEquipment=x=>MW.display&&MW.display.equipment?MW.display.equipment(x):String(x||'');
  const displayInstruction=(x,recipeContext,factor,portions)=>MW.display&&MW.display.instruction?MW.display.instruction(x,{recipe:recipeContext,factor,portions}):String(x||'');
  const inventoryUnitChoices=[['g','g'],['kg','kg'],['oz','oz'],['lb','lb'],['ml','ml'],['l','L'],['fl oz','fl oz'],['tsp','tsp'],['tbsp','tbsp'],['each','Each'],['banana','Banana'],['pack','Pack'],['tin','Tin'],['can','Can'],['bottle','Bottle'],['carton','Carton'],['jar','Jar'],['tub','Tub'],['box','Box'],['bag','Bag'],['pot','Pot'],['tray','Tray'],['roll','Roll'],['packet','Packet'],['clove','Clove'],['bunch','Bunch'],['sachet','Sachet'],['pouch','Pouch'],['nest','Nest'],['fillet','Fillet'],['wrap','Wrap'],['tortilla','Tortilla'],['rasher','Rasher'],['slice','Slice'],['ball','Ball']];
  const wholeInventoryUnits=new Set(['each','banana','pack','tin','can','bottle','carton','jar','tub','box','bag','pot','tray','roll','packet','clove','bunch','sachet','pouch','nest','fillet','wrap','tortilla','rasher','slice','ball']);
  const inventoryUnitOptions=selected=>inventoryUnitChoices.map(([v,l])=>'<option value="'+esc(v)+'" '+(v===selected?'selected':'')+'>'+esc(l)+'</option>').join('');
  const alternativeSearchPrompt=name=>'Find me a suitable, easy to find UK supermarket alternative for "'+String(name||'').trim()+'". Explain the best substitute and any quantity or cooking adjustment I should make.';
  const alternativeAiModeUrl=name=>'https://www.google.com/search?udm=50&q='+encodeURIComponent(alternativeSearchPrompt(name));
  const alternativeSearchFallbackUrl=name=>'https://www.google.com/search?q='+encodeURIComponent(alternativeSearchPrompt(name));
  async function openAlternativeSearch(name){
    const browser=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.Browser;
    const aiUrl=alternativeAiModeUrl(name);
    try{
      if(browser&&typeof browser.open==='function'){await browser.open({url:aiUrl});return;}
      const opened=window.open(aiUrl,'_blank','noopener,noreferrer');
      if(opened)return;
    }catch{}
    const fallback=alternativeSearchFallbackUrl(name);
    if(browser&&typeof browser.open==='function'){await browser.open({url:fallback});return;}
    window.open(fallback,'_blank','noopener,noreferrer');
  }
  function closeIngredientActions(){const el=document.getElementById('ingredientActionSheet');if(el)el.remove();}
  function confirmAction(options={}){
    return new Promise(resolve=>{
      const previous=document.getElementById('confirmActionSheet');if(previous)previous.remove();
      const backdrop=document.createElement('div');
      backdrop.id='confirmActionSheet';backdrop.className='ingredient-action-backdrop';
      const title=String(options.title||'Are you sure?'),message=String(options.message||''),confirmLabel=String(options.confirmLabel||'Continue'),cancelLabel=String(options.cancelLabel||'Cancel'),eyebrow=String(options.eyebrow||'PLEASE CHECK');
      backdrop.innerHTML='<section class="ingredient-action-sheet" role="alertdialog" aria-modal="true" aria-labelledby="confirmActionTitle" aria-describedby="confirmActionMessage"><div class="ingredient-action-handle"></div><div class="ingredient-action-head"><div><span class="eyebrow">'+esc(eyebrow)+'</span><h2 id="confirmActionTitle">'+esc(title)+'</h2></div><button type="button" class="ingredient-action-close" aria-label="Close">'+icon('xmark')+'</button></div><p id="confirmActionMessage" class="operation-error">'+esc(message)+'</p><div class="shop-swap-actions"><button type="button" class="btn secondary" id="confirmActionCancel">'+esc(cancelLabel)+'</button><button type="button" class="btn '+(options.danger?'danger':'primary')+'" id="confirmActionConfirm">'+esc(confirmLabel)+'</button></div></section>';
      let settled=false;
      const finish=value=>{if(settled)return;settled=true;document.removeEventListener('keydown',onKey);backdrop.remove();resolve(Boolean(value));};
      const onKey=e=>{if(e.key==='Escape')finish(false);};
      backdrop.addEventListener('click',e=>{if(e.target===backdrop)finish(false);});
      backdrop.querySelector('.ingredient-action-close').onclick=()=>finish(false);
      backdrop.querySelector('#confirmActionCancel').onclick=()=>finish(false);
      backdrop.querySelector('#confirmActionConfirm').onclick=()=>finish(true);
      document.addEventListener('keydown',onKey);
      document.body.appendChild(backdrop);
      backdrop.querySelector('#confirmActionCancel').focus();
    });
  }
  function showShopSubstitution(options){
    closeIngredientActions();
    const key=String(options&&options.shopKey||''),originalName=String(options&&options.name||'').trim(),plannedAmount=String(options&&options.plannedAmount||'').trim();
    if(!key||!originalName)return;
    const existing=MW.shopping&&MW.shopping.getSubstitution?MW.shopping.getSubstitution(key):null;
    const planned=MW.inventory&&MW.inventory.parseAmount?MW.inventory.parseAmount(plannedAmount):null;
    const current=existing&&MW.inventory.parseAmount(existing.replacementAmount);
    const defaultUnit=current&&current.unit||planned&&planned.unit||'g',defaultValue=current&&current.value!=null?current.value:planned&&planned.value!=null?planned.value:'';
    const sheet=document.createElement('div');sheet.id='ingredientActionSheet';sheet.className='ingredient-action-backdrop';
    sheet.innerHTML='<section class="ingredient-action-sheet shop-substitution-sheet" role="dialog" aria-modal="true" aria-labelledby="shopSwapTitle"><div class="ingredient-action-handle"></div><div class="ingredient-action-head"><div><span class="eyebrow">IN STORE SWAP</span><h2 id="shopSwapTitle">What did you buy instead?</h2></div><button type="button" class="ingredient-action-close" aria-label="Close">'+icon('xmark')+'</button></div><div class="shop-swap-original"><span>Planned</span><strong>'+esc(ingredientName(originalName))+'</strong><small>'+esc(displayAmount(plannedAmount))+'</small></div><label class="shop-swap-label"><span>Bought instead</span><div class="food-autocomplete-host"><input id="shopSwapName" value="'+esc(existing?ingredientName(existing.replacementName):'')+'" placeholder="Start typing an ingredient"><span class="food-link-status" id="shopSwapMatch"></span></div></label><div class="shop-swap-quantity"><label><span>Amount</span><input id="shopSwapAmount" type="number" min="0" inputmode="decimal" step="'+(wholeInventoryUnits.has(defaultUnit)?'1':'0.1')+'" value="'+esc(defaultValue)+'"></label><label><span>Unit</span><span class="select-control stock-unit-control"><select id="shopSwapUnit">'+inventoryUnitOptions(defaultUnit)+'</select>'+icon('chevron-down')+'</span></label></div><p class="shop-swap-help">This records what you actually bought. The recipe keeps its original wording and My Week will show the swap when you cook it. It will not guess a conversion if the quantity types cannot be compared safely.</p><div class="shop-swap-actions">'+(existing?'<button type="button" class="btn secondary" id="clearShopSwap">Use planned item</button>':'<button type="button" class="btn secondary" id="cancelShopSwap">Cancel</button>')+'<button type="button" class="btn primary" id="saveShopSwap">Save swap</button></div></section>';
    document.body.appendChild(sheet);
    const close=()=>closeIngredientActions(),nameInput=sheet.querySelector('#shopSwapName'),match=sheet.querySelector('#shopSwapMatch'),amountInput=sheet.querySelector('#shopSwapAmount'),unitSelect=sheet.querySelector('#shopSwapUnit');
    sheet.addEventListener('click',e=>{if(e.target===sheet)close();});
    sheet.querySelector('.ingredient-action-close').onclick=close;
    const cancel=sheet.querySelector('#cancelShopSwap');if(cancel)cancel.onclick=close;
    const updateMatch=()=>{const raw=nameInput.value.trim();if(!raw){match.innerHTML='';return;}const exact=nameInput.dataset.mwCanonical?{canonical:nameInput.dataset.mwCanonical}:MW.foodIdentity&&MW.foodIdentity.resolveExact(raw);match.innerHTML=exact?'<span class="linked">'+icon('link')+' Recognised: '+esc(MW.foodIdentity.canonicalLabel(exact.canonical))+'</span>':'<span class="custom">'+icon('circle-question')+' Custom ingredient</span>';};
    if(MW.foodIdentity)MW.foodIdentity.attach(nameInput,{limit:5,onSelect:updateMatch});
    nameInput.addEventListener('input',updateMatch);updateMatch();
    unitSelect.onchange=()=>{amountInput.step=wholeInventoryUnits.has(unitSelect.value)?'1':'0.1';};
    const clear=sheet.querySelector('#clearShopSwap');if(clear)clear.onclick=()=>{MW.shopping.clearSubstitution(key);const st=s();if(st.ui&&st.ui.shopChecks)delete st.ui.shopChecks[key];MW.state.save();close();if(typeof options.onCleared==='function')options.onCleared();else samePage(shopReview);};
    sheet.querySelector('#saveShopSwap').onclick=()=>{
      const raw=nameInput.value.trim(),value=Number(amountInput.value),unit=unitSelect.value;
      if(!raw){nameInput.focus();return;}
      if(!Number.isFinite(value)||value<=0){amountInput.focus();return;}
      if(wholeInventoryUnits.has(unit)&&!Number.isInteger(value)){amountInput.setCustomValidity('Use a whole number for '+unit+'.');amountInput.reportValidity();return;}
      amountInput.setCustomValidity('');
      const exact=nameInput.dataset.mwCanonical?{canonical:nameInput.dataset.mwCanonical}:MW.foodIdentity&&MW.foodIdentity.resolveExact(raw);
      const replacementName=exact&&exact.canonical||raw,replacementAmount=MW.inventory.formatAmount({value,unit});
      const parsedReplacement=MW.inventory.parseAmount(replacementAmount),comparison=planned&&parsedReplacement?MW.inventory.valueInUnit(parsedReplacement,planned.unit,replacementName):null,comparable=!planned||Number.isFinite(comparison);
      if(!comparable&&!confirm('This replacement uses a different quantity type, so My Week cannot safely compare it with the planned amount. It will still record what you bought and show the swap when cooking. Save it anyway?'))return;
      try{
        const saved=MW.shopping.setSubstitution(key,{originalName,replacementName,plannedAmount,replacementAmount,comparable});
        const st=s();st.ui.shopChecks=st.ui.shopChecks||{};st.ui.shopChecks[key]=true;MW.state.save();
        close();if(typeof options.onSaved==='function')options.onSaved(saved);else samePage(shopReview);
      }catch(error){match.innerHTML='<span class="custom">'+icon('circle-exclamation')+' '+esc(error&&error.message||'This swap could not be saved.')+'</span>';}
    };
    nameInput.focus();
  }
  function showIngredientActions(name,options={}){
    closeIngredientActions();
    const shopKey=String(options.shopKey||''),existing=shopKey&&MW.shopping&&MW.shopping.getSubstitution?MW.shopping.getSubstitution(shopKey):null;
    const swapAction=shopKey?'<button type="button" class="ingredient-online-alternative ingredient-shop-substitute">'+icon('right-left')+'<span><strong>'+(existing?'Edit what I bought instead':'I bought something different')+'</strong><small>'+(existing?esc(ingredientName(existing.replacementName))+' is currently recorded instead.':'Record an in store substitute without silently changing the recipe.')+'</small></span><i class="fa-solid fa-chevron-right"></i></button>':'';
    const sheet=document.createElement('div');sheet.id='ingredientActionSheet';sheet.className='ingredient-action-backdrop';sheet.innerHTML='<section class="ingredient-action-sheet" role="dialog" aria-modal="true" aria-labelledby="ingredientActionTitle"><div class="ingredient-action-handle"></div><div class="ingredient-action-head"><div><span class="eyebrow">INGREDIENT</span><h2 id="ingredientActionTitle">'+esc(ingredientName(name))+'</h2></div><button type="button" class="ingredient-action-close" aria-label="Close">'+icon('xmark')+'</button></div><div class="ingredient-action-options">'+swapAction+'<button type="button" class="ingredient-online-alternative ingredient-google-alternative">'+icon('magnifying-glass')+'<span><strong>Find an easy alternative with Google AI</strong><small>Opens Google AI Mode for a practical UK supermarket substitute. Nothing changes automatically.</small></span><i class="fa-solid fa-arrow-up-right-from-square"></i></button></div><button type="button" class="ingredient-action-cancel">Cancel</button></section>';
    document.body.appendChild(sheet);
    const close=()=>closeIngredientActions();
    sheet.addEventListener('click',e=>{if(e.target===sheet)close();});
    sheet.querySelector('.ingredient-action-close').onclick=close;sheet.querySelector('.ingredient-action-cancel').onclick=close;
    const swap=sheet.querySelector('.ingredient-shop-substitute');if(swap)swap.onclick=()=>showShopSubstitution({shopKey,name,plannedAmount:options.plannedAmount});
    const google=sheet.querySelector('.ingredient-google-alternative');google.onclick=async()=>{google.disabled=true;try{await openAlternativeSearch(name);}finally{google.disabled=false;close();}};
    (swap||sheet.querySelector('.ingredient-online-alternative')).focus();
  }
  function bindIngredientActions(scope){(scope||document).querySelectorAll('.ingredient-more').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();showIngredientActions(b.dataset.ingredient||'',{shopKey:b.dataset.shopKey||'',plannedAmount:b.dataset.plannedAmount||''});});}

  const recipeCost=(r,people)=>{
    if(!r) return 0;
    if(MW.pricing) return MW.pricing.recipeCost(r,people);
    if(r.scaleSafe===false) return Number(r.cost||0);
    return Number(r.cost||0)*((Number(people)||2)/(r.servings||2));
  };
  const day=id=>MW.DAYS.find(x=>x.key===id)||{key:id,label:id,short:id};
  const money=n=>'£'+Number(n||0).toFixed(2);
  const recipeCostLabel=(r,people)=>'~'+money(recipeCost(r,people))+' ingredients'+(r.scaleSafe===false?'':' for '+people);
  const helloFreshMirror=(src,width)=>{
    const value=String(src||'');
    const m=value.match(/^https:\/\/d3hvwccx09j84u\.cloudfront\.net\/0,0\/(.+)$/i);
    if(!m) return '';
    return 'https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_'+(width||960)+'/hellofresh_s3/'+m[1];
  };
  const photo=(src,cls,alt,fallback)=>{
    if(!src) return '';
    const raw=[].concat(fallback||[]).map(String).filter(Boolean);
    const fbs=[...new Set(raw.filter(x=>x!==src))];
    const attrs=fbs.map((x,i)=>'data-fallback'+i+'="'+esc(x)+'"').join(' ');
    const onerr="var i=Number(this.dataset.fallbackIndex||0),n=this.dataset['fallback'+i];if(n){this.dataset.fallbackIndex=String(i+1);this.src=n;return;}this.style.display='none';if(this.parentElement.classList.contains('cook-photo')){this.parentElement.style.display='none';var p=this.closest('.cook-visual-panel');if(p)p.style.display='none';var s=this.closest('.cook-scroll');if(s){s.classList.remove('has-visual');s.classList.add('no-visual');}}else this.parentElement.classList.add('photo-fallback')";
    const eager=String(cls||'').split(/\s+/).includes('cook-photo');
    return '<div class="'+cls+'"><img src="'+esc(src||'')+'" '+attrs+' alt="'+esc(alt||'')+'" loading="'+(eager?'eager':'lazy')+'" '+(eager?'fetchpriority="high" ':'')+'decoding="async" referrerpolicy="no-referrer" onerror="'+esc(onerr)+'"></div>';
  };
  const fallbackRecipeImage=r=>{
    const sourcedOnly=Boolean(r&&(r.sourcedCatalogue||r.imageQa&&r.imageQa.status!=='verified'));
    if(sourcedOnly) return '';
    const exact=r&&MW.referenceMedia&&MW.referenceMedia[r.id];
    return (exact&&exact.final)||(r&&r.image)||'';
  };
  const sourcedLocalFinal=r=>{
    const mapped=r&&MW.sourcedImageMap&&MW.sourcedImageMap.final&&MW.sourcedImageMap.final[r.id]||'';
    // A stale map may contain a method photo. Do not promote it to a final dish image.
    return r&&[r.sourceImageUrl,r.sourceImageOriginalUrl].filter(Boolean).includes(mapped)?mapped:'';
  };
  const cachedFinal=r=>{
    const item=r&&MW.sourcedFinalCache&&MW.sourcedFinalCache[r.id];
    if(!item||item.role!=='declared-final'||item.source!==r.sourceImageUrl)return '';
    return item.src==='assets/images/sourced-final/'+r.id+'.jpg'?item.src:'';
  };
  const sourceImageCandidates=r=>{
    if(!r||r.imageQa&&r.imageQa.status!=='verified') return [];
    if(!r.sourcedCatalogue) return [fallbackRecipeImage(r)].filter(Boolean);
    const remote=String(r.sourceImageUrl||'');
    const original=String(r.sourceImageOriginalUrl||'');
    return [...new Set([cachedFinal(r),sourcedLocalFinal(r),helloFreshMirror(remote,1100),remote,helloFreshMirror(original,1100),original].filter(Boolean))];
  };
  const displayRecipeImage=r=>sourceImageCandidates(r)[0]||fallbackRecipeImage(r);
  const recipePhoto=(r,cls,alt)=>{
    const c=sourceImageCandidates(r);
    const generic=r&&r.sourcedCatalogue?'':fallbackRecipeImage(r);
    const fallbacks=c.slice(1);
    if(generic) fallbacks.push(generic);
    return photo(c[0]||generic,cls,alt,fallbacks);
  };
  const countLabel=(n,singular,plural)=>n+' '+(n===1?singular:plural);
  const regularQty=x=>{
    const count=Math.max(1,Number(x.count)||1);
    let unit=String(x.unit||'item').trim();
    if(count!==1){
      if(unit==='banana') unit='bananas';
      else if(!/s$/i.test(unit)) unit+='s';
    }
    return count+' '+unit;
  };
  const foodProfile=()=>s().foodProfile||{diet:'omnivore',goals:[],allergens:[],lunchStyle:'any'};
  const foodChoice=(id,items,selected)=>'<div class="food-choice" id="'+id+'">'+items.map(x=>'<button type="button" data-v="'+x.id+'" class="'+(String(selected)===String(x.id)?'active':'')+'">'+esc(x.label)+'</button>').join('')+'</div>';
  const multiFoodChoice=(id,items,selected)=>{const set=new Set(selected||[]);return '<div class="food-choice multi" id="'+id+'">'+items.map(x=>'<button type="button" data-v="'+x.id+'" class="'+(set.has(x.id)?'active':'')+'">'+esc(x.label)+'</button>').join('')+'</div>';};
  function stepIngredients(r,step,factor,stepIndex){
    if(MW.stepIngredients&&typeof MW.stepIngredients.forStep==='function')return MW.stepIngredients.forStep(r,step,factor,stepIndex);
    return [];
  }
  function tipsForRecipe(r){
    const text=((r.tags||[]).join(' ')+' '+(r.ingredients||[]).map(x=>x[1]).join(' ')).toLowerCase();
    const tips=[];
    if(text.includes('rice')) tips.push('Rinse the rice until the water is much less cloudy, then leave it covered for a few minutes after cooking.');
    if(text.includes('pasta')||text.includes('orzo')) tips.push('Keep a mug of cooking water before draining so you can loosen the sauce without making it watery.');
    if(text.includes('tofu')) tips.push('Pat the tofu dry before cooking and give it time against the hot pan before turning it.');
    if(text.includes('stir')||text.includes('asian')||text.includes('noodle')) tips.push('Have everything sliced and measured before the pan gets hot because the cooking moves quickly.');
    if(text.includes('chicken')) tips.push('Keep the pieces similar in size so they cook at the same rate, then check the thickest piece is cooked through.');
    if(text.includes('couscous')) tips.push('Cover the couscous while it absorbs the liquid, then fluff it with a fork rather than stirring.');
    if(text.includes('wrap')||text.includes('taco')||text.includes('flatbread')) tips.push('Warm the bread briefly just before serving so it stays flexible rather than cracking.');
    if(text.includes('salmon')||text.includes('cod')||text.includes('fish')) tips.push('Stop cooking once the centre is opaque and flakes easily so the fish stays moist.');
    if(text.includes('slow')) tips.push('Keep the lid on during slow cooking because lifting it repeatedly drops the temperature and lengthens the cook.');
    return [...new Set(tips)].slice(0,2);
  }
  function cookingEquipment(r){
    if(r&&Array.isArray(r.sourceEquipment)&&r.sourceEquipment.length){
      return [...new Set(r.sourceEquipment.map(x=>displayEquipment(String(x||'').trim())).filter(Boolean))];
    }
    const text=((r&&r.title)||'')+' '+((r&&r.tags)||[]).join(' ')+' '+((r&&r.steps)||[]).join(' ');
    const t=text.toLowerCase();
    const items=[];
    const add=x=>{if(x&&!items.includes(x)) items.push(x);};
    if(/oven|roast|bake|traybake|stuffed/.test(t)) add('Oven');
    if(/roast|bake|traybake|stuffed/.test(t)) add('Baking tray');
    if(/fry|pan|sear|brown|stir fry|stir-fry/.test(t)) add('Large frying pan');
    if(/rice|pasta|orzo|noodle|couscous|simmer|soup|stew|boil/.test(t)) add('Saucepan');
    if(/slow cooker|slow-cooker/.test(t)) add('Slow cooker');
    if(/air fry|air-fryer/.test(t)) add('Air fryer');
    if(/barbecue|bbq/.test(t)) add('Barbecue');
    if(/skewer/.test(t)) add('Skewers');
    if(/drain|pasta|orzo|noodle/.test(t)) add('Colander');
    if(/grate|zest/.test(t)) add('Grater or zester');
    if(/chop|slice|dice|cut|prepare/.test(t)){add('Chopping board');add('Sharp knife');}
    add('Wooden spoon or spatula');
    return items;
  }
  function substitutedIngredient(name,plannedAmount){
    const sub=MW.shopping&&MW.shopping.substitutionForIngredient?MW.shopping.substitutionForIngredient(name):null;
    if(!sub)return {name,amount:plannedAmount,originalName:name,originalAmount:plannedAmount,substitution:null,comparable:true};
    const planned=MW.inventory&&MW.inventory.parseAmount?MW.inventory.parseAmount(plannedAmount):null,replacement=MW.inventory&&MW.inventory.parseAmount?MW.inventory.parseAmount(sub.replacementAmount):null;
    const converted=planned&&replacement&&sub.comparable!==false?MW.inventory.valueInUnit(planned,replacement.unit,sub.replacementName):null;
    return {
      name:sub.replacementName,
      amount:Number.isFinite(converted)?MW.inventory.formatAmount({value:converted,unit:replacement.unit}):sub.replacementAmount,
      originalName:name,
      originalAmount:plannedAmount,
      substitution:sub,
      comparable:Number.isFinite(converted)
    };
  }
  function prepIngredients(r,factor){
    return (r.ingredients||[]).map(([q,n],ingredientIndex)=>{
      const practical=practicalQuantity(r,ingredientIndex,factor),planned=practical?practical.amount:(MW.preparation&&MW.preparation.scaleAmount?MW.preparation.scaleAmount(r,q,n,factor):(r.scaleSafe===false?q:MW.shopping.scaleAmount(q,factor)));
      const shown=substitutedIngredient(n,planned);
      shown.practicalApproximate=!shown.substitution&&Boolean(practical&&practical.approximate);
      return shown;
    });
  }
  function stepSubstitutionNotes(r,step,stepIndex){
    if(!(MW.shopping&&MW.shopping.substitutionForIngredient))return [];
    const notes=[],seen=new Set();
    (r.ingredients||[]).forEach((row,ingredientIndex)=>{
      const original=row[1],sub=MW.shopping.substitutionForIngredient(original);
      if(!sub)return;
      const ev=MW.stepIngredients&&MW.stepIngredients.evidence?MW.stepIngredients.evidence(r,step,ingredientIndex,stepIndex):null;
      if(!(ev&&ev.matched))return;
      const key=MW.inventory.stockKey(original)+'>'+MW.inventory.stockKey(sub.replacementName);
      if(seen.has(key))return;seen.add(key);
      notes.push({originalName:original,replacementName:sub.replacementName});
    });
    return notes;
  }

  function tipForStep(r,step){
    const text=String(step||'').toLowerCase();
    const context=((r&&r.title)||'')+' '+((r&&r.subtitle)||'');
    if(/dice|slice|chop|cut|prepare/.test(text)) return 'Keep pieces roughly the same size so they cook at the same rate.';
    if(/rinse.*rice|cook.*rice|basmati|jasmine/.test(text)) return 'Rinse the rice until the water is much less cloudy, then keep the lid on while it cooks.';
    if(/pasta|orzo|noodle/.test(text)&&/cook|boil/.test(text)) return 'Taste a piece a minute before the packet time ends. It should be tender with a little bite.';
    if(/drain/.test(text)&&/chickpea|bean|lentil/.test(text+' '+context.toLowerCase())) return 'Let the pulses drain well so excess liquid does not thin the sauce.';
    if(/brown|sear/.test(text)) return 'Let the pan get properly hot and avoid moving the food constantly so it can build colour.';
    if(/stir[- ]?fry|wok/.test(text)) return 'Use a fairly high heat and keep the ingredients moving so they colour without turning soft.';
    if(/simmer|reduce|thicken/.test(text)) return 'Aim for small steady bubbles rather than a hard boil. Add a splash of water only if the pan starts to look dry.';
    if(/roast|bake/.test(text)&&!/heat|preheat/.test(text)) return 'Spread everything into a single layer with a little space around it so the edges roast rather than steam.';
    if(/couscous/.test(text)&&/prepare|cook|fluff/.test(text)) return 'Cover it while it absorbs the liquid, then separate the grains gently with a fork.';
    if(/chicken/.test(text)&&/cook|fry|roast|sear|brown/.test(text)) return 'Check the thickest piece is piping hot and cooked through before moving on.';
    if(/salmon|cod|fish/.test(text)&&/cook|fry|roast|simmer|air/.test(text)) return 'Stop once the centre is opaque and flakes easily so the fish stays moist.';
    if(/halloumi/.test(text)&&/cook|fry|grill|brown/.test(text)) return 'Turn it once the underside is deeply golden. Overcooking makes halloumi firmer and saltier.';
    if(/prawn|shrimp/.test(text)&&/cook|fry|stir/.test(text)) return 'Take the prawns off the heat as soon as they are pink and opaque to keep them tender.';
    if(/slow cooker|slow-cooker|cook on low/.test(text)) return 'Keep the lid on while it cooks. Opening it repeatedly can add a surprising amount of time.';
    return '';
  }

  function globalNav(active){
    return '<nav class="bottom-nav" aria-label="Main navigation">'+
      '<button class="navbtn '+(active==='plan'?'active':'')+'" data-nav="week"><span class="navicon">'+icon('house')+'</span><span>Home</span></button>'+
      '<button class="navbtn '+(active==='cook'?'active':'')+'" data-nav="recipes"><span class="navicon">'+icon('utensils')+'</span><span>Meals</span></button>'+
      '<button class="navbtn '+(active==='shop'?'active':'')+'" data-nav="shopreview"><span class="navicon">'+icon('cart-shopping')+'</span><span>Shopping</span></button>'+
      '<button class="navbtn '+(active==='more'?'active':'')+'" data-nav="settings"><span class="navicon">'+icon('ellipsis')+'</span><span>More</span></button>'+
    '</nav>';
  }

  function weekRange(){
    const now=new Date();
    const d=(now.getDay()+6)%7;
    const monday=new Date(now);monday.setDate(now.getDate()-d);
    const sunday=new Date(monday);sunday.setDate(monday.getDate()+6);
    const fmt=x=>x.toLocaleDateString('en-GB',{day:'numeric',month:'short'});
    return fmt(monday)+' – '+fmt(sunday);
  }

  function currentDayMeta(){
    const now=new Date();
    const index=(now.getDay()+6)%7;
    const d=MW.DAYS[index]||MW.DAYS[0];
    return {index,key:d.key,label:d.label,short:d.short};
  }

  function remainingDinnerDays(){
    return MW.planner&&MW.planner.remainingDinnerDays?MW.planner.remainingDinnerDays(new Date(),s().plan.dinnerDays||[]):(s().plan.dinnerDays||[]);
  }

  function newWeekPrompt(){
    const st=s();
    const currentKey=MW.planner&&MW.planner.currentWeekKey?MW.planner.currentWeekKey():'';
    root.innerHTML=shell(
      '<section class="planner-date-prompt">'+
        '<span class="prompt-calendar">'+icon('calendar-day')+'</span>'+
        '<span class="eyebrow">NEW WEEK</span>'+
        '<h1>Ready for a new week?</h1>'+
        "<p>Your previous week's meals are still here. My Week won't replace them until you choose to generate a new plan.</p>"+
        '<div class="prompt-summary"><strong>Nothing has been removed</strong><span>You can keep working through last week, view it again, or start this week when you are ready.</span></div>'+
        '<div class="prompt-actions">'+
          '<button class="btn primary" id="generateNewWeek">Generate this week</button>'+
          '<button class="btn secondary" id="keepPreviousWeek">Keep last week for now</button>'+
          '<button class="text-action" id="viewPreviousWeek">View last week</button>'+
        '</div>'+
      '</section>',
      'plan'
    );
    document.getElementById('generateNewWeek').onclick=e=>withLoading(e.currentTarget,()=>{
      MW.planner.regenerateAll({planMode:'new-week-full',rebuildShop:false});
      previewRolloverFor='';
      st.ui.dismissedRolloverFor='';
      MW.state.log('week_rollover_confirmed',{weekKey:currentKey});
      MW.state.save();
      go('week');
    });
    document.getElementById('keepPreviousWeek').onclick=()=>{
      previewRolloverFor='';
      st.ui.dismissedRolloverFor=currentKey;
      MW.state.log('week_rollover_kept_previous',{weekKey:currentKey});
      MW.state.save();
      go('week');
    };
    document.getElementById('viewPreviousWeek').onclick=()=>{
      previewRolloverFor=currentKey;
      MW.state.log('week_rollover_preview_previous',{weekKey:currentKey});
      go('week');
    };
    bindNav();
  }

  function planRemainingPrompt(rollover){
    const st=s();
    const today=currentDayMeta();
    const normal=(st.plan.dinnerDays||[]).slice();
    const remaining=remainingDinnerDays();
    const currentKey=MW.planner&&MW.planner.currentWeekKey?MW.planner.currentWeekKey():'';
    const normalCount=normal.length;
    const remainingCount=remaining.length;
    const daysText=remaining.map(x=>day(x).short).join(', ');
    const intro=rollover
      ?'A new week has started since this plan was made.'
      :'You are part way through the week, so My Week can avoid planning dinners for days that have already passed.';
    root.innerHTML=shell(
      '<section class="planner-date-prompt">'+
        '<span class="prompt-calendar">'+icon('calendar-day')+'</span>'+
        '<span class="eyebrow">SMART WEEK PLANNING</span>'+
        "<h1>It's "+esc(today.label)+"</h1>"+
        '<p>'+esc(intro)+'</p>'+
        (remainingCount?'<div class="prompt-summary"><strong>'+remainingCount+' dinner'+(remainingCount===1?'':'s')+'</strong><span>'+esc(daysText)+' · based on your usual '+normalCount+' dinner'+(normalCount===1?'':'s')+'</span></div>':'<div class="prompt-summary"><strong>No planned dinner days left</strong><span>Your usual dinner days for this week have already passed.</span></div>')+
        '<div class="prompt-actions">'+
          (remainingCount?'<button class="btn primary" id="planRemaining">Plan '+remainingCount+' from today</button>':'')+
          '<button class="btn secondary" id="planFullWeek">Regenerate all '+normalCount+'</button>'+
          '<button class="text-action" id="cancelPlanPrompt">'+(rollover?'Keep current plan for now':'Cancel')+'</button>'+
        '</div>'+
      '</section>',
      'plan'
    );
    const remainingButton=document.getElementById('planRemaining');
    if(remainingButton) remainingButton.onclick=e=>withLoading(e.currentTarget,()=>{
      MW.planner.regenerateAll({dinnerDaysOverride:remaining,planMode:'remaining-week',rebuildShop:!rollover});
      st.ui.dismissedRolloverFor='';MW.state.save();go('week');
    });
    document.getElementById('planFullWeek').onclick=e=>withLoading(e.currentTarget,()=>{
      MW.planner.regenerateAll({planMode:rollover?'new-week-full':'manual-full',rebuildShop:!rollover});
      st.ui.dismissedRolloverFor='';MW.state.save();go('week');
    });
    document.getElementById('cancelPlanPrompt').onclick=()=>{
      if(rollover) st.ui.dismissedRolloverFor=currentKey;
      MW.state.save();go('week');
    };
    bindNav();
  }

  function shell(body,active){
    const st=s();
    const name=(st.profile&&st.profile.name||'').trim();
    const title=name?'Hi '+name:'My Week';
    const sub=st.onboarded?weekRange():'Simple meals. Happier weeks.';
    const nav=st.onboarded?globalNav(active):'';
    const header='<header class="appbar"><button class="account-link '+(st.onboarded?'':'static')+'" id="accountButton"><span class="account-name">'+esc(title)+'</span><span class="account-sub">'+esc(sub)+'</span></button>'+
      (st.onboarded?'<button class="settings-button" id="settingsButton" aria-label="Settings">'+icon('gear')+'</button>':'')+
    '</header>';
    const allergyNotice=(st.foodProfile&&st.foodProfile.allergens||[]).length?'<section class="allergen-note" role="status"><span>Allergy matching is unavailable for recipes without verified allergen records. These recipes are excluded from suggestions. Do not rely on My Week alone for allergy safety; always check ingredient labels and cross-contamination advice.</span></section>':'';
    return '<main class="shell">'+header+allergyNotice+body+nav+'</main>';
  }

  function bindNav(){
    root.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>{
      const target=b.dataset.nav;
      if(target==='shopreview'&&(!s().week||!s().week.shop)) return go('check',{motion:'context'});
      go(target,{motion:'context'});
    });
    const settings=document.getElementById('settingsButton');
    if(settings) settings.onclick=()=>go('settings',{motion:'drill-forward'});
    const account=document.getElementById('accountButton');
    if(account&&s().onboarded) account.onclick=()=>go('settings',{motion:'drill-forward'});
  }

  function go(screen,options){
    const st=s(),from=st.ui.screen||'week',changed=from!==screen;options=options||{};
    if(changed){if(screen==='week')navStack.length=0;else if(options.back){if(navStack[navStack.length-1]===screen)navStack.pop();}else if(navStack[navStack.length-1]===screen)navStack.pop();else navStack.push(from);}
    st.ui.screen=screen;MW.state.save();
    if(!changed){animateNextPage=false;render();return;}
    const motion=options.motion||motionFor(from,screen);transitionRender(motion,()=>{render();window.scrollTo({top:0,behavior:'instant'});});
  }
  function leaveCookingFlow(target){
    const idx=navStack.lastIndexOf(target);
    if(idx>=0)navStack.length=idx;
    else while(navStack.length&&/^(?:recipe:|cookprep:|cookstep:)/.test(String(navStack[navStack.length-1]||'')))navStack.pop();
    document.body.classList.remove('cooking-active');
    go(target,{motion:'drill-back',back:true});
  }

  window.MyWeekAndroidBack=()=>{
    const sheet=document.getElementById('ingredientActionSheet');if(sheet){sheet.remove();return true;}
    const st=s(),current=st.ui.screen||'week';if(current==='week')return false;
    let target=navStack.length?navStack.pop():'';if(!target){if(current==='library'&&st.ui.libraryTargetDay)target='day:'+st.ui.libraryTargetDay;else target=routeParent(current);}
    if(!target||target===current)return false;if(current==='library'&&target!=='library'){st.ui.libraryTargetDay='';MW.state.save();}
    go(target,{motion:'drill-back',back:true});return true;
  };

  function storageRecovery(){
    document.body.classList.remove('cooking-active');
    const status=MW.state.recoveryStatus();
    const messages={
      invalid:'Your saved data could not be read. It has not been replaced with a new week.',
      unavailable:'My Week cannot access saved data on this device. Changes are paused to protect your existing data.',
      conflict:'Saved data changed in another app window. Reload it before making more changes.',
      'write-failed':'Your latest changes could not be saved. The previous saved record has been kept.'
    };
    root.innerHTML='<main class="storage-recovery"><section class="empty-state" aria-labelledby="recoveryTitle">'+
      '<h1 id="recoveryTitle" tabindex="-1">Saved data needs attention</h1>'+
      '<p>'+esc(messages[status.reason]||'Please reload your saved data before continuing.')+'</p>'+
      '<p>No week will be reset unless you choose to reset it.</p>'+
      '<div class="storage-recovery-actions"><button class="btn primary" id="retrySavedData">Try loading again</button>'+
      (status.hasBackup?'<button class="btn secondary" id="restoreSavedData">Restore previous saved copy</button>':'')+
      '<button class="btn secondary" id="exportSavedData">Export recovery data</button>'+
      '<button class="btn secondary" id="resetSavedData">Reset all My Week data</button></div>'+
      '<p id="recoveryMessage" role="status" aria-live="polite"></p></section></main>';
    const attempt=action=>{
      try{action();render();}
      catch(e){const message=document.getElementById('recoveryMessage');if(message)message.textContent=e.message||'Saved data is still unavailable.';}
    };
    document.getElementById('retrySavedData').onclick=()=>attempt(()=>MW.state.retryLoad());
    const restore=document.getElementById('restoreSavedData');
    if(restore)restore.onclick=()=>{
      if(confirm('Restore the previous saved copy? More recent changes may be missing. The current record will be retained for recovery.'))attempt(()=>MW.state.restoreBackup());
    };
    document.getElementById('exportSavedData').onclick=()=>{
      try{
        const blob=new Blob([JSON.stringify(MW.state.recoveryExport(),null,2)],{type:'application/json'});
        const url=URL.createObjectURL(blob),link=document.createElement('a');
        link.href=url;link.download='myweek-recovery-data.json';document.body.appendChild(link);link.click();link.remove();
        setTimeout(()=>URL.revokeObjectURL(url),1000);
        document.getElementById('recoveryMessage').textContent='A recovery export was requested. Check that the file was saved before resetting. It may contain your personal meal and household data.';
      }catch(e){document.getElementById('recoveryMessage').textContent='The recovery export could not be started. Do not reset until you have saved any data you need.';}
    };
    document.getElementById('resetSavedData').onclick=()=>{
      if(confirm('Permanently reset all My Week data on this device, including saved weeks, cupboard stock and recovery copies? This cannot be undone.'))attempt(()=>{MW.state.reset();if(MW.onboarding)MW.onboarding.reset();});
    };
    document.getElementById('recoveryTitle').focus();
  }

  function render(){
    if(MW.state.recoveryStatus&&MW.state.recoveryStatus().blocked)return storageRecovery();
    const st=s();
    if(!st.onboarded){
      document.body.classList.remove('cooking-active');
      return welcome();
    }
    const screen=st.ui.screen||'week';
    document.body.classList.toggle('cooking-active',screen.indexOf('cookstep:')===0);
    if(screen==='week') return week();
    if(screen==='check') return weeklyCheck();
    if(screen==='shopreview') return shopReview();
    if(screen==='shopping') return guidedShopping();
    if(screen==='delivery') return deliveryCheck();
    if(screen==='recipes') return recipes();
    if(screen==='library') return library();
    if(screen.indexOf('cookprep:')===0) return cookPrep(screen.slice(9));
    if(screen.indexOf('cookstep:')===0){const parts=screen.split(':');return cookStep(parts[1],Number(parts[2])||0);}
    if(screen.indexOf('recipe:')===0) return recipeView(screen.slice(7));
    if(screen.indexOf('day:')===0) return dayEditor(screen.slice(4));
    if(screen==='settings') return settings();
    if(screen==='cupboard') return cupboard();
    if(screen==='sync') return syncScreen();
    return week();
  }

  function selectionButtons(id,values,selected,extraClass){
    return '<div class="choice-row '+(extraClass||'')+'" id="'+id+'">'+values.map(x=>'<button data-v="'+x.v+'" class="'+(String(x.v)===String(selected)?'active':'')+'">'+esc(x.label)+'</button>').join('')+'</div>';
  }

  function welcome(){
    if(MW.onboarding){
      MW.onboarding.render(root,()=>{render();window.scrollTo({top:0,behavior:'instant'});});
      return;
    }
  }

  function week(){
    const st=s();
    if(!st.week) MW.planner.buildWeek();
    const currentKey=MW.planner&&MW.planner.currentWeekKey?MW.planner.currentWeekKey():'';
    // Displaying saved meals must never replace them, including after data recovery.
    const rolloverPending=!!(currentKey&&st.week&&st.week.weekKey!==currentKey);
    if(rolloverPending&&previewRolloverFor!==currentKey&&st.ui.dismissedRolloverFor!==currentKey){
      const today=currentDayMeta();
      if(today.index===0) return newWeekPrompt();
      return planRemainingPrompt(true);
    }
    const viewingPreviousWeek=rolloverPending;
    const meals=(st.week.meals||[]).map(m=>({...m,recipe:recipe(m.recipeId)})).filter(x=>x.recipe);
    const todayMeta=currentDayMeta();
    const dayOrder=MW.DAYS.map(x=>x.key);
    const upcoming=meals.filter(x=>dayOrder.indexOf(x.day)>=todayMeta.index).sort((a,b)=>dayOrder.indexOf(a.day)-dayOrder.indexOf(b.day));
    const featured=meals.find(x=>x.day===todayMeta.key)||upcoming[0]||meals[0]||null;
    const compactMeals=featured?meals.filter(x=>x.day!==featured.day):meals;
    const lunch=MW.LUNCHES.find(x=>x.id===st.week.lunchId);
    const lunchPortions=(st.plan.lunchDays||[]).length*Math.max(1,Number(st.plan.lunchPeople)||1);
    const plannedCost=MW.planner.plannedBasketCost?MW.planner.plannedBasketCost():MW.planner.plannedMealCost();
    const budget=Math.max(1,Number(st.household.budget)||70);
    const budgetPct=Math.min(100,Math.round(plannedCost/budget*100));
    const savingResult=st.week&&st.week.savingResult;
    const savingCopy=st.plan.priceMode&&savingResult
      ?(savingResult.changed
        ?(savingResult.metBudget?'Estimated trolley '+money(savingResult.candidateTotal)+' · about '+money(savingResult.saved)+' lower than the previous plan.':'No suitable plan could be found within your '+money(budget)+' weekly budget, so My Week kept the previous meals.')
        :'No genuinely cheaper suitable plan was found, so your meals were left unchanged.')
      :'Prioritise cheaper meals, sensible own-brand swaps and more shared ingredients.';
    const budgetWarning=st.plan.priceMode&&savingResult&&savingResult.metBudget===false
      ?'<section class="budget-over-note">'+icon('triangle-exclamation')+'<div><strong>'+money(savingResult.overBudgetBy)+' above your weekly budget</strong><small>My Week will not generate a new week above '+money(budget)+'. Change this manually edited plan or regenerate it to bring the estimate back within budget.</small></div></section>'
      :'';

    const homeDelivery=st.week&&st.week.delivery;
    const homeMissing=homeDelivery&&Array.isArray(homeDelivery.missingKeys)?homeDelivery.missingKeys.length:0;
    const homeDeliveryNotice=st.week&&st.week.status==='order-placed'
      ?'<button class="delivery-notice" id="homeDeliveryCheck">'+icon('truck-ramp-box')+'<span><strong>Has your shopping arrived?</strong><small>Check the delivery before My Week adds it to your inventory.</small></span><i class="fa-solid fa-chevron-right"></i></button>'
      :homeDelivery&&homeDelivery.confirmed&&homeMissing
        ?'<button class="delivery-notice has-missing" id="homeDeliveryCheck">'+icon('triangle-exclamation')+'<span><strong>'+homeMissing+' delivery item'+(homeMissing===1?'':'s')+' missing</strong><small>Review what arrived if the supermarket makes another change.</small></span><i class="fa-solid fa-chevron-right"></i></button>'
        :'';

    const rolloverNotice=viewingPreviousWeek
      ?'<button class="delivery-notice" id="startNewWeek">'+icon('calendar-plus')+'<span><strong>You are viewing last week\'s meals</strong><small>Nothing has been replaced. Start this week when you are ready.</small></span><i class="fa-solid fa-chevron-right"></i></button>'
      :'';

    const dayStrip='<div class="day-strip">'+MW.DAYS.map(d=>{
      const meal=meals.find(x=>x.day===d.key);
      const hasLunch=(st.plan.lunchDays||[]).includes(d.key);
      return '<button class="day-pill day-open '+(meal?'has-dinner':'')+'" data-day="'+d.key+'" aria-label="Edit '+esc(d.label)+'"><span>'+esc(d.short)+'</span><div class="day-dots">'+(meal?'<i title="Dinner"></i>':'')+(hasLunch?'<i class="lunch-dot" title="Lunch"></i>':'')+'</div></button>';
    }).join('')+'</div>';

    const featuredMeal=featured?'<article class="home-featured-meal">'+
      recipePhoto(featured.recipe,'home-featured-photo',featured.recipe.title)+
      '<div class="home-featured-body"><span class="eyebrow">'+esc(day(featured.day).label+"'s dinner")+'</span><h3>'+esc(featured.recipe.title)+'</h3><p>'+esc(featured.recipe.subtitle)+'</p>'+
      '<div class="home-featured-meta"><span>'+icon('clock')+' '+esc(timeText(featured.recipe))+'</span><span>'+esc(recipeCostLabel(featured.recipe,st.household.people))+'</span></div>'+
      '<div class="home-featured-actions"><button class="btn primary featured-open" data-recipe="'+featured.recipe.id+'">View recipe</button><button class="btn secondary featured-swap" data-day="'+featured.day+'">'+icon('rotate')+' Change</button></div></div>'+
    '</article>':'';
    const list=meals.length?featuredMeal+(compactMeals.length?'<div class="meal-list home-meal-list">'+compactMeals.map(m=>'<article class="meal-row">'+
      recipePhoto(m.recipe,'meal-thumb',m.recipe.title)+
      '<button class="meal-open" data-recipe="'+m.recipe.id+'" aria-label="Open '+esc(m.recipe.title)+'">'+
        '<span class="meal-day">'+esc(day(m.day).short)+'</span><strong>'+esc(m.recipe.title)+'</strong>'+
        '<small>'+esc(m.recipe.subtitle)+'</small>'+
        '<span class="meal-meta"><span>'+icon('clock')+' '+esc(timeText(m.recipe))+'</span><span>'+esc(recipeCostLabel(m.recipe,st.household.people))+'</span></span>'+
      '</button>'+
      '<button class="row-swap swap" data-day="'+m.day+'" aria-label="Change '+esc(day(m.day).label)+' meal">'+icon('rotate')+'</button>'+
    '</article>').join('')+'</div>':''):
      '<div class="home-empty-plan"><span class="empty-state-icon">'+icon('calendar-plus')+'</span><div><strong>No dinners planned yet</strong><small>Build this week from your saved food preferences, budget and kitchen setup.</small></div><button class="btn primary" id="regenerateWeek">Plan my dinners</button></div>';
    const regenerateAction=meals.length
      ?'<div class="home-quick-actions single"><button class="home-action" id="regenerateWeek">'+icon('arrows-rotate')+'<span><strong>Regenerate week</strong><small>Build a fresh set of meals using your saved preferences</small></span></button></div>'
      :'';

    root.innerHTML=shell(
      '<section class="home-intro"><div><span class="eyebrow">THIS WEEK</span><h1>Your week at a glance</h1><p>'+countLabel(meals.length,'dinner','dinners')+' · '+countLabel((st.plan.lunchDays||[]).length,'lunch day','lunch days')+' · '+esc(st.household.retailer)+'</p></div><div class="budget-text"><strong>£'+Math.round(budget)+'</strong><span>budget</span></div></section>'+
      rolloverNotice+
      dayStrip+
      homeDeliveryNotice+
      '<section class="list-section home-dinners"><div class="section-title"><div><span class="eyebrow">DINNERS</span><h2>Dinners this week</h2></div><span>'+meals.length+' planned</span></div>'+list+'</section>'+
      regenerateAction+
      (lunchPortions&&lunch?'<section class="lunch-feature '+(!displayRecipeImage(lunch)?'no-photo':'')+'">'+recipePhoto(lunch,'lunch-photo',lunch.title)+'<div class="lunch-body"><span class="eyebrow">LUNCH PREP</span><h2>'+esc(lunch.title)+'</h2><p>'+lunchPortions+' '+(lunchPortions===1?'lunch':'lunches')+' across '+(st.plan.lunchDays||[]).length+' '+((st.plan.lunchDays||[]).length===1?'day':'days')+' for '+Math.max(1,Number(st.plan.lunchPeople)||1)+' '+(Math.max(1,Number(st.plan.lunchPeople)||1)===1?'person':'people')+'</p><button class="text-action" id="openLunch">Prepare lunch</button><button class="text-action" id="changeLunch">Change lunch</button></div></section>':'<section class="lunch-feature no-photo"><div class="lunch-body"><span class="eyebrow">LUNCH</span><h2>No lunches planned</h2><button class="text-action" id="editPlan">Add lunches</button></div></section>')+
      '<section class="budget-progress"><div><strong>'+money(plannedCost)+'</strong><span>estimated trolley</span></div><div><strong>'+money(budget)+'</strong><span>weekly budget</span></div><div class="progress"><span style="width:'+budgetPct+'%"></span></div></section>'+
      budgetWarning+
      (!st.household.equipmentConfigured?'<section class="kitchen-nudge"><span>'+icon('utensils')+'</span><div><strong>Match recipes to your kitchen</strong><small>Specialist recipes stay out until you tell My Week what equipment you have.</small></div><button id="kitchenSetup">Set up</button></section>':'')+
      '<section class="home-saving-switch '+(st.plan.priceMode?'active':'')+'"><div><span class="saving-icon">'+icon('sterling-sign')+'</span><div><strong>Lower-cost planning</strong><small>'+esc(savingCopy)+'</small></div></div><label class="toggle"><input id="homeSavingToggle" type="checkbox" '+(st.plan.priceMode?'checked':'')+'><span></span></label></section>'+
      '<button class="btn primary full-action" id="accept">Looks good, build my shop</button>',
      'plan'
    );

    const startNewWeek=document.getElementById('startNewWeek');
    if(startNewWeek) startNewWeek.onclick=()=>{
      previewRolloverFor='';
      st.ui.dismissedRolloverFor='';
      MW.state.save();
      const today=currentDayMeta();
      if(today.index===0) return newWeekPrompt();
      return planRemainingPrompt(true);
    };
    const homeDeliveryCheck=document.getElementById('homeDeliveryCheck');
    if(homeDeliveryCheck) homeDeliveryCheck.onclick=()=>go('delivery');
    root.querySelectorAll('.day-open').forEach(b=>b.onclick=()=>go('day:'+b.dataset.day));
    root.querySelectorAll('.swap').forEach(b=>b.onclick=()=>swap(b.dataset.day));
    root.querySelectorAll('.meal-open,.featured-open').forEach(b=>b.onclick=()=>go('recipe:'+b.dataset.recipe));
    root.querySelectorAll('.featured-swap').forEach(b=>b.onclick=()=>swap(b.dataset.day));
    document.getElementById('regenerateWeek').onclick=e=>{
      const today=currentDayMeta();
      const normal=(st.plan.dinnerDays||[]).length;
      const remaining=remainingDinnerDays().length;
      if(today.index>0&&remaining<normal) return planRemainingPrompt(false);
      withLoading(e.currentTarget,()=>{MW.planner.regenerateAll({planMode:'manual-full'});week();});
    };
    const changeLunch=document.getElementById('changeLunch');
    if(changeLunch) changeLunch.onclick=()=>changeLunchScreen();
    const editPlan=document.getElementById('editPlan');
    if(editPlan) editPlan.onclick=()=>go('settings');
    const kitchenSetup=document.getElementById('kitchenSetup');
    if(kitchenSetup) kitchenSetup.onclick=()=>go('settings');
    document.getElementById('homeSavingToggle').onchange=e=>priceToggle(e.currentTarget,'.home-saving-switch',week);
    document.getElementById('accept').onclick=()=>{MW.learning.acceptWeek();go('check');};
    bindNav();
    if(MW.updates&&MW.updates.isNativeAndroid()){
      MW.updates.check().then(result=>{
        if(!result||!result.available||!result.manifest||document.getElementById('homeUpdateNotice'))return;
        const intro=root.querySelector('.home-intro');if(!intro)return;
        const notice=document.createElement('button');
        notice.id='homeUpdateNotice';notice.className='delivery-notice';
        const installed=String(result.local&&result.local.version||'unknown');
        notice.innerHTML=icon('cloud-arrow-down')+'<span><strong>Update available: '+esc(result.manifest.versionName)+'</strong><small>Installed '+esc(installed)+' · tap to download and verify.</small></span><i class="fa-solid fa-chevron-right"></i>';
        intro.insertAdjacentElement('afterend',notice);
        notice.onclick=e=>withLoading(e.currentTarget,async()=>{
          const installResult=await MW.updates.install(result.manifest);
          const copy=notice.querySelector('span');
          if(installResult&&installResult.needsInstallPermission)copy.innerHTML='<strong>Install permission needed</strong><small>Allow My Week to install verified updates, then return to My Week. The update will continue automatically.</small>';
          else if(installResult&&installResult.installerOpened)copy.innerHTML='<strong>Android installer opened</strong><small>Finish the installation in Android. My Week will confirm the installed version next time it opens.</small>';
          return installResult;
        });
      }).catch(()=>{});
    }
  }

  function swap(dayKey){
    animateNextPage=true;
    const slot=s().week.meals.find(x=>x.day===dayKey);
    if(!slot) return;
    const current=recipe(slot.recipeId);
    const alts=MW.planner.alternatives(current.id,5);
    const randomPool=MW.planner.randomAlternativePool?MW.planner.randomAlternativePool(current.id):[];
    root.innerHTML=shell(
      '<section class="subpage-head"><button class="back-button" id="back">'+icon('arrow-left')+'</button><div><span class="eyebrow">'+esc(day(dayKey).label.toUpperCase())+'</span><h1>Choose another dinner</h1></div></section>'+
      '<button class="planner-utility random-pick" id="randomPick">'+icon('shuffle')+'<span><strong>Choose one for me</strong><small>Randomly pick from all '+randomPool.length+' dinners that match your current settings</small></span><i class="fa-solid fa-chevron-right"></i></button>'+
      '<div class="choice-divider"><span>'+alts.length+' best alternative'+(alts.length===1?'':'s')+'</span></div>'+
      '<div class="alternative-list">'+alts.map(r=>'<button class="alternative-card alt" data-id="'+r.id+'">'+recipePhoto(r,'alternative-photo',r.title)+'<span><strong>'+esc(r.title)+'</strong><small>'+esc(r.subtitle)+'</small><em>'+esc(timeText(r))+' · '+esc(recipeCostLabel(r,s().household.people))+'</em></span><i class="fa-solid fa-chevron-right"></i></button>').join('')+'</div>'+
      '<button class="browse-library" id="browseLibrary">'+icon('magnifying-glass')+'<span><strong>Browse recipe library</strong><small>Search your local recipe collection</small></span><i class="fa-solid fa-chevron-right"></i></button>',
      'plan'
    );
    root.querySelectorAll('.alt').forEach(b=>b.onclick=()=>{MW.planner.replace(dayKey,b.dataset.id);go('week');});
    document.getElementById('randomPick').onclick=e=>withLoading(e.currentTarget,()=>{const pick=MW.planner.randomAlternative(current.id);if(pick&&MW.planner.replace(dayKey,pick.id)) go('week');});
    document.getElementById('browseLibrary').onclick=()=>{s().ui.libraryTargetDay=dayKey;MW.state.save();go('library');};
    document.getElementById('back').onclick=()=>go('week');
    bindNav();
  }

  function changeLunchScreen(showAll=false){
    animateNextPage=true;
    const st=s();
    const profile=foodProfile();
    const current=MW.LUNCHES.find(x=>x.id===st.week.lunchId);
    const rankedBase=MW.planner&&MW.planner.lunchAlternatives?MW.planner.lunchAlternatives():MW.LUNCHES.filter(x=>!current||x.id!==current.id).filter(x=>MW.planner&&MW.planner.lunchAllowed?MW.planner.lunchAllowed(x):(!MW.food||MW.food.lunchAllowed(x,profile)));
    const preferredStyles=MW.food&&MW.food.lunchPreferences?MW.food.lunchPreferences(profile):[profile.lunchStyle||'any'];
    const filterItems=preferredStyles.includes('any')
      ? MW.food.lunchStyles
      : [{id:'any',label:'Any of my styles'},...MW.food.lunchStyles.filter(x=>preferredStyles.includes(x.id))];
    st.ui=st.ui||{};
    let browseStyle=st.ui.lunchBrowseStyle||'any';
    if(!filterItems.some(x=>x.id===browseStyle))browseStyle='any';
    const ranked=browseStyle==='any'||!MW.food||!MW.food.lunchMatchesStyle?rankedBase:rankedBase.filter(x=>MW.food.lunchMatchesStyle(x,browseStyle));
    const randomBase=MW.planner.randomLunchPool?MW.planner.randomLunchPool(current&&current.id):rankedBase;
    const randomLunchPool=browseStyle==='any'||!MW.food||!MW.food.lunchMatchesStyle?randomBase:randomBase.filter(x=>MW.food.lunchMatchesStyle(x,browseStyle));
    const practicalRanked=ranked.filter(x=>MW.food&&MW.food.practicalLunchCandidate?MW.food.practicalLunchCandidate(x):x.practicalLunch);
    const practicalIds=new Set(practicalRanked.map(x=>x.id));
    const shortlist=[...practicalRanked,...ranked.filter(x=>!practicalIds.has(x.id))].slice(0,5);
    const shown=showAll?ranked:shortlist;
    const days=(st.plan.lunchDays||[]).length,eaters=Math.max(1,Number(st.plan.lunchPeople)||1),planned=days*eaters;
    const card=r=>{const style=r.prepStyle==='no-cook'?'Prep at home':'Cook at home',meta=[r.time?r.time+' mins':'Quick prep',style].join(' · ');return '<button class="alternative-card lunch-alt lunch-swap-card" data-id="'+r.id+'">'+recipePhoto(r,'alternative-photo',r.title)+'<span class="lunch-alt-copy"><strong>'+esc(r.title)+'</strong><small>'+esc(r.subtitle)+'</small><em>'+esc(meta)+'</em></span><i class="fa-solid fa-chevron-right"></i></button>';};
    root.innerHTML=shell(
      '<section class="subpage-head lunch-swap-head"><button class="back-button" id="back">'+icon('arrow-left')+'</button><div><span class="eyebrow">CHANGE LUNCH</span><h1>Choose another lunch</h1><p>'+planned+' '+(planned===1?'lunch':'lunches')+' this week</p></div></section>'+
      '<button class="planner-utility random-pick lunch-random" id="randomLunch">'+icon('shuffle')+'<span><strong>Choose one for me</strong><small>Pick from '+randomLunchPool.length+' suitable lunches</small></span><i class="fa-solid fa-chevron-right"></i></button>'+
      '<section class="lunch-swap-filters"><span class="eyebrow">LUNCH STYLE</span>'+foodChoice('lunchFilter',filterItems,browseStyle)+'</section>'+
      '<div class="choice-divider lunch-choice-divider"><span>'+(showAll?ranked.length+' matching '+(ranked.length===1?'lunch':'lunches'):shortlist.length+' best alternative'+(shortlist.length===1?'':'s'))+'</span></div>'+
      '<div class="alternative-list lunch-swap-list">'+shown.map(card).join('')+'</div>'+
      (!ranked.length?'<div class="empty-state">'+icon('utensils')+'<h2>No lunches match</h2><p>Try another lunch style or change your food preferences.</p></div>':'')+
      (ranked.length>5?'<button class="browse-library lunch-browse-all" id="lunchBrowseAll">'+icon(showAll?'arrow-up':'magnifying-glass')+'<span><strong>'+(showAll?'Show 5 best alternatives':'Browse all '+ranked.length+' lunches')+'</strong><small>'+(showAll?'Return to the shortlist':'See every lunch matching this style')+'</small></span><i class="fa-solid fa-chevron-right"></i></button>':''),
      'plan'
    );
    root.querySelectorAll('#lunchFilter button').forEach(b=>b.onclick=()=>{st.ui.lunchBrowseStyle=b.dataset.v;MW.state.save();changeLunchScreen(false);});
    root.querySelectorAll('.lunch-alt').forEach(b=>b.onclick=()=>{MW.planner.replaceLunch(b.dataset.id);go('week');});
    const randomLunch=document.getElementById('randomLunch');
    if(randomLunch) randomLunch.onclick=e=>withLoading(e.currentTarget,()=>{
      const pick=randomLunchPool.length?randomLunchPool[Math.floor(Math.random()*randomLunchPool.length)]:null;
      if(pick){MW.planner.replaceLunch(pick.id);go('week');}
    });
    const browse=document.getElementById('lunchBrowseAll');if(browse)browse.onclick=()=>changeLunchScreen(!showAll);
    document.getElementById('back').onclick=()=>go('week');
    bindNav();
  }


  function weeklyCheck(){
    const st=s();
    st.week.extras=Array.isArray(st.week.extras)?st.week.extras:[];
    st.week.forceBuy=Array.isArray(st.week.forceBuy)?st.week.forceBuy:[];
    const questions=MW.inventory.questions();
    const extras=st.week.extras;
    const forced=st.week.forceBuy;

    root.innerHTML=shell(
      '<section class="subpage-head simple"><div><span class="eyebrow">BEFORE THE SHOP</span><h1>Quick check</h1><p>Only confirm the things that can change this week.</p></div></section>'+
      (questions.length?'<section class="check-section"><div class="section-title"><div><span class="eyebrow">CUPBOARD</span><h2>Still have enough?</h2></div></div><div class="stock-questions">'+questions.map((q,i)=>'<div class="stock-question" data-name="'+esc(ingredientName(q.name))+'"><div><strong>'+esc(ingredientName(q.name))+'</strong><small>'+(q.amountText?esc(q.amountText)+' noted · ':'')+'I am not fully sure this is still in stock.</small></div><div><button class="stock-answer yes" data-i="'+i+'">Yes</button><button class="stock-answer no" data-i="'+i+'">Add it</button></div></div>').join('')+'</div></section>':'')+
      (forced.length?'<section class="forced-buy-note">'+icon('basket-shopping')+'<div><strong>Definitely add to the shop</strong><small>'+forced.map(x=>esc(ingredientName(x))).join(' · ')+'</small></div></section>':'')+
      '<section class="check-budget"><span><strong>'+money(st.household.budget)+'</strong> weekly budget</span><small>Meals, lunches and anything you add here count towards the weekly budget estimate.</small></section>'+
      '<section class="check-section"><div class="section-title"><div><span class="eyebrow">WEEKLY ESSENTIALS</span><h2>Add what you need</h2></div></div><div class="essential-list" id="regulars">'+st.regulars.map(x=>'<div class="essential-row '+(x.selected?'active':'')+'" data-id="'+x.id+'"><div class="essential-name"><strong>'+esc(ingredientName(x.name))+'</strong><small>'+(x.selected?'Added to this shop':'Not added')+'</small></div><label class="toggle"><input class="regular-toggle" data-id="'+x.id+'" type="checkbox" '+(x.selected?'checked':'')+'><span></span></label>'+(x.selected?'<div class="qty-stepper"><button class="qty-minus" data-id="'+x.id+'" aria-label="Reduce '+esc(ingredientName(x.name))+'">'+icon('minus')+'</button><strong>'+esc(regularQty(x))+'</strong><button class="qty-plus" data-id="'+x.id+'" aria-label="Increase '+esc(ingredientName(x.name))+'">'+icon('plus')+'</button></div>':'')+'</div>').join('')+'</div></section>'+
      '<section class="check-section"><div class="section-title"><div><span class="eyebrow">ANYTHING ELSE</span><h2>Add extras</h2></div></div><span class="mini-label">Popular</span><div class="quick-adds">'+MW.EXTRA_SUGGESTIONS.map((x,i)=>'<button class="quick-add" data-index="'+i+'">'+icon('plus')+' '+esc(ingredientName(x.name))+'</button>').join('')+'</div><span class="mini-label custom-label">Something else</span><div class="add-custom"><input id="extra" placeholder="e.g. coffee, shampoo, pet food"><button id="addExtra">'+icon('plus')+' Add</button></div><div class="extras-list">'+(extras.length?'<span class="mini-label added-label">Added to this shop</span>'+extras.map((x,i)=>'<div class="extra-row"><span><strong>'+esc(ingredientName(x.name))+'</strong><small>'+esc(x.category||'Extras')+'</small></span><button class="remove-extra" data-index="'+i+'" aria-label="Remove">'+icon('trash')+'</button></div>').join(''):'')+'</div></section>'+
      '<section class="saving-toggle '+(st.plan.priceMode?'active':'')+'"><div><span class="saving-icon">'+icon('sterling-sign')+'</span><div><strong>Lower-price mode</strong><small>'+(st.week.savingResult&&st.week.savingResult.changed?'About '+money(st.week.savingResult.saved)+' lower than the previous plan.':'Replans only when the corrected trolley estimate is genuinely lower.')+'</small></div></div><label class="toggle"><input id="savingToggle" type="checkbox" '+(st.plan.priceMode?'checked':'')+'><span></span></label></section>'+
      '<div class="plan-actions"><button class="btn secondary" id="back">Back to meals</button><button class="btn primary" id="build">Build my shop</button></div>',
      'shop'
    );

    root.querySelectorAll('.stock-answer').forEach(b=>b.onclick=()=>{
      const q=questions[Number(b.dataset.i)];
      if(!q) return;
      const key=String(q.name||'').toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim();
      if(b.classList.contains('yes')){
        MW.inventory.set(q.name,'have',q.amountText||'',0.9);
        st.week.forceBuy=st.week.forceBuy.filter(x=>String(x||'').toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim()!==key);
        MW.state.log('stock_check',{name:q.name,result:'have'});
      }else{
        MW.inventory.set(q.name,'out','',0.95);
        if(!st.week.forceBuy.some(x=>String(x||'').toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim()===key)) st.week.forceBuy.push(q.name);
        MW.state.log('stock_check',{name:q.name,result:'add'});
      }
      st.week.shop=null;
      MW.state.save();
      samePage(weeklyCheck);
    });
    root.querySelectorAll('.regular-toggle').forEach(input=>input.onchange=()=>{
      const x=st.regulars.find(y=>y.id===input.dataset.id);
      if(!x) return;
      x.selected=input.checked;
      st.week.shop=null;
      MW.state.log('weekly_essential_toggled',{id:x.id,selected:x.selected,count:x.count});
      MW.state.save();
      samePage(weeklyCheck);
    });
    root.querySelectorAll('.qty-minus').forEach(b=>b.onclick=()=>{
      const x=st.regulars.find(y=>y.id===b.dataset.id);
      if(!x) return;
      x.count=Math.max(1,(Number(x.count)||1)-1);
      x.selected=true;
      st.week.shop=null;MW.state.save();samePage(weeklyCheck);
    });
    root.querySelectorAll('.qty-plus').forEach(b=>b.onclick=()=>{
      const x=st.regulars.find(y=>y.id===b.dataset.id);
      if(!x) return;
      x.count=Math.min(99,(Number(x.count)||1)+1);
      x.selected=true;
      st.week.shop=null;MW.state.save();samePage(weeklyCheck);
    });
    function addExtra(name,category,estimatedCost){
      name=String(name||'').trim();
      if(!name) return;
      if(!st.week.extras.some(x=>x.name.toLowerCase()===name.toLowerCase())) st.week.extras.push({name,qty:'1',category:category||'Extras',estimatedCost:Number(estimatedCost)||2.5});
      st.week.shop=null;MW.state.save();samePage(weeklyCheck);
    }
    root.querySelectorAll('.quick-add').forEach(b=>b.onclick=()=>{const x=MW.EXTRA_SUGGESTIONS[Number(b.dataset.index)];addExtra(x.name,x.category,x.estimatedCost);});
    root.querySelectorAll('.remove-extra').forEach(b=>b.onclick=()=>{st.week.extras.splice(Number(b.dataset.index),1);st.week.shop=null;MW.state.save();samePage(weeklyCheck);});
    document.getElementById('addExtra').onclick=()=>addExtra(document.getElementById('extra').value,'Extras');
    document.getElementById('extra').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();addExtra(e.target.value,'Extras');}};
    document.getElementById('savingToggle').onchange=e=>priceToggle(e.currentTarget,'.saving-toggle',weeklyCheck);
    document.getElementById('back').onclick=()=>go('week');
    document.getElementById('build').onclick=()=>{MW.shopping.build({savingMode:st.plan.priceMode});go('shopreview');};
    bindNav();
  }

  function shopReview(){
    const st=s();
    const delivery=st.week&&st.week.delivery;
    const orderLocked=Boolean(delivery&&Array.isArray(delivery.items)&&['order-placed','delivery-checked'].includes(st.week.status));
    let shop=st.week&&st.week.shop;
    const currentSignature=MW.shopping&&MW.shopping.signature?MW.shopping.signature():null;
    if(!orderLocked&&(!shop||(currentSignature&&shop.planSignature!==currentSignature))){
      try{shop=MW.shopping.build({savingMode:st.plan.priceMode,preserveChecks:Boolean(shop)});}catch(e){return go('check');}
    }
    if(!shop) return go('check');
    const checks=st.ui.shopChecks||{};
    const retailSection=x=>MW.retailGroups?MW.retailGroups.section(x.name,x.sourceGroup):'Other';
    const retailOrder=MW.retailGroups?MW.retailGroups.order:['Fruit & Veg','Chilled','Cupboard','Frozen','Bakery','Household','Other'];
    const sourceGroups=Object.keys(shop.groups||{});
    const rawItems=orderLocked?delivery.items.map(x=>({...x,key:x.key,sourceGroup:x.sourceGroup||'Ingredients'})):sourceGroups.flatMap(g=>shop.groups[g].map(x=>({key:g+'|'+x.name,sourceGroup:g,...x})));
    const allItems=rawItems.map(x=>{
      const substitution=x.substitution||MW.shopping&&MW.shopping.getSubstitution&&MW.shopping.getSubstitution(x.key,st)||null;
      return {...x,group:x.group||retailSection(x),substitution};
    });
    const retailGroups=retailOrder.filter(g=>allItems.some(x=>x.group===g));
    const done=allItems.filter(x=>checks[x.key]).length;
    const pct=allItems.length?Math.round(done/allItems.length*100):0;
    const substitutionCount=allItems.filter(x=>x.substitution).length;
    const receiptTotal=delivery&&delivery.receipt&&Number.isFinite(Number(delivery.receipt.total))?Number(delivery.receipt.total):null;
    const orderLine=x=>{
      const sub=x.substitution;
      if(!(orderLocked&&delivery&&delivery.confirmed)){
        if(sub)return 'Bought instead · '+esc(displayAmount(sub.replacementAmount));
        return esc(x.displayAmount)+(x.quantityNeedsReview?' retail minimum':'')+(x.savingNote?' · '+esc(x.savingNote):'');
      }
      const actual=delivery.actualAmounts&&delivery.actualAmounts[x.key]||(sub&&sub.replacementAmount)||'0',short=delivery.shortfallAmounts&&delivery.shortfallAmounts[x.key],surplus=delivery.surplusApplied&&delivery.surplusApplied[x.key];
      return (sub?'Bought ':'Planned '+esc(x.displayAmount)+' · Bought ')+esc(actual)+(short?' · Short '+esc(short):surplus&&!/^0(?:\s|$)/.test(surplus)?' · Extra '+esc(surplus):'');
    };
    const itemHtml=x=>{
      const sub=x.substitution,shownName=sub?sub.replacementName:x.name;
      const subNote=sub?'<span class="shop-substitution-note">'+icon('right-left')+' Instead of '+esc(ingredientName(x.name))+' · planned '+esc(displayAmount(sub.plannedAmount||x.displayAmount))+'</span>':'';
      const quantityNote=!sub&&x.quantityNeedsReview?'<span class="shop-quantity-note">'+icon('triangle-exclamation')+' Recipe uses '+esc((x.sourceAmounts||x.amounts||[]).join(' + '))+' · check this pack is enough</span>':'';
      const price=!sub&&Number.isFinite(Number(x.estimatedPrice))?'<span class="shop-price">~'+money(x.estimatedPrice)+'</span>':'';
      const more=orderLocked?'':'<button type="button" class="ingredient-more shop-item-more" data-ingredient="'+esc(x.name)+'" data-shop-key="'+esc(x.key)+'" data-planned-amount="'+esc(x.inventoryAmount||x.displayAmount||'')+'" aria-label="More options for '+esc(ingredientName(x.name))+'">'+icon('ellipsis-vertical')+'</button>';
      return '<div class="shop-item-shell '+(sub?'has-substitution ':'')+(orderLocked?'order-locked':'')+'"><button class="shop-item '+(checks[x.key]?'done':'')+'" data-key="'+esc(x.key)+'" '+(orderLocked?'disabled':'')+'><span class="shop-check">'+(checks[x.key]?icon('check'):'')+'</span><span class="shop-info"><strong>'+esc(ingredientName(shownName))+'</strong><small>'+orderLine(x)+'</small>'+subNote+quantityNote+'</span>'+price+'<span class="shop-reason">'+esc((x.reasons||[])[0]||'')+'</span></button>'+more+'</div>';
    };
    const groupHtml=g=>'<section class="retail-group"><header><span class="retail-icon">'+icon(g==='Fruit & Veg'?'leaf':g==='Chilled'?'snowflake':g==='Cupboard'?'jar':g==='Frozen'?'snowflake':g==='Bakery'?'bread-slice':g==='Household'?'spray-can-sparkles':'basket-shopping')+'</span><span class="retail-heading"><strong>'+esc(g)+'</strong><em>Shop this section</em></span><small>'+allItems.filter(x=>x.group===g).length+'</small></header><div class="retail-items">'+allItems.filter(x=>x.group===g).map(itemHtml).join('')+'</div></section>';
    const groupedHtml=retailGroups.map(groupHtml).join('');
    const missingCount=delivery&&Array.isArray(delivery.missingKeys)?delivery.missingKeys.length:0;
    const issueCount=delivery?new Set([...(delivery.missingKeys||[]),...(delivery.shortKeys||[])]).size:0;
    const deliveryNotice=st.week&&st.week.status==='order-placed'
      ?'<button class="delivery-notice" id="checkDelivery">'+icon('truck-ramp-box')+'<span><strong>Check what you actually got</strong><small>Confirm missing items and the pack quantities you came home with.</small></span><i class="fa-solid fa-chevron-right"></i></button>'
      :delivery&&delivery.confirmed
        ?'<button class="delivery-notice '+(issueCount?'has-missing':'complete')+'" id="checkDelivery">'+icon(issueCount?'triangle-exclamation':'circle-check')+'<span><strong>'+(issueCount?issueCount+' item'+(issueCount===1?'':'s')+' missing or short':'Shop quantities saved')+'</strong><small>'+(issueCount?'Your original order stays below so you can see exactly what was planned.':'The quantities you actually bought are now in your cupboard. Cooking will deduct what you use. Your original order stays below.')+'</small></span><i class="fa-solid fa-chevron-right"></i></button>'
        :'';

    const postOrderActions=orderLocked?(delivery.confirmed?'<div class="plan-actions"><button class="btn secondary" id="checkDeliveryBottom">Review quantities</button><button class="btn primary" id="continueRecipes">Recipes</button></div>':'<div class="plan-actions"><button class="btn secondary" id="checkDeliveryBottom">Check quantities</button><button class="btn primary" id="continueRecipes">Recipes</button></div>'):'<div class="plan-actions"><button class="btn secondary" id="guided">Guided shop</button><button class="btn primary" id="doneShop">Order placed</button></div>';
    const totalValue=receiptTotal!=null?receiptTotal:shop.estimatedTotal;
    const totalMeta=receiptTotal!=null?'receipt total':substitutionCount?(substitutionCount+' in-store swap'+(substitutionCount===1?'':'s')+' not repriced · planned estimate'):shop.savingMode?('after ~'+money(shop.estimatedSavings)+' saving'):('estimated · '+Math.round(shop.priceCoverage||0)+'% benchmark coverage');

    root.innerHTML=shell(
      '<section class="page-head shop-head"><div><span class="eyebrow">'+(orderLocked?'YOUR ORDER':'YOUR SHOP')+'</span><h1>'+shop.itemCount+' things</h1><p>'+(orderLocked?'Original shopping list kept for this week':esc(shop.priceRetailer||st.household.retailer)+' · price estimate'+(shop.priceAsOf?' · updated '+esc(shop.priceAsOf):''))+'</p></div><div class="shop-total"><strong>'+money(totalValue)+'</strong><span>'+esc(totalMeta)+'</span></div></section>'+
      deliveryNotice+
      '<section class="shop-progress" id="shopProgress"><div><strong id="shopProgressCount">'+done+' of '+allItems.length+'</strong><span> checked off</span></div><span id="shopProgressPct">'+pct+'%</span><div class="progress"><span id="shopProgressBar" style="width:'+pct+'%"></span></div></section>'+
      (orderLocked?'':shop.savingMode?'<section class="saving-summary compact-saving"><div>'+icon('sterling-sign')+'<div><strong>Lower-price mode</strong><small>~'+money(shop.estimatedSavings)+' estimated saving</small></div></div><label class="toggle"><input id="normalPrice" type="checkbox" checked><span></span></label></section>':'<button class="saving-prompt" id="lowerShop">'+icon('sterling-sign')+'<span><strong>Try to lower the price</strong><small>Replan the week only if the corrected trolley estimate can genuinely fall.</small></span><i class="fa-solid fa-chevron-right"></i></button>')+
      '<div class="category-tabs"><button class="cat-tab active" data-group="__all">All <span>'+allItems.length+'</span></button>'+retailGroups.map(g=>'<button class="cat-tab" data-group="'+esc(g)+'">'+esc(g)+' <span>'+allItems.filter(x=>x.group===g).length+'</span></button>').join('')+'</div>'+
      '<section class="shop-surface"><div class="shop-group show grouped-shop" data-shopgroup="__all">'+groupedHtml+'</div>'+retailGroups.map(g=>'<div class="shop-group grouped-shop" data-shopgroup="'+esc(g)+'">'+groupHtml(g)+'</div>').join('')+'</section>'+ 
      postOrderActions,
      'shop'
    );

    root.querySelectorAll('.cat-tab').forEach(b=>b.onclick=()=>{
      root.querySelectorAll('.cat-tab').forEach(x=>x.classList.toggle('active',x===b));
      root.querySelectorAll('.shop-group').forEach(g=>g.classList.toggle('show',g.dataset.shopgroup===b.dataset.group));
    });
    bindIngredientActions(root);
    root.querySelectorAll('.shop-item').forEach(b=>b.onclick=()=>{
      st.ui.shopChecks=st.ui.shopChecks||{};
      const key=b.dataset.key;
      const checked=!st.ui.shopChecks[key];
      st.ui.shopChecks[key]=checked;
      MW.state.save();
      root.querySelectorAll('.shop-item').forEach(item=>{
        if(item.dataset.key!==key) return;
        item.classList.toggle('done',checked);
        const mark=item.querySelector('.shop-check');
        if(mark) mark.innerHTML=checked?icon('check'):'';
        item.classList.remove('just-checked');
        if(checked){void item.offsetWidth;item.classList.add('just-checked');}
      });
      const newDone=allItems.filter(x=>st.ui.shopChecks[x.key]).length;
      const newPct=allItems.length?Math.round(newDone/allItems.length*100):0;
      const count=document.getElementById('shopProgressCount');
      const pctEl=document.getElementById('shopProgressPct');
      const bar=document.getElementById('shopProgressBar');
      if(count) count.textContent=newDone+' of '+allItems.length;
      if(pctEl) pctEl.textContent=newPct+'%';
      if(bar) bar.style.width=newPct+'%';
    });
    const lower=document.getElementById('lowerShop');
    if(lower) lower.onclick=e=>withLoading(e.currentTarget,()=>{MW.planner.rebuildForPriceMode(true);MW.shopping.build({savingMode:true});samePage(shopReview);});
    const normal=document.getElementById('normalPrice');
    if(normal) normal.onchange=e=>{const enabled=e.currentTarget.checked;if(!enabled){MW.planner.rebuildForPriceMode(false);MW.shopping.build({savingMode:false});samePage(shopReview);return;}MW.shopping.build({savingMode:true});samePage(shopReview);};
    const guided=document.getElementById('guided');
    if(guided) guided.onclick=()=>{const flat=allItems.filter(x=>!checks[x.key]).map(x=>({name:x.name,amount:x.displayAmount,inventoryAmount:x.inventoryAmount||x.displayAmount,category:x.group,key:x.key,substitution:x.substitution||null,quantityNeedsReview:Boolean(x.quantityNeedsReview),sourceAmounts:(x.sourceAmounts||x.amounts||[]).slice()}));st.ui.shopping={items:flat,index:0,done:[]};MW.state.save();go('shopping');};
    const checkDelivery=document.getElementById('checkDelivery'),checkDeliveryBottom=document.getElementById('checkDeliveryBottom');
    if(checkDelivery) checkDelivery.onclick=()=>go('delivery');if(checkDeliveryBottom) checkDeliveryBottom.onclick=()=>go('delivery');
    const doneShop=document.getElementById('doneShop');if(doneShop) doneShop.onclick=()=>{MW.delivery.begin(allItems.map(x=>({...x,checked:Boolean(checks[x.key])})));go('recipes');};
    const continueRecipes=document.getElementById('continueRecipes');if(continueRecipes)continueRecipes.onclick=()=>go('recipes');
    bindNav();
  }

  function guidedShopping(){
    const st=s(),q=st.ui.shopping;
    if(!q||q.index>=q.items.length){st.ui.shopping=null;MW.state.save();return go('shopreview');}
    const item=q.items[q.index],pct=Math.round((q.index/q.items.length)*100),currentSub=MW.shopping&&MW.shopping.getSubstitution?MW.shopping.getSubstitution(item.key,st):null;
    const shownName=currentSub?currentSub.replacementName:item.name,shownAmount=currentSub?currentSub.replacementAmount:item.amount;
    root.innerHTML=shell(
      '<section class="guided-card"><div class="guided-icon">'+icon('basket-shopping')+'</div><div class="progress"><span style="width:'+pct+'%"></span></div><small>'+(q.index+1)+' of '+q.items.length+' · '+esc(item.category)+'</small><h1>'+esc(ingredientName(shownName))+'</h1><strong>'+esc(displayAmount(shownAmount))+'</strong>'+(currentSub?'<p class="guided-substitution-note">'+icon('right-left')+' Instead of '+esc(ingredientName(item.name))+'</p>':'')+(!currentSub&&item.quantityNeedsReview?'<p class="guided-quantity-note">'+icon('triangle-exclamation')+' Retail minimum. Recipe uses '+esc((item.sourceAmounts||[]).join(' + '))+'. Check this pack is enough.</p>':'')+'<button class="btn primary" id="added">Got it</button><button class="btn secondary" id="guidedSubstitute">'+icon('right-left')+' I bought something different</button><button class="btn secondary" id="skip">Skip</button><button class="text-action" id="stop">Back to full list</button></section>',
      'shop'
    );
    function next(status){
      q.done.push({name:item.name,status});
      if(status==='added'||status==='substituted'){st.ui.shopChecks=st.ui.shopChecks||{};st.ui.shopChecks[item.key]=true;}
      q.index++;MW.state.save();samePage(guidedShopping,'continuity-forward');
    }
    document.getElementById('added').onclick=()=>next(currentSub?'substituted':'added');
    document.getElementById('guidedSubstitute').onclick=()=>showShopSubstitution({shopKey:item.key,name:item.name,plannedAmount:item.inventoryAmount||item.amount,onSaved:()=>next('substituted'),onCleared:()=>samePage(guidedShopping)});
    document.getElementById('skip').onclick=()=>next('skipped');
    document.getElementById('stop').onclick=()=>go('shopreview');
    bindNav();
  }

  function deliveryCheck(){
    const st=s();
    const shop=st.week&&st.week.shop;if(!shop)return go('shopreview');
    if(!st.week.delivery||!Array.isArray(st.week.delivery.items)){
      const items=Object.keys(shop.groups||{}).flatMap(group=>(shop.groups[group]||[]).map(x=>{
        const key=group+'|'+x.name,substitution=MW.shopping&&MW.shopping.getSubstitution?MW.shopping.getSubstitution(key,st):null;
        return {key,sourceGroup:group,group:MW.retailGroups?MW.retailGroups.section(x.name,group):'Other',...x,substitution};
      }));
      MW.delivery.begin(items);
    }
    const delivery=s().week.delivery,items=delivery.items,missing=new Set(delivery.missingKeys||[]);
    const actual=Object.assign({},delivery.actualAmounts||{});let receiptSummary=delivery.receipt||null;const receiptFilled=new Map();
    const plannedParts=x=>MW.inventory.parseAmount(x.inventoryAmount||x.displayAmount)||((Number.isFinite(Number(x.needed))&&x.unit)?{value:Number(x.needed),unit:x.unit}:null);
    const expectedParts=x=>MW.inventory.parseAmount(x.substitution&&x.substitution.replacementAmount||x.inventoryAmount||x.displayAmount)||{value:'',unit:x.unit||'count'};
    const actualParts=x=>{const expected=expectedParts(x),parsed=MW.inventory.parseAmount(actual[x.key]||MW.inventory.formatAmount(expected));return parsed||expected;};
    const comparison=x=>{const need=plannedParts(x),a=actualParts(x);if(!need||!a)return null;if(!x.substitution)return a.unit===need.unit?a.value:null;if(x.substitution.comparable===false)return null;const converted=MW.inventory.valueInUnit(a,need.unit,x.substitution.replacementName);return Number.isFinite(converted)?converted:null;};
    const summary=()=>{let full=0,partial=0,none=0,swapped=0;for(const x of items){const need=plannedParts(x),a=actualParts(x),comp=comparison(x);if(missing.has(x.key)||Number(a.value)===0){none++;continue;}if(x.substitution&&comp==null){swapped++;continue;}if(need&&Number.isFinite(comp)&&comp+1e-9<need.value)partial++;else full++;}return {full,partial,none,swapped};};
    const row=x=>{const a=actualParts(x),isMissing=missing.has(x.key),sub=x.substitution,shown=sub?sub.replacementName:x.name,meta=sub?'Instead of '+ingredientName(x.name)+' · planned '+displayAmount(sub.plannedAmount||x.displayAmount):'Planned '+displayAmount(x.displayAmount)+' · '+(x.group||x.sourceGroup),state=isMissing?'Missing':sub?'Swapped':'Expected';return '<article class="delivery-item '+(isMissing?'missing ':'')+(sub?'substituted':'')+'" data-key="'+esc(x.key)+'"><button type="button" class="delivery-status" data-key="'+esc(x.key)+'"><span class="delivery-state">'+icon(isMissing?'xmark':sub?'right-left':'check')+'</span><span><strong>'+esc(ingredientName(shown))+'</strong><small>'+esc(meta)+'</small><small class="receipt-match-note"></small></span><em>'+state+'</em></button><label class="delivery-qty"><span>Actual quantity</span><span class="delivery-qty-control"><input class="delivery-actual" data-key="'+esc(x.key)+'" type="number" min="0" step="any" inputmode="decimal" value="'+esc(a.value)+'" '+(isMissing?'disabled':'')+'><b>'+esc(a.unit==='count'?'each':a.unit)+'</b></span></label></article>';};
    root.innerHTML=shell(
      '<section class="subpage-head"><button class="back-button" id="backDelivery">'+icon('arrow-left')+'</button><div><span class="eyebrow">SHOP CHECK</span><h1>What did you actually get?</h1><p>Everything starts with the expected pack quantity. Only change an amount when the pack was different, or mark it missing.</p></div></section>'+
      '<section class="receipt-reference"><div>'+icon('receipt')+'<span><strong>Scan a receipt</strong><small>Read a receipt on this device to prefill what you actually bought. Nothing is uploaded and nothing changes until you save.</small></span></div><label class="receipt-picker">Take photo or choose image<input id="receiptFile" type="file" accept="image/*" capture="environment"></label><div class="receipt-key"><span class="receipt-key-direct">Green: quantity read directly</span><span class="receipt-key-review">Amber: best guess, check it</span><span>Plain: expected quantity, not confirmed by receipt</span></div><div id="receiptPreview"></div></section>'+
      '<section class="delivery-summary">'+icon('boxes-stacked')+'<div><strong id="deliverySummary"></strong><small>The quantity you actually bought is added to your cupboard. Cooking deducts what you use, leaving the real excess for later.</small></div></section>'+
      '<div class="delivery-list quantity-delivery-list">'+items.map(row).join('')+'</div>'+
      '<div class="delivery-actions"><button class="btn primary" id="confirmDelivery">Save quantities & update inventory</button><button class="btn secondary" id="allDelivered">Reset to expected quantities</button></div>',
      'shop'
    );
    const refreshSummary=()=>{const x=summary(),el=document.getElementById('deliverySummary');if(el)el.textContent=x.full+' as expected'+(x.swapped?' · '+x.swapped+' swapped':'')+(x.partial?' · '+x.partial+' short':'')+(x.none?' · '+x.none+' missing':'');};
    const clearReceiptMark=(key,card)=>{receiptFilled.delete(key);if(!card)return;card.classList.remove('receipt-match-direct','receipt-match-review');const note=card.querySelector('.receipt-match-note');if(note){note.textContent='';note.removeAttribute('data-kind');}};
    const markReceipt=(key,card,match)=>{if(!card||!match)return;receiptFilled.set(key,match);card.classList.remove('receipt-match-direct','receipt-match-review');card.classList.add(match.needsReview?'receipt-match-review':'receipt-match-direct');const note=card.querySelector('.receipt-match-note');if(note){note.dataset.kind=match.needsReview?'review':'direct';note.textContent=match.needsReview?'Receipt match · check this quantity':'Receipt matched · quantity prefilled';}card.querySelector('.delivery-status em').textContent=match.needsReview?'Check':'Receipt';};
    const setMissing=(key,on)=>{const card=root.querySelector('.delivery-item[data-key="'+CSS.escape(key)+'"]');if(!card)return;clearReceiptMark(key,card);const x=items.find(v=>v.key===key),input=card.querySelector('.delivery-actual'),expected=expectedParts(x),sub=x.substitution;card.classList.toggle('missing',on);card.querySelector('.delivery-state').innerHTML=icon(on?'xmark':sub?'right-left':'check');card.querySelector('.delivery-status em').textContent=on?'Missing':sub?'Swapped':'Expected';input.disabled=on;if(on){missing.add(key);input.value='0';actual[key]='0 '+(expected.unit||'');}else{missing.delete(key);input.value=expected.value;actual[key]=MW.inventory.formatAmount(expected);}refreshSummary();};
    root.querySelectorAll('.delivery-status').forEach(b=>b.onclick=()=>setMissing(b.dataset.key,!missing.has(b.dataset.key)));
    root.querySelectorAll('.delivery-actual').forEach(input=>input.oninput=()=>{const key=input.dataset.key,x=items.find(v=>v.key===key),u=expectedParts(x).unit||'count';actual[key]=String(Math.max(0,Number(input.value)||0))+' '+(u==='count'?'each':u);missing.delete(key);const card=input.closest('.delivery-item');if(card){clearReceiptMark(key,card);card.classList.remove('missing');card.querySelector('.delivery-state').innerHTML=icon(x.substitution?'right-left':'check');card.querySelector('.delivery-status em').textContent='Edited';}refreshSummary();});
    document.getElementById('allDelivered').onclick=()=>{for(const x of items){const p=expectedParts(x);actual[x.key]=MW.inventory.formatAmount(p);missing.delete(x.key);const card=root.querySelector('.delivery-item[data-key="'+CSS.escape(x.key)+'"]');if(card){clearReceiptMark(x.key,card);const input=card.querySelector('.delivery-actual');input.disabled=false;input.value=p.value;card.classList.remove('missing');card.querySelector('.delivery-state').innerHTML=icon(x.substitution?'right-left':'check');card.querySelector('.delivery-status em').textContent=x.substitution?'Swapped':'Expected';}}refreshSummary();};
    const receipt=document.getElementById('receiptFile');
    const fileDataUrl=file=>new Promise((resolve,reject)=>{const fr=new FileReader();fr.onload=()=>resolve(String(fr.result||''));fr.onerror=()=>reject(fr.error||new Error('The receipt image could not be read.'));fr.readAsDataURL(file);});
    const setActual=(key,value,match)=>{const input=root.querySelector('.delivery-actual[data-key="'+CSS.escape(key)+'"]');if(!input||!value)return false;const parsed=MW.inventory.parseAmount(value);if(!parsed)return false;const x=items.find(v=>v.key===key),expected=expectedParts(x);if(expected.unit!==parsed.unit)return false;input.value=parsed.value;actual[key]=MW.inventory.formatAmount(parsed);missing.delete(key);const card=input.closest('.delivery-item');if(card){card.classList.remove('missing');card.querySelector('.delivery-state').innerHTML=icon(x.substitution?'right-left':'check');if(match)markReceipt(key,card,match);else card.querySelector('.delivery-status em').textContent=x.substitution?'Swapped':'Expected';}return true;};
    const receiptItems=items.map(x=>x.substitution?{...x,name:x.substitution.replacementName,displayAmount:x.substitution.replacementAmount,inventoryAmount:x.substitution.replacementAmount}:x);
    receipt.onchange=async()=>{const file=receipt.files&&receipt.files[0],host=document.getElementById('receiptPreview');host.innerHTML='';if(!file)return;const url=URL.createObjectURL(file),img=document.createElement('img');img.src=url;img.alt='Receipt preview';img.onload=()=>URL.revokeObjectURL(url);host.appendChild(img);const status=document.createElement('div');status.className='receipt-scan-status';status.innerHTML='<span class="loading-spinner"></span><strong>Reading receipt on this device…</strong>';host.appendChild(status);try{const nativeOcr=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.CapacitorPluginMlKitTextRecognition;let result;if(nativeOcr&&typeof nativeOcr.detectText==='function'){const dataUrl=await fileDataUrl(file),base64Image=String(dataUrl).replace(/^data:image\/[^;]+;base64,/i,'');result=await nativeOcr.detectText({base64Image,rotation:0});}else if(MW.webOcr&&typeof MW.webOcr.detectText==='function'){result=await MW.webOcr.detectText(file,progress=>{const pct=Math.round((Number(progress.progress)||0)*100);if(pct>0)status.innerHTML='<span class="loading-spinner"></span><strong>Reading receipt on this device… '+pct+'%</strong>';});}else throw new Error('Receipt text reading is not available in this build. You can still enter the quantities below.');const parsed=MW.receipt.parse(result&&result.text||''),matched=MW.receipt.match(receiptItems,parsed);let applied=0;for(const m of matched.matches)if(setActual(m.key,m.actualAmount,m))applied++;const review=matched.matches.filter(x=>x.needsReview).length,direct=matched.matches.length-review;receiptSummary={scannedAt:new Date().toISOString(),source:'on-device-ocr',total:Number.isFinite(parsed.total)?parsed.total:null,itemLines:parsed.itemLineCount,matched:matched.matches.length,directMatches:direct,reviewMatches:review,unmatchedReceipt:matched.unmatchedReceipt.length,matchDetails:matched.matches.map(x=>({key:x.key,receiptLabel:x.receiptLabel,score:x.score,amountBasis:x.amountBasis,needsReview:x.needsReview}))};status.innerHTML='<i class="fa-solid fa-circle-check"></i><div><strong>'+applied+' shopping item'+(applied===1?'':'s')+' prefilled</strong><small>'+(Number.isFinite(parsed.total)?'Receipt total '+money(parsed.total)+' · ':'')+direct+' green match'+(direct===1?'':'es')+' · '+review+' amber check'+(review===1?'':'s')+' · '+matched.unmatchedReceipt.length+' unmatched receipt line'+(matched.unmatchedReceipt.length===1?'':'s')+'. Green rows came directly from the receipt. Amber rows used a likely match or known pack size, so check those before saving.</small></div>';refreshSummary();}catch(error){status.innerHTML='<i class="fa-solid fa-circle-info"></i><div><strong>Receipt kept as a reference</strong><small>'+esc(error&&error.message||'Text could not be read automatically.')+'</small></div>';}};
    document.getElementById('backDelivery').onclick=()=>go('shopreview');
    document.getElementById('confirmDelivery').onclick=e=>withLoading(e.currentTarget,()=>{MW.delivery.reconcile({missingKeys:[...missing],actualAmounts:actual,receipt:receiptSummary});go('shopreview');});
    refreshSummary();bindNav();
  }

  function dayEditor(dayKey){
    const st=s();
    const d=day(dayKey);
    const slot=st.week&&st.week.meals.find(x=>x.day===dayKey);
    const r=slot?recipe(slot.recipeId):null;
    const dinnerOn=Boolean(slot);
    const lunchOn=(st.plan.lunchDays||[]).includes(dayKey);
    const lunch=MW.LUNCHES.find(x=>x.id===st.week.lunchId);
    root.innerHTML=shell(
      '<section class="subpage-head"><button class="back-button" id="back">'+icon('arrow-left')+'</button><div><span class="eyebrow">YOUR WEEK</span><h1>'+esc(d.label)+'</h1></div></section>'+
      '<section class="day-editor">'+
        '<div class="day-setting"><div><strong>Dinner</strong><small>'+(dinnerOn?(r?esc(r.title):'Planned'):'No dinner planned')+'</small></div><label class="toggle"><input id="dinnerToggle" type="checkbox" '+(dinnerOn?'checked':'')+'><span></span></label></div>'+
        (dinnerOn&&r?'<button class="day-meal-card" id="changeDinner">'+recipePhoto(r,'day-meal-photo',r.title)+'<span><strong>'+esc(r.title)+'</strong><small>'+esc(timeText(r))+'</small></span><i class="fa-solid fa-chevron-right"></i></button><div class="day-meal-actions"><button class="day-random" id="randomDinner">'+icon('dice')+'<span><strong>Choose one for me</strong><small>Swap '+esc(d.label)+' for another suitable dinner</small></span></button></div>':'')+
        '<div class="day-setting"><div><strong>Lunch</strong><small>'+(lunchOn&&lunch?esc(lunch.title):'No planned lunch')+'</small></div><label class="toggle"><input id="lunchToggle" type="checkbox" '+(lunchOn?'checked':'')+'><span></span></label></div>'+
      '</section>'+
      '<p class="micro-copy">Turn a meal off when you are eating out, using leftovers or simply do not need it planned.</p>',
      'plan'
    );
    document.getElementById('back').onclick=()=>go('week');
    document.getElementById('dinnerToggle').onchange=e=>{MW.planner.toggleDinner(dayKey,e.target.checked);samePage(()=>dayEditor(dayKey));};
    document.getElementById('lunchToggle').onchange=e=>{MW.planner.toggleLunch(dayKey,e.target.checked);samePage(()=>dayEditor(dayKey));};
    const change=document.getElementById('changeDinner');
    if(change) change.onclick=()=>swap(dayKey);
    const random=document.getElementById('randomDinner');
    if(random) random.onclick=e=>withLoading(e.currentTarget,()=>{
      const current=slot&&recipe(slot.recipeId);
      const pick=current&&MW.planner.randomAlternative(current.id);
      if(pick) MW.planner.replace(dayKey,pick.id);
      samePage(()=>dayEditor(dayKey),'continuity-forward');
    });
    bindNav();
  }

  async function library(){
    const st=s(),target=st.ui.libraryTargetDay||'',local=MW.RECIPES.slice(),profile=foodProfile();
    const filters=[['all','All'],['quick','Quick'],['lighter','Lighter'],['chicken','Chicken'],['beef','Beef'],['pork','Pork'],['fish','Fish'],['vegetarian','Vegetarian'],['vegan','Vegan'],['pescatarian','Pescatarian'],['pasta','Pasta'],['rice','Rice'],['curry','Curry'],['air-fryer','Air fryer'],['slow-cooker','Slow cooker']];
    const defaults=[];if(['vegetarian','vegan','pescatarian'].includes(profile.diet))defaults.push(profile.diet);for(const g of profile.goals||[])if(['quick','lighter'].includes(g)&&!defaults.includes(g))defaults.push(g);
    const profileKey=JSON.stringify({diet:profile.diet,goals:[...(profile.goals||[])].sort(),allergens:[...(profile.allergens||[])].sort(),avoid:[...(st.household.restrictions||[])].sort()});
    if(st.ui.libraryFilterProfileKey!==profileKey){st.ui.libraryFilters=defaults.slice();st.ui.libraryFilterProfileKey=profileKey;st.ui.libraryLimit=80;MW.state.save();}
    const active=new Set(Array.isArray(st.ui.libraryFilters)?st.ui.libraryFilters:defaults),locked=new Set(['vegetarian','vegan','pescatarian'].includes(profile.diet)?[profile.diet]:[]);
    const hay=r=>[r.title,r.subtitle,r.category,...(r.tags||[]),...(r.requiredEquipment||[]),...(r.ingredients||[]).map(x=>x[1])].join(' ').toLowerCase();
    const filterMatch=(r,key)=>{const t=hay(r);if(key==='quick')return Number(r.time||999)<=30||/\bquick\b|speedy|10.minute|20.minute/.test(t);if(key==='lighter')return /calorie smart|lighter|under 600|under 650|healthy options/.test(t)||MW.food.analyse(r).vegCount>=3;if(key==='chicken')return /\bchicken\b/.test(t);if(key==='beef')return /\bbeef\b|steak/.test(t);if(key==='pork')return /\bpork\b|sausage|bacon|chorizo|ham\b/.test(t);if(key==='fish')return /salmon|cod\b|prawn|tuna|basa|haddock|pollock|sea bass|fish\b/.test(t);if(['vegetarian','vegan','pescatarian'].includes(key))return MW.food.dietAllows(r,key);if(key==='pasta')return /pasta|spaghetti|linguine|rigatoni|penne|orzo|tortelloni|macaroni|tagliatelle/.test(t);if(key==='rice')return /\brice\b|biryani|pilaf|risotto/.test(t);if(key==='curry')return /curry|korma|tikka|dhal|dal\b|masala/.test(t);if(key==='air-fryer')return /air[ -]?fryer/.test(t);if(key==='slow-cooker')return /slow[ -]?cooker/.test(t);return true;};
    const savedMatch=()=>active.size===defaults.length&&defaults.every(x=>active.has(x));
    root.innerHTML=shell('<section class="subpage-head library-head"><button class="back-button" id="libraryBack">'+icon('arrow-left')+'</button><div><span class="eyebrow">RECIPE LIBRARY</span><h1>'+local.length+' recipes</h1><p>Published recipes with finished dish photography</p></div></section>'+
      '<form class="library-search" id="librarySearchForm"><i class="fa-solid fa-magnifying-glass"></i><input id="recipeSearch" value="'+esc(st.ui.libraryQuery||'')+'" placeholder="Search recipes or ingredients" inputmode="search" enterkeyhint="search"></form>'+
      '<div class="library-filter-head"><span class="eyebrow">FILTERS</span><button type="button" id="savedLibraryFilters" class="saved-filter-reset '+(savedMatch()?'is-default':'')+'">'+icon('sliders')+' Saved preferences</button></div>'+
      '<div class="category-tabs library-cats">'+filters.map(([key,label])=>'<button type="button" class="cat-tab '+((key==='all'?active.size===0:active.has(key))?'active ':'')+(locked.has(key)?'locked':'')+'" data-cat="'+key+'" '+(locked.has(key)?'disabled':'')+'>'+label+'</button>').join('')+'</div>'+
      (target?'<div class="library-target">'+icon('calendar-day')+' Choosing dinner for <strong>'+esc(day(target).label)+'</strong></div>':'')+'<div id="libraryResults"></div>','cook');
    const resultsHost=document.getElementById('libraryResults'),search=document.getElementById('recipeSearch');
    const renderResults=()=>{const query=String(search.value||'').trim().toLowerCase();st.ui.libraryQuery=search.value;st.ui.libraryFilters=[...active];MW.state.save();const allResults=local.filter(r=>{const allowed=MW.planner?MW.planner.allowed(r):(!MW.food||MW.food.allowed(r,st.foodProfile));return allowed&&(!query||hay(r).includes(query))&&[...active].every(key=>filterMatch(r,key));});const limit=Math.max(80,Number(st.ui.libraryLimit)||80),results=allResults.slice(0,limit);resultsHost.innerHTML='<div class="library-count"><strong>'+results.length+'</strong> of <strong>'+allResults.length+'</strong> matching recipes shown</div><div class="library-grid">'+results.map(r=>'<button class="library-card" data-id="'+r.id+'">'+recipePhoto(r,'library-photo',r.title)+'<span><strong>'+esc(r.title)+'</strong><small>'+esc(r.subtitle||'Recipe')+'</small></span></button>').join('')+'</div>'+(!results.length?'<div class="empty-state">'+icon('magnifying-glass')+'<h2>No matches</h2><p>Try another search or filter.</p></div>':'')+(results.length<allResults.length?'<button class="refresh-library" id="loadMoreRecipes">'+icon('plus')+' Show 80 more</button>':'');resultsHost.querySelectorAll('.library-card').forEach(b=>b.onclick=()=>{if(target){if(MW.planner.replace(target,b.dataset.id)){st.ui.libraryTargetDay='';MW.state.save();go('day:'+target);}}else go('recipe:'+b.dataset.id);});const more=document.getElementById('loadMoreRecipes');if(more)more.onclick=()=>{st.ui.libraryLimit=(Number(st.ui.libraryLimit)||80)+80;MW.state.save();renderResults();};updateControlNames();};
    const repaintFilters=()=>{root.querySelectorAll('.library-cats .cat-tab').forEach(b=>b.classList.toggle('active',b.dataset.cat==='all'?active.size===0:active.has(b.dataset.cat)));document.getElementById('savedLibraryFilters').classList.toggle('is-default',savedMatch());};
    let timer;search.addEventListener('input',()=>{clearTimeout(timer);st.ui.libraryLimit=80;timer=setTimeout(renderResults,120);});document.getElementById('librarySearchForm').addEventListener('submit',e=>{e.preventDefault();clearTimeout(timer);st.ui.libraryLimit=80;renderResults();search.focus();});
    root.querySelectorAll('.library-cats .cat-tab').forEach(b=>b.onclick=()=>{const key=b.dataset.cat;if(key==='all'){active.clear();}else{if(locked.has(key))return;if(active.has(key))active.delete(key);else active.add(key);}st.ui.libraryLimit=80;repaintFilters();renderResults();});
    document.getElementById('savedLibraryFilters').onclick=()=>{active.clear();defaults.forEach(x=>active.add(x));st.ui.libraryLimit=80;repaintFilters();renderResults();};
    document.getElementById('libraryBack').onclick=()=>{st.ui.libraryTargetDay='';MW.state.save();go(target?'day:'+target:'recipes',{motion:'drill-back'});};renderResults();bindNav();
  }

  function recipes(){
    const st=s();
    const meals=(st.week.meals||[]).map(m=>({...m,recipe:recipe(m.recipeId)})).filter(x=>x.recipe);
    const onlineCount=MW.onlineRecipes?MW.onlineRecipes.load().recipes.length:0;
    const delivery=st.week&&st.week.delivery;
    const deliveryReminder=st.week&&st.week.status==='order-placed'
      ?'<button class="delivery-notice cook-delivery" id="recipeDelivery">'+icon('truck-ramp-box')+'<span><strong>When the shopping arrives</strong><small>Tell My Week what was missing so your inventory stays accurate.</small></span><i class="fa-solid fa-chevron-right"></i></button>'
      :delivery&&delivery.confirmed&&delivery.missingKeys&&delivery.missingKeys.length
        ?'<button class="delivery-notice has-missing cook-delivery" id="recipeDelivery">'+icon('triangle-exclamation')+'<span><strong>'+delivery.missingKeys.length+' delivery item'+(delivery.missingKeys.length===1?'':'s')+' missing</strong><small>Review the delivery if anything changes.</small></span><i class="fa-solid fa-chevron-right"></i></button>'
        :'';
    const recipeContent=meals.length
      ?'<div class="recipe-grid">'+meals.map(m=>{const labels=MW.food?MW.food.labelsFor(m.recipe):[];return '<button class="recipe-card openrecipe" data-id="'+m.recipe.id+'">'+recipePhoto(m.recipe,'recipe-card-photo',m.recipe.title)+'<div><span class="meal-day">'+esc(day(m.day).label)+'</span><h2>'+esc(m.recipe.title)+'</h2><p>'+esc(m.recipe.subtitle)+'</p>'+(labels.length?'<div class="recipe-labels">'+labels.map(x=>'<em>'+esc(x)+'</em>').join('')+'</div>':'')+'<small>'+esc(timeText(m.recipe))+' · '+(m.recipe.scaleSafe===false?'Source quantities':countLabel(st.household.people,'person','people'))+'</small></div></button>';}).join('')+'</div>'
      :'<section class="recipes-empty-state"><span class="empty-state-icon">'+icon('utensils')+'</span><span class="eyebrow">NOTHING TO COOK YET</span><h2>Your planned dinners will appear here</h2><p>Plan this week to get your chosen recipes, ingredients and step by step cooking guides in one place.</p><div><button class="btn primary" id="planRecipesWeek">Plan this week</button><button class="btn secondary" id="browseRecipesEmpty">Browse all recipes</button></div></section>';
    root.innerHTML=shell(
      '<section class="page-head"><div><span class="eyebrow">COOK</span><h1>Your recipes</h1></div><button class="library-shortcut" id="openLibrary">'+icon('magnifying-glass')+'<span>Library'+(onlineCount?' · '+onlineCount:'')+'</span></button></section>'+
      deliveryReminder+
      recipeContent,
      'cook'
    );
    root.querySelectorAll('.openrecipe').forEach(b=>b.onclick=()=>go('recipe:'+b.dataset.id));
    document.getElementById('openLibrary').onclick=()=>{st.ui.libraryTargetDay='';MW.state.save();go('library');};
    const planRecipesWeek=document.getElementById('planRecipesWeek');
    if(planRecipesWeek) planRecipesWeek.onclick=e=>withLoading(e.currentTarget,()=>{
      if((st.plan.dinnerDays||[]).length) MW.planner.regenerateAll({planMode:'manual-full'});
      else return go('settings');
      recipes();
    });
    const browseRecipesEmpty=document.getElementById('browseRecipesEmpty');
    if(browseRecipesEmpty) browseRecipesEmpty.onclick=()=>{st.ui.libraryTargetDay='';MW.state.save();go('library');};
    const recipeDelivery=document.getElementById('recipeDelivery');
    if(recipeDelivery) recipeDelivery.onclick=()=>go('delivery');
    bindNav();
  }


  function recipeBlocked(r){
    if(!MW.planner.allowed(r)){
      root.innerHTML=shell('<section class="empty-state"><h1>This recipe does not match your current settings</h1><p>Food exclusions, diet, allergy verification or equipment requirements prevent it being recommended. Your settings have not been relaxed.</p><button class="btn primary" id="blockedBack">Back to your week</button></section>','cook');
      document.getElementById('blockedBack').onclick=()=>go('week');bindNav();return true;
    }
    return false;
  }
  function recipeView(id){
    const r=recipe(id);if(!r) return go('recipes');if(recipeBlocked(r)) return;
    const st=s();
    const people=MW.preparation.portions(r);
    const factor=r.scaleSafe===false?1:people/(r.servings||2);
    const mealCost=people?(r.isLunch?'~'+money(recipeCost(r,people))+' ingredients':recipeCostLabel(r,people)):'';
    const meta=[timeText(r),r.scaleSafe===false?'Source quantities':(r.isLunch?countLabel(people,'planned lunch','planned lunches'):countLabel(people,'portion','portions')),mealCost].filter(Boolean);
    const tips=r.isLunch?[]:tipsForRecipe(r);
    const toolsNeeded=cookingEquipment(r);
    const selectedAllergens=(st.foodProfile&&st.foodProfile.allergens)||[];
    root.innerHTML=shell(
      '<section class="recipe-hero '+(r.isLunch?'lunch-recipe-hero ':'')+(!displayRecipeImage(r)?'text-only':'')+'">'+recipePhoto(r,'recipe-hero-photo',r.title)+'<div class="recipe-hero-overlay"><button class="back-on-photo" id="back">'+icon('arrow-left')+'</button><div><span class="eyebrow light">'+esc(r.online?'ONLINE RECIPE':'MY WEEK RECIPE')+'</span><h1>'+esc(r.title)+'</h1><p>'+esc(r.subtitle)+'</p><div class="hero-meta">'+meta.map(x=>'<span>'+esc(x)+'</span>').join('')+'</div></div></div></section>'+
      (r.isLunch?(()=>{const q=MW.preparation.quantities(r),days=(st.plan.lunchDays||[]).length,eaters=Math.max(1,Number(st.plan.lunchPeople)||1),equation=days+' lunch day'+(days===1?'':'s')+' × '+eaters+' '+(eaters===1?'person':'people')+' = '+q.planned+' '+(q.planned===1?'lunch':'lunches');return '<section class="preparation-note lunch-plan-note lunch-plan-compact"><span class="eyebrow">YOUR LUNCH PLAN · PREP AT HOME</span><h2>'+q.planned+' '+(q.planned===1?'lunch':'lunches')+' this week</h2><div class="lunch-plan-equation">'+esc(equation)+'</div></section>';})():'')+
      '<button class="start-cooking" id="startCooking" '+(r.isLunch&&!people?'disabled':'')+'>'+icon('play')+'<span><strong>'+(r.isLunch?'Prep at home step by step':'Cook step by step')+'</strong><small>'+(r.isLunch?'Work only needs a microwave or kettle':'Big instructions, one step at a time')+'</small></span><i class="fa-solid fa-chevron-right"></i></button>'+
      (r.online?'<div class="source-note">'+icon('circle-info')+'<span>Recipe from '+esc(r.source||'online source')+'. Ingredient quantities are kept as published.</span></div>':'')+
      ((!r.online&&r.sourcedCatalogue&&r.sourceUrl)?'<a class="photo-credit" href="'+esc(r.sourceUrl)+'" target="_blank" rel="noopener">Recipe source · '+esc(r.source||'Published recipe')+'</a>':((!r.online&&r.imageSource&&displayRecipeImage(r))?'<a class="photo-credit" href="'+esc(r.imageSource)+'" target="_blank" rel="noopener">Photo source · '+esc(r.imageLicense||'Source')+'</a>':''))+
      ((MW.equipment&&MW.equipment.requirements(r).length)?'<div class="equipment-note">'+icon('utensils')+'<span>Requires '+esc(MW.equipment.requirements(r).map(MW.equipment.label).join(', '))+'.</span></div>':'')+
      (selectedAllergens.length?'<div class="allergen-note">'+icon('triangle-exclamation')+'<span>Allergen filters use listed ingredients only. Check packets, labels and cross-contamination information.</span></div>':'')+
      '<section class="recipe-section ingredients-section"><div class="section-title"><div><span class="eyebrow">INGREDIENTS</span><h2>What you need</h2></div></div>'+r.ingredients.map((x,ingredientIndex)=>{const practical=practicalQuantity(r,ingredientIndex,factor),planned=practical?practical.amount:(MW.preparation&&MW.preparation.scaleAmount?MW.preparation.scaleAmount(r,x[0],x[1],factor):(r.scaleSafe===false?x[0]:MW.shopping.scaleAmount(x[0],factor))),shown=substitutedIngredient(x[1],planned),approximate=!shown.substitution&&Boolean(practical&&practical.approximate),stocked=MW.inventory&&MW.inventory.covers(shown.name,shown.amount),subNote=shown.substitution?'<small class="ingredient-substitution-note">'+icon('right-left')+' Instead of '+esc(ingredientName(shown.originalName))+' · recipe calls for '+esc(displayAmount(shown.originalAmount))+(shown.comparable?'':' · quantity comparison needs judgement')+'</small>':'';return '<div class="ingredient-row '+(stocked?'from-cupboard ':'')+(shown.substitution?'has-substitution':'')+'"><span>'+esc(ingredientName(shown.name))+(stocked?'<small>In your cupboard</small>':'')+subNote+'</span><strong>'+esc(cookingAmount(shown.amount,approximate))+'</strong><button type="button" class="ingredient-more" data-ingredient="'+esc(x[1])+'" aria-label="More options for '+esc(ingredientName(x[1]))+'">'+icon('ellipsis-vertical')+'</button></div>';}).join('')+'</section>'+
      '<section class="recipe-section equipment-section"><div class="section-title"><div><span class="eyebrow">EQUIPMENT</span><h2>Get these ready</h2></div></div><div class="cook-equipment-list">'+toolsNeeded.map(x=>'<span>'+icon('check')+esc(x)+'</span>').join('')+'</div></section>'+
      '<section class="recipe-section method-section"><div class="section-title"><div><span class="eyebrow">METHOD</span><h2>Cook it</h2></div></div><div class="steps">'+r.steps.map((x,i)=>{const used=stepIngredients(r,x,factor,i);return '<div class="step"><span>'+(i+1)+'</span><div><p>'+esc(displayInstruction(x,r,factor,people))+'</p>'+(used.length?'<div class="step-amounts">'+used.map(v=>{const shown=substitutedIngredient(v.name,v.amount),approximate=!shown.substitution&&Boolean(v.practicalApproximate);return '<em>'+esc(cookingAmount(shown.amount,approximate))+' '+esc(ingredientName(shown.name))+(shown.substitution?' '+icon('right-left'):'')+'</em>';}).join('')+'</div>':'')+'</div></div>';}).join('')+'</div></section>'+
      (tips.length?'<section class="recipe-section tips-section"><div class="section-title"><div><span class="eyebrow">HELPFUL</span><h2>Tips & tricks</h2></div></div>'+tips.map(t=>'<div class="tip-row">'+icon('lightbulb')+'<span>'+esc(t)+'</span></div>').join('')+'</section>':''),
      'cook'
    );
    document.getElementById('back').onclick=()=>{if(!window.MyWeekAndroidBack())go('recipes',{motion:'drill-back'});};
    bindIngredientActions(root);
    document.getElementById('startCooking').onclick=()=>{MW.preparation.begin(r,people);go('cookprep:'+r.id);};
    bindNav();
  }

  function cookPrep(id){
    const r=recipe(id);if(!r) return go('recipes');if(recipeBlocked(r)) return;
    if(!MW.preparation.portions(r))return go('recipe:'+id);
    MW.preparation.begin(r,MW.preparation.portions(r));
    const st=s();
    const people=MW.preparation.portions(r);
    const factor=r.scaleSafe===false?1:people/(r.servings||2);
    const ingredients=prepIngredients(r,factor);
    const equipment=cookingEquipment(r);
    root.innerHTML=
      '<main class="cook-screen cook-prep-screen">'+
        '<header class="cook-topbar">'+
          '<button class="cook-close" id="closePrep" aria-label="Close cooking mode">'+icon('xmark')+'</button>'+
          '<div class="cook-title"><span>Before you start</span><strong>'+esc(r.title)+'</strong></div>'+
          '<span class="cook-count prep-count">'+icon('list-check')+'</span>'+
        '</header>'+
        '<section class="cook-prep-scroll">'+
          '<article class="cook-prep-intro">'+
            '<span class="cook-step-kicker">GET READY FIRST</span>'+
            '<h1>Collect everything before you cook</h1>'+
            '<p>Get these ingredients and bits of equipment out now. Then Step 1 can start without hunting through cupboards while something is already on the heat.</p>'+
          '</article>'+
          (r.isLunch?(()=>{const q=MW.preparation.quantities(r),days=(st.plan.lunchDays||[]).length,eaters=Math.max(1,Number(st.plan.lunchPeople)||1),equation=days+' lunch day'+(days===1?'':'s')+' × '+eaters+' '+(eaters===1?'person':'people')+' = '+q.planned+' '+(q.planned===1?'lunch':'lunches');return '<section class="preparation-note lunch-plan-note lunch-plan-compact"><span class="eyebrow">WEEKLY LUNCH PREP · AT HOME</span><h2>'+people+' '+(people===1?'lunch':'lunches')+' to prepare</h2><div class="lunch-plan-equation">'+esc(equation)+'</div>'+(q.prepared?'<p class="lunch-plan-summary">'+q.prepared+' already prepared · '+q.remaining+' remaining</p>':'')+'<details class="lunch-storage-note"><summary>Workday storage & reheating</summary><p>'+esc(r.storageNote)+'</p>'+(r.restText?'<p>'+esc(r.restText)+'</p>':'')+'</details></section>';})():'')+
          '<section class="cook-prep-card">'+
            '<div class="cook-prep-heading">'+icon('basket-shopping')+'<div><span>Ingredients</span><strong>Get these out</strong></div></div>'+
            '<div class="cook-prep-list">'+ingredients.map(v=>'<div class="'+(v.substitution?'has-substitution':'')+'"><span>'+esc(ingredientName(v.name))+(v.substitution?'<small>'+icon('right-left')+' Instead of '+esc(ingredientName(v.originalName))+'</small>':'')+'</span><strong>'+esc(cookingAmount(v.amount,v.practicalApproximate))+'</strong></div>').join('')+'</div>'+
          '</section>'+
          '<section class="cook-prep-card">'+
            '<div class="cook-prep-heading">'+icon('utensils')+'<div><span>Equipment</span><strong>Have this ready</strong></div></div>'+
            '<div class="cook-equipment-list">'+equipment.map(x=>'<span>'+icon('check')+esc(x)+'</span>').join('')+'</div>'+
          '</section>'+
        '</section>'+
        '<nav class="cook-controls prep-controls" aria-label="Start cooking">'+
          '<button class="cook-control secondary" id="backToRecipe">'+icon('arrow-left')+'<span>Recipe</span></button>'+
          '<button class="cook-control primary" id="beginSteps"><span>Start Step 1</span>'+icon('arrow-right')+'</button>'+
        '</nav>'+
        globalNav('cook')+
      '</main>';
    document.body.classList.add('cooking-active');
    document.getElementById('closePrep').onclick=()=>leaveCookingFlow('recipe:'+id);
    document.getElementById('backToRecipe').onclick=()=>leaveCookingFlow('recipe:'+id);
    document.getElementById('beginSteps').onclick=()=>go('cookstep:'+id+':0');
    bindNav();
  }

  function cookStep(id,index){
    const r=recipe(id);if(!r) return go('recipes');if(recipeBlocked(r)) return;
    const st=s();
    const active=st.week&&st.week.preparation;
    if(!active||active.recipeId!==id||active.finished)return go('cookprep:'+id);
    const steps=r.steps||[];
    if(!steps.length) return go('recipe:'+id);
    index=Math.max(0,Math.min(index,steps.length-1));

    const people=MW.preparation.portions(r);
    const factor=r.scaleSafe===false?1:people/(r.servings||2);
    const currentStep=steps[index];
    const used=stepIngredients(r,currentStep,factor,index);
    const stepSwapNotes=stepSubstitutionNotes(r,currentStep,index);
    const stepMeta=r&&Array.isArray(r.sourceStepImages)&&r.sourceStepImages[index]||null;
    const exactStep=stepMeta&&stepMeta.src||'';
    const originalStep=stepMeta&&stepMeta.originalSrc||'';
    const localStep=r&&MW.sourcedImageMap&&MW.sourcedImageMap.steps&&MW.sourcedImageMap.steps[r.id]&&MW.sourcedImageMap.steps[r.id][index]||'';
    const safeStepFallback=MW.cookingVisuals&&MW.cookingVisuals.fallbackForStep?MW.cookingVisuals.fallbackForStep(currentStep,index,r):null;
    const stepCandidates=[...new Set([localStep,helloFreshMirror(exactStep,900),exactStep,helloFreshMirror(originalStep,900),originalStep,safeStepFallback&&safeStepFallback.src].filter(Boolean))];
    const stepTitle=String(stepMeta&&stepMeta.caption||('Step '+(index+1))).trim();
    const displayedStep=displayInstruction(currentStep,r,factor,people);
    const instructionParts=String(displayedStep).split(/(?<=[.!?])\s+(?=[A-Z])/)
      .map(x=>x.trim()).filter(Boolean);
    const rawFacts=[
      ...(String(currentStep).match(/\b\d{2,3}°C(?:\/\d{2,3}°C fan)?(?:\/gas mark \d+)?/gi)||[]),
      ...(String(currentStep).match(/\b\d+(?:-\d+)?\s*(?:mins?|minutes?|hours?|hrs?|seconds?|secs?)\b/gi)||[]),
      ...(String(currentStep).match(/\b\d+(?:\.\d+)?\s*(?:cm|mm)\b/gi)||[])
    ].map(x=>x.replace(/\s+/g,' ').trim());
    const stepFacts=[...new Set(rawFacts.map(x=>x.toLowerCase()))].map(x=>rawFacts.find(y=>y.toLowerCase()===x)).slice(0,4);
    const pct=Math.round(((index+1)/steps.length)*100);
    const last=index===steps.length-1;
    const tip=tipForStep(r,currentStep);

    root.innerHTML=
      '<main class="cook-screen">'+
        '<header class="cook-topbar">'+
          '<button class="cook-close" id="closeCook" aria-label="Close cooking mode">'+icon('xmark')+'</button>'+
          '<div class="cook-title"><span>Step '+(index+1)+' of '+steps.length+'</span><strong>'+esc(r.title)+'</strong></div>'+
          '<span class="cook-count">'+(index+1)+'/'+steps.length+'</span>'+
        '</header>'+
        '<div class="cook-progress-track" aria-hidden="true"><span style="width:'+pct+'%"></span></div>'+
        '<section class="cook-scroll '+(stepCandidates.length?'has-visual':'no-visual')+'" id="cookScroll">'+
          '<article class="cook-step-summary">'+
            '<div class="cook-step-heading"><span class="cook-step-badge">'+(index+1)+'</span><div><span class="cook-step-kicker">Do this now</span><strong>Step '+(index+1)+' of '+steps.length+'</strong></div></div>'+
            '<h1>'+esc(stepTitle)+'</h1>'+
            (stepFacts.length?'<div class="cook-step-facts">'+stepFacts.map(x=>'<span>'+esc(x)+'</span>').join('')+'</div>':'')+
          '</article>'+
          (stepCandidates.length?
            '<aside class="cook-visual-panel">'+photo(stepCandidates[0],'cook-photo',stepTitle,stepCandidates.slice(1))+'</aside>'
          :'')+
          '<article class="cook-instruction">'+
            (stepSwapNotes.length?'<div class="cook-substitution-banner">'+icon('right-left')+'<div><strong>Your shop swap applies here</strong>'+stepSwapNotes.map(x=>'<small>Use '+esc(ingredientName(x.replacementName))+' instead of '+esc(ingredientName(x.originalName))+'.</small>').join('')+'</div></div>':'')+
            '<div class="cook-action-list">'+instructionParts.map((part,i)=>'<div><span>'+(i+1)+'</span><p>'+esc(part)+'</p></div>').join('')+'</div>'+
            (used.length?
              '<div class="cook-ingredients"><span>For this step</span>'+
                used.map(v=>{const shown=substitutedIngredient(v.name,v.amount),approximate=!shown.substitution&&Boolean(v.practicalApproximate);const splitPrepared=v.reused&&Number(v.multiplier)<1;const label=v.reused?(splitPrepared?esc(cookingAmount(shown.amount,approximate))+' '+esc(ingredientName(shown.name))+' · prepared earlier':esc(ingredientName(shown.name))+' · prepared earlier'):esc(cookingAmount(shown.amount,approximate))+' '+esc(ingredientName(shown.name));return '<strong class="'+(shown.substitution?'has-substitution':'')+'">'+label+(shown.substitution?' '+icon('right-left'):'')+'</strong>';}).join('')+
              '</div>'
            :'')+
            (tip?'<div class="cook-tip">'+icon('lightbulb')+'<span><strong>Top tip</strong><small>'+esc(tip)+'</small></span></div>':'')+
          '</article>'+
        '</section>'+
        '<nav class="cook-controls" aria-label="Cooking steps">'+
          '<button class="cook-control secondary" id="prevStep" '+(index===0?'disabled':'')+'>'+icon('arrow-left')+'<span>Previous</span></button>'+
          '<button class="cook-control primary" id="nextStep"><span>'+(last?'Finish':'Next')+'</span>'+(!last?icon('arrow-right'):icon('check'))+'</button>'+
        '</nav>'+
        globalNav('cook')+
      '</main>';

    document.body.classList.add('cooking-active');
    document.getElementById('closeCook').onclick=()=>leaveCookingFlow('recipe:'+id);
    document.getElementById('prevStep').onclick=()=>{
      if(index>0) go('cookstep:'+id+':'+(index-1));
    };
    document.getElementById('nextStep').onclick=()=>{
      if(index<steps.length-1) go('cookstep:'+id+':'+(index+1));
      else{
        MW.preparation.finish(r);
        leaveCookingFlow('recipes');
      }
    };
    bindNav();
  }

  function dayToggles(id,selected){
    const set=new Set(selected||[]);
    return '<div class="day-toggle-row" id="'+id+'">'+MW.DAYS.map(d=>'<button data-day="'+d.key+'" class="'+(set.has(d.key)?'active':'')+'"><span>'+d.short.slice(0,2)+'</span></button>').join('')+'</div>';
  }

  function settings(){
    const st=s();
    const avoidValue=[...(st.household.restrictions||[]),...(st.household.dislikes||[])].join(', ');
    root.innerHTML=shell(
      '<section class="subpage-head"><button class="back-button" id="back">'+icon('arrow-left')+'</button><div><span class="eyebrow">YOUR ACCOUNT</span><h1>Settings</h1></div></section>'+
      '<section class="settings-planner-note">'+icon('sliders')+'<div><strong>Your weekly planning defaults</strong><small>These settings guide the algorithm when My Week builds a new week. Change them whenever you like, then save to rebuild the plan.</small></div></section>'+
      '<section class="settings-section"><label>First name</label><input id="profileName" value="'+esc((st.profile&&st.profile.name)||'')+'" placeholder="Your name"></section>'+
      '<section class="settings-section"><label>Supermarket</label><span class="select-control settings-select-control"><select id="retailer">'+MW.RETAILERS.map(x=>'<option '+(x===st.household.retailer?'selected':'')+'>'+esc(x)+'</option>').join('')+'</select>'+icon('chevron-down')+'</span></section>'+
      '<section class="settings-section"><label>Weekly food budget</label><div class="prefix-input"><span>£</span><input id="budget" type="number" inputmode="decimal" min="0" step="1" value="'+st.household.budget+'"></div></section>'+
      '<section class="settings-section food-settings"><label>Eating style</label>'+foodChoice('settingsDiet',MW.food.patterns,foodProfile().diet)+'<label class="sub-label">Meal priorities</label>'+multiFoodChoice('settingsGoals',MW.food.goals,foodProfile().goals)+'<label class="sub-label">Lunch styles you like</label>'+multiFoodChoice('settingsLunchStyles',MW.food.lunchStyles,MW.food.lunchPreferences?MW.food.lunchPreferences(foodProfile()):[foodProfile().lunchStyle||'any'])+'<small class="setting-help">Choose one or more. My Week still picks one lunch recipe for the week by default.</small><label class="sub-label">Foods you do not want</label><div class="food-autocomplete-host"><input id="avoidFoods" value="'+esc(avoidValue)+'" placeholder="Start typing a food"></div><small class="setting-help">Type a food and choose the recognised match. Add commas for more than one food.</small><span class="avoid-feedback" id="settingsAvoidFeedback"></span><details class="allergen-details compact"><summary><span><strong>Allergens</strong><small>'+((foodProfile().allergens||[]).length?foodProfile().allergens.length+' selected':'None selected')+'</small></span>'+icon('chevron-down')+'</summary>'+multiFoodChoice('settingsAllergens',MW.food.allergens,foodProfile().allergens)+'<p class="allergen-warning">Recipes without verified allergen records are excluded. Always check ingredient and product labels for your own allergies.</p></details></section>'+
      '<section class="settings-section equipment-settings"><div class="setting-title"><div><label>Kitchen equipment</label><small>Standard oven, hob, pans and utensils are assumed. Select specialist appliances you can use.</small></div></div><div class="equipment-grid" id="settingsEquipment">'+MW.equipment.items.map(x=>'<button type="button" data-v="'+x.id+'" class="'+((st.household.equipment||[]).includes(x.id)?'active':'')+'">'+icon(x.icon||'utensils')+'<span>'+esc(x.label)+'</span></button>').join('')+'</div></section>'+
      '<section class="settings-section"><div class="setting-title"><div><label>Dinner days</label><small>Choose the days you want dinner planned.</small></div></div>'+dayToggles('dinnerDays',st.plan.dinnerDays)+'</section>'+
      '<section class="settings-section"><div class="setting-title"><div><label>Lunch days</label><small>Your lunch recipe scales automatically to these days.</small></div></div>'+dayToggles('lunchDays',st.plan.lunchDays)+'<label class="sub-label">People eating the planned lunch</label>'+selectionButtons('lunchPeople',[1,2,3,4].map(v=>({v,label:String(v)})),st.plan.lunchPeople,'numeric-choice-row')+'</section>'+
      '<section class="settings-section"><button class="settings-link" id="cupboard">'+icon('box-open')+'<span><strong>My cupboard</strong><small>'+Object.keys(st.inventory||{}).length+' tracked items</small></span><i class="fa-solid fa-chevron-right"></i></button></section>'+
      '<section class="settings-section"><button class="settings-link" id="deviceSync">'+icon('arrows-rotate')+'<span><strong>Device sync & transfer</strong><small>Move My Week between devices without an account or server</small></span><i class="fa-solid fa-chevron-right"></i></button></section>'+
      (MW.updates?'<section class="settings-section app-update-section" id="appUpdatePanel"><button class="settings-link" id="checkUpdates">'+icon('cloud-arrow-down')+'<span><strong>App updates</strong><small id="updateStatus">'+(MW.updates.isNativeAndroid()?'Checking installed version…':'Web app updates automatically')+'</small></span><i class="fa-solid fa-chevron-right"></i></button><div class="update-release" id="updateRelease" hidden></div></section>':'')+
      '<section class="settings-section"><div class="switch-row"><span><strong>Lower-cost planning</strong><small>Cheaper meals and more ingredient overlap.</small></span><label class="toggle"><input id="priceMode" type="checkbox" '+(st.plan.priceMode?'checked':'')+'><span></span></label></div></section>'+
      '<div class="plan-actions single-action"><button class="btn primary" id="save">Save & rebuild week</button></div>'+ 
      '<button class="danger-link" id="reset">Reset My Week</button>' ,
      'more'
    );

    function toggleDays(id){
      root.querySelectorAll('#'+id+' button').forEach(b=>b.onclick=()=>b.classList.toggle('active'));
    }
    toggleDays('dinnerDays');toggleDays('lunchDays');
    const budgetInput=document.getElementById('budget');if(budgetInput)budgetInput.onkeydown=e=>{if(['e','E','+','-'].includes(e.key))e.preventDefault();};
    root.querySelectorAll('#lunchPeople button').forEach(b=>b.onclick=()=>root.querySelectorAll('#lunchPeople button').forEach(x=>x.classList.toggle('active',x===b)));
    ['settingsDiet'].forEach(id=>root.querySelectorAll('#'+id+' button').forEach(b=>b.onclick=()=>root.querySelectorAll('#'+id+' button').forEach(x=>x.classList.toggle('active',x===b))));
    ['settingsGoals','settingsAllergens'].forEach(id=>root.querySelectorAll('#'+id+' button').forEach(b=>b.onclick=()=>b.classList.toggle('active')));
    root.querySelectorAll('#settingsLunchStyles button').forEach(b=>b.onclick=()=>{
      const value=b.dataset.v,buttons=[...root.querySelectorAll('#settingsLunchStyles button')];
      if(value==='any')buttons.forEach(x=>x.classList.toggle('active',x===b));
      else{
        buttons.find(x=>x.dataset.v==='any')?.classList.remove('active');
        b.classList.toggle('active');
        if(!buttons.some(x=>x.classList.contains('active')))buttons.find(x=>x.dataset.v==='any')?.classList.add('active');
      }
    });
    root.querySelectorAll('#settingsEquipment button').forEach(b=>b.onclick=()=>b.classList.toggle('active'));
    const avoidFoods=document.getElementById('avoidFoods');
    const settingsAvoidFeedback=document.getElementById('settingsAvoidFeedback');
    const renderAvoidFeedback=()=>{
      if(!avoidFoods||!settingsAvoidFeedback||!MW.foodIdentity) return;
      const parsed=MW.foodIdentity.parseList(avoidFoods.value);
      const bits=[];
      if(parsed.linked.length)bits.push('<span class="avoid-ok">'+icon('circle-check')+' Recognised: '+parsed.linked.map(x=>esc(MW.foodIdentity.canonicalLabel(x))).join(' · ')+'</span>');
      if(parsed.custom.length)bits.push('<span class="avoid-warn">'+icon('circle-question')+' Custom, not linked: '+parsed.custom.map(esc).join(', ')+'</span>');
      settingsAvoidFeedback.innerHTML=bits.join('');
    };
    if(avoidFoods){
      MW.foodIdentity&&MW.foodIdentity.attach(avoidFoods,{multi:true,limit:5,onSelect:renderAvoidFeedback});
      avoidFoods.addEventListener('input',renderAvoidFeedback);
      avoidFoods.addEventListener('blur',renderAvoidFeedback);
      renderAvoidFeedback();
    }
    document.getElementById('cupboard').onclick=()=>go('cupboard');
    document.getElementById('deviceSync').onclick=()=>go('sync');
    const updateButton=document.getElementById('checkUpdates'),updateStatus=document.getElementById('updateStatus'),updateRelease=document.getElementById('updateRelease');
    const renderUpdate=async manual=>{
      if(!updateButton||!MW.updates)return;
      updateButton.disabled=true;
      let justInstalled='';
      if(updateStatus)updateStatus.textContent='Checking installed and available versions…';
      try{
        const pending=MW.updates.pendingStatus?await MW.updates.pendingStatus():null;
        if(pending&&pending.installed)justInstalled=String(pending.pending&&pending.pending.versionName||pending.local&&pending.local.version||'');
        const result=await MW.updates.check({manual:Boolean(manual)});
        const local=result.local||await MW.updates.appInfo();
        if(result.reason==='web'){
          if(updateStatus)updateStatus.textContent='Web app updates automatically';
          if(updateRelease){updateRelease.hidden=true;updateRelease.innerHTML='';}
          return;
        }
        const installed=String(local.version||'unknown');
        if(!result.available){
          if(updateStatus)updateStatus.textContent=justInstalled?'Updated successfully · Installed '+installed:'Installed '+installed+' · Up to date';
          if(updateRelease){updateRelease.hidden=true;updateRelease.innerHTML='';}
          return;
        }
        const release=result.manifest||{};
        if(updateStatus)updateStatus.textContent='Installed '+installed+' · '+String(release.versionName||'New version')+' available';
        if(updateRelease){
          const notes=Array.isArray(release.releaseNotes)?release.releaseNotes:[];
          updateRelease.innerHTML='<div class="update-release-copy"><span class="eyebrow">UPDATE AVAILABLE</span><strong>'+esc(release.versionName)+'</strong>'+(notes.length?'<ul>'+notes.slice(0,5).map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':'')+'<small>Installed: '+esc(installed)+'. Your week, cupboard and preferences stay on this device during a normal update.</small></div><button class="btn primary" id="installUpdate">Update My Week</button>';
          updateRelease.hidden=false;
          document.getElementById('installUpdate').onclick=async e=>{
            const button=e.currentTarget,original=button.textContent;
            const onProgress=event=>{
              const pct=Math.max(0,Math.min(100,Number(event&&event.detail&&event.detail.percent)||0));
              button.textContent=pct?'Downloading '+pct+'%':'Preparing update…';
              if(updateStatus)updateStatus.textContent=pct?'Downloading verified update · '+pct+'%':'Preparing verified update…';
            };
            button.disabled=true;window.addEventListener('mw:update-progress',onProgress);
            try{
              const installResult=await MW.updates.install(release);
              if(installResult&&installResult.needsInstallPermission){
                if(updateStatus)updateStatus.textContent='Allow My Week to install verified updates, then return to My Week. The update will continue automatically';
                button.textContent='Update My Week';
              }else if(installResult&&installResult.installerOpened){
                if(updateStatus)updateStatus.textContent='Download verified · Android installer opened';
                button.textContent='Installer opened';
              }else{
                if(updateStatus)updateStatus.textContent='Verified update ready for Android';
                button.textContent='Continue update';
              }
            }catch(error){
              button.textContent=original;
              if(updateStatus)updateStatus.textContent='Update could not be installed';
              updateRelease.insertAdjacentHTML('beforeend','<p class="operation-error" role="alert">'+esc(error&&error.message||'The update could not be installed.')+'</p>');
            }finally{
              window.removeEventListener('mw:update-progress',onProgress);button.disabled=false;
            }
          };
        }
      }catch(error){
        if(updateStatus)updateStatus.textContent=manual?'Could not check for updates':'Update check unavailable';
        if(manual&&updateRelease){updateRelease.innerHTML='<p class="operation-error" role="alert">'+esc(error&&error.message||'Could not check for updates.')+'</p>';updateRelease.hidden=false;}
      }finally{updateButton.disabled=false;}
    };
    if(updateButton){updateButton.onclick=()=>renderUpdate(true);renderUpdate(false);}
    document.getElementById('back').onclick=()=>go('week');
    document.getElementById('save').onclick=()=>{
      st.profile.name=document.getElementById('profileName').value.trim();
      st.household.retailer=document.getElementById('retailer').value;
      st.household.budget=Number(document.getElementById('budget').value)||70;
      st.plan.dinnerDays=[...root.querySelectorAll('#dinnerDays button.active')].map(x=>x.dataset.day);
      st.plan.lunchDays=[...root.querySelectorAll('#lunchDays button.active')].map(x=>x.dataset.day);
      const lp=root.querySelector('#lunchPeople button.active');
      st.plan.lunchPeople=Math.max(1,Math.min(st.household.people,Number(lp&&lp.dataset.v)||1));
      const dietBtn=root.querySelector('#settingsDiet button.active');
      const selectedLunchStyles=[...root.querySelectorAll('#settingsLunchStyles button.active')].map(x=>x.dataset.v);
      const avoidParsed=MW.foodIdentity?MW.foodIdentity.parseList((document.getElementById('avoidFoods')||{}).value||''):{linked:[],custom:[]};
      st.household.restrictions=[...new Set(avoidParsed.linked||[])];
      st.household.dislikes=[...new Set(avoidParsed.custom||[])];
      const lunchStyles=selectedLunchStyles.length?selectedLunchStyles:['any'];
      st.foodProfile={
        diet:dietBtn?dietBtn.dataset.v:'omnivore',
        goals:[...root.querySelectorAll('#settingsGoals button.active')].map(x=>x.dataset.v),
        allergens:[...root.querySelectorAll('#settingsAllergens button.active')].map(x=>x.dataset.v),
        lunchStyle:'any',
        lunchStyles:lunchStyles.includes('any')?['any']:[...new Set(lunchStyles)]
      };
      st.household.equipment=[...root.querySelectorAll('#settingsEquipment button.active')].map(x=>x.dataset.v);
      st.household.equipmentConfigured=true;
      st.plan.priceMode=document.getElementById('priceMode').checked;
      MW.state.save();
      MW.planner.buildWeek({preserveExtras:true});
      go('week');
    };
    document.getElementById('reset').onclick=async()=>{
      const confirmed=await confirmAction({
        eyebrow:'RESET MY WEEK',
        title:'Erase My Week data on this device?',
        message:'This permanently erases your current week, cupboard, shopping progress, preferences and history. This cannot be undone. Export a transfer first if you want a backup.',
        confirmLabel:'Reset My Week',
        danger:true
      });
      if(!confirmed)return;
      MW.state.reset();
      if(MW.onboarding)MW.onboarding.reset();
      render();
    };
    bindNav();
  }

  function syncScreen(){
    const st=s();let pending=null;
    const summary=packet=>{const x=packet&&packet.state||{};const inv=Object.keys(x.inventory||{}).length,week=x.week&&x.week.weekKey||'No current week';return '<div class="sync-preview-card"><span class="eyebrow">TRANSFER FOUND</span><strong>'+esc((x.profile&&x.profile.name)||'My Week')+'</strong><small>'+esc(week)+' · '+inv+' cupboard item'+(inv===1?'':'s')+' · exported '+esc(packet.exportedAt||'')+'</small></div>';};
    root.innerHTML=shell(
      '<section class="subpage-head"><button class="back-button" id="back">'+icon('arrow-left')+'</button><div><span class="eyebrow">YOUR DATA</span><h1>Device sync & transfer</h1><p>Move your complete My Week state directly between devices. Use either a transfer file or a transfer code; you do not need both. No My Week account or online storage is used.</p></div></section>'+
      '<section class="sync-explainer">'+icon('shield-halved')+'<div><strong>Two ways to transfer</strong><small>The .myweek file and transfer code contain the same snapshot. Choose whichever is easier for the devices you are moving between.</small></div></section>'+
      '<section class="settings-section sync-section"><span class="eyebrow">SEND FROM THIS DEVICE</span><h2>Create a transfer</h2><p>The transfer includes your week, shopping progress, saved delivery quantities, cupboard, preferences and history. Receipt images are only a temporary local reference while checking a shop and are not included.</p><div class="sync-actions"><button class="btn primary" id="shareSyncFile">Share transfer file</button><button class="btn secondary" id="createSyncCode">Create transfer code</button></div><div id="syncCodeArea"></div></section>'+
      '<section class="settings-section sync-section"><span class="eyebrow">RECEIVE ON THIS DEVICE</span><h2>Import a transfer</h2><p>Choose a .myweek file or paste a transfer code. You only need one method. Nothing is replaced until you review the transfer and confirm.</p><textarea id="syncImportCode" rows="5" placeholder="Paste a My Week transfer code"></textarea><div class="sync-actions"><button class="btn secondary" id="readSyncCode">Check transfer code</button><label class="btn secondary sync-file-picker"><span>Choose .myweek file</span><input id="syncFile" type="file" accept=".myweek,application/json,text/plain"></label></div><div id="syncImportPreview"></div></section>',
      'more'
    );
    const preview=document.getElementById('syncImportPreview');
    const showPending=packet=>{
      pending=packet;
      preview.innerHTML=summary(packet)+'<p class="setting-help">This transfer is ready to import. Your current data will not change until you confirm below.</p><button class="btn primary" id="applySyncTransfer">Replace this device with this transfer</button>';
      document.getElementById('applySyncTransfer').onclick=async()=>{
        const confirmed=await confirmAction({
          eyebrow:'REPLACE DEVICE DATA',
          title:'Replace the My Week data on this device?',
          message:'Your current week, cupboard, shopping progress, preferences and history will be overwritten by the transfer you just checked.',
          confirmLabel:'Replace this device',
          danger:true
        });
        if(!confirmed)return;
        try{
          MW.syncTransfer.apply(pending);
          pending=null;
          preview.innerHTML='<div class="sync-preview-card"><span class="eyebrow">IMPORT COMPLETE</span><strong>My Week data replaced successfully</strong><small>The transferred week, cupboard, preferences and history are now active on this device.</small></div>';
        }catch(error){
          preview.innerHTML='<p class="operation-error" role="alert">'+esc(error&&error.message||'This transfer could not be applied.')+'</p>';
        }
      };
    };
    document.getElementById('createSyncCode').onclick=e=>withLoading(e.currentTarget,async()=>{const code=await MW.syncTransfer.createCode(),area=document.getElementById('syncCodeArea');area.innerHTML='<div class="sync-code-card"><div><strong>Transfer code</strong><small>'+code.length.toLocaleString()+' characters · self-contained</small></div><textarea id="syncCode" rows="5" readonly>'+esc(code)+'</textarea><button class="btn secondary" id="copySyncCode">Copy code</button></div>';document.getElementById('copySyncCode').onclick=async()=>{const box=document.getElementById('syncCode');try{await navigator.clipboard.writeText(box.value);}catch{box.select();document.execCommand('copy');}document.getElementById('copySyncCode').textContent='Copied';};});
    document.getElementById('shareSyncFile').onclick=e=>withLoading(e.currentTarget,async()=>{await MW.syncTransfer.shareFile();});
    document.getElementById('readSyncCode').onclick=e=>withLoading(e.currentTarget,async()=>{const value=document.getElementById('syncImportCode').value.trim();pending=null;if(!value){preview.innerHTML='<p class="operation-error" role="alert">Paste a My Week transfer code first.</p>';return;}preview.innerHTML='<p class="setting-help" role="status">Checking transfer code…</p>';try{showPending(await MW.syncTransfer.readCode(value));}catch(error){preview.innerHTML='<p class="operation-error" role="alert">'+esc(error&&error.message||'This transfer code could not be read.')+'</p>';}});
    document.getElementById('syncFile').onchange=async e=>{const file=e.target.files&&e.target.files[0];if(!file)return;try{showPending(await MW.syncTransfer.readFile(file));}catch(error){preview.innerHTML='<p class="operation-error" role="alert">'+esc(error.message||'This transfer file could not be read.')+'</p>';}};
    document.getElementById('back').onclick=()=>go('settings');bindNav();
  }

  function cupboard(){
    const st=s();
    const items=Object.entries(st.inventory||{}).map(([key,item])=>({...item,_key:key})).filter(x=>MW.inventory.parseAmount(x.amountText)).sort((a,b)=>String(a.name).localeCompare(String(b.name)));
    const wholeStockUnits=wholeInventoryUnits;
    const unitOptions=inventoryUnitOptions;
    const itemRow=x=>{
      const p=MW.inventory.partsForEdit(x.amountText)||{value:'',unit:'g'},keyMatch=MW.foodIdentity&&MW.foodIdentity.resolveExact(x._key),nameMatch=MW.foodIdentity&&MW.foodIdentity.resolveExact(x.name),resolved=x.canonical||keyMatch&&keyMatch.canonical||nameMatch&&nameMatch.canonical,linked=Boolean(resolved);
      const usage=linked&&MW.inventory.plannedUsage?MW.inventory.plannedUsage(resolved):[];
      const usageText=usage.length?('Used in '+usage.length+' '+(usage.length===1?'meal':'meals')+': '+usage.map(u=>u.label).join(' · ')):'Not used in this week’s meals';
      return '<article class="cupboard-row cupboard-quantity-row '+(linked?'linked-food':'custom-food')+'" data-name="'+esc(x._key)+'"><div class="cupboard-item-name"><strong>'+esc(ingredientName(x.name))+'</strong><small class="cupboard-save-note">'+(linked?'Recognised ingredient':'Custom item · Not linked to recipes')+'</small>'+(linked?'<small class="cupboard-recipe-link">'+icon(usage.length?'link':'circle-minus')+' '+esc(usageText)+'</small>':'')+'</div><div class="stock-quantity cupboard-current-quantity"><input class="stock-current-amount" type="number" inputmode="decimal" min="0" step="'+(wholeStockUnits.has(p.unit)?'1':'0.1')+'" value="'+esc(p.value)+'" aria-label="Amount of '+esc(ingredientName(x.name))+'"><span class="select-control stock-unit-control"><select class="stock-current-unit" aria-label="Unit for '+esc(ingredientName(x.name))+'">'+unitOptions(p.unit)+'</select>'+icon('chevron-down')+'</span></div><button class="stock-delete" data-name="'+esc(x._key)+'" aria-label="Remove '+esc(ingredientName(x.name))+'">'+icon('trash')+'</button></article>';
    };
    root.innerHTML=shell(
      '<section class="subpage-head"><button class="back-button" id="back">'+icon('arrow-left')+'</button><div><span class="eyebrow">INVENTORY</span><h1>My cupboard</h1><p>Keep the real amount you have. Confirmed shopping adds what you bought and completed recipes subtract what they use.</p></div></section>'+
      '<section class="cupboard-add"><div class="food-autocomplete-host cupboard-food-search"><input id="stockName" placeholder="Start typing an ingredient"><span class="food-link-status" id="stockMatchStatus"></span></div><div class="stock-quantity"><input id="stockAmount" type="number" inputmode="decimal" min="0" step="0.1" placeholder="Amount"><span class="select-control stock-unit-control"><select id="stockUnit">'+unitOptions('g')+'</select>'+icon('chevron-down')+'</span></div><button id="addStock" aria-label="Add inventory item">'+icon('plus')+'</button></section>'+
      '<div class="cupboard-list">'+(items.length?items.map(itemRow).join(''):'<div class="empty-state">'+icon('box-open')+'<h2>No cupboard items yet</h2><p>Add anything you already have and My Week will count it down as recipes use it.</p></div>')+'</div>',
      'more'
    );
    document.getElementById('back').onclick=()=>go('settings');
    const stockName=document.getElementById('stockName'),stockMatchStatus=document.getElementById('stockMatchStatus'),stockAmount=document.getElementById('stockAmount'),stockUnit=document.getElementById('stockUnit');
    const updateStockMatch=()=>{
      const raw=stockName.value.trim();
      if(!raw){stockMatchStatus.innerHTML='';return;}
      const exact=stockName.dataset.mwCanonical?{canonical:stockName.dataset.mwCanonical}:MW.foodIdentity&&MW.foodIdentity.resolveExact(stockName.value);
      if(exact){const usage=MW.inventory.plannedUsage?MW.inventory.plannedUsage(exact.canonical):[];stockMatchStatus.innerHTML='<span class="linked">'+icon('link')+' Recognised: '+esc(MW.foodIdentity.canonicalLabel(exact.canonical))+(usage.length?' · Used in '+usage.length+' '+(usage.length===1?'meal':'meals'):' · Not used this week')+'</span>';return;}
      const options=MW.foodIdentity?MW.foodIdentity.suggest(raw,5):[];
      stockMatchStatus.innerHTML=options.length?'<span class="choose">'+icon('magnifying-glass')+' Choose a suggestion to link this item</span>':'<span class="custom">'+icon('circle-question')+' Custom item · Not linked to recipes</span>';
    };
    if(MW.foodIdentity)MW.foodIdentity.attach(stockName,{limit:5,onSelect:updateStockMatch});
    stockName.addEventListener('input',updateStockMatch);updateStockMatch();
    const syncStep=(input,unit)=>{input.step=wholeStockUnits.has(unit.value)?'1':'0.1';};syncStep(stockAmount,stockUnit);stockUnit.onchange=()=>syncStep(stockAmount,stockUnit);
    stockAmount.onkeydown=e=>{if(['e','E','+','-'].includes(e.key))e.preventDefault();};
    document.getElementById('addStock').onclick=()=>{
      const n=stockName.value.trim(),value=Number(stockAmount.value),unit=stockUnit.value;
      if(!n||!Number.isFinite(value)||value<=0)return;
      if(wholeStockUnits.has(unit)&&!Number.isInteger(value)){stockAmount.setCustomValidity('Use a whole number for '+unit+'.');stockAmount.reportValidity();return;}
      stockAmount.setCustomValidity('');
      const exact=stockName.dataset.mwCanonical?{canonical:stockName.dataset.mwCanonical}:MW.foodIdentity&&MW.foodIdentity.resolveExact(n),canonical=exact&&exact.canonical||null;
      const incoming=MW.inventory.parseAmount(unit==='each'?String(value):String(value)+' '+unit);
      const existing=canonical?MW.inventory.find(canonical):null;
      if(existing&&incoming){
        const have=MW.inventory.parseAmount(existing.item.amountText),converted=have?MW.inventory.valueInUnit(incoming,have.unit,canonical):null;
        if(Number.isFinite(converted)){
          const label=ingredientName(existing.item.name||MW.foodIdentity.canonicalLabel(canonical));
          const next=MW.inventory.formatAmount({value:have.value+converted,unit:have.unit});
          if(!confirm(label+' is already in your inventory with '+existing.item.amountText+'. Add this quantity to make '+next+'?'))return;
          MW.inventory.setQuantity(existing.key,next,{canonical});
          samePage(cupboard);return;
        }
        alert('This matches an ingredient already in your inventory, but the units cannot be combined safely. Edit the existing quantity instead.');
        return;
      }
      MW.inventory.setQuantity(canonical||n,unit==='each'?String(value):String(value)+' '+unit,{canonical,custom:!canonical});
      samePage(cupboard);
    };
    const saveRow=row=>{
      const input=row.querySelector('.stock-current-amount'),unit=row.querySelector('.stock-current-unit'),name=row.dataset.name,value=Number(input.value);
      if(!Number.isFinite(value)||value<0)return;
      if(wholeStockUnits.has(unit.value)&&!Number.isInteger(value)){input.setCustomValidity('Use a whole number for '+unit.value+'.');input.reportValidity();return;}
      input.setCustomValidity('');
      if(value===0){MW.inventory.remove(name);samePage(cupboard);return;}
      MW.inventory.setQuantity(name,unit.value==='each'?String(value):String(value)+' '+unit.value);
      const note=row.querySelector('.cupboard-save-note'),baseNote=row.classList.contains('custom-food')?'Custom item · Not linked to recipes':'Recognised ingredient · In cupboard now';if(note){note.textContent='Saved automatically';setTimeout(()=>{if(note.isConnected)note.textContent=baseNote;},1200);}
    };
    root.querySelectorAll('.cupboard-quantity-row').forEach(row=>{
      const input=row.querySelector('.stock-current-amount'),unit=row.querySelector('.stock-current-unit');
      input.onkeydown=e=>{if(['e','E','+','-'].includes(e.key))e.preventDefault();if(e.key==='Enter'){e.preventDefault();input.blur();}};
      input.onchange=()=>saveRow(row);
      unit.onchange=()=>{syncStep(input,unit);saveRow(row);};
    });
    root.querySelectorAll('.stock-delete').forEach(b=>b.onclick=()=>{MW.inventory.remove(b.dataset.name);samePage(cupboard);});
    bindNav();
  }

  function bindNativeBack(){const app=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.App;if(!app||typeof app.addListener!=='function')return;app.addListener('backButton',()=>{if(window.MyWeekAndroidBack&&window.MyWeekAndroidBack())return;if(typeof app.minimizeApp==='function')app.minimizeApp();else if(typeof app.exitApp==='function')app.exitApp();});}
  root.addEventListener('click',e=>{if(e.target.closest('#openLunch')){const id=s().week&&s().week.lunchId;if(id)go('recipe:'+id);}});
  window.addEventListener('mw:storage-error',storageRecovery);
  bindNativeBack();
  render();
})();