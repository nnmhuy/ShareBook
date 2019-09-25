import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { FormGroup, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import colors from '../../../constants/colors';

const styles = theme => ({
	label: {
		margin: 0,
		fontFamily: 'Montserrat',
		fontWeight: 'normal',
		fontSize: 15,
	},
	formGroup: {
		display: 'flex',
		alignItems: 'center',
		'& .MuiInput-formControl': {
				marginTop: 0
		},
		'& .Mui-checked': {
			color: colors.primary
		}
	},
	radioGroup: {
		marginTop: 10
	},
	input: {
		width: '100%'
	}
});

const bookConditionOptions = [
	{
		value: 'new',
		label: 'Còn mới tinh',
		helperText: ' (sách không bị rách, không bị hư tổn, . . .)'
	},
	{
		value: 'normal',
		label: 'Bình thường',
		helperText: ' Đã dùng 1 vài lần'
	},
	{
		value: 'old',
		label: 'Đã cũ',
		helperText: ' (sách bị rách, bị ố màu, hư tổn, . . .)'
	}
]

class Radios extends Component {
	handleChoose = (event) => {
		const { setFieldValue } = this.props
		setFieldValue('bookCondition', event.target.value)
	}

	render() {
		const { classes, name, label, value } = this.props;

		return (
			<FormGroup style={{ marginBottom: 15 }}>
				<FormControl component="fieldset" className={classes.formControl} style={{ fontFamily: 'Montserrat' }}>
					<FormLabel component="legend" style={{ color: colors.primary, fontSize: 12 }}>{label}</FormLabel>
					<RadioGroup 
						aria-label={name} 
						name={name} 
						className={classes.radioGroup}
						value={value}
						onChange={this.handleChoose}
					>
						{
							bookConditionOptions.map(option => {
								return (
									<FormControlLabel
										className={classes.formGroup}
										key={option.value}
										value={option.value} 
										control={<Radio />} 
										label={
											<p className={classes.label}>{option.label}
												<span style={{ fontSize: 12 }}>{option.helperText}</span>
											</p>
										}
									/>
								)
							})
						}
					</RadioGroup>
				</FormControl>
			</FormGroup>
		);
	}
}

export default (withStyles(styles)(Radios));
