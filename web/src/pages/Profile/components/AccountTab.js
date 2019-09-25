import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import BookSlider from '../../../components/BookSlider';
import PaperWrapper from './PaperWrapper';
import Follower from './Follower';
import CoinInfo from './CoinInfo';
import ActivityWrapper from './ActivityWrapper';

const styles = theme => ({

})

const AccountTab = (props) => {
	const { classes, bookOfCategory, handleToggleBookmark } = props;
	return (
			<div>
					<Follower />
					<br />
					<PaperWrapper layout='info' />
					<br />
					<PaperWrapper layout='bio' />
					<br />
					<CoinInfo />
					<br />
					<ActivityWrapper />
			</div>
	)
}

export default (withStyles(styles)(AccountTab));