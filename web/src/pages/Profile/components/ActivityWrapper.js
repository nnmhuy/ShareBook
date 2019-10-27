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

import { ReactComponent as NotebookIcon } from '../../../static/images/notebook-btn.svg';
import { ReactComponent as BookmarkIcon } from '../../../static/images/bookmark-btn.svg';
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
		passed: 'Nơi bạn quản lí các cuốn sách bạn đã đăng hoặc đã được truyền tay tới. (Tính năng đang được hoàn thiện, xin lỗi nha)',
		owned: 'Nơi bạn quản lí các cuốn sách do chính tay bạn đăng và được truyền qua niều nơi. (Tính năng đang được hoàn thiện, xin lỗi nha)'
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

class ActivityWrapper extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentTab: 0,
			clicked: [false, false, false, false]
		}
	}

	handleChangeTab = (event, newTab) => {
		this.setState({
			currentTab: newTab
		})
	}

	handleClickedTab = (curTab) => {
		let temp = [false, false, false, false];
		temp[curTab] = true
		this.setState({
			clicked: temp
		})
	}

	render() {
		const { classes, handleToggleBookmark, bookmarked,
			// isLoadingBookmarkedLite, userId
		} = this.props;
		const { currentTab } = this.state;
		// const { clicked } = this.state;
		const bookTest = [];
		
		// const getBookmarkedBooks = (curTab) => {
		// 	if (clicked[curTab] === false) {
		// 		this.handleClickedTab(curTab)
		// 		getBookmarked({userId})
		// 	} else {
		// 		return
		// 	}
		// }

		return (
			<MuiThemeProvider theme={theme}>
				<div className={classes.container}>
					<Tabs
						value={currentTab}
						onChange={this.handleChangeTab}
						variant="fullWidth"
						className={classes.tabBar}
					>
						<Tab label={<ActivityButton
							Icon={NotebookIcon} title='sách'
							bg='#FFDB46'
							txtColor={currentTab === 0 ? true : false} />} />
						<Tab label={<ActivityButton 
							Icon={BookmarkIcon} title='bookmark'
							bg='#007EFC'
							txtColor={currentTab === 1 ? true : false} />} />
						<Tab label={<ActivityButton
							Icon={ReportIcon} title='report'
							bg='#0A567E'
							txtColor={currentTab === 2 ? true : false} />} />
					</Tabs>
					<TabPanel index={0} value={currentTab} className={classes.wrapper}>
						<BookHorizontal bookPassed={bookTest} bookOwned={bookTest} textNull={text.book} />
					</TabPanel>
					<TabPanel index={1} value={currentTab} className={classes.wrapper}>
						<BookVertical handleToggleBookmark={handleToggleBookmark} bookmarked={bookmarked} textNull={text.bookmark}
							// isLoadingBookmarkedLite={isLoadingBookmarkedLite}
						/>
					</TabPanel>
					<TabPanel index={2} value={currentTab} className={classes.wrapper}>
						<ReportList report={bookTest} textNull={text.report} />
					</TabPanel>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default (withStyles(styles)(ActivityWrapper));
