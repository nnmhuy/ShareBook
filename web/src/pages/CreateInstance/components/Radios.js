import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { FormGroup, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Input } from '@material-ui/core';
import colors from '../../../constants/colors';
import InputField from '../../../components/InputField';

const styles = theme => ({
    label: {
        margin: 0
    },
    formGroup: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiInput-formControl': {
            marginTop: 0
        }
    },
    radioGroup: {
        marginTop: 10
    },
    input: {
        width: '100%'
    }
});

class Radios extends Component {

    render() {
        const { classes, name, label } = this.props;
        return (
            <FormGroup style={{ marginBottom: 15 }}>
                <FormControl component="fieldset" className={classes.formControl} style={{ fontFamily: 'Montserrat' }}>
                    <FormLabel component="legend" style={{ color: colors.primary, fontSize: 12 }}>{label}</FormLabel>
                    <RadioGroup aria-label={name} name={name} className={classes.radioGroup}>
                        <div className={classes.formGroup}>
                            <FormControlLabel value='new' control={<Radio color="primary" />} />
                            <p className={classes.label}>Còn mới tinh
                                <span style={{ fontSize: 12 }}> (sách không bị rách, không bị hư tổn, . . .)</span>
                            </p>
                        </div>
                        <div className={classes.formGroup}>
                            <FormControlLabel value='normal' control={<Radio color="primary" />} />
                            <p className={classes.label}>Đã dùng 1 vài lần</p>
                        </div>
                        <div className={classes.formGroup}>
                            <FormControlLabel value='old' control={<Radio color="primary" />} />
                            <p className={classes.label}>Đã cũ
                                <span style={{ fontSize: 12 }}> (sách bị rách, bị ố màu, hư tổn, . . .)</span>
                            </p>
                        </div>
                        <div className={classes.formGroup}>
                            <FormControlLabel value='others' control={<Radio color="primary" />} />
                            <Input
                                className={classes.input}
                                placeholder="Khác"
                                name='others'
                            />
                        </div>
                    </RadioGroup>

                </FormControl>
            </FormGroup>
        );
    }
}

export default connect()(withStyles(styles)(Radios));
