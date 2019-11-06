import { call, put, takeLatest } from 'redux-saga/effects'
import findIndex from 'lodash/findIndex'

import {
  getBookInstances,
  getBookInstancesSuccess,
  getBookInstancesFail,
  createBookInstance,
  createBookInstanceSuccess,
  createBookInstanceFail,
  getBookInstanceById,
  getBookInstanceByIdSuccess,
  getBookInstanceByIdFail
} from '../actions/bookInstanceAction'
import restConnector from '../../connectors/RestConnector'
import { successAlert } from '../../components/alert'

function* getBookInstancesSaga({ payload }) {
  try {
    const { bookId, page, limit } = payload
    const whereBookInstances = {
      where: {
        bookId
      },
      skip: page * limit,
      limit,
      order: 'isAvailable DESC'
    }

    const { data: bookInstances } = yield call(restConnector.get, 
      `/bookInstances?filter=${JSON.stringify(whereBookInstances)}`
    )

    let userIdList = [] 
    bookInstances.forEach(instance => {
      userIdList.push(instance.ownerId)
      userIdList.push(instance.holderId)
    })
    let whereBookInstance = {
      id: {inq: userIdList}
    }
    let filterUserBookInstance = {where: whereBookInstance}
    const { data: userList } = yield call(restConnector.get, `/users?filter=${JSON.stringify(filterUserBookInstance)}`)

    const allData = bookInstances.map((instance, index) => {
      let ownerIndex = findIndex(userList, (oneUser) => {
        return instance.ownerId === oneUser.id
      })
      let holderIndex = findIndex(userList, (oneUser) => {
        return instance.ownerId === oneUser.id
      })
      let ownerAvatar = '', ownerName = '', holderAvatar = '', holderName = ''
      if (ownerIndex > -1) {
        ownerName = userList[ownerIndex].name
        ownerAvatar = userList[ownerIndex].avatar
      }
      if (holderIndex > -1) {
        holderName = userList[holderIndex].name
        holderAvatar = userList[holderIndex].avatar
      }

      return {
        ...instance,
        ownerAvatar,
        ownerName,
        holderAvatar,
        holderName
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

function* getBookInstanceByIdSaga({ payload }) {
  try {
    const { bookInstanceId } = payload

    const filter = {
      fields: {
        id: true,
        holderId: true,
        ownerId: true,
        bookId: true
      },
      include: [
        {
          relation: 'book',
          scope: {
            fields: ['id', 'name', 'image']
          }
        },
        {
          relation: 'owner',
          scope: {
            fields: ['id', 'name', 'avatar']
          }
        },
        {
          relation: 'holder',
          scope: {
            fields: ['id', 'name', 'avatar']
          }
        }
      ]
    }

    const { data: instance } = yield call(restConnector.get, `/bookInstances/${bookInstanceId}?filter=${JSON.stringify(filter)}`)

    yield put(getBookInstanceByIdSuccess(instance))
  } catch (error) {
    yield put(getBookInstanceByIdFail(error))
  }
}

function* getBookInstancesWatcher() {
  yield takeLatest(getBookInstances, getBookInstancesSaga)
}

function* createBookInstanceWatcher() {
  yield takeLatest(createBookInstance, createBookInstanceSaga)
}

function* getBookInstanceByIdWatcher() {
  yield takeLatest(getBookInstanceById, getBookInstanceByIdSaga)
}

export {
  getBookInstancesWatcher,
  createBookInstanceWatcher,
  getBookInstanceByIdWatcher
}