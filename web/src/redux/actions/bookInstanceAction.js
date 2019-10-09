import { createActions } from 'redux-actions'


const {
  getBookInstances,
  getBookInstancesSuccess,
  getBookInstancesFail,
  createBookInstance,
  createBookInstanceSuccess,
  createBookInstanceFail,
  getBookInstanceById,
  getBookInstanceByIdSuccess,
  getBookInstanceByIdFail
} = createActions(
  'GET_BOOK_INSTANCES',
  'GET_BOOK_INSTANCES_SUCCESS',
  'GET_BOOK_INSTANCES_FAIL',
  'CREATE_BOOK_INSTANCE',
  'CREATE_BOOK_INSTANCE_SUCCESS',
  'CREATE_BOOK_INSTANCE_FAIL',
  'GET_BOOK_INSTANCE_BY_ID',
  'GET_BOOK_INSTANCE_BY_ID_SUCCESS',
  'GET_BOOK_INSTANCE_BY_ID_FAIL',
)



export {
  getBookInstances,
  getBookInstancesSuccess,
  getBookInstancesFail,
  createBookInstance,
  createBookInstanceSuccess,
  createBookInstanceFail,
  getBookInstanceById,
  getBookInstanceByIdSuccess,
  getBookInstanceByIdFail
}