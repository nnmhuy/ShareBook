import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { } from '@material-ui/core'

import TopNav from './components/TopNav'
import BottomNav from './components/BottomNav'
import BookInfo from './components/BookInfo'
import RateSection from './components/RateSection'
import DetailTabs from './components/DetailTabs'
import BookSlider from '../../components/BookSlider'

import { getBookInfo } from '../../redux/actions/bookAction'
import { getReviewsOfBook } from '../../redux/actions/reviewAction'
import { demoBookInstance, demoReviewList, demoSimilarBooks } from './demoData'

const styles = (theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    maxWidth: 800,
    margin: 'auto'
  }
}))

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentWillMount() {
    const { getBookDetail, match, reviews } = this.props
    const bookId = match.params.bookId
    getBookDetail({ bookId })
  }

  render() {
    const { classes, match, history, bookDetail, reviews } = this.props
    const bookId = match.params.bookId

    const handleToggleLike = (props) => {

    }

    return (
      <TopNav isLiked handleToggleLike={handleToggleLike}>
        <BottomNav bookId={bookId}>
          <div className={classes.container}>
            <BookInfo {...bookDetail}/>
            <RateSection bookId={bookId} history={history} />
            <DetailTabs
              book={bookDetail}
              bookInstanceList={demoBookInstance}
              reviewList={reviews}n
            />
            <BookSlider
              title={'Thể loại tương tự'}
              url={`/category${bookDetail.categoryUrl}`}
              bookList={demoSimilarBooks}/>
          </div>
        </BottomNav>
      </TopNav>
    )
  }
}

const mapStateToProps = ({ book, review }) => {
  return {
    bookDetail: book.bookDetail,
    reviews: review.reviewsOfBook
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBookDetail: getBookInfo,
  getReviews: getReviewsOfBook
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
