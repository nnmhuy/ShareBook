import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '../../../components/Avatar';

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
    margin: 0
  },
  image: {
    width: 60,
    height: 80,
    marginRight: 10
  }
})

const InstanceOption = (props) => {
  const { classes, instance: {book = {}, holder = {}, owner = {}} } = props;
  
  return (
    <div className={classes.flexColumn}>
      <p className={classes.title}>Tên sách cho mượn</p>
      <div className={classes.flexContainer}>
        <Image src={`${book.image}`} alt={`${book.name}`} className={classes.image} />
        <p className={classes.name}>{book.name}</p>
      </div>
      <div>
        <p className={classes.title}>Người giữ</p>
        <div className={classes.flexContainer}>
          <Avatar src={`${owner.avatar}`} className={classes.avatar} />
          <p className={classes.name}>{owner.name}</p>
        </div>
      </div>
      <div>
        <p className={classes.title}>Người cho mượn</p>
        <div className={classes.flexContainer}>
          <Avatar src={`${holder.avatar}`} className={classes.avatar} />
          <p className={classes.name}>{holder.name}</p>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(InstanceOption);