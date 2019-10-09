import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Link from '../../../components/Link';
import colors from '../../../constants/colors';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Avatar from '../../../components/Avatar'
import { ReactComponent as LikeFilledIcon } from '../../../static/images/like-filled.svg';
import { ReactComponent as LikeNotFilledIcon } from '../../../static/images/like.svg';
import { ReactComponent as MoreIcon } from '../../../static/images/more.svg'
import { ReactComponent as ReportIcon } from '../../../static/images/alert.svg'

const styles = (theme => ({
	flexContainer: {
		position: 'relative',
		display: 'flex',
		margin: '15px 0'
	},
	flexOnly: {
		display: 'flex'
	},
	replyWrapper: {
		position: 'relative'
	},
	rateContainer: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		marginRight: 10
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
		marginLeft: 10
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
		width: 16,
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
	},
	likeCount: {
		fontSize: 13,
		margin: 0,
		textAlign: 'center'
	},
	moreZoneContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
		position: 'relative',
		'& .MuiIconButton-root': {
			paddingTop: 0,
			paddingBottom: 0,
			paddingRight: 0
		}
	},
	buttonContainer: {
		textTransform: 'none',
		display: 'flex',
		alignItems: 'center',
		fontSize: 11,
		width: 85,
		height: 'fit-content',
		position: 'absolute',
		right: 0,
		top: 20,
		zIndex: 1,
	},
	reportIcon: {
		width: 15,
		height: 15,
		marginLeft: 5
	},
	button: {
		backgroundColor: 'white',
		textTransform: 'capitalize',
		width: 85,
		transition: 'ease 0.3s',
		'&:hover': {
			backgroundColor: colors.primary,
			color: 'white'
		}
	},
	reportButton: {
		color: colors.red
	},
	userButton: {
		boxShadow: 'none'
	}
}))

const CommentItem = props => {
	const { classes, reply, createdDay, userId, handleToggleLikeReply } = props;
	const onToggleLike = (likeStatus) => {
		handleToggleLikeReply(reply.id, reply.likeReplyId, likeStatus)
	}
	const [isShowMore, setShowMore] = React.useState(false)

	const handleToggleMore = () => {
		setShowMore(!isShowMore)
	}

	const handleClickAway = () => {
		setShowMore(false)
	}

	return (
		<div className={classes.flexContainer}>
			<div className={classes.rateContainer}>
				{reply && reply.likeStatus === 1 ?
					<LikeFilledIcon fill={colors.primary} className={[classes.likeIcon, classes.rateIcon].join(' ')} onClick={() => onToggleLike(0)} />
					:
					<LikeNotFilledIcon fill={colors.primary} className={[classes.likeIcon, classes.rateIcon].join(' ')} onClick={() => onToggleLike(1)} />
				}
				<p className={classes.likeCount}>{reply.numberOfLike}</p>
				{reply && reply.likeStatus === -1 ?
					<LikeFilledIcon fill='#D75A4A' className={[classes.dislikeIcon, classes.rateIcon].join(' ')} onClick={() => onToggleLike(0)} />
					:
					<LikeNotFilledIcon fill='#D75A4A' className={[classes.dislikeIcon, classes.rateIcon].join(' ')} onClick={() => onToggleLike(-1)} />
				}
				<p className={classes.likeCount}>{reply.numberOfDislike}</p>
			</div>
			<div className={classes.flexOnly}>
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
					<div className={classes.rateContainer} style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
						{reply && reply.likeStatus === 1 ?
							<LikeFilledIcon fill={colors.primary} className={[classes.likeIcon, classes.rateIcon].join(' ')} onClick={() => onToggleLike(0)} />
							:
							<LikeNotFilledIcon fill={colors.primary} className={[classes.likeIcon, classes.rateIcon].join(' ')} onClick={() => onToggleLike(1)} />
						}
						<p className={classes.likeCount} style={{marginLeft: 5}}>{reply.numberOfLike}</p>
						{reply && reply.likeStatus === -1 ?
							<LikeFilledIcon fill='#D75A4A' className={[classes.dislikeIcon, classes.rateIcon].join(' ')} onClick={() => onToggleLike(0)} />
							:
							<LikeNotFilledIcon fill='#D75A4A' className={[classes.dislikeIcon, classes.rateIcon].join(' ')} onClick={() => onToggleLike(-1)} />
						}
						<p className={classes.likeCount} style={{ marginLeft: 5 }}>{reply.numberOfDislike}</p>
						<div className={classes.date}>{createdDay(reply && reply.createdAt)}</div>
					</div>
					<div className={classes.ratingsCounter}>
						<div className={[classes.likeCounter, classes.rateCounter].join(' ')} >
							<LikeFilledIcon fill={colors.primary} className={[classes.likeIcon, classes.rateSmallIcon].join(' ')} />
							<LikeFilledIcon fill='#D75A4A' className={[classes.dislikeIcon, classes.rateSmallIcon].join(' ')} style={{ marginLeft: '-10px' }}/>
							{reply && reply.numberOfLike + reply.numberOfDislike}
						</div>
						<div className={classes.rateCounter}>
							<LikeFilledIcon fill='#D75A4A' className={[classes.dislikeIcon, classes.rateSmallIcon].join(' ')} />
							{reply && reply.numberOfDislike}
						</div>
					</div>
				</div>
				<div className={classes.moreZone}>
					<ClickAwayListener onClickAway={handleClickAway}>
						<div className={classes.moreZoneContainer}>
							<IconButton onClick={handleToggleMore} disableTouchRipple style={{ backgroundColor: 'transparent' }} className={classes.moreButton}>
								<MoreIcon fill={colors.primary} />
							</IconButton>
							{
								isShowMore &&
								<div className={classes.buttonContainer}>
									{
										reply.userId !== userId &&
										<Link to={`/report/reply-${reply.id}`}>
											<Button variant='contained' size='small' className={`${classes.button} ${classes.reportButton}`}>
												Report
												<ReportIcon className={classes.reportIcon} fill='#fff' />
											</Button>
										</Link>
									}
									{
										reply.userId === userId &&
										<div style={{borderRadius: 4, boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'}}>
											<Button variant='contained' size='small' className={`${classes.button} ${classes.userButton}`} style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
												Sửa
											</Button>
											<Button variant='contained' size='small' className={`${classes.button} ${classes.userButton}`} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
												Xoá
											</Button>
										</div>
									}
								</div>
							}
						</div>
					</ClickAwayListener>
				</div>
			</div>
		</div>
	);
}

export default withStyles(styles)(CommentItem);