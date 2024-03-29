'use strict';
const setUserId = require('../../server/middleware/setUserId');
module.exports = function(Message) {
  Message.validatesPresenceOf('senderId', 'receiverId');

  Message.observe('before save', (ctx, next) => {
    setUserId(ctx, 'senderId');
    next();
  });
};
