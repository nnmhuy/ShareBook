import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { withStyles } from '@material-ui/core/styles';

import { demoCommentList } from './demoData';
import { getReviewById, toggleLikeSingleReview } from '../../redux/actions/reviewAction';
import { postReply } from '../../redux/actions/replyAction';

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
		border: '1px solid #D8E0E8',
		borderRadius: 3,
		margin: '10px auto'
	},
	flexContainer: {
		display: 'flex',
		justifyContent: 'space-between'
	}
}))

class BookReview extends Component {

	componentDidMount() {
		const { match, getReview, userId } = this.props;
		const reviewId = match.params.reviewId;
		getReview({ userId, reviewId });
	}

	render() {
		const {
			classes, isLoadingReviewById, isSubmitting, review, handleSubmit,
			values, handleChange, handleBlur
		} = this.props;
		const isLoading = isLoadingReviewById || isSubmitting;

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

		return (
			<TopNav review={review}>
				<Loading isLoading={isLoading} />
				<div className={classes.container}>
					<PersonalInfo review={review} createdDay={createdDay} />
					<ReviewItem review={review} />
					<RateSection review={review} handleToggleLikeReview={handleToggleLikeReview} />
					<CommentList
						commentList={demoCommentList}
						values={values}
						review={review}
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						handleBlur={handleBlur}
						createdDay={createdDay}
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

const mapStateToProps = ({ review }) => {
	return {
		userId: localStorage.getItem('userId'),
		review: review.singleReview,
		isLoadingReviewById: review.isLoadingReviewById,
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getReview: getReviewById,
	createNewReply: postReply,
	toggleLikeReviewStatus: toggleLikeSingleReview
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateReplyWithFormik);