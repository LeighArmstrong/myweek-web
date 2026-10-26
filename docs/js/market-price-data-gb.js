window.MW = window.MW || {};
(function () {
  'use strict';
  MW.priceCatalogues = Object.assign(MW.priceCatalogues || {}, {
  "GB": {
    "country": "GB",
    "currency": "GBP",
    "type": "country-benchmark",
    "source": "MyWeek original UK pricing records",
    "sourceUrl": "https://github.com/LeighArmstrong/myweek-app",
    "permission": "Owner-maintained UK pricebook; historic catalogue and estimates migrated from the MyWeek source",
    "attribution": "UK grocery estimates and dated observations from the original MyWeek pricebook",
    "lastCompiled": "2026-10-26",
    "notRetailerSpecific": true,
    "legacyPriceAdapter": true,
    "notes": "Many original estimates are unverified. Empty observedOn does not assert a dated shop observation.",
    "retailerColumns": {
      "Sainsbury's": "priceSainsburys",
      "Tesco": "priceTesco",
      "Asda": "priceAsda",
      "Morrisons": "priceMorrisons",
      "Ocado": "priceOcado",
      "Waitrose": "priceWaitrose",
      "Aldi": "priceAldi",
      "Lidl": "priceLidl"
    },
    "retailerPriceModel": {
      "method": "relative-basket-average-estimate",
      "basis": "September 2026 Which? 93 comparable groceries, no loyalty discounts",
      "published": "2026-10-05",
      "sourceUrl": "https://www.which.co.uk/reviews/supermarkets/article/cheapest-supermarket-aPpYp9j1MFin",
      "reference": "Sainsbury's (preserves original UK default estimate)",
      "basketTotals": {
        "Sainsbury's": 195.01,
        "Tesco": 193.45,
        "Asda": 186.71,
        "Morrisons": 193.13,
        "Ocado": 208.64,
        "Waitrose": 223.38,
        "Aldi": 159.48,
        "Lidl": 161.84
      },
      "scope": "chain-level general estimate; not verified individual store shelf prices"
    },
    "records": [
      {
        "id": "gb-0001-prosciutto-84g",
        "name": "prosciutto 84g",
        "packQty": 84,
        "unit": "g",
        "price": 1.32,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"prosciutto 84g\",84,\"g\",1.32,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.32,
          "Tesco": 1.31,
          "Asda": 1.26,
          "Morrisons": 1.31,
          "Ocado": 1.41,
          "Waitrose": 1.51,
          "Aldi": 1.08,
          "Lidl": 1.1
        }
      },
      {
        "id": "gb-0002-smoked-mackerel-240g",
        "name": "smoked mackerel 240g",
        "packQty": 240,
        "unit": "g",
        "price": 6,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"smoked mackerel 240g\",240,\"g\",6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 6,
          "Tesco": 5.95,
          "Asda": 5.74,
          "Morrisons": 5.94,
          "Ocado": 6.42,
          "Waitrose": 6.87,
          "Aldi": 4.91,
          "Lidl": 4.98
        }
      },
      {
        "id": "gb-0003-sun-dried-tomatoes-285g",
        "name": "sun-dried tomatoes 285g",
        "packQty": 285,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"sun-dried tomatoes 285g\",285,\"g\",2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0004-pepperoni-slices-130g",
        "name": "pepperoni slices 130g",
        "packQty": 130,
        "unit": "g",
        "price": 0.99,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"pepperoni slices 130g\",130,\"g\",0.99,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.99,
          "Tesco": 0.98,
          "Asda": 0.95,
          "Morrisons": 0.98,
          "Ocado": 1.06,
          "Waitrose": 1.13,
          "Aldi": 0.81,
          "Lidl": 0.82
        }
      },
      {
        "id": "gb-0005-gnocchi-500g",
        "name": "gnocchi 500g",
        "packQty": 500,
        "unit": "g",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"gnocchi 500g\",500,\"g\",2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0006-peanuts-200g",
        "name": "peanuts 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.4,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"peanuts 200g\",200,\"g\",1.4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.4,
          "Tesco": 1.39,
          "Asda": 1.34,
          "Morrisons": 1.39,
          "Ocado": 1.5,
          "Waitrose": 1.6,
          "Aldi": 1.14,
          "Lidl": 1.16
        }
      },
      {
        "id": "gb-0007-paneer-200g",
        "name": "paneer 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.8,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"paneer 200g\",200,\"g\",1.8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.8,
          "Tesco": 1.79,
          "Asda": 1.72,
          "Morrisons": 1.78,
          "Ocado": 1.93,
          "Waitrose": 2.06,
          "Aldi": 1.47,
          "Lidl": 1.49
        }
      },
      {
        "id": "gb-0008-mozzarella-250g",
        "name": "mozzarella 250g",
        "packQty": 250,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"mozzarella 250g\",250,\"g\",2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0009-rice-noodles-300g",
        "name": "rice noodles 300g",
        "packQty": 300,
        "unit": "g",
        "price": 1.15,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"rice noodles 300g\",300,\"g\",1.15,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.15,
          "Tesco": 1.14,
          "Asda": 1.1,
          "Morrisons": 1.14,
          "Ocado": 1.23,
          "Waitrose": 1.32,
          "Aldi": 0.94,
          "Lidl": 0.95
        }
      },
      {
        "id": "gb-0010-plant-based-chicken-pieces-170g",
        "name": "plant-based chicken pieces 170g",
        "packQty": 170,
        "unit": "g",
        "price": 3.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"plant-based chicken pieces 170g\",170,\"g\",3.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.5,
          "Tesco": 3.47,
          "Asda": 3.35,
          "Morrisons": 3.47,
          "Ocado": 3.74,
          "Waitrose": 4.01,
          "Aldi": 2.86,
          "Lidl": 2.9
        }
      },
      {
        "id": "gb-0011-szechuan-style-sauce-505g",
        "name": "Szechuan style sauce 505g",
        "packQty": 505,
        "unit": "g",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"Szechuan style sauce 505g\",505,\"g\",1.25,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0012-asian-broth-paste-100g-equivalent",
        "name": "Asian broth paste 100g equivalent",
        "packQty": 100,
        "unit": "g",
        "price": 2.85,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"Asian broth paste 100g equivalent\",100,\"g\",2.85,2.85,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.85,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.85,
          "Tesco": 2.83,
          "Asda": 2.73,
          "Morrisons": 2.82,
          "Ocado": 3.05,
          "Waitrose": 3.26,
          "Aldi": 2.33,
          "Lidl": 2.37
        }
      },
      {
        "id": "gb-0013-brussels-sprouts-500g",
        "name": "Brussels sprouts 500g",
        "packQty": 500,
        "unit": "g",
        "price": 0.89,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"Brussels sprouts 500g\",500,\"g\",0.89,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.89,
          "Tesco": 0.88,
          "Asda": 0.85,
          "Morrisons": 0.88,
          "Ocado": 0.95,
          "Waitrose": 1.02,
          "Aldi": 0.73,
          "Lidl": 0.74
        }
      },
      {
        "id": "gb-0014-falafel-200g",
        "name": "falafel 200g",
        "packQty": 200,
        "unit": "g",
        "price": 2.6,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"falafel 200g\",200,\"g\",2.6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.6,
          "Tesco": 2.58,
          "Asda": 2.49,
          "Morrisons": 2.57,
          "Ocado": 2.78,
          "Waitrose": 2.98,
          "Aldi": 2.13,
          "Lidl": 2.16
        }
      },
      {
        "id": "gb-0015-british-beef-fillet-steaks-x2",
        "name": "British beef fillet steaks x2",
        "packQty": 2,
        "unit": "each",
        "price": 14.55,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"British beef fillet steaks x2\",2,\"each\",14.55,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 14.55,
          "Tesco": 14.43,
          "Asda": 13.93,
          "Morrisons": 14.41,
          "Ocado": 15.57,
          "Waitrose": 16.67,
          "Aldi": 11.9,
          "Lidl": 12.08
        }
      },
      {
        "id": "gb-0016-fresh-rhubarb-400g",
        "name": "fresh rhubarb 400g",
        "packQty": 400,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"fresh rhubarb 400g\",400,\"g\",2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0017-jersey-royal-potatoes-450g",
        "name": "Jersey Royal potatoes 450g",
        "packQty": 450,
        "unit": "g",
        "price": 2.2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"Jersey Royal potatoes 450g\",450,\"g\",2.2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.2,
          "Tesco": 2.18,
          "Asda": 2.11,
          "Morrisons": 2.18,
          "Ocado": 2.35,
          "Waitrose": 2.52,
          "Aldi": 1.8,
          "Lidl": 1.83
        }
      },
      {
        "id": "gb-0018-tabasco-original-red-sauce-57ml",
        "name": "Tabasco Original Red Sauce 57ml",
        "packQty": 57,
        "unit": "ml",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"Tabasco Original Red Sauce 57ml\",57,\"ml\",2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0019-fresh-fennel-250g-equivalent",
        "name": "fresh fennel 250g equivalent",
        "packQty": 250,
        "unit": "g",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"fresh fennel 250g equivalent\",250,\"g\",1.25,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0020-premium-tomatoes-pack",
        "name": "premium tomatoes pack",
        "packQty": 6,
        "unit": "each",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"premium tomatoes pack\",6,\"each\",2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0021-onion-bhajis-10-pack-200g",
        "name": "onion bhajis 10 pack 200g",
        "packQty": 10,
        "unit": "each",
        "price": 1.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"onion bhajis 10 pack 200g\",10,\"each\",1.75,null,20,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {
          "eachWeight": 20
        },
        "retailerPrices": {
          "Sainsbury's": 1.75,
          "Tesco": 1.74,
          "Asda": 1.68,
          "Morrisons": 1.73,
          "Ocado": 1.87,
          "Waitrose": 2,
          "Aldi": 1.43,
          "Lidl": 1.45
        }
      },
      {
        "id": "gb-0022-hazelnuts-250g",
        "name": "hazelnuts 250g",
        "packQty": 250,
        "unit": "g",
        "price": 3.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"hazelnuts 250g\",250,\"g\",3.25,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.25,
          "Tesco": 3.22,
          "Asda": 3.11,
          "Morrisons": 3.22,
          "Ocado": 3.48,
          "Waitrose": 3.72,
          "Aldi": 2.66,
          "Lidl": 2.7
        }
      },
      {
        "id": "gb-0023-seasonal-squash-each",
        "name": "seasonal squash each",
        "packQty": 1,
        "unit": "each",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"seasonal squash each\",1,\"each\",1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0024-gram-flour-2kg",
        "name": "gram flour 2kg",
        "packQty": 2000,
        "unit": "g",
        "price": 4.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"gram flour 2kg\",2000,\"g\",4.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 4.5,
          "Tesco": 4.46,
          "Asda": 4.31,
          "Morrisons": 4.46,
          "Ocado": 4.81,
          "Waitrose": 5.15,
          "Aldi": 3.68,
          "Lidl": 3.73
        }
      },
      {
        "id": "gb-0025-mangetout-80g",
        "name": "mangetout 80g",
        "packQty": 80,
        "unit": "g",
        "price": 1,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"mangetout 80g\",80,\"g\",1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1,
          "Tesco": 0.99,
          "Asda": 0.96,
          "Morrisons": 0.99,
          "Ocado": 1.07,
          "Waitrose": 1.15,
          "Aldi": 0.82,
          "Lidl": 0.83
        }
      },
      {
        "id": "gb-0026-dried-bay-leaves-3g",
        "name": "dried bay leaves 3g",
        "packQty": 3,
        "unit": "g",
        "price": 1,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"dried bay leaves 3g\",3,\"g\",1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1,
          "Tesco": 0.99,
          "Asda": 0.96,
          "Morrisons": 0.99,
          "Ocado": 1.07,
          "Waitrose": 1.15,
          "Aldi": 0.82,
          "Lidl": 0.83
        }
      },
      {
        "id": "gb-0027-quinoa-300g",
        "name": "quinoa 300g",
        "packQty": 300,
        "unit": "g",
        "price": 3.1,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"quinoa 300g\",300,\"g\",3.1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.1,
          "Tesco": 3.08,
          "Asda": 2.97,
          "Morrisons": 3.07,
          "Ocado": 3.32,
          "Waitrose": 3.55,
          "Aldi": 2.54,
          "Lidl": 2.57
        }
      },
      {
        "id": "gb-0028-pistachios-150g-equivalent",
        "name": "pistachios 150g equivalent",
        "packQty": 150,
        "unit": "g",
        "price": 3,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"pistachios 150g equivalent\",150,\"g\",3,3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 3,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3,
          "Tesco": 2.98,
          "Asda": 2.87,
          "Morrisons": 2.97,
          "Ocado": 3.21,
          "Waitrose": 3.44,
          "Aldi": 2.45,
          "Lidl": 2.49
        }
      },
      {
        "id": "gb-0029-wholemeal-tortillas-x8-equivalent",
        "name": "wholemeal tortillas x8 equivalent",
        "packQty": 8,
        "unit": "each",
        "price": 1.32,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"wholemeal tortillas x8 equivalent\",8,\"each\",1.32,0.99,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.99,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.32,
          "Tesco": 1.31,
          "Asda": 1.26,
          "Morrisons": 1.31,
          "Ocado": 1.41,
          "Waitrose": 1.51,
          "Aldi": 1.08,
          "Lidl": 1.1
        }
      },
      {
        "id": "gb-0030-coconut-flakes-equivalent",
        "name": "coconut flakes equivalent",
        "packQty": 200,
        "unit": "g",
        "price": 1.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"coconut flakes equivalent\",200,\"g\",1.75,1.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.75,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.75,
          "Tesco": 1.74,
          "Asda": 1.68,
          "Morrisons": 1.73,
          "Ocado": 1.87,
          "Waitrose": 2,
          "Aldi": 1.43,
          "Lidl": 1.45
        }
      },
      {
        "id": "gb-0031-5-bean-medley-equivalent",
        "name": "5 bean medley equivalent",
        "packQty": 1,
        "unit": "tin",
        "price": 0.47,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"5 bean medley equivalent\",1,\"tin\",0.47,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.47,
          "Tesco": 0.47,
          "Asda": 0.45,
          "Morrisons": 0.47,
          "Ocado": 0.5,
          "Waitrose": 0.54,
          "Aldi": 0.38,
          "Lidl": 0.39
        }
      },
      {
        "id": "gb-0032-soy-single-cream-250ml-equivalent",
        "name": "soy single cream 250ml equivalent",
        "packQty": 250,
        "unit": "ml",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"soy single cream 250ml equivalent\",250,\"ml\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0033-wholewheat-noodle-nests-x4-equivalent",
        "name": "wholewheat noodle nests x4 equivalent",
        "packQty": 4,
        "unit": "nest",
        "price": 0.94,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"wholewheat noodle nests x4 equivalent\",4,\"nest\",0.94,0.94,null,null,null,null,null,null,null,null,null,null,null,62.5,null,null,null,null]",
        "savingPrice": 0.94,
        "confidence": "calibrated-explicit",
        "conversionHints": {
          "nestWeight": 62.5
        },
        "retailerPrices": {
          "Sainsbury's": 0.94,
          "Tesco": 0.93,
          "Asda": 0.9,
          "Morrisons": 0.93,
          "Ocado": 1.01,
          "Waitrose": 1.08,
          "Aldi": 0.77,
          "Lidl": 0.78
        }
      },
      {
        "id": "gb-0034-spring-greens-200g-equivalent",
        "name": "spring greens 200g equivalent",
        "packQty": 200,
        "unit": "g",
        "price": 0.88,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"spring greens 200g equivalent\",200,\"g\",0.88,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.88,
          "Tesco": 0.87,
          "Asda": 0.84,
          "Morrisons": 0.87,
          "Ocado": 0.94,
          "Waitrose": 1.01,
          "Aldi": 0.72,
          "Lidl": 0.73
        }
      },
      {
        "id": "gb-0035-five-spice-mix-equivalent",
        "name": "five-spice mix equivalent",
        "packQty": 42,
        "unit": "g",
        "price": 1.19,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"five-spice mix equivalent\",42,\"g\",1.19,null,null,null,2.2,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 2.2
        },
        "retailerPrices": {
          "Sainsbury's": 1.19,
          "Tesco": 1.18,
          "Asda": 1.14,
          "Morrisons": 1.18,
          "Ocado": 1.27,
          "Waitrose": 1.36,
          "Aldi": 0.97,
          "Lidl": 0.99
        }
      },
      {
        "id": "gb-0036-wholemeal-pittas-equivalent",
        "name": "wholemeal pittas equivalent",
        "packQty": 1,
        "unit": "pack",
        "price": 0.78,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"wholemeal pittas equivalent\",1,\"pack\",0.78,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.78,
          "Tesco": 0.77,
          "Asda": 0.75,
          "Morrisons": 0.77,
          "Ocado": 0.83,
          "Waitrose": 0.89,
          "Aldi": 0.64,
          "Lidl": 0.65
        }
      },
      {
        "id": "gb-0037-cannellini-beans-400g-tin-equivalent",
        "name": "cannellini beans 400g tin equivalent",
        "packQty": 1,
        "unit": "tin",
        "price": 0.46,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cannellini beans 400g tin equivalent\",1,\"tin\",0.46,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.46,
          "Tesco": 0.46,
          "Asda": 0.44,
          "Morrisons": 0.46,
          "Ocado": 0.49,
          "Waitrose": 0.53,
          "Aldi": 0.38,
          "Lidl": 0.38
        }
      },
      {
        "id": "gb-0038-cooked-long-grain-rice-pouch-equivalent",
        "name": "cooked long grain rice pouch equivalent",
        "packQty": 2000,
        "unit": "g",
        "price": 3.6,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cooked long grain rice pouch equivalent\",2000,\"g\",3.6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.6,
          "Tesco": 3.57,
          "Asda": 3.45,
          "Morrisons": 3.57,
          "Ocado": 3.85,
          "Waitrose": 4.12,
          "Aldi": 2.94,
          "Lidl": 2.99
        }
      },
      {
        "id": "gb-0039-plain-tortillas-x8-equivalent",
        "name": "plain tortillas x8 equivalent",
        "packQty": 8,
        "unit": "each",
        "price": 1.32,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"plain tortillas x8 equivalent\",8,\"each\",1.32,0.99,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.99,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.32,
          "Tesco": 1.31,
          "Asda": 1.26,
          "Morrisons": 1.31,
          "Ocado": 1.41,
          "Waitrose": 1.51,
          "Aldi": 1.08,
          "Lidl": 1.1
        }
      },
      {
        "id": "gb-0040-sliced-mushrooms-400g-equivalent",
        "name": "sliced mushrooms 400g equivalent",
        "packQty": 400,
        "unit": "g",
        "price": 1.29,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"sliced mushrooms 400g equivalent\",400,\"g\",1.29,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.29,
          "Tesco": 1.28,
          "Asda": 1.24,
          "Morrisons": 1.28,
          "Ocado": 1.38,
          "Waitrose": 1.48,
          "Aldi": 1.05,
          "Lidl": 1.07
        }
      },
      {
        "id": "gb-0041-vegetable-oil-1-litre-equivalent",
        "name": "vegetable oil 1 litre equivalent",
        "packQty": 1000,
        "unit": "ml",
        "price": 1.49,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"vegetable oil 1 litre equivalent\",1000,\"ml\",1.49,null,null,null,5,15,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 1.49,
          "Tesco": 1.48,
          "Asda": 1.43,
          "Morrisons": 1.48,
          "Ocado": 1.59,
          "Waitrose": 1.71,
          "Aldi": 1.22,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0042-soft-cheese-equivalent",
        "name": "soft cheese equivalent",
        "packQty": 200,
        "unit": "g",
        "price": 2.22,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"soft cheese equivalent\",200,\"g\",2.22,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.22,
          "Tesco": 2.2,
          "Asda": 2.13,
          "Morrisons": 2.2,
          "Ocado": 2.38,
          "Waitrose": 2.54,
          "Aldi": 1.82,
          "Lidl": 1.84
        }
      },
      {
        "id": "gb-0043-sweet-potato",
        "name": "sweet potato",
        "packQty": 1000,
        "unit": "g",
        "price": 1.2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"sweet potato\",1000,\"g\",1.2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.2,
          "Tesco": 1.19,
          "Asda": 1.15,
          "Morrisons": 1.19,
          "Ocado": 1.28,
          "Waitrose": 1.37,
          "Aldi": 0.98,
          "Lidl": 1
        }
      },
      {
        "id": "gb-0044-gravy-equivalent",
        "name": "gravy equivalent",
        "packQty": 5000,
        "unit": "ml",
        "price": 1.27,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"gravy equivalent\",5000,\"ml\",1.27,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.27,
          "Tesco": 1.26,
          "Asda": 1.22,
          "Morrisons": 1.26,
          "Ocado": 1.36,
          "Waitrose": 1.45,
          "Aldi": 1.04,
          "Lidl": 1.05
        }
      },
      {
        "id": "gb-0045-cooking-oil",
        "name": "cooking oil",
        "packQty": 1000,
        "unit": "ml",
        "price": 1.49,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cooking oil\",1000,\"ml\",1.49,null,null,null,5,15,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 1.49,
          "Tesco": 1.48,
          "Asda": 1.43,
          "Morrisons": 1.48,
          "Ocado": 1.59,
          "Waitrose": 1.71,
          "Aldi": 1.22,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0046-rice-equivalent",
        "name": "rice equivalent",
        "packQty": 2000,
        "unit": "g",
        "price": 3.6,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"rice equivalent\",2000,\"g\",3.6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.6,
          "Tesco": 3.57,
          "Asda": 3.45,
          "Morrisons": 3.57,
          "Ocado": 3.85,
          "Waitrose": 4.12,
          "Aldi": 2.94,
          "Lidl": 2.99
        }
      },
      {
        "id": "gb-0047-jerk-seasoning-equivalent",
        "name": "jerk seasoning equivalent",
        "packQty": 300,
        "unit": "g",
        "price": 2.54,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"jerk seasoning equivalent\",300,\"g\",2.54,null,null,null,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 2.5
        },
        "retailerPrices": {
          "Sainsbury's": 2.54,
          "Tesco": 2.52,
          "Asda": 2.43,
          "Morrisons": 2.52,
          "Ocado": 2.72,
          "Waitrose": 2.91,
          "Aldi": 2.08,
          "Lidl": 2.11
        }
      },
      {
        "id": "gb-0048-hard-cheese-equivalent",
        "name": "hard cheese equivalent",
        "packQty": 170,
        "unit": "g",
        "price": 3.49,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"hard cheese equivalent\",170,\"g\",3.49,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.49,
          "Tesco": 3.46,
          "Asda": 3.34,
          "Morrisons": 3.46,
          "Ocado": 3.73,
          "Waitrose": 4,
          "Aldi": 2.85,
          "Lidl": 2.9
        }
      },
      {
        "id": "gb-0049-dried-fruit-equivalent",
        "name": "dried fruit equivalent",
        "packQty": 500,
        "unit": "g",
        "price": 2.17,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "dried cranberries"
        ],
        "legacyKey": "[\"dried fruit equivalent\",500,\"g\",2.17,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.17,
          "Tesco": 2.15,
          "Asda": 2.08,
          "Morrisons": 2.15,
          "Ocado": 2.32,
          "Waitrose": 2.49,
          "Aldi": 1.77,
          "Lidl": 1.8
        }
      },
      {
        "id": "gb-0050-fruit-molasses-equivalent",
        "name": "fruit molasses equivalent",
        "packQty": 250,
        "unit": "ml",
        "price": 4.76,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"fruit molasses equivalent\",250,\"ml\",4.76,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 4.76,
          "Tesco": 4.72,
          "Asda": 4.56,
          "Morrisons": 4.71,
          "Ocado": 5.09,
          "Waitrose": 5.45,
          "Aldi": 3.89,
          "Lidl": 3.95
        }
      },
      {
        "id": "gb-0051-tortilla-product-equivalent",
        "name": "tortilla product equivalent",
        "packQty": 8,
        "unit": "each",
        "price": 1.32,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"tortilla product equivalent\",8,\"each\",1.32,0.99,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.99,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.32,
          "Tesco": 1.31,
          "Asda": 1.26,
          "Morrisons": 1.31,
          "Ocado": 1.41,
          "Waitrose": 1.51,
          "Aldi": 1.08,
          "Lidl": 1.1
        }
      },
      {
        "id": "gb-0052-prepared-beef-equivalent",
        "name": "prepared beef equivalent",
        "packQty": 300,
        "unit": "g",
        "price": 5.23,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"prepared beef equivalent\",300,\"g\",5.23,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 5.23,
          "Tesco": 5.19,
          "Asda": 5.01,
          "Morrisons": 5.18,
          "Ocado": 5.6,
          "Waitrose": 5.99,
          "Aldi": 4.28,
          "Lidl": 4.34
        }
      },
      {
        "id": "gb-0053-prepared-chicken-equivalent",
        "name": "prepared chicken equivalent",
        "packQty": 1000,
        "unit": "g",
        "price": 7.64,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"prepared chicken equivalent\",1000,\"g\",7.64,null,110,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 110
        },
        "retailerPrices": {
          "Sainsbury's": 7.64,
          "Tesco": 7.58,
          "Asda": 7.31,
          "Morrisons": 7.57,
          "Ocado": 8.17,
          "Waitrose": 8.75,
          "Aldi": 6.25,
          "Lidl": 6.34
        }
      },
      {
        "id": "gb-0054-cooked-grain-equivalent",
        "name": "cooked grain equivalent",
        "packQty": 500,
        "unit": "g",
        "price": 2.06,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cooked grain equivalent\",500,\"g\",2.06,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.06,
          "Tesco": 2.04,
          "Asda": 1.97,
          "Morrisons": 2.04,
          "Ocado": 2.2,
          "Waitrose": 2.36,
          "Aldi": 1.68,
          "Lidl": 1.71
        }
      },
      {
        "id": "gb-0055-duck-leg-equivalent",
        "name": "duck leg equivalent",
        "packQty": 1000,
        "unit": "g",
        "price": 7.64,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"duck leg equivalent\",1000,\"g\",7.64,null,110,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 110
        },
        "retailerPrices": {
          "Sainsbury's": 7.64,
          "Tesco": 7.58,
          "Asda": 7.31,
          "Morrisons": 7.57,
          "Ocado": 8.17,
          "Waitrose": 8.75,
          "Aldi": 6.25,
          "Lidl": 6.34
        }
      },
      {
        "id": "gb-0056-shellfish-equivalent",
        "name": "shellfish equivalent",
        "packQty": 150,
        "unit": "g",
        "price": 2.56,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"shellfish equivalent\",150,\"g\",2.56,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.56,
          "Tesco": 2.54,
          "Asda": 2.45,
          "Morrisons": 2.54,
          "Ocado": 2.74,
          "Waitrose": 2.93,
          "Aldi": 2.09,
          "Lidl": 2.12
        }
      },
      {
        "id": "gb-0057-lamb-equivalent",
        "name": "lamb equivalent",
        "packQty": 500,
        "unit": "g",
        "price": 6.26,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"lamb equivalent\",500,\"g\",6.26,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 6.26,
          "Tesco": 6.21,
          "Asda": 5.99,
          "Morrisons": 6.2,
          "Ocado": 6.7,
          "Waitrose": 7.17,
          "Aldi": 5.12,
          "Lidl": 5.2
        }
      },
      {
        "id": "gb-0058-jarred-savoury-ingredient-equivalent",
        "name": "jarred savoury ingredient equivalent",
        "packQty": 190,
        "unit": "g",
        "price": 1.02,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"jarred savoury ingredient equivalent\",190,\"g\",1.02,null,null,null,5,16,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 16
        },
        "retailerPrices": {
          "Sainsbury's": 1.02,
          "Tesco": 1.01,
          "Asda": 0.98,
          "Morrisons": 1.01,
          "Ocado": 1.09,
          "Waitrose": 1.17,
          "Aldi": 0.83,
          "Lidl": 0.85
        }
      },
      {
        "id": "gb-0059-beans-equivalent",
        "name": "beans equivalent",
        "packQty": 1,
        "unit": "tin",
        "price": 0.47,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"beans equivalent\",1,\"tin\",0.47,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.47,
          "Tesco": 0.47,
          "Asda": 0.45,
          "Morrisons": 0.47,
          "Ocado": 0.5,
          "Waitrose": 0.54,
          "Aldi": 0.38,
          "Lidl": 0.39
        }
      },
      {
        "id": "gb-0060-ground-spice-equivalent",
        "name": "ground spice equivalent",
        "packQty": 40,
        "unit": "g",
        "price": 1.18,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"ground spice equivalent\",40,\"g\",1.18,null,null,null,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 2.5
        },
        "retailerPrices": {
          "Sainsbury's": 1.18,
          "Tesco": 1.17,
          "Asda": 1.13,
          "Morrisons": 1.17,
          "Ocado": 1.26,
          "Waitrose": 1.35,
          "Aldi": 0.97,
          "Lidl": 0.98
        }
      },
      {
        "id": "gb-0061-dried-herb-equivalent",
        "name": "dried herb equivalent",
        "packQty": 14,
        "unit": "g",
        "price": 0.9,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"dried herb equivalent\",14,\"g\",0.9,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 1
        },
        "retailerPrices": {
          "Sainsbury's": 0.9,
          "Tesco": 0.89,
          "Asda": 0.86,
          "Morrisons": 0.89,
          "Ocado": 0.96,
          "Waitrose": 1.03,
          "Aldi": 0.74,
          "Lidl": 0.75
        }
      },
      {
        "id": "gb-0062-herb-equivalent",
        "name": "herb equivalent",
        "packQty": 14,
        "unit": "g",
        "price": 0.9,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"herb equivalent\",14,\"g\",0.9,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 1
        },
        "retailerPrices": {
          "Sainsbury's": 0.9,
          "Tesco": 0.89,
          "Asda": 0.86,
          "Morrisons": 0.89,
          "Ocado": 0.96,
          "Waitrose": 1.03,
          "Aldi": 0.74,
          "Lidl": 0.75
        }
      },
      {
        "id": "gb-0063-cumin-equivalent",
        "name": "cumin equivalent",
        "packQty": 40,
        "unit": "g",
        "price": 1.08,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cumin equivalent\",40,\"g\",1.08,null,null,null,2.2,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 2.2
        },
        "retailerPrices": {
          "Sainsbury's": 1.08,
          "Tesco": 1.07,
          "Asda": 1.03,
          "Morrisons": 1.07,
          "Ocado": 1.16,
          "Waitrose": 1.24,
          "Aldi": 0.88,
          "Lidl": 0.9
        }
      },
      {
        "id": "gb-0064-pork-sausages-equivalent",
        "name": "pork sausages equivalent",
        "packQty": 8,
        "unit": "each",
        "price": 1.79,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"pork sausages equivalent\",8,\"each\",1.79,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.79,
          "Tesco": 1.78,
          "Asda": 1.71,
          "Morrisons": 1.77,
          "Ocado": 1.92,
          "Waitrose": 2.05,
          "Aldi": 1.46,
          "Lidl": 1.49
        }
      },
      {
        "id": "gb-0065-smoked-salmon-equivalent",
        "name": "smoked salmon equivalent",
        "packQty": 2,
        "unit": "each",
        "price": 4.38,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"smoked salmon equivalent\",2,\"each\",4.38,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 4.38,
          "Tesco": 4.34,
          "Asda": 4.19,
          "Morrisons": 4.34,
          "Ocado": 4.69,
          "Waitrose": 5.02,
          "Aldi": 3.58,
          "Lidl": 3.63
        }
      },
      {
        "id": "gb-0066-white-fish-equivalent",
        "name": "white fish equivalent",
        "packQty": 2,
        "unit": "each",
        "price": 7.19,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"white fish equivalent\",2,\"each\",7.19,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 7.19,
          "Tesco": 7.13,
          "Asda": 6.88,
          "Morrisons": 7.12,
          "Ocado": 7.69,
          "Waitrose": 8.24,
          "Aldi": 5.88,
          "Lidl": 5.97
        }
      },
      {
        "id": "gb-0067-fresh-vegetable-equivalent",
        "name": "fresh vegetable equivalent",
        "packQty": 200,
        "unit": "g",
        "price": 1.29,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"fresh vegetable equivalent\",200,\"g\",1.29,null,8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 8
        },
        "retailerPrices": {
          "Sainsbury's": 1.29,
          "Tesco": 1.28,
          "Asda": 1.24,
          "Morrisons": 1.28,
          "Ocado": 1.38,
          "Waitrose": 1.48,
          "Aldi": 1.05,
          "Lidl": 1.07
        }
      },
      {
        "id": "gb-0068-plant-protein-equivalent",
        "name": "plant protein equivalent",
        "packQty": 300,
        "unit": "g",
        "price": 1.58,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"plant protein equivalent\",300,\"g\",1.58,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.58,
          "Tesco": 1.57,
          "Asda": 1.51,
          "Morrisons": 1.56,
          "Ocado": 1.69,
          "Waitrose": 1.81,
          "Aldi": 1.29,
          "Lidl": 1.31
        }
      },
      {
        "id": "gb-0069-prepared-pasta-or-pastry-equivalent",
        "name": "prepared pasta or pastry equivalent",
        "packQty": 500,
        "unit": "g",
        "price": 0.71,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"prepared pasta or pastry equivalent\",500,\"g\",0.71,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.71,
          "Tesco": 0.7,
          "Asda": 0.68,
          "Morrisons": 0.7,
          "Ocado": 0.76,
          "Waitrose": 0.81,
          "Aldi": 0.58,
          "Lidl": 0.59
        }
      },
      {
        "id": "gb-0070-lentils-equivalent",
        "name": "lentils equivalent",
        "packQty": 500,
        "unit": "g",
        "price": 2.08,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"lentils equivalent\",500,\"g\",2.08,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.08,
          "Tesco": 2.06,
          "Asda": 1.99,
          "Morrisons": 2.06,
          "Ocado": 2.23,
          "Waitrose": 2.38,
          "Aldi": 1.7,
          "Lidl": 1.73
        }
      },
      {
        "id": "gb-0071-noodle-pack-equivalent",
        "name": "noodle pack equivalent",
        "packQty": 4,
        "unit": "nest",
        "price": 0.94,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"noodle pack equivalent\",4,\"nest\",0.94,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.94,
          "Tesco": 0.93,
          "Asda": 0.9,
          "Morrisons": 0.93,
          "Ocado": 1.01,
          "Waitrose": 1.08,
          "Aldi": 0.77,
          "Lidl": 0.78
        }
      },
      {
        "id": "gb-0072-bbq-sauce-equivalent",
        "name": "BBQ sauce equivalent",
        "packQty": 300,
        "unit": "ml",
        "price": 1.86,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"BBQ sauce equivalent\",300,\"ml\",1.86,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.86,
          "Tesco": 1.85,
          "Asda": 1.78,
          "Morrisons": 1.84,
          "Ocado": 1.99,
          "Waitrose": 2.13,
          "Aldi": 1.52,
          "Lidl": 1.54
        }
      },
      {
        "id": "gb-0073-onion-preserve-equivalent",
        "name": "onion preserve equivalent",
        "packQty": 3,
        "unit": "each",
        "price": 0.95,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"onion preserve equivalent\",3,\"each\",0.95,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.95,
          "Tesco": 0.94,
          "Asda": 0.91,
          "Morrisons": 0.94,
          "Ocado": 1.02,
          "Waitrose": 1.09,
          "Aldi": 0.78,
          "Lidl": 0.79
        }
      },
      {
        "id": "gb-0074-fresh-fruit-equivalent",
        "name": "fresh fruit equivalent",
        "packQty": 5,
        "unit": "each",
        "price": 0.78,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"fresh fruit equivalent\",5,\"each\",0.78,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.78,
          "Tesco": 0.77,
          "Asda": 0.75,
          "Morrisons": 0.77,
          "Ocado": 0.83,
          "Waitrose": 0.89,
          "Aldi": 0.64,
          "Lidl": 0.65
        }
      },
      {
        "id": "gb-0075-cooking-paste-equivalent",
        "name": "cooking paste equivalent",
        "packQty": 180,
        "unit": "g",
        "price": 1.99,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cooking paste equivalent\",180,\"g\",1.99,null,null,null,6,18,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 1.99,
          "Tesco": 1.97,
          "Asda": 1.91,
          "Morrisons": 1.97,
          "Ocado": 2.13,
          "Waitrose": 2.28,
          "Aldi": 1.63,
          "Lidl": 1.65
        }
      },
      {
        "id": "gb-0076-bakery-product-equivalent",
        "name": "bakery product equivalent",
        "packQty": 1,
        "unit": "pack",
        "price": 0.78,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"bakery product equivalent\",1,\"pack\",0.78,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.78,
          "Tesco": 0.77,
          "Asda": 0.75,
          "Morrisons": 0.77,
          "Ocado": 0.83,
          "Waitrose": 0.89,
          "Aldi": 0.64,
          "Lidl": 0.65
        }
      },
      {
        "id": "gb-0077-pork-cut-equivalent",
        "name": "pork cut equivalent",
        "packQty": 400,
        "unit": "g",
        "price": 4.18,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"pork cut equivalent\",400,\"g\",4.18,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 4.18,
          "Tesco": 4.15,
          "Asda": 4,
          "Morrisons": 4.14,
          "Ocado": 4.47,
          "Waitrose": 4.79,
          "Aldi": 3.42,
          "Lidl": 3.47
        }
      },
      {
        "id": "gb-0078-red-meat-steak-equivalent",
        "name": "red meat steak equivalent",
        "packQty": 300,
        "unit": "g",
        "price": 5.23,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"red meat steak equivalent\",300,\"g\",5.23,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 5.23,
          "Tesco": 5.19,
          "Asda": 5.01,
          "Morrisons": 5.18,
          "Ocado": 5.6,
          "Waitrose": 5.99,
          "Aldi": 4.28,
          "Lidl": 4.34
        }
      },
      {
        "id": "gb-0079-curry-spice-blend-equivalent",
        "name": "curry spice blend equivalent",
        "packQty": 42,
        "unit": "g",
        "price": 1.19,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"curry spice blend equivalent\",42,\"g\",1.19,null,null,null,2.2,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 2.2
        },
        "retailerPrices": {
          "Sainsbury's": 1.19,
          "Tesco": 1.18,
          "Asda": 1.14,
          "Morrisons": 1.18,
          "Ocado": 1.27,
          "Waitrose": 1.36,
          "Aldi": 0.97,
          "Lidl": 0.99
        }
      },
      {
        "id": "gb-0080-nuts-and-seeds-equivalent",
        "name": "nuts and seeds equivalent",
        "packQty": 100,
        "unit": "g",
        "price": 1.2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"nuts and seeds equivalent\",100,\"g\",1.2,null,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 3
        },
        "retailerPrices": {
          "Sainsbury's": 1.2,
          "Tesco": 1.19,
          "Asda": 1.15,
          "Morrisons": 1.19,
          "Ocado": 1.28,
          "Waitrose": 1.37,
          "Aldi": 0.98,
          "Lidl": 1
        }
      },
      {
        "id": "gb-0081-seasoning-blend-equivalent",
        "name": "seasoning blend equivalent",
        "packQty": 42,
        "unit": "g",
        "price": 1.19,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "lemon herb seasoning",
          "garlic herb seasoning"
        ],
        "legacyKey": "[\"seasoning blend equivalent\",42,\"g\",1.19,null,null,null,2.2,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 2.2
        },
        "retailerPrices": {
          "Sainsbury's": 1.19,
          "Tesco": 1.18,
          "Asda": 1.14,
          "Morrisons": 1.18,
          "Ocado": 1.27,
          "Waitrose": 1.36,
          "Aldi": 0.97,
          "Lidl": 0.99
        }
      },
      {
        "id": "gb-0082-cooking-vinegar-equivalent",
        "name": "cooking vinegar equivalent",
        "packQty": 250,
        "unit": "ml",
        "price": 1.63,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cooking vinegar equivalent\",250,\"ml\",1.63,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.63,
          "Tesco": 1.62,
          "Asda": 1.56,
          "Morrisons": 1.61,
          "Ocado": 1.74,
          "Waitrose": 1.87,
          "Aldi": 1.33,
          "Lidl": 1.35
        }
      },
      {
        "id": "gb-0083-table-sauce-equivalent",
        "name": "table sauce equivalent",
        "packQty": 300,
        "unit": "ml",
        "price": 1.86,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"table sauce equivalent\",300,\"ml\",1.86,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.86,
          "Tesco": 1.85,
          "Asda": 1.78,
          "Morrisons": 1.84,
          "Ocado": 1.99,
          "Waitrose": 2.13,
          "Aldi": 1.52,
          "Lidl": 1.54
        }
      },
      {
        "id": "gb-0084-asian-cooking-sauce-equivalent",
        "name": "Asian cooking sauce equivalent",
        "packQty": 150,
        "unit": "ml",
        "price": 1.32,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"Asian cooking sauce equivalent\",150,\"ml\",1.32,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.32,
          "Tesco": 1.31,
          "Asda": 1.26,
          "Morrisons": 1.31,
          "Ocado": 1.41,
          "Waitrose": 1.51,
          "Aldi": 1.08,
          "Lidl": 1.1
        }
      },
      {
        "id": "gb-0085-fresh-green-vegetable-equivalent",
        "name": "fresh green vegetable equivalent",
        "packQty": 910,
        "unit": "g",
        "price": 1.49,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"fresh green vegetable equivalent\",910,\"g\",1.49,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.49,
          "Tesco": 1.48,
          "Asda": 1.43,
          "Morrisons": 1.48,
          "Ocado": 1.59,
          "Waitrose": 1.71,
          "Aldi": 1.22,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0086-prepared-pork-product-equivalent",
        "name": "prepared pork product equivalent",
        "packQty": 400,
        "unit": "g",
        "price": 4.18,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"prepared pork product equivalent\",400,\"g\",4.18,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 4.18,
          "Tesco": 4.15,
          "Asda": 4,
          "Morrisons": 4.14,
          "Ocado": 4.47,
          "Waitrose": 4.79,
          "Aldi": 3.42,
          "Lidl": 3.47
        }
      },
      {
        "id": "gb-0087-vegetable-stock-concentrate-equivalent",
        "name": "vegetable stock concentrate equivalent",
        "packQty": 5000,
        "unit": "ml",
        "price": 1.27,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"vegetable stock concentrate equivalent\",5000,\"ml\",1.27,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.27,
          "Tesco": 1.26,
          "Asda": 1.22,
          "Morrisons": 1.26,
          "Ocado": 1.36,
          "Waitrose": 1.45,
          "Aldi": 1.04,
          "Lidl": 1.05
        }
      },
      {
        "id": "gb-0088-beef-cooking-concentrate-equivalent",
        "name": "beef cooking concentrate equivalent",
        "packQty": 5000,
        "unit": "ml",
        "price": 1.27,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"beef cooking concentrate equivalent\",5000,\"ml\",1.27,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.27,
          "Tesco": 1.26,
          "Asda": 1.22,
          "Morrisons": 1.26,
          "Ocado": 1.36,
          "Waitrose": 1.45,
          "Aldi": 1.04,
          "Lidl": 1.05
        }
      },
      {
        "id": "gb-0089-chutney-jar-equivalent",
        "name": "chutney jar equivalent",
        "packQty": 500,
        "unit": "g",
        "price": 2.17,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"chutney jar equivalent\",500,\"g\",2.17,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.17,
          "Tesco": 2.15,
          "Asda": 2.08,
          "Morrisons": 2.15,
          "Ocado": 2.32,
          "Waitrose": 2.49,
          "Aldi": 1.77,
          "Lidl": 1.8
        }
      },
      {
        "id": "gb-0090-balsamic-glaze-equivalent",
        "name": "balsamic glaze equivalent",
        "packQty": 250,
        "unit": "ml",
        "price": 1.63,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"balsamic glaze equivalent\",250,\"ml\",1.63,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.63,
          "Tesco": 1.62,
          "Asda": 1.56,
          "Morrisons": 1.61,
          "Ocado": 1.74,
          "Waitrose": 1.87,
          "Aldi": 1.33,
          "Lidl": 1.35
        }
      },
      {
        "id": "gb-0091-tomato-cooking-sauce-equivalent",
        "name": "tomato cooking sauce equivalent",
        "packQty": 200,
        "unit": "g",
        "price": 0.61,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"tomato cooking sauce equivalent\",200,\"g\",0.61,null,null,null,6,18,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 0.61,
          "Tesco": 0.61,
          "Asda": 0.58,
          "Morrisons": 0.6,
          "Ocado": 0.65,
          "Waitrose": 0.7,
          "Aldi": 0.5,
          "Lidl": 0.51
        }
      },
      {
        "id": "gb-0092-vegetable-spring-rolls-pack",
        "name": "vegetable spring rolls pack",
        "packQty": 6,
        "unit": "each",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"vegetable spring rolls pack\",6,\"each\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0093-british-duck-breasts-x2",
        "name": "British duck breasts x2",
        "packQty": 2,
        "unit": "each",
        "price": 7.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"British duck breasts x2\",2,\"each\",7.5,7.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 7.5,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 7.5,
          "Tesco": 7.44,
          "Asda": 7.18,
          "Morrisons": 7.43,
          "Ocado": 8.02,
          "Waitrose": 8.59,
          "Aldi": 6.13,
          "Lidl": 6.22
        }
      },
      {
        "id": "gb-0094-plain-flour-1-5kg",
        "name": "plain flour 1.5kg",
        "packQty": 1500,
        "unit": "g",
        "price": 0.8,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"plain flour 1.5kg\",1500,\"g\",0.8,0.8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.8,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.8,
          "Tesco": 0.79,
          "Asda": 0.77,
          "Morrisons": 0.79,
          "Ocado": 0.86,
          "Waitrose": 0.92,
          "Aldi": 0.65,
          "Lidl": 0.66
        }
      },
      {
        "id": "gb-0095-sesame-oil-250ml",
        "name": "sesame oil 250ml",
        "packQty": 250,
        "unit": "ml",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"sesame oil 250ml\",250,\"ml\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0096-desiccated-coconut-200g",
        "name": "desiccated coconut 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"desiccated coconut 200g\",200,\"g\",1.75,1.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.75,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.75,
          "Tesco": 1.74,
          "Asda": 1.68,
          "Morrisons": 1.73,
          "Ocado": 1.87,
          "Waitrose": 2,
          "Aldi": 1.43,
          "Lidl": 1.45
        }
      },
      {
        "id": "gb-0097-apricot-jam-jar",
        "name": "apricot jam jar",
        "packQty": 454,
        "unit": "g",
        "price": 1.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"apricot jam jar\",454,\"g\",1.75,1.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.75,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.75,
          "Tesco": 1.74,
          "Asda": 1.68,
          "Morrisons": 1.73,
          "Ocado": 1.87,
          "Waitrose": 2,
          "Aldi": 1.43,
          "Lidl": 1.45
        }
      },
      {
        "id": "gb-0098-fig-jam-jar",
        "name": "fig jam jar",
        "packQty": 340,
        "unit": "g",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"fig jam jar\",340,\"g\",2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0099-redcurrant-jelly-jar",
        "name": "redcurrant jelly jar",
        "packQty": 250,
        "unit": "g",
        "price": 1.85,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"redcurrant jelly jar\",250,\"g\",1.85,1.85,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.85,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.85,
          "Tesco": 1.84,
          "Asda": 1.77,
          "Morrisons": 1.83,
          "Ocado": 1.98,
          "Waitrose": 2.12,
          "Aldi": 1.51,
          "Lidl": 1.54
        }
      },
      {
        "id": "gb-0100-apple-and-sage-jelly-jar",
        "name": "apple and sage jelly jar",
        "packQty": 250,
        "unit": "g",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "apple and sage jelly"
        ],
        "legacyKey": "[\"apple and sage jelly jar\",250,\"g\",2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0101-sour-cherry-compote-jar",
        "name": "sour cherry compote jar",
        "packQty": 300,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"sour cherry compote jar\",300,\"g\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0102-tap-water",
        "name": "tap water",
        "packQty": 1000,
        "unit": "ml",
        "price": 0,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "water",
          "tap water"
        ],
        "legacyKey": "[\"tap water\",1000,\"ml\",0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0,
          "Tesco": 0,
          "Asda": 0,
          "Morrisons": 0,
          "Ocado": 0,
          "Waitrose": 0,
          "Aldi": 0,
          "Lidl": 0
        }
      },
      {
        "id": "gb-0103-bamboo-skewers-pack",
        "name": "bamboo skewers pack",
        "packQty": 100,
        "unit": "each",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"bamboo skewers pack\",100,\"each\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "calibrated-explicit",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0104-crispy-onions-75g",
        "name": "crispy onions 75g",
        "packQty": 75,
        "unit": "g",
        "price": 1.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"crispy onions 75g\",75,\"g\",1.75,1.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.75,
        "confidence": "current",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.75,
          "Tesco": 1.74,
          "Asda": 1.68,
          "Morrisons": 1.73,
          "Ocado": 1.87,
          "Waitrose": 2,
          "Aldi": 1.43,
          "Lidl": 1.45
        }
      },
      {
        "id": "gb-0105-leeks-500g",
        "name": "leeks 500g",
        "packQty": 500,
        "unit": "g",
        "price": 1.37,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"leeks 500g\",500,\"g\",1.37,1.37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.37,
        "confidence": "current",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.37,
          "Tesco": 1.36,
          "Asda": 1.31,
          "Morrisons": 1.36,
          "Ocado": 1.47,
          "Waitrose": 1.57,
          "Aldi": 1.12,
          "Lidl": 1.14
        }
      },
      {
        "id": "gb-0106-tap-water",
        "name": "tap water",
        "packQty": 1,
        "unit": "each",
        "price": 0,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"tap water\",1,\"each\",0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0,
          "Tesco": 0,
          "Asda": 0,
          "Morrisons": 0,
          "Ocado": 0,
          "Waitrose": 0,
          "Aldi": 0,
          "Lidl": 0
        }
      },
      {
        "id": "gb-0107-cheddar-cheese-pack",
        "name": "cheddar cheese pack",
        "packQty": 1,
        "unit": "pack",
        "price": 3.01,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cheddar cheese pack\",1,\"pack\",3.01,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.01,
          "Tesco": 2.99,
          "Asda": 2.88,
          "Morrisons": 2.98,
          "Ocado": 3.22,
          "Waitrose": 3.45,
          "Aldi": 2.46,
          "Lidl": 2.5
        }
      },
      {
        "id": "gb-0108-british-skimmed-milk-4-pint-carton",
        "name": "British skimmed milk 4 pint carton",
        "packQty": 1,
        "unit": "carton",
        "price": 1.65,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"British skimmed milk 4 pint carton\",1,\"carton\",1.65,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.65,
          "Tesco": 1.64,
          "Asda": 1.58,
          "Morrisons": 1.63,
          "Ocado": 1.77,
          "Waitrose": 1.89,
          "Aldi": 1.35,
          "Lidl": 1.37
        }
      },
      {
        "id": "gb-0109-tomatoes-pack",
        "name": "tomatoes pack",
        "packQty": 6,
        "unit": "each",
        "price": 0.99,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"tomatoes pack\",6,\"each\",0.99,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.99,
          "Tesco": 0.98,
          "Asda": 0.95,
          "Morrisons": 0.98,
          "Ocado": 1.06,
          "Waitrose": 1.13,
          "Aldi": 0.81,
          "Lidl": 0.82
        }
      },
      {
        "id": "gb-0110-peppers-pack",
        "name": "peppers pack",
        "packQty": 3,
        "unit": "each",
        "price": 1.97,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "bell pepper",
          "green pepper",
          "mini bell pepper mix"
        ],
        "legacyKey": "[\"peppers pack\",3,\"each\",1.97,null,160,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 160
        },
        "retailerPrices": {
          "Sainsbury's": 1.97,
          "Tesco": 1.95,
          "Asda": 1.89,
          "Morrisons": 1.95,
          "Ocado": 2.11,
          "Waitrose": 2.26,
          "Aldi": 1.61,
          "Lidl": 1.63
        }
      },
      {
        "id": "gb-0111-garden-peas-910g",
        "name": "garden peas 910g",
        "packQty": 910,
        "unit": "g",
        "price": 1.49,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"garden peas 910g\",910,\"g\",1.49,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.49,
          "Tesco": 1.48,
          "Asda": 1.43,
          "Morrisons": 1.48,
          "Ocado": 1.59,
          "Waitrose": 1.71,
          "Aldi": 1.22,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0112-brown-onions-1kg",
        "name": "brown onions 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 0.97,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"brown onions 1kg\",1000,\"g\",0.97,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.97,
          "Tesco": 0.96,
          "Asda": 0.93,
          "Morrisons": 0.96,
          "Ocado": 1.04,
          "Waitrose": 1.11,
          "Aldi": 0.79,
          "Lidl": 0.81
        }
      },
      {
        "id": "gb-0113-sweet-potatoes-1kg",
        "name": "sweet potatoes 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 1.2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"sweet potatoes 1kg\",1000,\"g\",1.2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.2,
          "Tesco": 1.19,
          "Asda": 1.15,
          "Morrisons": 1.19,
          "Ocado": 1.28,
          "Waitrose": 1.37,
          "Aldi": 0.98,
          "Lidl": 1
        }
      },
      {
        "id": "gb-0114-potatoes-2kg",
        "name": "potatoes 2kg",
        "packQty": 2000,
        "unit": "g",
        "price": 1.8,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"potatoes 2kg\",2000,\"g\",1.8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.8,
          "Tesco": 1.79,
          "Asda": 1.72,
          "Morrisons": 1.78,
          "Ocado": 1.93,
          "Waitrose": 2.06,
          "Aldi": 1.47,
          "Lidl": 1.49
        }
      },
      {
        "id": "gb-0115-pasta-500g",
        "name": "pasta 500g",
        "packQty": 500,
        "unit": "g",
        "price": 0.71,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "rigatoni pasta",
          "ditali pasta",
          "linguine",
          "macaroni"
        ],
        "legacyKey": "[\"pasta 500g\",500,\"g\",0.71,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.71,
          "Tesco": 0.7,
          "Asda": 0.68,
          "Morrisons": 0.7,
          "Ocado": 0.76,
          "Waitrose": 0.81,
          "Aldi": 0.58,
          "Lidl": 0.59
        }
      },
      {
        "id": "gb-0116-chicken-stock-cubes",
        "name": "chicken stock cubes",
        "packQty": 6000,
        "unit": "ml",
        "price": 1.3,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"chicken stock cubes\",6000,\"ml\",1.3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.3,
          "Tesco": 1.29,
          "Asda": 1.24,
          "Morrisons": 1.29,
          "Ocado": 1.39,
          "Waitrose": 1.49,
          "Aldi": 1.06,
          "Lidl": 1.08
        }
      },
      {
        "id": "gb-0117-curly-kale-200g",
        "name": "curly kale 200g",
        "packQty": 200,
        "unit": "g",
        "price": 0.88,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"curly kale 200g\",200,\"g\",0.88,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.88,
          "Tesco": 0.87,
          "Asda": 0.84,
          "Morrisons": 0.87,
          "Ocado": 0.94,
          "Waitrose": 1.01,
          "Aldi": 0.72,
          "Lidl": 0.73
        }
      },
      {
        "id": "gb-0118-chilli-powder-45g",
        "name": "chilli powder 45g",
        "packQty": 45,
        "unit": "g",
        "price": 1.08,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"chilli powder 45g\",45,\"g\",1.08,null,null,null,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 2.5
        },
        "retailerPrices": {
          "Sainsbury's": 1.08,
          "Tesco": 1.07,
          "Asda": 1.03,
          "Morrisons": 1.07,
          "Ocado": 1.16,
          "Waitrose": 1.24,
          "Aldi": 0.88,
          "Lidl": 0.9
        }
      },
      {
        "id": "gb-0119-chilli-flakes-45g",
        "name": "chilli flakes 45g",
        "packQty": 45,
        "unit": "g",
        "price": 1.26,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"chilli flakes 45g\",45,\"g\",1.26,null,null,null,2,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 2
        },
        "retailerPrices": {
          "Sainsbury's": 1.26,
          "Tesco": 1.25,
          "Asda": 1.21,
          "Morrisons": 1.25,
          "Ocado": 1.35,
          "Waitrose": 1.44,
          "Aldi": 1.03,
          "Lidl": 1.05
        }
      },
      {
        "id": "gb-0120-diced-beef-500g",
        "name": "diced beef 500g",
        "packQty": 500,
        "unit": "g",
        "price": 6.04,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"diced beef 500g\",500,\"g\",6.04,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 6.04,
          "Tesco": 5.99,
          "Asda": 5.78,
          "Morrisons": 5.98,
          "Ocado": 6.46,
          "Waitrose": 6.92,
          "Aldi": 4.94,
          "Lidl": 5.01
        }
      },
      {
        "id": "gb-0121-risotto-rice-500g",
        "name": "risotto rice 500g",
        "packQty": 500,
        "unit": "g",
        "price": 2.37,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"risotto rice 500g\",500,\"g\",2.37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.37,
          "Tesco": 2.35,
          "Asda": 2.27,
          "Morrisons": 2.35,
          "Ocado": 2.54,
          "Waitrose": 2.71,
          "Aldi": 1.94,
          "Lidl": 1.97
        }
      },
      {
        "id": "gb-0122-plain-flour-1-5kg",
        "name": "plain flour 1.5kg",
        "packQty": 1500,
        "unit": "g",
        "price": 0.76,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"plain flour 1.5kg\",1500,\"g\",0.76,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.76,
          "Tesco": 0.75,
          "Asda": 0.73,
          "Morrisons": 0.75,
          "Ocado": 0.81,
          "Waitrose": 0.87,
          "Aldi": 0.62,
          "Lidl": 0.63
        }
      },
      {
        "id": "gb-0123-pitted-olives-330g",
        "name": "pitted olives 330g",
        "packQty": 330,
        "unit": "g",
        "price": 1.31,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"pitted olives 330g\",330,\"g\",1.31,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.31,
          "Tesco": 1.3,
          "Asda": 1.25,
          "Morrisons": 1.3,
          "Ocado": 1.4,
          "Waitrose": 1.5,
          "Aldi": 1.07,
          "Lidl": 1.09
        }
      },
      {
        "id": "gb-0124-closed-cup-mushrooms-400g",
        "name": "closed cup mushrooms 400g",
        "packQty": 400,
        "unit": "g",
        "price": 1.29,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"closed cup mushrooms 400g\",400,\"g\",1.29,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.29,
          "Tesco": 1.28,
          "Asda": 1.24,
          "Morrisons": 1.28,
          "Ocado": 1.38,
          "Waitrose": 1.48,
          "Aldi": 1.05,
          "Lidl": 1.07
        }
      },
      {
        "id": "gb-0125-hummus-200g",
        "name": "hummus 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.28,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"hummus 200g\",200,\"g\",1.28,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.28,
          "Tesco": 1.27,
          "Asda": 1.23,
          "Morrisons": 1.27,
          "Ocado": 1.37,
          "Waitrose": 1.47,
          "Aldi": 1.05,
          "Lidl": 1.06
        }
      },
      {
        "id": "gb-0126-avocado-each",
        "name": "avocado each",
        "packQty": 1,
        "unit": "each",
        "price": 0.7,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"avocado each\",1,\"each\",0.7,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.7,
          "Tesco": 0.69,
          "Asda": 0.67,
          "Morrisons": 0.69,
          "Ocado": 0.75,
          "Waitrose": 0.8,
          "Aldi": 0.57,
          "Lidl": 0.58
        }
      },
      {
        "id": "gb-0127-crisp-apples-x6",
        "name": "crisp apples x6",
        "packQty": 6,
        "unit": "each",
        "price": 1.8,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"crisp apples x6\",6,\"each\",1.8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.8,
          "Tesco": 1.79,
          "Asda": 1.72,
          "Morrisons": 1.78,
          "Ocado": 1.93,
          "Waitrose": 2.06,
          "Aldi": 1.47,
          "Lidl": 1.49
        }
      },
      {
        "id": "gb-0128-cider-vinegar-350ml",
        "name": "cider vinegar 350ml",
        "packQty": 350,
        "unit": "ml",
        "price": 1.46,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cider vinegar 350ml\",350,\"ml\",1.46,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.46,
          "Tesco": 1.45,
          "Asda": 1.4,
          "Morrisons": 1.45,
          "Ocado": 1.56,
          "Waitrose": 1.67,
          "Aldi": 1.19,
          "Lidl": 1.21
        }
      },
      {
        "id": "gb-0129-soured-cream-300ml",
        "name": "soured cream 300ml",
        "packQty": 300,
        "unit": "g",
        "price": 0.85,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"soured cream 300ml\",300,\"g\",0.85,null,null,null,null,15,1,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tbspWeight": 15,
          "gramsPerMl": 1
        },
        "retailerPrices": {
          "Sainsbury's": 0.85,
          "Tesco": 0.84,
          "Asda": 0.81,
          "Morrisons": 0.84,
          "Ocado": 0.91,
          "Waitrose": 0.97,
          "Aldi": 0.7,
          "Lidl": 0.71
        }
      },
      {
        "id": "gb-0130-mayonnaise-500ml",
        "name": "mayonnaise 500ml",
        "packQty": 500,
        "unit": "g",
        "price": 0.92,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"mayonnaise 500ml\",500,\"g\",0.92,null,null,null,null,15,1,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tbspWeight": 15,
          "gramsPerMl": 1
        },
        "retailerPrices": {
          "Sainsbury's": 0.92,
          "Tesco": 0.91,
          "Asda": 0.88,
          "Morrisons": 0.91,
          "Ocado": 0.98,
          "Waitrose": 1.05,
          "Aldi": 0.75,
          "Lidl": 0.76
        }
      },
      {
        "id": "gb-0131-creme-fraiche-300ml",
        "name": "creme fraiche 300ml",
        "packQty": 300,
        "unit": "g",
        "price": 0.84,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"creme fraiche 300ml\",300,\"g\",0.84,null,null,null,null,15,1,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tbspWeight": 15,
          "gramsPerMl": 1
        },
        "retailerPrices": {
          "Sainsbury's": 0.84,
          "Tesco": 0.83,
          "Asda": 0.8,
          "Morrisons": 0.83,
          "Ocado": 0.9,
          "Waitrose": 0.96,
          "Aldi": 0.69,
          "Lidl": 0.7
        }
      },
      {
        "id": "gb-0132-british-chicken-breast-fillets-1kg",
        "name": "British chicken breast fillets 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 6.91,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"British chicken breast fillets 1kg\",1000,\"g\",6.91,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 6.91,
          "Tesco": 6.85,
          "Asda": 6.62,
          "Morrisons": 6.84,
          "Ocado": 7.39,
          "Waitrose": 7.92,
          "Aldi": 5.65,
          "Lidl": 5.73
        }
      },
      {
        "id": "gb-0133-british-chicken-thigh-fillets-1kg",
        "name": "British chicken thigh fillets 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 7.64,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "british chicken thighs"
        ],
        "legacyKey": "[\"British chicken thigh fillets 1kg\",1000,\"g\",7.64,null,110,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 110
        },
        "retailerPrices": {
          "Sainsbury's": 7.64,
          "Tesco": 7.58,
          "Asda": 7.31,
          "Morrisons": 7.57,
          "Ocado": 8.17,
          "Waitrose": 8.75,
          "Aldi": 6.25,
          "Lidl": 6.34
        }
      },
      {
        "id": "gb-0134-7-fat-british-turkey-mince-500g",
        "name": "7% fat British turkey mince 500g",
        "packQty": 500,
        "unit": "g",
        "price": 4.09,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"7% fat British turkey mince 500g\",500,\"g\",4.09,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 4.09,
          "Tesco": 4.06,
          "Asda": 3.92,
          "Morrisons": 4.05,
          "Ocado": 4.38,
          "Waitrose": 4.69,
          "Aldi": 3.34,
          "Lidl": 3.39
        }
      },
      {
        "id": "gb-0135-5-fat-beef-mince-500g",
        "name": "5% fat beef mince 500g",
        "packQty": 500,
        "unit": "g",
        "price": 5.11,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"5% fat beef mince 500g\",500,\"g\",5.11,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 5.11,
          "Tesco": 5.07,
          "Asda": 4.89,
          "Morrisons": 5.06,
          "Ocado": 5.47,
          "Waitrose": 5.85,
          "Aldi": 4.18,
          "Lidl": 4.24
        }
      },
      {
        "id": "gb-0136-beef-strips-300g",
        "name": "beef strips 300g",
        "packQty": 300,
        "unit": "g",
        "price": 5.23,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"beef strips 300g\",300,\"g\",5.23,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 5.23,
          "Tesco": 5.19,
          "Asda": 5.01,
          "Morrisons": 5.18,
          "Ocado": 5.6,
          "Waitrose": 5.99,
          "Aldi": 4.28,
          "Lidl": 4.34
        }
      },
      {
        "id": "gb-0137-pork-mince-500g",
        "name": "pork mince 500g",
        "packQty": 500,
        "unit": "g",
        "price": 2.37,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"pork mince 500g\",500,\"g\",2.37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.37,
          "Tesco": 2.35,
          "Asda": 2.27,
          "Morrisons": 2.35,
          "Ocado": 2.54,
          "Waitrose": 2.71,
          "Aldi": 1.94,
          "Lidl": 1.97
        }
      },
      {
        "id": "gb-0138-pork-strips-400g",
        "name": "pork strips 400g",
        "packQty": 400,
        "unit": "g",
        "price": 4.18,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"pork strips 400g\",400,\"g\",4.18,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 4.18,
          "Tesco": 4.15,
          "Asda": 4,
          "Morrisons": 4.14,
          "Ocado": 4.47,
          "Waitrose": 4.79,
          "Aldi": 3.42,
          "Lidl": 3.47
        }
      },
      {
        "id": "gb-0139-lamb-mince-500g",
        "name": "lamb mince 500g",
        "packQty": 500,
        "unit": "g",
        "price": 6.26,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"lamb mince 500g\",500,\"g\",6.26,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 6.26,
          "Tesco": 6.21,
          "Asda": 5.99,
          "Morrisons": 6.2,
          "Ocado": 6.7,
          "Waitrose": 7.17,
          "Aldi": 5.12,
          "Lidl": 5.2
        }
      },
      {
        "id": "gb-0140-pork-sausages-x8",
        "name": "pork sausages x8",
        "packQty": 8,
        "unit": "each",
        "price": 1.79,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"pork sausages x8\",8,\"each\",1.79,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.79,
          "Tesco": 1.78,
          "Asda": 1.71,
          "Morrisons": 1.77,
          "Ocado": 1.92,
          "Waitrose": 2.05,
          "Aldi": 1.46,
          "Lidl": 1.49
        }
      },
      {
        "id": "gb-0141-scottish-salmon-fillets-x2-240g",
        "name": "Scottish salmon fillets x2 240g",
        "packQty": 2,
        "unit": "each",
        "price": 4.38,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"Scottish salmon fillets x2 240g\",2,\"each\",4.38,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 4.38,
          "Tesco": 4.34,
          "Asda": 4.19,
          "Morrisons": 4.34,
          "Ocado": 4.69,
          "Waitrose": 5.02,
          "Aldi": 3.58,
          "Lidl": 3.63
        }
      },
      {
        "id": "gb-0142-cod-fillets-equivalent-pack",
        "name": "cod fillets equivalent pack",
        "packQty": 2,
        "unit": "each",
        "price": 7.19,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cod fillets equivalent pack\",2,\"each\",7.19,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 7.19,
          "Tesco": 7.13,
          "Asda": 6.88,
          "Morrisons": 7.12,
          "Ocado": 7.69,
          "Waitrose": 8.24,
          "Aldi": 5.88,
          "Lidl": 5.97
        }
      },
      {
        "id": "gb-0143-large-king-prawns-150g",
        "name": "large king prawns 150g",
        "packQty": 150,
        "unit": "g",
        "price": 2.56,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"large king prawns 150g\",150,\"g\",2.56,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.56,
          "Tesco": 2.54,
          "Asda": 2.45,
          "Morrisons": 2.54,
          "Ocado": 2.74,
          "Waitrose": 2.93,
          "Aldi": 2.09,
          "Lidl": 2.12
        }
      },
      {
        "id": "gb-0144-tofu-300g",
        "name": "tofu 300g",
        "packQty": 300,
        "unit": "g",
        "price": 1.58,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"tofu 300g\",300,\"g\",1.58,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.58,
          "Tesco": 1.57,
          "Asda": 1.51,
          "Morrisons": 1.56,
          "Ocado": 1.69,
          "Waitrose": 1.81,
          "Aldi": 1.29,
          "Lidl": 1.31
        }
      },
      {
        "id": "gb-0145-cypriot-halloumi-225g",
        "name": "Cypriot halloumi 225g",
        "packQty": 225,
        "unit": "g",
        "price": 1.99,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"Cypriot halloumi 225g\",225,\"g\",1.99,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.99,
          "Tesco": 1.97,
          "Asda": 1.91,
          "Morrisons": 1.97,
          "Ocado": 2.13,
          "Waitrose": 2.28,
          "Aldi": 1.63,
          "Lidl": 1.65
        }
      },
      {
        "id": "gb-0146-chickpeas-400g-240g-drained",
        "name": "chickpeas 400g, 240g drained",
        "packQty": 1,
        "unit": "tin",
        "price": 0.4,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"chickpeas 400g, 240g drained\",1,\"tin\",0.4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.4,
          "Tesco": 0.4,
          "Asda": 0.38,
          "Morrisons": 0.4,
          "Ocado": 0.43,
          "Waitrose": 0.46,
          "Aldi": 0.33,
          "Lidl": 0.33
        }
      },
      {
        "id": "gb-0147-black-beans-tin",
        "name": "black beans tin",
        "packQty": 1,
        "unit": "tin",
        "price": 0.47,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"black beans tin\",1,\"tin\",0.47,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.47,
          "Tesco": 0.47,
          "Asda": 0.45,
          "Morrisons": 0.47,
          "Ocado": 0.5,
          "Waitrose": 0.54,
          "Aldi": 0.38,
          "Lidl": 0.39
        }
      },
      {
        "id": "gb-0148-butter-beans-tin",
        "name": "butter beans tin",
        "packQty": 1,
        "unit": "tin",
        "price": 0.46,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"butter beans tin\",1,\"tin\",0.46,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.46,
          "Tesco": 0.46,
          "Asda": 0.44,
          "Morrisons": 0.46,
          "Ocado": 0.49,
          "Waitrose": 0.53,
          "Aldi": 0.38,
          "Lidl": 0.38
        }
      },
      {
        "id": "gb-0149-red-lentils-500g",
        "name": "red lentils 500g",
        "packQty": 500,
        "unit": "g",
        "price": 2.08,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"red lentils 500g\",500,\"g\",2.08,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.08,
          "Tesco": 2.06,
          "Asda": 1.99,
          "Morrisons": 2.06,
          "Ocado": 2.23,
          "Waitrose": 2.38,
          "Aldi": 1.7,
          "Lidl": 1.73
        }
      },
      {
        "id": "gb-0150-cooked-green-lentils-250g",
        "name": "cooked green lentils 250g",
        "packQty": 250,
        "unit": "g",
        "price": 0.48,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cooked green lentils 250g\",250,\"g\",0.48,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.48,
          "Tesco": 0.48,
          "Asda": 0.46,
          "Morrisons": 0.48,
          "Ocado": 0.51,
          "Waitrose": 0.55,
          "Aldi": 0.39,
          "Lidl": 0.4
        }
      },
      {
        "id": "gb-0151-tuna-tin",
        "name": "tuna tin",
        "packQty": 1,
        "unit": "tin",
        "price": 0.69,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"tuna tin\",1,\"tin\",0.69,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.69,
          "Tesco": 0.68,
          "Asda": 0.66,
          "Morrisons": 0.68,
          "Ocado": 0.74,
          "Waitrose": 0.79,
          "Aldi": 0.56,
          "Lidl": 0.57
        }
      },
      {
        "id": "gb-0152-basmati-rice-2kg",
        "name": "basmati rice 2kg",
        "packQty": 2000,
        "unit": "g",
        "price": 3.6,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"basmati rice 2kg\",2000,\"g\",3.6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.6,
          "Tesco": 3.57,
          "Asda": 3.45,
          "Morrisons": 3.57,
          "Ocado": 3.85,
          "Waitrose": 4.12,
          "Aldi": 2.94,
          "Lidl": 2.99
        }
      },
      {
        "id": "gb-0153-pasta-500g",
        "name": "pasta 500g",
        "packQty": 500,
        "unit": "g",
        "price": 0.71,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"pasta 500g\",500,\"g\",0.71,0.69,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.69,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.71,
          "Tesco": 0.7,
          "Asda": 0.68,
          "Morrisons": 0.7,
          "Ocado": 0.76,
          "Waitrose": 0.81,
          "Aldi": 0.58,
          "Lidl": 0.59
        }
      },
      {
        "id": "gb-0154-egg-noodles-4-nests",
        "name": "egg noodles 4 nests",
        "packQty": 4,
        "unit": "nest",
        "price": 0.94,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"egg noodles 4 nests\",4,\"nest\",0.94,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.94,
          "Tesco": 0.93,
          "Asda": 0.9,
          "Morrisons": 0.93,
          "Ocado": 1.01,
          "Waitrose": 1.08,
          "Aldi": 0.77,
          "Lidl": 0.78
        }
      },
      {
        "id": "gb-0155-wraps-or-tortillas-x8",
        "name": "wraps or tortillas x8",
        "packQty": 8,
        "unit": "each",
        "price": 1.32,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "plain taco tortillas",
          "super soft tortillas with whole wheat",
          "large seeded tortilla wrap"
        ],
        "legacyKey": "[\"wraps or tortillas x8\",8,\"each\",1.32,0.99,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.99,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.32,
          "Tesco": 1.31,
          "Asda": 1.26,
          "Morrisons": 1.31,
          "Ocado": 1.41,
          "Waitrose": 1.51,
          "Aldi": 1.08,
          "Lidl": 1.1
        }
      },
      {
        "id": "gb-0156-baby-potatoes-1kg",
        "name": "baby potatoes 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 1.01,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"baby potatoes 1kg\",1000,\"g\",1.01,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.01,
          "Tesco": 1,
          "Asda": 0.97,
          "Morrisons": 1,
          "Ocado": 1.08,
          "Waitrose": 1.16,
          "Aldi": 0.83,
          "Lidl": 0.84
        }
      },
      {
        "id": "gb-0157-potatoes-2kg",
        "name": "potatoes 2kg",
        "packQty": 2000,
        "unit": "g",
        "price": 1.8,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "salad potatoes",
          "baking potato"
        ],
        "legacyKey": "[\"potatoes 2kg\",2000,\"g\",1.8,null,220,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 220
        },
        "retailerPrices": {
          "Sainsbury's": 1.8,
          "Tesco": 1.79,
          "Asda": 1.72,
          "Morrisons": 1.78,
          "Ocado": 1.93,
          "Waitrose": 2.06,
          "Aldi": 1.47,
          "Lidl": 1.49
        }
      },
      {
        "id": "gb-0158-couscous-500g",
        "name": "couscous 500g",
        "packQty": 500,
        "unit": "g",
        "price": 1.27,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "pearl couscous"
        ],
        "legacyKey": "[\"couscous 500g\",500,\"g\",1.27,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.27,
          "Tesco": 1.26,
          "Asda": 1.22,
          "Morrisons": 1.26,
          "Ocado": 1.36,
          "Waitrose": 1.45,
          "Aldi": 1.04,
          "Lidl": 1.05
        }
      },
      {
        "id": "gb-0159-bulgur-wheat-500g",
        "name": "bulgur wheat 500g",
        "packQty": 500,
        "unit": "g",
        "price": 2.06,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"bulgur wheat 500g\",500,\"g\",2.06,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.06,
          "Tesco": 2.04,
          "Asda": 1.97,
          "Morrisons": 2.04,
          "Ocado": 2.2,
          "Waitrose": 2.36,
          "Aldi": 1.68,
          "Lidl": 1.71
        }
      },
      {
        "id": "gb-0160-flatbreads-x4",
        "name": "flatbreads x4",
        "packQty": 4,
        "unit": "each",
        "price": 1.73,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"flatbreads x4\",4,\"each\",1.73,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.73,
          "Tesco": 1.72,
          "Asda": 1.66,
          "Morrisons": 1.71,
          "Ocado": 1.85,
          "Waitrose": 1.98,
          "Aldi": 1.41,
          "Lidl": 1.44
        }
      },
      {
        "id": "gb-0161-porridge-oats-1kg",
        "name": "porridge oats 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 1.29,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"porridge oats 1kg\",1000,\"g\",1.29,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.29,
          "Tesco": 1.28,
          "Asda": 1.24,
          "Morrisons": 1.28,
          "Ocado": 1.38,
          "Waitrose": 1.48,
          "Aldi": 1.05,
          "Lidl": 1.07
        }
      },
      {
        "id": "gb-0162-greek-style-natural-yoghurt-1kg",
        "name": "Greek style natural yoghurt 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 1.76,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "greek style natural yoghurt"
        ],
        "legacyKey": "[\"Greek style natural yoghurt 1kg\",1000,\"g\",1.76,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.76,
          "Tesco": 1.75,
          "Asda": 1.69,
          "Morrisons": 1.74,
          "Ocado": 1.88,
          "Waitrose": 2.02,
          "Aldi": 1.44,
          "Lidl": 1.46
        }
      },
      {
        "id": "gb-0163-soft-cheese-300g",
        "name": "soft cheese 300g",
        "packQty": 300,
        "unit": "g",
        "price": 1.91,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "cream cheese"
        ],
        "legacyKey": "[\"soft cheese 300g\",300,\"g\",1.91,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.91,
          "Tesco": 1.89,
          "Asda": 1.83,
          "Morrisons": 1.89,
          "Ocado": 2.04,
          "Waitrose": 2.19,
          "Aldi": 1.56,
          "Lidl": 1.59
        }
      },
      {
        "id": "gb-0164-parmesan-170g",
        "name": "parmesan 170g",
        "packQty": 170,
        "unit": "g",
        "price": 3.49,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "parmigiano reggiano"
        ],
        "legacyKey": "[\"parmesan 170g\",170,\"g\",3.49,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.49,
          "Tesco": 3.46,
          "Asda": 3.34,
          "Morrisons": 3.46,
          "Ocado": 3.73,
          "Waitrose": 4,
          "Aldi": 2.85,
          "Lidl": 2.9
        }
      },
      {
        "id": "gb-0165-feta-200g",
        "name": "feta 200g",
        "packQty": 200,
        "unit": "g",
        "price": 2.22,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"feta 200g\",200,\"g\",2.22,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.22,
          "Tesco": 2.2,
          "Asda": 2.13,
          "Morrisons": 2.2,
          "Ocado": 2.38,
          "Waitrose": 2.54,
          "Aldi": 1.82,
          "Lidl": 1.84
        }
      },
      {
        "id": "gb-0166-yoghurts-pack",
        "name": "yoghurts pack",
        "packQty": 1,
        "unit": "pack",
        "price": 1.32,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"yoghurts pack\",1,\"pack\",1.32,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.32,
          "Tesco": 1.31,
          "Asda": 1.26,
          "Morrisons": 1.31,
          "Ocado": 1.41,
          "Waitrose": 1.51,
          "Aldi": 1.08,
          "Lidl": 1.1
        }
      },
      {
        "id": "gb-0167-spinach-200g",
        "name": "spinach 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.02,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"spinach 200g\",200,\"g\",1.02,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.02,
          "Tesco": 1.01,
          "Asda": 0.98,
          "Morrisons": 1.01,
          "Ocado": 1.09,
          "Waitrose": 1.17,
          "Aldi": 0.83,
          "Lidl": 0.85
        }
      },
      {
        "id": "gb-0168-courgettes-pack",
        "name": "courgettes pack",
        "packQty": 3,
        "unit": "each",
        "price": 1.37,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"courgettes pack\",3,\"each\",1.37,null,180,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 180
        },
        "retailerPrices": {
          "Sainsbury's": 1.37,
          "Tesco": 1.36,
          "Asda": 1.31,
          "Morrisons": 1.36,
          "Ocado": 1.47,
          "Waitrose": 1.57,
          "Aldi": 1.12,
          "Lidl": 1.14
        }
      },
      {
        "id": "gb-0169-cherry-tomatoes-250g",
        "name": "cherry tomatoes 250g",
        "packQty": 250,
        "unit": "g",
        "price": 0.77,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "baby plum tomatoes"
        ],
        "legacyKey": "[\"cherry tomatoes 250g\",250,\"g\",0.77,null,18,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 0.77,
          "Tesco": 0.76,
          "Asda": 0.74,
          "Morrisons": 0.76,
          "Ocado": 0.82,
          "Waitrose": 0.88,
          "Aldi": 0.63,
          "Lidl": 0.64
        }
      },
      {
        "id": "gb-0170-tomatoes-pack",
        "name": "tomatoes pack",
        "packQty": 6,
        "unit": "each",
        "price": 0.99,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "medium tomato"
        ],
        "legacyKey": "[\"tomatoes pack\",6,\"each\",0.99,null,80,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 80
        },
        "retailerPrices": {
          "Sainsbury's": 0.99,
          "Tesco": 0.98,
          "Asda": 0.95,
          "Morrisons": 0.98,
          "Ocado": 1.06,
          "Waitrose": 1.13,
          "Aldi": 0.81,
          "Lidl": 0.82
        }
      },
      {
        "id": "gb-0171-broccoli-head",
        "name": "broccoli head",
        "packQty": 1,
        "unit": "each",
        "price": 0.89,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"broccoli head\",1,\"each\",0.89,null,350,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 350
        },
        "retailerPrices": {
          "Sainsbury's": 0.89,
          "Tesco": 0.88,
          "Asda": 0.85,
          "Morrisons": 0.88,
          "Ocado": 0.95,
          "Waitrose": 1.02,
          "Aldi": 0.73,
          "Lidl": 0.74
        }
      },
      {
        "id": "gb-0172-carrots-1kg",
        "name": "carrots 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 0.69,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"carrots 1kg\",1000,\"g\",0.69,null,80,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 80
        },
        "retailerPrices": {
          "Sainsbury's": 0.69,
          "Tesco": 0.68,
          "Asda": 0.66,
          "Morrisons": 0.68,
          "Ocado": 0.74,
          "Waitrose": 0.79,
          "Aldi": 0.56,
          "Lidl": 0.57
        }
      },
      {
        "id": "gb-0173-aubergine",
        "name": "aubergine",
        "packQty": 1,
        "unit": "each",
        "price": 0.96,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"aubergine\",1,\"each\",0.96,null,300,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 300
        },
        "retailerPrices": {
          "Sainsbury's": 0.96,
          "Tesco": 0.95,
          "Asda": 0.92,
          "Morrisons": 0.95,
          "Ocado": 1.03,
          "Waitrose": 1.1,
          "Aldi": 0.79,
          "Lidl": 0.8
        }
      },
      {
        "id": "gb-0174-green-beans-200g",
        "name": "green beans 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.29,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"green beans 200g\",200,\"g\",1.29,null,8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 8
        },
        "retailerPrices": {
          "Sainsbury's": 1.29,
          "Tesco": 1.28,
          "Asda": 1.24,
          "Morrisons": 1.28,
          "Ocado": 1.38,
          "Waitrose": 1.48,
          "Aldi": 1.05,
          "Lidl": 1.07
        }
      },
      {
        "id": "gb-0175-sweetcorn-tin",
        "name": "sweetcorn tin",
        "packQty": 1,
        "unit": "tin",
        "price": 0.46,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"sweetcorn tin\",1,\"tin\",0.46,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.46,
          "Tesco": 0.46,
          "Asda": 0.44,
          "Morrisons": 0.46,
          "Ocado": 0.49,
          "Waitrose": 0.53,
          "Aldi": 0.38,
          "Lidl": 0.38
        }
      },
      {
        "id": "gb-0176-kale-200g",
        "name": "kale 200g",
        "packQty": 200,
        "unit": "g",
        "price": 0.91,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "chopped cavolo nero",
          "chopped kale",
          "shredded kale",
          "cavolo nero"
        ],
        "legacyKey": "[\"kale 200g\",200,\"g\",0.91,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.91,
          "Tesco": 0.9,
          "Asda": 0.87,
          "Morrisons": 0.9,
          "Ocado": 0.97,
          "Waitrose": 1.04,
          "Aldi": 0.74,
          "Lidl": 0.76
        }
      },
      {
        "id": "gb-0177-butternut-squash",
        "name": "butternut squash",
        "packQty": 1,
        "unit": "each",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"butternut squash\",1,\"each\",1.5,null,900,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 900
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0178-spring-onions-bunch",
        "name": "spring onions bunch",
        "packQty": 6,
        "unit": "each",
        "price": 0.69,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"spring onions bunch\",6,\"each\",0.69,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.69,
          "Tesco": 0.68,
          "Asda": 0.66,
          "Morrisons": 0.68,
          "Ocado": 0.74,
          "Waitrose": 0.79,
          "Aldi": 0.56,
          "Lidl": 0.57
        }
      },
      {
        "id": "gb-0179-red-onions-x3",
        "name": "red onions x3",
        "packQty": 3,
        "unit": "each",
        "price": 0.95,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"red onions x3\",3,\"each\",0.95,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.95,
          "Tesco": 0.94,
          "Asda": 0.91,
          "Morrisons": 0.94,
          "Ocado": 1.02,
          "Waitrose": 1.09,
          "Aldi": 0.78,
          "Lidl": 0.79
        }
      },
      {
        "id": "gb-0180-brown-onions-1kg",
        "name": "brown onions 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 0.97,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "onion",
          "onions"
        ],
        "legacyKey": "[\"brown onions 1kg\",1000,\"g\",0.97,null,150,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 150
        },
        "retailerPrices": {
          "Sainsbury's": 0.97,
          "Tesco": 0.96,
          "Asda": 0.93,
          "Morrisons": 0.96,
          "Ocado": 1.04,
          "Waitrose": 1.11,
          "Aldi": 0.79,
          "Lidl": 0.81
        }
      },
      {
        "id": "gb-0181-cabbage",
        "name": "cabbage",
        "packQty": 1,
        "unit": "each",
        "price": 0.78,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cabbage\",1,\"each\",0.78,null,700,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 700
        },
        "retailerPrices": {
          "Sainsbury's": 0.78,
          "Tesco": 0.77,
          "Asda": 0.75,
          "Morrisons": 0.77,
          "Ocado": 0.83,
          "Waitrose": 0.89,
          "Aldi": 0.64,
          "Lidl": 0.65
        }
      },
      {
        "id": "gb-0182-sweet-potatoes-1kg",
        "name": "sweet potatoes 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 1.2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "sweet potato"
        ],
        "legacyKey": "[\"sweet potatoes 1kg\",1000,\"g\",1.2,null,250,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 250
        },
        "retailerPrices": {
          "Sainsbury's": 1.2,
          "Tesco": 1.19,
          "Asda": 1.15,
          "Morrisons": 1.19,
          "Ocado": 1.28,
          "Waitrose": 1.37,
          "Aldi": 0.98,
          "Lidl": 1
        }
      },
      {
        "id": "gb-0183-cauliflower",
        "name": "cauliflower",
        "packQty": 1,
        "unit": "each",
        "price": 1.18,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cauliflower\",1,\"each\",1.18,null,600,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 600
        },
        "retailerPrices": {
          "Sainsbury's": 1.18,
          "Tesco": 1.17,
          "Asda": 1.13,
          "Morrisons": 1.17,
          "Ocado": 1.26,
          "Waitrose": 1.35,
          "Aldi": 0.97,
          "Lidl": 0.98
        }
      },
      {
        "id": "gb-0184-lettuce-or-salad-leaves",
        "name": "lettuce or salad leaves",
        "packQty": 1,
        "unit": "each",
        "price": 0.93,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"lettuce or salad leaves\",1,\"each\",0.93,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.93,
          "Tesco": 0.92,
          "Asda": 0.89,
          "Morrisons": 0.92,
          "Ocado": 1,
          "Waitrose": 1.07,
          "Aldi": 0.76,
          "Lidl": 0.77
        }
      },
      {
        "id": "gb-0185-cucumber",
        "name": "cucumber",
        "packQty": 1,
        "unit": "each",
        "price": 0.99,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cucumber\",1,\"each\",0.99,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 250,
          "sliceWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 0.99,
          "Tesco": 0.98,
          "Asda": 0.95,
          "Morrisons": 0.98,
          "Ocado": 1.06,
          "Waitrose": 1.13,
          "Aldi": 0.81,
          "Lidl": 0.82
        }
      },
      {
        "id": "gb-0186-berries-300g",
        "name": "berries 300g",
        "packQty": 300,
        "unit": "g",
        "price": 3.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"berries 300g\",300,\"g\",3.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.75,
          "Tesco": 3.72,
          "Asda": 3.59,
          "Morrisons": 3.71,
          "Ocado": 4.01,
          "Waitrose": 4.3,
          "Aldi": 3.07,
          "Lidl": 3.11
        }
      },
      {
        "id": "gb-0187-bananas-x5",
        "name": "bananas x5",
        "packQty": 5,
        "unit": "each",
        "price": 0.78,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"bananas x5\",5,\"each\",0.78,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.78,
          "Tesco": 0.77,
          "Asda": 0.75,
          "Morrisons": 0.77,
          "Ocado": 0.83,
          "Waitrose": 0.89,
          "Aldi": 0.64,
          "Lidl": 0.65
        }
      },
      {
        "id": "gb-0188-chopped-tomatoes-400g",
        "name": "chopped tomatoes 400g",
        "packQty": 1,
        "unit": "tin",
        "price": 0.46,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"chopped tomatoes 400g\",1,\"tin\",0.46,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.46,
          "Tesco": 0.46,
          "Asda": 0.44,
          "Morrisons": 0.46,
          "Ocado": 0.49,
          "Waitrose": 0.53,
          "Aldi": 0.38,
          "Lidl": 0.38
        }
      },
      {
        "id": "gb-0189-passata-500g",
        "name": "passata 500g",
        "packQty": 500,
        "unit": "g",
        "price": 0.61,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"passata 500g\",500,\"g\",0.61,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.61,
          "Tesco": 0.61,
          "Asda": 0.58,
          "Morrisons": 0.6,
          "Ocado": 0.65,
          "Waitrose": 0.7,
          "Aldi": 0.5,
          "Lidl": 0.51
        }
      },
      {
        "id": "gb-0190-coconut-milk-400ml-tin",
        "name": "coconut milk 400ml tin",
        "packQty": 400,
        "unit": "ml",
        "price": 0.9,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"coconut milk 400ml tin\",400,\"ml\",0.9,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.9,
          "Tesco": 0.89,
          "Asda": 0.86,
          "Morrisons": 0.89,
          "Ocado": 0.96,
          "Waitrose": 1.03,
          "Aldi": 0.74,
          "Lidl": 0.75
        }
      },
      {
        "id": "gb-0191-vegetable-stock-cubes",
        "name": "vegetable stock cubes",
        "packQty": 5000,
        "unit": "ml",
        "price": 1.27,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"vegetable stock cubes\",5000,\"ml\",1.27,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.27,
          "Tesco": 1.26,
          "Asda": 1.22,
          "Morrisons": 1.26,
          "Ocado": 1.36,
          "Waitrose": 1.45,
          "Aldi": 1.04,
          "Lidl": 1.05
        }
      },
      {
        "id": "gb-0192-beef-stock-cubes",
        "name": "beef stock cubes",
        "packQty": 5000,
        "unit": "ml",
        "price": 1.27,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"beef stock cubes\",5000,\"ml\",1.27,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.27,
          "Tesco": 1.26,
          "Asda": 1.22,
          "Morrisons": 1.26,
          "Ocado": 1.36,
          "Waitrose": 1.45,
          "Aldi": 1.04,
          "Lidl": 1.05
        }
      },
      {
        "id": "gb-0193-tomato-puree-200g",
        "name": "tomato puree 200g",
        "packQty": 200,
        "unit": "g",
        "price": 0.61,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"tomato puree 200g\",200,\"g\",0.61,null,null,null,6,18,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 0.61,
          "Tesco": 0.61,
          "Asda": 0.58,
          "Morrisons": 0.6,
          "Ocado": 0.65,
          "Waitrose": 0.7,
          "Aldi": 0.5,
          "Lidl": 0.51
        }
      },
      {
        "id": "gb-0194-green-pesto-190g",
        "name": "green pesto 190g",
        "packQty": 190,
        "unit": "g",
        "price": 1.02,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "basil pesto with cashew nuts"
        ],
        "legacyKey": "[\"green pesto 190g\",190,\"g\",1.02,null,null,null,5,16,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 16
        },
        "retailerPrices": {
          "Sainsbury's": 1.02,
          "Tesco": 1.01,
          "Asda": 0.98,
          "Morrisons": 1.01,
          "Ocado": 1.09,
          "Waitrose": 1.17,
          "Aldi": 0.83,
          "Lidl": 0.85
        }
      },
      {
        "id": "gb-0195-harissa-paste-130g",
        "name": "harissa paste 130g",
        "packQty": 130,
        "unit": "g",
        "price": 2.72,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"harissa paste 130g\",130,\"g\",2.72,null,null,null,6,18,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 2.72,
          "Tesco": 2.7,
          "Asda": 2.6,
          "Morrisons": 2.69,
          "Ocado": 2.91,
          "Waitrose": 3.12,
          "Aldi": 2.22,
          "Lidl": 2.26
        }
      },
      {
        "id": "gb-0196-miso-paste-150g",
        "name": "miso paste 150g",
        "packQty": 150,
        "unit": "g",
        "price": 2.54,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"miso paste 150g\",150,\"g\",2.54,null,null,null,6,18,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 2.54,
          "Tesco": 2.52,
          "Asda": 2.43,
          "Morrisons": 2.52,
          "Ocado": 2.72,
          "Waitrose": 2.91,
          "Aldi": 2.08,
          "Lidl": 2.11
        }
      },
      {
        "id": "gb-0197-tahini-300g",
        "name": "tahini 300g",
        "packQty": 300,
        "unit": "g",
        "price": 3.05,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"tahini 300g\",300,\"g\",3.05,null,null,null,5,15,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 3.05,
          "Tesco": 3.03,
          "Asda": 2.92,
          "Morrisons": 3.02,
          "Ocado": 3.26,
          "Waitrose": 3.49,
          "Aldi": 2.49,
          "Lidl": 2.53
        }
      },
      {
        "id": "gb-0198-peanut-butter-340g",
        "name": "peanut butter 340g",
        "packQty": 340,
        "unit": "g",
        "price": 1.07,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"peanut butter 340g\",340,\"g\",1.07,null,null,null,5,16,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 16
        },
        "retailerPrices": {
          "Sainsbury's": 1.07,
          "Tesco": 1.06,
          "Asda": 1.02,
          "Morrisons": 1.06,
          "Ocado": 1.14,
          "Waitrose": 1.23,
          "Aldi": 0.88,
          "Lidl": 0.89
        }
      },
      {
        "id": "gb-0199-soy-sauce-150ml",
        "name": "soy sauce 150ml",
        "packQty": 150,
        "unit": "ml",
        "price": 0.58,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"soy sauce 150ml\",150,\"ml\",0.58,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.58,
          "Tesco": 0.58,
          "Asda": 0.56,
          "Morrisons": 0.57,
          "Ocado": 0.62,
          "Waitrose": 0.66,
          "Aldi": 0.47,
          "Lidl": 0.48
        }
      },
      {
        "id": "gb-0200-teriyaki-sauce-150ml",
        "name": "teriyaki sauce 150ml",
        "packQty": 150,
        "unit": "ml",
        "price": 1.32,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"teriyaki sauce 150ml\",150,\"ml\",1.32,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.32,
          "Tesco": 1.31,
          "Asda": 1.26,
          "Morrisons": 1.31,
          "Ocado": 1.41,
          "Waitrose": 1.51,
          "Aldi": 1.08,
          "Lidl": 1.1
        }
      },
      {
        "id": "gb-0201-sweet-chilli-sauce-300ml",
        "name": "sweet chilli sauce 300ml",
        "packQty": 300,
        "unit": "ml",
        "price": 1.86,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"sweet chilli sauce 300ml\",300,\"ml\",1.86,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.86,
          "Tesco": 1.85,
          "Asda": 1.78,
          "Morrisons": 1.84,
          "Ocado": 1.99,
          "Waitrose": 2.13,
          "Aldi": 1.52,
          "Lidl": 1.54
        }
      },
      {
        "id": "gb-0202-maple-syrup-250ml",
        "name": "maple syrup 250ml",
        "packQty": 250,
        "unit": "ml",
        "price": 4.76,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"maple syrup 250ml\",250,\"ml\",4.76,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 4.76,
          "Tesco": 4.72,
          "Asda": 4.56,
          "Morrisons": 4.71,
          "Ocado": 5.09,
          "Waitrose": 5.45,
          "Aldi": 3.89,
          "Lidl": 3.95
        }
      },
      {
        "id": "gb-0203-runny-honey-340g",
        "name": "runny honey 340g",
        "packQty": 340,
        "unit": "g",
        "price": 1.12,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"runny honey 340g\",340,\"g\",1.12,null,null,null,7,21,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 7,
          "tbspWeight": 21
        },
        "retailerPrices": {
          "Sainsbury's": 1.12,
          "Tesco": 1.11,
          "Asda": 1.07,
          "Morrisons": 1.11,
          "Ocado": 1.2,
          "Waitrose": 1.28,
          "Aldi": 0.92,
          "Lidl": 0.93
        }
      },
      {
        "id": "gb-0204-mustard-185g",
        "name": "mustard 185g",
        "packQty": 185,
        "unit": "g",
        "price": 0.46,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"mustard 185g\",185,\"g\",0.46,null,null,null,5,15,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 0.46,
          "Tesco": 0.46,
          "Asda": 0.44,
          "Morrisons": 0.46,
          "Ocado": 0.49,
          "Waitrose": 0.53,
          "Aldi": 0.38,
          "Lidl": 0.38
        }
      },
      {
        "id": "gb-0205-garlic-bulbs-equivalent",
        "name": "garlic bulbs equivalent",
        "packQty": 40,
        "unit": "clove",
        "price": 0.87,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"garlic bulbs equivalent\",40,\"clove\",0.87,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.87,
          "Tesco": 0.86,
          "Asda": 0.83,
          "Morrisons": 0.86,
          "Ocado": 0.93,
          "Waitrose": 1,
          "Aldi": 0.71,
          "Lidl": 0.72
        }
      },
      {
        "id": "gb-0206-fresh-ginger-100g",
        "name": "fresh ginger 100g",
        "packQty": 100,
        "unit": "g",
        "price": 0.86,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"fresh ginger 100g\",100,\"g\",0.86,null,null,null,5,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 5
        },
        "retailerPrices": {
          "Sainsbury's": 0.86,
          "Tesco": 0.85,
          "Asda": 0.82,
          "Morrisons": 0.85,
          "Ocado": 0.92,
          "Waitrose": 0.99,
          "Aldi": 0.7,
          "Lidl": 0.71
        }
      },
      {
        "id": "gb-0207-dried-herbs-jar",
        "name": "dried herbs jar",
        "packQty": 14,
        "unit": "g",
        "price": 0.9,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"dried herbs jar\",14,\"g\",0.9,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 1
        },
        "retailerPrices": {
          "Sainsbury's": 0.9,
          "Tesco": 0.89,
          "Asda": 0.86,
          "Morrisons": 0.89,
          "Ocado": 0.96,
          "Waitrose": 1.03,
          "Aldi": 0.74,
          "Lidl": 0.75
        }
      },
      {
        "id": "gb-0208-paprika-jar",
        "name": "paprika jar",
        "packQty": 45,
        "unit": "g",
        "price": 1.1,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"paprika jar\",45,\"g\",1.1,null,null,null,2.3,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 2.3
        },
        "retailerPrices": {
          "Sainsbury's": 1.1,
          "Tesco": 1.09,
          "Asda": 1.05,
          "Morrisons": 1.09,
          "Ocado": 1.18,
          "Waitrose": 1.26,
          "Aldi": 0.9,
          "Lidl": 0.91
        }
      },
      {
        "id": "gb-0209-ground-cumin-jar",
        "name": "ground cumin jar",
        "packQty": 40,
        "unit": "g",
        "price": 1.08,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"ground cumin jar\",40,\"g\",1.08,null,null,null,2.2,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 2.2
        },
        "retailerPrices": {
          "Sainsbury's": 1.08,
          "Tesco": 1.07,
          "Asda": 1.03,
          "Morrisons": 1.07,
          "Ocado": 1.16,
          "Waitrose": 1.24,
          "Aldi": 0.88,
          "Lidl": 0.9
        }
      },
      {
        "id": "gb-0210-garam-masala-jar",
        "name": "garam masala jar",
        "packQty": 42,
        "unit": "g",
        "price": 1.19,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"garam masala jar\",42,\"g\",1.19,null,null,null,2.2,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 2.2
        },
        "retailerPrices": {
          "Sainsbury's": 1.19,
          "Tesco": 1.18,
          "Asda": 1.14,
          "Morrisons": 1.18,
          "Ocado": 1.27,
          "Waitrose": 1.36,
          "Aldi": 0.97,
          "Lidl": 0.99
        }
      },
      {
        "id": "gb-0211-jerk-seasoning-jar",
        "name": "jerk seasoning jar",
        "packQty": 300,
        "unit": "g",
        "price": 2.54,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"jerk seasoning jar\",300,\"g\",2.54,null,null,null,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 2.5
        },
        "retailerPrices": {
          "Sainsbury's": 2.54,
          "Tesco": 2.52,
          "Asda": 2.43,
          "Morrisons": 2.52,
          "Ocado": 2.72,
          "Waitrose": 2.91,
          "Aldi": 2.08,
          "Lidl": 2.11
        }
      },
      {
        "id": "gb-0212-sesame-seeds-100g",
        "name": "sesame seeds 100g",
        "packQty": 100,
        "unit": "g",
        "price": 1.2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"sesame seeds 100g\",100,\"g\",1.2,null,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 3
        },
        "retailerPrices": {
          "Sainsbury's": 1.2,
          "Tesco": 1.19,
          "Asda": 1.15,
          "Morrisons": 1.19,
          "Ocado": 1.28,
          "Waitrose": 1.37,
          "Aldi": 0.98,
          "Lidl": 1
        }
      },
      {
        "id": "gb-0213-brown-sugar-500g",
        "name": "brown sugar 500g",
        "packQty": 500,
        "unit": "g",
        "price": 1.95,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"brown sugar 500g\",500,\"g\",1.95,null,null,null,4,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 4
        },
        "retailerPrices": {
          "Sainsbury's": 1.95,
          "Tesco": 1.93,
          "Asda": 1.87,
          "Morrisons": 1.93,
          "Ocado": 2.09,
          "Waitrose": 2.23,
          "Aldi": 1.59,
          "Lidl": 1.62
        }
      },
      {
        "id": "gb-0214-lemons-x4",
        "name": "lemons x4",
        "packQty": 4,
        "unit": "each",
        "price": 1.18,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"lemons x4\",4,\"each\",1.18,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.18,
          "Tesco": 1.17,
          "Asda": 1.13,
          "Morrisons": 1.17,
          "Ocado": 1.26,
          "Waitrose": 1.35,
          "Aldi": 0.97,
          "Lidl": 0.98
        }
      },
      {
        "id": "gb-0215-limes-x4",
        "name": "limes x4",
        "packQty": 4,
        "unit": "each",
        "price": 1.05,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"limes x4\",4,\"each\",1.05,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.05,
          "Tesco": 1.04,
          "Asda": 1.01,
          "Morrisons": 1.04,
          "Ocado": 1.12,
          "Waitrose": 1.2,
          "Aldi": 0.86,
          "Lidl": 0.87
        }
      },
      {
        "id": "gb-0216-pak-choi-x2",
        "name": "pak choi x2",
        "packQty": 2,
        "unit": "each",
        "price": 1.41,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"pak choi x2\",2,\"each\",1.41,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.41,
          "Tesco": 1.4,
          "Asda": 1.35,
          "Morrisons": 1.4,
          "Ocado": 1.51,
          "Waitrose": 1.62,
          "Aldi": 1.15,
          "Lidl": 1.17
        }
      },
      {
        "id": "gb-0217-rocket-60g",
        "name": "rocket 60g",
        "packQty": 60,
        "unit": "g",
        "price": 0.91,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"rocket 60g\",60,\"g\",0.91,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "handfulWeight": 20
        },
        "retailerPrices": {
          "Sainsbury's": 0.91,
          "Tesco": 0.9,
          "Asda": 0.87,
          "Morrisons": 0.9,
          "Ocado": 0.97,
          "Waitrose": 1.04,
          "Aldi": 0.74,
          "Lidl": 0.76
        }
      },
      {
        "id": "gb-0218-fresh-coriander-30g",
        "name": "fresh coriander 30g",
        "packQty": 30,
        "unit": "g",
        "price": 0.56,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"fresh coriander 30g\",30,\"g\",0.56,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.56,
          "Tesco": 0.56,
          "Asda": 0.54,
          "Morrisons": 0.55,
          "Ocado": 0.6,
          "Waitrose": 0.64,
          "Aldi": 0.46,
          "Lidl": 0.46
        }
      },
      {
        "id": "gb-0219-fresh-chives-20g",
        "name": "fresh chives 20g",
        "packQty": 20,
        "unit": "g",
        "price": 0.61,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"fresh chives 20g\",20,\"g\",0.61,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.61,
          "Tesco": 0.61,
          "Asda": 0.58,
          "Morrisons": 0.6,
          "Ocado": 0.65,
          "Waitrose": 0.7,
          "Aldi": 0.5,
          "Lidl": 0.51
        }
      },
      {
        "id": "gb-0220-fresh-basil-30g",
        "name": "fresh basil 30g",
        "packQty": 30,
        "unit": "g",
        "price": 0.55,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"fresh basil 30g\",30,\"g\",0.55,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.55,
          "Tesco": 0.55,
          "Asda": 0.53,
          "Morrisons": 0.54,
          "Ocado": 0.59,
          "Waitrose": 0.63,
          "Aldi": 0.45,
          "Lidl": 0.46
        }
      },
      {
        "id": "gb-0221-fresh-mint-30g",
        "name": "fresh mint 30g",
        "packQty": 30,
        "unit": "g",
        "price": 0.55,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"fresh mint 30g\",30,\"g\",0.55,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.55,
          "Tesco": 0.55,
          "Asda": 0.53,
          "Morrisons": 0.54,
          "Ocado": 0.59,
          "Waitrose": 0.63,
          "Aldi": 0.45,
          "Lidl": 0.46
        }
      },
      {
        "id": "gb-0222-fresh-parsley-30g",
        "name": "fresh parsley 30g",
        "packQty": 30,
        "unit": "g",
        "price": 0.55,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"fresh parsley 30g\",30,\"g\",0.55,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.55,
          "Tesco": 0.55,
          "Asda": 0.53,
          "Morrisons": 0.54,
          "Ocado": 0.59,
          "Waitrose": 0.63,
          "Aldi": 0.45,
          "Lidl": 0.46
        }
      },
      {
        "id": "gb-0223-celery-bunch",
        "name": "celery bunch",
        "packQty": 8,
        "unit": "each",
        "price": 0.71,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"celery bunch\",8,\"each\",0.71,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.71,
          "Tesco": 0.7,
          "Asda": 0.68,
          "Morrisons": 0.7,
          "Ocado": 0.76,
          "Waitrose": 0.81,
          "Aldi": 0.58,
          "Lidl": 0.59
        }
      },
      {
        "id": "gb-0224-worcestershire-sauce-150ml",
        "name": "Worcestershire sauce 150ml",
        "packQty": 150,
        "unit": "ml",
        "price": 1.3,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"Worcestershire sauce 150ml\",150,\"ml\",1.3,null,null,null,5,15,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 1.3,
          "Tesco": 1.29,
          "Asda": 1.24,
          "Morrisons": 1.29,
          "Ocado": 1.39,
          "Waitrose": 1.49,
          "Aldi": 1.06,
          "Lidl": 1.08
        }
      },
      {
        "id": "gb-0225-cornflour-250g",
        "name": "cornflour 250g",
        "packQty": 250,
        "unit": "g",
        "price": 1.29,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cornflour 250g\",250,\"g\",1.29,null,null,null,3,8,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 3,
          "tbspWeight": 8
        },
        "retailerPrices": {
          "Sainsbury's": 1.29,
          "Tesco": 1.28,
          "Asda": 1.24,
          "Morrisons": 1.28,
          "Ocado": 1.38,
          "Waitrose": 1.48,
          "Aldi": 1.05,
          "Lidl": 1.07
        }
      },
      {
        "id": "gb-0226-curry-paste-jar",
        "name": "curry paste jar",
        "packQty": 180,
        "unit": "g",
        "price": 1.99,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "red thai style paste",
          "yellow thai style paste",
          "thai green style paste"
        ],
        "legacyKey": "[\"curry paste jar\",180,\"g\",1.99,null,null,null,6,18,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 1.99,
          "Tesco": 1.97,
          "Asda": 1.91,
          "Morrisons": 1.97,
          "Ocado": 2.13,
          "Waitrose": 2.28,
          "Aldi": 1.63,
          "Lidl": 1.65
        }
      },
      {
        "id": "gb-0227-raisins-500g",
        "name": "raisins 500g",
        "packQty": 500,
        "unit": "g",
        "price": 2.17,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"raisins 500g\",500,\"g\",2.17,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.17,
          "Tesco": 2.15,
          "Asda": 2.08,
          "Morrisons": 2.15,
          "Ocado": 2.32,
          "Waitrose": 2.49,
          "Aldi": 1.77,
          "Lidl": 1.8
        }
      },
      {
        "id": "gb-0228-chermoula-seasoning",
        "name": "chermoula seasoning",
        "packQty": 35,
        "unit": "g",
        "price": 7.49,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"chermoula seasoning\",35,\"g\",7.49,null,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "current-market-check",
        "conversionHints": {
          "tspWeight": 3
        },
        "retailerPrices": {
          "Sainsbury's": 7.49,
          "Tesco": 7.43,
          "Asda": 7.17,
          "Morrisons": 7.42,
          "Ocado": 8.01,
          "Waitrose": 8.58,
          "Aldi": 6.13,
          "Lidl": 6.22
        }
      },
      {
        "id": "gb-0229-cooking-oil-1-litre",
        "name": "cooking oil 1 litre",
        "packQty": 1000,
        "unit": "ml",
        "price": 1.49,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "oil for the breadcrumbs",
          "olive oil for the garlic bread"
        ],
        "legacyKey": "[\"cooking oil 1 litre\",1000,\"ml\",1.49,null,null,null,5,15,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 1.49,
          "Tesco": 1.48,
          "Asda": 1.43,
          "Morrisons": 1.48,
          "Ocado": 1.59,
          "Waitrose": 1.71,
          "Aldi": 1.22,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0230-balsamic-vinegar-250ml",
        "name": "balsamic vinegar 250ml",
        "packQty": 250,
        "unit": "ml",
        "price": 1.63,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"balsamic vinegar 250ml\",250,\"ml\",1.63,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.63,
          "Tesco": 1.62,
          "Asda": 1.56,
          "Morrisons": 1.61,
          "Ocado": 1.74,
          "Waitrose": 1.87,
          "Aldi": 1.33,
          "Lidl": 1.35
        }
      },
      {
        "id": "gb-0231-sun-dried-tomato-paste",
        "name": "sun-dried tomato paste",
        "packQty": 90,
        "unit": "g",
        "price": 0.81,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"sun-dried tomato paste\",90,\"g\",0.81,null,null,null,6,18,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 0.81,
          "Tesco": 0.8,
          "Asda": 0.78,
          "Morrisons": 0.8,
          "Ocado": 0.87,
          "Waitrose": 0.93,
          "Aldi": 0.66,
          "Lidl": 0.67
        }
      },
      {
        "id": "gb-0232-chicken-stock-cubes",
        "name": "chicken stock cubes",
        "packQty": 12,
        "unit": "each",
        "price": 1.3,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"chicken stock cubes\",12,\"each\",1.3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.3,
          "Tesco": 1.29,
          "Asda": 1.24,
          "Morrisons": 1.29,
          "Ocado": 1.39,
          "Waitrose": 1.49,
          "Aldi": 1.06,
          "Lidl": 1.08
        }
      },
      {
        "id": "gb-0233-butter-500g",
        "name": "butter 500g",
        "packQty": 500,
        "unit": "g",
        "price": 3.7,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"butter 500g\",500,\"g\",3.7,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.7,
          "Tesco": 3.67,
          "Asda": 3.54,
          "Morrisons": 3.66,
          "Ocado": 3.96,
          "Waitrose": 4.24,
          "Aldi": 3.03,
          "Lidl": 3.07
        }
      },
      {
        "id": "gb-0234-ground-turmeric-jar",
        "name": "ground turmeric jar",
        "packQty": 45,
        "unit": "g",
        "price": 1.04,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"ground turmeric jar\",45,\"g\",1.04,null,null,null,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 2.5
        },
        "retailerPrices": {
          "Sainsbury's": 1.04,
          "Tesco": 1.03,
          "Asda": 1,
          "Morrisons": 1.03,
          "Ocado": 1.11,
          "Waitrose": 1.19,
          "Aldi": 0.85,
          "Lidl": 0.86
        }
      },
      {
        "id": "gb-0235-ground-cinnamon-jar",
        "name": "ground cinnamon jar",
        "packQty": 40,
        "unit": "g",
        "price": 1.18,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"ground cinnamon jar\",40,\"g\",1.18,null,null,null,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 2.5
        },
        "retailerPrices": {
          "Sainsbury's": 1.18,
          "Tesco": 1.17,
          "Asda": 1.13,
          "Morrisons": 1.17,
          "Ocado": 1.26,
          "Waitrose": 1.35,
          "Aldi": 0.97,
          "Lidl": 0.98
        }
      },
      {
        "id": "gb-0236-whole-cloves-jar",
        "name": "whole cloves jar",
        "packQty": 30,
        "unit": "g",
        "price": 1.05,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"whole cloves jar\",30,\"g\",1.05,null,0.2,null,2,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "eachWeight": 0.2,
          "tspWeight": 2
        },
        "retailerPrices": {
          "Sainsbury's": 1.05,
          "Tesco": 1.04,
          "Asda": 1.01,
          "Morrisons": 1.04,
          "Ocado": 1.12,
          "Waitrose": 1.2,
          "Aldi": 0.86,
          "Lidl": 0.87
        }
      },
      {
        "id": "gb-0237-red-chillies-x3",
        "name": "red chillies x3",
        "packQty": 3,
        "unit": "each",
        "price": 0.55,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"red chillies x3\",3,\"each\",0.55,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.55,
          "Tesco": 0.55,
          "Asda": 0.53,
          "Morrisons": 0.54,
          "Ocado": 0.59,
          "Waitrose": 0.63,
          "Aldi": 0.45,
          "Lidl": 0.46
        }
      },
      {
        "id": "gb-0238-granulated-sugar-1kg",
        "name": "granulated sugar 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 1.12,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"granulated sugar 1kg\",1000,\"g\",1.12,null,null,null,4,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 4
        },
        "retailerPrices": {
          "Sainsbury's": 1.12,
          "Tesco": 1.11,
          "Asda": 1.07,
          "Morrisons": 1.11,
          "Ocado": 1.2,
          "Waitrose": 1.28,
          "Aldi": 0.92,
          "Lidl": 0.93
        }
      },
      {
        "id": "gb-0239-table-salt-750g",
        "name": "table salt 750g",
        "packQty": 750,
        "unit": "g",
        "price": 0.74,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "salt for the tofu"
        ],
        "legacyKey": "[\"table salt 750g\",750,\"g\",0.74,null,null,null,6,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 6
        },
        "retailerPrices": {
          "Sainsbury's": 0.74,
          "Tesco": 0.73,
          "Asda": 0.71,
          "Morrisons": 0.73,
          "Ocado": 0.79,
          "Waitrose": 0.85,
          "Aldi": 0.61,
          "Lidl": 0.61
        }
      },
      {
        "id": "gb-0240-black-pepper-50g",
        "name": "black pepper 50g",
        "packQty": 50,
        "unit": "g",
        "price": 1.52,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"black pepper 50g\",50,\"g\",1.52,null,null,null,2.3,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {
          "tspWeight": 2.3
        },
        "retailerPrices": {
          "Sainsbury's": 1.52,
          "Tesco": 1.51,
          "Asda": 1.46,
          "Morrisons": 1.51,
          "Ocado": 1.63,
          "Waitrose": 1.74,
          "Aldi": 1.24,
          "Lidl": 1.26
        }
      },
      {
        "id": "gb-0241-medium-eggs-x12",
        "name": "medium eggs x12",
        "packQty": 12,
        "unit": "each",
        "price": 2.84,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"medium eggs x12\",12,\"each\",2.84,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.84,
          "Tesco": 2.82,
          "Asda": 2.72,
          "Morrisons": 2.81,
          "Ocado": 3.04,
          "Waitrose": 3.25,
          "Aldi": 2.32,
          "Lidl": 2.36
        }
      },
      {
        "id": "gb-0242-bread-loaf",
        "name": "bread loaf",
        "packQty": 1,
        "unit": "pack",
        "price": 0.78,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"bread loaf\",1,\"pack\",0.78,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.78,
          "Tesco": 0.77,
          "Asda": 0.75,
          "Morrisons": 0.77,
          "Ocado": 0.83,
          "Waitrose": 0.89,
          "Aldi": 0.64,
          "Lidl": 0.65
        }
      },
      {
        "id": "gb-0243-cereal-pack",
        "name": "cereal pack",
        "packQty": 1,
        "unit": "pack",
        "price": 5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cereal pack\",1,\"pack\",5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 5,
          "Tesco": 4.96,
          "Asda": 4.79,
          "Morrisons": 4.95,
          "Ocado": 5.35,
          "Waitrose": 5.73,
          "Aldi": 4.09,
          "Lidl": 4.15
        }
      },
      {
        "id": "gb-0244-cheese-pack",
        "name": "cheese pack",
        "packQty": 1,
        "unit": "pack",
        "price": 3.01,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [],
        "legacyKey": "[\"cheese pack\",1,\"pack\",3.01,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "market-average",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.01,
          "Tesco": 2.99,
          "Asda": 2.88,
          "Morrisons": 2.98,
          "Ocado": 3.22,
          "Waitrose": 3.45,
          "Aldi": 2.46,
          "Lidl": 2.5
        }
      },
      {
        "id": "gb-0245-cooking-oil-1-litre",
        "name": "cooking oil 1 litre",
        "packQty": 1000,
        "unit": "ml",
        "price": 1.49,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "cooking oil",
          "olive oil"
        ],
        "legacyKey": "[\"cooking oil 1 litre\",1000,\"ml\",1.49,null,null,null,5,15,0.92,15,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "gramsPerMl": 0.92,
          "defaultUsage": 15
        },
        "retailerPrices": {
          "Sainsbury's": 1.49,
          "Tesco": 1.48,
          "Asda": 1.43,
          "Morrisons": 1.48,
          "Ocado": 1.59,
          "Waitrose": 1.71,
          "Aldi": 1.22,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0246-table-salt-750g",
        "name": "table salt 750g",
        "packQty": 750,
        "unit": "g",
        "price": 0.74,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "salt"
        ],
        "legacyKey": "[\"table salt 750g\",750,\"g\",0.74,null,null,null,6,null,null,1,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 6,
          "defaultUsage": 1
        },
        "retailerPrices": {
          "Sainsbury's": 0.74,
          "Tesco": 0.73,
          "Asda": 0.71,
          "Morrisons": 0.73,
          "Ocado": 0.79,
          "Waitrose": 0.85,
          "Aldi": 0.61,
          "Lidl": 0.61
        }
      },
      {
        "id": "gb-0247-black-pepper-50g",
        "name": "black pepper 50g",
        "packQty": 50,
        "unit": "g",
        "price": 1.52,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "black pepper",
          "cracked black pepper",
          "pepper"
        ],
        "legacyKey": "[\"black pepper 50g\",50,\"g\",1.52,null,null,null,2.3,null,null,1,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 2.3,
          "defaultUsage": 1
        },
        "retailerPrices": {
          "Sainsbury's": 1.52,
          "Tesco": 1.51,
          "Asda": 1.46,
          "Morrisons": 1.51,
          "Ocado": 1.63,
          "Waitrose": 1.74,
          "Aldi": 1.24,
          "Lidl": 1.26
        }
      },
      {
        "id": "gb-0248-granulated-sugar-1kg",
        "name": "granulated sugar 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 1.12,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "sugar"
        ],
        "legacyKey": "[\"granulated sugar 1kg\",1000,\"g\",1.12,null,null,null,4,null,null,4,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 4,
          "defaultUsage": 4
        },
        "retailerPrices": {
          "Sainsbury's": 1.12,
          "Tesco": 1.11,
          "Asda": 1.07,
          "Morrisons": 1.11,
          "Ocado": 1.2,
          "Waitrose": 1.28,
          "Aldi": 0.92,
          "Lidl": 0.93
        }
      },
      {
        "id": "gb-0249-chicken-stock-pots-112g",
        "name": "chicken stock pots 112g",
        "packQty": 112,
        "unit": "g",
        "price": 1.45,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "chicken stock paste"
        ],
        "legacyKey": "[\"chicken stock pots 112g\",112,\"g\",1.45,1.45,null,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.45,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "gramsPerMl": 1
        },
        "retailerPrices": {
          "Sainsbury's": 1.45,
          "Tesco": 1.44,
          "Asda": 1.39,
          "Morrisons": 1.44,
          "Ocado": 1.55,
          "Waitrose": 1.66,
          "Aldi": 1.19,
          "Lidl": 1.2
        }
      },
      {
        "id": "gb-0250-vegetable-stock-pots-112g",
        "name": "vegetable stock pots 112g",
        "packQty": 112,
        "unit": "g",
        "price": 1.45,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "vegetable stock paste"
        ],
        "legacyKey": "[\"vegetable stock pots 112g\",112,\"g\",1.45,1.45,null,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.45,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "gramsPerMl": 1
        },
        "retailerPrices": {
          "Sainsbury's": 1.45,
          "Tesco": 1.44,
          "Asda": 1.39,
          "Morrisons": 1.44,
          "Ocado": 1.55,
          "Waitrose": 1.66,
          "Aldi": 1.19,
          "Lidl": 1.2
        }
      },
      {
        "id": "gb-0251-baby-leaf-salad-90g",
        "name": "baby leaf salad 90g",
        "packQty": 90,
        "unit": "g",
        "price": 0.9,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "baby leaf mix",
          "baby leaf salad"
        ],
        "legacyKey": "[\"baby leaf salad 90g\",90,\"g\",0.9,0.9,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.9,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.9,
          "Tesco": 0.89,
          "Asda": 0.86,
          "Morrisons": 0.89,
          "Ocado": 0.96,
          "Waitrose": 1.03,
          "Aldi": 0.74,
          "Lidl": 0.75
        }
      },
      {
        "id": "gb-0252-sainsburys-honey-roast-ham-120g",
        "name": "Sainsburys honey roast ham 120g",
        "packQty": 120,
        "unit": "g",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "ham",
          "smoked ham",
          "honey roast ham"
        ],
        "legacyKey": "[\"Sainsburys honey roast ham 120g\",120,\"g\",2,2,null,null,null,null,null,null,null,null,20,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "sliceWeight": 20
        },
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0253-ciabatta-rolls-x4",
        "name": "ciabatta rolls x4",
        "packQty": 4,
        "unit": "each",
        "price": 1.3,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "ciabatta"
        ],
        "legacyKey": "[\"ciabatta rolls x4\",4,\"each\",1.3,1.3,90,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.3,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 90
        },
        "retailerPrices": {
          "Sainsbury's": 1.3,
          "Tesco": 1.29,
          "Asda": 1.24,
          "Morrisons": 1.29,
          "Ocado": 1.39,
          "Waitrose": 1.49,
          "Aldi": 1.06,
          "Lidl": 1.08
        }
      },
      {
        "id": "gb-0254-jasmine-rice-1kg",
        "name": "jasmine rice 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 3.2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "jasmine rice"
        ],
        "legacyKey": "[\"jasmine rice 1kg\",1000,\"g\",3.2,3.2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 3.2,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.2,
          "Tesco": 3.17,
          "Asda": 3.06,
          "Morrisons": 3.17,
          "Ocado": 3.42,
          "Waitrose": 3.67,
          "Aldi": 2.62,
          "Lidl": 2.66
        }
      },
      {
        "id": "gb-0255-cooking-oil-1-litre",
        "name": "cooking oil 1 litre",
        "packQty": 1000,
        "unit": "ml",
        "price": 1.49,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "extra virgin rapeseed oil"
        ],
        "legacyKey": "[\"cooking oil 1 litre\",1000,\"ml\",1.49,null,null,null,5,15,0.92,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "gramsPerMl": 0.92
        },
        "retailerPrices": {
          "Sainsbury's": 1.49,
          "Tesco": 1.48,
          "Asda": 1.43,
          "Morrisons": 1.48,
          "Ocado": 1.59,
          "Waitrose": 1.71,
          "Aldi": 1.22,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0256-pitted-green-olives-330g",
        "name": "pitted green olives 330g",
        "packQty": 330,
        "unit": "g",
        "price": 1.31,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "green olives"
        ],
        "legacyKey": "[\"pitted green olives 330g\",330,\"g\",1.31,1.31,4.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.31,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 4.5
        },
        "retailerPrices": {
          "Sainsbury's": 1.31,
          "Tesco": 1.3,
          "Asda": 1.25,
          "Morrisons": 1.3,
          "Ocado": 1.4,
          "Waitrose": 1.5,
          "Aldi": 1.07,
          "Lidl": 1.09
        }
      },
      {
        "id": "gb-0257-traditional-italian-pesto-190g",
        "name": "traditional Italian pesto 190g",
        "packQty": 190,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "basil pesto"
        ],
        "legacyKey": "[\"traditional Italian pesto 190g\",190,\"g\",2.5,2.5,null,null,5,16,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 16
        },
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0258-fresh-basil-30g",
        "name": "fresh basil 30g",
        "packQty": 30,
        "unit": "g",
        "price": 0.55,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "fresh basil"
        ],
        "legacyKey": "[\"fresh basil 30g\",30,\"g\",0.55,0.55,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.55,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "handfulWeight": 10
        },
        "retailerPrices": {
          "Sainsbury's": 0.55,
          "Tesco": 0.55,
          "Asda": 0.53,
          "Morrisons": 0.54,
          "Ocado": 0.59,
          "Waitrose": 0.63,
          "Aldi": 0.45,
          "Lidl": 0.46
        }
      },
      {
        "id": "gb-0259-chia-seeds-300g",
        "name": "chia seeds 300g",
        "packQty": 300,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "chia seeds"
        ],
        "legacyKey": "[\"chia seeds 300g\",300,\"g\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0260-unsweetened-almond-milk-1-litre",
        "name": "unsweetened almond milk 1 litre",
        "packQty": 1000,
        "unit": "ml",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "unsweetened almond milk",
          "almond milk"
        ],
        "legacyKey": "[\"unsweetened almond milk 1 litre\",1000,\"ml\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0261-vanilla-extract-38ml",
        "name": "vanilla extract 38ml",
        "packQty": 38,
        "unit": "ml",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "vanilla extract"
        ],
        "legacyKey": "[\"vanilla extract 38ml\",38,\"ml\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0262-almond-yoghurt-400g",
        "name": "almond yoghurt 400g",
        "packQty": 400,
        "unit": "g",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "almond yoghurt",
          "almond yogurt"
        ],
        "legacyKey": "[\"almond yoghurt 400g\",400,\"g\",2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0263-lettuce-or-salad-leaves",
        "name": "lettuce or salad leaves",
        "packQty": 1,
        "unit": "each",
        "price": 0.93,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "lettuce"
        ],
        "legacyKey": "[\"lettuce or salad leaves\",1,\"each\",0.93,null,300,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 300,
          "leafWeight": 25
        },
        "retailerPrices": {
          "Sainsbury's": 0.93,
          "Tesco": 0.92,
          "Asda": 0.89,
          "Morrisons": 0.92,
          "Ocado": 1,
          "Waitrose": 1.07,
          "Aldi": 0.76,
          "Lidl": 0.77
        }
      },
      {
        "id": "gb-0264-tuna-tin",
        "name": "tuna tin",
        "packQty": 1,
        "unit": "tin",
        "price": 0.69,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "tinned tuna"
        ],
        "legacyKey": "[\"tuna tin\",1,\"tin\",0.69,null,null,145,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tinWeight": 145
        },
        "retailerPrices": {
          "Sainsbury's": 0.69,
          "Tesco": 0.68,
          "Asda": 0.66,
          "Morrisons": 0.68,
          "Ocado": 0.74,
          "Waitrose": 0.79,
          "Aldi": 0.56,
          "Lidl": 0.57
        }
      },
      {
        "id": "gb-0265-vegetable-stock-cubes-x12",
        "name": "vegetable stock cubes x12",
        "packQty": 12,
        "unit": "each",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "vegetable stock cubes"
        ],
        "legacyKey": "[\"vegetable stock cubes x12\",12,\"each\",1.25,1.25,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0266-chopped-tomatoes-400g",
        "name": "chopped tomatoes 400g",
        "packQty": 1,
        "unit": "tin",
        "price": 0.46,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "tinned chopped tomatoes"
        ],
        "legacyKey": "[\"chopped tomatoes 400g\",1,\"tin\",0.46,null,null,400,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tinWeight": 400
        },
        "retailerPrices": {
          "Sainsbury's": 0.46,
          "Tesco": 0.46,
          "Asda": 0.44,
          "Morrisons": 0.46,
          "Ocado": 0.49,
          "Waitrose": 0.53,
          "Aldi": 0.38,
          "Lidl": 0.38
        }
      },
      {
        "id": "gb-0267-plain-naan-breads-x2",
        "name": "plain naan breads x2",
        "packQty": 2,
        "unit": "each",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "plain naans"
        ],
        "legacyKey": "[\"plain naan breads x2\",2,\"each\",1.5,1.5,130,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 130
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0268-leeks-500g",
        "name": "leeks 500g",
        "packQty": 500,
        "unit": "g",
        "price": 1.37,
        "observedAt": "2026-09-25",
        "sourceRetailers": [
          "Sainsbury's"
        ],
        "aliases": [
          "leek",
          "leeks"
        ],
        "legacyKey": "[\"leeks 500g\",500,\"g\",1.37,1.37,180,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.37,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 180
        },
        "retailerPrices": {
          "Sainsbury's": 1.37,
          "Tesco": 1.36,
          "Asda": 1.31,
          "Morrisons": 1.36,
          "Ocado": 1.47,
          "Waitrose": 1.57,
          "Aldi": 1.12,
          "Lidl": 1.14
        }
      },
      {
        "id": "gb-0269-ginger-puree-90g",
        "name": "ginger puree 90g",
        "packQty": 90,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "ginger puree"
        ],
        "legacyKey": "[\"ginger puree 90g\",90,\"g\",1.5,1.5,null,null,5,15,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0270-beef-stock-pots-112g",
        "name": "beef stock pots 112g",
        "packQty": 112,
        "unit": "g",
        "price": 1.45,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "beef stock paste"
        ],
        "legacyKey": "[\"beef stock pots 112g\",112,\"g\",1.45,1.45,null,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.45,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "gramsPerMl": 1
        },
        "retailerPrices": {
          "Sainsbury's": 1.45,
          "Tesco": 1.44,
          "Asda": 1.39,
          "Morrisons": 1.44,
          "Ocado": 1.55,
          "Waitrose": 1.66,
          "Aldi": 1.19,
          "Lidl": 1.2
        }
      },
      {
        "id": "gb-0271-concentrated-tomato-paste-100g",
        "name": "concentrated tomato paste 100g",
        "packQty": 100,
        "unit": "g",
        "price": 1,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "intense tomato"
        ],
        "legacyKey": "[\"concentrated tomato paste 100g\",100,\"g\",1,1,25,null,6,18,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 25,
          "tspWeight": 6,
          "tbspWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 1,
          "Tesco": 0.99,
          "Asda": 0.96,
          "Morrisons": 0.99,
          "Ocado": 1.07,
          "Waitrose": 1.15,
          "Aldi": 0.82,
          "Lidl": 0.83
        }
      },
      {
        "id": "gb-0272-shallots-equivalent",
        "name": "shallots equivalent",
        "packQty": 1000,
        "unit": "g",
        "price": 0.97,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "echalion shallot"
        ],
        "legacyKey": "[\"shallots equivalent\",1000,\"g\",0.97,null,45,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 45
        },
        "retailerPrices": {
          "Sainsbury's": 0.97,
          "Tesco": 0.96,
          "Asda": 0.93,
          "Morrisons": 0.96,
          "Ocado": 1.04,
          "Waitrose": 1.11,
          "Aldi": 0.79,
          "Lidl": 0.81
        }
      },
      {
        "id": "gb-0273-gnocchi-500g",
        "name": "gnocchi 500g",
        "packQty": 500,
        "unit": "g",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "gnocchi"
        ],
        "legacyKey": "[\"gnocchi 500g\",500,\"g\",1.25,1.25,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0274-mozzarella-125g-ball",
        "name": "mozzarella 125g ball",
        "packQty": 125,
        "unit": "g",
        "price": 1.05,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "mozzarella"
        ],
        "legacyKey": "[\"mozzarella 125g ball\",125,\"g\",1.05,1.05,125,null,null,null,null,null,null,null,null,null,null,null,null,null,125,null]",
        "savingPrice": 1.05,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 125,
          "ballWeight": 125
        },
        "retailerPrices": {
          "Sainsbury's": 1.05,
          "Tesco": 1.04,
          "Asda": 1.01,
          "Morrisons": 1.04,
          "Ocado": 1.12,
          "Waitrose": 1.2,
          "Aldi": 0.86,
          "Lidl": 0.87
        }
      },
      {
        "id": "gb-0275-skimmed-milk-2-27-litres-4-pints",
        "name": "skimmed milk 2.27 litres (4 pints)",
        "packQty": 2270,
        "unit": "ml",
        "price": 1.65,
        "observedAt": "2026-09-25",
        "sourceRetailers": [
          "Sainsbury's"
        ],
        "aliases": [
          "milk",
          "skimmed milk"
        ],
        "legacyKey": "[\"skimmed milk 2.27 litres (4 pints)\",2270,\"ml\",1.65,1.65,null,null,null,null,null,null,null,null,null,null,null,null,2270,null,null,null]",
        "savingPrice": 1.65,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "cartonWeight": 2270
        },
        "retailerPrices": {
          "Sainsbury's": 1.65,
          "Tesco": 1.64,
          "Asda": 1.58,
          "Morrisons": 1.63,
          "Ocado": 1.77,
          "Waitrose": 1.89,
          "Aldi": 1.35,
          "Lidl": 1.37
        }
      },
      {
        "id": "gb-0276-sliced-bread-loaf-20-slices",
        "name": "sliced bread loaf 20 slices",
        "packQty": 20,
        "unit": "slice",
        "price": 0.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "bread"
        ],
        "legacyKey": "[\"sliced bread loaf 20 slices\",20,\"slice\",0.75,0.75,null,null,null,null,null,null,null,null,38,null,null,null,null,null,null,null]",
        "savingPrice": 0.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "sliceWeight": 38
        },
        "retailerPrices": {
          "Sainsbury's": 0.75,
          "Tesco": 0.74,
          "Asda": 0.72,
          "Morrisons": 0.74,
          "Ocado": 0.8,
          "Waitrose": 0.86,
          "Aldi": 0.61,
          "Lidl": 0.62
        }
      },
      {
        "id": "gb-0277-mature-cheddar-400g",
        "name": "mature cheddar 400g",
        "packQty": 400,
        "unit": "g",
        "price": 3.01,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "cheese",
          "mature cheddar cheese"
        ],
        "legacyKey": "[\"mature cheddar 400g\",400,\"g\",3.01,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.01,
          "Tesco": 2.99,
          "Asda": 2.88,
          "Morrisons": 2.98,
          "Ocado": 3.22,
          "Waitrose": 3.45,
          "Aldi": 2.46,
          "Lidl": 2.5
        }
      },
      {
        "id": "gb-0278-pork-sausages-x8-454g",
        "name": "pork sausages x8 454g",
        "packQty": 8,
        "unit": "each",
        "price": 1.79,
        "observedAt": "2026-09-25",
        "sourceRetailers": [
          "Sainsbury's"
        ],
        "aliases": [
          "pork sausages",
          "sausages"
        ],
        "legacyKey": "[\"pork sausages x8 454g\",8,\"each\",1.79,1.79,56.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.79,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 56.75
        },
        "retailerPrices": {
          "Sainsbury's": 1.79,
          "Tesco": 1.78,
          "Asda": 1.71,
          "Morrisons": 1.77,
          "Ocado": 1.92,
          "Waitrose": 2.05,
          "Aldi": 1.46,
          "Lidl": 1.49
        }
      },
      {
        "id": "gb-0279-sweetcorn-200g-tin",
        "name": "sweetcorn 200g tin",
        "packQty": 200,
        "unit": "g",
        "price": 0.46,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "sweetcorn"
        ],
        "legacyKey": "[\"sweetcorn 200g tin\",200,\"g\",0.46,0.46,null,200,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.46,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tinWeight": 200
        },
        "retailerPrices": {
          "Sainsbury's": 0.46,
          "Tesco": 0.46,
          "Asda": 0.44,
          "Morrisons": 0.46,
          "Ocado": 0.49,
          "Waitrose": 0.53,
          "Aldi": 0.38,
          "Lidl": 0.38
        }
      },
      {
        "id": "gb-0280-worcestershire-sauce-150ml",
        "name": "Worcestershire sauce 150ml",
        "packQty": 150,
        "unit": "ml",
        "price": 1.3,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "worcester sauce"
        ],
        "legacyKey": "[\"Worcestershire sauce 150ml\",150,\"ml\",1.3,null,null,null,5,15,1.05,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "gramsPerMl": 1.05
        },
        "retailerPrices": {
          "Sainsbury's": 1.3,
          "Tesco": 1.29,
          "Asda": 1.24,
          "Morrisons": 1.29,
          "Ocado": 1.39,
          "Waitrose": 1.49,
          "Aldi": 1.06,
          "Lidl": 1.08
        }
      },
      {
        "id": "gb-0281-british-chicken-breast-mini-fillets-400g",
        "name": "British chicken breast mini fillets 400g",
        "packQty": 400,
        "unit": "g",
        "price": 4,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "british chicken mini fillets"
        ],
        "legacyKey": "[\"British chicken breast mini fillets 400g\",400,\"g\",4,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 4,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 4,
          "Tesco": 3.97,
          "Asda": 3.83,
          "Morrisons": 3.96,
          "Ocado": 4.28,
          "Waitrose": 4.58,
          "Aldi": 3.27,
          "Lidl": 3.32
        }
      },
      {
        "id": "gb-0282-red-leicester-400g",
        "name": "Red Leicester 400g",
        "packQty": 400,
        "unit": "g",
        "price": 2.95,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "red leicester"
        ],
        "legacyKey": "[\"Red Leicester 400g\",400,\"g\",2.95,2.95,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.95,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.95,
          "Tesco": 2.93,
          "Asda": 2.82,
          "Morrisons": 2.92,
          "Ocado": 3.16,
          "Waitrose": 3.38,
          "Aldi": 2.41,
          "Lidl": 2.45
        }
      },
      {
        "id": "gb-0283-brioche-hot-dog-buns-x6",
        "name": "brioche hot dog buns x6",
        "packQty": 6,
        "unit": "each",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "brioche hot dog buns"
        ],
        "legacyKey": "[\"brioche hot dog buns x6\",6,\"each\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0284-burger-buns-x4",
        "name": "burger buns x4",
        "packQty": 4,
        "unit": "each",
        "price": 0.86,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "burger buns"
        ],
        "legacyKey": "[\"burger buns x4\",4,\"each\",0.86,0.86,70,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.86,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 70
        },
        "retailerPrices": {
          "Sainsbury's": 0.86,
          "Tesco": 0.85,
          "Asda": 0.82,
          "Morrisons": 0.85,
          "Ocado": 0.92,
          "Waitrose": 0.99,
          "Aldi": 0.7,
          "Lidl": 0.71
        }
      },
      {
        "id": "gb-0285-paneer-200g",
        "name": "paneer 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.8,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "paneer"
        ],
        "legacyKey": "[\"paneer 200g\",200,\"g\",1.8,1.8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.8,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.8,
          "Tesco": 1.79,
          "Asda": 1.72,
          "Morrisons": 1.78,
          "Ocado": 1.93,
          "Waitrose": 2.06,
          "Aldi": 1.47,
          "Lidl": 1.49
        }
      },
      {
        "id": "gb-0286-avocado-each",
        "name": "avocado each",
        "packQty": 1,
        "unit": "each",
        "price": 0.7,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "smashed avocado"
        ],
        "legacyKey": "[\"avocado each\",1,\"each\",0.7,null,150,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 150
        },
        "retailerPrices": {
          "Sainsbury's": 0.7,
          "Tesco": 0.69,
          "Asda": 0.67,
          "Morrisons": 0.69,
          "Ocado": 0.75,
          "Waitrose": 0.8,
          "Aldi": 0.57,
          "Lidl": 0.58
        }
      },
      {
        "id": "gb-0287-romanesco-head",
        "name": "romanesco head",
        "packQty": 1,
        "unit": "each",
        "price": 1.35,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "romanesco"
        ],
        "legacyKey": "[\"romanesco head\",1,\"each\",1.35,1.35,500,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.35,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 500
        },
        "retailerPrices": {
          "Sainsbury's": 1.35,
          "Tesco": 1.34,
          "Asda": 1.29,
          "Morrisons": 1.34,
          "Ocado": 1.44,
          "Waitrose": 1.55,
          "Aldi": 1.1,
          "Lidl": 1.12
        }
      },
      {
        "id": "gb-0288-bao-buns-x6",
        "name": "bao buns x6",
        "packQty": 6,
        "unit": "each",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "bao buns"
        ],
        "legacyKey": "[\"bao buns x6\",6,\"each\",2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0289-creamed-coconut-200g",
        "name": "creamed coconut 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "creamed coconut"
        ],
        "legacyKey": "[\"creamed coconut 200g\",200,\"g\",1.2,1.2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.2,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.2,
          "Tesco": 1.19,
          "Asda": 1.15,
          "Morrisons": 1.19,
          "Ocado": 1.28,
          "Waitrose": 1.37,
          "Aldi": 0.98,
          "Lidl": 1
        }
      },
      {
        "id": "gb-0290-serrano-ham-100g",
        "name": "Serrano ham 100g",
        "packQty": 100,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "serrano ham"
        ],
        "legacyKey": "[\"Serrano ham 100g\",100,\"g\",2.5,2.5,null,null,null,null,null,null,null,null,15,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "sliceWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0291-smoked-ham-slices-120g",
        "name": "smoked ham slices 120g",
        "packQty": 120,
        "unit": "g",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "smoked ham slices"
        ],
        "legacyKey": "[\"smoked ham slices 120g\",120,\"g\",2,2,null,null,null,null,null,null,null,null,15,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "sliceWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0292-tortilla-chips-200g",
        "name": "tortilla chips 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.35,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "tortilla chips"
        ],
        "legacyKey": "[\"tortilla chips 200g\",200,\"g\",1.35,1.35,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.35,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.35,
          "Tesco": 1.34,
          "Asda": 1.29,
          "Morrisons": 1.34,
          "Ocado": 1.44,
          "Waitrose": 1.55,
          "Aldi": 1.1,
          "Lidl": 1.12
        }
      },
      {
        "id": "gb-0293-sirloin-steaks-400g",
        "name": "sirloin steaks 400g",
        "packQty": 400,
        "unit": "g",
        "price": 10.88,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "21 day aged british sirloin steaks"
        ],
        "legacyKey": "[\"sirloin steaks 400g\",400,\"g\",10.88,10.88,200,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 10.88,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 200
        },
        "retailerPrices": {
          "Sainsbury's": 10.88,
          "Tesco": 10.79,
          "Asda": 10.42,
          "Morrisons": 10.78,
          "Ocado": 11.64,
          "Waitrose": 12.46,
          "Aldi": 8.9,
          "Lidl": 9.03
        }
      },
      {
        "id": "gb-0294-rump-steaks-400g",
        "name": "rump steaks 400g",
        "packQty": 400,
        "unit": "g",
        "price": 6.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "21 day aged british rump steaks"
        ],
        "legacyKey": "[\"rump steaks 400g\",400,\"g\",6.5,6.5,200,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 6.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 200
        },
        "retailerPrices": {
          "Sainsbury's": 6.5,
          "Tesco": 6.45,
          "Asda": 6.22,
          "Morrisons": 6.44,
          "Ocado": 6.95,
          "Waitrose": 7.45,
          "Aldi": 5.32,
          "Lidl": 5.39
        }
      },
      {
        "id": "gb-0295-venison-steaks-300g",
        "name": "venison steaks 300g",
        "packQty": 300,
        "unit": "g",
        "price": 6.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "venison leg steaks"
        ],
        "legacyKey": "[\"venison steaks 300g\",300,\"g\",6.5,6.5,150,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 6.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 150
        },
        "retailerPrices": {
          "Sainsbury's": 6.5,
          "Tesco": 6.45,
          "Asda": 6.22,
          "Morrisons": 6.44,
          "Ocado": 6.95,
          "Waitrose": 7.45,
          "Aldi": 5.32,
          "Lidl": 5.39
        }
      },
      {
        "id": "gb-0296-pomegranate-molasses-250ml",
        "name": "pomegranate molasses 250ml",
        "packQty": 250,
        "unit": "ml",
        "price": 2.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "pomegranate molasses"
        ],
        "legacyKey": "[\"pomegranate molasses 250ml\",250,\"ml\",2.75,2.75,null,null,null,20,1.3,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tbspWeight": 20,
          "gramsPerMl": 1.3
        },
        "retailerPrices": {
          "Sainsbury's": 2.75,
          "Tesco": 2.73,
          "Asda": 2.63,
          "Morrisons": 2.72,
          "Ocado": 2.94,
          "Waitrose": 3.15,
          "Aldi": 2.25,
          "Lidl": 2.28
        }
      },
      {
        "id": "gb-0297-chorizo-slices-120g",
        "name": "chorizo slices 120g",
        "packQty": 120,
        "unit": "g",
        "price": 2.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "chorizo slices"
        ],
        "legacyKey": "[\"chorizo slices 120g\",120,\"g\",2.25,2.25,10,null,null,null,null,null,null,null,10,null,null,null,null,null,null,null]",
        "savingPrice": 2.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 10,
          "sliceWeight": 10
        },
        "retailerPrices": {
          "Sainsbury's": 2.25,
          "Tesco": 2.23,
          "Asda": 2.15,
          "Morrisons": 2.23,
          "Ocado": 2.41,
          "Waitrose": 2.58,
          "Aldi": 1.84,
          "Lidl": 1.87
        }
      },
      {
        "id": "gb-0298-steamed-basmati-rice-pouch-250g",
        "name": "steamed basmati rice pouch 250g",
        "packQty": 250,
        "unit": "g",
        "price": 0.7,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "steamed basmati rice"
        ],
        "legacyKey": "[\"steamed basmati rice pouch 250g\",250,\"g\",0.7,0.7,null,null,null,null,null,null,null,250,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.7,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "pouchWeight": 250
        },
        "retailerPrices": {
          "Sainsbury's": 0.7,
          "Tesco": 0.69,
          "Asda": 0.67,
          "Morrisons": 0.69,
          "Ocado": 0.75,
          "Waitrose": 0.8,
          "Aldi": 0.57,
          "Lidl": 0.58
        }
      },
      {
        "id": "gb-0299-sushi-rice-pouch-250g",
        "name": "sushi rice pouch 250g",
        "packQty": 250,
        "unit": "g",
        "price": 1,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "sushi rice"
        ],
        "legacyKey": "[\"sushi rice pouch 250g\",250,\"g\",1,1,null,null,null,null,null,null,null,250,null,null,null,null,null,null,null,null]",
        "savingPrice": 1,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "pouchWeight": 250
        },
        "retailerPrices": {
          "Sainsbury's": 1,
          "Tesco": 0.99,
          "Asda": 0.96,
          "Morrisons": 0.99,
          "Ocado": 1.07,
          "Waitrose": 1.15,
          "Aldi": 0.82,
          "Lidl": 0.83
        }
      },
      {
        "id": "gb-0300-blood-oranges-x4",
        "name": "blood oranges x4",
        "packQty": 4,
        "unit": "each",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "blood orange"
        ],
        "legacyKey": "[\"blood oranges x4\",4,\"each\",2,2,150,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 150
        },
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0301-gravy-granules-170g",
        "name": "gravy granules 170g",
        "packQty": 170,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "instant gravy powder"
        ],
        "legacyKey": "[\"gravy granules 170g\",170,\"g\",1.5,1.5,null,null,4,12,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 4,
          "tbspWeight": 12
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0302-pineapple-rings-tin",
        "name": "pineapple rings tin",
        "packQty": 1,
        "unit": "tin",
        "price": 0.95,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "pineapple rings",
          "pineapple slices"
        ],
        "legacyKey": "[\"pineapple rings tin\",1,\"tin\",0.95,0.95,null,260,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.95,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tinWeight": 260
        },
        "retailerPrices": {
          "Sainsbury's": 0.95,
          "Tesco": 0.94,
          "Asda": 0.91,
          "Morrisons": 0.94,
          "Ocado": 1.02,
          "Waitrose": 1.09,
          "Aldi": 0.78,
          "Lidl": 0.79
        }
      },
      {
        "id": "gb-0303-plant-based-burgers-x2",
        "name": "plant-based burgers x2",
        "packQty": 2,
        "unit": "each",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "unconventional plant based burgers"
        ],
        "legacyKey": "[\"plant-based burgers x2\",2,\"each\",2.5,2.5,113,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 113
        },
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0304-pizza-dough-balls-x2",
        "name": "pizza dough balls x2",
        "packQty": 2,
        "unit": "each",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "pizza dough"
        ],
        "legacyKey": "[\"pizza dough balls x2\",2,\"each\",2,2,220,null,null,null,null,null,null,null,null,null,null,null,null,null,220,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 220,
          "ballWeight": 220
        },
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0305-pork-rib-rack-500g",
        "name": "pork rib rack 500g",
        "packQty": 500,
        "unit": "g",
        "price": 5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "pork rib rack"
        ],
        "legacyKey": "[\"pork rib rack 500g\",500,\"g\",5,5,500,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 500
        },
        "retailerPrices": {
          "Sainsbury's": 5,
          "Tesco": 4.96,
          "Asda": 4.79,
          "Morrisons": 4.95,
          "Ocado": 5.35,
          "Waitrose": 5.73,
          "Aldi": 4.09,
          "Lidl": 4.15
        }
      },
      {
        "id": "gb-0306-onion-marmalade-300g",
        "name": "onion marmalade 300g",
        "packQty": 300,
        "unit": "g",
        "price": 1.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "onion marmalade"
        ],
        "legacyKey": "[\"onion marmalade 300g\",300,\"g\",1.75,1.75,null,null,null,18,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tbspWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 1.75,
          "Tesco": 1.74,
          "Asda": 1.68,
          "Morrisons": 1.73,
          "Ocado": 1.87,
          "Waitrose": 2,
          "Aldi": 1.43,
          "Lidl": 1.45
        }
      },
      {
        "id": "gb-0307-filo-pastry-sheets-x8",
        "name": "filo pastry sheets x8",
        "packQty": 8,
        "unit": "each",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "filo pastry sheets"
        ],
        "legacyKey": "[\"filo pastry sheets x8\",8,\"each\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0308-monkfish-medallions-250g",
        "name": "monkfish medallions 250g",
        "packQty": 250,
        "unit": "g",
        "price": 6,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "monkfish medallions"
        ],
        "legacyKey": "[\"monkfish medallions 250g\",250,\"g\",6,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 6,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 6,
          "Tesco": 5.95,
          "Asda": 5.74,
          "Morrisons": 5.94,
          "Ocado": 6.42,
          "Waitrose": 6.87,
          "Aldi": 4.91,
          "Lidl": 4.98
        }
      },
      {
        "id": "gb-0309-mixed-tomatoes-250g",
        "name": "mixed tomatoes 250g",
        "packQty": 250,
        "unit": "g",
        "price": 1.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "premium tomato mix"
        ],
        "legacyKey": "[\"mixed tomatoes 250g\",250,\"g\",1.75,1.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.75,
          "Tesco": 1.74,
          "Asda": 1.68,
          "Morrisons": 1.73,
          "Ocado": 1.87,
          "Waitrose": 2,
          "Aldi": 1.43,
          "Lidl": 1.45
        }
      },
      {
        "id": "gb-0310-mango-chutney-360g",
        "name": "mango chutney 360g",
        "packQty": 360,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "mango chutney"
        ],
        "legacyKey": "[\"mango chutney 360g\",360,\"g\",1.5,1.5,null,null,6,18,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0311-salted-peanuts-200g",
        "name": "salted peanuts 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "salted peanuts"
        ],
        "legacyKey": "[\"salted peanuts 200g\",200,\"g\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0312-breadcrumbs-175g",
        "name": "breadcrumbs 175g",
        "packQty": 175,
        "unit": "g",
        "price": 0.95,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "breadcrumbs"
        ],
        "legacyKey": "[\"breadcrumbs 175g\",175,\"g\",0.95,0.95,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.95,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.95,
          "Tesco": 0.94,
          "Asda": 0.91,
          "Morrisons": 0.94,
          "Ocado": 1.02,
          "Waitrose": 1.09,
          "Aldi": 0.78,
          "Lidl": 0.79
        }
      },
      {
        "id": "gb-0313-breaded-fish-burgers-x2",
        "name": "breaded fish burgers x2",
        "packQty": 2,
        "unit": "each",
        "price": 3,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "breaded fish burgers"
        ],
        "legacyKey": "[\"breaded fish burgers x2\",2,\"each\",3,3,100,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 3,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 100
        },
        "retailerPrices": {
          "Sainsbury's": 3,
          "Tesco": 2.98,
          "Asda": 2.87,
          "Morrisons": 2.97,
          "Ocado": 3.21,
          "Waitrose": 3.44,
          "Aldi": 2.45,
          "Lidl": 2.49
        }
      },
      {
        "id": "gb-0314-cumberland-sausages-x8-454g",
        "name": "Cumberland sausages x8 454g",
        "packQty": 8,
        "unit": "each",
        "price": 1.79,
        "observedAt": "2026-09-25",
        "sourceRetailers": [
          "Sainsbury's"
        ],
        "aliases": [
          "british cumberland sausages",
          "cumberland sausages"
        ],
        "legacyKey": "[\"Cumberland sausages x8 454g\",8,\"each\",1.79,1.79,56.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.79,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 56.75
        },
        "retailerPrices": {
          "Sainsbury's": 1.79,
          "Tesco": 1.78,
          "Asda": 1.71,
          "Morrisons": 1.77,
          "Ocado": 1.92,
          "Waitrose": 2.05,
          "Aldi": 1.46,
          "Lidl": 1.49
        }
      },
      {
        "id": "gb-0315-pork-sausages-x8",
        "name": "pork sausages x8",
        "packQty": 8,
        "unit": "each",
        "price": 1.79,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "british hickory smoked sausages",
          "british honey mustard sausages"
        ],
        "legacyKey": "[\"pork sausages x8\",8,\"each\",1.79,null,62.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 62.5
        },
        "retailerPrices": {
          "Sainsbury's": 1.79,
          "Tesco": 1.78,
          "Asda": 1.71,
          "Morrisons": 1.77,
          "Ocado": 1.92,
          "Waitrose": 2.05,
          "Aldi": 1.46,
          "Lidl": 1.49
        }
      },
      {
        "id": "gb-0316-goat-s-cheese-100g",
        "name": "goat's cheese 100g",
        "packQty": 100,
        "unit": "g",
        "price": 1.85,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "goat's cheese"
        ],
        "legacyKey": "[\"goat's cheese 100g\",100,\"g\",1.85,1.85,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.85,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.85,
          "Tesco": 1.84,
          "Asda": 1.77,
          "Morrisons": 1.83,
          "Ocado": 1.98,
          "Waitrose": 2.12,
          "Aldi": 1.51,
          "Lidl": 1.54
        }
      },
      {
        "id": "gb-0317-fresh-filled-pasta-300g",
        "name": "fresh filled pasta 300g",
        "packQty": 300,
        "unit": "g",
        "price": 2.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "spinach and ricotta tortelloni",
          "'nduja and red pepper ravioli",
          "pumpkin and sage girasoli",
          "cured ham tortelloni"
        ],
        "legacyKey": "[\"fresh filled pasta 300g\",300,\"g\",2.25,2.25,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.25,
          "Tesco": 2.23,
          "Asda": 2.15,
          "Morrisons": 2.23,
          "Ocado": 2.41,
          "Waitrose": 2.58,
          "Aldi": 1.84,
          "Lidl": 1.87
        }
      },
      {
        "id": "gb-0318-mature-cheddar-400g",
        "name": "mature cheddar 400g",
        "packQty": 400,
        "unit": "g",
        "price": 3.01,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "garlic and mixed herbs mature cheddar"
        ],
        "legacyKey": "[\"mature cheddar 400g\",400,\"g\",3.01,3.01,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 3.01,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.01,
          "Tesco": 2.99,
          "Asda": 2.88,
          "Morrisons": 2.98,
          "Ocado": 3.22,
          "Waitrose": 3.45,
          "Aldi": 2.46,
          "Lidl": 2.5
        }
      },
      {
        "id": "gb-0319-individual-cheese-and-leek-pie",
        "name": "individual cheese and leek pie",
        "packQty": 1,
        "unit": "each",
        "price": 4,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "pieminister big cheese vintage cheddar leek pie"
        ],
        "legacyKey": "[\"individual cheese and leek pie\",1,\"each\",4,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 4,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 4,
          "Tesco": 3.97,
          "Asda": 3.83,
          "Morrisons": 3.96,
          "Ocado": 4.28,
          "Waitrose": 4.58,
          "Aldi": 3.27,
          "Lidl": 3.32
        }
      },
      {
        "id": "gb-0320-ginger-garlic-lemongrass-puree-90g",
        "name": "ginger garlic lemongrass puree 90g",
        "packQty": 90,
        "unit": "g",
        "price": 1.7,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "ginger garlic lemongrass puree"
        ],
        "legacyKey": "[\"ginger garlic lemongrass puree 90g\",90,\"g\",1.7,1.7,null,null,5,15,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.7,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 1.7,
          "Tesco": 1.69,
          "Asda": 1.63,
          "Morrisons": 1.68,
          "Ocado": 1.82,
          "Waitrose": 1.95,
          "Aldi": 1.39,
          "Lidl": 1.41
        }
      },
      {
        "id": "gb-0321-chilli-jelly-250g",
        "name": "chilli jelly 250g",
        "packQty": 250,
        "unit": "g",
        "price": 1.85,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "red pepper chilli jelly"
        ],
        "legacyKey": "[\"chilli jelly 250g\",250,\"g\",1.85,1.85,null,null,6,18,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.85,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 1.85,
          "Tesco": 1.84,
          "Asda": 1.77,
          "Morrisons": 1.83,
          "Ocado": 1.98,
          "Waitrose": 2.12,
          "Aldi": 1.51,
          "Lidl": 1.54
        }
      },
      {
        "id": "gb-0322-caramelised-onion-paste-100g",
        "name": "caramelised onion paste 100g",
        "packQty": 100,
        "unit": "g",
        "price": 1.35,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "caramelised onion paste"
        ],
        "legacyKey": "[\"caramelised onion paste 100g\",100,\"g\",1.35,1.35,null,null,6,18,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.35,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 1.35,
          "Tesco": 1.34,
          "Asda": 1.29,
          "Morrisons": 1.34,
          "Ocado": 1.44,
          "Waitrose": 1.55,
          "Aldi": 1.1,
          "Lidl": 1.12
        }
      },
      {
        "id": "gb-0323-prepared-pork-equivalent",
        "name": "prepared pork equivalent",
        "packQty": 400,
        "unit": "g",
        "price": 4.18,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "slow cooked wild garlic british porchetta"
        ],
        "legacyKey": "[\"prepared pork equivalent\",400,\"g\",4.18,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 4.18,
          "Tesco": 4.15,
          "Asda": 4,
          "Morrisons": 4.14,
          "Ocado": 4.47,
          "Waitrose": 4.79,
          "Aldi": 3.42,
          "Lidl": 3.47
        }
      },
      {
        "id": "gb-0324-red-wine-stock-concentrate-112g",
        "name": "red wine stock concentrate 112g",
        "packQty": 112,
        "unit": "g",
        "price": 1.8,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "red wine stock paste"
        ],
        "legacyKey": "[\"red wine stock concentrate 112g\",112,\"g\",1.8,1.8,null,null,null,null,null,null,null,null,null,14,null,null,null,null,null,null]",
        "savingPrice": 1.8,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "sachetWeight": 14
        },
        "retailerPrices": {
          "Sainsbury's": 1.8,
          "Tesco": 1.79,
          "Asda": 1.72,
          "Morrisons": 1.78,
          "Ocado": 1.93,
          "Waitrose": 2.06,
          "Aldi": 1.47,
          "Lidl": 1.49
        }
      },
      {
        "id": "gb-0325-red-wine-jus-concentrate-112g",
        "name": "red wine jus concentrate 112g",
        "packQty": 112,
        "unit": "g",
        "price": 1.8,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "red wine jus paste"
        ],
        "legacyKey": "[\"red wine jus concentrate 112g\",112,\"g\",1.8,1.8,null,null,null,null,null,null,null,null,null,14,null,null,null,null,null,null]",
        "savingPrice": 1.8,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "sachetWeight": 14
        },
        "retailerPrices": {
          "Sainsbury's": 1.8,
          "Tesco": 1.79,
          "Asda": 1.72,
          "Morrisons": 1.78,
          "Ocado": 1.93,
          "Waitrose": 2.06,
          "Aldi": 1.47,
          "Lidl": 1.49
        }
      },
      {
        "id": "gb-0326-guinness-cooking-paste-200g",
        "name": "Guinness Cooking Paste 200g",
        "packQty": 200,
        "unit": "g",
        "price": 3.15,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "guinness paste"
        ],
        "legacyKey": "[\"Guinness Cooking Paste 200g\",200,\"g\",3.15,3.15,null,null,5,15,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 3.15,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 3.15,
          "Tesco": 3.12,
          "Asda": 3.02,
          "Morrisons": 3.12,
          "Ocado": 3.37,
          "Waitrose": 3.61,
          "Aldi": 2.58,
          "Lidl": 2.61
        }
      },
      {
        "id": "gb-0327-white-wine-stock-powder-80g",
        "name": "white wine stock powder 80g",
        "packQty": 80,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "white wine stock powder"
        ],
        "legacyKey": "[\"white wine stock powder 80g\",80,\"g\",1.5,1.5,null,null,null,null,null,null,null,null,null,10,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "sachetWeight": 10
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0328-cabbage-and-broccoli-slaw-300g",
        "name": "cabbage and broccoli slaw 300g",
        "packQty": 300,
        "unit": "g",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "white cabbage and broccoli slaw"
        ],
        "legacyKey": "[\"cabbage and broccoli slaw 300g\",300,\"g\",1.25,1.25,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0329-cashew-butter-equivalent",
        "name": "cashew butter equivalent",
        "packQty": 340,
        "unit": "g",
        "price": 1.07,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "cashew butter"
        ],
        "legacyKey": "[\"cashew butter equivalent\",340,\"g\",1.07,null,null,null,5,16,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 16
        },
        "retailerPrices": {
          "Sainsbury's": 1.07,
          "Tesco": 1.06,
          "Asda": 1.02,
          "Morrisons": 1.06,
          "Ocado": 1.14,
          "Waitrose": 1.23,
          "Aldi": 0.88,
          "Lidl": 0.89
        }
      },
      {
        "id": "gb-0330-barramundi-fillets-equivalent",
        "name": "barramundi fillets equivalent",
        "packQty": 240,
        "unit": "g",
        "price": 5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "salted barramundi"
        ],
        "legacyKey": "[\"barramundi fillets equivalent\",240,\"g\",5,5,120,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 120
        },
        "retailerPrices": {
          "Sainsbury's": 5,
          "Tesco": 4.96,
          "Asda": 4.79,
          "Morrisons": 4.95,
          "Ocado": 5.35,
          "Waitrose": 5.73,
          "Aldi": 4.09,
          "Lidl": 4.15
        }
      },
      {
        "id": "gb-0331-carrot-and-cabbage-mix-300g",
        "name": "carrot and cabbage mix 300g",
        "packQty": 300,
        "unit": "g",
        "price": 1.1,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "sliced carrot and cabbage mix"
        ],
        "legacyKey": "[\"carrot and cabbage mix 300g\",300,\"g\",1.1,null,700,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 700
        },
        "retailerPrices": {
          "Sainsbury's": 1.1,
          "Tesco": 1.09,
          "Asda": 1.05,
          "Morrisons": 1.09,
          "Ocado": 1.18,
          "Waitrose": 1.26,
          "Aldi": 0.9,
          "Lidl": 0.91
        }
      },
      {
        "id": "gb-0332-hard-italian-cheese-equivalent",
        "name": "hard Italian cheese equivalent",
        "packQty": 170,
        "unit": "g",
        "price": 3.49,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "grated hard italian style cheese"
        ],
        "legacyKey": "[\"hard Italian cheese equivalent\",170,\"g\",3.49,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.49,
          "Tesco": 3.46,
          "Asda": 3.34,
          "Morrisons": 3.46,
          "Ocado": 3.73,
          "Waitrose": 4,
          "Aldi": 2.85,
          "Lidl": 2.9
        }
      },
      {
        "id": "gb-0333-greek-style-salad-cheese-200g",
        "name": "Greek style salad cheese 200g",
        "packQty": 200,
        "unit": "g",
        "price": 2.22,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "greek style salad cheese"
        ],
        "legacyKey": "[\"Greek style salad cheese 200g\",200,\"g\",2.22,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.22,
          "Tesco": 2.2,
          "Asda": 2.13,
          "Morrisons": 2.2,
          "Ocado": 2.38,
          "Waitrose": 2.54,
          "Aldi": 1.82,
          "Lidl": 1.84
        }
      },
      {
        "id": "gb-0334-low-fat-natural-yoghurt-500g",
        "name": "low fat natural yoghurt 500g",
        "packQty": 500,
        "unit": "g",
        "price": 1.1,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "low fat natural yoghurt"
        ],
        "legacyKey": "[\"low fat natural yoghurt 500g\",500,\"g\",1.1,1.1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.1,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.1,
          "Tesco": 1.09,
          "Asda": 1.05,
          "Morrisons": 1.09,
          "Ocado": 1.18,
          "Waitrose": 1.26,
          "Aldi": 0.9,
          "Lidl": 0.91
        }
      },
      {
        "id": "gb-0335-ricotta-250g",
        "name": "ricotta 250g",
        "packQty": 250,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "ricotta cheese"
        ],
        "legacyKey": "[\"ricotta 250g\",250,\"g\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0336-blue-cheese-150g",
        "name": "blue cheese 150g",
        "packQty": 150,
        "unit": "g",
        "price": 2.2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "crumbled blue cheese"
        ],
        "legacyKey": "[\"blue cheese 150g\",150,\"g\",2.2,2.2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.2,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.2,
          "Tesco": 2.18,
          "Asda": 2.11,
          "Morrisons": 2.18,
          "Ocado": 2.35,
          "Waitrose": 2.52,
          "Aldi": 1.8,
          "Lidl": 1.83
        }
      },
      {
        "id": "gb-0337-yoghurt-sauce-200g",
        "name": "yoghurt sauce 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "yoghurt sauce"
        ],
        "legacyKey": "[\"yoghurt sauce 200g\",200,\"g\",1.25,1.25,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0338-fresh-dill-20g",
        "name": "fresh dill 20g",
        "packQty": 20,
        "unit": "g",
        "price": 0.6,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "dill"
        ],
        "legacyKey": "[\"fresh dill 20g\",20,\"g\",0.6,0.6,null,null,null,null,null,null,null,null,null,null,20,null,null,null,null,null]",
        "savingPrice": 0.6,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "bunchWeight": 20
        },
        "retailerPrices": {
          "Sainsbury's": 0.6,
          "Tesco": 0.6,
          "Asda": 0.57,
          "Morrisons": 0.59,
          "Ocado": 0.64,
          "Waitrose": 0.69,
          "Aldi": 0.49,
          "Lidl": 0.5
        }
      },
      {
        "id": "gb-0339-mustard-seeds-100g",
        "name": "mustard seeds 100g",
        "packQty": 100,
        "unit": "g",
        "price": 1.2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "mustard seeds"
        ],
        "legacyKey": "[\"mustard seeds 100g\",100,\"g\",1.2,1.2,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.2,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 3
        },
        "retailerPrices": {
          "Sainsbury's": 1.2,
          "Tesco": 1.19,
          "Asda": 1.15,
          "Morrisons": 1.19,
          "Ocado": 1.28,
          "Waitrose": 1.37,
          "Aldi": 0.98,
          "Lidl": 1
        }
      },
      {
        "id": "gb-0340-dried-basil-jar",
        "name": "dried basil jar",
        "packQty": 14,
        "unit": "g",
        "price": 0.9,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "dried basil"
        ],
        "legacyKey": "[\"dried basil jar\",14,\"g\",0.9,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 1
        },
        "retailerPrices": {
          "Sainsbury's": 0.9,
          "Tesco": 0.89,
          "Asda": 0.86,
          "Morrisons": 0.89,
          "Ocado": 0.96,
          "Waitrose": 1.03,
          "Aldi": 0.74,
          "Lidl": 0.75
        }
      },
      {
        "id": "gb-0341-dried-mint-jar",
        "name": "dried mint jar",
        "packQty": 14,
        "unit": "g",
        "price": 0.9,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "dried mint"
        ],
        "legacyKey": "[\"dried mint jar\",14,\"g\",0.9,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 1
        },
        "retailerPrices": {
          "Sainsbury's": 0.9,
          "Tesco": 0.89,
          "Asda": 0.86,
          "Morrisons": 0.89,
          "Ocado": 0.96,
          "Waitrose": 1.03,
          "Aldi": 0.74,
          "Lidl": 0.75
        }
      },
      {
        "id": "gb-0342-pitta-breads-x6",
        "name": "pitta breads x6",
        "packQty": 6,
        "unit": "each",
        "price": 1,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "pitta breads"
        ],
        "legacyKey": "[\"pitta breads x6\",6,\"each\",1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1,
          "Tesco": 0.99,
          "Asda": 0.96,
          "Morrisons": 0.99,
          "Ocado": 1.07,
          "Waitrose": 1.15,
          "Aldi": 0.82,
          "Lidl": 0.83
        }
      },
      {
        "id": "gb-0343-garlic-baguettes-x2",
        "name": "garlic baguettes x2",
        "packQty": 2,
        "unit": "each",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "garlic baguette"
        ],
        "legacyKey": "[\"garlic baguettes x2\",2,\"each\",1.25,1.25,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0344-black-garlic-paste-75g",
        "name": "black garlic paste 75g",
        "packQty": 75,
        "unit": "g",
        "price": 2.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "black garlic paste"
        ],
        "legacyKey": "[\"black garlic paste 75g\",75,\"g\",2.25,2.25,null,null,5,15,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 2.25,
          "Tesco": 2.23,
          "Asda": 2.15,
          "Morrisons": 2.23,
          "Ocado": 2.41,
          "Waitrose": 2.58,
          "Aldi": 1.84,
          "Lidl": 1.87
        }
      },
      {
        "id": "gb-0345-british-pork-loin-steaks-480g",
        "name": "British pork loin steaks 480g",
        "packQty": 480,
        "unit": "g",
        "price": 2.99,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "british pork loin steaks"
        ],
        "legacyKey": "[\"British pork loin steaks 480g\",480,\"g\",2.99,2.99,120,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.99,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 120
        },
        "retailerPrices": {
          "Sainsbury's": 2.99,
          "Tesco": 2.97,
          "Asda": 2.86,
          "Morrisons": 2.96,
          "Ocado": 3.2,
          "Waitrose": 3.42,
          "Aldi": 2.45,
          "Lidl": 2.48
        }
      },
      {
        "id": "gb-0346-gammon-steaks-400g",
        "name": "gammon steaks 400g",
        "packQty": 400,
        "unit": "g",
        "price": 3.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "gammon steaks"
        ],
        "legacyKey": "[\"gammon steaks 400g\",400,\"g\",3.5,3.5,200,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 3.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 200
        },
        "retailerPrices": {
          "Sainsbury's": 3.5,
          "Tesco": 3.47,
          "Asda": 3.35,
          "Morrisons": 3.47,
          "Ocado": 3.74,
          "Waitrose": 4.01,
          "Aldi": 2.86,
          "Lidl": 2.9
        }
      },
      {
        "id": "gb-0347-lamb-steaks-300g",
        "name": "lamb steaks 300g",
        "packQty": 300,
        "unit": "g",
        "price": 5.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "lamb steaks"
        ],
        "legacyKey": "[\"lamb steaks 300g\",300,\"g\",5.5,5.5,150,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 5.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 150
        },
        "retailerPrices": {
          "Sainsbury's": 5.5,
          "Tesco": 5.46,
          "Asda": 5.27,
          "Morrisons": 5.45,
          "Ocado": 5.88,
          "Waitrose": 6.3,
          "Aldi": 4.5,
          "Lidl": 4.56
        }
      },
      {
        "id": "gb-0348-streaky-bacon-300g",
        "name": "streaky bacon 300g",
        "packQty": 300,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "british streaky bacon"
        ],
        "legacyKey": "[\"streaky bacon 300g\",300,\"g\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,25]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "rasherWeight": 25
        },
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0349-smoked-bacon-lardons-200g",
        "name": "smoked bacon lardons 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.69,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "british smoked bacon lardons"
        ],
        "legacyKey": "[\"smoked bacon lardons 200g\",200,\"g\",1.69,1.69,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.69,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.69,
          "Tesco": 1.68,
          "Asda": 1.62,
          "Morrisons": 1.67,
          "Ocado": 1.81,
          "Waitrose": 1.94,
          "Aldi": 1.38,
          "Lidl": 1.4
        }
      },
      {
        "id": "gb-0350-diced-chorizo-130g-pack",
        "name": "diced chorizo 130g pack",
        "packQty": 1,
        "unit": "pack",
        "price": 2.55,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "diced chorizo"
        ],
        "legacyKey": "[\"diced chorizo 130g pack\",1,\"pack\",2.55,2.55,null,null,null,null,null,null,130,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.55,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "packWeight": 130
        },
        "retailerPrices": {
          "Sainsbury's": 2.55,
          "Tesco": 2.53,
          "Asda": 2.44,
          "Morrisons": 2.53,
          "Ocado": 2.73,
          "Waitrose": 2.92,
          "Aldi": 2.09,
          "Lidl": 2.12
        }
      },
      {
        "id": "gb-0351-beef-and-pork-mince-500g",
        "name": "beef and pork mince 500g",
        "packQty": 500,
        "unit": "g",
        "price": 4,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "british beef and pork mince"
        ],
        "legacyKey": "[\"beef and pork mince 500g\",500,\"g\",4,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 4,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 4,
          "Tesco": 3.97,
          "Asda": 3.83,
          "Morrisons": 3.96,
          "Ocado": 4.28,
          "Waitrose": 4.58,
          "Aldi": 3.27,
          "Lidl": 3.32
        }
      },
      {
        "id": "gb-0352-5-fat-british-beef-mince-500g",
        "name": "5% fat British beef mince 500g",
        "packQty": 500,
        "unit": "g",
        "price": 5.05,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "british beef mince"
        ],
        "legacyKey": "[\"5% fat British beef mince 500g\",500,\"g\",5.05,5.05,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 5.05,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 5.05,
          "Tesco": 5.01,
          "Asda": 4.84,
          "Morrisons": 5,
          "Ocado": 5.4,
          "Waitrose": 5.78,
          "Aldi": 4.13,
          "Lidl": 4.19
        }
      },
      {
        "id": "gb-0353-butter-beans-400g-tin",
        "name": "butter beans 400g tin",
        "packQty": 1,
        "unit": "tin",
        "price": 0.45,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "butter beans"
        ],
        "legacyKey": "[\"butter beans 400g tin\",1,\"tin\",0.45,0.45,null,400,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.45,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tinWeight": 400
        },
        "retailerPrices": {
          "Sainsbury's": 0.45,
          "Tesco": 0.45,
          "Asda": 0.43,
          "Morrisons": 0.45,
          "Ocado": 0.48,
          "Waitrose": 0.52,
          "Aldi": 0.37,
          "Lidl": 0.37
        }
      },
      {
        "id": "gb-0354-green-lentils-390g-tin",
        "name": "green lentils 390g tin",
        "packQty": 1,
        "unit": "tin",
        "price": 0.45,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "lentils"
        ],
        "legacyKey": "[\"green lentils 390g tin\",1,\"tin\",0.45,0.45,null,390,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.45,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tinWeight": 390
        },
        "retailerPrices": {
          "Sainsbury's": 0.45,
          "Tesco": 0.45,
          "Asda": 0.43,
          "Morrisons": 0.45,
          "Ocado": 0.48,
          "Waitrose": 0.52,
          "Aldi": 0.37,
          "Lidl": 0.37
        }
      },
      {
        "id": "gb-0355-chermoula-seasoning-40g",
        "name": "chermoula seasoning 40g",
        "packQty": 40,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "chermoula spice mix"
        ],
        "legacyKey": "[\"chermoula seasoning 40g\",40,\"g\",1.5,1.5,null,null,null,null,null,null,null,null,null,10,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "sachetWeight": 10
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0356-puff-pastry-sheet-320g",
        "name": "puff pastry sheet 320g",
        "packQty": 320,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "puff pastry sheet"
        ],
        "legacyKey": "[\"puff pastry sheet 320g\",320,\"g\",1.5,1.5,320,null,null,null,null,null,320,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 320,
          "packWeight": 320
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0357-lasagne-sheets-500g",
        "name": "lasagne sheets 500g",
        "packQty": 500,
        "unit": "g",
        "price": 0.95,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "lasagne sheets"
        ],
        "legacyKey": "[\"lasagne sheets 500g\",500,\"g\",0.95,0.95,null,null,null,null,null,null,500,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.95,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "packWeight": 500
        },
        "retailerPrices": {
          "Sainsbury's": 0.95,
          "Tesco": 0.94,
          "Asda": 0.91,
          "Morrisons": 0.94,
          "Ocado": 1.02,
          "Waitrose": 1.09,
          "Aldi": 0.78,
          "Lidl": 0.79
        }
      },
      {
        "id": "gb-0358-vegetable-gyozas-240g",
        "name": "vegetable gyozas 240g",
        "packQty": 240,
        "unit": "g",
        "price": 2.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "vegetable gyozas"
        ],
        "legacyKey": "[\"vegetable gyozas 240g\",240,\"g\",2.25,2.25,20,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 20
        },
        "retailerPrices": {
          "Sainsbury's": 2.25,
          "Tesco": 2.23,
          "Asda": 2.15,
          "Morrisons": 2.23,
          "Ocado": 2.41,
          "Waitrose": 2.58,
          "Aldi": 1.84,
          "Lidl": 1.87
        }
      },
      {
        "id": "gb-0359-scottish-salmon-fillets-x2-240g",
        "name": "Scottish salmon fillets x2 240g",
        "packQty": 240,
        "unit": "g",
        "price": 4.73,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "salmon fillets",
          "skin on salmon fillets"
        ],
        "legacyKey": "[\"Scottish salmon fillets x2 240g\",240,\"g\",4.73,4.73,120,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 4.73,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 120
        },
        "retailerPrices": {
          "Sainsbury's": 4.73,
          "Tesco": 4.69,
          "Asda": 4.53,
          "Morrisons": 4.68,
          "Ocado": 5.06,
          "Waitrose": 5.42,
          "Aldi": 3.87,
          "Lidl": 3.93
        }
      },
      {
        "id": "gb-0360-basa-fillets-250g",
        "name": "basa fillets 250g",
        "packQty": 250,
        "unit": "g",
        "price": 1.79,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "basa fillets"
        ],
        "legacyKey": "[\"basa fillets 250g\",250,\"g\",1.79,1.79,125,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.79,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 125
        },
        "retailerPrices": {
          "Sainsbury's": 1.79,
          "Tesco": 1.78,
          "Asda": 1.71,
          "Morrisons": 1.77,
          "Ocado": 1.92,
          "Waitrose": 2.05,
          "Aldi": 1.46,
          "Lidl": 1.49
        }
      },
      {
        "id": "gb-0361-haddock-fillets-360g",
        "name": "haddock fillets 360g",
        "packQty": 360,
        "unit": "g",
        "price": 6.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "haddock fillets"
        ],
        "legacyKey": "[\"haddock fillets 360g\",360,\"g\",6.5,6.5,180,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 6.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 180
        },
        "retailerPrices": {
          "Sainsbury's": 6.5,
          "Tesco": 6.45,
          "Asda": 6.22,
          "Morrisons": 6.44,
          "Ocado": 6.95,
          "Waitrose": 7.45,
          "Aldi": 5.32,
          "Lidl": 5.39
        }
      },
      {
        "id": "gb-0362-hake-fillets-240g",
        "name": "hake fillets 240g",
        "packQty": 240,
        "unit": "g",
        "price": 4.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "skin on hake fillets",
          "hake fillets"
        ],
        "legacyKey": "[\"hake fillets 240g\",240,\"g\",4.75,4.75,120,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 4.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 120
        },
        "retailerPrices": {
          "Sainsbury's": 4.75,
          "Tesco": 4.71,
          "Asda": 4.55,
          "Morrisons": 4.7,
          "Ocado": 5.08,
          "Waitrose": 5.44,
          "Aldi": 3.88,
          "Lidl": 3.94
        }
      },
      {
        "id": "gb-0363-sea-bream-fillets-180g",
        "name": "sea bream fillets 180g",
        "packQty": 180,
        "unit": "g",
        "price": 5.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "sea bream fillets"
        ],
        "legacyKey": "[\"sea bream fillets 180g\",180,\"g\",5.75,5.75,90,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 5.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 90
        },
        "retailerPrices": {
          "Sainsbury's": 5.75,
          "Tesco": 5.7,
          "Asda": 5.51,
          "Morrisons": 5.69,
          "Ocado": 6.15,
          "Waitrose": 6.59,
          "Aldi": 4.7,
          "Lidl": 4.77
        }
      },
      {
        "id": "gb-0364-fish-pie-mix-400g",
        "name": "fish pie mix 400g",
        "packQty": 400,
        "unit": "g",
        "price": 6,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "fish pie mix"
        ],
        "legacyKey": "[\"fish pie mix 400g\",400,\"g\",6,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 6,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 6,
          "Tesco": 5.95,
          "Asda": 5.74,
          "Morrisons": 5.94,
          "Ocado": 6.42,
          "Waitrose": 6.87,
          "Aldi": 4.91,
          "Lidl": 4.98
        }
      },
      {
        "id": "gb-0365-smoked-salmon-100g",
        "name": "smoked salmon 100g",
        "packQty": 100,
        "unit": "g",
        "price": 3.8,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "smoked salmon"
        ],
        "legacyKey": "[\"smoked salmon 100g\",100,\"g\",3.8,3.8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 3.8,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3.8,
          "Tesco": 3.77,
          "Asda": 3.64,
          "Morrisons": 3.76,
          "Ocado": 4.07,
          "Waitrose": 4.35,
          "Aldi": 3.11,
          "Lidl": 3.15
        }
      },
      {
        "id": "gb-0366-egg-noodles-4-nests",
        "name": "egg noodles 4 nests",
        "packQty": 4,
        "unit": "nest",
        "price": 0.94,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "egg noodle nest"
        ],
        "legacyKey": "[\"egg noodles 4 nests\",4,\"nest\",0.94,null,null,null,null,null,null,null,null,null,null,null,null,62.5,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "nestWeight": 62.5
        },
        "retailerPrices": {
          "Sainsbury's": 0.94,
          "Tesco": 0.93,
          "Asda": 0.9,
          "Morrisons": 0.93,
          "Ocado": 1.01,
          "Waitrose": 1.08,
          "Aldi": 0.77,
          "Lidl": 0.78
        }
      },
      {
        "id": "gb-0367-udon-noodles-300g",
        "name": "udon noodles 300g",
        "packQty": 300,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "udon noodles"
        ],
        "legacyKey": "[\"udon noodles 300g\",300,\"g\",1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": null,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0368-british-skinless-chicken-breast-fillets-1k",
        "name": "British skinless chicken breast fillets 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 6.69,
        "observedAt": "2026-09-25",
        "sourceRetailers": [
          "Sainsbury's"
        ],
        "aliases": [
          "british chicken breasts",
          "chicken breast"
        ],
        "legacyKey": "[\"British skinless chicken breast fillets 1kg\",1000,\"g\",6.69,6.69,180,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 6.69,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 180
        },
        "retailerPrices": {
          "Sainsbury's": 6.69,
          "Tesco": 6.64,
          "Asda": 6.41,
          "Morrisons": 6.63,
          "Ocado": 7.16,
          "Waitrose": 7.66,
          "Aldi": 5.47,
          "Lidl": 5.55
        }
      },
      {
        "id": "gb-0369-british-chicken-breast-fillets-1kg",
        "name": "British chicken breast fillets 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 6.69,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "diced british chicken breast",
          "skin on british chicken breasts",
          "chicken breast portions",
          "chicken breast portion",
          "free range chicken breast portions"
        ],
        "legacyKey": "[\"British chicken breast fillets 1kg\",1000,\"g\",6.69,6.69,180,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 6.69,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 180
        },
        "retailerPrices": {
          "Sainsbury's": 6.69,
          "Tesco": 6.64,
          "Asda": 6.41,
          "Morrisons": 6.63,
          "Ocado": 7.16,
          "Waitrose": 7.66,
          "Aldi": 5.47,
          "Lidl": 5.55
        }
      },
      {
        "id": "gb-0370-large-king-prawns-150g",
        "name": "large king prawns 150g",
        "packQty": 150,
        "unit": "g",
        "price": 2.74,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "king prawns",
          "large king prawns"
        ],
        "legacyKey": "[\"large king prawns 150g\",150,\"g\",2.74,2.74,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.74,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.74,
          "Tesco": 2.72,
          "Asda": 2.62,
          "Morrisons": 2.71,
          "Ocado": 2.93,
          "Waitrose": 3.14,
          "Aldi": 2.24,
          "Lidl": 2.27
        }
      },
      {
        "id": "gb-0371-fresh-mussels-500g",
        "name": "fresh mussels 500g",
        "packQty": 500,
        "unit": "g",
        "price": 2.65,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "mussels"
        ],
        "legacyKey": "[\"fresh mussels 500g\",500,\"g\",2.65,2.65,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.65,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.65,
          "Tesco": 2.63,
          "Asda": 2.54,
          "Morrisons": 2.62,
          "Ocado": 2.84,
          "Waitrose": 3.04,
          "Aldi": 2.17,
          "Lidl": 2.2
        }
      },
      {
        "id": "gb-0372-white-crab-meat-100g",
        "name": "white crab meat 100g",
        "packQty": 100,
        "unit": "g",
        "price": 7.2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "orkney crab meat"
        ],
        "legacyKey": "[\"white crab meat 100g\",100,\"g\",7.2,7.2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 7.2,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 7.2,
          "Tesco": 7.14,
          "Asda": 6.89,
          "Morrisons": 7.13,
          "Ocado": 7.7,
          "Waitrose": 8.25,
          "Aldi": 5.89,
          "Lidl": 5.98
        }
      },
      {
        "id": "gb-0373-confit-duck-legs-x2",
        "name": "confit duck legs x2",
        "packQty": 2,
        "unit": "each",
        "price": 7,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "confit british duck legs"
        ],
        "legacyKey": "[\"confit duck legs x2\",2,\"each\",7,7,220,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 7,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 220
        },
        "retailerPrices": {
          "Sainsbury's": 7,
          "Tesco": 6.94,
          "Asda": 6.7,
          "Morrisons": 6.93,
          "Ocado": 7.49,
          "Waitrose": 8.02,
          "Aldi": 5.72,
          "Lidl": 5.81
        }
      },
      {
        "id": "gb-0374-fresh-tagliatelle-300g",
        "name": "fresh tagliatelle 300g",
        "packQty": 300,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "fresh tagliatelle"
        ],
        "legacyKey": "[\"fresh tagliatelle 300g\",300,\"g\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0375-intense-chicken-stock-mix-100g",
        "name": "intense chicken stock mix 100g",
        "packQty": 100,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "intense chicken stock mix"
        ],
        "legacyKey": "[\"intense chicken stock mix 100g\",100,\"g\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0376-white-long-grain-rice-1kg",
        "name": "white long grain rice 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "white long grain rice"
        ],
        "legacyKey": "[\"white long grain rice 1kg\",1000,\"g\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0377-solid-creamed-coconut-200g",
        "name": "solid creamed coconut 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "solid creamed coconut"
        ],
        "legacyKey": "[\"solid creamed coconut 200g\",200,\"g\",1.2,1.2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.2,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.2,
          "Tesco": 1.19,
          "Asda": 1.15,
          "Morrisons": 1.19,
          "Ocado": 1.28,
          "Waitrose": 1.37,
          "Aldi": 0.98,
          "Lidl": 1
        }
      },
      {
        "id": "gb-0378-curry-powder-90g",
        "name": "curry powder 90g",
        "packQty": 90,
        "unit": "g",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "curry powder"
        ],
        "legacyKey": "[\"curry powder 90g\",90,\"g\",1.25,1.25,null,null,4,12,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 4,
          "tbspWeight": 12
        },
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0379-fresh-root-ginger-200g",
        "name": "fresh root ginger 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "fresh root ginger"
        ],
        "legacyKey": "[\"fresh root ginger 200g\",200,\"g\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0380-chopped-dates-200g",
        "name": "chopped dates 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "chopped dates"
        ],
        "legacyKey": "[\"chopped dates 200g\",200,\"g\",1.75,1.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.75,
          "Tesco": 1.74,
          "Asda": 1.68,
          "Morrisons": 1.73,
          "Ocado": 1.87,
          "Waitrose": 2,
          "Aldi": 1.43,
          "Lidl": 1.45
        }
      },
      {
        "id": "gb-0381-tamarind-paste-200g",
        "name": "tamarind paste 200g",
        "packQty": 200,
        "unit": "g",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "tamarind paste"
        ],
        "legacyKey": "[\"tamarind paste 200g\",200,\"g\",2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0382-brown-onions-x3",
        "name": "brown onions x3",
        "packQty": 3,
        "unit": "each",
        "price": 0.9,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "brown onion"
        ],
        "legacyKey": "[\"brown onions x3\",3,\"each\",0.9,0.9,150,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.9,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 150
        },
        "retailerPrices": {
          "Sainsbury's": 0.9,
          "Tesco": 0.89,
          "Asda": 0.86,
          "Morrisons": 0.89,
          "Ocado": 0.96,
          "Waitrose": 1.03,
          "Aldi": 0.74,
          "Lidl": 0.75
        }
      },
      {
        "id": "gb-0383-tomato-paste-200g",
        "name": "tomato paste 200g",
        "packQty": 200,
        "unit": "g",
        "price": 0.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "tomato paste"
        ],
        "legacyKey": "[\"tomato paste 200g\",200,\"g\",0.75,0.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.75,
          "Tesco": 0.74,
          "Asda": 0.72,
          "Morrisons": 0.74,
          "Ocado": 0.8,
          "Waitrose": 0.86,
          "Aldi": 0.61,
          "Lidl": 0.62
        }
      },
      {
        "id": "gb-0384-henderson-s-relish-284ml",
        "name": "Henderson's Relish 284ml",
        "packQty": 284,
        "unit": "ml",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "henderson's relish"
        ],
        "legacyKey": "[\"Henderson's Relish 284ml\",284,\"ml\",2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0385-white-potatoes-2kg",
        "name": "white potatoes 2kg",
        "packQty": 9,
        "unit": "each",
        "price": 1.8,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "white potato"
        ],
        "legacyKey": "[\"white potatoes 2kg\",9,\"each\",1.8,1.8,220,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.8,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 220
        },
        "retailerPrices": {
          "Sainsbury's": 1.8,
          "Tesco": 1.79,
          "Asda": 1.72,
          "Morrisons": 1.78,
          "Ocado": 1.93,
          "Waitrose": 2.06,
          "Aldi": 1.47,
          "Lidl": 1.49
        }
      },
      {
        "id": "gb-0386-diced-pollock-300g",
        "name": "diced pollock 300g",
        "packQty": 300,
        "unit": "g",
        "price": 4,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "diced pollock"
        ],
        "legacyKey": "[\"diced pollock 300g\",300,\"g\",4,4,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 4,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 4,
          "Tesco": 3.97,
          "Asda": 3.83,
          "Morrisons": 3.96,
          "Ocado": 4.28,
          "Waitrose": 4.58,
          "Aldi": 3.27,
          "Lidl": 3.32
        }
      },
      {
        "id": "gb-0387-shallots-x4",
        "name": "shallots x4",
        "packQty": 4,
        "unit": "each",
        "price": 1,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "shallot"
        ],
        "legacyKey": "[\"shallots x4\",4,\"each\",1,1,45,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 45
        },
        "retailerPrices": {
          "Sainsbury's": 1,
          "Tesco": 0.99,
          "Asda": 0.96,
          "Morrisons": 0.99,
          "Ocado": 1.07,
          "Waitrose": 1.15,
          "Aldi": 0.82,
          "Lidl": 0.83
        }
      },
      {
        "id": "gb-0388-brown-long-grain-rice-1kg",
        "name": "brown long grain rice 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 1.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "brown long grain rice"
        ],
        "legacyKey": "[\"brown long grain rice 1kg\",1000,\"g\",1.75,1.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.75,
          "Tesco": 1.74,
          "Asda": 1.68,
          "Morrisons": 1.73,
          "Ocado": 1.87,
          "Waitrose": 2,
          "Aldi": 1.43,
          "Lidl": 1.45
        }
      },
      {
        "id": "gb-0389-waxy-potatoes-1kg",
        "name": "waxy potatoes 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "waxy potatoes"
        ],
        "legacyKey": "[\"waxy potatoes 1kg\",1000,\"g\",1.25,1.25,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0390-peas-900g",
        "name": "peas 900g",
        "packQty": 900,
        "unit": "g",
        "price": 1.55,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "blanched peas"
        ],
        "legacyKey": "[\"peas 900g\",900,\"g\",1.55,1.55,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.55,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.55,
          "Tesco": 1.54,
          "Asda": 1.48,
          "Morrisons": 1.54,
          "Ocado": 1.66,
          "Waitrose": 1.78,
          "Aldi": 1.27,
          "Lidl": 1.29
        }
      },
      {
        "id": "gb-0391-green-chillies-x3",
        "name": "green chillies x3",
        "packQty": 3,
        "unit": "each",
        "price": 0.7,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "green chilli"
        ],
        "legacyKey": "[\"green chillies x3\",3,\"each\",0.7,0.7,20,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.7,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 20
        },
        "retailerPrices": {
          "Sainsbury's": 0.7,
          "Tesco": 0.69,
          "Asda": 0.67,
          "Morrisons": 0.69,
          "Ocado": 0.75,
          "Waitrose": 0.8,
          "Aldi": 0.57,
          "Lidl": 0.58
        }
      },
      {
        "id": "gb-0392-flaked-almonds-200g",
        "name": "flaked almonds 200g",
        "packQty": 200,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "flaked almonds"
        ],
        "legacyKey": "[\"flaked almonds 200g\",200,\"g\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0393-plain-naan-breads-x2",
        "name": "plain naan breads x2",
        "packQty": 2,
        "unit": "each",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "plain naan"
        ],
        "legacyKey": "[\"plain naan breads x2\",2,\"each\",1.25,1.25,130,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 130
        },
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0394-chicken-stock-mix-100g",
        "name": "chicken stock mix 100g",
        "packQty": 100,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "chicken stock mix"
        ],
        "legacyKey": "[\"chicken stock mix 100g\",100,\"g\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0395-bamboo-skewers-x100",
        "name": "bamboo skewers x100",
        "packQty": 100,
        "unit": "each",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "skewers"
        ],
        "legacyKey": "[\"bamboo skewers x100\",100,\"each\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0396-fresh-orecchiette-300g",
        "name": "fresh orecchiette 300g",
        "packQty": 300,
        "unit": "g",
        "price": 2.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "fresh orecchiette"
        ],
        "legacyKey": "[\"fresh orecchiette 300g\",300,\"g\",2.25,2.25,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.25,
          "Tesco": 2.23,
          "Asda": 2.15,
          "Morrisons": 2.23,
          "Ocado": 2.41,
          "Waitrose": 2.58,
          "Aldi": 1.84,
          "Lidl": 1.87
        }
      },
      {
        "id": "gb-0397-arborio-rice-500g",
        "name": "arborio rice 500g",
        "packQty": 500,
        "unit": "g",
        "price": 1.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "arborio rice"
        ],
        "legacyKey": "[\"arborio rice 500g\",500,\"g\",1.75,1.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.75,
          "Tesco": 1.74,
          "Asda": 1.68,
          "Morrisons": 1.73,
          "Ocado": 1.87,
          "Waitrose": 2,
          "Aldi": 1.43,
          "Lidl": 1.45
        }
      },
      {
        "id": "gb-0398-chinese-rice-wine-150ml",
        "name": "Chinese rice wine 150ml",
        "packQty": 150,
        "unit": "ml",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "chinese rice wine"
        ],
        "legacyKey": "[\"Chinese rice wine 150ml\",150,\"ml\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0399-yellow-peppers-x3",
        "name": "yellow peppers x3",
        "packQty": 3,
        "unit": "each",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "yellow pepper"
        ],
        "legacyKey": "[\"yellow peppers x3\",3,\"each\",1.5,1.5,160,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 160
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0400-white-wine-vinegar-350ml",
        "name": "white wine vinegar 350ml",
        "packQty": 350,
        "unit": "ml",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "white wine vinegar"
        ],
        "legacyKey": "[\"white wine vinegar 350ml\",350,\"ml\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0401-sourdough-pittas-x4",
        "name": "sourdough pittas x4",
        "packQty": 4,
        "unit": "each",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "sourdough pittas"
        ],
        "legacyKey": "[\"sourdough pittas x4\",4,\"each\",1.5,1.5,75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 75
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0402-sriracha-hot-chilli-sauce-455ml",
        "name": "sriracha hot chilli sauce 455ml",
        "packQty": 455,
        "unit": "ml",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "sriracha hot chilli sauce"
        ],
        "legacyKey": "[\"sriracha hot chilli sauce 455ml\",455,\"ml\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0403-vegetable-samosas-250g",
        "name": "vegetable samosas 250g",
        "packQty": 250,
        "unit": "g",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "4 vegetable samosas"
        ],
        "legacyKey": "[\"vegetable samosas 250g\",250,\"g\",2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0404-sultanas-500g",
        "name": "sultanas 500g",
        "packQty": 500,
        "unit": "g",
        "price": 1.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "sultanas"
        ],
        "legacyKey": "[\"sultanas 500g\",500,\"g\",1.75,1.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.75,
          "Tesco": 1.74,
          "Asda": 1.68,
          "Morrisons": 1.73,
          "Ocado": 1.87,
          "Waitrose": 2,
          "Aldi": 1.43,
          "Lidl": 1.45
        }
      },
      {
        "id": "gb-0405-heritage-tomatoes-250g",
        "name": "heritage tomatoes 250g",
        "packQty": 250,
        "unit": "g",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "heritage tomatoes"
        ],
        "legacyKey": "[\"heritage tomatoes 250g\",250,\"g\",2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0406-sun-dried-tomato-pesto-190g",
        "name": "sun-dried tomato pesto 190g",
        "packQty": 190,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "sun dried tomato pesto"
        ],
        "legacyKey": "[\"sun-dried tomato pesto 190g\",190,\"g\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0407-tomato-and-mozzarella-tortelloni-300g",
        "name": "tomato and mozzarella tortelloni 300g",
        "packQty": 300,
        "unit": "g",
        "price": 2.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "tomato mozzarella tortelloni"
        ],
        "legacyKey": "[\"tomato and mozzarella tortelloni 300g\",300,\"g\",2.25,2.25,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.25,
          "Tesco": 2.23,
          "Asda": 2.15,
          "Morrisons": 2.23,
          "Ocado": 2.41,
          "Waitrose": 2.58,
          "Aldi": 1.84,
          "Lidl": 1.87
        }
      },
      {
        "id": "gb-0408-dried-chilli-flakes-45g",
        "name": "dried chilli flakes 45g",
        "packQty": 45,
        "unit": "g",
        "price": 1.2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "dried chilli flakes"
        ],
        "legacyKey": "[\"dried chilli flakes 45g\",45,\"g\",1.2,1.2,null,null,2,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.2,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 2
        },
        "retailerPrices": {
          "Sainsbury's": 1.2,
          "Tesco": 1.19,
          "Asda": 1.15,
          "Morrisons": 1.19,
          "Ocado": 1.28,
          "Waitrose": 1.37,
          "Aldi": 0.98,
          "Lidl": 1
        }
      },
      {
        "id": "gb-0409-bacon-lardons-200g",
        "name": "bacon lardons 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.69,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "bacon lardons"
        ],
        "legacyKey": "[\"bacon lardons 200g\",200,\"g\",1.69,1.69,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.69,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.69,
          "Tesco": 1.68,
          "Asda": 1.62,
          "Morrisons": 1.67,
          "Ocado": 1.81,
          "Waitrose": 1.94,
          "Aldi": 1.38,
          "Lidl": 1.4
        }
      },
      {
        "id": "gb-0410-cra-me-fraa-che-300g",
        "name": "crÃ¨me fraÃ®che 300g",
        "packQty": 300,
        "unit": "g",
        "price": 1.35,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "cr me fra che"
        ],
        "legacyKey": "[\"crÃ¨me fraÃ®che 300g\",300,\"g\",1.35,1.35,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.35,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.35,
          "Tesco": 1.34,
          "Asda": 1.29,
          "Morrisons": 1.34,
          "Ocado": 1.44,
          "Waitrose": 1.55,
          "Aldi": 1.1,
          "Lidl": 1.12
        }
      },
      {
        "id": "gb-0411-puff-pastry-320g",
        "name": "puff pastry 320g",
        "packQty": 320,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "puff pastry"
        ],
        "legacyKey": "[\"puff pastry 320g\",320,\"g\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0412-nduja-100g",
        "name": "'Nduja 100g",
        "packQty": 100,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "'nduja"
        ],
        "legacyKey": "[\"'Nduja 100g\",100,\"g\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0413-fennel-seeds-50g",
        "name": "fennel seeds 50g",
        "packQty": 50,
        "unit": "g",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "fennel seeds"
        ],
        "legacyKey": "[\"fennel seeds 50g\",50,\"g\",1.25,1.25,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 3
        },
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0414-ras-el-hanout-45g",
        "name": "ras el hanout 45g",
        "packQty": 45,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "ras el hanout"
        ],
        "legacyKey": "[\"ras el hanout 45g\",45,\"g\",1.5,1.5,null,null,4,12,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 4,
          "tbspWeight": 12
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0415-ground-sumac-40g",
        "name": "ground sumac 40g",
        "packQty": 40,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "ground sumac"
        ],
        "legacyKey": "[\"ground sumac 40g\",40,\"g\",1.5,1.5,null,null,4,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 4
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0416-sweet-pointed-peppers-x2",
        "name": "sweet pointed peppers x2",
        "packQty": 2,
        "unit": "each",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "sweet pointed pepper"
        ],
        "legacyKey": "[\"sweet pointed peppers x2\",2,\"each\",1.5,1.5,160,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 160
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0417-wholewheat-tortiglioni-500g",
        "name": "wholewheat tortiglioni 500g",
        "packQty": 500,
        "unit": "g",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "wholewheat tortiglioni"
        ],
        "legacyKey": "[\"wholewheat tortiglioni 500g\",500,\"g\",1.25,1.25,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0418-cornish-clotted-cream-227g",
        "name": "Cornish clotted cream 227g",
        "packQty": 227,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "cornish clotted cream"
        ],
        "legacyKey": "[\"Cornish clotted cream 227g\",227,\"g\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0419-ginger-paste-90g",
        "name": "ginger paste 90g",
        "packQty": 90,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "ginger paste"
        ],
        "legacyKey": "[\"ginger paste 90g\",90,\"g\",1.5,1.5,null,null,5,15,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0420-brioche-buns-x4",
        "name": "brioche buns x4",
        "packQty": 4,
        "unit": "each",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "brioche style buns"
        ],
        "legacyKey": "[\"brioche buns x4\",4,\"each\",1.5,1.5,70,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 70
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0421-pine-kernel-and-seed-mix-100g",
        "name": "pine kernel and seed mix 100g",
        "packQty": 100,
        "unit": "g",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "pine kernel seed mix"
        ],
        "legacyKey": "[\"pine kernel and seed mix 100g\",100,\"g\",2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0422-farfalle-500g",
        "name": "farfalle 500g",
        "packQty": 500,
        "unit": "g",
        "price": 1.1,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "farfalle"
        ],
        "legacyKey": "[\"farfalle 500g\",500,\"g\",1.1,1.1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.1,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.1,
          "Tesco": 1.09,
          "Asda": 1.05,
          "Morrisons": 1.09,
          "Ocado": 1.18,
          "Waitrose": 1.26,
          "Aldi": 0.9,
          "Lidl": 0.91
        }
      },
      {
        "id": "gb-0423-tortiglioni-500g",
        "name": "tortiglioni 500g",
        "packQty": 500,
        "unit": "g",
        "price": 1.1,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "tortiglioni"
        ],
        "legacyKey": "[\"tortiglioni 500g\",500,\"g\",1.1,1.1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.1,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.1,
          "Tesco": 1.09,
          "Asda": 1.05,
          "Morrisons": 1.09,
          "Ocado": 1.18,
          "Waitrose": 1.26,
          "Aldi": 0.9,
          "Lidl": 0.91
        }
      },
      {
        "id": "gb-0424-slow-cooked-duck-legs-x2",
        "name": "slow cooked duck legs x2",
        "packQty": 2,
        "unit": "each",
        "price": 7,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "slow cooked duck legs"
        ],
        "legacyKey": "[\"slow cooked duck legs x2\",2,\"each\",7,7,220,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 7,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 220
        },
        "retailerPrices": {
          "Sainsbury's": 7,
          "Tesco": 6.94,
          "Asda": 6.7,
          "Morrisons": 6.93,
          "Ocado": 7.49,
          "Waitrose": 8.02,
          "Aldi": 5.72,
          "Lidl": 5.81
        }
      },
      {
        "id": "gb-0425-edamame-beans-500g",
        "name": "edamame beans 500g",
        "packQty": 500,
        "unit": "g",
        "price": 2.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "blanched edamame beans"
        ],
        "legacyKey": "[\"edamame beans 500g\",500,\"g\",2.25,2.25,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.25,
          "Tesco": 2.23,
          "Asda": 2.15,
          "Morrisons": 2.23,
          "Ocado": 2.41,
          "Waitrose": 2.58,
          "Aldi": 1.84,
          "Lidl": 1.87
        }
      },
      {
        "id": "gb-0426-toasted-sesame-oil-250ml",
        "name": "toasted sesame oil 250ml",
        "packQty": 250,
        "unit": "ml",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "toasted sesame oil"
        ],
        "legacyKey": "[\"toasted sesame oil 250ml\",250,\"ml\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0427-cumin-seeds-80g",
        "name": "cumin seeds 80g",
        "packQty": 80,
        "unit": "g",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "cumin seeds"
        ],
        "legacyKey": "[\"cumin seeds 80g\",80,\"g\",1.25,1.25,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 3
        },
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0428-sweet-pea-pods-150g",
        "name": "sweet pea pods 150g",
        "packQty": 150,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "sweet pea pods"
        ],
        "legacyKey": "[\"sweet pea pods 150g\",150,\"g\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0429-traditional-italian-pesto-190g",
        "name": "traditional Italian pesto 190g",
        "packQty": 190,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "traditional italian pesto"
        ],
        "legacyKey": "[\"traditional Italian pesto 190g\",190,\"g\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0430-seasonal-salad-100g",
        "name": "seasonal salad 100g",
        "packQty": 100,
        "unit": "g",
        "price": 1,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "seasonal salad"
        ],
        "legacyKey": "[\"seasonal salad 100g\",100,\"g\",1,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1,
          "Tesco": 0.99,
          "Asda": 0.96,
          "Morrisons": 0.99,
          "Ocado": 1.07,
          "Waitrose": 1.15,
          "Aldi": 0.82,
          "Lidl": 0.83
        }
      },
      {
        "id": "gb-0431-nigella-seeds-45g",
        "name": "nigella seeds 45g",
        "packQty": 45,
        "unit": "g",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "nigella seeds"
        ],
        "legacyKey": "[\"nigella seeds 45g\",45,\"g\",1.25,1.25,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 3
        },
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0432-cooked-brown-long-grain-rice-250g",
        "name": "cooked brown long grain rice 250g",
        "packQty": 250,
        "unit": "g",
        "price": 0.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "cooked brown long grain rice"
        ],
        "legacyKey": "[\"cooked brown long grain rice 250g\",250,\"g\",0.75,0.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.75,
          "Tesco": 0.74,
          "Asda": 0.72,
          "Morrisons": 0.74,
          "Ocado": 0.8,
          "Waitrose": 0.86,
          "Aldi": 0.61,
          "Lidl": 0.62
        }
      },
      {
        "id": "gb-0433-smoked-streaky-bacon-300g",
        "name": "smoked streaky bacon 300g",
        "packQty": 300,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "smoked streaky bacon"
        ],
        "legacyKey": "[\"smoked streaky bacon 300g\",300,\"g\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0434-ground-almonds-200g",
        "name": "ground almonds 200g",
        "packQty": 200,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "ground almonds"
        ],
        "legacyKey": "[\"ground almonds 200g\",200,\"g\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0435-cardamom-pods-x25",
        "name": "cardamom pods x25",
        "packQty": 25,
        "unit": "each",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "cardamom pod"
        ],
        "legacyKey": "[\"cardamom pods x25\",25,\"each\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0436-cayenne-pepper-40g",
        "name": "cayenne pepper 40g",
        "packQty": 40,
        "unit": "g",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "cayenne pepper"
        ],
        "legacyKey": "[\"cayenne pepper 40g\",40,\"g\",1.25,1.25,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 3
        },
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0437-agave-nectar-250g",
        "name": "agave nectar 250g",
        "packQty": 250,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "agave nectar"
        ],
        "legacyKey": "[\"agave nectar 250g\",250,\"g\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0438-cultured-coconut-350g",
        "name": "cultured coconut 350g",
        "packQty": 350,
        "unit": "g",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "cultured coconut"
        ],
        "legacyKey": "[\"cultured coconut 350g\",350,\"g\",2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0439-vegan-mayonnaise-500ml",
        "name": "vegan mayonnaise 500ml",
        "packQty": 500,
        "unit": "ml",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "vegan mayonnaise"
        ],
        "legacyKey": "[\"vegan mayonnaise 500ml\",500,\"ml\",2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0440-mirin-150ml",
        "name": "mirin 150ml",
        "packQty": 150,
        "unit": "ml",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "mirin"
        ],
        "legacyKey": "[\"mirin 150ml\",150,\"ml\",2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0441-vegan-burger-patties-x2",
        "name": "vegan burger patties x2",
        "packQty": 2,
        "unit": "each",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "ultimate vegan burger patties"
        ],
        "legacyKey": "[\"vegan burger patties x2\",2,\"each\",2.5,2.5,113,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 113
        },
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0442-meat-free-chick-n-300g",
        "name": "meat-free chick'n 300g",
        "packQty": 300,
        "unit": "g",
        "price": 3,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "meat free chick'n"
        ],
        "legacyKey": "[\"meat-free chick'n 300g\",300,\"g\",3,3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 3,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3,
          "Tesco": 2.98,
          "Asda": 2.87,
          "Morrisons": 2.97,
          "Ocado": 3.21,
          "Waitrose": 3.44,
          "Aldi": 2.45,
          "Lidl": 2.49
        }
      },
      {
        "id": "gb-0443-roti-x6",
        "name": "roti x6",
        "packQty": 6,
        "unit": "each",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "roti"
        ],
        "legacyKey": "[\"roti x6\",6,\"each\",1.5,1.5,55,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 55
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0444-mature-cheddar-400g",
        "name": "mature cheddar 400g",
        "packQty": 400,
        "unit": "g",
        "price": 2.95,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "cheddar cheese"
        ],
        "legacyKey": "[\"mature cheddar 400g\",400,\"g\",2.95,2.95,null,null,null,null,null,null,null,null,20,null,null,null,null,null,null,null]",
        "savingPrice": 2.95,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "sliceWeight": 20
        },
        "retailerPrices": {
          "Sainsbury's": 2.95,
          "Tesco": 2.93,
          "Asda": 2.82,
          "Morrisons": 2.92,
          "Ocado": 3.16,
          "Waitrose": 3.38,
          "Aldi": 2.41,
          "Lidl": 2.45
        }
      },
      {
        "id": "gb-0445-italian-hard-cheese-170g",
        "name": "Italian hard cheese 170g",
        "packQty": 170,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "grated italian hard cheese",
          "italian hard cheese"
        ],
        "legacyKey": "[\"Italian hard cheese 170g\",170,\"g\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0446-finely-chopped-tomatoes-400g",
        "name": "finely chopped tomatoes 400g",
        "packQty": 400,
        "unit": "g",
        "price": 0.55,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "finely chopped tomatoes"
        ],
        "legacyKey": "[\"finely chopped tomatoes 400g\",400,\"g\",0.55,0.55,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.55,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.55,
          "Tesco": 0.55,
          "Asda": 0.53,
          "Morrisons": 0.54,
          "Ocado": 0.59,
          "Waitrose": 0.63,
          "Aldi": 0.45,
          "Lidl": 0.46
        }
      },
      {
        "id": "gb-0447-natural-yoghurt-500g",
        "name": "natural yoghurt 500g",
        "packQty": 500,
        "unit": "g",
        "price": 1.1,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "natural yoghurt"
        ],
        "legacyKey": "[\"natural yoghurt 500g\",500,\"g\",1.1,1.1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.1,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.1,
          "Tesco": 1.09,
          "Asda": 1.05,
          "Morrisons": 1.09,
          "Ocado": 1.18,
          "Waitrose": 1.26,
          "Aldi": 0.9,
          "Lidl": 0.91
        }
      },
      {
        "id": "gb-0448-panko-breadcrumbs-175g",
        "name": "panko breadcrumbs 175g",
        "packQty": 175,
        "unit": "g",
        "price": 0.95,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "panko breadcrumbs"
        ],
        "legacyKey": "[\"panko breadcrumbs 175g\",175,\"g\",0.95,0.95,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.95,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.95,
          "Tesco": 0.94,
          "Asda": 0.91,
          "Morrisons": 0.94,
          "Ocado": 1.02,
          "Waitrose": 1.09,
          "Aldi": 0.78,
          "Lidl": 0.79
        }
      },
      {
        "id": "gb-0449-roasted-garlic-paste-100g",
        "name": "roasted garlic paste 100g",
        "packQty": 100,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "roasted garlic paste"
        ],
        "legacyKey": "[\"roasted garlic paste 100g\",100,\"g\",1.5,1.5,null,null,5,15,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0450-greek-style-salad-cheese-200g",
        "name": "Greek style salad cheese 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.65,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "greek salad cheese"
        ],
        "legacyKey": "[\"Greek style salad cheese 200g\",200,\"g\",1.65,1.65,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.65,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.65,
          "Tesco": 1.64,
          "Asda": 1.58,
          "Morrisons": 1.63,
          "Ocado": 1.77,
          "Waitrose": 1.89,
          "Aldi": 1.35,
          "Lidl": 1.37
        }
      },
      {
        "id": "gb-0451-black-beans-400g-tin",
        "name": "black beans 400g tin",
        "packQty": 400,
        "unit": "g",
        "price": 0.6,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "black beans"
        ],
        "legacyKey": "[\"black beans 400g tin\",400,\"g\",0.6,0.6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.6,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.6,
          "Tesco": 0.6,
          "Asda": 0.57,
          "Morrisons": 0.59,
          "Ocado": 0.64,
          "Waitrose": 0.69,
          "Aldi": 0.49,
          "Lidl": 0.5
        }
      },
      {
        "id": "gb-0452-proper-porker-sausages-pack",
        "name": "Proper Porker sausages pack",
        "packQty": 1,
        "unit": "pack",
        "price": 3,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "proper porker sausages"
        ],
        "legacyKey": "[\"Proper Porker sausages pack\",1,\"pack\",3,3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 3,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3,
          "Tesco": 2.98,
          "Asda": 2.87,
          "Morrisons": 2.97,
          "Ocado": 3.21,
          "Waitrose": 3.44,
          "Aldi": 2.45,
          "Lidl": 2.49
        }
      },
      {
        "id": "gb-0453-chickpeas-400g-tin",
        "name": "chickpeas 400g tin",
        "packQty": 400,
        "unit": "g",
        "price": 0.6,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "chickpeas"
        ],
        "legacyKey": "[\"chickpeas 400g tin\",400,\"g\",0.6,0.6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.6,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.6,
          "Tesco": 0.6,
          "Asda": 0.57,
          "Morrisons": 0.59,
          "Ocado": 0.64,
          "Waitrose": 0.69,
          "Aldi": 0.49,
          "Lidl": 0.5
        }
      },
      {
        "id": "gb-0454-single-oat-cream-250ml",
        "name": "single oat cream 250ml",
        "packQty": 250,
        "unit": "ml",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "creamy single oat"
        ],
        "legacyKey": "[\"single oat cream 250ml\",250,\"ml\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0455-ginger-and-garlic-paste-100g",
        "name": "ginger and garlic paste 100g",
        "packQty": 100,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "ginger garlic paste"
        ],
        "legacyKey": "[\"ginger and garlic paste 100g\",100,\"g\",1.5,1.5,null,null,5,15,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0456-red-chilli-relish-250g",
        "name": "red chilli relish 250g",
        "packQty": 250,
        "unit": "g",
        "price": 1.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "red chilli relish"
        ],
        "legacyKey": "[\"red chilli relish 250g\",250,\"g\",1.75,1.75,null,null,6,18,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 1.75,
          "Tesco": 1.74,
          "Asda": 1.68,
          "Morrisons": 1.73,
          "Ocado": 1.87,
          "Waitrose": 2,
          "Aldi": 1.43,
          "Lidl": 1.45
        }
      },
      {
        "id": "gb-0457-tabasco-original-red-pepper-hot-sauce-57ml",
        "name": "Tabasco Original Red Pepper Hot Sauce 57ml",
        "packQty": 57,
        "unit": "ml",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "tabasco original red sauce",
          "tabasco original red pepper hot sauce"
        ],
        "legacyKey": "[\"Tabasco Original Red Pepper Hot Sauce 57ml\",57,\"ml\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0458-meat-free-sausages-pack",
        "name": "meat-free sausages pack",
        "packQty": 1,
        "unit": "pack",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "meatless farm sausages"
        ],
        "legacyKey": "[\"meat-free sausages pack\",1,\"pack\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0459-pak-choi-400g",
        "name": "pak choi 400g",
        "packQty": 400,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "pak choi"
        ],
        "legacyKey": "[\"pak choi 400g\",400,\"g\",1.5,1.5,200,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 200
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0460-spiced-plum-chutney-300g",
        "name": "spiced plum chutney 300g",
        "packQty": 300,
        "unit": "g",
        "price": 1.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "spiced plum chutney"
        ],
        "legacyKey": "[\"spiced plum chutney 300g\",300,\"g\",1.75,1.75,null,null,null,18,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tbspWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 1.75,
          "Tesco": 1.74,
          "Asda": 1.68,
          "Morrisons": 1.73,
          "Ocado": 1.87,
          "Waitrose": 2,
          "Aldi": 1.43,
          "Lidl": 1.45
        }
      },
      {
        "id": "gb-0461-lighter-cheddar-400g",
        "name": "lighter cheddar 400g",
        "packQty": 400,
        "unit": "g",
        "price": 2.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "lighter cheese"
        ],
        "legacyKey": "[\"lighter cheddar 400g\",400,\"g\",2.75,2.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.75,
          "Tesco": 2.73,
          "Asda": 2.63,
          "Morrisons": 2.72,
          "Ocado": 2.94,
          "Waitrose": 3.15,
          "Aldi": 2.25,
          "Lidl": 2.28
        }
      },
      {
        "id": "gb-0462-large-salmon-fillet-400g",
        "name": "large salmon fillet 400g",
        "packQty": 400,
        "unit": "g",
        "price": 7.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "large salmon fillet"
        ],
        "legacyKey": "[\"large salmon fillet 400g\",400,\"g\",7.5,7.5,200,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 7.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 200
        },
        "retailerPrices": {
          "Sainsbury's": 7.5,
          "Tesco": 7.44,
          "Asda": 7.18,
          "Morrisons": 7.43,
          "Ocado": 8.02,
          "Waitrose": 8.59,
          "Aldi": 6.13,
          "Lidl": 6.22
        }
      },
      {
        "id": "gb-0463-wild-garlic-paste-100g",
        "name": "wild garlic paste 100g",
        "packQty": 100,
        "unit": "g",
        "price": 1.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "wild garlic paste"
        ],
        "legacyKey": "[\"wild garlic paste 100g\",100,\"g\",1.75,1.75,null,null,5,15,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 1.75,
          "Tesco": 1.74,
          "Asda": 1.68,
          "Morrisons": 1.73,
          "Ocado": 1.87,
          "Waitrose": 2,
          "Aldi": 1.43,
          "Lidl": 1.45
        }
      },
      {
        "id": "gb-0464-lemongrass-and-lime-leaf-paste-100g",
        "name": "lemongrass and lime leaf paste 100g",
        "packQty": 100,
        "unit": "g",
        "price": 1.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "lemongrass and lime leaf paste"
        ],
        "legacyKey": "[\"lemongrass and lime leaf paste 100g\",100,\"g\",1.75,1.75,null,null,5,15,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 1.75,
          "Tesco": 1.74,
          "Asda": 1.68,
          "Morrisons": 1.73,
          "Ocado": 1.87,
          "Waitrose": 2,
          "Aldi": 1.43,
          "Lidl": 1.45
        }
      },
      {
        "id": "gb-0465-red-kidney-beans-400g-tin",
        "name": "red kidney beans 400g tin",
        "packQty": 1,
        "unit": "tin",
        "price": 0.6,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "red kidney beans"
        ],
        "legacyKey": "[\"red kidney beans 400g tin\",1,\"tin\",0.6,0.6,null,400,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.6,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tinWeight": 400
        },
        "retailerPrices": {
          "Sainsbury's": 0.6,
          "Tesco": 0.6,
          "Asda": 0.57,
          "Morrisons": 0.59,
          "Ocado": 0.64,
          "Waitrose": 0.69,
          "Aldi": 0.49,
          "Lidl": 0.5
        }
      },
      {
        "id": "gb-0466-cannellini-beans-400g-tin-equivalent",
        "name": "cannellini beans 400g tin equivalent",
        "packQty": 400,
        "unit": "g",
        "price": 0.65,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "cannellini beans"
        ],
        "legacyKey": "[\"cannellini beans 400g tin equivalent\",400,\"g\",0.65,0.65,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.65,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.65,
          "Tesco": 0.64,
          "Asda": 0.62,
          "Morrisons": 0.64,
          "Ocado": 0.7,
          "Waitrose": 0.74,
          "Aldi": 0.53,
          "Lidl": 0.54
        }
      },
      {
        "id": "gb-0467-5-bean-medley-400g-tin-equivalent",
        "name": "5 bean medley 400g tin equivalent",
        "packQty": 400,
        "unit": "g",
        "price": 0.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "5 bean medley"
        ],
        "legacyKey": "[\"5 bean medley 400g tin equivalent\",400,\"g\",0.75,0.75,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.75,
          "Tesco": 0.74,
          "Asda": 0.72,
          "Morrisons": 0.74,
          "Ocado": 0.8,
          "Waitrose": 0.86,
          "Aldi": 0.61,
          "Lidl": 0.62
        }
      },
      {
        "id": "gb-0468-black-bean-paste-200g",
        "name": "black bean paste 200g",
        "packQty": 200,
        "unit": "g",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "black bean paste"
        ],
        "legacyKey": "[\"black bean paste 200g\",200,\"g\",2,2,null,null,6,18,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18
        },
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0469-wholewheat-noodle-nests-x4",
        "name": "wholewheat noodle nests x4",
        "packQty": 4,
        "unit": "nest",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "wholewheat noodle nests"
        ],
        "legacyKey": "[\"wholewheat noodle nests x4\",4,\"nest\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,62.5,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "nestWeight": 62.5
        },
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0470-grilling-cheese-225g",
        "name": "grilling cheese 225g",
        "packQty": 225,
        "unit": "g",
        "price": 1.99,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "grilling cheese"
        ],
        "legacyKey": "[\"grilling cheese 225g\",225,\"g\",1.99,1.99,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.99,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.99,
          "Tesco": 1.97,
          "Asda": 1.91,
          "Morrisons": 1.97,
          "Ocado": 2.13,
          "Waitrose": 2.28,
          "Aldi": 1.63,
          "Lidl": 1.65
        }
      },
      {
        "id": "gb-0471-maple-syrup-250ml",
        "name": "maple syrup 250ml",
        "packQty": 250,
        "unit": "ml",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "maple syrup"
        ],
        "legacyKey": "[\"maple syrup 250ml\",250,\"ml\",2.5,2.5,null,null,null,null,null,null,null,null,null,15,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "sachetWeight": 15
        },
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0472-steamed-brown-basmati-rice-pouch-250g",
        "name": "steamed brown basmati rice pouch 250g",
        "packQty": 250,
        "unit": "g",
        "price": 0.75,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "steamed brown basmati rice"
        ],
        "legacyKey": "[\"steamed brown basmati rice pouch 250g\",250,\"g\",0.75,0.75,null,null,null,null,null,null,null,250,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.75,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "pouchWeight": 250
        },
        "retailerPrices": {
          "Sainsbury's": 0.75,
          "Tesco": 0.74,
          "Asda": 0.72,
          "Morrisons": 0.74,
          "Ocado": 0.8,
          "Waitrose": 0.86,
          "Aldi": 0.61,
          "Lidl": 0.62
        }
      },
      {
        "id": "gb-0473-vegetable-stock-pots-x4",
        "name": "vegetable stock pots x4",
        "packQty": 4,
        "unit": "each",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "knorr vegetable stock"
        ],
        "legacyKey": "[\"vegetable stock pots x4\",4,\"each\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0474-flame-baked-pizza-bases-x2",
        "name": "flame-baked pizza bases x2",
        "packQty": 2,
        "unit": "each",
        "price": 2,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "flame baked pizza bases"
        ],
        "legacyKey": "[\"flame-baked pizza bases x2\",2,\"each\",2,2,220,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 220
        },
        "retailerPrices": {
          "Sainsbury's": 2,
          "Tesco": 1.98,
          "Asda": 1.91,
          "Morrisons": 1.98,
          "Ocado": 2.14,
          "Waitrose": 2.29,
          "Aldi": 1.64,
          "Lidl": 1.66
        }
      },
      {
        "id": "gb-0475-wildfarmed-pizza-bases-x2",
        "name": "Wildfarmed pizza bases x2",
        "packQty": 2,
        "unit": "each",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "wildfarmed pizza bases"
        ],
        "legacyKey": "[\"Wildfarmed pizza bases x2\",2,\"each\",2.5,2.5,220,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 220
        },
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0476-french-camembert-250g",
        "name": "French Camembert 250g",
        "packQty": 250,
        "unit": "g",
        "price": 3,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "french camembert"
        ],
        "legacyKey": "[\"French Camembert 250g\",250,\"g\",3,3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 3,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3,
          "Tesco": 2.98,
          "Asda": 2.87,
          "Morrisons": 2.97,
          "Ocado": 3.21,
          "Waitrose": 3.44,
          "Aldi": 2.45,
          "Lidl": 2.49
        }
      },
      {
        "id": "gb-0477-shichimi-togarashi-15g",
        "name": "shichimi togarashi 15g",
        "packQty": 15,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "shichimi togarashi"
        ],
        "legacyKey": "[\"shichimi togarashi 15g\",15,\"g\",2.5,2.5,null,null,3,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tspWeight": 3
        },
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0478-sweet-pepper-relish-300g",
        "name": "sweet pepper relish 300g",
        "packQty": 300,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "sweet pepper relish"
        ],
        "legacyKey": "[\"sweet pepper relish 300g\",300,\"g\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0479-fish-sauce-150ml",
        "name": "fish sauce 150ml",
        "packQty": 150,
        "unit": "ml",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "fish sauce"
        ],
        "legacyKey": "[\"fish sauce 150ml\",150,\"ml\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0480-this-isn-t-pork-sausages-x6",
        "name": "THIS Isn't Pork Sausages x6",
        "packQty": 6,
        "unit": "each",
        "price": 3,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "this isn't pork sausages"
        ],
        "legacyKey": "[\"THIS Isn't Pork Sausages x6\",6,\"each\",3,3,60,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 3,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 60
        },
        "retailerPrices": {
          "Sainsbury's": 3,
          "Tesco": 2.98,
          "Asda": 2.87,
          "Morrisons": 2.97,
          "Ocado": 3.21,
          "Waitrose": 3.44,
          "Aldi": 2.45,
          "Lidl": 2.49
        }
      },
      {
        "id": "gb-0481-blue-stilton-200g",
        "name": "Blue Stilton 200g",
        "packQty": 200,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "blue stilton cheese"
        ],
        "legacyKey": "[\"Blue Stilton 200g\",200,\"g\",2.5,2.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0482-garlic-and-herb-dip-100g",
        "name": "garlic and herb dip 100g",
        "packQty": 100,
        "unit": "g",
        "price": 1.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "garlic herb dip"
        ],
        "legacyKey": "[\"garlic and herb dip 100g\",100,\"g\",1.5,1.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.5,
          "Tesco": 1.49,
          "Asda": 1.44,
          "Morrisons": 1.49,
          "Ocado": 1.6,
          "Waitrose": 1.72,
          "Aldi": 1.23,
          "Lidl": 1.24
        }
      },
      {
        "id": "gb-0483-smoked-mackerel-240g",
        "name": "smoked mackerel 240g",
        "packQty": 240,
        "unit": "g",
        "price": 2.5,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "smoked mackerel fillet"
        ],
        "legacyKey": "[\"smoked mackerel 240g\",240,\"g\",2.5,2.5,80,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 2.5,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 80
        },
        "retailerPrices": {
          "Sainsbury's": 2.5,
          "Tesco": 2.48,
          "Asda": 2.39,
          "Morrisons": 2.48,
          "Ocado": 2.67,
          "Waitrose": 2.86,
          "Aldi": 2.04,
          "Lidl": 2.07
        }
      },
      {
        "id": "gb-0484-tuna-chunks-in-spring-water-145g-tin",
        "name": "tuna chunks in spring water 145g tin",
        "packQty": 1,
        "unit": "tin",
        "price": 1.1,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "tuna chunks in spring water"
        ],
        "legacyKey": "[\"tuna chunks in spring water 145g tin\",1,\"tin\",1.1,1.1,null,145,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.1,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tinWeight": 145
        },
        "retailerPrices": {
          "Sainsbury's": 1.1,
          "Tesco": 1.09,
          "Asda": 1.05,
          "Morrisons": 1.09,
          "Ocado": 1.18,
          "Waitrose": 1.26,
          "Aldi": 0.9,
          "Lidl": 0.91
        }
      },
      {
        "id": "gb-0485-ground-cumin-40g",
        "name": "ground cumin 40g",
        "packQty": 40,
        "unit": "g",
        "price": 1.25,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "ground cumin"
        ],
        "legacyKey": "[\"ground cumin 40g\",40,\"g\",1.25,1.25,4,null,2.2,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.25,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 4,
          "tspWeight": 2.2
        },
        "retailerPrices": {
          "Sainsbury's": 1.25,
          "Tesco": 1.24,
          "Asda": 1.2,
          "Morrisons": 1.24,
          "Ocado": 1.34,
          "Waitrose": 1.43,
          "Aldi": 1.02,
          "Lidl": 1.04
        }
      },
      {
        "id": "gb-0486-sweetcorn-200g-tin",
        "name": "sweetcorn 200g tin",
        "packQty": 1,
        "unit": "tin",
        "price": 0.65,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "canned sweetcorn"
        ],
        "legacyKey": "[\"sweetcorn 200g tin\",1,\"tin\",0.65,0.65,null,200,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.65,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "tinWeight": 200
        },
        "retailerPrices": {
          "Sainsbury's": 0.65,
          "Tesco": 0.64,
          "Asda": 0.62,
          "Morrisons": 0.64,
          "Ocado": 0.7,
          "Waitrose": 0.74,
          "Aldi": 0.53,
          "Lidl": 0.54
        }
      },
      {
        "id": "gb-0487-this-plant-based-sausages-pack",
        "name": "THIS plant based sausages pack",
        "packQty": 1,
        "unit": "pack",
        "price": 3,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "this plant based sausages"
        ],
        "legacyKey": "[\"THIS plant based sausages pack\",1,\"pack\",3,3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 3,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 3,
          "Tesco": 2.98,
          "Asda": 2.87,
          "Morrisons": 2.97,
          "Ocado": 3.21,
          "Waitrose": 3.44,
          "Aldi": 2.45,
          "Lidl": 2.49
        }
      },
      {
        "id": "gb-0488-plant-based-mince-454g",
        "name": "plant-based mince 454g",
        "packQty": 454,
        "unit": "g",
        "price": 1.58,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "meatless farm mince",
          "meat free mince",
          "plant based mince"
        ],
        "legacyKey": "[\"plant-based mince 454g\",454,\"g\",1.58,1.58,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.58,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.58,
          "Tesco": 1.57,
          "Asda": 1.51,
          "Morrisons": 1.56,
          "Ocado": 1.69,
          "Waitrose": 1.81,
          "Aldi": 1.29,
          "Lidl": 1.31
        }
      },
      {
        "id": "gb-0489-closed-cup-mushrooms-400g",
        "name": "closed cup mushrooms 400g",
        "packQty": 400,
        "unit": "g",
        "price": 1.29,
        "observedAt": null,
        "sourceRetailers": [],
        "aliases": [
          "flat white mushrooms",
          "baby button mushrooms",
          "chestnut mushrooms",
          "white cup mushrooms"
        ],
        "legacyKey": "[\"closed cup mushrooms 400g\",400,\"g\",1.29,1.29,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.29,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.29,
          "Tesco": 1.28,
          "Asda": 1.24,
          "Morrisons": 1.28,
          "Ocado": 1.38,
          "Waitrose": 1.48,
          "Aldi": 1.05,
          "Lidl": 1.07
        }
      },
      {
        "id": "gb-0490-tenderstem-broccoli-200g",
        "name": "Tenderstem broccoli 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.6,
        "observedAt": "2026-09-25",
        "sourceRetailers": [
          "Sainsbury's"
        ],
        "aliases": [
          "tenderstem broccoli"
        ],
        "legacyKey": "[\"Tenderstem broccoli 200g\",200,\"g\",1.6,1.6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.6,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.6,
          "Tesco": 1.59,
          "Asda": 1.53,
          "Morrisons": 1.58,
          "Ocado": 1.71,
          "Waitrose": 1.83,
          "Aldi": 1.31,
          "Lidl": 1.33
        }
      },
      {
        "id": "gb-0491-salted-butter-250g",
        "name": "salted butter 250g",
        "packQty": 250,
        "unit": "g",
        "price": 1.85,
        "observedAt": "2026-09-25",
        "sourceRetailers": [
          "Sainsbury's"
        ],
        "aliases": [
          "butter",
          "salted butter"
        ],
        "legacyKey": "[\"salted butter 250g\",250,\"g\",1.85,1.85,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.85,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.85,
          "Tesco": 1.84,
          "Asda": 1.77,
          "Morrisons": 1.83,
          "Ocado": 1.98,
          "Waitrose": 2.12,
          "Aldi": 1.51,
          "Lidl": 1.54
        }
      },
      {
        "id": "gb-0492-maris-piper-potatoes-2kg",
        "name": "Maris Piper potatoes 2kg",
        "packQty": 2000,
        "unit": "g",
        "price": 1.8,
        "observedAt": "2026-09-25",
        "sourceRetailers": [
          "Sainsbury's"
        ],
        "aliases": [
          "potatoes",
          "maris piper potatoes"
        ],
        "legacyKey": "[\"Maris Piper potatoes 2kg\",2000,\"g\",1.8,1.8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.8,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 1.8,
          "Tesco": 1.79,
          "Asda": 1.72,
          "Morrisons": 1.78,
          "Ocado": 1.93,
          "Waitrose": 2.06,
          "Aldi": 1.47,
          "Lidl": 1.49
        }
      },
      {
        "id": "gb-0493-carrots-1kg",
        "name": "carrots 1kg",
        "packQty": 1000,
        "unit": "g",
        "price": 0.69,
        "observedAt": "2026-09-25",
        "sourceRetailers": [
          "Sainsbury's"
        ],
        "aliases": [
          "carrot",
          "carrots"
        ],
        "legacyKey": "[\"carrots 1kg\",1000,\"g\",0.69,0.69,80,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.69,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 80
        },
        "retailerPrices": {
          "Sainsbury's": 0.69,
          "Tesco": 0.68,
          "Asda": 0.66,
          "Morrisons": 0.68,
          "Ocado": 0.74,
          "Waitrose": 0.79,
          "Aldi": 0.56,
          "Lidl": 0.57
        }
      },
      {
        "id": "gb-0494-garlic-x4-bulbs-about-40-cloves",
        "name": "garlic x4 bulbs (about 40 cloves)",
        "packQty": 40,
        "unit": "clove",
        "price": 0.87,
        "observedAt": "2026-09-25",
        "sourceRetailers": [
          "Sainsbury's"
        ],
        "aliases": [
          "garlic clove",
          "garlic",
          "garlic cloves"
        ],
        "legacyKey": "[\"garlic x4 bulbs (about 40 cloves)\",40,\"clove\",0.87,0.87,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 0.87,
        "confidence": "unverified-benchmark",
        "conversionHints": {},
        "retailerPrices": {
          "Sainsbury's": 0.87,
          "Tesco": 0.86,
          "Asda": 0.83,
          "Morrisons": 0.86,
          "Ocado": 0.93,
          "Waitrose": 1,
          "Aldi": 0.71,
          "Lidl": 0.72
        }
      },
      {
        "id": "gb-0495-fine-green-beans-200g",
        "name": "fine green beans 200g",
        "packQty": 200,
        "unit": "g",
        "price": 1.4,
        "observedAt": "2026-09-25",
        "sourceRetailers": [
          "Sainsbury's"
        ],
        "aliases": [
          "green beans",
          "fine green beans"
        ],
        "legacyKey": "[\"fine green beans 200g\",200,\"g\",1.4,1.4,8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]",
        "savingPrice": 1.4,
        "confidence": "unverified-benchmark",
        "conversionHints": {
          "eachWeight": 8
        },
        "retailerPrices": {
          "Sainsbury's": 1.4,
          "Tesco": 1.39,
          "Asda": 1.34,
          "Morrisons": 1.39,
          "Ocado": 1.5,
          "Waitrose": 1.6,
          "Aldi": 1.14,
          "Lidl": 1.16
        }
      }
    ]
  }
});
})();
