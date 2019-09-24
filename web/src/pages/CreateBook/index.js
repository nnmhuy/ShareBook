import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';

import { demoBook, typeOfBook } from './demoData'

import ImageContainer from './components/ImageContainer';

import TopNavSend from '../../components/TopNavSend';
import InputPanel from './components/InputPanel';

const styles = theme => ({
    container: {
        width: '100%',
        minWidth: 350,
        maxWidth: 500,
        margin: 'auto',
        boxSizing: 'border-box',
        padding: '0 20px'
    }
})

class CreateBook extends Component {

    render() {
        const { classes } = this.props;
        return (
            <TopNavSend title='Tạo sách mới' textSend='Đăng'>
                <div className={classes.container}>
                    <ImageContainer book={demoBook} />
                    <InputPanel typeOfBook={typeOfBook} />
                </div>
            </TopNavSend>
        );
    }
}

export default connect()(withStyles(styles)(CreateBook));