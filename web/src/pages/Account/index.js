import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import LayoutWrapper from '../../components/LayoutWrapper'
import ModeTab from './components/ModeTab'
import { Redirect } from 'react-router'

import BackgroundDesktop from '../../static/images/../../static/images/bg-login.png'
import BackgroundMobile from '../../static/images/bg-login-mobile.png'

import { getUserInfo } from '../../redux/actions/accountAction'

const styles = (theme => ({
  container: {
    height: '100%',
    minHeight: 600,
    minWidth: 350,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `linear-gradient(rgba(37, 88, 185, 0.8) 0%, rgba(6, 39, 47, 0.73) 100%), url(${BackgroundDesktop})`,
    [theme.breakpoints.down('xs')]: {
      backgroundImage: `linear-gradient(rgba(37, 88, 185, 0.8) 0%, rgba(6, 39, 47, 0.73) 100%), url(${BackgroundMobile})`,      
    },
    backgroundSize: 'contain'
  },
  title: {
    fontWeight: 500,
    fontSize: 33,
    textAlign: 'center',
    color: '#fff',
    margin: 0,
  },
  introText: {
    fontWeight: 500,
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    margin: 0
  }
}))

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        currentTab: 1
    }
  }

  componentDidMount() {
    this.props.getUserInfoHandler();
  }

  handleChangeTab = (event, newTab) => {
    this.setState({
      currentTab: newTab
    })
  }

  render() {
    const { classes, isAuth, account } = this.props
    const { currentTab } = this.state
    if (isAuth)
      return <Redirect to="/book-list" />
    return (
      <LayoutWrapper title='Account' account={account}>
        <div className={classes.container}>
          {(currentTab===0) ? 
            <div>
              <h1 className={classes.title}>Đăng ký</h1>
              <p className={classes.introText}>Xin chào, mời bạn tạo tài khoản <br/>và trở thành 1 người bạn đồng hành sách.</p>
            </div>
            :
            <div>
              <h1 className={classes.title}>Đăng nhập</h1>
              <p className={classes.introText}>Chào mừng bạn trở lại với <br/> cộng đồng chia sẻ sách của ShareBook</p>
            </div>
          }
          <ModeTab 
            currentTab={currentTab} 
            handleChangeTab={this.handleChangeTab} 
          />
        </div>
      </LayoutWrapper>
    )
  }
}

const mapStateToProps = ({ account }) => {
  return {
    account: {
      isAuth: account.isAuth,
      userId: account.userId,
      username: account.username,
      name: account.name,
      avatar: account.avatar,
      coin: account.coin,
    },
    isAuth: account.isAuth
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserInfoHandler: getUserInfo,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account));