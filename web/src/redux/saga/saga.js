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
  createBookInstanceWatcher
} from './bookInstancesSaga'
import {
  getReviewByUserWatcher,
  getReviewsOfBookWatcher,
  toggleLikeReviewWatcher,
  postReviewWatcher,
  getReviewByIdWatcher
} from './reviewSaga'
import {
  getTransactionWatcher,
  sendMessageWatcher,
  getMessagesWatcher,
  getTransactionsWatcher
} from './transactionSaga'

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

    getReviewByUserWatcher(),
    postReviewWatcher(),
    getReviewsOfBookWatcher(),
    toggleLikeReviewWatcher(),
    getReviewByIdWatcher(),

    getTransactionWatcher(),
    sendMessageWatcher(),
    getMessagesWatcher(),
    getTransactionsWatcher()
  ]);
}