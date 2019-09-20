import { handleActions } from 'redux-actions'

import {
  getReviewsOfBook,
  getReviewsOfBookSuccess,
  getReviewsOfBookFail,
  toggleLikeReview,
  toggleLikeReviewSuccess,
  toggleLikeReviewFail
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
    },
    [toggleLikeReview]: (state, { payload: { reviewId, likeStatus }}) => {
      const reviewsOfBook = JSON.parse(JSON.stringify(state.reviewsOfBook))
      reviewsOfBook.forEach(review => {
        if (review.id === reviewId) {
          if (review.likeStatus === -1) {
            --review.numberOfDislike
          }
          if (review.likeStatus === 1) {
            --review.numberOfLike
          }
          if (likeStatus === -1) {
            ++review.numberOfDislike
          }
          if (likeStatus === 1) {
            ++review.numberOfLike
          }
          review.likeStatus = likeStatus
        }
      })
      return {
        ...state,
        reviewsOfBook
      }
    },
    [toggleLikeReviewSuccess]: (state, { payload: { reviewId, likeReviewId } }) => {
      const reviewsOfBook = JSON.parse(JSON.stringify(state.reviewsOfBook))
      reviewsOfBook.forEach(review => {
        if (review.id === reviewId) {
          review.likeReviewId = likeReviewId
        }
      })
      return {
        ...state,
        reviewsOfBook
      }
    },
    [toggleLikeReviewFail]: (state, { payload: error }) => {
      return {
        error: error
      }
    },
  },
  defaultState
)

export default bookReducer