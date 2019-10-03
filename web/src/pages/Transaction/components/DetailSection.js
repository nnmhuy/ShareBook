import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import colors from '../../../constants/colors'

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
    padding: '2px 24px',
    textTransform: 'none'
  },
  declineButton: {
    color: colors.red,
    borderColor: colors.red,
    fontSize: 14,
    fontWeight: 600,
    padding: '2px 24px',
    textTransform: 'none'
  },
  label: {
    fontWeight: 500,
    fontSize: 13,
    color: colors.primary
  },
  content: {
    fontWeight: 500,
    fontSize: 12
  },
  labelError: {
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
  }
}))

const DetailSection = (props) => {
  const { classes, status, position, passingDate, returnDate, address, extendedDeadline } = props
  if (position === 'borrower') {
      switch (status) {
        case 'waitingForResponse':
          return (
            <div className={classes.container}>
              <Button variant='outlined' size='small' className={classes.acceptButton}>
                Đồng ý
              </Button>
              <Button variant='outlined' size='small' className={classes.declineButton}>
                Từ chối
              </Button>
            </div>
          )
        case 'waitingForTake':
          return (
            <div>
              <div>
                <div className={classes.label}>Ngày giao sách:</div>
                <div className={classes.content}>{passingDate}</div>
              </div>
              <div>
                <div className={classes.label}>Địa chỉ</div>
                <div className={classes.content}>{address}</div>
              </div>
            </div>
          )
        case 'isReading':
          return (
            <div>
              <div>
                <div className={classes.label}>Ngày trả sách</div>
                <div className={classes.content}>{returnDate}</div>
              </div>
              <div>
                <div className={classes.label}>Địa chỉ</div>
                <div className={classes.content}>{address}</div>
              </div>
            </div>
          )
        case 'isOvertime':
          return (
            <div>
              <div>
                <div className={classes.labelError}>Ngày trả sách</div>
                <div className={classes.contentError}>{returnDate}</div>
              </div>
              <div>
                <div className={classes.label}>Địa chỉ</div>
                <div className={classes.content}>{address}</div>
              </div>
            </div>
          )
        case 'waitingForExtending':
          return (
            <div>
              <div>
                <div className={classes.labelError}>Ngày trả sách</div>
                <div className={classes.contentError}>{returnDate}</div>
              </div>
              <div>
                <div className={classes.label}>Địa chỉ</div>
                <div className={classes.content}>{address}</div>
              </div>
            </div>
          )
        case 'deadlineExtended':
          return (
            <div>
              <div>
                <div className={classes.label}>
                  Ngày trả sách <span className={classes.labelError}>(đã gia hạn)</span>
                </div>
                <div className={classes.contentError}>{returnDate}</div>
              </div>
              <div>
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
          <div className={classes.labelError} style={{ textAlign: 'right', cursor: 'pointer'}}>
            Huỷ đơn
          </div>
        </div>
      )
    case 'waitingForTake':
      return (
        <div>
          <div>
            <div className={classes.label}>Ngày nhận sách:</div>
            <div className={classes.content}>{passingDate}</div>
          </div>
          <div>
            <div className={classes.label}>Địa chỉ</div>
            <div className={classes.content}>{address}</div>
          </div>
        </div>
      )
    case 'isReading':
      return (
        <div>
          <div>
            <div className={classes.label}>Ngày trả sách</div>
            <div className={classes.content}>{returnDate}</div>
          </div>
          <div>
            <div className={classes.label}>Địa chỉ</div>
            <div className={classes.content}>{address}</div>
          </div>
        </div>
      )
    case 'isOvertime':
      return (
        <div>
          <div>
            <div className={classes.labelError}>Ngày trả sách</div>
            <div className={classes.contentError}>{returnDate}</div>
          </div>
          <div>
            <div className={classes.label}>Địa chỉ</div>
            <div className={classes.content}>{address}</div>
          </div>
        </div>
      )
    case 'waitingForExtending':
      return (
        <div>
          <div>
            <div className={classes.labelError}>Ngày trả sách</div>
            <div className={classes.contentError}>{returnDate}</div>
          </div>
          <div>
            <div className={classes.label}>Địa chỉ</div>
            <div className={classes.content}>{address}</div>
          </div>
        </div>
      )
    case 'deadlineExtended':
      return (
        <div>
          <div>
            <div className={classes.label}>
              Ngày trả sách <span className={classes.labelError}>(đã gia hạn)</span>
            </div>
            <div className={classes.contentError}>{extendedDeadline}</div>
          </div>
          <div>
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