import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import colors from '../../../constants/colors';
import ProblemContainer from './ProblemContainer';
import Image from '../../../components/Image';

const styles = theme => ({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    color: colors.primary
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
    margin: 0,
    marginBottom: 5,
    color: colors.primary
  },
  name: {
    margin: 0,
    marginBottom: 15,
    color: 'black'
  },
  image: {
    width: 30,
    height: 40
  }
})

const BookOption = props => {
  const { classes, bookId } = props;
  return (
    <div className={classes.flexColumn}>
      <p className={classes.title}>Tên sách</p>
      <div className={classes.flexContainer}>
        <Image src='{image}' alt='{name}' className={classes.image} />
        <p className={classes.name}>Animal farm</p>
      </div>
      <ProblemContainer />
    </div>
  );
};

export default withStyles(styles)(BookOption);