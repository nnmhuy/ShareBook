import { createActions } from 'redux-actions'


const {
  getReviewsOfBook,
  getReviewsOfBookSuccess,
  getReviewsOfBookFail,
} = createActions(
  'GET_REVIEWS_OF_BOOK',
  'GET_REVIEWS_OF_BOOK_SUCCESS',
  'GET_REVIEWS_OF_BOOK_FAIL'
)



export {
  getReviewsOfBook,
  getReviewsOfBookSuccess,
  getReviewsOfBookFail
}