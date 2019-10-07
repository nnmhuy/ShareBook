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

class BookSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleBook: 3
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
    this.setState({visibleBook: Math.min(window.innerWidth / 150, 6)})
  }

  calculateNumber = () => {

    this.setState({visibleBook: Math.min(window.innerWidth / 150, 6)})
  }

  render() {

    const { isExtended, classes, title, url, bookList, handleToggleBookmark, isLoading, ...other } = this.props
    
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
            naturalSlideHeight={165}
            totalSlides={bookList.length}
            visibleSlides={this.state.visibleBook}
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
                        totalOfBookInstance={book.totalOfBookInstance}
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
}

export default withStyles(styles)(BookSlider)