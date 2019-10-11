import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import colors from '../../constants/colors';

import { ReactComponent as LikeFilledIcon } from '../../static/images/like-filled.svg';
import { ReactComponent as LikeNotFilledIcon } from '../../static/images/like.svg';
import { ReactComponent as ShareIcon } from '../../static/images/share.svg';

const styles = (theme => ({
  buttonContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  flexContainer: {
    padding: '0 10px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  icon: {
    transform: 'rotate(180deg)',
    margin: '0 10px'
  },
  likeIcon: {
    zIndex: 2,
    position: 'relative',
    height: 'auto',
    width: 16
  },
  dislikeIcon: {
    position: 'relative',
    height: 'auto',
    transform: 'rotate(180deg)',
    width: 16
  },
  rateIcon: {
    position: 'relative',
    height: 'auto',
    width: 20,
    cursor: 'pointer'
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
  reactionText: {
    fontWeight: 600,
    fontSize: 14,
    marginLeft: 7
  },
  dislikeIconLeft: {
    position: 'relative',
    height: 'auto',
    transform: 'rotate(180deg)',
    width: 16,
    marginLeft: '-5px'
  }
}))

class RateSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0
    }
  }

  render() {
    const { classes, review, username, handleToggleLikeReview, isLoading } = this.props;
    const onToggleLike = (likeStatus) => () => {
      handleToggleLikeReview(review.id, review.likeReviewId, likeStatus);
    }
    return (
      <div className={classes.flexContainer}>
        {
          isLoading ?
            <>
              <div className={classes.buttonContainer}>
                <LikeFilledIcon fill={colors.primary} className={classes.likeIcon} />
                <LikeFilledIcon fill='#D75A4A' className={classes.dislikeIcon} style={{ marginLeft: '-5px' }} />
              </div>
              <div>
                <LikeNotFilledIcon fill={colors.primary} className={classes.rateIcon} />
                <LikeNotFilledIcon fill='#D75A4A' className={[classes.icon, classes.rateIcon].join(' ')} />
                <ShareIcon fill={colors.primary} className={classes.rateIcon} />
              </div>
            </>
            :
            <>
              <div className={classes.buttonContainer}>
                {
                  review && review.numberOfDislike === 0 && review.numberOfLike === 0
                    ?
                    <>Hãy là người đầu tiên like</>
                    :
                    <>
                      {
                        review && review.numberOfLike !== 0 &&
                        <LikeFilledIcon fill={colors.primary} className={classes.likeIcon} />
                      }
                      {
                        review && review.numberOfDislike !== 0 &&
                        <LikeFilledIcon fill='#D75A4A' className={review.numberOfLike === 0 ? classes.dislikeIcon : classes.dislikeIconLeft} />
                      }
                      <span className={classes.reactionText}>
                        {
                          (
                            (review && review.likeStatus === 1 && review.numberOfDislike === 0 && review.numberOfLike === 1)
                            ||
                            (review && review.likeStatus === -1 && review.numberOfDislike === 1 && review.numberOfLike === 0)
                          ) &&
                          <>{username}</>
                        }
                        {
                          (review && review.likeStatus !== 0 && (review.numberOfDislike + review.numberOfLike >= 2))
                          &&
                          `Bạn và ${review && (review.numberOfDislike + review.numberOfLike - 1)} người`
                        }
                        {
                          review && review.likeStatus === 0 &&
                          `${review && (review.numberOfDislike + review.numberOfLike)} người`
                        }
                      </span>
                    </>
                }
              </div>
              <div>
                {review && review.likeStatus === 1 ?
                  <LikeFilledIcon fill={colors.primary} className={classes.rateIcon} onClick={onToggleLike(0)} />
                  :
                  <LikeNotFilledIcon fill={colors.primary} className={classes.rateIcon} onClick={onToggleLike(1)} />
                }
                {review && review.likeStatus === -1 ?
                  <LikeFilledIcon fill='#D75A4A' className={[classes.icon, classes.rateIcon].join(' ')} onClick={onToggleLike(0)} />
                  :
                  <LikeNotFilledIcon fill='#D75A4A' className={[classes.icon, classes.rateIcon].join(' ')} onClick={onToggleLike(-1)} />
                }
                <ShareIcon fill={colors.primary} className={classes.rateIcon} />
              </div>
            </>
        }
      </div>
    );
  }
}

export default withStyles(styles)(RateSection);