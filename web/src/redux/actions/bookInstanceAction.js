import { createActions } from 'redux-actions'


const {
  getBookInstances,
  getBookInstancesSuccess,
  getBookInstancesFail,
  createBookInstance,
  createBookInstanceSuccess,
  createBookInstanceFail,
} = createActions(
  'GET_BOOK_INSTANCES',
  'GET_BOOK_INSTANCES_SUCCESS',
  'GET_BOOK_INSTANCES_FAIL',
  'CREATE_BOOK_INSTANCE',
  'CREATE_BOOK_INSTANCE_SUCCESS',
  'CREATE_BOOK_INSTANCE_FAIL',
)



export {
  getBookInstances,
  getBookInstancesSuccess,
  getBookInstancesFail,
  createBookInstance,
  createBookInstanceSuccess,
  createBookInstanceFail
}