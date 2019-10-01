import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { demoCommentList } from './demoData';
import { getReviewById, toggleLikeReview } from '../../redux/actions/reviewAction';

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
		maxWidth: 550,
		margin: 'auto',
		paddingTop: 15
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
			classes, isLoadingReviewById, review
		} = this.props;
		const isLoading = isLoadingReviewById;

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
					<CommentList commentList={demoCommentList} review={review} />
				</div>
			</TopNav>
		);
	}
}


const mapStateToProps = ({ review }) => {
	return {
		userId: localStorage.getItem('userId'),
		review: review.singleReview,
		isLoadingReviewById: review.isLoadingReviewById,
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getReview: getReviewById,
	toggleLikeReviewStatus: toggleLikeReview
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookReview));