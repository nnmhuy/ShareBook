import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Slider from 'react-slick'
import countBy from 'lodash/countBy'

import colors from '../../../constants/colors'
import { ReactComponent as CheckedIcon } from '../../../static/images/checked.svg'
import { ReactComponent as RightArrow } from '../../../static/images/right-arrow.svg'
import { ReactComponent as LeftArrow } from '../../../static/images/left-arrow.svg'

const styles = (theme => ({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  checkbox: {
    display: 'inline-block',
    width: 12,
    height: 12,
    borderRadius: 2,
    border: `1px solid ${colors.primary}`,
    marginRight: 5
  },
  checkedIcon: {
    width: 12,
    height: 10.5,
    marginRight: 5
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
    fontSize: 12,
    marginTop: 10,
    outline: 'none'
  },
  slider: {
    marginTop: 10,
    overflow: 'hidden'
  },
  rightArrow: {
    width: 5.3,
    height: 11.94,
    right: 0,
    cursor: 'pointer',
    zIndex: 100
  },
  leftArrow: {
    width: 5.3,
    height: 11.94,
    right: 0,
    left: 'unset',
    cursor: 'pointer',
    zIndex: 100
  },
  gridTwo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr'
  },
  gridThree: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr'
  }
}))

const settingsFour = {
  dots: false,
  infinite: false,
  arrow: true,
  speed: 500,
  rows: 4,
  slidesPerRow: 3,
  swipeToSlide: true
}

const settingsTwo = {
  dots: false,
  infinite: false,
  arrow: true,
  speed: 500,
  rows: 4,
  slidesPerRow: 2,
  swipeToSlide: true
}

const Arrow = (props) => {
  const { classes, currentSlide, onClick, className, isNext } = props
  if (currentSlide===0 && isNext) {
    return <RightArrow stroke={colors.primary} className={`${className} ${classes.rightArrow}`} onClick={onClick}/>
  } 
  if (currentSlide!==0 && !isNext) {
    return <LeftArrow stroke={colors.primary} className={`${className} ${classes.leftArrow}`} onClick={onClick}/>
  }
  return null
}

const CheckBoxFilter = (props) => {
  const { classes, title, gridNum, name, optionList, value, setFieldValue } = props
  let settings = settingsFour
  if (gridNum === 2) settings = settingsTwo
  const handleChooseOption = (option) => () => {
    if (option.value === 'all') {
      setFieldValue(`${name}`, {all: true})
    } else {
      let count = countBy(value)
      if (count.true === 1 && value[option.value]) {
        setFieldValue(`${name}`, {all: true})
        return
      }
      if (value && value.all)
        setFieldValue(`${name}.all`, false)
      setFieldValue(`${name}.${option.value}`, !value[option.value])
    }
  }

  return (
    <div className={classes.container}>
      <span className={classes.title}>{title}</span>
      <Slider
        className={classes.slider}
        {...settings}
        nextArrow={<Arrow classes={classes} isNext/>}
        prevArrow={<Arrow classes={classes}/>}
    >
      {/* <div className={gridNum === 2 ? classes.gridTwo : classes.gridThree}> */}
        {
          optionList.map((option, index) => {
            return (
              <div className={classes.option} onClick={handleChooseOption(option)} key={option.value}>
                {value[option.value]?
                    <CheckedIcon fill={colors.primary} className={classes.checkedIcon}/>
                  :
                    <span className={classes.checkbox}/>
                }
                {option.label}
              </div>
            )
          })
        }
      {/* </div> */}
      </Slider>
    </div>
  )
}

export default withStyles(styles)(CheckBoxFilter)