import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home/index'
import Counter from './pages/Counter/index'
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
import NotFound from './pages/NotFound/index'
import { getUserInfo } from './redux/actions/accountAction'



var PreventLeavingMixin = {
  statics: {
    willTransitionFrom: function (transition, component) {
      //you have access to your component's state and functions with the component param
      //transition can make the navigation stop
      transition.abort();
    }
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
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
          <Route path="/add-review/:bookId" exact component={AddReview} />
          <Route path="/filter" exact component={Filter} />
          <Route path="/transaction-list" exact component={TransactionList} />
          <Route path="/transaction/:transactionId" exact component={Transaction} />
          <Route path="/review/:reviewId" exact component={BookReview} />
          <Route path="/create-book" exact component={CreateBook} />
          <Route path="/create-instance/:bookIs" exact component={CreateInstance} />
          <Route path="/counter" exact component={Counter} />
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
