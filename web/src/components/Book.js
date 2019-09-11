import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'

import Link from './Link'

import colors from '../constants/colors'
import { ReactComponent as BookmarkIcon } from '../static/images/bookmark.svg'

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
  bookmarkIcon: {
    height: 9.3,
    width: 'auto'
  }
}))

const Book = (props) => {
  const { classes, id, name, author, image, isBookmarked, rating } = props
  return (
    <div className={classes.container}>
      <Link to={`/book-detail/${id}`}>
        <img src={image} alt={name}/>
      </Link>
      <div className={classes.name}>{name}</div>
      <div className={classes.author}>{author}</div>
      <div>
        <BookmarkIcon className={classes.bookmarkIcon} onClick={()=>alert(1)}/>
        <Rating value={rating} precision={0.5} readOnly size='small'/>
      </div>
    </div>
  )
}

export default withStyles(styles)(Book)