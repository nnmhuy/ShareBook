import { handleActions } from 'redux-actions'

import {
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
  signUpFail,
  signUpSuccess
} from '../actions/accountAction'

const unAuthorizedUser = {
  userId: '',
  username: '',
  email: '',
  fbLink: '',
  phoneNumber: '',
  avatar: '',
  name: '',
  role: '',
  coin: 0,
  contribution: 0,
  homeLocationId: '',
  clubId: '',
}

let defaultState = {
  isLoading: false,
  isAuth: false,
  otherAccount: {},
  ...unAuthorizedUser,
  error: null
}

const accountReducer = handleActions(
  {
    [logInLocal]: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [logInLocalSuccess]: (state) => {
      return {
        ...state,
        isAuth: true,
        error: null,
        isLoading: false
      }
    },
    [logInLocalFail]: (state, { payload: error }) => {
      return {
        ...state,
        isAuth: false,
        error,
        isLoading: false
      }
    },
    [getUserInfo]: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [getUserInfoSuccess]: (state, { payload: { id, username, email, fbLink, phoneNumber, avatar, name, role, coin, contribution, homeLocationId, clubId } }) => {
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        userId: id,
        username,
        email,
        fbLink,
        phoneNumber,
        avatar,
        name,
        role,
        coin,
        contribution,
        homeLocationId,
        clubId,
        error: null
      }
    },
    [getUserInfoFail]: (state, { payload: error }) => {
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        ...unAuthorizedUser,
        error
      }
    },
    [editUserInfo]: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [editUserInfoSuccess]: (state, { payload: newAccountInfo }) => {
      return {
        ...state,
        isLoading: false,
        otherAccount: newAccountInfo,
        email: newAccountInfo.email,
        fbLink: newAccountInfo.fbLink,
        phoneNumber: newAccountInfo.phoneNumber,
        avatar: newAccountInfo.avatar,
        name: newAccountInfo.avatar,
        role: newAccountInfo.role,
        coin: newAccountInfo.coin,
        contribution: newAccountInfo.contribution,
        homeLocationId: newAccountInfo.homeLocationId,
        clubId: newAccountInfo.clubId,
        error: null
      }
    },
    [editUserInfoFail]: (state, { payload: error }) => {
      return {
        ...state,
        isLoading: false,
        error
      }
    },
    [getOtherUserInfo]: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [getOtherUserInfoSuccess]: (state, { payload: otherAccount }) => {
      return {
        ...state,
        isLoading: false,
        otherAccount: otherAccount,
        error: null
      }
    },
    [getOtherUserInfoFail]: (state, { payload: error }) => {
      return {
        ...state,
        isLoading: false,
        error
      }
    },
    [logOut]: (state) => {
      return {
        ...state,
        isLoading: true,
        isAuth: false,
      }
    },
    [logOutSuccess]: (state) => {
      return {
        isLoading: false,
        isAuth: false,
        ...unAuthorizedUser,
        error: null
      }
    },
    [logOutFail]: (state, { payload: error }) => {
      return {
        isLoading: false,
        isAuth: false,
        ...unAuthorizedUser,
        error: error
      }
    },
    [signUp]: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [signUpSuccess]: (state) => {
      return {
        ...state,
        error: null,
        isLoading: false
      }
    },
    [signUpFail]: (state, { payload: error }) => {
      return {
        ...state,
        error,
        isLoading: false
      }
    }
  },
  defaultState
)

export default accountReducer