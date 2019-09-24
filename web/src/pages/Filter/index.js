import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import _  from 'lodash'

import LayoutWrapper from '../../components/LayoutWrapper'
import colors from '../../constants/colors'
import ButtonContainer from './components/ButtonContainer'
import CheckBoxFilter from './components/CheckBoxFilter'
import RatingFilter from './components/RatingFilter'
import { getCategoryList } from '../../redux/actions/bookAction'

import districtList from '../../constants/district'

const styles = (theme => ({
  container: {
    boxSizing: 'border-box',
    width: '100%',
    minWidth: 350,
    maxWidth: 800,
    margin: 'auto',
  },
  divider: {
    color: colors.gray,
    marginTop: 20,
    marginBottom: 20,
  }
}))

// options chosen in filter is set to redux, perform for each of get request

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }


  render() {
    const {
      values,
      handleSubmit,
      classes,
      setFieldValue,
      account,
      categoryIsLoading,
      categoryList
    } = this.props
    let currentCategoryList = []
    if (!categoryIsLoading){
      if (categoryList && categoryList[0])
        currentCategoryList = categoryList
      else this.props.getCategoryListHandler();
    }

    currentCategoryList = currentCategoryList.map(element => {
      return {
        label: element.name,
        value: element.id
      }
    })

    const currentPage = 'Kệ sách'

    return (
      <LayoutWrapper account={account} title={currentPage}>
        <div className={classes.container}>
          <ButtonContainer handleSubmit={handleSubmit}/>
          <CheckBoxFilter
            title='Thể loại'
            name='category'
            value={values.category}
            optionList={currentCategoryList}
            setFieldValue={setFieldValue}
          />
          <Divider  className={classes.divider}/>
          <RatingFilter 
            value={values.minRating}
            setFieldValue={setFieldValue}
          />
          <Divider  className={classes.divider}/>
          <CheckBoxFilter
            title='Địa điểm'
            name='district'
            value={values.district}
            optionList={districtList}
            setFieldValue={setFieldValue}
          />
        </div>
      </LayoutWrapper>
    )
  }
}

const FilterWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    category: props.categoryFilter,
    minRating: props.minRating,
    district: props.districtFilter
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    if (props.isLoading) return
    setSubmitting(true)
    // save to local storage => other query will take
    if (_.size(values.category) > 0) {
      localStorage.setItem('categoryFilter', JSON.stringify(values.category))
    } else {
      localStorage.setItem('categoryFilter', false)
    }
    if (_.size(values.district) > 0) {
      localStorage.setItem('districtFilter', JSON.stringify(values.district))
    } else {
      localStorage.setItem('districtFilter', false)
    }
    localStorage.setItem('minRating', values.minRating)
    window.history.back()
    setSubmitting(false)
  }
})(withStyles(styles)(Filter))

const mapStateToProps = ({ account, book }) => {
  let categoryFilter = {}, districtFilter = {}
  try {
    categoryFilter = localStorage.getItem('categoryFilter')
    if (!categoryFilter || categoryFilter === 'false') categoryFilter = {}
    else categoryFilter = JSON.parse(categoryFilter)
    districtFilter = localStorage.getItem('districtFilter')
    if (!districtFilter || districtFilter === 'false') districtFilter = {}
    else districtFilter = JSON.parse(districtFilter)
  } catch (err) {
    console.log(err)
  }
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
    minRating: Number.parseInt(localStorage.getItem('minRating') || '0'),
    categoryFilter,
    districtFilter
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCategoryListHandler: getCategoryList
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FilterWithFormik);