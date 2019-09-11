import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'

import TabPanel from './TabPanel'
import IconLabelTab from './IconLabelTab'
import LoginPanel from './LoginPanel'
import SignupPanel from './SignupPanel'

import { ReactComponent as LogInIcon } from '../../../static/images/login.svg'
import { ReactComponent as SignUpIcon } from '../../../static/images/signup.svg'

const styles = (them => ({
  root: {
    width: 306,
    marginTop: 30
  },
  tabs: {
    height: 30,
    minHeight: 0
  }
}))

class ModeTab extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { classes, currentTab, handleChangeTab } = this.props
    return (
      <div className={classes.root}>
        <Tabs 
          className={classes.tabs}
          value={currentTab} 
          onChange={handleChangeTab}
          variant="fullWidth"
          TabIndicatorProps={{hidden: true}}
        >
          <IconLabelTab label='Đăng ký' Icon={SignUpIcon}/>
          <IconLabelTab label='Đăng nhập' Icon={LogInIcon}/>
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          <SignupPanel />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <LoginPanel />
        </TabPanel>
      </div>
    )
  }
}


export default withStyles(styles)(ModeTab);