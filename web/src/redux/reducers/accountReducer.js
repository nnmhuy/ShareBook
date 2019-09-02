import { handleActions } from 'redux-actions'

import { 
  logInWithFacebook,
  logInWithFacebookSuccess,
  logInWithFacebookFail
} from '../actions/accountAction'

let defaultState = {
  username: '',
  avatar: '',
  token: '',
  error: null
}

const accountReducer = handleActions(
  {
    [logInWithFacebook]: (state) => {
      return state
    },
    [logInWithFacebookSuccess]: (state, { payload: { username, avatar, token }}) => {
      return {
        ...state,
        username,
        avatar,
        token
      }
    },
    [logInWithFacebookFail]: (state, { payload: error }) => {
      return {
        ...state,
        error
      }
    }
  },
  defaultState
)

export default accountReducer