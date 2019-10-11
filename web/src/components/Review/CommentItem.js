import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Link from '../Link';
import colors from '../../constants/colors';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import getFormattedDate from '../../helper/getFormattedDate';

import Avatar from '../Avatar'
import { ReactComponent as LikeFilledIcon } from '../../static/images/like-filled.svg';
import { ReactComponent as LikeNotFilledIcon } from '../../static/images/like.svg';
import { ReactComponent as MoreIcon } from '../../static/images/more.svg'
import { ReactComponent as ReportIcon } from '../../static/images/alert.svg'

const styles = (theme => ({
  flexContainer: {
    position: 'relative',
    display: 'flex',
    margin: '15px 0'
  },
  flexOnly: {
    display: 'flex'
  },
  replyWrapper: {
    position: 'relative',
    marginLeft: 5
  },
  rateContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginRight: 5
  },
  reply: {
    marginBottom: 5,
    padding: '10px',
    borderRadius: 15,
    backgroundColor: '#F4FCFF',
    // boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.16)',
    fontSize: 14
  },
  username: {
    fontWeight: 600,
    fontSize: 14,
    color: colors.primary,
    marginRight: 5,
    textDecoration: 'none',
    cursor: 'pointer'
  },
  date: {
    fontSize: 12,
    lineHeight: 1.5,
    color: 'gray'
  },
  likeIcon: {
    zIndex: 2
  },
  dislikeIcon: {
    transform: 'rotate(180deg)'
  },
  rateIcon: {
    position: 'relative',
    height: 'auto',
    cursor: 'pointer',
    width: 16,
    marginLeft: 5
  },
  likeCount: {
    fontSize: 13,
    margin: 0,
    textAlign: 'center'
  },
  moreZoneContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'relative',
    '& .MuiIconButton-root': {
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0
    }
  },
  buttonContainer: {
    textTransform: 'none',
    display: 'flex',
    alignItems: 'center',
    fontSize: 11,
    width: 85,
    height: 'fit-content',
    position: 'absolute',
    right: 0,
    top: 20,
    zIndex: 1,
  },
  reportIcon: {
    width: 15,
    height: 15,
    marginLeft: 5
  },
  button: {
    backgroundColor: 'white',
    textTransform: 'capitalize',
    width: 85,
    transition: 'ease 0.3s',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'white',
    }
  },
  reportButton: {
    color: colors.red
  },
  userContainer: {
    borderRadius: 4,
    transition: '0.3s',
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    '&:hover': {
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
    }

  },
  userButton: {
    boxShadow: 'none',
    '&:hover': {
      color: colors.primary,
      boxShadow: 'none'
    }
  },
  moreIcon: {
    fill: 'gray',
    '&:hover': {
      fill: colors.primary,
    }
  },
  moreIconPrimary: {
    fill: colors.primary
  }
}))

const CommentItem = props => {
  const { classes, reply, userId, handleToggleLikeReply } = props;
  const onToggleLike = (likeStatus) => {
    handleToggleLikeReply(reply.id, reply.likeReplyId, likeStatus)
  }
  const [isShowMore, setShowMore] = React.useState(false)

  const handleToggleMore = () => {
    setShowMore(!isShowMore)
  }

  const handleClickAway = () => {
    setShowMore(false)
  }

  return (
    <div className={classes.flexContainer}>
      <div className={classes.rateContainer}>
        {reply && reply.likeStatus === 1 ?
          <LikeFilledIcon fill={colors.primary} className={[classes.likeIcon, classes.rateIcon].join(' ')} onClick={() => onToggleLike(0)} />
          :
          <LikeNotFilledIcon fill={colors.primary} className={[classes.likeIcon, classes.rateIcon].join(' ')} onClick={() => onToggleLike(1)} />
        }
        <p className={classes.likeCount}>{reply.numberOfLike}</p>
        {reply && reply.likeStatus === -1 ?
          <LikeFilledIcon fill='#D75A4A' className={[classes.dislikeIcon, classes.rateIcon].join(' ')} onClick={() => onToggleLike(0)} />
          :
          <LikeNotFilledIcon fill='#D75A4A' className={[classes.dislikeIcon, classes.rateIcon].join(' ')} onClick={() => onToggleLike(-1)} />
        }
        <p className={classes.likeCount}>{reply.numberOfDislike}</p>
      </div>
      <div className={classes.flexOnly}>
        <Link className={classes.username} to={`/profile/${reply && reply.userId}`}>
          <Avatar src='{reply && reply.avatar}' />
        </Link>
        <div className={classes.replyWrapper}>
          <div className={classes.reply}>
            <span>
              <Link className={classes.username} to={`/profile/${reply && reply.userId}`}>{reply && reply.name}</Link>
            </span>
            {reply && reply.content}
          </div>
          <div className={classes.date}>{getFormattedDate(reply && reply.createdAt)}</div>
        </div>
        <div className={classes.moreZone}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.moreZoneContainer}>
              <IconButton onClick={handleToggleMore} disableTouchRipple style={{ backgroundColor: 'transparent' }} className={classes.moreIcon}>
                <MoreIcon className={isShowMore ? classes.moreIconPrimary : classes.moreIcon}/>
              </IconButton>
              {
                isShowMore &&
                <div className={classes.buttonContainer}>
                  {
                    reply.userId !== userId &&
                    <Link to={`/report/reply-${reply.id}`}>
                      <Button variant='contained' size='small' className={`${classes.button} ${classes.reportButton}`}>
                        Report
												<ReportIcon className={classes.reportIcon} fill='#fff' />
                      </Button>
                    </Link>
                  }
                  {
                    reply.userId === userId &&
                    <div className={classes.userContainer}>
                      <Button variant='contained' size='small' className={`${classes.button} ${classes.userButton}`} style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                        Sửa
											</Button>
                      <Button variant='contained' size='small' className={`${classes.button} ${classes.userButton}`} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                        Xoá
											</Button>
                    </div>
                  }
                </div>
              }
            </div>
          </ClickAwayListener>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(CommentItem);