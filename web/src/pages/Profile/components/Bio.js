import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import Button from '@material-ui/core/Button';

import colors from '../../../constants/colors';

import { editUserInfo } from '../../../redux/actions/accountAction'

const styles = theme => ({
	wrapper: {
		position: 'relative',
		padding: '10px 20px'
	},
	flexContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	avatar: {
		width: 65,
		height: 65,
		marginRight: 15,
		cursor: 'pointer'
	},
	pointer: {
		cursor: 'pointer'
	},
	title: {
		margin: 0,
		marginBottom: 5,
		color: colors.primary,
		fontSize: 12,
		fontWeight: 500,
		visibility: 'visible'
	},
	titleHidden: {
		visibility: 'hidden'
	},
	titleNoMargin: {
		margin: 0,
		color: colors.primary,
		fontSize: 12,
		fontWeight: 500
	},
	content: {
		margin: 0,
		visibility: 'visible',
		height: '100%',
		opacity: 1,
		transition: 'visibility 0s, opacity 0.4s linear'
	},
	contentHidden: {
		margin: 0,
		visibility: 'hidden',
		height: 0,
		opacity: 0,
		transition: '0s'
	},
	counter: {
		margin: 0,
		textAlign: 'right',
		fontSize: 12
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
	button: {
		fontFamily: 'Montserrat',
		fontWeight: 600,
		fontSize: 13,
		color: 'white',
		background: 'linear-gradient(to left, #0076ff 0%, #04abe8 100%)',
		margin: 'auto',
		display: 'block',
		padding: 4,
		marginBottom: 30
	}
})

class Bio extends Component {
	render() {
		const { classes, isHidden, isEdit } = this.props;
		const { errors, touched, values, handleChange, handleBlur, handleSubmit} = this.props;
		let count = 0
		if (values.bio)
			count = values.bio.length
		return (
			<>
				<p className={classes.title}>Bio</p>
				{
					!isEdit &&
					<div className={`${isHidden ? `${classes.contentHidden}` : `${classes.content}`}`}>
						{values.bio}
					</div>
				}
				{
					isEdit &&
					<form onSubmit={handleSubmit}>
					<div className={`${isHidden ? `${classes.contentHidden}` : `${classes.content}`}`}>
						<textarea
							className={classes.inputTextArea}
							onChange={handleChange}
        			onBlur={handleBlur}
							placeholder='Giới thiệu . . .'
							name='bio'
							value={values.bio}
							maxLength='300'
							type='text'
						/>
						{errors.name && touched.name && <div id="feedback">{errors.name}</div>}
						{/* {value !== '' ? value.split(' ').length : 0} */}
						<p className={classes.counter}>{count}/300</p>
						<Button className={classes.button} type="submit">Sửa</Button>
					</div>
					</form>
				}
			</>
		);
	}
}

const editUserWithFormik = withFormik({
	enableReinitialize: true,
	mapPropsToValues: (props) => {
		let { currentUserInfo } = props
		return {
			bio: currentUserInfo.bio
		}
	},

	validate: values => {
    const errors = {};

    if (values.bio && values.bio.length > 300) {
      errors.bio = '300 kí tự thôi nha bạn';
    }

    return errors;
  },

	handleSubmit: async (values, { setSubmitting, props }) => {
		const {
			isSubmitting,
			editUserInfoHandler,
			userId
		} = props

		if (isSubmitting) return

		setSubmitting(true)
		let data = {
			userId,
			bio: values.bio
		}
		editUserInfoHandler(data)
		setSubmitting(false)
	}
})(withStyles(styles)(Bio))

const mapStateToProps = ({ account }) => {
	return {
		userId: localStorage.getItem('userId'),
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	editUserInfoHandler: editUserInfo
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(editUserWithFormik)
