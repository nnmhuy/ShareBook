import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import getFormattedDate from '../../../helper/getFormattedDate'

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
    width: 60,
    height: 80,
    marginRight: 10
  }
})

const ReplyOption = props => {
  const { classes, reply } = props;
  let createdAt = '0000-00-00T00:00:00';
  if (reply && reply.createdAt) createdAt = reply.createdAt

  return (
    <div className={classes.flexColumn}>
      <div>
        <p className={classes.title}>Tên sách</p>
        <div className={classes.flexContainer}>
          <Image src={`${reply && reply.bookImage}`} alt={`${reply && reply.bookName}`} className={classes.image} />
          <p className={classes.nameMargin}>{reply && reply.bookName}</p>
        </div>
        <p className={classes.title}>Review của</p>
        <div className={classes.flexContainer}>
          <Avatar src={`${reply && reply.reviewAvatar}`} className={classes.avatar} />
          <p className={classes.name}>{reply && reply.reviewName}</p>
        </div>
        <div>
          <div>
            <p className={classes.title} style={{ marginTop: 10 }}>Người reply</p>
          </div>
          <div className={classes.flexContainer} style={{ marginBottom: 15 }}>
            <Avatar src={`${reply && reply.replyAvatar}`} className={classes.avatar} />
            <div>
              {
                reply && reply.replyName !== undefined && <>{`${reply && reply.replyName}`}</>
              }
              <p className={classes.date}>{reply && getFormattedDate(createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(ReplyOption);