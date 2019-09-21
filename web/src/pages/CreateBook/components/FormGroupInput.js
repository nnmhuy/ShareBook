import React, { Component } from 'react';
import { connect } from 'react-redux';

import colors from '../../../constants/colors';
import { withStyles } from '@material-ui/styles';
import { FormControl, InputLabel, Input, FormGroup, FormHelperText } from '@material-ui/core';

const styles = theme => ({
    formGroup: {
        '&.MuiFormGroup-root': {
            width: '100%'
        }
    },
    input: {
        fontFamily: 'Montserrat',
        marginBottom: 15,
        '& .MuiInputLabel-formControl': {
            transform: 'translate(0, 1.5px) scale(0.75)',
        },
    },
    inputAble: {
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
    }
})

class FormGroupInput extends Component {
    render() {
        const { classes, id, name, type, error, label, disabled } = this.props
        return (
            <FormGroup className={classes.formGroup}>
                <FormControl className={!disabled ? classes.inputAble : classes.input}>
                    <InputLabel htmlFor={id}>{label}</InputLabel>
                    <Input
                        id={id}
                        name={name}
                        type={type}
                        disabled={disabled}
                    />
                    <FormHelperText className={classes.hidden}>
                        {error}
                    </FormHelperText>
                </FormControl>
            </FormGroup>
        );
    }
}

export default connect()(withStyles(styles)(FormGroupInput));