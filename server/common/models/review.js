'use strict';

module.exports = function(Review) {
  Review.validatesPresenceOf('userId', 'bookId');

  Review.observe('persist', (ctx, next) => {
    let Book = Review.app.models.book;
    // for update
    if (!ctx.isNewInstance) {
      if (!ctx.data || !ctx.data.rating) return next();
      if (!ctx.currentInstance || !ctx.currentInstance.id)
        return next(new Error('Yêu cầu bị lỗi'));
      // find old review for current data
      Review.findById(ctx.currentInstance.id, (err, reviewInstance) => {
        if (err || !reviewInstance) return next(new Error('Dữ liệu bị lỗi'));
        // find book for total data
        Book.findById(ctx.currentInstance.bookId,
        (err, book) => {
          if (err || !book) return next(new Error('Loại sách này đang bị lỗi'));

          let newTotalRating = ctx.data.rating -
            reviewInstance.rating + book.totalOfRating;

          Book.updateAll({id: book.id},
            {totalOfRating: newTotalRating},
            (err, instance) => {
              if (err) return next(new Error('Cập nhập review gặp lỗi'));
              return next();
            });
        });
      });
    } else {
      // for create
      if (!ctx.currentInstance || !ctx.currentInstance.bookId)
        return next(new Error('Yêu cầu bị lỗi'));
      // find for current total
      Book.findById(ctx.currentInstance.bookId, {},
      (err, book) => {
        if (err || !book) return next(new Error('Loại sách này đang bị lỗi'));

        let newTotalRating = ctx.currentInstance.rating + book.totalOfRating;

        Book.updateAll({id: book.id},
          {
            totalOfRating: newTotalRating,
            numberOfRating: book.numberOfRating + 1},
          (err, instance) => {
            if (err) return next(new Error('Cập nhập review gặp lỗi'));
            return next();
          });
      });
    }
  });
};
