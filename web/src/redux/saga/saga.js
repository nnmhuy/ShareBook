import { all } from 'redux-saga/effects';

import { getCounterValueWatcher } from './counterSaga'
import { 
  logInWithFacebookWatcher,
  getUserInfoWatcher,
  logOutWatcher
} from './accountSaga'

export default function* rootSaga() {
  yield all([
    getCounterValueWatcher(),

    logInWithFacebookWatcher(),
    getUserInfoWatcher(),
    logOutWatcher()
  ]);
}