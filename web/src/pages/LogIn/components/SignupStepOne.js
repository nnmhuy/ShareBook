import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Fab,
  Avatar
} from '@material-ui/core'

import Logo from '../../../static/images/logo.png'
import FacebookLogo from '../../../static/images/facebook-logo.png'
import AvatarPlaceholder from '../../../static/images/avatar-placeholder.png'
import { ReactComponent as BookOpen } from '../../../static/images/book-open.svg'
import { ReactComponent as BookClosed } from '../../../static/images/book-closed.svg'
import { ReactComponent as Camera } from '../../../static/images/camera.svg'

import InputField from '../../../components/InputField'

const styles = (theme => ({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0px 35px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatarContainer: {
    position: 'relative',
    margin: 15
  },
  avatarImage: {
    width: 100,
    height: 100,
    backgroundColor: '#7F000000'
  },
  cameraContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
  },
  logo: {
    position: 'absolute',
    height: 30,
    left: 10,
    bottom: 10
  },
  loginButton: {
    width: 151,
    height: 35,
    backgroundImage: 'linear-gradient(to left,#0076FF, #04ABE8)',
    textTransform: 'none',
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#fff'
  },
  loginFbButton: {
    width: 35,
    height: 35,
    backgroundColor: '#477ABF'
  },
  dividerText: {
    fontSize: 12,
    margin: '0px 10px'
  },
  buttonContainer: {
    marginTop: 10
  },
  hidden: {
    visibility: 'hidden'
  }
}))

class SignupStepOne extends React.Component {
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
      classes
    } = this.props
    const { showPassword } = this.state
    return (
      <div className={classes.container}>
        <div className={classes.avatarContainer}>
          <Avatar className={classes.avatarImage} src={AvatarPlaceholder}/>
          <div className={classes.cameraContainer}>
            <Camera width={36} height={28}/>
          </div>
        </div>
        <InputField
          id='signup-username'
          label='Tên của bạn'
          name='username'
          value={values.username}
          touched={touched.username}
          error={errors.username}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <InputField
          id='signup-password'
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
        <div className={classes.buttonContainer}>
          <Fab
            aria-label='login-facebook'
            className={classes.loginFbButton}
          >
            <img src={FacebookLogo} alt='Login with FB' />
          </Fab>
          <span className={classes.dividerText}>Hoặc</span>
          <Fab
            variant='extended'
            aria-label='login'
            className={classes.loginButton}
          >
            Bước tiếp theo
        </Fab>
        </div>
        <img src={Logo} className={classes.logo} alt='ShareBook' />
      </div>
    )
  }
}

export default withStyles(styles)(SignupStepOne)