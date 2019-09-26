import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import colors from '../../../constants/colors';

const styles = theme => ({
  container: {
    display: 'flex',
    marginBottom: 10
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
    fontSize: 14,
    margin: '10px 0'
  },
  title: {
    fontWeight: 500,
    fontSize: 13,
    marginRight: 15
  }
})


class ProblemDropdown extends Component {

  render() {
    const { classes, types, type, params, handleChange } = this.props;

    return (
      <div className={classes.container}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p className={classes.title}>Tôi gặp vấn đề với</p>
          {
            params.type === undefined &&
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
          }
          {
            params.type !== undefined &&
            <p className={classes.selectEmpty}>{types[0].name}</p>
          }
        </div>
      </div>
    );
  }
}

export default (withStyles(styles)(ProblemDropdown));