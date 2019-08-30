import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import colors from '../../../constants/colors'

import TutorialSectionOne from './TutorialSectionOne'
import TutorialSectionThree from './TutorialSectionThree'
import TutorialSectionTwo from './TutorialSectionTwo';

const styles = (theme => ({
  container: {
    boxSizing: 'border-box',
    marginTop: 50,
    padding: '0px 30px',
    width: '100%',
    minWidth: 350,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontWeight: 600,
    fontSize: 20,
    color: colors.textSecondary
  }
}))

const Tutorial = (props) => {
  const { classes } = props
  const [mode, setMode] = React.useState(0)
  const [tab, setTab] = React.useState(0)

  return (
    <div className={classes.container}>
      <span className={classes.title}>CÁCH HOẠT ĐỘNG</span>
      <TutorialSectionOne mode={mode} setMode={setMode}/>
      <TutorialSectionTwo tab={tab} setTab={setTab}/>
      <TutorialSectionThree/>
    </div> 
  )
}

export default withStyles(styles)(Tutorial)