import { handleActions } from 'redux-actions'

import {
  getReviewsOfBook,
  getReviewsOfBookSuccess,
  getReviewsOfBookFail,
} from '../actions/reviewAction'

let defaultState = {
  isLoading: false,
  error: null,
  reviewsOfBook: [],
  totalNumberOfReview: 0
}

const bookReducer = handleActions(
  {
    [getReviewsOfBook]: (state) => {
      return {
        ...state,
        isLoading: true,
      }
    },
    [getReviewsOfBookSuccess]: (state, { payload }) => {
      return {
        isLoading: false,
        reviewsOfBook: payload,
        error: null
      }
    },
    [getReviewsOfBookFail]: (state, { payload: error }) => {
      return {
        isLoading: false,
        error: error
      }
    }
  },
  defaultState
)

export default bookReducer