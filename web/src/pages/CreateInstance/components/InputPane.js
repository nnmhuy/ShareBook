import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import colors from '../../../constants/colors';
import Radios from './Radios';
import { FormGroup, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';

const styles = theme => ({
    h4: {
        fontWeight: 500,
        textAlign: 'center'
    },
    formGroup: {
        '&.MuiFormGroup-root': {
            width: '100%'
        }
    },
    input: {
        fontFamily: 'Montserrat',
        marginBottom: 15,
        '&:hover': {
            borderColor: colors.primary,
            outline: 'none'
        },
        '& .MuiFormHelperText-root': {
            color: 'red'
        },
        '& .MuiInputLabel-formControl': {
            transform: 'translate(0, 1.5px) scale(0.75)',
            color: colors.primary
        },
        '&:hover .MuiInput-underline:before': {
            borderBottom: `1px solid ${colors.primary}`
        },
        '& .MuiInput-underline:after': {
            borderBottom: `2px solid ${colors.primary}`
        }
    },
})

class InputPane extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <h4 className={classes.h4}>Thông tin cần điền</h4>
                <Radios label='Tình trạng sách' name='condition' />
                <FormGroup className={classes.formGroup}>
                    <FormControl className={classes.input}>
                        <InputLabel htmlFor='#money'>Tiền đặt cọc</InputLabel>
                        <Input
                            id='money'
                            name='price'
                            value='30000'
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup className={classes.formGroup}>
                    <FormControl className={classes.input}>
                        <InputLabel htmlFor='#time'>Thời gian trả sách</InputLabel>
                        <Input
                            id='time'
                            name='duration'
                            value='1'
                        />
                    </FormControl>
                </FormGroup>
            </div>
        );
    }
}

export default connect()(withStyles(styles)(InputPane));