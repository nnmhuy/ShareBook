import { createActions } from 'redux-actions'


const {
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
} = createActions(
  'GET_REVIEW_BY_USER',
  'GET_REVIEW_BY_USER_SUCCESS',
  'GET_REVIEW_BY_USER_FAIL',
  'GET_REVIEW_BY_ID',
  'GET_REVIEW_BY_ID_SUCCESS',
  'GET_REVIEW_BY_ID_FAIL',
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
  toggleLikeReviewFail
}