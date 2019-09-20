import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { numberOfReviewsPerPage } from '../../../constants/constants'
import ReviewItem from '../../../components/ReviewItem'
import Pagination from '../../../components/Pagination/index'

const styles = (theme => ({
  container: {
    padding: 20
  }
}))

const ReviewList = (props) => {
  const { classes, reviewList, bookImageUrl, getReviews, userId, bookId, numberOfReviews } = props

  const handlePageChange = (data) => {
    console.log(data)
    getReviews({bookId, userId, page: data.selected, limit: numberOfReviewsPerPage })
  }

  return (
    <div className={classes.container}>
      {
        reviewList.map((review, id) => {
          return (
            <ReviewItem
              key={id}
              {...review}
              bookImageUrl={bookImageUrl}
            />
          )
        })
      }
      <Pagination
        pageCount={Math.ceil(numberOfReviews / numberOfReviewsPerPage)}
        breakLabel={'. . .'}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        handlePageChange={handlePageChange}
      />
    </div>
  )
}

export default withStyles(styles)(ReviewList)