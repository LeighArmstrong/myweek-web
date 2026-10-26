window.MW = window.MW || {};
(function () {
  const norm = (x) =>
    String(x || '')
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  const visualKey = (r) => {
    const photo = r && MW.sourcedFinalCache && MW.sourcedFinalCache[r.id];
    if (
      photo &&
      photo.role === 'declared-final' &&
      photo.source === r.sourceImageUrl &&
      /^[a-f0-9]{64}$/.test(photo.sha256)
    )
      return 'sha256:' + photo.sha256;
    return (r && r.sourceImageUrl) || (r && r.imageBase) || (r && r.image) || '';
  };
  const sourceFamilyKey = (r) => {
    const src = String((r && r.sourceImageUrl) || '');
    const match = src.match(/_UK_([^_/?#]+)_/i);
    return match ? match[1].toLowerCase() : '';
  };
  const titleTokens = (r) =>
    String((r && r.title) || '')
      .toLowerCase()
      .match(/[a-z0-9]+/g) || [];
  const titleSimilarity = (a, b) => {
    const stop = new Set(['with', 'and', 'the', 'a', 'an', 'style', 'of', 'in', 'on', 'your', 'our']);
    const aa = new Set(titleTokens(a).filter((x) => !stop.has(x)));
    const bb = new Set(titleTokens(b).filter((x) => !stop.has(x)));
    if (!aa.size || !bb.size) return 0;
    let shared = 0;
    aa.forEach((x) => {
      if (bb.has(x)) shared++;
    });
    const union = new Set([...aa, ...bb]).size;
    return union ? shared / union : 0;
  };
  const isNearClone = (recipe, chosen) =>
    chosen.some((x) => {
      const a = sourceFamilyKey(recipe),
        b = sourceFamilyKey(x);
      if (a && b && a === b) return true;
      const sim = titleSimilarity(recipe, x);
      const short = Math.min(titleTokens(recipe).length, titleTokens(x).length);
      return short >= 4 && sim >= 0.72;
    });
  const getRecipe = (id) => (MW.catalog && MW.catalog.get(id)) || MW.RECIPES.find((x) => x.id === id);

  function startOfWeek(date) {
    const d = new Date(date || new Date());
    d.setHours(12, 0, 0, 0);
    const offset = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - offset);
    return d;
  }

  function dateKey(date) {
    const d = new Date(date);
    return [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, '0'),
      String(d.getDate()).padStart(2, '0'),
    ].join('-');
  }

  function currentWeekKey(date) {
    return dateKey(startOfWeek(date || new Date()));
  }

  function todayKey(date) {
    const order = MW.DAYS.map((x) => x.key);
    return order[(new Date(date || new Date()).getDay() + 6) % 7] || 'mon';
  }

  // Once an order exists, keep the planned meals and shopping evidence immutable.
  // A new plan is allowed only after a completed delivery in an older week.
  function currentPlanLocked(state) {
    return Boolean(state.week?.delivery || ['order-placed', 'delivery-checked'].includes(state.week?.status));
  }

  function generationBlockedByDelivery(state) {
    const week = state.week;
    return Boolean(
      currentPlanLocked(state) && (week.weekKey === currentWeekKey() || !week.delivery?.confirmed),
    );
  }

  function remainingDinnerDays(date, days) {
    const order = MW.DAYS.map((x) => x.key);
    const todayIndex = (new Date(date || new Date()).getDay() + 6) % 7;
    return (days || MW.state.get().plan.dinnerDays || []).filter((x) => order.indexOf(x) >= todayIndex);
  }

  function allowed(recipe) {
    const s = MW.state.get();
    const avoid = [...(s.household.restrictions || [])].filter(Boolean);
    const basic = MW.avoidance
      ? !MW.avoidance.recipeContains(recipe, avoid)
      : !avoid.some((x) =>
          (recipe.title + ' ' + recipe.subtitle + ' ' + recipe.ingredients.map((y) => y[1]).join(' '))
            .toLowerCase()
            .includes(String(x).toLowerCase()),
        );
    const foodOk = !MW.food || MW.food.allowed(recipe, s.foodProfile);
    const equipmentOk = !MW.equipment || MW.equipment.allows(recipe, s.household);
    return basic && foodOk && equipmentOk;
  }

  // Some published "Double" dinners supply two portions of chicken or fish
  // per person. Keep their original amounts for deliberate selection, but do
  // not propose them during ordinary week generation.
  function doubleProteinPortion(recipe) {
    if (!/\bdouble\b/i.test(String(recipe?.title))) return false;
    const servings = Number(recipe?.servings);
    if (!Number.isFinite(servings) || servings < 1) return false;
    return (recipe.ingredients || []).some(([amount, ingredient]) => {
      if (
        !/\b(chicken|barramundi|salmon|basa|cod|haddock|sea bass|sausages?|halloumi|paneer|pork|beef|lamb|gammon|ham|bacon|lardons?|prawns?|mussels?|fish pie mix|falafels?|tofu|chorizo)\b/i.test(
          String(ingredient),
        )
      )
        return false;
      const text = String(amount).trim();
      const pieces = text.match(/^(\d+(?:\.\d+)?)(?:\s*(?:breasts?|fillets?|slices?|rashers?|each))?$/i);
      if (pieces) return Number(pieces[1]) >= servings * 2;
      const weight = text.match(/^(\d+(?:\.\d+)?)\s*(g|kg)$/i);
      if (!weight) return false;
      const grams = Number(weight[1]) * (weight[2].toLowerCase() === 'kg' ? 1000 : 1);
      const gramsPerPerson = /\bfalafels?\b/i.test(String(ingredient))
        ? 150
        : /\bchorizo\b/i.test(String(ingredient))
          ? 50
          : /\b(bacon|lardons?)\b/i.test(String(ingredient))
            ? 60
            : /\bprawns?\b/i.test(String(ingredient))
              ? 150
              : 200;
      return grams >= servings * gramsPerPerson;
    });
  }
  // These supplier-specific methods or pack quantities are unresolved in the
  // contextual review ledger. Never suggest them without an explicit choice.
  // Keep them viewable and selectable rather than silently deleting recipes.
  const heldSourceRecipeIds = new Set([
    'hf-6a8f1b5ff3876e995cfad434',
    'hf-6a85d790dc2773aa1a332117',
    'hf-6a735a31e4ad299a87820993',
    'hf-6a735a31e4ad299a87820991',
    'gousto-4dbc753a-911d-4f8a-941c-7351c113f01c',
    'hf-6a85d7aedc2773aa1a33216b',
    'hf-6a6a1e65640e6eb29c2b111c',
    'hf-6a7dc176ba6139d3db0352c9',
    'hf-6a6a1d6d2d6012a9c513762c',
    'hf-6a6a1d5d640e6eb29c2b1018',
    'hf-6a4e7627746dd895cd0ba8ee',
    'hf-69dfbf554af8f3547a64806c',
    'hf-693adc1fdce6a2dc39a7eb94',
    'hf-6a3c01b0f396cfc62f2ac8a9',
    'hf-6a7dc1513de1efe38edb3ee1',
    'hf-6a735b08ff4bdb2558537fb0',
    'hf-6a735b08ff4bdb2558537fae',
    'hf-6a735a51ebec54be3cd9d85b',
    'hf-6a85d79d7a45bccee4d1cd93',
    'hf-6a85d7937a45bccee4d1cd6d',
    'hf-6a60f6c003796ab64929ec80',
    'hf-6a4538aa66926770e8cd4dcd',
    'hf-6a4538ad66926770e8cd4dd6',
    'hf-69e8e3acfe534c766c4598db',
    'hf-69e8e3ac4af8f3547a65cff1',
    'hf-6a3c01c94e4b173945bdf8c3',
    'hf-69f213d0d52e296f6a388071',
    'hf-69d7cde64604fa2f60f0f4b3',
    'hf-6669685b83f11ad6c3c65c29',
    'hf-6a735a77e4ad299a878209ca',
    'hf-6a7dc163ba6139d3db0352a1',
    'hf-6a60f75d20a15d56f3c81ab7',
    'hf-6a60f7300e64e4eb8f9117e6',
    'hf-6a6a1e1e640e6eb29c2b10d5',
    'hf-6a6a1d5a640e6eb29c2b1016',
    'hf-6a6a1dd82d6012a9c5137686',
    'hf-6a60f76b20a15d56f3c81ac5',
    'hf-6a60f6cb20a15d56f3c81a40',
    'hf-6a6a1e6d640e6eb29c2b1126',
    'hf-6a6a1dac97f1e02209178d16',
    'hf-6a6a1e4397f1e02209178db9',
    'hf-6a735b23e4ad299a87820a77',
    'hf-6a735b15e4ad299a87820a66',
    'hf-6a735ae4ebec54be3cd9d8fa',
    'hf-6a735a7bebec54be3cd9d87b',
    'hf-6a60f6ef20a15d56f3c81a60',
    'hf-6a6a1e602d6012a9c51376f6',
    'hf-6a6a1e5297f1e02209178dce',
    'hf-6a6a1e4f2d6012a9c51376eb',
    'hf-6a6a1de4640e6eb29c2b109b',
    'hf-6a6a1de42d6012a9c5137695',
    'hf-6a60f7ce0e64e4eb8f911861',
    'hf-6a60f7c903796ab64929ed27',
    'hf-6a60f7820e64e4eb8f91181e',
    'hf-6a60f6ed20a15d56f3c81a5a',
    'hf-6a60f6b320a15d56f3c81a26',
    'hf-6a85d77aad97f3b5c2ccd00c',
    'hf-6a85d76adc2773aa1a332087',
    'hf-6a7dc10689b1afe9072f7a62',
    'hf-6a7dc10689b1afe9072f7a60',
    'hf-6a7dc0763de1efe38edb3e77',
    'hf-6a735b0ce4ad299a87820a5e',
    'hf-6a6a1d6a97f1e02209178cdd',
    'hf-6a6a1d63640e6eb29c2b1020',
    'hf-6a7211feff4bdb2558531775',
    'hf-6a7211feebec54be3cd9759c',
    'hf-6a7211feff4bdb2558531773',
    'gousto-5fcb9a92-def6-47b8-94e9-f038e31c79b2',
    'hf-6a735a84e4ad299a878209e1',
    'hf-6a60e2480e64e4eb8f911165',
    'hf-6a60f6fd0e64e4eb8f9117af',
    'hf-6a60f6fd0e64e4eb8f9117b2',
    'hf-6a58a367d4e23d8455073057',
    'hf-6a4e7603746dd895cd0ba8b6',
    'hf-6a58a37b3cd318353e2a8960',
    'hf-6a58a3cb2c76eddc47d12e10',
    'hf-6a3c01c84e4b173945bdf8c1',
    'hf-6a3c0258bcb653703ca89e44',
    'hf-6a45390fd3d3e0dadd374575',
    'hf-6a4e7689d3d0197c614e4c39',
    'hf-6a4e760bfc37702f5b7b565f',
    'hf-6a4538c4bcb653703ca9cb71',
    'hf-6a45389766926770e8cd4dae',
    'hf-6a4e75fad3d0197c614e4b65',
    'hf-6a58a3cb2c76eddc47d12e0e',
    'hf-6a45389366926770e8cd4da6',
    'hf-6a4e762fd3d0197c614e4bb4',
    'hf-6a4e7650fc37702f5b7b56bd',
    'hf-6a58a35fd4e23d8455073050',
    'hf-6a3c01be4e4b173945bdf8b1',
    'hf-6a4e760bfc37702f5b7b5661',
    'hf-6a58a3693cd318353e2a8952',
    'hf-6a58a373d4e23d845507306b',
    'hf-6a58a3733cd318353e2a895a',
    'hf-6a4e7605746dd895cd0ba8b8',
    'hf-6a58a4312c76eddc47d12ea2',
    'hf-6a58a42b2c76eddc47d12e8f',
    'hf-6a58a4273cd318353e2a8a2b',
    'hf-6a58a3ed3cd318353e2a89e8',
    'hf-6a4e7656fc37702f5b7b56cd',
    'hf-6a4e7636746dd895cd0ba8ff',
    'hf-6a4e760a746dd895cd0ba8c0',
    'hf-6a4e7608746dd895cd0ba8bd',
    'hf-6a4e75e9fc37702f5b7b562f',
    'hf-6a4e75e9d3d0197c614e4b4d',
    'hf-6a4e75e0746dd895cd0ba88e',
    'hf-6a3c0254bcb653703ca89e3f',
    'hf-6a453899d3d3e0dadd3744a2',
    'hf-6a3c01aabcb653703ca89d72',
    'hf-6a3c01aabcb653703ca89d70',
    'hf-6a45391066926770e8cd4e86',
    'hf-6a4538ebd3d3e0dadd374532',
    'hf-6a4538eb66926770e8cd4e54',
    'hf-6a45389d66926770e8cd4db5',
    'hf-6a453898bcb653703ca9cb0e',
    'hf-6a45388266926770e8cd4d8f',
    'hf-6a453882d3d3e0dadd37446d',
    'hf-6a3c0254bcb653703ca89e41',
    'hf-6a3c0217bcb653703ca89de3',
    'hf-6a3c01a6f396cfc62f2ac89b',
    'hf-6a3c01a64e4b173945bdf88e',
    'hf-6a3c019c4e4b173945bdf87b',
    'hf-6a3c019d4e4b173945bdf87e',
    'hf-6a2a93cab2e241c4bdaf5f56',
    'hf-6a2a935e91ca82626cee68f2',
    'hf-6a2a9338b2e241c4bdaf5e84',
    'hf-6a33d2f566e2e6a02a0c6a9c',
    'hf-6a2a93cab2e241c4bdaf5f54',
    'hf-6a2a938891ca82626cee691b',
    'hf-6a33d32527757fc0a25f4312',
    'hf-6a33d30d27757fc0a25f42e8',
    'hf-6a33d2ee4e4b173945bbb8dd',
    'hf-6a1814293519564cfc17f0ec',
    'hf-6a2a93a91f9f329b3991d966',
    'hf-6a2a93791f9f329b3991d928',
    'hf-6a33d2f84e4b173945bbb8e6',
    'hf-6a203bceb0ca0134734ae185',
    'hf-6a33d2db4e4b173945bbb8b8',
    'hf-6a33d2db66e2e6a02a0c6a78',
    'hf-6a203c3561807a4a5e8e709b',
    'hf-6a33d2e266e2e6a02a0c6a80',
    'hf-6a33d36e27757fc0a25f4378',
    'hf-6a33d36f66e2e6a02a0c6b92',
    'hf-6a33d33927757fc0a25f432a',
    'hf-6a33d32766e2e6a02a0c6af2',
    'hf-6a33d3184e4b173945bbb91d',
    'hf-6a33d2da66e2e6a02a0c6a75',
    'hf-6a0f104fa3fbb74cc4f06ecf',
    'hf-6a2a93911f9f329b3991d949',
    'hf-6a2a9391b2e241c4bdaf5f07',
    'hf-6a2811483b1bef7575d889df',
    'hf-6a2a93f3b2e241c4bdaf5f9f',
    'hf-6a2a93be91ca82626cee6959',
    'hf-6a2a93beb2e241c4bdaf5f3d',
    'hf-6a2a93ba1f9f329b3991d97f',
    'hf-6a2a93bab2e241c4bdaf5f38',
    'hf-6a2a93ae1f9f329b3991d96f',
    'hf-6a2a936e1f9f329b3991d91b',
    'hf-6a05bf0e204de353958f5829',
    'hf-6a181409cfb8ff102644d5a3',
    'hf-6a0f103ba3fbb74cc4f06eb1',
    'hf-6a203bd7b0ca0134734ae192',
    'hf-6a203c2161807a4a5e8e7072',
    'hf-6a203bdeca82b4c04e08a359',
    'hf-6a203bdeb0ca0134734ae1a2',
    'hf-6a18140a7200e2f203e906ee',
    'hf-6a203c70ca82b4c04e08a43c',
    'hf-6a203c2c61807a4a5e8e7088',
    'hf-6a203c2cb0ca0134734ae246',
    'hf-6a203c15ca82b4c04e08a3b3',
    'hf-6a203babca82b4c04e08a323',
    'hf-6a05befb204de353958f5823',
    'hf-6a05bf9ab5c58db9dbcfba91',
    'hf-6a1849f1cfb8ff102644ee6a',
    'hf-6a0f10b4a3fbb74cc4f06f69',
    'hf-6a0f1033a3fbb74cc4f06ea3',
    'hf-6a0f1058bff716338a6d9dae',
    'hf-6a18148c3519564cfc17f19e',
    'hf-6a0f103bbff716338a6d9d8c',

    'hf-69fb563c05492ed04f07189c',
    'hf-6a19cd8156363d596eb63cef',
    'hf-6a18148ccfb8ff102644d67f',
    'hf-6a1814643519564cfc17f14a',
    'hf-6a181443cfb8ff102644d605',
    'hf-6a1814227200e2f203e90711',
    'hf-6a1814223519564cfc17f0de',
    'hf-69f2138a3ace2ca2f08f06c1',
    'hf-69f2138a4c854ae4e256e2bc',
    'hf-6a05bf20b5c58db9dbcfba3e',
    'hf-69f213814c854ae4e256e2b4',
    'hf-69f213bbd52e296f6a38804e',
    'hf-6a0f10b6ab504c4de2b52df9',
    'hf-6a0f1085ab504c4de2b52da7',
    'hf-6a0f1087a3fbb74cc4f06f23',
    'hf-6a0f1084ab504c4de2b52da4',
    'hf-6a0f103fab504c4de2b52d46',
    'hf-6a0f101eab504c4de2b52d17',
    'hf-69eb7043b2918f341e7b6cf0',
    'hf-69e8e39dfe534c766c4598c1',
    'hf-69e8e3dd4af8f3547a65d036',
    'hf-6a05bfe0204de353958f58ec',
    'hf-6a05becc204de353958f5807',
    'hf-69f213cad52e296f6a38806c',
    'hf-69fb568ba2b8b1976402699e',
    'hf-69fb568aa2b8b1976402699b',
    'hf-69fb5672a2b8b19764026968',
    'hf-69fb567205492ed04f0718fc',
    'hf-69e8e3dfb2918f341e7afbae',
    'hf-69eb7043fe534c766c461155',
    'hf-69f213814c854ae4e256e2b2',
    'hf-69f213a9d52e296f6a388029',
    'hf-69f213a93ace2ca2f08f06e6',
    'hf-69f2138d4c854ae4e256e2c2',
    'hf-69f213743ace2ca2f08f069e',
    'hf-69e8e3a6fe534c766c4598d0',
    'hf-69de633f6bb16e39e1b86417',
    'hf-69e0c8f04af8f3547a64b1d2',
    'hf-69e0c8ad4af8f3547a64b19a',
    'hf-69d7ce064604fa2f60f0f4d2',
    'hf-69e0c9336bb16e39e1b8d9df',
    'hf-69a86448540e60f740c54ecc',
    'hf-6996dcd4726255bc32796514',
    'hf-698caac48e0d10536157d39c',
    'hf-698caad6ad45692e9b9ac15e',
    'hf-697a56c2bcdfd65d69c37894',
    'hf-697a56c1bcdfd65d69c37892',
    'hf-6967ce31850f974aa212e214',
    'hf-690b7b9f79e2c370e491e843',
    'hf-667adb985a72861e4ea1e9e3',
    'hf-666ae6547e0ca370dae585f6',
    'hf-6669685a16b67b5e09052705',
    'hf-6669685bbd13e7439ddc01e2',
    'hf-67b4a3e0381832d770715d09',
    'hf-66d7165e0eb51492a4c62fd3',
    'hf-66e066e846f5f843647231ba',
    'hf-66ed7cbf58baf82d2a965442',
    'hf-67fe2ec8d2847d730ba08b84',
    'hf-67b4a3c7381832d770715cdf',
    'hf-6595948a6b4bf2cf1c67abb9',
    'hf-68fa03c329be8924040bd270',
    'hf-647f512b703882ffab99cd27',
    'hf-67b4a3ed249223e3b08588cf',
    'hf-6655f77b1515091aace7c42c',
    'hf-66608ce69b5627dc1b42c0c4',
    'hf-65cb875f5fd330f6c647a1cb',
    'hf-68c2a8d13cfb117858761659',
    'hf-6836e0d1f7d5496ac4a652c6',
    'hf-6538d70216f966aee9253ebb',
    'hf-647f5132703882ffab99cd29',
    'hf-68cae10104558429ef034079',
    'hf-687f8ed17299475a5b05ff93',
    'hf-6798e25f029e601edf04b249',
    'hf-670e65cbed0d969de7c03fd4',
    'hf-65781b4e3405d840b2be9961',
    'hf-68b87a70880cce1802b93910',
    'hf-684832b79f34f686e2db5531',
    'hf-66bb681d11ecbd46e2d0089d',
    'hf-686296fbfa95d35ec972bfa3',
    'hf-6630fd8d587fa23beffd07f1',
    'hf-686d20cc69ddbf20131a29bb',
    'hf-6810eaff5917498f8bf29708',
    'hf-67b4a3dd249223e3b08588b4',
    'hf-6745dd97fb7a3ff84744a8e2',
    'hf-667adba13d7908a0f17c1a36',
    'hf-663a4966db4284dbea8d072d',
    'hf-68c2a8733cfb1178587615bc',
    'hf-66cd8cfd92634d59399b425c',
    'hf-66166448c415e8779118e9ac',
    'hf-68d41dea353e3fbd3185dc0b',
    'hf-659594bbc7596f421e53e52f',
    'gousto-3a1a9141-1ad1-4da8-b4ac-cf9b33f4df72',
    'gousto-1e12b6fc-6585-4c61-b35f-6368bdf88df2',
    'gousto-3fafc2b5-e408-4fda-b115-d9f7af3cfbbe',
    'gousto-4d648c49-d85c-4bf1-b6db-df75b4d33491',
    'gousto-78ed7211-8694-4309-b0ee-26b910c5e6e6',
    'gousto-887c14b0-9ecd-49c2-a4f7-9b0cb527f983',
    'gousto-94e0f508-fa54-44cf-ae39-1c73400e1c21',
    'gousto-cb080d3d-3ace-44b4-aaaa-677e1f4b8208',
    'gousto-d4c20592-847a-48fb-b459-504735e90290',
    'gousto-d7c168f4-cd6d-4ece-92e7-35bdff6b2f88',
    'gousto-f6dbfa28-7bc9-434f-8cf8-2d6267372b0f',
    'gousto-617d0ab5-d7ab-4838-8100-95af42f5de44',
    'gousto-f0e2b283-4d76-4606-8024-994446f24284',
    'gousto-fbd6d66b-ee97-411d-b761-dc51c3d5c0d1',
    'gousto-f5b7ac18-952e-4641-965f-20260ede9212',
    'gousto-0c37611f-5d12-4a39-8089-13af8c93a8e3',
    'gousto-bf2eaf19-8fae-4ac7-b7e4-639dd71fa31c',
    'gousto-261f7661-0ddc-4d8f-bf07-ae46863ed4ff',
    'gousto-763fe312-ca18-4f83-934a-a9c5e9cebfa5',
    'gousto-4d0f3f8f-3b1f-4350-81d6-5f8dc2a615e9',
    'gousto-14c5fc6d-a293-406d-a768-9615cfdea5c7',
    'gousto-29405074-69fe-4d77-bef6-637941758c29',
    'gousto-5ec87ee9-cc71-4a62-906f-565800cdbd71',
    'gousto-752aba25-87e8-45aa-b277-01d6b2fddad5',
    'gousto-79aa013e-0e02-4684-b400-989adebd8ed0',
    'gousto-52e093e7-003a-4b6b-94f7-2121857b653e',
    'gousto-912b8af8-0d69-4ede-8e10-039c9390608f',
    'gousto-ebf09a80-e68f-43e3-b05a-686b55f138f1',
    'gousto-11efae4d-cdf0-4f15-b9b3-b82d1d8942d7',
    'gousto-adc5bcdf-2011-4d85-8ba5-a3e34b671e42',
    'gousto-49c743d5-cd6f-4fb5-9480-871d81a9b096',
    'gousto-b93f744b-6f7d-4074-807e-5916994ce2d5',
    'gousto-04a9de17-023b-4380-9580-153b89865ae7',
    'gousto-e154f177-bae9-4906-adbe-653dea944260',
    'gousto-ea4adc29-eeb5-40f1-b67b-2965a1fc808a',
    'gousto-5f1b5ba4-e360-4c93-9b6a-b62b29fbb5c1',
    'gousto-1a97736f-ab1c-406f-9df7-a92deb3c1251',
    'gousto-23c9a7be-6135-4968-b958-2e589a224f69',
    'gousto-860e5d56-7870-453c-a063-8c1c356757ec',
    'gousto-f9b3fe13-dd41-40af-9ab2-087ecee8f7e4',
    'gousto-0ecd5b6f-356c-4cc3-beb5-39156e0ab839',
    'gousto-1b078cce-d605-4428-bad7-66db88c5ae41',
    'gousto-33194b7f-2c87-4ab3-b3b2-21d0698a7c30',
    'gousto-33674b46-937e-4408-9ef0-2dc81cedadd5',
    'gousto-47033d4b-c192-42f1-a089-741460700d78',
    'gousto-4738a2a5-32a5-4e75-9357-d77ffc8af34c',
    'gousto-48d93dbc-6470-40d9-9fd2-b33895ae4772',
    'gousto-5392ccba-321b-4b57-ac14-530191cf4c25',
    'gousto-57a7d966-6da3-4959-96d8-c8e734fc7731',
    'gousto-816775de-0ded-4b96-b0d3-f72051b7e852',
    'gousto-60006307-d5f4-4364-9d44-2be34c6bc536',
    'gousto-64cccbd9-b68d-41af-a43f-78087724655d',
    'gousto-697b5e99-d960-4a67-b9b7-f091d6f80070',
    'gousto-6c0d4cda-41f6-4621-a25a-127563f71db2',
    'gousto-70c8538b-5794-4dc0-8e87-85a7953d49db',
    'gousto-84797988-7607-40f4-a791-41ec8dde3100',
    'gousto-852f9a7d-0ca7-4fc6-882b-f7e790609e5e',
    'gousto-b121c928-3e39-4785-b240-d889299c03b3',
    'gousto-b18f13f9-8548-44f2-92eb-b83f07ba1163',
    'gousto-b2f3aaf2-2112-46e0-9a71-31f618fc00a7',
    'gousto-fa6aebef-e4ab-480d-bc3e-adce84904501',
    'gousto-4d5b7e9a-1f32-42cf-854b-adc2138391f2',
    'gousto-98ac9d45-7b0d-4ddc-b910-06afa1e4887b',
    'gousto-1d15f59c-2714-4569-b37c-0841906dc616',
    'gousto-96bad066-aa14-4d7e-ad85-d2b1b9f74cbc',
    'gousto-cb3f476c-5061-429f-b0fa-dd3cc6a14480',
    'gousto-14e03ca8-1751-456e-bda0-a9fa1b2d5b7d',
    'gousto-aebd911f-bc3b-4f29-8ce0-44bb4deb12aa',
    'gousto-3534100e-2c03-4131-b4da-007adb24b096',
    'gousto-2e56a8ba-e579-4a6f-bc98-2043402f965b',
    'gousto-af16cf76-fa81-4a89-b75e-cf526b13eee8',
    'gousto-8af21a80-633a-48f6-b688-007ecdfcd462',
    'gousto-f3dd500e-d8c9-40a7-bfdd-5d739517f7af',
    'gousto-3e329d5f-8ea6-46dd-90c6-b3bc3848ed07',
    'gousto-af739782-8bab-4c53-a46c-b31c34d13bd2',
    'gousto-c293637b-5bd6-4442-8acb-1fa0458ff45d',
    'gousto-6a882eed-918c-4b9b-a992-fd3993fbc489',
    'gousto-1d7e0374-58d4-4cb1-803f-f2e1d61a57bd',
    'gousto-3e5ddd4b-d3e0-4d6d-8e45-bc154bd3a26b',
    'gousto-cb70d850-a518-4c0e-b2e0-fe35745b234c',
    'gousto-45864b23-5309-4840-bfc3-a7c90d966740',
    'gousto-b3e726f8-aad1-42d5-9477-b652ee5ce612',
    'gousto-6342420a-cb0d-4243-aa93-6dd11529a47e',
    'gousto-4e64c8b2-fb9b-4ab1-83b0-8915034240f9',
    'gousto-c760fdb8-eeac-4552-b683-82fe836b0039',
    'gousto-7f077d96-7696-4227-b359-bba4c9b87fe6',
    'gousto-add04840-78de-4028-9dc8-8b4ca92c7116',
    'gousto-2ae3c7a8-1786-424c-b1c4-7a8f3af9af2a',
    'gousto-96a413e4-16c3-4dc3-9042-7307bbac1694',
    'gousto-10d3b707-33c9-474f-b94b-53b8fafb8ba3',
    'gousto-57848931-589b-4248-a8c8-7e20e471fb92',
    'gousto-99c74768-8525-44d5-96b9-f9cf18990524',
    'gousto-f338a673-e5ed-4bf9-86fd-3e13d9c7c601',
    'gousto-6011e837-70f5-4c44-bf0b-724e3d26c0cb',
    'gousto-c2d290eb-a34c-4882-9256-2c1f36c47209',
    'gousto-3408b842-77a3-4731-a92c-d9d1442d9664',
    'hf-69de633f68ee73d4d30058fa',
    'hf-69d7ce174604fa2f60f0f4e1',
    'hf-69e0c9314af8f3547a64b213',
    'hf-69e0c8f76bb16e39e1b8d9b5',
    'hf-69cd4096b90c4b9b5c509574',
    'hf-69cd4099b90c4b9b5c50957a',
    'hf-69bae028d378378da7abd64b',
    'hf-69c412481f98ec4533c5397a',
    'hf-69c4125ad795c2c9e400510d',
    'hf-69cd40a7a4f29fefb8a5c27d',
    'hf-69c412911f98ec4533c53a21',
    'hf-69c41291d795c2c9e400515e',
    'gousto-db3bbabe-51b5-48ab-b567-b353850f900a',
    'gousto-f091aeb6-a198-4a54-8d23-ea359cfc46d6',
    'gousto-981923a2-717e-48a0-89e8-9e971afb283b',
    'gousto-a90934ce-30a3-4ca6-bf99-d0c853030fd4',
    'gousto-8297ad1e-8c86-4e0e-bd02-71eb3196ec9e',
    'gousto-39c11d97-fde5-4e58-b5ed-16b248272b5c',
    'gousto-f4ba8431-9073-4044-96d2-03ce9e64266d',
    'gousto-7297dcdc-6c8e-44be-9804-6743a56e4285',
    'gousto-5c226162-9219-44f7-be90-c8b1b04a2722',
    'gousto-1f75de60-fdc5-44ea-8fcb-e0cb9b499f77',
    'gousto-403c0734-48d8-4ae9-bb33-8bb69ad41a69',
    'gousto-b6638dba-71cc-489b-be80-f4fbe2420bb8',
    'gousto-8a03245a-2b36-4369-80ae-66a73743dda5',
    'gousto-e1c22804-23fe-418b-97a0-f87037abba98',
    'gousto-d6e39fc8-7d04-4a2b-9f5b-41f349a09f78',
    'gousto-11f77bcd-cc14-4144-b2b0-a48996b8dddf',
    'gousto-2971d816-8c3d-4d3c-a072-95c4f171af37',
    'gousto-08ed8ff5-9b06-4329-9874-960879e01046',
    'gousto-78619d3a-2467-4e6c-8dd5-3acb0d360498',
    'gousto-cab67fc7-de00-41b0-8bc5-2adf17070448',
    'gousto-f1dce38a-05ea-4ecb-9226-0551b611d30b',
    'gousto-0319480f-3328-41ce-bc0f-6fe14bbbfcf4',
    'gousto-184a2468-6c08-4e36-b86e-9f1a98d1bb27',
    'gousto-29eb801f-f9fe-42be-860c-23a68cadabae',
    'gousto-2c21e982-20dd-4dee-976d-22a31c7429de',
    'gousto-2dae8c33-c6d0-44a1-ad43-430ea8dea6af',
    'gousto-2eb9defc-fa3a-4963-9fd7-9ee1e11227cc',
    'gousto-2f55b23d-6b2c-479d-9066-56eb98ab1b78',
    'gousto-34153004-b68d-442b-b93b-9467df7e9006',
    'gousto-3474b9cd-d5f4-4b1e-a32d-ad5ff2e5afd2',
    'gousto-4cfdc393-91c2-4207-a1b9-6415e7d01e20',
    'gousto-59e2f1ca-d82b-4382-8d02-0e17c81e7ffb',
    'gousto-68aac789-b99d-4745-baf3-f12708d31509',
    'gousto-73354967-45f8-4501-b722-5c4c0a2b9c3a',
    'gousto-7ec02092-4aef-4239-89fe-4118c09fb645',
    'gousto-959ac5e0-ac61-4ae4-854c-08f16d7286a2',
    'gousto-abb805f4-464b-4703-9b41-f1158311ee2c',
    'gousto-b062e130-b871-480e-8671-7e531455a826',
    'gousto-b2e37356-bc03-4980-bf95-7e3794fa4f4f',
    'gousto-b803140c-3725-4c94-8b0a-96bfd846ba00',
    'gousto-b9226438-f737-4f63-8c39-a30e311352c2',
    'gousto-c08614b2-5d95-4a91-9721-f52122d83ebc',
    'gousto-c5757b38-fca3-40e4-94bb-8c8e22711c16',
    'gousto-c9bf303a-07c4-45da-8ccb-e5d12b89c1f8',
    'gousto-cdee0b6a-abcf-4ed1-be34-32f212bb4b85',
    'gousto-ce2220a3-c6cc-4989-9cff-829eb74514aa',
    'gousto-dd742e74-a93e-4c48-b045-aa1350c249fe',
    'gousto-dd7e9bb2-8a31-4e61-8c18-d9253b13b0fe',
    'gousto-ddac830a-7cf5-4585-ad3f-a969e12813ae',
    'gousto-dec07237-3fef-462d-a2f0-0e3f671be58f',
    'gousto-e53f1ad5-3ebf-421f-89c1-a7a6c2a390ae',
    'gousto-ea6f9668-2fda-45f8-a169-69bef0f3b9dd',
    'gousto-f57f4592-0e8e-4369-9990-2f10dd00be09',
    'gousto-51b69ed6-8a97-464d-a59e-df5c1a89670e',
    'gousto-90fee53f-08ba-4a72-ae8b-ab025cb5f9e4',
    'gousto-d91a1f6d-456d-4dd6-be46-ef4dc4dc31ee',
    'gousto-184a2f17-3920-46eb-8cd6-b61f7db8d685',
    'gousto-6e48eb00-4e68-40fe-9631-805be0a924f4',
    'gousto-7360f802-460b-40c3-82f1-be9e400d4b62',
    'gousto-3c0c2eb5-1d29-49e3-8f89-e878b635c3ea',
    'gousto-5d0934f2-8eee-47b7-986e-3545119c4c3a',
    'gousto-002130c4-8ef2-41ff-8203-a1effd0a469d',
    'gousto-cc109bac-8903-4bd3-83ab-96dbdb0c6bf2',
    'gousto-313987f6-e67a-4147-90d8-e18af8354e88',
    'gousto-c29d6497-23d2-4536-b9ab-e32bd84d9baa',
    'gousto-de9f9acf-818d-4285-826c-ad6cad2c6195',
    'gousto-55e55ff6-b618-4658-9d1d-c6a44f384b4a',
    'gousto-d1e4673f-9832-4e16-aa6f-48a24b8a6413',
    'gousto-b8b781e0-c021-479c-9306-1fe01f252695',
    'gousto-72b18770-3b92-47c8-9339-a714af3e956e',
    'gousto-66c03a5f-0203-4c36-a402-5dc9fd80e4fb',
    'gousto-b94d8ddb-7fd9-459a-a021-8f000f40390a',
    'gousto-dc1d4d2a-9774-444b-8562-8042a96807f8',
    'gousto-4a4964d7-504c-49a6-bcf5-2d73ff38493d',
    'gousto-ef67c35c-31a9-4a93-8028-757189d204a8',
    'gousto-6e4a118c-de86-451b-b2ac-1456db9c55ca',
    'gousto-bd0c1f7e-52ca-4f7b-888b-6006b875366c',
    'gousto-b812c5ef-3a71-4b05-9b2f-206b661091d6',
    'gousto-55808443-ff97-4f76-81ed-a91027a8dd2e',
    'gousto-1f59dc41-16ac-452a-bed0-e5a286d6398e',
    'gousto-74645e80-6f24-4462-9a7d-923dd09e7581',
    'gousto-683332d9-3c1e-4e3d-8479-29d42de9ae5a',
    'gousto-90c3b461-639e-468b-88d9-3d0eaf4af805',
    'gousto-eab6866e-c85f-4a4b-bc83-56207071765f',
    'gousto-a97ea5e6-3319-42a3-9348-169d62b29be7',
    'gousto-808069c5-353b-47af-af8f-398c6a3c719e',
    'gousto-23eb3d62-a322-4a06-984b-e0e1f84022b1',
    'gousto-f79607a5-74c7-4567-9c30-0952519e6074',
    'gousto-5f7243d8-d4c0-4fab-80af-7cbaa690901b',
    'gousto-fcdc403f-c2ee-41e3-978e-338924cf6b08',
    'gousto-032967ca-a3a5-4f3b-93ad-3cb12877fa1b',
    'gousto-c777ca56-d175-4f0f-a9bc-11b7a7b78d79',
    'hf-6a735abdebec54be3cd9d8c5',
    'hf-6a7dc08cba6139d3db0351f8',
    'hf-695ea1d2c15b9f4be4dabaed',
    'hf-695ea2002a2e2effad18aaa2',
    'hf-694beeab39d4849fb457caf6',
    'hf-693ada26c92924105eca70c9',
    'hf-6930734b9351d52b5c263d10',
    'hf-691df1ef71644dd339c43028',
  ]);
  const heldSourceLunchIds = new Set([
    'lunch-hf-693adc1fc92924105eca7388',
    'lunch-gousto-804e5d57-e1e2-42f7-aa77-cd712ee6cddf',
    'yoghurt-fruit-pots',
    'tuna-sweetcorn-wraps',
    'tuna-sweetcorn-rice-lunch',
    'banana-yoghurt-oat-pots',
    'sausage-tomato-tray-lunch',
    'lunch-hf-698cab108e0d10536157d52c',
    'lunch-hf-698caabc8e0d10536157d36d',
    'lunch-hf-69710d02933a02843ffb6395',
    'lunch-hf-69710d38384e652ce6a5004b',
    'lunch-hf-69710d40384e652ce6a50061',
    'lunch-hf-695ea1d22a2e2effad18aa53',
    'lunch-hf-694bee6d1676be04156e69cd',
    'lunch-hf-6931b0f6dce6a2dc39a6eb7a',
    'lunch-hf-6931b0ce42c50700f509e450',
    'lunch-hf-6930733d114b735a0061b87a',
    'lunch-hf-6914a9b17071e7616aa86d0e',
    'lunch-hf-690b7b7448e7b2ec1b1141f0',
    'lunch-gousto-1d490309-c612-4d4a-a67b-bac4cf7a7a1a',
    'lunch-gousto-3620b89c-1e6e-4962-81a8-10384bdc00a9',
    'lunch-gousto-f6e070ed-9ea6-4103-8576-390ea4651570',
    'lunch-gousto-bd405226-9ab3-4ed8-8411-3c849b28a83e',
    'lunch-gousto-6abb98fb-881a-47b6-a0c3-25a174216199',
    'lunch-gousto-8b81ae96-9778-42a3-bfbe-027f0e6e1fd6',
    'lunch-gousto-d030dbf3-d89e-4746-837f-cbaf5f7cf281',
    'lunch-gousto-45f73b2a-e00e-42e3-a329-a0228f0d2139',
    'lunch-gousto-fe854300-1b4e-4fe5-8793-c7e72ef9ae25',
  ]);
  const sourceLunchReviewHold = (recipe) => heldSourceLunchIds.has(String(recipe?.id || ''));
  const sourceReviewHold = (recipe) => heldSourceRecipeIds.has(String(recipe?.id || ''));
  const manualOnlyCombinedProteinIds = new Set([
    'hf-6a4538b566926770e8cd4df2',
    'hf-6a4538a866926770e8cd4dca',
    'hf-6a3c01fdf396cfc62f2ac8f7',
    'hf-6a3c0256f396cfc62f2ac971',
    'hf-6a3c01e5f396cfc62f2ac8dc',
    'hf-6a3c01dcf396cfc62f2ac8d0',
    'hf-6a2a93bcb2e241c4bdaf5f3b',
    'hf-6a33d2f327757fc0a25f42c8',
    'hf-6a33d2f266e2e6a02a0c6a96',
    'hf-6a33d3324e4b173945bbb945',
    'hf-6a33d2e94e4b173945bbb8d4',
    'hf-6a33d2f066e2e6a02a0c6a90',
    'hf-6a33d3024e4b173945bbb904',
    'hf-6a33d3004e4b173945bbb8f5',
    'hf-6a33d3704e4b173945bbb9ab',
    'hf-6a203c7161807a4a5e8e70e9',
    'hf-6a33d2ea4e4b173945bbb8d8',
    'hf-6a203b9f61807a4a5e8e6fe5',
    'hf-6a33d33766e2e6a02a0c6b18',
    'hf-6a33d3314e4b173945bbb942',
    'hf-6a33d30c27757fc0a25f42e5',
    'hf-6a33d2e34e4b173945bbb8c2',
    'hf-6a33d2d34e4b173945bbb8a9',
    'hf-6a0f1058ab504c4de2b52d61',
    'hf-6a2a936ab2e241c4bdaf5ec0',
    'hf-6a2a935ab2e241c4bdaf5eab',
    'hf-6a2a93f991ca82626cee69bd',
    'hf-6a2a93a7b2e241c4bdaf5f24',
    'hf-6a1814293519564cfc17f0ee',
    'hf-6a0f1024bff716338a6d9d7b',
    'hf-6a18141dcfb8ff102644d5c3',
    'hf-6a18142ccfb8ff102644d5d6',
    'hf-6a1814507200e2f203e9074e',
    'hf-6a0f1037bff716338a6d9d8a',
    'hf-6a203c1761807a4a5e8e7066',
    'hf-6a203ba361807a4a5e8e6fe9',
    'hf-69fb566d05492ed04f0718f7',
    'hf-69fb564ca2b8b19764026927',
    'hf-6a18141bcfb8ff102644d5bf',
    'hf-6a203c72ca82b4c04e08a43f',
    'hf-6a203c6eca82b4c04e08a436',
    'hf-6a203be9b0ca0134734ae1b7',
    'hf-6a203ba6b0ca0134734ae14b',
    'hf-69fb5641cad850dbd5c54316',
    'hf-6a1813ff3519564cfc17f0b6',
    'hf-6a1814417200e2f203e9073c',
    'hf-6a181467cfb8ff102644d638',
    'hf-69fb5660cad850dbd5c54351',
    'hf-69fb568dcad850dbd5c5439a',
    'hf-69fb568d05492ed04f071936',
    'hf-6a181447cfb8ff102644d60e',
    'hf-6a181490cfb8ff102644d681',
    'hf-6a18148e3519564cfc17f1a3',
    'hf-6a1814333519564cfc17f0fb',
    'hf-6a1814133519564cfc17f0cc',
    'hf-6a1814067200e2f203e906e4',
    'hf-69f213cf3ace2ca2f08f071b',
    'hf-6a0f10b9ab504c4de2b52dfc',
    'hf-6a0f10b3bff716338a6d9e4b',
    'hf-6a0f108ebff716338a6d9e03',
    'hf-6a0f1031a3fbb74cc4f06e9d',
    'hf-6a05bfe310e255982cf35d45',
    'hf-6a05bfe1204de353958f58ef',
    'hf-6a05bfe010e255982cf35d42',
    'hf-6a05bfdd10e255982cf35d3d',
    'hf-6a05bfabb5c58db9dbcfbaac',
    'hf-6a05bf6d204de353958f5849',
    'hf-6a05bf2c204de353958f5831',
    'hf-69fb5679cad850dbd5c54374',
    'hf-69f213d13ace2ca2f08f071f',
    'hf-69f213cd4c854ae4e256e32c',
    'hf-69f213714c854ae4e256e28f',
    'hf-69e8e39eb2918f341e7afb28',
    'hf-69e8e3de4af8f3547a65d038',
    'hf-69d7cdec4604fa2f60f0f4ba',
    'hf-69d7ce6b6bb16e39e1b7765d',
    'hf-69e0c9c668ee73d4d300d3e1',
    'hf-69d7ce6c4604fa2f60f0f536',
    'hf-69d7ce12defeabaeea859e70',
    'hf-69e0c8a26bb16e39e1b8d971',
    'hf-699f295ae7bff1dd159be07c',
    'hf-699735e5726255bc32797be4',
    'hf-68e685344f768e6eef37cb53',
    'hf-68d41e50353e3fbd3185dc4d',
    'hf-66f2dad8fdc7705e0e9ecc82',
    'hf-6602e2d288ae29ee0ef483f8',
    'hf-64889f1f7b6a161d101f757e',
    'hf-690b7ba448e7b2ec1b114223',
    'hf-687f8ee01cc5cea7127f7702',
    'hf-669699f99b6afed05f63f993',
    'hf-6602e2da8928bc357c2d2ebf',
    'hf-6500995c32e9107c6db8e6c7',
    'hf-64639a3d0c1e02e39244a156',
    'hf-689b4550464ec79ed4713d11',
    'hf-654908693357e0637a82eb3f',
    'hf-682357e3b511ee4a266bb15b',
    'hf-66d71654cc7423314feb89a7',
  ]);
  const autoDinnerAllowed = (recipe) =>
    allowed(recipe) &&
    !doubleProteinPortion(recipe) &&
    !manualOnlyCombinedProteinIds.has(String(recipe?.id || '')) &&
    !sourceReviewHold(recipe);

  const knownProfiles = [
    ['lemonHerb', 'lemon herb'],
    ['smokyPaprika', 'smoky paprika'],
    ['cuminLime', 'cumin lime'],
    ['coconutCurry', 'coconut curry'],
    ['gingerSoy', 'ginger soy'],
    ['teriyaki', 'teriyaki'],
    ['misoGinger', 'miso ginger'],
    ['sweetChilli', 'sweet chilli'],
    ['satay', 'peanut satay'],
    ['harissa', 'harissa'],
    ['tomatoBasil', 'tomato basil'],
    ['pestoLemon', 'pesto lemon'],
    ['creamyTomato', 'creamy tomato'],
    ['garlicYoghurt', 'garlic yoghurt'],
    ['tomatoOregano', 'tomato oregano'],
    ['jerkLime', 'jerk lime'],
    ['maplePaprika', 'maple paprika'],
    ['mustardHerb', 'mustard herb'],
    ['rosemaryGarlic', 'rosemary garlic'],
    ['tahiniLemon', 'tahini lemon'],
  ];

  function flavourProfile(recipe) {
    if (recipe && recipe.flavourProfile) return recipe.flavourProfile;
    const title = String((recipe && recipe.title) || '').toLowerCase();
    const found = knownProfiles.find((x) => title.includes(x[1]));
    if (found) return found[0];
    if (/\blemon\b/.test(title)) return 'lemonHerb';
    return '';
  }

  function flavourFamily(recipe) {
    const p = flavourProfile(recipe);
    if (['lemonHerb', 'pestoLemon', 'harissa', 'garlicYoghurt', 'rosemaryGarlic', 'tahiniLemon'].includes(p))
      return 'citrus-herb';
    if (['cuminLime', 'jerkLime'].includes(p)) return 'lime-spice';
    if (['teriyaki', 'gingerSoy', 'misoGinger', 'sweetChilli', 'satay'].includes(p)) return 'east-asian';
    if (['tomatoBasil', 'creamyTomato', 'tomatoOregano'].includes(p)) return 'tomato-mediterranean';
    return p || '';
  }

  function mainKey(recipe) {
    const text = ((recipe && recipe.ingredients) || []).map((x) => norm(x[1])).join(' ');
    const groups = [
      ['chicken', /\bchicken\b/],
      ['pork', /\bpork\b|\bsausages?\b|\bbacon\b|\bchorizo\b/],
      ['beef', /\bbeef\b/],
      ['lamb', /\blamb\b/],
      ['duck', /\bduck\b/],
      ['turkey', /\bturkey\b/],
      ['salmon', /\bsalmon\b/],
      ['white-fish', /\bcod\b|\bhaddock\b|\bbarramundi\b|\bsea bass\b|\bbasa\b|\btilapia\b/],
      ['shellfish', /\bprawns?\b|\bshrimps?\b|\bcrabs?\b/],
      ['tofu', /\btofu\b/],
      ['halloumi', /\bhalloumi\b/],
      ['chickpeas', /\bchickpeas?\b/],
      ['lentils', /\blentils?\b/],
      ['beans', /\bbeans?\b|\bedamame\b/],
      ['eggs', /\beggs?\b/],
    ];
    const found = groups.find((x) => x[1].test(text));
    if (found) return found[0];
    const diet = MW.food && MW.food.analyse ? MW.food.analyse(recipe) : null;
    return MW.food && MW.food.dietAllows(recipe, 'vegan') ? 'plant' : 'other';
  }

  function formatKey(recipe) {
    const hay = [recipe && recipe.title, recipe && recipe.subtitle, ...((recipe && recipe.tags) || [])]
      .map(norm)
      .join(' ');
    const formats = [
      ['rice', /\brice\b|\brisotto\b/],
      ['pasta', /\bpasta\b|\bspaghetti\b|\blinguine\b|\bpenne\b/],
      ['noodles', /\bnoodle/],
      ['tacos', /\btaco/],
      ['wraps', /\bwrap/],
      ['curry', /\bcurry\b|\bkorma\b|\btikka\b/],
      ['traybake', /\btraybake\b|\btray bake\b/],
      ['stirfry', /\bstir[ -]?fry/],
      ['couscous', /\bcouscous\b/],
      ['orzo', /\borzo\b/],
      ['stew', /\bstew\b/],
      ['soup', /\bsoup\b/],
      ['salad', /\bsalad\b/],
      ['flatbread', /\bflatbread/],
      ['burger', /\bburger/],
      ['pie', /\bpie\b/],
      ['roast', /\broast/],
      ['bowl', /\bbowl\b/],
    ];
    const found = formats.find((x) => x[1].test(hay));
    return found ? found[0] : '';
  }

  // One stable, recognisable recipe family is used by browsing and generation.
  // The classification is deliberately based on dishes and main ingredients,
  // not generic ingredient words such as tomato or garlic.
  const mealCategories = [
    {
      id: 'pasta',
      label: 'Pasta',
      icon: 'bowl-food',
      coverRecipeId: 'gousto-732ec9b5-156b-4eba-9a69-c301bcab4461',
    },
    {
      id: 'curry',
      label: 'Curries',
      icon: 'bowl-rice',
      coverRecipeId: 'hf-6a735a53e4ad299a878209b0',
    },
    { id: 'burger', label: 'Burgers', icon: 'burger', coverRecipeId: 'hf-6a181490cfb8ff102644d681' },
    { id: 'pizza', label: 'Pizzas', icon: 'pizza-slice' },
    { id: 'fish', label: 'Fish & seafood', icon: 'fish' },
    { id: 'chicken', label: 'Chicken', icon: 'drumstick-bite', coverRecipeId: 'hf-6a8f1b73d944d293738a3b44' },
    { id: 'beef', label: 'Steaks & beef', icon: 'utensils', coverRecipeId: 'hf-6a735a77e4ad299a878209ca' },
    { id: 'rice', label: 'Rice & noodles', icon: 'bowl-rice' },
    { id: 'wrap', label: 'Tacos & wraps', icon: 'utensils' },
    { id: 'salad', label: 'Salads', icon: 'leaf', coverRecipeId: 'hf-69f213b53ace2ca2f08f06f3' },
    { id: 'comfort', label: 'Comfort food', icon: 'plate-wheat' },
    { id: 'vegetarian', label: 'Vegetarian dishes', icon: 'seedling' },
    { id: 'other', label: 'More ideas', icon: 'utensils' },
  ];
  const recipeCategoryCache = new WeakMap();
  function categoryFor(recipe) {
    if (!recipe || typeof recipe !== 'object') return 'other';
    if (recipeCategoryCache.has(recipe)) return recipeCategoryCache.get(recipe);
    const title = [recipe.title, recipe.subtitle, recipe.category, ...(recipe.tags || [])]
      .map(norm)
      .join(' ');
    const ingredients = (recipe.ingredients || []).map((r) => norm(r[1])).join(' ');
    const match = (rx, includeIngredients = false) =>
      rx.test(title) || (includeIngredients && rx.test(ingredients));
    let group = 'other';
    if (match(/\bpizzas?\b|\bcalzones?\b/)) group = 'pizza';
    else if (match(/\bburgers?\b|\bsliders?\b/)) group = 'burger';
    else if (
      match(
        /\bpasta\b|\bspaghetti\b|\blinguine\b|\bpenne\b|\brigatoni\b|\btagliatelle\b|\bravioli\b|\btortellini\b|\btortelloni\b|\btortiglioni\b|\bfusilli\b|\bfarfalle\b|\bpappardelle\b|\bfettuccine\b|\bbucatini\b|\borecchiette\b|\bconchiglie\b|\bcannelloni\b|\bvermicelli\b|\bcavatappi\b|\brotini\b|\bpaccheri\b|\bgemelli\b|\blasagn[ea]\b|\bmacaroni\b|\bgnocchi\b|\borzo\b|\bcarbonara\b|\bputtanesca\b|\barrabbiata\b/,
        true,
      )
    )
      group = 'pasta';
    else if (match(/\bcurr(?:y|ies)\b|\bkorma\b|\btikka\b|\bmasala\b|\bdh?al\b/)) group = 'curry';
    else if (match(/\btacos?\b|\bfajitas?\b|\bquesadillas?\b|\benchiladas?\b|\bburritos?\b|\bwraps?\b/))
      group = 'wrap';
    else if (match(/\bsalads?\b|\bpoke\b/)) group = 'salad';
    else if (match(/\brice\b|\brisotto\b|\bbiryani\b|\bnoodles?\b|\bramen\b|\bstir\s*fry\b|\bpilaf\b/))
      group = 'rice';
    else if (
      match(
        /\bsalmon\b|\bcod\b|\bhaddock\b|\bsea bass\b|\btuna\b|\bfish\b|\bprawns?\b|\bshrimp\b|\bseafood\b/,
        true,
      )
    )
      group = 'fish';
    else if (match(/\bsteaks?\b|\bbeef\b|\bmince\b|\bmeatballs?\b/, true)) group = 'beef';
    else if (match(/\bchicken\b|\bturkey\b/, true)) group = 'chicken';
    else if (
      match(/\bsausages?\b|\bmash\b|\bpies?\b|\broasts?\b|\btray\s*bakes?\b|\bcasseroles?\b|\bstews?\b/)
    )
      group = 'comfort';
    else if (MW.food && MW.food.analyse) {
      const analysis = MW.food.analyse(recipe);
      if (!analysis.hasMeat && !analysis.hasFish) group = 'vegetarian';
    }
    recipeCategoryCache.set(recipe, group);
    return group;
  }
  function vibeKey(recipe) {
    const title = norm(recipe && recipe.title);
    // Sausage dishes are too alike to schedule twice, even across categories.
    if (
      /\bsausages?\b/.test(title) ||
      (recipe.ingredients || []).some((row) => /\bsausages?\b/.test(norm(row[1])))
    )
      return 'sausage';
    if (/\bfish\b/.test(title) && /\bchips\b/.test(title)) return 'fish:fish-chips';
    return categoryFor(recipe) + ':' + mainKey(recipe);
  }

  const recipePriceCache = new WeakMap();
  function priceOf(recipe) {
    const s = MW.state.get(),
      p = MW.pricing;
    if (!p) return Number(recipe.cost || 0);
    const key = JSON.stringify([
      // Country and retailer changes must invalidate cached UK pricing scores.
      MW.markets ? MW.markets.current() : 'GB',
      s.household.retailer || '',
      p.revision || p.version,
      MW.cataloguePrices?.revision?.(MW.markets?.current() || 'GB') || '',
      s.household.people,
      recipe.servings,
      recipe.scaleSafe,
      p.rowsForRecipe ? p.rowsForRecipe(recipe) : recipe.shoppingIngredients || recipe.ingredients || [],
    ]);
    const cached = recipePriceCache.get(recipe);
    if (cached && cached.key === key) return cached.value;
    const value = p.recipeCost(recipe, s.household.people);
    recipePriceCache.set(recipe, { key, value });
    return value;
  }

  function scoringContext(chosen) {
    const profiles = {},
      families = {},
      formats = {},
      primaries = {},
      images = {};
    const usedIngredients = new Set();
    chosen.forEach((x) => {
      const p = flavourProfile(x),
        f = flavourFamily(x),
        fmt = formatKey(x),
        main = mainKey(x),
        img = visualKey(x);
      if (p) profiles[p] = (profiles[p] || 0) + 1;
      if (f) families[f] = (families[f] || 0) + 1;
      if (fmt) formats[fmt] = (formats[fmt] || 0) + 1;
      primaries[main] = (primaries[main] || 0) + 1;
      if (img) images[img] = (images[img] || 0) + 1;
      (x.ingredients || []).forEach((y) => usedIngredients.add(norm(y[1])));
    });
    return { profiles, families, formats, primaries, images, usedIngredients };
  }

  function candidateScore(recipe, chosen, priceMode, context) {
    const s = MW.state.get();
    const { profiles, families, formats, primaries, images, usedIngredients } =
      context || scoringContext(chosen);
    const p = flavourProfile(recipe),
      family = flavourFamily(recipe),
      fmt = formatKey(recipe),
      main = mainKey(recipe),
      img = visualKey(recipe);
    const overlap = (recipe.ingredients || []).filter((x) => usedIngredients.has(norm(x[1]))).length;
    const overlapBonus = (priceMode ? 0.25 : 0.06) * Math.min(overlap, 4);
    const estimatedRecipeCost = priceOf(recipe);
    // Unknown AU ingredients must never masquerade as a free, cheap dinner.
    const incompleteAU = priceMode && MW.markets?.current() === 'AU' && !Number.isFinite(estimatedRecipeCost);
    const costPenalty = incompleteAU ? 1000 : (Number(estimatedRecipeCost) || 0) * (priceMode ? 0.16 : 0.018);
    const profilePenalty = p ? (profiles[p] || 0) * 25 : 0;
    const familyPenalty = family ? Math.max(0, (families[family] || 0) - 1) * 6 : 0;
    const formatPenalty = fmt ? (formats[fmt] || 0) * 0.75 : 0;
    const primaryPenalty = Math.max(0, (primaries[main] || 0) - 1) * 1.4;
    const imagePenalty = img ? (images[img] || 0) * 3.2 : 0;
    const foodScore = MW.food ? MW.food.score(recipe, s.foodProfile) : 0;
    return (
      MW.learning.score(recipe) +
      foodScore +
      overlapBonus -
      costPenalty -
      profilePenalty -
      familyPenalty -
      formatPenalty -
      primaryPenalty -
      imagePenalty
    );
  }

  function choose(count, priceMode, opts) {
    opts = opts || {};
    const excluded = new Set(opts.excludeIds || []);
    const basePool = MW.RECIPES.filter(autoDinnerAllowed);
    const fixedIds = new Set((opts.fixedRecipes || []).map((r) => r.id));
    let pool = basePool.filter((r) => !excluded.has(r.id) && !fixedIds.has(r.id));
    if (pool.length < count) pool = basePool.filter((r) => !fixedIds.has(r.id));
    if (priceMode && MW.markets?.current() === 'AU') {
      // Prefer complete Australian recipe estimates when enough alternatives
      // exist; retain ordinary meal generation if the source book is partial.
      const fullyPriced = pool.filter((r) => Number.isFinite(priceOf(r)));
      if (fullyPriced.length >= count) pool = fullyPriced;
    }
    const chosen = [];
    const fixed = (opts.fixedRecipes || []).filter(Boolean);
    const priorVibes = new Set(opts.excludeVibes || []);
    const meaty = (r) => {
      if (!MW.food || !MW.food.analyse) return true;
      const analysis = MW.food.analyse(r);
      return analysis.hasMeatOrFishProtein !== undefined
        ? analysis.hasMeatOrFishProtein
        : analysis.hasMeat || analysis.hasFish;
    };
    // 'Anything' means a mixture rather than mostly meat substitutes.
    // A vegetarian or pescatarian preference is always honoured instead.
    const profile = MW.state.get().foodProfile || {};
    const plantFriendly =
      ['vegetarian', 'vegan', 'pescatarian'].includes(profile.diet) ||
      (profile.goals || []).includes('more-veg');
    const limitPlant =
      profile.diet === 'omnivore' &&
      !plantFriendly &&
      pool.filter(meaty).length + fixed.filter(meaty).length >= (opts.totalCount || count);
    const plantLimit = Math.max(1, Math.ceil((opts.totalCount || count) / 3));
    // If pasta is allowed and several dinners are needed, include a pasta dish
    // instead of letting a few high-scoring recipe families crowd it out.
    const pastaSlot =
      (opts.totalCount || count) >= 4 &&
      !fixed.some((r) => categoryFor(r) === 'pasta') &&
      pool.some((r) => categoryFor(r) === 'pasta')
        ? Math.floor(Math.random() * Math.min(3, count))
        : -1;
    while (chosen.length < count && chosen.length < pool.length) {
      const ranked = [];
      const contextRecipes = [...fixed, ...chosen];
      const context = scoringContext(contextRecipes);
      const usedCategories = new Set(contextRecipes.map(categoryFor));
      const plantsChosen = contextRecipes.filter((r) => !meaty(r)).length;
      const lastWasPlant = contextRecipes.length > 0 && !meaty(contextRecipes[contextRecipes.length - 1]);
      const usedImages = new Set(contextRecipes.map((x) => visualKey(x)).filter(Boolean));
      const chosenVibes = new Set(contextRecipes.map(vibeKey));
      const proteinCounts = contextRecipes.reduce((acc, x) => {
        const key = mainKey(x);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
      for (const r of pool) {
        if (chosen.includes(r)) continue;
        const image = visualKey(r);
        ranked.push({
          recipe: r,
          score: candidateScore(r, contextRecipes, priceMode, context),
          repeatsImage: Boolean(image && usedImages.has(image)),
          repeatsProtein: Boolean(proteinCounts[mainKey(r)]),
          overusedProtein: (proteinCounts[mainKey(r)] || 0) >= 2,
          nearClone: isNearClone(r, contextRecipes),
          repeatsCategory: usedCategories.has(categoryFor(r)),
          repeatsVibe: chosenVibes.has(vibeKey(r)),
          repeatsPriorVibe: priorVibes.has(vibeKey(r)),
          exceedsPlantPreference: limitPlant && plantsChosen >= plantLimit && !meaty(r),
          adjacentPlant: !plantFriendly && lastWasPlant && !meaty(r),
        });
      }
      ranked.sort((a, b) => {
        if (a.nearClone !== b.nearClone) return a.nearClone ? 1 : -1;
        if (a.repeatsVibe !== b.repeatsVibe) return a.repeatsVibe ? 1 : -1;
        if (a.exceedsPlantPreference !== b.exceedsPlantPreference) return a.exceedsPlantPreference ? 1 : -1;
        if (a.adjacentPlant !== b.adjacentPlant) return a.adjacentPlant ? 1 : -1;
        if (a.repeatsCategory !== b.repeatsCategory) return a.repeatsCategory ? 1 : -1;
        if (a.repeatsPriorVibe !== b.repeatsPriorVibe) return a.repeatsPriorVibe ? 1 : -1;
        if (a.overusedProtein !== b.overusedProtein) return a.overusedProtein ? 1 : -1;
        if (a.repeatsProtein !== b.repeatsProtein) return a.repeatsProtein ? 1 : -1;
        if (a.repeatsImage !== b.repeatsImage) return a.repeatsImage ? 1 : -1;
        return b.score - a.score;
      });
      if (!ranked.length) break;
      const distinct = ranked.filter(
        (x) =>
          !x.nearClone &&
          !x.overusedProtein &&
          !x.repeatsImage &&
          !x.repeatsCategory &&
          !x.repeatsVibe &&
          !x.repeatsPriorVibe &&
          !x.exceedsPlantPreference &&
          !x.adjacentPlant,
      );
      const varied = ranked.filter(
        (x) =>
          !x.nearClone &&
          !x.overusedProtein &&
          !x.repeatsImage &&
          !x.repeatsCategory &&
          !x.repeatsVibe &&
          !x.exceedsPlantPreference &&
          !x.adjacentPlant,
      );
      const nonClone = ranked.filter((x) => !x.nearClone && !x.overusedProtein && !x.repeatsImage);
      let usable = distinct.length ? distinct : varied.length ? varied : nonClone.length ? nonClone : ranked;
      if (chosen.length === pastaSlot) {
        const pasta = usable.filter((x) => categoryFor(x.recipe) === 'pasta');
        if (pasta.length) usable = pasta;
        else {
          const anyPasta = ranked.filter(
            (x) =>
              categoryFor(x.recipe) === 'pasta' &&
              !x.nearClone &&
              !x.repeatsImage &&
              !x.exceedsPlantPreference,
          );
          if (anyPasta.length) usable = anyPasta;
        }
      }
      let pick = usable[0].recipe;
      if (opts.randomise) {
        const span = Math.max(1, Math.min(40, Math.ceil(usable.length * 0.12)));
        pick = usable[Math.floor(Math.random() * span)].recipe;
      }
      chosen.push(pick);
    }
    return chosen;
  }

  function lunchAllowed(recipe) {
    const s = MW.state.get();
    const avoid = [...(s.household.restrictions || [])].filter(Boolean);
    const basic = MW.avoidance
      ? !MW.avoidance.recipeContains(recipe, avoid)
      : !avoid.some((x) =>
          (recipe.title + ' ' + recipe.subtitle + ' ' + recipe.ingredients.map((y) => y[1]).join(' '))
            .toLowerCase()
            .includes(String(x).toLowerCase()),
        );
    const equipmentOk = !MW.equipment || MW.equipment.allows(recipe, s.household);
    return basic && equipmentOk && (!MW.food || MW.food.lunchAllowed(recipe, s.foodProfile));
  }

  function autoLunchAllowed(recipe) {
    return lunchAllowed(recipe) && !sourceLunchReviewHold(recipe);
  }

  function alternatives(currentId, count) {
    const s = MW.state.get();
    const usedIds = new Set(
      ((s.week && s.week.meals) || []).map((x) => x.recipeId).filter((x) => x !== currentId),
    );
    const chosen = ((s.week && s.week.meals) || [])
      .map((x) => getRecipe(x.recipeId))
      .filter((x) => x && x.id !== currentId);
    const usedImages = new Set(chosen.map((x) => visualKey(x)).filter(Boolean));
    const context = scoringContext(chosen);
    return MW.RECIPES.filter((r) => r.id !== currentId && !usedIds.has(r.id) && autoDinnerAllowed(r))
      .map((r) => ({
        recipe: r,
        repeatsImage: usedImages.has(visualKey(r)),
        nearClone: isNearClone(r, chosen),
        score: candidateScore(r, chosen, Boolean(s.plan.priceMode), context),
      }))
      .sort((a, b) => {
        if (a.nearClone !== b.nearClone) return a.nearClone ? 1 : -1;
        if (a.repeatsImage !== b.repeatsImage) return a.repeatsImage ? 1 : -1;
        return b.score - a.score;
      })
      .slice(0, count || 4)
      .map((x) => x.recipe);
  }

  function randomAlternativePool(currentId) {
    const st = MW.state.get();
    const usedIds = new Set(
      ((st.week && st.week.meals) || []).map((x) => x.recipeId).filter((x) => x !== currentId),
    );
    const chosen = ((st.week && st.week.meals) || [])
      .map((x) => getRecipe(x.recipeId))
      .filter((x) => x && x.id !== currentId);
    const images = new Set(chosen.map(visualKey).filter(Boolean));
    return MW.RECIPES.filter(
      (r) =>
        r.id !== currentId &&
        !usedIds.has(r.id) &&
        autoDinnerAllowed(r) &&
        !isNearClone(r, chosen) &&
        !images.has(visualKey(r)),
    );
  }

  function randomAlternative(currentId) {
    const pool = randomAlternativePool(currentId);
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
  }

  function rankedLunchPool(currentId) {
    const s = MW.state.get();
    return MW.LUNCHES.filter((x) => x.id !== currentId && autoLunchAllowed(x)).sort((a, b) =>
      MW.food ? MW.food.lunchScore(b, s.foodProfile) - MW.food.lunchScore(a, s.foodProfile) : 0,
    );
  }

  function randomLunchPool(currentId) {
    const ranked = rankedLunchPool(currentId);
    const practical = ranked.filter((x) =>
      MW.food && MW.food.practicalLunchCandidate ? MW.food.practicalLunchCandidate(x) : x.practicalLunch,
    );
    if (practical.length) return practical;
    if (!ranked.length) return ranked;
    const score = (x) => (MW.food ? MW.food.lunchScore(x, MW.state.get().foodProfile) : 0);
    const best = score(ranked[0]);
    const shortlist = ranked.filter((x) => score(x) >= best - 1.5).slice(0, 20);
    return shortlist.length ? shortlist : ranked.slice(0, 12);
  }

  function randomLunchAlternative(currentId) {
    const pool = randomLunchPool(currentId);
    if (!pool.length) return null;
    const groups = new Map();
    for (const lunch of pool) {
      const key = lunch.lunchBucket || 'other';
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(lunch);
    }
    const buckets = [...groups.keys()];
    const bucket = buckets[Math.floor(Math.random() * buckets.length)];
    const candidates = groups.get(bucket).slice(0, 6);
    return candidates[Math.floor(Math.random() * candidates.length)] || null;
  }

  function snapshotPlanningState(s) {
    return {
      week: s.week ? JSON.parse(JSON.stringify(s.week)) : null,
      weekHistory: Array.isArray(s.weekHistory) ? JSON.parse(JSON.stringify(s.weekHistory)) : [],
      events: Array.isArray(s.events) ? JSON.parse(JSON.stringify(s.events)) : [],
      shopChecks: { ...(s.ui?.shopChecks || {}) },
      shoppingSection: s.ui?.shoppingSection,
    };
  }

  function restorePlanningState(s, snapshot) {
    s.week = snapshot.week;
    s.weekHistory = snapshot.weekHistory;
    s.events = snapshot.events;
    if (s.ui) {
      s.ui.shopChecks = snapshot.shopChecks;
      s.ui.shoppingSection = snapshot.shoppingSection;
    }
    MW.state.save();
  }

  function enforceGeneratedBudget(context) {
    const enforce = MW.planner && MW.planner.enforceGeneratedBudget;
    return typeof enforce === 'function' ? enforce(context) : null;
  }

  function constraintSummary() {
    const s = MW.state.get(),
      parts = [];
    const profile = s.foodProfile || {};
    if (profile.diet && profile.diet !== 'omnivore') {
      const pattern = MW.food && MW.food.patterns && MW.food.patterns.find((x) => x.id === profile.diet);
      parts.push((pattern && pattern.label) || 'eating style');
    }
    if ((s.household.restrictions || []).length || (s.household.dislikes || []).length)
      parts.push('foods you do not want');
    if ((profile.allergens || []).length) parts.push('allergies');
    if ((s.household.equipment || []).length) parts.push('kitchen equipment');
    return parts;
  }

  function eligibilityFailureMessage(required, found) {
    const parts = constraintSummary(),
      why = parts.length ? ' with your current ' + parts.join(', ') : ' with your current planner choices';
    return (
      'My Week could only find ' +
      found +
      ' suitable dinner' +
      (found === 1 ? '' : 's') +
      ' for ' +
      required +
      ' planned dinner' +
      (required === 1 ? '' : 's') +
      why +
      '. No empty or partial week was saved. Review those choices and try again.'
    );
  }

  function lunchEligibilityFailureMessage() {
    const parts = constraintSummary(),
      why = parts.length ? ' with your current ' + parts.join(', ') : ' with your current planner choices';
    return (
      'My Week could not find a suitable lunch recipe' +
      why +
      '. No partial week was saved. Review those choices and try again.'
    );
  }

  function unfinishedMeals(week) {
    const cooked = new Set(week?.completedRecipes || []);
    return (week?.meals || []).filter((meal) => meal?.recipeId && !cooked.has(meal.recipeId));
  }

  function keepUnfinishedForDays(week, days) {
    const remaining = unfinishedMeals(week);
    if (remaining.length > days.length)
      throw new Error(
        'You have more unfinished meals than planned dinner days. Keep your current meals or choose more dinner days in Settings.',
      );
    const booked = new Map();
    // Keep the original day where possible, then allocate a remaining free day.
    for (const meal of remaining) if (days.includes(meal.day)) booked.set(meal.day, meal.recipeId);
    for (const meal of remaining) {
      if ([...booked.values()].includes(meal.recipeId)) continue;
      const next = days.find((day) => !booked.has(day));
      if (next) booked.set(next, meal.recipeId);
    }
    return booked;
  }

  function regenerateAll(opts) {
    const s = MW.state.get(),
      snapshot = snapshotPlanningState(s);
    opts = opts || {};
    try {
      const validDays = new Set(MW.DAYS.map((x) => x.key));
      const configured = Array.isArray(opts.dinnerDaysOverride)
        ? opts.dinnerDaysOverride
        : s.plan.dinnerDays || [];
      const dinnerDays = [...new Set(configured.filter((x) => validDays.has(x)))];
      const previous = s.week || {};
      const sameWeek = previous.weekKey === currentWeekKey();
      if (generationBlockedByDelivery(s))
        throw new Error('Complete the current delivery before generating another week.');
      if (previous.weekKey && !sameWeek) MW.weeks.archive(s, previous);
      const previousIds = (previous.meals || []).map((x) => x.recipeId).filter(Boolean);
      const carriedByDay =
        opts.keepUnfinished && !sameWeek ? keepUnfinishedForDays(previous, dinnerDays) : new Map();
      const fixedRecipes = [...carriedByDay.values()].map(getRecipe);
      if (fixedRecipes.some((r) => !r || !allowed(r)))
        throw new Error(
          'One of your unfinished meals no longer matches your food settings. Your original plan has been kept.',
        );
      const freshCount = dinnerDays.length - fixedRecipes.length;
      const chosen = choose(freshCount, Boolean(s.plan.priceMode), {
        excludeIds: previousIds,
        excludeVibes: (previous.meals || [])
          .map((m) => getRecipe(m.recipeId))
          .filter(Boolean)
          .map(vibeKey),
        fixedRecipes,
        totalCount: dinnerDays.length,
        randomise: true,
      });
      if (chosen.length !== freshCount) throw new Error(eligibilityFailureMessage(freshCount, chosen.length));
      const lunchGoal =
        (previous.planning?.lunchDays || s.plan.lunchDays || []).length *
        Math.max(1, Number(previous.planning?.lunchPeople || s.plan.lunchPeople || 1));
      const pendingLunch =
        opts.keepUnfinished &&
        !sameWeek &&
        previous.lunchId &&
        Number(previous.preparedLunchPortions?.[previous.lunchId] || 0) < lunchGoal;
      const priorLunch = pendingLunch && getRecipe(previous.lunchId);
      const lunch =
        priorLunch && lunchAllowed(priorLunch) ? priorLunch : randomLunchAlternative(previous.lunchId);
      if ((s.plan.lunchDays || []).length && !lunch) throw new Error(lunchEligibilityFailureMessage());
      const hadShop = Boolean(previous.shop);

      s.week = {
        createdAt: new Date().toISOString(),
        weekKey: currentWeekKey(),
        planning: MW.weeks.planning(s),
        planMode: opts.planMode || 'normal',
        status: previous.weekKey === currentWeekKey() && previous.delivery ? previous.status : 'draft',
        delivery: previous.weekKey === currentWeekKey() ? previous.delivery || null : null,
        completedRecipes: previous.weekKey === currentWeekKey() ? previous.completedRecipes || [] : [],
        preparedLunchPortions:
          previous.weekKey === currentWeekKey() ? previous.preparedLunchPortions || {} : {},
        preparation: previous.weekKey === currentWeekKey() ? previous.preparation || null : null,
        meals: dinnerDays
          .map((day) => ({ day, recipeId: carriedByDay.get(day) || chosen.shift()?.id }))
          .filter((x) => x.recipeId),
        lunchId: lunch && lunch.id,
        extras: Array.isArray(previous.extras) ? previous.extras : [],
        shop: null,
        inventoryUsed: [],
        forceBuy: Array.isArray(previous.forceBuy) ? previous.forceBuy.slice() : [],
        savingMode: Boolean(s.plan.priceMode),
        shoppingSubstitutions: sameWeek ? { ...(previous.shoppingSubstitutions || {}) } : {},
        shopProgress: sameWeek ? previous.shopProgress || null : null,
      };
      if (!sameWeek) s.ui.shopChecks = {};
      MW.state.log('week_regenerated', {
        previousRecipeIds: previousIds,
        recipeIds: s.week.meals.map((x) => x.recipeId),
        previousLunchId: previous.lunchId || '',
        lunchId: s.week.lunchId || '',
      });
      MW.state.save();
      s.week.regenerationExcludedIds = previousIds;
      enforceGeneratedBudget('regenerate');
      delete s.week.regenerationExcludedIds;
      MW.state.save();
      if (
        carriedByDay.size &&
        [...carriedByDay].some(([day, id]) => !s.week.meals.some((m) => m.day === day && m.recipeId === id))
      )
        throw new Error(
          'Could not keep your unfinished dinners within the weekly budget. Your original plan has been kept.',
        );
      if (
        !opts.keepUnfinished &&
        previousIds.length &&
        s.week.meals.every((x) => previousIds.includes(x.recipeId))
      )
        throw new Error(
          'My Week could not find a genuinely different set of suitable dinners. Your existing plan has been kept.',
        );
      if (hadShop && opts.rebuildShop !== false && MW.shopping)
        MW.shopping.build({ savingMode: Boolean(s.plan.priceMode), preserveChecks: true });
      return s.week;
    } catch (error) {
      restorePlanningState(s, snapshot);
      throw error;
    }
  }

  // Manual planning starts empty and never invents meals. The UI must obtain
  // explicit confirmation before replacing a populated week or placed order.
  function startCustomWeek(options = {}) {
    const st = MW.state.get(),
      snapshot = snapshotPlanningState(st);
    const old = st.week || {},
      weekKey = currentWeekKey();
    if (generationBlockedByDelivery(st))
      throw new Error('Complete the current delivery before making a new plan.');
    if ((old.meals || []).length && !options.confirmed)
      throw new Error('Confirm replacing your current meals before starting a custom week.');
    try {
      if (old.weekKey && old.weekKey !== weekKey) MW.weeks.archive(st, old);
      st.week = {
        createdAt: new Date().toISOString(),
        weekKey,
        planning: MW.weeks.planning(st),
        planMode: 'custom',
        status: 'draft',
        delivery: null,
        completedRecipes: [],
        preparedLunchPortions: {},
        preparation: null,
        meals: [],
        lunchId: old.lunchId || null,
        extras: [],
        shop: null,
        inventoryUsed: [],
        forceBuy: [],
        savingMode: Boolean(st.plan.priceMode),
        shoppingSubstitutions: {},
        shopProgress: null,
      };
      st.ui.shopChecks = {};
      st.ui.shoppingSection = '__all';
      MW.state.log('custom_week_started', { previousMealCount: (old.meals || []).length });
      MW.state.save();
      return st.week;
    } catch (error) {
      restorePlanningState(st, snapshot);
      throw error;
    }
  }

  function setDinner(dayKey, recipeId, { requireExisting = false, rejectPrevious = false } = {}) {
    const st = MW.state.get();
    const next = getRecipe(recipeId);
    if (
      !st.week ||
      !MW.DAYS.some((d) => d.key === dayKey) ||
      !next ||
      next.isLunch ||
      !allowed(next) ||
      currentPlanLocked(st)
    )
      return false;
    const meals = st.week.meals || [];
    if (meals.some((m) => m.day !== dayKey && m.recipeId === recipeId)) return false;
    const slot = meals.find((m) => m.day === dayKey);
    if (!slot && requireExisting) return false;
    if (slot && slot.recipeId === recipeId) return true;
    const old = slot && getRecipe(slot.recipeId);
    if (rejectPrevious && old) MW.learning.reject(old);
    if (slot) slot.recipeId = recipeId;
    else meals.push({ day: dayKey, recipeId });
    const order = MW.DAYS.map((d) => d.key);
    meals.sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day));
    const days = new Set(st.plan.dinnerDays || []);
    days.add(dayKey);
    st.plan.dinnerDays = [...days].sort((a, b) => order.indexOf(a) - order.indexOf(b));
    if (st.week.planning) st.week.planning.dinnerDays = st.plan.dinnerDays.slice();
    MW.state.log(rejectPrevious ? 'meal_replaced' : 'meal_chosen', {
      day: dayKey,
      old: old && old.id,
      new: recipeId,
    });
    invalidateShop(st, true);
    return true;
  }

  function chooseForDay(dayKey, recipeId) {
    return setDinner(dayKey, recipeId);
  }

  function invalidateShop(s, rebuild) {
    const hadShop = Boolean(s.week && s.week.shop);
    if (!s.week) return;
    s.week.shop = null;
    s.week.inventoryUsed = [];
    // Preserve explicit buy decisions when a meal changes.
    MW.state.save();
    if (rebuild && hadShop && MW.shopping)
      MW.shopping.build({ savingMode: Boolean(s.plan.priceMode), preserveChecks: true });
  }

  function buildWeek(opts) {
    const s = MW.state.get(),
      snapshot = snapshotPlanningState(s);
    opts = opts || {};
    try {
      if (generationBlockedByDelivery(s))
        throw new Error('Complete the current delivery before generating another week.');
      const validDays = new Set(MW.DAYS.map((x) => x.key));
      const configured = Array.isArray(opts.dinnerDaysOverride)
        ? opts.dinnerDaysOverride
        : s.plan.dinnerDays || [];
      const dinnerDays = [...new Set(configured.filter((x) => validDays.has(x)))];
      const chosen = choose(dinnerDays.length, Boolean(s.plan.priceMode), { randomise: true });
      if (chosen.length !== dinnerDays.length)
        throw new Error(eligibilityFailureMessage(dinnerDays.length, chosen.length));
      const previous = s.week || {};
      if (previous.weekKey && previous.weekKey !== currentWeekKey()) {
        MW.weeks.archive(s, previous);
        s.ui.shopChecks = {};
        s.ui.shoppingSection = '__all';
      }
      const lunchPool = MW.LUNCHES.filter(lunchAllowed);
      const existingLunch = lunchPool.find((x) => x.id === previous.lunchId);
      const lunch = existingLunch || randomLunchAlternative(null) || null;
      if ((s.plan.lunchDays || []).length && !lunch) throw new Error(lunchEligibilityFailureMessage());

      s.week = {
        createdAt: new Date().toISOString(),
        weekKey: currentWeekKey(),
        planning: MW.weeks.planning(s),
        planMode: opts.planMode || 'normal',
        status: previous.weekKey === currentWeekKey() && previous.delivery ? previous.status : 'draft',
        delivery: previous.weekKey === currentWeekKey() ? previous.delivery || null : null,
        completedRecipes: previous.weekKey === currentWeekKey() ? previous.completedRecipes || [] : [],
        preparedLunchPortions:
          previous.weekKey === currentWeekKey() ? previous.preparedLunchPortions || {} : {},
        preparation: previous.weekKey === currentWeekKey() ? previous.preparation || null : null,
        meals: dinnerDays
          .map((day, i) => ({ day, recipeId: chosen[i] && chosen[i].id }))
          .filter((x) => x.recipeId),
        lunchId: lunch ? lunch.id : null,
        extras: opts.preserveExtras && Array.isArray(previous.extras) ? previous.extras : [],
        shop: null,
        inventoryUsed: [],
        forceBuy: Array.isArray(previous.forceBuy) ? previous.forceBuy.slice() : [],
        savingMode: Boolean(s.plan.priceMode),
      };
      MW.state.log('week_created', {
        recipeIds: s.week.meals.map((x) => x.recipeId),
        dinnerDays: dinnerDays,
        lunchDays: (s.plan.lunchDays || []).slice(),
        priceMode: Boolean(s.plan.priceMode),
      });
      MW.state.save();
      enforceGeneratedBudget('build');
      return s.week;
    } catch (error) {
      restorePlanningState(s, snapshot);
      throw error;
    }
  }

  MW.planner = {
    allowed,
    autoDinnerAllowed,
    doubleProteinPortion,
    sourceReviewHold,
    flavourProfile,
    flavourFamily,
    categoryFor,
    vibeKey,
    mealCategories,
    orderedPlanLocked: currentPlanLocked,
    buildWeek,
    startCustomWeek,
    unfinishedMeals,
    chooseForDay,
    currentWeekKey,
    todayKey,
    remainingDinnerDays,
    lunchAllowed,
    autoLunchAllowed,
    sourceLunchReviewHold,
    alternatives,
    randomAlternativePool,
    randomAlternative,
    randomLunchPool,
    randomLunchAlternative,
    regenerateAll,
    replace(day, newId) {
      return setDinner(day, newId, { requireExisting: true, rejectPrevious: true });
    },
    lunchAlternatives() {
      const s = MW.state.get();
      return MW.LUNCHES.filter((x) => lunchAllowed(x) && (!s.week || x.id !== s.week.lunchId)).sort((a, b) =>
        MW.food ? MW.food.lunchScore(b, s.foodProfile) - MW.food.lunchScore(a, s.foodProfile) : 0,
      );
    },
    replaceLunch(newId) {
      const s = MW.state.get();
      const old = s.week && s.week.lunchId;
      const next = MW.LUNCHES.find((x) => x.id === newId);
      if (currentPlanLocked(s) || !s.week || !next || !lunchAllowed(next)) return false;
      s.week.lunchId = newId;
      MW.state.log('lunch_replaced', { old, new: newId });
      invalidateShop(s, true);
      return true;
    },
    toggleDinner(dayKey, on) {
      const s = MW.state.get();
      const valid = MW.DAYS.some((x) => x.key === dayKey);
      if (!valid || !s.week || currentPlanLocked(s)) return false;
      const days = new Set(s.week.planning?.dinnerDays || s.plan.dinnerDays || []);
      const existing = s.week.meals.find((x) => x.day === dayKey);
      if (on) {
        days.add(dayKey);
        if (!existing) {
          const used = new Set(s.week.meals.map((x) => x.recipeId));
          const chosen = s.week.meals.map((x) => getRecipe(x.recipeId)).filter(Boolean);
          // Score each eligible recipe once, not repeatedly inside a sort comparator.
          const context = scoringContext(chosen);
          let pick = null,
            bestScore = -Infinity;
          for (const candidate of MW.RECIPES) {
            if (used.has(candidate.id) || !autoDinnerAllowed(candidate)) continue;
            const score = candidateScore(candidate, chosen, Boolean(s.plan.priceMode), context);
            if (!pick || score > bestScore) {
              pick = candidate;
              bestScore = score;
            }
          }
          if (pick) s.week.meals.push({ day: dayKey, recipeId: pick.id });
        }
      } else {
        days.delete(dayKey);
        s.week.meals = s.week.meals.filter((x) => x.day !== dayKey);
      }
      const order = MW.DAYS.map((x) => x.key);
      s.plan.dinnerDays = [...days].sort((a, b) => order.indexOf(a) - order.indexOf(b));
      if (s.week.planning) s.week.planning.dinnerDays = s.plan.dinnerDays.slice();
      s.week.meals.sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day));
      MW.state.log('dinner_day_toggled', { day: dayKey, on: Boolean(on) });
      invalidateShop(s, true);
      return true;
    },
    toggleLunch(dayKey, on) {
      const s = MW.state.get();
      const valid = MW.DAYS.some((x) => x.key === dayKey);
      if (!valid || currentPlanLocked(s)) return false;
      const days = new Set(s.week?.planning?.lunchDays || s.plan.lunchDays || []);
      if (on) days.add(dayKey);
      else days.delete(dayKey);
      const order = MW.DAYS.map((x) => x.key);
      s.plan.lunchDays = [...days].sort((a, b) => order.indexOf(a) - order.indexOf(b));
      if (s.week?.planning) s.week.planning.lunchDays = s.plan.lunchDays.slice();
      if (s.week) invalidateShop(s, true);
      MW.state.log('lunch_day_toggled', { day: dayKey, on: Boolean(on) });
      MW.state.save();
      return true;
    },
    visualKey,
    visualFamilyKey: sourceFamilyKey,
    proteinKey: mainKey,
    titleSimilarity,
    plannedMealCost() {
      const s = MW.state.get();
      if (!s.week) return 0;
      const dinner = (s.week.meals || []).reduce((sum, m) => {
        const r = getRecipe(m.recipeId);
        return (
          sum +
          (r
            ? MW.pricing
              ? MW.pricing.recipeCost(r, MW.weeks.currentPlanning(s).people)
              : Number(r.cost || 0)
            : 0)
        );
      }, 0);
      const lunch = MW.LUNCHES.find((x) => x.id === s.week.lunchId);
      const plan = MW.weeks.currentPlanning(s),
        portions = (plan.lunchDays || []).length * Math.max(1, Number(plan.lunchPeople) || 1);
      const lunchCost =
        lunch && portions
          ? MW.pricing
            ? MW.pricing.recipeCost(lunch, portions)
            : lunch.cost * (portions / lunch.servings)
          : 0;
      return Math.round((dinner + lunchCost) * 100) / 100;
    },
  };
})();

