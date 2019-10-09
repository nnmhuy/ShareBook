import { call, put, takeLatest, all } from 'redux-saga/effects'
import restConnector from '../../connectors/RestConnector'

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

function* getRepliesSaga({ payload }) {
  try {
    const { userId, reviewId } = payload
    const { data: curReplies } = yield call(restConnector.get, `/replies?filter={"where":{"reviewId":${JSON.stringify(reviewId)}}}`)
    const replyLike = yield all(
      curReplies.map(reply => {
        return call(restConnector.get, `/likeReplies?filter={"where":{"userId":"${userId}","replyId":"${reply.id}"}}`)
      })
    )
    const user = yield all(
      curReplies.map(reply => {
        return call(restConnector.get, `/replies/${reply.id}/user`)
      })
    )

    const userReplies = user.map((oneUser, index) => {
      const user = oneUser.data;
      if (user.avatar) curReplies[index].avatar = user.avatar
      curReplies[index].name = user.name
      return curReplies[index]
    })

    let replies = userReplies.map((reply, index) => {
      if (replyLike[index].data[0]) {
        reply.likeReplyId = replyLike[index].data[0].id
        reply.likeStatus = replyLike[index].data[0].isLike
      }
      else {
        reply.likeReplyId = ''
        reply.likeStatus = 0
      }
      return reply
    })

    yield put(getRepliesSuccess(replies))
  } catch (error) {
    yield put(getRepliesFail(error))
  }
}

function* getReplyByIdSaga({ payload }) {
  try {
    const { replyId } = payload
    const { data: reply } = yield call(restConnector.get, `/replies/${replyId}`)

    const { data: userReply } = yield call(restConnector.get, `/replies/${replyId}/user`)
    const { data: userReview } = yield call(restConnector.get, `/reviews/${reply.reviewId}/user`)
    const { data: bookReview } = yield call(restConnector.get, `/reviews/${reply.reviewId}/book`)

    const allData = {
      createdAt: reply.createdAt,
      replyName: userReply.name,
      replyAvatar: userReply.avatar,
      reviewName: userReview.name,
      reviewAvatar: userReview.avatar,
      bookName: bookReview.name,
      bookImage: bookReview.image
    }

    yield put(getReplyByIdSuccess(allData))
  } catch (error) {
    yield put(getReplyByIdFail(error))
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
      likeReplyResponse = yield call(restConnector.patch, `/likeReplies/${likeReplyId}`, {
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

function* getReplyByIdWatcher() {
  yield takeLatest(getReplyById, getReplyByIdSaga)
}

function* toggleLikeReplyWatcher() {
  yield takeLatest(toggleLikeReply, toggleLikeReplySaga)
}

export {
  postReplyWatcher,
  getRepliesWatcher,
  getReplyByIdWatcher,
  toggleLikeReplyWatcher
}