import { createActions } from 'redux-actions'


const { 
  logInWithFacebook,
  logInWithFacebookSuccess,
  logInWithFacebookFail
} = createActions(
  'LOG_IN_WITH_FACEBOOK',
  'LOG_IN_WITH_FACEBOOK_SUCCESS',
  'LOG_IN_WITH_FACEBOOK_FAIL'
)



export {
  logInWithFacebook,
  logInWithFacebookSuccess,
  logInWithFacebookFail
}