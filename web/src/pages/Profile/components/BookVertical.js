import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Book from '../../../components/BookmarkBook';
import ActivityNull from './ActivityNull';
import { ReactComponent as BookmarkedIcon } from '../../../static/images/bookmarked-btn.svg';
import { bookDemoData } from '../demoData';

const styles = theme => ({
  bookContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr'
  }
})

class BookVertical extends Component {
  render() {
    const { classes, bookmarked, textNull } = this.props;
    return (
      <div>
        {
          bookmarked === null &&
          <ActivityNull Icon={BookmarkedIcon} content={textNull} />
        }
        {
          bookmarked !== null &&
          <div className={classes.bookContainer}>
            {
              bookDemoData.map((book) => {
                return (
                  <Book {...book} key={book.bookId} />
                )
              })
            }
          </div>
        }
      </div>
    );
  }
}

export default connect()(withStyles(styles)(BookVertical));