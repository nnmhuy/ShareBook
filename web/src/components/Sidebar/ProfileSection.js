import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Avatar
} from '@material-ui/core'
import { Link } from 'react-router-dom'

import colors from '../../constants/colors'

import UserIcon from '../../static/images/user_nologin.svg'
import { ReactComponent as ArrowIcon } from '../../static/images/right-arrow.svg'
import { ReactComponent as LoginIcon } from '../../static/images/login.svg'

const styles = (theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingRight: 30,
    marginTop: 10,
    marginBottom: 10,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8
    },
    textDecoration: 'unset'
  },
  avatar: {
    width: 57,
    height: 57
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 30
  },
  username: {
    fontWeight: 600,
    fontSize: 18.5,
    color: '#fff',
  },
  point: {
    fontSize: 12.5,
    color: '#9f9f9f'
  },
  icon: {
    height: 15,
    width: 'auto'
  }
}))

const ProfileSection = (props) => {
  const { classes, account } = props
  return (
    <Link className={classes.container} to={account.isAuth ? '/profile' : '/account'}>
      <Avatar className={classes.avatar} src={account.avatar || UserIcon} />
      <div className={classes.info}>
        <span className={classes.username}>{account.isAuth ? account.username : 'Đăng nhập'}</span>
        {account.isAuth && <span className={classes.point}>99 điểm</span>}
      </div>
      {account.isAuth?
        <ArrowIcon fill={colors.light} className={classes.icon}/>
        :
        <LoginIcon fill={colors.light} className={classes.icon} style={{ transform: 'rotate(90deg)' }}/>
      }
    </Link>
  )
}

export default withStyles(styles)(ProfileSection)