import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import colors from '../../../constants/colors';
import Image from '../../../components/Image';

const styles = theme => ({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 5
  },
  avatar: {
    width: 35,
    height: 35,
    marginRight: 10
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
  date: {
    margin: 0,
    fontSize: 10,
    color: colors.gray
  },
  image: {
    width: 30,
    height: 40,
    marginRight: 10
  }
})

const ReviewOption = (props) => {
  const { classes, createdDay, review } = props;
  let createdAt = '0000-00-00T00:00:00';
  if (review && review.review) createdAt = review.review.createdAt;

  return (
    <div className={classes.flexColumn}>
      <div>
        <p className={classes.title}>Tên sách</p>
        <div className={classes.flexContainer}>
          <Image src={`${review.image}`} alt={`${review.bookName}`} className={classes.image} />
          <p className={classes.name}>{review.bookName}</p>
        </div>
        <div>
          <div>
            <p className={classes.title}>Người review</p>
          </div>
          <div className={classes.flexContainer} style={{ marginBottom: 15 }}>
            <Avatar src={`${review.avatar}`} className={classes.avatar} />
            <div>
              <>{review.name}</>
              <p className={classes.date}>{createdDay(createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default withStyles(styles)(ReviewOption);