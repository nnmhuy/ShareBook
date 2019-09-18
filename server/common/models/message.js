'use strict';
const setUserId = require('../../server/middlerware/setUserId');
module.exports = function(Message) {
  Message.validatesPresenceOf('senderId', 'receiverId');

  Message.observe('before save', (ctx, next) => {
    setUserId(ctx, 'senderId');
    next();
  });
};
