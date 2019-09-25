'use strict';
module.exports = function() {
  var path = require('path');
  return function urlNotFound(req, res, next) {
    let appIndex = path.resolve('client/index.html');
    res.sendFile(appIndex, function(err) {
      if (err) {
        console.error(err);
        res.status(err.status).end();
      }
    });
  };
};
