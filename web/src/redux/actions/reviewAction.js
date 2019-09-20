import { createActions } from 'redux-actions'


const {
  getReviewsOfBook,
  getReviewsOfBookSuccess,
  getReviewsOfBookFail,
  toggleLikeReview,
  toggleLikeReviewSuccess,
  toggleLikeReviewFail,
} = createActions(
  'GET_REVIEWS_OF_BOOK',
  'GET_REVIEWS_OF_BOOK_SUCCESS',
  'GET_REVIEWS_OF_BOOK_FAIL',
  'TOGGLE_LIKE_REVIEW',
  'TOGGLE_LIKE_REVIEW_SUCCESS',
  'TOGGLE_LIKE_REVIEW_FAIL',
)



export {
  getReviewsOfBook,
  getReviewsOfBookSuccess,
  getReviewsOfBookFail,
  toggleLikeReview,
  toggleLikeReviewSuccess,
  toggleLikeReviewFail
}