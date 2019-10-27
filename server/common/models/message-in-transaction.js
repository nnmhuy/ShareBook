'use strict';

var pubsub = require('../../server/component/pubsub.js');

const setUserId = require('../../server/middleware/setUserId');
const secretKey = process.env.SUPER_SECRET_KEY;
const frontendURL = process.env.FRONTEND_URL;

module.exports = function(MessageInTransaction) {
  MessageInTransaction.validatesPresenceOf('transactionId');

  MessageInTransaction.observe('before save', async function(ctx) {
    try {
      setUserId(ctx, 'userId');
      if (ctx.instance.secretKey === secretKey) {
        ctx.instance.unsetAttribute('secretKey');
        const PushSubscriptionModel =
          MessageInTransaction.app.models.pushSubscription;

        const TransactionModel = MessageInTransaction.app.models.transaction;
        const transaction =
          await TransactionModel.findById(ctx.instance.transactionId);

        const payload = {
          title: 'Giao dịch',
          body: ctx.instance.content,
          data: {
            id: transaction.id,
            url: `${frontendURL}/transaction/${transaction.id}`,
          },
        };

        await PushSubscriptionModel.sendNotification(
          ctx.instance.holderId, payload
        );
        await PushSubscriptionModel.sendNotification(
          ctx.instance.borrowerId, payload
        );
        return;
      }

      let Transaction =
        MessageInTransaction.app.models.transaction;
      const transaction =
        await Transaction.findById(ctx.instance.transactionId);
      if (!transaction ||
        !transaction.borrowerId ||
        !transaction.holderId ||
        !ctx.instance.userId
      ) {
        return next('Giao dịch này đang bị lỗi');
      }

      await transaction.updateAttribute(
        'lastMessageTime',
        ctx.instance.createdAt
      );

      if (ctx.instance.userId.equals(transaction.holderId)) {
        ctx.instance.direction = 'holder';
        const PushSubscriptionModel =
          MessageInTransaction.app.models.pushSubscription;
        const UserModel =
          MessageInTransaction.app.models.user;
        const user = await UserModel.findById(transaction.borrowerId);
        const payload = {
          title: user.name,
          body: ctx.instance.content,
          data: {
            id: transaction.id,
            url: `${frontendURL}/transaction/${transaction.id}`,
          },
        };

        await PushSubscriptionModel
          .sendNotification(transaction.borrowerId, payload);
      }
      if (ctx.instance.userId.equals(transaction.borrowerId)) {
        ctx.instance.direction = 'borrower';

        const PushSubscriptionModel =
          MessageInTransaction.app.models.pushSubscription;
        const UserModel =
          MessageInTransaction.app.models.user;
        const user = await UserModel.findById(transaction.holderId);
        const payload = {
          title: user.name,
          body: ctx.instance.content,
          data: {
            id: transaction.id,
            url: `${frontendURL}/transaction/${transaction.id}`,
          },
        };
        try {
          await PushSubscriptionModel
            .sendNotification(transaction.holderId, payload);
        } catch (error) {
          console.log('Error with notification system');
        }
      }
      ctx.instance.unsetAttribute('userId');
    } catch (error) {
      console.log(error);
    }
  });

  // Order after save..
  MessageInTransaction.observe('after save', function(ctx, next) {
    var socket = MessageInTransaction.app.io;
    if (ctx.isNewInstance) {
      pubsub.publish(socket, {
        room: `CHAT-${ctx.instance.transactionId}`,
        data: ctx.instance,
        event: 'new message',
      });
    }
    // Calling the next middleware..
    next();
  });
  // after save..
};
