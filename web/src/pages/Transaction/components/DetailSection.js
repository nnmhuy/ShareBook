import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import colors from '../../../constants/colors'
import getFormattedDate from '../../../helper/getFormattedDate'
import Input from '@material-ui/core/Input';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { errorAlert } from '../../../components/alert'

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
    paddingRight: 5,
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
  editWrapper: {
    display: 'flex',
    width: '90%',
    alignItems: 'center',
    position: 'relative'
  },
  editContent: {
    margin: '0 5px',
    color: colors.primary,
    display: 'inline-block',
    fontSize: 12,
    cursor: 'pointer',
    fontWeight: 500,
    transition: '0.3s',
    position: 'absolute',
    right: '-40px',
    '&:hover': {
      fontWeight: 600
    }
  },
  cancelOrder: {
    textAlign: 'right',
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      fontWeight: 600
    }
  },
  keyboardError: {
    '& .MuiInputBase-root': {
      color: colors.red
    },
  },
  keyboard: {
    '& .MuiInputBase-root': {
      fontFamily: 'montserrat',
      fontSize: 12,
      fontWeight: 500,
      width: 115
    },
    '&.MuiFormControl-marginNormal': {
      marginTop: 0,
      marginBottom: 0
    },
    '& .MuiInput-underline:before': {
      borderBottom: 0
    },
    '& .MuiInput-underline:after': {
      borderBottom: 0
    },
    '& .MuiInput-underline:hover:before': {
      borderBottom: 0
    },
    '& .MuiIconButton-root': {
      color: colors.primary,
      padding: 6
    }
  },
  contentAddress: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '100%',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 500,
  },
  contentAddressInput: {
    '&.MuiInputBase-root': {
      fontFamily: 'montserrat',
      fontSize: 12,
      fontWeight: 500,
      width: '100%'
    },
  },
  fieldWrapperAddress: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  fieldWrapperDate: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const DetailSection = (props) => {
  const { classes, transactionId, status, 
    position, returnDate, address, passingDate,
    estimatedReadingTime, extendedDeadline, sendRequestStatus, changeDateTransaction
  } = props
  const currentDate = new Date()
  const [curAddress, setAddress] = useState('')
  const [addressBool, changeAddress] = useState(false)

  const [selectedDate, setSelectedDate] = useState(passingDate);

  useEffect(() => {
    setAddress(address)
    // setSelectedDate(currentDate.setDate(currentDate.getDate() + 7))
  }, [address])

  useEffect(() => {
    changeAddress(false)
    if (status === 'waitingForTake') {
      let passDay = currentDate.setDate(currentDate.getDate() + 5)
      setSelectedDate(passDay)
      if (!passingDate)
        changeDateTransaction({ value: passDay, transactionId, type: 'passingDate', status, initial: true })
      else
        setSelectedDate(passingDate)
    }
    else if (status === 'isReading') {
      let reDay = new Date(passingDate)
      reDay = reDay.setDate(reDay.getDate() + estimatedReadingTime)
      setSelectedDate(reDay)
      if (!returnDate)
        changeDateTransaction({ value: reDay , transactionId, type: 'returnDate', status, initial: true })
      else
        setSelectedDate(returnDate)
    } else if (status === 'deadlineExtended') {
      let deadlineDate = new Date(returnDate)
        deadlineDate = deadlineDate.setDate(deadlineDate.getDate() + extendedDeadline)
      if (extendedDeadline !== 0)
        changeDateTransaction({ value: deadlineDate, transactionId, type: 'returnDate', status, initial: true })
    } 
    // setSelectedDate(currentDate.setDate(currentDate.getDate() + 7))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, passingDate, returnDate, extendedDeadline])

  const handlePassingDate = date => {
    if (date < currentDate) {
      errorAlert('Chỉnh ngày không thành công')
      return
    }
    setSelectedDate(date);
    changeDateTransaction({value: date, transactionId, type: 'passingDate', status })
  };

  const handleRequest = (newStatus, direction) => () => {
    sendRequestStatus({
      transactionId,
      status: newStatus,
      direction
    })
  }

  const handleChange = (e) => {
    setAddress(e.target.value)
  }

  const handleBlur = (e) => {
    handleChangeAddress()
  }

  const handleChangeAddress = () => {
    changeAddress(!addressBool)
    if (addressBool)
      changeDateTransaction({ value: curAddress, transactionId, type: 'address', status })
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
              <div className={`${classes.fieldWrapper} ${classes.fieldWrapperDate}`}>
                <div className={classes.label}>Ngày giao:</div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    id="datePicker"
                    margin="normal"
                    format="dd-MM-yyyy"
                    value={passingDate}
                    onChange={handlePassingDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    className={classes.keyboard}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className={`${classes.fieldWrapper} ${classes.fieldWrapperAddress}`}>
                <div className={classes.label}>Địa chỉ:</div>
                <div className={classes.editWrapper}>
                  {
                    !addressBool ?
                      <div className={classes.contentAddress} style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        width: '100%'
                      }}>{address}</div>
                      :
                      <div className={classes.contentAddress} style={{width: '100%'}}>
                        <Input
                          className={classes.contentAddressInput}
                          name='address'
                          type='text'
                          value={curAddress}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div> 
                  }
                  <div className={classes.editContent}
                    onClick={handleChangeAddress}
                    // onClick={() => openModal(passingDate, address, true)}
                  >Sửa</div>
                </div>
              </div>
              <div className={classes.fieldWrapper}>
                <div className={`${classes.labelError} ${classes.cancelOrder}`}
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
              <div className={`${classes.fieldWrapper} ${classes.fieldWrapperDate}`}>
                <div className={classes.label}>Ngày trả:</div>
                <div className={classes.content}>{getFormattedDate(returnDate, false, true, false)}</div>
              </div>
              <div className={`${classes.fieldWrapper} ${classes.fieldWrapperAddress}`}>
                <div className={classes.label}>Địa chỉ:</div>
                <div className={classes.editWrapper}>
                  {
                    !addressBool ?
                      <div className={classes.contentAddress}>{address}</div>
                      :
                      <div className={classes.contentAddress}>
                        <Input
                          className={classes.contentAddressInput}
                          name='address'
                          type='text'
                          value={curAddress}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                  }
                  <div className={classes.editContent}
                    onClick={handleChangeAddress}
                  // onClick={() => openModal(passingDate, address, true)}
                  >Sửa</div>
                </div>
              </div>
            </div>
          )
        case 'isOvertime':
          return (
            <div>
              <div className={`${classes.fieldWrapper} ${classes.fieldWrapperDate}`}>
                <div className={classes.labelError}>Ngày trả:</div>
                <div className={classes.contentError}>{getFormattedDate(returnDate, false, true, false)}</div>
              </div>
              <div className={`${classes.fieldWrapper} ${classes.fieldWrapperAddress}`}>
                <div className={classes.label}>Địa chỉ:</div>
                <div className={classes.editWrapper}>
                  {
                    !addressBool ?
                      <div className={classes.contentAddress}>{address}</div>
                      :
                      <div className={classes.contentAddress}>
                        <Input
                          className={classes.contentAddressInput}
                          name='address'
                          type='text'
                          value={curAddress}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                  }
                  <div className={classes.editContent}
                    onClick={handleChangeAddress}
                  // onClick={() => openModal(passingDate, address, true)}
                  >Sửa</div>
                </div>
              </div>
            </div>
          )
        case 'waitingForDeadlineExtended':
          return (
            <div>
              <div className={`${classes.fieldWrapper} ${classes.fieldWrapperDate}`}>
                <div className={classes.labelError}>Ngày trả:</div>
                <div className={classes.contentError}>{getFormattedDate(returnDate, false, true, false)}</div>
              </div>
              <div className={`${classes.fieldWrapper} ${classes.fieldWrapperAddress}`}>
                <div className={classes.label}>Địa chỉ:</div>
                <div className={classes.contentAddress}>{address}</div>
              </div>
            </div>
          )
        case 'deadlineExtended':
          return (
            <div>
              <div className={`${classes.fieldWrapper} ${classes.fieldWrapperDate}`}>
                <div className={classes.label}>
                  Ngày trả <span className={classes.labelError}> (đã gia hạn):</span>
                </div>
                <div className={classes.contentError}>{getFormattedDate(returnDate, false, true, false)}</div>
              </div>
              <div className={`${classes.fieldWrapper} ${classes.fieldWrapperAddress}`}>
                <div className={classes.label}>Địa chỉ:</div>
                <div className={classes.contentAddress}>{address}</div>
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
          <div className={`${classes.fieldWrapper} ${classes.fieldWrapperDate}`}>
            <div className={classes.label}>Ngày nhận:</div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="datePicker"
                margin="normal"
                format="dd-MM-yyyy"
                value={passingDate}
                onChange={handlePassingDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                className={classes.keyboard}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={`${classes.fieldWrapper} ${classes.fieldWrapperAddress}`}>
            <div className={classes.label}>Địa chỉ</div>
            <div className={classes.editWrapper}>
              {
                !addressBool ?
                  <div className={classes.contentAddress}>{curAddress}</div>
                  :
                  <div className={classes.contentAddress}>
                    <Input
                      className={classes.contentAddressInput}
                      name='passingDate'
                      type='text'
                      value={curAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
              }
              <div className={classes.editContent}
                onClick={handleChangeAddress}
              // onClick={() => openModal(passingDate, address, true)}
              >Sửa</div>
            </div>
          </div>
        </div>
      )
    case 'isReading':
      return (
        <div>
          <div className={`${classes.fieldWrapper} ${classes.fieldWrapperDate}`}>
            <div className={classes.label}>Ngày trả:</div>
            <div className={classes.content}>{getFormattedDate(returnDate, false, true, false)}</div>
          </div>
          <div className={`${classes.fieldWrapper} ${classes.fieldWrapperAddress}`}>
            <div className={classes.label}>Địa chỉ:</div>
            <div className={classes.editWrapper}>
              {
                !addressBool ?
                  <div className={classes.contentAddress}>{curAddress}</div>
                  :
                  <div className={classes.contentAddress}>
                    <Input
                      className={classes.contentAddressInput}
                      name='passingDate'
                      type='text'
                      value={curAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
              }
              <div className={classes.editContent}
                onClick={handleChangeAddress}
              // onClick={() => openModal(passingDate, address, true)}
              >Sửa</div>
            </div>
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
          <div className={`${classes.fieldWrapper} ${classes.fieldWrapperDate}`}>
            <div className={classes.labelError}>Ngày trả:</div>
            <div className={classes.contentError}>{getFormattedDate(returnDate, false, true, false)}</div>
          </div>
          <div className={`${classes.fieldWrapper} ${classes.fieldWrapperAddress}`}>
            <div className={classes.label}>Địa chỉ:</div>
            <div className={classes.contentAddress}>{address}</div>
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
          <div className={`${classes.fieldWrapper} ${classes.fieldWrapperDate}`}>
            <div className={classes.labelError}>Ngày trả:</div>
            <div className={classes.contentError}>{getFormattedDate(returnDate, false, true, false)}</div>
          </div>
          <div className={`${classes.fieldWrapper} ${classes.fieldWrapperAddress}`}>
            <div className={classes.label}>Địa chỉ:</div>
            <div className={classes.contentAddress}>{address}</div>
          </div>
        </div>
      )
    case 'deadlineExtended':
      return (
        <div>
          <div className={`${classes.fieldWrapper} ${classes.fieldWrapperDate}`}>
            <div className={classes.label}>
              Ngày trả <span className={classes.labelError}> (đã gia hạn):</span>
            </div>
            <div className={classes.contentError}>{getFormattedDate(returnDate, false, true, false)}</div>
          </div>
          <div className={`${classes.fieldWrapper} ${classes.fieldWrapperAddress}`}>
            <div className={classes.label}>Địa chỉ:</div>
            <div className={classes.contentAddress}>{address}</div>
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