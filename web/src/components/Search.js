import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import { ReactComponent as SearchIcon } from '../static/images/search.svg'

import colors from '../constants/colors'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    marginRight: 20,
    borderRadius: 7,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.16)'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20
  }
}));

export default function Search(props) {
  const classes = useStyles();

  const { handleChange, handleSearch } = props

  return (
    <Paper className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="search" onClick={handleSearch}>
        <SearchIcon fill={colors.primary} className={classes.icon}/>
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder='Tìm kiếm'
        onChange={handleChange}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Paper>
  );
}
