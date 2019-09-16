'use strict';

module.exports = function(Book) {
  Book.validatesPresenceOf('categoryId');
};
