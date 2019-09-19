import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Avatar
} from '@material-ui/core'

const styles = (theme => ({
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginBottom: 15,
    width: '100%',
  },
  avatar: {
    width: 41,
    height: 41,
  },
  message: {
    marginLeft: 10,
    boxSizing: 'border-box',
    padding: '10px 20px',
    borderRadius: 5,
    background: '#f2f2f2',
    fontSize: 13,
    lineHeight: 1.5,
    height: 'fit-content',
    width: 'fit-content',
    maxWidth: '70%',
  }
}))

const IncomeMessage = (props) => {
  const { classes, avatar, message } = props
  return (
    <div className={classes.container}>
      <Avatar src={avatar} className={classes.avatar}/>
      <div className={classes.message}>
        {message}
      </div>
    </div>
  )
}

export default withStyles(styles)(IncomeMessage)