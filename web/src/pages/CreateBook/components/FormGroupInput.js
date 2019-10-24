import React from 'react';

import colors from '../../../constants/colors';
import { withStyles } from '@material-ui/styles';
import { FormControl, InputLabel, Input, FormGroup, FormHelperText } from '@material-ui/core';

const styles = theme => ({
  formGroup: {
    '&.MuiFormGroup-root': {
      width: '100%'
    }
  },
  input: {
    fontFamily: 'Montserrat',
    marginBottom: 15,
    '& .MuiInputLabel-formControl': {
      transform: 'translate(0, 1.5px) scale(0.75)',
    },
  },
  inputAble: {
    fontFamily: 'Montserrat',
    marginBottom: 15,
    '&:hover': {
      borderColor: colors.primary,
      outline: 'none'
    },
    '& .MuiFormHelperText-root': {
      color: 'red'
    },
    '& .MuiInputLabel-formControl': {
      transform: 'translate(0, 1.5px) scale(0.75)',
      color: colors.primary
    },
    '&:hover .MuiInput-underline:before': {
      borderBottom: `1px solid ${colors.primary}`
    },
    '& .MuiInput-underline:after': {
      borderBottom: `2px solid ${colors.primary}`
    },
    '& .MuiInputLabel-asterisk': {
      color: 'red'
    }
  },
  hidden: {
    visibility: 'hidden'
  }
})

const FormGroupInput = (props) => {
  const { placeholder, classes, id, name, type, error, value, label, disabled, handleChange, handleBlur, required, touched } = props
  return (
    <FormGroup className={classes.formGroup}>
      <FormControl className={!disabled ? classes.inputAble : classes.input}>
        <InputLabel htmlFor={id} required={required}>{label}</InputLabel>
        <Input
          id={id}
          name={name}
          type={type}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
        <FormHelperText
          id={`${id}-error`}
          className={`${!(touched && error) && classes.hidden}`}
        >
          {error}
        </FormHelperText>
      </FormControl>
    </FormGroup>
  )
}

export default (withStyles(styles)(FormGroupInput));