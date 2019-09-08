import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'

import colors from '../../../constants/colors'
import { ReactComponent as Quotation } from '../../../static/images/quotation.svg'
import { ReactComponent as RightArrow } from '../../../static/images/right-arrow.svg'


const styles = (theme => ({
  container: {
    width: 600,
    maxWidth: '85%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row'
  },
  quotation: {
    width: 100,
    maxWidth: '15%'
  },
  link: {
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: '0.01em',
    color: colors.textSecondary,
    textDecoration: 'none'
  },
  reviewContainer: {
    flex: 1,
    marginLeft: 30,
    paddingTop: 50,
  },
  avatar: {
    display: 'inline-block',
    width: 60,
    height: 60,
  },
  username: {
    marginLeft: 15,
    fontSize: 18,
    color: colors.textSecondary
  },
  bookName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textSecondary,
    textTransform: 'uppercase'
  },
  review: {
    maxHeight: 300,
    overflow: 'scroll',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 2,
    textAlign: 'left',
  }
}))

const TopReviewItem = (props) => {
  const { classes, username, avatar, reviewId, bookName, reviewContent } = props
  return (
    <div className={classes.container}>
      <Quotation className={classes.quotation} />
      <div className={classes.reviewContainer}>
        <div className={classes.userContainer}>
          <Avatar src={avatar} className={classes.avatar}/>
          <span className={classes.username}>{username}</span>
        </div>
        <div className={classes.bookName}>{bookName}</div>
        <div className={classes.review}>"{reviewContent}"</div>
        <Link to={`/review/${reviewId}`} className={classes.link}>
          <RightArrow height={12} stroke={colors.textSecondary} />
          <span> Đi tới review</span>
        </Link>
      </div>
    </div>
  )
}

export default withStyles(styles)(TopReviewItem)