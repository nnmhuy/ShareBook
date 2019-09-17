import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBookList,
  getBookListSuccess,
  getBookListFail,
  getCategoryList,
  getCategoryListSuccess,
  getCategoryListFail,
  getBookInfo,
  getBookInfoSuccess,
  getBookInfoFail
} from '../actions/bookAction'
import restConnector from '../../connectors/RestConnector'

function* getBookListSaga({ payload }) {
  try {
    // const data = yield call(restConnector.post, '/users/login', payload)
    yield put(getBookListSuccess())
  } catch (error) {
    yield put(getBookListFail(error))
  }
}

function* getCategoryListSaga({ payload }) {
  try {
    // const data = yield call(restConnector.post, '/users/login', payload)
    yield put(getCategoryListSuccess())
  } catch (error) {
    yield put(getCategoryListFail(error))
  }
}
function* getBookInfoSaga({ payload }) {
  try {
    const { bookId } = payload
    const { data: bookData } = yield call(restConnector.get, `/books/${bookId}`)
    const { data: categoryData } = yield call(restConnector.get, `/books/${bookId}/category`)
    const { data: bookmarkData } = yield call(restConnector.get, `/books/${bookId}/bookmarks/count`)

    const data = {
      ...bookData,
      category: categoryData.name,
      categoryUrl: categoryData.url,
      number_of_bookmark: bookmarkData.count
    }

    yield put(getBookInfoSuccess(data))
  } catch (error) {
    yield put(getBookInfoFail(error))
  }
}

function* getBookListWatcher() {
  yield takeLatest(getBookList, getBookListSaga)
}

function* getCategoryListWatcher() {
  yield takeLatest(getCategoryList, getCategoryListSaga)
}

function* getBookInfoWatcher() {
  yield takeLatest(getBookInfo, getBookInfoSaga)
}

export {
  getBookListWatcher,
  getCategoryListWatcher,
  getBookInfoWatcher
}