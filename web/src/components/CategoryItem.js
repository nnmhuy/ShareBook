import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Link from './Link'
import Image from './Image'

import colors from '../constants/colors'

const styles = (theme => ({
  container: {
    width: 130,
    minWidth: 130,
    height: 50,
    borderRadius: 4,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.16)',
    display: 'flex',
    alignItems: 'center'
  },
  autoContainer: {
    width: '22vw',
    minWidth: 130,
    minHeight: 50,
    height: '7vw',
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
    marginRight: 9
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#0274df',
  },
  number_of_books: {
    fontSize: 10,
    color: colors.dark
  }
}))

const CategoryItem = (props) => {
  const { classes, name, image, totalOfBook, url, autoWidth } = props
  return (
    <Link to={url} className={autoWidth ? classes.autoContainer : classes.container}>
      <Image src={image} alt='icon' className={classes.icon}/>
      <div className={classes.textContainer}>
        <div className={classes.title}>{name}</div>
        <div className={classes.number_of_books}>{`${totalOfBook} cuốn`}</div>
      </div>
    </Link>
  )
}

export default withStyles(styles)(CategoryItem)