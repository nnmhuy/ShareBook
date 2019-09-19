'use strict';

module.exports = function(models, condition, callback) {
  models.find({
    where: condition,
  }, (err, instance) => {
    if (err) return callback('Dữ liệu gặp lỗi');
    if (instance && instance[0]) return callback(null, true);
    return callback(null, false);
  });
};
