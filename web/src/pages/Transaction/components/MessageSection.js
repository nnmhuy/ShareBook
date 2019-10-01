import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import InfiniteScroll from 'react-infinite-scroller'

import IncomeMessage from './IncomeMessage'
import OutcomeMessage from './OutcomeMessage'

const styles = (theme => ({
  container: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '20px 15px'
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
    const { isFirstLoad } = this.props
    if (isFirstLoad) {
      this.scrollToBottom();
    }
  }

  render() {
    const { classes, messages, avatar, position, fetchMoreMessages, hasMore } = this.props
    return (
      <div className={classes.container}>
        <InfiniteScroll
          threshold={50}
          pageStart={0}
          isReverse={true}
          loadMore={fetchMoreMessages}
          hasMore={hasMore}
          initialLoad={false}
          loader={<div className="loader" key={0}>Loading ...</div>}
          useWindow={true}
        >
        {
          messages.map((message, id) => {
            const { direction, content } = message
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