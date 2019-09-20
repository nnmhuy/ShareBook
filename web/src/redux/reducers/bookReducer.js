import { handleActions } from 'redux-actions'

import { 
  getBookList,
  getBookListSuccess,
  getBookListFail,
  getCategoryList,
  getCategoryListSuccess,
  getCategoryListFail,
  getBookInfo,
  getBookInfoSuccess,
  getBookInfoFail,
  getBookOfCategory,
  getBookOfCategorySuccess,
  getBookOfCategoryFail,
  toggleBookmark
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
  bookOfCategory: []
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
    // [toggleBookmarkSuccess]: (state, { payload: { category, bookOfCategory } }) => {
    //   return {
    //     ...state,
    //     error: null
    //   }
    // },
    // [toggleBookmarkFail]: (state, { payload: error }) => {
    //   return {
    //     ...state,
    //     error: error
    //   }
    // },
  },
  defaultState
)

export default bookReducer