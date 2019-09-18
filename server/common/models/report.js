'use strict';
const setUserId = require('../../server/middlerware/setUserId');
module.exports = function(Report) {
  Report.validatesPresenceOf('reporterId');

  Report.observe('before save', (ctx, next) => {
    setUserId(ctx, 'reporterId');
    next();
  });
};
