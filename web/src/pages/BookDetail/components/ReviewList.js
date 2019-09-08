import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import ReviewItem from './ReviewItem'
import Pagination from '../../../components/Pagination/index'

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
      <Pagination
        pageCount={1000}
        breakLabel={'. . .'}
        pageRangeDisplayed={9}
        marginPagesDisplayed={0}
        handlePageChange={(data) => console.log(JSON.stringify(data))}
      />
    </div>
  )
}

export default withStyles(styles)(ReviewList)