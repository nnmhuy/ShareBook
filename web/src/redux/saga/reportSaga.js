import { call, put, takeLatest } from 'redux-saga/effects'
import restConnector from '../../connectors/RestConnector'

import {
  createReport,
  createReportSuccess,
  createReportFail
} from '../actions/reportAction'
import { successAlert, warnAlert } from '../../components/alert';

function* createReportSaga({ payload }) {
  try {
    const { content, typeOfTarget, valueId } = payload;
    
    switch (typeOfTarget) {
      case 'book':
        yield call(restConnector.post, `/reports`, {
          content,
          typeOfTarget,
          bookId: valueId,
          attachUser: true
        })
        break;
      case 'bookInstance':
        yield call(restConnector.post, `/reports`, {
          content,
          typeOfTarget,
          bookInstanceId: valueId,
          attachUser: true
        })
        break;
      case 'review':
        yield call(restConnector.post, `/reports`, {
          content,
          typeOfTarget,
          reviewId: valueId,
          attachUser: true
        })
        break;
      case 'reply':
        yield call(restConnector.post, `/reports`, {
          content,
          typeOfTarget,
          replyId: valueId,
          attachUser: true
        })
        break;
      case 'user':
        yield call(restConnector.post, `/reports`, {
          content,
          typeOfTarget,
          userId: valueId,
          attachUser: true
        })
        break;
      case 'other':
        yield call(restConnector.post, `/reports`, {
          content,
          typeOfTarget,
          attachUser: true
        })
        break;
      case 'qa':
        yield call(restConnector.post, `/reports`, {
          content,
          typeOfTarget,
          attachUser: true
        })
        break;
      default: break;
    }
    
    yield put(createReportSuccess())
    successAlert('Gửi report thành công')
  } catch (error) {
    yield put(createReportFail(error))
    warnAlert('Gửi report lỗi')
  }
}

function* createReportWatcher() {
  yield takeLatest(createReport, createReportSaga)
}

export {
  createReportWatcher
}