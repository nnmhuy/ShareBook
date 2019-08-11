import { createActions } from 'redux-actions'

const { setCounter } = createActions({
  SET_COUNTER: (value) => ({ value })
})

const { increaseCounter, decreaseCounter, getCounter, getCounterSuccess, getCounterFail } = createActions(
  'INCREASE_COUNTER',
  'DECREASE_COUNTER',
  'GET_COUNTER',
  'GET_COUNTER_SUCCESS',
  'GET_COUNTER_FAIL'
)

export {
  setCounter,

  increaseCounter,
  decreaseCounter,
  getCounter,
  getCounterSuccess,
  getCounterFail
}