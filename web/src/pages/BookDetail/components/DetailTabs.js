import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Tabs from '../../../components/Tabs'
import Tab from '../../../components/Tab'
import TabPanel from '../../../components/TabPanel'
import BookAbout from './BookAbout'
import BookInstanceList from './BookInstanceList'
import ReviewList from './ReviewList'
import Loading from '../../../components/LocalLoading'

import { numberOfReviewsPerPage, numberOfBookInstancesPerPage } from '../../../constants/constants'
import LocalLoading from '../../../components/LocalLoading'


const styles = (theme => ({
  tabs: {
    paddingLeft: 20,
    paddingRight: 20
  }
}))

const DetailTabs = (props) => {
  const { classes, book, bookInstanceList, reviewList, getReviews, userId, getInstances,
    handleToggleLikeReview, isLoadingReview, isLoadingInstances, touched, setTouched,
    activeTab, setActiveTab
  } = props

  const handleChangeTab = (event, value) => {
    if (!touched[value]) {
      const newTouched = JSON.parse(JSON.stringify(touched))
      newTouched[value] = true
      if (value === 1) {
        getInstances({ bookId: book.id, page: 0, limit: numberOfBookInstancesPerPage })
        
      }
      if (value === 2) {
        getReviews({ userId, bookId: book.id, page: 0, limit: numberOfReviewsPerPage })
      }
      setTouched(newTouched)
    }
    setActiveTab(value)
  }

  return (
    <div>
      <Tabs 
        value={activeTab}
        onChange={handleChangeTab}
        className={classes.tabs}
      >
        <Tab label='Về sách'/>
        <Tab label={`Đầu sách (${book.numberOfBookInstances})`}/>
        <Tab label={`Review (${book.numberOfReviews})`}/>
      </Tabs>
      <TabPanel index={0} value={activeTab}>
        <BookAbout book={book} />
      </TabPanel>
      <TabPanel index={1} value={activeTab}>
        {isLoadingInstances?
            <LocalLoading isLoading />
          :
            <BookInstanceList
              bookId={book.id}
              bookInstanceList={bookInstanceList}
              getInstances={getInstances}
              numberOfInstances={book.numberOfBookInstances}
            />
        }
      </TabPanel>
      <TabPanel index={2} value={activeTab}>
        {isLoadingReview?
            <LocalLoading isLoading/>
          :
            <ReviewList 
              bookImage={book.image} 
              reviewList={reviewList} 
              getReviews={getReviews} 
              userId={userId}
              bookId={book.id}
              numberOfReviews={book.numberOfReviews}
              handleToggleLikeReview={handleToggleLikeReview}
            />
        }
      </TabPanel>
    </div>
  )
}

export default withStyles(styles)(DetailTabs)