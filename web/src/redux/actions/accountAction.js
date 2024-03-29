import { createActions } from 'redux-actions'


const {
  logInLocal,
  logInLocalSuccess,
  logInLocalFail,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
  editUserInfo,
  editUserInfoSuccess,
  editUserInfoFail,
  getOtherUserInfo,
  getOtherUserInfoSuccess,
  getOtherUserInfoFail,
  logOut,
  logOutSuccess,
  logOutFail,
  signUp,
  signUpSuccess,
  signUpFail,
  getProfileInfo,
  getProfileInfoSuccess,
  getProfileInfoFail,
  socketCoin
} = createActions(
  'LOG_IN_LOCAL',
  'LOG_IN_LOCAL_SUCCESS',
  'LOG_IN_LOCAL_FAIL',
  'GET_USER_INFO',
  'GET_USER_INFO_SUCCESS',
  'GET_USER_INFO_FAIL',
  'EDIT_USER_INFO',
  'EDIT_USER_INFO_SUCCESS',
  'EDIT_USER_INFO_FAIL',
  'GET_OTHER_USER_INFO',
  'GET_OTHER_USER_INFO_SUCCESS',
  'GET_OTHER_USER_INFO_FAIL',
  'LOG_OUT',
  'LOG_OUT_SUCCESS',
  'LOG_OUT_FAIL',
  'SIGN_UP',
  'SIGN_UP_SUCCESS',
  'SIGN_UP_FAIL',
  'GET_PROFILE_INFO',
  'GET_PROFILE_INFO_SUCCESS',
  'GET_PROFILE_INFO_FAIL',
  'SOCKET_COIN'
)



export {
  logInLocal,
  logInLocalSuccess,
  logInLocalFail,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
  editUserInfo,
  editUserInfoSuccess,
  editUserInfoFail,
  getOtherUserInfo,
  getOtherUserInfoSuccess,
  getOtherUserInfoFail,
  logOut,
  logOutSuccess,
  logOutFail,
  signUp,
  signUpSuccess,
  signUpFail,
  getProfileInfo,
  getProfileInfoSuccess,
  getProfileInfoFail,
  socketCoin
}