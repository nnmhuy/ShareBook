import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { demoReview } from '../demoData';

import { Avatar, Button, IconButton } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import Link from '../../../components/Link';

import colors from '../../../constants/colors';
import { ReactComponent as MoreIcon } from '../../../static/images/more.svg';
import { ReactComponent as ReportIcon } from '../../../static/images/alert.svg';

const styles = (theme => ({
    flexContainer: {
        boxSizing: 'border-box',
        padding: '0 20px',
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
    moreButton: {
        width: 40,
        height: 40
    },
    moreZoneContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        position: 'relative'
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
        right: 15,
        zIndex: 1
    },
    reportIcon: {
        width: 15,
        height: 15,
        marginLeft: 5
    }
}))

class PersonalInfo extends Component {
    render() {
        const { classes } = this.props;
        const { userId, name, avatar, createdAt, rating } = demoReview;

        return (
            <div className={classes.flexContainer}>
                <div className={classes.personalWrapper}>
                    <Avatar src={avatar} className={classes.avatar} />
                    <div className={classes.personalInfo}>
                        <div style={{ display: 'flex' }}>
                            <Link className={classes.username} to={`/profile/${userId}`}>{name}</Link>
                            <Rating
                                className={classes.rating}
                                readOnly
                                value={rating}
                                precision={0.5}
                                size='small'
                            />
                        </div>
                        <div className={classes.bookName}>Animal farm</div>
                        <div className={classes.date}>{createdAt}</div>
                    </div>
                </div>
                <div className={classes.moreZone}>
                    <div >
                        <div className={classes.moreZoneContainer}>
                            <IconButton className={classes.moreButton}>
                                <MoreIcon fill={colors.primary} />
                            </IconButton>
                            <Link to={`/report`}>
                                <Button variant='contained' size='small' className={classes.reportButton}>
                                    Report
                                          <ReportIcon className={classes.reportIcon} fill='#fff' />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PersonalInfo);