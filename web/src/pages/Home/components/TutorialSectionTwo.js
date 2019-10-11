import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import colors from '../../../constants/colors'
import DemoChat from '../../../static/images/demo-chat.png'
import Demo from '../../../static/images/demo-createbook.png'
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
  buttonContainer: {
    display: 'flex',
    width: 350,
    margin: 30,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    cursor: 'pointer',
    display: 'flex',
    width: 125,
    height: 40,
    borderRadius: 9,
    background: colors.disabled,
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    justifyContent: 'center',
    color: '#ffffff',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 15
  },
  buttonActive: {
    background: colors.textSecondary,
  },
  divideText: {
    fontWeight: 'bold',
    fontSize: 13,
    color: colors.textSecondary
  },
  imageContainer: {
    height: 565,
    width: '100%',
    position: 'relative',
    // overflowX: 'hidden'
  },
  image: {
    height: 500,
    width: 'auto',
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transition: '1s',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)'
  },
  imageActive: {
    zIndex: 2,
  },
  imageNotActive: {
    zIndex: 1,
    left: 100,
    bottom: 50,
    opacity: 0.6,
  }
}))

const TutorialSectionThree = (props) => {
  const { classes, tab, setTab } = props
  return (
    <div className={classes.container}>
      <SectionTitle
        index={2}
        title='Cách thức mượn hoặc cho mượn'
      />
      <div className={classes.buttonContainer}>
        <span
          className={`${classes.button}
          ${tab===0 && classes.buttonActive}`}
          onClick={() => setTab(0)}>
          CHO MƯỢN
        </span>
        <span className={classes.divideText}>HOẶC</span>
        <span
          className={`${classes.button} ${tab===1 && classes.buttonActive}`}
          onClick={() => setTab(1)}>
          MƯỢN SÁCH
        </span>
      </div>
      <div className={classes.imageContainer}>
        <img src={Demo} alt='' className={`${classes.image} ${tab === 0 ? classes.imageActive : classes.imageNotActive}`}/>
        <img src={DemoChat} alt='' className={`${classes.image} ${tab === 1 ? classes.imageActive : classes.imageNotActive}`}/>
      </div>
    </div>
  )
}

export default withStyles(styles)(TutorialSectionThree)