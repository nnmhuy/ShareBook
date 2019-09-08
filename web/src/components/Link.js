import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const styles = (theme => ({
  link: {
    color: 'inherit',
    textDecoration: 'unset'
  }
}))

const CustomLink = (props) => {
  const { classes, ...other } = props
  return (
    <Link style={{ textDecoration: 'unset'}} {...other}/>
  )
}

export default withStyles(styles)(CustomLink)