import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PacmanLoader from 'react-spinners/PacmanLoader'

import color from '../constants/colors'

const styles = (theme => ({
  loading: {
    width: '100%',
    height: '100%',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    background: '#00000099'
  }
}))

const Loading = (props) => {
  const { isLoading, classes } = props
  if (isLoading) {
    return (
      <div className={classes.loading}>
        <PacmanLoader color={color.primary} loading={isLoading} />
      </div>
    )
  }
  return null
}

export default withStyles(styles)(Loading)