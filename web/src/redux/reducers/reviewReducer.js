import { handleActions } from 'redux-actions'

import {
  getReviewByUser,
  getReviewByUserSuccess,
  getReviewByUserFail,
  getReviewById,
  getReviewByIdSuccess,
  getReviewByIdFail,
  postReview,
  postReviewSuccess,
  postReviewFail,
  getReviewsOfBook,
  getReviewsOfBookSuccess,
  getReviewsOfBookFail,
  toggleLikeReview,
  toggleLikeReviewSuccess,
  toggleLikeReviewFail,
  toggleLikeSingleReview,
  toggleLikeSingleReviewSuccess,
  toggleLikeSingleReviewFail,
  getAllReviews,
  getAllReviewsSuccess,
  getAllReviewsFail
} from '../actions/reviewAction'

let defaultState = {
  isLoading: false,
  error: null,
  reviewsOfBook: [],
  totalNumberOfReview: 0,
  isLoadingReviewByUser: false,
  userReview: {},
  isPostingReview: false,
  isLoadingReviewById: false,
  review: {},
  allReviews: [],
  isLoadingAllReviews: false
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
    [toggleLikeReview]: (state, { payload: { reviewId, likeStatus } }) => {
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
        reviewsOfBook,
        error: null
      }
    },
    [toggleLikeReviewFail]: (state, { payload: error }) => {
      return {
        ...state,
        error
      }
    },
    [getReviewByUser]: (state) => {
      return {
        ...state,
        isLoadingReviewByUser: true,
        userReview: {}
      }
    },
    [getReviewByUserSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoadingReviewByUser: false,
        userReview: payload,
        error: null
      }
    },
    [getReviewByUserFail]: (state, { payload: error }) => {
      return {
        ...state,
        isLoadingReviewByUser: false,
        error: error
      }
    },
    [postReview]: (state) => {
      return {
        ...state,
        isPostingReview: true
      }
    },
    [postReviewSuccess]: (state) => {
      return {
        ...state,
        isPostingReview: false,
        error: null
      }
    },
    [postReviewFail]: (state, { payload: error }) => {
      return {
        ...state,
        isPostingReview: false,
        error: error
      }
    },
    [getReviewById]: (state) => {
      return {
        ...state,
        isLoadingReviewById: true
      }
    },
    [getReviewByIdSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoadingReviewById: false,
        review: payload,
        error: null
      }
    },
    [getReviewByIdFail]: (state, { payload: error }) => {
      return {
        ...state,
        isLoadingReviewById: false,
        error: error
      }
    },
    [toggleLikeSingleReview]: (state, { payload: { likeStatus } }) => {
      const review = JSON.parse(JSON.stringify(state.review))
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

      return {
        ...state,
        review
      }
    },
    [toggleLikeSingleReviewSuccess]: (state, { payload: { reviewId, likeReviewId } }) => {
      const review = JSON.parse(JSON.stringify(state.review))
      review.likeReviewId = likeReviewId
      return {
        ...state,
        review,
        error: null
      }
    },
    [toggleLikeSingleReviewFail]: (state, { payload: error }) => {
      return {
        ...state,
        error: error
      }
    },
    [getAllReviews]: (state) => {
      return {
        ...state,
        isLoadingAllReviews: true,
      }
    },
    [getAllReviewsSuccess]: (state, { payload }) => {
      return {
        isLoadingAllReviews: false,
        allReviews: payload,
        error: null
      }
    },
    [getAllReviewsFail]: (state, { payload: error }) => {
      return {
        isLoadingAllReviews: false,
        error: error
      }
    },
  },
  defaultState
)

export default bookReducer