window.MW = window.MW || {};
(function () {
  const norm = (x) =>
    String(x || '')
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  function scaleAmount(text, factor) {
    if (MW.pricing && MW.pricing.scaleAmount) return MW.pricing.scaleAmount(text, factor);
    factor = Number(factor) || 1;
    if (Math.abs(factor - 1) < 0.001) return String(text);
    const m = String(text || '')
      .trim()
      .match(/^([0-9]+(?:\.[0-9]+)?)\s*(.*)$/);
    if (!m) return String(text);
    let value = Number(m[1]) * factor;
    const unit = (m[2] || '').trim();
    if (!unit) value = Math.ceil(value);
    return ((Number.isInteger(value) ? String(value) : value.toFixed(1)) + (unit ? ' ' + unit : '')).trim();
  }

  const getRecipe = (id) => (MW.catalog && MW.catalog.get(id)) || MW.RECIPES.find((x) => x.id === id);

  const itemKey = (x) => String(x || '');
  function substitutionMap(state) {
    state = state || MW.state.get();
    if (!state.week) return {};
    state.week.shoppingSubstitutions = state.week.shoppingSubstitutions || {};
    return state.week.shoppingSubstitutions;
  }
  function getSubstitution(key, state) {
    return substitutionMap(state)[itemKey(key)] || null;
  }
  function setSubstitution(key, data) {
    const cleanKey = itemKey(key);
    if (!cleanKey) throw new Error('The shopping item could not be identified.');
    return MW.state.transaction((st) => {
      if (!st.week) throw new Error('Create a week before recording a shop swap.');
      const originalName = String((data && data.originalName) || '').trim(),
        replacementName = String((data && data.replacementName) || '').trim();
      const plannedAmount = String((data && data.plannedAmount) || '').trim(),
        replacementAmount = String((data && data.replacementAmount) || '').trim();
      if (!originalName || !replacementName || !replacementAmount)
        throw new Error('Choose what you bought and enter the amount.');
      const originalKey = MW.inventory ? MW.inventory.stockKey(originalName) : norm(originalName),
        replacementKey = MW.inventory ? MW.inventory.stockKey(replacementName) : norm(replacementName);
      if (originalKey && replacementKey && originalKey === replacementKey)
        throw new Error('That matches the planned ingredient, so it does not need to be recorded as a swap.');
      const map = substitutionMap(st);
      map[cleanKey] = {
        key: cleanKey,
        originalName,
        replacementName,
        plannedAmount,
        replacementAmount,
        comparable: data && data.comparable !== false,
        recordedAt: new Date().toISOString(),
      };
      st.events = st.events || [];
      st.events.push({
        at: new Date().toISOString(),
        type: 'shopping_substitution_recorded',
        data: { key: cleanKey, originalName, replacementName, plannedAmount, replacementAmount },
      });
      st.events = st.events.slice(-500);
      return map[cleanKey];
    });
  }
  function clearSubstitution(key) {
    return MW.state.transaction((st) => {
      if (!st.week) return;
      const map = substitutionMap(st),
        cleanKey = itemKey(key),
        old = map[cleanKey];
      if (old) {
        delete map[cleanKey];
        st.events = st.events || [];
        st.events.push({
          at: new Date().toISOString(),
          type: 'shopping_substitution_cleared',
          data: { key: cleanKey, originalName: old.originalName, replacementName: old.replacementName },
        });
        st.events = st.events.slice(-500);
      }
    });
  }
  function substitutionForIngredient(name, state) {
    const target = MW.inventory ? MW.inventory.stockKey(name) : norm(name);
    if (!target) return null;
    const st = state || MW.state.get(),
      week = MW.weeks ? MW.weeks.cookingWeek(st) : st.week;
    return (
      Object.values((week && week.shoppingSubstitutions) || {}).find(
        (x) => (MW.inventory ? MW.inventory.stockKey(x.originalName) : norm(x.originalName)) === target,
      ) || null
    );
  }

  function signature() {
    const s = MW.state.get(),
      w = s.week || {},
      plan = MW.weeks.currentPlanning(s);
    return JSON.stringify({
      meals: (w.meals || []).map((x) => [x.day, x.recipeId]),
      lunch: w.lunchId || '',
      lunchDays: (plan.lunchDays || []).slice(),
      lunchPeople: Number(plan.lunchPeople) || 1,
      people: Number(plan.people) || 2,
      regulars: (s.regulars || []).filter((x) => x.selected).map((x) => [x.id, x.count, x.unit]),
      extras: (w.extras || []).map((x) => [x.name, x.qty, x.estimatedCost]),
      forceBuy: (w.forceBuy || []).slice().sort(),
      inventory: s.inventory || {},
      savingMode: Boolean(s.plan.priceMode),
      priceAsOf: (MW.pricing && MW.pricing.asOf) || '',
      priceRevision: (MW.pricing && MW.pricing.revision) || '',
    });
  }

  // Separate quantity-aware cupboard and basket progress from the regenerated
  // shopping estimate. A recipe change may increase requirements, but must not
  // turn previously completed quantities back into unchecked purchases.
  function progressState(state = MW.state.get()) {
    if (!state.week) return null;
    const week = state.week;
    if (!week.shopProgress || typeof week.shopProgress !== 'object' || Array.isArray(week.shopProgress))
      week.shopProgress = {
        stage:
          week.delivery && ['order-placed', 'delivery-checked'].includes(week.status)
            ? 'ordered'
            : 'cupboard',
        items: {},
      };
    const progress = week.shopProgress;
    if (!['cupboard', 'basket', 'ordered'].includes(progress.stage)) progress.stage = 'cupboard';
    if (!progress.items || typeof progress.items !== 'object' || Array.isArray(progress.items))
      progress.items = {};
    return progress;
  }

  function shoppingAmount(row) {
    const text = String(row.displayAmount || row.inventoryAmount || '').trim();
    const parsed = MW.inventory.parseAmount(text);
    return { text, parsed: parsed && parsed.value > 0 ? parsed : null };
  }
  function asUnit(text, unit, name) {
    const parsed = MW.inventory.parseAmount(text);
    if (!parsed) return 0;
    const value = MW.inventory.valueInUnit(parsed, unit, name);
    return Number.isFinite(value) && value > 0 ? value : 0;
  }
  function stageAmount(record, stage, row, required) {
    if (!record) return 0;
    const text = record[stage + 'Amount'] || '';
    if (required.parsed) return asUnit(text, required.parsed.unit, row.name);
    return record[stage + 'Text'] === required.text ? 1 : 0;
  }
  function progressFor(row, state = MW.state.get()) {
    const progress = progressState(state);
    const record = progress && progress.items[row.key];
    const required = shoppingAmount(row);
    const total = required.parsed ? required.parsed.value : 1;
    const home = stageAmount(record, 'home', row, required);
    const basket = stageAmount(record, 'basket', row, required);
    const legacy = stageAmount(record, 'legacy', row, required);
    const covered = Math.min(total, home + basket + legacy);
    const remaining = Math.max(0, total - covered);
    const previousUnmeasured =
      !required.parsed &&
      Boolean(record?.homeText || record?.basketText || record?.legacyText) &&
      !Boolean(home || basket || legacy);
    const complete = remaining <= 0.000001;
    const partial = (covered > 0 && !complete) || previousUnmeasured;
    const remainingText = required.parsed
      ? MW.inventory.formatAmount({ value: remaining, unit: required.parsed.unit })
      : required.text;
    return {
      complete,
      partial,
      remaining,
      remainingText,
      covered,
      home: Math.min(total, home),
      legacy: Math.min(Math.max(0, total - home), legacy),
      basket: Math.min(Math.max(0, total - home - legacy), basket),
      total,
      unit: required.parsed ? required.parsed.unit : null,
      unknown: !required.parsed,
      stage: progress ? progress.stage : 'cupboard',
      hasSavedProgress: Boolean(record),
    };
  }
  function takeLegacyCheck(row, state) {
    const progress = progressState(state);
    const key = String(row.key);
    if (progress.items[key]) return;
    if (!state.ui?.shopChecks?.[key]) return;
    const requirement = shoppingAmount(row);
    progress.items[key] = requirement.parsed
      ? { legacyAmount: MW.inventory.formatAmount(requirement.parsed) }
      : { legacyText: requirement.text };
  }
  function reconcileProgress(rows, state = MW.state.get()) {
    const progress = progressState(state);
    if (!progress) return null;
    for (const row of rows) {
      takeLegacyCheck(row, state);
      if (state.ui && state.ui.shopChecks) state.ui.shopChecks[row.key] = progressFor(row, state).complete;
    }
    return progress;
  }
  function markProgress(row, state = MW.state.get()) {
    const progress = reconcileProgress([row], state);
    if (!progress) return null;
    const previous = progressFor(row, state);
    const stage = progress.stage === 'cupboard' ? 'home' : 'basket';
    const record = progress.items[row.key] || {};
    const other = stage === 'home' ? 'basket' : 'home';
    if (previous.complete) {
      // Undo the portion checked in this stage first. If it was completed at
      // home, it can still be corrected while shopping online.
      const remove =
        record[stage + 'Amount'] || record[stage + 'Text']
          ? stage
          : record.legacyAmount || record.legacyText
            ? 'legacy'
            : other;
      delete record[remove + 'Amount'];
      delete record[remove + 'Text'];
    } else {
      const needed = shoppingAmount(row);
      if (needed.parsed) {
        const old = asUnit(record[stage + 'Amount'], needed.parsed.unit, row.name);
        record[stage + 'Amount'] = MW.inventory.formatAmount({
          value: old + previous.remaining,
          unit: needed.parsed.unit,
        });
        delete record[stage + 'Text'];
      } else {
        record[stage + 'Text'] = needed.text;
        delete record[stage + 'Amount'];
      }
    }
    progress.items[row.key] = record;
    const result = progressFor(row, state);
    state.ui.shopChecks = state.ui.shopChecks || {};
    state.ui.shopChecks[row.key] = result.complete;
    MW.state.save();
    return result;
  }
  function setStage(stage, state = MW.state.get()) {
    const progress = progressState(state);
    if (!progress || !['cupboard', 'basket', 'ordered'].includes(stage)) return null;
    progress.stage = stage;
    MW.state.save();
    return progress.stage;
  }
  function coveredInventory(state = MW.state.get()) {
    const covered = new Map();
    for (const item of state.week?.inventoryUsed || []) {
      if (!item || item.implicit || !item.name) continue;
      const parsed = MW.inventory.parseAmount(item.amountText);
      const key = MW.inventory.stockKey(item.name) + '|' + (parsed?.unit || String(item.amountText));
      const old = covered.get(key);
      if (old && parsed && old.amount && old.amount.unit === parsed.unit) {
        old.amount.value += parsed.value;
        old.partial = old.partial || Boolean(item.partial);
      } else if (!old) {
        covered.set(key, {
          name: item.name,
          amount: parsed ? { ...parsed } : null,
          rawAmount: item.amountText || '',
          partial: Boolean(item.partial),
        });
      }
    }
    return [...covered.values()].map((item) => ({
      name: item.name,
      amountText: item.amount ? MW.inventory.formatAmount(item.amount) : item.rawAmount,
      partial: item.partial,
    }));
  }

  function purchaseLines(rows, state = MW.state.get()) {
    return (rows || []).flatMap((row) => {
      const progress = progressFor(row, state);
      if (!progress.basket && !progress.legacy) return [];
      // A tick accounts for the recipe quantity needed. The actual item in
      // the online basket may be a larger retail pack: keep its original
      // inventoryAmount and let delivery confirmation record what arrived.
      return [
        {
          ...row,
          checked: true,
          basketCheckedAmount: progress.unit
            ? MW.inventory.formatAmount({ value: progress.basket + progress.legacy, unit: progress.unit })
            : row.displayAmount,
        },
      ];
    });
  }

  MW.shopping = {
    purchaseLines,
    progressState,
    progressFor,
    reconcileProgress,
    markProgress,
    setStage,
    coveredInventory,
    scaleAmount,
    signature,
    substitutionMap,
    getSubstitution,
    setSubstitution,
    clearSubstitution,
    substitutionForIngredient,
    build(options) {
      const s = MW.state.get();
      if (!s.week || !Array.isArray(s.week.meals)) throw new Error('No weekly plan is available yet.');
      options = options || {};
      const savingMode = options.savingMode == null ? Boolean(s.plan.priceMode) : Boolean(options.savingMode);
      const estimate = MW.basket.calculate(s.week.meals, {
        savingMode,
        people: MW.weeks.currentPlanning(s).people,
      });
      const { groups, inventoryUsed, lunchPortions } = estimate;
      const estimated = estimate.total,
        raw = estimate.normalTotal,
        estimatedSavings = estimate.saving;
      const savingTips = [];
      if (savingMode && inventoryUsed.length) savingTips.push('Use what is already in the cupboard');
      if (savingMode && estimate.lines.some((x) => x.reasons.length > 1))
        savingTips.push('Shared ingredients are already consolidated');
      s.week.inventoryUsed = inventoryUsed;
      s.week.savingMode = savingMode;
      const validSubstitutions = new Map();
      for (const [group, rows] of Object.entries(groups || {}))
        for (const row of rows || []) validSubstitutions.set(group + '|' + row.name, row);
      const savedSubstitutions = substitutionMap(s);
      for (const key of Object.keys(savedSubstitutions)) {
        const row = validSubstitutions.get(key),
          sub = savedSubstitutions[key];
        const planned = row && String(row.inventoryAmount || row.displayAmount || '').trim();
        if (!row || (sub.plannedAmount && planned && String(sub.plannedAmount).trim() !== planned))
          delete savedSubstitutions[key];
      }
      s.week.shop = {
        groups,
        estimatedTotal: Math.round(estimated * 100) / 100,
        rawEstimate: Math.round(raw * 100) / 100,
        estimatedSavings: Math.round(estimatedSavings * 100) / 100,
        savingMode,
        savingTips,
        itemCount: estimate.lines.length,
        lunchPortions,
        priceAsOf: (MW.pricing && MW.pricing.asOf) || null,
        priceRetailer: (MW.pricing && MW.pricing.retailer) || s.household.retailer,
        priceCoverage: estimate.lines.length
          ? Math.round((estimate.matched / estimate.lines.length) * 100)
          : 100,
        quantityReviewCount: estimate.unresolved,
        planSignature: signature(),
        createdAt: new Date().toISOString(),
      };
      const rows = Object.entries(groups || {}).flatMap(([group, items]) =>
        items.map((item) => ({ ...item, key: group + '|' + item.name })),
      );
      reconcileProgress(rows, s);
      // Shopping progress belongs to the week and survives recalculations.
      // Only a new week resets it, never a changed ingredient or recipe.
      MW.state.log('shop_built', {
        count: s.week.shop.itemCount,
        estimatedTotal: s.week.shop.estimatedTotal,
        savingMode,
        priceCoverage: s.week.shop.priceCoverage,
      });
      MW.state.save();
      return s.week.shop;
    },
  };
})();
