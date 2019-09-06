'use strict';

const FRONTEND_URL = process.env.FRONTEND_URL;
const FbClientId = process.env.clientId;
const FbClientSecret = process.env.clientSecret;
const GGClientId = process.env.GGClientId;
const GGClientSecret = process.env.GGClientSecret;

module.exports = {
  'facebook-login': {
    'provider': 'facebook',
    'module': 'passport-facebook',
    'profileFields': [
      'gender',
      'link',
      'locale',
      'name',
      'timezone',
      'verified',
      'email',
      'updated_time',
    ],
    'clientID': FbClientId,
    'clientSecret': FbClientSecret,
    'callbackURL': '/api/auth/facebook/callback',
    'authPath': '/api/auth/facebook',
    'callbackPath': '/api/auth/facebook/callback',
    'successRedirect': `${FRONTEND_URL}/home`,
    'failureRedirect': `${FRONTEND_URL}/login`,
    'scope': [
      'email',
      'user_link',
    ],
    'failureFlash': true,
  },
  'facebook-link': {
    'provider': 'facebook',
    'module': 'passport-facebook',
    'clientID': FbClientId,
    'clientSecret': FbClientSecret,
    'callbackURL': '/api/link/facebook/callback',
    'authPath': '/api/link/facebook',
    'callbackPath': '/api/link/facebook/callback',
    'successRedirect': `${FRONTEND_URL}/home`,
    'failureRedirect': `${FRONTEND_URL}/home`,
    'scope': [
      'email',
      'user_link',
    ],
    'link': true,
    'failureFlash': true,
  },
};
