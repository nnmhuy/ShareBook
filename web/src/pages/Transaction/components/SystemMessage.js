import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
    fontWeight: 500,
    fontSize: 13,
    color: '#8d8d8d'
  },
}))

const OutcomeMessage = (props) => {
  const { classes, message } = props
  return (
    <div className={classes.container}>
      {message}
    </div>
  )
}

export default withStyles(styles)(OutcomeMessage)