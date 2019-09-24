'use strict';

module.exports = function(Book) {
  Book.validatesPresenceOf('categoryId');

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
