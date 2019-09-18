'use strict';
const setUserId = require('../../server/middlerware/setUserId');
module.exports = function(Reply) {
  Reply.validatesPresenceOf('userId', 'reviewId');

  Reply.observe('before save', (ctx, next) => {
    setUserId(ctx, 'userId');
    next();
  });
};
