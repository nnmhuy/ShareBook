import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import DialogContent from '@material-ui/core/DialogContent'
import PacmanLoader from 'react-spinners/PacmanLoader'

import color from '../constants/colors'

const styles = (theme => ({
  loading: {
    width: '100%',
    height: '100%',
    position: 'fix',
    top: 0,
    left: 0,
    background: '#00000048',
    zIndex: 10000
  },
  modal: {
    width: '100%',
    '& .css-1smlpex': {
      outline: 'none'
    }
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))

const Loading = (props) => {
  const { isLoading, classes } = props
  if (isLoading) {
    return (
      <Paper tabIndex={-1} className={classes.loading}>
        <Modal className={classes.modal} open={isLoading || true}>
          <DialogContent className={classes.content}>
            <PacmanLoader color={color.light}/>
          </DialogContent>
        </Modal>
      </Paper>
    )
  }
  return null
}

export default withStyles(styles)(Loading)