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
import { initTransaction } from '../../redux/actions/transactionAction'

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
      bookId: null,
      touched: {},
      activeTab: 0
    }
  }

  setTouched = (touched) => {
    this.setState({
      touched
    })
  }

  setActiveTab = (value) => {
    this.setState({
      activeTab: value
    })
  }

  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.bookId !== prevState.bookId){
      const { getBookDetail, match, userId } = nextProps
      const bookId = match.params.bookId
      getBookDetail({ bookId, userId })
      return {
        bookId: bookId,
        touched: {},
        activeTab: 0
      }
   }
   return null;
 }

  handleToggleBookmark = (bookId, bookmarkId, isBookmarked) => {
    const { toggleBookmarkStatus } = this.props
    toggleBookmarkStatus({ bookId, bookmarkId, isBookmarked })
  }

  handleToggleLikeReview = (reviewId, likeReviewId, likeStatus) => {
    const { toggleLikeReviewStatus } = this.props
    toggleLikeReviewStatus({ reviewId, likeReviewId, likeStatus })
  }

  initTransaction = (instanceId) => {
    const { match, borrowBook, bookInstances } = this.props
    const bookId = match.params.bookId

    if (instanceId) {
      borrowBook({ bookId, instanceId })
    } else {
      const instance = bookInstances.find(element => {
        return element.isAvailable
      })

      if (instance) {
        borrowBook({ bookId, instanceId: instance.id })
      } else {
        borrowBook({ bookId })
      }
    }
  }

  render() {
    const { classes, match, history, bookDetail, reviews, getReviews, userId,
      bookInstances, getInstances, category, bookOfCategory, isLoading, isLoadingCategory,
      isLoadingReview, isLoadingInstances, role
    } = this.props

    const { touched, activeTab } = this.state

    const bookId = match.params.bookId

    return (
      <TopNav id={bookDetail.id} bookmarkId={bookDetail.bookmarkId} 
        isBookmarked={bookDetail.isBookmarked} handleToggleBookmark={this.handleToggleBookmark}
      >
        <Loading isLoading={isLoading}/>
        <BottomNav bookId={bookId} initTransaction={this.initTransaction}>
          <div className={classes.container}>
            <BookInfo {...bookDetail} role={role} category={category}/>
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
              handleToggleLikeReview={this.handleToggleLikeReview}
              touched={touched}
              setTouched={this.setTouched}
              activeTab={activeTab}
              setActiveTab={this.setActiveTab}
              initTransaction={this.borrowBook}
            />
            <BookSlider
              isExtended
              title={'Thể loại tương tự'}
              url={category.url}
              bookList={bookOfCategory}
              handleToggleBookmark={this.handleToggleBookmark}
              isLoading={isLoadingCategory}
            />
          </div>
        </BottomNav>
      </TopNav>
    )
  }
}

const mapStateToProps = ({ book, review, bookInstances, transaction }) => {
  return {
    userId: localStorage.getItem('userId'),
    role: localStorage.getItem('role'),
    isLoading: book.isLoading,
    bookDetail: book.bookDetail,
    category: book.category,
    isLoadingCategory: book.isLoadingCategory,
    bookOfCategory: book.bookOfCategory,
    isLoadingReview: review.isLoading,
    reviews: review.reviewsOfBook,
    isLoadingInstances: bookInstances.isLoading,
    bookInstances: bookInstances.bookInstances,
    isInitializingTransaction: transaction.isInitializingTransaction
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBookDetail: getBookInfo,
  getReviews: getReviewsOfBook,
  getInstances: getBookInstances,
  toggleBookmarkStatus: toggleBookmark,
  toggleLikeReviewStatus: toggleLikeReview,
  borrowBook: initTransaction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
