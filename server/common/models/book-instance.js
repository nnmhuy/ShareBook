'use strict';
const _ = require('lodash');

module.exports = function(BookInstance) {
  BookInstance.beforeRemote('create', function(ctx, bookInstance, next) {
    let Category = BookInstance.app.models.category;
    let Book = BookInstance.app.models.book;
    let bookId = _.get(ctx, 'req.body.bookId', '');
    Book.find({
      where: {
        id: bookId,
      },
    }, (err, bookList) => {
      if (err || !bookList || !bookList[0] || !bookList[0].categoryId)
        next(new Error('Loại sách này đang bị lỗi'));
      Category.find({
        where: {
          id: bookList[0].categoryId,
        },
      }, (err, categoryList) => {
        if (err || !categoryList || !categoryList[0])
          next(new Error('Loại sách này đang bị lỗi'));
        Category.updateAll({id: categoryList[0].id}, {
          totalOfBook: categoryList[0].totalOfBook + 1,
        }, (err, instance) => {
          if (err) next(new Error('Thể loại sách này đang bị lỗi'));
          next();
        });
      });
    });
  });
};
