import { handleActions } from 'redux-actions'

import {
  getReplies,
  getRepliesSuccess,
  getRepliesFail,
  postReply,
  postReplySuccess,
  postReplyFail,
  getReplyById,
  getReplyByIdSuccess,
  getReplyByIdFail,
  toggleLikeReply,
  toggleLikeReplySuccess,
  toggleLikeReplyFail
} from '../actions/replyAction'

let defaultState = {
  error: null,
  isCreating: false,
  isLoadingReplies: false,
  replies: [],
  isLoadingReply: false,
  reply: {}
}

const replyReducer = handleActions(
  {
    [getReplies]: (state) => {
      return {
        ...state,
        isLoadingReplies: true,
      }
    },
    [getRepliesSuccess]: (state, {payload}) => {
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
    [postReplySuccess]: (state, { payload: reply }) => {
      const repliesOfCurReview = JSON.parse(JSON.stringify(state.replies))
      repliesOfCurReview.push(reply.reply);

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
    [getReplyById]: (state) => {
      return {
        ...state,
        isLoadingReply: true,
      }
    },
    [getReplyByIdSuccess]: (state, { payload }) => {
      return {
        isLoadingReply: false,
        reply: payload,
        error: null
      }
    },
    [getReplyByIdFail]: (state, { payload: error }) => {
      return {
        isLoadingReply: false,
        error: error
      }
    },
    [toggleLikeReply]: (state, { payload: { replyId, likeStatus } }) => {
      const replies = JSON.parse(JSON.stringify(state.replies));
      const index = replies.findIndex(reply => replyId === reply.id)

      if (replies[index].likeStatus === -1) {
        --replies[index].numberOfDislike
      }
      if (replies[index].likeStatus === 1) {
        --replies[index].numberOfLike
      }
      if (likeStatus === -1) {
        ++replies[index].numberOfDislike
      }
      if (likeStatus === 1) {
        ++replies[index].numberOfLike
      }
      replies[index].likeStatus = likeStatus

      return {
        ...state,
        replies
      }
    },
    [toggleLikeReplySuccess]: (state, { payload }) => {
      const { replyId, likeReplyId } = payload
      const replies = JSON.parse(JSON.stringify(state.replies));
      const index = replies.findIndex(reply => replyId === reply.id)
      replies[index].likeReplyId = likeReplyId;

      return {
        ...state,
        replies,
        error: null
      }
    },
    [toggleLikeReplyFail]: (state, { payload: error }) => {
      return {
        ...state,
        error
      }
    },
  },
  defaultState
)

export default replyReducer