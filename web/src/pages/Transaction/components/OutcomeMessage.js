import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import colors from '../../../constants/colors'

const styles = (theme => ({
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 15,
    width: '100%',
  },
  message: {
    boxSizing: 'border-box',
    padding: '10px 20px',
    borderRadius: 5,
    background: colors.primary,
    color: '#fff',
    fontSize: 13,
    lineHeight: 1.5,
    height: 'fit-content',
    width: 'fit-content',
    maxWidth: '75%',
  }
}))

const OutcomeMessage = (props) => {
  const { classes, message } = props
  return (
    <div className={classes.container}>
      <div className={classes.message}>
        {message}
      </div>
    </div>
  )
}

export default withStyles(styles)(OutcomeMessage)