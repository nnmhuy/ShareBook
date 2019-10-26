import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import get from 'lodash/get'
import socket from '../../connectors/Socket'

import TopNav from './components/TopNav'
import Loading from '../../components/Loading'
import TransactionInfoSection from './components/TransactionInfoSection'
import MessageSection from './components/MessageSection'
import InputSection from './components/InputSection'
import { numberOfMessagesPerLoad } from '../../constants/constants'

import { 
  sendMessage,
  getTransaction,
  appendMessage,
  getMessages,
  requestStatus,
  socketNewStatus,
  changeDateTransaction
} from '../../redux/actions/transactionAction'
import { withFormik } from 'formik'

const styles = (theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    maxWidth: 800,
    height: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  messagesContainer: {
    width: '100%',
    flex: 1,
    paddingTop: 135,
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
    const { match, getTransactionInfo, account, receive, receiveStatus } = this.props
    const { userId } = account
    const { transactionId } = match.params
    getTransactionInfo({ transactionId, userId })
    socket.emit('join socket', { socketName: `CHAT-${transactionId}` })
    socket.emit('join socket', { socketName: `TRANSACTION-${userId}` })
    socket.on('new message', (data) => {
      receive(data)
    })
    socket.on('new transaction status', (data) => {
      receiveStatus(data)
    })
  }

  componentWillUnmount() {
    const { match, account } = this.props
    const { transactionId } = match.params
    const { userId } = account
    socket.off('new transaction status')
    socket.emit('leave socket', { socketName: `CHAT-${transactionId}` })
    socket.emit('leave socket', { socketName: `TRANSACTION-${userId}` })
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
    const { match, lastMessageCount, numberOfAppendedMessages, loadMessage } = this.props
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
      numberOfMessages, changeDateTransaction, lastMessageCount, sendRequestStatus, match
    } = this.props
    const { transactionId } = match.params
    const { value } = this.state
    const estimatedReadingTime = get(transaction, 'estimatedReadingTime', '')
    const passingDate = get(transaction, 'passingDate', '')
    const returnDate = get(transaction, 'returnDate', '')
    const address = get(transaction, 'address', '')
    const updatedAt = get(transaction, 'updatedAt', '')
    const userId = get(transaction, 'user.id', '')
    const avatar = get(transaction, 'user.avatar', '')
    const username = get(transaction, 'user.name', '')
    const position = get(transaction, 'user.position', '')
    const status = get(transaction, 'status', '')
    return (
      <TopNav
        id={userId}
        avatar={avatar}
        name={username}
        position={position}
        status={status}
      >
        <Loading isLoading={isLoading}/>
        <div className={classes.container}>
          <TransactionInfoSection
            transactionId={transactionId}
            book={get(transaction, 'book', {})}
            name={username}
            position={position}
            status={status}
            passingDate={passingDate}
            sendRequestStatus={sendRequestStatus}
            changeDateTransaction={changeDateTransaction}
            updatedAt={updatedAt}
            address={address}
            returnDate={returnDate}
            estimatedReadingTime={estimatedReadingTime}
          />
          <div className={classes.messagesContainer}>
            <MessageSection
              finishRendered={this.finishRendered}
              messages={messages}
              fetchMoreMessages={this.handleFetchMoreMessages}
              hasMore={lastMessageCount < numberOfMessages}
              isFirstLoad={lastMessageCount === numberOfMessagesPerLoad}
              avatar={get(transaction, 'user.avatar', '')}              
              position={get(transaction, 'user.position', '')}
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

const EditDateWithFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      content: ''
    }
  },

  handleSubmit: async (values, { setSubmitting, props }) => {
    const {
      isSubmitting,
      createReport,
      match,
    } = props

    if (isSubmitting) return
    setSubmitting(true)

    let { content, type } = values
    if (match.params.type) type = match.params.type
    if (!type) type = 'other'

    const data = {
      content,
      typeOfTarget: type, //book, bookInstance, review, reply, user
      valueId: match.params.value //bookId, bookInstanceId, reviewId, replyId, userId
    }

    if (!match.params.type) {
      delete data.valueId
    }

    createReport(data)
    values.content = ''
    setSubmitting(false)
  }
})(withStyles(styles)(Transaction))



const mapStateToProps = ({ transaction }) => {
  return {
    account: {
      isAuth: !!(localStorage.getItem('isAuth')),
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      name: localStorage.getItem('name'),
      avatar: localStorage.getItem('avatar'),
    },
    isLoading: transaction.isLoading,
    transaction: transaction.transaction,
    messages: transaction.messages,
    numberOfMessages: transaction.numberOfMessages,
    lastMessageCount: transaction.lastMessageCount,
    numberOfAppendedMessages: transaction.numberOfAppendedMessages,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getTransactionInfo: getTransaction,
  send: sendMessage,
  receive: appendMessage,
  loadMessage: getMessages,
  sendRequestStatus: requestStatus,
  receiveStatus: socketNewStatus,
  changeDateTransaction: changeDateTransaction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditDateWithFormik);
