'use strict';
const setUserId = require('../../server/middleware/setUserId');

module.exports = function(PushSubscription) {
  PushSubscription.observe('before save', (ctx, next) => {
    setUserId(ctx, 'userId');
    return next();
  });
};
