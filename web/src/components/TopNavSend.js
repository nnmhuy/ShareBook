import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'

import colors from '../constants/colors'
import CustomTopNav from './CustomTopNav'
import { ReactComponent as BackIcon } from '../static/images/back-arrow.svg'

const styles = (theme => ({
    backButton: {
        marginLeft: 5
    },
    backIcon: {
        width: 14,
        height: 'auto',
    },
    submitButton: {
        fontWeight: 600,
        fontSize: 15,
        color: '#00D684',
        cursor: 'pointer',
        marginRight: 15
    },
    title: {
        fontWeight: 600,
        fontSize: 18,
        color: colors.primary,
    }
}))

const TopNav = (props) => {
    const { classes, children, handleSubmit, title, textSend } = props

    const handleBack = () => {
        window.history.back()
    }

    return (
        <CustomTopNav
            left={
                <IconButton className={classes.backButton} onClick={handleBack}>
                    <BackIcon fill={colors.primary} className={classes.backIcon} />
                </IconButton>
            }
            center={
                <span className={classes.title}>{title}</span>
            }
            right={
                <span className={classes.submitButton} onClick={handleSubmit}>{textSend}</span>
            }
        >
            {children}
        </CustomTopNav>
    )
}

export default withStyles(styles)(TopNav)

