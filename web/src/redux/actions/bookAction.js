import { createActions } from 'redux-actions'


const {
  getBookList,
  getBookListSuccess,
  getBookListFail,
  getCategoryList,
  getCategoryListSuccess,
  getCategoryListFail,
  getBookInfo,
  getBookInfoSuccess,
  getBookInfoFail
} = createActions(
  'GET_BOOK_LIST',
  'GET_BOOK_LIST_SUCCESS',
  'GET_BOOK_LIST_FAIL',
  'GET_CATEGORY_LIST',
  'GET_CATEGORY_LIST_SUCCESS',
  'GET_CATEGORY_LIST_FAIL',
  'GET_BOOK_INFO',
  'GET_BOOK_INFO_SUCCESS',
  'GET_BOOK_INFO_FAIL',
)



export {
  getBookList,
  getBookListSuccess,
  getBookListFail,
  getCategoryList,
  getCategoryListSuccess,
  getCategoryListFail,
  getBookInfo,
  getBookInfoSuccess,
  getBookInfoFail
}