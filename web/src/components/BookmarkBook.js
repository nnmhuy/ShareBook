import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Link from './Link'
import BookImg from '../static/images/demo/escape_velocity.png';

import { ReactComponent as BookmarkIcon } from '../static/images/bookmark.svg'
import { ReactComponent as BookmarkedIcon } from '../static/images/bookmarked-btn.svg'
import Image from './Image';

const styles = (theme => ({
  container: {
    height: 200,
    width: 'fit-content',
    position: 'relative',
    margin: 'auto'
  },
  imageContainer: {
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
    background: 'white'
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
    <div className={classes.container} {...other}>
      <Link to={`/book-detail/${id}`} className={classes.imageContainer}>
        <Image src={BookImg} alt={name} isStatic className={classes.image} />
      </Link>
      <div className={classes.rateContainer}>
        {isBookmarked ?
          <BookmarkedIcon className={classes.bookmarkIcon} onClick={onBookmark} />
          :
          <BookmarkIcon className={classes.bookmarkIcon} onClick={onBookmark} />
        }
      </div>
    </div>
  )
}

export default withStyles(styles)(Book)