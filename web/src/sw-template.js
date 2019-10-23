if ('function' === typeof importScripts) {
  /* eslint-disable-next-line*/
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [
        /^\/_/, /\/[^\/]+\.[^\/]+$/,
        new RegExp('/api/auth/facebook'),
        new RegExp('/api')
      ],
    });

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|webp|jp2|jpx)$/,
      new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

    workbox.routing.registerRoute(
      /\\api\/*/,
      new workbox.strategies.NetworkFirst({
        cacheName: 'APIs',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 100,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
          }),
        ],
      })
    );

  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('notificationclose', event => {
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;
  const action = event.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('samples/page' + primaryKey + '.html'); /* eslint-disable-line */
    notification.close();
  }

  // TODO 5.3 - close all notifications when one is clicked

});

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('push', event => {
  let body;

  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Default body';
  }

  const options = {
    body: body,
    icon: 'images/notification-flat.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore', title: 'Go to the site',
        icon: 'images/checkmark.png'
      },
      {
        action: 'close', title: 'Close the notification',
        icon: 'images/xmark.png'
      },
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options) /* eslint-disable-line no-restricted-globals */
  );
});
