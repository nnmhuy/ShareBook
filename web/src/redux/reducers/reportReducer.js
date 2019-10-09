import { handleActions } from 'redux-actions'

import {
  createReport,
  createReportSuccess,
  createReportFail
} from '../actions/reportAction'

let defaultState = {
  error: null,
  isCreating: false
}

const reportReducer = handleActions(
  {
    [createReport]: (state) => {
      return {
        ...state,
        isCreating: true,
      }
    },
    [createReportSuccess]: (state, { payload }) => {
      return {
        ...state,
        isCreating: false,
        error: null
      }
    },
    [createReportFail]: (state, { payload: error }) => {
      return {
        ...state,
        isCreating: false,
        error: error
      }
    }
  },
  defaultState
)

export default reportReducer