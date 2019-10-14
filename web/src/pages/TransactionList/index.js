import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import socket from '../../connectors/Socket'
import _ from 'lodash'

import Loading from '../../components/Loading'
import LayoutWrapper from '../../components/LayoutWrapper'
import Search from '../../components/Search'
import TransactionItem from './components/TransactionItem'

import { getTransactions } from '../../redux/actions/transactionAction'

const styles = (theme => ({
  container: {
    boxSizing: 'border-box',
    width: '100%',
    minWidth: 350,
    maxWidth: 800,
    margin: 'auto',
    padding: 20
  },
  search: {
    margin: 'auto',
    borderRadius: 12,
    background: '#f7f7f7',
    boxShadow: 'none',
    marginBottom: 10
  }
}))

class TransactionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    const { getTransactionsInfo, account: { userId }, receiveStatus } = this.props
    getTransactionsInfo({ userId })

    socket.emit('join socket', { socketName: `TRANSACTION-${userId}` })
    socket.on('new transaction status', (data) => {
      receiveStatus(data)
    })
    socket.on('new transaction', (data) => {
      getTransactionsInfo({ userId })    
    })
  }

  componentWillUnmount() {
    const { account } = this.props
    const { userId } = account
    socket.off()
    socket.off('new transaction')
    socket.off('new transaction status')
    socket.emit('leave socket', { socketName: `TRANSACTION-${userId}` })
  }


  render() {
    const { classes, account, transactionList, isLoading } = this.props
    transactionList.sort((a, b) => {
      if (a.lastMessageTime < b.lastMessageTime) return -1;
      return 1;
    })
    return (
      <LayoutWrapper title='Giao dịch' account={account}>
        <Loading isLoading={isLoading}/>
        <div className={classes.container}>
          <Search className={classes.search}/>
          <div>
            {
              transactionList.map((transaction) => {
                return (
                  <TransactionItem 
                    {...transaction}
                    key={transaction.id}
                  />
                )
              })
            }
          </div>
        </div>
      </LayoutWrapper>
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
    transactionList: transaction.transactionList,
    isLoading: transaction.isLoading
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getTransactionsInfo: getTransactions
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TransactionList));
