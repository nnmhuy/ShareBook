import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Slider from 'react-slick'

import NewsItem from './NewsItem'

const styles = (theme => ({
  slider: {
    margin: 20,
    overflow:'hidden',
    '& .slick-dots': {
      bottom: 0,
      listStyleType: 'none',
      listStyle: 'none',
      '& li': {
        margin: 0,
        listStyleType: 'none',
        listStyle: 'none',
      }
    },
    '& .slick-prev': {
      left: 10,
      zIndex: 10
    },
    '& .slick-next': {
      right: 10
    }
  },
}))



const NewsSlider = (props) => {
  const { classes, newsData } = props

  const settings = {
    dots: true,
    infinite: true,
    arrow: false,
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true
  }

  return (
    <Slider {...settings} className={classes.slider}>
      {
        newsData.map(news => {
          return (
            <NewsItem {...news} key={news.url}/>
          )
        })
      }
    </Slider>
  )
}

export default withStyles(styles)(NewsSlider)