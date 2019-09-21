import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { demoReview } from '../demoData';
import colors from '../../../constants/colors';

import { ReactComponent as LikeFilledIcon } from '../../../static/images/like-filled.svg';
import { ReactComponent as LikeNotFilledIcon } from '../../../static/images/like.svg';
import { ReactComponent as ShareIcon } from '../../../static/images/share.svg';

const styles = (theme => ({
    buttonContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    flexContainer: {
        padding: '0 15px',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    icon: {
        transform: 'rotate(180deg)',
        margin: '0 10px'
    },
    likeIcon: {
        zIndex: 2
    },
    dislikeIcon: {
        position: 'relative',
        height: 'auto',
        cursor: 'pointer',
        transform: 'rotate(180deg)',
        marginLeft: '-5px',
        marginRight: 7,
        width: 16
    },
    rateIcon: {
        position: 'relative',
        height: 'auto',
        cursor: 'pointer',
        width: 20
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
        fontSize: 14
    }
}))

class RateSection extends Component {
    render() {
        const { classes } = this.props;
        const { likeStatus, number_of_like } = demoReview
        return (
            <div className={classes.flexContainer}>
                <div className={classes.buttonContainer}>
                    <LikeFilledIcon fill={colors.primary} className={[classes.likeIcon, classes.rateIcon].join(' ')} />
                    <LikeFilledIcon fill='#D75A4A' className={classes.dislikeIcon} />
                    <span className={classes.reactionText}>
                        {likeStatus === 1 ?
                            `Bạn và ${number_of_like} người khác like`
                            :
                            `${number_of_like} người like`
                        }
                    </span>
                </div>
                <div>
                    {likeStatus === 1 ?
                        <LikeFilledIcon fill={colors.primary} className={classes.rateIcon} />
                        :
                        <LikeNotFilledIcon fill={colors.primary} className={classes.rateIcon} />
                    }
                    {likeStatus === 2 ?
                        <LikeFilledIcon fill='#D75A4A' className={[classes.icon, classes.rateIcon].join(' ')} />
                        :
                        <LikeNotFilledIcon fill='#D75A4A' className={[classes.icon, classes.rateIcon].join(' ')} />
                    }



                    <ShareIcon fill={colors.primary} className={classes.rateIcon} />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(RateSection);