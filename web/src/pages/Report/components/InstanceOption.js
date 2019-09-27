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
  image: {
    width: 30,
    height: 40
  }
})

const InstanceOption = (props) => {
  const { classes, instanceId } = props;
  return (
    <div className={classes.flexColumn}>
      <p className={classes.title}>Tên sách cho mượn</p>
      <div className={classes.flexContainer}>
        <Image src='{image}' alt='{name}' className={classes.image} />
        <p className={classes.name}>Animal farm</p>
      </div>
      <div className={classes.flexContainer}>
        <div>
          <p className={classes.title}>Cuốn thứ</p>
          <p className={classes.name}>1</p>
        </div>
        <div className={classes.flexContainer}>
          <Avatar src='owner' className={classes.avatar} />
          <Avatar src='holder' className={classes.avatar} />
        </div>
      </div>
      <ProblemContainer />
    </div>
  );
};

export default withStyles(styles)(InstanceOption);