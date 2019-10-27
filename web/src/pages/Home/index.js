import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'


import LayoutWrapper from '../../components/LayoutWrapper'
import AboutUs from './components/AboutUs'
import Tutorial from './components/Tutorial'
import NewsfeedIntro from './components/NewsfeedIntro'
import BookSlider from '../../components/BookSlider'
import Footer from './components/Footer'
import { getCategoryList, getBookList, toggleBookmark } from '../../redux/actions/bookAction'
import VideoFrame from './components/VideoFrame'
import { getReviewLite } from '../../redux/actions/reviewAction'

const styles = (theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    boxSizing: 'border-box'
  },
  searchBar: {
    maxWidth: 650,
    minWidth: 350,
    margin: '40px auto',
    boxSizing: 'border-box',
    padding: '0 15px'
  }
}))

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    let where = {}
    where.totalOfBookInstance = {gte: 1}
    this.props.getBookListHandler({key:'hot',
      limit: 20,
      where,
      userId: this.props.account.userId,
      order: ['numberOfUse DESC', 'numberOfRating DESC']
    });
    this.props.getReviewHandler()
  }

  handleToggleBookmark = (bookId, bookmarkId, isBookmarked) => {
    const { toggleBookmarkHandler } = this.props
    toggleBookmarkHandler({bookId, bookmarkId, isBookmarked})
  }

  render() {
    const { classes, account } = this.props
    const { bookListData, bookListIsLoading, reviewLite, isLoadingReviewLite } = this.props
    
    return (
      <LayoutWrapper title='Home' account={account}>
        <div className={classes.container}>
          <AboutUs />
          <Tutorial />
          <VideoFrame />
          <NewsfeedIntro
            reviewLite={reviewLite}
            isLoading={isLoadingReviewLite}
          />
          <BookSlider
            title={'Sách Hot của ShareBook'} 
            url={`/category/hot`}
            bookList={get(bookListData, 'hot', [])} 
            handleToggleBookmark={this.handleToggleBookmark}
            isLoading={bookListIsLoading['hot']}            
            style={{ marginTop: 20, margin: 'auto', maxWidth: 1000 }}
          />
          <Footer/>
        </div>
      </LayoutWrapper>
    )
  }
}

const mapStateToProps = ({ state, account, book, review }) => {
  return {
    account: {
      isAuth: account.isAuth,
      userId: account.userId,
      username: account.username,
      name: account.name,
      avatar: account.avatar,
      coin: account.coin,
    },
    bookListData: book.bookListData,
    bookListIsLoading: book.bookListIsLoading,
    reviewLite: review.reviewLite,
    isLoadingReviewLite: review.isLoadingReviewLite
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCategoryListHandler: getCategoryList,
  getBookListHandler: getBookList,
  toggleBookmarkHandler: toggleBookmark,
  getReviewHandler: getReviewLite
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
