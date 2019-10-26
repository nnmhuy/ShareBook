'use strict';
const webPush = require('web-push');

const vapidPublicKey = "BEceXSnidTEQBJiHBg5DMDUA8J9cxQz0j-QOs6w60MkpmqNLoRS70u5JHB0QBLB-XaOUxTNb5Z85Je7U1Cgy4gw"
const vapidPrivateKey = "OfllSMbZLApeN3goxYNqd7Fq6i1VL1bx3ZHOOAvdeRs"

// const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
// const vapidPrivateKey = process.env.VAPID_SECRET_KEY;

const options = {
  TTL: 60,

  vapidDetails: {
    subject: 'mailto: sharebook.com.vn@gmail.com',
    publicKey: vapidPublicKey,
    privateKey: vapidPrivateKey,
  },
};

module.exports = {
  push: async function(pushSubscription, payload) {
    try {
      return await webPush.sendNotification(
        pushSubscription,
        JSON.stringify(payload),
        options
      ).catch(error => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
