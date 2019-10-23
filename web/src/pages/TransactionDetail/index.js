import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import get from 'lodash/get';

import TopNav from './components/TopNav';
import TitleWrapper from './components/TitleWrapper';
import colors from '../../constants/colors';
import Avatar from '../../components/Avatar';
import Button from '@material-ui/core/Button';
import Image from '../../components/Image';
import { getTransaction } from '../../redux/actions/transactionAction';
import { bindActionCreators } from 'redux';
import Loading from '../../components/Loading';
import getFormattedDate from '../../helper/getFormattedDate';

const styles = theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    maxWidth: 800,
    margin: 'auto',
    position: 'relative',
    boxSizing: 'border-box',
    padding: '10px 10px'
  },
  text: {
    fontSize: 12,
    margin: 0
  },
  textLight: {
    fontSize: 12,
    margin: 0,
    fontWeight: 400
  },
  textDark: {
    fontWeight: 500,
    fontSize: 12,
    margin: 0
  },
  idWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    '&:hover': {
      "& .idCopyWrapper": {
        '&::after': {
          visibility: 'visible',
          opacity: 1
        },
        '&::before': {
          visibility: 'visible',
          opacity: 1
        }
      }
    }
  },
  idTitle: {
    fontSize: 12,
    margin: 0,
    marginBottom: 1
  },
  id: {
    fontSize: 12,
    color: colors.primary,
    margin: 0,
    marginBottom: 1,
    position: 'relative',
    cursor: 'pointer',
    border: 'none',
    width: 167,
    transition: '0.4s',
    '&:focus': {
      color: '#5fc0ea'
    },
    '&:active': {
      color: '#5fc0ea'
    }
  },
  idCopy: {
    position: 'absolute',
    fontSize: 12,
    right: 20,
    transition: '0.3s',
    '&::after': {
      content: '"Sao chép"',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 600,
      color: 'white',
      position: 'absolute',
      top: '-38px',
      right: '-10px',
      width: 68,
      height: 28,
      borderRadius: 10,
      background: '#FF9B46',
      visibility: 'hidden',
      opacity: 0,
      transition: '0.3s',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-10px',
      right: 15,
      width: 0,
      height: 0,
      borderLeft: '7px solid transparent',
      borderRight: '7px solid transparent',
      borderTop: '7px solid #FF9B46',
      visibility: 'hidden',
      opacity: 0,
      transition: '0.3s',
    }
  },
  button: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    color: 'white',
    borderRadius: 7,
    background: '#d1d1d1',
    margin: '15px 0',
    float: 'right',
    pointerEvents: 'none',
    '&:hover': {
      background: '#d1d1d1'
    }
  },
  buttonActive: {
    background: colors.primary,
    pointerEvents: 'auto',
    '&:hover': {
      background: colors.primary
    }
  },
  buttonRed: {
    background: colors.red,
    pointerEvents: 'none',
    '&:hover': {
      background: colors.red
    }
  },
  buttonOrange: {
    background: '#f67c22',
    pointerEvents: 'auto',
    '&:hover': {
      background: '#f67c22'
    }
  },
  image: {
    width: 60,
    height: 80
  },
  bookTitle: {
    fontSize: 13,
    fontWeight: 500,
    margin: 0,
    marginBottom: 2,
    width: 180,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  avatar: {
    width: 40,
    height: 40
  },
  line: {
    borderWidth: '0.5px',
    borderColor: '#B7C7D6'
  },
  status: {
    margin: 0,
    fontSize: 12,
    color: '#23c47a'
  },
  notActive: {
    pointerEvents: 'none',
    cursor: 'default'
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none'
    }
  }
})

