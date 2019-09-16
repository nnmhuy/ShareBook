'use strict';

module.exports = function(Likebook) {
  Likebook.validatesPresenceOf('bookId', 'userId');
};
