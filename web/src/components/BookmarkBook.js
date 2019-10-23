import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Link from './Link'
import BookImg from '../static/images/demo/escape_velocity.png';

import { ReactComponent as BookmarkIcon } from '../static/images/bookmark.svg'
import { ReactComponent as BookmarkedIcon } from '../static/images/bookmarked-btn.svg'
import Image from './Image';
import colors from '../constants/colors';

const styles = (theme => ({
  container: {
    height: 150,
    width: 100,
    position: 'relative',
    margin: 'auto',
    transition: '0.3s',
    '&:after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: 145,
      width: 0,
      height: 0,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '5px solid transparent',
      transition: '0.3s',
      zIndex: '-1'
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 95,
      width: 0,
      height: 0,
      borderTop: '5px solid transparent',
      borderBottom: '5px solid transparent',
      borderRight: '5px solid transparent',
      transition: '0.3s',
    },
    '&:hover': {
      // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      '&:after': {
        transition: '0.3s',
        top: 150,
        width: 95,
        borderTop: `5px solid ${colors.primary}`,
      },
      '&:before': {
        transition: '0.3s',
        right: 100,
        height: 145,
        borderRight: `5px solid ${colors.primary}`,
      }
    }
  },
  imageContainer: {
    position: 'absolute',
    height: 150,
    width: 100
  },
  image: {
    height: 150,
    width: 100
  },
  rateContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
    padding: '5px 5px 5px 5px',
    borderRadius: '0 0 3px 3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'white',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
    zIndex: 2
  },
  bookmarkIcon: {
    height: 18,
    width: 'auto',
    cursor: 'pointer'
  }
}))

const Book = (props) => {
  const { classes, id, bookmarkId, name, author, image, isBookmarked, handleToggleBookmark, ...other } = props
  let { rating } = props
  try {
    if (typeof rating === 'string')
      rating = parseInt(rating)
  } catch (err) {
    rating = 0
  }

  const onBookmark = () => {
    handleToggleBookmark(id, bookmarkId, !isBookmarked)
  }

  return (
    <div className={classes.container}>
      <Link to={`/book-detail/${id}`} className={classes.imageContainer}>
        <Image src={image} alt={name} className={classes.image} />
      </Link>
      <div className={classes.rateContainer}>
        {isBookmarked ?
          <BookmarkedIcon className={classes.bookmarkIcon}
            // onClick={onBookmark}
          />
          :
          <BookmarkIcon className={classes.bookmarkIcon}
            // onClick={onBookmark}
          />
        }
      </div>
    </div>
  )
}

export default withStyles(styles)(Book)