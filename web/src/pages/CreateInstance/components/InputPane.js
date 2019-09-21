import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import colors from '../../../constants/colors';
import Radios from './Radios';

const styles = theme => ({
    h4: {
        fontWeight: 500,
        textAlign: 'center'
    }
})

class InputPane extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <h4 className={classes.h4}>Thông tin cần điền</h4>
                <Radios label='Tình trạng sách' name='condition' />
            </div>
        );
    }
}

export default connect()(withStyles(styles)(InputPane));