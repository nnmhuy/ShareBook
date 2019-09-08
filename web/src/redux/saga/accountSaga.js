import { call, put, takeLatest } from 'redux-saga/effects'
import Cookies from 'js-cookie'
import _ from 'lodash'

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
import {successAlert, warnAlert} from '../../components/alert'

function* logInLocalSaga({ payload }) {
  try {
    const data = yield call(restConnector.post, '/users/login', payload)
    yield put(logInLocalSuccess(data))
    successAlert('Đăng nhập thành công')
    //window.history.push('/profile')
  } catch (error) {
    yield put(logInLocalFail(error))
    let errorMessage = _.get(error, 'response.data.error.message', 'Đăng nhập lỗi')
    warnAlert(errorMessage)
  }
}

function* getUserInfoSaga() {
  try {
    const response = yield call(restConnector.get, '/users/me')
    let data = _.get(response, 'data', {})
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