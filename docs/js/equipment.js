window.MW = window.MW || {};
(function(){
  const items=[
    {id:'slow-cooker',label:'Slow cooker',icon:'clock'},
    {id:'air-fryer',label:'Air fryer',icon:'wind'},
    {id:'microwave',label:'Microwave',icon:'wave-square'},
    {id:'blender',label:'Blender / hand blender',icon:'blender'},
    {id:'food-processor',label:'Food processor',icon:'gears'},
    {id:'pressure-cooker',label:'Pressure cooker',icon:'gauge-high'},
    {id:'barbecue',label:'Barbecue / outdoor grill',icon:'fire'}
  ];

  const patterns=[
    {id:'slow-cooker',terms:['slow cooker','slow-cooker','crockpot','crock pot']},
    {id:'air-fryer',terms:['air fryer','air-fryer']},
    {id:'pressure-cooker',terms:['pressure cooker','instant pot']},
    {id:'food-processor',terms:['food processor']},
    {id:'blender',terms:['hand blender','stick blender','blender']},
    {id:'microwave',terms:['microwave']},
    {id:'barbecue',terms:['barbecue','barbeque','bbq','outdoor grill']}
  ];

  function requirements(recipe){
    const explicit=Array.isArray(recipe&&recipe.requiredEquipment)?recipe.requiredEquipment.filter(Boolean):[];
    if(explicit.length) return [...new Set(explicit)];
    // A flavour name (for example BBQ sauce) does not require an appliance.
    // Explicit requirements win; otherwise inspect method/equipment, not tags.
    const text=[...(recipe&&recipe.sourceEquipment||[]),...(recipe&&recipe.steps||[])]
      .filter(Boolean).join(' ').toLowerCase()
      .replace(/\b(?:barbecue|barbeque|bbq)\s+(?:sauce|seasoning|marinade|spice(?: mix)?)/g,'sauce');
    return patterns.filter(p=>p.terms.some(t=>text.includes(t))).map(p=>p.id);
  }

  function available(household){
    return new Set(Array.isArray(household&&household.equipment)?household.equipment:[]);
  }

  function allows(recipe,household){
    const have=available(household);
    return requirements(recipe).every(id=>have.has(id));
  }

  function missing(recipe,household){
    const have=available(household);
    return requirements(recipe).filter(id=>!have.has(id));
  }

  function label(id){const x=items.find(v=>v.id===id);return x?x.label:id;}

  MW.equipment={items,requirements,available,allows,missing,label};
})();
