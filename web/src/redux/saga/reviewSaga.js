import { call, put, takeLatest, all } from 'redux-saga/effects'
import _ from 'lodash';

import {
  getReviewsOfBook,
  getReviewsOfBookSuccess,
  getReviewsOfBookFail,
  toggleLikeReview,
  toggleLikeReviewSuccess,
  toggleLikeReviewFail,
  getReviewByUser,
  getReviewByUserSuccess,
  getReviewByUserFail,
  postReview,
  postReviewSuccess,
  postReviewFail,
  getReviewById,
  getReviewByIdSuccess,
  getReviewByIdFail,
} from '../actions/reviewAction'
import restConnector from '../../connectors/RestConnector'

function* getReviewByUserSaga({ payload }) {
  try {
    const { userId, bookId } = payload
    const { data: review } = yield call(restConnector.get,
      `/reviews?filter={"where":{"userId":"${userId}","bookId":"${bookId}"}}`)

    yield put(getReviewByUserSuccess(review[0]))
  } catch (error) {
    yield put(getReviewByUserFail(error))
  }
}

function* postReviewSaga({ payload }) {
  try {
    const { rating, images, content, reviewId, bookId } = payload
    if (reviewId) {
      yield call(restConnector.patch, `/reviews/${reviewId}`, {
        rating,
        images,
        content,
        bookId,
        attachUser: true
      })
    } else {
      yield call(restConnector.post, `/reviews`, {
        rating,
        images,
        content,
        bookId,
        attachUser: true
      })
    }
    yield put(postReviewSuccess())
    window.history.back()
  } catch (error) {
    yield put(postReviewFail(error))
  }
}

function* getReviewsOfBookSaga({ payload }) {
  try {
    const { userId, bookId, page = 0, limit = 5 } = payload

    const { data: reviewsData } = yield call(restConnector.get,
      `/books/${bookId}/reviews?filter={"skip":${page * limit},"limit":${limit},"order":"numberOfLike DESC"}`
    )

    const reviewsReply = yield all(
      reviewsData.map(review => call(restConnector.get, `/reviews/${review.id}/replyReviews/count`))
    )

    const reviewLike = yield all(
      reviewsData.map(review => call(restConnector.get, `/likeReviews?filter={"where":{"userId":"${userId}","reviewId":"${review.id}"}}`))
    )

    const userOfReviews = yield all(
      reviewsData.map(review => call(restConnector.get, `/reviews/${review.id}/user`))
    )

    const allData = reviewsData.map((review, index) => {
      const { name, avatar } = userOfReviews[index].data
      const numberOfReplies = reviewsReply[index].data.count
      return {
        ...review,
        name,
        avatar,
        numberOfReplies,
        likeReviewId: reviewLike[index].data[0] ? reviewLike[index].data[0].id : '',
        likeStatus: reviewLike[index].data[0] ? reviewLike[index].data[0].isLike : 0
      }
    })

    yield put(getReviewsOfBookSuccess(allData))
  } catch (error) {
    yield put(getReviewsOfBookFail(error))
  }
}

function* toggleLikeReviewSaga({ payload }) {
  try {
    const { reviewId, likeReviewId, likeStatus } = payload
    console.log(likeReviewId)
    let likeReviewResponse
    if (!likeReviewId) {
      likeReviewResponse = yield call(restConnector.post, `/likeReviews`, {
        reviewId,
        isLike: likeStatus,
        attachUser: true
      })
    } else {
      likeReviewResponse = yield call(restConnector.patch, `/likeReviews/${likeReviewId}`, {
        reviewId,
        isLike: likeStatus,
        attachUser: true
      })
    }

    yield put(toggleLikeReviewSuccess({
      reviewId,
      likeReviewId: likeReviewResponse.data.id
    }))
  } catch (error) {
    yield put(toggleLikeReviewFail(error))
  }
}

function* getReviewByIdSaga({ payload }) {
  try {
    const { userId, reviewId } = payload

    const { data: reviewData } = yield call(restConnector.get,
      `/reviews/${reviewId}`)

    const reviewReplyList = yield call(restConnector.get, `/reviews/${reviewId}/replyReviews`)

    const reviewLike = yield call(restConnector.get, `/likeReviews?filter={"where":{"userId":"${userId}","reviewId":"${reviewId}"}}`)
    const userOfReview = yield call(restConnector.get, `/reviews/${reviewId}/user`)
    const bookOfReview = yield call(restConnector.get, `/reviews/${reviewId}/book`)

    const userReply = yield all(
      reviewReplyList.data.map(reply => call(restConnector.get, `/replies/${reply.userId}/user`))
    )
    const replyLike = yield all(
      reviewReplyList.data.map(reply => call(restConnector.get, `/likeReplies?filter={"where":{"userId":"${userId}","replyId":"${reply.id}"}}`))
    )


    let replies
    reviewReplyList.data.map(reply => {
      userReply.map(user => {
        if (user.data.replyId === reply.id) {
          replies.push({
            reply,
            avatar: user.data.avatar,
            name: user.data.name
          })
        }
      })
    })

    const { avatar, name } = userOfReview.data
    const { image } = bookOfReview.data
    const allData = {
      name,
      avatar,
      bookName: bookOfReview.data.name,
      image,
      replies,
      review: { ...reviewData },
      likeReviewId: reviewLike.data[0] ? reviewLike.data[0].id : '',
      likeStatus: reviewLike.data[0] ? reviewLike.data[0].isLike : 0
    }
    console.log(allData)
    yield put(getReviewByIdSuccess(allData))
  } catch (error) {
    yield put(getReviewByIdFail(error))
  }
}

function* getReviewByUserWatcher() {
  yield takeLatest(getReviewByUser, getReviewByUserSaga)
}

function* postReviewWatcher() {
  yield takeLatest(postReview, postReviewSaga)
}

function* getReviewsOfBookWatcher() {
  yield takeLatest(getReviewsOfBook, getReviewsOfBookSaga)
}

function* toggleLikeReviewWatcher() {
  yield takeLatest(toggleLikeReview, toggleLikeReviewSaga)
}

function* getReviewByIdWatcher() {
  yield takeLatest(getReviewById, getReviewByIdSaga)
}

export {
  postReviewWatcher,
  getReviewByUserWatcher,
  getReviewsOfBookWatcher,
  toggleLikeReviewWatcher,
  getReviewByIdWatcher
}