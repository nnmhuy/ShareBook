'use strict';
const setUserId = require('../../server/middleware/setUserId');
module.exports = function(LogUserRole) {
  LogUserRole.validatesPresenceOf('madeById', 'userId');

  LogUserRole.observe('before save', (ctx, next) => {
    setUserId(ctx, 'madeById');
    next();
  });
};
