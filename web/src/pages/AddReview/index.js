import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { withFormik } from 'formik'

import TopNav from './components/TopNav'
import Rating from './components/Rating'
import ImageContainer from './components/ImageContainer'
import ReviewContainer from './components/ReviewContainer'

import { demoBook } from './demoData'


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
      classes,
      handleSubmit
    } = this.props

    return (
      <TopNav handleSubmit={handleSubmit} name={demoBook.name} bookImage={demoBook.image}>
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
      </TopNav>
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
