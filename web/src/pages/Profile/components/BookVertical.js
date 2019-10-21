import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ScaleLoader from 'react-spinners/ScaleLoader'

import Book from '../../../components/BookmarkBook';
import ActivityNull from '../../../components/ActivityNull';

import { bookDemoData } from '../demoData';
import colors from '../../../constants/colors';
import { ReactComponent as BookmarkedIcon } from '../../../static/images/bookmarked-btn.svg';

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
    const { classes, handleToggleBookmark, bookmarked, textNull } = this.props;
    return (
      <div>
        {/* {
          isLoadingBookmarkedLite && 
          <div className={classes.loading}>
            <ScaleLoader color={colors.primary} />
          </div>
        } */}
        {
          // !isLoadingBookmarkedLite &&
          bookmarked.length === 0 ?
            <ActivityNull Icon={BookmarkedIcon} content={textNull} />
            :
            <div className={classes.bookContainer}>
              {
                bookmarked.map((book) => {
                  return (
                    <div style={{ marginBottom: 25 }} key={book.id}>
                      <Book handleToggleBookmark={handleToggleBookmark} id={book.id} name={book.name} image={book.image} isBookmarked={book.isActive.toString()} />
                    </div>
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
