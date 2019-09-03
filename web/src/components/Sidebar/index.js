import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  IconButton
} from '@material-ui/core'

import ProfileSection from './ProfileSection'

import colors from '../../constants/colors'

import { ReactComponent as CancelIcon } from '../../static/images/cancel.svg'

const styles = (theme => ({
  sidebar: {
      width: 350,
      height: '100%',
      backgroundColor: colors.dark
  },
  cancelIcon: {
    width: 18,
  }
}))

const Sidebar = (props) => {
  const { classes, toggleSidebar, account } = props
  return (
    <div
      className={classes.sidebar}
      role="presentation"
      onClick={toggleSidebar(false)}
      onKeyDown={toggleSidebar(false)}
    >
      <IconButton>
        <CancelIcon fill={'#fff'} className={classes.cancelIcon} />
      </IconButton>
      <ProfileSection account={account} />
    </div>
  )
}

export default withStyles(styles)(Sidebar)