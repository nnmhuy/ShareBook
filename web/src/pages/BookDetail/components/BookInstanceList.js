import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import BookInstance from './BookInstance'
import Pagination from '../../../components/Pagination/index'

import { numberOfBookInstancesPerPage } from '../../../constants/constants'

const styles = (theme => ({
  container: {
    padding: 20
  }
}))

const BookInstanceList = (props) => {
  const { classes, bookId, bookInstanceList, numberOfInstances, getInstances } = props

  const handlePageChange = (data) => {
    getInstances({ bookId, page: data.selected, limit: numberOfBookInstancesPerPage})
  }

  return (
    <div className={classes.container}>
      {
        bookInstanceList.map((instance, index) => {
          return (
            <BookInstance {...instance}  index={index} key={index}/>
          )
        })
      }
      <Pagination
        pageCount={Math.ceil(numberOfInstances / numberOfBookInstancesPerPage)}
        breakLabel={'. . .'}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        handlePageChange={handlePageChange}
      />
    </div>
  )
}

export default withStyles(styles)(BookInstanceList)