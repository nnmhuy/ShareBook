import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'
import {
  FormHelperText
} from '@material-ui/core'

import colors from '../../../constants/colors'

const styles = (theme => ({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10
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
  rating: {
    // justifyContent: 'center',
    margin: 'auto',
    width: 'fit-content',
    marginTop: 10,
    fontSize: 50
  },
  hidden: {
    display: 'none'
  }
}))

const RatingContainer = (props) => {
  const { classes, value, touched, error, setFieldValue, ...other } = props

  const handleChange = (event, value) => {
    setFieldValue('rating', value)
  }

  return (
    <div className={classes.container} {...other}>
      <div className={classes.title}>Đánh giá của bạn</div>
      <div className={classes.text}>Hãy cùng chia sẻ suy nghĩ của bạn về quyển sách này</div>
      <Rating
        className={classes.rating}
        id='rating'
        name='rating'
        value={value}
        touched={touched}
        error={error}
        onChange={handleChange}
        size='large'
        precision={0.5}
      />
      <FormHelperText
        id={`rating-error`}
        className={(!(touched && error) && classes.hidden) || ''}
      >
        {error}
      </FormHelperText>
    </div>
  )
}

export default withStyles(styles)(RatingContainer)