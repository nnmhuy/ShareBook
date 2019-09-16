import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import colors from '../../../constants/colors'
import Link from '../../../components/Link'
import CustomBottomNav from '../../../components/CustomBottomNav'


const styles = (theme => ({
  addBookButton: {
    width: 130,
    borderRadius: '0px 6px 6px 0px',
    background: colors.primary,
    color: '#fff',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: 14
  },
  borrowBookButton: {
    width: 227,
    borderRadius: '6px 0px 0px 6px',
    background: `linear-gradient(to right, ${colors.boldPrimary} 0%, ${colors.lightPrimary} 100%)`,
    color: '#fff',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: 14
  }
}))

const BottomNav = (props) => {
  const { classes, children, bookId } = props
  return (
    <CustomBottomNav
      left={
        <Link to={`/create-instance/${bookId}`}>
          <Button className={classes.addBookButton}>Thêm sách</Button>
        </Link>
      }
      right={
        <Link to={`/borrow/${bookId}`}>
          <Button className={classes.borrowBookButton}>Mượn sách</Button>
        </Link>
      }
    >
      {children}
    </CustomBottomNav>
  )
}

export default withStyles(styles)(BottomNav)

