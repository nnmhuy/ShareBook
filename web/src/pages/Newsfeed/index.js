import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { getAllReviews, toggleLikeSingleReview } from '../../redux/actions/reviewAction';
// import InfiniteScroll from 'react-infinite-scroller';
// import PulseLoader from 'react-spinners/PulseLoader';
// import colors from '../../constants/colors';

import Loading from '../../components/Loading';
import LayoutWrapper from '../../components/LayoutWrapper';
import Review from '../../components/Review';

const styles = (theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    maxWidth: 551,
    margin: 'auto'
  }
}))

const Newsfeed = (props) => {
  const { classes, account, isLoadingAllReviews, getReviews, allReviews } = props;
  const isLoading = isLoadingAllReviews;

  const handleToggleLikeReview = (reviewId, likeReviewId, likeStatus) => {
    const { toggleLikeReviewStatus } = props
    console.log('liking')
    toggleLikeReviewStatus({ reviewId, likeReviewId, likeStatus })
  }


  useEffect(() => {  
    const userId = account.userId
    getReviews({userId});
  }, [])

  return (
    <LayoutWrapper account={account} title={''}>
      <Loading isLoading={isLoading} />
      <div className={classes.container}>
          {
            allReviews && allReviews.map(curReview => {
              return (
                <Review
                  key={curReview.review.id}
                  review={curReview.review}
                  replies={curReview.reply}
                  reviewId={curReview.review.id}
                  handleToggleLikeReview={handleToggleLikeReview}
                />
              )
            })
          }
      </div>
    </LayoutWrapper>
  );
};

const mapStateToProps = ({ review }) => {
  return {
    account: {
      isAuth: !!(localStorage.getItem('isAuth')),
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      name: localStorage.getItem('name'),
      avatar: localStorage.getItem('avatar'),
      coin: Number.parseInt(localStorage.getItem('coin')),
    },
    allReviews: review.allReviews,
    isLoadingAllReviews: review.isLoadingAllReviews
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getReviews: getAllReviews,
  toggleLikeReviewStatus: toggleLikeSingleReview
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Newsfeed));