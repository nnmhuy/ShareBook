'use strict';

module.exports = function(Likereply) {
  Likereply.validatesPresenceOf('userId', 'replyId');
};
