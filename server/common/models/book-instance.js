'use strict';
const _ = require('lodash');
const setUserId = require('../../server/middlerware/setUserId');
module.exports = function(BookInstance) {
  BookInstance.validatesPresenceOf('bookId', 'ownerId', 'holderId');

  BookInstance.observe('before save', (ctx, next) => {
    setUserId(ctx, 'ownerId');
    // for update block holder and borrower change data
    if (!ctx.isNewInstance && ctx.data && ctx.currentInstance) {
      let userId = _.get(ctx, 'options.accessToken.userId', null);
      if (userId !== ctx.currentInstance.ownerId) {
        delete ctx.data.depositCoin;
        delete ctx.data.estimatedReadingTime;
        if (userId !== ctx.currentInstance.holderId) {
          delete ctx.data.bookCondition;
          delete ctx.data.isAvailable;
          delete ctx.data.note;
        }
      }
    }
    next();
  });

  BookInstance.afterRemote('create', function(ctx, bookInstance, next) {
    let Category = BookInstance.app.models.category;
    let Book = BookInstance.app.models.book;
    let bookId = _.get(ctx, 'req.body.bookId', '');
    Book.findById(bookId,
    (err, book) => {
      if (err || !book || !book.categoryId)
        next(new Error('Loại sách này đang bị lỗi'));
      Category.findById(book.categoryId,
      (err, category) => {
        if (err || !category)
          next(new Error('Loại sách này đang bị lỗi'));
        Category.updateAll({id: category.id}, {
          totalOfBook: category.totalOfBook + 1,
        }, (err, instance) => {
          if (err) next(new Error('Thể loại sách này đang bị lỗi'));
          next();
        });
      });
    });
  });
};
