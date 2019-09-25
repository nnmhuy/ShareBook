'use strict';
const setUserId = require('../../server/middleware/setUserId');
module.exports = function(Report) {
  Report.validatesPresenceOf('reporterId');

  Report.observe('before save', (ctx, next) => {
    setUserId(ctx, 'reporterId');
    next();
  });
};
