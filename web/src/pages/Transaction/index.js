import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'

import TopNav from './components/TopNav'
import Loading from '../../components/Loading'
import MessageSection from './components/MessageSection'
import InputSection from './components/InputSection'
import { numberOfMessagesPerLoad } from '../../constants/constants'

import { 
  sendMessage,
  getTransaction,
  appendMessage,
  getMessages
} from '../../redux/actions/transactionAction'
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
      value: '',
      rendered: false
    }
  }

  componentDidMount() {
    const { match, getTransactionInfo, account, receive } = this.props
    const { userId } = account
    const { transactionId } = match.params
    getTransactionInfo({ transactionId, userId })
    socket.emit('join transaction', { transactionId })
    socket.on('new message', (data) => {
      receive(data)
    })
  }

  componentWillUnmount() {
    const { match } = this.props
    const { transactionId } = match.params
    socket.emit('leave transaction', { transactionId })
  }

  handleSend = () => {
    const { send, match } = this.props
    const { transactionId } = match.params
    const { value } = this.state
    if (value === '') return

    send({ 
      content: value,
      transactionId
    })
    this.setState(({
      value: ''
    }))
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  handleFetchMoreMessages = () => {
    const { match, lastMessageCount, numberOfAppendedMessages, loadMessage, isGetting } = this.props
    const { rendered } = this.state
    const { transactionId } = match.params
    if (rendered) {
      loadMessage({
        transactionId,
        skip: lastMessageCount + numberOfAppendedMessages
      })
    }
  }

  finishRendered = () => {
    this.setState({
      rendered: true
    })
  }

  render() {
    const { classes, isLoading, transaction, messages,
      numberOfMessages, lastMessageCount
    } = this.props
    const { value } = this.state
    return (
      <TopNav
        avatar={_.get(transaction, 'user.avatar', '')}
        name={_.get(transaction, 'user.name', '')}
        position={_.get(transaction, 'user.position', '')}
        status={_.get(transaction, 'status', '')}
      >
        <Loading isLoading={isLoading}/>
        <div className={classes.container}>
          <div className={classes.messagesContainer}>
            <MessageSection
              finishRendered={this.finishRendered}
              messages={messages}
              fetchMoreMessages={this.handleFetchMoreMessages}
              hasMore={lastMessageCount < numberOfMessages}
              isFirstLoad={lastMessageCount === numberOfMessagesPerLoad}
              avatar={_.get(transaction, 'user.avatar', '')}              
              position={_.get(transaction, 'user.position', '')}
            />
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

const mapStateToProps = ({ transaction }) => {
  return {
    account: {
      isAuth: !!(localStorage.getItem('isAuth')),
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      name: localStorage.getItem('name'),
      avatar: localStorage.getItem('avatar'),
      coin: Number.parseInt(localStorage.getItem('coin')),
    },
    isLoading: transaction.isLoading,
    transaction: transaction.transaction,
    messages: transaction.messages,
    numberOfMessages: transaction.numberOfMessages,
    lastMessageCount: transaction.lastMessageCount,
    numberOfAppendedMessages: transaction.numberOfAppendedMessages,
    isGetting: transaction.isGetting
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getTransactionInfo: getTransaction,
  send: sendMessage,
  receive: appendMessage,
  loadMessage: getMessages
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Transaction));
