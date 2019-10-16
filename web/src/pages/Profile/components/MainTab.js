import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../../components/TabPanel';

import AccountTab from './AccountTab';
import ReviewTab from './ReviewTab';

import { ReactComponent as UserIcon } from '../../../static/images/user.svg';
import { ReactComponent as NewsfeedIcon } from '../../../static/images/newsfeed.svg';
import { ReactComponent as NewsfeedActiveIcon } from '../../../static/images/newsfeed-active.svg';

const styles = theme => ({
  tabBar: {
    '& .MuiTabs-indicator': {
      backgroundColor: '#007EFC',
    }
  },
  wrapper: {
    boxSizing: 'border-box',
    padding: '10px 15px 0'
  }
})

class MainTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    }
  }

  handleChangeTab = (event, newTab) => {
    this.setState({
      currentTab: newTab
    })
  }

  render() {
    const { classes, account, bookOfCategory, handleToggleBookmark, viewCurrentUserId } = this.props;
    const { currentTab } = this.state;
    return (
      <>
        <Tabs
          value={currentTab}
          onChange={this.handleChangeTab}
          variant="fullWidth"
          className={classes.tabBar}
        >
          <Tab
            label={
              currentTab === 0 ?
                <UserIcon height={25} className={classes.icon} fill="#007efc" />
                :
                <UserIcon height={25} className={classes.icon} fill="#9F9F9F" />
            } />
          <Tab
            label={
              currentTab === 0 ?
                <NewsfeedIcon height={25} className={classes.icon} />
                :
                <NewsfeedActiveIcon height={25} className={classes.icon} />
            } />
        </Tabs>
        <TabPanel index={0} value={currentTab} className={classes.wrapper}>
          <AccountTab account={account} bookOfCategory={bookOfCategory}
          handleToggleBookmark={handleToggleBookmark} viewCurrentUserId={viewCurrentUserId} />
        </TabPanel>
        <TabPanel index={1} value={currentTab} className={classes.wrapper}>
          <ReviewTab viewCurrentUserId={viewCurrentUserId}/>
        </TabPanel>
      </>
    );
  }
}

export default withStyles(styles)(MainTab);