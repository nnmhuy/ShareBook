import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import colors from '../../../constants/colors';
import Paper from '@material-ui/core/Paper';
import { Link } from '@material-ui/core';

const styles = theme => ({
    wrapper: {
        position: 'relative',
        padding: '10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        margin: 0,
        color: colors.primary,
        fontSize: 12,
        fontWeight: 500,
        cursor: 'pointer',
        '&.MuiLink-underlineHover:hover': {
            textDecoration: 'none'
        }
    },
    content: {
        margin: 0,
        color: 'black',
        marginLeft: 15
    },
})

class Follower extends Component {
    render() {
        const { classes } = this.props
        return (
            <Paper className={classes.wrapper}>
                <Link className={classes.title}>Người theo dõi<span className={classes.content}>200</span></Link>
                <Link className={classes.title}>Đang theo dõi<span className={classes.content}>240</span></Link>
            </Paper>
        );
    }
}

export default (withStyles(styles)(Follower));