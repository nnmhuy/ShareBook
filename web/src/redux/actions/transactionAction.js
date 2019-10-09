import { createActions } from 'redux-actions'


const {
  getTransaction,
  getTransactionSuccess,
  getTransactionFail,
  getTransactions,
  getTransactionsSuccess,
  getTransactionsFail,
  sendMessage,
  sendMessageSuccess,
  sendMessageFail,
  appendMessage,
  getMessages,
  getMessagesSuccess,
  getMessagesFail,
  requestStatus,
  requestStatusSuccess,
  requestStatusFail,
} = createActions(
  'GET_TRANSACTION',
  'GET_TRANSACTION_SUCCESS',
  'GET_TRANSACTION_FAIL',
  'GET_TRANSACTIONS',
  'GET_TRANSACTIONS_SUCCESS',
  'GET_TRANSACTIONS_FAIL',
  'SEND_MESSAGE',
  'SEND_MESSAGE_SUCCESS',
  'SEND_MESSAGE_FAIL',
  'APPEND_MESSAGE',
  'GET_MESSAGES',
  'GET_MESSAGES_SUCCESS',
  'GET_MESSAGES_FAIL',
  'REQUEST_STATUS',
  'REQUEST_STATUS_SUCCESS',
  'REQUEST_STATUS_FAIL',
)



export {
  getTransaction,
  getTransactionSuccess,
  getTransactionFail,
  getTransactions,
  getTransactionsSuccess,
  getTransactionsFail,
  sendMessage,
  sendMessageSuccess,
  sendMessageFail,
  appendMessage,
  getMessages,
  getMessagesSuccess,
  getMessagesFail,
  requestStatus,
  requestStatusSuccess,
  requestStatusFail
}