'use strict';

module.exports = function(Bookmark) {
  Bookmark.validatesPresenceOf('userId', 'bookId');
};
