import React from 'react';
import { withStyles } from '@material-ui/styles';

import colors from '../../../constants/colors';
import districtList from '../../../constants/district'

import FormGroupInput from '../../CreateBook/components/FormGroupInput'
import SelectField from '../../../components/SelectField'

const styles = theme => ({
	title: {
		fontWeight: 500,
		fontSize: 12,
		color: colors.primary,
		margin: 0
	},
	inputTextArea: {
		fontFamily: 'Montserrat',
		resize: 'vertical',
		boxSizing: 'border-box',
		padding: 5,
		display: 'block',
		width: '100%',
		height: 150,
		minHeight: 50,
		maxHeight: 250,
		margin: '10px 0',
		lineHeight: 1.5,
		fontSize: 14,
		border: `1px solid ${colors.gray}`,
		'&:focus': {
			borderColor: colors.primary,
			outline: 'none'
		},
		'&:hover': {
			borderColor: colors.primary,
			outline: 'none'
		}
	},
	hidden: {
		visibility: 'hidden'
	},
	select: {
		width: '100%'
	},
	selectContainer: {
		width: '100%',
		maxWidth: 300,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
})

const cityOptions = [
	{ value: 'Hồ Chí Minh', label: 'Hồ Chí Minh' }
]

const districtOptions = districtList.slice(1, districtList.length - 1)

const InputUserPanel = (props) => {
	const { classes, errors, handleChange, handleBlur, values, touched, isEdit } = props;
	return (
		<form>
			<FormGroupInput
				id='name'
				name='name'
				type='text'
				disabled={!isEdit}
				required
				error={errors.name}
				value={values.name}
				handleChange={handleChange}
				handleBlur={handleBlur}
				touched={touched.name}
				label='Tên hiển thị'
			/>
			<FormGroupInput
				id='phoneNumber'
				name='phoneNumber'
				type='text'
				disabled={!isEdit}
				// required
				error={errors.phoneNumber}
				value={values.phoneNumber}
				handleChange={handleChange}
				handleBlur={handleBlur}
				touched={touched.phoneNumber}
				label='Số điện thoại'
			/>
			<FormGroupInput
				id='email'
				name='email'
				type='text'
				disabled={!isEdit}
				// required
				error={errors.email}
				value={values.email}
				handleChange={handleChange}
				handleBlur={handleBlur}
				touched={touched.email}
				label='Email'
			/>
			<FormGroupInput
				id='fbLink'
				name='fbLink'
				type='text'
				disabled={!isEdit}
				// required
				error={errors.fbLink}
				value={values.fbLink}
				handleChange={handleChange}
				handleBlur={handleBlur}
				touched={touched.fbLink}
				label='Facebook Link'
			/>
			<FormGroupInput
				type='text'
				id='address'
				label='Địa chỉ'
				name='address'
				disabled={!isEdit}
				value={values.address}
				touched={touched.address}
				placeholder='Số nhà, tên đường, tên phường'
				error={errors.address}
				handleChange={handleChange}
				handleBlur={handleBlur}
			/>
			<div className={classes.selectContainer}>
				<SelectField
					id='district'
					label='Quận'
					name='district'
					disabled={!isEdit}
					value={values.district}
					touched={touched.district}
					error={errors.district}
					optionValues={districtOptions}
					handleChange={handleChange}
				/>
				<SelectField
					id='city'
					label='Thành phố'
					name='city'
					disabled={!isEdit}
					value={values.city}
					touched={touched.city}
					error={errors.city}
					optionValues={cityOptions}
					handleChange={handleChange}
				/>
			</div>
		</form>
	);
}

export default (withStyles(styles)(InputUserPanel));