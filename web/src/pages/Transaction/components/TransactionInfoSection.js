import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Image from '../../../components/Image'
import Link from '../../../components/Link'
import DetailSection from './DetailSection'
import ButtonSection from './ButtonSection'
import getFormattedDate from '../../../helper/getFormattedDate'

const styles = (theme => ({
  container: {
    position: 'fixed',
    zIndex: 1000,
    left: 0,
    width: '100%',
    height: 'fit-content',
    background: 'white',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'

  },
  infoContainer: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    padding: '10px 30px'
  },
  detailContainer: {
    width: '70%'
  },
  image: {
    width: 54,
    height: 76,
    marginRight: 15
  },
  text: {
    fontWeight: 500,
    fontSize: 13,
  },
  bold: {
    fontWeight: 500,
    fontSize: 13,
    color: '#0274df'
  }
}))

const TransactionInfoSection = (props) => {
  const { classes, extendedDeadline, transactionId, estimatedReadingTime, address, returnDate, passingDate, changeDateTransaction, updatedAt, book: { id, image, name }, name: username, position, status, sendRequestStatus } = props
  return (
    <div className={classes.container}>
      <div className={classes.infoContainer}>
        <Link to={`/book-detail/${id}`}>
          <Image src={image} alt={'book'} className={classes.image}/>
        </Link>
        <div className={classes.detailContainer}>
          {position==='holder'?
            <div className={classes.text}>
              Mượn sách
              <Link to={`/book-detail/${id}`}>
                <span className={classes.bold}>{` ${name} `}</span>
              </Link>
              từ
                <span className={classes.bold}>{` ${username} `}</span>
            </div>
            :
            <div className={classes.text}>
              Bạn đọc
              <span className={classes.bold}>{` ${username} `}</span>
              mượn sách
              <Link to={`/book-detail/${id}`}>
                <span className={classes.bold}>{` ${name} `}</span>
              </Link>
            </div>
          }
          
          <DetailSection 
            transactionId={transactionId}
            position={position}
            changeDateTransaction={changeDateTransaction}
            status={status}
            address={address}
            passingDate={passingDate}
            sendRequestStatus={sendRequestStatus}
            updatedAt={updatedAt}
            returnDate={returnDate}
            extendedDeadline={extendedDeadline}
            estimatedReadingTime={estimatedReadingTime}
          />
        </div>
      </div>
      <ButtonSection 
        transactionId={transactionId}
        position={position} 
        status={status}
        returnDate={returnDate}
        extendedDeadline={extendedDeadline}
        sendRequestStatus={sendRequestStatus}
        changeDateTransaction={changeDateTransaction}
      />
    </div>
  )
}

export default withStyles(styles)(TransactionInfoSection)