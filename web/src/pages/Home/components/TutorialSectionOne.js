import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import colors from '../../../constants/colors'
import { ReactComponent as Notebook } from '../../../static/images/notebook.svg'
import { ReactComponent as Handbook } from '../../../static/images/hand-book.svg'

import SectionTitle from './SectionTitle'

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
  }
}))

const TutorialSectionOne = (props) => {
  const {
    classes,
    mode,
    setMode
  } = props
  return (
    <div className={classes.container}>
      <SectionTitle
        index={1}
        title='Chọn một lựa chọn mà bạn thích'
      />
      <div className={classes.sectionContainer}>
        <div className={classes.modeContainer} onClick={() => setMode(0)}>
          <div className={`${classes.modeImageContainer} ${mode===0 && classes.modeImageContainerActive}`}>
            <Notebook className={classes.modeImage}/>
          </div>
          <div className={classes.modeLabel}>TẠO SÁCH</div>
        </div>
        <div className={classes.modeContainer} onClick={() => setMode(1)}>
          <div className={`${classes.modeImageContainer} ${mode === 1 && classes.modeImageContainerActive}`}>
            <Handbook className={classes.modeImage} />
          </div>
          <div className={classes.modeLabel}>MƯỢN SÁCH</div>
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(TutorialSectionOne)