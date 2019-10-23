import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import colors from '../../../constants/colors'
import getFormattedDate from '../../../helper/getFormattedDate'

const styles = (theme => ({
  container: {
    marginTop: 10
  },
  acceptButton: {
    color: colors.green,
    borderColor: colors.green,
    fontSize: 14,
    fontWeight: 600,
    marginRight: 15,
    padding: '3px 19.5px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  declineButton: {
    color: colors.red,
    borderColor: colors.red,
    fontSize: 14,
    fontWeight: 600,
    padding: '3px 19.5px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  label: {
    fontWeight: 500,
    fontSize: 13,
    color: colors.primary,
    display: 'inline-block',
    marginRight: 5
  },
  content: {
    fontWeight: 500,
    fontSize: 12,
    display: 'inline-block'
  },
  labelError: {
    display: 'inline-block',
    float: 'right',
    fontWeight: 500,
    fontSize: 13,
    color: colors.red
  },
  labelSuccess: {
    fontWeight: 500,
    fontSize: 13,
    color: colors.green
  },
  contentError: {
    fontWeight: 500,
    fontSize: 12,
    color: colors.red
  },
  fieldWrapper: {
    marginTop: 5
  },
  editContent: {
    margin: '0 5px',
    color: colors.red,
    display: 'inline-block',
    fontSize: 12,
    cursor: 'pointer',
    fontWeight: 500,
    transition: '0.2s',
    '&:hover': {
      fontWeight: 600
    }
  },
  cancelOrder: {
    textAlign: 'right',
    cursor: 'pointer',
    transition: '0.2s',
    '&:hover': {
      fontWeight: 600
    }
  }
}))

