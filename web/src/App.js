import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ScrollToTop from './components/ScrollToTop'

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
import EditBook from './pages/EditBook/index'
import Newsfeed from './pages/Newsfeed'

import NotFound from './pages/NotFound/index'
import { getUserInfo } from './redux/actions/accountAction'
import AboutTerms from './pages/AboutTerms';

import { socketCoin } from './redux/actions/accountAction';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    this.props.getUserInfoHandler();
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <Router>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/account" exact component={Account} />
            <Route path="/book-detail/:bookId" exact component={BookDetail} />
            <Route path="/edit-book/:bookId" exact component={EditBook} />
            <Route path="/book-list" exact component={BookList} />
            <Route path="/category/:categoryId" exact component={CategoryBookList} />
            <Route path="/category-list" exact component={CategoryList} />
            <Route path="/add-review/:bookId" exact component={AddReview} />
            <Route path="/filter" exact component={Filter} />
            <Route path="/transaction-list" exact component={TransactionList} />
            <Route path="/transaction/:transactionId" exact component={Transaction} />
            <Route path="/review/:reviewId" exact component={BookReview} />
            <Route path="/create-book" exact component={CreateBook} />
            <Route path="/create-instance/:bookId" exact component={CreateInstance} />
            <Route path="/profile/:profileId" exact component={Profile} />
            <Route path="/report" exact component={Report} />
            <Route path="/report/:type-:value" exact component={Report} />
            <Route path="/detail-transaction/:transId" exact component={TransactionDetail} />
            <Route path="/newsfeed" exact component={Newsfeed} />
            <Route path="/policy" exact component={AboutTerms} />
            <Route component={NotFound} />
          </Switch>
        </ScrollToTop>
        <ToastContainer></ToastContainer>
      </Router>
    )
  }
}

const mapStateToProps = ({ account }) => {
  return {
    account
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserInfoHandler: getUserInfo,
  updateCoin: socketCoin
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
