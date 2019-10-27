import { call, put, takeLatest, takeEvery, takeLeading, all } from 'redux-saga/effects'
import get from 'lodash/get'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import orderBy from 'lodash/orderBy'

import { successAlert, errorAlert } from '../../components/alert'
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
  getMessagesFail,
  getTransactions,
  getTransactionsSuccess,
  getTransactionsFail,
  requestStatus,
  requestStatusSuccess,
  requestStatusFail,
  initTransaction,
  initTransactionSuccess,
  initTransactionFail,
  changeDateTransaction,
  changeDateTransactionSuccess,
  changeDateTransactionFail
} from '../actions/transactionAction'
import restConnector from '../../connectors/RestConnector'

function* getTransactionSaga({ payload }) {
  try {
    const { transactionId, userId } = payload

    const { data: transaction } = yield call(restConnector.get, `/transactions/${transactionId}`)
    let user = {}
    if (transaction.holderId === userId) {
      user = get(yield call(restConnector.get, `/users/${transaction.borrowerId}`), 'data', {})
      user.position = 'borrower'
    } else if (transaction.borrowerId === userId) {
      user = get(yield call(restConnector.get, `/users/${transaction.holderId}`), 'data', {})
      user.position = 'holder'
    } else {
      window.replace('/')
    }

    // estimatedReadingTime
    const { data: instance } = yield call(restConnector.get, `/bookInstances/${transaction.bookInstanceId}`)
    const { data: book } = yield call(restConnector.get, `/bookInstances/${transaction.bookInstanceId}/book`)
    const { data: messages } = yield call(restConnector.get, `transactions/${transactionId}/messages/count`)
    const { data: review } = yield call(restConnector.get, `/reviews?filter={"where":{"userId":"${transaction.borrowerId}", "bookId":"${book.id}"}}`)

    transaction.estimatedReadingTime = instance.estimatedReadingTime
    if (review[0]) {
      transaction.reviewId = review[0].id
      transaction.isReviewed = true
    }
    else transaction.isReviewed = false

    yield put(getMessages({transactionId, skip: 0}))

    transaction.user = {
      avatar: user.avatar,
      name: user.name,
      id: user.id,
      position: user.position
    }

    transaction.book = {
      id: book.id,
      name: book.name,
      image: book.image,
      author: book.author
    }


    yield put(getTransactionSuccess({ transaction, numberOfMessages: messages.count }))
  } catch (error) {
    yield put(getTransactionFail(error))
  }
}

