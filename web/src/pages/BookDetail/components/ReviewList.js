import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { numberOfReviewsPerPage } from '../../../constants/constants'
import ReviewItem from '../../../components/ReviewItem'
import Pagination from '../../../components/Pagination/index'
import { ReactComponent as NotebookIcon } from '../../../static/images/notebook-btn.svg'

import ActivityNull from '../../../components/ActivityNull'

const styles = (theme => ({
  container: {
    padding: 20
  }
}))

const ReviewList = (props) => {
  const { classes, reviewList, bookImage, getReviews, userId, bookId, numberOfReviews,
    handleToggleLikeReview
  } = props

  const handlePageChange = (data) => {
    getReviews({bookId, userId, page: data.selected, limit: numberOfReviewsPerPage })
  }

  return (
    <div className={classes.container}>
      {
        reviewList.length === 0 ?
        <div style={{ padding: '0 20px' }}>
          <ActivityNull Icon={NotebookIcon} content='Hãy bắt đầu chia sẻ, review về sách cùng ShareBook nhé!' />
        </div>
        :
        <>
            {
              reviewList.map((review, id) => {
                return (
                  <ReviewItem
                    key={id}
                    {...review}
                    bookImage={bookImage}
                    handleToggleLikeReview={handleToggleLikeReview}
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
        </>
      }
    </div>
  )
}

export default withStyles(styles)(ReviewList)