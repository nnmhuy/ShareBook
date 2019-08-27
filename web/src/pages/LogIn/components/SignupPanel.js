import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withFormik } from 'formik'

import SignupStepOne from './SignupStepOne'
import SignupStepTwo from './SignupStepTwo'


const styles = (theme => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}))

class SignupPanel extends React.Component {
  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      classes
    } = this.props
    return (
      <form onSubmit={handleSubmit} className={classes.container}>
        {/* <SignupStepOne 
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
        /> */}
        <SignupStepTwo
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      </form>
    )
  }
}


const SignupWithFormik = withFormik({
  mapPropsToValues: () => ({ username: '', password: '' }),

  validate: values => {
    const errors = {};
  
    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(withStyles(styles)(SignupPanel))

export default SignupWithFormik