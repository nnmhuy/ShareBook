import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { bindActionCreators } from 'redux';

import TopNav from './components/TopNav';
import MainTab from './components/MainTab';
import { getBookmarkedLite } from '../../redux/actions/bookAction';

const styles = theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    maxWidth: 800,
    margin: 'auto',
    paddingBottom: 20
  }
})

const Profile = props => {
  const { classes, account, match, getBookmarked, bookmarked, isLoadingBookmarkedLite } = props;
  const profileId = match.params.profileId;
  
  return (
    <TopNav title='Tài khoản' account={account}>
      <div className={classes.container}>
        <MainTab account={account} profileId={profileId} bookmarked={bookmarked} getBookmarked={getBookmarked} isLoadingBookmarkedLite={isLoadingBookmarkedLite}/>
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