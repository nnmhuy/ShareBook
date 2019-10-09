'use strict';
const _ = require('lodash');
const secretKey = process.env.SUPER_SECRET_KEY;
const coinConstants = require('../../server/helper/coinConstants');

const setUserId = require('../../server/middleware/setUserId');
module.exports = function(Transaction) {
  Transaction.validatesPresenceOf('borrowerId', 'bookInstanceId');

  // Transaction.observe('before save', (ctx, next) => {
  //   setUserId(ctx, 'borrowerId');
  //   if (ctx.isNewInstance) {
  //     let BookInstance = Transaction.app.models.bookInstance;
  //     BookInstance.findById(ctx.instance.bookInstanceId,
  //       (error, instance) => {
  //         if (!instance.isAvailable) {
  //           return next(new Error('Quyển sách này đang được mượn'));
  //         }
  //         if (error || !instance || !instance.holderId) {
  //           return next(new Error('Quyển sách này đang bị lỗi'));
  //         }
  //         ctx.instance.holderId = instance.holderId;
  //         return next();
  //       }
  //     );
  //   }
  //   next();
  // });

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
    const UserModel = Transaction.app.models.user;
    const borrower = await UserModel.findById(transaction.borrowerId);
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
      case 'isOvertime': // decline to extend deadline when overtime
        if (transaction.status !== 'waitingForDeadlineExtended') {
          throw new Error('Sai quy trình');
        }
        newSystemMessage.content = 'Yêu cầu gia hạn đọc sách bị từ chối';
        break;
      case 'deadlineExtended':
        if (transaction.status !== 'waitingForDeadlineExtended' &&
          transaction.status !== 'isReading'
        ) {
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
        const holder = await UserModel.findById(userId);
        const BookInstanceModel = Transaction.app.models.bookInstance;
        const instance =
          await BookInstanceModel.findById(transaction.bookInstanceId);
        const owner = await UserModel.findById(instance.ownerId);
        await holder.updateAttribute(
          'coin', holder.coin + coinConstants.transactionHolder
        );
        await owner.updateAttribute(
          'coin', owner.coin + coinConstants.transactionOwner
        );
        if (transaction.status === 'isReading') {
          await borrower.updateAttribute(
            'coin', borrower.coin + coinConstants.transactionReturn
          );
        } else {
          await borrower.updateAttribute(
            'coin', borrower.coin + coinConstants.transactionLateReturn
          );
        }
        newSystemMessage.content = 'Giao dịch hoàn tất';
        break;
      case 'isCancel':
        if (transaction.status !== 'waitingForResponse' &&
          transaction.status !== 'waitingForTake'
        ) {
          throw new Error('Sai quy trình');
        }
        await borrower.updateAttribute(
          'coin', borrower.coin + coinConstants.transactionBorrow
        );
        newSystemMessage.content = 'Giao dịch đã bị huỷ';
        break;
      default:
        throw new Error('Sai quy trình');
    }
    await transaction.updateAttribute('status', requestStatus);
    await MessageInTransaction.create(newSystemMessage);
    return transaction;
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

  Transaction.borrowerUpdate = async function(transactionId, data, ctx) {
    const {requestStatus} = data;
    const userId = _.get(ctx, 'req.accessToken.userId', null);
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new Error('Không tìm thấy giao dịch');
    }
    if (!transaction.borrowerId.equals(userId)) {
      throw new Error('Không có quyền truy cập');
    }
    const MessageInTransaction =
      Transaction.app.models.messageInTransaction;
    const UserModel = Transaction.app.models.user;
    let newSystemMessage = {
      transactionId,
      direction: 'system',
      secretKey,
    };
    const borrower = await UserModel.findById(transaction.borrowerId);
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
        await borrower.updateAttribute(
          'coin', borrower.coin + coinConstants.transactionBorrow
        );
        newSystemMessage.content = 'Giao dịch đã bị huỷ';
        break;
      default:
        throw new Error('Sai quy trình');
    }
    await transaction.updateAttribute('status', requestStatus);
    await MessageInTransaction.create(newSystemMessage);
    return transaction;
  };

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

  Transaction.initTransaction = async function(bookId, ctx, instanceId) {
    const userId = _.get(ctx, 'req.accessToken.userId', null);
    const UserModel = Transaction.app.models.user;
    const user = await UserModel.findById(userId);
    if (!user || user.coin < coinConstants.transactionBorrow) {
      throw new Error(
        'Người dùng không đủ điểm để mượn sách.\
        Cho mượn sách hoặc viết review để nhận điểm nhé!'
      );
    }
    // TODO: check number of borrowing transaction < 2
    const BookInstanceModel = Transaction.app.models.bookInstance;
    let instance = null;
    if (instanceId) {
      instance = await BookInstanceModel.findById(instanceId);
    } else {
      const BookModel = Transaction.app.models.book;
      const book = await BookModel.findById(bookId);
      if (!book) {
        throw new Error('Sách không tồn tại!');
      }
      // TODO: filter/order by user location
      instance = await BookInstanceModel.findOne({
        where: {
          isAvailable: true,
        },
      });
      if (!instance || !instance.isAvailable) {
        throw new Error('Sách không có sẵn!');
      }
    }
    await instance.updateAttributes({
      'isAvailable': false,
      secretKey,
    });
    await user.updateAttribute(
      'coin', user.coin - coinConstants.transactionBorrow
    );
    const newTransaction = await Transaction.create({
      holderId: instance.holderId,
      borrowerId: userId,
      bookInstanceId: instance.id,
    });

    const MessageInTransaction =
      Transaction.app.models.messageInTransaction;

    let newSystemMessage = {
      transactionId: newTransaction.id,
      direction: 'system',
      secretKey,
      content: 'Đã gửi đề nghị mượn sách.',
    };

    MessageInTransaction.create(newSystemMessage);

    return newTransaction;
  };

  Transaction.remoteMethod('initTransaction', {
    accepts: [
      {arg: 'bookId', type: 'string', http: {source: 'path'}},
      {arg: 'ctx', type: 'object', 'http': {source: 'context'}},
      {arg: 'instanceId', type: 'string', http: {source: 'path'}},
    ],
    returns: {arg: 'transaction', type: 'object'},
    http: {
      path: '/init-transaction/book/:bookId/instance/:instanceId',
      verb: 'put',
      errorStatus: 400,
    },
  });

  Transaction.remoteMethod('initTransaction', {
    accepts: [
      {arg: 'bookId', type: 'string', http: {source: 'path'}},
      {arg: 'ctx', type: 'object', 'http': {source: 'context'}},
    ],
    returns: {arg: 'transaction', type: 'object'},
    http: {
      path: '/init-transaction/book/:bookId',
      verb: 'put',
      errorStatus: 400,
    },
  });
};
