window.MW=window.MW||{};
(function(){
  'use strict';
  const norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9. ]/g,' ').replace(/\s+/g,' ').trim();
  const replacements=[[/\bbroc\b/g,'broccoli'],[/\bprk\b/g,'pork'],[/\bminc?\b/g,'mince'],[/\bmlk\b/g,'milk'],[/\byogrt\b/g,'yoghurt'],[/\bsld\b/g,'salad'],[/\btomatos\b/g,'tomatoes'],[/\bstk\b/g,'stock'],[/\br wine\b/g,'red wine'],[/\bmed\b/g,'medium'],[/\bchoc\b/g,'chocolate'],[/\bchoriz\b/g,'chorizo'],[/\bveg\b/g,'vegetable']];
  const stop=new Set(['js','sstc','ttc','ft','nfc','pk','spk','fresh','brit','british','the','style','pack']);
  function canonical(x){let s=' '+norm(x)+' ';for(const [re,to] of replacements)s=s.replace(re,' '+to+' ');return s.replace(/\s+/g,' ').trim();}
  function tokens(x){return canonical(x).split(' ').filter(t=>t.length>1&&!stop.has(t)&&!/^\d+(?:\.\d+)?(?:kg|g|ml|l)?$/.test(t)&&!/^x\d+$/.test(t));}
  function quantityFromLabel(label){
    const s=String(label||'').toUpperCase().replace(/,/g,'.').replace(/×/g,'X');
    const combo=s.match(/\b(\d+)\s*X\s*(\d+(?:\.\d+)?)\s*(KG|ML|G|L)\b/);
    if(combo){let value=Number(combo[2]),unit=combo[3].toLowerCase();if(unit==='kg'){value*=1000;unit='g';}if(unit==='l'){value*=1000;unit='ml';}return {value:value*Number(combo[1]),unit};}
    const m=s.match(/(\d+(?:\.\d+)?)\s*(KG|ML|G|L)\b/);
    if(m){
      let value=Number(m[1]),unit=m[2].toLowerCase();if(unit==='kg'){value*=1000;unit='g';}if(unit==='l'){value*=1000;unit='ml';}
      const tail=s.slice((m.index||0)+m[0].length),trail=(tail.match(/\bX\s*(\d+)\b/)||[])[1];
      const lead=s.slice(0,m.index||0),before=(lead.match(/(\d+)\s*X\s*$/)||[])[1],leading=(s.match(/^\s*(\d+)\s*X\b/)||[])[1];
      return {value:value*Math.max(1,Number(trail||before||leading)||1),unit};
    }
    const x=(s.match(/X\s*(\d+)\b/)||s.match(/\b(\d+)\s*PK\b/)||s.match(/\bPK\s*X?\s*(\d+)\b/)||s.match(/^\s*(\d+)\s*X\b/)||s.match(/^\s*(\d+)\s*@\b/));
    if(x)return {value:Number(x[1]),unit:'count'};
    return null;
  }
  function baseKey(label){return canonical(String(label||'').replace(/\b\d+(?:[.,]\d+)?\s*(?:kg|g|ml|l)\b/gi,' ').replace(/x\s*\d+\b/gi,' '));}
  function parse(text){
    const rows=String(text||'').split(/\r?\n/).map(x=>x.replace(/\s+/g,' ').trim()).filter(Boolean),rawItems=[];let total=null,cancel=false;
    for(const row of rows){
      const balance=row.match(/\bBALANCE\s+DUE\b.*?(\d+[.,]\d{2})\s*$/i);if(balance){total=Number(balance[1].replace(',','.'));continue;}
      if(/\bITEM\s+CANCELLED\b/i.test(row)){cancel=true;continue;}
      if(/NECTAR PRICE SAVING|POINTS EARNED|PREVIOUS POINTS|DEBIT|MASTERCARD|VISA|CHANGE\b|VAT\b|AUTH CODE|PIN VERIFIED|PROMOTIONS TODAY|MY NECTAR|BALANCE DUE/i.test(row))continue;
      const m=row.match(/^(.*?)\s+(-?)\s*£?\s*(\d+[.,]\d{2})\s*$/);if(!m)continue;
      let label=m[1].replace(/^\*/,'').trim(),price=(m[2]==='-'?-1:1)*Number(m[3].replace(',','.'));
      if(cancel){const key=baseKey(label);for(let i=rawItems.length-1;i>=0;i--){if(rawItems[i].key===key){rawItems.splice(i,1);break;}}cancel=false;continue;}
      if(price<0)continue;
      if(/^(?:\d+\s+)?(?:BALANCE|TOTAL|SUBTOTAL)\b/i.test(label))continue;
      const qty=quantityFromLabel(label),key=baseKey(label);if(!key)continue;
      rawItems.push({raw:row,label,key,price,quantity:qty});
    }
    const map=new Map();for(const x of rawItems){const cur=map.get(x.key)||{label:x.label,key:x.key,price:0,occurrences:0,quantity:null,raw:[]};cur.price+=x.price;cur.occurrences++;cur.raw.push(x.raw);if(x.quantity){if(!cur.quantity)cur.quantity={...x.quantity};else if(cur.quantity.unit===x.quantity.unit)cur.quantity.value+=x.quantity.value;else cur.quantity=null;}map.set(x.key,cur);}
    return {items:[...map.values()],total,lineCount:rows.length,itemLineCount:rawItems.length};
  }
  const prefix=(a,b)=>a===b||(a.length>=4&&b.length>=4&&(a.startsWith(b)||b.startsWith(a)));
  function score(receiptLabel,candidate){
    const a=tokens(receiptLabel),b=tokens(candidate);if(!a.length||!b.length)return 0;let matched=0;for(const t of b)if(a.some(x=>prefix(x,t)))matched++;let s=matched/Math.max(1,b.length);const ca=canonical(receiptLabel),cb=canonical(candidate);if(ca.includes(cb)||cb.includes(ca))s=Math.max(s,.92);if(a.some(x=>b.some(y=>x===y)))s+=.08;return Math.min(1,s);
  }
  function candidateNames(item){const out=[item.name,item.label,item.priceLabel];try{const e=MW.pricing&&MW.pricing.entryFor(item.name);if(e){out.push(e.label,e.observedRetail&&e.observedRetail.note);}}catch{}return out.filter(Boolean);}
  function proposedAmount(item,receipt){
    const unit=item.unit||((MW.inventory.parseAmount(item.displayAmount)||{}).unit),q=receipt.quantity;
    if(q&&unit){
      if(q.unit===unit)return {amount:MW.inventory.formatAmount(q),basis:'receipt-quantity'};
      if(q.unit==='count'&&['each','count','banana','pack','tin','can','carton','bottle','clove','nest','fillet','wrap','tortilla','sachet','bunch','ball','rasher','slice','pouch'].includes(unit))return {amount:MW.inventory.formatAmount({value:q.value,unit}),basis:'receipt-count'};
    }
    const pack=MW.inventory.parseAmount(item.packSize);
    if(pack&&unit&&pack.unit===unit)return {amount:MW.inventory.formatAmount({value:pack.value*Math.max(1,receipt.occurrences),unit}),basis:'known-pack-size'};
    return {amount:item.inventoryAmount||item.displayAmount||'',basis:'planned-default'};
  }
  function match(planned,parsed){
    const pairs=[];for(const p of planned||[])for(const r of parsed.items||[]){let best=0;for(const name of candidateNames(p))best=Math.max(best,score(r.label,name));if(best>=.46)pairs.push({p,r,score:best});}
    pairs.sort((a,b)=>b.score-a.score);const usedP=new Set(),usedR=new Set(),matches=[];
    for(const x of pairs){if(usedP.has(x.p.key)||usedR.has(x.r.key))continue;usedP.add(x.p.key);usedR.add(x.r.key);const proposal=proposedAmount(x.p,x.r),rounded=Math.round(x.score*100)/100,needsReview=rounded<.72||['known-pack-size','planned-default'].includes(proposal.basis);matches.push({key:x.p.key,name:x.p.name,receiptLabel:x.r.label,score:rounded,actualAmount:proposal.amount,amountBasis:proposal.basis,needsReview,occurrences:x.r.occurrences,receiptPrice:Math.round(x.r.price*100)/100});}
    return {matches,unmatchedPlanned:(planned||[]).filter(x=>!usedP.has(x.key)),unmatchedReceipt:(parsed.items||[]).filter(x=>!usedR.has(x.key)),total:parsed.total};
  }
  MW.receipt={parse,match,score,quantityFromLabel};
})();
