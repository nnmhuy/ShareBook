import { call, put, takeLatest } from 'redux-saga/effects'

import {
  logInWithFacebook,
  logInWithFacebookSuccess,
  logInWithFacebookFail
} from '../actions/accountAction'
import restConnector from '../../connectors/RestConnector'

function* logInWithFacebookSaga() {
  try {
    const data = yield call(restConnector.get, '/auth/facebook')
    yield put(logInWithFacebookSuccess(data))
  } catch (error) {
    yield put(logInWithFacebookFail(error))
  }
}

function* logInWithFacebookWatcher() {
  yield takeLatest(logInWithFacebook, logInWithFacebookSaga)
}

export {
  logInWithFacebookWatcher
}