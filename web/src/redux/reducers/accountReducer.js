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
  logOutFail
} from '../actions/accountAction'

const unAuthorizedUser = {
  userId: '',
  username: '',
  email: '',
  fbLink: '',
  phoneNumber: '',
  avatar: '',
  name:'',
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
  redirectPath: '',
  error: null
}

const accountReducer = handleActions(
  {
    [logInLocal]: (state) => {
      return state
    },
    [logInLocalSuccess]: (state) => {
      return {
        ...state,
        redirectPath: '/profile',
        error: null
      }
    },
    [logInLocalFail]: (state, { payload: error }) => {
      return {
        ...state,
        error
      }
    },
    [getUserInfo]: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [getUserInfoSuccess]: (state, { payload: { id, username, email, fbLink, phoneNumber, avatar, name, role, coin, contribution, homeLocationId, clubId}} ) => {
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
        redirectPath: '/profile',
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
        redirectPath: '',
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
    }
  },
  defaultState
)

export default accountReducer