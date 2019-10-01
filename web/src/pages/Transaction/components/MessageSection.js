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

const MessageSection = (props) => {
  const { classes, messages, avatar, position, fetchMoreMessages, hasMore } = props
  return (
    <div className={classes.container}>
      <InfiniteScroll
        pageStart={0}
        isReverse={true}
        loadMore={fetchMoreMessages}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
        useWindow={false}
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
      </InfiniteScroll>
    </div>
  )
}

export default withStyles(styles)(MessageSection)