import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import colors from '../../../constants/colors';

import { InputBase } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import { ReactComponent as CommentIcon } from '../../../static/images/send-arrow.svg';
import CommentItem from './CommentItem';


const styles = (theme => ({
    commentBorder: {
        margin: '0 20px',
        borderRadius: 15,
        border: '1px solid #b7c7d6',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 10px 0 5px',
        '& :focus': {
            color: 'black'
        }
    },
    commentWrapper: {
        padding: '0 20px'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        fontFamily: 'Montserrat',
    },
    iconButton: {
        padding: 10,
        backgroundColor: 'transparent'
    },
    icon: {
        width: 20,
        height: 20
    }
}))

class CommentList extends Component {
    render() {
        const { classes, commentList } = this.props;

        const handleReturn = () => {
            window.history.back();
        }

        const handleChange = (event, value) => {

        }
        const handleComment = (event, value) => {

        }
        return (
            <div>
                <div className={classes.commentBorder}>
                    <InputBase
                        className={classes.input}
                        placeholder='Ghi bình luận...'
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <IconButton disableRipple className={classes.iconButton} aria-label="search" onClick={handleComment}>
                        <CommentIcon fill={colors.primary} className={classes.icon} />
                    </IconButton>
                </div>
                <div className={classes.commentWrapper}>
                    {
                        commentList.map(comment => {
                            return (
                                <CommentItem
                                    {...comment}
                                    key={comment.id}
                                />
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CommentList);