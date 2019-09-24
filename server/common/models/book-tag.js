'use strict';

module.exports = function(BookTag) {
  BookTag.validatesPresenceOf('tagId', 'bookId');
  BookTag.observe('persist', (ctx, next) => {
    if (ctx.isNewInstance) {
      // for create
      triggerBookTagCreate(ctx, (err) => {
        if (err) return next(err);
        return next();
      });
    } else {
      return next();
    }
  });

  function triggerBookTagCreate(ctx, next) {
    let Tag = BookTag.app.models.tag;
    if (!ctx.currentInstance || !ctx.currentInstance.bookId)
      return next(new Error('Yêu cầu bị lỗi'));
    Tag.findById(ctx.currentInstance.tagId, (err, tagInstance) => {
      if (err || !tagInstance)
        return next(new Error('Loại tag này đang bị lỗi'));
      tagInstance.updateAttributes({numberOfBook: tagInstance.numberOfBook + 1},
      (err, result) => {
        if (err) return next(err);
        return next();
      });
    });
  }
};
