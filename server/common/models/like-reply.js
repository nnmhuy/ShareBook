'use strict';
const setUserId = require('../../server/middleware/setUserId');
const checkExist = require('../../server/helper/checkExist');

module.exports = function(LikeReply) {
  LikeReply.validatesPresenceOf('userId', 'replyId');

  LikeReply.observe('before save', (ctx, next) => {
    setUserId(ctx, 'userId');
    next();
  });

  LikeReply.observe('persist', (ctx, next) => {
    if (ctx.isNewInstance) {
      // for create
      checkExist(LikeReply, {
        userId: ctx.currentInstance.userId,
        replyId: ctx.currentInstance.replyId,
      }, (err, result) => {
        if (err) return next(new Error(err));
        if (result) return next(new Error('Không thể tạo trùng'));
        triggerLikeReplyCreate(ctx, (err) => {
          if (err) return next(err);
          return next();
        });
      });
    } else {
      // for update
      triggerLikeReplyUpdate(ctx, (err) => {
        if (err) return next(err);
        return next();
      });
    }
  });

  function triggerLikeReplyUpdate(ctx, next) {
    let Reply = LikeReply.app.models.reply;
    if (!ctx.currentInstance || !ctx.currentInstance.id)
      return next(new Error('Yêu cầu bị lỗi'));
    if (!ctx.data) return next();
    // find old like review for current data
    LikeReply.findById(ctx.currentInstance.id, (err, likeReplyInstance) => {
      if (err || !likeReplyInstance)
        return next(new Error('Dữ liệu bị lỗi'));
      if (ctx.data.isLike === likeReplyInstance.isLike) return next();
      // find review for current total like, dislike
      Reply.findById(ctx.currentInstance.replyId,
        (err, reply) => {
          if (err || !reply)
            return next(new Error('Bình luận này đang bị lỗi'));

          let newLike = reply.numberOfLike;
          let newDislike = reply.numberOfDislike;

          if (ctx.data.isLike === 1) newLike++;
          if (ctx.data.isLike === -1) newDislike++;
          if (likeReplyInstance.isLike === 1) newLike--;
          if (likeReplyInstance.isLike === -1) newDislike--;
          reply.updateAttributes(
            {numberOfLike: newLike, numberOfDislike: newDislike},
            (err, instance) => {
              if (err) return next(new Error('Cập nhật tương tác gặp lỗi'));
              return next();
            });
        });
    });
  }

  function triggerLikeReplyCreate(ctx, next) {
    let Reply = LikeReply.app.models.reply;
    if (!ctx.currentInstance || !ctx.currentInstance.replyId)
      return next(new Error('Yêu cầu bị lỗi'));
    // find for current total
    Reply.findById(ctx.currentInstance.replyId, {},
      (err, reply) => {
        if (err || !reply) return next(new Error('Bài viết này đang bị lỗi'));

        let newLike = reply.numberOfLike;
        let newDislike = reply.numberOfDislike;

        if (ctx.currentInstance.isLike === 1) newLike++;
        if (ctx.currentInstance.isLike === -1) newDislike++;
        reply.updateAttributes(
          {numberOfLike: newLike, numberOfDislike: newDislike},
          (err, instance) => {
            if (err) return next(new Error('Cập nhật tương tác gặp lỗi'));
            return next();
          });
      });
  }
};
