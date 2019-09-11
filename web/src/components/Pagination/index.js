import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ReactPaginate from 'react-paginate'

import colors from '../../constants/colors'

const styles = (theme => ({
  container: {
    display: 'flex',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0
  },
  number: {
    display: 'inline-block',
    fontWeight: 600,
    fontSize: 15,
    lineHeight: 1.5,
    cursor: 'pointer',
    padding: 5,
    textAlign: 'center'
  },
  link: {
    outline: 'none'
  },
  break: {
    display: 'inline-block',
    cursor: 'pointer',
    margin: 5
  },
  breakLink: {
    outline: 'none'
  },
  active: {
    color: '#fff',
    borderRadius: 3,
    background: colors.primary
  },
  button: {
    display: 'flex',
    fontWeight: 600,
    color: colors.primary,
    cursor: 'pointer',
    marginLeft: 10,
    marginRight: 10,
    width: 20,
    height: 20,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabledButton: {
    color: '#B7C7D6'
  },
  buttonLink: {
    outline: 'none'
  }
}))

const Pagination = (props) => {
  const { classes, pageCount, pageRangeDisplayed, marginPagesDisplayed, handlePageChange } = props
  return (
    <ReactPaginate 
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      previousLabel='<'
      nextLabel='>'
      containerClassName={classes.container}
      pageClassName={classes.number}
      pageLinkClassName={classes.link}
      nextClassName={classes.button}
      previousClassName={classes.button}
      disabledClassName={classes.disabledButton}
      previousLinkClassName={classes.buttonLink}
      nextLinkClassName={classes.buttonLink}
      activeClassName={classes.active}
      breakClassName={classes.break}
      breakLinkClassName={classes.breakLink}
      onPageChange={handlePageChange}
    />
  )
}

export default withStyles(styles)(Pagination)