import { createActions } from 'redux-actions'


const {
  getBookLite,
  getBookLiteSuccess,
  getBookLiteFail,
  getBookList,
  getBookListSuccess,
  getBookListFail,
  getBookSearch,
  getBookSearchSuccess,
  getBookSearchFail,
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
  createBook,
  createBookSuccess,
  createBookFail,
  editBook,
  editBookSuccess,
  editBookFail,
  getBookmarkedLite,
  getBookmarkedLiteSuccess,
  getBookmarkedLiteFail
} = createActions(
  'GET_BOOK_LITE',
  'GET_BOOK_LITE_SUCCESS',
  'GET_BOOK_LITE_FAIL',
  'GET_BOOK_LIST',
  'GET_BOOK_LIST_SUCCESS',
  'GET_BOOK_LIST_FAIL',
  'GET_BOOK_SEARCH',
  'GET_BOOK_SEARCH_SUCCESS',
  'GET_BOOK_SEARCH_FAIL',
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
  'CREATE_BOOK',
  'CREATE_BOOK_SUCCESS',
  'CREATE_BOOK_FAIL',
  'EDIT_BOOK',
  'EDIT_BOOK_SUCCESS',
  'EDIT_BOOK_FAIL',
  'GET_BOOKMARKED_LITE',
  'GET_BOOKMARKED_LITE_SUCCESS',
  'GET_BOOKMARKED_LITE_FAIL'
)



export {
  getBookLite,
  getBookLiteSuccess,
  getBookLiteFail,
  getBookList,
  getBookListSuccess,
  getBookListFail,
  getBookSearch,
  getBookSearchSuccess,
  getBookSearchFail,
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
  createBook,
  createBookSuccess,
  createBookFail,
  editBook,
  editBookSuccess,
  editBookFail,
  getBookmarkedLite,
  getBookmarkedLiteSuccess,
  getBookmarkedLiteFail
}