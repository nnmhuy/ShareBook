import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Link from './Link'

import colors from '../constants/colors'

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
  }
}))

const Book = (props) => {
  const { classes, id, name, author, image } = props
  return (
    <div className={classes.container}>
      <Link to={`/book-detail/${id}`}>
        <img src={image} alt={name}/>
      </Link>
      <div className={classes.name}>{name}</div>
      <div className={classes.author}>{author}</div>
    </div>
  )
}

export default withStyles(styles)(Book)