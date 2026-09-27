window.MW = window.MW || {};
MW.learning={
  reject(recipe){
    const s=MW.state.get();
    (recipe.tags||[]).forEach(t=>s.preferences.scores[t]=(s.preferences.scores[t]||0)-0.6);
    MW.state.log('meal_rejected',{recipe:recipe.id,tags:recipe.tags||[]});
  },
  acceptWeek(){
    const s=MW.state.get();
    if(!s.week) return;
    const ids=[];
    (s.week.meals||[]).forEach(m=>{
      const r=((MW.catalog&&MW.catalog.get(m.recipeId))||MW.RECIPES.find(x=>x.id===m.recipeId));
      if(!r) return;
      ids.push(r.id);
      (r.tags||[]).forEach(t=>s.preferences.scores[t]=(s.preferences.scores[t]||0)+0.2);
    });
    s.preferences.recentMeals=[...ids,...(s.preferences.recentMeals||[])].filter((x,i,a)=>a.indexOf(x)===i).slice(0,12);
    MW.state.log('week_accepted',{meals:ids});
  },
  score(recipe){
    const s=MW.state.get();
    let score=0;
    (recipe.tags||[]).forEach(t=>score+=(s.preferences.scores[t]||0));
    if((s.preferences.recentMeals||[]).includes(recipe.id)) score-=2.5;
    return score;
  }
};