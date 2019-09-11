import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'

import Link from '../../components/Link'
import Search from '../../components/Search'
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
    background: '#fff',
    position: 'fixed'
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
    paddingTop: 100,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gridGap: 10,
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'space-around'
  },
  book: {
    width: 90,
    height: 140,
    borderRadius: 4
  }
}))

class CategoryBookList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <div className={classes.searchContainer}>
          <Search/>
          <IconButton className={classes.filterButton}>
            <FilterIcon fill={colors.primary} className={classes.icon}/>
          </IconButton>
        </div>
        <div className={classes.bookContainer}>
          {
            bookDemoData.map((book) => {
              return (
                <Link to={`/book-detail/${book.bookId}`} key={book.bookId}>
                  <img src={book.image} alt={book.bookId} className={classes.book}/>
                </Link>
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ state }) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryBookList));