function* getTransactionsSaga({ payload }) {
  try {
    const { userId } = payload

    const { data: borrowingTransaction } = yield call(restConnector.get, `users/${userId}/borrowingTransactions?filter={"order":"updatedAt DESC"}`)
    const { data: holdingTransaction } = yield call(restConnector.get, `users/${userId}/holdingTransactions?filter={"order":"updatedAt DESC"}`)


    let userIdList = []
    let bookInstanceIdList = []
    borrowingTransaction.forEach(instance => {
      userIdList.push(instance.holderId)
      bookInstanceIdList.push(instance.bookInstanceId)
    })
    holdingTransaction.forEach(instance => {
      userIdList.push(instance.borrowerId)
      bookInstanceIdList.push(instance.bookInstanceId)
    })
    let filterUser = { 
      where: {
        id: { inq: userIdList }
      }
    }
    const { data: userList } = yield call(restConnector.get, `/users?filter=${JSON.stringify(filterUser)}`)

    let filterBookInstance = { 
      where: {
        id: { inq: bookInstanceIdList }
      }
    }
    const { data: bookInstanceList } = yield call(restConnector.get, `/bookInstances?filter=${JSON.stringify(filterBookInstance)}`)
    let filterBook = {
      where: {
        id: { inq: bookInstanceList.map(instance => instance.bookId) }
      }
    }
    const { data: bookList } = yield call(restConnector.get, `/books?filter=${JSON.stringify(filterBook)}`)

    const bookIndexList = bookInstanceIdList.map(instanceId => {
      const matchInstance = find(bookInstanceList, (oneInstance) => {
        return instanceId === oneInstance.id
      })

      return findIndex(bookList, (oneBook) => {
        return matchInstance.bookId === oneBook.id
      })
    })

    let transactionList = []
    borrowingTransaction.forEach((transaction, index) => {
      let userIndex = findIndex(userList, (oneUser) => {
        return transaction.holderId === oneUser.id
      })
      const { id, name, avatar } = userList[userIndex]
      transactionList.push({
        ...transaction,
        user: {
          id,
          name,
          avatar,
          position: 'holder'
        },
        image: bookList[bookIndexList[index]].image
      })
    })


    holdingTransaction.forEach((transaction, index) => {
      let userIndex = findIndex(userList, (oneUser) => {
        return transaction.borrowerId === oneUser.id
      })
      const { id, name, avatar } = userList[userIndex]
      transactionList.push({
        ...transaction,
        user: {
          id,
          name,
          avatar,
          position: 'borrower'
        },
        image: bookList[bookIndexList[borrowingTransaction.length + index]].image
      })
    })

    const getTransactionTime = transactionList.map(trans => {
      let time = ''
      if (!trans.lastMessageTime) 
        time = trans.updatedAt
      else time = trans.lastMessageTime
      return {...trans, time}
    })

    const sortTime = orderBy(getTransactionTime, ['time'], ['desc'])
    const sortLast = yield all(
      sortTime.map(trans => {
        return call(restConnector.get, `transactions/${trans.id}/messages?filter={"order":"updatedAt DESC", "limit":"1"}`)
      })
    )
    sortTime.forEach((trans, index) => {
      trans.lastMessage = sortLast[index].data[0].content
      trans.lastMessageTime = trans.time
      trans.lastMessageDirection = sortLast[index].data[0].direction
      delete trans.time
    })
    
    yield put(getTransactionsSuccess({transactionList: sortTime}))
  } catch (error) {
    yield put(getTransactionsFail(error))
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

function* requestStatusSaga({ payload }) {
  try {
    const { transactionId, status, direction } = payload

    const data = {
      requestStatus: status
    }

    let newTransaction = {}

    if (direction === 'holder') {
      newTransaction = get(yield call(
        restConnector.put, 
        `/transactions/${transactionId}/holder-status`,
        { data }
      ), 'data', {})
    } else {
      newTransaction = get(yield call(
        restConnector.put,
        `/transactions/${transactionId}/borrower-status`,
        { data }
      ), 'data', {})
    }

    yield put(requestStatusSuccess({ newTransaction }))
    successAlert('Thao tác thành công');
  } catch (error) {
    yield put(requestStatusFail({ error }))
    errorAlert(error.message);
  }
}

function* initTransactionSaga({ payload }) {
  try {
    const { bookId, instanceId } = payload
    const response = yield call(
      restConnector.post,
      `/transactions/init-transaction/book/${bookId}`,
      {
        instanceId: instanceId || null
      }
    )
    const data = get(response, 'data', {})
    yield put(initTransactionSuccess(data))
    successAlert('Gửi yêu cầu mượn sách thành công')
    window.location = `/transaction/${data.transaction.id}`
  } catch (error) {
    yield put(initTransactionFail({ error }))
    errorAlert(error.message);
  }
}

function* changeDateTransactionSaga({ payload }) {
  try {
    const { value, transactionId, type, initial, status } = payload
    switch (type) {
      case 'passingDate':
        const passingDate = new Date(value).toISOString()
        yield call(restConnector.patch, `/transactions/${transactionId}`, {
          passingDate,
          attachUser: true
        })
        yield put(changeDateTransactionSuccess({ type, value: passingDate }))
        if (!initial)
          successAlert('Chỉnh ngày thành công')
        break;
      case 'returnDate':
        const returnDate = new Date(value).toISOString()
        if (status === 'deadlineExtended') {
          yield call(restConnector.patch, `/transactions/${transactionId}`, {
            returnDate,
            extendedDeadline: 0,
            attachUser: true
          })
        }
        else {
          yield call(restConnector.patch, `/transactions/${transactionId}`, {
            returnDate,
            attachUser: true
          })
        }
        yield put(changeDateTransactionSuccess({ type, value: returnDate }))
        if (!initial)
          successAlert('Chỉnh ngày thành công')
        break;
      case 'address':
        yield call(restConnector.patch, `/transactions/${transactionId}`, {
          address: value,
          attachUser: true
        })
        yield put(changeDateTransactionSuccess({ type, value }))
        successAlert('Chỉnh địa chỉ thành công')
        break;
      case 'extendedDeadline':
        let deadlineDate = get(yield call(restConnector.get, `/transactions/${transactionId}`), 'data', {})
        let reDate = new Date(deadlineDate.returnDate)
        reDate = reDate.setDate(reDate.getDate() + value)
        console.log(reDate)
        yield call(restConnector.patch, `/transactions/${transactionId}`, {
          extendedDeadline: value,
          returnDate: reDate,
          attachUser: true
        })
        yield put(changeDateTransactionSuccess({ type, value }))
        yield put(changeDateTransactionSuccess({ type: 'returnDate', value: reDate }))
        successAlert('Chỉnh thành công')
        break;
      default: break;
    }
    
  } catch (error) {
    yield put(changeDateTransactionFail(error))
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

function* getTransactionsWatcher() {
  yield takeLatest(getTransactions, getTransactionsSaga)
}

function* requestStatusWatcher() {
  yield takeLatest(requestStatus, requestStatusSaga)
}

function* initTransactionWatcher() {
  yield takeLeading(initTransaction, initTransactionSaga)
}

function* changeDateTransactionWatcher() {
  yield takeLeading(changeDateTransaction, changeDateTransactionSaga)
}

export {
  getTransactionWatcher,
  sendMessageWatcher,
  getMessagesWatcher,
  getTransactionsWatcher,
  requestStatusWatcher,
  initTransactionWatcher,
  changeDateTransactionWatcher
}