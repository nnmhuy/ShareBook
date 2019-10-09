import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import colors from '../../../constants/colors';
import Image from '../../../components/Image';

const styles = theme => ({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
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
    marginBottom: 5
  },
  image: {
    width: 90,
    height: 120,
    marginRight: 10
  }
})

const BookOption = props => {
  const { classes, bookDetail } = props;

  return (
    <div className={classes.flexColumn}>
      <p className={classes.title}>Tên sách</p>
      <div>
        <Image src={`${bookDetail.image}`} alt={`${bookDetail.name}`} className={classes.image} />
        <p className={classes.name}>{bookDetail.name}</p>
      </div>
    </div>
  );
};

export default withStyles(styles)(BookOption);