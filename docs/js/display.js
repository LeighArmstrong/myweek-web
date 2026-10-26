window.MW = window.MW || {};
(function () {
  function escape(value) {
    return String(value == null ? '' : value).replace(
      /[&<>"']/g,
      (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character],
    );
  }
  function sentenceCase(value) {
    const text = String(value == null ? '' : value).trim();
    if (!text) return '';
    return text.replace(/^([^A-Za-z]*)([A-Za-z])/, function (_, prefix, letter) {
      return prefix + letter.toUpperCase();
    });
  }

  // Source records retain their original names. These labels work with supermarket ingredients.
  const ingredientLabels = [
    [/\bTenderstem[™®]?\s+Broccoli\b/gi, 'long-stem broccoli'],
    [/\bintense[™®]?\s+tomato\b/gi, 'tomato'],
    [/\bintense[™®]?\s+(chicken|vegetable|beef) stock mix\b/gi, '$1 stock mix'],
    [/\bSlooOW Stone Oven White Baguette\b/gi, 'white baguette'],
    [/\bJolly Hog\s+pork sausagemeat\b/gi, 'pork sausagemeat'],
    [/\bKNORR\s+Vegetable Stock\b/gi, 'vegetable stock'],
    [/\bTHIS[™®]?\s+Isn['’]t Pork Sausages\b/gi, 'plant-based sausages'],
    [/\bUnconventional Plant-Based Burgers\b/gi, 'plant-based burgers'],
    [/\bTABASCO[™®]?\s+Original Red Sauce\b/gi, 'red hot pepper sauce'],
    [/\bGuinness[™®]?\s+Paste\b/gi, 'stout paste'],
  ];
  function plainIngredientNames(value) {
    let text = String(value == null ? '' : value);
    for (const [pattern, replacement] of ingredientLabels) text = text.replace(pattern, replacement);
    return text
      .replace(/[™®]/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }
  // Inflect countable nouns only for unitless quantities. Weighted ingredient
  // amounts are not counts and must keep the original ingredient name.
  const countableIngredientPlurals = Object.freeze({
    clove: 'cloves',
    onion: 'onions',
    carrot: 'carrots',
    potato: 'potatoes',
    tomato: 'tomatoes',
    egg: 'eggs',
    lemon: 'lemons',
    lime: 'limes',
    sausage: 'sausages',
    fillet: 'fillets',
    breast: 'breasts',
    courgette: 'courgettes',
    leaf: 'leaves',
    chilli: 'chillies',
    tortilla: 'tortillas',
    wrap: 'wraps',
    cube: 'cubes',
    rasher: 'rashers',
    stick: 'sticks',
  });
  function ingredient(value, quantity) {
    const label = sentenceCase(plainIngredientNames(value));
    const count = String(quantity == null ? '' : quantity)
      .trim()
      .replace(/\s+total$/i, '');
    if (!/^\d+(?:\.\d+)?$/.test(count) || Number(count) <= 1) return label;
    const ending = label.match(/\b([A-Za-z]+)$/);
    const plural = ending && countableIngredientPlurals[ending[1].toLowerCase()];
    if (!plural) return label;
    const adjusted = /^[A-Z]/.test(ending[1]) ? plural[0].toUpperCase() + plural.slice(1) : plural;
    return label.slice(0, -ending[1].length) + adjusted;
  }

  function amount(value) {
    let text = String(value == null ? '' : value).trim();
    // Meal-kit source amounts such as "2 total" and "125 g total" are
    // quantities, not units. Keep the number but omit the supplier suffix.
    if (/^[0-9]/.test(text)) text = text.replace(/\s+total$/i, '');
    const m = text.match(
      /^([0-9]+(?:\.[0-9]+)?)\s+(slice|pack|tin|can|carton|bottle|clove|nest|fillet|wrap|tortilla|stick|banana|sachet|bunch|ball|rasher|pouch)$/i,
    );
    if (m && Number(m[1]) > 1) {
      const plurals = {
        slice: 'slices',
        pack: 'packs',
        tin: 'tins',
        can: 'cans',
        carton: 'cartons',
        bottle: 'bottles',
        clove: 'cloves',
        nest: 'nests',
        fillet: 'fillets',
        wrap: 'wraps',
        tortilla: 'tortillas',
        stick: 'sticks',
        banana: 'bananas',
        sachet: 'sachets',
        bunch: 'bunches',
        ball: 'balls',
        rasher: 'rashers',
        pouch: 'pouches',
      };
      text = m[1] + ' ' + plurals[m[2].toLowerCase()];
    }
    return /^[a-z]/.test(text) ? sentenceCase(text) : text;
  }
  function equipment(value) {
    return sentenceCase(value);
  }
  function plain(value) {
    return String(value == null ? '' : value).trim();
  }
  function numberFromAmount(value) {
    const m = plain(value).match(/^(-?\d+(?:\.\d+)?)/);
    return m ? Number(m[1]) : null;
  }
  function pluralWord(word, suffix) {
    if (suffix === 's') return word + 's';
    if (suffix === 'es') return word + 'es';
    if (suffix === 'ves') return /f$/i.test(word) ? word.slice(0, -1) + 'ves' : word + 'ves';
    if (suffix === 'ies') return /y$/i.test(word) ? word.slice(0, -1) + 'ies' : word + 'ies';
    return word;
  }
  function normalName(value) {
    return plain(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }
  function hasWholeWord(text, word) {
    return (' ' + text + ' ').includes(' ' + word + ' ');
  }
  function shouldPluralise(word, suffix, context) {
    const recipe = context && context.recipe,
      factor = Number(context && context.factor) || 1;
    if (!(recipe && Array.isArray(recipe.ingredients))) return false;
    const singular = normalName(word),
      plural = normalName(pluralWord(word, suffix));
    const row = recipe.ingredients.find((item) => {
      const n = normalName(item && item[1]);
      return n && (hasWholeWord(n, singular) || hasWholeWord(n, plural));
    });
    if (!row) return false;
    const qty = numberFromAmount(row[0]);
    if (!Number.isFinite(qty)) return false;
    const scaled = recipe.scaleSafe === false ? qty : qty * factor;
    return scaled > 1.000001;
  }
  function scaledNumber(value, factor) {
    const n = Number(value),
      x = n * (Number.isFinite(Number(factor)) ? Number(factor) : 1);
    if (!Number.isFinite(x)) return String(value);
    return Number.isInteger(x) ? String(x) : String(Math.round(x * 100) / 100);
  }
  const instructionActionStarters = new Set([
    'Add',
    'After',
    'Arrange',
    'Bake',
    'Bash',
    'Before',
    'Blend',
    'Blitz',
    'Boil',
    'Break',
    'Bring',
    'Brush',
    'Carefully',
    'Chop',
    'Coat',
    'Combine',
    'Continue',
    'Cook',
    'Cover',
    'Crack',
    'Crimp',
    'Crumble',
    'Crush',
    'Cut',
    'Deseed',
    'Dice',
    'Dig',
    'Dip',
    'Dissolve',
    'Divide',
    'Dollop',
    'Drain',
    'Dress',
    'Drizzle',
    'Dust',
    'Enjoy',
    'Fill',
    'Finely',
    'Flip',
    'Fluff',
    'Fold',
    'Fry',
    'Garnish',
    'Gently',
    'Give',
    'Gradually',
    'Grate',
    'Grind',
    'Halve',
    'Heat',
    'Hold',
    'Increase',
    'Keep',
    'Layer',
    'Lay',
    'Leave',
    'Line',
    'Make',
    'Mash',
    'Meanwhile',
    'Melt',
    'Mix',
    'Nestle',
    'Note',
    'Once',
    'Pat',
    'Peel',
    'Pick',
    'Pierce',
    'Place',
    'Pop',
    'Pour',
    'Preheat',
    'Press',
    'Prick',
    'Pull',
    'Push',
    'Put',
    'Quarter',
    'Raise',
    'Re-line',
    'Reboil',
    'Reduce',
    'Remove',
    'Repeat',
    'Replace',
    'Reserve',
    'Return',
    'Rinse',
    'Roast',
    'Roll',
    'Roughly',
    'Rub',
    'Run',
    'Scatter',
    'Score',
    'Scrape',
    'Scrunch',
    'Season',
    'Separate',
    'Serve',
    'Set',
    'Shape',
    'Share',
    'Shred',
    'Simmer',
    'Skim',
    'Slice',
    'Soak',
    'Spoon',
    'Spread',
    'Sprinkle',
    'Squeeze',
    'Stand',
    'Stir',
    'Stir-fry',
    'Strip',
    'Stuff',
    'Swirl',
    'Take',
    'Taste',
    'Tear',
    'Then',
    'Thread',
    'Tip',
    'Toast',
    'Top',
    'Toss',
    'Transfer',
    'Trim',
    'Turn',
    'Unwrap',
    'Use',
    'Wash',
    'When',
    'While',
    'Whisk',
    'Wipe',
    'Whilst',
    'Zest',
  ]);
  // Parenthetical notes (often questions about spice or batch sizes) are part of
  // their surrounding action, even if they contain punctuation or imperative verbs.
  function insideBrackets(text, end) {
    let round = 0;
    let square = 0;
    for (let i = 0; i < end; i++) {
      if (text[i] === '(') round++;
      else if (text[i] === ')') round = Math.max(0, round - 1);
      else if (text[i] === '[' && text.indexOf(']', i + 1) !== -1) square++;
      else if (text[i] === ']') square = Math.max(0, square - 1);
    }
    return round > 0 || square > 0;
  }
  function restoreInstructionBoundaries(value) {
    let text = plain(value)
      .replace(/\s+([,.;!?])/g, '$1')
      .replace(/\.{2,}/g, '.')
      .replace(/\s{2,}/g, ' ');
    text = text.replace(/\s+([A-Z][A-Za-z'-]*)\b/g, function (match, word, offset, whole) {
      if (!instructionActionStarters.has(word) || insideBrackets(whole, offset)) return match;
      const before = whole.slice(0, offset).trimEnd().slice(-1);
      if (!before || /[.!?;:,–—-]/.test(before)) return match;
      return '. ' + word;
    });
    text = text.trim();
    if (text && !/[.!?][\"'’)?\]]*$/.test(text)) text += '.';
    return text;
  }
  function splitInstructionActions(value) {
    const text = plain(value);
    if (!text) return [];
    const result = [];
    let start = 0;
    let round = 0;
    let square = 0;
    for (let i = 0; i < text.length; i++) {
      const character = text[i];
      if (character === '(') round++;
      else if (character === ')') round = Math.max(0, round - 1);
      else if (character === '[' && text.indexOf(']', i + 1) !== -1) square++;
      else if (character === ']') square = Math.max(0, square - 1);
      if (!/[.!?]/.test(character) || round || square) continue;
      if (!/\s/.test(text[i + 1] || '')) continue;
      let next = i + 1;
      while (next < text.length && /\s/.test(text[next])) next++;
      if (!/[A-Z]/.test(text[next] || '')) continue;
      const action = text.slice(start, i + 1).trim();
      if (action) result.push(action);
      start = next;
      i = next - 1;
    }
    const last = text.slice(start).trim();
    if (last) result.push(last);
    return result;
  }
  // Present source methods without changing their records or source-image indexes.
  function method(recipe) {
    const preparation = [],
      steps = [];
    for (const [sourceIndex, value] of (recipe.steps || []).entries()) {
      const source = plain(value);
      const readiness =
        sourceIndex === 0 &&
        /before you begin/i.test(source) &&
        /get (?:all your|your [^.]+ and all your) ingredients/i.test(source);
      let text = source
        .replace(/^Spend less time cooking and make dinner work around you\.\s*/i, '')
        .replace(/^Before you begin[.,!\s]*/i, '')
        .replace(/^Now,? let['’]s get started!\s*/i, '');
      if (readiness) {
        text = text
          .replace(/^This recipe takes around 5-\s*10 min\s*to prep, so\s*/i, 'Prep: 5–10 min. ')
          .replace(/^Get all your ingredients and equipment ready\s*/i, '')
          .replace(
            /(?:^|(?<=Prep: 5–10 min\. ))Get your [^.]+? and all your ingredients ready,?\s*(?:then\s*)?/i,
            '',
          )
          .replace(/^Skim through these steps,?\s*(?:then\s*)?/i, '')
          .replace(
            /Note: Equipment and pan sizes vary\. Make sure you cook (?:your )?food thoroughly \(even if it takes you a little longer than 10 mins?\)/i,
            'Cook food thoroughly; timings can vary with your equipment.',
          )
          .replace(
            /Note: Microwave ovens vary\. Make sure you heat food thoroughly \(even if it takes you a little longer than 10 min\)/i,
            'Heat food thoroughly; microwave timings can vary.',
          );
        text = text.replace(/^(Prep: 5–10 min\. )wash/i, function (_, prefix) {
          return prefix + 'Wash';
        });
        if (text) preparation.push(text);
      } else if (text) steps.push({ text, sourceIndex });
    }
    // An unusual recipe containing only a readiness entry must remain readable.
    if (!steps.length)
      return {
        preparation: [],
        steps: (recipe.steps || []).map((text, sourceIndex) => ({ text, sourceIndex })),
      };
    return { preparation, steps };
  }
  function instruction(value, context) {
    let text = plainIngredientNames(plain(value)),
      factor = Number(context && context.factor);
    if (!Number.isFinite(factor) || factor <= 0) factor = 1;
    text = text.replace(
      /\b(\d+(?:\.\d+)?)(\s*(?:tsp|tbsp|g|kg|ml|l|cm|mm)?)\s*\[(\d+(?:\.\d+)?)(\s*(?:tsp|tbsp|g|kg|ml|l|cm|mm)?)\]/gi,
      function (_, base, baseUnit, alt, altUnit) {
        if (Math.abs(factor - 2) < 0.01) return alt + (altUnit || baseUnit || '');
        return scaledNumber(base, factor) + (baseUnit || altUnit || '');
      },
    );
    text = text.replace(/\b([A-Za-z]+)\[\s*(s|es|ves|ies)\s*\]/g, function (_, word, suffix) {
      return shouldPluralise(word, suffix, context) ? pluralWord(word, suffix) : word;
    });
    return sentenceCase(restoreInstructionBoundaries(text));
  }

  MW.display = {
    escape,
    sentenceCase,
    ingredient,
    plainIngredientNames,
    amount,
    equipment,
    instruction,
    method,
    restoreInstructionBoundaries,
    splitInstructionActions,
    actionStarters: [...instructionActionStarters],
  };
})();
