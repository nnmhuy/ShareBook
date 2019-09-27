import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  TextField,
  IconButton
} from '@material-ui/core'

import colors from '../../../constants/colors'
import { ReactComponent as SendIcon } from '../../../static/images/airplane.svg'

const styles = (theme => ({
  appBar: {
    minHeight: 55,
    bottom: 0,
    top: 'auto',
  },
  toolBar: {
    position: 'relative',
    minHeight: 55,
    padding: '10px 15px 10px 20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    color: colors.primary
  },
  textField: {
    margin: 0,
    flex: 1,
    fontSize: 13,
    border: {
      borderRadius: 4,
      border: '1px solid #b7c7d6'
    },
    '& .MuiOutlinedInput-root': {
      padding: 10,
      lineHeight: 1.5,
      '& fieldset': {
        borderColor: '#b7c7d6',
      },
      '&:hover fieldset': {
        borderColor: colors.primary
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.primary
      },
    },
  },
  sendButton: {
    marginLeft: 10
  },
  sendIcon: {
    width: 25,
    height: 'auto'
  }
}))

const CustomTopNav = (props) => {
  const { classes, value, handleChange, handleSend } = props

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <TextField
          multiline
          rowsMax='5'
          value={value}
          onChange={handleChange}
          className={classes.textField}
          margin='normal'
          variant='outlined'
          placeholder='Nhập tin nhắn ...'
          onKeyPress={handleKeyPress}
        />
        <IconButton className={classes.sendButton} onClick={handleSend}>
          <SendIcon fill={colors.primary} className={classes.sendIcon}/>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(CustomTopNav)