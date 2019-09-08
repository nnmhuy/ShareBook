import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LayoutWrapper from './components/LayoutWrapper'
import Home from './pages/Home/index'
import Counter from './pages/Counter/index'
import Account from './pages/Account/index'
import NotFound from './pages/NotFound/index'
import {getUserInfo} from './redux/actions/accountAction'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    // this.checkAuth()
    this.props.getUserInfoHandler();
  }

  render() {
    const { account } = this.props
    return (
      <div>
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
        <ToastContainer></ToastContainer>
      </div>
    )
  }
}

const mapStateToProps = ({ account }) => {
  return {
    account: account || {}
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserInfoHandler: getUserInfo
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
