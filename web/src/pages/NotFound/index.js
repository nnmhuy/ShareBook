import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import colors from '../../constants/colors';

import NotFoundImage from '../../static/images/404image.png';

const styles = theme => ({
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  bubble: {
    width: '100%',
    height: '100%'
  },
  textWrapper: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '70%'
  },
  text: {
    fontWeight: 600,
    fontSize: '1.7vw',
    height: '10%',
    color: colors.primary,
  },
  button: {
    backgroundColor: '#23c47a',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: '1.5vw',
    color: 'white',
    display: 'block',
    margin: 'auto',
    padding: '1vw 1.2vw',
    '&.MuiButton-root:hover': {
      backgroundColor: '#23c47a'
    }
  },
  wrapper: {
    position: 'relative',
    width: '70vw',
    minWidth: '350px',
    minHeight: '250px',
    height: '50vw'
  },
  '@media screen and (max-width: 550px)': {
    text: {
      fontSize: 11,
    },
    button: {
      padding: '5px 10px',
      fontSize: 10,
    }
  }
})

const NotFound = props => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <img src={NotFoundImage} alt='bubble cloud' className={classes.bubble} />
        <div className={classes.textWrapper}>
          <p className={classes.text}>Bạn lạc khỏi thế giới sách rồi!</p>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Button className={classes.button}>QUAY VỀ</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(NotFound);