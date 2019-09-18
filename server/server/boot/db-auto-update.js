'use strict';

const isShouldUpdate = process.env.DB_SHOULD_UPDATE;
const models = ['bookStationStaff', 'bookmark',
  'likeReply', 'likeReview', 'review'];

module.exports = function(app) {
  if (isShouldUpdate === 'true' || isShouldUpdate === true) {
    console.log('run update data');
    const dataSource = app.dataSources.db;
    dataSource.autoupdate(models, function(err, result) {
      console.log('result update', result);
    });
  }
};
