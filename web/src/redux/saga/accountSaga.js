import { call, put, takeLatest } from 'redux-saga/effects'
import Cookies from 'js-cookie'

import {
  logInWithFacebook,
  logInWithFacebookSuccess,
  logInWithFacebookFail,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
  logOut,
  logOutSuccess,
  logOutFail
} from '../actions/accountAction'
import restConnector from '../../connectors/RestConnector'

function* logInWithFacebookSaga() {
  try {
    const data = yield call(restConnector.get, '/auth/facebook')
    alert(data)
    yield put(logInWithFacebookSuccess(data))
  } catch (error) {
    yield put(logInWithFacebookFail(error))
  }
}

function* getUserInfoSaga() {
  try {
    const data = yield call(restConnector.get, '/users/me')
    yield put(getUserInfoSuccess(data))
  } catch(error) {
    yield put(getUserInfoFail(error))
  }
}

function* logOutSaga() {
  try {
    const data = yield call(restConnector.post, '/users/logout')
    restConnector.removeAccessToken()
    Cookies.remove('userId')
    Cookies.remove('accessToken')
    localStorage.clear()
    yield put(logOutSuccess(data))
  } catch (error) {
    yield put(logOutFail(error))
  }
}

function* logInWithFacebookWatcher() {
  yield takeLatest(logInWithFacebook, logInWithFacebookSaga)
}

function* getUserInfoWatcher() {
  yield takeLatest(getUserInfo, getUserInfoSaga)
}

function* logOutWatcher() {
  yield takeLatest(logOut, logOutSaga)
}

export {
  logInWithFacebookWatcher,
  getUserInfoWatcher,
  logOutWatcher
}