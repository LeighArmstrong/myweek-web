window.MW = window.MW || {};
(function () {
  'use strict';
  // Shared country price-book reader. The CSV under data/market-prices is the editorial source.
  // Browser bundles are compiled offline and never fetch or scrape retailers in a customer's session.
  const catalogues = MW.priceCatalogues || {};
  const normalise = (name) =>
    String(name || '')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  const matching = Object.create(null);
  const legacyEntries = Object.create(null);
  const legacyFields = [
    'label',
    'packQty',
    'unit',
    'price',
    'savingPrice',
    'eachWeight',
    'tinWeight',
    'tspWeight',
    'tbspWeight',
    'gramsPerMl',
    'defaultUsage',
    'packWeight',
    'pouchWeight',
    'sliceWeight',
    'sachetWeight',
    'bunchWeight',
    'nestWeight',
    'cartonWeight',
    'bottleWeight',
    'ballWeight',
    'rasherWeight',
  ];
  const legacyKey = (entry) => JSON.stringify(legacyFields.map((field) => entry?.[field] ?? null));
  // A source/price/pack/alias edit changes saved estimates even when the week is unchanged.
  // Calculate the revision from the compiled offline catalogue rather than a manually bumped date.
  const revisions = Object.create(null);
  const fingerprint = (catalogue) => {
    const contents = JSON.stringify(catalogue);
    let hash = 2166136261;
    for (let i = 0; i < contents.length; i++) {
      hash = Math.imul(hash ^ contents.charCodeAt(i), 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, '0');
  };
  for (const [code, catalogue] of Object.entries(catalogues)) {
    revisions[code] = code + ':' + fingerprint(catalogue);
    const index = new Map();
    const legacy = new Map();
    for (const product of catalogue.records || []) {
      if (
        !Number.isFinite(product.price) ||
        product.price < 0 ||
        !Number.isFinite(product.packQty) ||
        product.packQty <= 0
      )
        continue;
      if (product.legacyKey) {
        if (legacy.has(product.legacyKey)) throw new Error('Duplicate ' + code + ' legacy price key');
        legacy.set(product.legacyKey, product);
      }
      for (const alias of product.aliases || []) {
        const key = normalise(alias);
        if (!key) continue;
        if (index.has(key) && index.get(key).id !== product.id)
          throw new Error('Conflicting ' + code + ' product alias: ' + key);
        index.set(key, product);
      }
    }
    matching[code] = index;
    legacyEntries[code] = legacy;
  }
  function find(name, code) {
    const market = MW.markets.normalise(code || MW.markets.current());
    const index = matching[market];
    if (!index) return null;
    const original = normalise(name);
    // Exact ingredient identity only. Never map garlic mayonnaise to garlic, or tomato
    // pesto to tomatoes, because that would produce a false cheap shopping estimate.
    const found = index.get(original);
    if (!found) return null;
    return {
      ...found,
      country: market,
      currency: catalogues[market].currency,
      source: found.sourceName || catalogues[market].source,
      sourceUrl: found.sourceUrl || catalogues[market].sourceUrl,
      catalogueType: catalogues[market].type,
      retailerPriceModel: catalogues[market].retailerPriceModel || null,
    };
  }
  const forCountry = (code) => catalogues[MW.markets.normalise(code || MW.markets.current())] || null;
  const forLegacyEntry = (entry, code = 'GB') =>
    entry ? legacyEntries[MW.markets.normalise(code)]?.get(legacyKey(entry)) || null : null;
  const priceFor = (record, retailer) => {
    if (!record) return null;
    // "No preferred supermarket" means a national multi-retailer benchmark,
    // never the default chain's price masquerading as an unknown shop.
    if (retailer === 'No preferred supermarket' || retailer === 'Other') {
      const prices = Object.values(record.retailerPrices || {}).filter(
        (value) => Number.isFinite(value) && value >= 0,
      );
      if (prices.length) {
        const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        return Math.round(average * 100) / 100;
      }
    }
    const price = retailer && record.retailerPrices?.[retailer];
    return Number.isFinite(price) ? price : record.price;
  };
  // A value in a retailer column is a modelled estimate, never evidence that
  // the shop stocks the item. Keep the distinction in one shared owner.
  const priceMethodFor = (record, retailer) => {
    if (!record) return 'unpriced';
    if (retailer === 'No preferred supermarket' || retailer === 'Other')
      return 'multi-retailer-average-estimate';
    return Number.isFinite(record.retailerPrices?.[retailer])
      ? 'relative-basket-average-estimate'
      : 'country-benchmark';
  };
  const revision = (code) => revisions[MW.markets.normalise(code || MW.markets.current())] || '';
  MW.cataloguePrices = {
    normalise,
    find,
    priceFor,
    priceMethodFor,
    forCountry,
    forLegacyEntry,
    revision,
    countries: Object.keys(catalogues),
  };
})();
