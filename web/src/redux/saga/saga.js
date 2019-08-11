import { all } from 'redux-saga/effects';

import { getCounterValueWatcher } from './counterSaga'

export default function* rootSaga() {
  yield all([
    getCounterValueWatcher()
  ]);
}