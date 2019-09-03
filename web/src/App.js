import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

import LayoutWrapper from './components/LayoutWrapper'
import Home from './pages/Home/index'
import Counter from './pages/Counter/index'
import Account from './pages/Account/index'
import NotFound from './pages/NotFound/index'

import restConnector from './connectors/RestConnector'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  checkAuth = async() => {
    const { getUserInfo, history, location } = this.props
    if (localStorage.access_token) {
      // check valid token, if not => clear cookie, storage; show snackbars (end session); redirect to login
      const response = await restConnector.post('/validAccessToken', localStorage.access_token)
      if (response.status !== 200) {
        Cookies.remove('access_token')
        localStorage.clear()
        history.push('/account', { from: location })
      }
    } else {
      const access_token = Cookies.get('access_token')
      if (access_token) {
        const userId = Cookies.get('userId')
        localStorage.setItem('userId', userId)
        localStorage.setItem('access_token', access_token)
        restConnector.setAccessToken(access_token)
        getUserInfo()
      }
      // else not auth
    }
  }

  componentDidMount() {
    // this.checkAuth()
  }

  render() {
    const { account } = this.props
    return (
      <Router>
        <LayoutWrapper account={account}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/account" exact component={Account} />
                <Route path="/counter" exact component={Counter} />
                <Route component={NotFound}/>
            </Switch>
        </LayoutWrapper>
      </Router>
    )
  }
}

const mapStateToProps = ({ account }) => {
  return {
    account: account || {}
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