// Lower-cost planner optimisation

window.MW = window.MW || {};
(function () {
  if (!MW.planner || !MW.pricing) return;
  const planner = MW.planner;
  const p = MW.pricing;
  const norm = (x) =>
    String(x || '')
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  const round = (n) => Math.round((Number(n) || 0) * 100) / 100;
  const getRecipe = (id) => (MW.catalog && MW.catalog.get(id)) || MW.RECIPES.find((x) => x.id === id);
  const productKey = (name, entry) =>
    entry && entry.label && !/equivalent/i.test(entry.label) ? norm(entry.label) : norm(name);

  function regularQtyText(x) {
    const count = Math.max(1, Number(x.count) || 1);
    let unit = String(x.unit || 'item').trim();
    if (count !== 1 && !/s$/i.test(unit)) unit += 's';
    return count + ' ' + unit;
  }

  function basketEngineAvailable() {
    return Boolean(MW.basket && typeof MW.basket.calculate === 'function');
  }
  function basketEstimate(meals, options) {
    if (!basketEngineAvailable())
      throw new Error(
        'My Week basket engine is not loaded, so a shopping-budget total cannot be calculated yet.',
      );
    const estimate = MW.basket.calculate(meals, options);
    if (
      MW.markets?.current() === 'AU' &&
      (estimate.total == null ||
        !Number.isFinite(estimate.total) ||
        estimate.missingPriceCount > 0 ||
        estimate.unresolved > 0)
    ) {
      // JS compares null as zero. Reject incomplete candidate weeks rather
      // than allowing a missing ingredient to win an optimisation search.
      return {
        ...estimate,
        total: Number.POSITIVE_INFINITY,
        unresolved: Math.max(1, estimate.unresolved || 0, estimate.missingPriceCount || 0),
        pricingAvailable: false,
      };
    }
    return estimate;
  }

  const valueCostCache = new Map();
  function valueCost(r) {
    const people = Number(MW.state.get().household.people) || 2;
    const marketKey = MW.markets ? MW.markets.current() : 'GB';
    const retailerKey = MW.state.get().household.retailer || '';
    const marketPriceRevision = MW.cataloguePrices?.revision?.(marketKey) || '';
    const key = [marketKey, retailerKey, p.version || '', marketPriceRevision, people, r.id].join('|');
    if (valueCostCache.has(key)) return valueCostCache.get(key);
    const measuredCost = p.recipeCost(r, people);
    // A missing Australian ingredient isn't a zero-cost alternative.
    // Only fully priced recipe costs can be ranked as cheap candidates.
    const cost =
      marketKey === 'AU' && !Number.isFinite(measuredCost) ? Number.POSITIVE_INFINITY : measuredCost;
    valueCostCache.set(key, cost);
    return cost;
  }

  const recipeText = (r) => norm([r.title, r.subtitle, ...(r.ingredients || []).map((x) => x[1])].join(' '));
  function premiumPenalty(r) {
    const t = recipeText(r);
    let score = 0;
    if (/\b(sirloin|rump steak|beef steak|venison|duck breast|lamb steak)\b/.test(t)) score += 5;
    if (/\b(salmon|monkfish|sea bream|crab|king prawn|prawns|shellfish)\b/.test(t)) score += 4;
    if (/\b(pork rib rack|pork belly|burrata)\b/.test(t)) score += 2.5;
    if (/\b(chicken breast|mini fillet|fish fillet)\b/.test(t)) score += 1;
    if (/\b(premium|ultimate|deluxe|feast)\b/.test(t)) score += 1.5;
    const proteinWords = [
      'chicken',
      'beef',
      'pork',
      'lamb',
      'duck',
      'turkey',
      'salmon',
      'prawn',
      'crab',
      'fish',
      'tofu',
      'halloumi',
      'paneer',
    ];
    const present = proteinWords.filter((x) => new RegExp('\\b' + x + '\\b').test(t));
    if (new Set(present).size >= 2) score += 2;
    if (/\bdouble\b/.test(t) && present.length) score += 3;
    return score;
  }
  function formatKey(r) {
    const t = norm([r.title, r.subtitle, ...(r.tags || [])].join(' '));
    const rows = [
      ['curry', /\bcurry\b|\bkorma\b|\btikka\b|\bdal\b|\bdhal\b/],
      ['soup', /\bsoup\b/],
      ['salad', /\bsalad\b/],
      ['tacos', /\btaco/],
      ['wraps', /\bwrap/],
      ['stirfry', /\bstir ?fry\b/],
      ['noodles', /\bnoodle/],
      ['pasta', /\bpasta\b|\bspaghetti\b|\blinguine\b|\bpenne\b|\bravioli\b|\btortell/],
      ['rice', /\brice\b|\brisotto\b/],
      ['traybake', /\btray ?bake\b/],
      ['couscous', /\bcouscous\b/],
      ['burger', /\bburger\b/],
      ['pie', /\bpie\b/],
    ];
    const hit = rows.find((x) => x[1].test(t));
    return hit ? hit[0] : '';
  }
  const visualKey = (r) => planner.visualKey(r);
  const budgetCandidateMetaCache = new WeakMap();
  function budgetCandidateMeta(r) {
    if (budgetCandidateMetaCache.has(r)) return budgetCandidateMetaCache.get(r);
    const ingredientKeys = new Set(
      (r.ingredients || []).map((row) => productKey(row[1], p.entryFor(row[1]))),
    );
    const meta = { pk: planner.proteinKey(r), fmt: formatKey(r), img: visualKey(r), ingredientKeys };
    budgetCandidateMetaCache.set(r, meta);
    return meta;
  }
  function hashJitter(id, seed) {
    const str = String(id || '') + '|' + seed;
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return ((h >>> 0) % 1000) / 1000;
  }
  function limitEverydayPlantMeals(state, availableMeaty, count) {
    const profile = state.foodProfile || {};
    return (
      profile.diet === 'omnivore' && !(profile.goals || []).includes('more-veg') && availableMeaty >= count
    );
  }

  function isPlantDinner(recipe) {
    return Boolean(MW.food && MW.food.analyse && !MW.food.analyse(recipe).hasMeatOrFishProtein);
  }

  function candidateSet(priced, count, seed, strictProtein) {
    const s = MW.state.get();
    const limitPlants = limitEverydayPlantMeals(s, priced.filter((x) => !isPlantDinner(x.r)).length, count);
    const maxPlants = Math.max(1, Math.ceil(count / 3));
    const chosen = [],
      chosenIngredientKeys = new Set();
    while (chosen.length < count && priced.length) {
      const proteinCounts = {},
        formatCounts = {},
        images = new Set(chosen.map(visualKey).filter(Boolean));
      chosen.forEach((r) => {
        const meta = budgetCandidateMeta(r);
        proteinCounts[meta.pk] = (proteinCounts[meta.pk] || 0) + 1;
        if (meta.fmt) formatCounts[meta.fmt] = (formatCounts[meta.fmt] || 0) + 1;
      });
      const ranked = priced
        .filter((x) => !chosen.includes(x.r))
        .map((x) => {
          const r = x.r,
            meta = budgetCandidateMeta(r),
            pk = meta.pk,
            fmt = meta.fmt,
            img = meta.img;
          let overlap = 0;
          for (const key of meta.ingredientKeys) if (chosenIngredientKeys.has(key)) overlap++;
          const nearClone = chosen.some((c) => planner.titleSimilarity(r, c) >= 0.7);
          let score = 0;
          score -= x.cost * 1.4;
          score -= x.premium * 3.8;
          score += Math.min(5, overlap) * 0.75;
          score -= (proteinCounts[pk] || 0) * (strictProtein ? 12 : 4.5);
          score -= (fmt ? formatCounts[fmt] || 0 : 0) * (strictProtein ? 5 : 3);
          if (img && images.has(img)) score -= 40;
          if (nearClone) score -= 45;
          if (MW.food && MW.food.score) score += Number(MW.food.score(r, s.foodProfile) || 0) * 0.25;
          if (MW.learning && MW.learning.score) score += Number(MW.learning.score(r) || 0) * 0.15;
          score += hashJitter(r.id, seed) * 0.9;
          return {
            r,
            score,
            pk,
            fmt,
            repeatsProtein: Boolean(proteinCounts[pk]),
            repeatsImage: Boolean(img && images.has(img)),
            nearClone,
          };
        })
        .sort((a, b) => b.score - a.score);
      if (!ranked.length) break;
      const usedVibes = new Set(chosen.map(planner.vibeKey));
      const plantsChosen = chosen.filter(isPlantDinner).length;
      const previousIsPlant = chosen.length > 0 && isPlantDinner(chosen[chosen.length - 1]);
      const eligible = ranked.filter((x) => {
        if (usedVibes.has(planner.vibeKey(x.r))) return false;
        if (limitPlants && isPlantDinner(x.r)) return plantsChosen < maxPlants && !previousIsPlant;
        return true;
      });
      if (!eligible.length) break;
      const distinct = eligible.filter((x) => !x.repeatsProtein && !x.repeatsImage && !x.nearClone);
      const varied = eligible.filter(
        (x) => (proteinCounts[x.pk] || 0) < 2 && !x.repeatsImage && !x.nearClone,
      );
      const visualDistinct = eligible.filter((x) => !x.repeatsImage && !x.nearClone);
      const pick = strictProtein
        ? distinct[0] || varied[0] || visualDistinct[0] || eligible[0]
        : varied[0] || visualDistinct[0] || eligible[0];
      chosen.push(pick.r);
      for (const key of budgetCandidateMeta(pick.r).ingredientKeys) chosenIngredientKeys.add(key);
    }
    return chosen;
  }

  function relaxedBudgetVariety(recipes) {
    const s = MW.state.get();
    const profile = s.foodProfile || {};
    const limitPlants = profile.diet === 'omnivore' && !(profile.goals || []).includes('more-veg');
    const maxPlants = Math.max(1, Math.ceil(recipes.length / 3));
    let plantCount = 0;
    const ids = new Set(),
      images = new Set(),
      vibes = new Set(),
      proteins = {},
      formats = {};
    for (let i = 0; i < recipes.length; i++) {
      const r = recipes[i];
      if (!r || ids.has(r.id)) return false;
      ids.add(r.id);
      const vibe = planner.vibeKey(r);
      if (vibes.has(vibe)) return false;
      vibes.add(vibe);
      if (limitPlants && isPlantDinner(r)) {
        plantCount++;
        if (plantCount > maxPlants || (i > 0 && isPlantDinner(recipes[i - 1]))) return false;
      }
      const img = visualKey(r);
      if (img && images.has(img)) return false;
      if (img) images.add(img);
      for (let j = 0; j < i; j++) if (planner.titleSimilarity(r, recipes[j]) >= 0.7) return false;
      const pk = planner.proteinKey(r);
      proteins[pk] = (proteins[pk] || 0) + 1;
      if (proteins[pk] > 2) return false;
      if (i > 0 && planner.proteinKey(recipes[i - 1]) === pk) return false;
      const fmt = formatKey(r);
      if (fmt) {
        formats[fmt] = (formats[fmt] || 0) + 1;
        if (formats[fmt] > 4) return false;
      }
    }
    return true;
  }

  function budgetRescue(days, budget, maxUnresolved, options) {
    options = options || {};
    maxUnresolved = Number.isFinite(Number(maxUnresolved)) ? Number(maxUnresolved) : Infinity;
    const savingMode = Boolean(options.savingMode);
    const lunchId = Object.prototype.hasOwnProperty.call(options, 'lunchId')
      ? options.lunchId
      : MW.state.get().week && MW.state.get().week.lunchId;
    const floor = basketEstimate([], { savingMode, lunchId });
    if (floor.total > budget + 0.001 || floor.unresolved > maxUnresolved) return null;

    // Rank broadly with the lightweight recipe cost model, then use exact basket
    // pricing only for complete candidate weeks. Exact totals still decide success.
    const excludedIds = new Set(options.excludeIds || MW.state.get().week?.regenerationExcludedIds || []);
    const priced = MW.RECIPES.filter((r) => planner.autoDinnerAllowed(r) && !excludedIds.has(r.id))
      .map((r) => ({
        r,
        cost: valueCost(r),
        premium: premiumPenalty(r),
      }))
      .sort((a, b) => a.cost + a.premium * 1.15 - (b.cost + b.premium * 1.15))
      .slice(0, Math.min(220, MW.RECIPES.length));

    let best = null;
    const consider = (recipes) => {
      if (recipes.length !== days.length || !relaxedBudgetVariety(recipes)) return;
      const estimate = basketEstimate(
        days.map((d, i) => ({ day: d, recipeId: recipes[i].id })),
        { savingMode, lunchId },
      );
      if (estimate.unresolved > maxUnresolved) return;
      if (!best || estimate.total < best.estimate.total)
        best = { recipes: recipes.slice(), estimate, lunchId };
    };

    for (let seed = 0; seed < 18; seed++) consider(candidateSet(priced, days.length, 1000 + seed, seed < 12));
    if (!best) consider(priced.slice(0, days.length).map((x) => x.r));
    if (!best) return null;

    const pool = priced.slice(0, 110).map((x) => x.r);
    let working = best.recipes.slice(),
      workingEstimate = best.estimate;
    for (
      let pass = 0;
      pass < Math.min(8, days.length + 2) && workingEstimate.total > budget + 0.001;
      pass++
    ) {
      let swap = null;
      for (let i = 0; i < working.length; i++) {
        for (const candidate of pool) {
          if (candidate.id === working[i].id || working.some((r, j) => j !== i && r.id === candidate.id))
            continue;
          const trial = working.slice();
          trial[i] = candidate;
          if (!relaxedBudgetVariety(trial)) continue;
          const estimate = basketEstimate(
            days.map((d, j) => ({ day: d, recipeId: trial[j].id })),
            { savingMode, lunchId },
          );
          if (estimate.unresolved > maxUnresolved || estimate.total + 0.001 >= workingEstimate.total)
            continue;
          if (!swap || estimate.total < swap.estimate.total) swap = { i, candidate, estimate };
        }
      }
      if (!swap) break;
      working[swap.i] = swap.candidate;
      workingEstimate = swap.estimate;
    }
    if (workingEstimate.total < best.estimate.total)
      best = { recipes: working, estimate: workingEstimate, lunchId };
    return best.estimate.total <= budget + 0.001 ? best : null;
  }

  function hardBudgetPlan(options) {
    options = options || {};
    const s = MW.state.get();
    if (planner.orderedPlanLocked(s))
      throw new Error('Complete the current delivery before changing this plan.');
    const budget = Number(s.household.budget) || 0;
    if (!s.week || !budget)
      return {
        metBudget: true,
        changed: false,
        budget,
        candidateTotal: 0,
        overBudgetBy: 0,
        reason: 'no-budget',
      };
    if (!basketEngineAvailable())
      return {
        metBudget: true,
        changed: false,
        skipped: true,
        budget,
        candidateTotal: null,
        overBudgetBy: 0,
        reason: 'basket-engine-unavailable',
      };
    const savingMode = options.savingMode == null ? Boolean(s.plan.priceMode) : Boolean(options.savingMode);
    const currentMeals = (s.week.meals || []).slice();
    const currentLunchId = s.week.lunchId || null;
    const baseline = basketEstimate(currentMeals, { savingMode, lunchId: currentLunchId });
    if (baseline.total <= budget + 0.001) {
      const ok = {
        metBudget: true,
        changed: false,
        budget,
        currentTotal: baseline.total,
        candidateTotal: baseline.total,
        overBudgetBy: 0,
        reason: 'already-within-budget',
      };
      s.week.budgetResult = ok;
      return ok;
    }
    const days = currentMeals.map((x) => x.day);
    if (!days.length) {
      return {
        metBudget: false,
        changed: false,
        budget,
        currentTotal: baseline.total,
        candidateTotal: baseline.total,
        overBudgetBy: round(baseline.total - budget),
        reason: 'non-meal-costs-exceed-budget',
      };
    }
    const maxUnresolved = baseline.unresolved;
    const lunchDays = (s.plan.lunchDays || []).length;
    let lunchIds = lunchDays ? [currentLunchId] : [null];
    if (lunchDays) {
      const ranked = MW.LUNCHES.filter((l) => planner.autoLunchAllowed(l))
        .map((l) => ({
          id: l.id,
          estimate: basketEstimate([], { savingMode, lunchId: l.id }),
        }))
        .filter((x) => x.estimate.unresolved <= maxUnresolved)
        .sort((a, b) => a.estimate.total - b.estimate.total)
        .slice(0, 12)
        .map((x) => x.id);
      lunchIds = [...new Set([currentLunchId, ...ranked].filter(Boolean))];
    }
    let best = null;
    for (const lunchId of lunchIds) {
      const rescue = budgetRescue(days, budget, maxUnresolved, { savingMode, lunchId });
      if (!rescue) continue;
      if (lunchId === currentLunchId) {
        best = rescue;
        break;
      }
      if (!best || rescue.estimate.total < best.estimate.total) best = rescue;
    }
    if (!best) {
      return {
        metBudget: false,
        changed: false,
        budget,
        currentTotal: baseline.total,
        candidateTotal: baseline.total,
        overBudgetBy: round(baseline.total - budget),
        reason: 'no-valid-plan-under-budget',
      };
    }
    const oldIds = currentMeals.map((x) => x.recipeId);
    const newIds = best.recipes.map((x) => x.id);
    const lunchChanged = (best.lunchId || null) !== currentLunchId;
    const changed = lunchChanged || newIds.some((id, i) => id !== oldIds[i]);
    s.week.meals = days.map((day, i) => ({ day, recipeId: newIds[i] }));
    if (lunchDays) s.week.lunchId = best.lunchId;
    s.week.shop = null;
    s.week.inventoryUsed = [];
    const result = {
      metBudget: true,
      changed,
      budget,
      currentTotal: baseline.total,
      candidateTotal: best.estimate.total,
      overBudgetBy: 0,
      reason: 'hard-budget-plan',
      swaps: newIds.reduce((n, id, i) => n + (id !== oldIds[i] ? 1 : 0), 0),
      lunchChanged,
    };
    s.week.budgetResult = result;
    return result;
  }

  function optimiseForSavings() {
    const s = MW.state.get();
    if (planner.orderedPlanLocked(s))
      throw new Error('Complete the current delivery before changing this plan.');
    if (!s.week || !Array.isArray(s.week.meals)) return { changed: false, reason: 'no-week' };
    const days = s.week.meals.map((x) => x.day);
    const currentMeals = s.week.meals.slice();
    const currentRecipes = currentMeals.map((x) => getRecipe(x.recipeId)).filter(Boolean);
    if (currentRecipes.length !== days.length) return { changed: false, reason: 'missing-recipe' };
    const currentIds = new Set(currentMeals.map((x) => x.recipeId));
    const baseline = basketEstimate(currentMeals, { savingMode: true });
    const target = (Number(s.household.budget) || 0) > 0 ? round(Number(s.household.budget) * 0.94) : 0;
    const acceptable = (estimate) => estimate && estimate.unresolved <= baseline.unresolved;

    const varietyIssues = (recipes) => {
      let issues = 0;
      const ids = new Set(),
        images = new Set(),
        proteins = {},
        formats = {};
      for (let i = 0; i < recipes.length; i++) {
        const r = recipes[i];
        if (!r) {
          issues += 100;
          continue;
        }
        if (ids.has(r.id)) issues += 100;
        ids.add(r.id);
        const img = visualKey(r);
        if (img && images.has(img)) issues += 20;
        if (img) images.add(img);
        const pk = planner.proteinKey(r);
        proteins[pk] = (proteins[pk] || 0) + 1;
        if (proteins[pk] > 2) issues += 10;
        if (i > 0 && planner.proteinKey(recipes[i - 1]) === pk) issues += 3;
        const fmt = formatKey(r);
        if (fmt) {
          formats[fmt] = (formats[fmt] || 0) + 1;
          if (formats[fmt] > 2) issues += 3;
        }
        for (let j = 0; j < i; j++) if (planner.titleSimilarity(r, recipes[j]) >= 0.7) issues += 20;
      }
      return issues;
    };
    const variedSet = (recipes) => varietyIssues(recipes) === 0;

    const base = MW.RECIPES.filter((r) => planner.autoDinnerAllowed(r) && !currentIds.has(r.id));
    const priced = base
      .map((r) => ({ r, cost: valueCost(r), premium: premiumPenalty(r) }))
      .sort((a, b) => a.cost + a.premium * 1.8 - (b.cost + b.premium * 1.8))
      .slice(0, Math.min(320, base.length));
    const cheapPool = priced.slice(0, 80).map((x) => x.r);

    // First preserve as much of the user's existing week as possible. Apply only the
    // single best genuine basket-saving swap at a time, and never worsen variety.
    let working = currentRecipes.slice(),
      workingEstimate = baseline,
      workingIssues = varietyIssues(working),
      swapCount = 0;
    const maxTargetedSwaps = Math.min(5, days.length);
    for (let pass = 0; pass < maxTargetedSwaps; pass++) {
      if (target && workingEstimate.total <= target) break;
      let bestSwap = null;
      for (let i = 0; i < working.length; i++) {
        for (const candidate of cheapPool) {
          if (candidate.id === working[i].id || working.some((r, j) => j !== i && r.id === candidate.id))
            continue;
          const trial = working.slice();
          trial[i] = candidate;
          const issues = varietyIssues(trial);
          if (issues > workingIssues) continue;
          const estimate = basketEstimate(
            days.map((day, j) => ({ day, recipeId: trial[j].id })),
            { savingMode: true },
          );
          if (!acceptable(estimate) || estimate.total + 0.01 >= workingEstimate.total) continue;
          const saving = round(workingEstimate.total - estimate.total);
          const candidatePremium = premiumPenalty(candidate);
          if (
            !bestSwap ||
            saving > bestSwap.saving + 0.01 ||
            (Math.abs(saving - bestSwap.saving) <= 0.01 && candidatePremium < bestSwap.premium)
          ) {
            bestSwap = { i, candidate, estimate, issues, saving, premium: candidatePremium };
          }
        }
      }
      if (!bestSwap || bestSwap.saving < 0.25) break;
      working[bestSwap.i] = bestSwap.candidate;
      workingEstimate = bestSwap.estimate;
      workingIssues = bestSwap.issues;
      swapCount++;
    }

    let best = { recipes: working, estimate: workingEstimate, swapCount };

    // If a few sensible swaps still cannot get the trolley comfortably under budget,
    // compare complete value-led weeks. These still obey the user's dietary, dislike,
    // equipment and variety rules, and are only accepted when the basket is genuinely lower.
    if (!target || best.estimate.total > target) {
      for (let seed = 0; seed < 6; seed++) {
        const recipes = candidateSet(priced, days.length, seed, seed < 4);
        if (recipes.length !== days.length || !variedSet(recipes)) continue;
        const meals = days.map((day, i) => ({ day, recipeId: recipes[i].id }));
        const estimate = basketEstimate(meals, { savingMode: true });
        if (acceptable(estimate) && estimate.total + 0.01 < best.estimate.total)
          best = { recipes, estimate, swapCount: days.length };
      }
    }

    // One final greedy pass can exploit shared packs inside the best candidate week.
    if (!target || best.estimate.total > target) {
      working = best.recipes.slice();
      workingEstimate = best.estimate;
      workingIssues = varietyIssues(working);
      for (let i = 0; i < working.length; i++) {
        let slotBest = working[i],
          slotEstimate = workingEstimate,
          slotIssues = workingIssues;
        for (const candidate of cheapPool) {
          if (candidate.id === working[i].id || working.some((r, j) => j !== i && r.id === candidate.id))
            continue;
          const trial = working.slice();
          trial[i] = candidate;
          const issues = varietyIssues(trial);
          if (issues > workingIssues) continue;
          const estimate = basketEstimate(
            days.map((day, j) => ({ day, recipeId: trial[j].id })),
            { savingMode: true },
          );
          if (acceptable(estimate) && estimate.total + 0.01 < slotEstimate.total) {
            slotBest = candidate;
            slotEstimate = estimate;
            slotIssues = issues;
          }
        }
        if (slotBest !== working[i]) {
          working[i] = slotBest;
          workingEstimate = slotEstimate;
          workingIssues = slotIssues;
        }
        if (target && workingEstimate.total <= target) break;
      }
      if (workingEstimate.total < best.estimate.total)
        best = { recipes: working, estimate: workingEstimate, swapCount: days.length };
    }

    let rescued = false;
    const budget = Number(s.household.budget) || 0;
    const originalLunchId = s.week.lunchId || null;
    let selectedLunchId = originalLunchId;
    const lunchDays = (s.plan.lunchDays || []).length;
    if (lunchDays && best.estimate && budget && best.estimate.total > budget) {
      const candidateMeals = days.map((day, i) => ({ day, recipeId: best.recipes[i].id }));
      let lunchBest = best.estimate;
      for (const lunch of MW.LUNCHES) {
        if (!planner.autoLunchAllowed(lunch) || lunch.id === selectedLunchId) continue;
        s.week.lunchId = lunch.id;
        const estimate = basketEstimate(candidateMeals, { savingMode: true });
        if (acceptable(estimate) && estimate.total + 0.01 < lunchBest.total) {
          lunchBest = estimate;
          selectedLunchId = lunch.id;
        }
      }
      s.week.lunchId = selectedLunchId;
      best = { ...best, estimate: lunchBest };
    }
    if (budget && best.estimate.total > budget) {
      const rescue = budgetRescue(days, budget, baseline.unresolved, {
        savingMode: true,
        lunchId: selectedLunchId,
      });
      if (
        rescue &&
        rescue.recipes.length === days.length &&
        acceptable(rescue.estimate) &&
        rescue.estimate.total + 0.01 < best.estimate.total
      ) {
        best = { recipes: rescue.recipes, estimate: rescue.estimate, swapCount: days.length };
        rescued = true;
      }
    }
    if (lunchDays && best.estimate && (!budget || best.estimate.total > budget)) {
      const candidateMeals = days.map((day, i) => ({ day, recipeId: best.recipes[i].id }));
      let lunchBest = best.estimate;
      for (const lunch of MW.LUNCHES) {
        if (!planner.autoLunchAllowed(lunch) || lunch.id === selectedLunchId) continue;
        s.week.lunchId = lunch.id;
        const estimate = basketEstimate(candidateMeals, { savingMode: true });
        if (acceptable(estimate) && estimate.total + 0.01 < lunchBest.total) {
          lunchBest = estimate;
          selectedLunchId = lunch.id;
        }
      }
      s.week.lunchId = selectedLunchId;
      best = { ...best, estimate: lunchBest };
    }
    const lunchChanged = selectedLunchId !== originalLunchId;

    s.plan.priceMode = true;
    const improvement = round(baseline.total - best.estimate.total);
    const threshold = Math.max(0.5, round(baseline.total * 0.015));
    const changed =
      improvement >= threshold && best.recipes.length === days.length && acceptable(best.estimate);
    if (!changed && lunchChanged) s.week.lunchId = originalLunchId;
    const hadShop = Boolean(s.week.shop);
    if (changed) {
      s.week.meals = days.map((day, i) => ({ day, recipeId: best.recipes[i].id }));
      s.week.shop = null;
      s.week.inventoryUsed = [];
    }
    s.week.savingMode = true;
    const finalTotal = changed ? best.estimate.total : baseline.total;
    s.week.savingResult = {
      at: new Date().toISOString(),
      changed,
      currentTotal: baseline.total,
      candidateTotal: finalTotal,
      saved: changed ? improvement : 0,
      budget,
      targetTotal: target || null,
      metBudget: !budget || finalTotal <= budget,
      overBudgetBy: budget ? round(Math.max(0, finalTotal - budget)) : 0,
      swaps: changed ? best.recipes.reduce((n, r, i) => n + (r.id !== currentRecipes[i].id ? 1 : 0), 0) : 0,
      lunchChanged: Boolean(changed && lunchChanged),
      reason: changed
        ? rescued
          ? 'budget-rescue'
          : lunchChanged
            ? 'cheaper-lunch-and-plan'
            : 'cheaper-plan'
        : 'no-genuine-saving',
    };
    MW.state.log('lower_cost_optimised', s.week.savingResult);
    MW.state.save();
    if (hadShop && MW.shopping) MW.shopping.build({ savingMode: true, preserveChecks: true });
    return s.week.savingResult;
  }

  function budgetFailureMessage(result) {
    const budget = Number(result && result.budget) || Number(MW.state.get().household.budget) || 0;
    return (
      'My Week could not build the full plan within your ' +
      (MW.markets?.forCountry()?.currencySymbol || '£') +
      Math.round(budget * 100) / 100 +
      ' weekly budget with the current meals, lunches and weekly essentials. No over-budget week was saved. Reduce something in the plan or raise the budget, then try again.'
    );
  }

  planner.budgetRescue = budgetRescue;
  planner.hardBudgetPlan = hardBudgetPlan;
  planner.basketEstimate = basketEstimate;
  planner.plannedBasketCost = function (savingMode) {
    const s = MW.state.get();
    if (!s.week) return 0;
    return basketEstimate(s.week.meals || [], {
      people: MW.weeks.currentPlanning(s).people,
      savingMode: savingMode == null ? Boolean(s.plan.priceMode) : Boolean(savingMode),
    }).total;
  };
  planner.optimiseForSavings = optimiseForSavings;
  planner.rebuildForPriceMode = function (on) {
    const s = MW.state.get();
    if (planner.orderedPlanLocked(s))
      throw new Error('Complete the current delivery before changing this plan.');
    if (on) {
      const result = optimiseForSavings();
      if (result && result.metBudget === false) {
        const hard = hardBudgetPlan({ savingMode: true });
        if (hard.metBudget) {
          const current = Number(result.currentTotal) || Number(hard.currentTotal) || hard.candidateTotal;
          const final = basketEstimate(s.week.meals || [], { savingMode: true }).total;
          s.plan.priceMode = true;
          s.week.savingMode = true;
          s.week.savingResult = {
            ...result,
            changed: Boolean(result.changed || hard.changed),
            candidateTotal: final,
            saved: round(Math.max(0, current - final)),
            budget: hard.budget,
            metBudget: true,
            overBudgetBy: 0,
            swaps: Number(result.swaps || 0) + Number(hard.swaps || 0),
            lunchChanged: Boolean(result.lunchChanged || hard.lunchChanged),
            reason: hard.changed ? 'hard-budget-plan' : result.reason,
          };
          MW.state.log('hard_budget_applied', s.week.savingResult);
          MW.state.save();
          return s.week.savingResult;
        }
      }
      return result;
    }
    s.plan.priceMode = false;
    if (s.week) {
      s.week.savingMode = false;
      s.week.savingResult = null;
      s.week.shop = null;
    }
    MW.state.log('lower_cost_disabled', {});
    MW.state.save();
    return { changed: false, reason: 'disabled', currentTotal: planner.plannedBasketCost(false) };
  };
  planner.rebuildForSavings = planner.rebuildForPriceMode.bind(planner, true);

  function enforceGeneratedBudget(context) {
    const s = MW.state.get();
    if (!basketEngineAvailable())
      return {
        metBudget: true,
        changed: false,
        skipped: true,
        budget: Number(s.household.budget) || 0,
        candidateTotal: null,
        overBudgetBy: 0,
        reason: 'basket-engine-unavailable',
      };
    const result = hardBudgetPlan({ savingMode: Boolean(s.plan.priceMode) });
    if (!result.metBudget) {
      MW.state.log('hard_budget_failed', {
        context,
        budget: result.budget,
        total: result.currentTotal,
        overBudgetBy: result.overBudgetBy,
        reason: result.reason,
      });
      throw new Error(budgetFailureMessage(result));
    }
    s.week.budgetResult = result;
    MW.state.log('hard_budget_checked', {
      context,
      budget: result.budget,
      total: result.candidateTotal,
      changed: result.changed,
    });
    MW.state.save();
    return result;
  }
  planner.enforceGeneratedBudget = enforceGeneratedBudget;
})();
