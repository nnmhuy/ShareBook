import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../../components/TabPanel';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

import ActivityButton from './ActivityButton';
import BookVertical from './BookVertical';
import BookHorizontal from './BookHorizontal';
import ReportList from './ReportList';
import TransactionList from './TransactionList';

import { ReactComponent as NotebookIcon } from '../../../static/images/notebook-btn.svg';
import { ReactComponent as BookmarkIcon } from '../../../static/images/bookmark-btn.svg';
import { ReactComponent as TransactionIcon } from '../../../static/images/transaction-btn.svg';
import { ReactComponent as ReportIcon } from '../../../static/images/report-btn.svg';

const styles = theme => ({
    container: {

    },
    tabBar: {
        '& .MuiTab-textColorInherit': {
            opacity: 1
        },
        '& .MuiTab-root': {
            padding: 0
        },
        '& .MuiTabs-indicator': {
            display: 'none'
        }
    }
})

const text = {
    book: {
        passed: 'Nơi bạn quản lí các cuốn sách bạn đã đăng hoặc đã được truyền tay tới.',
        owned: 'Nơi bạn quản lí các cuốn sách do chính tay bạn đăng và được truyền qua nhiều nơi.'
    },
    bookmark: 'Cùng lưu lại những cuốn sách mình muốn mượn/ thích nào!',
    transaction: 'Bắt đầu mượn sách thôi nào!',
    report: 'Nếu bạn gặp vấn đề gì cần giải đáp thì có thể click vào đây để nêu thắc mắc của bạn với ShareBook nhé!'
}

const theme = createMuiTheme({
    props: {
        MuiButtonBase: {
            disableRipple: true // No more ripple
        }
    }
});

const reportData = [
    {
        id: '1238abbd2',
        createdAt: '2019-03-29T00:00:00',
        status: 'pending'
    },
    {
        id: '1238abbd2',
        createdAt: '2019-03-29T00:00:00',
        status: 'answer'
    },
    {
        id: '1238abbd2',
        createdAt: '2019-03-29T00:00:00',
        status: 'resolved'
    },
    {
        id: '1238abbd2',
        createdAt: '2019-03-29T00:00:00',
        status: 'reject'
    }
]

class ActivityWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0
        }
    }

    handleChangeTab = (event, newTab) => {
        this.setState({
            currentTab: newTab
        })
    }

    render() {
        const { classes } = this.props;
        const { currentTab } = this.state;
        const bookTest = [];
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.container}>
                    <Tabs
                        value={currentTab}
                        onChange={this.handleChangeTab}
                        variant="fullWidth"
                        className={classes.tabBar}
                    >
                        <Tab label={<ActivityButton Icon={NotebookIcon} title='sách' bg='#FFDB46' txtColor={currentTab === 0 ? true : false} />} />
                        <Tab label={<ActivityButton Icon={BookmarkIcon} title='bookmark' bg='#007EFC' txtColor={currentTab === 1 ? true : false} />} />
                        <Tab label={<ActivityButton Icon={TransactionIcon} title='lịch sử' bg='#544EFF' txtColor={currentTab === 2 ? true : false} />} />
                        <Tab label={<ActivityButton Icon={ReportIcon} title='report' bg='#0A567E' txtColor={currentTab === 3 ? true : false} />} />
                    </Tabs>
                    <TabPanel index={0} value={currentTab} className={classes.wrapper}>
                        <BookHorizontal bookPassed={bookTest} bookOwned={bookTest} textNull={text.book} />
                    </TabPanel>
                    <TabPanel index={1} value={currentTab} className={classes.wrapper}>
                        <BookVertical bookmarked={bookTest} textNull={text.bookmark} />
                    </TabPanel>
                    <TabPanel index={2} value={currentTab} className={classes.wrapper}>
                        <TransactionList transactions={bookTest} textNull={text.transaction} />
                    </TabPanel>
                    <TabPanel index={3} value={currentTab} className={classes.wrapper}>
                        <ReportList report={reportData} />
                    </TabPanel>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default (withStyles(styles)(ActivityWrapper));
