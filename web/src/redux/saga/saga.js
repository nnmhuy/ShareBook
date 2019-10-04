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
  createBookWatcher
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
  getMessagesWatcher
} from './transactionSaga'
import {
  postReplyWatcher
} from './replySaga'

export default function* rootSaga() {
  yield all([
    logInLocalWatcher(),
    getUserInfoWatcher(),
    logOutWatcher(),
    signUpWatcher(),

    getBookListWatcher(),
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

    postReplyWatcher()
  ]);
}