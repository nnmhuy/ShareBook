import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'

import colors from '../../../constants/colors'
import CustomTopNav from '../../../components/CustomTopNav'
import { ReactComponent as BackIcon } from '../../../static/images/back-arrow.svg'
import { ReactComponent as HeartIcon } from '../../../static/images/heart.svg'
import { ReactComponent as HeartFullIcon } from '../../../static/images/heart-full.svg'

const styles = (theme => ({
  backButton: {
    marginLeft: 5
  },
  backIcon: {
    width: 14,
    height: 'auto',
  },
  heartIcon: {
    height: 25,
    width: 'auto',
    cursor: 'pointer',
    '-webkit-tap-highlight-color': 'transparent',
    marginRight: 20
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    color: colors.primary,
  }
}))

const TopNav = (props) => {
  const { classes, children, id, isBookmarked, handleToggleBookmark } = props

  const handleBack = () => {
    window.history.back()
  }

  const handleToggleLike = () => {
    handleToggleBookmark(id, !isBookmarked)
  }

  return (
    <CustomTopNav 
      left={
        <IconButton className={classes.backButton} onClick={handleBack}>
          <BackIcon fill={colors.primary} className={classes.backIcon} />
        </IconButton>
      }
      center={
        <span className={classes.title}>Chi tiết sách</span>
      }
      right={
        isBookmarked?
          <HeartFullIcon className={classes.heartIcon} onClick={handleToggleLike}/>
          :
          <HeartIcon className={classes.heartIcon} fill={colors.primary} onClick={handleToggleLike}/>
      }
    >
      {children}
    </CustomTopNav>
  )
}

export default withStyles(styles)(TopNav)

