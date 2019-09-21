import { handleActions } from 'redux-actions'

import { 
  getBookInstances,
  getBookInstancesSuccess,
  getBookInstancesFail
} from '../actions/bookInstanceAction'

let defaultState = {
  isLoading: false,
  error: null,
  bookInstances: []
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
    }
  },
  defaultState
)

export default bookReducer