import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TopNavSend from '../../components/TopNavSend';
import ProblemDropdown from './components/ProblemDropdown';
import ProblemContainer from './components/ProblemContainer';
import InputField from '../../components/InputField';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { FormControl, InputLabel, Input, FormGroup, FormHelperText } from '@material-ui/core';
import colors from '../../constants/colors';

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
    alignItems: 'flex-end'
  },
  avatar: {
    width: 35,
    height: 35,
    margin: '0 10px'
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

const types = [
  { typeOfTarget: 'other', name: 'Khác' },
  { typeOfTarget: 'book', name: 'Sách' },
  { typeOfTarget: 'bookInstance', name: 'Sách cho mượn' },
  { typeOfTarget: 'review', name: 'Review' },
  { typeOfTarget: 'reply', name: 'Bình luận' },
  { typeOfTarget: 'user', name: 'Người dùng' },
  { typeOfTarget: 'qa', name: 'Q&A' },
]

class Report extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'other',
      bookInstanceIndex: 0,
      name: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { classes } = this.props;
    const { type, bookInstanceIndex, name } = this.state;
    return (
      <TopNavSend title='Report' textSend='Gửi'>
        <div className={classes.container}>
          <ProblemDropdown types={types} type={type} handleChange={this.handleChange} />
          {
            type === 'other' &&
            <ProblemContainer />
          }
          {
            type === 'book' &&
            <>
              <FormControl className={classes.inputAble}>
                <InputLabel htmlFor='book'>Tên sách</InputLabel>
                <Input
                  id='book'
                  name='bookName'
                  type='string'
                />
                <FormHelperText className={classes.hidden}>
                </FormHelperText>
              </FormControl>
              <ProblemContainer />
            </>
          }
          {
            type === 'bookInstance' &&
            <div className={classes.flexColumn}>
              <TextField
                label='Tên sách cho mượn'
                name='bookInstanceName'
                type='string'
                margin="normal"
                onChange={this.handleChange}
                defaultValue='Animal farm'
              />
              <div className={classes.flexContainer}>
                <TextField
                  id="standard-uncontrolled"
                  label="Cuốn thứ"
                  type='number'
                  name='bookInstanceIndex'
                  defaultValue='0'
                  onChange={this.handleChange}
                  margin="normal"
                  style={{ width: '40%' }}
                />
                {
                  bookInstanceIndex !== 0 &&
                  bookInstanceIndex !== '' &&
                  <div className={classes.flexContainer}>
                    <Avatar src='owner' className={classes.avatar} />
                    <Avatar src='holder' className={classes.avatar} />
                  </div>
                }
              </div>
              <ProblemContainer />
            </div>
          }
          {
            type === 'review' &&
            <ProblemContainer />
          }
          {
            type === 'reply' &&
            <ProblemContainer />
          }
          {
            type === 'user' &&
            <div>
              <div className={classes.flexContainer}>
                <TextField
                  id="standard-uncontrolled"
                  label="Người dùng"
                  type='string'
                  name='name'
                  defaultValue=''
                  onChange={this.handleChange}
                  margin="normal"
                  style={{ width: '40%' }}
                />
                {
                  name !== '' &&
                  name !== null &&
                  <div className={classes.flexContainer}>
                    <Avatar src='user' className={classes.avatar} />
                  </div>
                }
              </div>
              <ProblemContainer />
            </div>
          }
          {
            type === 'qa' &&
            <ProblemContainer />
          }
        </div>
      </TopNavSend>
    );
  }
}

export default (withStyles(styles)(Report));