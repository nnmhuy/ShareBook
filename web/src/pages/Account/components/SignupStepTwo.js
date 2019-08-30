import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Fab
} from '@material-ui/core'
import { Link } from 'react-router-dom'

import colors from '../../../constants/colors'

import Logo from '../../../static/images/logo.png'
import { ReactComponent as BackArrow } from '../../../static/images/back-arrow.svg'

import InputField from '../../../components/InputField'
import SelectField from '../../../components/SelectField'
import CheckboxField from '../../../components/CheckboxField'

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
  logo: {
    position: 'absolute',
    height: 30,
    left: 10,
    bottom: 10
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
  backButton: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
    width: 39,
    height: 39,
    backgroundImage: 'linear-gradient(to left,#0076FF, #04ABE8)',
  },
  buttonContainer: {
    marginTop: 10
  },
  selectContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  checkboxLabel: {
    fontSize: 9,
    color: '#000000'
  },
  policyLink: {
    color: colors.textPrimary
  }
}))

const districtOptions = [
  { value: '1', label: 'Quận 1'},
  { value: '2', label: 'Quận 2'},
  { value: '3', label: 'Quận 3'},
  { value: '4', label: 'Quận 4'},
  { value: '5', label: 'Quận 5'},
]

const cityOptions = [
  { value: 'hcm', label: 'Hồ Chí Minh'}
]

class SignupStepTwo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      classes,
      backStep
    } = this.props

    return (
      <div className={classes.container}>
        <Fab
          aria-label='back'
          className={classes.backButton}
          onClick={backStep}
        >
          <BackArrow/>
        </Fab>
        <InputField
          id='signup-phone-number'
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
          id='signup-address'
          label='Địa chỉ'
          name='address'
          value={values.address}
          touched={touched.address}
          placeholder='Số nhà, tên đường, tên phường'
          error={errors.address}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <div className={classes.selectContainer}>
          <SelectField 
            id='signup-district'
            label='Quận'
            name='district'
            value={values.district}
            touched={touched.district}
            error={errors.district}
            optionValues={districtOptions}
            handleChange={handleChange}
          />
          <SelectField
            id='signup-city'
            label='Thành phố'
            name='city'
            value={values.city}
            touched={touched.city}
            error={errors.city}
            optionValues={cityOptions}
            handleChange={handleChange}
          />
        </div>
        <CheckboxField
          id='signup-check-policy'
          name='checkPolicy'
          value={values.checkPolicy}
          handleChange={handleChange}
          label={
            <span className={classes.checkboxLabel}>
              Tôi đồng ý với các <Link to='/policy' className={classes.policyLink}>Điều khoản</Link>
            </span>
          }
        />
        <Fab
          variant='extended'
          aria-label='login'
          className={classes.loginButton}
        >
          Tạo tài khoản
        </Fab>
        <img src={Logo} className={classes.logo} alt='ShareBook' />
      </div>
    )
  }
}

export default withStyles(styles)(SignupStepTwo)