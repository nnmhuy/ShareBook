import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'

import Link from './Link'

import colors from '../constants/colors'
import { ReactComponent as BookmarkIcon } from '../static/images/bookmark.svg'
import { ReactComponent as BookmarkedIcon } from '../static/images/bookmarked.svg'

const styles = (theme => ({
  container: {

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
  const { classes, id, name, author, image, isBookmarked, rating, ...other } = props
  return (
    <div className={classes.container} {...other}>
      <Link to={`/book-detail/${id}`} className={classes.image}>
        <img src={image} alt={name}/>
      </Link>
      <div className={classes.name}>
        <Link to={`/book-detail/${id}`}>
          {name}
        </Link>
      </div>
      <div className={classes.author}>
        <Link to={`/filter/author=${author}`}>
          {author}
        </Link>
      </div>
      <div className={classes.rateContainer}>
        <Rating value={rating} precision={0.5} readOnly className={classes.rating}/>
        {isBookmarked?
            <BookmarkedIcon className={classes.bookmarkIcon}/>
          :
            <BookmarkIcon className={classes.bookmarkIcon}/>
        }
      </div>
    </div>
  )
}

export default withStyles(styles)(Book)