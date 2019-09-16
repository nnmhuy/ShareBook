'use strict';

module.exports = function(Review) {
  Review.validatesPresenceOf('userId');
};
