import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import { infoRoutes } from '../../constants/routes'

import colors from '../../constants/colors'

const styles = (theme => ({
  container: {
    marginTop: 15,
    marginBottom: 15
  },
  route: {
    display: 'block',
    textDecoration: 'unset',
    fontSize: 12,
    color: colors.disabled,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8
    }
  }
}))

const InfoSection = (props) => {
  const { classes } = props
  return (
    <div className={classes.container}>
      {
        infoRoutes.map(route => {
          return (
            <Link className={classes.route} to={route.pathname} key={route.pathname}>{route.label}</Link>
          )
        })
      }
    </div>
  )
}

export default withStyles(styles)(InfoSection)