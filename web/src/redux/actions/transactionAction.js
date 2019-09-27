import { createActions } from 'redux-actions'


const {
  getTransaction,
  getTransactionSuccess,
  getTransactionFail,
  sendMessage,
  sendMessageSuccess,
  sendMessageFail,
  appendMessage
} = createActions(
  'GET_TRANSACTION',
  'GET_TRANSACTION_SUCCESS',
  'GET_TRANSACTION_FAIL',
  'SEND_MESSAGE',
  'SEND_MESSAGE_SUCCESS',
  'SEND_MESSAGE_FAIL',
  'APPEND_MESSAGE'
)



export {
  getTransaction,
  getTransactionSuccess,
  getTransactionFail,
  sendMessage,
  sendMessageSuccess,
  sendMessageFail,
  appendMessage
}