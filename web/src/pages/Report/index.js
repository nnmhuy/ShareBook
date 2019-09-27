import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TopNavSend from '../../components/TopNavSend';
import ProblemDropdown from './components/ProblemDropdown';
import ProblemContainer from './components/ProblemContainer';

import colors from '../../constants/colors';
import ReplyOption from './components/ReplyOption';
import BookOption from './components/BookOption';
import InstanceOption from './components/InstanceOption';
import ReviewOption from './components/ReviewOption';
import UserOption from './components/UserOption';
import TransactionOption from './components/TransactionOption';

const styles = theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    maxWidth: 500,
    margin: 'auto',
    boxSizing: 'border-box',
    padding: '20px'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 5
  },
  avatar: {
    width: 35,
    height: 35,
    margin: '0 10px'
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
    margin: 0,
    marginBottom: 5,
    color: colors.primary
  },
  name: {
    margin: 0,
    marginBottom: 15
  },
  date: {
    margin: 0,
    fontSize: 10,
    color: colors.gray
  },
  inputAble: {
    fontFamily: 'Montserrat',
    marginBottom: 15,
    '&:hover': {
      borderColor: colors.primary,
      outline: 'none'
    },
    '& .MuiFormHelperText-root': {
      color: 'red'
    },
    '& .MuiInputLabel-formControl': {
      transform: 'translate(0, 1.5px) scale(0.75)',
      color: colors.primary
    },
    '&:hover .MuiInput-underline:before': {
      borderBottom: `1px solid ${colors.primary}`
    },
    '& .MuiInput-underline:after': {
      borderBottom: `2px solid ${colors.primary}`
    }
  }
})


let types = [];

class Report extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'other',
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createdDay = (date) => {
    let createdYMD = date.split('T')[0].split('-');
    let day = createdYMD[2];
    let month = createdYMD[1];
    let year = createdYMD[0];
    let formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
  }

  render() {
    const { classes, match } = this.props;
    const { type } = this.state;
    const { params } = match;

    if (params.type === undefined) {
      types = [
        { typeOfTarget: 'other', name: 'Khác' },
        { typeOfTarget: 'qa', name: 'Q&A' }
      ];
    }

    else
      switch (params.type) {
        case 'book':
          types = [{ typeOfTarget: 'book', name: 'Sách' }];
          break;
        case 'bookInstance':
          types = [{ typeOfTarget: 'bookInstance', name: 'Sách cho mượn' }];
          break;
        case 'review':
          types = [{ typeOfTarget: 'review', name: 'Review' }];
          break;
        case 'reply':
          types = [{ typeOfTarget: 'reply', name: 'Bình luận' }];
          break;
        case 'user':
          types = [{ typeOfTarget: 'user', name: 'Người dùng' }];
          break;
        case 'transaction':
          types = [{ typeOfTarget: 'transaction', name: 'Giao dịch' }];
          break;
        default:
          window.location.replace('/404');
          break;
      }


    return (
      <TopNavSend title='Report' textSend='Gửi'>
        <div className={classes.container}>
          <ProblemDropdown params={params} types={types} type={type} handleChange={this.handleChange} />
          {
            params.type === undefined &&
            <ProblemContainer />
          }
          {
            params.type === 'book' &&
            <BookOption bookId={params.value} />
          }
          {
            params.type === 'bookInstance' &&
            <InstanceOption instanceId={params.value} />
          }
          {
            params.type === 'review' &&
            <ReviewOption reviewId={params.value} createdDay={this.createdDay} />
          }
          {
            params.type === 'reply' &&
            <ReplyOption replyId={params.value} createdDay={this.createdDay} />
          }
          {
            params.type === 'user' &&
            <UserOption userId={params.value} />
          }
          {
            params.type === 'transaction' &&
            <TransactionOption transId={params.value} />
          }
        </div>
      </TopNavSend>
    );
  }
}

export default (withStyles(styles)(Report));