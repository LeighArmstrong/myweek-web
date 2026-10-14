window.MW = window.MW || {};
(function () {
  let draft = null;
  let step = 0;
  let viewportStarted = false;
  function startViewport() {
    if (viewportStarted) return;
    viewportStarted = true;
    function syncViewport() {
      const viewport = window.visualViewport;
      document.documentElement.style.setProperty(
        '--setup-height',
        Math.round(viewport ? viewport.height : innerHeight) + 'px',
      );
      document.documentElement.style.setProperty(
        '--setup-top',
        Math.round(viewport ? viewport.offsetTop : 0) + 'px',
      );
    }
    window.visualViewport?.addEventListener('resize', syncViewport);
    window.visualViewport?.addEventListener('scroll', syncViewport);
    window.addEventListener('resize', syncViewport);
    syncViewport();
  }

  const esc = MW.display.escape;
  const icon = (name) => '<i class="fa-solid fa-' + name + '" aria-hidden="true"></i>';
  const dayKeys = (n) => MW.DAYS.slice(0, Math.max(0, Math.min(7, Number(n) || 0))).map((x) => x.key);

  function initial() {
    const st = MW.state.get();
    return {
      name: (st.profile && st.profile.name) || '',
      people: Number(st.household && st.household.people) || 2,
      budget: Number(st.household && st.household.budget) || 70,
      retailer: (st.household && st.household.retailer) || "Sainsbury's",
      dinners: (st.plan && st.plan.dinnerDays && st.plan.dinnerDays.length) || 6,
      lunches: Array.isArray(st.plan && st.plan.lunchDays) ? st.plan.lunchDays.length : 5,
      lunchPeople: Number(st.plan && st.plan.lunchPeople) || 1,
      effort: (st.household && st.household.effort) || 'mixed',
      avoid: [
        ...((st.household && st.household.restrictions) || []),
        ...((st.household && st.household.dislikes) || []),
      ].join(', '),
      diet: (st.foodProfile && st.foodProfile.diet) || 'omnivore',
      goals: [...((st.foodProfile && st.foodProfile.goals) || [])],
      allergens: [...((st.foodProfile && st.foodProfile.allergens) || [])],
      lunchStyle: (st.foodProfile && st.foodProfile.lunchStyle) || 'any',
      lunchStyles: [
        ...(st.foodProfile && Array.isArray(st.foodProfile.lunchStyles) && st.foodProfile.lunchStyles.length
          ? st.foodProfile.lunchStyles
          : [(st.foodProfile && st.foodProfile.lunchStyle) || 'any']),
      ],
      equipment: [...((st.household && st.household.equipment) || [])],
    };
  }

  function chipRow(id, items, selected, multi, extraClass) {
    const set = new Set(Array.isArray(selected) ? selected : [selected]);
    return (
      '<div class="onboard-chips ' +
      (multi ? 'multi ' : '') +
      (extraClass || '') +
      '" id="' +
      id +
      '">' +
      items
        .map(
          (x) =>
            '<button type="button" data-v="' +
            esc(x.id == null ? x.v : x.id) +
            '" class="' +
            (set.has(x.id == null ? x.v : x.id) ? 'active' : '') +
            '" aria-pressed="' +
            (set.has(x.id == null ? x.v : x.id) ? 'true' : 'false') +
            '">' +
            (x.icon ? icon(x.icon) : '') +
            esc(x.label) +
            '</button>',
        )
        .join('') +
      '</div>'
    );
  }

  function countRow(id, values, selected) {
    return chipRow(
      id,
      values.map((v) => ({ v, label: String(v) })),
      selected,
      false,
      'onboard-counts',
    );
  }

  // Every selection is a fieldset rather than a label wrapping interactive buttons.
  // Icons reinforce the meaning of each choice and do not replace its visible text.
  function choiceGroup(title, controls, glyph, help) {
    return (
      '<fieldset class="onboard-choice-group"><legend><span class="onboard-choice-label">' +
      icon(glyph) +
      '<span>' +
      esc(title) +
      '</span></span></legend>' +
      (help ? '<small class="onboard-label-help">' + esc(help) + '</small>' : '') +
      controls +
      '</fieldset>'
    );
  }

  function heading(number, category, title, description, glyph) {
    return (
      '<section class="onboard-heading"><div class="onboard-heading-top">' +
      '<span>' +
      esc(number + ' · ' + category) +
      '</span><span class="onboard-heading-icon">' +
      icon(glyph) +
      '</span></div><h1>' +
      esc(title) +
      '</h1><p>' +
      esc(description) +
      '</p></section>'
    );
  }

  function selectControl(id, options, selected) {
    return (
      '<span class="select-control"><select id="' +
      id +
      '">' +
      options
        .map((x) => '<option ' + (x === selected ? 'selected' : '') + '>' + esc(x) + '</option>')
        .join('') +
      '</select>' +
      icon('chevron-down') +
      '</span>'
    );
  }

  function algorithmNote() {
    return (
      '<div class="onboard-algorithm-note">' +
      icon('sliders') +
      '<div><strong>These choices set up your weekly planner</strong><small>Change them anytime in Settings.</small></div></div>'
    );
  }

  function progress() {
    if (step === 0) return '<span class="onboard-time">About 1 minute</span>';
    const total = 6;
    return (
      '<div class="onboard-stage-progress"><span class="onboard-stage-count">' +
      step +
      ' / ' +
      total +
      '</span><div class="onboard-progress" aria-label="Step ' +
      step +
      ' of ' +
      total +
      '">' +
      Array.from(
        { length: total },
        (_, i) => '<span class="' + (i < step ? 'active' : '') + '"></span>',
      ).join('') +
      '</div></div>'
    );
  }

  function scene() {
    if (!draft || !step || step === 6) return '';
    const diet = (MW.food.patterns.find((x) => x.id === draft.diet) || { label: 'Anything' }).label;
    const names = (ids, items) =>
      ids
        .map((id) => items.find((x) => x.id === id)?.label)
        .filter(Boolean)
        .join(' · ');
    let visual = '',
      title = '',
      detail = '';
    if (step === 1) {
      visual = '<img src="assets/onboarding/onboarding-hero.webp" alt="">';
      title = 'Dinner for ' + (draft.people === 1 ? 'one' : draft.people === 2 ? 'two' : draft.people);
      detail = '£' + Math.round(draft.budget) + ' weekly budget';
    }
    if (step === 2) {
      visual =
        '<div class="onboard-week-visual" aria-hidden="true"><div class="onboard-week-preview">' +
        MW.DAYS.map(
          (d, i) =>
            '<span class="' +
            (i < draft.dinners ? 'has-dinner' : '') +
            '">' +
            esc(d.short.slice(0, 2)) +
            '<i class="' +
            (i < draft.lunches ? 'has-lunch' : '') +
            '"></i></span>',
        ).join('') +
        '</div><div class="onboard-week-legend"><span><i class="dinner-key"></i>Dinner</span><span><i class="lunch-key"></i>Lunch</span></div></div>';
      title = draft.dinners + ' dinners · ' + draft.lunches + ' lunch days';
      detail = 'Your usual week';
    }
    if (step === 3) {
      visual =
        '<span class="onboard-scene-icon">' +
        icon(
          draft.diet === 'vegan' || draft.diet === 'vegetarian'
            ? 'carrot'
            : draft.diet === 'pescatarian'
              ? 'fish'
              : 'utensils',
        ) +
        '</span>';
      title = diet;
      detail = names(draft.goals, MW.food.goals) || 'Choose your meal priorities below';
    }
    if (step === 4) {
      visual = '<span class="onboard-scene-icon">' + icon('shield-heart') + '</span>';
      title = draft.allergens.length
        ? draft.allergens.length + ' allergy ' + (draft.allergens.length === 1 ? 'filter' : 'filters')
        : 'No allergy filters selected';
      detail = names(draft.allergens, MW.food.allergens) || 'Select any that apply to you';
    }
    if (step === 5) {
      visual = '<span class="onboard-scene-icon">' + icon('kitchen-set') + '</span>';
      title = draft.equipment.length
        ? draft.equipment.length +
          ' specialist ' +
          (draft.equipment.length === 1 ? 'appliance' : 'appliances')
        : 'Your everyday kitchen';
      detail = draft.equipment.length
        ? names(draft.equipment, MW.equipment.items)
        : 'Oven, hob, pans and utensils';
    }
    return (
      '<div class="onboard-scene scene-' +
      step +
      '" id="onboardScene" role="status" aria-live="polite">' +
      visual +
      '<div><strong>' +
      esc(title) +
      '</strong><small>' +
      esc(detail) +
      '</small></div></div>'
    );
  }
  function paintScene(root) {
    const old = root.querySelector('#onboardScene');
    if (old) old.outerHTML = scene();
  }

  function chrome(content) {
    const start = content.lastIndexOf('<div class="onboard-actions');
    const actions = start >= 0 ? content.slice(start) : '';
    let body = start >= 0 ? content.slice(0, start) : content;
    if (step && draft) body = body.replace('</section>', '</section>' + scene());
    return (
      '<main class="shell onboarding-shell"><header class="onboard-top"><span class="onboard-brand"><img src="assets/brand/mark-256.png" alt="" aria-hidden="true"><span>My Week</span></span>' +
      progress() +
      '</header><div class="onboard-content">' +
      body +
      '</div>' +
      actions +
      '</main>'
    );
  }

  function nextButton(label) {
    return (
      '<div class="onboard-actions">' +
      (step ? '<button class="btn secondary" id="onboardBack">Back</button>' : '') +
      '<button class="btn primary" id="onboardNext">' +
      esc(label || 'Continue') +
      '</button></div>'
    );
  }

  function hero({ intro = false } = {}) {
    return (
      '<section class="onboard-welcome">' +
      '<figure class="onboard-hero-art"><img src="assets/onboarding/onboarding-hero.webp" alt="Fresh chicken, avocado and grain bowl"></figure>' +
      '<h1>Good food. Less fuss.</h1><p class="onboard-tagline">' +
      (intro ? 'Plan, shop and cook with My Week.' : 'Plan your meals, shop once and cook with confidence.') +
      '</p>' +
      '<div class="onboard-benefits">' +
      '<div><span>' +
      icon('calendar-check') +
      '</span><p><strong>Plan your meals</strong><small>Delicious recipes tailored to you</small></p></div>' +
      '<div><span>' +
      icon('cart-shopping') +
      '</span><p><strong>Build your shopping list</strong><small>Get everything you need in one place</small></p></div>' +
      '<div><span>' +
      icon('heart') +
      '</span><p><strong>Eat well, your way</strong><small>Options for all diets, tastes and budgets</small></p></div>' +
      '</div>' +
      '</section>' +
      '<div class="onboard-actions hero-actions' +
      (intro ? ' intro-actions' : '') +
      '"><button class="btn primary" id="onboardNext"><span>Get started</span>' +
      icon('arrow-right') +
      '</button></div>'
    );
  }

  function household() {
    return (
      heading('1', 'YOUR HOUSEHOLD', 'Who’s eating?', 'Set your portions and budget.', 'users') +
      '<section class="onboard-card form-card">' +
      '<label>First name<input id="obName" value="' +
      esc(draft.name) +
      '" placeholder="Your name" autocomplete="given-name"></label>' +
      choiceGroup(
        'People usually eating dinner',
        countRow('obPeople', [1, 2, 3, 4, 5, 6], draft.people),
        'users',
      ) +
      '<div class="onboard-two"><label>Weekly food budget<div class="prefix-input"><span>£</span><input id="obBudget" type="number" min="20" step="5" value="' +
      esc(draft.budget) +
      '"></div></label><label>Supermarket' +
      selectControl('obRetailer', MW.RETAILERS, draft.retailer) +
      '</label></div>' +
      '</section>' +
      nextButton()
    );
  }

  function rhythm() {
    return (
      heading(
        '2',
        'YOUR ROUTINE',
        'How many meals?',
        'Choose how many meals to plan. You can change these in Settings.',
        'calendar-days',
      ) +
      '<section class="onboard-card form-card">' +
      choiceGroup(
        'Dinners to plan each week',
        countRow('obDinners', [1, 2, 3, 4, 5, 6, 7], draft.dinners),
        'utensils',
        'Choose from 1 to 7 dinners.',
      ) +
      choiceGroup(
        'Lunches to plan',
        chipRow(
          'obLunches',
          [
            { v: 0, label: 'None' },
            { v: 5, label: 'Weekdays' },
            { v: 7, label: 'Every day' },
          ],
          draft.lunches,
          false,
        ),
        'sun',
      ) +
      (draft.lunches
        ? choiceGroup(
            'People eating the planned lunch',
            countRow('obLunchPeople', [1, 2, 3, 4, 5, 6], draft.lunchPeople),
            'users',
          )
        : '') +
      choiceGroup(
        'Weeknight cooking',
        chipRow(
          'obEffort',
          [
            { v: 'easy', label: 'Keep it easy' },
            { v: 'mixed', label: 'A mixture' },
          ],
          draft.effort,
          false,
        ),
        'clock',
      ) +
      '</section>' +
      nextButton()
    );
  }

  function food() {
    return (
      heading('3', 'FOOD YOU LIKE', 'What do you enjoy?', 'Choose the food you enjoy.', 'carrot') +
      '<section class="onboard-card form-card">' +
      choiceGroup('Eating style', chipRow('obDiet', MW.food.patterns, draft.diet, false), 'leaf') +
      choiceGroup('Meal priorities', chipRow('obGoals', MW.food.goals, draft.goals, true), 'heart') +
      choiceGroup(
        'Lunch styles you like',
        chipRow('obLunchStyles', MW.food.lunchStyles, draft.lunchStyles, true),
        'bowl-food',
        'Choose one or more.',
      ) +
      '<label>Foods you simply do not want<div class="food-autocomplete-host"><input id="obAvoid" value="' +
      esc(draft.avoid) +
      '" placeholder="Start typing a food"></div><small class="onboard-label-help">Choose a recognised food from the list. Add commas for more than one food.</small><span class="avoid-feedback" id="obAvoidFeedback"></span></label>' +
      '</section>' +
      nextButton()
    );
  }

  function allergens() {
    return (
      heading(
        '4',
        'ALLERGIES & RESTRICTIONS',
        'Any allergies or intolerances?',
        'For disliked foods, use the food preferences on the previous screen.',
        'shield-heart',
      ) +
      '<section class="onboard-card">' +
      choiceGroup(
        'Allergens and intolerances',
        chipRow('obAllergens', MW.food.allergens, draft.allergens, true),
        'shield-heart',
      ) +
      '<div class="onboard-safety">' +
      icon('triangle-exclamation') +
      '<p>Excludes recipes with selected allergens, “may contain” warnings or missing verified records. Always check product labels and cross-contamination warnings.</p></div>' +
      '</section>' +
      nextButton()
    );
  }

  function equipment() {
    return (
      heading(
        '5',
        'YOUR KITCHEN',
        'What’s in your kitchen?',
        'Add the specialist appliances you use.',
        'kitchen-set',
      ) +
      '<section class="onboard-card">' +
      '<div class="standard-kit">' +
      icon('circle-check') +
      '<div><strong>Standard kitchen kit</strong><small>Oven, hob, saucepans, frying pan and basic utensils are assumed.</small></div></div>' +
      choiceGroup(
        'Other appliances you have',
        chipRow('obEquipment', MW.equipment.items, draft.equipment, true),
        'kitchen-set',
      ) +
      '</section>' +
      nextButton()
    );
  }

  function ready() {
    const diet = (MW.food.patterns.find((x) => x.id === draft.diet) || { label: 'Anything' }).label;
    const equip = draft.equipment.map(MW.equipment.label);
    return (
      heading(
        '6',
        'READY',
        'Your first week',
        'Ready to choose your meals? You can change these choices anytime.',
        'circle-check',
      ) +
      '<section class="onboard-summary">' +
      '<div><span>' +
      icon('users') +
      '</span><strong>' +
      draft.people +
      ' ' +
      (draft.people === 1 ? 'person' : 'people') +
      '</strong><small>' +
      draft.dinners +
      ' dinners · ' +
      draft.lunches +
      ' lunch days</small></div>' +
      '<div><span>' +
      icon('leaf') +
      '</span><strong>' +
      esc(diet) +
      '</strong><small>' +
      (draft.goals.length ? draft.goals.length + ' meal priorities' : 'No extra meal priority') +
      '</small></div>' +
      '<div><span>' +
      icon('utensils') +
      '</span><strong>Kitchen matched</strong><small>' +
      (equip.length ? esc(equip.slice(0, 3).join(' · ')) : 'No specialist appliances') +
      '</small></div>' +
      '<div><span>' +
      icon('sterling-sign') +
      '</span><strong>£' +
      Math.round(draft.budget) +
      ' target</strong><small>' +
      esc(draft.retailer) +
      '</small></div>' +
      '</section>' +
      nextButton('Create my week')
    );
  }

  function persist() {
    const st = MW.state.get();
    st.profile.name = String(draft.name || '').trim();
    st.household.people = Math.max(1, Number(draft.people) || 2);
    st.household.budget = Math.max(1, Number(draft.budget) || 70);
    st.household.retailer = draft.retailer || "Sainsbury's";
    st.household.effort = draft.effort || 'mixed';
    const avoided = MW.foodIdentity
      ? MW.foodIdentity.parseList(draft.avoid)
      : {
          linked: [],
          custom: String(draft.avoid || '')
            .split(',')
            .map((x) => x.trim())
            .filter(Boolean),
        };
    st.household.restrictions = [...new Set(avoided.linked || [])];
    st.household.dislikes = [...new Set(avoided.custom || [])];
    st.household.equipment = [...new Set(draft.equipment || [])];
    st.household.equipmentConfigured = true;
    st.plan.dinnerDays = dayKeys(draft.dinners);
    st.plan.lunchDays = dayKeys(draft.lunches);
    st.plan.lunchPeople = Math.max(1, Math.min(st.household.people, Number(draft.lunchPeople) || 1));
    const lunchStyles = [...new Set((draft.lunchStyles || ['any']).filter(Boolean))];
    st.foodProfile = {
      diet: draft.diet || 'omnivore',
      goals: [...new Set(draft.goals || [])],
      allergens: [...new Set(draft.allergens || [])],
      lunchStyle: 'any',
      lunchStyles: lunchStyles.includes('any') || !lunchStyles.length ? ['any'] : lunchStyles,
    };
    st.onboarded = true;
    MW.planner.buildWeek();
    st.ui.screen = 'week';
    delete st.ui.onboardingDraft;
    MW.state.log('onboarding_completed', {
      equipment: st.household.equipment.slice(),
      diet: st.foodProfile.diet,
    });
    MW.state.save();
  }

  function rememberProgress() {
    if (!draft || MW.state.get().onboarded) return;
    const value = { version: 1, step, values: JSON.parse(JSON.stringify(draft)) };
    MW.state.transaction((st) => {
      st.ui.onboardingDraft = value;
    });
  }
  function restoreProgress() {
    const saved = MW.state.get().ui.onboardingDraft;
    if (!saved) return false;
    const v = saved.values;
    if (
      saved.version !== 1 ||
      !Number.isInteger(saved.step) ||
      saved.step < 0 ||
      saved.step > 6 ||
      !v ||
      typeof v !== 'object'
    )
      throw new Error('Unrecognised unfinished setup');
    for (const k of ['name', 'retailer', 'effort', 'avoid', 'diet', 'lunchStyle'])
      if (typeof v[k] !== 'string') throw new Error('Invalid setup text');
    if (!Array.isArray(v.lunchStyles)) v.lunchStyles = [v.lunchStyle || 'any'];
    for (const k of ['people', 'budget', 'dinners', 'lunches', 'lunchPeople'])
      if (!Number.isFinite(v[k])) throw new Error('Invalid setup number');
    for (const k of ['goals', 'allergens', 'equipment', 'lunchStyles'])
      if (!Array.isArray(v[k]) || v[k].some((x) => typeof x !== 'string'))
        throw new Error('Invalid setup selection');
    if (v.allergens.some((id) => !MW.food.allergens.some((x) => x.id === id)))
      throw new Error('Unrecognised saved allergy selection');
    draft = JSON.parse(JSON.stringify(v));
    step = saved.step;
    return true;
  }

  function bindSingle(root, id, key, number) {
    root.querySelectorAll('#' + id + ' button').forEach(
      (b) =>
        (b.onclick = () => {
          captureInputs(root);
          draft[key] = number ? Number(b.dataset.v) : b.dataset.v;
          render(root, MW.onboarding._finish, { preserveScroll: true });
        }),
    );
  }

  function bindMulti(root, id, key) {
    root.querySelectorAll('#' + id + ' button').forEach(
      (b) =>
        (b.onclick = () => {
          captureInputs(root);
          const set = new Set(draft[key] || []);
          if (set.has(b.dataset.v)) set.delete(b.dataset.v);
          else set.add(b.dataset.v);
          draft[key] = [...set];
          render(root, MW.onboarding._finish, { preserveScroll: true });
        }),
    );
  }

  function bindLunchStyles(root) {
    root.querySelectorAll('#obLunchStyles button').forEach(
      (b) =>
        (b.onclick = () => {
          captureInputs(root);
          const value = b.dataset.v;
          let set = new Set(draft.lunchStyles || ['any']);
          if (value === 'any') set = new Set(['any']);
          else {
            set.delete('any');
            if (set.has(value)) set.delete(value);
            else set.add(value);
            if (!set.size) set.add('any');
          }
          draft.lunchStyles = [...set];
          render(root, MW.onboarding._finish, { preserveScroll: true });
        }),
    );
  }

  function updateAvoidFeedback(root) {
    const input = root.querySelector('#obAvoid');
    const out = root.querySelector('#obAvoidFeedback');
    if (!input || !out || !MW.foodIdentity) return;
    const parsed = MW.foodIdentity.parseList(input.value);
    if (!parsed.items.length) {
      out.innerHTML = '';
      return;
    }
    const applied = parsed.items.map((item, index) => ({ item, index })).filter((x) => x.item.matched);
    const unresolved = parsed.items.map((item, index) => ({ item, index })).filter((x) => !x.item.matched);
    const chips = applied
      .map(
        ({ item, index }) =>
          '<button type="button" class="avoid-applied-chip" data-avoid-remove="' +
          index +
          '" aria-label="Remove ' +
          esc(MW.foodIdentity.canonicalLabel(item.canonical)) +
          '"><span>' +
          esc(MW.foodIdentity.canonicalLabel(item.canonical)) +
          '</span>' +
          icon('xmark') +
          '</button>',
      )
      .join('');
    const unresolvedText = unresolved.length
      ? '<span class="avoid-unresolved-note">' +
        icon('circle-question') +
        ' Not applied: ' +
        unresolved.map((x) => esc(x.item.raw)).join(', ') +
        '. Choose a recognised suggestion or correct the wording.</span>'
      : '';
    out.innerHTML =
      (chips
        ? '<span class="avoid-feedback-label">Applied</span><span class="avoid-chip-list">' +
          chips +
          '</span>'
        : '') + unresolvedText;
    out.querySelectorAll('[data-avoid-remove]').forEach(
      (button) =>
        (button.onclick = () => {
          const removeIndex = Number(button.dataset.avoidRemove);
          input.value = parsed.items
            .filter((_, index) => index !== removeIndex)
            .map((x) => x.raw)
            .join(', ');
          draft.avoid = input.value;
          rememberProgress();
          updateAvoidFeedback(root);
        }),
    );
  }

  function captureInputs(root) {
    const name = root.querySelector('#obName');
    if (name) draft.name = name.value;
    const budget = root.querySelector('#obBudget');
    if (budget) draft.budget = Number(budget.value) || 70;
    const retailer = root.querySelector('#obRetailer');
    if (retailer) draft.retailer = retailer.value;
    const avoid = root.querySelector('#obAvoid');
    if (avoid) draft.avoid = avoid.value;
  }

  function render(root, onFinish, options = {}) {
    MW.onboarding._finish = onFinish;
    if (!draft) {
      try {
        if (!restoreProgress()) draft = initial();
      } catch (error) {
        root.innerHTML =
          '<main class="storage-recovery"><h1>Unfinished setup needs attention</h1><p>Your unfinished choices could not be restored. They have not been silently replaced. Restart setup and review your food and allergy choices before creating a week.</p><button class="btn primary" id="restartSetup">Restart unfinished setup</button></main>';
        document.getElementById('restartSetup').onclick = () => {
          if (!confirm('Restart only the unfinished setup?')) return;
          MW.state.transaction((st) => {
            delete st.ui.onboardingDraft;
          });
          draft = null;
          step = 0;
          render(root, onFinish);
        };
        return;
      }
    }
    if (options.skipWelcome && step === 0) step = 1;
    const screens = [hero, household, rhythm, food, allergens, equipment, ready];
    if (step >= screens.length) step = screens.length - 1;
    const oldScroll = options.preserveScroll ? root.querySelector('.onboard-content')?.scrollTop || 0 : 0;
    const focused = document.activeElement,
      focusGroup = options.preserveScroll && focused?.parentElement?.id,
      focusValue = focused?.dataset?.v;
    root.innerHTML = chrome(screens[step]());
    root.querySelector('.onboard-content').scrollTop = oldScroll;
    if (focusGroup && focusValue !== undefined) {
      const replacement = [...root.querySelectorAll('#' + focusGroup + ' button')].find(
        (b) => b.dataset.v === focusValue,
      );
      replacement?.focus({ preventScroll: true });
    }
    try {
      rememberProgress();
    } catch (error) {
      return;
    }

    bindSingle(root, 'obPeople', 'people', true);
    bindSingle(root, 'obDinners', 'dinners', true);
    bindSingle(root, 'obLunches', 'lunches', true);
    bindSingle(root, 'obLunchPeople', 'lunchPeople', true);
    bindSingle(root, 'obEffort', 'effort', false);
    bindSingle(root, 'obDiet', 'diet', false);
    bindLunchStyles(root);
    bindMulti(root, 'obGoals', 'goals');
    bindMulti(root, 'obAllergens', 'allergens');
    bindMulti(root, 'obEquipment', 'equipment');
    for (const id of ['obName', 'obBudget', 'obRetailer', 'obAvoid']) {
      const input = root.querySelector('#' + id);
      if (input)
        input.addEventListener(id === 'obRetailer' ? 'change' : 'input', () => {
          captureInputs(root);
          rememberProgress();
          paintScene(root);
        });
    }
    const avoidInput = root.querySelector('#obAvoid');
    if (avoidInput) {
      if (MW.foodIdentity)
        MW.foodIdentity.attach(avoidInput, {
          multi: true,
          limit: 5,
          requireMatch: true,
          onSelect: () => updateAvoidFeedback(root),
        });
      avoidInput.addEventListener('input', () => updateAvoidFeedback(root));
      avoidInput.addEventListener('blur', () => updateAvoidFeedback(root));
      updateAvoidFeedback(root);
    }

    const back = root.querySelector('#onboardBack');
    if (back)
      back.onclick = () => {
        captureInputs(root);
        step = Math.max(0, step - 1);
        render(root, onFinish);
      };
    const next = root.querySelector('#onboardNext');
    if (next)
      next.onclick = () => {
        captureInputs(root);
        if (step === 2)
          draft.lunchPeople = Math.min(draft.people, Math.max(1, Number(draft.lunchPeople) || 1));
        if (step < screens.length - 1) {
          step++;
          render(root, onFinish);
          window.scrollTo({ top: 0, behavior: 'instant' });
          return;
        }
        next.parentElement.classList.add('is-submitting');
        next.classList.add('is-loading');
        next.disabled = true;
        next.setAttribute('aria-busy', 'true');
        next.innerHTML =
          '<i class="fa-solid fa-circle-notch mw-loading-icon" aria-hidden="true"></i><span>Creating your week…</span>';
        requestAnimationFrame(() =>
          setTimeout(() => {
            try {
              persist();
              draft = null;
              step = 0;
              if (typeof onFinish === 'function') onFinish();
            } catch (error) {
              // The storage recovery screen may already have replaced this button.
              if (MW.state.recoveryStatus && MW.state.recoveryStatus().blocked) return;
              next.disabled = false;
              next.parentElement.classList.remove('is-submitting');
              next.classList.remove('is-loading');
              next.removeAttribute('aria-busy');
              next.textContent = 'Try creating your week again';
              const message = document.createElement('p');
              message.className = 'operation-error';
              message.setAttribute('role', 'alert');
              message.textContent =
                'Your week could not be created. ' + ((error && error.message) || 'Please try again.');
              next.parentElement.appendChild(message);
            }
          }, 120),
        );
      };
  }

  function reset() {
    draft = null;
    step = 0;
  }
  function intro(root, onStart, onSignIn) {
    const content = hero({ intro: true });
    root.innerHTML = chrome(content)
      .replace('shell onboarding-shell', 'shell onboarding-shell intro-shell')
      .replace(progress(), '<button type="button" class="text-action" id="introSignIn">Sign in</button>');
    root.querySelector('#onboardNext').onclick = onStart;
    root.querySelector('#introSignIn').onclick = onSignIn;
  }
  MW.onboarding = { render, intro, reset, startViewport, _finish: null };
})();
