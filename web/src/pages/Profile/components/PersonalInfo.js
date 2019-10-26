import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import colors from '../../../constants/colors';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button';
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'

import districtList from '../../../constants/district'

import Avatar from '../../../components/Avatar'
import { ReactComponent as Camera } from '../../../static/images/camera.svg'
import { ReactComponent as Rotate } from '../../../static/images/update-arrow.svg'
import InputUserPanel from './InputUserPanel'
import { editUserInfo } from '../../../redux/actions/accountAction'
import { uploadImagePromise } from '../../../helper/uploadImage'
import { ReactComponent as FacebookIcon } from '../../../static/images/facebook.svg';
import { resizeImage, rotateImage } from '../../../helper/resizeImage'
import { warnAlert } from '../../../components/alert'


const styles = theme => ({
	wrapper: {
		position: 'relative',
		padding: '10px 20px'
	},
	flexContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	avatar: {
		width: 65,
		height: 65,
		cursor: 'pointer'
	},
	avatarOpacity: {
		width: 65,
		height: 65,
		cursor: 'pointer',
		opacity: 0.8
	},
	pointer: {
		cursor: 'pointer'
	},
	title: {
		margin: 0,
		marginBottom: 5,
		color: colors.primary,
		fontSize: 12,
		fontWeight: 500,
		visibility: 'visible'
	},
	titleHidden: {
		visibility: 'hidden'
	},
	titleNoMargin: {
		margin: 0,
		color: colors.primary,
		fontSize: 12,
		fontWeight: 500
	},
	content: {
		margin: 0,
		marginBottom: 15,
		visibility: 'visible',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	},
	contentHidden: {
		visibility: 'hidden'
	},
	personalContent: {
		overflow: 'hidden',
		marginTop: 15,
		marginBottom: 5,
		height: '100%',
		visibility: 'visible',
		opacity: 1,
		transition: 'visibility 0s, opacity 0.4s linear'
	},
	personalContentHidden: {
		marginTop: 15,
		marginBottom: 5,
		height: 0,
		visibility: 'hidden',
		opacity: 0,
		transition: '0s'
	},
	input: {
		marginBottom: 15,
		width: '100%',
		'& .MuiInputBase-input': {
			paddingTop: 0,
			paddingBottom: 5,
		},
		'&.MuiInput-underline:after': {
			borderBottom: `1px solid ${colors.primary}`
		},
		'&:hover.MuiInput-underline:before': {
			borderBottom: `1px solid ${colors.primary}`
		}
	},
	map: {
		marginLeft: 15,
		fontWeight: 400,
		cursor: 'pointer',
		color: 'black',
		'&:hover': {
			color: colors.primary,
			textDecoration: 'underline'
		}
	},
	button: {
		fontFamily: 'Montserrat',
		fontWeight: 600,
		fontSize: 13,
		color: 'white',
		background: 'linear-gradient(to left, #0076ff 0%, #04abe8 100%)',
		margin: 'auto',
		display: 'block',
		padding: 4
	},
	cameraContainer: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		borderRadius: 100,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
		}
	},
	hiddenInput: {
		visibility: 'hidden',
		width: 0,
		height: 0
	},
	progress: {
		margin: theme.spacing(2),
	},
	avatarContainer: {
    position: 'relative',
		margin: '5px 35px',
		marginLeft: '0px'
	},
	rotateIcon: {
    position: 'absolute',
    height: 20,
    cursor: 'pointer',
    top: '50%',
    right: '-25px',
    transform: 'translateY(-50%) rotate(200deg)'
  }
})

