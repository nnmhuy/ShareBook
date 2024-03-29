import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '../../../components/Avatar';

import colors from '../../../constants/colors';
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
  idWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15
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
  titleId: {
    fontSize: 12,
    fontWeight: 500,
    margin: 0,
    marginRight: 25,
    color: colors.primary
  },
  name: {
    margin: 0,
    color: 'black'
  },
  image: {
    width: 30,
    height: 40
  }
})

const TransactionOption = (props) => {
  const { classes, transId } = props;
  return (
    <div className={classes.flexColumn}>
      <div>
        <p className={classes.title}>Id giao dịch</p>
        <p className={classes.name} style={{ marginBottom: 10 }}>{transId}</p>
      </div>
      <p className={classes.title}>Tên sách cho mượn</p>
      <div className={classes.flexContainer}>
        <Image src='{image}' alt='{name}' className={classes.image} />
        <p className={classes.name}>Animal farm</p>
      </div>
      <div>
        <p className={classes.title}>Người cho mượn</p>
        <div className={classes.flexContainer}>
          <Avatar src='user' className={classes.avatar} />
          <p className={classes.name}>Nguyễn Ngọc Minh Huy</p>
        </div>
      </div>
      <div>
        <p className={classes.title}>Người mượn</p>
        <div className={classes.flexContainer}>
          <Avatar src='user' className={classes.avatar} />
          <p className={classes.name}>Nguyễn Ngọc Minh Huy</p>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(TransactionOption);