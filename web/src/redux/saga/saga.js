import { all } from 'redux-saga/effects';

import {
  logInLocalWatcher,
  getUserInfoWatcher,
  editUserInfoWatcher,
  getOtherUserInfoWatcher,
  logOutWatcher,
  signUpWatcher
} from './accountSaga'
import {
  getBookListWatcher,
  getCategoryListWatcher,
  getBookLiteWatcher,
  getBookInfoWatcher,
  getBookOfCategoryWatcher,
  toggleBookmarkWatcher,
  createBookWatcher,
  getBookSearchWatcher,
  editBookWatcher,
  getBookmarkedLiteWatcher
} from './bookSaga'
import {
  getBookInstancesWatcher,
  createBookInstanceWatcher,
  getBookInstanceByIdWatcher
} from './bookInstancesSaga'
import {
  getReviewByUserWatcher,
  getReviewsOfBookWatcher,
  toggleLikeReviewWatcher,
  toggleLikeSingleReviewWatcher,
  postReviewWatcher,
  getReviewByIdWatcher,
  getAllReviewsWatcher,
  getReviewLiteWatcher
} from './reviewSaga'
import {
  getTransactionWatcher,
  sendMessageWatcher,
  getMessagesWatcher,
  getTransactionsWatcher,
  requestStatusWatcher,
  initTransactionWatcher,
  changeDateTransactionWatcher
} from './transactionSaga'
import {
  getRepliesWatcher,
  postReplyWatcher,
  getReplyByIdWatcher,
  toggleLikeReplyWatcher
} from './replySaga'
import {
  createReportWatcher
} from './reportSaga'

export default function* rootSaga() {
  yield all([
    logInLocalWatcher(),
    getUserInfoWatcher(),
    editUserInfoWatcher(),
    getOtherUserInfoWatcher(),
    logOutWatcher(),
    signUpWatcher(),

    getBookListWatcher(),
    getBookSearchWatcher(),
    getCategoryListWatcher(),
    getBookLiteWatcher(),
    getBookInfoWatcher(),
    getBookOfCategoryWatcher(),
    toggleBookmarkWatcher(),
    createBookWatcher(),
    editBookWatcher(),
    getBookmarkedLiteWatcher(),

    getBookInstancesWatcher(),
    createBookInstanceWatcher(),
    getBookInstanceByIdWatcher(),

    getReviewByUserWatcher(),
    postReviewWatcher(),
    getReviewsOfBookWatcher(),
    toggleLikeReviewWatcher(),
    getReviewByIdWatcher(),
    toggleLikeSingleReviewWatcher(),
    getAllReviewsWatcher(),
    getReviewLiteWatcher(),

    getTransactionWatcher(),
    sendMessageWatcher(),
    getTransactionsWatcher(),
    getMessagesWatcher(),
    requestStatusWatcher(),
    initTransactionWatcher(),
    changeDateTransactionWatcher(),

    getRepliesWatcher(),
    postReplyWatcher(),
    getReplyByIdWatcher(),
    toggleLikeReplyWatcher(),

    createReportWatcher()
  ]);
}