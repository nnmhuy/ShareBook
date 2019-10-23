'use strict';
const webPush = require('web-push');

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_SECRET_KEY;

const options = {
  TTL: 60,

  vapidDetails: {
    subject: 'mailto: sharebook.com.vn@gmail.com',
    publicKey: vapidPublicKey,
    privateKey: vapidPrivateKey,
  },
};

module.exports = {
  sendNotification: function(pushSubscription, payload) {
    try {
      webPush.sendNotification(
        pushSubscription,
        payload,
        options
      );
    } catch (error) {
      console.log(error);
    }
  },
};
