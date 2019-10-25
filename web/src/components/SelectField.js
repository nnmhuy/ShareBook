import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  FormHelperText
} from '@material-ui/core'

import colors from '../constants/colors'

const styles = (theme => ({
  select: {
    '& .Mui-focused': {
      color: colors.textPrimary,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: colors.textPrimary
      }
    },
    '& .MuiFormLabel-filled': {
      color: colors.textPrimary,
    },
  },
  hidden: {
    visibility: 'hidden'
  }
}))

const InputField = (props) => {
  const {
    classes, id, label, name, value, touched, error, required,
    optionValues, handleChange, className, handleBlur, disabled
  } = props

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl variant='outlined' className={`${classes.select} ${className}`}>
      <InputLabel ref={inputLabel} htmlFor={id} required={required}>
        {label}
      </InputLabel>
      <Select
        native
        disabled={disabled}
        value={value}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        input={
          <OutlinedInput labelWidth={labelWidth} name={name} id={id}/>
        }
      >
        <option value='' />
        {
          optionValues.map((option) => (
            <option value={option.value} key={option.value}>{option.label}</option>
          ))
        }
      </Select>
      <FormHelperText
        id={`${id}-error`}
        className={`${!(touched && error) && classes.hidden}`}
        style={{margin: '8px 0px 16px 0px'}}
        error
      >
        {error}
      </FormHelperText>
    </FormControl>
  )
}
export default withStyles(styles)(InputField)