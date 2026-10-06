window.MW = window.MW || {};
(function(){
  const KEY='myweek_state_v1';
  const dinnerDefaults=['mon','tue','wed','thu','fri','sat'];
  const lunchDefaults=['mon','tue','wed','thu','fri'];

  const fresh=()=>{
    const state=({
    schema:1,
    onboarded:false,
    createdAt:new Date().toISOString(),
    profile:{name:''},
    household:{
      people:2,
      budget:70,
      retailer:"Sainsbury's",
      effort:'mixed',
      restrictions:[],
      dislikes:[],
      foodAliases:{},
      equipment:[],
      equipmentConfigured:false,
      name:'My household'
    },
    plan:{
      dinnerDays:dinnerDefaults.slice(),
      lunchDays:lunchDefaults.slice(),
      lunchPeople:1,
      priceMode:false
    },
    foodProfile:{
      diet:'omnivore',
      goals:[],
      allergens:[],
      lunchStyle:'any',
      lunchStyles:['any']
    },
    preferences:{scores:{},recentMeals:[]},
    inventory:{
      'salt':{name:'Salt',amountText:'500 g',updatedAt:new Date().toISOString()},
      'black pepper':{name:'Black pepper',amountText:'100 g',updatedAt:new Date().toISOString()},
      'cooking oil':{name:'Cooking oil',amountText:'500 ml',updatedAt:new Date().toISOString()},
      'paprika':{name:'Paprika',amountText:'100 g',updatedAt:new Date().toISOString()},
      'ground cumin':{name:'Ground cumin',amountText:'100 g',updatedAt:new Date().toISOString()},
      'chilli powder':{name:'Chilli powder',amountText:'100 g',updatedAt:new Date().toISOString()},
      'oregano':{name:'Oregano',amountText:'50 g',updatedAt:new Date().toISOString()},
      'garlic granules':{name:'Garlic granules',amountText:'100 g',updatedAt:new Date().toISOString()},
      'mixed herbs':{name:'Mixed herbs',amountText:'50 g',updatedAt:new Date().toISOString()},
      'soy sauce':{name:'Soy sauce',amountText:'150 ml',updatedAt:new Date().toISOString()},
      'bbq sauce':{name:'BBQ sauce',amountText:'250 ml',updatedAt:new Date().toISOString()},
      'basmati rice':{name:'Basmati rice',amountText:'1000 g',updatedAt:new Date().toISOString()}
    },
    pantry:{},
    regulars:[
      {id:'milk',name:'Milk',count:1,unit:'carton',qty:'1 carton',estimatedUnitCost:1.75,selected:false,category:'Regulars'},
      {id:'bananas',name:'Bananas',count:6,unit:'banana',qty:'6 bananas',estimatedUnitCost:0.16,selected:false,category:'Fruit'},
      {id:'yoghurt',name:'Yoghurts',count:1,unit:'pack',qty:'1 pack',estimatedUnitCost:2.00,selected:false,category:'Regulars'}
    ],
    week:null,
    events:[],
    ui:{screen:'welcome',shopChecks:{},dismissedRolloverFor:'',keepScreenAwake:false}
  });
    const bp=MW.BUILD_PROFILE||{};
    if(bp.clearDefaultInventory) state.inventory={};
    if(bp.seedInventory&&typeof bp.seedInventory==='object') state.inventory=JSON.parse(JSON.stringify(bp.seedInventory));
    if(bp.seedId) state.buildSeedApplied=bp.seedId;
    for(const [key,item] of Object.entries(state.inventory||{})){
      const amount=String(item&&item.amountText||'').trim(),m=amount.match(/^([0-9]+(?:\.[0-9]+)?)/);
      if(!m||Number(m[1])<=0){delete state.inventory[key];continue;}
      delete item.status;delete item.confidence;
    }
    return state;
  };

  function migrate(x){
    validateSaved(x);
    x.profile=x.profile||{name:''};
    x.household=x.household||fresh().household;
    x.household.people=Number(x.household.people)||2;
    x.household.budget=Number(x.household.budget)||70;
    x.household.restrictions=Array.isArray(x.household.restrictions)?x.household.restrictions:[];
    x.household.dislikes=Array.isArray(x.household.dislikes)?x.household.dislikes:[];
    x.household.foodAliases=x.household.foodAliases&&typeof x.household.foodAliases==='object'&&!Array.isArray(x.household.foodAliases)?x.household.foodAliases:{};
    x.household.equipment=Array.isArray(x.household.equipment)?x.household.equipment:[];
    x.household.equipmentConfigured=Boolean(x.household.equipmentConfigured);
    x.preferences=x.preferences||{scores:{},recentMeals:[]};
    x.preferences.scores=x.preferences.scores||{};
    x.preferences.recentMeals=Array.isArray(x.preferences.recentMeals)?x.preferences.recentMeals:[];
    x.plan=x.plan||{};
    if(!Array.isArray(x.plan.dinnerDays)){
      const legacy=x.week&&Array.isArray(x.week.meals)?x.week.meals.map(m=>m.day):dinnerDefaults;
      x.plan.dinnerDays=legacy.filter(Boolean);
    }
    if(!Array.isArray(x.plan.lunchDays)) x.plan.lunchDays=lunchDefaults.slice();
    if(!Number.isFinite(Number(x.plan.lunchPeople))) x.plan.lunchPeople=1;
    x.plan.lunchPeople=Math.max(1,Math.min(x.household.people,Number(x.plan.lunchPeople)||1));
    x.plan.priceMode=Boolean(x.plan.priceMode);
    x.foodProfile=x.foodProfile||{};
    if(!['omnivore','vegetarian','vegan','pescatarian'].includes(x.foodProfile.diet)) x.foodProfile.diet='omnivore';
    x.foodProfile.goals=Array.isArray(x.foodProfile.goals)?x.foodProfile.goals.filter(v=>['balanced','lighter','more-veg','quick'].includes(v)):[];
    x.foodProfile.allergens=Array.isArray(x.foodProfile.allergens)?x.foodProfile.allergens:[];
    const validLunchStyles=new Set(['any','sandwich','wrap','soup','salad','pasta','rice','grain','potato','hot','light','no-cook','quick']);
    if(!validLunchStyles.has(x.foodProfile.lunchStyle)) x.foodProfile.lunchStyle='any';
    if(!Array.isArray(x.foodProfile.lunchStyles)){
      x.foodProfile.lunchStyles=x.foodProfile.lunchStyle==='any'?['any']:[x.foodProfile.lunchStyle];
    }
    x.foodProfile.lunchStyles=[...new Set(x.foodProfile.lunchStyles.filter(v=>validLunchStyles.has(v)))];
    if(!x.foodProfile.lunchStyles.length||x.foodProfile.lunchStyles.includes('any'))x.foodProfile.lunchStyles=['any'];
    x.inventory=x.inventory||{};
    // Build seeds are only for a genuinely fresh installation. Never merge a
    // newer build seed into saved user data during an app update or migration.
    for(const [key,item] of Object.entries(x.inventory)){
      const amount=String(item&&item.amountText||'').trim(),m=amount.match(/^([0-9]+(?:\.[0-9]+)?)/);
      if(!m||Number(m[1])<=0){delete x.inventory[key];continue;}
      delete item.status;delete item.confidence;item.updatedAt=item.updatedAt||new Date().toISOString();
    }
    // Legacy pantry flags without a measured quantity are deliberately not
    // migrated. Inventory now means a real amount that can be added to and
    // depleted safely.
    // Defaults belong to a new installation only. An absent saved item may
    // have been deliberately deleted; a migration must not invent that stock.
    x.regulars=Array.isArray(x.regulars)?x.regulars:fresh().regulars;
    const unitCosts={milk:1.75,bananas:0.16,yoghurt:2.00};
    x.regulars.forEach(r=>{
      if(r.id==='milk'&&['bottle','bottles'].includes(String(r.unit||'').toLowerCase())){r.unit='carton';r.qty=(Number(r.count)||1)+' '+((Number(r.count)||1)===1?'carton':'cartons');}
      const raw=String(r.qty||'').trim();
      const m=raw.match(/^([0-9]+(?:\.[0-9]+)?)\s*(.*)$/);
      if(!Number.isFinite(Number(r.count))) r.count=m?Number(m[1]):1;
      if(!r.unit){
        const u=m&&String(m[2]||'').trim();
        r.unit=u?u.replace(/s$/i,''):'item';
      }
      if(!Number.isFinite(Number(r.estimatedUnitCost))) r.estimatedUnitCost=unitCosts[r.id]||2.5;
      r.count=Math.max(1,Number(r.count)||1);
    });
    if(x.week){
      if(!x.week.weekKey){
        const d=new Date(x.week.createdAt||Date.now());
        if(!Number.isNaN(d.getTime())){
          d.setHours(12,0,0,0);
          d.setDate(d.getDate()-((d.getDay()+6)%7));
          x.week.weekKey=[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
        }
      }
      x.week.planMode=x.week.planMode||'legacy';
      x.week.completedRecipes=Array.isArray(x.week.completedRecipes)?x.week.completedRecipes:[];
      x.week.delivery=x.week.delivery||null;
    }
    x.events=Array.isArray(x.events)?x.events:[];
    x.ui=x.ui||{screen:x.onboarded?'week':'welcome'};
    x.ui.shopChecks=x.ui.shopChecks||{};
    x.ui.dismissedRolloverFor=String(x.ui.dismissedRolloverFor||'');
    x.ui.keepScreenAwake=Boolean(x.ui.keepScreenAwake);
    return x;
  }

  const BACKUP_KEY=KEY+'_backup';
  const RECOVERY_KEY=KEY+'_recovery';
  const clone=value=>JSON.parse(JSON.stringify(value));
  const isObject=value=>Boolean(value&&typeof value==='object'&&!Array.isArray(value));
  let lastRaw=null;
  let committed=null;
  let recovery=null;

  function validateSaved(value){
    if(!isObject(value)||value.schema!==1) throw new Error('Unsupported saved-data format.');
    for(const key of ['profile','household','plan','foodProfile','preferences','inventory','pantry','ui','week']){
      if(value[key]!=null&&!isObject(value[key])) throw new Error('Invalid saved '+key+'.');
    }
    for(const key of ['regulars','events']){
      if(value[key]!=null&&!Array.isArray(value[key])) throw new Error('Invalid saved '+key+'.');
    }
    for(const [parent,keys] of [['household',['restrictions','dislikes','equipment']],['plan',['dinnerDays','lunchDays']],['foodProfile',['goals','allergens']],['preferences',['recentMeals']],['week',['meals','extras','forceBuy','completedRecipes']]]){
      for(const key of keys){
        const item=value[parent]&&value[parent][key];
        if(item!=null&&!Array.isArray(item)) throw new Error('Invalid saved '+parent+'.'+key+'.');
      }
    }
    for(const entry of value.regulars||[]) if(!isObject(entry)) throw new Error('Invalid saved regular item.');
    for(const entry of Object.values(value.inventory||{})) if(!isObject(entry)) throw new Error('Invalid saved cupboard item.');
    for(const entry of (value.week&&value.week.meals)||[]) if(!isObject(entry)) throw new Error('Invalid saved meal.');
    return value;
  }

  function readSaved(raw){
    const value=validateSaved(JSON.parse(raw));
    return migrate(value);
  }

  function signalRecovery(reason){
    recovery={reason};
    if(typeof window.dispatchEvent==='function'&&typeof CustomEvent==='function'){
      window.dispatchEvent(new CustomEvent('mw:storage-error'));
    }
  }

  function storageError(message,code){
    const error=new Error(message);error.code=code;return error;
  }

  function load(){
    let raw;
    try{raw=localStorage.getItem(KEY);}
    catch(e){recovery={reason:'unavailable'};return fresh();}
    lastRaw=raw;
    if(raw===null){const value=fresh();committed=clone(value);recovery=null;return value;}
    try{
      const value=readSaved(raw);committed=clone(value);recovery=null;return value;
    }catch(e){
      // Keep the original bytes in place. This placeholder is never writable.
      recovery={reason:'invalid'};return fresh();
    }
  }

  let state=load();

  function ensureWritable(){
    if(recovery) throw storageError('Saved data needs attention before changes can be saved.','MW_RECOVERY_REQUIRED');
  }

  function currentRaw(){
    try{return localStorage.getItem(KEY);}
    catch(e){signalRecovery('unavailable');throw storageError('Saved data could not be read. No changes were saved.','MW_STORAGE_UNAVAILABLE');}
  }

  function writeCandidate(candidate){
    ensureWritable();
    validateSaved(candidate);
    const raw=JSON.stringify(candidate);
    const previous=currentRaw();
    if(previous!==lastRaw){
      signalRecovery('conflict');
      throw storageError('Saved data changed elsewhere. Reload it before making more changes.','MW_STORAGE_CONFLICT');
    }
    try{
      // A failed backup write must not risk overwriting the only good copy.
      if(previous!==null&&raw!==previous) localStorage.setItem(BACKUP_KEY,previous);
      localStorage.setItem(KEY,raw);
    }catch(e){
      signalRecovery('write-failed');
      throw storageError('Changes could not be saved. The previous saved data has been kept.','MW_STORAGE_WRITE_FAILED');
    }
    lastRaw=raw;committed=clone(candidate);
  }

  function save(){
    ensureWritable();
    try{writeCandidate(state);}
    catch(e){
      // Older callers edit get() before saving. Restore the published state on failure.
      if(committed)state=clone(committed);
      throw e;
    }
  }

  function log(type,data){
    ensureWritable();
    state.events.push({at:new Date().toISOString(),type,data:data||{}});
    if(state.events.length>500) state.events=state.events.slice(-500);
    save();
  }

  function recoveryStatus(){
    let hasBackup=false;
    if(recovery){try{const raw=localStorage.getItem(BACKUP_KEY);if(raw!==null){readSaved(raw);hasBackup=true;}}catch(e){}}
    return {blocked:Boolean(recovery),reason:recovery?recovery.reason:null,hasBackup};
  }

  function retryLoad(){
    // User-triggered retry only; never overwrite an unreadable record.
    state=load();return !recovery;
  }

  function restoreBackup(){
    if(!recovery)throw new Error('Recovery is not needed.');
    const previous=currentRaw();
    if(previous!==lastRaw){
      signalRecovery('conflict');
      throw storageError('Saved data changed. Retry loading before choosing a backup.','MW_STORAGE_CONFLICT');
    }
    let backup,candidate;
    try{backup=localStorage.getItem(BACKUP_KEY);if(backup===null)throw new Error('No backup.');candidate=readSaved(backup);}
    catch(e){throw new Error('No readable backup is available.');}
    const raw=JSON.stringify(candidate);
    try{
      // Retain the rejected original before explicitly replacing it with the backup.
      if(previous!==null)localStorage.setItem(RECOVERY_KEY,previous);
      localStorage.setItem(KEY,raw);
    }catch(e){signalRecovery('write-failed');throw storageError('The backup could not be restored. The original saved record has been kept.','MW_STORAGE_WRITE_FAILED');}
    lastRaw=raw;committed=clone(candidate);state=candidate;recovery=null;
    return state;
  }

  function reset(){
    // The UI confirms this destructive action. Do not leave hidden private backups.
    const previous=currentRaw();
    if(previous!==lastRaw){signalRecovery('conflict');throw storageError('Saved data changed. Retry loading before resetting.','MW_STORAGE_CONFLICT');}
    const candidate=fresh(),raw=JSON.stringify(candidate);
    try{
      localStorage.removeItem(BACKUP_KEY);localStorage.removeItem(RECOVERY_KEY);
      localStorage.setItem(KEY,raw);
    }catch(e){signalRecovery('write-failed');throw storageError('Reset could not be saved. The current saved record has been kept.','MW_STORAGE_WRITE_FAILED');}
    lastRaw=raw;committed=clone(candidate);state=candidate;recovery=null;return state;
  }

  function recoveryExport(){
    const records={};
    for(const key of [KEY,BACKUP_KEY,RECOVERY_KEY]){
      try{records[key]=localStorage.getItem(key);}
      catch(e){records[key]=key===KEY?lastRaw:null;}
    }
    return {format:'myweek-storage-recovery-v1',exportedAt:new Date().toISOString(),records};
  }

  MW.state={
    get:()=>state,
    save,
    transaction(action){
      ensureWritable();
      if(typeof action!=='function')throw new TypeError('A transaction needs a function.');
      const draft=clone(state),result=action(draft);
      if(result&&typeof result.then==='function')throw new TypeError('State transactions must be synchronous.');
      writeCandidate(draft);state=draft;return result;
    },
    log,reset,
    replace(value){
      ensureWritable();
      const candidate=migrate(validateSaved(clone(value)));
      writeCandidate(candidate);state=candidate;return state;
    },
    recoveryStatus,retryLoad,restoreBackup,recoveryExport
  };
})();
