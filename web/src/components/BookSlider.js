import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Link from './Link'
import Book from './Book'
import colors from '../constants/colors'

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
  },
  loading: {
    padding: 20
  }
}))

const BookSlider = (props) => {
  const { isExtended, classes, title, url, bookList, handleToggleBookmark, isLoading, ...other } = props
  return (
    <div {...other}>
      <div className={classes.titleContainer}>
        <span className={classes.title}>{title}</span>
        {isExtended && <Link to={url} className={classes.viewMore}>Xem thêm</Link>}
      </div>
      {isLoading ?
        <div className={classes.loading}>
          <ScaleLoader color={colors.primary} />
        </div>
        :
        <CarouselProvider
          className={classes.carousel}
          naturalSlideWidth={102}
          naturalSlideHeight={205}
          totalSlides={bookList.length}
          visibleSlides={6}
        >
          <Slider>
            {
              bookList.map(book => {
                return (
                  <Slide key={book.id}>
                    <Book
                      id={book.id}
                      bookmarkId={book.bookmarkId}
                      name={book.name}
                      author={book.author}
                      image={book.image}
                      isBookmarked={book.isBookmarked}
                      rating={book.rating}
                      handleToggleBookmark={handleToggleBookmark}
                    />
                  </Slide>
                )
              })
            }
          </Slider>
        </CarouselProvider>
      }
    </div>
  )
}

export default withStyles(styles)(BookSlider)