window.MW = window.MW || {};
(function(){
  const ROOT='assets/images/pexels/';
  const pexels=id=>ROOT+String(id)+'.jpg';
  const hash=text=>{let h=2166136261;for(const ch of String(text||'')){h^=ch.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
  const pick=(items,seed)=>items[hash(seed)%items.length];
  function heroForOnline(meal){
    const text=[meal&&meal.title,meal&&meal.category,meal&&meal.area].filter(Boolean).join(' ').toLowerCase();
    if(/prawn|shrimp/.test(text)&&/pasta|spaghetti|linguine|penne/.test(text)) return pexels('31779535');
    if(/prawn|shrimp/.test(text)&&/rice|bowl/.test(text)) return pick([pexels('11015917'),pexels('11527489'),pexels('8286766')],text);
    if(/salmon/.test(text)&&/rice|bowl/.test(text)) return pexels('36964109');
    if(/chicken/.test(text)&&/pasta|spaghetti|linguine|penne/.test(text)) return pexels('33515064');
    if(/chicken/.test(text)&&/rice|bowl/.test(text)) return pexels('28442544');
    if(/beef/.test(text)&&/noodle/.test(text)) return pexels('4368803');
    if(/pork/.test(text)&&/pasta/.test(text)) return pexels('16010637');
    // Protect the known main ingredient before generic format fallbacks.
    if(/prawn|shrimp/.test(text)) return pick([pexels('19359941'),pexels('8286766'),pexels('11527489'),pexels('18285312')],text);
    if(/salmon/.test(text)) return pick([pexels('36964109'),pexels('10942354')],text);
    if(/cod/.test(text)) return pick([pexels('11044248'),pexels('5713767')],text);
    if(/chicken/.test(text)) return pick([pexels('27831791'),pexels('25749300'),pexels('38163945')],text);
    if(/beef/.test(text)) return pexels('4661807');
    if(/pork/.test(text)) return pick([pexels('17308538'),pexels('10692537')],text);
    if(/lamb/.test(text)) return pexels('10692537');
    if(/fish|seafood/.test(text)) return pick([pexels('11044248'),pexels('36964109')],text);
    if(/meat/.test(text)) return pexels('30700759');
    if(/pasta|spaghetti|linguine|penne|macaroni/.test(text)) return pexels('19037599');
    if(/curry|indian|dal|dhal/.test(text)) return pexels('7353487');
    if(/salad|greek|mediterranean/.test(text)) return pexels('19295808');
    if(/taco|mexican|burrito/.test(text)) return pexels('5848714');
    return pick([pexels('8996219'),pexels('4519052'),pexels('27098516'),pexels('11432286')],text);
  }
  MW.images={root:ROOT,pexels,heroForOnline,bundled:true,provenance:'Pexels photography downloaded during the signed Android build and packaged inside the APK.'};
})();