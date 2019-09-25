'use strict';
const filterText = require('../../server/helper/filterText');

module.exports = function(Book) {
  Book.validatesPresenceOf('categoryId', 'name', 'author', 'image');

  Book.observe('before save', (ctx, next) => {
    // create new
    if (ctx.isNewInstance && ctx.instance) {
      let bookName = ctx.instance.name + ctx.instance.author;
      bookName = filterText(bookName);
      ctx.instance.searchValue = bookName;
    }
    return next();
  });

  Book.observe('persist', (ctx, next) => {
    if (ctx.isNewInstance) {
      // for create
      triggerBookCreate(ctx, (err) => {
        if (err) return next(err);
        return next();
      });
    } else {
      // for update
      return next();
    }
  });
  function triggerBookCreate(ctx, next) {
    let Category = Book.app.models.category;
    if (!ctx.currentInstance || !ctx.currentInstance.categoryId)
      return next(new Error('Yêu cầu bị lỗi'));
    Category.findById(ctx.currentInstance.categoryId,
    (err, categoryInstance) => {
      if (err || !categoryInstance)
        return next(new Error('Loại sách này đang bị lỗi'));
      categoryInstance.updateAttributes({
        totalOfBook: categoryInstance.totalOfBook + 1,
      }, (err, instance) => {
        if (err || !instance)
          return next(new Error('Thể loại sách này đang bị lỗi'));
        return next();
      });
    });
  }
};
