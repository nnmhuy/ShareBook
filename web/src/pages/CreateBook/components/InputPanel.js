import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import colors from '../../../constants/colors';

import FormGroupInput from './FormGroupInput';
import RadioButtons from '../../../components/RadioButtons';

const styles = theme => ({
    title: {
        fontWeight: 500,
        fontSize: 12,
        color: colors.primary,
        margin: 0
    },
    inputTextArea: {
        fontFamily: 'Montserrat',
        resize: 'vertical',
        boxSizing: 'border-box',
        padding: 5,
        display: 'block',
        width: '100%',
        height: 150,
        minHeight: 50,
        maxHeight: 250,
        margin: '10px 0',
        lineHeight: 1.5,
        fontSize: 14,
        border: `1px solid ${colors.gray}`,
        '&:focus': {
            borderColor: colors.primary,
            outline: 'none'
        },
        '&:hover': {
            borderColor: colors.primary,
            outline: 'none'
        }

    },
    hidden: {
        visibility: 'hidden'
    }
})

const errors = {
    bookName: '* Bạn chưa nhập tên sách',
    author: '* Bạn chưa nhập tên tác giả',
    volume: '* Bạn chưa nhập số lượng',
    publisher: '* Bạn chưa nhập nhà xuất bản',
    year: '* Bạn chưa nhập năm xuất bản',
    pages: '* Bạn chưa nhập số trang',
    price: '* Bạn chưa nhập giá tiền',
}

class InputPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volumeDis: true
        }
    }

    render() {
        const { classes, typeOfBook } = this.props;
        return (
            <form>
                <FormGroupInput
                    id='book-name'
                    name='name'
                    type='text'
                    error={errors.bookName}
                    label='Tên sách'
                />
                <FormGroupInput
                    id='book-author'
                    name='author'
                    type='text'
                    error={errors.author}
                    label='Tác giả'
                />
                <RadioButtons mb='15px' name="type" label="Loại sách" attrs={typeOfBook} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormGroupInput
                        id='book-volume'
                        label='Volume'
                        name='volume'
                        type='number'
                        error={errors.volume}
                        disabled={this.state.volumeDis}
                    />
                    <div style={{ margin: '0 10px' }} />
                    <FormGroupInput
                        id='book-pages'
                        label='Số trang'
                        name='number_of_pages'
                        error={errors.pages}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormGroupInput
                        id='book-publisher'
                        label='Nhà xuất bản'
                        name='publisher'
                        type='text'
                        error={errors.publisher}
                    />
                    <div style={{ margin: '0 10px' }} />
                    <FormGroupInput
                        id='book-year'
                        label='Năm xuất bản'
                        name='publish_year'
                        type='year'
                        error={errors.year}
                    />
                </div>
                <FormGroupInput
                    id='book-price'
                    label='Giá thị trường'
                    name='price'
                    error={errors.price}
                />
                <label className={classes.title}>
                    Giới thiệu sách
                    <textarea
                        className={classes.inputTextArea}
                        placeholder='Sách kể về . . .'
                        name='content'
                    />
                </label>
            </form>
        );
    }
}

export default connect()(withStyles(styles)(InputPanel));