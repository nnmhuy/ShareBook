'use strict';

var pubsub = require('../../server/component/pubsub.js');

module.exports = function(CoinTransfer) {
  CoinTransfer.createCoinTransfer = async function(
    userId, amount, type, userObject
  ) {
    if (!userObject) {
      const UserModel = CoinTransfer.app.models.user;
      userObject = await UserModel.findById(userId);
    }
    await userObject.updateAttribute(
      'coin', userObject.coin + amount
    );
    const transfer = {
      userId,
      amount: Math.abs(amount),
      type,
      isIncome: amount >= 0,
    };
    CoinTransfer.create(transfer);
  };

  CoinTransfer.observe('after save', function(ctx, next) {
    var socket = CoinTransfer.app.io;
    if (ctx.isNewInstance) {
      pubsub.publish(socket, {
        room: `COIN-${ctx.instance.userId}`,
        data: ctx.instance,
        event: 'new coin update',
      });
    }
    // Calling the next middleware..
    next();
  });
};
