import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'
import { Button, IconButton, ClickAwayListener } from '@material-ui/core'


import Link from './Link'
import Image from './Image'
import Avatar from './Avatar'
import getFormattedDate from '../helper/getFormattedDate'

import colors from '../constants/colors'
import { ReactComponent as LikeNotFilledIcon } from '../static/images/like.svg'
import { ReactComponent as LikeFilledIcon } from '../static/images/like-filled.svg'
import { ReactComponent as CommentIcon } from '../static/images/transactions.svg'
import { ReactComponent as NextArrow } from '../static/images/back-arrow.svg'
import { ReactComponent as MoreIcon } from '../static/images/more.svg'
import { ReactComponent as ReportIcon } from '../static/images/alert.svg'

const styles = (theme => ({
  container: {
    marginBottom: 40,
    padding: 10,
    borderRadius: 6,
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.16)',
    position: 'relative'
  },
  personalWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 2
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start'
  },
  image: {
    width: 45,
    height: 65,
    marginRight: 10
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 1.5
  },
  avatar: {
    width: 26,
    height: 26,
    display: 'inline-block',
    marginRight: 10
  },
  personalInfo: {
    display: 'inline-block'
  },
  username: {
    fontWeight: 600,
    fontSize: 12,
    lineHeight: 1.5,
    color: colors.primary
  },
  date: {
    fontSize: 10,
    color: colors.gray
  },
  reviewContainer: {
    marginTop: 10,
    marginBottom: 10,
    height: 'fit-content',
    maxHeight: 100,
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1.5
  },
  buttonContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  likeIcon: {
    width: 16,
    height: 'auto',
    cursor: 'pointer'
  },
  dislikeIcon: {
    width: 16,
    height: 'auto',
    transform: 'rotate(180deg)',
    cursor: 'pointer',
    marginLeft: 10
  },
  commentButton: {
    marginLeft: '20%',
    cursor: 'pointer',
    display: 'flex',
    width: 'fit-content',
    alignItems: 'center'
  },
  commentIcon: {
    width: 22,
    height: 'auto',
  },
  numberOfComment: {
    fontWeight: 600,
    fontSize: 14,
    marginLeft: 5
  },
  nextButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
  nextText: {
    fontSize: 11,
    color: colors.primary,
    textTransform: 'none',
    fontWeight: 500,
    lineHeight: 1.5
  },
  nextArrow: {
    width: 10,
    height: 'auto',
    transform: 'rotate(180deg)',
    marginLeft: 5
  },
  moreZone: {
    position: 'absolute',
    top: 5,
    right: 5
  },
  moreButton: {
    width: 40,
    height: 40
  },
  moreZoneContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  reportButton: {
    backgroundColor: colors.darkRed,
    color: '#fff',
    textTransform: 'none',
    display: 'flex',
    alignItems: 'center',
    fontSize: 11,
    width: 80,
    height: 30
  },
  reportIcon: {
    width: 15,
    height: 15,
    marginLeft: 5
  }
}))

const ReviewItem = (props) => {
  const {
    classes, bookImage, images, id, userId,
    title, name, avatar, createdAt, rating, content, likeStatus, numberOfReplies,
    handleToggleLikeReview, likeReviewId
  } = props

  const [isShowMore, setShowMore] = React.useState(false)

  const handleToggleMore = () => {
    setShowMore(!isShowMore)
  }

  const handleClickAway = () => {
    setShowMore(false)
  }

  const onToggleLike = (likeStatus) => () => {
    handleToggleLikeReview(id, likeReviewId, likeStatus)
  }

  return (
    <div className={classes.container}>
      <div className={classes.moreZone}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={classes.moreZoneContainer}>
            <IconButton onClick={handleToggleMore} className={classes.moreButton}>
              <MoreIcon fill={colors.primary} />
            </IconButton>
            {isShowMore &&
              <Link to={`/report/review-${id}`}>
                <Button variant='contained' size='small' className={classes.reportButton}>
                  Report
                  <ReportIcon className={classes.reportIcon} fill='#fff' />
                </Button>
              </Link>
            }
          </div>
        </ClickAwayListener>
      </div>
      <div className={classes.infoContainer}>
        <Image className={classes.image} src={images[0] || bookImage} alt='feature' />
        <div className={classes.detailContainer}>
          <span className={classes.title}>{title}</span>
          <div className={classes.personalWrapper}>
            <Avatar src={avatar} className={classes.avatar} />
            <div className={classes.personalInfo}>
              <Link className={classes.username} to={`/profile/${userId}`}>{name}</Link>
              <div className={classes.date}>{getFormattedDate(createdAt, true)}</div>
            </div>
          </div>
          <Rating
            className={classes.rating}
            readOnly
            value={rating}
            precision={0.5}
            size='small'
          />
        </div>
      </div>
      <div className={classes.reviewContainer}>{content}</div>
      <div className={classes.buttonContainer}>
        {likeStatus === 1 ?
          <LikeFilledIcon fill={colors.primary} className={classes.likeIcon} onClick={onToggleLike(0)} />
          :
          <LikeNotFilledIcon fill={colors.primary} className={classes.likeIcon} onClick={onToggleLike(1)} />
        }
        {likeStatus === -1 ?
          <LikeFilledIcon fill='#D75A4A' className={classes.dislikeIcon} onClick={onToggleLike(0)} />
          :
          <LikeNotFilledIcon fill='#D75A4A' className={classes.dislikeIcon} onClick={onToggleLike(-1)} />
        }
        <Link to={`/review/${id}`}>
          <span className={classes.commentButton}>
            <CommentIcon fill={colors.primary} className={classes.commentIcon} />
            <span className={classes.numberOfComment}>{numberOfReplies}</span>
          </span>
        </Link>
        <Link to={`/review/${id}`} className={classes.nextButton}>
          <Button>
            <span className={classes.nextText}>Mở rộng</span>
            <NextArrow fill={colors.primary} className={classes.nextArrow} />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default withStyles(styles)(ReviewItem)