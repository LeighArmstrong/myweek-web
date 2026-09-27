window.MW = window.MW || {};
(function(){
  function sentenceCase(value){
    const text=String(value==null?'':value).trim();
    if(!text) return '';
    return text.replace(/^([^A-Za-z]*)([A-Za-z])/,function(_,prefix,letter){return prefix+letter.toUpperCase();});
  }

  function ingredient(value){return sentenceCase(value);}
  function amount(value){
    const text=String(value==null?'':value).trim();
    return /^[a-z]/.test(text)?sentenceCase(text):text;
  }
  function equipment(value){return sentenceCase(value);}
  function instruction(value){return sentenceCase(value);}

  MW.display={sentenceCase,ingredient,amount,equipment,instruction};
})();
