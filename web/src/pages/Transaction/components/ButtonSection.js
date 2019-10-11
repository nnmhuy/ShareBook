import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import colors from '../../../constants/colors'

const styles = (theme => ({
  container: {
    padding: '10px 20px'
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
  normalButton: {
    color: colors.primary,
    borderColor: colors.primary,
    fontSize: 14,
    fontWeight: 600,
    padding: '2px 24px',
    textTransform: 'none'
  }
}))

const ButtonSection = (props) => {
  const { classes, transactionId, status,
    position, sendRequestStatus
  } = props

  const handleRequest = (newStatus, direction) => () => {
    sendRequestStatus({
      transactionId,
      status: newStatus,
      direction
    })
  }

  if (position === 'borrower') {
    switch (status) {
      case 'isReading':
        return (
          <div className={classes.container}>
            <Button variant='outlined' size='small' className={classes.normalButton}
              onClick={handleRequest('isDone', 'holder')}
            >
              Đã trả
            </Button>
          </div>
        )
      case 'isOvertime':
        return (
          <div className={classes.container}>
            <Button variant='outlined' size='small' className={classes.normalButton}
              onClick={handleRequest('isDone', 'holder')}
            >
              Đã trả
            </Button>
          </div>
        )
      case 'waitingForDeadlineExtended':
        return (
          <div className={classes.container}>
            <Button variant='outlined' size='small' className={classes.normalButton}
              style={{ marginRight: 20 }}
              onClick={handleRequest('deadlineExtended', 'holder')}
            >
              Gia hạn
            </Button>
            <Button variant='outlined' size='small' className={classes.declineButton}
              onClick={handleRequest('isOvertime', 'holder')} // TODO: must check if isOvertime or isReading
            >
              Từ chối
            </Button>
          </div>
        )
      case 'deadlineExtended':
        return (
          <div className={classes.container}>
            <Button variant='outlined' size='small' className={classes.normalButton}
              onClick={handleRequest('isDone', 'holder')}
            >
              Đã trả
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  if (position === 'holder') {
    switch (status) {
      case 'waitingForTake':
        return (
          <div className={classes.container}>
            <Button variant='outlined' size='small' className={classes.normalButton}
              onClick={handleRequest('isReading', 'borrower')}
            >
              Đã nhận sách
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return null
}

export default withStyles(styles)(ButtonSection)