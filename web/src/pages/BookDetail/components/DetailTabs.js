import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Tabs from '../../../components/Tabs'
import Tab from '../../../components/Tab'
import TabPanel from '../../../components/TabPanel'
import BookAbout from './BookAbout'
import BookInstanceList from './BookInstanceList'
import ReviewList from './ReviewList'

const styles = (theme => ({
  tabs: {
    paddingLeft: 20,
    paddingRight: 20
  }
}))

const DetailTabs = (props) => {
  const { classes, book, bookInstanceList, reviewList, getReviews, userId, getInstances } = props
  const [ activeTab, setActiveTab ] = React.useState(0)

  const handleChangeTab = (event, value) => {
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
        <BookInstanceList
          bookId={book.id}
          bookInstanceList={bookInstanceList} 
          getInstances={getInstances}
          numberOfInstances={book.numberOfBookInstances}
        />
      </TabPanel>
      <TabPanel index={2} value={activeTab}>
        <ReviewList 
          bookImageUrl={book.imageUrl} 
          reviewList={reviewList} 
          getReviews={getReviews} 
          userId={userId}
          bookId={book.id}
          numberOfReviews={book.numberOfReviews}
        />
      </TabPanel>
    </div>
  )
}

export default withStyles(styles)(DetailTabs)