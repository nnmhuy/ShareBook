import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { FieldArray } from 'formik'

import Image from '../../../components/Image'

import colors from '../../../constants/colors'
import { warnAlert } from '../../../components/alert'
import { resizeImage } from '../../../helper/resizeImage'
import ImagePlaceholder from '../../../static/images/image-placeholder.png'
import { ReactComponent as AddIcon } from '../../../static/images/add.svg'
import { ReactComponent as RemoveIcon } from '../../../static/images/cancel.svg'

const styles = (theme => ({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  title: {
    fontWeight: 600,
    fontSize: 15,
    color: colors.primary,
    marginBottom: 10,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.5,
    color: colors.gray
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    display: 'inline-block',
    width: 70,
    height: 105,
    position: 'relative',
    marginRight: 10,
    marginBottom: 20,
  },
  image: {
    marginRight: 10,
    width: '100%',
    height: '100%',
  },
  iconButton: {
    display: 'inline-block',
    position: 'absolute',
    left: 25,
    bottom: -10,
    width: 20,
    height: 20,
    borderRadius: '50%',
    padding: 0,
    cursor: 'pointer',
    textAlign: 'center'
  },
  icon: {
    width: 10,
    height: 10
  },
  removeIcon: {
    backgroundColor: colors.red
  },
  addIcon: {
    backgroundColor: colors.green
  },
  hiddenInput: {
    display: 'none'
  }
}))

const ImageContainer = (props) => {
  const { classes, value, touched, error, setFieldValue, ...other } = props

  const uploadImageHandler = (arrayHelpers) => (event) => {
    setFieldValue('isLoadingImage', true)
    if (event && event.target && event.target.files && event.target.files[0]) {
      let newImage = event.target.files[0]
      var imageName = newImage.name
      if (!newImage.type.match(/image.*/)) {
        warnAlert('Bạn cần nhập file hình nha')
        return;
      }

      resizeImage(newImage, 'large', ({ url, blob }) => {
        arrayHelpers.push({
          url,
          imageName,
          blob
        })
        setFieldValue('isLoadingImage', false)
      });
    }
  }

  return (
    <div className={classes.container} {...other}>
      <div className={classes.title}>Hình ảnh 
        <span className={classes.text}>{` (tối đa 4 hình)`}</span>
      </div>
      <FieldArray
        name='images'
        render={arrayHelpers => (
          <div className={classes.imageContainer}>
            {
              value.map((image, index) => (
                <div className={classes.wrapper} key={index}>
                  <Image src={image} alt='review' className={classes.image}/>
                  <span 
                    className={`${classes.iconButton} ${classes.removeIcon}`}
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    <RemoveIcon fill='#fff' className={classes.icon} />
                  </span>
                </div>
              ))
            }
            {(value.length < 4) &&
              <div className={classes.wrapper}>
                <img src={ImagePlaceholder} alt='placeholder' className={classes.image}/>
                <label
                  htmlFor='imageInput'
                  className={`${classes.iconButton} ${classes.addIcon}`}
                >
                  <AddIcon fill='#fff' className={classes.icon} />
                </label>
                <input type='file' className={classes.hiddenInput} id='imageInput' name='imageInput'
                onChange={uploadImageHandler(arrayHelpers)} accept='image/*' />
              </div>
            }
          </div>
        )}
      />
    </div>
  )
}

export default withStyles(styles)(ImageContainer)