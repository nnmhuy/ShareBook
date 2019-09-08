import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import BookInstance from './BookInstance'

const styles = (theme => ({
  container: {
    padding: 20
  }
}))

const BookInstanceList = (props) => {
  const { classes, bookInstanceList } = props
  return (
    <div className={classes.container}>
      {
        bookInstanceList.map((instance, index) => {
          return (
            <BookInstance {...instance}  index={index} key={index}/>
          )
        })
      }
    </div>
  )
}

export default withStyles(styles)(BookInstanceList)