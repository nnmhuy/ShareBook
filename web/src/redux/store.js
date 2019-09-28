import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import accountReducer from './reducers/accountReducer'
import bookReducer from './reducers/bookReducer'
import bookInstancesReducer from './reducers/bookInstanceReducer'
import reviewReducer from './reducers/reviewReducer'
import transactionReducer from './reducers/transactionReducer'
import rootSaga from './saga/saga.js'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    account: accountReducer,
    book: bookReducer,
    review: reviewReducer,
    bookInstances: bookInstancesReducer,
    transaction: transactionReducer
  }),
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware
    )
  )
)

sagaMiddleware.run(rootSaga)