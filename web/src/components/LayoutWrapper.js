import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  SwipeableDrawer,
  Slide
} from '@material-ui/core'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

import Sidebar from './Sidebar/index'

import colors from '../constants/colors'
import { ReactComponent as MenuIcon } from '../static/images/menu.svg'
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
  menuIcon: {
    height: 25,
    width: 'auto'
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
    textTransform: 'unset',
    color: colors.primary
  },
  contentWrapper: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    paddingTop: 50
  },
  link: {
    textDecoration: 'unset'
  },
})

const HideOnScroll = (props) =>  {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

const LayoutWrapper = (props) => {
  const { classes, children, account, title } = props
  const { pathname } = props.location
  const [isSidebarExpanding, setSidebarExpanding] = React.useState(false)

  const toggleSidebar = (value) => () => {
    setSidebarExpanding(value)
  }

  return (
    <div className={classes.wrapper}>
      <HideOnScroll>
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <IconButton edge='start' color='inherit' aria-label='menu' onClick={toggleSidebar(true)}>
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {title}
            </Typography>
            {account.isAuth ?
              <div>
                <IconButton color='inherit'>
                  <MessageIcon fill={colors.primary} className={classes.icon} />
                </IconButton>
                <IconButton color='inherit'>
                  <NotificationIcon fill={colors.primary} className={classes.icon} />
                </IconButton>
              </div>
              :
              <Link to='/account' className={classes.link} >
                <Button color='inherit' className={classes.loginButton}>
                  Đăng nhập
                <LoginIcon fill={colors.primary} className={classes.icon} />
                </Button>
              </Link>
            }
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <SwipeableDrawer
        open={isSidebarExpanding}
        onClose={toggleSidebar(false)}
        onOpen={toggleSidebar(true)}
        className={classes.sidebarWrapper}
      >
          <Sidebar toggleSidebar={toggleSidebar} account={account} currentPathname={pathname}/>
      </SwipeableDrawer>
      <div className={classes.contentWrapper}>
        {children}
      </div>
    </div>
  )
}

export default withRouter(withStyles(styles)(LayoutWrapper))