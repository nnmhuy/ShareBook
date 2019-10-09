import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
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
import { getReviewById } from '../../redux/actions/reviewAction';
import { getBookLite } from '../../redux/actions/bookAction';
import { getReplyById } from '../../redux/actions/replyAction';
import { getBookInstanceById } from '../../redux/actions/bookInstanceAction';
import { createReport } from '../../redux/actions/reportAction';

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
  componentDidMount() {
    const { match, getReview, getBook, userId, getReply, getBookInstance } = this.props;
    let id = match.params.value;
    switch (match.params.type) {
      case 'book':
        getBook({ bookId: id })
        break;
      case 'bookInstance':
        getBookInstance({ bookInstanceId: id})
        break;
      case 'review':
        getReview({ userId, reviewId: id })
        break;
      case 'reply':
        getReply({ replyId: id })
        break;
      case 'user':
        console.log('thiếu isLoading user')
        break;
      case 'transaction':
        console.log('transaction')
        break;
      default:
        break;
    }
  }

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
    const { classes, match, bookDetail, instance, review, reply, values, handleChange, handleBlur, handleSubmit } = this.props;
    const { type } = this.state;
    const { params } = match;

    if (params.type === undefined) {
      types = [
        { typeOfTarget: 'other', name: 'Khác' },
        { typeOfTarget: 'qa', name: 'Q&A' }
      ];
    } else
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
            break;
      }


    return (
      <TopNavSend title='Report' textSend='Gửi' values={values} handleSubmit={handleSubmit}>
        <div className={classes.container}>
          <ProblemDropdown params={params} types={types} type={type} handleChange={handleChange} handleBlur={handleBlur} values={values}/>
          {
            params.type === undefined &&
            <ProblemContainer values={values} handleChange={handleChange} handleBlur={handleBlur}/>
          }
          {
            params.type === 'book' &&
            <>
              <BookOption bookId={params.value} bookDetail={bookDetail} />
              <ProblemContainer values={values} handleChange={handleChange} handleBlur={handleBlur} />
            </>
          }
          {
            params.type === 'bookInstance' &&
            <>
              <InstanceOption instanceId={params.value} instance={instance} />
              <ProblemContainer values={values} handleChange={handleChange} handleBlur={handleBlur} />
            </>
          }
          {
            params.type === 'review' &&
            <>
              <ReviewOption reviewId={params.value} createdDay={this.createdDay} review={review} />
              <ProblemContainer values={values} handleChange={handleChange} handleBlur={handleBlur} />
            </>
          }
          {
            params.type === 'reply' &&
            <>
              <ReplyOption replyId={params.value} createdDay={this.createdDay} reply={reply} />
              <ProblemContainer values={values} handleChange={handleChange} handleBlur={handleBlur} />
            </>
          }
          {
            params.type === 'user' &&
            <>
              <UserOption userId={params.value} />
              <ProblemContainer values={values} handleChange={handleChange} handleBlur={handleBlur} />
            </>
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

const CreateReplyWithFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      content: ''
    }
  },

  handleSubmit: async (values, { setSubmitting, props }) => {
    const {
      isSubmitting,
      createReport,
      match,
    } = props

    if (isSubmitting) return
    setSubmitting(true)

    let { content, type } = values
    if (match.params.type) type = match.params.type
    if (!type) type = 'other' 

    const data = {
      content,
      typeOfTarget: type, //book, bookInstance, review, reply, user
      valueId: match.params.value //bookId, bookInstanceId, reviewId, replyId, userId
    }

    if (!match.params.type) {
      delete data.valueId
    }

    createReport(data)
    values.content = ''
    setSubmitting(false)
  }
})(withStyles(styles)(Report))


const mapStateToProps = ({ book, review, reply, bookInstances }) => {
  return {
    userId: localStorage.getItem('userId'),
    review: review.singleReview, //done
    reply: reply.reply, //done
    instance: bookInstances.bookInstance, //done
    bookDetail: book.bookLite, //done
    //transaction:
    //user:
    isLoadingReviewById: review.isLoadingReviewById,
    isLoadingBook: book.isLoadingBookLite,
    isLoadingInstance: bookInstances.isLoadingInstance,
    isLoadingReply: reply.isLoadingReply
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBook: getBookLite,
  getReview: getReviewById,
  getReply: getReplyById,
  createReport: createReport,
  getBookInstance: getBookInstanceById
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateReplyWithFormik);