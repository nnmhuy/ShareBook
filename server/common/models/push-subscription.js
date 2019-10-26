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
    await Promise.all(pushSubscriptions.map(subscription => {
      return notification.push(
        subscription,
        payload
      ).catch(async (err) => {
        if (err.statusCode === 410) {
          await PushSubscription.destroyById(subscription.id);
        }
      });
    }));
  };
};
