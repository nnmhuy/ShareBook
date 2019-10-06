import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import HashLoader from 'react-spinners/HashLoader'

import color from '../constants/colors'

const styles = (theme => ({
  loading: {
    width: '100%',
    margin: 30,
    display: 'flex',
    justifyContent: 'center'
  }
}))

const Loading = (props) => {
  const { isLoading, classes } = props
  if (isLoading) {
    return (
      <div className={classes.loading}>
        <HashLoader color={color.light} size={30}/>
      </div>
    )
  }
  return null
}

export default withStyles(styles)(Loading)