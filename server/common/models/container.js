// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-example-storage
'use strict';
const BACKEND_URL = process.env.BACKEND_URL;
const CONTAINERS_URL = `${BACKEND_URL}/containers/`;
const uuidv4 = require('uuid/v4');

module.exports = function(Container) {
  // add uuid to file name
  Container.getApp(function(err, app) {
    if (err) return err;
    app.dataSources.imagestorage.connector.getFilename =
    function(uploadingFile, req, res) {
      let random = uuidv4();
      if (uploadingFile && uploadingFile.name) {
        return random + '-' + uploadingFile.name;
      } else {
        return random + '.jpg';
      }
    };
  });
};
