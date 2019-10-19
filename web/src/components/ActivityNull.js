import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    container: {
        display: 'flex',
        padding: '10px 20px',
        alignItems: 'center'
    },
    icon: {
        height: 35,
        marginRight: 15
    },
    text: {
        margin: 0,
        fontWeight: 500,
        fontSize: 14
    }
})

class ActivityNull extends Component {
    render() {
        const { classes, Icon, content } = this.props;
        return (
            <div>
                <Paper className={classes.container}>
                    <Icon className={classes.icon} />
                    <p className={classes.text}>{content}</p>
                </Paper>
                <br />
            </div>
        );
    }
}

export default (withStyles(styles)(ActivityNull));
