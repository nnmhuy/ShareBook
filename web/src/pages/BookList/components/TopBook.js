import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ScaleLoader from 'react-spinners/ScaleLoader'

import colors from '../../../constants/colors'

import BookWide from '../../../components/BookWide'

const styles = (theme => ({
  container: {

  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 20,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20
  }
}))

const TopBook = (props) => {
  const { classes, topBookList, isLoading, handleToggleBookmark } = props
  return (
    <div className={classes.container}>
      <span className={classes.title}>Top 3 ShareBook</span>
      <div className={classes.wrapper}>
        {isLoading ?
          <div className={classes.loading}>
            <ScaleLoader color={colors.primary}/>
          </div>
        :
          topBookList.map(book => {
            return (
              <BookWide
                key={book.id}
                id={book.id}
                name={book.name}
                author={book.author}
                image={book.image}
                rating={book.rating}
                numberOfUse={book.numberOfUse}
                isBookmarked={book.isBookmarked}
                bookmarkId={book.bookmarkId}
                handleToggleBookmark={handleToggleBookmark}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default withStyles(styles)(TopBook)