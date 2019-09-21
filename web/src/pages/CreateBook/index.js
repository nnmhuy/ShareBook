import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';

import { demoBook, typeOfBook } from './demoData'

import ImageContainer from './components/ImageContainer';

import TopNav from './components/TopNav';
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
            <TopNav title='Tạo sách mới'>
                <div className={classes.container}>
                    <ImageContainer book={demoBook} />
                    <InputPanel typeOfBook={typeOfBook} />
                </div>
            </TopNav>
        );
    }
}

export default connect()(withStyles(styles)(CreateBook));