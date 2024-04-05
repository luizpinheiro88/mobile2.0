var cacheName = 'pwadedoduro+-v1.0';

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([

        './index.html',

        

        './assets/img/AppImage/16.png',
        './assets/img/AppImage/20.png',
        './assets/img/AppImage/29.png',
        './assets/img/AppImage/32.png',
        './assets/img/AppImage/40.png',
        './assets/img/AppImage/50.png',
        './assets/img/AppImage/57.png',
        './assets/img/AppImage/58.png',
        './assets/img/AppImage/60.png',
        './assets/img/AppImage/64.png',
        './assets/img/AppImage/72.png',
        './assets/img/AppImage/76.png',
        './assets/img/AppImage/80.png',
        './assets/img/AppImage/100.png',
        './assets/img/AppImage/114.png',
        './assets/img/AppImage/120.png',
        './assets/img/AppImage/128.png',
        './assets/img/AppImage/144.png',
        './assets/img/AppImage/152.png',
        './assets/img/AppImage/167.png',
        './assets/img/AppImage/180.png',
        './assets/img/AppImage/192.png',
        './assets/img/AppImage/256.png',
        './assets/img/AppImage/512.png',
        './assets/img/AppImage/1024.png',
        
        



    

       
      ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  //Atualizacao internet
  event.respondWith(async function () {
    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match(event.request);
    }
  }());

  //Atualizacao cache
  /*event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );*/

});
    