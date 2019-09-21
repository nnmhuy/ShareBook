import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'

import colors from '../../../constants/colors'
import CustomTopNav from '../../../components/CustomTopNav'
import { ReactComponent as BackIcon } from '../../../static/images/back-arrow.svg'
import { bookDemoData } from '../../CategoryBookList/demoData'

const styles = (theme => ({
    backButton: {
        marginLeft: 5
    },
    backIcon: {
        width: 14,
        height: 'auto',
    },
    bookImage: {
        marginRight: 5,
        width: 30,
        height: 40,
    },
}))

const TopNav = (props) => {
    const { classes, children, book } = props

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
            right={
                <img src={book.image} alt={book.name} className={classes.bookImage} />
            }
        >
            {children}
        </CustomTopNav>
    )
}

export default withStyles(styles)(TopNav)

