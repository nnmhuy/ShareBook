import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
} from '@material-ui/core'
import { Link } from 'react-router-dom'

import colors from '../../constants/colors'

import { ReactComponent as ArrowIcon } from '../../static/images/right-arrow.svg'

const styles = (theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textDecoration: 'unset',
    paddingRight: 30,
    height: 50,
    '&:hover': {
      opacity: 0.8
    }
  },
  containerSelected: {
    backgroundColor: '#BEBEBE19'
  },
  selected: {
    backgroundColor: colors.primary,
    width: 5,
    height: 50,
    marginRight: 15
  },
  unselected: {
    width: 20
  },
  icon: {
    width: 25,
    height: 'auto'
  },
  label: {
    flex: 1,
    fontWeight: 600,
    fontSize: 13,
    color: '#fff',
    marginLeft: 15
  },
  arrowIcon: {
    height: 15,
    width: 'auto'
  }
}))

const RouteItem = (props) => {
  const { classes, pathname, Icon, label, currentPathname } = props
  const isSelected = (currentPathname === pathname)
  return (
    <Link to={pathname} className={`${classes.container} ${isSelected && classes.containerSelected}`}>
      <div className={isSelected ? classes.selected : classes.unselected}></div>
      <Icon fill={colors.light} className={classes.icon}/>
      <span className={classes.label}>{label}</span>
      <ArrowIcon stroke={colors.light} className={classes.arrowIcon} />
    </Link>
  )
}

export default withStyles(styles)(RouteItem)