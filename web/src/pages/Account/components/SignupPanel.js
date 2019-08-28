import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Stepper,
  Step,
  StepLabel
} from '@material-ui/core'
import { withFormik } from 'formik'

import colors from '../../../constants/colors'
import SignupStepOne from './SignupStepOne'
import SignupStepTwo from './SignupStepTwo'


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

const steps = [
  '', ''
]
class SignupPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0
    }
  }

  backStep = () => {
    const { activeStep } = this.state
    this.setState({
      activeStep: activeStep - 1
    })
  }

  nextStep = () => {
    const { activeStep } = this.state
    this.setState({
      activeStep: activeStep + 1
    })
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

    const { activeStep } = this.state

    return (
      <form onSubmit={handleSubmit} className={classes.container}>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label, index) => {
            return (
              <Step key={label} className={classes.step}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {(activeStep===0) &&
          <SignupStepOne 
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            nextStep={this.nextStep}
          />
        }
        {(activeStep===1) && 
          <SignupStepTwo
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            backStep={this.backStep}
          />
        }
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