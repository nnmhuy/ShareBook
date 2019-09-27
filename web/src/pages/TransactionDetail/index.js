import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import TopNav from './components/TopNav';
import TitleWrapper from './components/TitleWrapper';
import colors from '../../constants/colors';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Image from '../../components/Image';

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
    justifyContent: 'space-between'
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
  },
  idCopy: {
    position: 'absolute',
    fontSize: 12,
    right: 20,
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
      background: '#FF9B46'
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
      borderTop: '7px solid #FF9B46'
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
    '&:hover': {
      background: '#d1d1d1'
    }
  },
  image: {
    width: 60,
    height: 80
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 500,
    margin: 0,
    marginBottom: 5
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
  const { classes } = props;
  const transId = '46546dgfdg';
  const holderId = '4234njnj';
  return (
    <TopNav title='Thông tin đơn hàng'>
      <div className={classes.container}>

        <TitleWrapper title='Địa chỉ giao dịch'>
          <div>
            <p className={classes.textLight}>Nguyễn Ngọc Minh Huy</p>
            <p className={classes.textLight} style={{ margin: '5px 0' }}>0909090099</p>
            <p className={classes.textLight}>22 Trần Đình Xu, Nguyễn Trãi, Quận 1, phường Cầu Ông Lãnh, TP.HCM</p>
          </div>
        </TitleWrapper>

        <TitleWrapper title='Thông tin giao dịch'>
          <div>
            <p className={classes.textDark}>
              Thời gian đặt sách:
              <span className={classes.textLight}> 15-09-2019 17:30</span>
            </p>
            <p className={classes.textDark} style={{ margin: '5px 0' }}>
              Thời gian giao dịch:
              <span className={classes.textLight}> 20-09-2019 23:30</span>
            </p>
            <p className={classes.textDark}>
              Thời gian trả sách:
              <span className={classes.textLight}> 29-09-2019 03:40</span>
            </p>
          </div>
        </TitleWrapper>

        <TitleWrapper title='Chú thích'>
          <div>
            <p className={classes.text}>hello, chú thích</p>
          </div>
        </TitleWrapper>

        <TitleWrapper title='Thông tin đơn hàng'>
          <div>
            <div className={classes.idWrapper}>
              <div className={classes.idCopy}></div>
              <p className={classes.idTitle}>ID đơn hàng</p>
              <p className={classes.id}>{transId}</p>
            </div>
            <hr className={classes.line} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <Image src='' alt='' className={classes.image} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <p className={classes.bookTitle}>Animal farm</p>
                    <p className={classes.text}>George O'Weill</p>
                  </div>
                  <p className={classes.status}>Đang chờ</p>
                </div>
              </div>
              <Link to={`/profile/${holderId}`} className={classes.link}>
                <Avatar className={classes.avatar} />
              </Link>
            </div>
          </div>
        </TitleWrapper>
        <Link to={`/add-review/${transId}`} className={classes.link}>
          <Button className={classes.button}>Đã nhận sách</Button>
        </Link>
      </div>
    </TopNav>
  );
};

export default withStyles(styles)(TransactionDetail);