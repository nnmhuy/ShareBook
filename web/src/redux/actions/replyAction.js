import { createActions } from 'redux-actions'

const {
  getReplies,
  getRepliesSuccess,
  getRepliesFail,
  postReply,
  postReplySuccess,
  postReplyFail
} = createActions(
  'GET_REPLIES',
  'GET_REPLIES_SUCCESS',
  'GET_REPLIES_FAIL',
  'POST_REPLY',
  'POST_REPLY_SUCCESS',
  'POST_REPLY_FAIL'
)


export {
  getReplies,
  getRepliesSuccess,
  getRepliesFail,
  postReply,
  postReplySuccess,
  postReplyFail
}