import React from 'react';
import { withStyles } from '@material-ui/styles';
import colors from '../../../constants/colors';

import FormGroupInput from '../../CreateBook/components/FormGroupInput';
import RadioButtons from '../../../components/RadioButtons';
import SelectField from '../../../components/SelectField';

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
	}
})

const typeOfBook = [
	{ value: 'single', label: 'Sách lẻ' },
	{ value: 'multiple', label: 'Sách bộ' }
]

const InputUserPanel = (props) => {
	const { classes, errors, handleChange, handleBlur, values, setFieldValue, categoryList, touched } = props;
	const categoryOptions = categoryList.map(category => ({
		label: category.name,
		value: category.id
	}))

	return (
		<form>
			<FormGroupInput
				id='name'
				name='name'
				type='text'
				required
				error={errors.name}
				value={values.name}
				handleChange={handleChange}
				handleBlur={handleBlur}
				touched={touched.name}
				label='Tên sách'
			/>
			<FormGroupInput
				id='author'
				name='author'
				type='text'
				required
				error={errors.author}
				value={values.author}
				handleChange={handleChange}
				handleBlur={handleBlur}
				touched={touched.author}
				label='Tác giả'
			/>
			<SelectField
				id='category'
				label='Thể loại'
				name='categoryId'
				value={values.categoryId}
				optionValues={categoryOptions}
				handleChange={handleChange}
				handleBlur={handleBlur}
				error={errors.categoryId}
				touched={touched.categoryId}
				className={classes.select}
			/>
			<RadioButtons mb='15px' name="type" currentValue={values.bookType} label="Loại sách" attrs={typeOfBook} setFieldValue={setFieldValue} />
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<FormGroupInput
					id='volume'
					label='Volume'
					name='volume'
					type='number'
					value={values.volume}
					handleChange={handleChange}
					handleBlur={handleBlur}
					disabled={values.bookType !== 'multiple'}
				/>
				<div style={{ margin: '0 10px' }} />
				<FormGroupInput
					id='numberOfPages'
					label='Số trang'
					name='numberOfPages'
					type='number'
					value={values.numberOfPages}
					handleChange={handleChange}
					handleBlur={handleBlur}
				/>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<FormGroupInput
					id='publisher'
					label='Nhà xuất bản'
					name='publisher'
					type='text'
					value={values.publisher}
					handleChange={handleChange}
					handleBlur={handleBlur}
				/>
				<div style={{ margin: '0 10px' }} />
				<FormGroupInput
					id='publishYear'
					label='Năm xuất bản'
					name='publishYear'
					type='number'
					value={values.publishYear}
					handleChange={handleChange}
					handleBlur={handleBlur}
				/>
			</div>
			<FormGroupInput
				id='price'
				label='Giá thị trường'
				name='price'
				type='number'
				value={values.price}
				handleChange={handleChange}
				handleBlur={handleBlur}
			/>
			<label className={classes.title}>
				Giới thiệu sách
						<textarea
					className={classes.inputTextArea}
					placeholder='Sách kể về . . .'
					name='description'
					value={values.description}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</label>
		</form>
	);
}

export default (withStyles(styles)(InputUserPanel));