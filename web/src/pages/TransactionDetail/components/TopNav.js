import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'

import colors from '../../../constants/colors'
import CustomTopNav from '../../../components/CustomTopNav'
import { ReactComponent as BackIcon } from '../../../static/images/back-arrow.svg'
import { ReactComponent as AlertIcon } from '../../../static/images/alert.svg'

const styles = (theme => ({
  backButton: {
    marginLeft: 5
  },
  backIcon: {
    width: 14,
    height: 'auto',
  },
  submitButton: {
    fontWeight: 600,
    fontSize: 15,
    color: colors.primary,
    cursor: 'pointer',
    marginRight: 15
  },
  reviewText: {
    fontWeight: 500,
    fontSize: 12,
    color: colors.gray
  },
  buttonDisabled: {
    color: colors.gray
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
    lineHeight: 0,
    '&:hover': {
      textDecoration: 'none'
    }
  },
  title: {
    fontWeight: 600
  },
  icon: {
    height: 25,
    width: 'auto',
    marginRight: 10
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center'
  },
}))

const TopNav = (props) => {
  const { classes, children, title } = props
  const transId = '1238asjqiq23';
  return (
    <CustomTopNav
      left={
        <Link to='/profile/me' className={classes.link}>
          <IconButton className={classes.backButton} >
            <BackIcon fill={colors.primary} className={classes.backIcon} />
          </IconButton>
        </Link>
      }
      center={
        <span className={classes.title}>
          {title}
        </span>
      }
      right={
        <div className={classes.rightSection}>
          <Link to={`/report/transaction-${transId}`} className={classes.link} >
            <AlertIcon fill={colors.primary} className={classes.icon} />
          </Link>
        </div>
      }
    >
      {children}
    </CustomTopNav>
  )
}

export default withStyles(styles)(TopNav)
