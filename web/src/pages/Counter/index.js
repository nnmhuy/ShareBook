import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { increaseCounter, decreaseCounter, setCounter } from '../../actions/counter'


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

  render() {
    const { inputValue } = this.state
    const { counterValue, increaseCounter, decreaseCounter, setValueCounter } = this.props

    return (
      <div>
        <p>Counter for testing redux</p>
        <div>
          <button onClick={decreaseCounter}>-</button>
          <span>{counterValue}</span>
          <button onClick={increaseCounter}>+</button>
        </div>
        <div>
          <input 
            type='number' 
            value={inputValue}
            onChange={this.handleInputChange}
          ></input>
          <button onClick={() => setValueCounter(inputValue)}>Set</button>
        </div>
      </div>
    )
  }


}

const mapStateToProps = ({ counter }) => {
  return {
    counterValue: counter.value
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  increaseCounter,
  decreaseCounter,
  setValueCounter: setCounter
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
