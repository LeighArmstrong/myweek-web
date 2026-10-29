window.MW = window.MW || {};
(function () {
  'use strict';
  // Country-specific price source. Keep the original UK price logic untouched.
  const p = MW.pricing;
  if (!p) throw new Error('Country pricing requires the UK pricing module to load first');
  const original = {
    entryFor: p.entryFor.bind(p),
    quote: p.quote.bind(p),
    usageCost: p.usageCost.bind(p),
    usageCostDetail: p.usageCostDetail.bind(p),
    recipeCost: p.recipeCost.bind(p),
    isFreeWater: p.isFreeWater.bind(p),
    amountFor: p.amountFor.bind(p),
  };
  const unpriced = () => MW.markets && !MW.markets.hasPricing();
  const country = () => MW.markets.current();
  const sourceEntry = (name) => {
    const row = MW.cataloguePrices && MW.cataloguePrices.find(name, country());
    if (!row) return null;
    const retailer = MW.state?.get()?.household?.retailer || '';
    return {
      ...row.conversionHints,
      packQty: row.packQty,
      unit: row.unit,
      price: MW.cataloguePrices.priceFor(row, retailer),
      selectedRetailer: retailer,
      retailerPriceMethod: MW.cataloguePrices.priceMethodFor(row, retailer),
      retailerAvailability: 'not-verified',
      label: row.name,
      confidence: 'dated-country-benchmark',
      asOf: row.observedAt,
      source: row.source,
      sourceUrl: row.sourceUrl,
      sourceRetailers: row.sourceRetailers,
      catalogueType: row.catalogueType,
      currency: row.currency,
      country: row.country,
      productId: row.id,
    };
  };
  p.marketPriceAvailable = () => !unpriced();
  // Preserve all established unit conversions, adding only explicit market
  // cookbook equivalents where the source product specifies a compatible unit.
  p.amountFor = function (amount, entry) {
    const originalAmount = original.amountFor(amount, entry);
    if (Number.isFinite(originalAmount) && originalAmount > 0) return originalAmount;
    if (entry?.country !== 'AU') return originalAmount;
    const input = String(amount || '')
      .trim()
      .toLowerCase();
    const pinch = input.match(/^([0-9]+(?:\.[0-9]+)?)\s+pinch(?:es)?$/);
    if (pinch && entry.unit === 'g' && Number(entry.pinchWeight) > 0)
      return Number(pinch[1]) * Number(entry.pinchWeight);
    const sachet = input.match(/^([0-9]+(?:\.[0-9]+)?)\s+sachets?$/);
    if (sachet && entry.unit === 'ml' && Number(entry.sachetWeight) > 0)
      return Number(sachet[1]) * Number(entry.sachetWeight);
    const bulb = input.match(/^([0-9]+(?:\.[0-9]+)?)\s+bulbs?$/);
    if (bulb && entry.productId === 'garlic' && entry.unit === 'clove') return Number(bulb[1]) * 10;
    const handful = input.match(/^([0-9]+(?:\.[0-9]+)?)\s+(?:small\s+)?handfuls?$/);
    if (handful && entry.productId === 'fresh-basil' && entry.unit === 'g') return Number(handful[1]) * 5;
    return originalAmount;
  };
  p.entryFor = function (name) {
    if (!unpriced()) return original.entryFor(name);
    if (original.isFreeWater(name)) return original.entryFor(name);
    return sourceEntry(name);
  };
  p.isFreeWater = function (name) {
    return original.isFreeWater(name);
  };
  p.quote = function (name, amount, savingMode) {
    if (!unpriced()) return original.quote(name, amount, savingMode);
    const entry = p.entryFor(name);
    const needed = entry ? p.amountFor(amount, entry) : null;
    const resolved = Number.isFinite(needed) && needed > 0;
    const packs = resolved ? Math.max(1, Math.ceil(needed / entry.packQty)) : null;
    const cost = packs == null ? null : Math.round(packs * entry.price * 100) / 100;
    return {
      matched: Boolean(entry),
      resolved,
      name,
      amount,
      cost,
      normalCost: cost,
      saving: 0,
      packs,
      confidence: entry ? 'retailer-average-estimate' : 'market-price-unavailable',
      label: entry ? entry.label : 'No benchmark for this ingredient',
      asOf: entry?.asOf || null,
      currency: MW.markets.forCountry().currency,
      marketChecked: false,
      marketAverage: false,
      marketEvidence: [],
      retailer: entry ? entry.selectedRetailer || 'Country benchmark' : MW.state.get().household.retailer,
    };
  };
  p.usageCostDetail = function (name, amount) {
    if (!unpriced()) return original.usageCostDetail(name, amount);
    const entry = p.entryFor(name);
    const needed = entry ? p.amountFor(amount, entry) : null;
    if (!entry || !Number.isFinite(needed) || needed <= 0) {
      return {
        matched: Boolean(entry),
        resolved: false,
        cost: null,
        label: entry?.label || 'No benchmark for this ingredient',
      };
    }
    return {
      matched: true,
      resolved: true,
      cost: Math.round((needed / entry.packQty) * entry.price * 100) / 100,
      label: entry.label,
    };
  };
  p.usageCost = function (name, amount) {
    return unpriced() ? p.usageCostDetail(name, amount).cost : original.usageCost(name, amount);
  };
  p.recipeCost = function (recipe, people) {
    if (!unpriced()) return original.recipeCost(recipe, people);
    if (!recipe) return null;
    const factor =
      recipe.scaleSafe === false ? 1 : (people == null ? 2 : Number(people)) / (recipe.servings || 2);
    const rows = p.rowsForRecipe(recipe);
    let total = 0;
    for (const row of rows) {
      if (!Array.isArray(row) || row.length < 2) return null;
      const amount = recipe.scaleSafe === false ? String(row[0]) : p.scaleAmount(row[0], factor);
      if (p.isFreeWater(row[1])) continue;
      const cost = p.usageCost(row[1], amount);
      if (!Number.isFinite(cost)) return null;
      total += cost;
    }
    return Math.round(total * 100) / 100;
  };
})();
