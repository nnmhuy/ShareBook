import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'

import LayoutWrapper from '../../components/LayoutWrapper'
import Link from '../../components/Link'
import Search from '../../components/Search'
import NewsSlider from './components/NewsSlider'
import CategoryList from './components/CategoryList'
import BookSlider from '../../components/BookSlider'
import TopBook from './components/TopBook'

import colors from '../../constants/colors'
import { ReactComponent as FilterIcon } from '../../static/images/filter-filled.svg'
import { newsDemoData, categoryDemoList, demoBookList, demoTopBooks } from './demoData'

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

  render() {
    const { classes, account } = this.props

    return (
      <LayoutWrapper account={account} title={'Kệ sách'}>
        <div className={classes.container}>
          <div className={classes.searchContainer}>
            <Search />
            <Link to='/filter'>
              <IconButton className={classes.filterButton}>
                <FilterIcon fill={colors.primary} className={classes.filterIcon}/>
              </IconButton>
            </Link>
          </div>
          <NewsSlider newsData={newsDemoData}/>
          <CategoryList categoryList={categoryDemoList}/>
          <BookSlider
            title={'Đề xuất'}
            url={`/category/suggested`}
            bookList={demoBookList} 
            style={{ marginTop: 20 }}
            />
          <BookSlider
            title={'#Thám hiểm'}
            url={`/category/discovery`}
            bookList={demoBookList} />
          <BookSlider
            title={'#Châm biếm'}
            url={`/category/joke`}
            bookList={demoBookList} />
          <TopBook 
            topBookList={demoTopBooks}
          />
        </div>
      </LayoutWrapper>
    )
  }
}

const mapStateToProps = ({ state, account }) => {
  return {
    account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookList));
