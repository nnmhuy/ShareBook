import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import InfiniteScroll from 'react-infinite-scroller'
import PulseLoader from 'react-spinners/PulseLoader'

import colors from '../../../constants/colors'
import IncomeMessage from './IncomeMessage'
import OutcomeMessage from './OutcomeMessage'
import SystemMessage from './SystemMessage'

const styles = (theme => ({
  container: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '20px 15px'
  },
  loader: {
    textAlign: 'center'
  }
}))

class MessageSection  extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {}
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView();
  }

  componentDidMount() {
    const { finishRendered } = this.props
    this.scrollToBottom();
    finishRendered()
  }

  componentDidUpdate() {
    // const { isFirstLoad } = this.props
    // if (isFirstLoad) {
    //   this.scrollToBottom();
    // }
    this.scrollToBottom()
  }

  render() {
    const { classes, messages, avatar, position, fetchMoreMessages, hasMore } = this.props
    return (
      <div className={classes.container}>
        <InfiniteScroll
          threshold={100}
          pageStart={0}
          isReverse={true}
          loadMore={fetchMoreMessages}
          hasMore={hasMore}
          initialLoad={false}
          loader={
            <div className={classes.loader} key={0}>
              <PulseLoader color={colors.primary} size={5}/>
            </div>
          }
          useWindow={true}
        >
        {
          messages.map((message, id) => {
            const { direction, content } = message
            if (direction === 'system') {
              return (
                <SystemMessage 
                  key={content + id}
                  message={content}
                />
              )
            }
            if (direction === position) {
              return (
                <IncomeMessage
                  key={content+id}
                  message={content}
                  avatar={avatar}
                />
              )
            } else {
              return (
                <OutcomeMessage 
                  key={content+id}
                  message={content}
                />
              )
            }
          })
        }
        <div style={{ float: "left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
        </InfiniteScroll>
      </div>
    )
  }
}

export default withStyles(styles)(MessageSection)