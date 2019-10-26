import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'

import colors from '../../../constants/colors'
import { ReactComponent as Notebook } from '../../../static/images/notebook.svg'
import { ReactComponent as Handbook } from '../../../static/images/hand-book.svg'
import SearchDemo from '../../../static/images/search-demo.png';

import SectionTitle from './SectionTitle'
import Image from '../../../components/Image'
import { Z_BLOCK } from 'zlib'
import Link from '../../../components/Link'

const styles = (theme => ({
  container: {
    width: '100%',
    marginTop: 30,
    marginBottom: 30
  },
  sectionContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modeContainer: {
    margin: '30px 50px',
    textAlign: 'center',
    cursor: 'pointer'
  },
  modeImageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    boxShadow: '0px 0px 11px rgba(2, 116, 223, 0.31)'
  },
  modeImageContainerActive: {
    width: 120,
    height: 150,
    boxShadow: '0px 0px 11px rgba(2, 116, 223)'
  },
  modeImage: {
    height: 60,
    width: 'auto'
  },
  modeLabel: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.textSecondary
  },
  image: {
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.15)',
    width: '85vw',
    maxWidth: 450,
    maxHeight: 340,
    minWidth: 275,
    height: '70vw',
    display: 'block',
    margin: 'auto'
  },
  methodText: {
    display: 'block',
    boxSizing: 'border-box',
    margin: 'auto',
    width: 400,
    fontSize: 14,
    fontWeight: 500,
    marginTop: 15,
    lineHeight: 1.5
  }
}))

const TutorialSectionOne = (props) => {
  const {
    classes,
    mode,
    setMode
  } = props

  const [methodText, setText] = useState(false)

  const setMethod = (value) => {
    setMode(value)
    setText(value)
  }

  return (
    <div className={classes.container}>
      <SectionTitle
        index={1}
        title='Chọn một lựa chọn mà bạn thích'
      />
      <div className={classes.sectionContainer}>
        <div className={classes.modeContainer} onClick={() => setMethod(0)}>
          <div className={`${classes.modeImageContainer} ${mode===0 && classes.modeImageContainerActive}`}>
            <Notebook className={classes.modeImage}/>
          </div>
          <div className={classes.modeLabel}>TẠO SÁCH</div>
        </div>
        <div className={classes.modeContainer} onClick={() => setMethod(1)}>
          <div className={`${classes.modeImageContainer} ${mode === 1 && classes.modeImageContainerActive}`}>
            <Handbook className={classes.modeImage} />
          </div>
          <div className={classes.modeLabel}>MƯỢN SÁCH</div>
        </div>
      </div>
      <div>
        <img src={SearchDemo} alt='sharebook-search' className={classes.image} />
        {
          methodText ?
            <div className={classes.methodText}>
              <ul style={{ paddingLeft: 15 }}>
                <li>Tìm kiếm những cuốn sách có sẵn </li>
                <li>Mượn sách mình muốn</li>
              </ul>
            </div>
            :
            <div className={classes.methodText}>
              <ul style={{ paddingLeft: 15 }}>
                <li>Tìm kiếm những cuốn sách có sẵn </li>
                <li>Nếu sách không có trên ShareBook, bạn có thể tạo mới</li>
                <li>Nếu sách bị lỗi, đánh giá sách tại <Link to='/report'>đây</Link></li>
              </ul>
            </div>
        }
      </div>
    </div>
  )
}

export default withStyles(styles)(TutorialSectionOne)