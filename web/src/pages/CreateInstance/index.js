import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { withFormik } from 'formik'
import { Button } from '@material-ui/core'

import Loading from '../../components/Loading'
import TopNav from './components/TopNav';
import BookInfo from './components/BookInfo';
import InputPane from './components/InputPane'

import { getBookLite } from '../../redux/actions/bookAction'
import { createBookInstance } from '../../redux/actions/bookInstanceAction'
import colors from '../../constants/colors'

const styles = theme => ({
	container: {
		width: '100%',
		minWidth: 350,
		maxWidth: 500,
		margin: 'auto',
		boxSizing: 'border-box',
		padding: '20px'
	},
	button: {
		width: '100%',
		marginTop: 10,
		marginBottom: 20,
		background: colors.primary,
		color: '#fff'
	}
})

class CreateInstance extends Component {
	componentDidMount() {
		const { match, getBook } = this.props
		const bookId = match.params.bookId;

		getBook({bookId})
	}
	render() {
		const { 
			classes, book, isSubmitting, isLoadingBookLite,
			handleChange, values, handleSubmit, setFieldValue
		} = this.props;
		const isLoading = isSubmitting || isLoadingBookLite

		return (
			<TopNav title='Thêm sách' handleSubmit={handleSubmit}>
				<Loading isLoading={isLoading}/>
				<div className={classes.container}>
					<BookInfo book={book} />
					<InputPane 
						values={values}
						setFieldValue={setFieldValue}
						handleChange={handleChange}
					/>
					<Button 
						className={classes.button} 
						onClick={handleSubmit}
						disableFocusRipple
					>
						Đăng
					</Button>
				</div>
			</TopNav>
		)
	}
}

const CreateInstanceWithFormik = withFormik({
	mapPropsToValues: () => {
		return {
			bookCondition: 'normal',
			estimatedReadingTime: 14,
			note: ''
		}
	},

	handleSubmit: async (values, { setSubmitting, props }) => {
		const {
			isSubmitting,
			createInstance,
			match
		} = props
		const { bookCondition, estimatedReadingTime, note } = values
		const bookId = match.params.bookId

		if (isSubmitting) return

		setSubmitting(true)
		

		createInstance({
			bookCondition,
			estimatedReadingTime,
			note,
			bookId
		})

		setSubmitting(false)
	}
})(withStyles(styles)(CreateInstance))

const mapStateToProps = ({ book }) => {
	return {
		userId: localStorage.getItem('userId'),
		book: book.bookLite,
		isLoadingBookLite: book.isLoadingBookLite,
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getBook: getBookLite,
	createInstance: createBookInstance
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateInstanceWithFormik)