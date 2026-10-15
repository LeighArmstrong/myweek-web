window.MW = window.MW || {};
(function () {
  'use strict';
  const MAX_FAVOURITES = 500;
  const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  const saved = (st = MW.state.get()) => (st.preferences && st.preferences.favourites) || {};
  const has = (id, st = MW.state.get()) => own(saved(st), String(id));
  const ids = (st = MW.state.get()) => Object.keys(saved(st)).reverse();

  function toggle(recipeId) {
    const id = String(recipeId || '');
    if (!id || id.length > 200 || ['__proto__', 'prototype', 'constructor'].includes(id))
      throw new Error('Invalid recipe identifier.');
    return MW.state.transaction((st) => {
      const favourites = st.preferences.favourites || {};
      if (own(favourites, id)) {
        delete favourites[id];
        return false;
      }
      if (Object.keys(favourites).length >= MAX_FAVOURITES)
        throw new Error('You can save up to 500 favourites.');
      favourites[id] = true;
      st.preferences.favourites = favourites;
      return true;
    });
  }

  MW.favourites = { has, ids, toggle };
})();
