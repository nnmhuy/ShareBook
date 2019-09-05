import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { } from '@material-ui/core'

import BookInfo from './BookInfo'
import RateSection from './RateSection'
import BookAbout from './BookAbout'
import ReviewList from './ReviewList'

const styles = (theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    maxWidth: 800,
    margin: 'auto'
  }
}))

const demoBook = {
  name: 'Animal Farm',
  image: require('../../static/images/demo/animal-farm.png'),
  author: 'George Orwell',
  category: 'Law',
  tags: [
    'kịch tính',
    'châm biếm',
    'tâm lý',
    'kịch tính',
    'châm biếm'
  ],
  isLike: false,
  rating: 4.5,
  number_of_bookmark: 60,
  number_of_use: 50,

  volume: 2,
  publisher: 'Penguin',
  publish_year: 2015,
  description: 'A farm is taken over by its overworked, mistreated animals. With flaming idealism and stirring slogans, they set out to create a paradise of progress, justice, and equality.\n Thus the stage is set for one of the most telling satiric fables ever penned a razor- edged fairy tale for grown - ups that records the evolution from revolution against tyranny to a totalitarianism just as terrible.',
  price: 100000,
  number_of_pages: 300
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    const { classes, match, history } = this.props
    const bookId = match.params.bookId
    return (
      <div className={classes.container}>
        <BookInfo {...demoBook} />
        <RateSection bookId={bookId} history={history}/>
        <ReviewList bookImage={demoBook.image}/>
        <BookAbout {...demoBook}/>
      </div>
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
