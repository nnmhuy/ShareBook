import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'

import Search from '../../components/Search'
import NewsSlider from './components/NewsSlider'
import CategoryList from './components/CategoryList'

import colors from '../../constants/colors'
import { ReactComponent as FilterIcon } from '../../static/images/filter-filled.svg'
import { newsDemoData, categoryDemoList } from './demoData'

const styles = (theme => ({
  container: {
    boxSizing: 'border-box',
    width: '100%',
    minWidth: 350,
    maxWidth: 800,
    margin: 'auto',
    padding: 20
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
