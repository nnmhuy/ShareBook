import { all } from 'redux-saga/effects';

import { getCounterValueWatcher } from './counterSaga'
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
  postReviewWatcher
} from './reviewSaga'

export default function* rootSaga() {
  yield all([
    getCounterValueWatcher(),
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
    toggleLikeReviewWatcher()
  ]);
}