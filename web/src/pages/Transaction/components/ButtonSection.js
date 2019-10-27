import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Input from '@material-ui/core/Input'

import colors from '../../../constants/colors'

const styles = (theme => ({
  container: {
    padding: '10px 20px'
  },
  acceptButton: {
    fontFamily: 'Montserrat',
    color: colors.green,
    borderColor: colors.green,
    fontSize: 14,
    fontWeight: 600,
    marginRight: 15,
    padding: '2px 24px',
    textTransform: 'none',
    '&:hover': {
      color: 'white',
      backgroundColor: colors.green
    }
  },
  declineButton: {
    fontFamily: 'Montserrat',
    color: colors.red,
    borderColor: colors.red,
    fontSize: 14,
    fontWeight: 600,
    padding: '2px 24px',
    textTransform: 'none',
    '&:hover': {
      color: 'white',
      backgroundColor: colors.red
    }
  },
  normalButton: {
    fontFamily: 'Montserrat',
    color: colors.primary,
    borderColor: colors.primary,
    fontSize: 14,
    fontWeight: 600,
    padding: '2px 24px',
    textTransform: 'none',
    transition: '0.3s',
    '&:hover': {
      color: 'white',
      backgroundColor: colors.primary
    }
  },
  contentAddressInput: {
    '&.MuiInputBase-root': {
      fontFamily: 'montserrat',
      fontSize: 14,
      fontWeight: 500,
      width: '100%'
    }
  },
}))

const ButtonSection = (props) => {
  const { classes, transactionId, status,
    position, sendRequestStatus, returnDate, extendedDeadline,
    changeDateTransaction
  } = props
  const currentDate = new Date()
  const reDate = new Date(returnDate)
  const [isViewing, setViewing] = useState(false)
  const [deadline, setDeadline] = useState(extendedDeadline)

  useEffect(() => {
    setDeadline(extendedDeadline)
  }, [extendedDeadline])

  const openModal = (isViewing) => {
    setViewing(isViewing);
  }

  const handleChange = (e) => {
    if (e.target.value < 0 || e.target.value > 20) return
    setDeadline(e.target.value)
  }

  // const handleRequest = (newStatus, direction) => () => {
  //   sendRequestStatus({
  //     transactionId,
  //     status: newStatus,
  //     direction
  //   })
  // }

  const handleDeadlineExtended = () => {
    changeDateTransaction({ value: deadline, transactionId, type: 'extendedDeadline', status })
    sendRequestStatus({
      transactionId,
      status: 'deadlineExtended',
      direction: 'holder'
    })
  }

  const handleDeadlineReject = () => {
    if (reDate < currentDate)
      sendRequestStatus({
        transactionId,
        status: 'isOvertime',
        direction: 'holder'
      })
    else {
      sendRequestStatus({
        transactionId,
        status: 'isReading',
        direction: 'holder'
      })
    }
  }

  const handlePassing = (status, direction, isPassing = false) => {
    if (isPassing)
      changeDateTransaction({ value: currentDate, transactionId, type: 'passingDate', status, initial: true })
    else
      changeDateTransaction({ value: currentDate, transactionId, type: 'returnDate', status, initial: true })
    sendRequestStatus({
      transactionId,
      status,
      direction
    })
  }

  if (position === 'borrower') {
    switch (status) {
      case 'isReading':
        return (
          <div className={classes.container}>
            <Button variant='outlined' size='small' className={classes.normalButton}
              onClick={() => handlePassing('isDone', 'holder')}
            >
              Đã trả
            </Button>
          </div>
        )
      case 'isOvertime':
        return (
          <div className={classes.container}>
            <Button variant='outlined' size='small' className={classes.normalButton}
              onClick={() => handlePassing('isDone', 'holder')}
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
              onClick={()=>openModal(true)}
            >
              Gia hạn
            </Button>
            <Button variant='outlined' size='small' className={classes.declineButton}
              onClick={() => handleDeadlineReject()} 
            >
              Từ chối
            </Button>
            <Dialog
              aria-labelledby="customized-dialog-title" open={isViewing} onClose={() => openModal(false)} className={classes.modal}>
              <DialogContent style={{ padding: 10 }}>
                <Input
                  className={classes.contentAddressInput}
                  name='extendedDeadline'
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                  type='number'
                  value={deadline}
                  onChange={handleChange}
                />
                <Button variant='outlined' size='small' className={classes.normalButton}
                  style={{display: 'block', margin: '10px auto 0 auto'}}
                  onClick={handleDeadlineExtended}
                >
                  Gia hạn
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        )
      case 'deadlineExtended':
        return (
          <div className={classes.container}>
            <Button variant='outlined' size='small' className={classes.normalButton}
              onClick={() => handlePassing('isDone', 'holder')}
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
          <div className={classes.container} style={{padding: '0 20px 10px 20px'}}>
            <Button variant='outlined' size='small' className={classes.normalButton}
              onClick={() => handlePassing('isReading', 'borrower', true)}
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