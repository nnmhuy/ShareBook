import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import colors from '../../constants/colors';

const styles = theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    maxWidth: 500,
    margin: 'auto',
    // boxSizing: 'border-box',
    // padding: '0 20px'
  }
})

class CategoryList extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        CategoryList
      </div>
    );
  }
}

export default (withStyles(styles)(CategoryList));