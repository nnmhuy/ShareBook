import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

import PaperWrapper from './PaperWrapper';
import CoinInfo from './CoinInfo';
import ActivityWrapper from './ActivityWrapper';
import colors from '../../../constants/colors';



const styles = theme => ({
    wrapper: {
        position: 'relative',
        padding: '10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        margin: 0,
        color: colors.primary,
        fontSize: 12,
        fontWeight: 500,
        cursor: 'pointer',
        textDecoration: 'none'
    },
    content: {
        margin: 0,
        color: 'black',
        marginLeft: 15
    }
})

const AccountTab = (props) => {
    const { classes, account } = props;
    return (
        <div>
            <Paper className={classes.wrapper}>
                <Link className={classes.title}>Người theo dõi<span className={classes.content}>200</span></Link>
                <Link className={classes.title}>Đang theo dõi<span className={classes.content}>240</span></Link>
            </Paper>
            <br />
            <PaperWrapper layout='info' account={account}/>
            <br />
            <PaperWrapper layout='bio' account={account}/>
            <br />
            <CoinInfo />
            <br />
            <ActivityWrapper />
        </div>
    )
}

export default (withStyles(styles)(AccountTab));
