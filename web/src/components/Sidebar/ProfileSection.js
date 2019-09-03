import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Avatar
} from '@material-ui/core'

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
    marginTop: 10,
    marginBottom: 10,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8
    }
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
    paddingRight: 20
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
    height: 20,
    width: 'auto'
  }
}))

const ProfileSection = (props) => {
  const { classes, account } = props
  return (
    <div className={classes.container}>
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
    </div>
  )
}

export default withStyles(styles)(ProfileSection)