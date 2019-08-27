import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Fab
} from '@material-ui/core'

import Logo from '../../../static/images/logo.png'

import InputField from '../../../components/InputField'
import SelectField from '../../../components/SelectField'

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
    backgroundImage: 'linear-gradient(to left,#0076FF, #04ABE8)',
    textTransform: 'none',
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#fff'
  },
  buttonContainer: {
    marginTop: 10
  },
  selectContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
      classes
    } = this.props

    return (
      <div className={classes.container}>
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