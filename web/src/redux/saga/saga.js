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
  getBookInfoWatcher,
  getBookOfCategoryWatcher
} from './bookSaga'
import {
  getBookInstancesWatcher
} from './bookInstancesSaga'
import {
  getReviewsOfBookWatcher
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
    getBookInfoWatcher(),
    getBookOfCategoryWatcher(),

    getBookInstancesWatcher(),

    getReviewsOfBookWatcher()
  ]);
}