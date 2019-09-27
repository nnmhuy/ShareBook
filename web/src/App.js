import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home/index'
import Account from './pages/Account/index'
import BookDetail from './pages/BookDetail/index'
import BookReview from './pages/BookReview/index'
import BookList from './pages/BookList/index'
import CategoryBookList from './pages/CategoryBookList/index'
import AddReview from './pages/AddReview/index'
import Filter from './pages/Filter/index'
import TransactionList from './pages/TransactionList/index'
import Transaction from './pages/Transaction/index'
import CreateBook from './pages/CreateBook'
import CreateInstance from './pages/CreateInstance'
import CategoryList from './pages/CategoryList'
import Profile from './pages/Profile'
import Report from './pages/Report'
import TransactionDetail from './pages/TransactionDetail'

import NotFound from './pages/NotFound/index'
import { getUserInfo } from './redux/actions/accountAction'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    this.props.getUserInfoHandler();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/account" exact component={Account} />
          <Route path="/book-detail/:bookId" exact component={BookDetail} />
          <Route path="/book-list" exact component={BookList} />
          <Route path="/category/:categoryId" exact component={CategoryBookList} />
          <Route path="/categories" exact component={CategoryList} />
          <Route path="/add-review/:bookId" exact component={AddReview} />
          <Route path="/filter" exact component={Filter} />
          <Route path="/transaction-list" exact component={TransactionList} />
          <Route path="/transaction/:transactionId" exact component={Transaction} />
          <Route path="/review/:reviewId" exact component={BookReview} />
          <Route path="/create-book" exact component={CreateBook} />
          <Route path="/create-instance/:bookId" exact component={CreateInstance} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/report" exact component={Report} />
          <Route path="/report/:type-:value" exact component={Report} />
          <Route path="/detail-transaction/:transId" exact component={TransactionDetail} />
          <Route component={NotFound} />
        </Switch>
        <ToastContainer></ToastContainer>
      </Router>
    )
  }
}

const mapStateToProps = () => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserInfoHandler: getUserInfo
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
