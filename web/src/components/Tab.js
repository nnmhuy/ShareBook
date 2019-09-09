import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Tab } from '@material-ui/core'

import colors from '../constants/colors'

const styles = (theme => ({
  tab: {
    flex: 1,
    textTransform: 'none',
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray,
    '&.Mui-selected': {
      color: '#000',
      opacity: 1
    }
  },
}))

const CustomTab = (props) => {
  const { classes, label, ...other } = props
  return (
    <Tab disableRipple label={label} className={classes.tab} {...other}/>
  )
}

export default withStyles(styles)(CustomTab)