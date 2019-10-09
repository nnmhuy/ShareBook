import { handleActions } from 'redux-actions'

import { 
  getBookInstances,
  getBookInstancesSuccess,
  getBookInstancesFail,
  createBookInstance,
  createBookInstanceSuccess,
  createBookInstanceFail,
  getBookInstanceById,
  getBookInstanceByIdSuccess,
  getBookInstanceByIdFail
} from '../actions/bookInstanceAction'

let defaultState = {
  isLoading: false,
  error: null,
  bookInstances: [],
  isCreating: false,
  bookInstance: {},
  isLoadingInstance: false
}

const bookReducer = handleActions(
  {
    [getBookInstances]: (state) => {
      return {
        ...state,
        isLoading: true,
      }
    },
    [getBookInstancesSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        bookInstances: payload,
        error: null
      }
    },
    [getBookInstancesFail]: (state, { payload: error }) => {
      return {
        ...state,
        isLoading: false,
        error: error
      }
    },
    [createBookInstance]: (state) => {
      return {
        ...state,
        isCreating: true,
      }
    },
    [createBookInstanceSuccess]: (state, { payload }) => {
      return {
        ...state,
        isCreating: false,
        error: null
      }
    },
    [createBookInstanceFail]: (state, { payload: error }) => {
      return {
        ...state,
        isCreating: false,
        error: error
      }
    },
    [getBookInstanceById]: (state) => {
      return {
        ...state,
        isLoadingInstance: true,
      }
    },
    [getBookInstanceByIdSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoadingInstance: false,
        bookInstance: payload,
        error: null
      }
    },
    [getBookInstanceByIdFail]: (state, { payload: error }) => {
      return {
        ...state,
        isLoadingInstance: false,
        error: error
      }
    },
  },
  defaultState
)

export default bookReducer