'use strict';
const setUserId = require('../../server/middleware/setUserId');
const notification = require('../../server/component/notification');

module.exports = function(PushSubscription) {
  PushSubscription.observe('before save', (ctx, next) => {
    setUserId(ctx, 'userId');
    return next();
  });

  PushSubscription.sendNotification = async function(userId, payload) {
    const pushSubscriptions = await PushSubscription.find({userId});
    try {
      await Promise.all(pushSubscriptions.map(subscription => {
        return notification.push(
          subscription,
          payload
        ).catch(error => {
          console.log(error);
        });
      }));
    } catch (error) {
      console.log(error);
    }
  };
};
