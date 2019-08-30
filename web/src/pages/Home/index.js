import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

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
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <AboutUs/>
        <Tutorial/>
        <NewsfeedIntro/>
        <HotBook/>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = ({ state }) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