const TransactionDetail = props => {
  const { classes, match, transaction, account, getTransaction, isLoadingTransaction } = props;
  const { userId } = account;
  const { transId } = match.params;
  const createdAt = get(transaction, 'createdAt', '')
  const passingDate = get(transaction, 'passingDate', '')
  const returnDate = get(transaction, 'returnDate', '')
  const avatar = get(transaction, 'user.avatar', '')
  const username = get(transaction, 'user.name', '')
  const position = get(transaction, 'user.position', '')
  const address = get(transaction, 'address', '')
  const status = get(transaction, 'status', '')
  const isReviewed = get(transaction, 'isReviewed', '')
  const bookName = get(transaction, 'book.name', '')
  const bookImage = get(transaction, 'book.image', '')
  const bookAuthor = get(transaction, 'book.author', '')
  const isLoading = isLoadingTransaction;
  const holderId = '4234njnj';

  const [isCopy, setCopy] = useState(false)

  useEffect(() => {
    getTransaction({transactionId: transId, userId})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const copyTransId = (e) => {
    e.target.select()
    document.execCommand('copy');
    setCopy(true)
  }

  const confirmButton = () => {
    if (position === 'holder') {
      if (!isReviewed) {
        switch (status) {
          case 'waitingForResponse':
            return <Button className={classes.button}>Đã nhận sách</Button>
          case 'waitingForTake':
            return <Button className={`${classes.button} ${classes.buttonActive}`}>Đã nhận sách</Button>
          case 'isReading':
            return <Button className={`${classes.button} ${classes.buttonActive}`}>Đã nhận sách</Button>
          case 'isOvertime':
            return <Button className={`${classes.button} ${classes.buttonActive}`}>Đã nhận sách</Button>
          case 'waitingForDeadlineExtended':
            return <Button className={`${classes.button} ${classes.buttonActive}`}>Đã nhận sách</Button>
          case 'deadlineExtended':
            return <Button className={`${classes.button} ${classes.buttonActive}`}>Đã nhận sách</Button>
          case 'isReport':
            return <Button className={`${classes.button} ${classes.buttonRed}`}>Bị report</Button>
          case 'isDone':
            return <Button className={`${classes.button} ${classes.buttonActive}`}>Ghi Review</Button>
        }
      } else {
        return <>
          <Button className={`${classes.button} ${classes.buttonActive}`}>Xem Review</Button>         
          {/* <Button className={`${classes.button} ${classes.buttonOrange}`} style={{marginRight: 10}}>Xem Đánh Giá</Button>          */}
        </>
      }
    }
  }

  return (
    <TopNav title='Thông tin đơn hàng' transId={transId}>
      <Loading isLoading={isLoading}/>
      <div className={classes.container}>

        <TitleWrapper title='Địa chỉ giao dịch'>
          <div>
            <p className={classes.textLight}>{username}</p>
            {/* <p className={classes.textLight} style={{ margin: '5px 0' }}>0909090099</p> */}
            <p className={classes.textLight}>{address}</p>
          </div>
        </TitleWrapper>

        <TitleWrapper title='Thông tin giao dịch'>
          <div>
            <p className={classes.textDark}>
              Thời gian đặt sách:
              <span className={classes.textLight} style={{ marginLeft: 5 }}>{getFormattedDate(createdAt, true)}</span>
            </p>
            <p className={classes.textDark} style={{ margin: '5px 0' }}>
              Thời gian giao dịch:
              <span className={classes.textLight} style={{ marginLeft: 5 }}>{getFormattedDate(passingDate, true)}</span>
            </p>
            <p className={classes.textDark}>
              Thời gian trả sách:
              <span className={classes.textLight} style={{ marginLeft: 5 }}>{getFormattedDate(returnDate, true)}</span>
            </p>
          </div>
        </TitleWrapper>

        {/* <TitleWrapper title='Chú thích'>
          <div>
            <p className={classes.text}>hello, chú thích</p>
          </div>
        </TitleWrapper> */}

        <TitleWrapper title='Thông tin đơn hàng'>
          <div>
            <div className={classes.idWrapper}>
              <div className={`${classes.idCopy}` + " idCopyWrapper"}></div>
              <p className={classes.idTitle}>ID đơn hàng</p>
              <input unselectable="on" readOnly tabIndex="-1" className={`${classes.id}` + " transId"} onClick={(e) => copyTransId(e)} value={transId}/>
            </div>
            <hr className={classes.line} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <Image src={bookImage} alt={bookName} className={classes.image} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <p className={classes.bookTitle}>{bookName}</p>
                    <p className={classes.text}>{bookAuthor}</p>
                  </div>
                  <p className={classes.status}>Đang chờ</p>
                </div>
              </div>
              <Link to={`/profile/${holderId}`} className={classes.link}>
                <Avatar className={classes.avatar} src={avatar} />
              </Link>
            </div>
          </div>
        </TitleWrapper>
        {
          confirmButton()
        }
      </div>
    </TopNav>
  );
};

const mapStateToProps = ({ account, transaction }) => {
  return {
    account: {
      isAuth: !!(localStorage.getItem('isAuth')),
      userId: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      name: localStorage.getItem('name'),
      avatar: localStorage.getItem('avatar'),
      coin: Number.parseInt(localStorage.getItem('coin')),
    },
    transaction: transaction.transaction,
    isLoadingTransaction: transaction.isLoading
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getTransaction: getTransaction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TransactionDetail));