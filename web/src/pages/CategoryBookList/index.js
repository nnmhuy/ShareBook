import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'
import ScaleLoader from 'react-spinners/ScaleLoader'

import Pagination from '../../components/Pagination/index'
import Link from '../../components/Link'
import LayoutWrapper from '../../components/LayoutWrapper'
import Book from '../../components/Book'
import SearchBar from '../BookList/components/SearchBar'
import ActivityNull from '../../components/ActivityNull'
import { ReactComponent as FilterIcon} from '../../static/images/controls.svg'
import { getCategoryList, getBookList, toggleBookmark, getBookSearch } from '../../redux/actions/bookAction'
import getListCondition from '../../helper/getListCondition'

import colors from '../../constants/colors'
import restConnector from '../../connectors/RestConnector'

import { ReactComponent as NotebookIcon } from '../../static/images/notebook-btn.svg'


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

const defaultValue = {numberOfBookPerPage: 12}

class CategoryBookList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: null,
      key: null,
      totalOfBook: null,
      condition: null
    }
  }

  componentDidMount() {
    var { categoryList, getCategoryListHandler, categoryIsLoading } = this.props
    if (!categoryIsLoading && !get(categoryList, '[0]', null)) {
      this.setState({key: null})
      getCategoryListHandler()
    } else {
      this.runInit()
    }
  }

  componentDidUpdate() {
    let { categoryList, categoryIsLoading } = this.props
    if (!categoryIsLoading && get(categoryList, '[0]', null)) {
      this.runInit()
    }
  }

  runInit = () => {
    let { categoryList } = this.props
    let categoryLabel = get(this.props, 'match.params.categoryId')
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

  queryBook = async (category) => {
    let categoryLabel = get(this.props, 'match.params.categoryId')
    let minRating = 0 
    let districtFilter = {}
    minRating = Number.parseInt(localStorage.getItem('minRating') || '0')
    districtFilter = getListCondition('districtFilter')
    
    let where = {}
    where.rating = { gte: minRating }
    if (categoryLabel !== 'all') where.categoryId = {inq: [category.id]}
    if (districtFilter) {
      where.or = []
      // for no address book
      districtFilter.push(0)
      districtFilter.forEach(element => {
        let obIntance = {}
        obIntance[`locationStatistic.${element}`] = {gte: 1}
        where.or.push(obIntance)
      });
    }
    let totalOfBookResponse = null
    try {
      totalOfBookResponse = await restConnector.get(`/books/count?where=${JSON.stringify(where)}`);
    } catch (error) {
      console.log(error);
    }
    let condition = {key: `category-${categoryLabel}`, where,
      limit: defaultValue.numberOfBookPerPage,
      userId: this.props.account.userId,
      order: ['totalOfBookInstance DESC', 'numberOfRating DESC']
    }
    this.props.getBookListHandler(condition);
    this.setState({
      condition,
      totalOfBook: get(totalOfBookResponse, 'data.count', 0)
    })
  }

  handlePageChange = (data) => {
    let newCondition = {
      ...this.state.condition,
      skip: data.selected * defaultValue.numberOfBookPerPage
    }
    this.props.getBookListHandler(newCondition);
    // getInstances({ bookId, page: data.selected, limit: numberOfBookInstancesPerPage})
  }

  handleToggleBookmark = (bookId, bookmarkId, isBookmarked) => {
    const { toggleBookmarkHandler } = this.props
    toggleBookmarkHandler({bookId, bookmarkId, isBookmarked})
  }

  render() {
    const { classes, account, categoryIsLoading, bookListData, bookListIsLoading,
      updatedAtForSearch, history, bookSearchData, getBookSearchHandler } = this.props
    const { category, key, totalOfBook, condition } = this.state
    let isLoading = categoryIsLoading || get(bookListIsLoading, key, null)
    const bookList = get(bookListData, key, [])
    
    return (
      <LayoutWrapper account={account} title={get(category, 'name', null)}>
        <div className={classes.container} style={{marginBottom: 10}}>
          <div className={classes.searchContainer}>
            <SearchBar
              getBookSearchHandler={getBookSearchHandler}
              bookSearch={bookSearchData || []}
              updatedAtForSearch={updatedAtForSearch}
              history={history}
              where={get(condition, 'where', null)}
            />    
            <Link to='/filter' style={{marginLeft: 15}}>
              <IconButton className={classes.filterButton}>
                <FilterIcon fill={colors.primary} className={classes.icon}/>
              </IconButton>
            </Link>
          </div>
          {
            isLoading &&
              <div className={classes.bookContainer}>
                <div className={classes.loading}>
                  <ScaleLoader color={colors.primary} />
                </div>
              </div>
          }
          {
            !isLoading && bookList.length === 0 ?
              <div style={{ padding: '0 20px' }}>
                <ActivityNull Icon={NotebookIcon} content='Hãy bắt đầu cho mượn sách cùng ShareBook nhé!' />
              </div>
              :
              <>
                <div className={classes.bookContainer}>
                  {
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
                        totalOfBookInstance={book.totalOfBookInstance}
                        key={`${key}-${book.id}`}/>
                      )
                    })
                  }
                </div>
                <Pagination
                  pageCount={Math.ceil(totalOfBook / defaultValue.numberOfBookPerPage)}
                  breakLabel={'. . .'}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  handlePageChange={this.handlePageChange}
                />
              </>
          }
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
    bookSearchData: book.bookSearchData,
    bookSearchIsLoading: book.bookSearchIsLoading,
    updatedAtForSearch: book.updatedAtForSearch
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCategoryListHandler: getCategoryList,
  getBookListHandler: getBookList,
  getBookSearchHandler: getBookSearch,
  toggleBookmarkHandler: toggleBookmark 
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryBookList));
