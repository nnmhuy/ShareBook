import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import colors from '../../../constants/colors'
import { maxMobileWidth } from '../../../constants/constants'

import BackgroundLanding from '../../../static/images/bg-landing.png'
import BackgroundLandingMobile from '../../../static/images/bg-landing-mobile.png'
import Logo from '../../../static/images/logo.png'

const styles = (theme => ({
  container: {
    width: '100%',
  },
  introContainer: {
    position: 'relative',
    textAlign: 'center'
  },
  introImage: {
    width: '100%',
  },
  titleContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fff'
  },
  slogan: {
    fontWeight: 'bold',
    fontSize: 23,
    lineHeight: 1.5,
    color: '#fff'
  },
  aboutContainer: {
    textAlign: 'center',
    marginTop: 50
  },
  aboutTitle: {
    fontWeight: 600,
    fontSize: 20,
    color: colors.textSecondary
  },
  logo: {
    margin: 50,
    width: 231,
  },
  text: {
    boxSizing: 'border-box',
    padding: 15,
    margin: 'auto',
    width: 400,
    minWidth: 350,
    maxWidth: '100%',
    lineHeight: 1.8,
    textAlign: 'left'
  },
  name: {
    color: colors.textSecondary,
    fontWeight: 'bold'
  }
}))

const AboutUs = (props) => {
  const { classes } = props
  const mobile = useMediaQuery(`(max-width:${maxMobileWidth})`);

  return (
    <div className={classes.container}>
      <div className={classes.introContainer}>
        <img src={mobile ? BackgroundLandingMobile : BackgroundLanding} alt='' className={classes.introImage}/>
        <div className={classes.titleContainer}>
          <div className={classes.title}>ShareBook</div>
          <br/>
          <span className={classes.slogan}>
            Thêm một người bạn <br/>
            Đọc một cuốn sách <br/>
            Bớt vạn dặm đường
          </span>
        </div>
      </div>
      <div className={classes.aboutContainer}>
        <div className={classes.aboutTitle}>VỀ CHÚNG MÌNH</div>
        <img src={Logo} alt='ShareBook' className={classes.logo}/>
        <p className={classes.text}>
          <span className={classes.name}>SHAREBOOK</span> là dự án cộng đồng phi lợi nhuận, hướng tới đối tượng chính là học sinh sinh viên nhằm tạo ra một trang web thông minh để trao đổi sách.
          <br/>
          <br/>
          ShareBook nằm trong top 10 dự án được nhận tài trợ bởi Đại sứ quán Mỹ từ cuộc thi Chung tay phát triển cộng đồng bền vững 2019 tổ chức bởi Quỹ học bổng VietSeeds khu vực TP. HCM và Hà Nội.
        </p>
      </div>
    </div>
  )
}

export default withStyles(styles)(AboutUs)

