'use strict';
var get = require('lodash/get');
var utils = require('../../node_modules/loopback-component-passport/lib/models/utils.js');
const filterText = require('../helper/filterText');

function stringToRef(object, reference) {
  function arrDeref(o, ref, i) {
    return !ref ? o : o[ref.slice(0, i ? -1 : ref.length)];
  }
  function dotDeref(o, ref) {
    return ref.split('[').reduce(arrDeref, o);
  }
  return !reference ? object : reference.split('.').reduce(dotDeref, object);
}

module.exports = function profileToUser(provider, profile, options) {
  var password, userObj;

  if (!options.profileMapping) {
    // Let's create a user for that
    var profileEmail =
      profile.emails && profile.emails[0] && profile.emails[0].value;
    var generatedEmail =
      (profile.username || profile.id) +
      '@sharebook.com.vn';
    var email = profileEmail || generatedEmail;
    var username = provider + '.' + (profile.username || profile.id);
    password = utils.generateKey('password');

    var name = get(profile, 'name.familyName', 'New') +
    ' ' + get(profile, 'name.givenName', 'User');
    var avatar = null;
    var fbLink = null;
    if (provider === 'google') {
      avatar = get(profile, 'photos[0].value', null);
    }
    if (provider === 'facebook' && profile && profile.id) {
      avatar = `https://graph.facebook.com/${profile.id}/picture?height=500&width=500`;
    }
    if (provider === 'facebook' && profile && profile.profileUrl) {
      fbLink = profile.profileUrl;
    }
    userObj = {
      username: username,
      password: password,
    };
    if (email) {
      userObj.email = email;
    }
    if (name) {
      userObj.name = name;
    }
    if (avatar) {
      userObj.avatar = avatar;
    }
    if (fbLink) {
      userObj.fbLink = fbLink;
    }
    console.log('log in', userObj);
    return userObj;
  } else {
    password = utils.generateKey('password');
    userObj = {
      password: password,
    };
    // if profileMapping exists, map each provider field to the appropriate user field
    options.profileMapping.forEach(function(field) {
      userObj[field.userField] = stringToRef(profile, field.providerField);
    });
  }
  return userObj;
};
