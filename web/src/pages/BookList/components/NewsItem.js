import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Link from '../../../components/Link'


const styles = (theme => ({
  container: {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    padding: 30,
    height: 150,
    width: '99%',
    margin: 'auto',
    borderRadius: 6,
    textDecoration: 'none'
  },
  title: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold'
  }
}))

const NewsItem = (props) => {
  const { classes, title, url, image } = props
  return (
    <Link
      to={url}
      className={classes.container} 
      style={{ 
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}
    >
      <span className={classes.title}>{title}</span>
    </Link>
  )
}

export default withStyles(styles)(NewsItem)