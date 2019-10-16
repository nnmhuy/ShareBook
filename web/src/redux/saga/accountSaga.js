import { call, put, takeLatest } from 'redux-saga/effects'
import Cookies from 'js-cookie'
import get from 'lodash/get'

import {
  logInLocal,
  logInLocalSuccess,
  logInLocalFail,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
  getOtherUserInfo,
  getOtherUserInfoSuccess,
  getOtherUserInfoFail,
  logOut,
  logOutSuccess,
  logOutFail,
  signUp,
  signUpSuccess,
  signUpFail
} from '../actions/accountAction'
import restConnector from '../../connectors/RestConnector'
import { successAlert, warnAlert } from '../../components/alert'

function* logInLocalSaga({ payload }) {
  try {
    yield call(restConnector.post, '/users/login', payload)
    yield put(getUserInfo())
    yield put(logInLocalSuccess())
    successAlert('ShareBook nhớ bạn rồi nha')
    //window.history.push('/profile')
  } catch (error) {
    yield put(logInLocalFail(error))
    let errorMessage = get(error, 'response.data.error.message', 'Đăng nhập lỗi')
    if (errorMessage === 'login failed' && errorMessage.length > 40) {
      errorMessage = 'Đăng nhập lỗi'
    }
    warnAlert(errorMessage)
  }
}

function* getUserInfoSaga() {
  try {
    const response = yield call(restConnector.get, '/users/me')
    let data = get(response, 'data', {})
    localStorage.setItem('isAuth', true)
    localStorage.setItem('userId', data.id)
    localStorage.setItem('role', data.role)
    localStorage.setItem('username', data.username)
    localStorage.setItem('name', data.name)
    localStorage.setItem('avatar', data.avatar)
    localStorage.setItem('coin', data.coin)
    yield put(getUserInfoSuccess(data))
  } catch (error) {
    yield put(getUserInfoFail(error))
  }
}

function* getOtherUserInfoSaga({payload}) {
  try {
    let filter = { include: 'homeLocations'}
    const response = yield call(restConnector.get, `/users/${payload.userId}?filter=${JSON.stringify(filter)}`)
    let data = get(response, 'data', {})
    yield put(getOtherUserInfoSuccess(data))
  } catch (error) {
    yield put(getOtherUserInfoFail(error))
    warnAlert('Tài khoản này đang bị lỗi')
  }
}

function* logOutSaga() {
  try {
    restConnector.removeAccessToken()
    Cookies.remove('userId')
    Cookies.remove('access_token')
    localStorage.clear()
    successAlert('Đăng xuất thành công')
    window.location = '/book-list'
    const data = yield call(restConnector.post, '/users/logout')
    yield put(logOutSuccess(data))
  } catch (error) {
    yield put(logOutFail(error))
  }
}

function* signUpSaga({ payload }) {
  try {
    const data = yield call(restConnector.post, '/users', payload)
    yield put(logInLocal(payload))
    yield put(signUpSuccess(data))
    // successAlert('Đăng ký thành công')
    //window.history.push('/profile')
  } catch (error) {
    yield put(signUpFail(error))
    let errorMessage = get(error, 'response.data.error.message', 'Đăng ký lỗi')
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

function* getOtherUserInfoWatcher() {
  yield takeLatest(getOtherUserInfo, getOtherUserInfoSaga)
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
  getOtherUserInfoWatcher,
  logOutWatcher,
  signUpWatcher
}