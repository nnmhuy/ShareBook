import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    IconButton,
    SwipeableDrawer
} from '@material-ui/core'



import colors from '../../../constants/colors'
import { ReactComponent as MenuIcon } from '../../../static/images/menu.svg'
import { ReactComponent as SettingIcon } from '../../../static/images/settings.svg'
import HideOnScroll from '../../../components/HideOnScroll';
import Sidebar from '../../../components/Sidebar';

const styles = (theme) => ({
    wrapper: {
        width: '100%',
        height: '100%'
    },
    appBar: {
        height: 50,
    },
    toolBar: {
        height: 50,
        paddingLeft: 0,
        paddingRight: 0,
        minHeight: 'unset',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        color: colors.primary
    },
    menuButton: {
        zIndex: 100,
        borderRadius: 0,
        height: '100%',
    },
    menuIcon: {
        height: 20,
        width: 'auto'
    },
    title: {
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontWeight: 600,
        fontSize: 18,
    },
    icon: {
        height: 25,
        width: 'auto',
        marginLeft: 5
    },
    loginButton: {
        position: 'absolute',
        right: 5,
        top: 0,
        bottom: 0,
        width: 110,
        display: 'flex',
        alignItems: 'center',
        textTransform: 'unset',
        color: colors.primary,
        fontWeight: 600,
        fontSize: 14,
    },
    rightSection: {
        position: 'absolute',
        right: 10,
        display: 'flex',
        alignItems: 'center'
    },
    contentWrapper: {
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        paddingTop: 50
    },
    link: {
        textDecoration: 'unset',
        lineHeight: 0
    },
})

const TopNav = (props) => {
    const { classes, children, title, account } = props
    const { pathname } = props.location
    const [isSidebarExpanding, setSidebarExpanding] = React.useState(false)

    const toggleSidebar = (value) => () => {
        setSidebarExpanding(value)
    }

    return (
        <div className={classes.wrapper}>
            <HideOnScroll>
                <AppBar position='fixed' className={classes.appBar}>
                    <Toolbar className={classes.toolBar}>
                        <IconButton onClick={toggleSidebar(true)} className={classes.menuButton}>
                            <MenuIcon className={classes.menuIcon} />
                        </IconButton>
                        <span className={classes.title}>
                            {title}
                        </span>
                        <div className={classes.rightSection}>
                            <Link to='/preferences' className={classes.link} >
                                <SettingIcon fill={colors.primary} className={classes.icon} />
                            </Link>
                        </div>

                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <SwipeableDrawer
                open={isSidebarExpanding}
                onClose={toggleSidebar(false)}
                onOpen={toggleSidebar(true)}
                className={classes.sidebarWrapper}
            >
                <Sidebar toggleSidebar={toggleSidebar} account={account} currentPathname={pathname} />
            </SwipeableDrawer>
            <div className={classes.contentWrapper}>
                {children}
            </div>
        </div>
    )
}

export default withRouter(withStyles(styles)(TopNav))