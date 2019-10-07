import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import colors from '../../../constants/colors';

import { FormGroup, FormControl, Input } from '@material-ui/core';

import { ReactComponent as CommentIcon } from '../../../static/images/send-arrow.svg';
import CommentItem from './CommentItem';


const styles = (theme => ({
	commentBorder: {
		margin: '0 10px 10px 10px',
		borderRadius: 15,
		border: '1px solid #b7c7d6',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0 10px 0 5px',
		'& :focus': {
			color: 'black'
		}
	},
	commentWrapper: {
		padding: '0 10px'
	},
	formGroup: {
		width: '100%'
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
		fontFamily: 'Montserrat',
		'& .MuiInput-underline:before': {
			content: 'none'
		},
		'& .MuiInput-underline:after': {
			content: 'none'
		},
		'& .MuiInputBase-input': {
			padding: '10px 0'
		},
		'& input': {
			WebkitBoxShadow: "0 0 0 1000px white inset"
		}
	},
	iconButton: {
		padding: 10,
		backgroundColor: 'transparent',
		'&.MuiIconButton-root:hover': {
			backgroundColor: 'transparent'
		}
	},
	icon: {
		width: 20,
		height: 20,
		justifyContent: 'center',
		cursor: 'pointer',
		transition: '0.3s',
		'&:hover': {
			fill: colors.primary
		}
	}
}))

const CommentList = props => {
	const { classes, values, handleChange, handleBlur, handleSubmit, createdDay } = props;
	const replies = props.replies.replies;
	
	return (
		<div>
			<div className={classes.commentBorder}>
				<FormGroup className={classes.formGroup}>
					<FormControl className={classes.input}>
						<Input
							id='reply'
							name='content'
							type='text'
							placeholder='Ghi bình luận...'
							value={values.content}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</FormControl>
				</FormGroup>
				<CommentIcon fill='#78B9FA' className={classes.icon} onClick={handleSubmit} />
			</div>
			<div className={classes.commentWrapper}>
				{
					replies && replies.map(reply => {
						return (
							<CommentItem
								reply={reply}
								key={reply.id}
								createdDay={createdDay}
							/>
						)
					})
				}
			</div>
		</div>
	);
}

export default withStyles(styles)(CommentList);