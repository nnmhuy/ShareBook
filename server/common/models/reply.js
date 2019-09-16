'use strict';

module.exports = function(Reply) {
  Reply.validatesPresenceOf('userId', 'reviewId');
};
