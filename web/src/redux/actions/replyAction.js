import { createActions } from 'redux-actions'

const {
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
} = createActions(
  'GET_REPLIES',
  'GET_REPLIES_SUCCESS',
  'GET_REPLIES_FAIL',
  'POST_REPLY',
  'POST_REPLY_SUCCESS',
  'POST_REPLY_FAIL',
  'GET_REPLY_BY_ID',
  'GET_REPLY_BY_ID_SUCCESS',
  'GET_REPLY_BY_ID_FAIL',
  'TOGGLE_LIKE_REPLY',
  'TOGGLE_LIKE_REPLY_SUCCESS',
  'TOGGLE_LIKE_REPLY_FAIL'
)


export {
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
}