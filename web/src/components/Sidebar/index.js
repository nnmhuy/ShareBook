import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Divider,
  Button
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ProfileSection from './ProfileSection'
import RouteSection from './RouteSection'
import InfoSection from './InfoSection'

import colors from '../../constants/colors'

import { ReactComponent as CancelIcon } from '../../static/images/cancel.svg'
import { ReactComponent as LogOutIcon } from '../../static/images/log-out.svg'
import { ReactComponent as AlertIcon } from '../../static/images/alert.svg'

import { logOut } from '../../redux/actions/accountAction'

const styles = (theme => ({
  sidebar: {
    position: 'relative',
    width: 320,
    height: '100%',
    backgroundColor: colors.dark,
    paddingBottom: 70
  },
  cancelIcon: {
    width: 18,
    paddingLeft: 10
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
  const { classes, toggleSidebar, account = {}, currentPathname, logOutHandler } = props
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
        { account.isAuth &&
        <IconButton onClick={() => { logOutHandler() }}>
          <LogOutIcon className={classes.logoutIcon}/>
        </IconButton> }
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


const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logOutHandler: logOut
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sidebar))