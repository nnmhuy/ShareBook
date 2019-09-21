import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import TopNav from '../CreateBook/components/TopNav';
import BookInfo from './components/BookInfo';
import { demoBook } from './demoData';
import InputPane from './components/InputPane';

const styles = theme => ({
    container: {
        width: '100%',
        minWidth: 350,
        maxWidth: 500,
        margin: 'auto',
        boxSizing: 'border-box',
        padding: '20px'
    }
})

class CreateInstance extends Component {
    render() {
        const { classes, match } = this.props;
        const bookId = match.params.bookId;

        return (
            <TopNav title='Thêm sách'>
                <div className={classes.container}>
                    <BookInfo book={demoBook} />
                    <InputPane />
                </div>
            </TopNav>
        );
    }
}

export default connect()(withStyles(styles)(CreateInstance));