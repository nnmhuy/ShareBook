import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import colors from '../../../constants/colors'
import { ReactComponent as Quotation } from '../../../static/images/quotation.svg'
import { ReactComponent as RightArrow } from '../../../static/images/right-arrow.svg'
import Avatar from '../../../components/Avatar'

const styles = (theme => ({
  container: {
    width: 600,
    maxWidth: '85%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    outline: 'none',
    maxHeight: 400
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
    transition: '0.3s',
    '&:hover': {
      filter: 'brightness(120%)',
    }
  },
  username: {
    marginLeft: 15,
    fontSize: 18,
    color: colors.textSecondary,
    transition: '0.3s',
    '&:hover': {
      color: colors.primary
    }
  },
  bookName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    transition: '0.3s',
    '&:hover': {
      color: colors.primary
    }
  },
  review: {
    maxHeight: 180,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 2,
    textAlign: 'left',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  goReview: {
    transition: '0.3s',
    '&:hover': {
      color: colors.primary
    }
  }
}))

const TopReviewItem = (props) => {
  const { classes, bookId, userId, name, avatar, id, bookName, content } = props
  return (
    <div className={classes.container}>
      <Quotation className={classes.quotation} />
      <div className={classes.reviewContainer}>
        <div className={classes.userContainer}>
          <Link to={`/profile/${userId}`} className={classes.link}>
            <Avatar src={avatar} className={classes.avatar}/>
          </Link>
          <Link to={`/profile/${userId}`} className={classes.link}>
            <span className={classes.username}>{name}</span>
          </Link>
        </div>
        <Link to={`/book-detail/${bookId}`} className={classes.link}>
          <div className={classes.bookName}>{bookName}</div>
        </Link>
        <div className={classes.review}>{content}</div>
        <Link to={`/review/${id}`} className={classes.link}>
          <RightArrow height={12} stroke={colors.textSecondary} />
          <span className={classes.goReview}> Đi tới review</span>
        </Link>
      </div>
    </div>
  )
}

export default withStyles(styles)(TopReviewItem)