import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const styles = theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    maxWidth: 500,
    margin: 'auto'
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

export default connect()(withStyles(styles)(CategoryList));