const DetailSection = (props) => {
  const { classes, transactionId, status, 
    position, returnDate, address, 
    extendedDeadline, sendRequestStatus, updatedAt
  } = props
  const dateUpdate = new Date(updatedAt)
  const passingDate = getFormattedDate(dateUpdate.setDate(dateUpdate.getDate() + 7))
  const handleRequest = (newStatus, direction) => () => {
    sendRequestStatus({
      transactionId,
      status: newStatus,
      direction
    })
  }

  if (position === 'borrower') {
      switch (status) {
        case 'waitingForResponse':
          return (
            <div className={classes.container}>
              <Button variant='outlined' size='small' className={classes.acceptButton}
                onClick={handleRequest('waitingForTake', 'holder')}
              >
                Đồng ý
              </Button>
              <Button variant='outlined' size='small' className={classes.declineButton}
                onClick={handleRequest('isCancel', 'holder')}              
              >
                Từ chối
              </Button>
            </div>
          )
        case 'waitingForTake':
          return (
            <div>
              <div className={classes.fieldWrapper}>
                <div className={classes.label}>Ngày giao sách:</div>
                <div className={classes.content}>{passingDate}</div>
                <div className={classes.editContent}>Sửa</div>
              </div>
              <div className={classes.fieldWrapper}>
                <div className={classes.label}>Địa chỉ:</div>
                <div className={classes.content}>{address}</div>
              </div>
              <div className={classes.fieldWrapper}>
                <div className={`${classes.labelError} ` + `${classes.cancelOrder}`}
                  onClick={handleRequest('isCancel', 'holder')}
                >
                  Huỷ đơn
                </div>
              </div>
            </div>
          )
        case 'isReading':
          return (
            <div>
              <div className={classes.fieldWrapper}>
                <div className={classes.label}>Ngày trả sách:</div>
                <div className={classes.content}>{returnDate}</div>
              </div>
              <div className={classes.fieldWrapper}>
                <div className={classes.label}>Địa chỉ:</div>
                <div className={classes.content}>{address}</div>
              </div>
            </div>
          )
        case 'isOvertime':
          return (
            <div>
              <div className={classes.fieldWrapper}>
                <div className={classes.labelError}>Ngày trả sách</div>
                <div className={classes.contentError}>{returnDate}</div>
              </div>
              <div className={classes.fieldWrapper}>
                <div className={classes.label}>Địa chỉ</div>
                <div className={classes.content}>{address}</div>
              </div>
            </div>
          )
        case 'waitingForDeadlineExtended':
          return (
            <div>
              <div className={classes.fieldWrapper}>
                <div className={classes.labelError}>Ngày trả sách</div>
                <div className={classes.contentError}>{returnDate}</div>
              </div>
              <div className={classes.fieldWrapper}>
                <div className={classes.label}>Địa chỉ</div>
                <div className={classes.content}>{address}</div>
              </div>
            </div>
          )
        case 'deadlineExtended':
          return (
            <div>
              <div className={classes.fieldWrapper}>
                <div className={classes.label}>
                  Ngày trả sách <span className={classes.labelError}>(đã gia hạn)</span>
                </div>
                <div className={classes.contentError}>{returnDate}</div>
              </div>
              <div className={classes.fieldWrapper}>
                <div className={classes.label}>Địa chỉ</div>
                <div className={classes.content}>{address}</div>
              </div>
            </div>
          )
        case 'isReported':
          return (
            <div className={classes.container}>
              <div className={classes.labelError}>
                Giao dịch đã bị báo cáo
              </div>
            </div>
          )
        case 'isDone':
          return (
            <div className={classes.container}>
              <div className={classes.labelSuccess}>
                Giao dịch đã hoàn thành
              </div>
            </div>
          )
        default:
          return null
      }
  }
  switch (status) {
    case 'waitingForResponse':
      return (
        <div className={classes.container}>
          <div className={classes.labelError} style={{ textAlign: 'right', cursor: 'pointer'}}
            onClick={handleRequest('isCancel', 'borrower')}
          >
            Huỷ đơn
          </div>
        </div>
      )
    case 'waitingForTake':
      return (
        <div>
          <div className={classes.fieldWrapper}>
            <div className={classes.label}>Ngày nhận sách:</div>
            <div className={classes.content}>{passingDate}</div>
          </div>
          <div className={classes.fieldWrapper}>
            <div className={classes.label}>Địa chỉ</div>
            <div className={classes.content}>{address}</div>
          </div>
        </div>
      )
    case 'isReading':
      return (
        <div>
          <div className={classes.fieldWrapper}>
            <div className={classes.label}>Ngày trả sách</div>
            <div className={classes.content}>{returnDate}</div>
          </div>
          <div className={classes.fieldWrapper}>
            <div className={classes.label}>Địa chỉ</div>
            <div className={classes.content}>{address}</div>
          </div>
          <div className={classes.labelError} style={{ textAlign: 'right', cursor: 'pointer' }}
            onClick={handleRequest('waitingForDeadlineExtended', 'borrower')}
          >
            Xin gia hạn
          </div>
        </div>
      )
    case 'isOvertime':
      return (
        <div>
          <div className={classes.fieldWrapper}>
            <div className={classes.labelError}>Ngày trả sách</div>
            <div className={classes.contentError}>{returnDate}</div>
          </div>
          <div className={classes.fieldWrapper}>
            <div className={classes.label}>Địa chỉ</div>
            <div className={classes.content}>{address}</div>
          </div>
          <div className={classes.labelError} style={{ textAlign: 'right', cursor: 'pointer' }}
            onClick={handleRequest('waitingForDeadlineExtended', 'borrower')}
          >
             Xin gia hạn
          </div>
        </div>
      )
    case 'waitingForDeadlineExtended':
      return (
        <div>
          <div className={classes.fieldWrapper}>
            <div className={classes.labelError}>Ngày trả sách</div>
            <div className={classes.contentError}>{returnDate}</div>
          </div>
          <div className={classes.fieldWrapper}>
            <div className={classes.label}>Địa chỉ</div>
            <div className={classes.content}>{address}</div>
          </div>
        </div>
      )
    case 'deadlineExtended':
      return (
        <div>
          <div className={classes.fieldWrapper}>
            <div className={classes.label}>
              Ngày trả sách <span className={classes.labelError}>(đã gia hạn)</span>
            </div>
            <div className={classes.contentError}>{extendedDeadline}</div>
          </div>
          <div className={classes.fieldWrapper}>
            <div className={classes.label}>Địa chỉ</div>
            <div className={classes.content}>{address}</div>
          </div>
        </div>
      )
    case 'isReported':
      return (
        <div className={classes.container}>
          <div className={classes.labelError}>
            Giao dịch đã bị báo cáo
          </div>
        </div>
      )
    case 'isDone':
      return (
        <div className={classes.container}>
          <div className={classes.labelSuccess}>
            Giao dịch đã hoàn thành
          </div>
        </div>
      )
    default:
      return null
  }
}

export default withStyles(styles)(DetailSection)