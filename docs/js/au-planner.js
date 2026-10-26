window.MW = window.MW || {};
(function () {
  'use strict';
  const markets = MW.markets;
  const planner = MW.planner;
  if (!markets || !planner) throw new Error('Country planner requires market settings and planner');

  const country = () => markets.current();
  const australianPriceMode = () => country() === 'AU' && markets.canPlanWithPrices();
  const unsupported = () => !markets.hasPricing() && !australianPriceMode();
  const status = (reason) => ({
    metBudget: null,
    changed: false,
    skipped: true,
    budget: Number(MW.state.get().household.budget) || 0,
    currentTotal: null,
    candidateTotal: null,
    overBudgetBy: null,
    reason: reason || (country() === 'AU' ? 'price-coverage-incomplete' : 'market-prices-unavailable'),
  });
  const original = {
    plannedMealCost: planner.plannedMealCost.bind(planner),
    plannedBasketCost: planner.plannedBasketCost.bind(planner),
    hardBudgetPlan: planner.hardBudgetPlan.bind(planner),
    optimiseForSavings: planner.optimiseForSavings.bind(planner),
    rebuildForPriceMode: planner.rebuildForPriceMode.bind(planner),
    enforceGeneratedBudget: planner.enforceGeneratedBudget.bind(planner),
  };

  // An Australian plan is eligible for budget or saving claims only when
  // every necessary shopping line has a matched price AND convertible amount.
  // This check is deliberately not applied to the UK compatibility path.
  function completeBasket() {
    if (!MW.basket || typeof MW.basket.calculate !== 'function') return false;
    const s = MW.state.get();
    if (!s.week || !Array.isArray(s.week.meals) || !s.week.meals.length) return false;
    const estimate = MW.basket.calculate(s.week.meals, {
      people: MW.weeks?.currentPlanning?.(s)?.people || s.household.people,
      savingMode: Boolean(s.plan?.priceMode),
    });
    return (
      estimate.total != null &&
      Number.isFinite(estimate.total) &&
      estimate.unresolved === 0 &&
      estimate.missingPriceCount === 0
    );
  }
  const blocked = () => unsupported() || (australianPriceMode() && !completeBasket());
  const guardedStatus = () =>
    status(
      unsupported()
        ? country() === 'AU'
          ? 'australian-prices-unavailable'
          : 'market-prices-unavailable'
        : 'price-coverage-incomplete',
    );

  planner.plannedMealCost = (...args) => {
    if (blocked()) return null;
    return original.plannedMealCost(...args);
  };
  planner.plannedBasketCost = (...args) => {
    if (unsupported()) return null;
    // The shared planner uses Infinity internally to reject incomplete AU
    // candidate weeks. Never expose that sentinel as a customer budget.
    const value = original.plannedBasketCost(...args);
    return Number.isFinite(value) ? value : null;
  };
  planner.hardBudgetPlan = (...args) => (blocked() ? guardedStatus() : original.hardBudgetPlan(...args));
  planner.optimiseForSavings = (...args) =>
    blocked() ? guardedStatus() : original.optimiseForSavings(...args);
  planner.rebuildForPriceMode = (enabled) => {
    if (!enabled && !unsupported()) return original.rebuildForPriceMode(false);
    if (!blocked()) return original.rebuildForPriceMode(enabled);
    const s = MW.state.get();
    // Keep an AU opt-in for the next generated week; do not change a partial
    // current week, invent a saving or remove its shopping check-offs.
    s.plan.priceMode = Boolean(enabled) && australianPriceMode();
    if (s.week) {
      s.week.savingResult = null;
      s.week.budgetResult = guardedStatus();
    }
    MW.state.save();
    return guardedStatus();
  };
  // An existing alias must never bypass the country completeness guard.
  planner.rebuildForSavings = (...args) => planner.rebuildForPriceMode(true, ...args);
  planner.enforceGeneratedBudget = (context) => {
    if (blocked()) {
      const s = MW.state.get(),
        result = guardedStatus();
      if (s.week) s.week.budgetResult = result;
      MW.state.save();
      return result;
    }
    // Ordinary Australian meal generation should be immediate. An expensive
    // budget-rescue search is opt-in through Lower-cost planning, rather than
    // running automatically when typical Australian pack prices exceed the
    // introductory budget. Always report the actual basket estimate.
    if (australianPriceMode() && context === 'build' && !MW.state.get().plan?.priceMode) {
      const s = MW.state.get();
      const priced = MW.basket.calculate(s.week.meals, {
        people: MW.weeks?.currentPlanning?.(s)?.people || s.household.people,
        savingMode: false,
      });
      const budget = Number(s.household.budget) || 0;
      const metBudget =
        priced.total != null &&
        Number.isFinite(priced.total) &&
        (budget <= 0 || priced.total <= budget + 0.001);
      const result = {
        metBudget,
        changed: false,
        skipped: true,
        budget,
        currentTotal: priced.total,
        candidateTotal: priced.total,
        overBudgetBy:
          priced.total == null ? null : Math.max(0, Math.round((priced.total - budget) * 100) / 100),
        reason: metBudget ? 'australian-week-within-budget' : 'australian-budget-not-met',
      };
      if (s.week) s.week.budgetResult = result;
      MW.state.save();
      return result;
    }
    // A requested Australian lower-cost week must still be usable when the
    // optimiser cannot reach the target. Preserve UK hard-budget semantics.
    if (australianPriceMode() && context === 'build') {
      try {
        return original.enforceGeneratedBudget(context);
      } catch (error) {
        if (!/could not build the full plan within your/i.test(String(error?.message || ''))) throw error;
        const s = MW.state.get();
        const price = MW.basket.calculate(s.week.meals, {
          people: MW.weeks?.currentPlanning?.(s)?.people || s.household.people,
          savingMode: Boolean(s.plan?.priceMode),
        });
        const budget = Number(s.household.budget) || 0;
        const result = {
          metBudget: false,
          changed: false,
          skipped: false,
          budget,
          currentTotal: price.total,
          candidateTotal: price.total,
          overBudgetBy:
            price.total == null ? null : Math.max(0, Math.round((price.total - budget) * 100) / 100),
          reason: 'budget-not-met-week-retained',
        };
        if (s.week) s.week.budgetResult = result;
        MW.state.log('australian_budget_unmet_week_retained', {
          budget,
          total: result.candidateTotal,
          overBudgetBy: result.overBudgetBy,
        });
        MW.state.save();
        return result;
      }
    }
    return original.enforceGeneratedBudget(context);
  };
})();
