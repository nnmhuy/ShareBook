'use strict';
const _ = require('lodash');
const secretKey = process.env.SUPER_SECRET_KEY;

const setUserId = require('../../server/middleware/setUserId');
module.exports = function(Transaction) {
  Transaction.validatesPresenceOf('borrowerId', 'bookInstanceId');

  Transaction.observe('before save', (ctx, next) => {
    setUserId(ctx, 'borrowerId');
    if (ctx.isNewInstance) {
      let BookInstance = Transaction.app.models.bookInstance;
      BookInstance.findById(ctx.instance.bookInstanceId,
        (error, instance) => {
          if (!instance.isAvailable) {
            return next(new Error('Quyển sách này đang được mượn'));
          }
          if (error || !instance || !instance.holderId) {
            return next(new Error('Quyển sách này đang bị lỗi'));
          }
          ctx.instance.holderId = instance.holderId;
          return next();
        }
      );
    }
    next();
  });

  Transaction.holderUpdate = async function(transactionId, data, ctx) {
    const {requestStatus} = data;
    const userId = _.get(ctx, 'req.accessToken.userId', null);
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new Error('Không tìm thấy giao dịch');
    }
    if (!transaction.holderId.equals(userId)) {
      throw new Error('Không có quyền truy cập');
    }
    const MessageInTransaction =
      Transaction.app.models.messageInTransaction;
    let newSystemMessage = {
      transactionId,
      direction: 'system',
      secretKey,
    };
    switch (requestStatus) {
      case 'waitingForTake':
        if (transaction.status !== 'waitingForResponse') {
          throw new Error('Sai quy trình');
        }
        newSystemMessage.content = 'Đồng ý cho mượn sách';
        break;
      case 'isReading': // decline to extend deadline
        if (transaction.status !== 'waitingForDeadlineExtended') {
          throw new Error('Sai quy trình');
        }
        newSystemMessage.content = 'Yêu cầu gia hạn đọc sách bị từ chối';
        break;
      case 'deadlineExtended':
        if (transaction.status !== 'waitingForDeadlineExtended') {
          throw new Error('Sai quy trình');
        }
        newSystemMessage.content = 'Đã được gia hạn trả sách';
        break;
      case 'isDone':
        if (transaction.status !== 'isReading' &&
          transaction.status !== 'isOvertime' &&
          transaction.status !== 'deadlineExtended'
        ) {
          throw new Error('Sai quy trình');
        }
        newSystemMessage.content = 'Giao dịch hoàn tất';
        break;
      case 'isCancel':
        if (transaction.status !== 'waitingForResponse' &&
          transaction.status !== 'waitingForTake'
        ) {
          throw new Error('Sai quy trình');
        }
        newSystemMessage.content = 'Giao dịch đã bị huỷ';
        break;
      default:
        throw new Error('Sai quy trình');
    }
    await transaction.updateAttribute('status', requestStatus);
    await MessageInTransaction.create(newSystemMessage);
    return transaction.status;
  };

  Transaction.borrowerUpdate = async function(transactionId, data, ctx) {
    const {requestStatus} = data;
    const userId = _.get(ctx, 'req.accessToken.userId', null);
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new Error('Không tìm thấy giao dịch');
    }
    if (!transaction.holderId.equals(userId)) {
      throw new Error('Không có quyền truy cập');
    }
    const MessageInTransaction =
      Transaction.app.models.messageInTransaction;
    let newSystemMessage = {
      transactionId,
      direction: 'system',
      secretKey,
    };
    switch (requestStatus) {
      case 'isReading':
        if (transaction.status !== 'waitingForTake') {
          throw new Error('Sai quy trình');
        }
        newSystemMessage.content = 'Đã nhận sách';
        break;
      case 'waitingForDeadlineExtended':
        if (transaction.status !== 'isOvertime' &&
          transaction.status !== 'isReading'
        ) {
          throw new Error('Sai quy trình');
        }
        newSystemMessage.content = 'Đã gửi yêu cầu xin gia hạn đọc';
        break;
      case 'isCancel':
        if (transaction.status !== 'waitingForResponse' &&
          transaction.status !== 'waitingForTake'
        ) {
          throw new Error('Sai quy trình');
        }
        newSystemMessage.content = 'Giao dịch đã bị huỷ';
        break;
      default:
        throw new Error('Sai quy trình');
    }
    await transaction.updateAttribute('status', requestStatus);
    await MessageInTransaction.create(newSystemMessage);
    return transaction.status;
  };

  Transaction.remoteMethod('holderUpdate', {
    accepts: [
      {arg: 'transactionId', type: 'string', http: {source: 'path'}},
      {arg: 'data', type: 'object', 'object': {source: 'body'}},
      {arg: 'ctx', type: 'object', 'http': {source: 'context'}},
    ],
    returns: {arg: 'newStatus', type: 'string'},
    http: {
      path: '/:transactionId/holder-status',
      verb: 'put',
      errorStatus: 400,
    },
  });

  Transaction.remoteMethod('borrowerUpdate', {
    accepts: [
      {arg: 'transactionId', type: 'string', http: {source: 'path'}},
      {arg: 'data', type: 'object', 'object': {source: 'body'}},
      {arg: 'ctx', type: 'object', 'http': {source: 'context'}},
    ],
    returns: {arg: 'newStatus', type: 'string'},
    http: {
      path: '/:transactionId/borrower-status',
      verb: 'put',
      errorStatus: 400,
    },
  });
};
