import { handleActions } from 'redux-actions'
import _ from 'lodash'

import {
  sendMessage,
  sendMessageSuccess,
  sendMessageFail,
  getTransaction,
  getTransactionSuccess,
  getTransactionFail,
  appendMessage
} from '../actions/transactionAction'

let defaultState = {
  isLoading: false,
  transaction: {},
  isSending: false,
  error: null,
  messages: []
}

const transactionReducer = handleActions(
  {
    [getTransaction]: (state) => {
      return {
        ...state,
        isLoading: true,
      }
    },
    [getTransactionSuccess]: (state, { payload } ) => {
      return {
        ...state,
        transaction: payload,
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
      const { content, direction } = payload
      const messages = JSON.parse(JSON.stringify(state.messages))
      const position = _.get(state, 'transaction.user.position', 0)
      if (position === direction) {
        messages.push({
          content: content,
          sender: 0
        })
      } else {
        messages.push({
          content: content,
          sender: 1
        })
      }

      return {
        ...state,
        messages
      }
    }
  },
  defaultState
)

export default transactionReducer