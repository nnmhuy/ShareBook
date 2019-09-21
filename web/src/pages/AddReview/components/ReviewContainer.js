import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import colors from '../../../constants/colors'

const styles = (theme => ({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
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


const ReviewContainer = (props) => {
  const { classes, value, handleChange, handleBlur } = props
  return (
    <div className={classes.container}>
      <span className={classes.title}>
        Review của bạn
        <span className={classes.required}>{` * `}</span>
        <span className={classes.text}>(dưới 1000 từ)</span>
      </span>
      <textarea
        className={classes.input}
        placeholder='. . .'
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        name='content'
      />
      <div className={classes.length}>
        {value !== '' ? value.split(' ').length : 0}
        <span className={classes.text}>/1000</span>
      </div>
    </div>
  )
}

export default withStyles(styles)(ReviewContainer)