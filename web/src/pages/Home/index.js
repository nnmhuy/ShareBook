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

const styles = (theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    boxSizing: 'border-box'
  }
}))

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  handleToggleBookmark = (bookId, bookmarkId, isBookmarked) => {
    const { toggleBookmarkHandler } = this.props
    toggleBookmarkHandler({bookId, bookmarkId, isBookmarked})
  }

  render() {
    const { classes, account, history } = this.props
    const { bookListData, bookListIsLoading } = this.props
    
    return (
      <LayoutWrapper title='Home' account={account}>
        <div className={classes.container}>
          <AboutUs />
          <Tutorial />
          <VideoFrame />
          <NewsfeedIntro/>
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

const mapStateToProps = ({ state, account, book }) => {
  return {
    account: {
      isAuth: !!(localStorage.getItem('isAuth')),
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      name: localStorage.getItem('name'),
      avatar: localStorage.getItem('avatar'),
      coin: Number.parseInt(localStorage.getItem('coin')),
    },
    bookListData: book.bookListData,
    bookListIsLoading: book.bookListIsLoading
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCategoryListHandler: getCategoryList,
  getBookListHandler: getBookList,
  toggleBookmarkHandler: toggleBookmark 
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
