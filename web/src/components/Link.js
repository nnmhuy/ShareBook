import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const styles = (theme => ({
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
}))

const CustomLink = (props) => {
  const { classes, ...other } = props
  return (
    <Link className={classes.link} style={{ textDecoration: 'unset' }} draggable={false} {...other} />
  )
}

export default withStyles(styles)(CustomLink)