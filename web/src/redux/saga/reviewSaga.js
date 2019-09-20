import { call, put, takeLatest, all } from 'redux-saga/effects'

import {
  getReviewsOfBook,
  getReviewsOfBookSuccess,
  getReviewsOfBookFail,
  toggleLikeReview,
  toggleLikeReviewSuccess,
  toggleLikeReviewFail
} from '../actions/reviewAction'
import restConnector from '../../connectors/RestConnector'

function* getReviewsOfBookSaga({ payload }) {
  try {
    const { userId, bookId, page=0, limit=5 } = payload

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
      const { username, avatar } = userOfReviews[index].data
      const numberOfReplies = reviewsReply[index].data.count
      return {
        ...review,
        username,
        avatar,
        numberOfReplies,
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
    const { reviewId, likeStatus } = payload

    yield call(restConnector.put, `/likeReviews`,
      {
        reviewId,
        isLike: likeStatus,
        attachUser: true
      }
    )


    yield put(toggleLikeReviewSuccess())
  } catch (error) {
    yield put(toggleLikeReviewFail(error))
  }
}

function* getReviewsOfBookWatcher() {
  yield takeLatest(getReviewsOfBook, getReviewsOfBookSaga)
}

function* toggleLikeReviewWatcher() {
  yield takeLatest(toggleLikeReview, toggleLikeReviewSaga)
}

export {
  getReviewsOfBookWatcher,
  toggleLikeReviewWatcher
}