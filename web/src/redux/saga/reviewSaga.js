import { call, put, takeLatest, all } from 'redux-saga/effects'
import findIndex from 'lodash/findIndex'

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
  toggleLikeSingleReview,
  toggleLikeSingleReviewSuccess,
  toggleLikeSingleReviewFail,
  getAllReviews,
  getAllReviewsSuccess,
  getAllReviewsFail
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
      // reviewsData.map(review => call(restConnector.get, `/reviews/${review.id}/replyReviews/count`))
      reviewsData.map(review => call(restConnector.get, `/replies?filter={"where":{"reviewId":${JSON.stringify(review.id)}}}`))
    )

    let reviewIdList = []
    reviewsData.forEach(instance => {
      reviewIdList.push(instance.id)
    })
    let whereLikeReview = {
      userId: userId,
      reviewId: { inq: reviewIdList }
    }
    let filterLikeReview = { where: whereLikeReview }
    const { data: likeList } = yield call(restConnector.get, `/likeReviews?filter=${JSON.stringify(filterLikeReview)}`)

    let userIdList = []
    reviewsData.forEach(instance => {
      userIdList.push(instance.userId)
    })
    let whereUserReview = {
      id: { inq: userIdList }
    }
    let filterUserReview = { where: whereUserReview }
    const { data: userList } = yield call(restConnector.get, `/users?filter=${JSON.stringify(filterUserReview)}`)

    const allData = reviewsData.map((review, index) => {
      let userIndex = findIndex(userList, (oneUser) => {
        return review.userId === oneUser.id
      })

      let name = '', avatar = ''
      if (userIndex > -1) {
        name = userList[userIndex].name
        avatar = userList[userIndex].avatar
      }

      let likeIndex = findIndex(likeList, (oneLike) => {
        return review.id === oneLike.reviewId
      })

      let likeReviewId = '', likeStatus = 0
      if (likeIndex > -1) {
        likeReviewId = likeList[likeIndex].id
        likeStatus = likeList[likeIndex].isLike
      }

      // const numberOfReplies = reviewsReply[index].data.count
      const numberOfReplies = reviewsReply[index].data.length
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

function* toggleLikeSingleReviewSaga({ payload }) {
  try {
    const { type, reviewId, likeReviewId, likeStatus } = payload
    let likeReviewResponse = {}
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

    yield put(toggleLikeSingleReviewSuccess({
      type,
      reviewId,
      likeReviewId: likeReviewResponse.data.id
    }))
  } catch (error) {
    yield put(toggleLikeSingleReviewFail(error))
  }
}

function* getReviewByIdSaga({ payload }) {
  try {
    const { userId, reviewId } = payload

    const { data: reviewData } = yield call(restConnector.get,
      `/reviews/${reviewId}`)

    const reviewLike = yield call(restConnector.get, `/likeReviews?filter={"where":{"userId":"${userId}","reviewId":"${reviewId}"}}`)
    const userOfReview = yield call(restConnector.get, `/reviews/${reviewId}/user`)
    const bookOfReview = yield call(restConnector.get, `/reviews/${reviewId}/book`)

    const { avatar, name } = userOfReview.data
    const { image } = bookOfReview.data
    const allData = {
      name,
      avatar,
      bookName: bookOfReview.data.name,
      bookId: bookOfReview.data.id,
      image,
      ...reviewData,
      likeReviewId: reviewLike.data[0] ? reviewLike.data[0].id : '',
      likeStatus: reviewLike.data[0] ? reviewLike.data[0].isLike : 0
    }
    yield put(getReviewByIdSuccess(allData))
  } catch (error) {
    yield put(getReviewByIdFail(error))
  }
}

function* getAllReviewsSaga({payload}) {
  try {
    const { userId } = payload;
    // let allReviews = []
    const { data: allReviews } = yield call(restConnector.get,
      `/reviews?filter={"where":{"userId": {"neq":${JSON.stringify(userId)}}},"order":"createdAt DESC"}`)

    let curData = []
    //assign review
    allReviews.forEach((review, index) => {
      curData.push({review: review, reply: []})
    })

    //get reviewLikes
    const reviewLike = yield all(
      curData.map((data) =>
        call(restConnector.get, `/likeReviews?filter={"where":{"userId":"${userId}","reviewId":"${data.review.id}"}}`)
      )
    )
      
    //get reviewUsers
    const userOfReview = yield all(
      curData.map((data) =>
        call(restConnector.get, `/reviews/${data.review.id}/user`)
      )
    )

    //get reviewBook
    const bookOfReview = yield all(
      curData.map((data) =>
        call(restConnector.get, `/reviews/${data.review.id}/book`)
      )
    )

    //get reviewReplies
    const reviewsReply = yield all(
      curData.map((data, index) =>
        call(restConnector.get, `/replies?filter={"where":{"reviewId":${JSON.stringify(data.review.id)}}}`)
      )
    )
    
    //assign replies, book, users, like
    curData.forEach((data, index) => {
      data.reply = reviewsReply[index].data
      data.review.bookName = bookOfReview[index].data.name
      data.review.bookId = bookOfReview[index].data.id
      data.review.image = bookOfReview[index].data.image
      data.review.name = userOfReview[index].data.name
      data.review.avatar = userOfReview[index].data.avatar
      data.review.replyLength = reviewsReply[index].data.length

      if (reviewLike[index].data[0]) {
        data.review.likeReviewId = reviewLike[index].data[0].id
        data.review.likeStatus = reviewLike[index].data[0].isLike
      } else {
        data.review.likeReviewId = ''
        data.review.likeStatus = 0
      }
    })

    yield put(getAllReviewsSuccess(curData))
  } catch (error) {
    yield put(getAllReviewsFail(error))
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

function* toggleLikeSingleReviewWatcher() {
  yield takeLatest(toggleLikeSingleReview, toggleLikeSingleReviewSaga)
}

function* getReviewByIdWatcher() {
  yield takeLatest(getReviewById, getReviewByIdSaga)
}

function* getAllReviewsWatcher() {
  yield takeLatest(getAllReviews, getAllReviewsSaga)
}

export {
  postReviewWatcher,
  getReviewByUserWatcher,
  getReviewsOfBookWatcher,
  toggleLikeReviewWatcher,
  getReviewByIdWatcher,
  toggleLikeSingleReviewWatcher,
  getAllReviewsWatcher
}