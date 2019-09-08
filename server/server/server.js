// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var cookieParser = require('cookie-parser');
var session = require('express-session');
require('dotenv').config();

var app = module.exports = loopback();

// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);
var profileToUser = require('./component/social-auth');

var flash = require('express-flash');

// attempt to build the providers/passport config
var config = {};
try {
  config = require('../providers.js');
} catch (err) {
  console.trace(err);
  process.exit(1); // fatal
}

// boot scripts mount components like REST API
boot(app, __dirname);

app.middleware('session:before', cookieParser(process.env.COOKIE_SECRET));

app.use(
  loopback.token({
    model: app.models.accessToken,
    headers: ['access_token'],
    cookies: ['access_token'],
    currentUserLiteral: 'me', // Enable /api/users/me api shorthand syntax
  })
);

app.middleware('session', session({
  secret: 'kitty',
  saveUninitialized: true,
  resave: true,
}));
passportConfigurator.init();

// We need flash messages to see passport errors
app.use(flash());

passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential,
});
for (var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  c.profileToUser = profileToUser;
  passportConfigurator.configureProvider(s, c);
}

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
