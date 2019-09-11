import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Link from '../../../components/Link'

import colors from '../../../constants/colors'

const styles = (theme => ({
  container: {
    margin: 10,
    width: 130,
    minWidth: 130,
    height: 50,
    borderRadius: 4,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.16)',
    display: 'flex',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1
  },
  icon: {
    height: 27,
    width: 'auto',
    margin: 7,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#0274df',
  },
  number_of_books: {
    fontSize: 10,
    color: colors.disabled
  }
}))

const CategoryItem = (props) => {
  const { classes, title, icon, number_of_books, url } = props
  return (
    <Link to={url} className={classes.container}>
      <img src={icon} alt='icon' className={classes.icon}/>
      <div className={classes.textContainer}>
        <div className={classes.title}>{title}</div>
        <div className={classes.number_of_books}>{`${number_of_books} cuốn`}</div>
      </div>
    </Link>
  )
}

export default withStyles(styles)(CategoryItem)