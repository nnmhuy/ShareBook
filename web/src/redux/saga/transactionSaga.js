import { call, put, takeLatest, takeEvery, takeLeading } from 'redux-saga/effects'
import _ from 'lodash'

import { numberOfMessagesPerLoad } from '../../constants/constants'

import {
  sendMessage,
  sendMessageSuccess,
  sendMessageFail,
  getTransaction,
  getTransactionSuccess,
  getTransactionFail,
  getMessages,
  getMessagesSuccess,
  getMessagesFail
} from '../actions/transactionAction'
import restConnector from '../../connectors/RestConnector'

function* getTransactionSaga({ payload }) {
  try {
    const { transactionId, userId } = payload

    const { data: transaction } = yield call(restConnector.get, `/transactions/${transactionId}`)
    let user = {}
    if (transaction.holderId === userId) {
      user = _.get(yield call(restConnector.get, `/users/${transaction.borrowerId}`), 'data', {})
      user.position = 'borrower'
    } else {
      user = _.get(yield call(restConnector.get, `/users/${transaction.holderId}`), 'data', {})
      user.position = 'holder'
    }

    const { data: book } = yield call(restConnector.get, `/bookInstances/${transaction.bookInstanceId}/book`)
    const { data: messages } = yield call(restConnector.get, `transactions/${transactionId}/messages/count`)

    yield put(getMessages({transactionId, skip: 0}))

    transaction.user = {
      avatar: user.avatar,
      name: user.name,
      id: user.id,
      position: user.position
    }

    transaction.book = {
      name: book.name,
      image: book.image
    }

    yield put(getTransactionSuccess({ transaction, numberOfMessages: messages.count }))
  } catch (error) {
    yield put(getTransactionFail(error))
  }
}

function* sendMessageSaga({ payload }) {
  try {
    const { transactionId, content } = payload

    yield call(restConnector.post, `/messageInTransactions`, {
      content,
      transactionId,
      attachUser: true
    })
    
    yield put(sendMessageSuccess())
  } catch (error) {
    yield put(sendMessageFail(error))
  }
}

function* getMessagesSaga({ payload }) {
  try {
    const { transactionId, skip } = payload

    const { data: messages } = yield call(restConnector.get, 
      `/transactions/${transactionId}/messages?filter={"skip":${skip},"limit":${numberOfMessagesPerLoad},"order":"createdAt DESC"}`
    )

    yield put(getMessagesSuccess({ messages: messages.reverse() }))
  } catch (error) {
    yield put(getMessagesFail(error))
  }
}

function* getTransactionWatcher() {
  yield takeLatest(getTransaction, getTransactionSaga)
}

function* sendMessageWatcher() {
  yield takeEvery(sendMessage, sendMessageSaga)
}

function* getMessagesWatcher() {
  yield takeLeading(getMessages, getMessagesSaga)
}

export {
  getTransactionWatcher,
  sendMessageWatcher,
  getMessagesWatcher
}