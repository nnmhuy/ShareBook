import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Tabs, Tab } from '@material-ui/core'

import TabPanel from './TabPanel'
import BookAbout from './BookAbout'
import BookInstanceList from './BookInstanceList'
import ReviewList from './ReviewList'
import colors from '../../../constants/colors'

const styles = (theme => ({
  tabs: {
    paddingLeft: 20,
    paddingRight: 20
  },
  tab: {
    flex: 1,
    textTransform: 'none',
    fontSize: 13,
    fontWeight: 500,
    color: colors.gray,
    '&.Mui-selected': {
      color: '#000',
      opacity: 1
    }
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    "& > div": {
      width: '100%',
      maxWidth: 80,
      backgroundColor: '#007EFC'
    }
  }
}))

const DetailTabs = (props) => {
  const { classes, book, bookInstanceList, reviewList } = props
  const [ activeTab, setActiveTab ] = React.useState(0)

  const handleChangeTab = (event, value) => {
    setActiveTab(value)
  }

  return (
    <div>
      <Tabs 
        value={activeTab}
        onChange={handleChangeTab}
        TabIndicatorProps={{ className: classes.indicator, children: <div/> }}
        className={classes.tabs}
      >
        <Tab disableRipple label='Về sách' className={classes.tab} />
        <Tab disableRipple label='Đầu sách' className={classes.tab} />
        <Tab disableRipple label='Review' className={classes.tab}/>
      </Tabs>
      <TabPanel index={0} value={activeTab}>
        <BookAbout book={book} />
      </TabPanel>
      <TabPanel index={1} value={activeTab}>
        <BookInstanceList bookInstanceList={bookInstanceList} />
      </TabPanel>
      <TabPanel index={2} value={activeTab}>
        <ReviewList bookImage={book.image} reviewList={reviewList} />
      </TabPanel>
    </div>
  )
}

export default withStyles(styles)(DetailTabs)