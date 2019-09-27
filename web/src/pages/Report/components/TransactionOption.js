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

const TransactionOption = (props) => {
  const { classes } = props;
  // const { transId } = props;
  return (
    <div className={classes.flexColumn}>
      <div>
        <p>Id giao dịch</p>
        <p>123157adsjg</p>
      </div>
      <p className={classes.title}>Tên sách cho mượn</p>
      <div className={classes.flexContainer}>
        <Image src='{image}' alt='{name}' className={classes.image} />
        <p className={classes.name}>Animal farm</p>
      </div>
      <div>
        <p className={classes.title}>Người dùng</p>
        <div className={classes.flexContainer}>
          <Avatar src='user' className={classes.avatar} />
          <p className={classes.name}>Nguyễn Ngọc Minh Huy</p>
        </div>
      </div>
      <ProblemContainer />
    </div>
  );
};

export default withStyles(styles)(Transaction);