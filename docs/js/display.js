window.MW = window.MW || {};
(function(){
  function sentenceCase(value){
    const text=String(value==null?'':value).trim();
    if(!text) return '';
    return text.replace(/^([^A-Za-z]*)([A-Za-z])/,function(_,prefix,letter){return prefix+letter.toUpperCase();});
  }

  function ingredient(value){return sentenceCase(value);}
  function amount(value){
    let text=String(value==null?'':value).trim();
    const m=text.match(/^([0-9]+(?:\.[0-9]+)?)\s+(slice|pack|tin|can|carton|bottle|clove|nest|fillet|wrap|tortilla|stick|banana|sachet|bunch|ball|rasher|pouch)$/i);
    if(m&&Number(m[1])>1){
      const plurals={slice:'slices',pack:'packs',tin:'tins',can:'cans',carton:'cartons',bottle:'bottles',clove:'cloves',nest:'nests',fillet:'fillets',wrap:'wraps',tortilla:'tortillas',stick:'sticks',banana:'bananas',sachet:'sachets',bunch:'bunches',ball:'balls',rasher:'rashers',pouch:'pouches'};
      text=m[1]+' '+plurals[m[2].toLowerCase()];
    }
    return /^[a-z]/.test(text)?sentenceCase(text):text;
  }
  function equipment(value){return sentenceCase(value);}
  function plain(value){return String(value==null?'':value).trim();}
  function numberFromAmount(value){
    const m=plain(value).match(/^(-?\d+(?:\.\d+)?)/);
    return m?Number(m[1]):null;
  }
  function pluralWord(word,suffix){
    if(suffix==='s')return word+'s';
    if(suffix==='es')return word+'es';
    if(suffix==='ves')return /f$/i.test(word)?word.slice(0,-1)+'ves':word+'ves';
    if(suffix==='ies')return /y$/i.test(word)?word.slice(0,-1)+'ies':word+'ies';
    return word;
  }
  function normalName(value){return plain(value).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
  function hasWholeWord(text,word){return (' '+text+' ').includes(' '+word+' ');}
  function shouldPluralise(word,suffix,context){
    const recipe=context&&context.recipe,factor=Number(context&&context.factor)||1;
    if(!(recipe&&Array.isArray(recipe.ingredients)))return false;
    const singular=normalName(word),plural=normalName(pluralWord(word,suffix));
    const row=recipe.ingredients.find(item=>{
      const n=normalName(item&&item[1]);
      return n&&(hasWholeWord(n,singular)||hasWholeWord(n,plural));
    });
    if(!row)return false;
    const qty=numberFromAmount(row[0]);
    if(!Number.isFinite(qty))return false;
    const scaled=recipe.scaleSafe===false?qty:qty*factor;
    return scaled>1.000001;
  }
  function scaledNumber(value,factor){
    const n=Number(value),x=n*(Number.isFinite(Number(factor))?Number(factor):1);
    if(!Number.isFinite(x))return String(value);
    return Number.isInteger(x)?String(x):String(Math.round(x*100)/100);
  }
  const instructionActionStarters=new Set([
    'Add','After','Arrange','Bake','Bash','Before','Blend','Blitz','Boil','Break','Bring','Brush','Carefully','Chop','Coat','Combine','Continue','Cook','Cover','Crack','Crimp','Crumble','Crush','Cut','Deseed','Dice','Dig','Dip','Dissolve','Divide','Dollop','Drain','Dress','Drizzle','Dust','Enjoy','Fill','Finely','Flip','Fluff','Fold','Fry','Garnish','Gently','Give','Gradually','Grate','Grind','Halve','Heat','Hold','Increase','Keep','Layer','Lay','Leave','Line','Make','Mash','Meanwhile','Melt','Mix','Nestle','Note','Once','Pat','Peel','Pick','Pierce','Place','Pop','Pour','Preheat','Press','Prick','Pull','Push','Put','Quarter','Raise','Re-line','Reboil','Reduce','Remove','Repeat','Replace','Reserve','Return','Rinse','Roast','Roll','Roughly','Rub','Run','Scatter','Score','Scrape','Scrunch','Season','Separate','Serve','Set','Shape','Share','Shred','Simmer','Skim','Slice','Soak','Spoon','Spread','Sprinkle','Squeeze','Stand','Stir','Stir-fry','Strip','Stuff','Swirl','Take','Taste','Tear','Then','Thread','Tip','Toast','Top','Toss','Transfer','Trim','Turn','Unwrap','Use','Wash','When','While','Whisk','Wipe','Whilst','Zest'
  ]);
  function restoreInstructionBoundaries(value){
    let text=plain(value).replace(/\s+([,.;!?])/g,'$1').replace(/\.{2,}/g,'.').replace(/\s{2,}/g,' ');
    text=text.replace(/\s+([A-Z][A-Za-z'-]*)\b/g,function(match,word,offset,whole){
      if(!instructionActionStarters.has(word))return match;
      const before=whole.slice(0,offset).trimEnd().slice(-1);
      if(!before||/[.!?;:,–—-]/.test(before))return match;
      return '. '+word;
    });
    text=text.trim();
    if(text&&!/[.!?][\"'’)?\]]*$/.test(text))text+='.';
    return text;
  }
  function instruction(value,context){
    let text=plain(value),factor=Number(context&&context.factor);
    if(!Number.isFinite(factor)||factor<=0)factor=1;
    text=text.replace(/\b(\d+(?:\.\d+)?)(\s*(?:tsp|tbsp|g|kg|ml|l|cm|mm)?)\s*\[(\d+(?:\.\d+)?)(\s*(?:tsp|tbsp|g|kg|ml|l|cm|mm)?)\]/gi,function(_,base,baseUnit,alt,altUnit){
      if(Math.abs(factor-2)<0.01)return alt+(altUnit||baseUnit||'');
      return scaledNumber(base,factor)+(baseUnit||altUnit||'');
    });
    text=text.replace(/\b([A-Za-z]+)\[\s*(s|es|ves|ies)\s*\]/g,function(_,word,suffix){
      return shouldPluralise(word,suffix,context)?pluralWord(word,suffix):word;
    });
    return sentenceCase(restoreInstructionBoundaries(text));
  }

  MW.display={sentenceCase,ingredient,amount,equipment,instruction,restoreInstructionBoundaries,actionStarters:[...instructionActionStarters]};
})();
