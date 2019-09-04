import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Divider,
  Button
} from '@material-ui/core'
import { Link } from 'react-router-dom'

import ProfileSection from './ProfileSection'
import RouteSection from './RouteSection'
import InfoSection from './InfoSection'

import colors from '../../constants/colors'

import { ReactComponent as CancelIcon } from '../../static/images/cancel.svg'
import { ReactComponent as LogOutIcon } from '../../static/images/log-out.svg'
import { ReactComponent as AlertIcon } from '../../static/images/alert.svg'

const styles = (theme => ({
  sidebar: {
      position: 'relative',
      width: 320,
      height: '100%',
      backgroundColor: colors.dark
  },
  cancelIcon: {
    width: 18,
  },
  divider: {
    backgroundColor: colors.disabled,
    height: 1
  },
  logoutIcon: {
    width: 25,
    height: 'auto'
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    boxSizing: 'border-box',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  link: {
    textDecoration: 'unset'
  },
  alertIcon: {
    width: 15,
    height: 'auto',
    marginRight: 10
  },
  reportButton: {
    color: colors.red,
    textTransform: 'unset',
    fontSize: 13
  }
}))

const Sidebar = (props) => {
  const { classes, toggleSidebar, account, currentPathname } = props
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
      <Divider className={classes.divider}/>
      <RouteSection currentPathname={currentPathname}/>
      <Divider className={classes.divider}/>
      <InfoSection/>
      <div className={classes.bottomSection}>
        <IconButton>
          <LogOutIcon className={classes.logoutIcon}/>
        </IconButton>
        <Link to={'/report'} className={classes.link}>
          <Button className={classes.reportButton}>
              <AlertIcon className={classes.alertIcon} />
              Report
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default withStyles(styles)(Sidebar)