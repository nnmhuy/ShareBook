import { handleActions } from 'redux-actions'

import { 
  increaseCounter, decreaseCounter, setCounter, 
  getCounter, getCounterSuccess, getCounterFail 
} from '../actions/counterAction'

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
    },
    [getCounter]: (state) => ({
      ...state, isLoading: true
    }),
    [getCounterSuccess]: (state, { payload: { data } }) => ({
      ...state, isLoading: false, value: Number(data[0].employee_age)
    }),
    [getCounterFail]: (state, { payload: { code, message } }) => {
      return {
        ...state, 
        isLoading: false, 
        value: code
      }
    }
  },
  defaultState
)

export default counterReducer