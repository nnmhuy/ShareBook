import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Carousel from 'nuka-carousel'

import Link from '../../../components/Link'
import Book from '../../../components/Book'

const styles = (theme => ({
  container: {
    padding: 20,
    overflow: 'hidden',
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  label: {
    fontWeight: 600,
    fontSize: 15,
  },
  more: {
    fontSize: 13,
    color: '#0274df'
  },
  slider: {
    marginTop: 20
  }
}))

const SimilarBookSection = (props) => {
  const { classes, category, similarBookList } = props

  return (
    <div className={classes.container}>
      <div className={classes.labelContainer}>
        <span className={classes.label}>Thể loại tương tự</span>
        <Link className={classes.more} to={`/book-list/${category}`}>Xem thêm</Link>
      </div>
      <Carousel
        className={classes.slider}
        slideWidth='102px'
        cellSpacing={40}
        withoutControls
        slidesToScroll='auto'
      >
        {
          similarBookList.map(book => {
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

export default withStyles(styles)(SimilarBookSection)
