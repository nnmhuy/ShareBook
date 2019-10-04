import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Link from '../../../components/Link';
import colors from '../../../constants/colors';

import Avatar from '../../../components/Avatar'
import { ReactComponent as LikeFilledIcon } from '../../../static/images/like-filled.svg'

const styles = (theme => ({
	flexContainer: {
		position: 'relative',
		display: 'flex',
		margin: '15px 0'
	},
	replyWrapper: {
		position: 'relative'
	},
	rateContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	reply: {
		marginBottom: 10,
		padding: '10px 15px',
		borderRadius: 15,
		backgroundColor: '#f0f7fd'
	},
	username: {
		fontWeight: 600,
		fontSize: 16,
		color: '#1c73c6',
		marginRight: 10,
		textDecoration: 'none',
		cursor: 'pointer'
	},
	date: {
		fontSize: 12,
		lineHeight: 1.5,
		color: 'gray',
		marginRight: 10
	},
	likeIcon: {
		zIndex: 2
	},
	dislikeIcon: {
		transform: 'rotate(180deg)'
	},
	rateIcon: {
		position: 'relative',
		height: 'auto',
		cursor: 'pointer',
		width: 18,
		marginLeft: 5
	},
	rateSmallIcon: {
		position: 'relative',
		height: 'auto',
		cursor: 'pointer',
		width: 15,
		marginRight: 5
	},
	ratingsCounter: {
		display: 'flex',
		position: 'absolute',
		right: 0
	},
	rateCounter: {
		display: 'flex',
		alignItems: 'center',
		fontWeight: 600,
		fontSize: 12,
		borderRadius: 100,
		backgroundColor: 'white',
		boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.2)',
		padding: '5px 10px',
		position: 'absolute',
		right: 0,
		bottom: 14
	},
	likeCounter: {
		right: 25,
		zIndex: 1
	}

}))

const CommentItem = props => {
	const { classes, reply, createdDay } = props;

	return (
		<div className={classes.flexContainer}>
			<Link className={classes.username} to={`/profile/${reply && reply.userId}`}>
				<Avatar src='{reply && reply.avatar}' />
			</Link>
			<div className={classes.replyWrapper}>
				<div className={classes.reply}>
					<span>
						<Link className={classes.username} to={`/profile/${reply && reply.userId}`}>{reply && reply.name}</Link>
					</span>
					{reply && reply.content}
				</div>
				<div className={classes.rateContainer}>
					<div className={classes.date}>{createdDay(reply && reply.createdAt)}</div>
					{/* {likeStatus === 1 ?
						<LikeFilledIcon fill={colors.primary} className={[classes.likeIcon, classes.rateIcon].join(' ')} />
						:
						<LikeNotFilledIcon fill={colors.primary} className={[classes.likeIcon, classes.rateIcon].join(' ')} />
					}
					{likeStatus === 2 ?
						<LikeFilledIcon fill='#D75A4A' className={[classes.dislikeIcon, classes.rateIcon].join(' ')} />
						:
						<LikeNotFilledIcon fill='#D75A4A' className={[classes.dislikeIcon, classes.rateIcon].join(' ')} />
					} */}


				</div>
				<div className={classes.ratingsCounter}>
					<div className={[classes.likeCounter, classes.rateCounter].join(' ')} >
						<LikeFilledIcon fill={colors.primary} className={[classes.likeIcon, classes.rateSmallIcon].join(' ')} />
						{reply && reply.numberOfLike}
					</div>
					<div className={classes.rateCounter}>
						<LikeFilledIcon fill='#D75A4A' className={[classes.dislikeIcon, classes.rateSmallIcon].join(' ')} />
						{reply && reply.numberOfDislike}
					</div>
				</div>
			</div>
		</div>
	);
}

export default withStyles(styles)(CommentItem);