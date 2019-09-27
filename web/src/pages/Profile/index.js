import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';

import TopNav from './components/TopNav';
import MainTab from './components/MainTab';

const styles = theme => ({
	container: {
		width: '100%',
		minWidth: 350,
		maxWidth: 800,
		margin: 'auto'
	}
})

const Profile = props => {
	const { classes } = props;
	return (
		<TopNav>
			<div className={classes.container}>
				<MainTab />
			</div>
		</TopNav>
	);
}

export default connect()(withStyles(styles)(Profile));