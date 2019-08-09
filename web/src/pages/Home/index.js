import React from 'react'
import { connect } from 'react-redux';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h1>ShareBook.org.vn</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
