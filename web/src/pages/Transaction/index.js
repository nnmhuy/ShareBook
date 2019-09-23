import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import TopNav from './components/TopNav'
import MessageSection from './components/MessageSection'
import InputSection from './components/InputSection'

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

    }
  }

  render() {
    const { classes } = this.props
    return (
      <TopNav>
        <div className={classes.container}>
          <div className={classes.messagesContainer}>
            <MessageSection />
          </div>
          <InputSection />
        </div>
      </TopNav>
    )
  }
}

const mapStateToProps = ({ state, account }) => {
  return {
    account: {
      isAuth: !!(localStorage.getItem('isAuth')),
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Transaction));
