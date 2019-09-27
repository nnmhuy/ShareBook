import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import colors from '../../constants/colors';

import NotFoundImg from '../../static/images/404img.png';
import NotFoundImage from '../../static/images/404image.png';
import Bubble from '../../static/images/bubble.png';

const styles = theme => ({
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  notFound: {
    // position: 'absolute',
    left: '50%',
    // transform: 'translateX(-50%)',
    width: '40%',
    top: '50px'
  },
  bubble: {
    // position: 'absolute',
    left: '50%',
    top: '50%',
    // transform: 'translate(-50%, -50%)',
    width: '60%'
  },
  textWrapper: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '65%'
  },
  text: {
    fontWeight: 600,
    fontSize: '1.8vw',
    height: '10%',
    color: colors.primary
  },
  button: {
    backgroundColor: '#23c47a',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: '1.5vw',
    color: 'white',
    display: 'block',
    margin: 'auto',
    padding: '10px 15px',
    '&.MuiButton-root:hover': {
      backgroundColor: '#23c47a'
    }
  },
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%'
  }
})

const NotFound = props => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      {/* <div className={classes.wrapper}> */}
      <img src={NotFoundImage} alt='bubble cloud' className={classes.bubble} />
      {/* <img src={NotFoundImg} alt='Not found' className={classes.notFound} /> */}
      <div className={classes.textWrapper}>
        <p className={classes.text}>Bạn đã lạc khỏi thế giới sách rồi...</p>
        <Button className={classes.button}>QUAY VỀ</Button>
      </div>
      {/* </div> */}
    </div>
  )
}

export default withStyles(styles)(NotFound);