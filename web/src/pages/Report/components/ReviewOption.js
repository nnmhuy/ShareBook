import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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
    alignItems: 'flex-end',
    marginBottom: 5
  },
  avatar: {
    width: 35,
    height: 35,
    margin: '0 10px'
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
    height: 40
  }
})

const ReviewOption = (props) => {
  const { classes, reviewId, createdDay } = props;
  const createdAt = '2019-03-29T00:00:00';

  return (
    <div className={classes.flexColumn}>
      <div>
        <p className={classes.title}>Tên sách</p>
        <div className={classes.flexContainer}>
          <Image src='{image}' alt='{name}' className={classes.image} />
          <p className={classes.name}>Animal farm</p>
        </div>
        <div>
          <div>
            <p className={classes.title}>Người review</p>
          </div>
          <div className={classes.flexContainer} style={{ marginBottom: 15 }}>
            <Avatar src='user' className={classes.avatar} />
            <div>
              <>Nguyễn Ngọc Minh Huy</>
              <p className={classes.date}>{createdDay(createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
      <ProblemContainer />
    </div>
  );
};

export default withStyles(styles)(ReviewOption);