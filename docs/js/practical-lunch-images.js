window.MW=window.MW||{};
(function(){
'use strict';
const hashes={
'practical-goodfood-ham-sandwich':'95f317033fe84935fdf1c94062fe853cd2b27f958c7ca7c8f158232dd37bef3b',
'practical-goodfood-chicken-pesto-wrap':'d16bfbe19cbebeb4e1c2acb088c241460bdb590ea5820747235e1f6034838321',
'practical-goodfood-chicken-tzatziki-wrap':'f1a6b580b310ab217c8ecfe8bb23707d83ab629b1c32431924ed7b601550a4ab',
'practical-goodfood-overnight-oats':'3ce37f43117e8715957f871373dda36ca060d0355c55e354e59fbbb50e1285e4',
'practical-goodfood-lunchbox-pasta-salad':'90b4d61e43c1c70f9065bd28bcde354648d144af6a9e4a07959130593d2ba3ee',
'practical-goodfood-tuna-pasta-salad':'6d5b27e162be7e38c0d35c50141443dcb2bab3a433011828307f9a437afca408',
'practical-goodfood-ploughmans-sandwich':'e6bb997399a38f7c56c349934843a65835a0bb49de9ede05b0c82a9b530f049e',
'practical-goodfood-veggie-olive-wrap':'1e0c2704c2a24a500f2e005d7c9a7ae26aa9b9a730f65731ce83ef01f22fb0a9',
'practical-goodfood-chia-almond-overnight-oats':'6ed824db5805f24b6219fe71d723bf5721ea2a144d21bfd4f41495d281292f6a',
'practical-goodfood-tuna-salad-sandwich':'bc841daa9853dc53f9dac3a60bd2ffc3d23e02aefe55db80bb1e0b72cabce385',
'practical-goodfood-caprese-sandwich':'16d76bdd8c0bf65a595294bd0a628d5b722232ab71c49b942a26b4c7cbf9ac0b',
'practical-goodfood-red-lentil-chickpea-soup':'63d4bebd7b76a012fcb177bff723d9c1ee493d1d4d5b5a78f8cd6ee453391920'
};
MW.sourcedFinalCache=MW.sourcedFinalCache||{};
for(const recipe of MW.PRACTICAL_LUNCHES||[]){
 const sha256=hashes[recipe.id];
 if(!sha256)continue;
 MW.sourcedFinalCache[recipe.id]={
  src:'assets/images/sourced-final/'+recipe.id+'.jpg',
  source:recipe.sourceImageUrl,
  role:'declared-final',
  sha256
 };
}
})();