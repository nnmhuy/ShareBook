'use strict';
const setUserId = require('../../server/middleware/setUserId');
module.exports = function(Transaction) {
  Transaction.validatesPresenceOf('borrowerId', 'bookInstanceId');

  Transaction.observe('before save', (ctx, next) => {
    setUserId(ctx, 'borrowerId');
    if (ctx.isNewInstance) {
      let BookInstance = Transaction.app.models.bookInstance;
      BookInstance.findById(ctx.instance.bookInstanceId,
        (error, instance) => {
          if (error || !instance || !instance.holderId) {
            return next(new Error('Quyển sách này đang bị lỗi'));
          }
          ctx.instance.holderId = instance.holderId;
        }
      );
    }
    next();
  });
};
