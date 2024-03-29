import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import BookInstance from './BookInstance'
import Pagination from '../../../components/Pagination/index'

import { numberOfBookInstancesPerPage } from '../../../constants/constants'
import { ReactComponent as NotebookIcon } from '../../../static/images/notebook-btn.svg'

import ActivityNull from '../../../components/ActivityNull'

const styles = (theme => ({
  container: {
    padding: 20
  }
}))

const BookInstanceList = (props) => {
  const { classes, bookId, userId, bookInstanceList, numberOfInstances, getInstances, initTransaction } = props

  const handlePageChange = (data) => {
    getInstances({ bookId, page: data.selected, limit: numberOfBookInstancesPerPage})
  }

  return (
    <div className={classes.container}>
      {
        bookInstanceList.length === 0 ?
        <div style={{ padding: '0 20px' }}>
          <ActivityNull Icon={NotebookIcon} content='Hãy bắt đầu cho mượn sách cùng ShareBook nhé!' />
        </div>
        :
        <>
          {
            bookInstanceList.map((instance, index) => {
              return (
                <BookInstance
                {...instance}
                userId={userId}
                index={index}
                key={index}
                initTransaction={initTransaction}
              />
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
        </>
      }
    </div>
  )
}

export default withStyles(styles)(BookInstanceList)