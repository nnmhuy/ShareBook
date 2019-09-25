import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import colors from '../../../constants/colors';

import { ReactComponent as PencilIcon } from '../../../static/images/create-new-pencil-button.svg';
import { ReactComponent as DownArrowIcon } from '../../../static/images/down-arrow.svg';
import Bio from './Bio';
import PersonalInfo from './PersonalInfo';

const styles = theme => ({
	wrapper: {
		position: 'relative',
		padding: '10px 20px 30px'
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
		height: 13
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
	},
	rotateIcon: {
		transform: 'translateX(-50%) scale(-1, -1)'
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
				<PencilIcon fill={colors.primary} className={classes.editIcon} onClick={this.editInfo} />
				<DownArrowIcon fill={colors.primary}
					className={isHidden ? classes.downIcon : `${classes.rotateIcon} ${classes.downIcon}`}
					onClick={this.spanInfo} />
			</Paper>
		);
	}
}

<<<<<<< HEAD
export default withStyles(styles)(PaperWrapper);
=======
export default (withStyles(styles)(PaperWrapper));
>>>>>>> 1bbf5c5d4d3b9cd8567a651cb48f38a4e6ac57c1
