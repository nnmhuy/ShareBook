import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import ReviewItem from '../../../components/ReviewItem';
import colors from '../../../constants/colors';

const styles = theme => ({
	writeReview: {
		fontFamily: 'Montserrat',
		width: '100%',
		borderRadius: 3,
		background: 'linear-gradient(to top, #0076ff 0%, #04abe8 100%)',
		textTransform: 'uppercase',
		color: 'white',
		fontWeight: 600,
		marginBottom: 10
	},
	link: {
		textDecoration: 'none'
	},
	endText: {
		textAlign: 'center',
		fontSize: 12,
		color: colors.primary
	}
})

const reviewDemo = {
	userId: '123',
	reviewId: '20',
	username: 'Minh Huy',
	images: [
		require('../../../static/images/demo/demo_avatar.png'),
		require('../../../static/images/demo/animal-farm.png'),
		require('../../../static/images/demo/animal-farm.png')
	],
	avatar: require('../../../static/images/demo/demo_avatar.png'),
	createdAt: '2019-03-29T00:00:00',
	rating: 4.5,
	title: 'Hay, thú vị',
	content: 'Thay đổi hoàn toàn nhận thức của ta về thế giới. Sách dựa trên bề dày nghiên cứu gần 30 năm của tác giả nên các thông tin vừa mới lạ, hấp dẫn mà cũng đầy tính thuyết phục. Tác giả không chỉ trả lời được câu hỏi tối hậu: “Vì sao  châu Âu là những người đi chinh phục mà không phải châu” Phi?” hay rộng hơn là: “Vì sao dân tộc này lại giỏi hơn dân tộc khác?',
}

const ReviewTab = props => {
	const { classes, profileId } = props;
	const { content, title, avatar, images, createdAt, username } = reviewDemo;

	return (
		<div>
			{
				profileId === 'me' &&
				<Link to='/book-list' className={classes.link}>
					<Button className={classes.writeReview} >
						ghi review mới
					</Button>
				</Link>
			}
			<div className={classes.reviewList}>
				<ReviewItem
					content={content}
					username={username}
					avatar={avatar}
					images={images}
					createdAt={createdAt}
					title={title}
				/>
				{
					/* 
					{
						reviewList.map((review, id) => {
							return (
								<ReviewItem
									key={id}
									{...review}
									bookImage={bookImage}
									handleToggleLikeReview={handleToggleLikeReview}
								/>
							)
						})
					} 
				*/
				}
			</div>
			<p className={classes.endText}>End of results</p>
		</div>
	);
}

export default (withStyles(styles)(ReviewTab));
