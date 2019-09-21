import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { FormGroup, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import colors from '../constants/colors';

const styles = theme => ({

});

class RadioButtons extends Component {

    render() {
        const { classes, name, label, attrs, mb } = this.props;
        return (
            <FormGroup style={{ marginBottom: mb }}>
                <FormControl component="fieldset" className={classes.formControl} style={{ fontFamily: 'Montserrat' }}>
                    <FormLabel component="legend" style={{ color: colors.primary, fontSize: 12 }}>{label}</FormLabel>
                    <RadioGroup aria-label={name} name={name} style={{ flexDirection: 'row' }}>
                        {
                            attrs.map((item, index) => {
                                return (
                                    <FormControlLabel key={index} value={item.value} control={<Radio color="primary" />} label={item.label} />
                                )
                            })
                        }
                    </RadioGroup>
                </FormControl>
            </FormGroup>
        );
    }
}

export default connect()(withStyles(styles)(RadioButtons));
