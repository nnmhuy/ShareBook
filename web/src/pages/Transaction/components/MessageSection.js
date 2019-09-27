import React from 'react'
import { withStyles } from '@material-ui/core/styles'

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
  const { classes, messages, avatar } = props
  return (
    <div className={classes.container}>
      {
        messages.map((message, id) => {
          const { sender, content } = message
          if (sender === 0) {
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
    </div>
  )
}

export default withStyles(styles)(MessageSection)