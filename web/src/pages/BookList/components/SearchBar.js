import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import Select from 'react-select';

const styles = (theme => ({
  container: {
    width: '100%',
    margin: 20
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  viewMore: {
    fontSize: 11,
    color: '#0274df'
  },
  carousel: {
    paddingLeft: 20,
    marginTop: 16
  },
  loading: {
    padding: 20
  }
}))

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


const SearchBar = (props) => {
  const { classes } = props
  return (
    <div className={classes.container}>
      <Select options={options} />
    </div> 
  )
}

export default withStyles(styles)(SearchBar)