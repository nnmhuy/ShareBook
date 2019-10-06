import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'
import LinesEllipsis from 'react-lines-ellipsis'

import Link from './Link'
import Image from './Image'

import colors from '../constants/colors'
import { ReactComponent as BookmarkIcon } from '../static/images/bookmark.svg'
import { ReactComponent as BookmarkedIcon } from '../static/images/bookmarked.svg'

const styles = (theme => ({
  container: {
    height: 200,
    width: 110
  },
  imageContainer: {
    height: 150,
    width: 100
  },
  image: {
    height: 150,
    width: 100
  },
  name: {
    fontSize: 13,
    lineHeight: 1.5
  },
  author: {
    fontSize: 10,
    lineHeight: 1.5,
    color: colors.gray
  },
  rateContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bookmarkIcon: {
    height: 12.3,
    width: 'auto',
    cursor: 'pointer'
  },
  rating: {
    fontSize: 12
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
        <Image src={image} alt={name} className={classes.image} />
      </Link>
      <div className={classes.name}>
        <Link to={`/book-detail/${id}`}>
        <LinesEllipsis
          text={name}
          maxLine='1'
          ellipsis='..'
          trimRight
          basedOn='words'
        />
        </Link>
      </div>
      <div className={classes.author}>
        <LinesEllipsis
          text={author}
          maxLine='1'
          ellipsis='..'
          trimRight
          basedOn='words'
        />
      </div>
      <div className={classes.rateContainer}>
        <Rating value={rating} precision={0.5} readOnly className={classes.rating} />
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