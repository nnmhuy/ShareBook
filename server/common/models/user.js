'use strict';

module.exports = function(User) {
  User.validatesLengthOf('password', {min: 6,
    message: {min: 'Mật khẩu quá ngắn'}});
  User.validatesLengthOf('username', {min: 6,
    message: {min: 'Tên đăng nhập quá ngắn'}});

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
