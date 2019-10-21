import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import PaperWrapper from './PaperWrapper';
import CoinInfo from './CoinInfo';
import ActivityWrapper from './ActivityWrapper';
import colors from '../../../constants/colors';



const styles = theme => ({
	wrapper: {
		position: 'relative',
		padding: '10px 0',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	title: {
		margin: 0,
		color: colors.primary,
		fontSize: 12,
		fontWeight: 500,
		cursor: 'pointer',
		textDecoration: 'none'
	},
	content: {
		margin: 0,
		color: 'black',
		marginLeft: 15
	}
})

const AccountTab = (props) => {
	const { classes, handleToggleBookmark, account, isLoadingBookmarkedLite, bookmarked, profileId } = props;
	return (
		<div>
			<PaperWrapper layout='info' account={account} profileId={profileId} />
			<br />
			<PaperWrapper layout='bio' account={account} profileId={profileId} />
			{
				profileId === 'me' && 
				<>
					<br />
					<CoinInfo />
					<br />
					<ActivityWrapper handleToggleBookmark={handleToggleBookmark} isLoadingBookmarkedLite={isLoadingBookmarkedLite} bookmarked={bookmarked} userId={account.userId}/>
				</>
			}
		</div>
	)
}

export default (withStyles(styles)(AccountTab));
