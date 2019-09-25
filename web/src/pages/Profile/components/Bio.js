import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import colors from '../../../constants/colors';

const styles = theme => ({
    wrapper: {
        position: 'relative',
        padding: '10px 20px'
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        width: 65,
        height: 65,
        marginRight: 15,
        cursor: 'pointer'
    },
    pointer: {
        cursor: 'pointer'
    },
    title: {
        margin: 0,
        marginBottom: 5,
        color: colors.primary,
        fontSize: 12,
        fontWeight: 500,
        visibility: 'visible'
    },
    titleHidden: {
        visibility: 'hidden'
    },
    titleNoMargin: {
        margin: 0,
        color: colors.primary,
        fontSize: 12,
        fontWeight: 500
    },
    content: {
        margin: 0,
        visibility: 'visible',
        height: '100%',
        opacity: 1,
        transition: 'visibility 0s, opacity 0.4s linear'
    },
    contentHidden: {
        margin: 0,
        visibility: 'hidden',
        height: 0,
        opacity: 0,
        transition: '0s'
    },
    counter: {
        margin: 0,
        textAlign: 'right',
        fontSize: 12
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
    }
})

class Bio extends Component {

    constructor(props) {
        super(props);
        let bio = 'This is my bio';
        let count = 0;
        if (bio !== '' || bio !== null) {
            count = bio.length;
        }

        this.state = {
            bio,
            count,
            finalBio: [...bio]
        }
    }

    countText = (e) => {
        let length = e.target.value.length;

        this.setState({
            count: length,
            bio: e.target.value,
            finalBio: e.target.value
        })


    }

    render() {
        const { classes, isHidden, isEdit } = this.props;
        const { count, bio, finalBio } = this.state;
        return (
            <>
                <p className={classes.title}>Bio</p>
                {
                    !isEdit &&
                    <div className={`${isHidden ? `${classes.contentHidden}` : `${classes.content}`}`}>
                        {finalBio}
                    </div>
                }
                {
                    isEdit &&
                    <div className={`${isHidden ? `${classes.contentHidden}` : `${classes.content}`}`}>
                        <textarea
                            className={classes.inputTextArea}
                            placeholder={bio === '' || bio === null ? 'Giới thiệu . . .' : ''}
                            name='bio'
                            value={bio}
                            onChange={this.countText}
                            maxLength='300'
                        />
                        {/* {value !== '' ? value.split(' ').length : 0} */}
                        <p className={classes.counter}>{count}/300</p>
                    </div>
                }
            </>
        );
    }
}

export default (withStyles(styles)(Bio));