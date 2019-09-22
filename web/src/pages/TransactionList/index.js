import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import LayoutWrapper from '../../components/LayoutWrapper'
import Search from '../../components/Search'
import TransactionItem from './components/TransactionItem'

import { demoTransactionList } from './demoData'

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

  render() {
    const { classes, account } = this.props
    return (
      <LayoutWrapper title='Giao dịch' account={account}>
        <div className={classes.container}>
          <Search className={classes.search}/>
          <div>
            {
              demoTransactionList.map((transaction) => {
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

const mapStateToProps = ({ state, account }) => {
  return {
    account: {
      isAuth: Boolean.valueOf(localStorage.getItem('isAuth')),
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TransactionList));
