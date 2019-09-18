'use strict';
const setUserId = require('../../server/middlerware/setUserId');
module.exports = function(Joinclubrequest) {
  Joinclubrequest.validatesPresenceOf('userId', 'clubAdminId');

  Joinclubrequest.observe('before save', (ctx, next) => {
    setUserId(ctx, 'userId');
    next();
  });
};
