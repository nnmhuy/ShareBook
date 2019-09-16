import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { } from '@material-ui/core'

import TopNav from './components/TopNav'
import BottomNav from './components/BottomNav'
import BookInfo from './components/BookInfo'
import RateSection from './components/RateSection'
import DetailTabs from './components/DetailTabs'
import BookSlider from '../../components/BookSlider'

import { demoBook, demoBookInstance, demoReviewList, demoSimilarBooks } from './demoData'

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

  render() {
    const { classes, match, history } = this.props
    const bookId = match.params.bookId

    const handleToggleLike = (props) => {

    }

    return (
      <TopNav isLiked handleToggleLike={handleToggleLike}>
        <BottomNav bookId={bookId}>
          <div className={classes.container}>
            <BookInfo {...demoBook} />
            <RateSection bookId={bookId} history={history} />
            <DetailTabs
              book={demoBook}
              bookInstanceList={demoBookInstance}
              reviewList={demoReviewList}
            />
            <BookSlider
              title={'Thể loại tương tự'}
              url={`/category/${demoBook.category}`}
              bookList={demoSimilarBooks}/>
          </div>
        </BottomNav>
      </TopNav>
    )
  }
}

const mapStateToProps = ({ state }) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
