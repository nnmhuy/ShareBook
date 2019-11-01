import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import colors from '../../constants/colors';
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

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
  },
  onHoverReaction: {
    width: 40,
    height: 25,
    fontSize: 13,
    fontWeight: 500,
    background: 'white',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
    position: 'absolute',
    top: '-35px',
    display: 'flex',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    visibility: 'hidden',
    transition: '0.3s',
    // '&:after': {
    //   content: '""',
    //   position: 'absolute',
    //   boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
    //   width: 0,
    //   height: 0,
    //   borderLeft: '5px solid transparent',
    //   borderRight: '5px solid transparent',
    //   borderTop: '10px solid red'
    // }
  },
  hoverReaction: {
    '&:hover .on-hover-reaction': {
      opacity: 1,
      visibility: 'visible',
    }
  },
  modal: {
    position: 'relative',
  },
  closeButton: {
    color: colors.red,
    position: 'absolute',
    margin: 0,
    cursor: 'pointer',
    fontSize: 25,
    fontWeight: 500,
    right: 3,
    top: '-5px'
  }
}))

class RateSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      isViewing: false
    }
  }

  render() {
    const { classes, review, username, handleToggleLikeReview, isLoading } = this.props;
    const onToggleLike = (likeStatus) => () => {
      handleToggleLikeReview(review.id, review.likeReviewId, likeStatus);
    }
    const openModal = (isViewing) => {
      this.setState({
        isViewing
      })
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
                        <div className={classes.hoverReaction} style={{ position: 'relative' }} onClick={() => openModal(true)}>
                          <LikeFilledIcon fill={colors.primary} className={classes.likeIcon} style={{ cursor: 'pointer' }}/>
                          <div className={`${classes.onHoverReaction} on-hover-reaction`}>
                            {review && review.numberOfLike}
                          </div>
                        </div>
                      }
                      {
                        review && review.numberOfDislike !== 0 &&
                        <div className={classes.hoverReaction} style={{ position: 'relative' }} onClick={()=>openModal(true)}>
                          <LikeFilledIcon fill='#D75A4A' className={review.numberOfLike === 0 ? classes.dislikeIcon : classes.dislikeIconLeft} style={{ cursor: 'pointer' }}/>
                          <div className={`${classes.onHoverReaction} on-hover-reaction`}>
                            {review && review.numberOfDislike}
                          </div>
                        </div>
                      }
                      <Dialog
                        aria-labelledby="customized-dialog-title" open={this.state.isViewing} onClose={() => openModal(false)} className={classes.modal}>
                        <DialogContent style={{ padding: '15px 20px 10px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <LikeFilledIcon fill={colors.primary} className={classes.likeIcon} style={{ cursor: 'pointer' }} />
                            <p style={{ margin: '0 10px' }}>{review && review.numberOfLike}</p>
                            <LikeFilledIcon fill='#D75A4A' className={review && review.numberOfLike === 0 ? classes.dislikeIcon : classes.dislikeIconLeft} style={{ cursor: 'pointer' }}/>
                            <p style={{ margin: '0 0 0 10px' }}>{review && review.numberOfDislike}</p>
                          </div>
                          <p onClick={()=>openModal(false)} className={classes.closeButton}>
                            ×
                          </p>
                        </DialogContent>
                      </Dialog>
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