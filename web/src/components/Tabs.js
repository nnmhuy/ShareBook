import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Tabs } from '@material-ui/core'

import colors from '../constants/colors'

const styles = (theme => ({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    "& > div": {
      width: '100%',
      maxWidth: 80,
      backgroundColor: colors.primary
    }
  }
}))

const CustomTab = (props) => {
  const { classes, value, onChange, label, children, ...other } = props
  return (
    <Tabs
      value={value}
      onChange={onChange}
      TabIndicatorProps={{ className: classes.indicator, children: <div /> }}
      className={classes.tabs}
      {...other}
    >
      {children}
    </Tabs>
  )
}

export default withStyles(styles)(CustomTab)