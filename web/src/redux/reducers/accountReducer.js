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

let defaultState = {
  isLoading: false,
  userId: '',
  username: '',
  email: '',
  fbLink: '',
  phoneNumber: '',
  avatar: '',
  name:'',
  role: false,
  error: null
}

const accountReducer = handleActions(
  {
    [logInLocal]: (state) => {
      return state
    },
    [logInLocalSuccess]: (state, { payload: {   }}) => {
      return {
        ...state,
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
        isLoading: true,
        userId: localStorage.userId,
        access_token: localStorage.access_token
      }
    },
    [getUserInfoSuccess]: (state, { payload: { username, email, fbLink, phoneNumber, avatar, name, role }} ) => {
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        username,
        email,
        fbLink,
        phoneNumber,
        avatar,
        name,
        role,
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