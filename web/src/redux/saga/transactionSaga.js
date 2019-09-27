import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import _ from 'lodash'

import {
  sendMessage,
  sendMessageSuccess,
  sendMessageFail,
  getTransaction,
  getTransactionSuccess,
  getTransactionFail
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

    yield put(getTransactionSuccess(transaction))
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

function* getTransactionWatcher() {
  yield takeLatest(getTransaction, getTransactionSaga)
}

function* sendMessageWatcher() {
  yield takeEvery(sendMessage, sendMessageSaga)
}

export {
  getTransactionWatcher,
  sendMessageWatcher
}