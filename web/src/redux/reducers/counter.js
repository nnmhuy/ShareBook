import { handleActions } from 'redux-actions'

import { increaseCounter, decreaseCounter, setCounter } from '../actions/counter'

let defaultState = {
  value: 0
}

const counterReducer = handleActions(
  {
    [increaseCounter]: (state) => {
      return { ...state, value: state.value + 1 };
    },
    [decreaseCounter]: (state) => {
      return { ...state, value: state.value - 1 };
    },
    [setCounter]: (state, { payload: { value }}) => {
      return {...state, value}
    }
  },
  defaultState
)

export default counterReducer