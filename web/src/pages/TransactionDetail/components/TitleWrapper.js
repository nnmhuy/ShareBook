import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import colors from '../../../constants/colors';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  title: {
    fontWeight: 600,
    fontSize: 12,
    color: colors.primary
  },
  wrapper: {
    padding: 10
  }
})

const TitleWrapper = props => {
  const { classes, title, children } = props;
  return (
    <div>
      <p className={classes.title}>{title}</p>
      <Paper className={classes.wrapper}>
        {children}
      </Paper>
    </div>
  );
};

export default withStyles(styles)(TitleWrapper);