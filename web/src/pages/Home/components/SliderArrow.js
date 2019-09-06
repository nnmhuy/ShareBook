import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'

import colors from '../../../constants/colors'
import { ReactComponent as RightArrow } from '../../../static/images/right-arrow.svg'
import { ReactComponent as LeftArrow } from '../../../static/images/left-arrow.svg'

const styles = (theme => ({
  fab: {
    position: 'absolute',
    width: 20,
    height: 20,
    minHeight: 'unset',
    filter: 'drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.3))',
    backgroundColor: '#fff',
    top: '50%',
    right: 15,
    zIndex: 1000
  },
  leftFab: {
    left: 15
  },
  arrow: {
    height: 10,
  }
}))

const SliderArrow = (props) => {
  const { classes, onClick, isNext } = props
  return (
    <Fab className={`${classes.fab} ${!isNext && classes.leftFab}`} onClick={onClick}>
      {isNext ? 
        <RightArrow stroke={colors.textSecondary} className={classes.arrow}/>
        :
        <LeftArrow stroke={colors.textSecondary} className={classes.arrow}/>
      }
    </Fab>
  )
}

export default withStyles(styles)(SliderArrow)