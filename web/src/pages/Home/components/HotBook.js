import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { maxMobileWidth } from '../../../constants/constants'

import SliderArrow from './SliderArrow'
import Book from './Book'
import colors from '../../../constants/colors'

const bookDemoData = [
  {
    name: 'Súng, vi trùng và thép',
    image: require('../../../static/images/demo/demo-book-cover.png'),
    numberOfLike: 100,
    numberOfUse: 999,
    hot: 1,
    isLiked: true
  },
  {
    name: 'Súng, vi trùng và thép',
    image: require('../../../static/images/demo/demo-book-cover.png'),
    numberOfLike: 10,
    numberOfUse: 99,
    hot: 2,
  },
  {
    name: 'Súng, vi trùng và thép',
    image: require('../../../static/images/demo/demo-book-cover.png'),
    numberOfLike: 1,
    numberOfUse: 9,
    hot: 3,
    isLiked: true
  },
  {
    name: 'Súng, vi trùng và thép',
    image: require('../../../static/images/demo/demo-book-cover.png'),
    numberOfLike: 10,
    numberOfUse: 99,
  },
  {
    name: 'Súng, vi trùng và thép',
    image: require('../../../static/images/demo/demo-book-cover.png'),
    numberOfLike: 10,
    numberOfUse: 99,
  },
  {
    name: 'Súng, vi trùng và thép',
    image: require('../../../static/images/demo/demo-book-cover.png'),
    numberOfLike: 10,
    numberOfUse: 99,
    isLiked: true
  },
]

const styles = (theme => ({
  container: {
    marginTop: 30,
    width: '100%',
    overflow: 'hidden'
  },
  title: {
    marginLeft: 30,
    fontWeight: 600,
    fontSize: 20
  },
  highlight: {
    color: colors.textSecondary
  },
  slider: {
    boxSizing: 'border-box',
    width: '100%',
    margin: '30px auto',
    padding: '50px',
    '& .slick-dots': {
      bottom: 0,
    }
  },
  mobileSlider: {
    padding: '20px 5px'
  }
}))

const HotBook = (props) => {
  const { classes } = props
  const mobile = useMediaQuery(`(max-width:${maxMobileWidth})`)
  const settings = {
    dots: true,
    infinite: true,
    arrow: !mobile,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: !mobile && <SliderArrow isNext />,
    prevArrow: !mobile && <SliderArrow isNext={false} />
  }
  return (
    <div className={classes.container}>
      <div className={classes.title}>Sách <span className={classes.highlight}>HOT</span> trong tuần</div>
      <Slider {...settings} className={`${classes.slider} ${mobile && classes.mobileSlider}`}>
        {
          bookDemoData.map((book, index) => (
            <Book
              {...book}
              key={index}
            />
          ))
        }
      </Slider>
    </div>
  )
}


export default withStyles(styles)(HotBook)