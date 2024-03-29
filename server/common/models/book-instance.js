'use strict';
const get = require('lodash/get');
const setUserId = require('../../server/middleware/setUserId');
const secretKey = process.env.SUPER_SECRET_KEY;

module.exports = function(BookInstance) {
  BookInstance.validatesPresenceOf('bookId', 'ownerId', 'holderId');

  BookInstance.observe('before save', (ctx, next) => {
    if (get(ctx, 'data.secretKey') === secretKey && ctx.data) {
      delete ctx.data.secretKey;
      return next();
    }

    setUserId(ctx, 'ownerId');
    if (ctx.isNewInstance) {
      let userId = get(ctx, 'options.accessToken.userId', null);
      ctx.instance.holderId = userId;
    }
    // for update block holder and borrower change data
    if (!ctx.isNewInstance && ctx.data && ctx.currentInstance) {
      let userId = get(ctx, 'options.accessToken.userId', null);
      if (ctx && ctx.data && ctx.data.secretUserId) {
        userId = ctx.data.secretUserId;
        delete ctx.data.secretUserId;
      }
      if (!ctx.currentInstance.ownerId.equals(userId)) {
        delete ctx.data.depositCoin;
        delete ctx.data.estimatedReadingTime;
        if (!ctx.currentInstance.holderId.equals(userId)) {
          return next(new Error('Bạn không thể thưc hiện thao tác này'));
        }
      }
    }
    // update holder district
    if (ctx.instance) {
      // create
      if (ctx.instance.holderId) {
        getUserDistrict(ctx.instance.holderId, (district) => {
          if (!isNaN(district))
            ctx.instance.holderLocationDistrict = district;
          return next();
        });
      } else {
        ctx.instance.holderLocationDistrict = 0;
        return next();
      }
    } else {
      // update
      if (ctx.data && ctx.data.holderId) {
        getUserDistrict(ctx.data.holderId, (district) => {
          if (!isNaN(district))
            ctx.data.holderLocationDistrict = district;
          return next();
        });
      } else return next();
    }
  });

  BookInstance.observe('persist', (ctx, next) => {
    if (ctx.isNewInstance) {
      // for create
      triggerBookInstanceCreate(ctx, (err) => {
        if (err) return next(err);
        return next();
      });
    } else {
      // for update
      triggerBookInstanceUpdate(ctx, (err) => {
        if (err) return next(err);
        return next();
      });
    }
  });

  function triggerBookInstanceCreate(ctx, next) {
    let Book = BookInstance.app.models.book;
    if (!ctx.currentInstance || !ctx.currentInstance.bookId)
      return next(new Error('Yêu cầu bị lỗi'));
    Book.findById(ctx.currentInstance.bookId,
    (err, book) => {
      if (err || !book || !book.categoryId)
        return next(new Error('Loại sách này đang bị lỗi'));
      if (!isNaN(ctx.currentInstance.holderLocationDistrict)) {
        let newlocationStatistic = book.locationStatistic;
        let district = ctx.currentInstance.holderLocationDistrict;
        if (newlocationStatistic)
          newlocationStatistic[district]++;
        book.updateAttributes({
          locationStatistic: newlocationStatistic,
          totalOfBookInstance: book.totalOfBookInstance + 1,
        }, (err) => {
          if (err) return next(err);
          return next();
        });
      } else {
        book.updateAttributes({
          totalOfBookInstance: book.totalOfBookInstance + 1,
        }, (err, result) => {
          if (err) return next(err);
          return next();
        });
      }
    });
  }

  function triggerBookInstanceUpdate(ctx, next) {
    let Book = BookInstance.app.models.book;
    if (!ctx.data || isNaN(ctx.data.holderLocationDistrict)) return next();
    if (!ctx.currentInstance || !ctx.currentInstance.id ||
    !ctx.currentInstance.bookId)
      return next(new Error('Yêu cầu bị lỗi'));
    // find current location
    BookInstance.findById(ctx.currentInstance.id, (err, bookInstance) => {
      if (err || !bookInstance) return next(new Error('Yêu cầu bị lỗi'));
      if (bookInstance.holderLocationDistrict ===
      ctx.data.holderLocationDistrict) return next();
      Book.findById(ctx.currentInstance.bookId, (err, book) => {
        if (err || !book) return next(new Error('Loại sách này đang bị lỗi'));
        let newlocationStatistic = book.locationStatistic;
        let newDistrict = ctx.data.holderLocationDistrict;
        let oldDistrict = bookInstance.holderLocationDistrict;
        if (newlocationStatistic && !isNaN(newDistrict))
          newlocationStatistic[newDistrict]++;
        if (newlocationStatistic && !isNaN(oldDistrict))
          newlocationStatistic[oldDistrict]--;
        book.updateAttributes({
          locationStatistic: newlocationStatistic}, (err, result) => {
          if (err) return next(err);
          return next();
        });
      });
    });
  }

  function getUserDistrict(userId, callback) {
    let User = BookInstance.app.models.user;
    let Location = BookInstance.app.models.location;

    User.findById(userId, (err, userInstance) => {
      if (err || !userInstance) return callback(false);
      Location.findById(userInstance.homeLocationId,
      (err, locationInstance) => {
        if (err || !locationInstance) return callback(false);
        return callback(locationInstance.district);
      });
    });
  }
};
