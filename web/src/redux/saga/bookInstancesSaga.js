import { call, put, takeLatest, all } from 'redux-saga/effects'

import {
  getBookInstances,
  getBookInstancesSuccess,
  getBookInstancesFail,
  createBookInstance,
  createBookInstanceSuccess,
  createBookInstanceFail
} from '../actions/bookInstanceAction'
import restConnector from '../../connectors/RestConnector'
import { successAlert } from '../../components/alert'

function* getBookInstancesSaga({ payload }) {
  try {
    const { bookId, page, limit } = payload
    const { data: bookInstances } = yield call(restConnector.get, 
      `/books/${bookId}/bookInstances?filter={"skip":${page * limit},"limit":${limit},"order":"isAvailable DESC"}`
    )
    const ownerOfBookInstances = yield all(
      bookInstances.map(instance => call(restConnector.get, `/bookInstances/${instance.id}/owner`))
    )

    const holderOfBookInstances = yield all(
      bookInstances.map(instance => call(restConnector.get, `/bookInstances/${instance.id}/holder`))
    )

    const allData = bookInstances.map((instance, index) => {
      const { avatar: ownerAvatar, username: ownerUsername } = ownerOfBookInstances[index].data
      const { avatar: holderAvatar, username: holderUsername } = holderOfBookInstances[index].data
      return {
        ...instance,
        ownerAvatar,
        ownerUsername,
        holderAvatar,
        holderUsername
      }
    })

    yield put(getBookInstancesSuccess(allData))
  } catch (error) {
    yield put(getBookInstancesFail(error))
  }
}

function* createBookInstanceSaga({ payload }) {
  try {
    const { bookId, bookCondition, estimatedReadingTime, note } = payload
    const data = {
      bookId,
      bookCondition,
      estimatedReadingTime,
      note,
      attachUser: true
    }
    yield call(restConnector.post, `/bookInstances`, data)
    yield put(createBookInstanceSuccess())
    successAlert('Thêm sách thành công')
    window.history.back()
  } catch (error) {
    yield put(createBookInstanceFail(error))
  }
}

function* getBookInstancesWatcher() {
  yield takeLatest(getBookInstances, getBookInstancesSaga)
}

function* createBookInstanceWatcher() {
  yield takeLatest(createBookInstance, createBookInstanceSaga)
}

export {
  getBookInstancesWatcher,
  createBookInstanceWatcher
}