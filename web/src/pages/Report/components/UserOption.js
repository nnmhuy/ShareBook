import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import colors from '../../../constants/colors';
import ProblemContainer from './ProblemContainer';

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
  }
})

const UserOption = (props) => {
  const { classes } = props;
  // const { userId } = props;

  return (
    <div className={classes.flexColumn}>
      <div className={classes.flexContainer}>
        <div>
          <p className={classes.title}>Người dùng</p>
          <p className={classes.name}>Nguyễn Ngọc Minh Huy</p>
        </div>
        <div className={classes.flexContainer}>
          <Avatar src='user' className={classes.avatar} />
        </div>
      </div>
      <ProblemContainer />
    </div>
  );
};

export default withStyles(styles)(UserOption);