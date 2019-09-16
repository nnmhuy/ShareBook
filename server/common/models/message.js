'use strict';

module.exports = function(Message) {
  Message.validatesPresenceOf('senderId', 'receiverId');
};
