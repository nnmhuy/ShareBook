import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import colors from '../../../constants/colors';

const styles = theme => ({
  container: {

  },
  title: {
    fontWeight: 500,
    fontSize: 12,
    color: colors.primary,
    margin: 0
  },
  inputTextArea: {
    fontFamily: 'Montserrat',
    resize: 'vertical',
    boxSizing: 'border-box',
    padding: 5,
    display: 'block',
    width: '100%',
    height: 150,
    minHeight: 50,
    maxHeight: 250,
    margin: '10px 0',
    lineHeight: 1.5,
    fontSize: 14,
    border: `1px solid ${colors.gray}`,
    '&:focus': {
      borderColor: colors.primary,
      outline: 'none'
    },
    '&:hover': {
      borderColor: colors.primary,
      outline: 'none'
    }
  }
})

class ProblemContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <label className={classes.title}>
          Vấn đề gặp phải
          <textarea
            className={classes.inputTextArea}
            placeholder='. . .'
            name='problem'
          />
        </label>
      </div>
    );
  }
}

export default (withStyles(styles)(ProblemContainer));