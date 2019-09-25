import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import Select from 'react-select';
import filterText from '../../../helper/filterText'

const styles = (theme => ({
  container: {
    width: '100%',
    margin: 5,
    marginRight: 10
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  viewMore: {
    fontSize: 11,
    color: '#0274df'
  },
  carousel: {
    paddingLeft: 20,
    marginTop: 16
  },
  loading: {
    padding: 20
  }
}))

const options = [
  { value: 'chocolate', label: 'Chocolate', id:'1' },
  { value: 'strawberry', label: 'Strawberry', id:'2' },
  { value: 'vanilla', label: 'Vanilla', id:'3' }
]

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
    }
  }

  handleChange = inputText => {
    inputText = filterText(inputText)
    console.log('call')
    _.debounce((inputText) => {
      this.props.getBookListHandler({key:'search-total',
        limit: 10,
        searchValue: {like: inputText}
      });
      console.log('call debounce')
    },1)
  }

  handleSelect = selectedOption => {
    this.setState({ selectedOption });
  }

  handleFilter = () => {
    return true
  }

  render() {
    const { classes } = this.props
    const { selectedOption, bookList  } = this.state
    console.log(bookList)
    return (
      <div className={classes.container}>
        <Select 
          value={selectedOption}
          onChange={this.handleSelect}
          onInputChange={this.handleChange}
          filterOption={this.handleFilter}
          placeholder='Bạn cần tìm gì nè'
          options={options}/>
      </div> 
    ) 
  }
}

export default withStyles(styles)(SearchBar)