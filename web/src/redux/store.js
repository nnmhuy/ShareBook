import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import counter from './reducers/counterReducer'
import accountReducer from './reducers/accountReducer'
import bookReducer from './reducers/bookReducer'
import reviewReducer from './reducers/reviewReducer'
import rootSaga from './saga/saga.js'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    counter: counter,
    account: accountReducer,
    book: bookReducer,
    review: reviewReducer
  }),
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware
    )
  )
)

sagaMiddleware.run(rootSaga)