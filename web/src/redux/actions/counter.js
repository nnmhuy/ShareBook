import { createActions } from 'redux-actions'

const { setCounter } = createActions({
  SET_COUNTER: (value) => ({ value })
})

const { increaseCounter, decreaseCounter } = createActions(
  'INCREASE_COUNTER',
  'DECREASE_COUNTER'
)

export {
  increaseCounter,
  decreaseCounter,
  setCounter
}