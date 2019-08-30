import React from 'react'
import Slider from 'react-slick'
import { withStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { maxMobileWidth } from '../../../constants/constants'

import TopReviewItem from './TopReviewItem'
import SliderArrow from './SliderArrow'


const styles = (theme => ({
  container: {
    width: '100%',
    height: 530,
    paddingBottom: 20,
    marginBottom: 20,
    overflow: 'hidden',
    '& .slick-dots': {
      bottom: 0,
    }
  }
}))

const ReviewSlider = (props) => {
  const { classes, reviewData } = props
  const mobile = useMediaQuery(`(max-width:${maxMobileWidth})`)

  var settings = {
    dots: true,
    infinite: true,
    arrow: !mobile,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: !mobile && <SliderArrow isNext/>,
    prevArrow: !mobile && <SliderArrow isNext={false}/>
  }

  return (
    <Slider {...settings} className={classes.container}>
      {
        reviewData.map(review => (
          <TopReviewItem 
            {...review}
            key={review.reviewId}
          />
        ))
      }
    </Slider>
  )
}

export default withStyles(styles)(ReviewSlider)