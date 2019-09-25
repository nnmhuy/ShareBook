import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

import { ReactComponent as TechnicIcon } from '../../../static/images/technics.svg';
import ActivityNull from './ActivityNull';
import colors from '../../../constants/colors';
import { Link } from '@material-ui/core';
import ReportItem from './ReportItem';

const styles = theme => ({
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
    fontWeight: 500,
    color: colors.primary
  },
  textPrimaryLight: {
    color: colors.primary,
    textDecoration: 'none',
    cursor: 'pointer'
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

class ReportList extends Component {
  render() {
    const { classes, report, content } = this.props;
    return (
      <div>
        {
          report === null &&
          <ActivityNull Icon={TechnicIcon} content={content} />
        }
        {
          report !== null &&
          report.map(item => {
            return (
              <ReportItem report={item} />
            )
          })
        }
      </div>
    );
  }
}

export default (withStyles(styles)(ReportList));