import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import colors from '../../../constants/colors'

import SignupStepOne from './SignupStepOne'
import  { LoginValidation } from '../../../helper/userValidator'
import { warnAlert, errorAlert } from '../../../components/alert'
import { uploadImage } from '../../../helper/uploadImage'
import { signUp } from '../../../redux/actions/accountAction'


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
    if (props.isLoading) return

    setSubmitting(true)
    if (values.isLoadingImage) {
      warnAlert('Đang tải ảnh, vui lòng chờ và thử lại')
      return
    }

    // when has avatar
    if (values.avatar && values.avatar.blob) {
      uploadImage(values.avatar, (err, linkImage) => {
          if (err) {
            errorAlert('Xảy ra lỗi lúc đăng hình rồi')
          } else {
            props.signUpHandler({username: values.username, password: values.password, avatar: linkImage})
          }
          setSubmitting(false);
      })
    } else {
      props.signUpHandler({username: values.username, password: values.password, avatar: '/containers/defaultContainer/download/defaultBook.png'})
      setSubmitting(false);
    }
  }
})(withStyles(styles)(SignupPanel))

const mapStateToProps = ({ account }) => {
  return {
    isLoading: account.isLoading
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signUpHandler: signUp,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignupWithFormik)