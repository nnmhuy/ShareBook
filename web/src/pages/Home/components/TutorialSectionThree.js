import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import colors from '../../../constants/colors'
import ExchangeBook1 from '../../../static/images/exchange-book-1.png'
import ExchangeBook2 from '../../../static/images/exchange-book-2.png'

import SectionTitle from './SectionTitle'

const styles = (theme => ({
  container: {
    width: '100%',
    marginTop: 30,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  methodContainer: {
    marginTop: 30,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  methodLabel: {
    display: 'flex',
    height: 35,
    width: 160,
    borderRadius: 17,
    background: colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 17,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#f7f7f7'
  },
  methodImage: {
    width: 250,
    height: 'auto',
    margin: 30
  },
  methodDescription: {
    fontSize: 13,
    lineHeight: 2,
    textAlign: 'left',
    color: '#000'
  }
}))

const TutorialSectionThree = (props) => {
  const { classes } = props
  return (
    <div className={classes.container}>
      <SectionTitle
        index={3}
        title='Phương thức trả sách đối với người đọc'
      />
      <div className={classes.methodContainer}>
        <span className={classes.methodLabel}>NHẬN LẠI</span>
        <img src={ExchangeBook1} alt='Exchange book 1' className={classes.methodImage}/>
        <span className={classes.methodDescription}>Người mượn sẽ trả sách lại cho Người <br/>
              cho mượn sau khi đọc xong.
        </span>
      </div>
      <div className={classes.methodContainer}>
        <span className={classes.methodLabel}>TRAO ĐI</span>
        <img src={ExchangeBook2} alt='Exchange book 2' className={classes.methodImage} />
        <span className={classes.methodDescription}>
          Người mượn sẽ tiếp tục giữ sách và <br/>
          lan truyền đến Người mượn kế tiếp, nhằm <br/>
          tạo sự kết nối giữa những người đam mê sách.
        </span>
      </div>
    </div>
  )
}

export default withStyles(styles)(TutorialSectionThree)