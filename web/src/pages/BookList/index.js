import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import LayoutWrapper from '../../components/LayoutWrapper'
import Loading from '../../components/Loading'
import Link from '../../components/Link'
import Search from '../../components/Search'
import NewsSlider from './components/NewsSlider'
import CategoryList from './components/CategoryList'
import BookSlider from '../../components/BookSlider'
import TopBook from './components/TopBook'

import colors from '../../constants/colors'
import { ReactComponent as FilterIcon } from '../../static/images/filter-filled.svg'
import { demoTopBooks } from './demoData'
import { getCategoryList, getBookList } from '../../redux/actions/bookAction'

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
    try {
      minRating = Number.parseInt(localStorage.getItem('minRating') || '0')
      categoryFilter = localStorage.getItem('categoryFilter')
      if (!categoryFilter || categoryFilter === 'false') categoryFilter = false
      else categoryFilter = JSON.parse(categoryFilter)
      categoryFilter = this.mapToArray(categoryFilter)

      districtFilter = localStorage.getItem('districtFilter')
      if (!districtFilter || districtFilter === 'false') districtFilter = false
      else districtFilter = JSON.parse(districtFilter)
      districtFilter = this.mapToArray(districtFilter)
    } catch (err) {
      console.log(err)
    }
    
    let where = {}
    where.rating = { gte: minRating }
    if (categoryFilter) where.categoryId = {inq: categoryFilter}
    if (districtFilter) {
      where.or = []
      districtFilter.forEach(element => {
        let obIntance = {}
        obIntance[`locationStatistic.${element}`] = {gte: 1}
        where.or.push(obIntance)
      });
    }


    this.props.getBookListHandler({key:'new', where});
    this.props.getBookListHandler({key:'popular', where});
    this.props.getBookListHandler({key:'high-rating', where});
  }

  mapToArray = (object) => {
    let resultArray = []
    _.mapKeys(object, function(value, key) {
      if (value)
        resultArray.push(key)
    });
    if (resultArray.length === 0)
      return false
    return resultArray
  }

  render() {
    const { classes, account, categoryIsLoading, categoryList, bookListData, bookListIsLoading } = this.props
    let currentCategoryList = []
    if (!categoryIsLoading && categoryList)
      currentCategoryList = categoryList

    return (
      <LayoutWrapper account={account} title={'Kệ sách'}>
        {/* <Loading isLoading={categoryIsLoading}/> */}
        <div className={classes.container}>
          <div className={classes.searchContainer}>
            <Search className={classes.search}/>
            <Link to='/filter'>
              <IconButton className={classes.filterButton}>
                <FilterIcon fill={colors.primary} className={classes.filterIcon}/>
              </IconButton>
            </Link>
          </div>
          <NewsSlider newsData={currentCategoryList}/>
          <CategoryList categoryList={currentCategoryList} isLoading={categoryIsLoading}/>
          <BookSlider
            title={'Sách mới'} // publish year, createAt 
            url={`/category/new`}
            bookList={_.get(bookListData, 'new', [])} 
            style={{ marginTop: 20 }}
            isLoading={bookListIsLoading['new']}
          />
          <BookSlider
            title={'Sách đọc nhiều'} // review (total of rating)
            url={`/category/popular`}
            bookList={_.get(bookListData, 'popular', [])} 
            isLoading={bookListIsLoading['popular']}
          />
          <BookSlider
            title={'Sách được đánh giá cao'} // rating 
            url={`/category/high-rating`}
            bookList={_.get(bookListData, 'high-rating', [])} 
            isLoading={bookListIsLoading['high-rating']}            
          />
          <TopBook 
            topBookList={demoTopBooks}
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
    bookListIsLoading: book.bookListIsLoading
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCategoryListHandler: getCategoryList,
  getBookListHandler: getBookList
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookList));
