import { call, put, takeLatest } from 'redux-saga/effects'

import { getCounter, getCounterSuccess, getCounterFail } from '../actions/counterAction'
import restConnector from '../../connectors/RestConnector'

function* getCounterValue() {
  try {
    const data = yield call(restConnector.get, '/employees')
    // const data = yield call(restConnector.post, '/abc', postDataHere)
    yield put(getCounterSuccess(data))
  } catch (error) {
    yield put(getCounterFail(error))
  }
}

function* getCounterValueWatcher() {
  yield takeLatest(getCounter, getCounterValue)
}

export {
  getCounterValueWatcher
}