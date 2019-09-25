import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import colors from '../../../constants/colors';

const styles = theme => ({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: 'fit-content'
	},
	button: {
		width: 55,
		height: 55,
		borderRadius: 4,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	icon: {
		height: 25
	},
	title: {
		textTransform: 'capitalize',
		fontFamily: 'Montserrat',
		fontWeight: 600,
		fontSize: 13,
		marginTop: 5
	}
})

class ActivityButton extends Component {
	render() {
		const { classes, Icon, title, bg, txtColor } = this.props;
		let textColor = '#9F9F9F';
		if (txtColor) textColor = colors.primary;

		return (
			<div className={classes.wrapper}>
				<div className={classes.button} style={{ background: bg }} waves='light' >
					<Icon className={classes.icon} />
				</div>
				<p className={classes.title} style={{ color: textColor }}>
					{title}
				</p>
			</div>
		);
	}
}

export default (withStyles(styles)(ActivityButton));