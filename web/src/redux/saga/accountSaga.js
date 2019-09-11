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
  logOutFail,
  signUp,
  signUpSuccess,
  signUpFail
} from '../actions/accountAction'
import restConnector from '../../connectors/RestConnector'
import {successAlert, warnAlert} from '../../components/alert'

function* logInLocalSaga({ payload }) {
  try {
    const data = yield call(restConnector.post, '/users/login', payload)
    yield put(logInLocalSuccess(data))
    yield put(getUserInfo())
    successAlert('ShareBook nhớ bạn rồi nha')
    //window.history.push('/profile')
  } catch (error) {
    yield put(logInLocalFail(error))
    let errorMessage = _.get(error, 'response.data.error.message', 'Đăng nhập lỗi')
    if (errorMessage === 'login failed' && errorMessage.length > 40) {
      errorMessage = 'Đăng nhập lỗi'
    }
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
    Cookies.remove('access_token')
    localStorage.clear()
    successAlert('Đăng xuất thành công')
    yield put(logOutSuccess(data))
  } catch (error) {
    yield put(logOutFail(error))
  }
}

function* signUpSaga({ payload }) {
  try {
    const data = yield call(restConnector.post, '/users', payload)
    yield put(signUpSuccess(data))
    // successAlert('Đăng ký thành công')
    //window.history.push('/profile')
    yield put(logInLocal(payload))
  } catch (error) {
    yield put(signUpFail(error))
    let errorMessage = _.get(error, 'response.data.error.message', 'Đăng ký lỗi')
    console.log(errorMessage)
    if (errorMessage.indexOf('User already exists') > -1) {
      errorMessage = 'Tài khoản đã được sử dụng'
    }
    if (errorMessage.length > 40) {
      errorMessage = 'Đăng ký lỗi'
    }
    warnAlert(errorMessage)
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

function* signUpWatcher() {
  yield takeLatest(signUp, signUpSaga)
}

export {
  logInLocalWatcher,
  getUserInfoWatcher,
  logOutWatcher,
  signUpWatcher
}