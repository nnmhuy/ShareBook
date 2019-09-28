import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar
} from '@material-ui/core'

import colors from '../constants/colors'
import HideOnScroll from './HideOnScroll'

const styles = (theme => ({
  wrapper: {
    width: '100%'
  },
  contentWrapper: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    paddingBottom: 45
  },
  appBar: {
    height: 45,
    bottom: 0,
    top: 'auto',
  },
  toolBar: {
    position: 'relative',
    height: 45,
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: 'unset',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: colors.primary
  },
  leftSection: {
    position: 'absolute',
    width: '50%',
    left: 0
  },
  centerSection: {
    margin: 'auto'
  },
  rightSection: {
    position: 'absolute',
    width: '50%',
    right: 0
  }
}))

const CustomTopNav = (props) => {
  const { classes, left, right, center, children } = props
  return (
    <div className={classes.wrapper}>
      <HideOnScroll direction='up'>
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <div className={classes.leftSection}>
              {left}
            </div>
            <div className={classes.centerSection}>
              {center}
            </div>
            <div className={classes.rightSection}>
              {right}
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.contentWrapper}>
        {children}
      </div>
    </div>
  )
}

export default withStyles(styles)(CustomTopNav)