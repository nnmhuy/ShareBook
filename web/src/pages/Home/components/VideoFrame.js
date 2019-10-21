import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: '80vw',
    margin: 'auto',
    height: '45vw',
    marginBottom: 50
  },
  media: {
    height: '45vw',
    width: '100%'
  },
});

const VideoFrame = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <iframe className={classes.media}
        title='ShareBook'
        src="https://www.youtube.com/embed/nUgFi9daqH8"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
      >
      </iframe>
    </Card>
  );
};

export default VideoFrame;