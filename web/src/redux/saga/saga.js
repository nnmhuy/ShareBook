import { all } from 'redux-saga/effects';

import { getCounterValueWatcher } from './counterSaga'
import { logInWithFacebookWatcher } from './accountSaga'

export default function* rootSaga() {
  yield all([
    getCounterValueWatcher(),
    logInWithFacebookWatcher()
  ]);
}