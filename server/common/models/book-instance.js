'use strict';
const _ = require('lodash');

module.exports = function(BookInstance) {
  BookInstance.validatesPresenceOf('bookId', 'ownerId', 'holderId');

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
