import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { bindActionCreators } from 'redux';

import TopNav from './components/TopNav';
import MainTab from './components/MainTab';
import { bindActionCreators } from 'redux';

const styles = theme => ({
	container: {
		width: '100%',
		minWidth: 350,
		maxWidth: 800,
		margin: 'auto'
	}
})

const Profile = props => {
	const { classes, account } = props;
	return (
		<TopNav title='Tài khoản' account={account}>
			<div className={classes.container}>
				<MainTab account={account}/>
			</div>
		</TopNav>
	);
}

const mapStateToProps = ({ account }) => {
	return {
		account: {
			isAuth: !!(localStorage.getItem('isAuth')),
			userId: localStorage.getItem('userId'),
			username: localStorage.getItem('username'),
			name: localStorage.getItem('name'),
			avatar: localStorage.getItem('avatar'),
			coin: Number.parseInt(localStorage.getItem('coin')),
		}
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));