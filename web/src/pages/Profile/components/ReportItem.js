import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { ReactComponent as TechnicIcon } from '../../../static/images/technics.svg';
import colors from '../../../constants/colors';
import { Link } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px'
  },
  icon: {
    height: 35,
    marginRight: 15
  },
  text: {
    margin: 0,
    fontWeight: 400,
    fontSize: 14,
    color: '#717171'
  },
  textPrimary: {
    margin: 0,
    fontWeight: 500,
    color: colors.primary
  },
  textPrimaryLight: {
    margin: 0,
    color: colors.primary,
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: 12
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  }
})

const ReportItem = props => {
  const { classes } = props;
  const { id, createdAt, status } = props.report;
  const createdDay = (date) => {
    let createdYMD = date.split('T')[0].split('-');
    let day = createdYMD[2];
    let month = createdYMD[1];
    let year = createdYMD[0][2] + createdYMD[0][3];
    let formattedDate = day + '.' + month + '.' + year;
    return formattedDate;
  }
  let statusCode = '';
  switch (status) {
    case 'pending':
      statusCode = 'Chờ phản hồi';
      break;
    case 'answer':
      statusCode = 'Đã trả lời';
      break;
    case 'resolved':
      statusCode = 'Đã xử lí';
      break;
    case 'reject':
      statusCode = 'Đã từ chối';
      break;
    default:
      break;
  }
  return (
    <Paper className={classes.container}>
      <TechnicIcon className={classes.icon} />
      <div>
        <div className={classes.flexContainer}>
          <p className={classes.text}>Đơn report
            <span className={classes.textPrimary}> {id}</span>
          </p>
          <p className={classes.textPrimary}>
            {createdDay(createdAt)}
          </p>
        </div>
        <div className={classes.flexContainer}>
          <p className={classes.text}>Tình trạng:
            <span className={classes.textPrimary}> {statusCode}</span>
          </p>
          <Link className={classes.textPrimaryLight} to={`/report/${id}`}>
            Theo dõi
          </Link>
        </div>
      </div>
    </Paper>
  );
}

export default (withStyles(styles)(ReportItem));
