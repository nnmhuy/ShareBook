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
		padding: '10px 20px 30px',
		'&.MuiPaper-elevation1': {
			boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.15)'
		}
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
		const { classes, layout, profileId, currentUserInfo } = this.props;
		const { isEdit, isHidden, fixed } = this.state;
		return (
			<Paper className={classes.wrapper}>
				{
					layout === 'bio' &&
					<Bio profileId={profileId} currentUserInfo={currentUserInfo}
					isHidden={profileId === 'me' ? isHidden : false} isEdit={profileId === 'me' ? isEdit : false} fixed={profileId === 'me' ? fixed : false} />
				}
				{
					layout === 'info' &&
					<PersonalInfo profileId={profileId} currentUserInfo={currentUserInfo} isHidden={profileId === 'me' ? isHidden : false}
					isEdit={profileId === 'me' ? isEdit : false} fixed={profileId === 'me' ? fixed : false} editInfo={this.editInfo} />
				}
				{
					profileId === 'me' &&
					<>
						<PencilIcon fill={colors.primary} className={classes.editIcon} onClick={this.editInfo} />
						<DownArrowIcon fill={colors.primary}
							className={isHidden ? classes.downIcon : `${classes.rotateIcon} ${classes.downIcon}`}
							onClick={this.spanInfo} />
					</>
				}
			</Paper>
		);
	}
}

export default (withStyles(styles)(PaperWrapper));
