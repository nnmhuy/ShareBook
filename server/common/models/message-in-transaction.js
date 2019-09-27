'use strict';

var pubsub = require('../../server/component/pubsub.js');
const setUserId = require('../../server/middleware/setUserId');

module.exports = function(MessageInTransaction) {
  MessageInTransaction.validatesPresenceOf('transactionId', 'userId');

  MessageInTransaction.observe('before save', function(ctx, next) {
    setUserId(ctx, 'userId');
    let Transaction = MessageInTransaction.app.models.transaction;
    Transaction.findById(ctx.instance.transactionId,
      (error, instance) => {
        if (error || !instance || !instance.borrowerId || !instance.holderId) {
          return next(new Error('Giao dịch này đang bị lỗi'));
        }
        if (ctx.instance.userId === instance.holderId) {
          ctx.instance.direction = 'holder';
        }
        if (ctx.instance.userId === instance.borrowerId) {
          ctx.instance.direction = 'borrower';
        }
        ctx.instance.unsetAttribute('userId');
      }
    );
  });

  // Order after save..
  MessageInTransaction.observe('after save', function(ctx, next) {
    var socket = MessageInTransaction.app.io;
    if (ctx.isNewInstance) {
      pubsub.publish(socket, {
        room: ctx.instance.id,
        data: ctx.instance,
      });
    }
    // Calling the next middleware..
    next();
  });
  // after save..
};
