const CACHE_PREFIX='myweek-shell-v';
const CACHE=CACHE_PREFIX+'35024';
const FIXED_SHELL=[
  './manifest.webmanifest',
  './assets/brand/icon-192.png',
  './assets/brand/icon-512.png',
  './assets/brand/apple-touch-icon.png',
  './vendor/fontawesome/webfonts/fa-brands-400.woff2',
  './vendor/fontawesome/webfonts/fa-regular-400.woff2',
  './vendor/fontawesome/webfonts/fa-solid-900.woff2',
  './vendor/fontawesome/webfonts/fa-v4compatibility.woff2'
];

async function cacheAppShell(){
  const cache=await caches.open(CACHE);
  const indexResponse=await fetch('./index.html',{cache:'no-store'});
  if(!indexResponse.ok)throw new Error('Could not cache My Week application shell.');
  const html=await indexResponse.clone().text();
  await cache.put('./index.html',indexResponse.clone());
  await cache.put('./',indexResponse.clone());

  const discovered=new Set();
  for(const match of html.matchAll(/<(?:script|link)\b[^>]+(?:src|href)=["']([^"']+)["'][^>]*>/gi)){
    const value=match[1];
    if(!value||/^(?:https?:|data:|blob:|#)/i.test(value))continue;
    if(/vendor\/tesseract\//i.test(value))continue;
    discovered.add('./'+value.replace(/^\.\//,''));
  }
  const resources=[...new Set([...FIXED_SHELL,...discovered])];
  await Promise.all(resources.map(async resource=>{
    const response=await fetch(resource,{cache:'no-store'});
    if(!response.ok)throw new Error('Could not cache '+resource);
    await cache.put(resource,response);
  }));
}

self.addEventListener('install',event=>{
  event.waitUntil(cacheAppShell().then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key.startsWith(CACHE_PREFIX)&&key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

async function networkFirst(request,fallback){
  const cache=await caches.open(CACHE);
  try{
    const response=await fetch(request);
    if(response&&response.ok)await cache.put(request,response.clone());
    return response;
  }catch(error){
    return (await cache.match(request))||(fallback?await cache.match(fallback):undefined)||Promise.reject(error);
  }
}
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;

  if(request.mode==='navigate'){
    event.respondWith(networkFirst(request,'./index.html'));
    return;
  }

  const freshEveryLaunch=['script','style','worker','manifest'].includes(request.destination)
    || /\.(?:js|css|json|webmanifest)$/i.test(url.pathname);
  if(freshEveryLaunch){
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(
    caches.open(CACHE).then(async cache=>{
      const cached=await cache.match(request);
      if(cached)return cached;
      return fetch(request).then(response=>{
        if(response&&response.ok){
          const copy=response.clone();
          event.waitUntil(cache.put(request,copy));
        }
        return response;
      });
    })
  );
});
