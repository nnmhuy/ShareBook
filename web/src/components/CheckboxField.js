import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Checkbox,
  FormControlLabel
} from '@material-ui/core'

import colors from '../constants/colors'

const styles = (theme => ({
  checkbox: {
    color:  colors.textPrimary
  }
}))

const InputField = (props) => {
  const {
    classes, id, label, name, value, handleChange
  } = props

  return (
    <FormControlLabel
      id={id}
      name={name}
      control={
        <Checkbox
          color='default'
          className={classes.checkbox}
          value={value}
          onChange={handleChange}
        />
      }
      label={label}
    />
  )
}
export default withStyles(styles)(InputField)