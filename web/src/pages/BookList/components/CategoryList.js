import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import ScaleLoader from 'react-spinners/ScaleLoader'

import CategoryItem from '../../../components/CategoryItem'
import colors from '../../../constants/colors'

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
    fontWeight: 'bold',
    fontSize: 15,
  },
  viewMore: {
    fontSize: 11,
    color: '#0274df'
  },
  carousel: {
    paddingLeft: 20,
    marginTop: 16
  },
  loading: {
    padding: 20
  }
}))

class CategoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleBook: 5
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
    this.setState({ visibleBook: Math.min(window.innerWidth / 150, 5) })
  }

  render() {
    const { classes, categoryList, isLoading } = this.props
    return (
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <span className={classes.title}>Thể loại</span>
          {/* <Link to='/category-list' className={classes.viewMore}>Xem thêm</Link> */}
        </div>
        {isLoading ?
          <div className={classes.loading}>
            <ScaleLoader color={colors.primary} />
          </div>
          :
          <CarouselProvider
            className={classes.carousel}
            naturalSlideWidth={130}
            naturalSlideHeight={70}
            totalSlides={categoryList.length}
            visibleSlides={this.state.visibleBook}
          >
            <Slider>
              {
                categoryList.map(category => {
                  return (
                    <Slide key={`category-silder-${category.id}`}>
                      <CategoryItem
                        {...category}
                        key={category.url} />
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

}

export default withStyles(styles)(CategoryList)