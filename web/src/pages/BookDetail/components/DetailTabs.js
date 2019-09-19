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
  const { classes, book, bookInstanceList, reviewList } = props
  const [activeTab, setActiveTab] = React.useState(0)

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
        <Tab label='Về sách' />
        <Tab label='Đầu sách' />
        <Tab label='Review' />
      </Tabs>
      <TabPanel index={0} value={activeTab}>
        <BookAbout book={book} />
      </TabPanel>
      <TabPanel index={1} value={activeTab}>
        <BookInstanceList bookInstanceList={bookInstanceList} />
      </TabPanel>
      <TabPanel index={2} value={activeTab}>
        <ReviewList bookName={book.name} bookImage={book.image} reviewList={reviewList} />
      </TabPanel>
    </div>
  )
}

export default withStyles(styles)(DetailTabs)