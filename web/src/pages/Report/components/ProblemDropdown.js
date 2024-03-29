import React from 'react';
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


const ProblemDropdown = props => {
  const { classes, types, values, params, handleChange, handleBlur } = props;
  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {
          params.type === undefined &&
          <>
            <p className={classes.title}>Tôi gặp vấn đề với</p>
            <FormControl className={classes.formControl}>
              <NativeSelect
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                name='type'
                className={classes.selectEmpty}
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
          </>
        }
        {
          params.type !== undefined &&
          <>
            <p className={classes.title}>Tôi gặp vấn đề với</p>
            <p className={classes.selectEmpty}>{types[0].name}</p>
          </>
        }
      </div>
    </div>
  );
}

export default (withStyles(styles)(ProblemDropdown));