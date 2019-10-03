import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core'

import colors from '../../../constants/colors'
import { mapTransactionStatusToText, mapPositionToText } from '../../../constants/constants'
import { ReactComponent as BackIcon } from '../../../static/images/back-arrow.svg'
import Avatar from '../../../components/Avatar'
import OnlineBadge from '../../../components/OnlineBadge'
import Link from '../../../components/Link'



const styles = (theme => ({
  wrapper: {
    width: '100%',
    height: '100%'
  },
  contentWrapper: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    paddingTop: 50
  },
  appBar: {
    height: 50,
  },
  toolBar: {
    position: 'relative',
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: 'unset',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  backButton: {
  },
  backIcon: {
    width: 14,
    height: 'auto',
  },
  avatar: {
    height: 36,
    width: 36,
    marginLeft: 15
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10
  },
  username: {
    fontWeight: 500,
    fontSize: 12,
    color: colors.primary
  },
  position: {
    fontWeight: 500,
    fontStyle: 'italic',
    fontSize: 10,
    color: '#0c4f8e'
  },
  status: {
    fontWeight: 600,
    fontSize: 10,
    color: '#5c5c5c'
  },
  iButton: {
    display: 'flex',
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    background: colors.primary,
    cursor: 'pointer',
    fontFamily: 'sans-serif',
    fontWeight: 'bold'
  }
}))

const TopNav = (props) => {
  const { classes, children, avatar, name, position, status, isOnline, id
  } = props

  const handleBack = () => {
    window.history.back()
  }

  return (
    <div className={classes.wrapper}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton className={classes.backButton} onClick={handleBack}>
            <BackIcon fill={colors.primary} className={classes.backIcon} />
          </IconButton>
          <Link to={`/profile/${id}`}>
            <OnlineBadge
              overlap='circle'
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant='dot'
              invisible={!isOnline}
            >
              <Avatar src={avatar} className={classes.avatar} />
            </OnlineBadge>
          </Link>
          <div className={classes.infoContainer}>
            <div>
              <Link to={`/profile/${id}`}>
                <span className={classes.username}>{name}</span>
              </Link>
              <span className={classes.position}>{`  ${mapPositionToText[position]}`}</span>
            </div>
            <div className={classes.status}>{mapTransactionStatusToText[status]}</div>
          </div>
          <span className={classes.iButton}>i</span>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        {children}
      </div>
    </div>
  )
}

export default withStyles(styles)(TopNav)