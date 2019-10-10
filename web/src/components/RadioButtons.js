import React from 'react';
import { withStyles } from '@material-ui/styles';
import { FormGroup, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import colors from '../constants/colors';

const styles = theme => ({
	formGroup: {
		'& .MuiInput-formControl': {
			marginTop: 0
		},
		'& .Mui-checked': {
			color: colors.primary
		}
	}
});

const RadioButtons = (props) => {
	const { classes, name, label, attrs, mb, value, setFieldValue, currentValue} = props

	const handleChange = (event) => {
		setFieldValue('bookType', event.target.value)
	}

	return (
		<FormGroup style={{ marginBottom: mb }} className={classes.formGroup}>
			<FormControl component="fieldset" className={classes.formControl} style={{ fontFamily: 'Montserrat' }}>
				<FormLabel component="legend" style={{ color: colors.primary, fontSize: 12 }}>{label}</FormLabel>
				<RadioGroup aria-label={name} name={name} style={{ flexDirection: 'row' }} value={value} onChange={handleChange}>
					{
						attrs.map((item, index) => {
							if (item.value === currentValue) {
								return (
									<FormControlLabel checked key={index} value={item.value} control={<Radio color="primary" />} label={item.label} />
								)
							}
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

export default (withStyles(styles)(RadioButtons));
