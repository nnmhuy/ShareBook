import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import Loading  from '../../components/Loading'
import Pagination from '../../components/Pagination/index'

import Link from '../../components/Link'
import LayoutWrapper from '../../components/LayoutWrapper'
import Search from '../../components/Search'
import Book from '../../components/Book'
import { ReactComponent as FilterIcon} from '../../static/images/controls.svg'
import { getCategoryList, getBookList, toggleBookmark } from '../../redux/actions/bookAction'

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
      category: null
    }
  }

  componentDidMount() {
    var { categoryList, getCategoryListHandler } = this.props
    if (!this.props.categoryIsLoading && !_.get(categoryList, '[0]', null)) {
      getCategoryListHandler()
    }
  }

  componentDidUpdate() {
    let { categoryList } = this.props
    if (!this.state.category && !this.props.categoryIsLoading &&
    categoryList && categoryList[0]) {
      let categoryUrl = _.get(this.props, 'match.params.categoryId')
      categoryList.some(element => {
        if (element.url.endsWith(categoryUrl)) {
          this.setState({
            category: element
          })
          return true
        }
        return false
      });
    }
  }

  handlePageChange = (data) => {
    console.log(data)
    // getInstances({ bookId, page: data.selected, limit: numberOfBookInstancesPerPage})
  }

  render() {
    const { classes, account, categoryIsLoading } = this.props
    const { category } = this.state
    let isLoading = categoryIsLoading

    return (
      <LayoutWrapper account={account} title={_.get(category, 'name', null)}>
        <Loading isLoading={isLoading}/>
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
          <Pagination
            pageCount={10}
            breakLabel={'. . .'}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            handlePageChange={this.handlePageChange}
          />
        </div>
      </LayoutWrapper>
    )
  }
}

const mapStateToProps = ({ state, account, book }) => {
  return {
    account: {
      isAuth: !!(localStorage.getItem('isAuth')),
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      name: localStorage.getItem('name'),
      avatar: localStorage.getItem('avatar'),
      coin: Number.parseInt(localStorage.getItem('coin')),
    },
    categoryIsLoading: book.categoryIsLoading,
    categoryList: book.categoryList,
    bookListData: book.bookListData,
    bookListIsLoading: book.bookListIsLoading,
    updatedAtForSearch: book.updatedAtForSearch
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCategoryListHandler: getCategoryList,
  getBookListHandler: getBookList,
  toggleBookmarkHandler: toggleBookmark 
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryBookList));
