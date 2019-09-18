'use strict';
const setUserId = require('../../server/middlerware/setUserId');
module.exports = function(Bookmark) {
  Bookmark.validatesPresenceOf('userId', 'bookId');

  Bookmark.observe('before save', (ctx, next) => {
    setUserId(ctx, 'userId');
    next();
  });
};
