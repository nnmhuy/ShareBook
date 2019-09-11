import { createActions } from 'redux-actions'


const { 
  logInLocal,
  logInLocalSuccess,
  logInLocalFail,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
  logOut,
  logOutSuccess,
  logOutFail,
  signUp,
  signUpSuccess,
  signUpFail
} = createActions(
  'LOG_IN_LOCAL',
  'LOG_IN_LOCAL_SUCCESS',
  'LOG_IN_LOCAL_FAIL',
  'GET_USER_INFO',
  'GET_USER_INFO_SUCCESS',
  'GET_USER_INFO_FAIL',
  'LOG_OUT',
  'LOG_OUT_SUCCESS',
  'LOG_OUT_FAIL',
  'SIGN_UP',
  'SIGN_UP_SUCCESS',
  'SIGN_UP_FAIL'
)



export {
  logInLocal,
  logInLocalSuccess,
  logInLocalFail,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
  logOut,
  logOutSuccess,
  logOutFail,
  signUp,
  signUpSuccess,
  signUpFail
}