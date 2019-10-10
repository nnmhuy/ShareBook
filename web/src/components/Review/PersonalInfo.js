import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import getFormattedDate from '../../helper/getFormattedDate';

import { Rating } from '@material-ui/lab';

import colors from '../../constants/colors';
import { ReactComponent as MoreIcon } from '../../static/images/more.svg';
import { ReactComponent as ReportIcon } from '../../static/images/alert.svg';
import Link from '../Link';
import Avatar from '../Avatar';

const styles = (theme => ({
  flexContainer: {
    boxSizing: 'border-box',
    padding: '0 10px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  avatar: {
    width: 45,
    height: 45,
    display: 'inline-block',
    marginRight: 10
  },
  personalInfo: {
    display: 'inline-block'
  },
  username: {
    fontWeight: 600,
    fontSize: 16,
    color: '#1c73c6',
    marginRight: 10
  },
  date: {
    fontSize: 10,
    lineHeight: 1.5,
    color: 'gray'
  },
  personalWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  bookName: {
    fontWeight: 'normal',
    fontSize: 12,
    color: '#1c73c6'
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
  reportButton: {
    backgroundColor: colors.red,
    color: '#fff',
    textTransform: 'none',
    display: 'flex',
    alignItems: 'center',
    fontSize: 11,
    width: 80,
    height: 30,
    position: 'absolute',
    right: 0,
    top: 20,
    zIndex: 1,
    '&.MuiButton-root:hover': {
      backgroundColor: colors.red
    }
  },
  reportIcon: {
    width: 15,
    height: 15,
    marginLeft: 5
  }
}))

const PersonalInfo = props => {
  const { classes, review, userId } = props;
  const [isShowMore, setShowMore] = React.useState(false)
  const handleToggleMore = () => {
    setShowMore(!isShowMore)
  }

  const handleClickAway = () => {
    setShowMore(false)
  }

  return (
    <div className={classes.flexContainer}>
      <div className={classes.personalWrapper}>
        <Avatar src={review && review.avatar} className={classes.avatar} />
        <div className={classes.personalInfo}>
          <div style={{ display: 'flex' }}>
            <Link className={classes.username} to={`/profile/${review && review.userId}`}>{review && review.name}</Link>
            <Rating
              className={classes.rating}
              readOnly
              value={review && review.rating}
              precision={0.5}
              size='small'
            />
          </div>
          <div className={classes.bookName}>{review && review.bookName}</div>
          <div className={classes.date}>{review && review.createdAt && getFormattedDate(review.createdAt)}</div>
        </div>
      </div>
      <div className={classes.moreZone}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={classes.moreZoneContainer}>
            {
              (review && review.userId) !== userId && 
              <IconButton onClick={handleToggleMore} disableTouchRipple style={{ backgroundColor: 'transparent' }} className={classes.moreButton}>
                <MoreIcon fill={colors.primary} />
              </IconButton>
            }
            {
              isShowMore &&
              <Link to={`/report/review-${review && review.id}`}>
                <Button variant='contained' size='small' className={classes.reportButton}>
                  Report
											<ReportIcon className={classes.reportIcon} fill='#fff' />
                </Button>
              </Link>
            }
          </div>
        </ClickAwayListener>
      </div>
    </div>
  );
}

export default withStyles(styles)(PersonalInfo);