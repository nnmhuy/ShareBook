import React, { Component } from 'react';
import ImagePlaceholder from '../../../static/images/image-placeholder.png';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import colors from '../../../constants/colors';
import { Dialog, DialogContent } from '@material-ui/core';

const styles = theme => ({
    wrapper: {
        display: 'inline-block',
        width: '100%',
        height: 140,
        position: 'relative',
        textAlign: 'center',
        margin: '30px 0'
    },
    image: {
        margin: 'auto',
        width: 100,
        height: 150,
        cursor: 'pointer'
    },
    imageModal: {
        width: '100%',
        height: '100%',
    },
    imageChoice: {
        display: 'flex',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
    },
    checkImg: {
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        color: colors.primary,
        margin: '0 5px 0 0'
    },
    changeImg: {
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        color: '#D75A4A',
        margin: '0 0 0 5px'
    },
    modal: {
        '& .MuiDialogContent-root': {
            width: '25vw',
            height: '40vw',
        }
    }
})

class ImageContainer extends Component {
    state = { visible: false, image: this.props.book.image, open: false };

    render() {
        const { classes, book } = this.props;
        return (
            <div className={classes.wrapper} >
                {
                    this.state.visible ?
                        <div>
                            <img src={this.state.image} alt='placeholder' className={classes.image} onClick={this.checkImg} />
                            <div className={classes.imageChoice}>
                                <p className={classes.checkImg} onClick={this.checkImg}>Xem</p>
                                <p className={classes.changeImg} onClick={this.changeImg}>Thay đổi</p>
                            </div>
                        </div>
                        :
                        <div>
                            <img src={ImagePlaceholder} alt='placeholder' className={classes.image} onClick={this.handleClick} />
                        </div>
                }
                <Dialog aria-labelledby="customized-dialog-title" open={this.state.open} className={classes.modal}>
                    <DialogContent>
                        <img src={this.state.image} alt='placeholder' className={classes.imageModal} />
                    </DialogContent>
                </Dialog>
            </div>

        );
    }
    handleClick = () => {
        this.setState({ visible: true });
    }
    checkImg = () => {
        this.setState({ open: false });
    }
    changeImg = () => {
        if (this.state.image === ImagePlaceholder) {
            this.setState({ image: this.props.book.image });
        } else {
            this.setState({ image: ImagePlaceholder });
        }

    }
}

export default connect()(withStyles(styles)(ImageContainer));