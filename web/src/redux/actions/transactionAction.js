import { createActions } from 'redux-actions'


const {
  getTransaction,
  getTransactionSuccess,
  getTransactionFail,
  sendMessage,
  sendMessageSuccess,
  sendMessageFail,
  appendMessage,
  getMessages,
  getMessagesSuccess,
  getMessagesFail,
} = createActions(
  'GET_TRANSACTION',
  'GET_TRANSACTION_SUCCESS',
  'GET_TRANSACTION_FAIL',
  'SEND_MESSAGE',
  'SEND_MESSAGE_SUCCESS',
  'SEND_MESSAGE_FAIL',
  'APPEND_MESSAGE',
  'GET_MESSAGES',
  'GET_MESSAGES_SUCCESS',
  'GET_MESSAGES_FAIL',
)



export {
  getTransaction,
  getTransactionSuccess,
  getTransactionFail,
  sendMessage,
  sendMessageSuccess,
  sendMessageFail,
  appendMessage,
  getMessages,
  getMessagesSuccess,
  getMessagesFail
}