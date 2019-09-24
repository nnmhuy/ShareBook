'use strict';
const setUserId = require('../../server/middleware/setUserId');
module.exports = function(Transaction) {
  Transaction.validatesPresenceOf('borrowerId', 'holderId', 'bookInstanceId');

  Transaction.observe('before save', (ctx, next) => {
    setUserId(ctx, 'borrowerId');
    next();
  });
};
