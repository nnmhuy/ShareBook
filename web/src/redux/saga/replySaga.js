import { call, put, takeLatest, all } from 'redux-saga/effects'
import restConnector from '../../connectors/RestConnector'

import {
  getReplies,
  getRepliesSuccess,
  getRepliesFail,
  postReply,
  postReplySuccess,
  postReplyFail,
  toggleLikeReply,
  toggleLikeReplySuccess,
  toggleLikeReplyFail
} from '../actions/replyAction'

function* getRepliesSaga({ payload }) {
  try {
    const { reviewId } = payload
    const { data: curReplies } = yield call(restConnector.get, `/replies?filter={"where":{"reviewId":${JSON.stringify(reviewId)}}}`)

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

    yield put(getRepliesSuccess({ replies }))
  } catch (error) {
    yield put(getRepliesFail(error))
  }
}

function* postReplySaga({ payload }) {
  try {
    const { content, reviewId } = payload
    const { data : reply } = yield call(restConnector.post, `/replies`, {
      content,
      reviewId,
      attachUser: true
    })
    const { data : user } = yield call(restConnector.get, `/replies/${reply.id}/user`)
    reply.avatar = user.avatar;
    reply.name = user.name;

    yield put(postReplySuccess({ reply }))
  } catch (error) {
    yield put(postReplyFail(error))
  }
}

function* toggleLikeReplySaga({ payload }) {
  try {
    const { replyId, likeReplyId, likeStatus } = payload
    let likeReplyResponse
    if (!likeReplyId) {
      likeReplyResponse = yield call(restConnector.post, '/likeReplies', {
        replyId,
        isLike: likeStatus,
        attachUser: true
      })
    } else {
      likeReplyResponse = yield call(restConnector.patch, `/likeReplies/${replyId}`, {
        replyId,
        isLike: likeStatus,
        attachUser: true
      })
    }

    yield put(toggleLikeReplySuccess({
      replyId,
      likeReplyId: likeReplyResponse.data.id
    }))
  } catch (error) {
    yield put(toggleLikeReplyFail(error))
  }
}

function* getRepliesWatcher() {
  yield takeLatest(getReplies, getRepliesSaga)
}

function* postReplyWatcher() {
  yield takeLatest(postReply, postReplySaga)
}

function* toggleLikeReplyWatcher() {
  yield takeLatest(toggleLikeReply, toggleLikeReplySaga)
}

export {
  postReplyWatcher,
  getRepliesWatcher,
  toggleLikeReplyWatcher
}