class PersonalInfo extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	uploadAvatarHandler = (event) => {
    this.props.setFieldValue('isLoadingImage', true)
    if (event && event.target && event.target.files && event.target.files[0]) {
      let newImage = event.target.files[0]
      var imageName = newImage.name
      if (!newImage.type.match(/image.*/)) {
        warnAlert('Bạn cần nhập file hình nha')
        return;
      }

      resizeImage(newImage, 'small', ({ url, blob }) => {
        this.props.setFieldValue('image', { url, imageName, blob })
        this.props.setFieldValue('isLoadingImage', false)
      });
    }
  }

  rotateImageHandler = () => {
		let image = get(this.props, 'values.image', null)
		if (!image)  {
      warnAlert('Hình bị lỗi rồi')
      return;
    }
    this.props.setFieldValue('isLoadingImage', true)
    let imageName = image.imageName
    if (!imageName) {
      this.props.setFieldValue('isLoadingImage', false)
      return
    }
    rotateImage(image.url, 6, (err, response) => {
      if (err) {
        this.props.setFieldValue('isLoadingImage', false)
        return
      }
      let { url, blob } = response
      this.props.setFieldValue('image', {
        url,
        imageName,
        blob
      })
      this.props.setFieldValue('isLoadingImage', false)
    })
  }

	render() {
		const { classes, isEdit, isHidden, currentUserInfo } = this.props;
		const { handleSubmit, handleBlur, values, errors, handleChange, setFieldValue, isSubmitting, touched } = this.props;
		const { username, name, homeLocations, phoneNumber, email, fbLink } = currentUserInfo;
		let homeLocation = null
		let realEmail = null
		if (email && email.search('@sharebook.com.vn|@sharebook.org.vn') === -1)
			realEmail = email
		if (homeLocations) {
			homeLocation = homeLocations.address
			if (homeLocations.ward)
				homeLocation += ", phường/xã " + homeLocations.ward
			if (homeLocations.district) {
				districtList.forEach(item => {
					if (item.value.toString() === homeLocations.district.toString()) {
						homeLocation += ", " + item.label
					}
				})
			}
			if (homeLocations.city)
				homeLocation += ", thành phố " + homeLocations.city
		}

		let avatarClass = classes.avatar
		let isLoadingImage = values.isLoadingImage
		if (isEdit) {
			avatarClass = classes.avatarOpacity
		}
		return (
			<>
				<div className={classes.flexContainer}>
					<div className={classes.avatarContainer}>
						<Avatar src={get(values, 'image.url', '')} className={avatarClass}/>
						{isEdit && <label htmlFor='uploadAvatar'>
							<div className={classes.cameraContainer}>
								{!isLoadingImage
									? <div>
										<input type='file' className={classes.hiddenInput} id='uploadAvatar' name='uploadAvatar'
											onChange={this.uploadAvatarHandler} accept='image/*' />
										<Camera width={22} height={17} />
									</div>
									: <CircularProgress className={classes.progress} />
								}
							</div>
						</label>}
						{values.image && !values.image.cannotRotate &&<Rotate onClick={this.rotateImageHandler} className={classes.rotateIcon} />}
					</div>
					<div>
						<div className={classes.flexContainer} style={{ marginBottom: 5 }}>
							<p className={classes.titleNoMargin}>Tên tài khoản</p>
							{/* <FacebookIcon fill={colors.primary} height='12px' className={classes.pointer} /> */}
						</div>
						<p className={classes.content}>{username}</p>
						{
							// profileId === 'me' &&
							// <p className={`${classes.titleNoMargin} ${classes.pointer}`}>Change password</p>
						}
					</div>
				</div>

				{
					!isEdit &&
					<div className={`${isHidden ? `${classes.personalContentHidden}` : `${classes.personalContent}`}`}>
						<p className={classes.title}>Tên hiển thị</p>
						<p className={classes.content}>{name}</p>
						<p className={classes.title}>Số điện thoại</p>
						<p className={classes.content}>{phoneNumber || 'chưa có'}</p>
						<p className={classes.title}>Email</p>
						<p className={classes.content}>{realEmail || 'chưa có'}</p>
						<p className={classes.title}><FacebookIcon fill={colors.primary} height='12px' className={classes.pointer} /> Facebook link</p>
						{fbLink &&
							<p className={classes.content}><a href={fbLink}>{fbLink}</a></p>}
						{!fbLink &&
							<p className={classes.content}>{'chưa có'}</p>}
						<p className={classes.title}>Địa chỉ
                            {/* <span className={classes.map}>Bản đồ</span> */}
						</p>
						<p className={classes.content}>{homeLocation || 'chưa có'}</p>
					</div>
				}
				{
					isEdit &&
					<div className={`${isHidden ? `${classes.personalContentHidden}` : `${classes.personalContent}`}`}>
						<InputUserPanel
							isEdit={isEdit}
							values={values}
							errors={errors}
							handleChange={handleChange}
							handleBlur={handleBlur}
							setFieldValue={setFieldValue}
							touched={touched}
						/>
						<Button className={classes.button} onClick={handleSubmit} disabled={isSubmitting}>Sửa</Button>
					</div>
				}
			</>
		);
	}
}

