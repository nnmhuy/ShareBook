import { createActions } from 'redux-actions'


const { 
  logInWithFacebook,
  logInWithFacebookSuccess,
  logInWithFacebookFail,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
  logOut,
  logOutSuccess,
  logOutFail
} = createActions(
  'LOG_IN_WITH_FACEBOOK',
  'LOG_IN_WITH_FACEBOOK_SUCCESS',
  'LOG_IN_WITH_FACEBOOK_FAIL',
  'GET_USER_INFO',
  'GET_USER_INFO_SUCCESS',
  'GET_USER_INFO_FAIL',
  'LOG_OUT',
  'LOG_OUT_SUCCESS',
  'LOG_OUT_FAIL'
)



export {
  logInWithFacebook,
  logInWithFacebookSuccess,
  logInWithFacebookFail,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
  logOut,
  logOutSuccess,
  logOutFail
}