import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import ReviewItem from './ReviewItem'

const styles = (theme => ({
  container: {
    padding: 20
  }
}))

const ReviewList = (props) => {
  const { classes, reviewList } = props
  return (
    <div className={classes.container}>
      {
        reviewList.map((review, id) => {
          return (
            <ReviewItem
              key={id}
              {...review}
            />
          )
        })
      }
    </div>
  )
}

export default withStyles(styles)(ReviewList)