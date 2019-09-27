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
    alignItems: 'center',
    marginBottom: 5
  },
  avatar: {
    width: 35,
    height: 35,
    marginRight: 10,
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
    color: 'black'
  },
  nameMargin: {
    margin: 0,
    marginBottom: 10,
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

const ReplyOption = props => {
  const { classes, createdDay } = props;
  // const { replyId } = props;
  const createdAt = '2019-03-29T00:00:00';

  return (
    <div className={classes.flexColumn}>
      <div>
        <p className={classes.title}>Tên sách</p>
        <div className={classes.flexContainer}>
          <Image src='{image}' alt='{name}' className={classes.image} />
          <p className={classes.nameMargin}>Animal farm</p>
        </div>
        <p className={classes.title}>Review của</p>
        <div className={classes.flexContainer}>
          <Avatar src='user' className={classes.avatar} />
          <p className={classes.name}>Nguyễn Ngọc Minh Huy</p>
        </div>
        <div>
          <div>
            <p className={classes.title} style={{ marginTop: 10 }}>Người reply</p>
          </div>
          <div className={classes.flexContainer} style={{ marginBottom: 15 }}>
            <Avatar src='user' className={classes.avatar} />
            <div>
              <div style={{ color: 'black' }}>Nguyễn Ngọc Minh Huy</div>
              <p className={classes.date}>{createdDay(createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
      <ProblemContainer />
    </div>
  );
};

export default withStyles(styles)(ReplyOption);