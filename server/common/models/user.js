'use strict';

module.exports = function(User) {
  // adding default email base on username
  User.observe('before save', function filterProperties(ctx, next) {
    let currentUser = ctx.instance;
    let defaultEmail = currentUser.username + '@ShareBook.com';
    if (currentUser) currentUser.email = currentUser.email || defaultEmail;
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
