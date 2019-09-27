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
    alignItems: 'center',
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
          <div className={classes.flexContainer}>
            <Avatar src='user' className={classes.avatar} />
            <p className={classes.name}>Nguyễn Ngọc Minh Huy</p>
          </div>
        </div>
      </div>
      <ProblemContainer />
    </div>
  );
};

export default withStyles(styles)(UserOption);