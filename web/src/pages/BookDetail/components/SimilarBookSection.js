import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Slider from 'react-slick'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Link from '../../../components/Link'
import Book from '../../../components/Book'

import { maxMobileWidth } from '../../../constants/constants'

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
  const mobile = useMediaQuery(`(max-width:${maxMobileWidth})`)

  const settings = {
    dots: false,
    infinite: false,
    arrow: false,
    pauseOnHover: true,
    speed: 500,
    slidesToShow: mobile ? 2.5 : 3.5,
    slidesToScroll: 1,
    swipeToSlide: true
  }

  return (
    <div className={classes.container}>
      <div className={classes.labelContainer}>
        <span className={classes.label}>Thể loại tương tự</span>
        <Link className={classes.more} to={`/book-list/${category}`}>Xem thêm</Link>
      </div>
      <Slider {...settings} className={classes.slider}>
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
      </Slider>
    </div>
  )
}

export default withStyles(styles)(SimilarBookSection)
