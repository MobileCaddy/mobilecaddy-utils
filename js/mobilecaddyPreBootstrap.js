// mobilecaddyPreBootstrap.js

document.addEventListener('DOMContentLoaded', function(event) {
  var tmpCacheItemsKey = 'tmpCacheItems';
  localStorage.setItem(tmpCacheItemsKey, '[]');
  console.log('DOMContentLoaded. Arming cache listeners');

  // Add cache listeners
  window.applicationCache.addEventListener(
    'checking',
    function(event) {
      writeCacheInfo(event);
    },
    false
  );
  window.applicationCache.addEventListener(
    'downloading',
    function(event) {
      writeCacheInfo(event);
    },
    false
  );
  window.applicationCache.addEventListener(
    'progress',
    function(event) {
      writeCacheInfo(event);
    },
    false
  );
  window.applicationCache.addEventListener(
    'updateready',
    function(event) {
      writeCacheInfo(event);
    },
    false
  );
  window.applicationCache.addEventListener(
    'cached',
    function(event) {
      writeCacheInfo(event);
    },
    false
  );
  window.applicationCache.addEventListener(
    'error',
    function(event) {
      writeCacheInfo(event);
    },
    false
  );
  window.applicationCache.addEventListener(
    'noupdate',
    function(event) {
      writeCacheInfo(event);
    },
    false
  );
});

function writeCacheInfo(ev) {
  var tmpCacheItemsKey = 'tmpCacheItems';
  var cacheItems = JSON.parse(localStorage.getItem(tmpCacheItemsKey));
  if (ev.type == 'progress') {
    console.log('preBootstrap Cache');
    cacheItems.push({
      Name: 'Event ',
      Description: ev.loaded + ' of ' + ev.total
    });
  } else {
    cacheItems.push({ Name: 'Event ', Description: 'preBootstrap-' + ev.type });
  }
  localStorage.setItem(tmpCacheItemsKey, JSON.stringify(cacheItems));
}
