'use strict';

const FRONTEND_URL = process.env.FRONTEND_URL;
const BACKEND_URL = process.env.BACKEND_URL;
const FbClientId = process.env.clientId;
const FbClientSecret = process.env.clientSecret;
const GGClientId = process.env.GGClientId;
const GGClientSecret = process.env.GGClientSecret;

module.exports = {
  'facebook-login': {
    'provider': 'facebook',
    'module': 'passport-facebook',
    'profileFields': [
      'link',
      'name',
      'email',
    ],
    'clientID': FbClientId,
    'clientSecret': FbClientSecret,
    'callbackURL': `${BACKEND_URL}/auth/facebook/callback`,
    'authPath': '/api/auth/facebook',
    'callbackPath': '/api/auth/facebook/callback',
    'successRedirect': `${FRONTEND_URL}/book-list`,
    'failureRedirect': `${FRONTEND_URL}/account`,
    'scope': [
      'email',
      // 'user_link',
    ],
    'failureFlash': true,
  },
  'facebook-link': {
    'provider': 'facebook',
    'module': 'passport-facebook',
    'clientID': FbClientId,
    'clientSecret': FbClientSecret,
    'callbackURL': `${BACKEND_URL}/link/facebook/callback`,
    'authPath': '/api/link/facebook',
    'callbackPath': '/api/link/facebook/callback',
    'successRedirect': `${FRONTEND_URL}/profile/me`,
    'failureRedirect': `${FRONTEND_URL}/profile/me`,
    'scope': [
      'email',
      // 'user_link',
    ],
    'link': true,
    'failureFlash': true,
  },
};
