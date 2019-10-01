import { handleActions } from 'redux-actions'

import {
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