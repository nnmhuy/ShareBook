import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Link from './Link'
import colors from '../constants/colors';

const styles = theme => ({
	container: {
		display: 'flex',
		padding: '10px 20px',
		alignItems: 'center',
		'&.MuiPaper-elevation1': {
			boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.15)'
		}
	},
	icon: {
		height: 35,
		marginRight: 15
	},
	text: {
		margin: 0,
		fontWeight: 500,
		fontSize: 14
	}
})

class ActivityNull extends Component {
	render() {
		const { classes, Icon, content, isReport } = this.props;
		return (
			<div>
				<Paper className={classes.container}>
					<Icon className={classes.icon} />
					{
						isReport ?
							<p className={classes.text}>
								Nếu bạn gặp vấn đề gì cần giải đáp thì có thể click vào <Link to='/report' style={{color: colors.primary}}>đây</Link> để nêu thắc mắc của bạn với ShareBook nhé!
							</p>
							:
							<p className={classes.text}>{content}</p>
					}
					
				</Paper>
				<br />
			</div>
		);
	}
}

export default (withStyles(styles)(ActivityNull));
