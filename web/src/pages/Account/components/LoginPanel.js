import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withFormik } from 'formik'
import {
  Fab
} from '@material-ui/core'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Logo from '../../../static/images/logo.png'
import { ReactComponent as BookOpen } from '../../../static/images/book-open.svg'
import { ReactComponent as BookClosed } from '../../../static/images/book-closed.svg'

import colors from '../../../constants/colors'
import { baseURL } from '../../../constants/constants'

import InputField from '../../../components/InputField'
import  { LoginValidation } from '../../../helper/userValidator'
import { logInLocal } from '../../../redux/actions/accountAction'


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
    marginTop: 30,
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
  loginFbbuttonLink: {
    color: 'inherit',
    textDecoration: 'none'
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
  },
  policy: {
    fontSize: 10,
    color: '#000000',
    marginTop: 10,
    marginBottom: 10
  },
  policyLink: {
    color: colors.textPrimary
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
          id='login-username'
          label='Tên đăng nhập'
          name='username'
          type='string'
          value={values.username}
          touched={touched.username}
          error={errors.username}
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
          <a className={classes.loginFbbuttonLink} href={`${baseURL}/auth/facebook`}>
            Đăng nhập bằng Facebook
          </a>
        </Fab>
        <span className={classes.policy}>
          Tôi đồng ý với các <Link to='/policy' className={classes.policyLink}>Điều khoản</Link>
        </span>
      </form>
    )
  }
}


const LoginPanelWithFormik = withFormik({
  mapPropsToValues: () => ({ username: '', password: '' }),

  validationSchema: LoginValidation,

  handleSubmit: (values, { setSubmitting, props }) => {
    setSubmitting(true);
    if (!props.isLoading) {
      props.logInLocalHandler({username: values.username, password: values.password})
    }
    setSubmitting(false);
  }
})(withStyles(styles)(LoginPanel))

const mapStateToProps = ({ account }) => {
  return {
    isLoading: account.isLoading
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logInLocalHandler: logInLocal,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPanelWithFormik);