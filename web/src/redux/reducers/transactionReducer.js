import { handleActions } from 'redux-actions'
import { numberOfMessagesPerLoad } from '../../constants/constants'

import {
  sendMessage,
  sendMessageSuccess,
  sendMessageFail,
  getTransaction,
  getTransactionSuccess,
  getTransactionFail,
  getTransactions,
  getTransactionsSuccess,
  getTransactionsFail,
  appendMessage,
  getMessages,
  getMessagesSuccess,
  getMessagesFail
} from '../actions/transactionAction'

let defaultState = {
  isLoading: false,
  transaction: {},
  isSending: false,
  error: null,
  isGetting: false,
  numberOfAppendedMessages: 0,
  lastMessageCount: 0,
  numberOfMessages: 0,
  messages: [],
  transactionList: []
}

const transactionReducer = handleActions(
  {
    [getTransaction]: (state) => {
      return {
        ...state,
        numberOfAppendedMessages: 0,
        lastMessageCount: 0,
        isLoading: true,
      }
    },
    [getTransactionSuccess]: (state, { payload: {transaction, numberOfMessages} } ) => {
      return {
        ...state,
        transaction,
        numberOfMessages,
        isLoading: false
      }
    },
    [getTransactionFail]: (state, { payload: error }) => {
      return {
        ...state,
        isLoading: false,
        error: error
      }
    },
    [sendMessage]: (state) => {
      return {
        ...state,
        isSending: true,
      }
    },
    [sendMessageSuccess]: (state, { payload }) => {
      return {
        ...state,
        isSending: false
      }
    },
    [sendMessageFail]: (state, { payload: error }) => {
      return {
        ...state,
        isSending: false,
        error: error
      }
    },
    [appendMessage]: (state, { payload }) => {
      const messages = JSON.parse(JSON.stringify(state.messages))
      messages.push(payload)

      return {
        ...state,
        numberOfAppendedMessages: state.numberOfAppendedMessages + 1,
        messages
      }
    },
    [getMessages]: (state) => {
      return {
        ...state,
        isGetting: true,
      }
    },
    [getMessagesSuccess]: (state, { payload: { messages } }) => {
      const lastMessageCount = Math.min(state.lastMessageCount + numberOfMessagesPerLoad, state.numberOfMessages)
      const newMessages = [...messages, ...JSON.parse(JSON.stringify(state.messages))]

      return {
        ...state,
        lastMessageCount,
        messages: newMessages,
        isGetting: false
      }
    },
    [getMessagesFail]: (state, { payload: error }) => {
      return {
        ...state,
        isGetting: false,
        error: error
      }
    },
    [getTransactions]: (state) => {
      return {
        ...state,
        isLoading: true,
      }
    },
    [getTransactionsSuccess]: (state, { payload: { transactionList } }) => {
      return {
        ...state,
        transactionList,
        isLoading: false
      }
    },
    [getTransactionsFail]: (state, { payload: error }) => {
      return {
        ...state,
        isLoading: false,
        error: error
      }
    },
  },
  defaultState
)

export default transactionReducer