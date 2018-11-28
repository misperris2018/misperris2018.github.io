var cacheName = "osos-v1";
var filesToCache = [
    "/",
    "/index.html",
    "/info.html",
    "/gallery.html",
    "/scripts/app.js",
    "/styles/estilos.css",
    "/images/galeria1.jpg",
    "/images/galeria2.jpg",
    "/images/galeria3.jpg",
    "/images/galeria4.jpg",
    "/images/galeria6.jpeg",
    "/images/poseidon.jpg",
    "/images/thor.jpg",
    "/images/zeus.jpg",
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/logo.jpg"
];

self.addEventListener( 'install', function( e ) {
    console.log( '[ServiceWorker] Install' );
    e.waitUntil(
        caches.open( cacheName ).then( function( cache ) {
            console.log( '[ServiceWorker] Caching app shell' );
            return cache.addAll( filesToCache );
        } )
    );
} );

self.addEventListener( 'activate', function( e ) {
    console.log( '[ServiceWorker] Activate' );
    e.waitUntil(
        caches.keys( ).then( function( keyList ) {
            return Promise.all( keyList.map( function( key ) {
                if ( key != cacheName ) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete( key );
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener( 'fetch', function( e ) {
    console.log( '[ServiceWorker] Fetch', e.request.url );
    e.respondWith(
        caches.match( e.request ).then( function( response ) {
            return response || fetch( e.request );
        } )
    );
} );