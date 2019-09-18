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
  getBookInfoFail
} from '../actions/bookAction'

let defaultState = {
  isLoading: false,
  error: null
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
    [getBookInfoSuccess]: (state) => {
      return {
        isLoading: false,
        error: null
      }
    },
    [getBookInfoFail]: (state, { payload: error }) => {
      return {
        isLoading: false,
        error: error
      }
    }
  },
  defaultState
)

export default bookReducer