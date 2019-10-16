const frontendURL = process.env.REACT_APP_FRONTEND_URL
const baseURL = process.env.REACT_APP_BASE_URL
const socketURL = process.env.REACT_APP_SOCKET_URL
const imageContainer = process.env.REACT_APP_IMAGE_CONTAINER
const maxMobileWidth = '800px'
const numberOfReviewsPerPage = 5
const numberOfBookInstancesPerPage = 5
const numberOfMessagesPerLoad = 200

const mapTransactionStatusToText = {
  waitingForResponse: 'Chờ phản hồi', //waitingForResponse
  waitingForTake: 'Chờ nhận sách', //waitingForTake
  isReading: 'Đang đọc', //isReading
  isOvertime: 'Quá hạn', //isOvertime
  waitingForDeadlineExtended: 'Chờ phản hồi gia hạn', //waitingForDeadlineExtended // borrower ask to extend deadline
  deadlineExtended: 'Đã gia hạn', //deadlineExtended
  isReported: 'Đã báo cáo', //isReported
  isDone: 'Đã hoàn thành', //isDone
  isCancel: 'Đã huỷ', //isCancel // if holder decline borrow request
}

const mapPositionToText = {
  holder: 'Người cho mượn',
  borrower: 'Người mượn'
}

export {
  frontendURL,
  baseURL,
  socketURL,
  maxMobileWidth,
  imageContainer,
  mapTransactionStatusToText,
  mapPositionToText,
  numberOfReviewsPerPage,
  numberOfBookInstancesPerPage,
  numberOfMessagesPerLoad
}