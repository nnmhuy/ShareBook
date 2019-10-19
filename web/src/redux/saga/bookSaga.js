import { call, put, takeLatest, takeEvery, all } from 'redux-saga/effects'
import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import axios from 'axios'
import { warnAlert} from '../../components/alert'
import filterText from '../../helper/filterText'

import {
  getBookList,
  getBookListSuccess,
  getBookListFail,
  getBookSearch,
  getBookSearchSuccess,
  getBookSearchFail,
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
  createBookFail,
  editBook,
  editBookSuccess,
  editBookFail,
  getBookmarkedLite,
  getBookmarkedLiteSuccess,
  getBookmarkedLiteFail
} from '../actions/bookAction'
import { getBookInstances } from '../actions/bookInstanceAction'
import { getReviewsOfBook } from '../actions/reviewAction'
import restConnector from '../../connectors/RestConnector'

import { numberOfReviewsPerPage, numberOfBookInstancesPerPage } from '../../constants/constants'


function* getBookListSaga({ payload }) {
  try {
    let { where, skip, limit, order, include, key, userId, fields, lite } = payload
    let newFields = {
      id: true,
      name: true,
      author: true,
      numberOfRating: true,
      totalOfRating: true,
      rating: true,
      numberOfUse: true,
      totalOfBookInstance: true,
      image: true
    }
    newFields = {
      ...newFields,
      ...fields
    }
    let filter = { where, skip, limit, order, include, fields: newFields }
    const response = yield call(restConnector.get, `/books?filter=${JSON.stringify(filter)}`)
    let bookList = get(response, 'data', [])
    // lite is get bookmark or not
    if (!lite) {
      let bookIdList = [] 
      bookList.forEach(book => {
        bookIdList.push(book.id)
      })
      let whereBookmark = {
        userId: userId,
        bookId: {inq: bookIdList}
      }
      let filterBookmark = {where: whereBookmark}
      const bookmarkResponse = yield call(restConnector.get, `/bookmarks?filter=${JSON.stringify(filterBookmark)}`)
      const isUserBookmarked = bookmarkResponse.data
    
      const bookFullData = bookList.map((book, index) => {
        let bookIndex = findIndex(isUserBookmarked, (instance) => {
          return instance.bookId === book.id
        })
        if (bookIndex > -1) {
          return {...book,
            bookmarkId: isUserBookmarked[bookIndex] ? isUserBookmarked[bookIndex].id : '',
            isBookmarked: (isUserBookmarked[bookIndex] || {}).isActive}
        } else {
          return {
            ...book,
            bookmarkId: '',
            isBookmarked: null
          }
        }
      })
      yield put(getBookListSuccess({bookList: bookFullData, key}))
    } else {
      yield put(getBookListSuccess({bookList: bookList, key, updatedAtForSearch: Date.now()}))
    }
  } catch (error) {
    yield put(getBookListFail(error))
  }
}

function getGGBookSearch(url) {
  return axios.request({
    method: 'get',
    url: url
  });
}

function* getBookSearchSaga({ payload }) {
  try {
    let { where, skip, limit, order, include, fields, fullText } = payload
    let filter = { where, skip, limit, order, include, fields }
    const response = yield call(restConnector.get, `/books?filter=${JSON.stringify(filter)}`)
    let bookList = get(response, 'data', [])
    let ggBookList = yield call(getGGBookSearch, `https://www.googleapis.com/books/v1/volumes?q=${fullText}&maxResults=4`);
    let newBookSearchList = ggBookList.data.items.map(oneElement => {
      let description = (get(oneElement, 'volumeInfo.subtitle') || '') + ' ' +  get(oneElement, 'volumeInfo.description' ,'')
      get(oneElement, 'volumeInfo.categories', []).forEach(element => {
        description += ' #' + element
      })
      let author = ''
      get(oneElement, 'volumeInfo.authors', ['']).forEach(element => {
        author += element + ' '
      })
      let image = get(oneElement, 'volumeInfo.imageLinks.thumbnail', '/containers/defaultContainer/download/defaultBook.png')
      let numberOfPages = get(oneElement, 'volumeInfo.pageCount', 0)
      let name = get(oneElement, 'volumeInfo.title', 'Tên bị lỗi')
      if (name.length > 70) {
        name = name.substr(0, 69) + '...'
      }
      let publisher = get(oneElement, 'volumeInfo.publisher', null) 
      let price = get(oneElement, 'saleInfo.listPrice.amount', null) || get(oneElement, 'saleInfo.retailPrice.amount', null)
      let publishYear = get(oneElement, 'volumeInfo.publishedDate', null)

      return {
        description,
        author,
        image,
        numberOfPages,
        name,
        publisher,
        price,
        publishYear,
        fromGG: true
      }
    })
    newBookSearchList = newBookSearchList.filter((element) => {
      let checkConflict = false
      bookList.forEach(oldBook => {
        let oldName = filterText(oldBook.name)
        let newName = filterText(element.name)
        if (oldName.indexOf(newName) > -1 || newName.indexOf(oldName) > -1) {
          checkConflict = true
        }
      })
      return !checkConflict
    })
    bookList = bookList.concat(newBookSearchList)
    yield put(getBookSearchSuccess({bookList: bookList, updatedAtForSearch: Date.now()}))
  } catch (error) {
    yield put(getBookSearchFail(error))
  }
}

