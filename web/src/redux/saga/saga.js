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
  toggleBookmarkWatcher
} from './bookSaga'
import {
  getBookInstancesWatcher
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

    getBookInstancesWatcher(),

    getReviewByUserWatcher(),
    postReviewWatcher(),
    getReviewsOfBookWatcher(),
    toggleLikeReviewWatcher()
  ]);
}