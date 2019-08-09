import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './pages/Home/index'
import Counter from './pages/Counter/index'


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
          <Route path="/" exact component={Home} />
          <Route path="/counter" component={Counter} />
        </div>
      </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
