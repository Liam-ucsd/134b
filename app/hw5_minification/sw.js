var CACHE_NAME = 'my-site-cache-v2';
var urlsToCache = [
  'Manage.html',
  'SignupBootstrap.html',
  'Signup.css',
  'Schedule.html',
  'playeradd.png',
  'Player.css',
  'MainNav.css',
  'Logout.html',
  'LoginSignupBootstrap.css',
  'LoginBootstrap.html',
  'HomeBootstrap.html',
  'General.css',
  'GameBootstrap.html',
  'gameadd.png',
  'COrton.jpg',
  'AddGame.html',
  'js/crudGame.js',
  'js/crudPlayers.js',
  'js/schedule.js',
  'js/signin.js',
  'js/signup.js',
  'js/firebase.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['my-site-cache-v2'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
