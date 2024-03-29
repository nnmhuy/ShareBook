import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Image from '../../../components/Image'
import VietSeedsLogo from '../../../static/images/VietSeeds.png'
import USEmbassyLogo from '../../../static/images/U.S. Embassy.jpg'
import VNAlumniLogo from '../../../static/images/VN Alumni.jpg'

const styles = (theme => ({
  container: {
    marginTop: 50,
    width: '100%'
  },
  logoContainer: {
    display: 'flex',
    height: 200,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  logo: {
    width: 100,
    height: 'auto'
  },
  contactContainer: {
    height: 250,
    backgroundColor: '#315B91'
  }
}))

const Footer = (props) => {
  const { classes } = props
  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <Image src={USEmbassyLogo} alt='U.S. Embassy' className={classes.logo} isStatic/>
        <Image src={VNAlumniLogo} alt='Vietnamese Alumni' className={classes.logo} style={{ width: 150 }} isStatic/>
        <Image src={VietSeedsLogo} alt='VietSeeds' className={classes.logo} isStatic/>
      </div>
      <div className={classes.contactContainer}>

      </div>
    </div>
  )
}

export default withStyles(styles)(Footer)