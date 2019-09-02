import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withFormik } from 'formik'
import {
  Fab
} from '@material-ui/core'

import Logo from '../../../static/images/logo.png'
import { ReactComponent as BookOpen } from '../../../static/images/book-open.svg'
import { ReactComponent as BookClosed } from '../../../static/images/book-closed.svg'

import InputField from '../../../components/InputField'


const styles = (theme => ({
  container: {
    height: '100%',
    padding: '0px 35px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    height: 70,
    marginTop: 20,
    marginBottom: 10
  },
  loginButton: {
    width: 151,
    height: 35,
    marginTop: 10,
    backgroundImage: 'linear-gradient(to left,#0076FF, #04ABE8)',
    textTransform: 'none',
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#fff'
  },
  loginFbButton: {
    width: '100%',
    height: 35,
    backgroundColor: '#477ABF',
    textTransform: 'none',
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#fff'
  },
  dividerContainer: {
    display: 'flex',
    width: '100%',
    margin: '15px 0px',
    alignItems: 'center'
  },
  dividerText: {
    fontSize: 12,
    margin: '0px 10px'
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#C1C1C1'
  },
  hidden: {
    visibility: 'hidden'
  }
}))

class LoginPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: false
    }
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state
    this.setState({
      showPassword: !showPassword
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
    const { showPassword } = this.state
    return (
      <form onSubmit={handleSubmit} className={classes.container}>
        <img src={Logo} className={classes.logo} alt='ShareBook'/>
        <InputField 
          id='login-phone-number'
          label='Số điện thoại'
          name='phoneNumber'
          type='number'
          value={values.phoneNumber}
          touched={touched.phoneNumber}
          error={errors.phoneNumber}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <InputField 
          id='login-password'
          label='Mật khẩu'
          name='password'
          value={values.password}
          touched={touched.password}
          error={errors.password}
          type={showPassword ? 'text' : 'password'}
          Icon={showPassword ? BookOpen : BookClosed}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleIconClick={this.handleClickShowPassword}
        />
        <Fab
          variant='extended'
          aria-label='login'
          className={classes.loginButton}
          onClick={handleSubmit}
        >
          Đăng nhập
        </Fab>
        <div className={classes.dividerContainer}>
          <div className={classes.divider}/>
          <span className={classes.dividerText}>Hoặc</span>
          <div className={classes.divider}/>
        </div>
        <Fab
          variant='extended'
          aria-label='login-facebook'
          className={classes.loginFbButton}
        >
          <a href='http://localhost:3001/api/auth/facebook'>
            Đăng nhập bằng Facebook
          </a>
        </Fab>
      </form>
    )
  }
}


const LoginPanelWithFormik = withFormik({
  mapPropsToValues: () => ({ phoneNumber: '', password: '' }),

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
})(withStyles(styles)(LoginPanel))

export default LoginPanelWithFormik