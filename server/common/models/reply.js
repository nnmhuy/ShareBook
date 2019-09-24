'use strict';
const setUserId = require('../../server/middleware/setUserId');
module.exports = function(Reply) {
  Reply.validatesPresenceOf('userId', 'reviewId');

  Reply.observe('before save', (ctx, next) => {
    setUserId(ctx, 'userId');
    next();
  });
};
