window.MW = window.MW || {};
(function () {
  'use strict';
  const clone = (x) => JSON.parse(JSON.stringify(x));
  function planning(st = MW.state.get()) {
    return {
      dinnerDays: [...(st.plan.dinnerDays || [])],
      lunchDays: [...(st.plan.lunchDays || [])],
      lunchPeople: Number(st.plan.lunchPeople) || 1,
      people: Number(st.household.people) || 2,
    };
  }
  function currentPlanning(st = MW.state.get()) {
    return (st.week && st.week.planning) || planning(st);
  }
  function validWeek(w) {
    if (
      !w ||
      typeof w.weekKey !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(w.weekKey) ||
      !Array.isArray(w.meals)
    )
      return false;
    const days = new Set(MW.DAYS.map((day) => day.key));
    if (!w.meals.every((meal) => meal && days.has(meal.day) && typeof meal.recipeId === 'string'))
      return false;
    if (w.completedRecipes != null && !Array.isArray(w.completedRecipes)) return false;
    if (
      w.planning &&
      (!Array.isArray(w.planning.dinnerDays) ||
        !Array.isArray(w.planning.lunchDays) ||
        ![...w.planning.dinnerDays, ...w.planning.lunchDays].every((day) => days.has(day)))
    )
      return false;
    const date = new Date(w.weekKey + 'T12:00:00Z');
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === w.weekKey;
  }
  function snapshot(id, st = MW.state.get()) {
    const raw = selected(st)?.recipeSnapshots?.[id];
    if (!raw || raw.id !== id || !MW.personalRecipes) return null;
    try {
      return MW.personalRecipes.validateData({ schema: 1, recipes: [raw] }).recipes[0];
    } catch {
      return null;
    }
  }
  function all(st = MW.state.get()) {
    const current = MW.planner.currentWeekKey(),
      byKey = new Map();
    for (const w of Array.isArray(st.weekHistory) ? st.weekHistory : [])
      if (validWeek(w) && w.weekKey < current) byKey.set(w.weekKey, w);
    if (validWeek(st.week) && st.week.weekKey < current) byKey.set(st.week.weekKey, st.week);
    return [...byKey.values()].sort((a, b) => b.weekKey.localeCompare(a.weekKey));
  }
  function selected(st = MW.state.get()) {
    const key = st.ui.weekHistoryKey;
    return (key && all(st).find((w) => w.weekKey === key)) || null;
  }
  function cookingWeek(st = MW.state.get()) {
    return selected(st) || st.week;
  }
  function archive(st, previous) {
    const archived = clone(previous);
    archived.preparation = null;
    archived.planning = archived.planning || planning(st);
    // Keep recipes usable even if a personal recipe is edited or removed later.
    archived.recipeSnapshots = {};
    for (const id of new Set(
      [...(previous.meals || []).map((m) => m.recipeId), previous.lunchId].filter(Boolean),
    )) {
      const r = MW.catalog.get(id);
      if (r && r.personal) archived.recipeSnapshots[id] = clone(r);
    }
    st.weekHistory = Array.isArray(st.weekHistory) ? st.weekHistory : [];
    st.weekHistory = st.weekHistory.filter((w) => !w || w.weekKey !== previous.weekKey);
    st.weekHistory.push(archived);
  }
  MW.weeks = { planning, currentPlanning, all, selected, snapshot, cookingWeek, archive };
})();
