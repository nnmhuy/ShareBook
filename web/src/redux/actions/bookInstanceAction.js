import { createActions } from 'redux-actions'


const {
  getBookInstances,
  getBookInstancesSuccess,
  getBookInstancesFail,
} = createActions(
  'GET_BOOK_INSTANCES',
  'GET_BOOK_INSTANCES_SUCCESS',
  'GET_BOOK_INSTANCES_FAIL'
)



export {
  getBookInstances,
  getBookInstancesSuccess,
  getBookInstancesFail
}