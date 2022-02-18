var cacheName = "petstore v-1";
var cacheFiles = [
  "index.html",
  "products.js",
  "petstore.webmanifest",
  "images/1.png",
  "images/2.png",
  "images/3.png",
  "images/4.png",
  "images/5.png",
  "images/icon-512.png",
];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[Service Worker] Caching all the files");
      return cache.addAll(cacheFiles);
    })
  );
});

// self.addEventListener("fetch", function (e) {
//   e.respondWith(
//     // check if the cache has the file        c
//     caches.match(e.request).then(function (r) {
//       console.log("[Service Worker] Fetching resource: " + e.request.url); // 'r' is the matching file if it exists in the cachereturn r
//     })
//   );
// });

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request.then(function (r){
            //download 
            return r || fetch(e.request).then(function (response){
                //add new files
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                })
            })
        }))
    )
})
