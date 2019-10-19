import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { bindActionCreators } from 'redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from '../../components/TabPanel';
import AccountTab from './components/AccountTab';
import ReviewTab from './components/ReviewTab';
import TopNav from './components/TopNav';

import { getBookmarkedLite } from '../../redux/actions/bookAction';
import { ReactComponent as UserIcon } from '../../static/images/user.svg';
import { ReactComponent as NewsfeedIcon } from '../../static/images/newsfeed.svg';
import { ReactComponent as NewsfeedActiveIcon } from '../../static/images/newsfeed-active.svg';

const styles = theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    maxWidth: 800,
    margin: 'auto',
    paddingBottom: 20
  },
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

const Profile = props => {
  const { classes, account, match, getBookmarked, bookmarked, isLoadingBookmarkedLite } = props;
  const profileId = match.params.profileId;

  const [currentTab, handleChangeTab] = useState(0)
  console.log(currentTab)
  return (
    <TopNav title='Tài khoản' account={account}>
      <div className={classes.container}>
        <Tabs
          value={currentTab}
          variant="fullWidth"
          className={classes.tabBar}
        >
          <Tab onClick={() => handleChangeTab(0)}
            label={
              currentTab === 0 ?
                <UserIcon height={25} className={classes.icon} fill="#007efc" />
                :
                <UserIcon height={25} className={classes.icon} fill="#9F9F9F" />
            } />
          <Tab onClick={() => handleChangeTab(1)}
            label={
              currentTab === 0 ?
                <NewsfeedIcon height={25} className={classes.icon} />
                :
                <NewsfeedActiveIcon height={25} className={classes.icon} />
            } />
        </Tabs>
        <TabPanel index={0} value={currentTab} className={classes.wrapper}>
          <AccountTab isLoadingBookmarkedLite={isLoadingBookmarkedLite} getBookmarked={getBookmarked} bookmarked={bookmarked} account={account} profileId={profileId} />
        </TabPanel>
        <TabPanel index={1} value={currentTab} className={classes.wrapper}>
          <ReviewTab profileId={profileId} />
        </TabPanel>
      </div>
    </TopNav>
  );
}

const mapStateToProps = ({ account, book }) => {
  return {
    account: {
      isAuth: !!(localStorage.getItem('isAuth')),
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      name: localStorage.getItem('name'),
      avatar: localStorage.getItem('avatar'),
      coin: Number.parseInt(localStorage.getItem('coin')),
    },
    bookmarked: book.bookmarked,
    isLoadingBookmarkedLite: book.isLoadingBookmarked
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBookmarked: getBookmarkedLite
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));