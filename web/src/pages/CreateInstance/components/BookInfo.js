import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import colors from '../../../constants/colors';

import Image from '../../../components/Image'

const styles = theme => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    image: {
        width: 100,
        height: 140,
        marginRight: 20
    },
    bookInfo: {
        marginLeft: 20
    },
    title: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: 500,
        margin: 0,
        marginBottom: 5
    },
    titleContext: {
        margin: 0,
        marginBottom: 10
    }
})

class BookInfo extends Component {
    render() {
        const { classes } = this.props;
        const { name, image, author, publisher } = this.props.book;
        return (
            <div className={classes.wrapper}>
                <Image src={image} alt={name} className={classes.image} />
                <div className={classes.bookInfo}>
                    <div>
                        <p className={classes.title}>Tên sách</p>
                        <p className={classes.titleContext}>{name}</p>
                    </div>
                    <div>
                        <p className={classes.title}>Tên tác giả</p>
                        <p className={classes.titleContext}>{author}</p>
                    </div>
                    <div>
                        <p className={classes.title}>Nhà xuất bản</p>
                        <p className={classes.titleContext}>{publisher}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(withStyles(styles)(BookInfo));