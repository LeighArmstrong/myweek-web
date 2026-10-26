window.MW = window.MW || {};
(function () {
  const markets = {
    GB: {
      label: 'United Kingdom',
      currency: 'GBP',
      currencySymbol: '£',
      currencyIcon: 'sterling-sign',
      pricingAvailable: true,
      locale: 'en-GB',
      retailers: ["Sainsbury's", 'Tesco', 'Asda', 'Morrisons', 'Ocado', 'Waitrose', 'Aldi', 'Lidl', 'Other'],
      defaultRetailer: "Sainsbury's",
      defaultBudget: 70,
    },
    AU: {
      label: 'Australia',
      currency: 'AUD',
      currencySymbol: 'A$',
      currencyIcon: 'dollar-sign',
      pricingAvailable: false,
      locale: 'en-AU',
      retailers: ['Woolworths', 'Coles', 'ALDI', 'IGA', 'Other'],
      defaultRetailer: 'Woolworths',
      defaultBudget: 150,
    },
  };
  // Adding another country needs a market profile; unsupported countries stay hidden.
  const normalise = (code) =>
    typeof code === 'string' && Object.prototype.hasOwnProperty.call(markets, code) ? code : 'GB';
  const current = () => normalise(MW.state?.get()?.household?.country);
  const forCountry = (code) => markets[normalise(code || current())];
  const choices = Object.keys(markets).map((id) => ({ id, label: markets[id].label }));
  const fromLabel = (label) => choices.find((entry) => entry.label === label)?.id || 'GB';
  const hasPricing = (code) => forCountry(code || current()).pricingAvailable === true;
  // A partial catalogue can support honest comparisons on fully priced weeks,
  // without claiming that every recipe ingredient has a reliable local price.
  const canPlanWithPrices = (code) => {
    const market = normalise(code || current());
    return (
      hasPricing(market) ||
      (market === 'AU' && Boolean(MW.cataloguePrices?.forCountry('AU')?.records?.length))
    );
  };
  const money = (amount, code) => {
    const market = forCountry(code || current());
    if (!hasPricing(code || current()) && (amount == null || !Number.isFinite(Number(amount))))
      return 'Price unavailable';
    return new Intl.NumberFormat(market.locale, {
      style: 'currency',
      currency: market.currency,
    }).format(Number(amount || 0));
  };
  const availableRetailers = (code) => forCountry(code || current()).retailers;
  const validRetailer = (country, retailer) => availableRetailers(country).includes(retailer);
  const australianRetailerWebsite = (name) =>
    ({
      Woolworths: 'https://www.woolworths.com.au/',
      Coles: 'https://www.coles.com.au/',
      ALDI: 'https://www.aldi.com.au/',
      IGA: 'https://www.iga.com.au/fresh-pantry-shop-online/',
    })[name] || null;
  // Market-search names only: original supplier recipes and quantities remain unchanged.
  const australianSearchTerm = (name) =>
    String(name || '')
      .replace(/\bbutternut squash\b/gi, 'butternut pumpkin')
      .replace(/\bcourgettes\b/gi, 'zucchinis')
      .replace(/\bcourgette\b/gi, 'zucchini')
      .replace(/\baubergines\b/gi, 'eggplants')
      .replace(/\baubergine\b/gi, 'eggplant')
      .replace(/\bbell peppers\b/gi, 'capsicums')
      .replace(/\bbell pepper\b/gi, 'capsicum')
      .replace(/\b(red|green|yellow|orange) peppers\b/gi, '$1 capsicums')
      .replace(/\b(red|green|yellow|orange) pepper\b/gi, '$1 capsicum')
      .replace(/\bmangetout\b/gi, 'snow peas')
      .replace(/\bsweetcorn\b/gi, 'sweet corn');

  const ingredientSearchTerm = (name, code) =>
    normalise(code || current()) === 'AU' ? australianSearchTerm(name) : String(name || '');

  // A retailer offer is unusable without AUD, a source, a locality and a pack measure.
  // Reject UK prices, currency conversions and data without redistribution permission.
  const australianOffer = (raw, now = Date.now()) => {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
    if (!['Woolworths', 'Coles', 'ALDI', 'IGA'].includes(raw.retailer) || raw.currency !== 'AUD') return null;
    if (!String(raw.productName || '').trim() || !String(raw.productId || '').trim()) return null;
    if (raw.price == null || typeof raw.price === 'boolean') return null;
    const price = Number(raw.price);
    const packQuantity = Number(raw.packQuantity);
    if (!Number.isFinite(price) || price < 0 || !Number.isFinite(packQuantity) || packQuantity <= 0)
      return null;
    if (!['g', 'kg', 'ml', 'l', 'each', 'pack'].includes(raw.packUnit)) return null;
    if (!String(raw.storeId || '').trim() && raw.scope !== 'national-online') return null;
    const observed = Date.parse(raw.observedAt);
    if (!Number.isFinite(observed) || observed > now + 86400000) return null;
    let url;
    try {
      url = new URL(raw.sourceUrl);
    } catch (_) {
      return null;
    }
    if (url.protocol !== 'https:') return null;
    const host = url.hostname.toLowerCase();
    const domains = {
      Woolworths: 'woolworths.com.au',
      Coles: 'coles.com.au',
      ALDI: 'aldi.com.au',
      IGA: 'iga.com.au',
    };
    const domain = domains[raw.retailer];
    const official = host === domain || host.endsWith('.' + domain);
    if (raw.sourceType === 'official-retailer') {
      if (!official) return null;
    } else if (raw.sourceType === 'licensed-feed') {
      if (raw.permission !== 'commercial-redistribution') return null;
    } else return null;
    return {
      retailer: raw.retailer,
      currency: 'AUD',
      productId: String(raw.productId),
      productName: String(raw.productName).trim(),
      price,
      packQuantity,
      packUnit: raw.packUnit,
      storeId: String(raw.storeId || ''),
      scope: String(raw.scope || 'store'),
      observedAt: new Date(observed).toISOString(),
      sourceUrl: url.href,
      sourceType: raw.sourceType,
      stale: now - observed > 14 * 86400000,
    };
  };

  MW.markets = {
    current,
    forCountry,
    money,
    availableRetailers,
    validRetailer,
    australianRetailerWebsite,
    normalise,
    fromLabel,
    hasPricing,
    canPlanWithPrices,
    ingredientSearchTerm,
    australianOffer,
    choices,
  };
})();
