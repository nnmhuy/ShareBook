import { call, put, takeLatest, all, takeEvery } from 'redux-saga/effects'
import _ from 'lodash'
import { warnAlert} from '../../components/alert'

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
  toggleBookmarkFail,
  createBook,
  createBookSuccess,
  createBookFail
} from '../actions/bookAction'
import restConnector from '../../connectors/RestConnector'

function* getBookListSaga({ payload }) {
  try {
    let { where, skip, limit, order, include, key, userId } = payload
    let filter = { where, skip, limit, order, include }
    const response = yield call(restConnector.get, `/books?filter=${JSON.stringify(filter)}`)
    let bookList = _.get(response, 'data', [])

    const isUserBookmarked = yield all(
      bookList.map(book => call(restConnector.get, `/books/${book.id}/bookmarks?filter={"where":{"userId":"${userId}"}}`))
    )

    const bookFullData = bookList.map((book, index) => ({
      ...book,
      bookmarkId: isUserBookmarked[index].data[0] ? isUserBookmarked[index].data[0].id : '',
      isBookmarked: (isUserBookmarked[index].data[0] || {}).isActive
    }))
    yield put(getBookListSuccess({bookList: bookFullData, key}))
  } catch (error) {
    yield put(getBookListFail(error))
  }
}

function* getCategoryListSaga({ payload }) {
  try {
    const response = yield call(restConnector.get, '/categories')
    let categoryList = _.get(response, 'data', [])
    yield put(getCategoryListSuccess(categoryList));
  } catch (error) {
    warnAlert('Hệ thống hoặc kết nối của bạn bị lỗi');
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

function* createBookSaga({ payload }) {
  try {
    const { data: newBook } = yield call(restConnector.post, '/books', { ...payload })
    window.location = `/book-detail/${newBook.id}`
    yield put(createBookSuccess())
  } catch (error) {
    yield put(createBookFail())
  }
}

function* getBookListWatcher() {
  yield takeEvery(getBookList, getBookListSaga)
}

function* getCategoryListWatcher() {
  yield takeLatest(getCategoryList, getCategoryListSaga)
}

function* getBookLiteWatcher() {
  yield takeLatest(getBookLite, getBookLiteSaga)
}

function* getBookInfoWatcher() {
  yield takeEvery(getBookInfo, getBookInfoSaga)
}

function* getBookOfCategoryWatcher() {
  yield takeLatest(getBookOfCategory, getBookOfCategorySaga)
}

function* toggleBookmarkWatcher() {
  yield takeLatest(toggleBookmark, toggleBookmarkSaga)
}

function* createBookWatcher() {
  yield takeLatest(createBook, createBookSaga)
}

export {
  getBookListWatcher,
  getCategoryListWatcher,
  getBookLiteWatcher,
  getBookInfoWatcher,
  getBookOfCategoryWatcher,
  toggleBookmarkWatcher,
  createBookWatcher
}