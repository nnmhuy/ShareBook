import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'

import Link from '../../components/Link'
import LayoutWrapper from '../../components/LayoutWrapper'
import Search from '../../components/Search'
import Book from '../../components/Book'
import { ReactComponent as FilterIcon} from '../../static/images/controls.svg'

import colors from '../../constants/colors'
import { bookDemoData } from './demoData'

const styles = (theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    maxWidth: 800,
    margin: 'auto'
  },
  searchContainer: {
    height: 100,
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fff'
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 6,
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.16)'
  },
  icon: {
    width: 30,
    height: 'auto'
  },
  bookContainer: {
    padding: 20,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
    gridGap: 10,
    gridRowGap: 20,
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'space-around'
  }
}))

class CategoryBookList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const { classes, account } = this.props
    const categoryName = 'Lãng mạng'

    return (
      <LayoutWrapper account={account} title={categoryName}>
        <div className={classes.container}>
          <div className={classes.searchContainer}>
            <Search/>
            <Link to='/filter'>
              <IconButton className={classes.filterButton}>
                <FilterIcon fill={colors.primary} className={classes.icon}/>
              </IconButton>
            </Link>
          </div>
          <div className={classes.bookContainer}>
            {
              bookDemoData.map((book) => {
                return (
                  <Book {...book} key={book.bookId}/>
                )
              })
            }
          </div>
        </div>
      </LayoutWrapper>
    )
  }
}

const mapStateToProps = ({ state, account }) => {
  return {
    account: {
      isAuth: !!(localStorage.getItem('isAuth')),
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      name: localStorage.getItem('name'),
      avatar: localStorage.getItem('avatar'),
      coin: Number.parseInt(localStorage.getItem('coin')),
    },
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryBookList));
