import { call, put, takeLatest, all } from 'redux-saga/effects'
import _ from 'lodash'

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
  postReviewFail
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
    const { userId, bookId, page=0, limit=5 } = payload

    const { data: reviewsData } = yield call(restConnector.get, 
      `/books/${bookId}/reviews?filter={"skip":${page * limit},"limit":${limit},"order":"numberOfLike DESC"}`
    )

    const reviewsReply = yield all(
      reviewsData.map(review => call(restConnector.get, `/reviews/${review.id}/replyReviews/count`))
    )

    let reviewIdList = [] 
    reviewsData.forEach(instance => {
      reviewIdList.push(instance.id)
    })
    let whereLikeReview = {
      userId: userId,
      reviewId: {inq: reviewIdList}
    }
    let filterLikeReview = {where: whereLikeReview}
    const { data: likeList } = yield call(restConnector.get, `/likeReviews?filter=${JSON.stringify(filterLikeReview)}`)

    let userIdList = [] 
    reviewsData.forEach(instance => {
      userIdList.push(instance.userId)
    })
    let whereUserReview = {
      id: {inq: userIdList}
    }
    let filterUserReview = {where: whereUserReview}
    const { data: userList } = yield call(restConnector.get, `/users?filter=${JSON.stringify(filterUserReview)}`)

    const allData = reviewsData.map((review, index) => {
      let userIndex = _.findIndex(userList, (oneUser) => {
        return review.userId === oneUser.id
      })

      let name = '', avatar = '' 
      if (userIndex > -1) {
        name = userList[userIndex].name
        avatar = userList[userIndex].avatar
      }

      let likeIndex = _.findIndex(likeList, (oneLike) => {
        return review.id === oneLike.reviewId
      })

      let likeReviewId = '', likeStatus = 0
      if (likeIndex > -1) {
        likeReviewId = likeList[likeIndex].id
        likeStatus = likeList[likeIndex].isLike
      }

      const numberOfReplies = reviewsReply[index].data.count
      return {
        ...review,
        name,
        avatar,
        numberOfReplies,
        likeReviewId: likeReviewId, 
        likeStatus: likeStatus
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

function* getReviewByUserWatcher() {
  yield takeLatest(getReviewByUser, getReviewByUserSaga)
}

function* postReviewWatcher(){
  yield takeLatest(postReview, postReviewSaga)
}

function* getReviewsOfBookWatcher() {
  yield takeLatest(getReviewsOfBook, getReviewsOfBookSaga)
}

function* toggleLikeReviewWatcher() {
  yield takeLatest(toggleLikeReview, toggleLikeReviewSaga)
}

export {
  postReviewWatcher,
  getReviewByUserWatcher,
  getReviewsOfBookWatcher,
  toggleLikeReviewWatcher
}