import { all } from 'redux-saga/effects';

import {
  logInLocalWatcher,
  getUserInfoWatcher,
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
  editBookWatcher
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
  getAllReviewsWatcher
} from './reviewSaga'
import {
  getTransactionWatcher,
  sendMessageWatcher,
  getMessagesWatcher,
  getTransactionsWatcher,
  requestStatusWatcher,
  initTransactionWatcher
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

    getTransactionWatcher(),
    sendMessageWatcher(),
    getTransactionsWatcher(),
    getMessagesWatcher(),
    requestStatusWatcher(),
    initTransactionWatcher(),

    getRepliesWatcher(),
    postReplyWatcher(),
    getReplyByIdWatcher(),
    toggleLikeReplyWatcher(),

    createReportWatcher()
  ]);
}