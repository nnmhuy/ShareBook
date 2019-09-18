'use strict';
const setUserId = require('../../server/middlerware/setUserId');
module.exports = function(Transaction) {
  Transaction.validatesPresenceOf('borrowerId', 'holderId', 'bookInstanceId');

  Transaction.observe('before save', (ctx, next) => {
    setUserId(ctx, 'borrowerId');
    next();
  });
};
