import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import colors from '../../../constants/colors';

import { ReactComponent as FacebookIcon } from '../../../static/images/facebook.svg';
import Bio from './Bio';
import PersonalInfo from './PersonalInfo';

const styles = theme => ({
	wrapper: {
		position: 'relative',
		padding: '10px 20px 25px'
	},
	flexContainer: {
		display: 'flex',
		alignItems: 'center'
	},

	downIcon: {
		position: 'absolute',
		cursor: 'pointer',
		bottom: 10,
		left: '50%',
		transform: 'translateX(-50%)',
		height: 12
	},
	editIcon: {
		position: 'absolute',
		cursor: 'pointer',
		top: 10,
		right: 15,
		height: 12,
	},
	fixButton: {
		position: 'absolute',
		cursor: 'pointer',
		margin: 0,
		top: 10,
		right: 15,
		fontFamily: 'Montserrat',
		fontSize: 12,
		fontWeight: 700,
		color: colors.primary
	}
})

class PaperWrapper extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isHidden: true,
			isEdit: false,
			fixed: false
		}
	}

	editInfo = () => {
		if (this.state.isHidden)
			this.setState({
				isEdit: true,
				isHidden: false
			})
		else
			this.setState({
				isEdit: !this.state.isEdit
			})
	}

	fixInfo = () => {
		this.editInfo();
	}

	spanInfo = () => {
		this.setState({
			isHidden: !this.state.isHidden,
			isEdit: false
		})
	}

	changeAvatar = () => { }

	render() {
		const { classes, layout } = this.props;
		const { isEdit, isHidden, fixed } = this.state;
		return (
			<Paper className={classes.wrapper}>

				{
					layout === 'bio' &&
					<Bio isHidden={isHidden} isEdit={isEdit} fixed={fixed} />
				}
				{
					layout === 'info' &&
					<PersonalInfo isHidden={isHidden} isEdit={isEdit} fixed={fixed} />
				}

				{
					isEdit &&
					<p className={classes.fixButton} onClick={this.fixInfo}>
						Sửa
									</p>
				}
				{
					!isEdit &&
					<FacebookIcon fill={colors.primary} className={classes.editIcon} onClick={this.editInfo} />
				}
				<FacebookIcon fill={colors.primary} className={classes.downIcon} onClick={this.spanInfo} />

			</Paper>
		);
	}
}

export default connect()(withStyles(styles)(PaperWrapper));