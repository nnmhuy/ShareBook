import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { getReviewById, toggleLikeSingleReview } from '../../redux/actions/reviewAction';
import { getReplies, toggleLikeReply } from '../../redux/actions/replyAction';

import Review from '../../components/Review/index';
import TopNav from './components/TopNav';
import Loading from '../../components/Loading';

const styles = (theme => ({
	container: {
		width: '100%',
		minWidth: 350,
		maxWidth: 551,
		margin: 'auto'
	}
}))

class BookReview extends Component {

	componentDidMount() {
		const { match, getReview, userId, getRepliesOfReview } = this.props;
		const reviewId = match.params.reviewId;
		getReview({ userId, reviewId });
		getRepliesOfReview({ userId, reviewId });
	}

	render() {
		const {
			classes, isLoadingReviewById, replies, isLoadingReplies, isSubmitting, review, match
		} = this.props;
		const isLoading = isLoadingReviewById || isLoadingReplies || isSubmitting;

		const handleToggleLikeReview = (reviewId, likeReviewId, likeStatus) => {
			const { toggleLikeReviewStatus } = this.props
			toggleLikeReviewStatus({ type: 'single', reviewId, likeReviewId, likeStatus })
		}

		const handleToggleLikeReply = (replyId, likeReplyId, likeStatus) => {
			const { toggleLikeReplyStatus } = this.props
			toggleLikeReplyStatus({ type: 'single', replyId, likeReplyId, likeStatus })
		}

		return (
			<TopNav review={review}>
				<Loading isLoading={isLoading} />
				<div className={classes.container}>
					<Review
						review={review}
						replies={replies}
						isLoading={isLoading}
						handleToggleLikeReview={handleToggleLikeReview}
						handleToggleLikeReply={handleToggleLikeReply}
						reviewId={match.params.reviewId}
					/>
				</div>
			</TopNav>
		);
	}
}

const mapStateToProps = ({ review, reply }) => {
	return {
		userId: localStorage.getItem('userId'),
		review: review.review,
		replies: reply.replies,
		isLoadingReviewById: review.isLoadingReviewById,
		isLoadingReplies: reply.isLoadingReplies
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getReview: getReviewById,
	getRepliesOfReview: getReplies,
	toggleLikeReviewStatus: toggleLikeSingleReview,
	toggleLikeReplyStatus: toggleLikeReply
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookReview));