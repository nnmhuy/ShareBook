import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import LayoutWrapper from '../../components/LayoutWrapper'
import AboutUs from './components/AboutUs'
import Tutorial from './components/Tutorial'
import NewsfeedIntro from './components/NewsfeedIntro'
import HotBook from './components/HotBook'
import Footer from './components/Footer'

const styles = (theme => ({
  container: {
    width: '100%',
    minWidth: 350,
  }
}))

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    const { classes, account } = this.props
    return (
      <LayoutWrapper title='Home' account={account}>
        <div className={classes.container}>
          <AboutUs/>
          <Tutorial/>
          <NewsfeedIntro/>
          <HotBook/>
          <Footer/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
