import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { withStyles } from '@material-ui/core/styles';

import { getReviewById, toggleLikeSingleReview } from '../../redux/actions/reviewAction';
import { getReplies, postReply, toggleLikeReply } from '../../redux/actions/replyAction';

import PersonalInfo from './components/PersonalInfo';
import ReviewItem from './components/ReviewItem';
import RateSection from './components/RateSection';
import CommentList from './components/CommentList';
import TopNav from './components/TopNav';
import Loading from '../../components/Loading';

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
	flexContainer: {
		display: 'flex',
		justifyContent: 'space-between'
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
			classes, isLoadingReviewById, replies, isLoadingReplies, isSubmitting, review, handleSubmit,
			values, handleChange, handleBlur, userId
		} = this.props;
		const isLoading = isLoadingReviewById || isLoadingReplies || isSubmitting;

		const createdDay = (date) => {
			let createdYMD = date.split('T')[0].split('-');
			let day = createdYMD[2];
			let month = createdYMD[1];
			let year = createdYMD[0];
			let formattedDate = day + '-' + month + '-' + year;
			return formattedDate;
		}

		const handleToggleLikeReview = (reviewId, likeReviewId, likeStatus) => {
			const { toggleLikeReviewStatus } = this.props
			toggleLikeReviewStatus({ reviewId, likeReviewId, likeStatus })
		}

		const handleToggleLikeReply = (replyId, likeReplyId, likeStatus) => {
			const { toggleLikeReplyStatus } = this.props
			toggleLikeReplyStatus({replyId, likeReplyId, likeStatus})
		}

		return (
			<TopNav review={review}>
				<Loading isLoading={isLoading} />
				<div className={classes.container}>
					<PersonalInfo review={review} createdDay={createdDay} />
					<ReviewItem review={review} />
					<RateSection review={review} handleToggleLikeReview={handleToggleLikeReview} isLoading={isLoading}/>
					<CommentList
						values={values}
						replies={replies}
						userId={userId}
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						handleBlur={handleBlur}
						createdDay={createdDay}
						handleToggleLikeReply={handleToggleLikeReply}
					/>
				</div>
			</TopNav>
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
			match
		} = props
		const reviewId = match.params.reviewId

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
})(withStyles(styles)(BookReview))

const mapStateToProps = ({ review, reply }) => {
	return {
		userId: localStorage.getItem('userId'),
		review: review.singleReview,
		replies: reply.replies,
		isLoadingReviewById: review.isLoadingReviewById,
		isLoadingReplies: reply.isLoadingReplies
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getReview: getReviewById,
	getRepliesOfReview: getReplies,
	createNewReply: postReply,
	toggleLikeReviewStatus: toggleLikeSingleReview,
	toggleLikeReplyStatus: toggleLikeReply
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateReplyWithFormik);