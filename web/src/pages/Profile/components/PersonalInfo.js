import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import colors from '../../../constants/colors';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import { ReactComponent as FacebookIcon } from '../../../static/images/facebook.svg';


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
        marginBottom: 15,
        visibility: 'visible'
    },
    contentHidden: {
        visibility: 'hidden'
    },
    personalContent: {
        marginTop: 15,
        marginBottom: 5,
        height: '100%',
        visibility: 'visible',
        opacity: 1,
        transition: 'visibility 0s, opacity 0.4s linear'
    },
    personalContentHidden: {
        marginTop: 15,
        marginBottom: 5,
        height: 0,
        visibility: 'hidden',
        opacity: 0,
        transition: '0s'
    },
    input: {
        marginBottom: 15,
        width: '100%',
        '& .MuiInputBase-input': {
            paddingTop: 0,
            paddingBottom: 5,
        },
        '&.MuiInput-underline:after': {
            borderBottom: `1px solid ${colors.primary}`
        },
        '&:hover.MuiInput-underline:before': {
            borderBottom: `1px solid ${colors.primary}`
        }
    },
    map: {
        marginLeft: 15,
        fontWeight: 400,
        cursor: 'pointer',
        color: 'black',
        '&:hover': {
            color: colors.primary,
            textDecoration: 'underline'
        }
    },
    button: {
        fontFamily: 'Montserrat',
        fontWeight: 600,
        fontSize: 13,
        color: 'white',
        background: 'linear-gradient(to left, #0076ff 0%, #04abe8 100%)',
        margin: 'auto',
        display: 'block',
        padding: 4
    }
})

class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Nguyễn Ngọc Minh Huy',
            phoneNumber: '09090909090',
            homeLocation: '22 Trần Đình Xu, phường Cư Trinh, Quận 4, Thành phố Hồ Chí Minh',
            email: 'mhuy@e.mail'
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeAvatar = () => { }

    render() {
        const { classes, isEdit, isHidden } = this.props;
        const { name, homeLocation, phoneNumber, email } = this.state;
        return (
            <>
                <div className={classes.flexContainer}>
                    <Avatar src='' className={classes.avatar} onClick={this.changeAvatar} />
                    <div>
                        <div className={classes.flexContainer} style={{ marginBottom: 5 }}>
                            <p className={classes.titleNoMargin}>Tên tài khoản</p>
                            <FacebookIcon fill={colors.primary} height='12px' className={classes.pointer} />
                        </div>
                        <p className={classes.content}>Nguyễn Ngọc Minh Huy</p>
                        <p className={`${classes.titleNoMargin} ${classes.pointer}`}>Change password</p>
                    </div>
                </div>

                {
                    !isEdit &&
                    <div className={`${isHidden ? `${classes.personalContentHidden}` : `${classes.personalContent}`}`}>
                        <p className={classes.title}>Họ và tên</p>
                        <p className={classes.content}>{name}</p>
                        <p className={classes.title}>Địa chỉ
                            <span className={classes.map}>Bản đồ</span>
                        </p>
                        <p className={classes.content}>{homeLocation}</p>
                        <p className={classes.title}>Số điện thoại</p>
                        <p className={classes.content}>{phoneNumber}</p>
                        <p className={classes.title}>Email</p>
                        <p className={classes.content}>{email}</p>
                    </div>
                }
                {
                    isEdit &&
                    <div className={`${isHidden ? `${classes.personalContentHidden}` : `${classes.personalContent}`}`}>
                        <p className={classes.title}>Họ và tên</p>
                        <Input name='name' value={name} className={classes.input} onChange={this.handleChange} />

                        <p className={classes.title}>Địa chỉ
                            <span className={classes.map}>Bản đồ</span>
                        </p>
                        <Input name='homeLocation' value={homeLocation} className={classes.input} onChange={this.handleChange} />

                        {/* error SDT */}
                        <p className={classes.title}>Số điện thoại</p>
                        <Input name='phoneNumber' value={phoneNumber} className={classes.input} onChange={this.handleChange} />

                        {/* error Email */}
                        <p className={classes.title}>Email</p>
                        <Input name='email' value={email} className={classes.input} onChange={this.handleChange} />
                        <Button className={classes.button}>Sửa</Button>
                    </div>
                }
            </>
        );
    }
}

export default withStyles(styles)(PersonalInfo);