const editUserWithFormik = withFormik({
	enableReinitialize: true,
	mapPropsToValues: (props) => {
		const { name, homeLocations, phoneNumber, email, avatar, fbLink } = props.currentUserInfo;
		let image = { url: avatar, imageName: name, cannotRotate: true }
		let realEmail = ''
		if (email && email.search('@sharebook.com.vn|@sharebook.org.vn') === -1)
			realEmail = email
		return {
			name: name,
			phoneNumber: phoneNumber,
			email: realEmail,
			fbLink: fbLink,
			address: get(homeLocations, 'address', ''),
			district: get(homeLocations, 'district', ''),
			city: get(homeLocations, 'city', ''),
			image: image,
			isLoadingImage: false
		}
	},

	validate: (values) => {
		let errors = {}
		let newPhone = values.phoneNumber.replace(/[\s-.+()]/g, '')
		let patternPhone = new RegExp(/^\d{9,13}$/g)
		if (values.phoneNumber && !patternPhone.test(newPhone)) {
			errors.phoneNumber = 'Số điện thoại không hợp lệ'
		}
		if (!values.name) {
			errors.name = 'Cần nhập tên hiển thị'
		}
		if (!values.image) {
			errors.image = 'Cần đăng hình avatar'
		}
		if (values.email && !validateEmail(values.email)) {
			errors.email = 'Email không hợp lệ'
		}
		if (!values.address) {
			errors.address = 'Chưa nhập địa chỉ'
		}
		if (!values.district) {
			errors.district = 'Chưa chọn'
		}
		if (!values.city) {
			errors.city = 'Chưa chọn'
		}
		return errors
	},

	handleSubmit: async (values, { setSubmitting, props }) => {
		const {
			isSubmitting,
			editUserInfoHandler,
			currentUserInfo,
			userId
		} = props

		if (isSubmitting || values.isLoadingImage) return

		setSubmitting(true)

		const { name, phoneNumber, email, fbLink, image, address, district, city
		} = values

		let imagesUrl = currentUserInfo.avatar
		// change image
		if (!image.cannotRotate) {
			imagesUrl = await uploadImagePromise(image)
		}

		let data = {
			avatar: imagesUrl,
			userId,
			name,
			phoneNumber,
			email,
			fbLink,
			address: {
				address: address,
				city: city,
				district: district
			}
		}

		let oldAddress = get(currentUserInfo, 'homeLocations.address', '')
		let oldCity = get(currentUserInfo, 'homeLocations.city', '')
		let oldDistrict = get(currentUserInfo, 'homeLocations.district', '')

		if (address === oldAddress && oldCity === city && oldDistrict === district) {
			delete data.address
		}
		if (email === currentUserInfo.email || !email) delete data.email
		if (phoneNumber === currentUserInfo.phoneNumber || !phoneNumber) delete data.phoneNumber
		if (fbLink === currentUserInfo.fbLink) delete data.fbLink
		if (name === currentUserInfo.name || !name) delete data.name
		if (data.avatar === currentUserInfo.avatar || !data.avatar) delete data.avatar
		editUserInfoHandler(data)
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
		setSubmitting(false)
	}
})(withStyles(styles)(PersonalInfo))

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

const mapStateToProps = ({ account }) => {
	return {
		userId: localStorage.getItem('userId'),
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	editUserInfoHandler: editUserInfo
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(editUserWithFormik);
