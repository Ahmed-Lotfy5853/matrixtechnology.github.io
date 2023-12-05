'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"android-icon-144x144.png": "c33835c8a62e9f0eb72557df541d98f1",
"android-icon-192x192.png": "ea207de4afc89000473c8db65c593f8c",
"android-icon-36x36.png": "45a2f68d41192314cbf5d453ce6d8b1d",
"android-icon-48x48.png": "f9ff32847d158fe934b0dd8d1965c54a",
"android-icon-72x72.png": "fa3af7da933b6f4744a154b36c2fd588",
"android-icon-96x96.png": "3eb777657b899ec66184a2018bb74bd8",
"apple-icon-114x114.png": "21a0ba706713e55d68a7fa505dcd95d2",
"apple-icon-120x120.png": "0ea6c6fe05d47e138080f18569edbe51",
"apple-icon-144x144.png": "c33835c8a62e9f0eb72557df541d98f1",
"apple-icon-152x152.png": "3e360e8c49c59fc9b54497903debf2f4",
"apple-icon-180x180.png": "1cbb7274747a1d165923d0a1fa963e74",
"apple-icon-57x57.png": "4ae51ee33c73fc55701e0ed50f5cf401",
"apple-icon-60x60.png": "d69d0b17de3cf6df26d53061c043cb6a",
"apple-icon-72x72.png": "fa3af7da933b6f4744a154b36c2fd588",
"apple-icon-76x76.png": "9806af6e0c0ba4b06d57f814e49215ea",
"apple-icon-precomposed.png": "c7e5e9a586f9d9ff4cb854f2ecf89851",
"apple-icon.png": "c7e5e9a586f9d9ff4cb854f2ecf89851",
"assets/AssetManifest.bin": "32c6da202e26231827c807268e9771be",
"assets/AssetManifest.json": "fe899a878afbeef32f5eda710f33dffb",
"assets/assets/fonts/roboto.ttf": "11eabca2251325cfc5589c9c6fb57b46",
"assets/assets/fonts/SegoeUI/SegoeUI.ttf": "0e7e9a9b5c4abaadef7bc8f4e4574084",
"assets/assets/images/lolo.jpeg": "c7daf23469a405734b00d242cbfb2c89",
"assets/assets/images/lo_crop.jpeg": "9e29a786ad8a01f30fd0a09aea7ca7f9",
"assets/assets/images/matrix_logo.jpeg": "708bea4d8df043f0a11643edcdb569bd",
"assets/assets/images/profile.png": "b4b89f56a790b187497a689f42e54092",
"assets/FontManifest.json": "94e507345f91cde68118683dc226a6fa",
"assets/fonts/MaterialIcons-Regular.otf": "9e81e2dd183f9ac52e8a4ebe75634e8b",
"assets/NOTICES": "e1f22889071b2a80b459e8d3356acbe9",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"browserconfig.xml": "653d077300a12f09a69caeea7a8947f8",
"canvaskit/canvaskit.js": "5caccb235fad20e9b72ea6da5a0094e6",
"canvaskit/canvaskit.wasm": "d9f69e0f428f695dc3d66b3a83a4aa8e",
"canvaskit/chromium/canvaskit.js": "ffb2bb6484d5689d91f393b60664d530",
"canvaskit/chromium/canvaskit.wasm": "393ec8fb05d94036734f8104fa550a67",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon-16x16.png": "556657b900f4ac78917d7dc0ad4a4dea",
"favicon-32x32.png": "65ecc92bb42709162ff0e28646b9d6cb",
"favicon-96x96.png": "3eb777657b899ec66184a2018bb74bd8",
"favicon.ico": "51c7f95f41ad2a1840a1d30a9e2519cb",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "57fcbe6cd678e8407b2c4263f2e683ec",
"/": "57fcbe6cd678e8407b2c4263f2e683ec",
"main.dart.js": "4d8d0fe3f810a04e8160baaad0a78330",
"manifest.json": "b58fcfa7628c9205cb11a1b2c3e8f99a",
"ms-icon-144x144.png": "c33835c8a62e9f0eb72557df541d98f1",
"ms-icon-150x150.png": "e38c1a542aa52eef7592f7e63e65669f",
"ms-icon-310x310.png": "ed1ee6f72991e7eed4f89efd7060b487",
"ms-icon-70x70.png": "6b6040634e79af5f445c523859f92ce1",
"version.json": "916ce3fee3c35a1ff38f6bd4b06e0b8a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
