import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme => ({

}))

const TabPanel = (props) => {
  const { children, value, index, classes, ...other } = props
  if (value !== index) return null
  return (
    <div {...other}>
      {children}
    </div>
  )
}

export default withStyles(styles)(TabPanel)