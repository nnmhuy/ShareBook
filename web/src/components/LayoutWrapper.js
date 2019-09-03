import React from 'react'
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer
} from '@material-ui/core'

import Sidebar from './Sidebar/index'

import colors from '../constants/colors'
import { ReactComponent as MenuIcon } from '../static/images/book-open.svg'
import { ReactComponent as NotificationIcon } from '../static/images/bell.svg'
import { ReactComponent as MessageIcon } from '../static/images/chat-speech-bubbles.svg'
import { ReactComponent as LoginIcon } from '../static/images/login.svg'

const styles = (theme) => ({
  wrapper: {
    width: '100%',
    height: '100%'
  },
  appBar: {
    height: 50
  },
  toolBar: {
    height: 50,
    minHeight: 'unset',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: colors.primary
  },
  title: {
    flex: '1',
    textAlign: 'center'
  },
  icon: {
    height: 18,
    width: 'auto'
  },
  loginButton: {
    width: 110,
    display: 'flex',
    justifyContent:'space-between',
    alignItems: 'center',
    textTransform: 'unset'
  },
  contentWrapper: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    paddingTop: 50
  }
})

const LayoutWrapper = (props) => {
  const { classes, children, account } = props
  const { pathname } = props.location;
  const [isSidebarExpanding, setSidebarExpanding] = React.useState(true)

  const toggleSidebar = (value) => () => {
    setSidebarExpanding(value)
  }

  return (
    <div className={classes.wrapper}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar} onClick={toggleSidebar(true)}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {pathname}
          </Typography>
          {account.isAuth ?          
            <div>
              <IconButton color="inherit">
                <MessageIcon fill={colors.primary} className={classes.icon}/>
              </IconButton>
              <IconButton color="inherit">
                <NotificationIcon fill={colors.primary} className={classes.icon}/>
              </IconButton>
            </div>
            :
            <Button color="inherit" className={classes.loginButton}>
              Đăng nhập
              <LoginIcon fill={colors.primary} className={classes.icon} />
            </Button>
          }
        </Toolbar>
      </AppBar>
      <Drawer open={isSidebarExpanding} onClose={toggleSidebar(false)} className={classes.sidebarWrapper}>
          <Sidebar toggleSidebar={toggleSidebar} account={account}/>
      </Drawer>
      <div className={classes.contentWrapper}>
        {children}
      </div>
    </div>
  )
}

export default withRouter(withStyles(styles)(LayoutWrapper))