import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import './style.css'

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: 0
    }
  }

  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value
    })
  }

  handleSet = (inputValue) => () => {
    const { setCounter } = this.props
    setCounter(inputValue)
  }

  render() {
    return (
      <div>
        <ul id="messages"></ul>
        <form action="">
          <input id="m" autocomplete="off" /><button>Send</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
