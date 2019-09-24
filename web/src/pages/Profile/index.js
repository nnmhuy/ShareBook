import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import BookSlider from '../../components/BookSlider';

import { numberOfReviewsPerPage, numberOfBookInstancesPerPage } from '../../constants/constants'
import { getBookInfo, toggleBookmark } from '../../redux/actions/bookAction'
import { getBookInstances } from '../../redux/actions/bookInstanceAction'
import { getReviewsOfBook, toggleLikeReview } from '../../redux/actions/reviewAction'
import { bindActionCreators } from 'redux';
import TopNav from './components/TopNav';
import MainTab from './components/MainTab';

const styles = theme => ({
    container: {
        width: '100%',
        minWidth: 350,
        maxWidth: 800,
        margin: 'auto'
    }
})

class Profile extends Component {

    componentWillMount() {
        const { getBookDetail, match, getReviews, userId, getInstances } = this.props
        const bookId = '12'
        getBookDetail({ bookId, userId })
        getReviews({ userId, bookId, page: 0, limit: numberOfReviewsPerPage })
        getInstances({ bookId, page: 0, limit: numberOfBookInstancesPerPage })
    }

    render() {
        const { classes, bookOfCategory, handleChangeTab } = this.props;
        const handleToggleBookmark = (bookId, bookmarkId, isBookmarked) => {
            const { toggleBookmarkStatus } = this.props
            toggleBookmarkStatus({ bookId, bookmarkId, isBookmarked })
        }
        return (
            <TopNav>
                <div className={classes.container}>
                    <MainTab bookOfCategory={bookOfCategory} handleToggleBookmark={handleToggleBookmark} />
                </div>
            </TopNav>
        );
    }
}

const mapStateToProps = ({ book, review, bookInstances }) => {
    return {
        userId: localStorage.getItem('userId'),
        isLoading: book.isLoading,
        bookDetail: book.bookDetail,
        category: book.category,
        isLoadingCategory: book.isLoadingCategory,
        bookOfCategory: book.bookOfCategory,
        reviews: review.reviewsOfBook,
        bookInstances: bookInstances.bookInstances
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getBookDetail: getBookInfo,
    getReviews: getReviewsOfBook,
    getInstances: getBookInstances,
    toggleBookmarkStatus: toggleBookmark,
    toggleLikeReviewStatus: toggleLikeReview
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));