import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Button } from '@material-ui/core'

import ImageContainer from '../CreateBook/components/ImageContainer';
import TopNavSend from '../../components/TopNavSend';
import InputPanel from '../CreateBook/components/InputPanel';
import Loading from '../../components/Loading';

import { createBook, getCategoryList } from '../../redux/actions/bookAction'
import { uploadImagePromise } from '../../helper/uploadImage'
import colors from '../../constants/colors'

const styles = theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    maxWidth: 500,
    margin: 'auto',
    boxSizing: 'border-box',
    padding: '0 20px'
  },
  button: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
    background: colors.primary,
    color: '#fff'
  }
})

class EditBook extends Component {
  componentDidMount() {
    const { getCategories } = this.props
    getCategories({ skipAllBook: true })
  }
  render() {
    const { classes, handleSubmit, handleBlur,
      values, errors, handleChange, setFieldValue, isSubmitting,
      categoryIsLoading, categoryList, touched
    } = this.props;

    return (
      <TopNavSend title='Chỉnh sửa sách' textSend='Lưu' handleSubmit={handleSubmit}>
        <Loading isLoading={values.isImageLoading || isSubmitting || categoryIsLoading} />
        <div className={classes.container}>
          <ImageContainer
            image={values.image}
            setFieldValue={setFieldValue}
            error={errors.image}
          />
          <InputPanel
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            categoryList={categoryList}
            touched={touched}
          />
          <Button
            className={classes.button}
            onClick={handleSubmit}
            disableFocusRipple
          >
            Lưu
					</Button>
        </div>
      </TopNavSend>
    );
  }
}

const CreateBookWithFormik = withFormik({
  mapPropsToValues: (props) => {
    let bookDetail = props.bookDetail
    let bookType = 'single'
    if (bookDetail && bookDetail.volume && bookDetail.volume > -1)
      bookType = 'multiple'
    return {
      name: bookDetail.name,
      image: bookDetail.image,
      author: bookDetail.author,
      categoryId: bookDetail.categoryId,
      bookType: bookType,
      volume: bookDetail.volume,
      numberOfPages: bookDetail.numberOfPages,
      publisher: bookDetail.publisher,
      publishYear: bookDetail.publishYear,
      price: bookDetail.price,
      description: bookDetail.description
    }
  },

  validate: (values) => {
    let errors = {}
    if (!values.name) {
      errors.name = 'Cần nhập tên sách'
    }
    if (!values.author) {
      errors.author = 'Cần nhập tên tác giả'
    }
    if (!values.image) {
      errors.image = 'Cần đăng hình cho quyển sách'
    }
    if (!values.categoryId) {
      errors.categoryId = 'Cần chọn thể loại cho quyển sách'
    }
    return errors
  },

  handleSubmit: async (values, { setSubmitting, props }) => {
    const {
      isSubmitting,
      createNewBook
    } = props

    if (isSubmitting || values.isLoadingImage) return

    setSubmitting(true)

    const { name, author, image, bookType, volume, numberOfPages,
      publisher, publishYear, price, description, categoryId
    } = values

    const imagesUrl = await uploadImagePromise(image)

    let data = {
      name,
      author,
      image: imagesUrl,
      categoryId,
      volume,
      numberOfPages,
      publisher,
      publishYear,
      price,
      description
    }

    if (!bookType || bookType === 'single') {
      delete data.volume
    }
    if (!numberOfPages) delete data.numberOfPages
    if (!publishYear) delete data.publishYear
    if (!price) delete data.price

    createNewBook(data)
    setSubmitting(false)
  }
})(withStyles(styles)(EditBook))

const mapStateToProps = ({ book }) => {
  return {
    userId: localStorage.getItem('userId'),
    book: book.bookLite,
    categoryList: book.categoryList,
    categoryIsLoading: book.categoryIsLoading,
    isLoadingBookLite: book.isLoadingBookLite,
    isLoading: book.isLoading,
    bookDetail: book.bookDetail,
    category: book.category,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createNewBook: createBook,
  getCategories: getCategoryList
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateBookWithFormik);