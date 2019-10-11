import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';

import NewsItem from './NewsItem'

const styles = (theme => ({
  slider: {
    margin: 20,
    overflow: 'hidden',
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



class NewsSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 400
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: Math.min(window.innerWidth, 800) - 80 })
  }

  render() {
    const { classes, newsData } = this.props
    let silderHeight = 170

    return (
      <CarouselProvider
        className={classes.carousel}
        naturalSlideWidth={this.state.width}
        naturalSlideHeight={silderHeight}
        totalSlides={newsData.length}
        isPlaying
        interval={3000}
      >

        <Slider className={classes.slider}>
          {
            newsData.map(news => {
              // temporary when don't have news
              let oneNews = {}
              oneNews.title = news.name
              oneNews.url = news.url
              oneNews.image = require('../../../static/images/demo/news-placeholder.png')
              return (
                <Slide key={`news-slider-${news.id}`}>
                  <NewsItem {...oneNews} key={news.url} />
                </Slide>
              )
            })
          }
        </Slider>
      </CarouselProvider>
    )
  }
}

export default withStyles(styles)(NewsSlider)