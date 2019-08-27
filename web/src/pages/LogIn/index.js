import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import ModeTab from './components/ModeTab'

import Background from '../../static/images/bg-login-mobile.png'

const styles = (theme => ({
  container: {
    height: '100%',
    minHeight: 600,
    minWidth: 350,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `linear-gradient(rgba(37, 88, 185, 0.8) 0%, rgba(6, 39, 47, 0.73) 100%), url(${Background})`,
    backgroundSize: 'contain'
  },
  title: {
    margin: 10,
    fontWeight: 500,
    fontSize: 33,
    textAlign: 'center',
    color: '#fff'
  },
  introText: {
    fontWeight: 500,
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
  }
}))

class LogIn extends React.Component {
  constructor(props) {
    super(props)
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
    const { classes } = this.props
    const { currentTab } = this.state
    return (
      <div className={classes.container}>
        <div>
          <h1 className={classes.title}>Đăng ký</h1>
          <p className={classes.introText}>Xin chào, mời bạn tạo tài khoản <br/>và trở thành 1 người bạn đồng hành sách.</p>
        </div>
        <ModeTab currentTab={currentTab} handleChangeTab={this.handleChangeTab}/>
      </div>
    )
  }
}

const mapStateToProps = ({ state }) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LogIn));