import { call, put, takeLatest } from 'redux-saga/effects'
import Cookies from 'js-cookie'

import {
  logInLocal,
  logInLocalSuccess,
  logInLocalFail,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
  logOut,
  logOutSuccess,
  logOutFail
} from '../actions/accountAction'
import restConnector from '../../connectors/RestConnector'

function* logInLocalSaga({ payload }) {
  try {
    console.log(payload)
    const data = yield call(restConnector.post, '/users/login', payload)
    alert(data)
    yield put(logInLocalSuccess(data))
  } catch (error) {
    yield put(logInLocalFail(error))
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

function* logInLocalWatcher() {
  yield takeLatest(logInLocal, logInLocalSaga)
}

function* getUserInfoWatcher() {
  yield takeLatest(getUserInfo, getUserInfoSaga)
}

function* logOutWatcher() {
  yield takeLatest(logOut, logOutSaga)
}

export {
  logInLocalWatcher,
  getUserInfoWatcher,
  logOutWatcher
}