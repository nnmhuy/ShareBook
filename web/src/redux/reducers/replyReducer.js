import { handleActions } from 'redux-actions'

import {
  postReply,
  postReplySuccess,
  postReplyFail
} from '../actions/replyAction'

let defaultState = {
  error: null,
  isCreating: false
}

const replyReducer = handleActions(
  {
    [postReply]: (state) => {
      return {
        ...state,
        isCreating: true
      }
    },
    [postReplySuccess]: (state, { payload }) => {
      return {
        ...state,
        error: null,
        isCreating: false
      }
    },
    [postReplyFail]: (state, { payload: error }) => {
      return {
        ...state,
        error,
        isCreating: false
      }
    },
  },
  defaultState
)

export default replyReducer