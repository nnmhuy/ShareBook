import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import TopNav from './components/TopNav'
import MessageSection from './components/MessageSection'
import InputSection from './components/InputSection'

import socket from '../../connectors/Socket'

const styles = (theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    maxWidth: 800,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  messagesContainer: {
    width: '100%',
    flex: 1,
    paddingBottom: 55
  }
}))

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    const { match } = this.props
    const { transactionId } = match.params
    socket.emit('connect to transaction', { transactionId })
  }

  handleSend = () => {
    const { value } = this.state
    // sendMessage(value)
    this.setState(({
      value: ''
    }))
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state
    return (
      <TopNav>
        <div className={classes.container}>
          <div className={classes.messagesContainer}>
            <MessageSection />
          </div>
          <InputSection
            value={value}
            handleChange={this.handleChange}
            handleSend={this.handleSend}/>
        </div>
      </TopNav>
    )
  }
}

const mapStateToProps = ({ state, account }) => {
  return {
    account: {
      isAuth: !!(localStorage.getItem('isAuth')),
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      name: localStorage.getItem('name'),
      avatar: localStorage.getItem('avatar'),
      coin: Number.parseInt(localStorage.getItem('coin')),
    },
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Transaction));
