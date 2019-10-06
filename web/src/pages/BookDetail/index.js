import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { } from '@material-ui/core'

import Loading from '../../components/Loading'
import TopNav from './components/TopNav'
import BottomNav from './components/BottomNav'
import BookInfo from './components/BookInfo'
import RateSection from './components/RateSection'
import DetailTabs from './components/DetailTabs'
import BookSlider from '../../components/BookSlider'

import { getBookInfo, toggleBookmark } from '../../redux/actions/bookAction'
import { getBookInstances } from '../../redux/actions/bookInstanceAction'
import { getReviewsOfBook, toggleLikeReview } from '../../redux/actions/reviewAction'

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
      bookId: null
    }
  }

  componentWillMount() {
    const { getBookDetail, match, userId } = this.props
    const bookId = match.params.bookId
    getBookDetail({ bookId, userId })
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.bookId !== prevState.bookId){
      const { getBookDetail, match, getReviews, userId, getInstances } = nextProps
      const bookId = match.params.bookId
      getBookDetail({ bookId, userId })
      getReviews({ userId, bookId, page: 0, limit: numberOfReviewsPerPage})
      getInstances({ bookId, page: 0, limit: numberOfBookInstancesPerPage})
      return {
        bookId: bookId
      }
   }
   return null;
 }

  render() {
    const { classes, match, history, bookDetail, reviews, getReviews, userId,
      bookInstances, getInstances, category, bookOfCategory, isLoading, isLoadingCategory,
      isLoadingReview, isLoadingInstances
    } = this.props
    const bookId = match.params.bookId

    const handleToggleBookmark = (bookId, bookmarkId, isBookmarked) => {
      const { toggleBookmarkStatus } = this.props
      toggleBookmarkStatus({bookId, bookmarkId, isBookmarked})
    }

    const handleToggleLikeReview = (reviewId, likeReviewId, likeStatus) => {
      const { toggleLikeReviewStatus } = this.props
      toggleLikeReviewStatus({ reviewId, likeReviewId, likeStatus })
    }

    return (
      <TopNav id={bookDetail.id} bookmarkId={bookDetail.bookmarkId} isBookmarked={bookDetail.isBookmarked} handleToggleBookmark={handleToggleBookmark}>
        <Loading isLoading={isLoading}/>
        <BottomNav bookId={bookId}>
          <div className={classes.container}>
            <BookInfo {...bookDetail} category={category}/>
            <RateSection bookId={bookId} history={history} />
            <DetailTabs
              book={bookDetail}
              bookInstanceList={bookInstances}
              getInstances={getInstances}
              isLoadingInstances={isLoadingInstances}
              reviewList={reviews}
              getReviews={getReviews}
              isLoadingReview={isLoadingReview}
              userId={userId}
              handleToggleLikeReview={handleToggleLikeReview}
            />
            <BookSlider
              isExtended
              title={'Thể loại tương tự'}
              url={category.url}
              bookList={bookOfCategory}
              handleToggleBookmark={handleToggleBookmark}
              isLoading={isLoadingCategory}
            />
          </div>
        </BottomNav>
      </TopNav>
    )
  }
}

const mapStateToProps = ({ book, review, bookInstances }) => {
  return {
    userId: localStorage.getItem('userId'),
    isLoading: book.isLoading,
    bookDetail: book.bookDetail,
    category: book.category,
    isLoadingCategory: book.isLoadingCategory,
    bookOfCategory: book.bookOfCategory,
    isLoadingReview: review.isLoading,
    reviews: review.reviewsOfBook,
    isLoadingInstances: bookInstances.isLoading,
    bookInstances: bookInstances.bookInstances
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBookDetail: getBookInfo,
  getReviews: getReviewsOfBook,
  getInstances: getBookInstances,
  toggleBookmarkStatus: toggleBookmark,
  toggleLikeReviewStatus: toggleLikeReview
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
