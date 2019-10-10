'use strict';
const filterText = require('../../server/helper/filterText');

const download = require('image-downloader');
const uuidv4 = require('uuid/v4');
const ImageSearchAPIClient = require('azure-cognitiveservices-imagesearch');
const CognitiveServicesCredentials =
  require('ms-rest-azure').CognitiveServicesCredentials;
const serviceKey = process.env.BING_KEY;
const credentials = new CognitiveServicesCredentials(serviceKey);
const imageSearchApiClient = new ImageSearchAPIClient(credentials);

module.exports = function(Book) {
  Book.validatesPresenceOf('categoryId', 'name', 'author', 'image');

  Book.observe('before save', (ctx, next) => {
    // create new
    if (ctx.isNewInstance && ctx.instance) {
      let bookName = ctx.instance.name + ctx.instance.author;
      bookName = filterText(bookName);
      ctx.instance.searchValue = bookName;
    } else {
      if (ctx.data && ctx.data.author && ctx.data.name) {
        let bookName = ctx.data.name + ctx.data.author;
        bookName = filterText(bookName);
        ctx.data.searchValue = bookName;
      }
      ctx.hookState.categoryId = ctx.currentInstance.categoryId;
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
      triggerBookUpdate(ctx, (err) => {
        if (err) return next(err);
        return next();
      });
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

  function triggerBookUpdate(ctx, next) {
    if (!ctx.data || !ctx.data.categoryId || !ctx.hookState.categoryId)
      return next();
    updateCategory(ctx.data.categoryId, 1, (err) => {
      if (err) return next(err);
      updateCategory(ctx.hookState.categoryId, -1, (err) => {
        if (err) return next(err);
        return next();
      });
    });
  }

  function updateCategory(id, delta, next) {
    let Category = Book.app.models.category;
    Category.findById(id,
    (err, categoryInstance) => {
      if (err || !categoryInstance)
        return next(new Error('Loại sách này đang bị lỗi'));
      categoryInstance.updateAttributes({
        totalOfBook: categoryInstance.totalOfBook + delta,
      }, (err, instance) => {
        if (err || !instance)
          return next(new Error('Thể loại sách này đang bị lỗi'));
        return next();
      });
    });
  }

  Book.createBySearch = function(data, cb) {
    let {description, author, image, numberOfPages,
      name, publisher, price, publishYear} = data;
    let searchValue = name + author;
    searchValue = filterText(searchValue);
    Book.find({where: {searchValue: searchValue}},
    (err, bookList) => {
      if (err) return cb(err);
      if (bookList && bookList[0]) {
        return cb(null, bookList[0]);
      } else {
        let newBook = {description, author, image, numberOfPages,
          name, publisher, price, publishYear, categoryId: '14'};

        if (image === '/containers/defaultContainer/download/defaultBook.png') {
          let keyWord = 'sách ' + name + ' ' + author;
          imageSearchApiClient.imagesOperations.search(keyWord,
          {safeSearch: 'Strict', count: 3, imageType: 'Photo'},
          (err, result, request, response) => {
            if (err || !result || !result.value || !result.value[0] ||
            !result.value[0].contentUrl || !result.value[0].thumbnailUrl) {
              console.log(err);
              createBook(newBook, cb);
              return;
            }
            let random = uuidv4();
            let newFileName = random;
            let options = {
              url: result.value[0].thumbnailUrl,
              dest: `../image-storage/imageContainer/${newFileName}`,
              extractFilename: false,
            };
            download.image(options)
            .then(({filename, image}) => {
              newBook.image =
              '/containers/imageContainer/download/' + newFileName;
              createBook(newBook, cb);
              return;
            })
            .catch((err) => {
              console.log('store err', err);
              createBook(newBook, cb);
              return;
            });
          });
        } else {
          let random = uuidv4();
          let newFileName = random;
          let options = {
            url: image,
            dest: `../image-storage/imageContainer/${newFileName}`,
            extractFilename: false,
          };
          download.image(options)
          .then(({filename, image}) => {
            newBook.image =
            '/containers/imageContainer/download/' + newFileName;
            createBook(newBook, cb);
            return;
          })
          .catch((err) => {
            console.log('store err', err);
            createBook(newBook, cb);
            return;
          });
        }
      }
    });
  };

  function createBook(newBook, cb) {
    Book.create(newBook, (err, instance) => {
      if (err) return cb(err);
      return cb(null, instance);
    });
  }

  Book.remoteMethod('createBySearch', {
    accepts: {arg: 'data', type: 'object'},
    returns: {arg: 'newBook', type: 'object'},
  });
};
