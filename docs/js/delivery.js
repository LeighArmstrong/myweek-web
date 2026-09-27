window.MW=window.MW||{};
(function(){
  'use strict';
  const now=()=>new Date().toISOString();
  function recordEvent(state,type,data){
    state.events=state.events||[];
    state.events.push({at:now(),type,data});
    state.events=state.events.slice(-500);
  }
  function snapshotItem(x){
    return {
      key:x.key,sourceGroup:x.sourceGroup,group:x.group||'',name:x.name,
      displayAmount:x.displayAmount||'',inventoryAmount:x.inventoryAmount||x.displayAmount||'',
      needed:Number.isFinite(Number(x.needed))?Number(x.needed):null,unit:x.unit||null,
      estimatedPrice:Number.isFinite(Number(x.estimatedPrice))?Number(x.estimatedPrice):null,
      packSize:x.packSize||null,packs:Number.isFinite(Number(x.packs))?Number(x.packs):null,
      checked:Boolean(x.checked),reasons:Array.isArray(x.reasons)?x.reasons.slice():[],
      substitution:x.substitution?Object.assign({},x.substitution):null
    };
  }
  function begin(items){
    return MW.state.transaction(st=>{
      if(!st.week) throw new Error('Create a week before recording an order.');
      if(st.week.delivery&&Array.isArray(st.week.delivery.items)) return st.week.delivery;
      const old=st.week.delivery||{};
      st.week.delivery=Object.assign({},old,{items:items.map(snapshotItem),recordedAt:now(),confirmed:Boolean(old.confirmed),missingKeys:old.missingKeys||[],receivedKeys:old.receivedKeys||[],shortKeys:old.shortKeys||[],missingNames:old.missingNames||[],shortNames:old.shortNames||[],actualAmounts:old.actualAmounts||{},purchaseApplied:old.purchaseApplied||{},surplusApplied:old.surplusApplied||{},shortfallAmounts:old.shortfallAmounts||{},receipt:old.receipt||null});
      st.week.status='order-placed';
      recordEvent(st,'order_snapshot_recorded',{itemCount:items.length});
      return st.week.delivery;
    });
  }
  const parse=text=>MW.inventory.parseAmount(String(text||'').trim());
  const fmt=x=>MW.inventory.formatAmount(x);
  function planned(x){
    if(Number.isFinite(Number(x.needed))&&x.unit) return parse(String(x.needed)+' '+x.unit);
    return parse(x.displayAmount)||parse(x.inventoryAmount);
  }
  function zero(unit){return {value:0,unit:unit||'count'};}
  function inventoryKey(state,name){
    return Object.keys(state.inventory||{}).find(k=>MW.inventory.stockKey(k)===MW.inventory.stockKey(name))||MW.inventory.stockKey(name);
  }
  function adjustInventory(state,name,delta,unit){
    if(Math.abs(delta)<0.000001) return;
    state.inventory=state.inventory||{};
    const key=inventoryKey(state,name),item=state.inventory[key],have=item?parse(item.amountText):null;
    if(item&&String(item.amountText||'').trim()&&!have) throw new Error('Check cupboard quantity for '+name+' before confirming.');
    let targetUnit=unit,deltaInTarget=delta,before=0;
    if(have){
      const converted=MW.inventory.valueInUnit({value:delta,unit},have.unit,name);
      if(!Number.isFinite(converted)) throw new Error('Check cupboard quantity for '+name+' before confirming.');
      targetUnit=have.unit;deltaInTarget=converted;before=have.value;
    }
    const after=before+deltaInTarget;
    if(after<-0.000001) throw new Error('Check cupboard quantity for '+name+' before confirming.');
    const clean=Math.max(0,after);
    if(clean<=0.000001) delete state.inventory[key]; else state.inventory[key]={name:item?item.name:name,amountText:fmt({value:clean,unit:targetUnit}),updatedAt:now()};
  }
  function reconcile(input){
    input=Array.isArray(input)?{missingKeys:input}:input||{};
    return MW.state.transaction(st=>{
      const d=st.week&&st.week.delivery;
      if(!d||!Array.isArray(d.items)) throw new Error('No recorded order is available for this delivery.');
      const valid=new Set(d.items.map(x=>x.key)),missing=new Set(input.missingKeys||[]),actualInput=input.actualAmounts||{};
      if([...missing].some(k=>!valid.has(k))||Object.keys(actualInput).some(k=>!valid.has(k))) throw new Error('The delivery quantities do not match the recorded order.');
      const actualAmounts={},purchaseApplied={},surplusApplied={},shortfallAmounts={},received=[],short=[],comparisonUncertain=[];
      const actualName=x=>x.substitution&&x.substitution.replacementName||x.name;
      for(const x of d.items){
        const need=planned(x),sub=x.substitution||null,name=actualName(x);
        if(!need) throw new Error('Check the planned quantity for '+x.name+'.');
        const expected=sub?parse(sub.replacementAmount):need;
        if(!expected) throw new Error('Check the replacement quantity for '+name+'.');
        let actual=missing.has(x.key)?zero(expected.unit):parse(actualInput[x.key]||d.actualAmounts&&d.actualAmounts[x.key]||(sub&&sub.replacementAmount)||x.inventoryAmount||x.displayAmount);
        if(!actual||actual.unit!==expected.unit) throw new Error('Use the same quantity type for '+name+' as the item you bought.');
        actualAmounts[x.key]=fmt(actual);
        if(actual.value>0) received.push(x.key);

        const converted=sub?MW.inventory.valueInUnit(actual,need.unit,name):actual.value;
        const comparable=sub?sub.comparable!==false&&Number.isFinite(converted):true;
        let surplus=0,shortage=0;
        if(missing.has(x.key)){
          shortage=need.value;
          shortfallAmounts[x.key]=sub?fmt(expected):fmt({value:need.value,unit:need.unit});
        }else if(comparable){
          surplus=Math.max(0,converted-need.value);
          shortage=Math.max(0,need.value-converted);
          if(shortage>0.000001)shortfallAmounts[x.key]=fmt({value:shortage,unit:need.unit});
        }else if(actual.value>0){
          comparisonUncertain.push(x.key);
        }
        if(shortage>0.000001&&!short.includes(x.key))short.push(x.key);

        if(['Household','Extras'].includes(x.sourceGroup)) continue;
        const old=parse(d.purchaseApplied&&d.purchaseApplied[x.key])||zero(actual.unit);
        if(old.unit!==actual.unit&&!d.confirmed) throw new Error('Check the saved purchase quantity for '+name+'.');
        if(!d.confirmed) adjustInventory(st,name,actual.value-old.value,actual.unit);
        purchaseApplied[x.key]=d.confirmed?(d.purchaseApplied&&d.purchaseApplied[x.key]||fmt(actual)):fmt(actual);
        surplusApplied[x.key]=comparable&&surplus>0.000001?fmt({value:surplus,unit:need.unit}):'';
      }
      const oldProblemNames=new Set([...(d.missingNames||[]),...(d.shortNames||[])]);
      const problemNames=d.items.filter(x=>short.includes(x.key)&&!['Household','Extras'].includes(x.sourceGroup)).map(x=>x.substitution&&x.substitution.replacementName||x.name);
      st.week.forceBuy=[...new Set((st.week.forceBuy||[]).filter(n=>!oldProblemNames.has(n)).concat(problemNames))];
      const missingNames=d.items.filter(x=>missing.has(x.key)&&!['Household','Extras'].includes(x.sourceGroup)).map(x=>x.substitution&&x.substitution.replacementName||x.name);
      const shortNames=d.items.filter(x=>short.includes(x.key)&&!missing.has(x.key)&&!['Household','Extras'].includes(x.sourceGroup)).map(x=>x.substitution&&x.substitution.replacementName||x.name);
      Object.assign(d,{confirmed:true,confirmedAt:now(),receivedKeys:received,missingKeys:[...missing],shortKeys:short,missingNames,shortNames,actualAmounts,purchaseApplied,surplusApplied,shortfallAmounts,comparisonUncertainKeys:comparisonUncertain,receipt:input.receipt||d.receipt||null});
      st.week.status='delivery-checked';
      recordEvent(st,'delivery_reconciled',{received:received.length,missing:missing.size,short:short.length,comparisonUncertain:comparisonUncertain.length,substitutions:d.items.filter(x=>x.substitution).length,purchasedItems:Object.values(purchaseApplied).filter(Boolean).length,surplusItems:Object.values(surplusApplied).filter(Boolean).length});
      return d;
    });
  }
  MW.delivery={begin,reconcile};
})();

