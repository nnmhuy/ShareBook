import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'

import colors from '../../../constants/colors'

const styles = (theme => ({
  root: {
    backgroundColor: '#D5D5D5',
    marginTop: 5,
    borderRadius: '6px 6px 0 0',
    height: 25,
    fontSize: 11,
    padding: 0,
    minHeight: 0,
    color: '#6A6A6A',
    minWidth: 'unset',
    fontWeight: 500,
    textTransform: 'none'
  },
  selected: {
    marginTop: 0,
    height: 32,
    backgroundColor: '#fff',
    color: colors.textPrimary,
    fontWeight: 500,
    fontSize: 12,
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: 10
  }
}))


class IconLabelTab extends React.Component {
  render() {
    const { selected, label, Icon, classes, ...other } = this.props
    return (
        <Tab 
          {...other}
          className={`${classes.root} ${selected && classes.selected}`}
          selected={selected}
          label={<div className={classes.labelContainer}>
            <Icon fill={selected ? colors.textPrimary : '#6A6A6A'} height={16} className={classes.icon}/>
            {label}
          </div>}
        />
    )
  }
}


export default withStyles(styles)(IconLabelTab)