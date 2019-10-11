import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar
} from '@material-ui/core'
import { Button } from '@material-ui/core'

import colors from '../../../constants/colors'
import Link from '../../../components/Link'

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
  rightSection: {
    position: 'absolute',
    width: '50%',
    right: 0
  },
  addBookButton: {
    width: '90%',
    borderRadius: '0px 6px 6px 0px',
    background: colors.primary,
    color: '#fff',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: 14
  },
  borrowBookButton: {
    width: '100%',
    borderRadius: '6px 0px 0px 6px',
    background: `linear-gradient(to right, ${colors.boldPrimary} 0%, ${colors.lightPrimary} 100%)`,
    color: '#fff',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: 14
  }
}))

const BottomNav = (props) => {
  const { classes, children, bookId, initTransaction } = props

  const handleBorrow = () => {
    initTransaction()
  }

  return (
    <div className={classes.wrapper}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.leftSection}>
            <Link to={`/create-instance/${bookId}`}>
              <Button className={classes.addBookButton}>Cho mượn</Button>
            </Link>
          </div>
          <div className={classes.rightSection}>
            <Button 
              className={classes.borrowBookButton}
              onClick={handleBorrow}
            >Mượn sách</Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        {children}
      </div>
    </div>
  )
}

export default withStyles(styles)(BottomNav)

