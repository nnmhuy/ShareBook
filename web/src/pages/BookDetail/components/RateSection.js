import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'
import Link from '../../../components/Link'

import colors from '../../../constants/colors'

import { ReactComponent as RightArrow } from '../../../static/images/right-arrow.svg'

const styles = (theme => ({
  container: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  description: {
    marginTop: 5,
    fontSize: 12,
    color: colors.gray
  },
  rating: {
    margin: 'auto',
    marginTop: 10,
    width: 'fit-content'
  },
  link: {
    fontSize: 12,
    lineHeight: 1.5,
    color: colors.textSecondary
  }
}))

const RateSection = (props) => {
  const { classes, bookId, history } = props

  const handleChangeRating = (event, newValue) => {
    history.push(`/add-review/${bookId}`, { rating: newValue })
  }
  return (
    <div className={classes.container}>
      <div className={classes.label}>Đánh giá cuốn sách</div>
      <div className={classes.description}>Hãy cùng chia sẻ suy nghĩ của bạn về cuốn sách này</div>
      <Rating
        className={classes.rating}
        name='half-rating'
        onChange={handleChangeRating}
        precision={0.5}
        size='large'
      />
      <Link to={`/add-review/${bookId}`} className={classes.link}>
        Ghi cảm nhận
        <RightArrow height={10} stroke={colors.textSecondary}/>
      </Link>
    </div>
  )
}

export default withStyles(styles)(RateSection)