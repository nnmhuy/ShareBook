import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { IconButton, Button } from '@material-ui/core'

import colors from '../../../constants/colors'
import { ReactComponent as BackIcon } from '../../../static/images/back-arrow.svg'
import { ReactComponent as FilterIcon } from '../../../static/images/filter-filled.svg'

const styles = (theme => ({
  container: {
    padding: '20px 20px',
    display: 'flex'
  },
  backButton: {
    width: 39,
    height: 39,
    borderRadius: 19.5,
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.16)',
    marginRight: 15
  },
  backIcon: {
    width: 13.46,
    height: 11,
  },
  filterButton: {
    height: 39,
    borderRadius: 9,
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    fontWeight: 500,
    fontSize: 18,
    color: colors.primary,
    flex: 1,
    textTransform: 'none'
  },
  filterIcon: {
    width: 17.86,
    height: 18.02,
    marginRight: 5
  }
}))

const ButtonContainer = (props) => {
  const { classes, handleSubmit } = props

  const handleBack = () => {
    window.history.back()
  }

  return (
    <div className={classes.container}>
      <IconButton className={classes.backButton} onClick={handleBack}>
        <BackIcon fill={colors.primary} className={classes.backIcon} />
      </IconButton>
      <Button className={classes.filterButton} onClick={handleSubmit}>
        <FilterIcon fill={colors.primary} className={classes.filterIcon}/>
        Lọc
      </Button>
    </div>
  )
}

export default withStyles(styles)(ButtonContainer)

