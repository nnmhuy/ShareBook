import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Link from '../../../components/Link'
import Avatar from '../../../components/Avatar'
import OnlineBadge from '../../../components/OnlineBadge'
import { ReactComponent as CompletedIcon } from '../../../static/images/task-complete.svg'
import Image from '../../../components/Image'

import colors from '../../../constants/colors'
import getFormattedDate from '../../../helper/getFormattedDate'
import { mapTransactionStatusToText, mapPositionToText } from '../../../constants/constants'

const styles = (theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10
  },
  centerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontSize: 15
  },
  position: {
    fontWeight: 500,
    fontStyle: 'italic',
    fontSize: 11,
    color: '#0c4f8e'
  },
  status: {
    fontWeight: 500,
    fontSize: 11,
    color: '#0c4f8e'
  },
  statusMess: {
    marginTop: 5,
    fontSize: 14,
    color: 'black',
    fontWeight: 500
  },
  statusSystem: {
    marginTop: 5,
    fontSize: 12,
    color: 'gray',
    fontWeight: 500
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
  },
  statusContainer: {
    lineHeight: '7px'
  }
}))

const TransactionItem = (props) => {
  const { classes, id, user: { avatar, name, position }, isOnline, image,
    status, numberOfUnreadMessage, lastMessage, lastMessageTime, lastMessageDirection } = props
  return (
    <Link to={`/transaction/${id}`}>
      <div className={classes.container}>
        <div className={classes.centerContainer}>
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
            <Image src={image} alt='book' className={classes.image}/>
          </div>
          <div className={classes.infoContainer}>
            <div className={classes.username}>{name}</div>
            <div className={classes.statusContainer}>
              <span className={classes.position}>{mapPositionToText[position]}</span>
              <span className={classes.status}>{` - ${mapTransactionStatusToText[status]}`}</span>
            </div>
            {
              lastMessageDirection === 'system' ?
                <div className={classes.statusSystem} style={{ marginTop: 5 }}>{lastMessage}</div>
                :
                <div className={classes.statusMess} style={{ marginTop: 5 }}>{lastMessage}</div>
            }
          </div>
        </div>
        <div className={classes.numberContainer}>
          <div className={classes.lastMessageTime}>{getFormattedDate(lastMessageTime, true, false, true)}</div>
          <div className={classes.numberOfUnreadMessage} style={{ opacity: numberOfUnreadMessage ? 1 : 0 }}>
            {numberOfUnreadMessage >= 10 ? '9+' : numberOfUnreadMessage}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default withStyles(styles)(TransactionItem)