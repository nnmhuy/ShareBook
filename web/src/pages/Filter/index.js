import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withFormik } from 'formik'

import colors from '../../constants/colors'
import ButtonContainer from './components/ButtonContainer'
import CheckBoxFilter from './components/CheckBoxFilter'
import RatingFilter from './components/RatingFilter'

import { demoCategoryList, demoDistrictList } from './demoData'

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
      setFieldValue
    } = this.props
    return (
      <div className={classes.container}>
        <ButtonContainer handleSubmit={handleSubmit}/>
        <CheckBoxFilter
          title='Thể loại'
          name='category'
          value={values.category}
          optionList={demoCategoryList}
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
          optionList={demoDistrictList}
          setFieldValue={setFieldValue}
        />
      </div>
    )
  }
}

const FilterWithFormik = withFormik({
  mapPropsToValues: () => ({ category: {}, minRating: 0, district: {} }),

  handleSubmit: (values, { setSubmitting, props }) => {
    if (props.isLoading) return

    setSubmitting(true)
    
  }
})(withStyles(styles)(Filter))

const mapStateToProps = ({ account }) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FilterWithFormik);