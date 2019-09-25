import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Fab,
  Avatar,
  CircularProgress
} from '@material-ui/core'
import { Link } from 'react-router-dom'

import Logo from '../../../static/images/logo.png'
import FacebookLogo from '../../../static/images/facebook-logo.png'
import AvatarPlaceholder from '../../../static/images/avatar-placeholder.png'
import { ReactComponent as BookOpen } from '../../../static/images/book-open.svg'
import { ReactComponent as BookClosed } from '../../../static/images/book-closed.svg'
import { ReactComponent as Camera } from '../../../static/images/camera.svg'

import colors from '../../../constants/colors'
import { baseURL } from '../../../constants/constants'

import InputField from '../../../components/InputField'
import { warnAlert } from '../../../components/alert'
import { resizeImage, rotateImage } from '../../../helper/resizeImage'

const styles = (theme => ({
  container: {
    marginTop: 15,
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
    margin: 15,
    marginTop: 5
  },
  avatarImage: {
    width: 100,
    height: 100,
    backgroundColor: '#7F000000'
  },
  avatarImageOpacity: {
    width: 100,
    height: 100,
    backgroundColor: '#7F000000',
    opacity: 0.5
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
  },
  hiddenInput: {
    visibility: 'hidden',
    width: 0,
    height: 0
  },
  policy: {
    fontSize: 10,
    color: '#000000',
    marginTop: 10,
    marginBottom: 5
  },
  progress: {
    margin: theme.spacing(2),
  },
  policyLink: {
    color: colors.textPrimary
  }
}))

class SignupStepOne extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: false,
      avatarSrc: null
    }
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state
    this.setState({
      showPassword: !showPassword
    })
  }

  uploadAvatarHandler = (event) => {
    this.props.setFieldValue('isLoadingImage', true)
    if (event && event.target && event.target.files && event.target.files[0]) {
      let newImage = event.target.files[0]
      var imageName = newImage.name
      if(!newImage.type.match(/image.*/)) {
        warnAlert('Bạn cần nhập file hình nha')
        return;
      }

      resizeImage(newImage, 'small', ({ url, blob }) => {
        this.setState({
          avatarSrc: url
        })
        this.props.setFieldValue('avatar', {imageName , blob})
        this.props.setFieldValue('isLoadingImage', false)
      });
    }
  }

  rotateImageHandler = () => {
    this.props.setFieldValue('isLoadingImage', true)
    let imageName = this.props.values.avatar.imageName
    rotateImage(this.state.avatarSrc, 6, ({ url, blob }) => {
      console.log('done')
      this.setState({
        avatarSrc: url
      })
      this.props.setFieldValue('avatar', { imageName , blob})
      this.props.setFieldValue('isLoadingImage', false)
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
    const { showPassword, avatarSrc } = this.state
    let avatarClass = classes.avatarImage
    let isLoadingImage = values.isLoadingImage
    if (isLoadingImage) {
      avatarClass = classes.avatarImageOpacity
    }

    return (
      <div className={classes.container}>
        <div className={classes.avatarContainer}>
          <Avatar className={avatarClass} src={avatarSrc || AvatarPlaceholder}/>
          <label htmlFor='uploadAvatar'>
            <div className={classes.cameraContainer}>
              {!isLoadingImage
              ?<div>
                <input type='file' className={classes.hiddenInput} id='uploadAvatar' name='uploadAvatar'
                onChange={this.uploadAvatarHandler} accept='image/*'/>
                {!avatarSrc && <Camera width={36} height={28}/>}
              </div>
              :<CircularProgress className={classes.progress} />
              }
            </div>
          </label>
        </div>
        <button onClick={this.rotateImageHandler}>Roate</button>
        <InputField
          id='signup-username'
          label='Tên đăng nhập'
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
       
        <span className={classes.policy}>
          Tôi đồng ý với các <Link to='/policy' className={classes.policyLink}>Điều khoản</Link>
        </span>
        <div className={classes.buttonContainer}>
          <Fab
            aria-label='login-facebook'
            className={classes.loginFbButton}
            href={`${baseURL}/auth/facebook`}
          >
            <img src={FacebookLogo} alt='Login with FB' />
          </Fab>
          <span className={classes.dividerText}>Hoặc</span>
          <Fab
            variant='extended'
            aria-label='login'
            className={classes.loginButton}
            onClick={handleSubmit}
          >
            Tạo tài khoản
        </Fab>
        </div>
        <img src={Logo} className={classes.logo} alt='ShareBook' />
      </div>
    )
  }
}

export default withStyles(styles)(SignupStepOne)