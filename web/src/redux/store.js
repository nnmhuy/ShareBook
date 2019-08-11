import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import counter from './reducers/counterReducer'
import rootSaga from './saga/saga.js'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    counter: counter
  }),
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware
    )
  )
)

sagaMiddleware.run(rootSaga)