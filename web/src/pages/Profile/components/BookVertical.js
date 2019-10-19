import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Book from '../../../components/BookmarkBook';
import ActivityNull from '../../../components/ActivityNull';
import { ReactComponent as BookmarkedIcon } from '../../../static/images/bookmarked-btn.svg';
import { bookDemoData } from '../demoData';

const styles = theme => ({
  bookContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    '@media (min-width: 460px)': {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },
    '@media (min-width: 550px)': {
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    },
    '@media (min-width: 750px)': {
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
    }
  }
})

class BookVertical extends Component {
  render() {
    const { classes, bookmarked, textNull } = this.props;
    return (
      <div>
        {
          bookmarked.length === 0 &&
          <ActivityNull Icon={BookmarkedIcon} content={textNull} />
        }
        {
          bookmarked.length !== 0 &&
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

export default (withStyles(styles)(BookVertical));
