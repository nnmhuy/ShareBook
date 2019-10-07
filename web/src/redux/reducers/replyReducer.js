import { handleActions } from 'redux-actions'

import {
  getReplies,
  getRepliesSuccess,
  getRepliesFail,
  postReply,
  postReplySuccess,
  postReplyFail
} from '../actions/replyAction'

let defaultState = {
  error: null,
  isCreating: false,
  isLoadingReplies: false,
  replies: []
}

const replyReducer = handleActions(
  {
    [getReplies]: (state) => {
      return {
        ...state,
        isLoadingReplies: true,
      }
    },
    [getRepliesSuccess]: (state, { payload }) => {
      return {
        isLoadingReplies: false,
        replies: payload,
        error: null
      }
    },
    [getRepliesFail]: (state, { payload: error }) => {
      return {
        isLoadingReplies: false,
        error: error
      }
    },
    [postReply]: (state) => {
      return {
        ...state,
        isCreating: true
      }
    },
    [postReplySuccess]: (state, { replies }) => {
      const repliesOfCurReview = JSON.parse(JSON.stringify(state.replies))
      repliesOfCurReview.push(replies);
      
      return {
        ...state,
        replies: repliesOfCurReview,
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