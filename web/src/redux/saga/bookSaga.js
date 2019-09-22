import { call, put, takeLatest, all } from 'redux-saga/effects'

import {
  getBookList,
  getBookListSuccess,
  getBookListFail,
  getCategoryList,
  getCategoryListSuccess,
  getCategoryListFail,
  getBookLite,
  getBookLiteSuccess,
  getBookLiteFail,
  getBookInfo,
  getBookInfoSuccess,
  getBookInfoFail,
  getBookOfCategory,
  getBookOfCategorySuccess,
  getBookOfCategoryFail,
  toggleBookmark,
  toggleBookmarkSuccess,
  toggleBookmarkFail
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

function* getBookLiteSaga({ payload }) {
  try {
    const { bookId } = payload
    const { data } = yield call(restConnector.get, `/books/${bookId}`)
    yield put(getBookLiteSuccess(data))
  } catch (error) {
    yield put(getBookLiteFail(error))
  }
}

function* getBookInfoSaga({ payload }) {
  try {
    const { bookId, userId } = payload
    const { data: bookData } = yield call(restConnector.get, `/books/${bookId}`)
    yield put(getBookOfCategory({ categoryId: bookData.categoryId, userId }))
    const { data: bookmarkData } = yield call(restConnector.get, `/books/${bookId}/bookmarks/count?where={"isActive":true}`)
    const { data: numberOfReviews } = yield call(restConnector.get, `/books/${bookId}/reviews/count`)
    const { data: numberOfBookInstances } = yield call(restConnector.get, `/books/${bookId}/bookInstances/count`)
    const { data: bookmark } = yield call(restConnector.get, `/books/${bookId}/bookmarks?filter={"where":{"userId":"${userId}"}}`)

    const data = {
      ...bookData,
      numberOfBookmarks: bookmarkData.count,
      numberOfReviews: numberOfReviews.count,
      numberOfBookInstances: numberOfBookInstances.count,
      bookmarkId: bookmark[0] ? bookmark[0].id : '',
      isBookmarked: (bookmark[0] || {}).isActive ? true : false
    }

    yield put(getBookInfoSuccess(data))
  } catch (error) {
    yield put(getBookInfoFail(error))
  }
}

function* getBookOfCategorySaga({ payload }) {
  try {
    const { categoryId, userId } = payload
    const { data: categoryData } = yield call(restConnector.get, `/categories/${categoryId}`)
    const { data: bookOfCategoryData } = yield call(restConnector.get, `/categories/${categoryId}/books`)
    const isUserBookmarked = yield all(
      bookOfCategoryData.map(book => call(restConnector.get, `/books/${book.id}/bookmarks?filter={"where":{"userId":"${userId}"}}`))
    )

    const allData = bookOfCategoryData.map((book, index) => ({
      ...book,
      bookmarkId: isUserBookmarked[index].data[0] ? isUserBookmarked[index].data[0].id : '',
      isBookmarked: (isUserBookmarked[index].data[0] || {}).isActive
    }))

    const data = {
      category: {
        id: categoryId,
        name: categoryData.name,
        url: categoryData.url
      },
      bookOfCategory: allData
    }

    yield put(getBookOfCategorySuccess(data))
  } catch (error) {
    yield put(getBookOfCategoryFail(error))
  }
}

function* toggleBookmarkSaga({ payload }) {
  try {
    const { bookmarkId, bookId, isBookmarked } = payload
    let bookmarkResponse
    if (!bookmarkId) {
      bookmarkResponse = yield call(restConnector.post, `/bookmarks`, {
        bookId,
        isActive: isBookmarked,
        attachUser: true
      })
    } else {
      bookmarkResponse = yield call(restConnector.patch, `/bookmarks/${bookmarkId}`, {
        bookId,
        isActive: isBookmarked,
        attachUser: true
      })
    }

    yield put(toggleBookmarkSuccess({
      bookId,
      bookmarkId: bookmarkResponse.data.id
    }))
  } catch (error) {
    yield put(toggleBookmarkFail(error))
  }
}

function* getBookListWatcher() {
  yield takeLatest(getBookList, getBookListSaga)
}

function* getCategoryListWatcher() {
  yield takeLatest(getCategoryList, getCategoryListSaga)
}

function* getBookLiteWatcher() {
  yield takeLatest(getBookLite, getBookLiteSaga)
}

function* getBookInfoWatcher() {
  yield takeLatest(getBookInfo, getBookInfoSaga)
}

function* getBookOfCategoryWatcher() {
  yield takeLatest(getBookOfCategory, getBookOfCategorySaga)
}

function* toggleBookmarkWatcher() {
  yield takeLatest(toggleBookmark, toggleBookmarkSaga)
}

export {
  getBookListWatcher,
  getCategoryListWatcher,
  getBookLiteWatcher,
  getBookInfoWatcher,
  getBookOfCategoryWatcher,
  toggleBookmarkWatcher
}