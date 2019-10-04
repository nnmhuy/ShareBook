import { call, put, takeLatest } from 'redux-saga/effects'
import restConnector from '../../connectors/RestConnector'

import {
  postReply,
  postReplySuccess,
  postReplyFail
} from '../actions/replyAction'

function* postReplySaga({ payload }) {
  try {
    const { content, reviewId } = payload
    const newReply = yield call(restConnector.post, `/reviews/${reviewId}/replyReviews`, {
      numberOfLike: 0,
      numberOfDislike: 0,
      content,
      reviewId,
      attachUser: true
    })

    yield put(postReplySuccess())
  } catch (error) {
    yield put(postReplyFail(error))
  }
}

function* postReplyWatcher() {
  yield takeLatest(postReply, postReplySaga)
}

export {
  postReplyWatcher
}