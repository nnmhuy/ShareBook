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
  const id = notification.data.id;

  console.log('Closed notification: ' + id);
});

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  const { url } = notification.data;
  const action = event.action;

  if (action === 'close') {
    notification.close();
  } else {
    event.waitUntil(
    /* eslint-disable-next-line */
      clients.matchAll().then(clis => {
        const client = clis.find(c => {
          return c.visibilityState === 'visible';
        });
        if (client !== undefined) {
          client.navigate(url);
          client.focus();
        } else {
          // there are no visible windows. Open one.
          /* eslint-disable-next-line */
          clients.openWindow(url);
          notification.close();
        }
      })
    );
  }
});

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('push', event => {
  console.log(event.data);
  console.log(event.data.text());
  const notificationData = JSON.parse(event.data.text());
  const { title, body, tag, data, actions = [], icon, customOptions } = notificationData

  const options = {
    body,
    // tag, does not push multiple message in desktop
    data,
    icon: './static/images/logo.png' || icon,
    badge: './static/images/booklist.svg',
    vibrate: [100, 50, 100],
    actions: [
      {
        action: 'explore', title: 'Đi đến ShareBook',
        icon: './static/images/notebook-btn.svg'
      },
      ...actions
    ],
    ...customOptions
  };

  event.waitUntil(
    self.registration.showNotification(title, options) /* eslint-disable-line no-restricted-globals */
  );
});
