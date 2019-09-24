import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const styles = theme => ({
    writeReview: {
        fontFamily: 'Montserrat',
        width: '100%',
        borderRadius: 3,
        background: 'linear-gradient(to top, #0076ff 0%, #04abe8 100%)',
        textTransform: 'uppercase',
        color: 'white',
        fontWeight: 600,
        marginBottom: 10
    }
})

class ReviewTab extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button className={classes.writeReview} >
                    ghi review mới
                </Button>
                <br />
                com2. copy component bên bookdetail
                <br />
                => direct qua component bookreview
            </div>
        );
    }
}

export default connect()(withStyles(styles)(ReviewTab));