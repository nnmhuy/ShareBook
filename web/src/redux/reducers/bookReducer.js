import { handleActions } from 'redux-actions'
import _ from 'lodash'

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

let defaultState = {
  isLoading: false,
  categoryIsLoading: false,
  categoryList: [],
  isLoadingCategory: false,
  error: null,
  bookDetail: {
    numberOfRating: 0,
    totalOfRating: 0,
    numberOfBookInstances: 0,
    numberOfReviews: 0,
    numberOfBookmarks: 0
  },
  categories: null,
  category: {
    name: '',
    id: '',
    url: ''
  },
  bookOfCategory: [],
  isLoadingBookLite: false,
  bookLite: {},
  bookListIsLoading: {},
  bookListData: {},
  isCreating: false
}

const bookReducer = handleActions(
  {
    [getBookList]: (state, { payload: { key } }) => {
      let { bookListIsLoading } = state
      bookListIsLoading[key] = true
      return {
        ...state,
        bookListIsLoading
      }
    },
    [getBookListSuccess]: (state, { payload: { bookList, key } }) => {
      let { bookListIsLoading, bookListData } = state
      bookListIsLoading[key] = false
      bookListData[key] = bookList
      return {
        ...state,
        error: null,
        bookListIsLoading, 
        bookListData
      }
    },
    [getBookListFail]: (state, { payload: {error, key} }) => {
      let { bookListIsLoading } = state
      bookListIsLoading[key] = false
      return {
        ...state,
        error,
        bookListIsLoading
      }
    },
    [getCategoryList]: (state) => {
      return {
        ...state,
        categoryIsLoading: true
      }
    },
    [getCategoryListSuccess]: (state, { payload: categoryList } ) => {
      return {
        ...state,
        categoryList: categoryList,
        categoryIsLoading: false,
        error: null
      }
    },
    [getCategoryListFail]: (state, { payload: error }) => {
      return {
        ...state,
        categoryIsLoading: false,
        error
      }
    },
    [getBookLite]: (state) => {
      return {
        ...state,
        isLoadingBookLite: true
      }
    },
    [getBookLiteSuccess]: (state, { payload }) => {
      return {
        ...state,
        bookLite: payload,
        error: null,
        isLoadingBookLite: false
      }
    },
    [getBookLiteFail]: (state, { payload: error }) => {
      return {
        ...state,
        error,
        isLoadingBookLite: false
      }
    },
    [getBookInfo]: (state) => {
      return {
        ...state,
        isLoading: true,
      }
    },
    [getBookInfoSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        bookDetail: payload,
        error: null
      }
    },
    [getBookInfoFail]: (state, { payload: error }) => {
      return {
        ...state,
        isLoading: false,
        error: error
      }
    },
    [getBookOfCategory]: (state) => {
      return {
        ...state,
        isLoadingCategory: true,
      }
    },
    [getBookOfCategorySuccess]: (state, { payload: {category, bookOfCategory} }) => {
      return {
        ...state,
        isLoadingCategory: false,
        category,
        bookOfCategory,
        error: null
      }
    },
    [getBookOfCategoryFail]: (state, { payload: error }) => {
      return {
        ...state,
        isLoadingCategory: false,
        error: error
      }
    },
    [getBookInfoFail]: (state, { payload: error }) => {
      return {
        ...state,
        isLoading: false,
        error: error
      }
    },
    [toggleBookmark]: (state, { payload: { bookId, isBookmarked } }) => {
      const bookDetail = JSON.parse(JSON.stringify(state.bookDetail))
      const bookOfCategory= JSON.parse(JSON.stringify(state.bookOfCategory))
      const bookListData = JSON.parse(JSON.stringify(state.bookListData))

      if (bookDetail.id === bookId){
        bookDetail.isBookmarked = isBookmarked
        if (isBookmarked) {
          bookDetail.numberOfBookmarks += 1
        } else {
          bookDetail.numberOfBookmarks -= 1
        }
      }

      bookOfCategory.forEach(book => {
        if (book.id === bookId) {
          book.isBookmarked = isBookmarked
        }
      })

      _.forEach(bookListData, function (value, key) {
        if (value && value[0]) {
          value.forEach(book => {
            if (book.id === bookId) {
              book.isBookmarked = isBookmarked
            }
          })
        }
      })

      return {
        ...state,
        bookDetail,
        bookOfCategory,
        bookListData
      }
    },
    [toggleBookmarkSuccess]: (state, { payload: { bookId, bookmarkId } }) => {
      const bookDetail = JSON.parse(JSON.stringify(state.bookDetail))
      const bookOfCategory = JSON.parse(JSON.stringify(state.bookOfCategory))
      const bookListData = JSON.parse(JSON.stringify(state.bookListData))
      if (bookDetail.id === bookId) {
        bookDetail.bookmarkId = bookmarkId
      }
      bookOfCategory.forEach(book => {
        if (book.id === bookId) {
          book.bookmarkId = bookmarkId
        }
      })
      _.forEach(bookListData, function (value, key) {
        if (value && value[0]) {
          value.forEach(book => {
            if (book.id === bookId) {
              book.bookmarkId = bookmarkId
            }
          })
        }
      })
      return {
        ...state,
        bookDetail,
        bookOfCategory,
        bookListData
      }
    },
    [toggleBookmarkFail]: (state, { payload: error }) => {
      return {
        ...state,
        error: error
      }
    },
    [createBook]: (state) => {
      return {
        ...state,
        isCreating: true
      }
    },
    [createBookSuccess]: (state, { payload }) => {
      return {
        ...state,
        error: null,
        isCreating: false
      }
    },
    [createBookFail]: (state, { payload: error }) => {
      return {
        ...state,
        error,
        isCreating: false
      }
    },
  },
  defaultState
)

export default bookReducer