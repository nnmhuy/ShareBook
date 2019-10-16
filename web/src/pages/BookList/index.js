import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'

import LayoutWrapper from '../../components/LayoutWrapper'
import Link from '../../components/Link'
import NewsSlider from './components/NewsSlider'
import CategoryList from './components/CategoryList'
import BookSlider from '../../components/BookSlider'
import TopBook from './components/TopBook'
import SearchBar from './components/SearchBar'
import getListCondition from '../../helper/getListCondition'

import colors from '../../constants/colors'
import { ReactComponent as FilterIcon } from '../../static/images/filter-filled.svg'
import { getCategoryList, getBookList, toggleBookmark, getBookSearch } from '../../redux/actions/bookAction'

const styles = (theme => ({
  container: {
    boxSizing: 'border-box',
    width: '100%',
    minWidth: 350,
    maxWidth: 800,
    margin: 'auto',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20
  },
  search: {
    marginRight: 20
  },
  filterButton: {
    width: 44,
    height: 44,
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'
  },
  filterIcon: {
    width: 20,
    height: 'auto'
  },
}))

class BookList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    this.props.getCategoryListHandler();

    let minRating = 0 
    let categoryFilter = {}, districtFilter = {}
    minRating = Number.parseInt(localStorage.getItem('minRating') || '0')
    categoryFilter = getListCondition('categoryFilter')
    districtFilter = getListCondition('districtFilter')
    
    let where = {}
    where.rating = { gte: minRating }
    if (categoryFilter) where.categoryId = {inq: categoryFilter}
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


    this.props.getBookListHandler({key:'new', 
      where: {
        ...where,
        totalOfBookInstance: {gte: 1}
      },
      limit: 12,
      userId: this.props.account.userId,
      order: 'createdAt DESC'
    });
    this.props.getBookListHandler({key:'popular', where,
      limit: 12,
      userId: this.props.account.userId,
      order: 'numberOfRating DESC'
    });
    this.props.getBookListHandler({key:'high-rating', where,
      limit: 12,
      userId: this.props.account.userId,
      order: 'rating DESC'
    });
    this.props.getBookListHandler({key:'top',
      limit: 3,
      userId: this.props.account.userId,
      order: ['numberOfUse DESC', 'numberOfRating DESC']
    });
  }

  handleToggleBookmark = (bookId, bookmarkId, isBookmarked) => {
    const { toggleBookmarkHandler } = this.props
    toggleBookmarkHandler({bookId, bookmarkId, isBookmarked})
  }

  render() {
    const { classes, account, categoryIsLoading, categoryList,
      bookListData, bookListIsLoading, history,
      updatedAtForSearch, getBookSearchHandler, bookSearchData } = this.props
    let currentCategoryList = []
    if (!categoryIsLoading && categoryList)
      currentCategoryList = categoryList

    return (
      <LayoutWrapper account={account} title={'Kệ sách'}>
        {/* <Loading isLoading={categoryIsLoading}/> */}
        <div className={classes.container}>
          <div className={classes.searchContainer}>
            <SearchBar 
              getBookSearchHandler={getBookSearchHandler}
              bookSearch={bookSearchData || []}
              updatedAtForSearch={updatedAtForSearch}
              history={history} 
            />
            <Link to='/filter'>
              <IconButton className={classes.filterButton}>
                <FilterIcon fill={colors.primary} className={classes.filterIcon}/>
              </IconButton>
            </Link>
          </div>
          <NewsSlider newsData={currentCategoryList}/>
          <CategoryList categoryList={currentCategoryList} isLoading={categoryIsLoading}/>
          <BookSlider
            title={'Sách mới'} // createAt 
            url={`/category/new`}
            bookList={get(bookListData, 'new', [])} 
            style={{ marginTop: 20 }}
            handleToggleBookmark={this.handleToggleBookmark}
            isLoading={bookListIsLoading['new']}
          />
          <BookSlider
            title={'Sách đọc nhiều'} // review (number of rate)
            url={`/category/popular`}
            bookList={get(bookListData, 'popular', [])} 
            handleToggleBookmark={this.handleToggleBookmark}
            isLoading={bookListIsLoading['popular']}
          />
          <BookSlider
            title={'Sách được đánh giá cao'} // rating 
            url={`/category/high-rating`}
            bookList={get(bookListData, 'high-rating', [])} 
            handleToggleBookmark={this.handleToggleBookmark}
            isLoading={bookListIsLoading['high-rating']}            
          />
          <TopBook  // top number of use
            topBookList={get(bookListData, 'top', [])}
            handleToggleBookmark={this.handleToggleBookmark}
            isLoading={bookListIsLoading['top']}
          />
        </div>
      </LayoutWrapper>
    )
  }
}

const mapStateToProps = ({ state, book }) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookList));
