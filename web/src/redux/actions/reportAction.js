import { createActions } from 'redux-actions'

const {
  createReport,
  createReportSuccess,
  createReportFail
} = createActions(
  'CREATE_REPORT',
  'CREATE_REPORT_SUCCESS',
  'CREATE_REPORT_FAIL'
  )

export {
  createReport,
  createReportSuccess,
  createReportFail

}
