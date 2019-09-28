import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import ScaleLoader from 'react-spinners/ScaleLoader'
import axios from 'axios'

import Pagination from '../../components/Pagination/index'
import Link from '../../components/Link'
import LayoutWrapper from '../../components/LayoutWrapper'
import Search from '../../components/Search'
import Book from '../../components/Book'
import { ReactComponent as FilterIcon} from '../../static/images/controls.svg'
import { getCategoryList, getBookList, toggleBookmark } from '../../redux/actions/bookAction'
import getListCondition from '../../helper/getListCondition'

import colors from '../../constants/colors'
import { baseURL, imageContainer } from '../../constants/constants'

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
      category: null,
      key: null,
      condition: null
    }
  }

  componentDidMount() {
    var { categoryList, getCategoryListHandler, categoryIsLoading } = this.props
    if (!categoryIsLoading && !_.get(categoryList, '[0]', null)) {
      getCategoryListHandler()
    } else {
      this.runInit()
    }
  }

  componentDidUpdate() {
    let { categoryList, categoryIsLoading } = this.props
    if (!categoryIsLoading && _.get(categoryList, '[0]', null)) {
      this.runInit()
    }
  }

  runInit = () => {
    let { categoryList } = this.props
    let categoryLabel = _.get(this.props, 'match.params.categoryId')
    categoryList.some(element => {
      if (element.url.endsWith(categoryLabel)) {
        let newKey = `category-${categoryLabel}`
        if (newKey === this.state.key) return true
        this.setState({
          category: element,
          key: newKey
        })
        this.queryBook(element)
        return true
      }
      return false
    });
  }

  queryBook = (category) => {
    let categoryLabel = _.get(this.props, 'match.params.categoryId')
    let minRating = 0 
    let districtFilter = {}
    minRating = Number.parseInt(localStorage.getItem('minRating') || '0')
    districtFilter = getListCondition('districtFilter')
    
    let where = {}
    where.rating = { gte: minRating }
    if (categoryLabel !== 'all') where.categoryId = {inq: [category.id]}
    if (districtFilter) {
      where.or = []
      districtFilter.forEach(element => {
        let obIntance = {}
        obIntance[`locationStatistic.${element}`] = {gte: 1}
        where.or.push(obIntance)
      });
    }

    let condition = {key: `category-${categoryLabel}`, where,
      limit: 12,
      userId: this.props.account.userId,
      order: ['totalOfBookInstance DESC', 'numberOfRating DESC']
    }
    this.props.getBookListHandler(condition);
    this.setState({condition})
  }

  handlePageChange = (data) => {
    console.log(data)
    // getInstances({ bookId, page: data.selected, limit: numberOfBookInstancesPerPage})
  }

  handleToggleBookmark = (bookId, bookmarkId, isBookmarked) => {
    const { toggleBookmarkHandler } = this.props
    toggleBookmarkHandler({bookId, bookmarkId, isBookmarked})
  }

  render() {
    const { classes, account, categoryIsLoading, bookListData, bookListIsLoading } = this.props
    const { category, key } = this.state
    let isLoading = categoryIsLoading || _.get(bookListIsLoading, key, null)
    const bookList = _.get(bookListData, key, [])

    return (
      <LayoutWrapper account={account} title={_.get(category, 'name', null)}>
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
            {isLoading ?
              <div className={classes.loading}>
                <ScaleLoader color={colors.primary}/>
              </div>
              :
              bookList.map((book) => {
                return (
                  <Book 
                  id={book.id}
                  bookmarkId={book.bookmarkId}
                  name={book.name}
                  author={book.author}
                  image={book.image}
                  isBookmarked={book.isBookmarked}
                  rating={book.rating}
                  handleToggleBookmark={this.handleToggleBookmark}
                  key={`${key}-${book.id}`}/>
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
