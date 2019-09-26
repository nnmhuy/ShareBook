import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import filterText from '../../../helper/filterText'
import AsyncSelect from 'react-select/async';

const styles = (theme => ({
  container: {
    width: '100%',
    margin: 5,
    marginRight: 10
  }
}))

const defaultOption = {label:'Thêm sách cho ShareBook', value:'/create-book'}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookListOption: [defaultOption],
      loadOptions: null,
      updatedAtForSearch: null
    }
    this._debouncedQueryList = _.debounce(this.handleChange, 500)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.bookList) {
      if (state.loadOptions && !_.isEqual(props.updatedAtForSearch, state.updatedAtForSearch) && props.updatedAtForSearch) {
        let newBookList = props.bookList.map(book => {
          let label = book.name + ` (${book.author})`
          let value = `/book-detail/${book.id}`
          return {label, value}
        })
        newBookList.push(defaultOption)
        state.loadOptions(newBookList)
        return {
          bookListOption: newBookList,
          updatedAtForSearch: props.updatedAtForSearch
        }
      } 
    }
    return null
  }

  handleChange = inputText => {
    inputText = filterText(inputText)
    this.props.getBookListHandler({key:'search-total',
      limit: 10,
      where: { searchValue: {like: inputText} },
      lite: true,
      fields: {id: true, name: true, author: true},
      order: 'numberOfRating DESC'
    });
  }
  

  handleSelect = selectedOption => {
    if (selectedOption.value){
      this.props.history.push(selectedOption.value)
    }
  }

  reloadOption = (inputValue, callback) => {
    this.setState({loadOptions: callback})
    this._debouncedQueryList(inputValue)
  };

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <AsyncSelect
          onChange={this.handleSelect}
          loadOptions={this.reloadOption}
          // defaultOptions={this.state.bookListOption}
          placeholder='Tìm sách cùng ShareBook'/>
      </div> 
    ) 
  }
}

export default withStyles(styles)(SearchBar)