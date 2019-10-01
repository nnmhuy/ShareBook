import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { demoReview } from '../demoData';
import Image from '../../../components/Image';

const getGrid = () => {
	if (demoReview.images.length >= 2) return 2;
	else return 1;
}

const styles = (theme => ({
	reviewContainer: {
		lineHeight: 1.5,
		position: 'relative',
		marginBottom: 15
	},
	reviewText: {
		padding: '0 10px',
		marginTop: 0,
		fontSize: 14
	},
	reviewImages: {
		display: 'grid',
		gridTemplateColumns: `repeat(${getGrid()}, 1fr)`
	},
	reviewImagesThree: {
		'& :nth-child(3)': {
			gridColumn: '1/span2'
		}
	},
	imageContainer: {
		textAlign: 'center',
		backgroundColor: '#EBEAEA',
		height: `calc(550px/${getGrid()})`,

		// min-width @550: {height: 550} else 100vw
	},
	reviewImage: {
		height: `calc(550px/${getGrid()})`
		// min-width @550: {height: 550} else 100vw
	}
}))

class ReviewItem extends Component {
	render() {
		const { classes, review } = this.props;
		// const { bookName } = review;
		// const { images, content } = review.review;
		return (
			<div className={classes.reviewContainer}>
				<p className={classes.reviewText}>{review && review.review && review.review.content}</p>
				<div className={`${classes.reviewImages} ${review && review.review && review.review.images.length === 3 ? classes.reviewImagesThree : ''}`}>
					{
						review && review.review && review.review.images.map((image, index) => {
							return (
								<div className={classes.imageContainer} key={index}>
									<Image src={image} className={classes.reviewImage} alt={review && review.bookName} />
								</div>
							)
						})
					}
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(ReviewItem);