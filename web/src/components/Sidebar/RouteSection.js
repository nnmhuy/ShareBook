import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
} from '@material-ui/core'

import RouteItem from './RouteItem'

import { routes } from '../../constants/routes'

const styles = (theme => ({
  container: {
    marginTop: 15,
    marginBottom: 15
  }
}))

const RouteSection = (props) => {
  const { classes, currentPathname } = props
  return (
    <div className={classes.container}>
      {
        routes.map(route => {
          return (
            <RouteItem
              {...route}
              currentPathname={currentPathname}
              key={route.label}
            />
          )
        })
      }
    </div>
  )
}

export default withStyles(styles)(RouteSection)