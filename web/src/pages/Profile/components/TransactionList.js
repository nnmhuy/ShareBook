import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LinesEllipsis from 'react-lines-ellipsis';

import Image from '../../../components/Image';
import colors from '../../../constants/colors';
import ActivityNull from '../../../components/ActivityNull';

import { ReactComponent as TransactionIcon } from '../../../static/images/transaction-btn.svg';



const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 15
  },
  infoWrapper: {
    display: 'flex'
  },
  link: {
    fontSize: 10,
    textDecoration: 'none',
    cursor: 'pointer',
    color: '#FF8D46',
    marginRight: 10,
    '&:hover': {
      textDecoration: 'none'
    }
  },
  image: {
    height: 55,
    width: 40,
    marginRight: 10
  },
  title: {
    fontWeight: 500,
    fontSize: 14,
    margin: 0,
    marginBottom: 5
  },
  author: {
    fontSize: 11,
    color: '#717171',
    margin: 0,
    marginBottom: 10
  },
  status: {
    fontSize: 10,
    color: '#23c47a',
    margin: 0
  },
  reviewWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  review: {
    fontSize: 10,
    color: colors.primary,
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  avatar: {
    width: 30,
    height: 30
  }
})

const TransactionList = (props) => {
  const { classes, transactions, textNull } = props;
  const transId = '22ai2z39d44';
  const instanceId = '22ai2z39d44';
  return (
    <>
      {
        transactions.length === 0 ?
          <ActivityNull Icon={TransactionIcon} content={textNull} />
          :
          <>
            <Paper className={classes.container}>
              <div className={classes.infoWrapper}>
                <Image src='{bookImage}' alt='{bookName}' className={classes.image} />
                <div>
                  <LinesEllipsis
                    text={'Animal Farm'}
                    maxLine='1'
                    ellipsis='..'
                    trimRight
                    className={classes.title}
                  />
                  <p className={classes.author}>George O'Weill</p>
                  <p className={classes.status}>Đang chờ</p>
                </div>
              </div>
              <div className={classes.reviewWrapper}>
                <div style={{ display: 'flex' }}>
                  <Link to={`/detail-transaction/${transId}`} className={classes.link}>
                    Theo dõi
                </Link>
                  <Link to={`/add-review/${instanceId}`} className={classes.review}>
                    Đánh giá
              </Link>
                </div>
                <Avatar src='' className={classes.avatar} />
              </div>
            </Paper>
          </>
      }
    </>
  );
};

export default withStyles(styles)(TransactionList);