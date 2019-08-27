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
  inputLabel: {
    color: colors.textPrimary
  },
  hidden: {
    visibility: 'hidden'
  }
}))

const InputField = (props) => {
  const {
    classes, id, label, name, value, touched, error,
    optionValues, handleChange
  } = props

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl variant='outlined' className={classes.select}>
      <InputLabel ref={inputLabel} htmlFor={id} className={classes.inputLabel}>
        {label}
        </InputLabel>
      <Select
        native
        value={value}
        name={name}
        onChange={handleChange}
        input={
          <OutlinedInput labelWidth={labelWidth} name={name} id={id} />
        }
      >
        <option value='' />
        {
          optionValues.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))
        }
      </Select>
      <FormHelperText
        id={`${id}-error`}
        className={!(touched && error) && classes.hidden}
      >
        {error}
      </FormHelperText>
    </FormControl>
  )
}
export default withStyles(styles)(InputField)