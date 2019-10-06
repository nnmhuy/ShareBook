import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'

import colors from '../../../constants/colors'
import CustomTopNav from '../../../components/CustomTopNav'
import { ReactComponent as BackIcon } from '../../../static/images/back-arrow.svg'
import { ReactComponent as BookmarkIcon } from '../../../static/images/bookmark.svg'
import { ReactComponent as BookmarkedIcon } from '../../../static/images/bookmarked.svg'

const styles = (theme => ({
  backButton: {
    marginLeft: 5
  },
  backIcon: {
    width: 14,
    height: 'auto',
  },
  bookmarkIcon: {
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
  const { classes, children, id, bookmarkId, isBookmarked, handleToggleBookmark } = props

  const handleBack = () => {
    window.history.back()
  }

  const handleToggleLike = () => {
    handleToggleBookmark(id, bookmarkId, !isBookmarked)
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
          <BookmarkedIcon className={classes.bookmarkIcon} fill={colors.primary} onClick={handleToggleLike}/>
          :
          <BookmarkIcon className={classes.bookmarkIcon} fill={colors.primary} onClick={handleToggleLike}/>
      }
    >
      {children}
    </CustomTopNav>
  )
}

export default withStyles(styles)(TopNav)

