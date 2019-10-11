import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { getAllReviews, toggleLikeSingleReview } from '../../redux/actions/reviewAction';

import Loading from '../../components/Loading';
import LayoutWrapper from '../../components/LayoutWrapper';
import Review from '../../components/Review';
import { toggleLikeReply } from '../../redux/actions/replyAction';

const styles = (theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    maxWidth: 551,
    margin: 'auto'
  },
  writeReview: {
    fontFamily: 'Montserrat',
    width: '100%',
    borderRadius: 3,
    background: 'linear-gradient(to top, #0076ff 0%, #04abe8 100%)',
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 600,
    margin: '10px auto'
  },
  link: {
    textDecoration: 'none'
  }
}))

const Newsfeed = (props) => {
  const { classes, account, isLoadingAllReviews, getReviews, allReviews } = props;
  const isLoading = isLoadingAllReviews;

  const handleToggleLikeReview = (reviewId, likeReviewId, likeStatus) => {
    const { toggleLikeReviewStatus } = props
    toggleLikeReviewStatus({ type: 'newsfeed', reviewId, likeReviewId, likeStatus })
  }

  const handleToggleLikeReply = (replyId, likeReplyId, likeStatus) => {
    const { toggleLikeReplyStatus } = this.props
    toggleLikeReplyStatus({ type: 'newsfeed', replyId, likeReplyId, likeStatus })
  }

  useEffect(() => {  
    const userId = account.userId
    getReviews({userId});
  }, [])

  return (
    <LayoutWrapper account={account} title={''}>
      <Loading isLoading={isLoading} />
      <div className={classes.container}>
        {!isLoading && 
          <Link to='/book-list' className={classes.link}>
            <Button className={classes.writeReview} >
              ghi review mới
                </Button>
          </Link>
        }
        {
          allReviews && allReviews.map(curReview => {
            return (
              <Review
                key={curReview.review.id}
                review={curReview.review}
                replies={curReview.reply}
                reviewId={curReview.review.id}
                handleToggleLikeReview={handleToggleLikeReview}
                handleToggleLikeReply={handleToggleLikeReply}
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
  toggleLikeReviewStatus: toggleLikeSingleReview,
  toggleLikeReplyStatus: toggleLikeReply
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Newsfeed));