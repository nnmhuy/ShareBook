'use strict';

module.exports = function(Transaction) {
  Transaction.validatesPresenceOf('borrowerId', 'holderId', 'bookInstanceId');
};
