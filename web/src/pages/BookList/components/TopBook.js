import React from 'react'
import { withStyles } from '@material-ui/core/styles'
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
  const { classes, topBookList } = props
  return (
    <div className={classes.container}>
      <span className={classes.title}>Top 3 tháng</span>
      <div className={classes.wrapper}>
        {
          topBookList.map(book => {
            return (
              <BookWide
                key={book.id}
                {...book}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default withStyles(styles)(TopBook)