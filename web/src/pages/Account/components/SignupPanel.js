import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withFormik } from 'formik'

import colors from '../../../constants/colors'
import SignupStepOne from './SignupStepOne'
import  { LoginValidation } from '../../../helper/userValidator'
import { warnAlert } from '../../../components/alert'
import uploadImage from '../../../helper/uploadImage'


const styles = (theme => ({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stepper: {
    position: 'absolute',
    padding: '10px 5px',
    right: 0,
    top: 0
  },
  step: {
    padding: 0,
    '& .MuiStepIcon-active': {
      color: colors.primary
    },
    '& .MuiStepIcon-completed': {
      color: colors.primary
    }
  }
}))

class SignupPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0
    }
  }

  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      classes,
      setFieldValue
    } = this.props

    return (
      <form onSubmit={handleSubmit} className={classes.container}>
          <SignupStepOne 
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            setFieldValue={setFieldValue}
          />
      </form>
    )
  }
}


const SignupWithFormik = withFormik({
  mapPropsToValues: () => ({ username: '', password: '', avatar: false, isLoadingImage: false }),

  validationSchema: LoginValidation,

  handleSubmit: (values, { setSubmitting, props }) => {
    setSubmitting(true)
    if (values.isLoadingImage) {
      warnAlert('Đang tải ảnh, bạn thử lại sau nha')
      return
    }

    if (values.avatar && values.avatar.blob) {
      uploadImage(values.avatar.blob, (err, linkImage) => {

      })
    }

    setSubmitting(false);
  }
})(withStyles(styles)(SignupPanel))

export default SignupWithFormik