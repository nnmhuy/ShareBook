import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Avatar
} from '@material-ui/core'

import Link from '../../../components/Link'
import OnlineBadge from '../../../components/OnlineBadge'
import { ReactComponent as CompletedIcon } from '../../../static/images/task-complete.svg'

import colors from '../../../constants/colors'

const styles = (theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10
  },
  avatar: {
    width: 50,
    height: 50,
  },
  completedWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#00000080',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedIcon: {
    height: 21,
    width: 'auto',
    paddingLeft: 3
  },
  imageContainer: {
    width: 31,
    height: 50,
    marginLeft: 12,
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10
  },
  username: {
    fontWeight: 600,
    fontSize: 14
  },
  position: {
    fontWeight: 500,
    fontStyle: 'italic',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#0c4f8e'
  },
  status: {
    fontWeight: 500,
    fontSize: 10,
    lineHeight: 1.5,
    color: '#0c4f8e'
  },
  numberContainer: {
    textAlign: 'right',
  },
  numberOfUnreadMessage: {
    display: 'inline-block',
    textAlign: 'center',
    width: 16,
    height: 16,
    borderRadius: '50%',
    fontWeight: 600,
    fontSize: 12,
    color: '#f7f7f7',
    backgroundColor: colors.primary
  },
  lastMessageTime: {
    fontWeight: 600,
    fontSize: 12,
    color: colors.gray
  }
}))

const mapTransactionStatusToText = [
  'Chờ phản hồi', //waitingForResponse
  'Chờ nhận sách', //waitingForTake
  'Đang đọc', //isReading
  'Quá hạn', //isOvertime
  'Chờ phản hồi gia hạn', //waitingForDeadlineExtended // borrower ask to extend deadline
  'Đã gia hạn', //deadlineExtended
  'Đã báo cáo', //isReported
  'Đã hoàn thành', //isDone
  'Đã huỷ', //isCancel // if holder decline borrow request
]

const mapPositionToText = [
  'Người cho mượn',
  'Người mượn'
]

const TransactionItem = (props) => {
  const { classes, id, avatar, username, isOnline, image,
    position, status, numberOfUnreadMessage, lastMessageTime } = props
  return (
    <Link to={`/transaction/${id}`}>
      <div className={classes.container}>
        <OnlineBadge
          overlap='circle'
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          variant='dot'
          invisible={!isOnline}
        >
          <Avatar src={avatar} className={classes.avatar}/>
        </OnlineBadge>
        <div className={classes.imageContainer}>
          {status === 8 &&
            <div className={classes.completedWrapper}>
              <CompletedIcon fill='#29FF83' className={classes.completedIcon}/>
            </div>
          }
          <img src={image} alt='book' className={classes.image}/>
        </div>
        <div className={classes.infoContainer}>
          <div className={classes.username}>{username}</div>
          <div>
            <span className={classes.position}>{mapPositionToText[position]}</span>
            <span className={classes.status}>{` - ${mapTransactionStatusToText[status]}`}</span>
          </div>
        </div>
        <div className={classes.numberContainer}>
          <div className={classes.lastMessageTime}>{lastMessageTime}</div>
          <div className={classes.numberOfUnreadMessage} style={{ opacity: numberOfUnreadMessage ? 1 : 0 }}>
            {numberOfUnreadMessage >= 10 ? '9+' : numberOfUnreadMessage}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default withStyles(styles)(TransactionItem)