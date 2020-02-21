'use strict';
const get = require('lodash/get');
var pubsub = require('../../server/component/pubsub.js');

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

  Transaction.observe('after save', function(ctx, next) {
    var socket = Transaction.app.io;
    const holderId = get(ctx, 'instance.holderId', null);
    const borrowerId = get(ctx, 'instance.borrowerId', null);
    if (!ctx.isNewInstance) {
      pubsub.publish(socket, {
        room: `TRANSACTION-${holderId}`,
        data: ctx.instance,
        event: 'new transaction status',
      });
      pubsub.publish(socket, {
        room: `TRANSACTION-${borrowerId}`,
        data: ctx.instance,
        event: 'new transaction status',
      });
    } else {
      pubsub.publish(socket, {
        room: `TRANSACTION-${holderId}`,
        data: ctx.instance,
        event: 'new transaction',
      });
      pubsub.publish(socket, {
        room: `TRANSACTION-${borrowerId}`,
        data: ctx.instance,
        event: 'new transaction',
      });
    }
    // Calling the next middleware..
    next();
  });

  Transaction.holderUpdate = async function(transactionId, data, ctx) {
    const {requestStatus} = data;
    const userId = get(ctx, 'req.accessToken.userId', null);
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
    const CoinTransferModel = Transaction.app.models.coinTransfer;
    const borrower = await UserModel.findById(transaction.borrowerId);
    const BookInstanceModel = Transaction.app.models.bookInstance;
    const instance =
      await BookInstanceModel.findById(transaction.bookInstanceId);
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
        await instance.updateAttributes({
          'isAvailable': true,
          secretKey,
        });
        const owner = await UserModel.findById(instance.ownerId);
        // await holder.updateAttribute(
        //   'coin', holder.coin + coinConstants.transactionHolder
        // );
        await CoinTransferModel.createCoinTransfer(
          holder.id,
          coinConstants.transactionHolder,
          'holderBonus',
          holder
        );
        // await owner.updateAttribute(
        //   'coin', owner.coin + coinConstants.transactionOwner
        // );
        await CoinTransferModel.createCoinTransfer(
          owner.id,
          coinConstants.transactionOwner,
          'ownerBonus',
          owner
        );
        if (transaction.status === 'isReading') {
          // await borrower.updateAttribute(
          //   'coin', borrower.coin + coinConstants.transactionReturn
          // );
          await CoinTransferModel.createCoinTransfer(
            borrower.id,
            coinConstants.transactionReturn,
            'transactionReturn',
            borrower
          );
        } else {
          // await borrower.updateAttribute(
          //   'coin', borrower.coin + coinConstants.transactionLateReturn
          // );
          await CoinTransferModel.createCoinTransfer(
            borrower.id,
            coinConstants.transactionLateReturn,
            'transactionLateReturn',
            borrower
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
        await instance.updateAttributes({
          'isAvailable': true,
          secretKey,
        });
        // await borrower.updateAttribute(
        //   'coin', borrower.coin + coinConstants.transactionBorrow
        // );
        await CoinTransferModel.createCoinTransfer(
          borrower.id,
          coinConstants.transactionBorrow,
          'transactionCancelReturn',
          borrower
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
    const userId = get(ctx, 'req.accessToken.userId', null);
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
    const CoinTransferModel = Transaction.app.models.coinTransfer;
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
        const BookInstanceModel = Transaction.app.models.bookInstance;
        const instance =
          await BookInstanceModel.findById(transaction.bookInstanceId);
        await instance.updateAttributes({
          'isAvailable': true,
          secretKey,
        });
        // await borrower.updateAttribute(
        //   'coin', borrower.coin + coinConstants.transactionBorrow
        // );
        await CoinTransferModel.createCoinTransfer(
          borrower.id,
          coinConstants.transactionBorrow,
          'transactionCancelReturn',
          borrower
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

  Transaction.initTransaction = async function(bookId, ctx, data = {}) {
    const {instanceId} = data;
    const userId = get(ctx, 'req.accessToken.userId', null);
    const UserModel = Transaction.app.models.user;
    const CoinTransferModel = Transaction.app.models.coinTransfer;
    const user = await UserModel.findById(userId);
    if (!user || user.coin < coinConstants.transactionBorrow) {
      throw new Error(
        'Người dùng không đủ điểm để mượn sách.\
        Cho mượn sách hoặc viết review để nhận điểm nhé!'
      );
    }
    // TODO: check number of borrowing transaction < 2
    // const processingTransactions = await Transaction.find({
    //   where: {
    //     status: {
    //       nlike: 'isCancel',
    //     },
    //     userId,
    //   },
    // });
    // if (processingTransactions.length >= 2) {
    //   throw new Error(
    //     'Chỉ được mượn tối đa 2 quyển một lúc!!!'
    //   );
    // };
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
          bookId,
          isAvailable: true,
        },
      });
    }
    if (!instance || !instance.isAvailable) {
      throw new Error('Sách không có sẵn!');
    }
    if (instance.holderId.equals(userId)) {
      throw new Error('Bạn không thể mượn sách của chính mình!');
    }
    await instance.updateAttributes({
      'isAvailable': false,
      secretKey,
    });
    // await user.updateAttribute(
    //   'coin', user.coin - coinConstants.transactionBorrow
    // );
    await CoinTransferModel.createCoinTransfer(
      user.id,
      -coinConstants.transactionBorrow,
      'transactionBorrow',
      user
    );
    const newTransaction = await Transaction.create({
      holderId: instance.holderId,
      borrowerId: userId,
      bookInstanceId: instance.id,
    });

    let contentMsg = 'Đã gửi đề nghị mượn sách.';
    const MessageInTransaction =
      Transaction.app.models.messageInTransaction;

    let newSystemMessage = {
      transactionId: newTransaction.id,
      direction: 'system',
      secretKey,
      content: contentMsg,
    };

    MessageInTransaction.create(newSystemMessage);

    const holder = await UserModel.findById(instance.holderId);
    if (holder.email) {
      await UserModel.sendEmail(
        'Bạn có yêu cầu mượn sách',
        holder.email,
        `Chào bạn ${holder.name}.
        Bạn ${user.name} muốn mượn một quyển sách của bạn}`
      );
    }
    return newTransaction;
  };

  Transaction.remoteMethod('initTransaction', {
    accepts: [
      {arg: 'bookId', type: 'string', http: {source: 'path'}},
      {arg: 'ctx', type: 'object', 'http': {source: 'context'}},
      {arg: 'data', type: 'object', 'object': {source: 'body'}},
    ],
    returns: {arg: 'transaction', type: 'object'},
    http: {
      path: '/init-transaction/book/:bookId',
      verb: 'post',
      errorStatus: 400,
    },
  });
};
