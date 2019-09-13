import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'

const styles = (theme => ({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  rating: {
    margin: 'auto',
    width: 'fit-content',
    fontSize: 50
  },
  text: {
    marginTop: 5,
    fontWeight: 500,
    fontSize: 12,
  }
}))

const RatingFilter = (props) => {
  const { classes, value, setFieldValue } = props

  const handleChange = (event, value) => {
    setFieldValue('minRating', value)
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>Ratings</div>
      <div className={classes.text}>{`Chọn sách ít nhất ${value} sao`}</div>
      <Rating
        className={classes.rating}
        name='minRating'
        value={value}
        onChange={handleChange}
        size='large'
        precision={0.5}
      />
    </div>
  )
}

export default withStyles(styles)(RatingFilter)