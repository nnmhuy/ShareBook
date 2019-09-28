import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { demoBook, demoReview, demoCommentList } from './demoData';
import { getReviewsOfBook, toggleLikeReview } from '../../redux/actions/reviewAction';

import PersonalInfo from './components/PersonalInfo';
import ReviewItem from './components/ReviewItem';
import RateSection from './components/RateSection';
import CommentList from './components/CommentList';
import TopNav from './components/TopNav';

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
    render() {
        const { classes, match } = this.props;
        const reviewId = match.params.reviewId;

        return (
            <TopNav book={demoBook}>
                <div className={classes.container}>
                    <PersonalInfo />
                    <ReviewItem demoReview={demoReview} />
                    <RateSection />
                    <CommentList commentList={demoCommentList} />
                </div>
            </TopNav>
        );
    }
}


const mapStateToProps = ({ book, review }) => {
    return {
        reviews: review.reviewsOfBook
    }
}

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//     getReviews: getReviewsOfBook,
//     toggleLikeReviewStatus: toggleLikeReview
// }, dispatch)

export default connect(mapStateToProps)(withStyles(styles)(BookReview));