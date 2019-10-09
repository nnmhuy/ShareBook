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
  getBookSearchWatcher
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
  getReviewByIdWatcher
} from './reviewSaga'
import {
  getTransactionWatcher,
  sendMessageWatcher,
  getMessagesWatcher,
  getTransactionsWatcher
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

    getBookInstancesWatcher(),
    createBookInstanceWatcher(),
    getBookInstanceByIdWatcher(),

    getReviewByUserWatcher(),
    postReviewWatcher(),
    getReviewsOfBookWatcher(),
    toggleLikeReviewWatcher(),
    getReviewByIdWatcher(),
    toggleLikeSingleReviewWatcher(),

    getTransactionWatcher(),
    sendMessageWatcher(),
    getTransactionsWatcher(),
    getMessagesWatcher(),

    getRepliesWatcher(),
    postReplyWatcher(),
    getReplyByIdWatcher(),
    toggleLikeReplyWatcher(),

    createReportWatcher()
  ]);
}