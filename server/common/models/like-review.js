'use strict';
const setUserId = require('../../server/middlerware/setUserId');
const checkExist = require('../../server/helper/checkExist');

module.exports = function(LikeReview) {
  LikeReview.validatesPresenceOf('userId', 'reviewId');

  LikeReview.observe('before save', (ctx, next) => {
    setUserId(ctx, 'userId');
    next();
  });

  LikeReview.observe('persist', (ctx, next) => {
    if (ctx.isNewInstance) {
      // for create
      checkExist(LikeReview, {
        userId: ctx.currentInstance.userId,
        reviewId: ctx.currentInstance.reviewId,
      }, (err, result) => {
        if (err) return next(new Error(err));
        if (result) return next(new Error('Không thể tạo trùng'));
        triggerLikeReviewCreate(ctx, (err) => {
          if (err) return next(err);
          return next();
        });
      });
    } else {
      // for update
      triggerLikeReviewUpdate(ctx, (err) => {
        if (err) return next(err);
        return next();
      });
    }
  });

  function triggerLikeReviewUpdate(ctx, next) {
    let Review = LikeReview.app.models.review;
    if (!ctx.currentInstance || !ctx.currentInstance.id)
      return next(new Error('Yêu cầu bị lỗi'));
    if (!ctx.data) return next();
    // find old like review for current data
    LikeReview.findById(ctx.currentInstance.id, (err, likeReviewInstance) => {
      if (err || !likeReviewInstance)
        return next(new Error('Dữ liệu bị lỗi'));
      if (ctx.data.isLike === likeReviewInstance.isLike) return next();
      // find review for current total like, dislike
      Review.findById(ctx.currentInstance.reviewId,
        (err, review) => {
          if (err || !review)
            return next(new Error('Bài viết này đang bị lỗi'));

          let newLike = review.numberOfLike;
          let newDislike = review.numberOfDislike;

          if (ctx.data.isLike === 1) newLike++;
          if (ctx.data.isLike === -1) newDislike++;
          if (likeReviewInstance.isLike === 1) newLike--;
          if (likeReviewInstance.isLike === -1) newDislike--;

          Review.updateAll({id: review.id},
            {numberOfLike: newLike, numberOfDislike: newDislike},
            (err, instance) => {
              if (err) return next(new Error('Cập nhập tương tác gặp lỗi'));
              return next();
            });
        });
    });
  }

  function triggerLikeReviewCreate(ctx, next) {
    let Review = LikeReview.app.models.review;
    if (!ctx.currentInstance || !ctx.currentInstance.reviewId)
      return next(new Error('Yêu cầu bị lỗi'));
    // find for current total
    Review.findById(ctx.currentInstance.reviewId, {},
      (err, review) => {
        if (err || !review) return next(new Error('Bài viết này đang bị lỗi'));

        let newLike = review.numberOfLike;
        let newDislike = review.numberOfDislike;

        if (ctx.currentInstance.isLike === 1) newLike++;
        if (ctx.currentInstance.isLike === -1) newDislike++;
        Review.updateAll({id: review.id},
          {numberOfLike: newLike, numberOfDislike: newDislike},
          (err, instance) => {
            if (err) return next(new Error('Cập nhập tương tác gặp lỗi'));
            return next();
          });
      });
  }
};
