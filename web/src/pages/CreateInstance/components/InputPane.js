import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import colors from '../../../constants/colors';
import { FormGroup, FormControl, InputLabel, Input } from '@material-ui/core'

import Radios from './Radios'
import TextArea from '../../../components/TextArea'

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
		const { classes, values, handleChange, setFieldValue } = this.props;
		return (
			<div>
				<h4 className={classes.h4}>Thông tin cần điền</h4>
				<Radios label='Tình trạng sách' name='bookCondition' value={values.bookCondition} setFieldValue={setFieldValue}/>
				<FormGroup className={classes.formGroup}>
					<FormControl className={classes.input}>
						<InputLabel htmlFor='#time'>Thời gian trả sách</InputLabel>
						<Input
								id='estimatedReadingTime'
								type='number'
								name='estimatedReadingTime'
								value={values.estimatedReadingTime}
								onChange={handleChange}
						/>
					</FormControl>
				</FormGroup>
				<TextArea
					id='note'
					name='note'
					label={'Ghi chú'}
					value={values.note}
					handleChange={handleChange}
					maxLength={200}
				/>
			</div>
		);
	}
}

export default (withStyles(styles)(InputPane));