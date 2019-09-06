import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Slider from 'react-slick'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Link from '../../components/Link'
import Book from '../../components/Book'

import { maxMobileWidth } from '../../constants/constants'

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

const demoBooks = [
  { 
    id: '13',
    name: 'Netherland',
    author: 'Joseph O’Neill',
    image: require('../../static/images/demo/netherland.png')
  },
  {
    id: '14',
    name: 'Escape Velocity',
    author: 'Geoffrey A. Moore',
    image: require('../../static/images/demo/escape_velocity.png')
  },
  {
    id: '15',
    name: 'In the woods',
    author: 'Tana French',
    image: require('../../static/images/demo/in_the_woods.png')
  },
  {
    id: '16',
    name: 'Netherland',
    author: 'Joseph O’Neill',
    image: require('../../static/images/demo/netherland.png')
  },
  {
    id: '17',
    name: 'Escape Velocity',
    author: 'Geoffrey A. Moore',
    image: require('../../static/images/demo/escape_velocity.png')
  },
  {
    id: '18',
    name: 'In the woods',
    author: 'Tana French',
    image: require('../../static/images/demo/in_the_woods.png')
  }
]

const SimilarBookSection = (props) => {
  const { classes, category } = props
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
          demoBooks.map(book => {
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
