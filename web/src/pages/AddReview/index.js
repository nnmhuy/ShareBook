import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from "react-router"
import { withStyles } from '@material-ui/core/styles'
import { withFormik } from 'formik'

import Loading from '../../components/Loading'
import TopNav from './components/TopNav'
import Rating from './components/Rating'
import ImageContainer from './components/ImageContainer'
import ReviewContainer from './components/ReviewContainer'

import { getBookLite } from '../../redux/actions/bookAction'
import { getReviewByUser, postReview } from '../../redux/actions/reviewAction'
import { uploadImagePromise } from '../../helper/uploadImage'
import _ from 'lodash'


const styles = (theme => ({
  container: {
    boxSizing: 'border-box',
    width: '100%',
    minWidth: 350,
    maxWidth: 800,
    margin: 'auto',
  }
}))

class AddReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    const { userId, match, getReview, getBook } = this.props
    const bookId = match.params.bookId
    getReview({ userId, bookId })
    getBook({ bookId })
  }

  componentDidUpdate(prevProps) {
    const { setValues, review } = this.props
    if (prevProps.isLoadingReviewByUser && !this.props.isLoadingReviewByUser && review) {
      setValues({
        content: review.content || '',
        images: review.images || [],
        rating: review.rating || 0
      })
    }
  }

  render() {
    const {
      values,
      errors,
      setFieldValue,
      handleChange,
      handleBlur,
      classes,
      handleSubmit,
      isLoadingReviewByUser,
      isPostingReview,
      isLoadingBookLite,
      isSubmitting,
      book
    } = this.props
    const isLoading = isLoadingReviewByUser || isSubmitting || 
      isPostingReview || isLoadingBookLite || values.isLoadingImage

    return (
      <TopNav handleSubmit={handleSubmit} name={book.name} bookImage={book.image} isLoading={isLoading}>
        <Loading isLoading={isLoading}/>
        <div className={classes.container}>
          <Rating
            value={values.rating}
            error={errors.rating}
            setFieldValue={setFieldValue}
          />
          <ImageContainer 
            value={values.images}
            setFieldValue={setFieldValue}
          />
          <ReviewContainer 
            value={values.content}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </div>
      </TopNav>
    )
  }
}


const AddReviewWithFormik = withFormik({
  mapPropsToValues: (props) => {
    return { 
      rating: _.get(props, 'history.location.state.rating', 0),
      images: [],
      content: '',
      isLoadingImage: false
    }
  },

  handleSubmit: async (values, { setSubmitting, props }) => {
    const { 
      createReview, 
      isLoadingReviewByUser, 
      isSubmitting, 
      isPostingReview,
      match,
      review
    } = props
    
    const isLoading = isLoadingReviewByUser || isSubmitting || isPostingReview || values.isLoadingImage
    if (isLoading) return

    setSubmitting(true)

    let imagesUrl = await Promise.all(values.images.map(image => uploadImagePromise(image)))

    const data = {
      rating: values.rating,
      content: values.content,
      images: imagesUrl,
      bookId: match.params.bookId,
      reviewId: review && review.id
    }

    createReview(data)
    setSubmitting(false)
  }
})(withStyles(styles)(AddReview))

const mapStateToProps = ({ review, book }) => {
  return {
    userId: localStorage.getItem('userId'),
    book: book.bookLite,
    isLoadingBookLite: book.isLoadingBookLite,
    isLoadingReviewByUser: review.isLoadingReviewByUser,
    review: review.userReview,
    isPostingReview: review.isPostingReview
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBook: getBookLite,
  createReview: postReview,
  getReview: getReviewByUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddReviewWithFormik));
