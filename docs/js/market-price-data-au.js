window.MW = window.MW || {};
(function () {
  'use strict';
  MW.priceCatalogues = Object.assign(MW.priceCatalogues || {}, {
  "AU": {
    "country": "AU",
    "currency": "AUD",
    "type": "country-benchmark",
    "source": "MealBudget",
    "sourceUrl": "https://mealbudget.app/food-prices/au",
    "permission": "Free to use with attribution to MealBudget and read date, per source page accessed 26 October 2026",
    "attribution": "Australian grocery benchmark prices: MealBudget, read August–October 2026",
    "observedRange": [
      "2026-08-29",
      "2026-10-25"
    ],
    "lastCompiled": "2026-10-26",
    "notRetailerSpecific": true,
    "retailerColumns": {
      "Woolworths": "priceWoolworths",
      "Coles": "priceColes",
      "ALDI": "priceALDI",
      "IGA": "priceIGA"
    },
    "retailerPriceModel": {
      "method": "relative-basket-average-estimate",
      "basis": "June 2026 CHOICE 17 comparable groceries, no specials",
      "published": "2026-09-24",
      "sourceUrl": "https://www.choice.com.au/shopping/everyday-shopping/supermarkets/articles/cheapest-groceries-australia",
      "reference": "arithmetic-mean-of-four-basket-totals",
      "basketTotals": {
        "Woolworths": 74.47,
        "Coles": 76.79,
        "ALDI": 68.89,
        "IGA": 92.69
      },
      "scope": "chain-level general estimate; not verified individual store shelf prices"
    },
    "records": [
      {
        "id": "chicken-breast",
        "name": "Boneless chicken breast",
        "packQty": 1100,
        "unit": "g",
        "price": 14.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "chicken breast",
          "chicken breasts",
          "chicken breast fillet",
          "chicken breast fillets",
          "skinless chicken breast",
          "British Chicken Breasts",
          "Diced British Chicken Breast",
          "chicken breast portions"
        ],
        "retailerPrices": {
          "Woolworths": 14.04,
          "Coles": 14.47,
          "ALDI": 12.98,
          "IGA": 17.47
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 180
        }
      },
      {
        "id": "chicken-thigh",
        "name": "Boneless chicken thighs",
        "packQty": 900,
        "unit": "g",
        "price": 13.15,
        "observedAt": "2026-09-29",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "chicken thigh",
          "chicken thighs",
          "chicken thigh fillet",
          "chicken thigh fillets",
          "British Chicken Thighs"
        ],
        "retailerPrices": {
          "Woolworths": 12.52,
          "Coles": 12.91,
          "ALDI": 11.58,
          "IGA": 15.58
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 180
        }
      },
      {
        "id": "chicken-drumstick",
        "name": "Chicken drumsticks",
        "packQty": 1100,
        "unit": "g",
        "price": 6.8,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "chicken drumstick",
          "chicken drumsticks"
        ],
        "retailerPrices": {
          "Woolworths": 6.47,
          "Coles": 6.68,
          "ALDI": 5.99,
          "IGA": 8.06
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "whole-chicken",
        "name": "Whole chicken",
        "packQty": 2000,
        "unit": "g",
        "price": 12.76,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "whole chicken"
        ],
        "retailerPrices": {
          "Woolworths": 12.15,
          "Coles": 12.53,
          "ALDI": 11.24,
          "IGA": 15.12
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "beef-mince",
        "name": "Ground beef 93% lean",
        "packQty": 450,
        "unit": "g",
        "price": 9.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "beef mince",
          "lean beef mince",
          "5% beef mince",
          "ground beef",
          "British Beef Mince"
        ],
        "retailerPrices": {
          "Woolworths": 8.64,
          "Coles": 8.91,
          "ALDI": 7.99,
          "IGA": 10.75
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "pork-mince",
        "name": "Ground pork",
        "packQty": 450,
        "unit": "g",
        "price": 6.8,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "pork mince",
          "minced pork",
          "ground pork",
          "British Pork Mince",
          "lean pork mince (<5% fat)"
        ],
        "retailerPrices": {
          "Woolworths": 6.47,
          "Coles": 6.68,
          "ALDI": 5.99,
          "IGA": 8.06
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "turkey-mince",
        "name": "Ground turkey 93% lean",
        "packQty": 450,
        "unit": "g",
        "price": 6.57,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "turkey mince",
          "minced turkey",
          "ground turkey"
        ],
        "retailerPrices": {
          "Woolworths": 6.26,
          "Coles": 6.45,
          "ALDI": 5.79,
          "IGA": 7.79
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "pork-sausage",
        "name": "Breakfast sausage",
        "packQty": 450,
        "unit": "g",
        "price": 5.17,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "breakfast sausage"
        ],
        "retailerPrices": {
          "Woolworths": 4.92,
          "Coles": 5.08,
          "ALDI": 4.55,
          "IGA": 6.13
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "italian-sausage",
        "name": "Italian sausage links",
        "packQty": 450,
        "unit": "g",
        "price": 9.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "italian sausages",
          "italian sausage"
        ],
        "retailerPrices": {
          "Woolworths": 8.64,
          "Coles": 8.91,
          "ALDI": 7.99,
          "IGA": 10.75
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "pork-tenderloin",
        "name": "Pork tenderloin",
        "packQty": 550,
        "unit": "g",
        "price": 10.49,
        "observedAt": "2026-09-29",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "pork tenderloin",
          "pork fillet"
        ],
        "retailerPrices": {
          "Woolworths": 9.99,
          "Coles": 10.3,
          "ALDI": 9.24,
          "IGA": 12.43
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "salmon-fresh",
        "name": "Salmon fillet",
        "packQty": 450,
        "unit": "g",
        "price": 27.22,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "salmon fillet",
          "salmon fillets",
          "fresh salmon"
        ],
        "retailerPrices": {
          "Woolworths": 25.92,
          "Coles": 26.73,
          "ALDI": 23.98,
          "IGA": 32.26
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 225
        }
      },
      {
        "id": "salmon-frozen",
        "name": "Frozen salmon fillets",
        "packQty": 900,
        "unit": "g",
        "price": 25.4,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "frozen salmon",
          "frozen salmon fillets"
        ],
        "retailerPrices": {
          "Woolworths": 24.19,
          "Coles": 24.94,
          "ALDI": 22.37,
          "IGA": 30.1
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "prawns-frozen",
        "name": "Frozen raw shrimp",
        "packQty": 450,
        "unit": "g",
        "price": 20.18,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "king prawns",
          "prawns",
          "prawn",
          "jumbo prawns",
          "raw shrimp"
        ],
        "retailerPrices": {
          "Woolworths": 19.21,
          "Coles": 19.81,
          "ALDI": 17.78,
          "IGA": 23.92
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cod-frozen",
        "name": "Frozen cod fillets",
        "packQty": 450,
        "unit": "g",
        "price": 22.68,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "cod fillets",
          "cod fillet",
          "frozen cod"
        ],
        "retailerPrices": {
          "Woolworths": 21.6,
          "Coles": 22.27,
          "ALDI": 19.98,
          "IGA": 26.88
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "tuna-tinned",
        "name": "Canned chunk light tuna",
        "packQty": 150,
        "unit": "g",
        "price": 7.1,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "tinned tuna",
          "tuna tin",
          "canned tuna",
          "tuna chunks",
          "Skipjack Tuna in Water"
        ],
        "retailerPrices": {
          "Woolworths": 6.76,
          "Coles": 6.97,
          "ALDI": 6.25,
          "IGA": 8.41
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "tinWeight": 95
        }
      },
      {
        "id": "firm-tofu",
        "name": "Firm tofu",
        "packQty": 400,
        "unit": "g",
        "price": 3.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "firm tofu",
          "tofu",
          "plain tofu"
        ],
        "retailerPrices": {
          "Woolworths": 3.5,
          "Coles": 3.61,
          "ALDI": 3.24,
          "IGA": 4.36
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "extra-firm-tofu",
        "name": "Extra-firm tofu",
        "packQty": 400,
        "unit": "g",
        "price": 5.29,
        "observedAt": "2026-09-30",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "extra firm tofu",
          "extra-firm tofu"
        ],
        "retailerPrices": {
          "Woolworths": 5.04,
          "Coles": 5.19,
          "ALDI": 4.66,
          "IGA": 6.27
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "carrots",
        "name": "Carrots",
        "packQty": 900,
        "unit": "g",
        "price": 2.44,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "carrot",
          "carrots",
          "Purple Carrot"
        ],
        "retailerPrices": {
          "Woolworths": 2.32,
          "Coles": 2.4,
          "ALDI": 2.15,
          "IGA": 2.89
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 90
        }
      },
      {
        "id": "potatoes",
        "name": "Russet potatoes",
        "packQty": 2300,
        "unit": "g",
        "price": 7.59,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "potatoes",
          "potato",
          "white potatoes",
          "roasting potatoes",
          "white potato",
          "Salad Potatoes",
          "Baking Potato"
        ],
        "retailerPrices": {
          "Woolworths": 7.23,
          "Coles": 7.45,
          "ALDI": 6.69,
          "IGA": 9
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 160
        }
      },
      {
        "id": "sweet-potatoes",
        "name": "Sweet potatoes",
        "packQty": 1400,
        "unit": "g",
        "price": 8.03,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "sweet potatoes",
          "sweet potato",
          "Diced Sweet Potato"
        ],
        "retailerPrices": {
          "Woolworths": 7.65,
          "Coles": 7.88,
          "ALDI": 7.07,
          "IGA": 9.52
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 250
        }
      },
      {
        "id": "zucchini",
        "name": "Zucchini",
        "packQty": 450,
        "unit": "g",
        "price": 1.96,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "zucchini",
          "zucchinis",
          "courgette",
          "courgettes"
        ],
        "retailerPrices": {
          "Woolworths": 1.87,
          "Coles": 1.92,
          "ALDI": 1.73,
          "IGA": 2.32
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 200
        }
      },
      {
        "id": "aubergine",
        "name": "Eggplant",
        "packQty": 1,
        "unit": "each",
        "price": 3.92,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "eggplant",
          "eggplants",
          "aubergine",
          "aubergines",
          "graffiti aubergine"
        ],
        "retailerPrices": {
          "Woolworths": 3.73,
          "Coles": 3.85,
          "ALDI": 3.45,
          "IGA": 4.65
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "yellow-onions",
        "name": "Yellow onions",
        "packQty": 1400,
        "unit": "g",
        "price": 4.43,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "yellow onion",
          "yellow onions",
          "brown onion",
          "brown onions",
          "onion",
          "onions"
        ],
        "retailerPrices": {
          "Woolworths": 4.22,
          "Coles": 4.35,
          "ALDI": 3.9,
          "IGA": 5.25
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "red-onion",
        "name": "Red onion",
        "packQty": 1,
        "unit": "each",
        "price": 1.12,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "red onion",
          "red onions"
        ],
        "retailerPrices": {
          "Woolworths": 1.07,
          "Coles": 1.1,
          "ALDI": 0.99,
          "IGA": 1.33
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "red-capsicum",
        "name": "Red bell pepper",
        "packQty": 1,
        "unit": "each",
        "price": 1.64,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "red capsicum",
          "red pepper",
          "red bell pepper",
          "peppers",
          "red peppers"
        ],
        "retailerPrices": {
          "Woolworths": 1.56,
          "Coles": 1.61,
          "ALDI": 1.44,
          "IGA": 1.94
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 160
        }
      },
      {
        "id": "green-capsicum",
        "name": "Green bell pepper",
        "packQty": 1,
        "unit": "each",
        "price": 1.98,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "green capsicum",
          "green pepper",
          "green bell pepper"
        ],
        "retailerPrices": {
          "Woolworths": 1.89,
          "Coles": 1.94,
          "ALDI": 1.74,
          "IGA": 2.35
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 160
        }
      },
      {
        "id": "green-cabbage",
        "name": "Green cabbage",
        "packQty": 1100,
        "unit": "g",
        "price": 2.1,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "cabbage",
          "green cabbage"
        ],
        "retailerPrices": {
          "Woolworths": 2,
          "Coles": 2.06,
          "ALDI": 1.85,
          "IGA": 2.49
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cauliflower",
        "name": "Cauliflower",
        "packQty": 1,
        "unit": "each",
        "price": 3.75,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "cauliflower",
          "cauliflower head",
          "Cauliflower Florets",
          "Riced Cauliflower"
        ],
        "retailerPrices": {
          "Woolworths": 3.57,
          "Coles": 3.68,
          "ALDI": 3.3,
          "IGA": 4.44
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 650
        }
      },
      {
        "id": "cherry-tomatoes",
        "name": "Cherry tomatoes",
        "packQty": 300,
        "unit": "g",
        "price": 3.63,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "cherry tomatoes",
          "baby plum tomatoes"
        ],
        "retailerPrices": {
          "Woolworths": 3.46,
          "Coles": 3.56,
          "ALDI": 3.2,
          "IGA": 4.3
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 15
        }
      },
      {
        "id": "vine-tomatoes",
        "name": "Vine tomatoes",
        "packQty": 450,
        "unit": "g",
        "price": 5.84,
        "observedAt": "2026-09-23",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "tomato",
          "tomatoes",
          "vine tomatoes",
          "Medium Tomato"
        ],
        "retailerPrices": {
          "Woolworths": 5.56,
          "Coles": 5.73,
          "ALDI": 5.14,
          "IGA": 6.92
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 120
        }
      },
      {
        "id": "baby-spinach",
        "name": "Baby spinach",
        "packQty": 150,
        "unit": "g",
        "price": 2.7,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "spinach",
          "baby spinach",
          "fresh spinach",
          "spinach leaves"
        ],
        "retailerPrices": {
          "Woolworths": 2.57,
          "Coles": 2.65,
          "ALDI": 2.38,
          "IGA": 3.2
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "frozen-spinach",
        "name": "Frozen chopped spinach",
        "packQty": 300,
        "unit": "g",
        "price": 1.13,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "frozen spinach",
          "frozen chopped spinach"
        ],
        "retailerPrices": {
          "Woolworths": 1.08,
          "Coles": 1.11,
          "ALDI": 1,
          "IGA": 1.34
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "green-beans",
        "name": "Fresh green beans",
        "packQty": 450,
        "unit": "g",
        "price": 7.81,
        "observedAt": "2026-09-23",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "green beans",
          "fine green beans",
          "fresh green beans"
        ],
        "retailerPrices": {
          "Woolworths": 7.44,
          "Coles": 7.67,
          "ALDI": 6.88,
          "IGA": 9.26
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "frozen-peas",
        "name": "Frozen green peas",
        "packQty": 350,
        "unit": "g",
        "price": 0.85,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "green peas",
          "peas",
          "garden peas",
          "frozen peas",
          "blanched peas"
        ],
        "retailerPrices": {
          "Woolworths": 0.81,
          "Coles": 0.83,
          "ALDI": 0.75,
          "IGA": 1.01
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "frozen-broccoli",
        "name": "Frozen broccoli florets",
        "packQty": 350,
        "unit": "g",
        "price": 3.28,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "frozen broccoli",
          "frozen broccoli florets"
        ],
        "retailerPrices": {
          "Woolworths": 3.12,
          "Coles": 3.22,
          "ALDI": 2.89,
          "IGA": 3.89
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "broccoli",
        "name": "Broccoli crowns",
        "packQty": 450,
        "unit": "g",
        "price": 12.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "broccoli",
          "broccoli crowns"
        ],
        "retailerPrices": {
          "Woolworths": 11.49,
          "Coles": 11.85,
          "ALDI": 10.63,
          "IGA": 14.3
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 400
        }
      },
      {
        "id": "mushrooms",
        "name": "White button mushrooms",
        "packQty": 250,
        "unit": "g",
        "price": 3.83,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "mushrooms",
          "button mushrooms",
          "white mushrooms",
          "white cup mushrooms",
          "Sliced Mushrooms"
        ],
        "retailerPrices": {
          "Woolworths": 3.65,
          "Coles": 3.76,
          "ALDI": 3.37,
          "IGA": 4.54
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cucumber",
        "name": "Cucumber",
        "packQty": 1,
        "unit": "each",
        "price": 2.08,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "cucumber",
          "cucumbers",
          "Baby Cucumber"
        ],
        "retailerPrices": {
          "Woolworths": 1.98,
          "Coles": 2.04,
          "ALDI": 1.83,
          "IGA": 2.47
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 250,
          "sliceWeight": 15
        }
      },
      {
        "id": "iceberg-lettuce",
        "name": "Iceberg lettuce",
        "packQty": 1,
        "unit": "each",
        "price": 4.46,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "iceberg lettuce",
          "lettuce"
        ],
        "retailerPrices": {
          "Woolworths": 4.25,
          "Coles": 4.38,
          "ALDI": 3.93,
          "IGA": 5.29
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 500,
          "leafWeight": 25
        }
      },
      {
        "id": "asparagus",
        "name": "Asparagus",
        "packQty": 450,
        "unit": "g",
        "price": 9.62,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "asparagus",
          "asparagus spears"
        ],
        "retailerPrices": {
          "Woolworths": 9.16,
          "Coles": 9.45,
          "ALDI": 8.47,
          "IGA": 11.4
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "lemon",
        "name": "Lemon",
        "packQty": 1,
        "unit": "each",
        "price": 1.06,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "lemon",
          "lemons"
        ],
        "retailerPrices": {
          "Woolworths": 1.01,
          "Coles": 1.04,
          "ALDI": 0.93,
          "IGA": 1.26
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "lime",
        "name": "Lime",
        "packQty": 1,
        "unit": "each",
        "price": 1.2,
        "observedAt": "2026-10-25",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "lime",
          "limes"
        ],
        "retailerPrices": {
          "Woolworths": 1.14,
          "Coles": 1.18,
          "ALDI": 1.06,
          "IGA": 1.42
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "garlic",
        "name": "Garlic",
        "packQty": 10,
        "unit": "clove",
        "price": 1.11,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "garlic",
          "garlic clove",
          "garlic cloves"
        ],
        "retailerPrices": {
          "Woolworths": 1.06,
          "Coles": 1.09,
          "ALDI": 0.98,
          "IGA": 1.32
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "ginger",
        "name": "Fresh ginger root",
        "packQty": 100,
        "unit": "g",
        "price": 4.93,
        "observedAt": "2026-10-25",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA"
        ],
        "aliases": [
          "ginger",
          "fresh ginger",
          "ginger root",
          "fresh root ginger"
        ],
        "retailerPrices": {
          "Woolworths": 4.69,
          "Coles": 4.84,
          "ALDI": 4.34,
          "IGA": 5.84
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "celery",
        "name": "Celery",
        "packQty": 1,
        "unit": "each",
        "price": 4.83,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "celery",
          "celery bunch"
        ],
        "retailerPrices": {
          "Woolworths": 4.6,
          "Coles": 4.74,
          "ALDI": 4.25,
          "IGA": 5.72
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "spring-onion",
        "name": "Green onions / scallions",
        "packQty": 1,
        "unit": "each",
        "price": 3,
        "observedAt": "2026-09-30",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "spring onions",
          "spring onion",
          "green onions",
          "scallions"
        ],
        "retailerPrices": {
          "Woolworths": 2.86,
          "Coles": 2.95,
          "ALDI": 2.64,
          "IGA": 3.56
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "basmati-rice",
        "name": "Basmati rice",
        "packQty": 900,
        "unit": "g",
        "price": 5.63,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "basmati rice",
          "brown basmati rice",
          "white basmati rice"
        ],
        "retailerPrices": {
          "Woolworths": 5.36,
          "Coles": 5.53,
          "ALDI": 4.96,
          "IGA": 6.67
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "brown-rice",
        "name": "Brown rice",
        "packQty": 900,
        "unit": "g",
        "price": 2.78,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "brown rice",
          "wholegrain rice"
        ],
        "retailerPrices": {
          "Woolworths": 2.65,
          "Coles": 2.73,
          "ALDI": 2.45,
          "IGA": 3.29
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "jasmine-rice",
        "name": "Jasmine rice",
        "packQty": 2300,
        "unit": "g",
        "price": 12.19,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "jasmine rice"
        ],
        "retailerPrices": {
          "Woolworths": 11.61,
          "Coles": 11.97,
          "ALDI": 10.74,
          "IGA": 14.45
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "white-rice",
        "name": "Long grain white rice",
        "packQty": 2300,
        "unit": "g",
        "price": 14.55,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "white rice",
          "long grain rice",
          "long grain white rice",
          "rice",
          "white long grain rice",
          "cooked white long grain rice"
        ],
        "retailerPrices": {
          "Woolworths": 13.85,
          "Coles": 14.29,
          "ALDI": 12.82,
          "IGA": 17.24
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "penne",
        "name": "Penne pasta",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "penne",
          "penne pasta",
          "pasta",
          "wholemeal penne"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "spaghetti",
        "name": "Spaghetti",
        "packQty": 450,
        "unit": "g",
        "price": 2.18,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "spaghetti",
          "spaghetti pasta"
        ],
        "retailerPrices": {
          "Woolworths": 2.08,
          "Coles": 2.14,
          "ALDI": 1.92,
          "IGA": 2.58
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "rigatoni",
        "name": "Rigatoni",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "rigatoni",
          "rigatoni pasta"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "linguine",
        "name": "Linguine",
        "packQty": 450,
        "unit": "g",
        "price": 2.27,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "linguine",
          "linguine pasta"
        ],
        "retailerPrices": {
          "Woolworths": 2.16,
          "Coles": 2.23,
          "ALDI": 2,
          "IGA": 2.69
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "macaroni",
        "name": "Elbow macaroni",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-02",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "macaroni",
          "elbow macaroni"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "fettuccine",
        "name": "Fettuccine",
        "packQty": 450,
        "unit": "g",
        "price": 3.11,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "fettuccine"
        ],
        "retailerPrices": {
          "Woolworths": 2.96,
          "Coles": 3.05,
          "ALDI": 2.74,
          "IGA": 3.69
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "lasagne",
        "name": "Lasagna noodles",
        "packQty": 450,
        "unit": "g",
        "price": 7.2,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "lasagne sheets",
          "lasagne pasta",
          "lasagna sheets"
        ],
        "retailerPrices": {
          "Woolworths": 6.86,
          "Coles": 7.07,
          "ALDI": 6.34,
          "IGA": 8.53
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "egg-noodles",
        "name": "Egg noodles",
        "packQty": 350,
        "unit": "g",
        "price": 2.92,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "egg noodles",
          "Egg Noodle Nest",
          "Egg Noodle Nests"
        ],
        "retailerPrices": {
          "Woolworths": 2.78,
          "Coles": 2.87,
          "ALDI": 2.57,
          "IGA": 3.46
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "nestWeight": 70
        }
      },
      {
        "id": "vermicelli",
        "name": "Vermicelli noodles",
        "packQty": 450,
        "unit": "g",
        "price": 4.31,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "vermicelli",
          "vermicelli noodles"
        ],
        "retailerPrices": {
          "Woolworths": 4.1,
          "Coles": 4.23,
          "ALDI": 3.8,
          "IGA": 5.11
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "couscous",
        "name": "Couscous",
        "packQty": 300,
        "unit": "g",
        "price": 7.87,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "couscous",
          "giant couscous"
        ],
        "retailerPrices": {
          "Woolworths": 7.49,
          "Coles": 7.73,
          "ALDI": 6.93,
          "IGA": 9.33
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "rolled-oats",
        "name": "Rolled oats",
        "packQty": 1200,
        "unit": "g",
        "price": 2.31,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "oats",
          "rolled oats",
          "porridge oats",
          "jumbo porridge oats"
        ],
        "retailerPrices": {
          "Woolworths": 2.2,
          "Coles": 2.27,
          "ALDI": 2.03,
          "IGA": 2.74
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "plain-flour",
        "name": "All-purpose flour",
        "packQty": 2300,
        "unit": "g",
        "price": 3.04,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "plain flour",
          "flour",
          "all purpose flour"
        ],
        "retailerPrices": {
          "Woolworths": 2.89,
          "Coles": 2.98,
          "ALDI": 2.68,
          "IGA": 3.6
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cornflour",
        "name": "Cornstarch",
        "packQty": 450,
        "unit": "g",
        "price": 1.69,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "cornflour",
          "corn starch",
          "cornstarch"
        ],
        "retailerPrices": {
          "Woolworths": 1.61,
          "Coles": 1.66,
          "ALDI": 1.49,
          "IGA": 2
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "panko",
        "name": "Panko breadcrumbs",
        "packQty": 250,
        "unit": "g",
        "price": 5.41,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "panko",
          "panko breadcrumbs"
        ],
        "retailerPrices": {
          "Woolworths": 5.15,
          "Coles": 5.31,
          "ALDI": 4.77,
          "IGA": 6.41
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "breadcrumbs",
        "name": "Plain breadcrumbs",
        "packQty": 450,
        "unit": "g",
        "price": 5.11,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "breadcrumbs",
          "plain breadcrumbs"
        ],
        "retailerPrices": {
          "Woolworths": 4.87,
          "Coles": 5.02,
          "ALDI": 4.5,
          "IGA": 6.06
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "chickpeas",
        "name": "Canned chickpeas",
        "packQty": 450,
        "unit": "g",
        "price": 2.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "chickpeas",
          "tinned chickpeas",
          "canned chickpeas"
        ],
        "retailerPrices": {
          "Woolworths": 1.97,
          "Coles": 2.03,
          "ALDI": 1.82,
          "IGA": 2.45
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "tinWeight": 450
        }
      },
      {
        "id": "black-beans",
        "name": "Canned black beans",
        "packQty": 450,
        "unit": "g",
        "price": 2.27,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "black beans",
          "tinned black beans",
          "canned black beans"
        ],
        "retailerPrices": {
          "Woolworths": 2.16,
          "Coles": 2.23,
          "ALDI": 2,
          "IGA": 2.69
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "tinWeight": 450
        }
      },
      {
        "id": "kidney-beans",
        "name": "Canned kidney beans",
        "packQty": 450,
        "unit": "g",
        "price": 1.05,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "kidney beans",
          "red kidney beans",
          "canned kidney beans"
        ],
        "retailerPrices": {
          "Woolworths": 1,
          "Coles": 1.03,
          "ALDI": 0.92,
          "IGA": 1.24
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "tinWeight": 400,
          "eachWeight": 400
        }
      },
      {
        "id": "cannellini-beans",
        "name": "Canned cannellini beans",
        "packQty": 450,
        "unit": "g",
        "price": 2.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "cannellini beans",
          "white beans",
          "canned cannellini beans"
        ],
        "retailerPrices": {
          "Woolworths": 1.97,
          "Coles": 2.03,
          "ALDI": 1.82,
          "IGA": 2.45
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "tinWeight": 450
        }
      },
      {
        "id": "red-lentils",
        "name": "Red lentils",
        "packQty": 450,
        "unit": "g",
        "price": 1.81,
        "observedAt": "2026-09-29",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "red lentils",
          "red split lentils"
        ],
        "retailerPrices": {
          "Woolworths": 1.72,
          "Coles": 1.78,
          "ALDI": 1.59,
          "IGA": 2.15
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "lentils",
        "name": "Brown/green lentils",
        "packQty": 450,
        "unit": "g",
        "price": 2.85,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "lentils",
          "brown lentils",
          "green lentils"
        ],
        "retailerPrices": {
          "Woolworths": 2.71,
          "Coles": 2.8,
          "ALDI": 2.51,
          "IGA": 3.38
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "coconut-milk",
        "name": "Canned coconut milk",
        "packQty": 400,
        "unit": "g",
        "price": 3.41,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "coconut milk",
          "tinned coconut milk",
          "coconut milk tin"
        ],
        "retailerPrices": {
          "Woolworths": 3.25,
          "Coles": 3.35,
          "ALDI": 3,
          "IGA": 4.04
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "gramsPerMl": 1
        }
      },
      {
        "id": "chopped-tomatoes",
        "name": "Canned diced tomatoes",
        "packQty": 400,
        "unit": "g",
        "price": 1.23,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "chopped tomatoes",
          "diced tomatoes",
          "tinned tomatoes",
          "canned tomatoes",
          "finely chopped tomatoes",
          "tinned chopped tomatoes"
        ],
        "retailerPrices": {
          "Woolworths": 1.17,
          "Coles": 1.21,
          "ALDI": 1.08,
          "IGA": 1.46
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "tinWeight": 400
        }
      },
      {
        "id": "tomato-sauce",
        "name": "Canned tomato sauce",
        "packQty": 450,
        "unit": "g",
        "price": 1.82,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "tomato sauce",
          "canned tomato sauce"
        ],
        "retailerPrices": {
          "Woolworths": 1.73,
          "Coles": 1.79,
          "ALDI": 1.6,
          "IGA": 2.16
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "tomato-paste",
        "name": "Tomato paste",
        "packQty": 150,
        "unit": "g",
        "price": 1.09,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "tomato puree",
          "tomato purée",
          "tomato paste",
          "Intense™ Tomato",
          "intense tomato"
        ],
        "retailerPrices": {
          "Woolworths": 1.04,
          "Coles": 1.07,
          "ALDI": 0.96,
          "IGA": 1.29
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 25
        }
      },
      {
        "id": "sweetcorn",
        "name": "Canned sweet corn",
        "packQty": 450,
        "unit": "g",
        "price": 1.03,
        "observedAt": "2026-09-29",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "sweetcorn",
          "sweet corn",
          "canned sweetcorn",
          "tinned sweetcorn"
        ],
        "retailerPrices": {
          "Woolworths": 0.98,
          "Coles": 1.01,
          "ALDI": 0.91,
          "IGA": 1.22
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "frozen-sweetcorn",
        "name": "Frozen sweet corn",
        "packQty": 350,
        "unit": "g",
        "price": 2.43,
        "observedAt": "2026-09-23",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "frozen sweetcorn",
          "frozen corn"
        ],
        "retailerPrices": {
          "Woolworths": 2.31,
          "Coles": 2.39,
          "ALDI": 2.14,
          "IGA": 2.88
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cheddar",
        "name": "Block cheddar cheese",
        "packQty": 250,
        "unit": "g",
        "price": 4.99,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "cheddar",
          "cheddar cheese",
          "mature cheddar",
          "Mature Cheddar Cheese"
        ],
        "retailerPrices": {
          "Woolworths": 4.75,
          "Coles": 4.9,
          "ALDI": 4.4,
          "IGA": 5.91
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "sliceWeight": 25
        }
      },
      {
        "id": "mozzarella",
        "name": "Shredded mozzarella",
        "packQty": 250,
        "unit": "g",
        "price": 4.28,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "mozzarella",
          "mozzarella cheese",
          "grated mozzarella"
        ],
        "retailerPrices": {
          "Woolworths": 4.08,
          "Coles": 4.2,
          "ALDI": 3.77,
          "IGA": 5.07
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "ballWeight": 125,
          "eachWeight": 125
        }
      },
      {
        "id": "feta",
        "name": "Crumbled feta cheese",
        "packQty": 150,
        "unit": "g",
        "price": 7.02,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "feta",
          "feta cheese",
          "greek salad cheese",
          "Greek Style Salad Cheese"
        ],
        "retailerPrices": {
          "Woolworths": 6.68,
          "Coles": 6.89,
          "ALDI": 6.18,
          "IGA": 8.32
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "parmesan",
        "name": "Grated Parmesan cheese",
        "packQty": 250,
        "unit": "g",
        "price": 10.89,
        "observedAt": "2026-10-25",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "parmesan",
          "parmesan cheese",
          "italian hard cheese",
          "Grated Hard Italian Style Cheese",
          "grated Italian hard cheese",
          "Parmigiano Reggiano"
        ],
        "retailerPrices": {
          "Woolworths": 10.37,
          "Coles": 10.69,
          "ALDI": 9.59,
          "IGA": 12.91
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "ricotta",
        "name": "Ricotta cheese",
        "packQty": 450,
        "unit": "g",
        "price": 7.63,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "ricotta",
          "ricotta cheese"
        ],
        "retailerPrices": {
          "Woolworths": 7.27,
          "Coles": 7.49,
          "ALDI": 6.72,
          "IGA": 9.04
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cream-cheese",
        "name": "Cream cheese",
        "packQty": 250,
        "unit": "g",
        "price": 3.76,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "cream cheese",
          "soft cheese"
        ],
        "retailerPrices": {
          "Woolworths": 3.58,
          "Coles": 3.69,
          "ALDI": 3.31,
          "IGA": 4.46
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "greek-yoghurt",
        "name": "Plain Greek yogurt",
        "packQty": 1000,
        "unit": "g",
        "price": 7.03,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "greek yoghurt",
          "greek yogurt",
          "plain yoghurt",
          "plain yogurt",
          "Greek style yoghurt",
          "Greek style yogurt",
          "Greek Style Natural Yoghurt"
        ],
        "retailerPrices": {
          "Woolworths": 6.69,
          "Coles": 6.9,
          "ALDI": 6.19,
          "IGA": 8.33
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-pot-set-natural-greek-style-yoghurt-1kg-1851681",
        "conversionHints": {}
      },
      {
        "id": "sour-cream",
        "name": "Sour cream",
        "packQty": 450,
        "unit": "g",
        "price": 7.48,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "sour cream",
          "soured cream"
        ],
        "retailerPrices": {
          "Woolworths": 7.12,
          "Coles": 7.34,
          "ALDI": 6.59,
          "IGA": 8.86
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cream",
        "name": "Heavy whipping cream",
        "packQty": 450,
        "unit": "ml",
        "price": 4.34,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "double cream",
          "cream",
          "thickened cream"
        ],
        "retailerPrices": {
          "Woolworths": 4.13,
          "Coles": 4.26,
          "ALDI": 3.82,
          "IGA": 5.14
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "milk",
        "name": "Whole milk",
        "packQty": 3800,
        "unit": "ml",
        "price": 6.25,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "milk",
          "whole milk",
          "full cream milk",
          "full fat milk"
        ],
        "retailerPrices": {
          "Woolworths": 5.95,
          "Coles": 6.14,
          "ALDI": 5.51,
          "IGA": 7.41
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "eggs",
        "name": "Large eggs",
        "packQty": 12,
        "unit": "each",
        "price": 5.25,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "egg",
          "eggs",
          "large eggs",
          "free range egg"
        ],
        "retailerPrices": {
          "Woolworths": 5,
          "Coles": 5.15,
          "ALDI": 4.62,
          "IGA": 6.22
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "salted-butter",
        "name": "Salted butter",
        "packQty": 450,
        "unit": "g",
        "price": 9.63,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "butter",
          "salted butter",
          "Butter for the Sauce",
          "Butter for the Roux"
        ],
        "retailerPrices": {
          "Woolworths": 9.17,
          "Coles": 9.46,
          "ALDI": 8.48,
          "IGA": 11.41
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "unsalted-butter",
        "name": "Unsalted butter",
        "packQty": 450,
        "unit": "g",
        "price": 7.8,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "unsalted butter"
        ],
        "retailerPrices": {
          "Woolworths": 7.43,
          "Coles": 7.66,
          "ALDI": 6.87,
          "IGA": 9.24
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "olive-oil",
        "name": "Extra virgin olive oil",
        "packQty": 500,
        "unit": "ml",
        "price": 9.51,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "olive oil",
          "extra virgin olive oil",
          "Olive Oil for the Dressing",
          "Olive Oil for the Salsa",
          "Olive Oil for the Garlic Bread",
          "Olive Oil for the Crumb",
          "Olive Oil for the Marinade"
        ],
        "retailerPrices": {
          "Woolworths": 9.06,
          "Coles": 9.34,
          "ALDI": 8.38,
          "IGA": 11.27
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "vegetable-oil",
        "name": "Vegetable oil",
        "packQty": 1400,
        "unit": "ml",
        "price": 7.57,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "vegetable oil",
          "sunflower oil",
          "cooking oil",
          "Oil for Cooking"
        ],
        "retailerPrices": {
          "Woolworths": 7.21,
          "Coles": 7.43,
          "ALDI": 6.67,
          "IGA": 8.97
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "dijon-mustard",
        "name": "Dijon mustard",
        "packQty": 350,
        "unit": "g",
        "price": 5.49,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "dijon mustard"
        ],
        "retailerPrices": {
          "Woolworths": 5.23,
          "Coles": 5.39,
          "ALDI": 4.84,
          "IGA": 6.51
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "mayonnaise",
        "name": "Mayonnaise",
        "packQty": 900,
        "unit": "ml",
        "price": 12.42,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "mayonnaise",
          "mayo"
        ],
        "retailerPrices": {
          "Woolworths": 11.83,
          "Coles": 12.19,
          "ALDI": 10.94,
          "IGA": 14.72
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "gramsPerMl": 1
        }
      },
      {
        "id": "peanut-butter",
        "name": "Peanut butter",
        "packQty": 450,
        "unit": "g",
        "price": 4.08,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "peanut butter",
          "smooth peanut butter"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4.01,
          "ALDI": 3.59,
          "IGA": 4.84
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "paprika",
        "name": "Paprika",
        "packQty": 60,
        "unit": "g",
        "price": 3.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "paprika",
          "sweet paprika",
          "ground paprika"
        ],
        "retailerPrices": {
          "Woolworths": 3.56,
          "Coles": 3.67,
          "ALDI": 3.29,
          "IGA": 4.43
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "smoked-paprika",
        "name": "Smoked paprika",
        "packQty": 60,
        "unit": "g",
        "price": 3.99,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "smoked paprika",
          "ground smoked paprika"
        ],
        "retailerPrices": {
          "Woolworths": 3.8,
          "Coles": 3.92,
          "ALDI": 3.51,
          "IGA": 4.73
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cumin",
        "name": "Ground cumin",
        "packQty": 55,
        "unit": "g",
        "price": 3.72,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "ground cumin",
          "cumin"
        ],
        "retailerPrices": {
          "Woolworths": 3.54,
          "Coles": 3.65,
          "ALDI": 3.28,
          "IGA": 4.41
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 10
        }
      },
      {
        "id": "turmeric",
        "name": "Ground turmeric",
        "packQty": 55,
        "unit": "g",
        "price": 4.8,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "turmeric",
          "ground turmeric"
        ],
        "retailerPrices": {
          "Woolworths": 4.57,
          "Coles": 4.71,
          "ALDI": 4.23,
          "IGA": 5.69
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cinnamon",
        "name": "Ground cinnamon",
        "packQty": 65,
        "unit": "g",
        "price": 4.88,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "cinnamon",
          "ground cinnamon"
        ],
        "retailerPrices": {
          "Woolworths": 4.65,
          "Coles": 4.79,
          "ALDI": 4.3,
          "IGA": 5.78
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "chilli-powder",
        "name": "Chili powder",
        "packQty": 70,
        "unit": "g",
        "price": 3.65,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "chilli powder",
          "chili powder"
        ],
        "retailerPrices": {
          "Woolworths": 3.48,
          "Coles": 3.58,
          "ALDI": 3.22,
          "IGA": 4.33
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "curry-powder",
        "name": "Curry powder",
        "packQty": 55,
        "unit": "g",
        "price": 2.3,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "curry powder",
          "Curry Powder Mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.19,
          "Coles": 2.26,
          "ALDI": 2.03,
          "IGA": 2.73
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "dried-oregano",
        "name": "Dried oregano",
        "packQty": 20,
        "unit": "g",
        "price": 6.92,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "dried oregano",
          "oregano"
        ],
        "retailerPrices": {
          "Woolworths": 6.59,
          "Coles": 6.79,
          "ALDI": 6.1,
          "IGA": 8.2
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "dried-rosemary",
        "name": "Dried rosemary",
        "packQty": 25,
        "unit": "g",
        "price": 3.66,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "dried rosemary",
          "rosemary"
        ],
        "retailerPrices": {
          "Woolworths": 3.48,
          "Coles": 3.59,
          "ALDI": 3.22,
          "IGA": 4.34
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "fresh-basil",
        "name": "Fresh basil",
        "packQty": 20,
        "unit": "g",
        "price": 4.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "fresh basil",
          "basil",
          "Thai basil"
        ],
        "retailerPrices": {
          "Woolworths": 4.46,
          "Coles": 4.6,
          "ALDI": 4.12,
          "IGA": 5.55
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "handfulWeight": 10
        }
      },
      {
        "id": "fresh-parsley",
        "name": "Fresh flat-leaf parsley",
        "packQty": 1,
        "unit": "each",
        "price": 4.5,
        "observedAt": "2026-09-30",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "flat leaf parsley",
          "parsley",
          "fresh parsley"
        ],
        "retailerPrices": {
          "Woolworths": 4.28,
          "Coles": 4.42,
          "ALDI": 3.96,
          "IGA": 5.33
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 25
        }
      },
      {
        "id": "fresh-coriander",
        "name": "Cilantro",
        "packQty": 1,
        "unit": "each",
        "price": 4.5,
        "observedAt": "2026-09-30",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "coriander",
          "cilantro",
          "fresh coriander"
        ],
        "retailerPrices": {
          "Woolworths": 4.28,
          "Coles": 4.42,
          "ALDI": 3.96,
          "IGA": 5.33
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 25
        }
      },
      {
        "id": "fresh-thyme",
        "name": "Fresh thyme",
        "packQty": 19,
        "unit": "g",
        "price": 6.17,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "fresh thyme",
          "thyme"
        ],
        "retailerPrices": {
          "Woolworths": 5.87,
          "Coles": 6.06,
          "ALDI": 5.43,
          "IGA": 7.31
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "honey",
        "name": "Honey",
        "packQty": 350,
        "unit": "g",
        "price": 8.56,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "honey"
        ],
        "retailerPrices": {
          "Woolworths": 8.15,
          "Coles": 8.4,
          "ALDI": 7.54,
          "IGA": 10.14
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "soy-sauce",
        "name": "Soy sauce",
        "packQty": 450,
        "unit": "ml",
        "price": 7.39,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "soy sauce",
          "light soy sauce",
          "tamari soy sauce",
          "gluten free soy sauce"
        ],
        "retailerPrices": {
          "Woolworths": 7.04,
          "Coles": 7.26,
          "ALDI": 6.51,
          "IGA": 8.76
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "hoisin",
        "name": "Hoisin sauce",
        "packQty": 250,
        "unit": "g",
        "price": 5.01,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "hoisin sauce",
          "hoisin"
        ],
        "retailerPrices": {
          "Woolworths": 4.77,
          "Coles": 4.92,
          "ALDI": 4.41,
          "IGA": 5.94
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "oyster-sauce",
        "name": "Oyster sauce",
        "packQty": 250,
        "unit": "g",
        "price": 3.28,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "oyster sauce"
        ],
        "retailerPrices": {
          "Woolworths": 3.12,
          "Coles": 3.22,
          "ALDI": 2.89,
          "IGA": 3.89
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "fish-sauce",
        "name": "Fish sauce",
        "packQty": 200,
        "unit": "ml",
        "price": 3.93,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "fish sauce"
        ],
        "retailerPrices": {
          "Woolworths": 3.74,
          "Coles": 3.86,
          "ALDI": 3.46,
          "IGA": 4.66
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "balsamic",
        "name": "Balsamic vinegar",
        "packQty": 500,
        "unit": "ml",
        "price": 5.73,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "balsamic vinegar",
          "balsamic"
        ],
        "retailerPrices": {
          "Woolworths": 5.46,
          "Coles": 5.63,
          "ALDI": 5.05,
          "IGA": 6.79
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "red-wine-vinegar",
        "name": "Red wine vinegar",
        "packQty": 450,
        "unit": "ml",
        "price": 2.37,
        "observedAt": "2026-09-29",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "red wine vinegar"
        ],
        "retailerPrices": {
          "Woolworths": 2.26,
          "Coles": 2.33,
          "ALDI": 2.09,
          "IGA": 2.81
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "sesame-oil",
        "name": "Toasted sesame oil",
        "packQty": 150,
        "unit": "ml",
        "price": 4.04,
        "observedAt": "2026-09-29",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "sesame oil",
          "toasted sesame oil"
        ],
        "retailerPrices": {
          "Woolworths": 3.85,
          "Coles": 3.97,
          "ALDI": 3.56,
          "IGA": 4.79
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "miso-paste",
        "name": "White miso paste",
        "packQty": 450,
        "unit": "g",
        "price": 16.18,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "miso paste",
          "white miso paste"
        ],
        "retailerPrices": {
          "Woolworths": 15.41,
          "Coles": 15.89,
          "ALDI": 14.25,
          "IGA": 19.18
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "sugar",
        "name": "Granulated white sugar",
        "packQty": 1800,
        "unit": "g",
        "price": 2.3,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "sugar",
          "white sugar",
          "caster sugar",
          "Sugar for the Sauce",
          "Sugar for the Dressing",
          "Sugar for the Pickle",
          "Sugar for the Onions",
          "Sugar for the Salsa",
          "Sugar for Pickling"
        ],
        "retailerPrices": {
          "Woolworths": 2.19,
          "Coles": 2.26,
          "ALDI": 2.03,
          "IGA": 2.73
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "brown-sugar",
        "name": "Brown sugar",
        "packQty": 900,
        "unit": "g",
        "price": 4.22,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "brown sugar"
        ],
        "retailerPrices": {
          "Woolworths": 4.02,
          "Coles": 4.14,
          "ALDI": 3.72,
          "IGA": 5
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "sesame-seeds",
        "name": "Sesame seeds",
        "packQty": 70,
        "unit": "g",
        "price": 5.51,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "sesame seeds",
          "Roasted White Sesame Seeds",
          "toasted sesame seeds",
          "black sesame seeds"
        ],
        "retailerPrices": {
          "Woolworths": 5.25,
          "Coles": 5.41,
          "ALDI": 4.85,
          "IGA": 6.53
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "almonds",
        "name": "Almonds",
        "packQty": 450,
        "unit": "g",
        "price": 8.58,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "almonds",
          "flaked almonds"
        ],
        "retailerPrices": {
          "Woolworths": 8.17,
          "Coles": 8.42,
          "ALDI": 7.56,
          "IGA": 10.17
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "walnuts",
        "name": "Walnut halves",
        "packQty": 250,
        "unit": "g",
        "price": 7.39,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "walnuts",
          "walnut halves"
        ],
        "retailerPrices": {
          "Woolworths": 7.04,
          "Coles": 7.26,
          "ALDI": 6.51,
          "IGA": 8.76
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "raisins",
        "name": "Raisins",
        "packQty": 550,
        "unit": "g",
        "price": 7.62,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "raisins",
          "sultanas"
        ],
        "retailerPrices": {
          "Woolworths": 7.26,
          "Coles": 7.48,
          "ALDI": 6.71,
          "IGA": 9.03
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "maple-syrup",
        "name": "Pure maple syrup",
        "packQty": 250,
        "unit": "ml",
        "price": 9.79,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "maple syrup"
        ],
        "retailerPrices": {
          "Woolworths": 9.32,
          "Coles": 9.61,
          "ALDI": 8.62,
          "IGA": 11.6
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "sachetWeight": 10
        }
      },
      {
        "id": "bread",
        "name": "White sandwich bread",
        "packQty": 550,
        "unit": "g",
        "price": 3.44,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "bread",
          "white bread",
          "sandwich bread"
        ],
        "retailerPrices": {
          "Woolworths": 3.28,
          "Coles": 3.38,
          "ALDI": 3.03,
          "IGA": 4.08
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "sliceWeight": 27.5
        }
      },
      {
        "id": "sourdough",
        "name": "Sourdough loaf",
        "packQty": 700,
        "unit": "g",
        "price": 7,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "sourdough",
          "sourdough bread"
        ],
        "retailerPrices": {
          "Woolworths": 6.67,
          "Coles": 6.87,
          "ALDI": 6.17,
          "IGA": 8.3
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "naan",
        "name": "Naan flatbread",
        "packQty": 4,
        "unit": "each",
        "price": 6.85,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "naan",
          "naan bread",
          "naan flatbread",
          "Plain Naans",
          "plain naan"
        ],
        "retailerPrices": {
          "Woolworths": 6.52,
          "Coles": 6.73,
          "ALDI": 6.03,
          "IGA": 8.12
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "burger-buns",
        "name": "Hamburger buns",
        "packQty": 8,
        "unit": "each",
        "price": 3.6,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "burger buns",
          "hamburger buns",
          "burger bun",
          "brioche buns"
        ],
        "retailerPrices": {
          "Woolworths": 3.43,
          "Coles": 3.53,
          "ALDI": 3.17,
          "IGA": 4.27
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "tortillas",
        "name": "Flour tortillas taco size",
        "packQty": 20,
        "unit": "each",
        "price": 14.8,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA"
        ],
        "aliases": [
          "flour tortillas",
          "wraps",
          "tortillas",
          "soft tortilla wraps",
          "tortilla wraps",
          "small tortillas",
          "tortilla wrap",
          "Plain Taco Tortillas",
          "plain tortillas",
          "large seeded tortilla wrap"
        ],
        "retailerPrices": {
          "Woolworths": 14.09,
          "Coles": 14.53,
          "ALDI": 13.04,
          "IGA": 17.54
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "pita",
        "name": "Pita bread",
        "packQty": 6,
        "unit": "each",
        "price": 4.15,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "pita",
          "pita bread",
          "pitta bread",
          "pitta"
        ],
        "retailerPrices": {
          "Woolworths": 3.95,
          "Coles": 4.07,
          "ALDI": 3.66,
          "IGA": 4.92
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "pizza-dough",
        "name": "Refrigerated pizza dough",
        "packQty": 450,
        "unit": "g",
        "price": 4.84,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "pizza dough",
          "fresh pizza dough"
        ],
        "retailerPrices": {
          "Woolworths": 4.61,
          "Coles": 4.75,
          "ALDI": 4.26,
          "IGA": 5.74
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "ballWeight": 250,
          "eachWeight": 250
        }
      },
      {
        "id": "baguette",
        "name": "French baguette",
        "packQty": 1,
        "unit": "each",
        "price": 2.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "baguette",
          "french baguette"
        ],
        "retailerPrices": {
          "Woolworths": 2.61,
          "Coles": 2.69,
          "ALDI": 2.41,
          "IGA": 3.25
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cucumber-pickle",
        "name": "Dill pickle spears",
        "packQty": 700,
        "unit": "g",
        "price": 7.44,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA"
        ],
        "aliases": [
          "pickles",
          "dill pickles",
          "pickled cucumber"
        ],
        "retailerPrices": {
          "Woolworths": 7.08,
          "Coles": 7.3,
          "ALDI": 6.55,
          "IGA": 8.82
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "salt",
        "name": "Salt",
        "packQty": 750,
        "unit": "g",
        "price": 7.1,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "salt",
          "table salt",
          "sea salt",
          "Salt for the Breadcrumbs",
          "Salt for the Meatballs",
          "Salt for the Tofu",
          "Salt for the Mixture",
          "Salt for the Rice"
        ],
        "retailerPrices": {
          "Woolworths": 6.76,
          "Coles": 6.97,
          "ALDI": 6.25,
          "IGA": 8.41
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "black-pepper",
        "name": "Ground black pepper",
        "packQty": 85,
        "unit": "g",
        "price": 7.07,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "black pepper",
          "ground black pepper",
          "Pepper",
          "Cracked Black Pepper"
        ],
        "retailerPrices": {
          "Woolworths": 6.73,
          "Coles": 6.94,
          "ALDI": 6.23,
          "IGA": 8.38
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "ketchup",
        "name": "Ketchup",
        "packQty": 550,
        "unit": "g",
        "price": 4.26,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "ketchup",
          "tomato ketchup"
        ],
        "retailerPrices": {
          "Woolworths": 4.06,
          "Coles": 4.18,
          "ALDI": 3.75,
          "IGA": 5.05
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "gramsPerMl": 1.1
        }
      },
      {
        "id": "sriracha",
        "name": "Sriracha hot sauce",
        "packQty": 500,
        "unit": "g",
        "price": 6.76,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "sriracha",
          "sriracha sauce"
        ],
        "retailerPrices": {
          "Woolworths": 6.44,
          "Coles": 6.64,
          "ALDI": 5.95,
          "IGA": 8.01
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "gramsPerMl": 1.15
        }
      },
      {
        "id": "coconut-oil",
        "name": "Coconut oil",
        "packQty": 400,
        "unit": "g",
        "price": 10.76,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "coconut oil"
        ],
        "retailerPrices": {
          "Woolworths": 10.25,
          "Coles": 10.56,
          "ALDI": 9.48,
          "IGA": 12.75
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "ranch",
        "name": "Ranch dressing",
        "packQty": 450,
        "unit": "ml",
        "price": 7.71,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "ranch dressing"
        ],
        "retailerPrices": {
          "Woolworths": 7.34,
          "Coles": 7.57,
          "ALDI": 6.79,
          "IGA": 9.14
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "gramsPerMl": 1.05
        }
      },
      {
        "id": "strawberries",
        "name": "Strawberries",
        "packQty": 450,
        "unit": "g",
        "price": 7.52,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "strawberries",
          "strawberry"
        ],
        "retailerPrices": {
          "Woolworths": 7.16,
          "Coles": 7.38,
          "ALDI": 6.62,
          "IGA": 8.91
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "blueberries",
        "name": "Blueberries",
        "packQty": 150,
        "unit": "g",
        "price": 6.3,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "blueberries",
          "blueberry"
        ],
        "retailerPrices": {
          "Woolworths": 6,
          "Coles": 6.19,
          "ALDI": 5.55,
          "IGA": 7.47
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "apples",
        "name": "Apples",
        "packQty": 1400,
        "unit": "g",
        "price": 10.21,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "apple",
          "apples"
        ],
        "retailerPrices": {
          "Woolworths": 9.72,
          "Coles": 10.02,
          "ALDI": 8.99,
          "IGA": 12.1
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "avocado",
        "name": "Avocado",
        "packQty": 1,
        "unit": "each",
        "price": 5.56,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "avocado",
          "avocados"
        ],
        "retailerPrices": {
          "Woolworths": 5.29,
          "Coles": 5.46,
          "ALDI": 4.9,
          "IGA": 6.59
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "orange-juice",
        "name": "Orange juice",
        "packQty": 1500,
        "unit": "ml",
        "price": 6.29,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "orange juice"
        ],
        "retailerPrices": {
          "Woolworths": 5.99,
          "Coles": 6.18,
          "ALDI": 5.54,
          "IGA": 7.45
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "worcestershire",
        "name": "Worcestershire sauce",
        "packQty": 300,
        "unit": "ml",
        "price": 4.26,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "worcestershire sauce",
          "Worcester Sauce"
        ],
        "retailerPrices": {
          "Woolworths": 4.06,
          "Coles": 4.18,
          "ALDI": 3.75,
          "IGA": 5.05
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "baking-powder",
        "name": "Baking powder",
        "packQty": 250,
        "unit": "g",
        "price": 10.94,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "baking powder"
        ],
        "retailerPrices": {
          "Woolworths": 10.42,
          "Coles": 10.74,
          "ALDI": 9.64,
          "IGA": 12.97
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "baking-soda",
        "name": "Baking soda",
        "packQty": 450,
        "unit": "g",
        "price": 2.03,
        "observedAt": "2026-09-29",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "bicarbonate of soda",
          "baking soda"
        ],
        "retailerPrices": {
          "Woolworths": 1.93,
          "Coles": 1.99,
          "ALDI": 1.79,
          "IGA": 2.41
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "icing-sugar",
        "name": "Powdered sugar",
        "packQty": 900,
        "unit": "g",
        "price": 3.79,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "icing sugar",
          "powdered sugar",
          "confectioners sugar"
        ],
        "retailerPrices": {
          "Woolworths": 3.61,
          "Coles": 3.72,
          "ALDI": 3.34,
          "IGA": 4.49
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cayenne-pepper",
        "name": "Cayenne pepper",
        "packQty": 50,
        "unit": "g",
        "price": 2.7,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "cayenne pepper",
          "ground cayenne pepper"
        ],
        "retailerPrices": {
          "Woolworths": 2.57,
          "Coles": 2.65,
          "ALDI": 2.38,
          "IGA": 3.2
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "chilli-flakes",
        "name": "Crushed red pepper flakes",
        "packQty": 45,
        "unit": "g",
        "price": 5.81,
        "observedAt": "2026-09-23",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "chilli flakes",
          "red pepper flakes",
          "chili flakes",
          "crushed red pepper flakes",
          "dried chilli flakes"
        ],
        "retailerPrices": {
          "Woolworths": 5.53,
          "Coles": 5.7,
          "ALDI": 5.12,
          "IGA": 6.89
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "pinchWeight": 0.25
        }
      },
      {
        "id": "ground-ginger",
        "name": "Ground ginger",
        "packQty": 45,
        "unit": "g",
        "price": 3.17,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "ground ginger",
          "ginger powder"
        ],
        "retailerPrices": {
          "Woolworths": 3.02,
          "Coles": 3.11,
          "ALDI": 2.79,
          "IGA": 3.76
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "ground-nutmeg",
        "name": "Ground nutmeg",
        "packQty": 30,
        "unit": "g",
        "price": 4.06,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "ground nutmeg",
          "nutmeg"
        ],
        "retailerPrices": {
          "Woolworths": 3.87,
          "Coles": 3.99,
          "ALDI": 3.58,
          "IGA": 4.81
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "italian-herbs",
        "name": "Italian seasoning blend",
        "packQty": 20,
        "unit": "g",
        "price": 3.28,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "italian seasoning",
          "italian herbs",
          "mixed italian herbs"
        ],
        "retailerPrices": {
          "Woolworths": 3.12,
          "Coles": 3.22,
          "ALDI": 2.89,
          "IGA": 3.89
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "dried-basil",
        "name": "Dried basil",
        "packQty": 18,
        "unit": "g",
        "price": 9.43,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "dried basil"
        ],
        "retailerPrices": {
          "Woolworths": 8.98,
          "Coles": 9.26,
          "ALDI": 8.31,
          "IGA": 11.18
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "bay-leaves",
        "name": "Bay leaves",
        "packQty": 7,
        "unit": "g",
        "price": 2.77,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "bay leaves",
          "dried bay leaves",
          "Dried bay leaf"
        ],
        "retailerPrices": {
          "Woolworths": 2.64,
          "Coles": 2.72,
          "ALDI": 2.44,
          "IGA": 3.28
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 0.2
        }
      },
      {
        "id": "fresh-rosemary",
        "name": "Fresh rosemary",
        "packQty": 19,
        "unit": "g",
        "price": 6.17,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "fresh rosemary"
        ],
        "retailerPrices": {
          "Woolworths": 5.87,
          "Coles": 6.06,
          "ALDI": 5.43,
          "IGA": 7.31
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "garlic-powder",
        "name": "Garlic powder",
        "packQty": 85,
        "unit": "g",
        "price": 5.72,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "garlic powder",
          "garlic granules"
        ],
        "retailerPrices": {
          "Woolworths": 5.45,
          "Coles": 5.62,
          "ALDI": 5.04,
          "IGA": 6.78
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "onion-powder",
        "name": "Onion powder",
        "packQty": 75,
        "unit": "g",
        "price": 4.48,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "onion powder"
        ],
        "retailerPrices": {
          "Woolworths": 4.27,
          "Coles": 4.4,
          "ALDI": 3.95,
          "IGA": 5.31
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "apple-cider-vinegar",
        "name": "Apple cider vinegar",
        "packQty": 450,
        "unit": "ml",
        "price": 3.18,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "apple cider vinegar",
          "cider vinegar"
        ],
        "retailerPrices": {
          "Woolworths": 3.03,
          "Coles": 3.12,
          "ALDI": 2.8,
          "IGA": 3.77
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "white-vinegar",
        "name": "White distilled vinegar",
        "packQty": 950,
        "unit": "ml",
        "price": 5.41,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "white vinegar",
          "distilled vinegar",
          "white distilled vinegar"
        ],
        "retailerPrices": {
          "Woolworths": 5.15,
          "Coles": 5.31,
          "ALDI": 4.77,
          "IGA": 6.41
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "bbq-sauce",
        "name": "Barbecue sauce",
        "packQty": 500,
        "unit": "g",
        "price": 2.16,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "bbq sauce",
          "barbecue sauce"
        ],
        "retailerPrices": {
          "Woolworths": 2.06,
          "Coles": 2.12,
          "ALDI": 1.9,
          "IGA": 2.56
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "hot-sauce",
        "name": "Louisiana-style hot sauce",
        "packQty": 350,
        "unit": "ml",
        "price": 8.75,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "hot sauce",
          "louisiana hot sauce"
        ],
        "retailerPrices": {
          "Woolworths": 8.33,
          "Coles": 8.59,
          "ALDI": 7.71,
          "IGA": 10.37
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "tahini",
        "name": "Tahini",
        "packQty": 450,
        "unit": "g",
        "price": 9.35,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "tahini",
          "tahini paste"
        ],
        "retailerPrices": {
          "Woolworths": 8.9,
          "Coles": 9.18,
          "ALDI": 8.24,
          "IGA": 11.08
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "quinoa",
        "name": "Quinoa",
        "packQty": 700,
        "unit": "g",
        "price": 11.07,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "quinoa"
        ],
        "retailerPrices": {
          "Woolworths": 10.54,
          "Coles": 10.87,
          "ALDI": 9.75,
          "IGA": 13.12
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cornmeal",
        "name": "Yellow cornmeal",
        "packQty": 700,
        "unit": "g",
        "price": 7.29,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "yellow cornmeal",
          "cornmeal"
        ],
        "retailerPrices": {
          "Woolworths": 6.94,
          "Coles": 7.16,
          "ALDI": 6.42,
          "IGA": 8.64
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "pinto-beans",
        "name": "Canned pinto beans",
        "packQty": 450,
        "unit": "g",
        "price": 1.05,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "pinto beans",
          "canned pinto beans"
        ],
        "retailerPrices": {
          "Woolworths": 1,
          "Coles": 1.03,
          "ALDI": 0.92,
          "IGA": 1.24
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "shallots",
        "name": "Shallots",
        "packQty": 85,
        "unit": "g",
        "price": 1.47,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "shallot",
          "shallots"
        ],
        "retailerPrices": {
          "Woolworths": 1.4,
          "Coles": 1.44,
          "ALDI": 1.29,
          "IGA": 1.74
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 40
        }
      },
      {
        "id": "romaine-lettuce",
        "name": "Romaine lettuce",
        "packQty": 3,
        "unit": "each",
        "price": 4.95,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "romaine lettuce",
          "cos lettuce",
          "Baby Gem Lettuce",
          "gem lettuce"
        ],
        "retailerPrices": {
          "Woolworths": 4.71,
          "Coles": 4.86,
          "ALDI": 4.36,
          "IGA": 5.87
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "pizza-sauce",
        "name": "Pizza sauce",
        "packQty": 400,
        "unit": "g",
        "price": 5.03,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "pizza sauce"
        ],
        "retailerPrices": {
          "Woolworths": 4.79,
          "Coles": 4.94,
          "ALDI": 4.43,
          "IGA": 5.96
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "salsa",
        "name": "Jarred salsa",
        "packQty": 450,
        "unit": "g",
        "price": 4.16,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "salsa",
          "jarred salsa"
        ],
        "retailerPrices": {
          "Woolworths": 3.96,
          "Coles": 4.08,
          "ALDI": 3.66,
          "IGA": 4.93
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "chipotle-peppers",
        "name": "Chipotle peppers in adobo",
        "packQty": 200,
        "unit": "g",
        "price": 5.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "chipotle peppers",
          "chipotle peppers in adobo"
        ],
        "retailerPrices": {
          "Woolworths": 5.47,
          "Coles": 5.64,
          "ALDI": 5.06,
          "IGA": 6.8
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "chilli-garlic-sauce",
        "name": "Chilli garlic sauce",
        "packQty": 250,
        "unit": "g",
        "price": 4.57,
        "observedAt": "2026-09-29",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "chilli garlic sauce",
          "chili garlic sauce"
        ],
        "retailerPrices": {
          "Woolworths": 4.35,
          "Coles": 4.49,
          "ALDI": 4.03,
          "IGA": 5.42
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "wholemeal-flour",
        "name": "Whole wheat flour",
        "packQty": 2300,
        "unit": "g",
        "price": 3.46,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "wholemeal flour",
          "wholewheat flour",
          "whole wheat flour"
        ],
        "retailerPrices": {
          "Woolworths": 3.29,
          "Coles": 3.4,
          "ALDI": 3.05,
          "IGA": 4.1
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "wholemeal-bread",
        "name": "Whole wheat sandwich bread",
        "packQty": 550,
        "unit": "g",
        "price": 4.35,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "wholemeal bread",
          "wholewheat bread",
          "whole wheat bread"
        ],
        "retailerPrices": {
          "Woolworths": 4.14,
          "Coles": 4.27,
          "ALDI": 3.83,
          "IGA": 5.16
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "frozen-green-beans",
        "name": "Frozen cut green beans",
        "packQty": 350,
        "unit": "g",
        "price": 0.95,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "frozen green beans",
          "frozen cut green beans"
        ],
        "retailerPrices": {
          "Woolworths": 0.9,
          "Coles": 0.93,
          "ALDI": 0.84,
          "IGA": 1.13
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "frozen-chips",
        "name": "Frozen french fries",
        "packQty": 900,
        "unit": "g",
        "price": 2.86,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "frozen chips",
          "frozen fries",
          "frozen french fries"
        ],
        "retailerPrices": {
          "Woolworths": 2.72,
          "Coles": 2.81,
          "ALDI": 2.52,
          "IGA": 3.39
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "frozen-vegetables",
        "name": "Frozen mixed vegetables",
        "packQty": 350,
        "unit": "g",
        "price": 2.14,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "frozen mixed vegetables",
          "frozen vegetables",
          "frozen veg"
        ],
        "retailerPrices": {
          "Woolworths": 2.04,
          "Coles": 2.1,
          "ALDI": 1.88,
          "IGA": 2.54
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "frozen-berries",
        "name": "Frozen mixed berries",
        "packQty": 350,
        "unit": "g",
        "price": 6.24,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "frozen berries",
          "frozen mixed berries",
          "mixed berries"
        ],
        "retailerPrices": {
          "Woolworths": 5.94,
          "Coles": 6.13,
          "ALDI": 5.5,
          "IGA": 7.4
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "hash-browns",
        "name": "Frozen shredded hash browns",
        "packQty": 850,
        "unit": "g",
        "price": 6.58,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "hash browns",
          "frozen hash browns"
        ],
        "retailerPrices": {
          "Woolworths": 6.27,
          "Coles": 6.46,
          "ALDI": 5.8,
          "IGA": 7.8
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "tortilla-chips",
        "name": "Tortilla chips",
        "packQty": 350,
        "unit": "g",
        "price": 9.16,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "tortilla chips"
        ],
        "retailerPrices": {
          "Woolworths": 8.72,
          "Coles": 8.99,
          "ALDI": 8.07,
          "IGA": 10.86
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "bagels",
        "name": "Bagels",
        "packQty": 6,
        "unit": "each",
        "price": 8.98,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "bagels",
          "bagel"
        ],
        "retailerPrices": {
          "Woolworths": 8.55,
          "Coles": 8.82,
          "ALDI": 7.91,
          "IGA": 10.64
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "corn-tortillas",
        "name": "Corn tortillas",
        "packQty": 30,
        "unit": "each",
        "price": 14.34,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "corn tortillas",
          "corn tortilla"
        ],
        "retailerPrices": {
          "Woolworths": 13.65,
          "Coles": 14.08,
          "ALDI": 12.63,
          "IGA": 16.99
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "canola-oil",
        "name": "Canola oil",
        "packQty": 1400,
        "unit": "ml",
        "price": 5.9,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "canola oil",
          "rapeseed oil",
          "extra virgin rapeseed oil"
        ],
        "retailerPrices": {
          "Woolworths": 5.62,
          "Coles": 5.79,
          "ALDI": 5.2,
          "IGA": 6.99
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "canned-crushed-tomatoes",
        "name": "Canned crushed tomatoes",
        "packQty": 800,
        "unit": "g",
        "price": 3.53,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "crushed tomatoes",
          "canned crushed tomatoes"
        ],
        "retailerPrices": {
          "Woolworths": 3.36,
          "Coles": 3.47,
          "ALDI": 3.11,
          "IGA": 4.18
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "fire-roasted-tomatoes",
        "name": "Canned fire-roasted tomatoes",
        "packQty": 400,
        "unit": "g",
        "price": 1.74,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "fire roasted tomatoes",
          "fire-roasted tomatoes"
        ],
        "retailerPrices": {
          "Woolworths": 1.66,
          "Coles": 1.71,
          "ALDI": 1.53,
          "IGA": 2.06
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "corn-cobs",
        "name": "Corn on the cob",
        "packQty": 4,
        "unit": "each",
        "price": 1.8,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "corn on the cob",
          "corn cob",
          "corn cobs"
        ],
        "retailerPrices": {
          "Woolworths": 1.71,
          "Coles": 1.77,
          "ALDI": 1.59,
          "IGA": 2.13
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "beef-stew",
        "name": "Beef stew meat",
        "packQty": 700,
        "unit": "g",
        "price": 14.29,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "stewing beef",
          "diced beef",
          "beef stew meat"
        ],
        "retailerPrices": {
          "Woolworths": 13.61,
          "Coles": 14.03,
          "ALDI": 12.59,
          "IGA": 16.94
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "chicken-mince",
        "name": "Ground chicken",
        "packQty": 450,
        "unit": "g",
        "price": 6.91,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "chicken mince",
          "ground chicken"
        ],
        "retailerPrices": {
          "Woolworths": 6.58,
          "Coles": 6.78,
          "ALDI": 6.09,
          "IGA": 8.19
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "pork-shoulder",
        "name": "Pork shoulder",
        "packQty": 1800,
        "unit": "g",
        "price": 19.05,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "pork shoulder",
          "pork shoulder joint"
        ],
        "retailerPrices": {
          "Woolworths": 18.14,
          "Coles": 18.7,
          "ALDI": 16.78,
          "IGA": 22.58
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "bacon",
        "name": "Bacon",
        "packQty": 350,
        "unit": "g",
        "price": 7.52,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA"
        ],
        "aliases": [
          "bacon",
          "smoked bacon",
          "bacon rashers"
        ],
        "retailerPrices": {
          "Woolworths": 7.16,
          "Coles": 7.38,
          "ALDI": 6.62,
          "IGA": 8.91
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "smoked-sausage",
        "name": "Kielbasa smoked sausage",
        "packQty": 350,
        "unit": "g",
        "price": 10.91,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "smoked sausage",
          "kielbasa"
        ],
        "retailerPrices": {
          "Woolworths": 10.39,
          "Coles": 10.71,
          "ALDI": 9.61,
          "IGA": 12.93
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "black-olives",
        "name": "Sliced black olives",
        "packQty": 150,
        "unit": "g",
        "price": 2.27,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA"
        ],
        "aliases": [
          "black olives",
          "sliced black olives"
        ],
        "retailerPrices": {
          "Woolworths": 2.16,
          "Coles": 2.23,
          "ALDI": 2,
          "IGA": 2.69
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "capers",
        "name": "Capers",
        "packQty": 100,
        "unit": "g",
        "price": 3.2,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "capers"
        ],
        "retailerPrices": {
          "Woolworths": 3.05,
          "Coles": 3.14,
          "ALDI": 2.82,
          "IGA": 3.79
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "mixed-salad-leaves",
        "name": "Spring mix salad greens",
        "packQty": 150,
        "unit": "g",
        "price": 5.53,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "mixed salad leaves",
          "baby leaf salad",
          "spring mix salad",
          "Baby Leaf Mix"
        ],
        "retailerPrices": {
          "Woolworths": 5.27,
          "Coles": 5.43,
          "ALDI": 4.87,
          "IGA": 6.55
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "roasted-peanuts",
        "name": "Roasted peanuts",
        "packQty": 450,
        "unit": "g",
        "price": 7.87,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "roasted peanuts",
          "peanuts"
        ],
        "retailerPrices": {
          "Woolworths": 7.49,
          "Coles": 7.73,
          "ALDI": 6.93,
          "IGA": 9.33
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "strawberry-jam",
        "name": "Strawberry jam",
        "packQty": 500,
        "unit": "g",
        "price": 12.78,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "strawberry jam",
          "jam"
        ],
        "retailerPrices": {
          "Woolworths": 12.17,
          "Coles": 12.55,
          "ALDI": 11.26,
          "IGA": 15.15
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "vanilla-extract",
        "name": "Vanilla extract",
        "packQty": 60,
        "unit": "ml",
        "price": 6.5,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "vanilla extract"
        ],
        "retailerPrices": {
          "Woolworths": 6.19,
          "Coles": 6.38,
          "ALDI": 5.73,
          "IGA": 7.7
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cocoa-powder",
        "name": "Unsweetened cocoa powder",
        "packQty": 250,
        "unit": "g",
        "price": 33.84,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "cocoa powder",
          "unsweetened cocoa powder"
        ],
        "retailerPrices": {
          "Woolworths": 32.22,
          "Coles": 33.23,
          "ALDI": 29.81,
          "IGA": 40.11
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cream-mushroom-soup",
        "name": "Condensed cream of mushroom soup",
        "packQty": 300,
        "unit": "g",
        "price": 1.54,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "cream of mushroom soup",
          "condensed mushroom soup"
        ],
        "retailerPrices": {
          "Woolworths": 1.47,
          "Coles": 1.51,
          "ALDI": 1.36,
          "IGA": 1.83
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cream-chicken-soup",
        "name": "Condensed cream of chicken soup",
        "packQty": 300,
        "unit": "g",
        "price": 1.54,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "cream of chicken soup",
          "condensed chicken soup"
        ],
        "retailerPrices": {
          "Woolworths": 1.47,
          "Coles": 1.51,
          "ALDI": 1.36,
          "IGA": 1.83
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "kale",
        "name": "Kale",
        "packQty": 1,
        "unit": "each",
        "price": 3.9,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "kale",
          "fresh kale",
          "Chopped Cavolo Nero",
          "Chopped Kale",
          "shredded kale"
        ],
        "retailerPrices": {
          "Woolworths": 3.71,
          "Coles": 3.83,
          "ALDI": 3.44,
          "IGA": 4.62
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "navel-oranges",
        "name": "Navel oranges",
        "packQty": 1800,
        "unit": "g",
        "price": 4.11,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "oranges",
          "navel oranges"
        ],
        "retailerPrices": {
          "Woolworths": 3.91,
          "Coles": 4.04,
          "ALDI": 3.62,
          "IGA": 4.87
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "yellow-mustard",
        "name": "Yellow mustard",
        "packQty": 550,
        "unit": "g",
        "price": 9.62,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "yellow mustard",
          "American yellow mustard",
          "mustard"
        ],
        "retailerPrices": {
          "Woolworths": 9.16,
          "Coles": 9.45,
          "ALDI": 8.47,
          "IGA": 11.4
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "dried-thyme",
        "name": "Dried thyme",
        "packQty": 18,
        "unit": "g",
        "price": 4.34,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "dried thyme"
        ],
        "retailerPrices": {
          "Woolworths": 4.13,
          "Coles": 4.26,
          "ALDI": 3.82,
          "IGA": 5.14
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cottage-cheese",
        "name": "Cottage cheese",
        "packQty": 450,
        "unit": "g",
        "price": 11.14,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "cottage cheese"
        ],
        "retailerPrices": {
          "Woolworths": 10.61,
          "Coles": 10.94,
          "ALDI": 9.81,
          "IGA": 13.2
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "chicken-wings",
        "name": "Chicken wings",
        "packQty": 1400,
        "unit": "g",
        "price": 11.57,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "chicken wings",
          "chicken wing"
        ],
        "retailerPrices": {
          "Woolworths": 11.02,
          "Coles": 11.36,
          "ALDI": 10.19,
          "IGA": 13.71
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "pork-chops-boneless",
        "name": "Boneless pork chops",
        "packQty": 700,
        "unit": "g",
        "price": 17,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "boneless pork chops",
          "boneless pork chop",
          "pork chops",
          "pork chop"
        ],
        "retailerPrices": {
          "Woolworths": 16.19,
          "Coles": 16.69,
          "ALDI": 14.97,
          "IGA": 20.15
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "marinara-sauce",
        "name": "Jarred marinara sauce",
        "packQty": 700,
        "unit": "g",
        "price": 13.45,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "marinara sauce",
          "jarred marinara sauce"
        ],
        "retailerPrices": {
          "Woolworths": 12.81,
          "Coles": 13.21,
          "ALDI": 11.85,
          "IGA": 15.94
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "minced-garlic-jar",
        "name": "Jarred minced garlic",
        "packQty": 250,
        "unit": "g",
        "price": 2.43,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "jarred minced garlic",
          "minced garlic jar"
        ],
        "retailerPrices": {
          "Woolworths": 2.31,
          "Coles": 2.39,
          "ALDI": 2.14,
          "IGA": 2.88
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "english-muffins",
        "name": "English muffins",
        "packQty": 6,
        "unit": "each",
        "price": 5.51,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "English muffins",
          "English muffin"
        ],
        "retailerPrices": {
          "Woolworths": 5.25,
          "Coles": 5.41,
          "ALDI": 4.85,
          "IGA": 6.53
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "coleslaw-mix",
        "name": "Coleslaw mix (bagged)",
        "packQty": 400,
        "unit": "g",
        "price": 4.76,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "coleslaw mix",
          "bagged coleslaw mix",
          "Sliced Carrot and Cabbage Mix",
          "carrot & cabbage slaw mix"
        ],
        "retailerPrices": {
          "Woolworths": 4.53,
          "Coles": 4.67,
          "ALDI": 4.19,
          "IGA": 5.64
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "rotini-pasta",
        "name": "Rotini pasta",
        "packQty": 450,
        "unit": "g",
        "price": 2.27,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "rotini",
          "rotini pasta"
        ],
        "retailerPrices": {
          "Woolworths": 2.16,
          "Coles": 2.23,
          "ALDI": 2,
          "IGA": 2.69
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "sliced-deli-turkey",
        "name": "Sliced deli turkey",
        "packQty": 250,
        "unit": "g",
        "price": 13.92,
        "observedAt": "2026-09-30",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "deli turkey",
          "sliced deli turkey"
        ],
        "retailerPrices": {
          "Woolworths": 13.25,
          "Coles": 13.67,
          "ALDI": 12.26,
          "IGA": 16.5
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "canned-refried-beans",
        "name": "Canned refried beans",
        "packQty": 450,
        "unit": "g",
        "price": 4.8,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "refried beans",
          "canned refried beans"
        ],
        "retailerPrices": {
          "Woolworths": 4.57,
          "Coles": 4.71,
          "ALDI": 4.23,
          "IGA": 5.69
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "canned-green-beans",
        "name": "Canned green beans",
        "packQty": 400,
        "unit": "g",
        "price": 2.03,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "canned green beans",
          "tinned green beans"
        ],
        "retailerPrices": {
          "Woolworths": 1.93,
          "Coles": 1.99,
          "ALDI": 1.79,
          "IGA": 2.41
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "canned-whole-tomatoes",
        "name": "Canned whole peeled tomatoes",
        "packQty": 800,
        "unit": "g",
        "price": 4.12,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "canned whole peeled tomatoes",
          "tinned whole peeled tomatoes"
        ],
        "retailerPrices": {
          "Woolworths": 3.92,
          "Coles": 4.05,
          "ALDI": 3.63,
          "IGA": 4.88
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "semi-sweet-chocolate-chips",
        "name": "Semi-sweet chocolate chips",
        "packQty": 350,
        "unit": "g",
        "price": 11.9,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "semi-sweet chocolate chips",
          "semisweet chocolate chips"
        ],
        "retailerPrices": {
          "Woolworths": 11.33,
          "Coles": 11.68,
          "ALDI": 10.48,
          "IGA": 14.1
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "flour-tortillas-burrito",
        "name": "Flour tortillas (burrito size)",
        "packQty": 10,
        "unit": "each",
        "price": 19.55,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "burrito-size flour tortillas",
          "large flour tortillas",
          "large wraps"
        ],
        "retailerPrices": {
          "Woolworths": 18.62,
          "Coles": 19.2,
          "ALDI": 17.22,
          "IGA": 23.17
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "canned-pink-salmon",
        "name": "Canned pink salmon",
        "packQty": 400,
        "unit": "g",
        "price": 9.96,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "canned pink salmon",
          "tinned pink salmon"
        ],
        "retailerPrices": {
          "Woolworths": 9.48,
          "Coles": 9.78,
          "ALDI": 8.77,
          "IGA": 11.8
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "bone-in-chicken-thighs",
        "name": "Bone-in chicken thighs",
        "packQty": 1100,
        "unit": "g",
        "price": 11.34,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "bone-in chicken thighs",
          "bone in chicken thighs"
        ],
        "retailerPrices": {
          "Woolworths": 10.8,
          "Coles": 11.13,
          "ALDI": 9.99,
          "IGA": 13.44
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "two-percent-milk",
        "name": "2% milk",
        "packQty": 3800,
        "unit": "ml",
        "price": 13.82,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "2% milk",
          "reduced fat milk"
        ],
        "retailerPrices": {
          "Woolworths": 13.16,
          "Coles": 13.57,
          "ALDI": 12.17,
          "IGA": 16.38
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "active-dry-yeast",
        "name": "Active dry yeast",
        "packQty": 3,
        "unit": "each",
        "price": 4.65,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "active dry yeast",
          "dried active yeast"
        ],
        "retailerPrices": {
          "Woolworths": 4.43,
          "Coles": 4.57,
          "ALDI": 4.1,
          "IGA": 5.51
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "unsweetened-almond-milk",
        "name": "Almond milk (unsweetened)",
        "packQty": 1800,
        "unit": "g",
        "price": 4.82,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "unsweetened almond milk",
          "almond milk unsweetened"
        ],
        "retailerPrices": {
          "Woolworths": 4.59,
          "Coles": 4.73,
          "ALDI": 4.25,
          "IGA": 5.71
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "gramsPerMl": 1
        }
      },
      {
        "id": "american-cheese-slices",
        "name": "American cheese slices",
        "packQty": 16,
        "unit": "each",
        "price": 13.5,
        "observedAt": "2026-09-30",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "american cheese slices",
          "american cheese"
        ],
        "retailerPrices": {
          "Woolworths": 12.85,
          "Coles": 13.25,
          "ALDI": 11.89,
          "IGA": 16
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "baby-carrots",
        "name": "Baby carrots",
        "packQty": 450,
        "unit": "g",
        "price": 1.72,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "baby carrots"
        ],
        "retailerPrices": {
          "Woolworths": 1.64,
          "Coles": 1.69,
          "ALDI": 1.52,
          "IGA": 2.04
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "beef-broth",
        "name": "Beef broth",
        "packQty": 900,
        "unit": "g",
        "price": 13.82,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "beef broth"
        ],
        "retailerPrices": {
          "Woolworths": 13.16,
          "Coles": 13.57,
          "ALDI": 12.17,
          "IGA": 16.38
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "beef-chuck-roast",
        "name": "Beef chuck roast",
        "packQty": 1400,
        "unit": "g",
        "price": 28.58,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "beef chuck roast",
          "chuck roast"
        ],
        "retailerPrices": {
          "Woolworths": 27.21,
          "Coles": 28.06,
          "ALDI": 25.17,
          "IGA": 33.87
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "bottled-lemon-juice",
        "name": "Bottled lemon juice",
        "packQty": 250,
        "unit": "ml",
        "price": 5.8,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "bottled lemon juice",
          "lemon juice bottle"
        ],
        "retailerPrices": {
          "Woolworths": 5.52,
          "Coles": 5.69,
          "ALDI": 5.11,
          "IGA": 6.87
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "butternut-squash",
        "name": "Butternut squash",
        "packQty": 900,
        "unit": "g",
        "price": 2.72,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "butternut squash",
          "butternut pumpkin",
          "Diced Butternut Squash",
          "butternut squash cubes",
          "whole butternut squash"
        ],
        "retailerPrices": {
          "Woolworths": 2.59,
          "Coles": 2.67,
          "ALDI": 2.4,
          "IGA": 3.22
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {
          "eachWeight": 900
        }
      },
      {
        "id": "cajun-seasoning",
        "name": "Cajun / Creole seasoning",
        "packQty": 100,
        "unit": "g",
        "price": 7.06,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "cajun seasoning",
          "creole seasoning",
          "cajun spice mix"
        ],
        "retailerPrices": {
          "Woolworths": 6.72,
          "Coles": 6.93,
          "ALDI": 6.22,
          "IGA": 8.37
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "canned-diced-green-chiles",
        "name": "Canned diced green chiles",
        "packQty": 100,
        "unit": "g",
        "price": 3.16,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "canned diced green chiles",
          "tinned chopped green chillies"
        ],
        "retailerPrices": {
          "Woolworths": 3.01,
          "Coles": 3.1,
          "ALDI": 2.78,
          "IGA": 3.75
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "canned-tomatoes-with-green-chiles",
        "name": "Canned diced tomatoes with green chiles",
        "packQty": 300,
        "unit": "g",
        "price": 1.2,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "canned diced tomatoes with green chiles",
          "chopped tomatoes with green chillies"
        ],
        "retailerPrices": {
          "Woolworths": 1.14,
          "Coles": 1.18,
          "ALDI": 1.06,
          "IGA": 1.42
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "red-enchilada-sauce",
        "name": "Canned red enchilada sauce",
        "packQty": 300,
        "unit": "g",
        "price": 4.91,
        "observedAt": "2026-09-30",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "red enchilada sauce",
          "canned red enchilada sauce"
        ],
        "retailerPrices": {
          "Woolworths": 4.68,
          "Coles": 4.82,
          "ALDI": 4.32,
          "IGA": 5.82
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "chicken-broth",
        "name": "Chicken broth",
        "packQty": 900,
        "unit": "g",
        "price": 13,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "chicken broth"
        ],
        "retailerPrices": {
          "Woolworths": 12.38,
          "Coles": 12.76,
          "ALDI": 11.45,
          "IGA": 15.41
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "cremini-mushrooms",
        "name": "Cremini (baby bella) mushrooms",
        "packQty": 250,
        "unit": "g",
        "price": 6.91,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "cremini mushrooms",
          "baby bella mushrooms",
          "chestnut mushrooms"
        ],
        "retailerPrices": {
          "Woolworths": 6.58,
          "Coles": 6.78,
          "ALDI": 6.09,
          "IGA": 8.19
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "dried-black-beans",
        "name": "Dried black beans",
        "packQty": 450,
        "unit": "g",
        "price": 8.72,
        "observedAt": "2026-08-29",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "dried black beans",
          "dry black beans"
        ],
        "retailerPrices": {
          "Woolworths": 8.3,
          "Coles": 8.56,
          "ALDI": 7.68,
          "IGA": 10.33
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "dried-pinto-beans",
        "name": "Dried pinto beans",
        "packQty": 450,
        "unit": "g",
        "price": 4.62,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "dried pinto beans",
          "dry pinto beans"
        ],
        "retailerPrices": {
          "Woolworths": 4.4,
          "Coles": 4.54,
          "ALDI": 4.07,
          "IGA": 5.48
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "dry-red-cooking-wine",
        "name": "Dry red wine (cooking)",
        "packQty": 750,
        "unit": "ml",
        "price": 2.84,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "dry red cooking wine",
          "red cooking wine"
        ],
        "retailerPrices": {
          "Woolworths": 2.7,
          "Coles": 2.79,
          "ALDI": 2.5,
          "IGA": 3.37
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "dry-white-cooking-wine",
        "name": "Dry white wine (cooking)",
        "packQty": 750,
        "unit": "ml",
        "price": 7.57,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "dry white cooking wine",
          "white cooking wine"
        ],
        "retailerPrices": {
          "Woolworths": 7.21,
          "Coles": 7.43,
          "ALDI": 6.67,
          "IGA": 8.97
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "fava-beans",
        "name": "Fava beans (ful medames)",
        "packQty": 450,
        "unit": "g",
        "price": 1.36,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "fava beans",
          "ful medames beans"
        ],
        "retailerPrices": {
          "Woolworths": 1.29,
          "Coles": 1.34,
          "ALDI": 1.2,
          "IGA": 1.61
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "regular-beef-mince",
        "name": "Ground beef (80/20)",
        "packQty": 450,
        "unit": "g",
        "price": 6.8,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "20% beef mince",
          "80/20 ground beef",
          "ground beef 80/20"
        ],
        "retailerPrices": {
          "Woolworths": 6.47,
          "Coles": 6.68,
          "ALDI": 5.99,
          "IGA": 8.06
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "ground-coffee",
        "name": "Ground coffee",
        "packQty": 350,
        "unit": "g",
        "price": 15.99,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "ground coffee"
        ],
        "retailerPrices": {
          "Woolworths": 15.23,
          "Coles": 15.7,
          "ALDI": 14.08,
          "IGA": 18.95
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "half-and-half",
        "name": "Half and half",
        "packQty": 950,
        "unit": "ml",
        "price": 11.67,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "half and half",
          "half-and-half cream"
        ],
        "retailerPrices": {
          "Woolworths": 11.11,
          "Coles": 11.46,
          "ALDI": 10.28,
          "IGA": 13.83
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "hot-dog-buns",
        "name": "Hot dog buns",
        "packQty": 8,
        "unit": "each",
        "price": 3.47,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "hot dog buns",
          "hotdog buns"
        ],
        "retailerPrices": {
          "Woolworths": 3.3,
          "Coles": 3.41,
          "ALDI": 3.06,
          "IGA": 4.11
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "instant-ramen-noodles",
        "name": "Instant ramen noodles",
        "packQty": 6,
        "unit": "each",
        "price": 6.41,
        "observedAt": "2026-09-01",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "instant ramen noodles",
          "ramen noodle packets"
        ],
        "retailerPrices": {
          "Woolworths": 6.1,
          "Coles": 6.29,
          "ALDI": 5.65,
          "IGA": 7.6
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "italian-dressing",
        "name": "Italian dressing",
        "packQty": 450,
        "unit": "ml",
        "price": 4.3,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "italian salad dressing",
          "italian dressing"
        ],
        "retailerPrices": {
          "Woolworths": 4.09,
          "Coles": 4.22,
          "ALDI": 3.79,
          "IGA": 5.1
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "jalapeno-peppers",
        "name": "Jalapeño peppers",
        "packQty": 100,
        "unit": "g",
        "price": 1.68,
        "observedAt": "2026-09-30",
        "sourceRetailers": [
          "Harris Farm"
        ],
        "aliases": [
          "jalapeno peppers",
          "jalapenos",
          "fresh jalapeno"
        ],
        "retailerPrices": {
          "Woolworths": 1.6,
          "Coles": 1.65,
          "ALDI": 1.48,
          "IGA": 1.99
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "margarine-spread",
        "name": "Margarine spread",
        "packQty": 450,
        "unit": "g",
        "price": 2.92,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "margarine spread",
          "margarine"
        ],
        "retailerPrices": {
          "Woolworths": 2.78,
          "Coles": 2.87,
          "ALDI": 2.57,
          "IGA": 3.46
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "oat-milk",
        "name": "Oat milk",
        "packQty": 1800,
        "unit": "g",
        "price": 6.25,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "oat milk",
          "oat drink"
        ],
        "retailerPrices": {
          "Woolworths": 5.95,
          "Coles": 6.14,
          "ALDI": 5.51,
          "IGA": 7.41
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "poblano-peppers",
        "name": "Poblano peppers",
        "packQty": 2,
        "unit": "each",
        "price": 3.3,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "poblano peppers",
          "poblano chilli"
        ],
        "retailerPrices": {
          "Woolworths": 3.14,
          "Coles": 3.24,
          "ALDI": 2.91,
          "IGA": 3.91
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "refrigerated-biscuit-dough",
        "name": "Refrigerated biscuit dough",
        "packQty": 8,
        "unit": "each",
        "price": 11.24,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "refrigerated biscuit dough",
          "american biscuit dough"
        ],
        "retailerPrices": {
          "Woolworths": 10.7,
          "Coles": 11.04,
          "ALDI": 9.9,
          "IGA": 13.32
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "roma-tomatoes",
        "name": "Roma tomatoes",
        "packQty": 450,
        "unit": "g",
        "price": 10.08,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "roma tomatoes",
          "fresh roma tomatoes"
        ],
        "retailerPrices": {
          "Woolworths": 9.6,
          "Coles": 9.9,
          "ALDI": 8.88,
          "IGA": 11.95
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "rotisserie-chicken",
        "name": "Rotisserie chicken",
        "packQty": 1,
        "unit": "each",
        "price": 6.3,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "rotisserie chicken",
          "ready cooked whole chicken"
        ],
        "retailerPrices": {
          "Woolworths": 6,
          "Coles": 6.19,
          "ALDI": 5.55,
          "IGA": 7.47
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "shredded-cheddar-cheese",
        "name": "Shredded cheddar cheese",
        "packQty": 250,
        "unit": "g",
        "price": 4.99,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "shredded cheddar cheese",
          "grated cheddar"
        ],
        "retailerPrices": {
          "Woolworths": 4.75,
          "Coles": 4.9,
          "ALDI": 4.4,
          "IGA": 5.91
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "shredded-mexican-cheese",
        "name": "Shredded Mexican cheese blend",
        "packQty": 250,
        "unit": "g",
        "price": 7.26,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "shredded mexican cheese blend",
          "mexican cheese blend"
        ],
        "retailerPrices": {
          "Woolworths": 6.91,
          "Coles": 7.13,
          "ALDI": 6.39,
          "IGA": 8.6
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "shredded-monterey-jack",
        "name": "Shredded Monterey Jack",
        "packQty": 250,
        "unit": "g",
        "price": 4.28,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "shredded monterey jack",
          "monterey jack cheese"
        ],
        "retailerPrices": {
          "Woolworths": 4.08,
          "Coles": 4.2,
          "ALDI": 3.77,
          "IGA": 5.07
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "sliced-swiss-cheese",
        "name": "Sliced Swiss cheese",
        "packQty": 250,
        "unit": "g",
        "price": 7.6,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "sliced swiss cheese",
          "swiss cheese slices"
        ],
        "retailerPrices": {
          "Woolworths": 7.24,
          "Coles": 7.46,
          "ALDI": 6.69,
          "IGA": 9.01
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "taco-seasoning-packet",
        "name": "Taco seasoning packet",
        "packQty": 30,
        "unit": "g",
        "price": 1.16,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "taco seasoning",
          "taco seasoning mix",
          "taco seasoning packet"
        ],
        "retailerPrices": {
          "Woolworths": 1.1,
          "Coles": 1.14,
          "ALDI": 1.02,
          "IGA": 1.37
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "frozen-tilapia",
        "name": "Tilapia fillets (frozen)",
        "packQty": 450,
        "unit": "g",
        "price": 18.14,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "frozen tilapia fillets",
          "frozen tilapia"
        ],
        "retailerPrices": {
          "Woolworths": 17.27,
          "Coles": 17.81,
          "ALDI": 15.98,
          "IGA": 21.5
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "top-sirloin-steak",
        "name": "Top sirloin steak",
        "packQty": 550,
        "unit": "g",
        "price": 19.53,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "top sirloin steak",
          "sirloin steak",
          "steak"
        ],
        "retailerPrices": {
          "Woolworths": 18.6,
          "Coles": 19.18,
          "ALDI": 17.2,
          "IGA": 23.15
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "vegetable-broth",
        "name": "Vegetable broth",
        "packQty": 900,
        "unit": "g",
        "price": 4.35,
        "observedAt": "2026-09-23",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "vegetable broth"
        ],
        "retailerPrices": {
          "Woolworths": 4.14,
          "Coles": 4.27,
          "ALDI": 3.83,
          "IGA": 5.16
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "yukon-gold-potatoes",
        "name": "Yukon gold potatoes",
        "packQty": 1400,
        "unit": "g",
        "price": 13.95,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "yukon gold potatoes"
        ],
        "retailerPrices": {
          "Woolworths": 13.28,
          "Coles": 13.7,
          "ALDI": 12.29,
          "IGA": 16.53
        },
        "sourceName": null,
        "sourceUrl": null,
        "conversionHints": {}
      },
      {
        "id": "coles-self-raising-flour",
        "name": "Self raising flour",
        "packQty": 1000,
        "unit": "g",
        "price": 1.32,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "self raising flour",
          "self-raising flour"
        ],
        "retailerPrices": {
          "Woolworths": 1.26,
          "Coles": 1.3,
          "ALDI": 1.17,
          "IGA": 1.57
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-simply-self-raising-flour-1kg-5881141",
        "conversionHints": {}
      },
      {
        "id": "coles-mixed-herbs",
        "name": "Mixed dried herbs",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "mixed herbs",
          "dried mixed herbs"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {}
      },
      {
        "id": "coles-garam-masala",
        "name": "Garam masala",
        "packQty": 42,
        "unit": "g",
        "price": 3.26,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "garam masala"
        ],
        "retailerPrices": {
          "Woolworths": 3.1,
          "Coles": 3.2,
          "ALDI": 2.87,
          "IGA": 3.86
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-garam-masala-42g-8987477",
        "conversionHints": {}
      },
      {
        "id": "coles-sweet-chilli",
        "name": "Sweet chilli sauce",
        "packQty": 500,
        "unit": "ml",
        "price": 2.14,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "sweet chilli sauce",
          "sweet chili sauce"
        ],
        "retailerPrices": {
          "Woolworths": 2.04,
          "Coles": 2.1,
          "ALDI": 1.88,
          "IGA": 2.53
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-sweet-chilli-sauce-500ml-5332289",
        "conversionHints": {}
      },
      {
        "id": "coles-basil-pesto",
        "name": "Basil green pesto",
        "packQty": 190,
        "unit": "g",
        "price": 1.99,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "green pesto",
          "basil pesto",
          "pesto",
          "Basil Pesto with Cashew Nuts"
        ],
        "retailerPrices": {
          "Woolworths": 1.89,
          "Coles": 1.95,
          "ALDI": 1.75,
          "IGA": 2.35
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-pesto-basil-190g-5419660",
        "conversionHints": {}
      },
      {
        "id": "coles-red-pesto",
        "name": "Sun-dried tomato red pesto",
        "packQty": 190,
        "unit": "g",
        "price": 1.99,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "red pesto",
          "sundried tomato pesto",
          "sun-dried tomato pesto"
        ],
        "retailerPrices": {
          "Woolworths": 1.89,
          "Coles": 1.95,
          "ALDI": 1.75,
          "IGA": 2.35
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-pesto-sundried-tomato-190g-5419707",
        "conversionHints": {}
      },
      {
        "id": "coles-tomato-passata",
        "name": "Tomato passata",
        "packQty": 700,
        "unit": "g",
        "price": 2.55,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "passata",
          "tomato passata",
          "Passata di Pomodoro"
        ],
        "retailerPrices": {
          "Woolworths": 2.42,
          "Coles": 2.5,
          "ALDI": 2.24,
          "IGA": 3.02
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/promotion/everyday-17089651/pantry/sauces",
        "conversionHints": {}
      },
      {
        "id": "coles-rocket",
        "name": "Fresh rocket leaves",
        "packQty": 100,
        "unit": "g",
        "price": 4.99,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "rocket",
          "wild rocket",
          "fresh rocket",
          "baby rocket"
        ],
        "retailerPrices": {
          "Woolworths": 4.75,
          "Coles": 4.9,
          "ALDI": 4.4,
          "IGA": 5.91
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-organic-rocket-100g-2724828",
        "conversionHints": {
          "handfulWeight": 20
        }
      },
      {
        "id": "coles-hummus",
        "name": "Plain hommus dip",
        "packQty": 200,
        "unit": "g",
        "price": 2.55,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "hummus",
          "hommus",
          "plain hummus",
          "Houmous"
        ],
        "retailerPrices": {
          "Woolworths": 2.42,
          "Coles": 2.5,
          "ALDI": 2.24,
          "IGA": 3.02
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-simply-hommus-dip-200g-1845634",
        "conversionHints": {}
      },
      {
        "id": "coles-bananas",
        "name": "Banana (approx. 170g)",
        "packQty": 1,
        "unit": "each",
        "price": 0.85,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "banana",
          "bananas"
        ],
        "retailerPrices": {
          "Woolworths": 0.8,
          "Coles": 0.83,
          "ALDI": 0.74,
          "IGA": 1
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-bananas-approx.-170g-409499",
        "conversionHints": {}
      },
      {
        "id": "coles-vegetable-stock-cubes",
        "name": "Vegetable stock cubes",
        "packQty": 105,
        "unit": "g",
        "price": 2.04,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "vegetable stock cubes",
          "vegetable stock cube",
          "intense vegetable stock mix",
          "vegetable stock mix",
          "Vegetable Stock Paste"
        ],
        "retailerPrices": {
          "Woolworths": 1.94,
          "Coles": 2,
          "ALDI": 1.79,
          "IGA": 2.41
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-vegetable-flavoured-stock-cubes-105g-1601582",
        "conversionHints": {
          "eachWeight": 10
        }
      },
      {
        "id": "coles-natural-yoghurt",
        "name": "Natural yoghurt",
        "packQty": 1000,
        "unit": "g",
        "price": 7.03,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "natural yoghurt",
          "natural yogurt",
          "yoghurt",
          "yogurt"
        ],
        "retailerPrices": {
          "Woolworths": 6.69,
          "Coles": 6.9,
          "ALDI": 6.19,
          "IGA": 8.33
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-pot-set-natural-greek-style-yoghurt-1kg-1851681",
        "conversionHints": {}
      },
      {
        "id": "au-gap-strong-white-bread-flour",
        "name": "strong white bread flour",
        "packQty": 1000,
        "unit": "g",
        "price": 3.67,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "strong white bread flour",
          "bread flour"
        ],
        "retailerPrices": {
          "Woolworths": 3.49,
          "Coles": 3.6,
          "ALDI": 3.23,
          "IGA": 4.35
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/laucke-wallaby-bakers-bread-flour-1kg-8098632",
        "conversionHints": {}
      },
      {
        "id": "au-gap-light-brown-sugar",
        "name": "light brown sugar",
        "packQty": 500,
        "unit": "g",
        "price": 2.55,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "light brown sugar"
        ],
        "retailerPrices": {
          "Woolworths": 2.42,
          "Coles": 2.5,
          "ALDI": 2.24,
          "IGA": 3.02
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/csr-brown-sugar-500g-120137",
        "conversionHints": {}
      },
      {
        "id": "au-gap-dark-brown-sugar",
        "name": "dark brown sugar",
        "packQty": 1000,
        "unit": "g",
        "price": 4.69,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "dark brown sugar"
        ],
        "retailerPrices": {
          "Woolworths": 4.46,
          "Coles": 4.6,
          "ALDI": 4.13,
          "IGA": 5.55
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/csr-dark-brown-sugar-1kg-447829",
        "conversionHints": {}
      },
      {
        "id": "au-gap-demerara-sugar",
        "name": "demerara sugar",
        "packQty": 375,
        "unit": "g",
        "price": 3.06,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "demerara sugar"
        ],
        "retailerPrices": {
          "Woolworths": 2.91,
          "Coles": 3,
          "ALDI": 2.69,
          "IGA": 3.62
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/csr-demerara-sugar-375g-6040970",
        "conversionHints": {}
      },
      {
        "id": "au-gap-golden-syrup",
        "name": "golden syrup",
        "packQty": 400,
        "unit": "g",
        "price": 2.24,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "golden syrup"
        ],
        "retailerPrices": {
          "Woolworths": 2.13,
          "Coles": 2.2,
          "ALDI": 1.97,
          "IGA": 2.66
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-golden-syrup-400g-9674036",
        "conversionHints": {}
      },
      {
        "id": "au-gap-white-pepper",
        "name": "white pepper",
        "packQty": 100,
        "unit": "g",
        "price": 5.09,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "white pepper"
        ],
        "retailerPrices": {
          "Woolworths": 4.85,
          "Coles": 5,
          "ALDI": 4.49,
          "IGA": 6.04
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-white-pepper-100g-9044719",
        "conversionHints": {}
      },
      {
        "id": "au-gap-hot-paprika",
        "name": "hot paprika",
        "packQty": 60,
        "unit": "g",
        "price": 4.3,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Pantry To Plate"
        ],
        "aliases": [
          "hot paprika"
        ],
        "retailerPrices": {
          "Woolworths": 4.09,
          "Coles": 4.22,
          "ALDI": 3.79,
          "IGA": 5.1
        },
        "sourceName": "Pantry To Plate",
        "sourceUrl": "https://www.pantrytoplate.com.au/products/p2p-paprika-hot",
        "conversionHints": {}
      },
      {
        "id": "au-gap-cumin-seeds",
        "name": "cumin seeds",
        "packQty": 28,
        "unit": "g",
        "price": 4.28,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "cumin seeds"
        ],
        "retailerPrices": {
          "Woolworths": 4.07,
          "Coles": 4.2,
          "ALDI": 3.77,
          "IGA": 5.07
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/masterfoods-whole-cumin-seeds-28g-4355937",
        "conversionHints": {}
      },
      {
        "id": "au-gap-ground-coriander",
        "name": "ground coriander",
        "packQty": 25,
        "unit": "g",
        "price": 2.24,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "ground coriander",
          "coriander powder"
        ],
        "retailerPrices": {
          "Woolworths": 2.13,
          "Coles": 2.2,
          "ALDI": 1.97,
          "IGA": 2.66
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/hoyts-ground-coriander-25g-287008",
        "conversionHints": {}
      },
      {
        "id": "au-gap-coriander-seeds",
        "name": "coriander seeds",
        "packQty": 200,
        "unit": "g",
        "price": 2.04,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "coriander seeds"
        ],
        "retailerPrices": {
          "Woolworths": 1.94,
          "Coles": 2,
          "ALDI": 1.79,
          "IGA": 2.41
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/pattu-coriander-seeds-200g-3339196",
        "conversionHints": {}
      },
      {
        "id": "au-gap-cinnamon-sticks",
        "name": "cinnamon sticks",
        "packQty": 45,
        "unit": "g",
        "price": 6.82,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "cinnamon sticks"
        ],
        "retailerPrices": {
          "Woolworths": 6.5,
          "Coles": 6.7,
          "ALDI": 6.01,
          "IGA": 8.09
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/hoyts-cinnamon-sticks-45g-2480541",
        "conversionHints": {}
      },
      {
        "id": "au-gap-whole-nutmeg",
        "name": "whole nutmeg",
        "packQty": 30,
        "unit": "g",
        "price": 3.36,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "whole nutmeg"
        ],
        "retailerPrices": {
          "Woolworths": 3.2,
          "Coles": 3.3,
          "ALDI": 2.96,
          "IGA": 3.98
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/hoyts-whole-nutmeg-30g-5546464",
        "conversionHints": {}
      },
      {
        "id": "au-gap-ground-cloves",
        "name": "ground cloves",
        "packQty": 48,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "ground cloves"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-cloves-ground-48g-8990019",
        "conversionHints": {}
      },
      {
        "id": "au-gap-whole-cloves",
        "name": "whole cloves",
        "packQty": 15,
        "unit": "g",
        "price": 2.29,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "whole cloves"
        ],
        "retailerPrices": {
          "Woolworths": 2.18,
          "Coles": 2.25,
          "ALDI": 2.02,
          "IGA": 2.72
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/hoyts-whole-cloves-15g-287460",
        "conversionHints": {}
      },
      {
        "id": "au-gap-cardamom-pods",
        "name": "cardamom pods",
        "packQty": 10,
        "unit": "g",
        "price": 3.56,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "cardamom pods",
          "cardamom pod"
        ],
        "retailerPrices": {
          "Woolworths": 3.39,
          "Coles": 3.5,
          "ALDI": 3.14,
          "IGA": 4.22
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/hoyts-cardamom-pods-10g-5121603",
        "conversionHints": {
          "eachWeight": 0.3
        }
      },
      {
        "id": "au-gap-ground-cardamom",
        "name": "ground cardamom",
        "packQty": 35,
        "unit": "g",
        "price": 5.09,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "ground cardamom"
        ],
        "retailerPrices": {
          "Woolworths": 4.85,
          "Coles": 5,
          "ALDI": 4.49,
          "IGA": 6.04
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/masterfoods-ground-cardamom-35g-8602120",
        "conversionHints": {}
      },
      {
        "id": "au-gap-fennel-seeds",
        "name": "fennel seeds",
        "packQty": 36,
        "unit": "g",
        "price": 3.06,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "fennel seeds"
        ],
        "retailerPrices": {
          "Woolworths": 2.91,
          "Coles": 3,
          "ALDI": 2.69,
          "IGA": 3.62
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-whole-fennel-seeds-36g-8987386",
        "conversionHints": {}
      },
      {
        "id": "au-gap-mustard-seeds",
        "name": "mustard seeds",
        "packQty": 200,
        "unit": "g",
        "price": 1.53,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "mustard seeds"
        ],
        "retailerPrices": {
          "Woolworths": 1.45,
          "Coles": 1.5,
          "ALDI": 1.35,
          "IGA": 1.81
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/pattu-mustard-seeds-200g-3339210",
        "conversionHints": {}
      },
      {
        "id": "au-gap-fenugreek",
        "name": "fenugreek",
        "packQty": 100,
        "unit": "g",
        "price": 1.73,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "fenugreek"
        ],
        "retailerPrices": {
          "Woolworths": 1.65,
          "Coles": 1.7,
          "ALDI": 1.53,
          "IGA": 2.05
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/pattu-fenugreek-seeds-100g-3339367",
        "conversionHints": {}
      },
      {
        "id": "au-gap-five-spice",
        "name": "five spice",
        "packQty": 30,
        "unit": "g",
        "price": 3.56,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "five spice",
          "chinese five spice"
        ],
        "retailerPrices": {
          "Woolworths": 3.39,
          "Coles": 3.5,
          "ALDI": 3.14,
          "IGA": 4.22
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/masterfoods-chinese-five-spice-30g-318531",
        "conversionHints": {}
      },
      {
        "id": "au-gap-mixed-spice",
        "name": "mixed spice",
        "packQty": 30,
        "unit": "g",
        "price": 3.56,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "mixed spice"
        ],
        "retailerPrices": {
          "Woolworths": 3.39,
          "Coles": 3.5,
          "ALDI": 3.14,
          "IGA": 4.22
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/masterfoods-mixed-spice-30g-316376",
        "conversionHints": {}
      },
      {
        "id": "au-gap-fresh-mint",
        "name": "fresh mint",
        "packQty": 15,
        "unit": "g",
        "price": 3.36,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "fresh mint",
          "mint leaves",
          "Mint"
        ],
        "retailerPrices": {
          "Woolworths": 3.2,
          "Coles": 3.3,
          "ALDI": 2.96,
          "IGA": 3.98
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-herb-punnets-mint-15g-3214725",
        "conversionHints": {}
      },
      {
        "id": "au-gap-fresh-dill",
        "name": "fresh dill",
        "packQty": 10,
        "unit": "g",
        "price": 3.36,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "fresh dill",
          "dill"
        ],
        "retailerPrices": {
          "Woolworths": 3.2,
          "Coles": 3.3,
          "ALDI": 2.96,
          "IGA": 3.98
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-herb-punnets-dill-10g-3214769",
        "conversionHints": {}
      },
      {
        "id": "au-gap-fresh-chives",
        "name": "fresh chives",
        "packQty": 1,
        "unit": "each",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "fresh chives",
          "chives"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/natoora-chives-bunch-1-bunch-1867874",
        "conversionHints": {
          "eachWeight": 25
        }
      },
      {
        "id": "au-gap-sage",
        "name": "sage",
        "packQty": 10,
        "unit": "g",
        "price": 3.36,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "sage",
          "fresh sage"
        ],
        "retailerPrices": {
          "Woolworths": 3.2,
          "Coles": 3.3,
          "ALDI": 2.96,
          "IGA": 3.98
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-herb-punnets-sage-10g-3215138",
        "conversionHints": {}
      },
      {
        "id": "au-gap-tarragon",
        "name": "tarragon",
        "packQty": 9,
        "unit": "g",
        "price": 3.97,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "tarragon"
        ],
        "retailerPrices": {
          "Woolworths": 3.78,
          "Coles": 3.9,
          "ALDI": 3.5,
          "IGA": 4.71
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/masterfoods-herbs-and-spices-tarragon-leaves-jar-9g-9467268",
        "conversionHints": {}
      },
      {
        "id": "au-gap-lemongrass",
        "name": "lemongrass",
        "packQty": 30,
        "unit": "g",
        "price": 3.36,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "lemongrass"
        ],
        "retailerPrices": {
          "Woolworths": 3.2,
          "Coles": 3.3,
          "ALDI": 2.96,
          "IGA": 3.98
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-herb-punnets-lemongrass-30g-5747863",
        "conversionHints": {}
      },
      {
        "id": "au-gap-white-wine-vinegar",
        "name": "white wine vinegar",
        "packQty": 500,
        "unit": "ml",
        "price": 2.55,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "white wine vinegar"
        ],
        "retailerPrices": {
          "Woolworths": 2.42,
          "Coles": 2.5,
          "ALDI": 2.24,
          "IGA": 3.02
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-italian-white-wine-vinegar-500ml-7195247",
        "conversionHints": {}
      },
      {
        "id": "au-gap-malt-vinegar",
        "name": "malt vinegar",
        "packQty": 375,
        "unit": "ml",
        "price": 2.85,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "malt vinegar"
        ],
        "retailerPrices": {
          "Woolworths": 2.72,
          "Coles": 2.8,
          "ALDI": 2.51,
          "IGA": 3.38
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/cornwell%27s-brown-malt-vinegar-375ml-432752",
        "conversionHints": {}
      },
      {
        "id": "au-gap-rice-vinegar",
        "name": "rice vinegar",
        "packQty": 340,
        "unit": "ml",
        "price": 3.06,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "rice vinegar",
          "rice wine vinegar"
        ],
        "retailerPrices": {
          "Woolworths": 2.91,
          "Coles": 3,
          "ALDI": 2.69,
          "IGA": 3.62
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-asia-rice-wine-vinegar-340ml-5016267",
        "conversionHints": {}
      },
      {
        "id": "au-gap-dark-soy-sauce",
        "name": "dark soy sauce",
        "packQty": 500,
        "unit": "ml",
        "price": 3.06,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "dark soy sauce"
        ],
        "retailerPrices": {
          "Woolworths": 2.91,
          "Coles": 3,
          "ALDI": 2.69,
          "IGA": 3.62
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-asia-dark-soy-sauce-500ml-9057620",
        "conversionHints": {}
      },
      {
        "id": "au-gap-brown-sauce",
        "name": "brown sauce",
        "packQty": 255,
        "unit": "g",
        "price": 8.49,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "IGA Balgowlah"
        ],
        "aliases": [
          "brown sauce"
        ],
        "retailerPrices": {
          "Woolworths": 8.08,
          "Coles": 8.34,
          "ALDI": 7.48,
          "IGA": 10.06
        },
        "sourceName": "IGA Balgowlah",
        "sourceUrl": "https://igabh.com.au/lines/hp-sauce-original-255g",
        "conversionHints": {
          "gramsPerMl": 1.2
        }
      },
      {
        "id": "au-gap-wholegrain-mustard",
        "name": "wholegrain mustard",
        "packQty": 200,
        "unit": "g",
        "price": 2.95,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "wholegrain mustard"
        ],
        "retailerPrices": {
          "Woolworths": 2.81,
          "Coles": 2.9,
          "ALDI": 2.6,
          "IGA": 3.5
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-wholegrain-mustard-200g-2421484",
        "conversionHints": {}
      },
      {
        "id": "au-gap-teriyaki-sauce",
        "name": "teriyaki sauce",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "teriyaki sauce"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {}
      },
      {
        "id": "au-gap-harissa-paste",
        "name": "harissa paste",
        "packQty": 350,
        "unit": "g",
        "price": 2.7,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "harissa paste"
        ],
        "retailerPrices": {
          "Woolworths": 2.57,
          "Coles": 2.65,
          "ALDI": 2.38,
          "IGA": 3.2
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/zahra-harissa-paste-350g-9920176",
        "conversionHints": {}
      },
      {
        "id": "au-gap-gochujang",
        "name": "gochujang",
        "packQty": 170,
        "unit": "g",
        "price": 3.26,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "gochujang"
        ],
        "retailerPrices": {
          "Woolworths": 3.1,
          "Coles": 3.2,
          "ALDI": 2.87,
          "IGA": 3.86
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {}
      },
      {
        "id": "au-gap-plum-tomatoes",
        "name": "plum tomatoes",
        "packQty": 400,
        "unit": "g",
        "price": 1.43,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "plum tomatoes",
          "tinned plum tomatoes"
        ],
        "retailerPrices": {
          "Woolworths": 1.36,
          "Coles": 1.4,
          "ALDI": 1.26,
          "IGA": 1.69
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/cucina-matese-whole-peeled-tomatoes-400g-4837122",
        "conversionHints": {
          "tinWeight": 400
        }
      },
      {
        "id": "au-gap-coconut-cream",
        "name": "coconut cream",
        "packQty": 400,
        "unit": "ml",
        "price": 1.73,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "coconut cream"
        ],
        "retailerPrices": {
          "Woolworths": 1.65,
          "Coles": 1.7,
          "ALDI": 1.53,
          "IGA": 2.05
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-simply-coconut-cream-400ml-5357676",
        "conversionHints": {
          "tinWeight": 400
        }
      },
      {
        "id": "au-gap-chicken-stock-cubes",
        "name": "chicken stock cubes",
        "packQty": 71,
        "unit": "g",
        "price": 2.85,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "chicken stock cubes",
          "chicken stock cube",
          "Chicken Stock Paste",
          "chicken stock mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.72,
          "Coles": 2.8,
          "ALDI": 2.51,
          "IGA": 3.38
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/oxo-chicken-stock-cubes-71g-246102",
        "conversionHints": {
          "eachWeight": 6
        }
      },
      {
        "id": "au-gap-beef-stock-cubes",
        "name": "beef stock cubes",
        "packQty": 71,
        "unit": "g",
        "price": 2.85,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "beef stock cubes",
          "beef stock cube",
          "beef stock mix",
          "intense beef stock mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.72,
          "Coles": 2.8,
          "ALDI": 2.51,
          "IGA": 3.38
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/oxo-beef-stock-cubes-71g-157079",
        "conversionHints": {
          "eachWeight": 6
        }
      },
      {
        "id": "au-gap-fish-stock-cubes",
        "name": "fish stock cubes",
        "packQty": 100,
        "unit": "g",
        "price": 3.99,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "LaManna & Sons"
        ],
        "aliases": [
          "fish stock cubes",
          "fish stock cube"
        ],
        "retailerPrices": {
          "Woolworths": 3.8,
          "Coles": 3.92,
          "ALDI": 3.51,
          "IGA": 4.73
        },
        "sourceName": "LaManna & Sons",
        "sourceUrl": "https://lamannaandsons.com.au/lines/divella-fish-stock-cubes-100g",
        "conversionHints": {
          "eachWeight": 10
        }
      },
      {
        "id": "au-gap-gravy-granules",
        "name": "gravy granules",
        "packQty": 200,
        "unit": "g",
        "price": 7.13,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "gravy granules"
        ],
        "retailerPrices": {
          "Woolworths": 6.79,
          "Coles": 7,
          "ALDI": 6.28,
          "IGA": 8.45
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/paxo-best-beef-gravy-granules-200g-7991016",
        "conversionHints": {}
      },
      {
        "id": "au-gap-arborio-rice",
        "name": "arborio rice",
        "packQty": 1000,
        "unit": "g",
        "price": 4.28,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "arborio rice",
          "risotto rice"
        ],
        "retailerPrices": {
          "Woolworths": 4.07,
          "Coles": 4.2,
          "ALDI": 3.77,
          "IGA": 5.07
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/cucina-matese-arborio-rice-1kg-8465788",
        "conversionHints": {}
      },
      {
        "id": "au-gap-wild-rice",
        "name": "wild rice",
        "packQty": 250,
        "unit": "g",
        "price": 9.95,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Ample Food Store"
        ],
        "aliases": [
          "wild rice"
        ],
        "retailerPrices": {
          "Woolworths": 9.47,
          "Coles": 9.77,
          "ALDI": 8.76,
          "IGA": 11.79
        },
        "sourceName": "Ample Food Store",
        "sourceUrl": "https://amplefoodstore.com.au/product/organic-wild-rice/",
        "conversionHints": {}
      },
      {
        "id": "au-gap-bulgur-wheat",
        "name": "bulgur wheat",
        "packQty": 1000,
        "unit": "g",
        "price": 4.43,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "bulgur wheat"
        ],
        "retailerPrices": {
          "Woolworths": 4.22,
          "Coles": 4.35,
          "ALDI": 3.9,
          "IGA": 5.25
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/duru-brown-coarse-bulgur-1kg-9115045",
        "conversionHints": {}
      },
      {
        "id": "au-gap-pearl-barley",
        "name": "pearl barley",
        "packQty": 500,
        "unit": "g",
        "price": 1.94,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "pearl barley"
        ],
        "retailerPrices": {
          "Woolworths": 1.84,
          "Coles": 1.9,
          "ALDI": 1.7,
          "IGA": 2.29
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/mckenzie%27s-barley-pearl-500g-130039",
        "conversionHints": {}
      },
      {
        "id": "au-gap-polenta",
        "name": "polenta",
        "packQty": 500,
        "unit": "g",
        "price": 5.09,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "polenta"
        ],
        "retailerPrices": {
          "Woolworths": 4.85,
          "Coles": 5,
          "ALDI": 4.49,
          "IGA": 6.04
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/naldoni-instant-italian-polenta-500g-9060001",
        "conversionHints": {}
      },
      {
        "id": "au-gap-noodles",
        "name": "noodles",
        "packQty": 450,
        "unit": "g",
        "price": 3.56,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "noodles"
        ],
        "retailerPrices": {
          "Woolworths": 3.39,
          "Coles": 3.5,
          "ALDI": 3.14,
          "IGA": 4.22
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/fantastic-hokkien-noodles-450g-8679624",
        "conversionHints": {}
      },
      {
        "id": "au-gap-rice-noodles",
        "name": "rice noodles",
        "packQty": 340,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "rice noodles"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-asia-vermicelli-rice-noodles-340g-3735660",
        "conversionHints": {}
      },
      {
        "id": "au-gap-udon-noodles",
        "name": "udon noodles",
        "packQty": 400,
        "unit": "g",
        "price": 1.88,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "udon noodles"
        ],
        "retailerPrices": {
          "Woolworths": 1.79,
          "Coles": 1.85,
          "ALDI": 1.66,
          "IGA": 2.23
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-asia-udon-noodles-ready-to-eat-2x200g-400g-3725338",
        "conversionHints": {}
      },
      {
        "id": "au-gap-fusilli",
        "name": "fusilli",
        "packQty": 500,
        "unit": "g",
        "price": 2.04,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "fusilli"
        ],
        "retailerPrices": {
          "Woolworths": 1.94,
          "Coles": 2,
          "ALDI": 1.79,
          "IGA": 2.41
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/zafarelli-fusilli-pasta-no-17-500g-278153",
        "conversionHints": {}
      },
      {
        "id": "au-gap-butter-beans",
        "name": "butter beans",
        "packQty": 420,
        "unit": "g",
        "price": 0.97,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "butter beans",
          "butter bean"
        ],
        "retailerPrices": {
          "Woolworths": 0.92,
          "Coles": 0.95,
          "ALDI": 0.85,
          "IGA": 1.15
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-simply-butter-beans-420g-8720150",
        "conversionHints": {
          "tinWeight": 420
        }
      },
      {
        "id": "au-gap-borlotti-beans",
        "name": "borlotti beans",
        "packQty": 375,
        "unit": "g",
        "price": 2.65,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "borlotti beans",
          "borlotti bean"
        ],
        "retailerPrices": {
          "Woolworths": 2.52,
          "Coles": 2.6,
          "ALDI": 2.33,
          "IGA": 3.14
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/mckenzie%27s-borlotti-beans-375g-3951880",
        "conversionHints": {}
      },
      {
        "id": "au-gap-baked-beans",
        "name": "baked beans",
        "packQty": 425,
        "unit": "g",
        "price": 1.32,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "baked beans"
        ],
        "retailerPrices": {
          "Woolworths": 1.26,
          "Coles": 1.3,
          "ALDI": 1.17,
          "IGA": 1.57
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-baked-beans-canned-regular-425g-145557",
        "conversionHints": {
          "tinWeight": 425
        }
      },
      {
        "id": "au-gap-puy-lentils",
        "name": "puy lentils",
        "packQty": 375,
        "unit": "g",
        "price": 3.77,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "puy lentils"
        ],
        "retailerPrices": {
          "Woolworths": 3.59,
          "Coles": 3.7,
          "ALDI": 3.32,
          "IGA": 4.47
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/mckenzie%27s-french-style-black-lentils-375g-6288116",
        "conversionHints": {}
      },
      {
        "id": "au-gap-split-peas",
        "name": "split peas",
        "packQty": 500,
        "unit": "g",
        "price": 1.94,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "split peas"
        ],
        "retailerPrices": {
          "Woolworths": 1.84,
          "Coles": 1.9,
          "ALDI": 1.7,
          "IGA": 2.29
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/mckenzie%27s-split-green-peas-500g-353521",
        "conversionHints": {}
      },
      {
        "id": "au-gap-anchovies",
        "name": "anchovies",
        "packQty": 45,
        "unit": "g",
        "price": 4.02,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "anchovies"
        ],
        "retailerPrices": {
          "Woolworths": 3.83,
          "Coles": 3.95,
          "ALDI": 3.54,
          "IGA": 4.77
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/john-west-anchovies-fillets-in-olive-oil-45g-7533962",
        "conversionHints": {}
      },
      {
        "id": "au-gap-sardines",
        "name": "sardines",
        "packQty": 110,
        "unit": "g",
        "price": 1.94,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "sardines"
        ],
        "retailerPrices": {
          "Woolworths": 1.84,
          "Coles": 1.9,
          "ALDI": 1.7,
          "IGA": 2.29
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/brands/safcol-1788544908",
        "conversionHints": {
          "tinWeight": 110
        }
      },
      {
        "id": "au-gap-leeks",
        "name": "leeks",
        "packQty": 1,
        "unit": "each",
        "price": 5.6,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "leeks",
          "leek"
        ],
        "retailerPrices": {
          "Woolworths": 5.33,
          "Coles": 5.5,
          "ALDI": 4.93,
          "IGA": 6.64
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-organic-leek-1-each-5010985",
        "conversionHints": {
          "eachWeight": 250
        }
      },
      {
        "id": "au-gap-parsnips",
        "name": "parsnips",
        "packQty": 1,
        "unit": "each",
        "price": 2.44,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "parsnips",
          "parsnip"
        ],
        "retailerPrices": {
          "Woolworths": 2.33,
          "Coles": 2.4,
          "ALDI": 2.15,
          "IGA": 2.9
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-parsnips-loose-approx.-200g-5298748",
        "conversionHints": {
          "eachWeight": 200
        }
      },
      {
        "id": "au-gap-red-cabbage",
        "name": "red cabbage",
        "packQty": 1,
        "unit": "each",
        "price": 7.03,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "red cabbage"
        ],
        "retailerPrices": {
          "Woolworths": 6.69,
          "Coles": 6.9,
          "ALDI": 6.19,
          "IGA": 8.33
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-mini-red-cabbage-1-each-1473970",
        "conversionHints": {
          "eachWeight": 600
        }
      },
      {
        "id": "au-gap-savoy-cabbage",
        "name": "savoy cabbage",
        "packQty": 1,
        "unit": "each",
        "price": 7.03,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "savoy cabbage"
        ],
        "retailerPrices": {
          "Woolworths": 6.69,
          "Coles": 6.9,
          "ALDI": 6.19,
          "IGA": 8.33
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-mini-savoy-cabbage-1-each-1476083",
        "conversionHints": {
          "eachWeight": 600
        }
      },
      {
        "id": "au-gap-yellow-peppers",
        "name": "yellow peppers",
        "packQty": 1,
        "unit": "each",
        "price": 2,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "yellow peppers",
          "yellow pepper"
        ],
        "retailerPrices": {
          "Woolworths": 1.9,
          "Coles": 1.96,
          "ALDI": 1.76,
          "IGA": 2.37
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-yellow-capsicum-approx.-220g-7215355",
        "conversionHints": {
          "eachWeight": 220
        }
      },
      {
        "id": "au-gap-bell-peppers",
        "name": "bell peppers",
        "packQty": 500,
        "unit": "g",
        "price": 8.05,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "bell peppers",
          "bell pepper"
        ],
        "retailerPrices": {
          "Woolworths": 7.66,
          "Coles": 7.9,
          "ALDI": 7.09,
          "IGA": 9.54
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/browse/fruit-vegetables/vegetables/capsicum",
        "conversionHints": {
          "eachWeight": 165
        }
      },
      {
        "id": "au-gap-mangetout",
        "name": "mangetout",
        "packQty": 250,
        "unit": "g",
        "price": 5.81,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "mangetout",
          "mange tout",
          "Young Pea Pods",
          "sweet pea pods"
        ],
        "retailerPrices": {
          "Woolworths": 5.53,
          "Coles": 5.7,
          "ALDI": 5.11,
          "IGA": 6.88
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/browse/fruit-vegetables/vegetables/peas-beans",
        "conversionHints": {}
      },
      {
        "id": "au-gap-sugar-snap-peas",
        "name": "sugar snap peas",
        "packQty": 150,
        "unit": "g",
        "price": 4.99,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "sugar snap peas",
          "sugar snap pea"
        ],
        "retailerPrices": {
          "Woolworths": 4.75,
          "Coles": 4.9,
          "ALDI": 4.4,
          "IGA": 5.91
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-sugar-snap-peas-medium-150g-4619289",
        "conversionHints": {}
      },
      {
        "id": "au-gap-granny-smith-apples",
        "name": "granny smith apples",
        "packQty": 1000,
        "unit": "g",
        "price": 4.99,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "granny smith apples",
          "granny smith apple"
        ],
        "retailerPrices": {
          "Woolworths": 4.75,
          "Coles": 4.9,
          "ALDI": 4.4,
          "IGA": 5.91
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-granny-smith-apples-1kg-4438740",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-gap-red-grapes",
        "name": "red grapes",
        "packQty": 1000,
        "unit": "g",
        "price": 15.18,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "red grapes",
          "red grape"
        ],
        "retailerPrices": {
          "Woolworths": 14.45,
          "Coles": 14.9,
          "ALDI": 13.37,
          "IGA": 17.99
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-red-seedless-grapes-approx.-1kg-8133562",
        "conversionHints": {}
      },
      {
        "id": "au-gap-black-grapes",
        "name": "black grapes",
        "packQty": 400,
        "unit": "g",
        "price": 9.06,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "black grapes",
          "black grape"
        ],
        "retailerPrices": {
          "Woolworths": 8.63,
          "Coles": 8.9,
          "ALDI": 7.98,
          "IGA": 10.74
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-black-seedless-grapes-prepacked-400g-1983693",
        "conversionHints": {}
      },
      {
        "id": "au-gap-raspberries",
        "name": "raspberries",
        "packQty": 125,
        "unit": "g",
        "price": 5.6,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "raspberries",
          "raspberry"
        ],
        "retailerPrices": {
          "Woolworths": 5.33,
          "Coles": 5.5,
          "ALDI": 4.93,
          "IGA": 6.64
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-raspberries-125g-134029",
        "conversionHints": {}
      },
      {
        "id": "au-gap-peaches",
        "name": "peaches",
        "packQty": 1000,
        "unit": "g",
        "price": 6.95,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Bargo Supa IGA"
        ],
        "aliases": [
          "peaches",
          "peach"
        ],
        "retailerPrices": {
          "Woolworths": 6.62,
          "Coles": 6.82,
          "ALDI": 6.12,
          "IGA": 8.24
        },
        "sourceName": "Bargo Supa IGA",
        "sourceUrl": "https://bargo.online.khangroup.com.au/category/fresh-produce",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-gap-nectarines",
        "name": "nectarines",
        "packQty": 1000,
        "unit": "g",
        "price": 4.99,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "ALDI"
        ],
        "aliases": [
          "nectarines",
          "nectarine"
        ],
        "retailerPrices": {
          "Woolworths": 4.75,
          "Coles": 4.9,
          "ALDI": 4.4,
          "IGA": 5.91
        },
        "sourceName": "ALDI",
        "sourceUrl": "https://www.aldi.com.au/product/no-brand-yellow-flesh-nectarines-loose-000000000000380375",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-gap-plums",
        "name": "plums",
        "packQty": 500,
        "unit": "g",
        "price": 6,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Queen Victoria Market"
        ],
        "aliases": [
          "plums",
          "plum"
        ],
        "retailerPrices": {
          "Woolworths": 5.71,
          "Coles": 5.89,
          "ALDI": 5.29,
          "IGA": 7.11
        },
        "sourceName": "Queen Victoria Market",
        "sourceUrl": "https://qvm.com.au/shop/fruit-veg-organics/fruit/plums/",
        "conversionHints": {
          "eachWeight": 110
        }
      },
      {
        "id": "au-gap-pears",
        "name": "pears",
        "packQty": 1000,
        "unit": "g",
        "price": 4.99,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "pears",
          "pear"
        ],
        "retailerPrices": {
          "Woolworths": 4.75,
          "Coles": 4.9,
          "ALDI": 4.4,
          "IGA": 5.91
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-packham-pears-1kg-9006662",
        "conversionHints": {
          "eachWeight": 160
        }
      },
      {
        "id": "au-gap-satsumas",
        "name": "satsumas",
        "packQty": 1000,
        "unit": "g",
        "price": 4.95,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Bargo Supa IGA"
        ],
        "aliases": [
          "satsumas",
          "satsuma"
        ],
        "retailerPrices": {
          "Woolworths": 4.71,
          "Coles": 4.86,
          "ALDI": 4.36,
          "IGA": 5.87
        },
        "sourceName": "Bargo Supa IGA",
        "sourceUrl": "https://bargo.online.khangroup.com.au/category/fresh-produce",
        "conversionHints": {
          "eachWeight": 100
        }
      },
      {
        "id": "au-gap-skimmed-milk",
        "name": "skimmed milk",
        "packQty": 2000,
        "unit": "ml",
        "price": 3.46,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "skimmed milk",
          "skim milk"
        ],
        "retailerPrices": {
          "Woolworths": 3.3,
          "Coles": 3.4,
          "ALDI": 3.05,
          "IGA": 4.1
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-skim-milk-2l-1079800",
        "conversionHints": {}
      },
      {
        "id": "au-gap-semi-skimmed-milk",
        "name": "semi skimmed milk",
        "packQty": 2000,
        "unit": "ml",
        "price": 3.46,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "semi skimmed milk",
          "semi-skimmed milk"
        ],
        "retailerPrices": {
          "Woolworths": 3.3,
          "Coles": 3.4,
          "ALDI": 3.05,
          "IGA": 4.1
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/browse/dairy-eggs-fridge/milk/skim-low-fat-milk",
        "conversionHints": {}
      },
      {
        "id": "au-gap-single-cream",
        "name": "single cream",
        "packQty": 300,
        "unit": "ml",
        "price": 3.26,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "single cream"
        ],
        "retailerPrices": {
          "Woolworths": 3.1,
          "Coles": 3.2,
          "ALDI": 2.87,
          "IGA": 3.86
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-light-thickened-cream-300ml-5033765",
        "conversionHints": {}
      },
      {
        "id": "au-gap-creme-fraiche",
        "name": "creme fraiche",
        "packQty": 200,
        "unit": "g",
        "price": 5.5,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "creme fraiche",
          "crème fraîche"
        ],
        "retailerPrices": {
          "Woolworths": 5.24,
          "Coles": 5.4,
          "ALDI": 4.84,
          "IGA": 6.52
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/bulla-creme-fraiche-200g-8453381",
        "conversionHints": {}
      },
      {
        "id": "au-gap-spreadable-butter",
        "name": "spreadable butter",
        "packQty": 375,
        "unit": "g",
        "price": 6.93,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "spreadable butter"
        ],
        "retailerPrices": {
          "Woolworths": 6.59,
          "Coles": 6.8,
          "ALDI": 6.1,
          "IGA": 8.21
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/browse/dairy-eggs-fridge/butter-margarine/blends",
        "conversionHints": {}
      },
      {
        "id": "au-gap-halloumi",
        "name": "halloumi",
        "packQty": 225,
        "unit": "g",
        "price": 8.66,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "halloumi"
        ],
        "retailerPrices": {
          "Woolworths": 8.24,
          "Coles": 8.5,
          "ALDI": 7.63,
          "IGA": 10.26
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/dodoni-halloumi-225g-1843435",
        "conversionHints": {}
      },
      {
        "id": "au-gap-sausages",
        "name": "sausages",
        "packQty": 550,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "sausages",
          "sausage"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-pork-sausage-550g-3923761",
        "conversionHints": {
          "eachWeight": 90
        }
      },
      {
        "id": "au-gap-ham",
        "name": "ham",
        "packQty": 500,
        "unit": "g",
        "price": 12.73,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "ham"
        ],
        "retailerPrices": {
          "Woolworths": 12.12,
          "Coles": 12.5,
          "ALDI": 11.21,
          "IGA": 15.09
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-sliced-ham-500g-1417834",
        "conversionHints": {
          "sliceWeight": 25
        }
      },
      {
        "id": "au-gap-marmalade",
        "name": "marmalade",
        "packQty": 450,
        "unit": "g",
        "price": 2.75,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "marmalade"
        ],
        "retailerPrices": {
          "Woolworths": 2.62,
          "Coles": 2.7,
          "ALDI": 2.42,
          "IGA": 3.26
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-simply-breakfast-marmalade-450g-6063896",
        "conversionHints": {}
      },
      {
        "id": "au-gap-cashews",
        "name": "cashews",
        "packQty": 400,
        "unit": "g",
        "price": 9.68,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "cashews",
          "cashew nuts"
        ],
        "retailerPrices": {
          "Woolworths": 9.21,
          "Coles": 9.5,
          "ALDI": 8.52,
          "IGA": 11.47
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-nuts-cashews-natural-400g-2222229",
        "conversionHints": {}
      },
      {
        "id": "au-gap-pumpkin-seeds",
        "name": "pumpkin seeds",
        "packQty": 150,
        "unit": "g",
        "price": 2.34,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "pumpkin seeds"
        ],
        "retailerPrices": {
          "Woolworths": 2.23,
          "Coles": 2.3,
          "ALDI": 2.06,
          "IGA": 2.78
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-pepitas-150g-3017542",
        "conversionHints": {}
      },
      {
        "id": "au-gap-sunflower-seeds",
        "name": "sunflower seeds",
        "packQty": 150,
        "unit": "g",
        "price": 1.68,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "sunflower seeds"
        ],
        "retailerPrices": {
          "Woolworths": 1.6,
          "Coles": 1.65,
          "ALDI": 1.48,
          "IGA": 1.99
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-sunflower-seeds-150g-3017553",
        "conversionHints": {}
      },
      {
        "id": "au-gap-chia-seeds",
        "name": "chia seeds",
        "packQty": 300,
        "unit": "g",
        "price": 5.91,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "chia seeds"
        ],
        "retailerPrices": {
          "Woolworths": 5.62,
          "Coles": 5.8,
          "ALDI": 5.2,
          "IGA": 7
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/wellness-road-black-chia-seeds-300g-1436271",
        "conversionHints": {}
      },
      {
        "id": "au-gap-protein-powder",
        "name": "protein powder",
        "packQty": 500,
        "unit": "g",
        "price": 10.18,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "protein powder"
        ],
        "retailerPrices": {
          "Woolworths": 9.7,
          "Coles": 10,
          "ALDI": 8.97,
          "IGA": 12.07
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-wellness-road-unflavoured-pea-protein-powder-500g-2483380",
        "conversionHints": {}
      },
      {
        "id": "coles-balsamic-glaze",
        "name": "Balsamic glaze",
        "packQty": 215,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Balsamic Glaze"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-glaze-with-balsamic-vinegar-of-modena-215ml-2724271",
        "conversionHints": {}
      },
      {
        "id": "coles-mango-chutney",
        "name": "Mild mango chutney",
        "packQty": 340,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Mango Chutney"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-mango-chutney-mild-340g-5029713",
        "conversionHints": {}
      },
      {
        "id": "coles-baby-broccoli",
        "name": "Baby broccoli (broccolini)",
        "packQty": 1,
        "unit": "each",
        "price": 1.73,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Tenderstem® Broccoli",
          "broccolini",
          "baby broccoli"
        ],
        "retailerPrices": {
          "Woolworths": 1.65,
          "Coles": 1.7,
          "ALDI": 1.53,
          "IGA": 2.05
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-baby-broccoli-1-bunch-5982477",
        "conversionHints": {
          "eachWeight": 250
        }
      },
      {
        "id": "coles-chorizo",
        "name": "Chorizo sausage",
        "packQty": 200,
        "unit": "g",
        "price": 8.15,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Diced Chorizo",
          "chorizo sausage",
          "chorizo"
        ],
        "retailerPrices": {
          "Woolworths": 7.76,
          "Coles": 8,
          "ALDI": 7.18,
          "IGA": 9.66
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/provedore-free-range-chorizo-200g-4250790",
        "conversionHints": {
          "eachWeight": 100
        }
      },
      {
        "id": "coles-diced-bacon",
        "name": "Diced bacon pieces",
        "packQty": 200,
        "unit": "g",
        "price": 5.81,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "British Smoked Bacon Lardons",
          "diced bacon",
          "bacon lardons"
        ],
        "retailerPrices": {
          "Woolworths": 5.53,
          "Coles": 5.7,
          "ALDI": 5.11,
          "IGA": 6.88
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/primo-cook-and-create-diced-bacon-200g-2739199",
        "conversionHints": {}
      },
      {
        "id": "coles-ginger-paste",
        "name": "Ginger paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.28,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Ginger Puree",
          "ginger paste"
        ],
        "retailerPrices": {
          "Woolworths": 4.07,
          "Coles": 4.2,
          "ALDI": 3.77,
          "IGA": 5.07
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/gourmet-garden-ginger-cold-blended-paste-80g-3023206",
        "conversionHints": {
          "gramsPerMl": 1
        }
      },
      {
        "id": "coles-korma-paste",
        "name": "Korma curry paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Korma Curry Paste",
          "korma paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {}
      },
      {
        "id": "coles-fried-shallots",
        "name": "Fried crispy shallots",
        "packQty": 110,
        "unit": "g",
        "price": 3.06,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Crispy Onions",
          "fried shallots"
        ],
        "retailerPrices": {
          "Woolworths": 2.91,
          "Coles": 3,
          "ALDI": 2.69,
          "IGA": 3.62
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-asia-fried-shallots-110g-7648341",
        "conversionHints": {}
      },
      {
        "id": "coles-flaked-almonds",
        "name": "Flaked almonds",
        "packQty": 150,
        "unit": "g",
        "price": 4.48,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Toasted Flaked Almonds"
        ],
        "retailerPrices": {
          "Woolworths": 4.27,
          "Coles": 4.4,
          "ALDI": 3.95,
          "IGA": 5.31
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-flakes-almond-150g-2749421",
        "conversionHints": {}
      },
      {
        "id": "coles-sambal-oelek",
        "name": "Sambal oelek chilli paste",
        "packQty": 190,
        "unit": "g",
        "price": 5.6,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Sambal Paste",
          "sambal oelek"
        ],
        "retailerPrices": {
          "Woolworths": 5.33,
          "Coles": 5.5,
          "ALDI": 4.93,
          "IGA": 6.64
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/conimex-sambal-oelek-190g-344859",
        "conversionHints": {}
      },
      {
        "id": "coles-ginger-garlic-paste",
        "name": "Ginger and garlic paste",
        "packQty": 1000,
        "unit": "g",
        "price": 5.3,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "ginger & garlic paste",
          "ginger and garlic paste"
        ],
        "retailerPrices": {
          "Woolworths": 5.04,
          "Coles": 5.2,
          "ALDI": 4.67,
          "IGA": 6.28
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/maharajah%27s-choice-ginger-and-garlic-paste-1kg-3868845",
        "conversionHints": {
          "gramsPerMl": 1
        }
      },
      {
        "id": "coles-ciabatta",
        "name": "Frozen ciabatta dinner rolls",
        "packQty": 4,
        "unit": "each",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Ciabatta",
          "ciabatta rolls"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/browse/bakery/instore-bakery-breads-and-rolls/bread-rolls",
        "conversionHints": {}
      },
      {
        "id": "coles-paneer",
        "name": "Paneer cheese",
        "packQty": 200,
        "unit": "g",
        "price": 6.31,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Paneer"
        ],
        "retailerPrices": {
          "Woolworths": 6.01,
          "Coles": 6.2,
          "ALDI": 5.56,
          "IGA": 7.48
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-gourmet-selection-paneer-200g-6793651",
        "conversionHints": {}
      },
      {
        "id": "coles-puff-pastry",
        "name": "Frozen puff pastry sheets",
        "packQty": 1000,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Puff Pastry Sheet",
          "puff pastry",
          "Puff pastry sheets"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-frozen-puff-pastry-6-sheets-1kg-450550",
        "conversionHints": {
          "sheetWeight": 167,
          "eachWeight": 167
        }
      },
      {
        "id": "coles-pak-choi",
        "name": "Asian pak choi greens",
        "packQty": 1,
        "unit": "each",
        "price": 3.06,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Pak Choi",
          "bok choy"
        ],
        "retailerPrices": {
          "Woolworths": 2.91,
          "Coles": 3,
          "ALDI": 2.69,
          "IGA": 3.62
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-asian-choy-pak-1-each-4567039",
        "conversionHints": {
          "eachWeight": 250
        }
      },
      {
        "id": "coles-aioli",
        "name": "Garlic aioli mayonnaise",
        "packQty": 250,
        "unit": "ml",
        "price": 4.58,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Aioli",
          "garlic aioli",
          "garlic mayonnaise"
        ],
        "retailerPrices": {
          "Woolworths": 4.36,
          "Coles": 4.5,
          "ALDI": 4.04,
          "IGA": 5.43
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/praise-squeeze-aioli-classic-250ml-1423247",
        "conversionHints": {
          "gramsPerMl": 1.1
        }
      },
      {
        "id": "coles-vegetable-gyoza",
        "name": "Frozen vegetable gyoza",
        "packQty": 300,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Vegetable Gyozas"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-nature%27s-kitchen-vegetable-gyoza-300g-1100146",
        "conversionHints": {
          "eachWeight": 20
        }
      },
      {
        "id": "coles-v2-mince",
        "name": "V2 plant-based mince",
        "packQty": 400,
        "unit": "g",
        "price": 8.66,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Meatless Farm mince",
          "Vegan Mince",
          "plant-based mince"
        ],
        "retailerPrices": {
          "Woolworths": 8.24,
          "Coles": 8.5,
          "ALDI": 7.63,
          "IGA": 10.26
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/v2-plant-based-mince-400g-8851680",
        "conversionHints": {}
      },
      {
        "id": "coles-v2-burgers",
        "name": "V2 plant-based burger patties",
        "packQty": 452,
        "unit": "g",
        "price": 10.18,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Unconventional Plant-Based Burgers",
          "ultimate vegan burger patties",
          "plant-based burgers"
        ],
        "retailerPrices": {
          "Woolworths": 9.7,
          "Coles": 10,
          "ALDI": 8.97,
          "IGA": 12.07
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/brands/v2-4033584399",
        "conversionHints": {
          "eachWeight": 113
        }
      },
      {
        "id": "coles-v2-sausages",
        "name": "V2 plant protein sausages",
        "packQty": 400,
        "unit": "g",
        "price": 8.66,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Meatless Farm sausages",
          "THIS plant based sausages",
          "plant based sausages"
        ],
        "retailerPrices": {
          "Woolworths": 8.24,
          "Coles": 8.5,
          "ALDI": 7.63,
          "IGA": 10.26
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/brands/v2-4033584399",
        "conversionHints": {
          "eachWeight": 100
        }
      },
      {
        "id": "coles-lamb-mince",
        "name": "Australian lamb mince",
        "packQty": 500,
        "unit": "g",
        "price": 9.17,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Lamb Mince"
        ],
        "retailerPrices": {
          "Woolworths": 8.73,
          "Coles": 9,
          "ALDI": 8.07,
          "IGA": 10.86
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-3-star-lamb-mince-500g-8850461",
        "conversionHints": {}
      },
      {
        "id": "coles-bamboo-skewers",
        "name": "Bamboo skewers 150-pack",
        "packQty": 150,
        "unit": "each",
        "price": 3.56,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Bamboo Skewers",
          "skewers"
        ],
        "retailerPrices": {
          "Woolworths": 3.39,
          "Coles": 3.5,
          "ALDI": 3.14,
          "IGA": 4.22
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-bamboo-skewers-150-pack-4462121",
        "conversionHints": {}
      },
      {
        "id": "coles-radish",
        "name": "Fresh radish bunch",
        "packQty": 1,
        "unit": "each",
        "price": 3.87,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Radishes"
        ],
        "retailerPrices": {
          "Woolworths": 3.69,
          "Coles": 3.8,
          "ALDI": 3.41,
          "IGA": 4.59
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-radish-bunch-1-each-4911870",
        "conversionHints": {
          "eachWeight": 75
        }
      },
      {
        "id": "coles-confit-duck",
        "name": "Confit duck legs",
        "packQty": 450,
        "unit": "g",
        "price": 14.77,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Confit British Duck Legs",
          "slow cooked duck legs"
        ],
        "retailerPrices": {
          "Woolworths": 14.06,
          "Coles": 14.5,
          "ALDI": 13.01,
          "IGA": 17.5
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/luv-a-duck-confit-duck-legs-450g-2089708",
        "conversionHints": {
          "eachWeight": 225
        }
      },
      {
        "id": "coles-falafel",
        "name": "Ready-to-eat falafel balls",
        "packQty": 225,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Ready to Eat Falafels",
          "falafel balls"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/browse/dairy-eggs-fridge/vegetarian-vegan/falafels",
        "conversionHints": {}
      },
      {
        "id": "coles-red-chillies",
        "name": "Fresh red cayenne chillies",
        "packQty": 50,
        "unit": "g",
        "price": 3.97,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Red Chilli",
          "fresh red chillies"
        ],
        "retailerPrices": {
          "Woolworths": 3.78,
          "Coles": 3.9,
          "ALDI": 3.5,
          "IGA": 4.71
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-red-cayanne-chillies-50g-1501635",
        "conversionHints": {
          "eachWeight": 10
        }
      },
      {
        "id": "coles-fennel",
        "name": "Fresh fennel bunch",
        "packQty": 1,
        "unit": "each",
        "price": 4.28,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Fennel",
          "fresh fennel"
        ],
        "retailerPrices": {
          "Woolworths": 4.07,
          "Coles": 4.2,
          "ALDI": 3.77,
          "IGA": 5.07
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-fennel-1-bunch-4910980",
        "conversionHints": {
          "eachWeight": 300
        }
      },
      {
        "id": "coles-rhubarb",
        "name": "Fresh rhubarb bunch",
        "packQty": 1,
        "unit": "each",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Rhubarb"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/browse/fruit-vegetables/best-of-spring/vegetables",
        "conversionHints": {
          "eachWeight": 400
        }
      },
      {
        "id": "au-estimate-red-wine-stock-paste",
        "name": "Red Wine Stock Paste",
        "packQty": 71,
        "unit": "g",
        "price": 2.85,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Red Wine Stock Paste"
        ],
        "retailerPrices": {
          "Woolworths": 2.72,
          "Coles": 2.8,
          "ALDI": 2.51,
          "IGA": 3.38
        },
        "sourceName": "Comparable category estimate: beef stock cubes",
        "sourceUrl": "https://www.coles.com.au/product/oxo-beef-stock-cubes-71g-157079",
        "conversionHints": {
          "eachWeight": 6,
          "sachetWeight": 14,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-central-american-style-spice-mix",
        "name": "Central American Style Spice Mix",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Central American Style Spice Mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-sun-dried-tomato-paste",
        "name": "Sun-Dried Tomato Paste",
        "packQty": 150,
        "unit": "g",
        "price": 1.09,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Sun-Dried Tomato Paste"
        ],
        "retailerPrices": {
          "Woolworths": 1.04,
          "Coles": 1.07,
          "ALDI": 0.96,
          "IGA": 1.29
        },
        "sourceName": "Comparable category estimate: Tomato paste",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-chermoula-spice-mix",
        "name": "Chermoula Spice Mix",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Chermoula Spice Mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "sachetWeight": 10,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-salted-peanuts",
        "name": "Salted Peanuts",
        "packQty": 450,
        "unit": "g",
        "price": 7.87,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Salted Peanuts"
        ],
        "retailerPrices": {
          "Woolworths": 7.49,
          "Coles": 7.73,
          "ALDI": 6.93,
          "IGA": 9.33
        },
        "sourceName": "Comparable category estimate: Roasted peanuts",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-ketjap-manis",
        "name": "Ketjap Manis",
        "packQty": 500,
        "unit": "ml",
        "price": 3.06,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Ketjap Manis",
          "ketjap manis"
        ],
        "retailerPrices": {
          "Woolworths": 2.91,
          "Coles": 3,
          "ALDI": 2.69,
          "IGA": 3.62
        },
        "sourceName": "Comparable category estimate: dark soy sauce",
        "sourceUrl": "https://www.coles.com.au/product/coles-asia-dark-soy-sauce-500ml-9057620",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1.2
        }
      },
      {
        "id": "au-estimate-chipotle-paste",
        "name": "Chipotle Paste",
        "packQty": 500,
        "unit": "g",
        "price": 6.76,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Chipotle Paste",
          "chipotle paste"
        ],
        "retailerPrices": {
          "Woolworths": 6.44,
          "Coles": 6.64,
          "ALDI": 5.95,
          "IGA": 8.01
        },
        "sourceName": "Comparable category estimate: Sriracha hot sauce",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-solid-creamed-coconut",
        "name": "solid creamed coconut",
        "packQty": 400,
        "unit": "ml",
        "price": 1.73,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "solid creamed coconut"
        ],
        "retailerPrices": {
          "Woolworths": 1.65,
          "Coles": 1.7,
          "ALDI": 1.53,
          "IGA": 2.05
        },
        "sourceName": "Comparable category estimate: coconut cream",
        "sourceUrl": "https://www.coles.com.au/product/coles-simply-coconut-cream-400ml-5357676",
        "conversionHints": {
          "tinWeight": 400,
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-roasted-spice-and-herb-blend",
        "name": "Roasted Spice and Herb Blend",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Roasted Spice and Herb Blend"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-mexican-style-spice-mix",
        "name": "Mexican Style Spice Mix",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Mexican Style Spice Mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-peri-peri-seasoning",
        "name": "Peri Peri Seasoning",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Peri Peri Seasoning"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-thai-style-spice-mix",
        "name": "Thai Style Spice Mix",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Thai Style Spice Mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-mediterranean-style-seasoning",
        "name": "Mediterranean Style Seasoning",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Mediterranean Style Seasoning",
          "Mediterranean-style seasoning"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-indonesian-style-spice-mix",
        "name": "Indonesian Style Spice Mix",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Indonesian Style Spice Mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-chinese-rice-wine",
        "name": "Chinese rice wine",
        "packQty": 340,
        "unit": "ml",
        "price": 3.06,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Chinese rice wine"
        ],
        "retailerPrices": {
          "Woolworths": 2.91,
          "Coles": 3,
          "ALDI": 2.69,
          "IGA": 3.62
        },
        "sourceName": "Comparable category estimate: rice vinegar",
        "sourceUrl": "https://www.coles.com.au/product/coles-asia-rice-wine-vinegar-340ml-5016267",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-21-day-aged-british-rump-steaks",
        "name": "21 Day Aged British Rump Steaks",
        "packQty": 550,
        "unit": "g",
        "price": 19.53,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "21 Day Aged British Rump Steaks"
        ],
        "retailerPrices": {
          "Woolworths": 18.6,
          "Coles": 19.18,
          "ALDI": 17.2,
          "IGA": 23.15
        },
        "sourceName": "Comparable category estimate: Top sirloin steak",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 200
        }
      },
      {
        "id": "au-estimate-echalion-shallot",
        "name": "Echalion Shallot",
        "packQty": 1400,
        "unit": "g",
        "price": 4.43,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Echalion Shallot"
        ],
        "retailerPrices": {
          "Woolworths": 4.22,
          "Coles": 4.35,
          "ALDI": 3.9,
          "IGA": 5.25
        },
        "sourceName": "Comparable category estimate: Yellow onions",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-gochujang-paste",
        "name": "Gochujang Paste",
        "packQty": 170,
        "unit": "g",
        "price": 3.26,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Gochujang Paste",
          "gochujang paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.1,
          "Coles": 3.2,
          "ALDI": 2.87,
          "IGA": 3.86
        },
        "sourceName": "Comparable category estimate: gochujang",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-red-pepper-chilli-jelly",
        "name": "Red Pepper Chilli Jelly",
        "packQty": 500,
        "unit": "g",
        "price": 6.76,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Red Pepper Chilli Jelly"
        ],
        "retailerPrices": {
          "Woolworths": 6.44,
          "Coles": 6.64,
          "ALDI": 5.95,
          "IGA": 8.01
        },
        "sourceName": "Comparable category estimate: Sriracha hot sauce",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-intense-chicken-stock-mix",
        "name": "intense chicken stock mix",
        "packQty": 71,
        "unit": "g",
        "price": 2.85,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "intense chicken stock mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.72,
          "Coles": 2.8,
          "ALDI": 2.51,
          "IGA": 3.38
        },
        "sourceName": "Comparable category estimate: chicken stock cubes",
        "sourceUrl": "https://www.coles.com.au/product/oxo-chicken-stock-cubes-71g-246102",
        "conversionHints": {
          "eachWeight": 6,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-waxy-potatoes",
        "name": "waxy potatoes",
        "packQty": 2300,
        "unit": "g",
        "price": 7.59,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "waxy potatoes"
        ],
        "retailerPrices": {
          "Woolworths": 7.23,
          "Coles": 7.45,
          "ALDI": 6.69,
          "IGA": 9
        },
        "sourceName": "Comparable category estimate: Russet potatoes",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-north-indian-style-spice-mix",
        "name": "North Indian Style Spice Mix",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "North Indian Style Spice Mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-caramelised-onion-paste",
        "name": "Caramelised Onion Paste",
        "packQty": 340,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Caramelised Onion Paste"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Comparable category estimate: Mild mango chutney",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-mango-chutney-mild-340g-5029713",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-cultured-coconut",
        "name": "cultured coconut",
        "packQty": 1000,
        "unit": "g",
        "price": 7.03,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "cultured coconut"
        ],
        "retailerPrices": {
          "Woolworths": 6.69,
          "Coles": 6.9,
          "ALDI": 6.19,
          "IGA": 8.33
        },
        "sourceName": "Comparable category estimate: Plain Greek yogurt",
        "sourceUrl": "https://www.coles.com.au/product/coles-pot-set-natural-greek-style-yoghurt-1kg-1851681",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-beef-stock-paste",
        "name": "Beef Stock Paste",
        "packQty": 71,
        "unit": "g",
        "price": 2.85,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Beef Stock Paste"
        ],
        "retailerPrices": {
          "Woolworths": 2.72,
          "Coles": 2.8,
          "ALDI": 2.51,
          "IGA": 3.38
        },
        "sourceName": "Comparable category estimate: beef stock cubes",
        "sourceUrl": "https://www.coles.com.au/product/oxo-beef-stock-cubes-71g-157079",
        "conversionHints": {
          "eachWeight": 6,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-brown-long-grain-rice",
        "name": "brown long grain rice",
        "packQty": 900,
        "unit": "g",
        "price": 2.78,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "brown long grain rice"
        ],
        "retailerPrices": {
          "Woolworths": 2.65,
          "Coles": 2.73,
          "ALDI": 2.45,
          "IGA": 3.29
        },
        "sourceName": "Comparable category estimate: Brown rice",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-roasted-garlic-paste",
        "name": "roasted garlic paste",
        "packQty": 1000,
        "unit": "g",
        "price": 5.3,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "roasted garlic paste"
        ],
        "retailerPrices": {
          "Woolworths": 5.04,
          "Coles": 5.2,
          "ALDI": 4.67,
          "IGA": 6.28
        },
        "sourceName": "Comparable category estimate: Ginger and garlic paste",
        "sourceUrl": "https://www.coles.com.au/product/maharajah%27s-choice-ginger-and-garlic-paste-1kg-3868845",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-ras-el-hanout",
        "name": "ras el hanout",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "ras el hanout"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 4,
          "tbspWeight": 12,
          "eachWeight": 13
        }
      },
      {
        "id": "au-estimate-british-pork-loin-steaks",
        "name": "British Pork Loin Steaks",
        "packQty": 700,
        "unit": "g",
        "price": 17,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "British Pork Loin Steaks"
        ],
        "retailerPrices": {
          "Woolworths": 16.19,
          "Coles": 16.69,
          "ALDI": 14.97,
          "IGA": 20.15
        },
        "sourceName": "Comparable category estimate: Boneless pork chops",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 120
        }
      },
      {
        "id": "au-estimate-green-chilli-paste",
        "name": "Green Chilli Paste",
        "packQty": 500,
        "unit": "g",
        "price": 6.76,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Green Chilli Paste"
        ],
        "retailerPrices": {
          "Woolworths": 6.44,
          "Coles": 6.64,
          "ALDI": 5.95,
          "IGA": 8.01
        },
        "sourceName": "Comparable category estimate: Sriracha hot sauce",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-burger-sauce",
        "name": "Burger Sauce",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Burger Sauce"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-white-wine-stock-powder",
        "name": "White Wine Stock Powder",
        "packQty": 105,
        "unit": "g",
        "price": 2.04,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "White Wine Stock Powder"
        ],
        "retailerPrices": {
          "Woolworths": 1.94,
          "Coles": 2,
          "ALDI": 1.79,
          "IGA": 2.41
        },
        "sourceName": "Comparable category estimate: Vegetable stock cubes",
        "sourceUrl": "https://www.coles.com.au/product/coles-vegetable-flavoured-stock-cubes-105g-1601582",
        "conversionHints": {
          "sachetWeight": 10,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-mixed-beans",
        "name": "Mixed Beans",
        "packQty": 450,
        "unit": "g",
        "price": 2.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Mixed Beans"
        ],
        "retailerPrices": {
          "Woolworths": 1.97,
          "Coles": 2.03,
          "ALDI": 1.82,
          "IGA": 2.45
        },
        "sourceName": "Comparable category estimate: Canned cannellini beans",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tinWeight": 450,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-yellow-thai-style-paste",
        "name": "Yellow Thai Style Paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Yellow Thai Style Paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Korma curry paste",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-finely-chopped-tomatoes-with-onion-and-garlic",
        "name": "Finely Chopped Tomatoes with Onion and Garlic",
        "packQty": 400,
        "unit": "g",
        "price": 1.23,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Finely Chopped Tomatoes with Onion and Garlic"
        ],
        "retailerPrices": {
          "Woolworths": 1.17,
          "Coles": 1.21,
          "ALDI": 1.08,
          "IGA": 1.46
        },
        "sourceName": "Comparable category estimate: Canned diced tomatoes",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tinWeight": 400,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-green-chilli",
        "name": "green chilli",
        "packQty": 1,
        "unit": "each",
        "price": 1.64,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "green chilli",
          "Green Chilli"
        ],
        "retailerPrices": {
          "Woolworths": 1.56,
          "Coles": 1.61,
          "ALDI": 1.44,
          "IGA": 1.94
        },
        "sourceName": "Comparable category estimate: Red bell pepper",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 160
        }
      },
      {
        "id": "au-estimate-coriander-mint",
        "name": "coriander & mint",
        "packQty": 15,
        "unit": "g",
        "price": 3.36,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "coriander & mint"
        ],
        "retailerPrices": {
          "Woolworths": 3.2,
          "Coles": 3.3,
          "ALDI": 2.96,
          "IGA": 3.98
        },
        "sourceName": "Comparable category estimate: fresh mint",
        "sourceUrl": "https://www.coles.com.au/product/coles-herb-punnets-mint-15g-3214725",
        "conversionHints": {
          "eachWeight": 15
        }
      },
      {
        "id": "au-estimate-sriracha-hot-chilli-sauce",
        "name": "sriracha hot chilli sauce",
        "packQty": 500,
        "unit": "g",
        "price": 6.76,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "sriracha hot chilli sauce"
        ],
        "retailerPrices": {
          "Woolworths": 6.44,
          "Coles": 6.64,
          "ALDI": 5.95,
          "IGA": 8.01
        },
        "sourceName": "Comparable category estimate: Sriracha hot sauce",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-meat-free-chick-n",
        "name": "meat-free chick'n",
        "packQty": 452,
        "unit": "g",
        "price": 10.18,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "meat-free chick'n"
        ],
        "retailerPrices": {
          "Woolworths": 9.7,
          "Coles": 10,
          "ALDI": 8.97,
          "IGA": 12.07
        },
        "sourceName": "Comparable category estimate: V2 plant-based burger patties",
        "sourceUrl": "https://www.coles.com.au/brands/v2-4033584399",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-red-thai-style-paste",
        "name": "Red Thai Style Paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Red Thai Style Paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Korma curry paste",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-ginger-garlic-lemongrass-puree",
        "name": "Ginger, Garlic & Lemongrass Puree",
        "packQty": 1000,
        "unit": "g",
        "price": 5.3,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Ginger, Garlic & Lemongrass Puree"
        ],
        "retailerPrices": {
          "Woolworths": 5.04,
          "Coles": 5.2,
          "ALDI": 4.67,
          "IGA": 6.28
        },
        "sourceName": "Comparable category estimate: Ginger and garlic paste",
        "sourceUrl": "https://www.coles.com.au/product/maharajah%27s-choice-ginger-and-garlic-paste-1kg-3868845",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-tamarind-paste",
        "name": "tamarind paste",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "tamarind paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-vegan-mayonnaise",
        "name": "vegan mayonnaise",
        "packQty": 250,
        "unit": "ml",
        "price": 4.58,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "vegan mayonnaise"
        ],
        "retailerPrices": {
          "Woolworths": 4.36,
          "Coles": 4.5,
          "ALDI": 4.04,
          "IGA": 5.43
        },
        "sourceName": "Comparable category estimate: Garlic aioli mayonnaise",
        "sourceUrl": "https://www.coles.com.au/product/praise-squeeze-aioli-classic-250ml-1423247",
        "conversionHints": {
          "gramsPerMl": 1,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-red-chilli-relish",
        "name": "red chilli relish",
        "packQty": 500,
        "unit": "g",
        "price": 6.76,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "red chilli relish"
        ],
        "retailerPrices": {
          "Woolworths": 6.44,
          "Coles": 6.64,
          "ALDI": 5.95,
          "IGA": 8.01
        },
        "sourceName": "Comparable category estimate: Sriracha hot sauce",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-shredded-savoy-cabbage",
        "name": "Shredded Savoy Cabbage",
        "packQty": 1,
        "unit": "each",
        "price": 7.03,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Shredded Savoy Cabbage"
        ],
        "retailerPrices": {
          "Woolworths": 6.69,
          "Coles": 6.9,
          "ALDI": 6.19,
          "IGA": 8.33
        },
        "sourceName": "Comparable category estimate: red cabbage",
        "sourceUrl": "https://www.coles.com.au/product/coles-mini-red-cabbage-1-each-1473970",
        "conversionHints": {
          "eachWeight": 600
        }
      },
      {
        "id": "au-estimate-vegan-nduja",
        "name": "Vegan ‘Nduja",
        "packQty": 400,
        "unit": "g",
        "price": 3.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "Vegan ‘Nduja"
        ],
        "retailerPrices": {
          "Woolworths": 3.5,
          "Coles": 3.61,
          "ALDI": 3.24,
          "IGA": 4.36
        },
        "sourceName": "Comparable category estimate: Firm tofu",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-pearl-couscous",
        "name": "Pearl Couscous",
        "packQty": 300,
        "unit": "g",
        "price": 7.87,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Pearl Couscous"
        ],
        "retailerPrices": {
          "Woolworths": 7.49,
          "Coles": 7.73,
          "ALDI": 6.93,
          "IGA": 9.33
        },
        "sourceName": "Comparable category estimate: Couscous",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-orzo",
        "name": "Orzo",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Orzo",
          "orzo"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-white-cumin-seeds",
        "name": "White Cumin Seeds",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "White Cumin Seeds"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 13
        }
      },
      {
        "id": "au-estimate-agave-nectar",
        "name": "agave nectar",
        "packQty": 1800,
        "unit": "g",
        "price": 2.3,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "agave nectar"
        ],
        "retailerPrices": {
          "Woolworths": 2.19,
          "Coles": 2.26,
          "ALDI": 2.03,
          "IGA": 2.73
        },
        "sourceName": "Comparable category estimate: Granulated white sugar",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-brazilian-style-spice-mix",
        "name": "Brazilian Style Spice Mix",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Brazilian Style Spice Mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-cooked-beetroot",
        "name": "Cooked Beetroot",
        "packQty": 900,
        "unit": "g",
        "price": 2.44,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "Cooked Beetroot",
          "cooked beetroot"
        ],
        "retailerPrices": {
          "Woolworths": 2.32,
          "Coles": 2.4,
          "ALDI": 2.15,
          "IGA": 2.89
        },
        "sourceName": "Comparable category estimate: Carrots",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 90
        }
      },
      {
        "id": "au-estimate-basa-fillets",
        "name": "basa fillets",
        "packQty": 450,
        "unit": "g",
        "price": 22.68,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "basa fillets",
          "Basa Fillets"
        ],
        "retailerPrices": {
          "Woolworths": 21.6,
          "Coles": 22.27,
          "ALDI": 19.98,
          "IGA": 26.88
        },
        "sourceName": "Comparable category estimate: Frozen cod fillets",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 125
        }
      },
      {
        "id": "au-estimate-soft-goats-cheese",
        "name": "soft goats' cheese",
        "packQty": 250,
        "unit": "g",
        "price": 4.28,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "soft goats' cheese"
        ],
        "retailerPrices": {
          "Woolworths": 4.08,
          "Coles": 4.2,
          "ALDI": 3.77,
          "IGA": 5.07
        },
        "sourceName": "Comparable category estimate: Shredded mozzarella",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-red-wine-jus-paste",
        "name": "Red Wine Jus Paste",
        "packQty": 71,
        "unit": "g",
        "price": 2.85,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Red Wine Jus Paste"
        ],
        "retailerPrices": {
          "Woolworths": 2.72,
          "Coles": 2.8,
          "ALDI": 2.51,
          "IGA": 3.38
        },
        "sourceName": "Comparable category estimate: beef stock cubes",
        "sourceUrl": "https://www.coles.com.au/product/oxo-beef-stock-cubes-71g-157079",
        "conversionHints": {
          "eachWeight": 6,
          "sachetWeight": 14,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-smoky-base-paste",
        "name": "Smoky Base Paste",
        "packQty": 150,
        "unit": "g",
        "price": 1.09,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Smoky Base Paste"
        ],
        "retailerPrices": {
          "Woolworths": 1.04,
          "Coles": 1.07,
          "ALDI": 0.96,
          "IGA": 1.29
        },
        "sourceName": "Comparable category estimate: Tomato paste",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-tandoori-masala-mix",
        "name": "Tandoori Masala Mix",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Tandoori Masala Mix"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Korma curry paste",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-henderson-s-relish",
        "name": "Henderson's Relish",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Henderson's Relish"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-raw-peeled-king-prawns",
        "name": "raw peeled king prawns",
        "packQty": 450,
        "unit": "g",
        "price": 20.18,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "raw peeled king prawns"
        ],
        "retailerPrices": {
          "Woolworths": 19.21,
          "Coles": 19.81,
          "ALDI": 17.78,
          "IGA": 23.92
        },
        "sourceName": "Comparable category estimate: Frozen raw shrimp",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-brioche-style-buns",
        "name": "brioche style buns",
        "packQty": 550,
        "unit": "g",
        "price": 3.44,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "brioche style buns"
        ],
        "retailerPrices": {
          "Woolworths": 3.28,
          "Coles": 3.38,
          "ALDI": 3.03,
          "IGA": 4.08
        },
        "sourceName": "Comparable category estimate: White sandwich bread",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "sliceWeight": 27.5,
          "eachWeight": 70
        }
      },
      {
        "id": "au-estimate-goat-s-cheese",
        "name": "Goat's Cheese",
        "packQty": 150,
        "unit": "g",
        "price": 7.02,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Goat's Cheese"
        ],
        "retailerPrices": {
          "Woolworths": 6.68,
          "Coles": 6.89,
          "ALDI": 6.18,
          "IGA": 8.32
        },
        "sourceName": "Comparable category estimate: Crumbled feta cheese",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-flat-white-mushrooms",
        "name": "flat white mushrooms",
        "packQty": 250,
        "unit": "g",
        "price": 3.83,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "flat white mushrooms"
        ],
        "retailerPrices": {
          "Woolworths": 3.65,
          "Coles": 3.76,
          "ALDI": 3.37,
          "IGA": 4.54
        },
        "sourceName": "Comparable category estimate: White button mushrooms",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-skin-on-british-chicken-breasts",
        "name": "Skin-On British Chicken Breasts",
        "packQty": 1100,
        "unit": "g",
        "price": 14.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "Skin-On British Chicken Breasts"
        ],
        "retailerPrices": {
          "Woolworths": 14.04,
          "Coles": 14.47,
          "ALDI": 12.98,
          "IGA": 17.47
        },
        "sourceName": "Comparable category estimate: Boneless chicken breast",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 180
        }
      },
      {
        "id": "au-estimate-ditali-pasta",
        "name": "Ditali Pasta",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Ditali Pasta"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-truffle-zest",
        "name": "Truffle Zest",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Truffle Zest"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 13
        }
      },
      {
        "id": "au-estimate-british-cumberland-sausages",
        "name": "British Cumberland Sausages",
        "packQty": 450,
        "unit": "g",
        "price": 5.17,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "British Cumberland Sausages"
        ],
        "retailerPrices": {
          "Woolworths": 4.92,
          "Coles": 5.08,
          "ALDI": 4.55,
          "IGA": 6.13
        },
        "sourceName": "Comparable category estimate: Breakfast sausage",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 56.75
        }
      },
      {
        "id": "au-estimate-tamarind-chutney",
        "name": "Tamarind Chutney",
        "packQty": 340,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Tamarind Chutney"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Comparable category estimate: Mild mango chutney",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-mango-chutney-mild-340g-5029713",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-sweet-pointed-pepper",
        "name": "sweet pointed pepper",
        "packQty": 1,
        "unit": "each",
        "price": 1.64,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "sweet pointed pepper"
        ],
        "retailerPrices": {
          "Woolworths": 1.56,
          "Coles": 1.61,
          "ALDI": 1.44,
          "IGA": 1.94
        },
        "sourceName": "Comparable category estimate: Red bell pepper",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 160
        }
      },
      {
        "id": "au-estimate-baby-corn",
        "name": "Baby Corn",
        "packQty": 450,
        "unit": "g",
        "price": 1.03,
        "observedAt": "2026-09-29",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Baby Corn"
        ],
        "retailerPrices": {
          "Woolworths": 0.98,
          "Coles": 1.01,
          "ALDI": 0.91,
          "IGA": 1.22
        },
        "sourceName": "Comparable category estimate: Canned sweet corn",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 8
        }
      },
      {
        "id": "au-estimate-greek-style-flatbreads",
        "name": "Greek Style Flatbreads",
        "packQty": 6,
        "unit": "each",
        "price": 4.15,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "Greek Style Flatbreads"
        ],
        "retailerPrices": {
          "Woolworths": 3.95,
          "Coles": 4.07,
          "ALDI": 3.66,
          "IGA": 4.92
        },
        "sourceName": "Comparable category estimate: Pita bread",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {}
      },
      {
        "id": "au-estimate-jerk-paste",
        "name": "Jerk Paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Jerk Paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Korma curry paste",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-british-streaky-bacon",
        "name": "British Streaky Bacon",
        "packQty": 200,
        "unit": "g",
        "price": 5.81,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "British Streaky Bacon"
        ],
        "retailerPrices": {
          "Woolworths": 5.53,
          "Coles": 5.7,
          "ALDI": 5.11,
          "IGA": 6.88
        },
        "sourceName": "Comparable category estimate: Diced bacon pieces",
        "sourceUrl": "https://www.coles.com.au/product/primo-cook-and-create-diced-bacon-200g-2739199",
        "conversionHints": {
          "rasherWeight": 25,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-fig-jam",
        "name": "Fig Jam",
        "packQty": 500,
        "unit": "g",
        "price": 12.78,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Fig Jam"
        ],
        "retailerPrices": {
          "Woolworths": 12.17,
          "Coles": 12.55,
          "ALDI": 11.26,
          "IGA": 15.15
        },
        "sourceName": "Comparable category estimate: Strawberry jam",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-tortiglioni",
        "name": "tortiglioni",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "tortiglioni"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-savoury-seasoning",
        "name": "Savoury Seasoning",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Savoury Seasoning"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-bulgogi-sauce",
        "name": "Bulgogi Sauce",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Bulgogi Sauce"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-creamy-single-oat",
        "name": "creamy single oat",
        "packQty": 1800,
        "unit": "g",
        "price": 6.25,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "creamy single oat"
        ],
        "retailerPrices": {
          "Woolworths": 5.95,
          "Coles": 6.14,
          "ALDI": 5.51,
          "IGA": 7.41
        },
        "sourceName": "Comparable category estimate: Oat milk",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-sushi-rice",
        "name": "sushi rice",
        "packQty": 900,
        "unit": "g",
        "price": 2.78,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "sushi rice",
          "Sushi Rice"
        ],
        "retailerPrices": {
          "Woolworths": 2.65,
          "Coles": 2.73,
          "ALDI": 2.45,
          "IGA": 3.29
        },
        "sourceName": "Comparable category estimate: Brown rice",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "pouchWeight": 250,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-fresh-edamame-beans",
        "name": "Fresh Edamame Beans",
        "packQty": 450,
        "unit": "g",
        "price": 2.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Fresh Edamame Beans"
        ],
        "retailerPrices": {
          "Woolworths": 1.97,
          "Coles": 2.03,
          "ALDI": 1.82,
          "IGA": 2.45
        },
        "sourceName": "Comparable category estimate: Canned chickpeas",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tinWeight": 450,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-pineapple-chutney",
        "name": "Pineapple Chutney",
        "packQty": 340,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Pineapple Chutney"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Comparable category estimate: Mild mango chutney",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-mango-chutney-mild-340g-5029713",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-red-leicester",
        "name": "Red Leicester",
        "packQty": 250,
        "unit": "g",
        "price": 4.99,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Red Leicester"
        ],
        "retailerPrices": {
          "Woolworths": 4.75,
          "Coles": 4.9,
          "ALDI": 4.4,
          "IGA": 5.91
        },
        "sourceName": "Comparable category estimate: Block cheddar cheese",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-cornish-clotted-cream",
        "name": "Cornish clotted cream",
        "packQty": 3800,
        "unit": "ml",
        "price": 6.25,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Cornish clotted cream"
        ],
        "retailerPrices": {
          "Woolworths": 5.95,
          "Coles": 6.14,
          "ALDI": 5.51,
          "IGA": 7.41
        },
        "sourceName": "Comparable category estimate: Whole milk",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-red-thai-curry-paste",
        "name": "red Thai curry paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "red Thai curry paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Korma curry paste",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-yoghurt-sauce",
        "name": "Yoghurt Sauce",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Yoghurt Sauce"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-diced-chicken-thigh",
        "name": "diced chicken thigh",
        "packQty": 900,
        "unit": "g",
        "price": 13.15,
        "observedAt": "2026-09-29",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "diced chicken thigh"
        ],
        "retailerPrices": {
          "Woolworths": 12.52,
          "Coles": 12.91,
          "ALDI": 11.58,
          "IGA": 15.58
        },
        "sourceName": "Comparable category estimate: Boneless chicken thighs",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 180
        }
      },
      {
        "id": "au-estimate-broccoli-florets",
        "name": "Broccoli Florets",
        "packQty": 450,
        "unit": "g",
        "price": 12.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Broccoli Florets"
        ],
        "retailerPrices": {
          "Woolworths": 11.49,
          "Coles": 11.85,
          "ALDI": 10.63,
          "IGA": 14.3
        },
        "sourceName": "Comparable category estimate: Broccoli crowns",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 400
        }
      },
      {
        "id": "au-estimate-rogan-josh-curry-paste",
        "name": "Rogan Josh Curry Paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Rogan Josh Curry Paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Korma curry paste",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-serrano-ham",
        "name": "Serrano Ham",
        "packQty": 200,
        "unit": "g",
        "price": 5.81,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Serrano Ham"
        ],
        "retailerPrices": {
          "Woolworths": 5.53,
          "Coles": 5.7,
          "ALDI": 5.11,
          "IGA": 6.88
        },
        "sourceName": "Comparable category estimate: Diced bacon pieces",
        "sourceUrl": "https://www.coles.com.au/product/primo-cook-and-create-diced-bacon-200g-2739199",
        "conversionHints": {
          "sliceWeight": 15,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-tikka-masala-paste",
        "name": "Tikka Masala Paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Tikka Masala Paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Korma curry paste",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-low-fat-natural-yoghurt",
        "name": "Low Fat Natural Yoghurt",
        "packQty": 1000,
        "unit": "g",
        "price": 7.03,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Low Fat Natural Yoghurt"
        ],
        "retailerPrices": {
          "Woolworths": 6.69,
          "Coles": 6.9,
          "ALDI": 6.19,
          "IGA": 8.33
        },
        "sourceName": "Comparable category estimate: Plain Greek yogurt",
        "sourceUrl": "https://www.coles.com.au/product/coles-pot-set-natural-greek-style-yoghurt-1kg-1851681",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-zhoug-style-paste",
        "name": "Zhoug Style Paste",
        "packQty": 190,
        "unit": "g",
        "price": 1.99,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Zhoug Style Paste"
        ],
        "retailerPrices": {
          "Woolworths": 1.89,
          "Coles": 1.95,
          "ALDI": 1.75,
          "IGA": 2.35
        },
        "sourceName": "Comparable category estimate: Basil green pesto",
        "sourceUrl": "https://www.coles.com.au/product/coles-pesto-basil-190g-5419660",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-chopped-dates",
        "name": "chopped dates",
        "packQty": 550,
        "unit": "g",
        "price": 7.62,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "chopped dates"
        ],
        "retailerPrices": {
          "Woolworths": 7.26,
          "Coles": 7.48,
          "ALDI": 6.71,
          "IGA": 9.03
        },
        "sourceName": "Comparable category estimate: Raisins",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-diced-pollock",
        "name": "diced pollock",
        "packQty": 450,
        "unit": "g",
        "price": 22.68,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "diced pollock"
        ],
        "retailerPrices": {
          "Woolworths": 21.6,
          "Coles": 22.27,
          "ALDI": 19.98,
          "IGA": 26.88
        },
        "sourceName": "Comparable category estimate: Frozen cod fillets",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-ground-sumac",
        "name": "ground sumac",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "ground sumac"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 4,
          "eachWeight": 13
        }
      },
      {
        "id": "au-estimate-onion-marmalade",
        "name": "Onion Marmalade",
        "packQty": 500,
        "unit": "g",
        "price": 12.78,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Onion Marmalade",
          "onion marmalade"
        ],
        "retailerPrices": {
          "Woolworths": 12.17,
          "Coles": 12.55,
          "ALDI": 11.26,
          "IGA": 15.15
        },
        "sourceName": "Comparable category estimate: Strawberry jam",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tbspWeight": 18,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-caribbean-style-jerk",
        "name": "Caribbean Style Jerk",
        "packQty": 30,
        "unit": "g",
        "price": 3.56,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Caribbean Style Jerk"
        ],
        "retailerPrices": {
          "Woolworths": 3.39,
          "Coles": 3.5,
          "ALDI": 3.14,
          "IGA": 4.22
        },
        "sourceName": "Comparable category estimate: mixed spice",
        "sourceUrl": "https://www.coles.com.au/product/masterfoods-mixed-spice-30g-316376",
        "conversionHints": {
          "tspWeight": 2.5,
          "eachWeight": 30
        }
      },
      {
        "id": "au-estimate-smoked-basa-fillets",
        "name": "smoked basa fillets",
        "packQty": 450,
        "unit": "g",
        "price": 22.68,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "smoked basa fillets"
        ],
        "retailerPrices": {
          "Woolworths": 21.6,
          "Coles": 22.27,
          "ALDI": 19.98,
          "IGA": 26.88
        },
        "sourceName": "Comparable category estimate: Frozen cod fillets",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-gnocchi",
        "name": "gnocchi",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "gnocchi",
          "Gnocchi"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-pre-cut-red-cabbage",
        "name": "Pre-Cut Red Cabbage",
        "packQty": 1,
        "unit": "each",
        "price": 7.03,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Pre-Cut Red Cabbage"
        ],
        "retailerPrices": {
          "Woolworths": 6.69,
          "Coles": 6.9,
          "ALDI": 6.19,
          "IGA": 8.33
        },
        "sourceName": "Comparable category estimate: red cabbage",
        "sourceUrl": "https://www.coles.com.au/product/coles-mini-red-cabbage-1-each-1473970",
        "conversionHints": {
          "eachWeight": 600
        }
      },
      {
        "id": "au-estimate-thai-green-style-paste",
        "name": "Thai Green Style Paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Thai Green Style Paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Korma curry paste",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-crumbled-blue-cheese",
        "name": "Crumbled Blue Cheese",
        "packQty": 250,
        "unit": "g",
        "price": 4.28,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Crumbled Blue Cheese"
        ],
        "retailerPrices": {
          "Woolworths": 4.08,
          "Coles": 4.2,
          "ALDI": 3.77,
          "IGA": 5.07
        },
        "sourceName": "Comparable category estimate: Shredded mozzarella",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-guinness-paste",
        "name": "Guinness® Paste",
        "packQty": 71,
        "unit": "g",
        "price": 2.85,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Guinness® Paste"
        ],
        "retailerPrices": {
          "Woolworths": 2.72,
          "Coles": 2.8,
          "ALDI": 2.51,
          "IGA": 3.38
        },
        "sourceName": "Comparable category estimate: beef stock cubes",
        "sourceUrl": "https://www.coles.com.au/product/oxo-beef-stock-cubes-71g-157079",
        "conversionHints": {
          "eachWeight": 6,
          "tspWeight": 5,
          "tbspWeight": 15,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-lamb-steaks",
        "name": "Lamb Steaks",
        "packQty": 450,
        "unit": "g",
        "price": 9.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Lamb Steaks"
        ],
        "retailerPrices": {
          "Woolworths": 8.64,
          "Coles": 8.91,
          "ALDI": 7.99,
          "IGA": 10.75
        },
        "sourceName": "Comparable category estimate: Ground beef 93% lean",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-lemon-herb-seasoning",
        "name": "Lemon & Herb Seasoning",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Lemon & Herb Seasoning"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-mini-garlic-coriander-naans",
        "name": "mini garlic & coriander naans",
        "packQty": 4,
        "unit": "each",
        "price": 6.85,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "mini garlic & coriander naans"
        ],
        "retailerPrices": {
          "Woolworths": 6.52,
          "Coles": 6.73,
          "ALDI": 6.03,
          "IGA": 8.12
        },
        "sourceName": "Comparable category estimate: Naan flatbread",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {}
      },
      {
        "id": "au-estimate-wholemeal-pittas",
        "name": "wholemeal pittas",
        "packQty": 6,
        "unit": "each",
        "price": 4.15,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "wholemeal pittas"
        ],
        "retailerPrices": {
          "Woolworths": 3.95,
          "Coles": 4.07,
          "ALDI": 3.66,
          "IGA": 4.92
        },
        "sourceName": "Comparable category estimate: Pita bread",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {}
      },
      {
        "id": "au-estimate-kiwi",
        "name": "Kiwi",
        "packQty": 1400,
        "unit": "g",
        "price": 10.21,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "Kiwi"
        ],
        "retailerPrices": {
          "Woolworths": 9.72,
          "Coles": 10.02,
          "ALDI": 8.99,
          "IGA": 12.1
        },
        "sourceName": "Comparable category estimate: Apples",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-dried-mint",
        "name": "Dried Mint",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Dried Mint"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 1,
          "eachWeight": 13
        }
      },
      {
        "id": "au-estimate-pitta-breads",
        "name": "Pitta Breads",
        "packQty": 550,
        "unit": "g",
        "price": 3.44,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Pitta Breads"
        ],
        "retailerPrices": {
          "Woolworths": 3.28,
          "Coles": 3.38,
          "ALDI": 3.03,
          "IGA": 4.08
        },
        "sourceName": "Comparable category estimate: White sandwich bread",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "sliceWeight": 27.5,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-sour-cherry-compote",
        "name": "Sour Cherry Compote",
        "packQty": 1400,
        "unit": "g",
        "price": 10.21,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "Sour Cherry Compote"
        ],
        "retailerPrices": {
          "Woolworths": 9.72,
          "Coles": 10.02,
          "ALDI": 8.99,
          "IGA": 12.1
        },
        "sourceName": "Comparable category estimate: Apples",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-amarillo-chilli-paste",
        "name": "Amarillo Chilli Paste",
        "packQty": 500,
        "unit": "g",
        "price": 6.76,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Amarillo Chilli Paste"
        ],
        "retailerPrices": {
          "Woolworths": 6.44,
          "Coles": 6.64,
          "ALDI": 5.95,
          "IGA": 8.01
        },
        "sourceName": "Comparable category estimate: Sriracha hot sauce",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-spinach-and-ricotta-tortelloni",
        "name": "Spinach and Ricotta Tortelloni",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Spinach and Ricotta Tortelloni"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-british-beef-and-pork-mince",
        "name": "British Beef and Pork Mince",
        "packQty": 450,
        "unit": "g",
        "price": 9.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "British Beef and Pork Mince"
        ],
        "retailerPrices": {
          "Woolworths": 8.64,
          "Coles": 8.91,
          "ALDI": 7.99,
          "IGA": 10.75
        },
        "sourceName": "Comparable category estimate: Ground beef 93% lean",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-west-african-style-paste",
        "name": "West African Style Paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "West African Style Paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Korma curry paste",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-chicken-breast-strips",
        "name": "chicken breast strips",
        "packQty": 1100,
        "unit": "g",
        "price": 14.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "chicken breast strips"
        ],
        "retailerPrices": {
          "Woolworths": 14.04,
          "Coles": 14.47,
          "ALDI": 12.98,
          "IGA": 17.47
        },
        "sourceName": "Comparable category estimate: Boneless chicken breast",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-skin-on-salmon-fillets",
        "name": "skin on salmon fillets",
        "packQty": 450,
        "unit": "g",
        "price": 27.22,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "skin on salmon fillets",
          "skin-on salmon fillets"
        ],
        "retailerPrices": {
          "Woolworths": 25.92,
          "Coles": 26.73,
          "ALDI": 23.98,
          "IGA": 32.26
        },
        "sourceName": "Comparable category estimate: Salmon fillet",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 225
        }
      },
      {
        "id": "au-estimate-wholewheat-spaghetti",
        "name": "wholewheat spaghetti",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "wholewheat spaghetti"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-mint-sauce",
        "name": "mint sauce",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "mint sauce"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-farfalle",
        "name": "farfalle",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "farfalle"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-blanched-edamame-beans",
        "name": "blanched edamame beans",
        "packQty": 450,
        "unit": "g",
        "price": 2.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "blanched edamame beans"
        ],
        "retailerPrices": {
          "Woolworths": 1.97,
          "Coles": 2.03,
          "ALDI": 1.82,
          "IGA": 2.45
        },
        "sourceName": "Comparable category estimate: Canned chickpeas",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tinWeight": 450,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-fresh-lemongrass-stalk",
        "name": "fresh lemongrass stalk",
        "packQty": 30,
        "unit": "g",
        "price": 3.36,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "fresh lemongrass stalk"
        ],
        "retailerPrices": {
          "Woolworths": 3.2,
          "Coles": 3.3,
          "ALDI": 2.96,
          "IGA": 3.98
        },
        "sourceName": "Comparable category estimate: lemongrass",
        "sourceUrl": "https://www.coles.com.au/product/coles-herb-punnets-lemongrass-30g-5747863",
        "conversionHints": {
          "eachWeight": 30
        }
      },
      {
        "id": "au-estimate-mirin",
        "name": "mirin",
        "packQty": 340,
        "unit": "ml",
        "price": 3.06,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "mirin"
        ],
        "retailerPrices": {
          "Woolworths": 2.91,
          "Coles": 3,
          "ALDI": 2.69,
          "IGA": 3.62
        },
        "sourceName": "Comparable category estimate: rice vinegar",
        "sourceUrl": "https://www.coles.com.au/product/coles-asia-rice-wine-vinegar-340ml-5016267",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-smashed-avocado",
        "name": "smashed avocado",
        "packQty": 1,
        "unit": "each",
        "price": 5.56,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "smashed avocado",
          "Smashed Avocado"
        ],
        "retailerPrices": {
          "Woolworths": 5.29,
          "Coles": 5.46,
          "ALDI": 4.9,
          "IGA": 6.59
        },
        "sourceName": "Comparable category estimate: Avocado",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-british-chicken-mini-fillets",
        "name": "British Chicken Mini Fillets",
        "packQty": 1100,
        "unit": "g",
        "price": 14.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "British Chicken Mini Fillets"
        ],
        "retailerPrices": {
          "Woolworths": 14.04,
          "Coles": 14.47,
          "ALDI": 12.98,
          "IGA": 17.47
        },
        "sourceName": "Comparable category estimate: Boneless chicken breast",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-brioche-hot-dog-buns",
        "name": "Brioche Hot Dog Buns",
        "packQty": 550,
        "unit": "g",
        "price": 3.44,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Brioche Hot Dog Buns"
        ],
        "retailerPrices": {
          "Woolworths": 3.28,
          "Coles": 3.38,
          "ALDI": 3.03,
          "IGA": 4.08
        },
        "sourceName": "Comparable category estimate: White sandwich bread",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "sliceWeight": 27.5,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-samphire",
        "name": "Samphire",
        "packQty": 450,
        "unit": "g",
        "price": 7.81,
        "observedAt": "2026-09-23",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Samphire"
        ],
        "retailerPrices": {
          "Woolworths": 7.44,
          "Coles": 7.67,
          "ALDI": 6.88,
          "IGA": 9.26
        },
        "sourceName": "Comparable category estimate: Fresh green beans",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 8
        }
      },
      {
        "id": "au-estimate-haddock-fillets",
        "name": "Haddock Fillets",
        "packQty": 450,
        "unit": "g",
        "price": 22.68,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Haddock Fillets"
        ],
        "retailerPrices": {
          "Woolworths": 21.6,
          "Coles": 22.27,
          "ALDI": 19.98,
          "IGA": 26.88
        },
        "sourceName": "Comparable category estimate: Frozen cod fillets",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 180
        }
      },
      {
        "id": "au-estimate-proper-porker-sausages",
        "name": "Proper Porker sausages",
        "packQty": 450,
        "unit": "g",
        "price": 5.17,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Proper Porker sausages"
        ],
        "retailerPrices": {
          "Woolworths": 4.92,
          "Coles": 5.08,
          "ALDI": 4.55,
          "IGA": 6.13
        },
        "sourceName": "Comparable category estimate: Breakfast sausage",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-tomato-mozzarella-tortelloni",
        "name": "tomato & mozzarella tortelloni",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "tomato & mozzarella tortelloni"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-parsley-mint",
        "name": "parsley & mint",
        "packQty": 15,
        "unit": "g",
        "price": 3.36,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "parsley & mint"
        ],
        "retailerPrices": {
          "Woolworths": 3.2,
          "Coles": 3.3,
          "ALDI": 2.96,
          "IGA": 3.98
        },
        "sourceName": "Comparable category estimate: fresh mint",
        "sourceUrl": "https://www.coles.com.au/product/coles-herb-punnets-mint-15g-3214725",
        "conversionHints": {
          "eachWeight": 15
        }
      },
      {
        "id": "au-estimate-spinach-and-ricotta-ravioli",
        "name": "Spinach and Ricotta Ravioli",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Spinach and Ricotta Ravioli"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-flame-baked-pizza-bases",
        "name": "flame-baked pizza bases",
        "packQty": 300,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "flame-baked pizza bases"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Comparable category estimate: Frozen vegetable gyoza",
        "sourceUrl": "https://www.coles.com.au/product/coles-nature%27s-kitchen-vegetable-gyoza-300g-1100146",
        "conversionHints": {
          "eachWeight": 220
        }
      },
      {
        "id": "au-estimate-vegan-xo-sauce",
        "name": "Vegan XO Sauce",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Vegan XO Sauce"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-mussels",
        "name": "Mussels",
        "packQty": 450,
        "unit": "g",
        "price": 20.18,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "Mussels"
        ],
        "retailerPrices": {
          "Woolworths": 19.21,
          "Coles": 19.81,
          "ALDI": 17.78,
          "IGA": 23.92
        },
        "sourceName": "Comparable category estimate: Frozen raw shrimp",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-cured-ham-tortelloni",
        "name": "Cured Ham Tortelloni",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Cured Ham Tortelloni"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-kashmiri-style-spice-mix",
        "name": "Kashmiri Style Spice Mix",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Kashmiri Style Spice Mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-chorizo-slices",
        "name": "Chorizo Slices",
        "packQty": 200,
        "unit": "g",
        "price": 8.15,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Chorizo Slices"
        ],
        "retailerPrices": {
          "Woolworths": 7.76,
          "Coles": 8,
          "ALDI": 7.18,
          "IGA": 9.66
        },
        "sourceName": "Comparable category estimate: Chorizo sausage",
        "sourceUrl": "https://www.coles.com.au/product/provedore-free-range-chorizo-200g-4250790",
        "conversionHints": {
          "eachWeight": 10,
          "sliceWeight": 10
        }
      },
      {
        "id": "au-estimate-filo-pastry-sheets",
        "name": "Filo Pastry Sheets",
        "packQty": 1000,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Filo Pastry Sheets"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Frozen puff pastry sheets",
        "sourceUrl": "https://www.coles.com.au/product/coles-frozen-puff-pastry-6-sheets-1kg-450550",
        "conversionHints": {
          "sheetWeight": 167,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-oil-for-the-breadcrumbs",
        "name": "Oil for the Breadcrumbs",
        "packQty": 1400,
        "unit": "ml",
        "price": 7.57,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Oil for the Breadcrumbs"
        ],
        "retailerPrices": {
          "Woolworths": 7.21,
          "Coles": 7.43,
          "ALDI": 6.67,
          "IGA": 8.97
        },
        "sourceName": "Comparable category estimate: Vegetable oil",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-dried-cranberries",
        "name": "Dried Cranberries",
        "packQty": 550,
        "unit": "g",
        "price": 7.62,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Dried Cranberries",
          "dried cranberries"
        ],
        "retailerPrices": {
          "Woolworths": 7.26,
          "Coles": 7.48,
          "ALDI": 6.71,
          "IGA": 9.03
        },
        "sourceName": "Comparable category estimate: Raisins",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-purple-sprouting-broccoli",
        "name": "Purple Sprouting Broccoli",
        "packQty": 450,
        "unit": "g",
        "price": 12.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Purple Sprouting Broccoli"
        ],
        "retailerPrices": {
          "Woolworths": 11.49,
          "Coles": 11.85,
          "ALDI": 10.63,
          "IGA": 14.3
        },
        "sourceName": "Comparable category estimate: Broccoli crowns",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 400
        }
      },
      {
        "id": "au-estimate-nduja",
        "name": "'Nduja",
        "packQty": 200,
        "unit": "g",
        "price": 8.15,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "'Nduja"
        ],
        "retailerPrices": {
          "Woolworths": 7.76,
          "Coles": 8,
          "ALDI": 7.18,
          "IGA": 9.66
        },
        "sourceName": "Comparable category estimate: Chorizo sausage",
        "sourceUrl": "https://www.coles.com.au/product/provedore-free-range-chorizo-200g-4250790",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-balsamic-sun-dried-tomato-paste",
        "name": "balsamic sun-dried tomato paste",
        "packQty": 150,
        "unit": "g",
        "price": 1.09,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "balsamic sun-dried tomato paste"
        ],
        "retailerPrices": {
          "Woolworths": 1.04,
          "Coles": 1.07,
          "ALDI": 0.96,
          "IGA": 1.29
        },
        "sourceName": "Comparable category estimate: Tomato paste",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-apple-and-sage-jelly",
        "name": "Apple and Sage Jelly",
        "packQty": 1400,
        "unit": "g",
        "price": 10.21,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "Apple and Sage Jelly"
        ],
        "retailerPrices": {
          "Woolworths": 9.72,
          "Coles": 10.02,
          "ALDI": 8.99,
          "IGA": 12.1
        },
        "sourceName": "Comparable category estimate: Apples",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-sweetheart-cabbage",
        "name": "Sweetheart Cabbage",
        "packQty": 150,
        "unit": "g",
        "price": 5.53,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Sweetheart Cabbage"
        ],
        "retailerPrices": {
          "Woolworths": 5.27,
          "Coles": 5.43,
          "ALDI": 4.87,
          "IGA": 6.55
        },
        "sourceName": "Comparable category estimate: Spring mix salad greens",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 700
        }
      },
      {
        "id": "au-estimate-21-day-aged-british-sirloin-steaks",
        "name": "21 Day Aged British Sirloin Steaks",
        "packQty": 550,
        "unit": "g",
        "price": 19.53,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "21 Day Aged British Sirloin Steaks"
        ],
        "retailerPrices": {
          "Woolworths": 18.6,
          "Coles": 19.18,
          "ALDI": 17.2,
          "IGA": 23.15
        },
        "sourceName": "Comparable category estimate: Top sirloin steak",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 200
        }
      },
      {
        "id": "au-estimate-passion-fruit",
        "name": "Passion Fruit",
        "packQty": 1400,
        "unit": "g",
        "price": 10.21,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "Passion Fruit"
        ],
        "retailerPrices": {
          "Woolworths": 9.72,
          "Coles": 10.02,
          "ALDI": 8.99,
          "IGA": 12.1
        },
        "sourceName": "Comparable category estimate: Apples",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-char-siu-paste",
        "name": "Char Siu Paste",
        "packQty": 250,
        "unit": "g",
        "price": 5.01,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Char Siu Paste"
        ],
        "retailerPrices": {
          "Woolworths": 4.77,
          "Coles": 4.92,
          "ALDI": 4.41,
          "IGA": 5.94
        },
        "sourceName": "Comparable category estimate: Hoisin sauce",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-malaysian-style-paste",
        "name": "Malaysian Style Paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Malaysian Style Paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Korma curry paste",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-jumbo-king-prawns",
        "name": "jumbo king prawns",
        "packQty": 450,
        "unit": "g",
        "price": 20.18,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "jumbo king prawns"
        ],
        "retailerPrices": {
          "Woolworths": 19.21,
          "Coles": 19.81,
          "ALDI": 17.78,
          "IGA": 23.92
        },
        "sourceName": "Comparable category estimate: Frozen raw shrimp",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-skin-on-chicken-thighs",
        "name": "skin-on chicken thighs",
        "packQty": 1100,
        "unit": "g",
        "price": 14.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "skin-on chicken thighs"
        ],
        "retailerPrices": {
          "Woolworths": 14.04,
          "Coles": 14.47,
          "ALDI": 12.98,
          "IGA": 17.47
        },
        "sourceName": "Comparable category estimate: Boneless chicken breast",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 110
        }
      },
      {
        "id": "au-estimate-pine-kernel-seed-mix",
        "name": "pine kernel & seed mix",
        "packQty": 450,
        "unit": "g",
        "price": 8.58,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "pine kernel & seed mix"
        ],
        "retailerPrices": {
          "Woolworths": 8.17,
          "Coles": 8.42,
          "ALDI": 7.56,
          "IGA": 10.17
        },
        "sourceName": "Comparable category estimate: Almonds",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-cooked-brown-long-grain-rice",
        "name": "cooked brown long grain rice",
        "packQty": 900,
        "unit": "g",
        "price": 2.78,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "cooked brown long grain rice"
        ],
        "retailerPrices": {
          "Woolworths": 2.65,
          "Coles": 2.73,
          "ALDI": 2.45,
          "IGA": 3.29
        },
        "sourceName": "Comparable category estimate: Brown rice",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-five-spice-mix",
        "name": "five-spice mix",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "five-spice mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-pineapple-slices",
        "name": "pineapple slices",
        "packQty": 1400,
        "unit": "g",
        "price": 10.21,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "pineapple slices"
        ],
        "retailerPrices": {
          "Woolworths": 9.72,
          "Coles": 10.02,
          "ALDI": 8.99,
          "IGA": 12.1
        },
        "sourceName": "Comparable category estimate: Apples",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150,
          "tinWeight": 260
        }
      },
      {
        "id": "au-estimate-zanzibar-style-curry-powder",
        "name": "Zanzibar Style Curry Powder",
        "packQty": 30,
        "unit": "g",
        "price": 3.56,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Zanzibar Style Curry Powder"
        ],
        "retailerPrices": {
          "Woolworths": 3.39,
          "Coles": 3.5,
          "ALDI": 3.14,
          "IGA": 4.22
        },
        "sourceName": "Comparable category estimate: mixed spice",
        "sourceUrl": "https://www.coles.com.au/product/masterfoods-mixed-spice-30g-316376",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-chettinad-style-paste",
        "name": "Chettinad Style Paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Chettinad Style Paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Korma curry paste",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-vegan-fish-sauce",
        "name": "Vegan Fish Sauce",
        "packQty": 500,
        "unit": "ml",
        "price": 3.06,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Vegan Fish Sauce"
        ],
        "retailerPrices": {
          "Woolworths": 2.91,
          "Coles": 3,
          "ALDI": 2.69,
          "IGA": 3.62
        },
        "sourceName": "Comparable category estimate: dark soy sauce",
        "sourceUrl": "https://www.coles.com.au/product/coles-asia-dark-soy-sauce-500ml-9057620",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-garlic-baguette",
        "name": "Garlic Baguette",
        "packQty": 550,
        "unit": "g",
        "price": 3.44,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Garlic Baguette"
        ],
        "retailerPrices": {
          "Woolworths": 3.28,
          "Coles": 3.38,
          "ALDI": 3.03,
          "IGA": 4.08
        },
        "sourceName": "Comparable category estimate: White sandwich bread",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "sliceWeight": 27.5,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-sea-bream-fillets",
        "name": "Sea Bream Fillets",
        "packQty": 450,
        "unit": "g",
        "price": 22.68,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Sea Bream Fillets"
        ],
        "retailerPrices": {
          "Woolworths": 21.6,
          "Coles": 22.27,
          "ALDI": 19.98,
          "IGA": 26.88
        },
        "sourceName": "Comparable category estimate: Frozen cod fillets",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 90
        }
      },
      {
        "id": "au-estimate-romanesco",
        "name": "Romanesco",
        "packQty": 1,
        "unit": "each",
        "price": 3.75,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Romanesco"
        ],
        "retailerPrices": {
          "Woolworths": 3.57,
          "Coles": 3.68,
          "ALDI": 3.3,
          "IGA": 4.44
        },
        "sourceName": "Comparable category estimate: Cauliflower",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 500
        }
      },
      {
        "id": "au-estimate-yellow-courgette",
        "name": "Yellow Courgette",
        "packQty": 450,
        "unit": "g",
        "price": 1.96,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "Yellow Courgette"
        ],
        "retailerPrices": {
          "Woolworths": 1.87,
          "Coles": 1.92,
          "ALDI": 1.73,
          "IGA": 2.32
        },
        "sourceName": "Comparable category estimate: Zucchini",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 200
        }
      },
      {
        "id": "au-estimate-stringless-runner-beans",
        "name": "Stringless Runner Beans",
        "packQty": 450,
        "unit": "g",
        "price": 7.81,
        "observedAt": "2026-09-23",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Stringless Runner Beans"
        ],
        "retailerPrices": {
          "Woolworths": 7.44,
          "Coles": 7.67,
          "ALDI": 6.88,
          "IGA": 9.26
        },
        "sourceName": "Comparable category estimate: Fresh green beans",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 8
        }
      },
      {
        "id": "au-estimate-wholewheat-tortiglioni",
        "name": "wholewheat tortiglioni",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "wholewheat tortiglioni"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-pine-nuts",
        "name": "pine nuts",
        "packQty": 450,
        "unit": "g",
        "price": 7.87,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "pine nuts",
          "Pine Nuts"
        ],
        "retailerPrices": {
          "Woolworths": 7.49,
          "Coles": 7.73,
          "ALDI": 6.93,
          "IGA": 9.33
        },
        "sourceName": "Comparable category estimate: Roasted peanuts",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 3,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-skinless-chicken-thighs",
        "name": "skinless chicken thighs",
        "packQty": 1100,
        "unit": "g",
        "price": 14.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "skinless chicken thighs"
        ],
        "retailerPrices": {
          "Woolworths": 14.04,
          "Coles": 14.47,
          "ALDI": 12.98,
          "IGA": 17.47
        },
        "sourceName": "Comparable category estimate: Boneless chicken breast",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 110
        }
      },
      {
        "id": "au-estimate-redcurrant-jelly",
        "name": "Redcurrant Jelly",
        "packQty": 1800,
        "unit": "g",
        "price": 2.3,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Redcurrant Jelly",
          "redcurrant jelly"
        ],
        "retailerPrices": {
          "Woolworths": 2.19,
          "Coles": 2.26,
          "ALDI": 2.03,
          "IGA": 2.73
        },
        "sourceName": "Comparable category estimate: Granulated white sugar",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-salted-barramundi",
        "name": "Salted Barramundi",
        "packQty": 450,
        "unit": "g",
        "price": 22.68,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Salted Barramundi"
        ],
        "retailerPrices": {
          "Woolworths": 21.6,
          "Coles": 22.27,
          "ALDI": 19.98,
          "IGA": 26.88
        },
        "sourceName": "Comparable category estimate: Frozen cod fillets",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 120
        }
      },
      {
        "id": "au-estimate-bao-buns",
        "name": "Bao Buns",
        "packQty": 8,
        "unit": "each",
        "price": 3.6,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "Bao Buns"
        ],
        "retailerPrices": {
          "Woolworths": 3.43,
          "Coles": 3.53,
          "ALDI": 3.17,
          "IGA": 4.27
        },
        "sourceName": "Comparable category estimate: Hamburger buns",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {}
      },
      {
        "id": "au-estimate-slow-cooked-beef",
        "name": "Slow Cooked Beef",
        "packQty": 450,
        "unit": "g",
        "price": 9.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Slow Cooked Beef"
        ],
        "retailerPrices": {
          "Woolworths": 8.64,
          "Coles": 8.91,
          "ALDI": 7.99,
          "IGA": 10.75
        },
        "sourceName": "Comparable category estimate: Ground beef 93% lean",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-british-hickory-smoked-sausages",
        "name": "British Hickory Smoked Sausages",
        "packQty": 450,
        "unit": "g",
        "price": 5.17,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "British Hickory Smoked Sausages"
        ],
        "retailerPrices": {
          "Woolworths": 4.92,
          "Coles": 5.08,
          "ALDI": 4.55,
          "IGA": 6.13
        },
        "sourceName": "Comparable category estimate: Breakfast sausage",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 62.5
        }
      },
      {
        "id": "au-estimate-pasanda-style-seasoning",
        "name": "Pasanda Style Seasoning",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Pasanda Style Seasoning"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-pomegranate",
        "name": "Pomegranate",
        "packQty": 1400,
        "unit": "g",
        "price": 10.21,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "Pomegranate",
          "pomegranate"
        ],
        "retailerPrices": {
          "Woolworths": 9.72,
          "Coles": 10.02,
          "ALDI": 8.99,
          "IGA": 12.1
        },
        "sourceName": "Comparable category estimate: Apples",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-steamed-basmati-rice",
        "name": "Steamed Basmati Rice",
        "packQty": 2300,
        "unit": "g",
        "price": 14.55,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Steamed Basmati Rice"
        ],
        "retailerPrices": {
          "Woolworths": 13.85,
          "Coles": 14.29,
          "ALDI": 12.82,
          "IGA": 17.24
        },
        "sourceName": "Comparable category estimate: Long grain white rice",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "pouchWeight": 250,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-goan-style-curry-paste",
        "name": "Goan Style Curry Paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Goan Style Curry Paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Korma curry paste",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-south-carolina-style-bbq-sauce",
        "name": "South Carolina Style BBQ Sauce",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "South Carolina Style BBQ Sauce"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-creamed-coconut",
        "name": "Creamed Coconut",
        "packQty": 400,
        "unit": "ml",
        "price": 1.73,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Creamed Coconut"
        ],
        "retailerPrices": {
          "Woolworths": 1.65,
          "Coles": 1.7,
          "ALDI": 1.53,
          "IGA": 2.05
        },
        "sourceName": "Comparable category estimate: coconut cream",
        "sourceUrl": "https://www.coles.com.au/product/coles-simply-coconut-cream-400ml-5357676",
        "conversionHints": {
          "tinWeight": 400,
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-pineapple-rings",
        "name": "Pineapple Rings",
        "packQty": 1400,
        "unit": "g",
        "price": 10.21,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "Pineapple Rings"
        ],
        "retailerPrices": {
          "Woolworths": 9.72,
          "Coles": 10.02,
          "ALDI": 8.99,
          "IGA": 12.1
        },
        "sourceName": "Comparable category estimate: Apples",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150,
          "tinWeight": 260
        }
      },
      {
        "id": "au-estimate-kumato-tomato",
        "name": "Kumato Tomato",
        "packQty": 450,
        "unit": "g",
        "price": 5.84,
        "observedAt": "2026-09-23",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "Kumato Tomato"
        ],
        "retailerPrices": {
          "Woolworths": 5.56,
          "Coles": 5.73,
          "ALDI": 5.14,
          "IGA": 6.92
        },
        "sourceName": "Comparable category estimate: Vine tomatoes",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 120
        }
      },
      {
        "id": "au-estimate-tabasco-original-red-sauce",
        "name": "TABASCO® Original Red Sauce",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "TABASCO® Original Red Sauce"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-shredded-red-cabbage",
        "name": "shredded red cabbage",
        "packQty": 1,
        "unit": "each",
        "price": 7.03,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "shredded red cabbage"
        ],
        "retailerPrices": {
          "Woolworths": 6.69,
          "Coles": 6.9,
          "ALDI": 6.19,
          "IGA": 8.33
        },
        "sourceName": "Comparable category estimate: red cabbage",
        "sourceUrl": "https://www.coles.com.au/product/coles-mini-red-cabbage-1-each-1473970",
        "conversionHints": {
          "eachWeight": 600
        }
      },
      {
        "id": "au-estimate-diced-chicken-breast",
        "name": "diced chicken breast",
        "packQty": 1100,
        "unit": "g",
        "price": 14.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "diced chicken breast"
        ],
        "retailerPrices": {
          "Woolworths": 14.04,
          "Coles": 14.47,
          "ALDI": 12.98,
          "IGA": 17.47
        },
        "sourceName": "Comparable category estimate: Boneless chicken breast",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-traditional-italian-pesto",
        "name": "traditional Italian pesto",
        "packQty": 190,
        "unit": "g",
        "price": 1.99,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "traditional Italian pesto"
        ],
        "retailerPrices": {
          "Woolworths": 1.89,
          "Coles": 1.95,
          "ALDI": 1.75,
          "IGA": 2.35
        },
        "sourceName": "Comparable category estimate: Basil green pesto",
        "sourceUrl": "https://www.coles.com.au/product/coles-pesto-basil-190g-5419660",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-falafel",
        "name": "Falafel",
        "packQty": 300,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Falafel"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Comparable category estimate: Frozen vegetable gyoza",
        "sourceUrl": "https://www.coles.com.au/product/coles-nature%27s-kitchen-vegetable-gyoza-300g-1100146",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-cauliflower-rice",
        "name": "cauliflower rice",
        "packQty": 1,
        "unit": "each",
        "price": 3.75,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "cauliflower rice"
        ],
        "retailerPrices": {
          "Woolworths": 3.57,
          "Coles": 3.68,
          "ALDI": 3.3,
          "IGA": 4.44
        },
        "sourceName": "Comparable category estimate: Cauliflower",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 600
        }
      },
      {
        "id": "au-estimate-truffle-flavoured-extra-virgin-olive-oil",
        "name": "truffle flavoured extra virgin olive oil",
        "packQty": 1400,
        "unit": "ml",
        "price": 7.57,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "truffle flavoured extra virgin olive oil"
        ],
        "retailerPrices": {
          "Woolworths": 7.21,
          "Coles": 7.43,
          "ALDI": 6.67,
          "IGA": 8.97
        },
        "sourceName": "Comparable category estimate: Vegetable oil",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-hokkaido-pumpkin",
        "name": "Hokkaido Pumpkin",
        "packQty": 900,
        "unit": "g",
        "price": 2.44,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "Hokkaido Pumpkin"
        ],
        "retailerPrices": {
          "Woolworths": 2.32,
          "Coles": 2.4,
          "ALDI": 2.15,
          "IGA": 2.89
        },
        "sourceName": "Comparable category estimate: Carrots",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 90
        }
      },
      {
        "id": "au-estimate-gunpowder-spice-mix",
        "name": "Gunpowder Spice Mix",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Gunpowder Spice Mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-middle-eastern-style-spice-mix",
        "name": "Middle Eastern Style Spice Mix",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Middle Eastern Style Spice Mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-cooked-spelt",
        "name": "Cooked Spelt",
        "packQty": 1000,
        "unit": "g",
        "price": 4.43,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Cooked Spelt"
        ],
        "retailerPrices": {
          "Woolworths": 4.22,
          "Coles": 4.35,
          "ALDI": 3.9,
          "IGA": 5.25
        },
        "sourceName": "Comparable category estimate: bulgur wheat",
        "sourceUrl": "https://www.coles.com.au/product/duru-brown-coarse-bulgur-1kg-9115045",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-desiccated-coconut",
        "name": "Desiccated coconut",
        "packQty": 500,
        "unit": "g",
        "price": 4.99,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Desiccated Coconut"
        ],
        "retailerPrices": {
          "Woolworths": 4.75,
          "Coles": 4.9,
          "ALDI": 4.4,
          "IGA": 5.91
        },
        "sourceName": "Coles",
        "sourceUrl": "https://www.coles.com.au/product/coles-desiccated-coconut-500g-8734482",
        "conversionHints": {}
      },
      {
        "id": "au-estimate-british-honey-mustard-sausages",
        "name": "British Honey Mustard Sausages",
        "packQty": 1800,
        "unit": "g",
        "price": 2.3,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "British Honey Mustard Sausages"
        ],
        "retailerPrices": {
          "Woolworths": 2.19,
          "Coles": 2.26,
          "ALDI": 2.03,
          "IGA": 2.73
        },
        "sourceName": "Comparable category estimate: Granulated white sugar",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 62.5
        }
      },
      {
        "id": "au-estimate-sous-vide-seasoned-chicken-wings",
        "name": "Sous Vide Seasoned Chicken Wings",
        "packQty": 1100,
        "unit": "g",
        "price": 14.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "Sous Vide Seasoned Chicken Wings"
        ],
        "retailerPrices": {
          "Woolworths": 14.04,
          "Coles": 14.47,
          "ALDI": 12.98,
          "IGA": 17.47
        },
        "sourceName": "Comparable category estimate: Boneless chicken breast",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 110
        }
      },
      {
        "id": "au-estimate-olive-oil-for-the-drizzle",
        "name": "Olive Oil for the Drizzle",
        "packQty": 1400,
        "unit": "ml",
        "price": 7.57,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Olive Oil for the Drizzle"
        ],
        "retailerPrices": {
          "Woolworths": 7.21,
          "Coles": 7.43,
          "ALDI": 6.67,
          "IGA": 8.97
        },
        "sourceName": "Comparable category estimate: Vegetable oil",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "gramsPerMl": 0.92,
          "defaultUsage": 15,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-mango",
        "name": "Mango",
        "packQty": 1400,
        "unit": "g",
        "price": 10.21,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "Mango",
          "mango"
        ],
        "retailerPrices": {
          "Woolworths": 9.72,
          "Coles": 10.02,
          "ALDI": 8.99,
          "IGA": 12.1
        },
        "sourceName": "Comparable category estimate: Apples",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-pecorino-vegetariano",
        "name": "Pecorino Vegetariano",
        "packQty": 250,
        "unit": "g",
        "price": 4.99,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Pecorino Vegetariano"
        ],
        "retailerPrices": {
          "Woolworths": 4.75,
          "Coles": 4.9,
          "ALDI": 4.4,
          "IGA": 5.91
        },
        "sourceName": "Comparable category estimate: Block cheddar cheese",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-super-soft-tortillas-with-whole-wheat",
        "name": "Super Soft Tortillas with Whole Wheat",
        "packQty": 6,
        "unit": "each",
        "price": 4.15,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "Super Soft Tortillas with Whole Wheat"
        ],
        "retailerPrices": {
          "Woolworths": 3.95,
          "Coles": 4.07,
          "ALDI": 3.66,
          "IGA": 4.92
        },
        "sourceName": "Comparable category estimate: Pita bread",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {}
      },
      {
        "id": "au-estimate-pork-belly",
        "name": "Pork Belly",
        "packQty": 450,
        "unit": "g",
        "price": 6.8,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Pork Belly",
          "pork belly"
        ],
        "retailerPrices": {
          "Woolworths": 6.47,
          "Coles": 6.68,
          "ALDI": 5.99,
          "IGA": 8.06
        },
        "sourceName": "Comparable category estimate: Ground pork",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-large-king-prawns",
        "name": "Large King Prawns",
        "packQty": 450,
        "unit": "g",
        "price": 20.18,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "Large King Prawns"
        ],
        "retailerPrices": {
          "Woolworths": 19.21,
          "Coles": 19.81,
          "ALDI": 17.78,
          "IGA": 23.92
        },
        "sourceName": "Comparable category estimate: Frozen raw shrimp",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-fresh-tagliatelle",
        "name": "Fresh Tagliatelle",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Fresh Tagliatelle",
          "fresh tagliatelle"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-cashew-butter",
        "name": "Cashew Butter",
        "packQty": 3800,
        "unit": "ml",
        "price": 6.25,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Cashew Butter"
        ],
        "retailerPrices": {
          "Woolworths": 5.95,
          "Coles": 6.14,
          "ALDI": 5.51,
          "IGA": 7.41
        },
        "sourceName": "Comparable category estimate: Whole milk",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 16,
          "eachWeight": 150,
          "gramsPerMl": 1.1
        }
      },
      {
        "id": "au-estimate-monkfish-medallions",
        "name": "Monkfish Medallions",
        "packQty": 450,
        "unit": "g",
        "price": 22.68,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Monkfish Medallions"
        ],
        "retailerPrices": {
          "Woolworths": 21.6,
          "Coles": 22.27,
          "ALDI": 19.98,
          "IGA": 26.88
        },
        "sourceName": "Comparable category estimate: Frozen cod fillets",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-white-cabbage-and-broccoli-slaw",
        "name": "White Cabbage and Broccoli Slaw",
        "packQty": 150,
        "unit": "g",
        "price": 5.53,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "White Cabbage and Broccoli Slaw"
        ],
        "retailerPrices": {
          "Woolworths": 5.27,
          "Coles": 5.43,
          "ALDI": 4.87,
          "IGA": 6.55
        },
        "sourceName": "Comparable category estimate: Spring mix salad greens",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-jersey-royal-potatoes",
        "name": "Jersey Royal Potatoes",
        "packQty": 2300,
        "unit": "g",
        "price": 7.59,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Jersey Royal Potatoes"
        ],
        "retailerPrices": {
          "Woolworths": 7.23,
          "Coles": 7.45,
          "ALDI": 6.69,
          "IGA": 9
        },
        "sourceName": "Comparable category estimate: Russet potatoes",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-fresh-orecchiette",
        "name": "fresh orecchiette",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "fresh orecchiette"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-lean-beef-mince-5-fat",
        "name": "lean beef mince (<5% fat)",
        "packQty": 450,
        "unit": "g",
        "price": 9.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "lean beef mince (<5% fat)"
        ],
        "retailerPrices": {
          "Woolworths": 8.64,
          "Coles": 8.91,
          "ALDI": 7.99,
          "IGA": 10.75
        },
        "sourceName": "Comparable category estimate: Ground beef 93% lean",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-sourdough-pittas",
        "name": "sourdough pittas",
        "packQty": 6,
        "unit": "each",
        "price": 4.15,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "sourdough pittas"
        ],
        "retailerPrices": {
          "Woolworths": 3.95,
          "Coles": 4.07,
          "ALDI": 3.66,
          "IGA": 4.92
        },
        "sourceName": "Comparable category estimate: Pita bread",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 75
        }
      },
      {
        "id": "au-estimate-spinach-ricotta-ravioli",
        "name": "spinach & ricotta ravioli",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "spinach & ricotta ravioli"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-mini-cosberg-lettuce",
        "name": "mini cosberg lettuce",
        "packQty": 150,
        "unit": "g",
        "price": 5.53,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "mini cosberg lettuce"
        ],
        "retailerPrices": {
          "Woolworths": 5.27,
          "Coles": 5.43,
          "ALDI": 4.87,
          "IGA": 6.55
        },
        "sourceName": "Comparable category estimate: Spring mix salad greens",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-pomegranate-molasses",
        "name": "pomegranate molasses",
        "packQty": 1400,
        "unit": "g",
        "price": 10.21,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "pomegranate molasses",
          "Pomegranate Molasses"
        ],
        "retailerPrices": {
          "Woolworths": 9.72,
          "Coles": 10.02,
          "ALDI": 8.99,
          "IGA": 12.1
        },
        "sourceName": "Comparable category estimate: Apples",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150,
          "tbspWeight": 20,
          "gramsPerMl": 1.3
        }
      },
      {
        "id": "au-estimate-black-mustard-seeds",
        "name": "black mustard seeds",
        "packQty": 200,
        "unit": "g",
        "price": 1.53,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "black mustard seeds"
        ],
        "retailerPrices": {
          "Woolworths": 1.45,
          "Coles": 1.5,
          "ALDI": 1.35,
          "IGA": 1.81
        },
        "sourceName": "Comparable category estimate: mustard seeds",
        "sourceUrl": "https://www.coles.com.au/product/pattu-mustard-seeds-200g-3339210",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-spring-greens",
        "name": "spring greens",
        "packQty": 1100,
        "unit": "g",
        "price": 2.1,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "spring greens"
        ],
        "retailerPrices": {
          "Woolworths": 2,
          "Coles": 2.06,
          "ALDI": 1.85,
          "IGA": 2.49
        },
        "sourceName": "Comparable category estimate: Green cabbage",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-orange",
        "name": "orange",
        "packQty": 1400,
        "unit": "g",
        "price": 10.21,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "orange",
          "Orange"
        ],
        "retailerPrices": {
          "Woolworths": 9.72,
          "Coles": 10.02,
          "ALDI": 8.99,
          "IGA": 12.1
        },
        "sourceName": "Comparable category estimate: Apples",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-katsu-paste",
        "name": "Katsu Paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Katsu Paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Korma curry paste",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-slow-cooked-british-pork",
        "name": "Slow Cooked British Pork",
        "packQty": 450,
        "unit": "g",
        "price": 6.8,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Slow Cooked British Pork"
        ],
        "retailerPrices": {
          "Woolworths": 6.47,
          "Coles": 6.68,
          "ALDI": 5.99,
          "IGA": 8.06
        },
        "sourceName": "Comparable category estimate: Ground pork",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-lahori-style-spice-mix",
        "name": "Lahori Style Spice Mix",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Lahori Style Spice Mix"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-green-chutney",
        "name": "Green Chutney",
        "packQty": 340,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Green Chutney"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Comparable category estimate: Mild mango chutney",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-mango-chutney-mild-340g-5029713",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-soffritto-mix",
        "name": "Soffritto Mix",
        "packQty": 1400,
        "unit": "g",
        "price": 4.43,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Soffritto Mix"
        ],
        "retailerPrices": {
          "Woolworths": 4.22,
          "Coles": 4.35,
          "ALDI": 3.9,
          "IGA": 5.25
        },
        "sourceName": "Comparable category estimate: Yellow onions",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-olive-oil-for-the-sauce",
        "name": "Olive Oil for the Sauce",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Olive Oil for the Sauce"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "gramsPerMl": 0.92,
          "defaultUsage": 15,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-dried-apricots",
        "name": "Dried Apricots",
        "packQty": 550,
        "unit": "g",
        "price": 7.62,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Dried Apricots"
        ],
        "retailerPrices": {
          "Woolworths": 7.26,
          "Coles": 7.48,
          "ALDI": 6.71,
          "IGA": 9.03
        },
        "sourceName": "Comparable category estimate: Raisins",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-black-garlic-paste",
        "name": "Black Garlic Paste",
        "packQty": 1000,
        "unit": "g",
        "price": 5.3,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Black Garlic Paste"
        ],
        "retailerPrices": {
          "Woolworths": 5.04,
          "Coles": 5.2,
          "ALDI": 4.67,
          "IGA": 6.28
        },
        "sourceName": "Comparable category estimate: Ginger and garlic paste",
        "sourceUrl": "https://www.coles.com.au/product/maharajah%27s-choice-ginger-and-garlic-paste-1kg-3868845",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-apricot-jam",
        "name": "Apricot Jam",
        "packQty": 1800,
        "unit": "g",
        "price": 2.3,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Apricot Jam"
        ],
        "retailerPrices": {
          "Woolworths": 2.19,
          "Coles": 2.26,
          "ALDI": 2.03,
          "IGA": 2.73
        },
        "sourceName": "Comparable category estimate: Granulated white sugar",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-slow-cooked-british-chicken",
        "name": "Slow Cooked British Chicken",
        "packQty": 1100,
        "unit": "g",
        "price": 14.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "Slow Cooked British Chicken"
        ],
        "retailerPrices": {
          "Woolworths": 14.04,
          "Coles": 14.47,
          "ALDI": 12.98,
          "IGA": 17.47
        },
        "sourceName": "Comparable category estimate: Boneless chicken breast",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 110
        }
      },
      {
        "id": "au-estimate-premium-tomato-mix",
        "name": "Premium Tomato Mix",
        "packQty": 450,
        "unit": "g",
        "price": 5.84,
        "observedAt": "2026-09-23",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "Premium Tomato Mix"
        ],
        "retailerPrices": {
          "Woolworths": 5.56,
          "Coles": 5.73,
          "ALDI": 5.14,
          "IGA": 6.92
        },
        "sourceName": "Comparable category estimate: Vine tomatoes",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 120
        }
      },
      {
        "id": "au-estimate-sri-lankan-style-curry-powder",
        "name": "Sri Lankan Style Curry Powder",
        "packQty": 30,
        "unit": "g",
        "price": 3.56,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Sri Lankan Style Curry Powder"
        ],
        "retailerPrices": {
          "Woolworths": 3.39,
          "Coles": 3.5,
          "ALDI": 3.14,
          "IGA": 4.22
        },
        "sourceName": "Comparable category estimate: mixed spice",
        "sourceUrl": "https://www.coles.com.au/product/masterfoods-mixed-spice-30g-316376",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-demi-garlic-baguettes",
        "name": "Demi Garlic Baguettes",
        "packQty": 1,
        "unit": "each",
        "price": 2.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Demi Garlic Baguettes"
        ],
        "retailerPrices": {
          "Woolworths": 2.61,
          "Coles": 2.69,
          "ALDI": 2.41,
          "IGA": 3.25
        },
        "sourceName": "Comparable category estimate: French baguette",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {}
      },
      {
        "id": "au-estimate-spiced-plum-chutney",
        "name": "spiced plum chutney",
        "packQty": 340,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "spiced plum chutney"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Comparable category estimate: Mild mango chutney",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-mango-chutney-mild-340g-5029713",
        "conversionHints": {
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-sweetcorn-cobettes",
        "name": "sweetcorn cobettes",
        "packQty": 450,
        "unit": "g",
        "price": 1.03,
        "observedAt": "2026-09-29",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "sweetcorn cobettes"
        ],
        "retailerPrices": {
          "Woolworths": 0.98,
          "Coles": 1.01,
          "ALDI": 0.91,
          "IGA": 1.22
        },
        "sourceName": "Comparable category estimate: Canned sweet corn",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-mustard-ketchup",
        "name": "mustard ketchup",
        "packQty": 550,
        "unit": "g",
        "price": 4.26,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "mustard ketchup"
        ],
        "retailerPrices": {
          "Woolworths": 4.06,
          "Coles": 4.18,
          "ALDI": 3.75,
          "IGA": 5.05
        },
        "sourceName": "Comparable category estimate: Ketchup",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-lighter-cheese",
        "name": "lighter cheese",
        "packQty": 250,
        "unit": "g",
        "price": 4.28,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "lighter cheese"
        ],
        "retailerPrices": {
          "Woolworths": 4.08,
          "Coles": 4.2,
          "ALDI": 3.77,
          "IGA": 5.07
        },
        "sourceName": "Comparable category estimate: Shredded mozzarella",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-thai-green-curry-paste",
        "name": "Thai green curry paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Thai green curry paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Korma curry paste",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-gem-lettuces",
        "name": "gem lettuces",
        "packQty": 3,
        "unit": "each",
        "price": 4.95,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "gem lettuces"
        ],
        "retailerPrices": {
          "Woolworths": 4.71,
          "Coles": 4.86,
          "ALDI": 4.36,
          "IGA": 5.87
        },
        "sourceName": "Comparable category estimate: Romaine lettuce",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {}
      },
      {
        "id": "au-estimate-brussels-sprouts",
        "name": "Brussels Sprouts",
        "packQty": 1,
        "unit": "each",
        "price": 3.75,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Brussels Sprouts",
          "Brussels sprouts"
        ],
        "retailerPrices": {
          "Woolworths": 3.57,
          "Coles": 3.68,
          "ALDI": 3.3,
          "IGA": 4.44
        },
        "sourceName": "Comparable category estimate: Cauliflower",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 650
        }
      },
      {
        "id": "au-estimate-baby-button-mushrooms",
        "name": "baby button mushrooms",
        "packQty": 250,
        "unit": "g",
        "price": 3.83,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "baby button mushrooms"
        ],
        "retailerPrices": {
          "Woolworths": 3.65,
          "Coles": 3.76,
          "ALDI": 3.37,
          "IGA": 4.54
        },
        "sourceName": "Comparable category estimate: White button mushrooms",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-wholewheat-noodle-nests",
        "name": "wholewheat noodle nests",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "wholewheat noodle nests"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "nestWeight": 62.5,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-gammon-steaks",
        "name": "Gammon Steaks",
        "packQty": 700,
        "unit": "g",
        "price": 17,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "Gammon Steaks"
        ],
        "retailerPrices": {
          "Woolworths": 16.19,
          "Coles": 16.69,
          "ALDI": 14.97,
          "IGA": 20.15
        },
        "sourceName": "Comparable category estimate: Boneless pork chops",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 200
        }
      },
      {
        "id": "au-estimate-orkney-crab-meat",
        "name": "Orkney Crab Meat",
        "packQty": 450,
        "unit": "g",
        "price": 20.18,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "Orkney Crab Meat"
        ],
        "retailerPrices": {
          "Woolworths": 19.21,
          "Coles": 19.81,
          "ALDI": 17.78,
          "IGA": 23.92
        },
        "sourceName": "Comparable category estimate: Frozen raw shrimp",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-blanched-broad-beans",
        "name": "Blanched Broad Beans",
        "packQty": 450,
        "unit": "g",
        "price": 2.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Blanched Broad Beans"
        ],
        "retailerPrices": {
          "Woolworths": 1.97,
          "Coles": 2.03,
          "ALDI": 1.82,
          "IGA": 2.45
        },
        "sourceName": "Comparable category estimate: Canned cannellini beans",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tinWeight": 450,
          "eachWeight": 8
        }
      },
      {
        "id": "au-estimate-prunes",
        "name": "Prunes",
        "packQty": 550,
        "unit": "g",
        "price": 7.62,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Prunes"
        ],
        "retailerPrices": {
          "Woolworths": 7.26,
          "Coles": 7.48,
          "ALDI": 6.71,
          "IGA": 9.03
        },
        "sourceName": "Comparable category estimate: Raisins",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-pork-rib-rack",
        "name": "Pork Rib Rack",
        "packQty": 450,
        "unit": "g",
        "price": 6.8,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Pork Rib Rack"
        ],
        "retailerPrices": {
          "Woolworths": 6.47,
          "Coles": 6.68,
          "ALDI": 5.99,
          "IGA": 8.06
        },
        "sourceName": "Comparable category estimate: Ground pork",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 500
        }
      },
      {
        "id": "au-estimate-burrata",
        "name": "Burrata",
        "packQty": 250,
        "unit": "g",
        "price": 4.28,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Burrata"
        ],
        "retailerPrices": {
          "Woolworths": 4.08,
          "Coles": 4.2,
          "ALDI": 3.77,
          "IGA": 5.07
        },
        "sourceName": "Comparable category estimate: Shredded mozzarella",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-nigella-seeds",
        "name": "nigella seeds",
        "packQty": 200,
        "unit": "g",
        "price": 1.53,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "nigella seeds"
        ],
        "retailerPrices": {
          "Woolworths": 1.45,
          "Coles": 1.5,
          "ALDI": 1.35,
          "IGA": 1.81
        },
        "sourceName": "Comparable category estimate: mustard seeds",
        "sourceUrl": "https://www.coles.com.au/product/pattu-mustard-seeds-200g-3339210",
        "conversionHints": {
          "tspWeight": 3,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-ground-almonds",
        "name": "ground almonds",
        "packQty": 450,
        "unit": "g",
        "price": 8.58,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "ground almonds"
        ],
        "retailerPrices": {
          "Woolworths": 8.17,
          "Coles": 8.42,
          "ALDI": 7.56,
          "IGA": 10.17
        },
        "sourceName": "Comparable category estimate: Almonds",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-roti",
        "name": "roti",
        "packQty": 6,
        "unit": "each",
        "price": 4.15,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "roti"
        ],
        "retailerPrices": {
          "Woolworths": 3.95,
          "Coles": 4.07,
          "ALDI": 3.66,
          "IGA": 4.92
        },
        "sourceName": "Comparable category estimate: Pita bread",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 55
        }
      },
      {
        "id": "au-estimate-french-camembert",
        "name": "French Camembert",
        "packQty": 250,
        "unit": "g",
        "price": 4.28,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "French Camembert"
        ],
        "retailerPrices": {
          "Woolworths": 4.08,
          "Coles": 4.2,
          "ALDI": 3.77,
          "IGA": 5.07
        },
        "sourceName": "Comparable category estimate: Shredded mozzarella",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-yellow-mustard-seeds",
        "name": "yellow mustard seeds",
        "packQty": 200,
        "unit": "g",
        "price": 1.53,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "yellow mustard seeds"
        ],
        "retailerPrices": {
          "Woolworths": 1.45,
          "Coles": 1.5,
          "ALDI": 1.35,
          "IGA": 1.81
        },
        "sourceName": "Comparable category estimate: mustard seeds",
        "sourceUrl": "https://www.coles.com.au/product/pattu-mustard-seeds-200g-3339210",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-medium-egg-noodle-nests",
        "name": "medium egg noodle nests",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "medium egg noodle nests"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-smoked-mackerel-fillet",
        "name": "smoked mackerel fillet",
        "packQty": 150,
        "unit": "g",
        "price": 7.1,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "smoked mackerel fillet"
        ],
        "retailerPrices": {
          "Woolworths": 6.76,
          "Coles": 6.97,
          "ALDI": 6.25,
          "IGA": 8.41
        },
        "sourceName": "Comparable category estimate: Canned chunk light tuna",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 80
        }
      },
      {
        "id": "au-estimate-fish-pie-mix",
        "name": "Fish Pie Mix",
        "packQty": 300,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Fish Pie Mix"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Comparable category estimate: Frozen vegetable gyoza",
        "sourceUrl": "https://www.coles.com.au/product/coles-nature%27s-kitchen-vegetable-gyoza-300g-1100146",
        "conversionHints": {
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-west-african-style-seasoning",
        "name": "West African Style Seasoning",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "West African Style Seasoning"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-pecan-nut-halves",
        "name": "Pecan Nut Halves",
        "packQty": 450,
        "unit": "g",
        "price": 8.58,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "Pecan Nut Halves"
        ],
        "retailerPrices": {
          "Woolworths": 8.17,
          "Coles": 8.42,
          "ALDI": 7.56,
          "IGA": 10.17
        },
        "sourceName": "Comparable category estimate: Almonds",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 3,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-breaded-fish-burgers",
        "name": "Breaded Fish Burgers",
        "packQty": 450,
        "unit": "g",
        "price": 22.68,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Breaded Fish Burgers"
        ],
        "retailerPrices": {
          "Woolworths": 21.6,
          "Coles": 22.27,
          "ALDI": 19.98,
          "IGA": 26.88
        },
        "sourceName": "Comparable category estimate: Frozen cod fillets",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 100
        }
      },
      {
        "id": "au-estimate-egg-for-binding",
        "name": "Egg for Binding",
        "packQty": 12,
        "unit": "each",
        "price": 5.25,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Egg for Binding"
        ],
        "retailerPrices": {
          "Woolworths": 5,
          "Coles": 5.15,
          "ALDI": 4.62,
          "IGA": 6.22
        },
        "sourceName": "Comparable category estimate: Large eggs",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {}
      },
      {
        "id": "au-estimate-vegetable-spring-rolls",
        "name": "Vegetable Spring Rolls",
        "packQty": 300,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Vegetable Spring Rolls"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Comparable category estimate: Frozen vegetable gyoza",
        "sourceUrl": "https://www.coles.com.au/product/coles-nature%27s-kitchen-vegetable-gyoza-300g-1100146",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-nduja-and-red-pepper-ravioli",
        "name": "'Nduja and Red Pepper Ravioli",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "'Nduja and Red Pepper Ravioli"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-honey-for-drizzling",
        "name": "Honey for Drizzling",
        "packQty": 1800,
        "unit": "g",
        "price": 2.3,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Honey for Drizzling"
        ],
        "retailerPrices": {
          "Woolworths": 2.19,
          "Coles": 2.26,
          "ALDI": 2.03,
          "IGA": 2.73
        },
        "sourceName": "Comparable category estimate: Granulated white sugar",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 7,
          "tbspWeight": 21,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-finely-chopped-tomatoes-with-basil",
        "name": "Finely Chopped Tomatoes with Basil",
        "packQty": 400,
        "unit": "g",
        "price": 1.23,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Finely Chopped Tomatoes with Basil"
        ],
        "retailerPrices": {
          "Woolworths": 1.17,
          "Coles": 1.21,
          "ALDI": 1.08,
          "IGA": 1.46
        },
        "sourceName": "Comparable category estimate: Canned diced tomatoes",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tinWeight": 400,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-olive-oil-for-the-chimichurri",
        "name": "Olive Oil for the Chimichurri",
        "packQty": 1400,
        "unit": "ml",
        "price": 7.57,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Olive Oil for the Chimichurri"
        ],
        "retailerPrices": {
          "Woolworths": 7.21,
          "Coles": 7.43,
          "ALDI": 6.67,
          "IGA": 8.97
        },
        "sourceName": "Comparable category estimate: Vegetable oil",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "gramsPerMl": 0.92,
          "defaultUsage": 15,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-salted-pistachios",
        "name": "Salted Pistachios",
        "packQty": 450,
        "unit": "g",
        "price": 7.87,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Salted Pistachios"
        ],
        "retailerPrices": {
          "Woolworths": 7.49,
          "Coles": 7.73,
          "ALDI": 6.93,
          "IGA": 9.33
        },
        "sourceName": "Comparable category estimate: Roasted peanuts",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 6,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-pumpkin-and-sage-girasoli",
        "name": "Pumpkin and Sage Girasoli",
        "packQty": 900,
        "unit": "g",
        "price": 2.44,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "Pumpkin and Sage Girasoli"
        ],
        "retailerPrices": {
          "Woolworths": 2.32,
          "Coles": 2.4,
          "ALDI": 2.15,
          "IGA": 2.89
        },
        "sourceName": "Comparable category estimate: Carrots",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 90
        }
      },
      {
        "id": "au-estimate-slooow-stone-oven-white-baguette",
        "name": "SlooOW Stone Oven White Baguette",
        "packQty": 550,
        "unit": "g",
        "price": 3.44,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "SlooOW Stone Oven White Baguette"
        ],
        "retailerPrices": {
          "Woolworths": 3.28,
          "Coles": 3.38,
          "ALDI": 3.03,
          "IGA": 4.08
        },
        "sourceName": "Comparable category estimate: White sandwich bread",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "sliceWeight": 27.5,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-free-range-chicken-thighs",
        "name": "free range chicken thighs",
        "packQty": 1100,
        "unit": "g",
        "price": 14.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "free range chicken thighs"
        ],
        "retailerPrices": {
          "Woolworths": 14.04,
          "Coles": 14.47,
          "ALDI": 12.98,
          "IGA": 17.47
        },
        "sourceName": "Comparable category estimate: Boneless chicken breast",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 110
        }
      },
      {
        "id": "au-estimate-4-vegetable-samosas",
        "name": "4 vegetable samosas",
        "packQty": 300,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "4 vegetable samosas"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Comparable category estimate: Frozen vegetable gyoza",
        "sourceUrl": "https://www.coles.com.au/product/coles-nature%27s-kitchen-vegetable-gyoza-300g-1100146",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-plain-cooked-mussels",
        "name": "plain cooked mussels",
        "packQty": 450,
        "unit": "g",
        "price": 20.18,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "plain cooked mussels"
        ],
        "retailerPrices": {
          "Woolworths": 19.21,
          "Coles": 19.81,
          "ALDI": 17.78,
          "IGA": 23.92
        },
        "sourceName": "Comparable category estimate: Frozen raw shrimp",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-heritage-tomatoes",
        "name": "heritage tomatoes",
        "packQty": 450,
        "unit": "g",
        "price": 5.84,
        "observedAt": "2026-09-23",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "heritage tomatoes"
        ],
        "retailerPrices": {
          "Woolworths": 5.56,
          "Coles": 5.73,
          "ALDI": 5.14,
          "IGA": 6.92
        },
        "sourceName": "Comparable category estimate: Vine tomatoes",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 120
        }
      },
      {
        "id": "au-estimate-seasonal-salad",
        "name": "seasonal salad",
        "packQty": 150,
        "unit": "g",
        "price": 5.53,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "seasonal salad"
        ],
        "retailerPrices": {
          "Woolworths": 5.27,
          "Coles": 5.43,
          "ALDI": 4.87,
          "IGA": 6.55
        },
        "sourceName": "Comparable category estimate: Spring mix salad greens",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-smoked-streaky-bacon",
        "name": "smoked streaky bacon",
        "packQty": 200,
        "unit": "g",
        "price": 5.81,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "smoked streaky bacon"
        ],
        "retailerPrices": {
          "Woolworths": 5.53,
          "Coles": 5.7,
          "ALDI": 5.11,
          "IGA": 6.88
        },
        "sourceName": "Comparable category estimate: Diced bacon pieces",
        "sourceUrl": "https://www.coles.com.au/product/primo-cook-and-create-diced-bacon-200g-2739199",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-cooking-oil-spray",
        "name": "Cooking oil spray",
        "packQty": 1400,
        "unit": "ml",
        "price": 7.57,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Cooking oil spray"
        ],
        "retailerPrices": {
          "Woolworths": 7.21,
          "Coles": 7.43,
          "ALDI": 6.67,
          "IGA": 8.97
        },
        "sourceName": "Comparable category estimate: Vegetable oil",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-cheese-flavour-slices",
        "name": "cheese flavour slices",
        "packQty": 250,
        "unit": "g",
        "price": 4.28,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "cheese flavour slices"
        ],
        "retailerPrices": {
          "Woolworths": 4.08,
          "Coles": 4.2,
          "ALDI": 3.77,
          "IGA": 5.07
        },
        "sourceName": "Comparable category estimate: Shredded mozzarella",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-sausage-meat",
        "name": "sausage meat",
        "packQty": 450,
        "unit": "g",
        "price": 5.17,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "sausage meat"
        ],
        "retailerPrices": {
          "Woolworths": 4.92,
          "Coles": 5.08,
          "ALDI": 4.55,
          "IGA": 6.13
        },
        "sourceName": "Comparable category estimate: Breakfast sausage",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 1,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-grilling-cheese",
        "name": "Grilling Cheese",
        "packQty": 250,
        "unit": "g",
        "price": 4.28,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Grilling Cheese"
        ],
        "retailerPrices": {
          "Woolworths": 4.08,
          "Coles": 4.2,
          "ALDI": 3.77,
          "IGA": 5.07
        },
        "sourceName": "Comparable category estimate: Shredded mozzarella",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-smoked-sea-salt-flakes",
        "name": "smoked sea salt flakes",
        "packQty": 750,
        "unit": "g",
        "price": 7.1,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "smoked sea salt flakes"
        ],
        "retailerPrices": {
          "Woolworths": 6.76,
          "Coles": 6.97,
          "ALDI": 6.25,
          "IGA": 8.41
        },
        "sourceName": "Comparable category estimate: Salt",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 6,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-creamy-single-soy",
        "name": "creamy single soy",
        "packQty": 1800,
        "unit": "g",
        "price": 6.25,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "creamy single soy"
        ],
        "retailerPrices": {
          "Woolworths": 5.95,
          "Coles": 6.14,
          "ALDI": 5.51,
          "IGA": 7.41
        },
        "sourceName": "Comparable category estimate: Oat milk",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-mint-coriander-chutney",
        "name": "mint & coriander chutney",
        "packQty": 340,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "mint & coriander chutney"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Comparable category estimate: Mild mango chutney",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-mango-chutney-mild-340g-5029713",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-wildfarmed-pizza-bases",
        "name": "Wildfarmed pizza bases",
        "packQty": 300,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Wildfarmed pizza bases"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Comparable category estimate: Frozen vegetable gyoza",
        "sourceUrl": "https://www.coles.com.au/product/coles-nature%27s-kitchen-vegetable-gyoza-300g-1100146",
        "conversionHints": {
          "eachWeight": 220
        }
      },
      {
        "id": "au-estimate-sliced-prosciutto",
        "name": "sliced prosciutto",
        "packQty": 200,
        "unit": "g",
        "price": 5.81,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "sliced prosciutto"
        ],
        "retailerPrices": {
          "Woolworths": 5.53,
          "Coles": 5.7,
          "ALDI": 5.11,
          "IGA": 6.88
        },
        "sourceName": "Comparable category estimate: Diced bacon pieces",
        "sourceUrl": "https://www.coles.com.au/product/primo-cook-and-create-diced-bacon-200g-2739199",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-british-duck-breasts",
        "name": "British Duck Breasts",
        "packQty": 450,
        "unit": "g",
        "price": 14.77,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "British Duck Breasts"
        ],
        "retailerPrices": {
          "Woolworths": 14.06,
          "Coles": 14.5,
          "ALDI": 13.01,
          "IGA": 17.5
        },
        "sourceName": "Comparable category estimate: Confit duck legs",
        "sourceUrl": "https://www.coles.com.au/product/luv-a-duck-confit-duck-legs-450g-2089708",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-mini-bell-pepper-mix",
        "name": "Mini Bell Pepper Mix",
        "packQty": 1,
        "unit": "each",
        "price": 1.64,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Mini Bell Pepper Mix"
        ],
        "retailerPrices": {
          "Woolworths": 1.56,
          "Coles": 1.61,
          "ALDI": 1.44,
          "IGA": 1.94
        },
        "sourceName": "Comparable category estimate: Red bell pepper",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 160
        }
      },
      {
        "id": "au-estimate-pieminister-big-cheese-vintage-cheddar-leek-pie",
        "name": "Pieminister Big Cheese Vintage Cheddar & Leek Pie",
        "packQty": 250,
        "unit": "g",
        "price": 4.99,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Pieminister Big Cheese Vintage Cheddar & Leek Pie"
        ],
        "retailerPrices": {
          "Woolworths": 4.75,
          "Coles": 4.9,
          "ALDI": 4.4,
          "IGA": 5.91
        },
        "sourceName": "Comparable category estimate: Block cheddar cheese",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-oil-for-the-chicken",
        "name": "Oil for the Chicken",
        "packQty": 1400,
        "unit": "ml",
        "price": 7.57,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Oil for the Chicken"
        ],
        "retailerPrices": {
          "Woolworths": 7.21,
          "Coles": 7.43,
          "ALDI": 6.67,
          "IGA": 8.97
        },
        "sourceName": "Comparable category estimate: Vegetable oil",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "gramsPerMl": 0.92,
          "defaultUsage": 15,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-sliced-spring-greens",
        "name": "Sliced Spring Greens",
        "packQty": 1100,
        "unit": "g",
        "price": 2.1,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "Sliced Spring Greens"
        ],
        "retailerPrices": {
          "Woolworths": 2,
          "Coles": 2.06,
          "ALDI": 1.85,
          "IGA": 2.49
        },
        "sourceName": "Comparable category estimate: Green cabbage",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 8
        }
      },
      {
        "id": "au-estimate-padron-peppers",
        "name": "Padron Peppers",
        "packQty": 1,
        "unit": "each",
        "price": 1.64,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Padron Peppers"
        ],
        "retailerPrices": {
          "Woolworths": 1.56,
          "Coles": 1.61,
          "ALDI": 1.44,
          "IGA": 1.94
        },
        "sourceName": "Comparable category estimate: Red bell pepper",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 160
        }
      },
      {
        "id": "au-estimate-signature-sauce",
        "name": "Signature Sauce",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Signature Sauce"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-sugar-for-the-marinade",
        "name": "Sugar for the Marinade",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Sugar for the Marinade"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "tspWeight": 4,
          "defaultUsage": 4,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-cantonese-style-stir-fry-sauce",
        "name": "Cantonese Style Stir-Fry Sauce",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Cantonese Style Stir-Fry Sauce"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-21-day-aged-british-fillet-steaks",
        "name": "21 Day Aged British Fillet Steaks",
        "packQty": 550,
        "unit": "g",
        "price": 19.53,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "21 Day Aged British Fillet Steaks"
        ],
        "retailerPrices": {
          "Woolworths": 18.6,
          "Coles": 19.18,
          "ALDI": 17.2,
          "IGA": 23.15
        },
        "sourceName": "Comparable category estimate: Top sirloin steak",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-salt-pepper-seasoning",
        "name": "Salt & Pepper Seasoning",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Salt & Pepper Seasoning"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 6,
          "defaultUsage": 1,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-olive-oil-for-the-relish",
        "name": "Olive Oil for the Relish",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Olive Oil for the Relish"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "gramsPerMl": 0.92,
          "defaultUsage": 15,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-free-range-chicken-breast-portions",
        "name": "free range chicken breast portions",
        "packQty": 1100,
        "unit": "g",
        "price": 14.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "free range chicken breast portions"
        ],
        "retailerPrices": {
          "Woolworths": 14.04,
          "Coles": 14.47,
          "ALDI": 12.98,
          "IGA": 17.47
        },
        "sourceName": "Comparable category estimate: Boneless chicken breast",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 180
        }
      },
      {
        "id": "au-estimate-chicken-breast-portion",
        "name": "chicken breast portion",
        "packQty": 1100,
        "unit": "g",
        "price": 14.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "chicken breast portion"
        ],
        "retailerPrices": {
          "Woolworths": 14.04,
          "Coles": 14.47,
          "ALDI": 12.98,
          "IGA": 17.47
        },
        "sourceName": "Comparable category estimate: Boneless chicken breast",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 180
        }
      },
      {
        "id": "au-estimate-2-cheese-garlic-and-basil-baguettes",
        "name": "2 cheese, garlic and basil baguettes",
        "packQty": 1,
        "unit": "each",
        "price": 2.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "2 cheese, garlic and basil baguettes"
        ],
        "retailerPrices": {
          "Woolworths": 2.61,
          "Coles": 2.69,
          "ALDI": 2.41,
          "IGA": 3.25
        },
        "sourceName": "Comparable category estimate: French baguette",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {}
      },
      {
        "id": "au-estimate-tail-on-jumbo-king-prawns",
        "name": "tail on jumbo king prawns",
        "packQty": 450,
        "unit": "g",
        "price": 20.18,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "tail on jumbo king prawns"
        ],
        "retailerPrices": {
          "Woolworths": 19.21,
          "Coles": 19.81,
          "ALDI": 17.78,
          "IGA": 23.92
        },
        "sourceName": "Comparable category estimate: Frozen raw shrimp",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-pork-beef-mince",
        "name": "pork & beef mince",
        "packQty": 450,
        "unit": "g",
        "price": 9.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "pork & beef mince"
        ],
        "retailerPrices": {
          "Woolworths": 8.64,
          "Coles": 8.91,
          "ALDI": 7.99,
          "IGA": 10.75
        },
        "sourceName": "Comparable category estimate: Ground beef 93% lean",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-mint-dill",
        "name": "mint & dill",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "mint & dill"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 1,
          "eachWeight": 13
        }
      },
      {
        "id": "au-estimate-jolly-hog-pork-sausagemeat",
        "name": "Jolly Hog pork sausagemeat",
        "packQty": 450,
        "unit": "g",
        "price": 6.8,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Jolly Hog pork sausagemeat"
        ],
        "retailerPrices": {
          "Woolworths": 6.47,
          "Coles": 6.68,
          "ALDI": 5.99,
          "IGA": 8.06
        },
        "sourceName": "Comparable category estimate: Ground pork",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 1,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-lemongrass-and-lime-leaf-paste",
        "name": "lemongrass and lime leaf paste",
        "packQty": 1400,
        "unit": "g",
        "price": 10.21,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "lemongrass and lime leaf paste"
        ],
        "retailerPrices": {
          "Woolworths": 9.72,
          "Coles": 10.02,
          "ALDI": 8.99,
          "IGA": 12.1
        },
        "sourceName": "Comparable category estimate: Apples",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150,
          "tspWeight": 5,
          "tbspWeight": 15,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-sliced-burger-buns",
        "name": "Sliced Burger Buns",
        "packQty": 300,
        "unit": "g",
        "price": 6.62,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Sliced Burger Buns"
        ],
        "retailerPrices": {
          "Woolworths": 6.3,
          "Coles": 6.5,
          "ALDI": 5.83,
          "IGA": 7.85
        },
        "sourceName": "Comparable category estimate: Frozen vegetable gyoza",
        "sourceUrl": "https://www.coles.com.au/product/coles-nature%27s-kitchen-vegetable-gyoza-300g-1100146",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-knorr-vegetable-stock",
        "name": "KNORR Vegetable Stock",
        "packQty": 105,
        "unit": "g",
        "price": 2.04,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "KNORR Vegetable Stock"
        ],
        "retailerPrices": {
          "Woolworths": 1.94,
          "Coles": 2,
          "ALDI": 1.79,
          "IGA": 2.41
        },
        "sourceName": "Comparable category estimate: Vegetable stock cubes",
        "sourceUrl": "https://www.coles.com.au/product/coles-vegetable-flavoured-stock-cubes-105g-1601582",
        "conversionHints": {
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-black-bean-paste",
        "name": "black bean paste",
        "packQty": 450,
        "unit": "g",
        "price": 2.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "black bean paste"
        ],
        "retailerPrices": {
          "Woolworths": 1.97,
          "Coles": 2.03,
          "ALDI": 1.82,
          "IGA": 2.45
        },
        "sourceName": "Comparable category estimate: Canned chickpeas",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tinWeight": 450,
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-sweet-pepper-relish",
        "name": "sweet pepper relish",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "sweet pepper relish"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-fine-egg-noodle-nests",
        "name": "fine egg noodle nests",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "fine egg noodle nests"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-shichimi-togarashi",
        "name": "shichimi togarashi",
        "packQty": 30,
        "unit": "g",
        "price": 3.56,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "shichimi togarashi"
        ],
        "retailerPrices": {
          "Woolworths": 3.39,
          "Coles": 3.5,
          "ALDI": 3.14,
          "IGA": 4.22
        },
        "sourceName": "Comparable category estimate: mixed spice",
        "sourceUrl": "https://www.coles.com.au/product/masterfoods-mixed-spice-30g-316376",
        "conversionHints": {
          "tspWeight": 3,
          "eachWeight": 30
        }
      },
      {
        "id": "au-estimate-szechuan-paste",
        "name": "Szechuan Paste",
        "packQty": 500,
        "unit": "g",
        "price": 6.76,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Szechuan Paste"
        ],
        "retailerPrices": {
          "Woolworths": 6.44,
          "Coles": 6.64,
          "ALDI": 5.95,
          "IGA": 8.01
        },
        "sourceName": "Comparable category estimate: Sriracha hot sauce",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-sliced-pepperoni",
        "name": "sliced pepperoni",
        "packQty": 200,
        "unit": "g",
        "price": 8.15,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "sliced pepperoni"
        ],
        "retailerPrices": {
          "Woolworths": 7.76,
          "Coles": 8,
          "ALDI": 7.18,
          "IGA": 9.66
        },
        "sourceName": "Comparable category estimate: Chorizo sausage",
        "sourceUrl": "https://www.coles.com.au/product/provedore-free-range-chorizo-200g-4250790",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-baguettes",
        "name": "baguettes",
        "packQty": 1,
        "unit": "each",
        "price": 2.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "baguettes"
        ],
        "retailerPrices": {
          "Woolworths": 2.61,
          "Coles": 2.69,
          "ALDI": 2.41,
          "IGA": 3.25
        },
        "sourceName": "Comparable category estimate: French baguette",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {}
      },
      {
        "id": "au-estimate-parsley-dill",
        "name": "parsley & dill",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "parsley & dill"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 1,
          "eachWeight": 13
        }
      },
      {
        "id": "au-estimate-smoked-salmon",
        "name": "Smoked Salmon",
        "packQty": 450,
        "unit": "g",
        "price": 27.22,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Smoked Salmon"
        ],
        "retailerPrices": {
          "Woolworths": 25.92,
          "Coles": 26.73,
          "ALDI": 23.98,
          "IGA": 32.26
        },
        "sourceName": "Comparable category estimate: Salmon fillet",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 225
        }
      },
      {
        "id": "au-estimate-skin-on-hake-fillets",
        "name": "Skin-On Hake Fillets",
        "packQty": 450,
        "unit": "g",
        "price": 22.68,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Skin-On Hake Fillets"
        ],
        "retailerPrices": {
          "Woolworths": 21.6,
          "Coles": 22.27,
          "ALDI": 19.98,
          "IGA": 26.88
        },
        "sourceName": "Comparable category estimate: Frozen cod fillets",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 120
        }
      },
      {
        "id": "au-estimate-garlic-herb-seasoning",
        "name": "Garlic & Herb Seasoning",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Garlic & Herb Seasoning"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.2,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-slow-cooked-wild-garlic-british-porchetta",
        "name": "Slow Cooked Wild Garlic British Porchetta",
        "packQty": 1400,
        "unit": "g",
        "price": 4.43,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Slow Cooked Wild Garlic British Porchetta"
        ],
        "retailerPrices": {
          "Woolworths": 4.22,
          "Coles": 4.35,
          "ALDI": 3.9,
          "IGA": 5.25
        },
        "sourceName": "Comparable category estimate: Yellow onions",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-smoked-ham-slices",
        "name": "Smoked Ham Slices",
        "packQty": 200,
        "unit": "g",
        "price": 5.81,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Smoked Ham Slices"
        ],
        "retailerPrices": {
          "Woolworths": 5.53,
          "Coles": 5.7,
          "ALDI": 5.11,
          "IGA": 6.88
        },
        "sourceName": "Comparable category estimate: Diced bacon pieces",
        "sourceUrl": "https://www.coles.com.au/product/primo-cook-and-create-diced-bacon-200g-2739199",
        "conversionHints": {
          "sliceWeight": 15,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-garlic-and-mixed-herbs-mature-cheddar",
        "name": "Garlic and Mixed Herbs Mature Cheddar",
        "packQty": 250,
        "unit": "g",
        "price": 4.99,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Garlic and Mixed Herbs Mature Cheddar"
        ],
        "retailerPrices": {
          "Woolworths": 4.75,
          "Coles": 4.9,
          "ALDI": 4.4,
          "IGA": 5.91
        },
        "sourceName": "Comparable category estimate: Block cheddar cheese",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-instant-gravy-powder",
        "name": "Instant Gravy Powder",
        "packQty": 105,
        "unit": "g",
        "price": 2.04,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Instant Gravy Powder"
        ],
        "retailerPrices": {
          "Woolworths": 1.94,
          "Coles": 2,
          "ALDI": 1.79,
          "IGA": 2.41
        },
        "sourceName": "Comparable category estimate: Vegetable stock cubes",
        "sourceUrl": "https://www.coles.com.au/product/coles-vegetable-flavoured-stock-cubes-105g-1601582",
        "conversionHints": {
          "tspWeight": 4,
          "tbspWeight": 12,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-venison-leg-steaks",
        "name": "Venison Leg Steaks",
        "packQty": 550,
        "unit": "g",
        "price": 19.53,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Venison Leg Steaks"
        ],
        "retailerPrices": {
          "Woolworths": 18.6,
          "Coles": 19.18,
          "ALDI": 17.2,
          "IGA": 23.15
        },
        "sourceName": "Comparable category estimate: Top sirloin steak",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-blood-orange",
        "name": "Blood Orange",
        "packQty": 1400,
        "unit": "g",
        "price": 10.21,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "Blood Orange"
        ],
        "retailerPrices": {
          "Woolworths": 9.72,
          "Coles": 10.02,
          "ALDI": 8.99,
          "IGA": 12.1
        },
        "sourceName": "Comparable category estimate: Apples",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-olive-oil-for-the-pil-pil",
        "name": "Olive Oil for the Pil Pil",
        "packQty": 1400,
        "unit": "ml",
        "price": 7.57,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Olive Oil for the Pil Pil"
        ],
        "retailerPrices": {
          "Woolworths": 7.21,
          "Coles": 7.43,
          "ALDI": 6.67,
          "IGA": 8.97
        },
        "sourceName": "Comparable category estimate: Vegetable oil",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "gramsPerMl": 0.92,
          "defaultUsage": 15,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-large-salmon-fillet",
        "name": "Large Salmon Fillet",
        "packQty": 450,
        "unit": "g",
        "price": 27.22,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "Large Salmon Fillet"
        ],
        "retailerPrices": {
          "Woolworths": 25.92,
          "Coles": 26.73,
          "ALDI": 23.98,
          "IGA": 32.26
        },
        "sourceName": "Comparable category estimate: Salmon fillet",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 225
        }
      },
      {
        "id": "au-estimate-waffle-amour-sugar-pearl-waffles",
        "name": "Waffle Amour Sugar Pearl Waffles",
        "packQty": 1800,
        "unit": "g",
        "price": 2.3,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Waffle Amour Sugar Pearl Waffles"
        ],
        "retailerPrices": {
          "Woolworths": 2.19,
          "Coles": 2.26,
          "ALDI": 2.03,
          "IGA": 2.73
        },
        "sourceName": "Comparable category estimate: Granulated white sugar",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-hilltop-hot-honey",
        "name": "Hilltop Hot Honey",
        "packQty": 1800,
        "unit": "g",
        "price": 2.3,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Hilltop Hot Honey"
        ],
        "retailerPrices": {
          "Woolworths": 2.19,
          "Coles": 2.26,
          "ALDI": 2.03,
          "IGA": 2.73
        },
        "sourceName": "Comparable category estimate: Granulated white sugar",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 7,
          "tbspWeight": 21,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-salt-pepper-squid",
        "name": "salt & pepper squid",
        "packQty": 1,
        "unit": "each",
        "price": 1.64,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "salt & pepper squid"
        ],
        "retailerPrices": {
          "Woolworths": 1.56,
          "Coles": 1.61,
          "ALDI": 1.44,
          "IGA": 1.94
        },
        "sourceName": "Comparable category estimate: Red bell pepper",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 160,
          "tspWeight": 6,
          "defaultUsage": 1
        }
      },
      {
        "id": "au-estimate-gluten-free-spaghetti",
        "name": "gluten free spaghetti",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "gluten free spaghetti"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-cheese-and-jalapeno-hot-link-sausage",
        "name": "cheese and jalapeno hot link sausage",
        "packQty": 450,
        "unit": "g",
        "price": 5.17,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "cheese and jalapeno hot link sausage"
        ],
        "retailerPrices": {
          "Woolworths": 4.92,
          "Coles": 5.08,
          "ALDI": 4.55,
          "IGA": 6.13
        },
        "sourceName": "Comparable category estimate: Breakfast sausage",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 1,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-wild-garlic-paste",
        "name": "wild garlic paste",
        "packQty": 1000,
        "unit": "g",
        "price": 5.3,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "wild garlic paste"
        ],
        "retailerPrices": {
          "Woolworths": 5.04,
          "Coles": 5.2,
          "ALDI": 4.67,
          "IGA": 6.28
        },
        "sourceName": "Comparable category estimate: Ginger and garlic paste",
        "sourceUrl": "https://www.coles.com.au/product/maharajah%27s-choice-ginger-and-garlic-paste-1kg-3868845",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-dried-lime-leaf",
        "name": "dried lime leaf",
        "packQty": 1400,
        "unit": "g",
        "price": 10.21,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Woolworths"
        ],
        "aliases": [
          "dried lime leaf"
        ],
        "retailerPrices": {
          "Woolworths": 9.72,
          "Coles": 10.02,
          "ALDI": 8.99,
          "IGA": 12.1
        },
        "sourceName": "Comparable category estimate: Apples",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-dried-sage",
        "name": "dried sage",
        "packQty": 10,
        "unit": "g",
        "price": 3.36,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "dried sage"
        ],
        "retailerPrices": {
          "Woolworths": 3.2,
          "Coles": 3.3,
          "ALDI": 2.96,
          "IGA": 3.98
        },
        "sourceName": "Comparable category estimate: sage",
        "sourceUrl": "https://www.coles.com.au/product/coles-herb-punnets-sage-10g-3215138",
        "conversionHints": {
          "tspWeight": 1,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-honey-for-the-sauce",
        "name": "Honey for the Sauce",
        "packQty": 210,
        "unit": "ml",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Honey for the Sauce"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: teriyaki sauce",
        "sourceUrl": "https://www.coles.com.au/browse/international-foods/asian-foods/ready-sauces-pastes-marinades",
        "conversionHints": {
          "tspWeight": 7,
          "tbspWeight": 21,
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-oil-for-the-roux",
        "name": "Oil for the Roux",
        "packQty": 1400,
        "unit": "ml",
        "price": 7.57,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Oil for the Roux"
        ],
        "retailerPrices": {
          "Woolworths": 7.21,
          "Coles": 7.43,
          "ALDI": 6.67,
          "IGA": 8.97
        },
        "sourceName": "Comparable category estimate: Vegetable oil",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tspWeight": 5,
          "tbspWeight": 15,
          "gramsPerMl": 0.92,
          "defaultUsage": 15,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-steamed-brown-basmati-rice",
        "name": "Steamed Brown Basmati Rice",
        "packQty": 2300,
        "unit": "g",
        "price": 14.55,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "Steamed Brown Basmati Rice"
        ],
        "retailerPrices": {
          "Woolworths": 13.85,
          "Coles": 14.29,
          "ALDI": 12.82,
          "IGA": 17.24
        },
        "sourceName": "Comparable category estimate: Long grain white rice",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "pouchWeight": 250,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-green-olives",
        "name": "Green Olives",
        "packQty": 150,
        "unit": "g",
        "price": 2.27,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA"
        ],
        "aliases": [
          "Green Olives"
        ],
        "retailerPrices": {
          "Woolworths": 2.16,
          "Coles": 2.23,
          "ALDI": 2,
          "IGA": 2.69
        },
        "sourceName": "Comparable category estimate: Sliced black olives",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 4.5
        }
      },
      {
        "id": "au-estimate-coconut-flakes",
        "name": "coconut flakes",
        "packQty": 400,
        "unit": "ml",
        "price": 1.73,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "coconut flakes"
        ],
        "retailerPrices": {
          "Woolworths": 1.65,
          "Coles": 1.7,
          "ALDI": 1.53,
          "IGA": 2.05
        },
        "sourceName": "Comparable category estimate: coconut cream",
        "sourceUrl": "https://www.coles.com.au/product/coles-simply-coconut-cream-400ml-5357676",
        "conversionHints": {
          "tinWeight": 400,
          "eachWeight": 150,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-wholemeal-tortillas",
        "name": "wholemeal tortillas",
        "packQty": 6,
        "unit": "each",
        "price": 4.15,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "wholemeal tortillas"
        ],
        "retailerPrices": {
          "Woolworths": 3.95,
          "Coles": 4.07,
          "ALDI": 3.66,
          "IGA": 4.92
        },
        "sourceName": "Comparable category estimate: Pita bread",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {}
      },
      {
        "id": "au-estimate-tamarind-coconut-curry-paste",
        "name": "tamarind & coconut curry paste",
        "packQty": 80,
        "unit": "g",
        "price": 4.07,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "tamarind & coconut curry paste"
        ],
        "retailerPrices": {
          "Woolworths": 3.88,
          "Coles": 4,
          "ALDI": 3.59,
          "IGA": 4.83
        },
        "sourceName": "Comparable category estimate: Korma curry paste",
        "sourceUrl": "https://www.coles.com.au/product/patak%27s-korma-paste-80g-1401823",
        "conversionHints": {
          "tspWeight": 6,
          "tbspWeight": 18,
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-5-bean-medley",
        "name": "5 bean medley",
        "packQty": 450,
        "unit": "g",
        "price": 2.07,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "5 bean medley"
        ],
        "retailerPrices": {
          "Woolworths": 1.97,
          "Coles": 2.03,
          "ALDI": 1.82,
          "IGA": 2.45
        },
        "sourceName": "Comparable category estimate: Canned chickpeas",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tinWeight": 450,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-renourish-digest-roasted-carrot-ginger-soup-500g",
        "name": "RENOURISH Digest Roasted Carrot Ginger Soup 500g",
        "packQty": 300,
        "unit": "g",
        "price": 1.54,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "RENOURISH Digest Roasted Carrot Ginger Soup 500g"
        ],
        "retailerPrices": {
          "Woolworths": 1.47,
          "Coles": 1.51,
          "ALDI": 1.36,
          "IGA": 1.83
        },
        "sourceName": "Comparable category estimate: Condensed cream of mushroom soup",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 80
        }
      },
      {
        "id": "au-estimate-whipped-feta-roasted-tomato-quiche-with-spinach",
        "name": "whipped feta & roasted tomato quiche with spinach",
        "packQty": 150,
        "unit": "g",
        "price": 7.02,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "whipped feta & roasted tomato quiche with spinach"
        ],
        "retailerPrices": {
          "Woolworths": 6.68,
          "Coles": 6.89,
          "ALDI": 6.18,
          "IGA": 8.32
        },
        "sourceName": "Comparable category estimate: Crumbled feta cheese",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-hispi-cabbage",
        "name": "hispi cabbage",
        "packQty": 150,
        "unit": "g",
        "price": 5.53,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "hispi cabbage"
        ],
        "retailerPrices": {
          "Woolworths": 5.27,
          "Coles": 5.43,
          "ALDI": 4.87,
          "IGA": 6.55
        },
        "sourceName": "Comparable category estimate: Spring mix salad greens",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 700
        }
      },
      {
        "id": "au-estimate-ground-allspice",
        "name": "ground allspice",
        "packQty": 30,
        "unit": "g",
        "price": 3.56,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "ground allspice"
        ],
        "retailerPrices": {
          "Woolworths": 3.39,
          "Coles": 3.5,
          "ALDI": 3.14,
          "IGA": 4.22
        },
        "sourceName": "Comparable category estimate: mixed spice",
        "sourceUrl": "https://www.coles.com.au/product/masterfoods-mixed-spice-30g-316376",
        "conversionHints": {
          "tspWeight": 2.5,
          "eachWeight": 10
        }
      },
      {
        "id": "au-estimate-pistachios",
        "name": "pistachios",
        "packQty": 450,
        "unit": "g",
        "price": 7.87,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "pistachios"
        ],
        "retailerPrices": {
          "Woolworths": 7.49,
          "Coles": 7.73,
          "ALDI": 6.93,
          "IGA": 9.33
        },
        "sourceName": "Comparable category estimate: Roasted peanuts",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-wholewheat-noodle-nest",
        "name": "wholewheat noodle nest",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "wholewheat noodle nest"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "nestWeight": 62.5,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-coconut-turmeric-sprinkle",
        "name": "Coconut & turmeric sprinkle",
        "packQty": 13,
        "unit": "g",
        "price": 2.19,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Coconut & turmeric sprinkle"
        ],
        "retailerPrices": {
          "Woolworths": 2.09,
          "Coles": 2.15,
          "ALDI": 1.93,
          "IGA": 2.6
        },
        "sourceName": "Comparable category estimate: Mixed dried herbs",
        "sourceUrl": "https://www.coles.com.au/product/coles-mixed-herbs-13g-8987375",
        "conversionHints": {
          "tspWeight": 2.5,
          "eachWeight": 13
        }
      },
      {
        "id": "au-estimate-asian-broth-paste",
        "name": "Asian Broth Paste",
        "packQty": 105,
        "unit": "g",
        "price": 2.04,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "Asian Broth Paste"
        ],
        "retailerPrices": {
          "Woolworths": 1.94,
          "Coles": 2,
          "ALDI": 1.79,
          "IGA": 2.41
        },
        "sourceName": "Comparable category estimate: Vegetable stock cubes",
        "sourceUrl": "https://www.coles.com.au/product/coles-vegetable-flavoured-stock-cubes-105g-1601582",
        "conversionHints": {
          "eachWeight": 10,
          "gramsPerMl": 1
        }
      },
      {
        "id": "au-estimate-plant-based-soy-protein-chicken-pieces",
        "name": "Plant-Based Soy Protein Chicken Pieces",
        "packQty": 400,
        "unit": "g",
        "price": 3.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "Woolworths"
        ],
        "aliases": [
          "Plant-Based Soy Protein Chicken Pieces"
        ],
        "retailerPrices": {
          "Woolworths": 3.5,
          "Coles": 3.61,
          "ALDI": 3.24,
          "IGA": 4.36
        },
        "sourceName": "Comparable category estimate: Firm tofu",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-thistm-isn-t-pork-sausages",
        "name": "THIS™ Isn't Pork Sausages",
        "packQty": 450,
        "unit": "g",
        "price": 6.8,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "THIS™ Isn't Pork Sausages"
        ],
        "retailerPrices": {
          "Woolworths": 6.47,
          "Coles": 6.68,
          "ALDI": 5.99,
          "IGA": 8.06
        },
        "sourceName": "Comparable category estimate: Ground pork",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 60
        }
      },
      {
        "id": "au-estimate-blue-stilton-cheese",
        "name": "blue stilton® cheese",
        "packQty": 250,
        "unit": "g",
        "price": 4.28,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "blue stilton® cheese"
        ],
        "retailerPrices": {
          "Woolworths": 4.08,
          "Coles": 4.2,
          "ALDI": 3.77,
          "IGA": 5.07
        },
        "sourceName": "Comparable category estimate: Shredded mozzarella",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-garlic-herb-dip",
        "name": "garlic & herb dip",
        "packQty": 1400,
        "unit": "g",
        "price": 4.43,
        "observedAt": "2026-09-27",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "garlic & herb dip"
        ],
        "retailerPrices": {
          "Woolworths": 4.22,
          "Coles": 4.35,
          "ALDI": 3.9,
          "IGA": 5.25
        },
        "sourceName": "Comparable category estimate: Yellow onions",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-tuna-chunks-in-spring-water",
        "name": "tuna chunks in spring water",
        "packQty": 150,
        "unit": "g",
        "price": 7.1,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "tuna chunks in spring water"
        ],
        "retailerPrices": {
          "Woolworths": 6.76,
          "Coles": 6.97,
          "ALDI": 6.25,
          "IGA": 8.41
        },
        "sourceName": "Comparable category estimate: Canned chunk light tuna",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "tinWeight": 145,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-bread-roll",
        "name": "bread roll",
        "packQty": 550,
        "unit": "g",
        "price": 3.44,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "bread roll"
        ],
        "retailerPrices": {
          "Woolworths": 3.28,
          "Coles": 3.38,
          "ALDI": 3.03,
          "IGA": 4.08
        },
        "sourceName": "Comparable category estimate: White sandwich bread",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "sliceWeight": 27.5,
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-cooked-shredded-chicken-thighs",
        "name": "cooked shredded chicken thighs",
        "packQty": 1100,
        "unit": "g",
        "price": 14.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "cooked shredded chicken thighs"
        ],
        "retailerPrices": {
          "Woolworths": 14.04,
          "Coles": 14.47,
          "ALDI": 12.98,
          "IGA": 17.47
        },
        "sourceName": "Comparable category estimate: Boneless chicken breast",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 110
        }
      },
      {
        "id": "au-estimate-cooked-chicken-breast",
        "name": "cooked chicken breast",
        "packQty": 1100,
        "unit": "g",
        "price": 14.74,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "IGA"
        ],
        "aliases": [
          "cooked chicken breast"
        ],
        "retailerPrices": {
          "Woolworths": 14.04,
          "Coles": 14.47,
          "ALDI": 12.98,
          "IGA": 17.47
        },
        "sourceName": "Comparable category estimate: Boneless chicken breast",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-renourish-broccoli-cheddar-soup",
        "name": "RENOURISH broccoli & cheddar soup",
        "packQty": 300,
        "unit": "g",
        "price": 1.54,
        "observedAt": "2026-09-09",
        "sourceRetailers": [
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "RENOURISH broccoli & cheddar soup"
        ],
        "retailerPrices": {
          "Woolworths": 1.47,
          "Coles": 1.51,
          "ALDI": 1.36,
          "IGA": 1.83
        },
        "sourceName": "Comparable category estimate: Condensed cream of mushroom soup",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 350
        }
      },
      {
        "id": "au-estimate-cooked-champagne-lentils",
        "name": "cooked champagne lentils",
        "packQty": 1000,
        "unit": "g",
        "price": 4.43,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "cooked champagne lentils"
        ],
        "retailerPrices": {
          "Woolworths": 4.22,
          "Coles": 4.35,
          "ALDI": 3.9,
          "IGA": 5.25
        },
        "sourceName": "Comparable category estimate: bulgur wheat",
        "sourceUrl": "https://www.coles.com.au/product/duru-brown-coarse-bulgur-1kg-9115045",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-fine-egg-noodle-nest",
        "name": "fine egg noodle nest",
        "packQty": 450,
        "unit": "g",
        "price": 2.68,
        "observedAt": "2026-09-10",
        "sourceRetailers": [
          "Harris Farm Markets",
          "IGA",
          "Woolworths"
        ],
        "aliases": [
          "fine egg noodle nest"
        ],
        "retailerPrices": {
          "Woolworths": 2.55,
          "Coles": 2.63,
          "ALDI": 2.36,
          "IGA": 3.18
        },
        "sourceName": "Comparable category estimate: Penne pasta",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 150
        }
      },
      {
        "id": "au-estimate-hake-fillets",
        "name": "hake fillets",
        "packQty": 450,
        "unit": "g",
        "price": 22.68,
        "observedAt": "2026-10-13",
        "sourceRetailers": [
          "Harris Farm Markets"
        ],
        "aliases": [
          "hake fillets"
        ],
        "retailerPrices": {
          "Woolworths": 21.6,
          "Coles": 22.27,
          "ALDI": 19.98,
          "IGA": 26.88
        },
        "sourceName": "Comparable category estimate: Frozen cod fillets",
        "sourceUrl": "https://mealbudget.app/food-prices/au",
        "conversionHints": {
          "eachWeight": 120
        }
      },
      {
        "id": "au-practical-mustard-powder",
        "name": "English mustard powder",
        "packQty": 50,
        "unit": "g",
        "price": 5.3,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "English mustard powder"
        ],
        "retailerPrices": {
          "Woolworths": 5.04,
          "Coles": 5.2,
          "ALDI": 4.67,
          "IGA": 6.28
        },
        "sourceName": "Keen's mustard powder, direct Coles product",
        "sourceUrl": "https://www.coles.com.au/product/keens-mustard-powder-50g-121300",
        "conversionHints": {}
      },
      {
        "id": "au-practical-almond-yoghurt",
        "name": "Almond yoghurt (plant-based comparison)",
        "packQty": 450,
        "unit": "g",
        "price": 6.11,
        "observedAt": "2026-10-26",
        "sourceRetailers": [
          "Coles"
        ],
        "aliases": [
          "almond yoghurt"
        ],
        "retailerPrices": {
          "Woolworths": 5.82,
          "Coles": 6,
          "ALDI": 5.38,
          "IGA": 7.24
        },
        "sourceName": "Vitasoy plant yoghurt comparison, not almond-specific",
        "sourceUrl": "https://www.coles.com.au/on-special?filter_Dietary=1033",
        "conversionHints": {}
      }
    ]
  }
});
})();
