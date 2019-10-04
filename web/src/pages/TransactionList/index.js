import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'

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
    const { getTransactionsInfo, account: { userId } } = this.props
    getTransactionsInfo({ userId })
  }

  render() {
    const { classes, account, transactionList, isLoading } = this.props
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
