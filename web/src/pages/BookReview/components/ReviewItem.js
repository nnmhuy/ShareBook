import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { demoReview } from '../demoData';

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
        marginTop: 0,
        fontSize: 14
        // minwidth @550px: {fontSize: 16}
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

    renderImages = () => {
        return demoReview.images.map(item => {
            return (
                <div className={this.props.classes.imageContainer}>
                    <img src={item} className={this.props.classes.reviewImage} alt="{bookName}" />
                </div>
            )
        })
    }

    render() {
        const { classes } = this.props;
        const { images, title, review } = demoReview;

        return (
            <div className={classes.reviewContainer}>
                {title === null | title === '' ? '' :
                    <h4 style={{ marginBottom: 0 }}>{title}</h4>
                }
                <p className={classes.reviewText}>{review}</p>
                <div className={`${classes.reviewImages} ${images.length === 3 ? classes.reviewImagesThree : ''}`}>
                    {
                        images.map((image, index) => {
                            return (
                                <div className={classes.imageContainer} key={index}>
                                    <img src={image} className={classes.reviewImage} alt="{bookName}" />
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