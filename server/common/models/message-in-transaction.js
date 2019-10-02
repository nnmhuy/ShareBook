'use strict';

var pubsub = require('../../server/component/pubsub.js');
const setUserId = require('../../server/middleware/setUserId');

module.exports = function(MessageInTransaction) {
  MessageInTransaction.validatesPresenceOf('transactionId');

  MessageInTransaction.observe('before save', function(ctx, next) {
    setUserId(ctx, 'userId');
    let Transaction = MessageInTransaction.app.models.transaction;
    Transaction.findById(ctx.instance.transactionId, {},
      (error, transaction) => {
        if (error || !transaction ||
        !transaction.borrowerId || !transaction.holderId) {
          return next(new Error('Giao dịch này đang bị lỗi'));
        }
        if (ctx.instance.userId.equals(transaction.holderId)) {
          ctx.instance.direction = 'holder';
        }
        if (ctx.instance.userId.equals(transaction.borrowerId)) {
          ctx.instance.direction = 'borrower';
        }
        ctx.instance.unsetAttribute('userId');

        // transaction.updateAttribute('lastMessageTime', ctx.instance.createdAt,
        //   (err, instance) => {
        //     console.log(123);
        //     if (err) return next(new Error('Cập nhật transaction gặp lỗi'));
        //     return next();
        //   }
        // );
        return next();
      }
    );
  });

  // Order after save..
  MessageInTransaction.observe('after save', function(ctx, next) {
    var socket = MessageInTransaction.app.io;
    if (ctx.isNewInstance) {
      pubsub.publish(socket, {
        room: ctx.instance.transactionId,
        data: ctx.instance,
      });
    }
    // Calling the next middleware..
    next();
  });
  // after save..
};
