import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import colors from '../../../constants/colors';

const styles = theme => ({
  container: {
    display: 'flex'
  },
  formControl: {
    '& .MuiInput-underline:before': {
      display: 'none'
    },
    '& .MuiInput-underline:after': {
      display: 'none'
    },
    '& .MuiNativeSelect-select:focus': {
      backgroundColor: 'transparent'
    },
    '&.MuiFormControl-root': {
      flexDirection: 'row'
    }
  },
  selectEmpty: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    color: colors.primary,
    fontSize: 14
  },
  title: {
    fontWeight: 500,
    fontSize: 13,
    marginRight: 15
  }
})


class ProblemDropdown extends Component {

  render() {
    const { classes, types, type, handleChange } = this.props;

    return (
      <div className={classes.container}>
        <p className={classes.title}>Tôi gặp vấn đề với</p>
        <FormControl className={classes.formControl}>
          <NativeSelect
            value={type}
            onChange={handleChange}
            name="type"
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'type' }}
          >
            {
              types.map((item, index) => {
                return (
                  <option value={item.typeOfTarget} key={index}>{item.name}</option>
                )
              })
            }
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}

export default (withStyles(styles)(ProblemDropdown));