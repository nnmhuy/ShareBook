import { handleActions } from 'redux-actions'

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

let defaultState = {
  isLoading: false,
  isLoadingCategory: false,
  error: null,
  bookDetail: {
    numberOfRating: 0,
    totalOfRating: 0,
    numberOfBookInstances: 0,
    numberOfReviews: 0,
    numberOfBookmarks: 0
  },
  category: {
    name: '',
    id: '',
    url: ''
  },
  bookOfCategory: [],
  isLoadingBookLite: false,
  bookLite: {}
}

const bookReducer = handleActions(
  {
    [getBookList]: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [getBookListSuccess]: (state) => {
      return {
        ...state,
        error: null,
        isLoading: false
      }
    },
    [getBookListFail]: (state, { payload: error }) => {
      return {
        ...state,
        error,
        isLoading: false
      }
    },
    [getCategoryList]: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    [getCategoryListSuccess]: (state, { payload } ) => {
      return {
        ...state,
        isLoading: false,
        error: null
      }
    },
    [getCategoryListFail]: (state, { payload: error }) => {
      return {
        ...state,
        isLoading: false,
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

      return {
        ...state,
        bookDetail,
        bookOfCategory
      }
    },
    [toggleBookmarkSuccess]: (state, { payload: { bookId, bookmarkId } }) => {
      const bookDetail = JSON.parse(JSON.stringify(state.bookDetail))
      const bookOfCategory = JSON.parse(JSON.stringify(state.bookOfCategory))
      if (bookDetail.id === bookId) {
        bookDetail.bookmarkId = bookmarkId
      }
      bookOfCategory.forEach(book => {
        if (book.id === bookId) {
          book.bookmarkId = bookmarkId
        }
      })
      return {
        ...state,
        bookDetail,
        bookOfCategory
      }
    },
    [toggleBookmarkFail]: (state, { payload: error }) => {
      return {
        ...state,
        error: error
      }
    },
  },
  defaultState
)

export default bookReducer