import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import colors from '../constants/colors'

const styles = (theme => ({
  container: {
    marginBottom: 10
  },
  title: {
    fontWeight: 600,
    fontSize: 15,
    color: colors.primary
  },
  text: {
    fontSize: 10,
    lineHeight: 1.5,
    color: colors.gray
  },
  required: {
    color: colors.red
  },
  input: {
    resize: 'vertical',
    boxSizing: 'border-box',
    padding: 5,
    display: 'block',
    width: '100%',
    height: 250,
    marginTop: 10,
    lineHeight: 1.5,
    fontSize: 12,
    border: `1px solid ${colors.gray}`,
    '&:focus': {
      borderColor: colors.primary,
      outline: 'none'
    }
  },
  length: {
    textAlign: 'right',
    fontSize: 10,
    lineHeight: 1.5,
    color: colors.primary
  }
}))


const TextArea = (props) => {
  const { classes, value, handleChange, handleBlur, maxLength, label, id, name, required } = props
  return (
    <div className={classes.container}>
      <span className={classes.title} htmlFor={'content'}>
        {label}
        {required && <span className={classes.required}>{` * `}</span>}
        { maxLength && 
          <span className={classes.text}>{` (dưới ${maxLength} từ)`}</span>
        }
      </span>
      <textarea
        id={id}
        className={classes.input}
        placeholder='. . .'
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
      />
      <div className={classes.length}>
        {value !== '' ? value.split(' ').length : 0}
        <span className={classes.text}>{`/${maxLength}`}</span>
      </div>
    </div>
  )
}

export default withStyles(styles)(TextArea)