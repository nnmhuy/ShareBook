import { call, put, takeLatest, all } from 'redux-saga/effects'
import restConnector from '../../connectors/RestConnector'

import {
  getReplies,
  getRepliesSuccess,
  getRepliesFail,
  postReply,
  postReplySuccess,
  postReplyFail
} from '../actions/replyAction'

function* getRepliesSaga({ payload }) {
  try {
    const { reviewId } = payload
    const { data: curReplies } = yield call(restConnector.get, `/reviews/${reviewId}/replyReviews`)

    const user = yield all(
      curReplies.map(reply => {
        return call(restConnector.get, `/replies/${reply.id}/user`)
      })
    )

    const replies = user.map((oneUser, index) => {
      const user = oneUser.data;
      if (user.avatar) curReplies[index].avatar = user.avatar
      curReplies[index].name = user.name
      return curReplies[index]
    })

    console.log(replies)

    yield put(getRepliesSuccess({ replies }))
  } catch (error) {
    yield put(getRepliesFail(error))
  }
}

function* postReplySaga({ payload }) {
  try {
    const { content, reviewId } = payload
    yield call(restConnector.post, `/reviews/${reviewId}/replyReviews`, {
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

function* getRepliesWatcher() {
  yield takeLatest(getReplies, getRepliesSaga)
}

function* postReplyWatcher() {
  yield takeLatest(postReply, postReplySaga)
}

export {
  postReplyWatcher,
  getRepliesWatcher
}