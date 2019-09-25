import React from 'react';
import ImagePlaceholder from '../../../static/images/image-placeholder.png';
import { withStyles } from '@material-ui/styles';
import colors from '../../../constants/colors';
import { Dialog, DialogContent, FormHelperText } from '@material-ui/core';

import Image from '../../../components/Image'
import { resizeImage } from '../../../helper/resizeImage'
import { warnAlert } from '../../../components/alert'

const styles = theme => ({
	wrapper: {
		display: 'inline-block',
		width: '100%',
		height: 140,
		position: 'relative',
		textAlign: 'center',
		margin: '30px 0'
	},
	image: {
		margin: 'auto',
		width: 100,
		height: 150,
		cursor: 'pointer'
	},
	imageModal: {
		width: '100%',
		height: '100%',
	},
	imageChoice: {
		display: 'flex',
		position: 'absolute',
		left: '50%',
		transform: 'translateX(-50%)'
	},
	checkImg: {
		fontSize: 12,
		fontWeight: 600,
		cursor: 'pointer',
		color: colors.primary,
		margin: '0 5px 0 0'
	},
	changeImg: {
		fontSize: 12,
		fontWeight: 600,
		cursor: 'pointer',
		color: '#D75A4A',
		margin: '0 0 0 5px'
	},
	modal: {
		'& .MuiPaper-root': {
			width: '300px',
			height: '400px',
			padding: 15,
			overflow: 'hidden'
		}
	},
	imageError: {
		textAlign: 'center',
		'& .MuiFormHelperText-root': {
			color: 'red',
			textAlign: 'center'
		},
	}
})

const ImageContainer = (props) => {
	const { image, setFieldValue, classes, error } = props

	const [isViewing, setViewing] = React.useState(false)

	const uploadImageHandler = (event) => {
		setFieldValue('isLoadingImage', true)
		if (event && event.target && event.target.files && event.target.files[0]) {
			let newImage = event.target.files[0]
			var imageName = newImage.name
			if (!newImage.type.match(/image.*/)) {
				warnAlert('Bạn cần nhập file hình nha')
				return;
			}

			resizeImage(newImage, true, ({ url, blob }) => {
				setFieldValue('image', {
					url,
					imageName,
					blob
				})
				setFieldValue('isLoadingImage', false)
			});
		}
	}

	const toggleViewing = (value) => () => {
		setViewing(value)
	}

	return (
		<div className={classes.wrapper} >
			<input type='file' style={{ display: 'none' }} id='imageInput' name='imageInput'
				onChange={uploadImageHandler} accept='image/*' />
			{
				image ?
					<div>
						<Image src={image} alt='placeholder' className={classes.image} onClick={toggleViewing(true)} />
						<div className={classes.imageChoice}>
								<p className={classes.checkImg} onClick={toggleViewing(true)}>Xem</p>
								<label className={classes.changeImg} htmlFor='imageInput'>Thay đổi</label>
						</div>
					</div>
					:
					<label htmlFor='imageInput' className={`${error && classes.imageError}`}>
						<Image src={ImagePlaceholder} alt='placeholder' className={classes.image}/>
						<FormHelperText className={classes.hidden}>
							{error}
						</FormHelperText>
					</label>
			}
			<Dialog aria-labelledby="customized-dialog-title" open={isViewing && !!image} onClose={toggleViewing(false)} className={classes.modal}>
					<DialogContent>
							<Image src={image} alt='placeholder' className={classes.imageModal} />
					</DialogContent>
			</Dialog>
		</div>
	);
}

export default withStyles(styles)(ImageContainer);