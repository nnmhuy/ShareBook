import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'
import { Avatar, Button, IconButton, ClickAwayListener } from '@material-ui/core'

import Link from '../../../components/Link'

import colors from '../../../constants/colors'
import { ReactComponent as LikeNotFilledIcon } from '../../../static/images/like.svg'
import { ReactComponent as LikeFilledIcon } from '../../../static/images/like-filled.svg'
import { ReactComponent as CommentIcon } from '../../../static/images/transactions.svg'
import { ReactComponent as NextArrow } from '../../../static/images/back-arrow.svg'
import { ReactComponent as MoreIcon } from '../../../static/images/more.svg'
import { ReactComponent as ReportIcon } from '../../../static/images/alert.svg'

const styles = (theme => ({
  container: {
    marginBottom: 40,
    padding: 20,
    borderRadius: 6,
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.16)',
    position: 'relative'
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start'
  },
  image: {
    width: 60,
    height: 80,
    marginRight: 20
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 1.5
  },
  avatar: {
    width: 30,
    height: 30,
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
    lineHeight: 1.5,
    color: colors.gray
  },
  reviewContainer: {
    marginTop: 10,
    marginBottom: 10,
    height: 110,
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 2,
  },
  buttonContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  likeIcon: {
    width: 20,
    height: 'auto',
    cursor: 'pointer'
  },
  dislikeIcon: {
    width: 20,
    height: 'auto',
    transform: 'rotate(180deg)',
    cursor: 'pointer',
    marginLeft: 20
  },
  commentButton: {
    marginLeft: '20%',
    cursor: 'pointer',
    display: 'flex',
    width: 'fit-content',
    alignItems: 'center'
  },
  commentIcon: {
    width: 20,
    height: 'auto',
  },
  numberOfComment: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 2,
    marginLeft: 5
  },
  nextButton: {
    position: 'absolute',
    right: 20,
    top: 0,
    bottom: 0,
  },
  nextText: {
    fontSize: 11,
    color: colors.primary,
    textTransform: 'none'
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
    backgroundColor: colors.red,
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
    classes, bookImage, images, reviewId, userId,
    title, username, avatar, createdAt, rating, review, likeStatus, number_of_comment
  } = props

  const [isShowMore, setShowMore] = React.useState(false)

  const handleToggleMore = () => {
    setShowMore(!isShowMore)
  }

  const handleClickAway = () => {
    setShowMore(false)
  }

  return (
    <div className={classes.container}>
      <div className={classes.moreZone}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={classes.moreZoneContainer}>
            <IconButton onClick={handleToggleMore} className={classes.moreButton}>
              <MoreIcon fill={colors.primary}/>
            </IconButton>
            {isShowMore &&
              <Link to={`/report`}>
                <Button variant='contained' size='small' className={classes.reportButton}>
                  Report
                  <ReportIcon className={classes.reportIcon} fill='#fff'/>
                </Button>
              </Link>
            }
          </div>
        </ClickAwayListener>
      </div>
      <div className={classes.infoContainer}>
        <img className={classes.image} src={images[0] || bookImage} alt='feature'/>
        <div className={classes.detailContainer}>
          <span className={classes.title}>{title}</span>
          <div className={classes.personalWrapper}>
            <Avatar src={avatar} className={classes.avatar}/>
            <div className={classes.personalInfo}>
              <Link className={classes.username} to={`/profile/${userId}`}>{username}</Link>
              <div className={classes.date}>{createdAt}</div>
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
      </div>
      <div className={classes.reviewContainer}>{review}</div>
      <div className={classes.buttonContainer}>
        {likeStatus===1 ?
          <LikeFilledIcon fill={colors.primary} className={classes.likeIcon}/>
          :
          <LikeNotFilledIcon fill={colors.primary} className={classes.likeIcon} />
        }
        {likeStatus === 2 ?
          <LikeFilledIcon fill='#D75A4A' className={classes.dislikeIcon} />
          :
          <LikeNotFilledIcon fill='#D75A4A' className={classes.dislikeIcon} />
        }
        <span className={classes.commentButton}>
          <CommentIcon fill={colors.primary} className={classes.commentIcon}/>
          <span className={classes.numberOfComment}>{number_of_comment}</span>
        </span>
        <Link to={`/review/${reviewId}`} className={classes.nextButton}>
          <Button>
            <span className={classes.nextText}>Mở rộng</span>
            <NextArrow fill={colors.primary} className={classes.nextArrow}/>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default withStyles(styles)(ReviewItem)