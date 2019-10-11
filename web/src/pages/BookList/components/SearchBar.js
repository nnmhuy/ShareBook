import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import axios from 'axios'

import filterText from '../../../helper/filterText'
import AsyncSelect from 'react-select/async';
import Loading from '../../../components/Loading'
import { warnAlert } from '../../../components/alert'

import { baseURL } from '../../../constants/constants'

const styles = (theme => ({
  container: {
    width: '100%',
    margin: 5,
    marginRight: 10,
    zIndex: 100
  }
}))

const defaultOption = {label:'Thêm sách mới cho ShareBook', value:'/create-book'}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ultraWaiting: false,
      bookListOption: [defaultOption],
      loadOptions: null,
      updatedAtForSearch: null
    }
    this._debouncedQueryList = _.debounce(this.handleChange, 500)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.bookSearch) {
      if (state.loadOptions && !_.isEqual(props.updatedAtForSearch, state.updatedAtForSearch) && props.updatedAtForSearch) {
        let newBookList = props.bookSearch.map(book => {
          let label = book.name + ` (${book.author})`
          let value = `/book-detail/${book.id}`
          return {label, value, ...book}
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
    let filterInputText = filterText(inputText)
    let where = {}
    if (this.props.where) {
      where = {
        ...this.props.where, 
        searchValue: {like: filterInputText}
      }
    } else {
      where = {
        searchValue: {like: filterInputText}
      }
    }
    this.props.getBookSearchHandler({
      limit: 5,
      where: where,
      fullText: inputText,
      fields: {id: true, name: true, author: true},
      order: 'numberOfRating DESC'
    });
  }
  

  handleSelect = (selectedOption) => {
    let currentThis = this
    if (selectedOption.value){
      if (!selectedOption.fromGG) {
        this.props.history.push(selectedOption.value)
      } else {
        this.setState({ultraWaiting: true})
        axios.post(`${baseURL}/books/createBySearch`, {
          data: selectedOption
        })
        .then(function (response) {
          currentThis.setState({ultraWaiting: false})
          let bookId = _.get(response, 'data.newBook.id')
          currentThis.props.history.push(`/book-detail/${bookId}`)
        })
        .catch(function (error) {
          currentThis.setState({ultraWaiting: false})
          warnAlert('Xin lỗi bạn nha, sách này đang bị lỗi')
        });
      }
    }
  }

  reloadOption = (inputValue, callback) => {
    this.setState({loadOptions: callback})
    this._debouncedQueryList(inputValue)
  };

  render() {
    const { classes } = this.props
    const last = this.state.bookListOption.slice(-1)[0];
    return (
      <div className={classes.container}>
        <Loading isLoading={this.state.ultraWaiting}/>
        <AsyncSelect
          onChange={this.handleSelect}
          loadOptions={this.reloadOption}
          cacheOptions
          // defaultOptions={this.state.bookListOption}
          placeholder='Tìm sách cùng ShareBook'
          defaultValue={last}
        />
      </div> 
    ) 
  }
}

export default withStyles(styles)(SearchBar)