'use strict';

module.exports = function(Likereview) {
  Likereview.validatesPresenceOf('userId', 'reviewId');
};
