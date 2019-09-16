import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Carousel from 'nuka-carousel'

import Link from './Link'
import Book from './Book'

const styles = (theme => ({
  container: {
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontWeight: 600,
    fontSize: 13,
  },
  viewMore: {
    fontWeight: 500,
    fontSize: 11,
    color: '#0274df'
  },
  carousel: {
    marginTop: 20,
    paddingLeft: 20,
    marginBottom: 20
  }
}))

const BookSlider = (props) => {
  const { classes, title, url, bookList, ...other } = props
  return (
    <div {...other}>
      <div className={classes.titleContainer}>
        <span className={classes.title}>{title}</span>
        <Link to={url} className={classes.viewMore}>Xem thêm</Link>
      </div>
      <Carousel
        className={classes.carousel}
        slideWidth='102px'
        cellSpacing={40}
        withoutControls
        slidesToScroll='auto'
        initialSlideHeight={205}
      >
        {
          bookList.map(book => {
            return (
              <Book
                {...book}
                key={book.id}
              />
            )
          })
        }
      </Carousel>
    </div>
  )
}

export default withStyles(styles)(BookSlider)