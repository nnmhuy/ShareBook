'use strict';
const setUserId = require('../../server/middleware/setUserId');

module.exports = function(Location) {
  Location.observe('before save', (ctx, next) => {
    setUserId(ctx, 'userId');
    next();
  });
};
