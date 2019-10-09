import { call, put, takeLatest, all } from 'redux-saga/effects'
import restConnector from '../../connectors/RestConnector'

import {
  createReport,
  createReportSuccess,
  createReportFail
} from '../actions/reportAction'

function* createReportSaga({ payload }) {
  try {
    const { content, typeOfTarget, valueId } = payload;
    
    switch (typeOfTarget) {
      case 'book':
        yield call(restConnector.post, `/reports`, {
          status: 'pending',
          content,
          typeOfTarget,
          bookId: valueId,
          authUser: true
        })
        break;
      case 'book':
        yield call(restConnector.post, `/reports`, {
          status: 'pending',
          content,
          typeOfTarget,
          bookId: valueId,
          attachUser: true
        })
        break;
      case 'bookInstance':
        yield call(restConnector.post, `/reports`, {
          status: 'pending',
          content,
          typeOfTarget,
          bookInstanceId: valueId,
          attachUser: true
        })
        break;
      case 'review':
        yield call(restConnector.post, `/reports`, {
          status: 'pending',
          content,
          typeOfTarget,
          reviewId: valueId,
          attachUser: true
        })
        break;
      case 'reply':
        yield call(restConnector.post, `/reports`, {
          status: 'pending',
          content,
          typeOfTarget,
          replyId: valueId,
          attachUser: true
        })
        break;
      case 'user':
        yield call(restConnector.post, `/reports`, {
          status: 'pending',
          content,
          typeOfTarget,
          userId: valueId,
          attachUser: true
        })
        break;
      default: break;
    }
    
    yield put(createReportSuccess())
  } catch (error) {
    yield put(createReportFail(error))
  }
}

function* createReportWatcher() {
  yield takeLatest(createReport, createReportSaga)
}

export {
  createReportWatcher
}