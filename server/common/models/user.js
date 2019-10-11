'use strict';
const _ = require('lodash');

module.exports = function(User) {
  User.validatesLengthOf('password', {min: 6,
    message: {min: 'Mật khẩu quá ngắn'}});
  User.validatesLengthOf('username', {min: 6,
    message: {min: 'Tên đăng nhập quá ngắn'}});

  // check change location
  User.observe('persist', (ctx, next) => {
    // for update user
    if (!ctx.isNewInstance) {
      if (!ctx.data || !ctx.data.homeLocationId || !ctx.currentInstance)
        return next();
      let BookInstance = User.app.models.bookInstance;
      let Location = User.app.models.location;
      // just for trigger get location again in bookinstance
      BookInstance.find({where: {holderId: ctx.currentInstance.id}},
      (err, bookInstanceList) => {
        if (err) return next(err);
        if (!bookInstanceList || !bookInstanceList[0]) return next();
        let userId = ctx.currentInstance.id;
        Location.findById(ctx.data.homeLocationId,
        (err, locationInstance) => {
          if (err) return next(err);
          recursiveUpdate(bookInstanceList, userId, locationInstance.district,
          0, (err) => {
            if (err) return next(err);
            return next();
          });
        });
      });
    } else {
      return next();
    }
  });

  function recursiveUpdate(bookInstanceList, userId, district,
  position, realCallback) {
    if (position === bookInstanceList.length) return realCallback();
    bookInstanceList[position].updateAttributes({
      holderLocationDistrict: district,
      secretUserId: userId},
    (err, updated) => {
      if (err) return realCallback(err);
      return recursiveUpdate(bookInstanceList, userId, district,
      position + 1, realCallback);
    });
  }

  // adding default email base on username
  User.beforeRemote('create', function(ctx, userInstance, next) {
    try {
      let req = ctx.req;
      req.body.email = req.body.username + '@sharebook.org.vn';
    } catch (err) {
      console.log(err);
    }
    next();
  });

  User.afterRemote('login', function(ctx, accessToken, next) {
    if (accessToken && accessToken.id) {
      ctx.res.cookie('access_token', accessToken.id, {
        signed: true,
        maxAge: accessToken.ttl * 1000, // access token ttl is second so need to * 1000 to get milliseconds
      });
    }
    next();
  });
};
