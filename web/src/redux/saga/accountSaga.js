import { call, put, takeLatest } from 'redux-saga/effects'
import Cookies from 'js-cookie'
import get from 'lodash/get'

import NotificationModule from '../../connectors/NotificationModule'

import {
  logInLocal,
  logInLocalSuccess,
  logInLocalFail,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
  editUserInfo,
  editUserInfoSuccess,
  editUserInfoFail,
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
    yield call(restConnector.post, '/users/login', { ...payload})
    yield put(getUserInfo())
    yield put(logInLocalSuccess())
    successAlert('ShareBook nhớ bạn rồi nha')
    NotificationModule.subscribeUser();
    //window.history.push('/profile')
  } catch (error) {
    console.log(error)
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
    localStorage.setItem('homeLocationId', data.homeLocationId)
    yield put(getUserInfoSuccess(data))
  } catch (error) {
    yield put(getUserInfoFail(error))
  }
}

function* editUserInfoSaga({ payload }) {
  try {
    const {name, fbLink, avatar, phoneNumber, bio, address, email, userId} = payload
    let userData = {name, fbLink, avatar, phoneNumber, bio, email}
    if (address) {
      const newAddress = {
        ...address,
        attachUser: "true"
      }
      const { data: newAddressInfo } = yield call(restConnector.post, `/locations`, newAddress)
      userData.homeLocationId = newAddressInfo.id
    }
    let { data: newAccountInfo } = yield call(restConnector.patch, `/users/${userId}`, userData)
    localStorage.setItem('role', newAccountInfo.role)
    localStorage.setItem('username', newAccountInfo.username)
    localStorage.setItem('name', newAccountInfo.name)
    localStorage.setItem('avatar', newAccountInfo.avatar)
    localStorage.setItem('coin', newAccountInfo.coin)
    localStorage.setItem('homeLocationId', newAccountInfo.homeLocationId)
    if (newAccountInfo.homeLocationId) {
      const {data: newLocation} = yield call(restConnector.get, `/locations/${newAccountInfo.homeLocationId}`)
      newAccountInfo.homeLocations = newLocation
    }
    yield put(editUserInfoSuccess(newAccountInfo))
    successAlert('Thay đổi thành công')
  } catch (error) {
    let errorMessage = get(error, 'response.data.error.message', 'HuHu thay đổi bị lỗi rồi')
    if (errorMessage.indexOf('Email already exists') > -1) {
      errorMessage = 'Email đã được sử dụng'
    }
    warnAlert(errorMessage)
    yield put(editUserInfoFail(error))
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
    NotificationModule.unsubscribeUser();
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

function* editUserInfoWatcher() {
  yield takeLatest(editUserInfo, editUserInfoSaga)
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
  editUserInfoWatcher,
  getOtherUserInfoWatcher,
  logOutWatcher,
  signUpWatcher
}