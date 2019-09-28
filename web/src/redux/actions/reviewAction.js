import { createActions } from 'redux-actions'


const {
  getReviewByUser,
  getReviewByUserSuccess,
  getReviewByUserFail,
  getReview,
  getReviewSuccess,
  getReviewFail,
  postReview,
  postReviewSuccess,
  postReviewFail,
  getReviewsOfBook,
  getReviewsOfBookSuccess,
  getReviewsOfBookFail,
  toggleLikeReview,
  toggleLikeReviewSuccess,
  toggleLikeReviewFail,
} = createActions(
  'GET_REVIEW_BY_USER',
  'GET_REVIEW_BY_USER_SUCCESS',
  'GET_REVIEW_BY_USER_FAIL',
  'GET_REVIEW',
  'GET_REVIEW_SUCCESS',
  'GET_REVIEW_FAIL',
  'POST_REVIEW',
  'POST_REVIEW_SUCCESS',
  'POST_REVIEW_FAIL',
  'GET_REVIEWS_OF_BOOK',
  'GET_REVIEWS_OF_BOOK_SUCCESS',
  'GET_REVIEWS_OF_BOOK_FAIL',
  'TOGGLE_LIKE_REVIEW',
  'TOGGLE_LIKE_REVIEW_SUCCESS',
  'TOGGLE_LIKE_REVIEW_FAIL',
)



export {
  getReviewByUser,
  getReviewByUserSuccess,
  getReviewByUserFail,
  getReview,
  getReviewSuccess,
  getReviewFail,
  postReview,
  postReviewSuccess,
  postReviewFail,
  getReviewsOfBook,
  getReviewsOfBookSuccess,
  getReviewsOfBookFail,
  toggleLikeReview,
  toggleLikeReviewSuccess,
  toggleLikeReviewFail
}