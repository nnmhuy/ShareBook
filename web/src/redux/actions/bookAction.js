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
  getBookInfoFail,
  getBookOfCategory,
  getBookOfCategorySuccess,
  getBookOfCategoryFail,
  toggleBookmark,
  toggleBookmarkSuccess,
  toggleBookmarkFail,
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
  'GET_BOOK_OF_CATEGORY',
  'GET_BOOK_OF_CATEGORY_SUCCESS',
  'GET_BOOK_OF_CATEGORY_FAIL',
  'TOGGLE_BOOKMARK',
  'TOGGLE_BOOKMARK_SUCCESS',
  'TOGGLE_BOOKMARK_FAIL',
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
  getBookInfoFail,
  getBookOfCategory,
  getBookOfCategorySuccess,
  getBookOfCategoryFail,
  toggleBookmark,
  toggleBookmarkSuccess,
  toggleBookmarkFail
}