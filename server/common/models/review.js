'use strict';
const checkExist = require('../../server/helper/checkExist');
const setUserId = require('../../server/middleware/setUserId');
const coinConstants = require('../../server/helper/coinConstants');

module.exports = function(Review) {
  Review.validatesPresenceOf('userId', 'bookId');

  Review.observe('before save', (ctx, next) => {
    setUserId(ctx, 'userId');
    next();
  });

  Review.observe('persist', (ctx, next) => {
    if (ctx.isNewInstance) {
      // for create
      checkExist(Review, {
        userId: ctx.currentInstance.userId,
        bookId: ctx.currentInstance.bookId,
      }, (err, result) => {
        if (err) return next(new Error(err));
        if (result) return next(new Error('Không thể tạo trùng'));
        triggerReviewCreate(ctx, (err) => {
          if (err) return next(err);
          return next();
        });
      });
    } else {
      // for update
      triggerReviewUpdate(ctx, (err) => {
        if (err) return next(err);
        return next();
      });
    }
  });

  async function triggerReviewCreate(ctx, next) {
    try {
      let Book = Review.app.models.book;

      if (!ctx.currentInstance || !ctx.currentInstance.bookId)
        return next(new Error('Yêu cầu bị lỗi'));
      // find for current total
      const book = await Book.findById(ctx.currentInstance.bookId);
      if (!book) return next(new Error('Loại sách này đang bị lỗi'));

      let newTotalRating = ctx.currentInstance.rating + book.totalOfRating;
      let newRating = newTotalRating / (book.numberOfRating + 1);

      await book.updateAttributes({
        totalOfRating: newTotalRating,
        numberOfRating: book.numberOfRating + 1,
        rating: newRating,
      });
      const User = Review.app.models.user;
      const user = await User.findById(ctx.currentInstance.userId);
      await user.updateAttribute(
        'coin', user.coin + coinConstants.createReview
      );
      return next();
    } catch (error) {
      return next(new Error('Cập nhật review gặp lỗi'));
    }
  }

  function triggerReviewUpdate(ctx, next) {
    let Book = Review.app.models.book;
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

          book.updateAttributes(
            {totalOfRating: newTotalRating},
            (err, instance) => {
              if (err) return next(new Error('Cập nhật review gặp lỗi'));
              return next();
            });
        });
    });
  }
};
