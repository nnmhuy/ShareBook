import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { withFormik } from 'formik'

import Rating from './components/Rating'
import ImageContainer from './components/ImageContainer'
import ReviewContainer from './components/ReviewContainer'

import uploadImage from '../../helper/uploadImage'
import { warnAlert, errorAlert } from '../../components/alert'


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

  render() {
    const {
      values,
      touched,
      errors,
      setFieldValue,
      handleChange,
      handleBlur,
      handleSubmit,
      classes
    } = this.props

    return (
      <div className={classes.container}>
        <Rating
          value={values.rating}
          touched={touched.rating}
          error={errors.rating}
          setFieldValue={setFieldValue}
        />
        <ImageContainer 
          value={values.images}
        />
        <ReviewContainer 
          value={values.content}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      </div>
    )
  }
}


const AddReviewWithFormik = withFormik({
  mapPropsToValues: () => ({ rating: 0, images: [require('../../static/images/demo/demo-book-cover.png')], content: '', isLoadingImage: {} }),

  handleSubmit: (values, { setSubmitting, props }) => {

  }
})(withStyles(styles)(AddReview))

const mapStateToProps = ({ state }) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewWithFormik);
