const INCREASE_COUNTER = 'INCREASE_COUNTER'

const DECREASE_COUNTER = 'DECREASE_COUNTER'

const SET_COUNTER = 'SET_VALUE_COUNTER'

const increaseCounter = () => (
  {
    type: INCREASE_COUNTER
  }
)

const decreaseCounter = () => (
  {
    type: DECREASE_COUNTER
  }
)

const setCounter = (value) => (
  {
    type: SET_COUNTER,
    payload: { value }
  }
)


export {
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  SET_COUNTER,

  increaseCounter,
  decreaseCounter,
  setCounter
}