import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withFormik } from 'formik'

import colors from '../../../constants/colors'
import SignupStepOne from './SignupStepOne'



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
      classes
    } = this.props

    return (
      <form onSubmit={handleSubmit} className={classes.container}>
          <SignupStepOne 
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            nextStep={this.nextStep}
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