const baseURL = process.env.REACT_APP_BASE_URL
const imageContainer = process.env.REACT_APP_IMAGE_CONTAINER
const maxMobileWidth = '800px'
const numberOfReviewsPerPage = 5

const mapTransactionStatusToText = [
  'Chờ phản hồi', //waitingForResponse
  'Chờ nhận sách', //waitingForTake
  'Đang đọc', //isReading
  'Quá hạn', //isOvertime
  'Chờ phản hồi gia hạn', //waitingForDeadlineExtended // borrower ask to extend deadline
  'Đã gia hạn', //deadlineExtended
  'Đã báo cáo', //isReported
  'Đã hoàn thành', //isDone
  'Đã huỷ', //isCancel // if holder decline borrow request
]

const mapPositionToText = [
  'Người cho mượn',
  'Người mượn'
]

export {
  baseURL,
  maxMobileWidth,
  imageContainer,
  mapTransactionStatusToText,
  mapPositionToText,
  numberOfReviewsPerPage
}