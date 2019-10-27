import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { withStyles } from '@material-ui/core/styles';

import { postReply } from '../../redux/actions/replyAction';

import PersonalInfo from './PersonalInfo';
import ReviewItem from './ReviewItem';
import RateSection from './RateSection';
import CommentList from './CommentList';

const styles = (theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    maxWidth: 551,
    paddingTop: 15,
    borderTop: '1px solid #D8E0E8',
    borderBottom: '1px solid #D8E0E8',
    margin: '10px auto',
    '@media (min-width: 550px)': {
      border: '1px solid #D8E0E8',
    }
  },
  containerNewsfeed: {
    paddingBottom: 25
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

class Review extends Component {

  render() {
    const {
      classes, isLoading, replies, isSubmitting, review, handleSubmit,
      values, handleChange, handleBlur, userId,
      handleToggleLikeReview, handleToggleLikeReply, account, newsfeed
    } = this.props;
    return (
      <div className={newsfeed ? `${classes.containerNewsfeed} ${classes.container}` : `${classes.container}`}>
        <PersonalInfo review={review} userId={userId}/>
        <ReviewItem review={review} />
        <RateSection review={review} username={account.username} handleToggleLikeReview={handleToggleLikeReview} isLoading={isLoading || isSubmitting} />
        <CommentList
          values={values}
          replies={replies}
          userId={userId}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleToggleLikeReply={handleToggleLikeReply}
        />
      </div>
    );
  }
}

const CreateReplyWithFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      content: ''
    }
  },

  handleSubmit: async (values, { setSubmitting, props }) => {
    const {
      isSubmitting,
      createNewReply,
      reviewId
    } = props
    if (isSubmitting) return
    setSubmitting(true)

    let { content } = values

    const data = {
      content,
      reviewId
    }

    createNewReply(data)
    values.content = ''
    setSubmitting(false)
  }
})(withStyles(styles)(Review))

const mapStateToProps = ({ account }) => {
  return {
    account: {
      isAuth: account.isAuth,
      userId: account.userId,
      username: account.username,
      name: account.name,
      avatar: account.avatar,
      coin: account.coin,
    },
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createNewReply: postReply
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateReplyWithFormik);