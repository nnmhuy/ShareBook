import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'

import colors from '../../../constants/colors'
import CustomTopNav from '../../../components/CustomTopNav'
import Image from '../../../components/Image'
import { ReactComponent as BackIcon } from '../../../static/images/back-arrow.svg'

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
  bookContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  textContainer: {
    marginLeft: 5
  },
  bookImage: {
    width: 30,
    height: 40,
  },
  bookName: {
    fontWeight: 600,
    fontSize: 15,
    color: '#000'
  },
  reviewText: {
    fontWeight: 500,
    fontSize: 12,
    color: colors.gray
  },
  buttonDisabled: {
    color: colors.gray
  }
}))

const TopNav = (props) => {
  const { classes, children, handleSubmit, bookImage, name, isLoading } = props

  const handleBack = () => {
    window.history.back()
  }

  return (
    <CustomTopNav
      left={
        <IconButton className={classes.backButton} onClick={handleBack}>
          <BackIcon fill={colors.primary} className={classes.backIcon} />
        </IconButton>
      }
      center={
        <div className={classes.bookContainer}>
          <Image src={bookImage} alt='book' className={classes.bookImage} />
          <div className={classes.textContainer}>
            <div className={classes.bookName}>{name}</div>
            <div className={classes.reviewText}>Review</div>
          </div>
        </div>
      }
      right={
        <span className={`${classes.submitButton} ${isLoading && classes.buttonDisabled}`} onClick={handleSubmit}>Đăng</span>
      }
    >
      {children}
    </CustomTopNav>
  )
}

export default withStyles(styles)(TopNav)

