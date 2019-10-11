import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Book from '../../../components/Book';
import ActivityNull from './ActivityNull';
import { ReactComponent as NotebookIcon } from '../../../static/images/notebook-btn.svg';

import { bookDemoData } from '../demoData';
import colors from '../../../constants/colors';
import BookSlider from '../../../components/BookSlider';

const styles = theme => ({
  bookContainer: {
    display: 'flex'
  },
  title: {
    fontWeight: 600,
    fontSize: 12,
    color: colors.primary
  }
})

class BookVertical extends Component {
  render() {
    const { classes, bookPassed, bookOwned, textNull } = this.props;
    return (
      <div>
        {
          bookPassed === null &&
          <>
            <p className={classes.title}>Sách đang giữ</p>
            <ActivityNull Icon={NotebookIcon} content={textNull.passed} />
          </>
        }
        {
          bookOwned === null &&
          <>
            <p className={classes.title}>Sách đã đăng</p>
            <ActivityNull Icon={NotebookIcon} content={textNull.owned} />
          </>
        }
        {
          bookPassed !== null &&
          <>
            <p className={classes.title}>Sách đang giữ</p>
            <BookSlider
              bookList={bookDemoData}
            />
            <br />
          </>
        }
        {
          bookOwned !== null &&
          <>
            <p className={classes.title}>Sách đã đăng</p>
            <BookSlider
              bookList={bookDemoData}
            />
          </>
        }
      </div>
    );
  }
}

export default (withStyles(styles)(BookVertical));
