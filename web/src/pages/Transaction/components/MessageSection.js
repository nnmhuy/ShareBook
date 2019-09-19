import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import IncomeMessage from './IncomeMessage'
import OutcomeMessage from './OutcomeMessage'

const styles = (theme => ({
  container: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '20px 15px'
  }
}))

const MessageSection = (props) => {
  const { classes } = props
  return (
    <div className={classes.container}>
      <OutcomeMessage 
        message='Bạn muốn giao dịch sách ở đâu nhỉ?'
      />
      <IncomeMessage 
        avatar={require('../../../static/images/avatar-placeholder.png')}
        message='Chắc hẹn giao ở địa chỉ bạn mong muốn luôn nha, để đỡ phiền bạn.'
      />
      <OutcomeMessage
        message='Bạn muốn giao dịch sách ở đâu nhỉ?'
      />
      <IncomeMessage
        avatar={require('../../../static/images/avatar-placeholder.png')}
        message='Chắc hẹn giao ở địa chỉ bạn mong muốn luôn nha, để đỡ phiền bạn.'
      />
      <OutcomeMessage
        message='Bạn muốn giao dịch sách ở đâu nhỉ?'
      />
      <IncomeMessage
        avatar={require('../../../static/images/avatar-placeholder.png')}
        message='Chắc hẹn giao ở địa chỉ bạn mong muốn luôn nha, để đỡ phiền bạn.'
      />
      <OutcomeMessage
        message='Bạn muốn giao dịch sách ở đâu nhỉ?'
      />
      <IncomeMessage
        avatar={require('../../../static/images/avatar-placeholder.png')}
        message='Chắc hẹn giao ở địa chỉ bạn mong muốn luôn nha, để đỡ phiền bạn.'
      />
      <OutcomeMessage
        message='Bạn muốn giao dịch sách ở đâu nhỉ?'
      />
      <IncomeMessage
        avatar={require('../../../static/images/avatar-placeholder.png')}
        message='Chắc hẹn giao ở địa chỉ bạn mong muốn luôn nha, để đỡ phiền bạn.'
      />
      <OutcomeMessage
        message='Bạn muốn giao dịch sách ở đâu nhỉ?'
      />
      <IncomeMessage
        avatar={require('../../../static/images/avatar-placeholder.png')}
        message='Chắc hẹn giao ở địa chỉ bạn mong muốn luôn nha, để đỡ phiền bạn.'
      />
      <OutcomeMessage
        message='Bạn muốn giao dịch sách ở đâu nhỉ?'
      />
      <IncomeMessage
        avatar={require('../../../static/images/avatar-placeholder.png')}
        message='Chắc hẹn giao ở địa chỉ bạn mong muốn luôn nha, để đỡ phiền bạn.'
      />
      <OutcomeMessage
        message='Bạn muốn giao dịch sách ở đâu nhỉ?'
      />
      <IncomeMessage
        avatar={require('../../../static/images/avatar-placeholder.png')}
        message='Chắc hẹn giao ở địa chỉ bạn mong muốn luôn nha, để đỡ phiền bạn.'
      />
    </div>
  )
}

export default withStyles(styles)(MessageSection)