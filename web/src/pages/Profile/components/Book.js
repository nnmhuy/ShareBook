import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import bookimg from '../../../static/images/demo/escape_velocity.png';

import { ReactComponent as BookmarkedIcon } from '../../../static/images/bookmarked.svg';
import { ReactComponent as BookmarkIcon } from '../../../static/images/bookmark.svg';
import Image from '../../../components/Image';

const styles = theme => ({
    container: {
        height: 200,
        width: 'fit-content'
    },
    imageContainer: {
        height: 150,
        width: 100
    },
    image: {
        height: 150,
        width: 100
    },
    bookmark: {

    }
})

class Book extends Component {
    render() {
        const { classes, bookmarked, textNull } = this.props;
        const name = 'Animal farm';
        const id = 12;
        return (
            <div>
                <Link to={`/book-detail/${id}`} className={classes.imageContainer}>
                    <Image src={bookimg} alt={name} className={classes.image} />
                </Link>
            </div>
        );
    }
}

export default (withStyles(styles)(Book));