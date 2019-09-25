import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import colors from '../../../constants/colors';

import { ReactComponent as CoinIcon } from '../../../static/images/coin.svg';
import Background1 from '../../../static/images/coin-btn-1.png';
import Background2 from '../../../static/images/coin-btn-2.png';
import CoinButton from './CoinButton';

const styles = theme => ({
    wrapper: {
        position: 'relative',
        padding: '15px 20px'
    },
    title: {
        margin: 0,
        marginBottom: 15,
        color: colors.primary,
        fontSize: 14,
        fontWeight: 500
    },
    titleCoin: {
        fontSize: 12,
        marginBottom: 5
    },
    content: {
        color: 'black',
        fontSize: 16,
        marginLeft: 30,
        display: 'inline-flex',
        alignItems: 'center'
    },
    icon: {
        marginLeft: 5,
        height: 20
    }
})

class CoinInfo extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.wrapper}>
                <p className={classes.title}>
                    Book XU
                    <span className={classes.content}>
                        2000
                        <CoinIcon className={classes.icon} />
                    </span>
                </p>
                <p className={`${classes.title} ${classes.titleCoin}`}>
                    Cùng kiếm thêm Book Xu nào!
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <CoinButton bgCoin={Background1} title='cho mượn' />
                    <CoinButton bgCoin={Background2} title='ghi review' />
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(CoinInfo);