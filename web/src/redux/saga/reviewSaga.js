import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getReviewsOfBook,
  getReviewsOfBookSuccess,
  getReviewsOfBookFail
} from '../actions/reviewAction'
import restConnector from '../../connectors/RestConnector'

function* getReviewsOfBookSaga({ payload }) {
  try {
    const { bookId, page, limit } = payload

    const { data: reviewsData } = yield call(restConnector.get, 
      `/books/${bookId}/reviews?filter={"skip":${page * limit},"limit":${limit},"order":"numberOfLike DESC"}`
    )

    const data = {
    }

    yield put(getReviewsOfBookSuccess(data))
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