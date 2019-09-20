import { call, put, takeLatest, all } from 'redux-saga/effects'

import {
  getReviewsOfBook,
  getReviewsOfBookSuccess,
  getReviewsOfBookFail
} from '../actions/reviewAction'
import restConnector from '../../connectors/RestConnector'

function* getReviewsOfBookSaga({ payload }) {
  try {
    const { userId, bookId, page=0, limit=5 } = payload

    const { data: reviewsData } = yield call(restConnector.get, 
      `/reviews?filter={"where":{"bookId":"${bookId}"},"skip":${page * limit},"limit":${limit},"order":"numberOfLike DESC"}`
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

function* getReviewsOfBookWatcher() {
  yield takeLatest(getReviewsOfBook, getReviewsOfBookSaga)
}

export {
  getReviewsOfBookWatcher
}