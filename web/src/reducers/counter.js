import { INCREASE_COUNTER, DECREASE_COUNTER, SET_COUNTER } from '../actions/counter'

let defaultState = {
  value: 0
}

const counterReducer = (state = defaultState, action) => {
  const { value } = state
  switch (action.type) {
    case INCREASE_COUNTER:
      return {
        value: value + 1
      }
    case DECREASE_COUNTER:
      return {
        value: value - 1
      }
    case SET_COUNTER:
      return {
        value: action.payload.value
      }
    default:
      return state
  }
}

export default counterReducer