function* getCategoryListSaga({ payload }) {
  try {
    const skipAllBook = get(payload, 'skipAllBook', false)
    const response = yield call(restConnector.get, '/categories')
    let categoryList = get(response, 'data', [])
    categoryList.sort((pre, suf) => {
      if (pre.name === 'Chưa xác định') return 1
      if (suf.name === 'Chưa xác định') return -1 
      return pre.id-suf.id
    })
    if (!skipAllBook) {
      let allCategory = { name: 'Tất cả sách', url: '/category/all', image: '/containers/defaultContainer/download/logo.png', totalOfBook: 0, id: 'all' }
      categoryList.forEach(element => {
        allCategory.totalOfBook += element.totalOfBook
      });
      categoryList.unshift(allCategory)
    }
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
    yield put(getBookOfCategory({ categoryId: bookData.categoryId, userId }))
    yield put(getBookInstances({ bookId: bookData.id, page: 0, limit: numberOfBookInstancesPerPage }))
    yield put(getReviewsOfBook({ userId, bookId: bookData.id, page: 0, limit: numberOfReviewsPerPage }))    
  } catch (error) {
    yield put(getBookInfoFail(error))
  }
}

function* getBookOfCategorySaga({ payload }) {
  try {
    const { categoryId, userId } = payload
    const { data: categoryData } = yield call(restConnector.get, `/categories/${categoryId}`)
    const { data: bookOfCategoryData } = yield call(restConnector.get, `/categories/${categoryId}/books?filter={"limit":12,"orderBy":"numberOfRating DESC"}`)

    let bookIdList = [] 
    bookOfCategoryData.forEach(book => {
        bookIdList.push(book.id)
    })
    let whereBookmark = {
      userId: userId,
      bookId: {inq: bookIdList}
    }
    let filterBookmark = {where: whereBookmark}
    const bookmarkResponse = yield call(restConnector.get, `/bookmarks?filter=${JSON.stringify(filterBookmark)}`)
    const isUserBookmarked = bookmarkResponse.data
    
    const allData = bookOfCategoryData.map((book, index) => {
        let bookIndex = findIndex(isUserBookmarked, (instance) => {
          return instance.bookId === book.id
        })
        if (bookIndex > -1) {
          return {...book,
            bookmarkId: isUserBookmarked[bookIndex] ? isUserBookmarked[bookIndex].id : '',
            isBookmarked: (isUserBookmarked[bookIndex] || {}).isActive}
        } else {
          return {
            ...book,
            bookmarkId: '',
            isBookmarked: null
          }
        }
      })

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

function* editBookSaga({ payload }) {
  try {
    const { data: newBook } = yield call(restConnector.patch, `/books/${payload.id}`, { ...payload })
    window.location = `/book-detail/${newBook.id}`
    yield put(editBookSuccess())
  } catch (error) {
    yield put(editBookFail())
  }
}

function* getBookmarkedLiteSaga({ payload }) {
  try {
    const { userId } = payload
    let bookmarkedData = []

    const whereBookmarked = {
      where: {
        isActive: 'true'
      },
      order: 'updatedAt DESC'
    }

    const { data: bookmarked } = yield call(restConnector.get, `/users/${userId}/bookmarks?filter=${JSON.stringify(whereBookmarked)}`)
    const bookData = yield all(
      bookmarked.map(book => call(restConnector.get, `/books/${book.bookId}`))
    )
    bookData.forEach((book, index) => {
      const bookObj = {
        id: book.data.id,
        name: book.data.name,
        image: book.data.image,
        bookmarked: bookmarked[index].isActive
      }
      bookmarkedData.push(bookObj)
    })
    
    yield put(getBookmarkedLiteSuccess(bookmarkedData))
  } catch (error) {
    yield put(getBookmarkedLiteFail())
  }
}

function* getBookListWatcher() {
  yield takeEvery(getBookList, getBookListSaga)
}

function* getBookSearchWatcher() {
  yield takeEvery(getBookSearch, getBookSearchSaga)
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

function* editBookWatcher() {
  yield takeLatest(editBook, editBookSaga)
}

function* getBookmarkedLiteWatcher() {
  yield takeLatest(getBookmarkedLite, getBookmarkedLiteSaga)
}

export {
  getBookListWatcher,
  getBookSearchWatcher,
  getCategoryListWatcher,
  getBookLiteWatcher,
  getBookInfoWatcher,
  getBookOfCategoryWatcher,
  toggleBookmarkWatcher,
  createBookWatcher,
  editBookWatcher,
  getBookmarkedLiteWatcher
}