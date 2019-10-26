import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { bindActionCreators } from 'redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from '../../components/TabPanel';
import AccountTab from './components/AccountTab';
import ReviewTab from './components/ReviewTab';
import TopNav from './components/TopNav';

import { getBookmarkedLite, toggleBookmark } from '../../redux/actions/bookAction';
import { getOtherUserInfo } from '../../redux/actions/accountAction'
import { ReactComponent as UserIcon } from '../../static/images/user.svg';
import { ReactComponent as NewsfeedIcon } from '../../static/images/newsfeed.svg';
import { ReactComponent as NewsfeedActiveIcon } from '../../static/images/newsfeed-active.svg';
import Loading from '../../components/Loading';

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
  const { classes, account, match, getBookmarked, history, bookmarked, isLoadingBookmarkedLite, currentUserInfo, isLoadingAccount } = props;
  const profileId = match.params.profileId;
  if (profileId === 'me' && !account.isAuth)
    history.replace('/')
  if (profileId === account.userId && account.isAuth)
    history.replace('/profile/me')
  const isLoading = isLoadingBookmarkedLite || isLoadingAccount
  const [currentTab, handleChangeTab] = useState(0)

  useEffect(() => {
    const userId = match.params.profileId
    userId === 'me' && getBookmarked({userId})
    if (userId !== 'me') {
      props.getOtherUserInfoHandler({userId: userId})
    } else {
      props.getOtherUserInfoHandler({userId: props.account.userId})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToggleBookmark = (bookId, bookmarkId, isBookmarked) => {
    const { toggleBookmarkStatus } = props
    toggleBookmarkStatus({ bookId, bookmarkId, isBookmarked })
  }


  return (
    <TopNav title='Tài khoản' account={account}>
      <Loading isLoading={isLoading}/>
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
          {/* <Tab onClick={() => handleChangeTab(1)}
            label={
              currentTab === 0 ?
                <NewsfeedIcon height={25} className={classes.icon} />
                :
                <NewsfeedActiveIcon height={25} className={classes.icon} />
            } /> */}
        </Tabs>
        <TabPanel index={0} value={currentTab} className={classes.wrapper}>
          <AccountTab isLoadingBookmarkedLite={isLoadingBookmarkedLite} bookmarked={bookmarked} account={account} profileId={profileId}
          handleToggleBookmark={handleToggleBookmark} currentUserInfo={currentUserInfo} />
        </TabPanel>
        {/* <TabPanel index={1} value={currentTab} className={classes.wrapper}>
          <ReviewTab profileId={profileId} />
        </TabPanel> */}
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
    currentUserInfo: account.otherAccount,
    bookmarked: book.bookmarked,
    isLoadingAccount: account.isLoading,
    isLoadingBookmarkedLite: book.isLoadingBookmarked
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBookmarked: getBookmarkedLite,
  toggleBookmarkStatus: toggleBookmark,
  getOtherUserInfoHandler: getOtherUserInfo
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));