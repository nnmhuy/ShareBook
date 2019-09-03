import { handleActions } from 'redux-actions'

import { 
  logInWithFacebook,
  logInWithFacebookSuccess,
  logInWithFacebookFail,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
  logOut,
  logOutSuccess,
  logOutFail
} from '../actions/accountAction'

let defaultState = {
  isLoading: false,
  isAuth: false,
  userId: '',
  username: '',
  avatar: '',
  access_token: '',
  error: null
}

const accountReducer = handleActions(
  {
    [logInWithFacebook]: (state) => {
      return state
    },
    [logInWithFacebookSuccess]: (state, { payload: { username, avatar, access_token }}) => {
      return {
        ...state,
        username,
        avatar,
        access_token,
        error: null
      }
    },
    [logInWithFacebookFail]: (state, { payload: error }) => {
      return {
        ...state,
        error
      }
    },
    [getUserInfo]: (state) => {
      return {
        ...state,
        isLoading: true,
        userId: localStorage.userId,
        access_token: localStorage.access_token
      }
    },
    [getUserInfoSuccess]: (state, { payload: { username, avatar }} ) => {
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        username,
        avatar,
        error: null
      }
    },
    [getUserInfoFail]: (state, { payload: error }) => {
      return {
        ...state,
        isLoading: false,
        isAuth: false,
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
        userId: '',
        username: '',
        avatar: '',
        access_token: '',
        error: null
      }
    },
    [logOutFail]: (state, { payload: error }) => {
      return {
        isLoading: false,
        isAuth: false,
        userId: '',
        username: '',
        avatar: '',
        access_token: '',
        error: error
      }
    }
  },
  defaultState
)

export default accountReducer