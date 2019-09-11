import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'

import Search from '../../components/Search'
import NewsSlider from './components/NewsSlider'
import CategoryList from './components/CategoryList'
import BookSlider from '../../components/BookSlider'

import colors from '../../constants/colors'
import { ReactComponent as FilterIcon } from '../../static/images/filter-filled.svg'
import { newsDemoData, categoryDemoList, demoBookList } from './demoData'

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
    justifyContent: 'space-between'
  },
  filterButton: {
    width: 44,
    height: 44,
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'
  },
  filterIcon: {
    width: 20,
    height: 'auto'
  }
}))

class BookList extends React.Component {
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
          <Search />
          <IconButton className={classes.filterButton}>
            <FilterIcon fill={colors.primary} className={classes.filterIcon}/>
          </IconButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookList));
