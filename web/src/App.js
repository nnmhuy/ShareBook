import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Home from './pages/Home/index'
import Counter from './pages/Counter/index'
import NotFound from './pages/NotFound/index'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/counter" exact component={Counter} />
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
