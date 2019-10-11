import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Image from '../Image';

const useStyles = makeStyles({
  _reviewImages: {
    display: 'grid',
    gridTemplateColumns: props => `repeat(${props.count}, 1fr)`
  },
  _imageContainer: {
    boxSizing: 'border-box',
    textAlign: 'center',
    // cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEAEA',
    height: props => `calc(100vw/${props.count})`,
    '@media (min-width: 550px)': {
      height: props => `calc(550px/${props.count})`
    }
  },
  _reviewImage: {
    height: props => `calc(100vw/${props.count})`,
    maxWidth: props => `calc(100vw/${props.count})`,
    '@media (min-width: 550px)': {
      height: props => `calc(550px/${props.count})`,
      maxWidth: props => `calc(550px/${props.count})`
    }
  },
  reviewImagesThree: {
    '& :nth-child(3)': {
      gridColumn: '1/span2'
    }
  }
});

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
  modal: {

  }
}))

function ImageContainer(props) {
  const { review, isViewing, toggleViewing, curImg, setImg } = props;
  const classes = useStyles(props);
  const openModal = (image, isViewing) => {
    toggleViewing(isViewing);
    setImg(image);
  }
  return (
    <div className={`${classes._reviewImages} ${review && review.images && review.images.length === 3 ? classes.reviewImagesThree : ''}`}>
      {
        review && review.images && review.images.map((image, index) => {
          return (
            <Fragment key={index}>
              {/* <div className={classes._imageContainer} onClick={() => openModal(image, true)}> */}
              <div className={classes._imageContainer}>
                <Image src={image} className={classes._reviewImage} alt={review && review.bookName} />
              </div>
            </Fragment>
          )
        })
      }
      <Dialog
        aria-labelledby="customized-dialog-title" open={isViewing} onClose={() => openModal(curImg, false)} className={classes.modal}>
        <DialogContent style={{ padding: 0 }}>
          <Image src={curImg} alt='placeholder' className={classes.imageModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

const ReviewItem = props => {
  const { classes, review } = props;
  const [isViewing, setViewing] = React.useState(false)
  const [curImg, setImg] = React.useState('')

  const toggleViewing = (value) => {
    setViewing(value)
  }

  return (
    <>
      <div className={classes.reviewContainer}>
        <p className={classes.reviewText}>{review && review.content}</p>
        <ImageContainer toggleViewing={toggleViewing} isViewing={isViewing} curImg={curImg} setImg={setImg} count={review && review.images && review.images.length >= 2 ? 2 : 1} review={review}></ImageContainer>
      </div>
    </>
  );
}

export default withStyles(styles)(ReviewItem);