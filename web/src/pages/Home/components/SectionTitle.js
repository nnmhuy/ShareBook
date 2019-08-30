import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import colors from '../../../constants/colors'

const styles = (theme => ({
  container: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center'
  },
  index: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: colors.primary,
    fontSize: 19,
    color: '#fff',
  },
  title: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 14,
    flex: 1
  }
}))

const SectionTitle = (props) => {
  const {
    classes, index, title
  } = props
  return (
    <div className={classes.container}>
      <span className={classes.index}>{index}</span>
      <span className={classes.title}>{title}</span>
    </div>
  )
}

export default withStyles(styles)(SectionTitle)