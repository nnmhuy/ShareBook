import axios from 'axios'
import { baseURL, imageContainer } from '../constants/constants'
import _ from 'lodash'

async function uploadImage(image, callback) {
  var bodyFormData = new FormData();
  var fileName = image.imageName;
  // remove extension
  if (fileName.indexOf('.') > -1) {
    fileName = fileName.split('.').slice(0, -1).join('-')
  }
  bodyFormData.append('file', image.blob, `${fileName}.jpg`);
  await axios({
    method: 'post',
    url: `${baseURL}/containers/imageContainer/upload`,
    data: bodyFormData,
    config: { 
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true 
    }
  })
    .then(function (response) {
      let imageUrl = `/containers/${imageContainer}/download/` + _.get(response, 'data.result.files.file.0.name', null);
      if (imageUrl === `/containers/${imageContainer}/download/`) {
        imageUrl = '/containers/defaultContainer/download/defaultBook.png'
      }
      callback(null, imageUrl)
    })
    .catch(function (response) {
      //handle error
      callback(response);
    });
}

function uploadImagePromise(image) {
  var bodyFormData = new FormData();
  var fileName = image.imageName;
  // remove extension
  if (fileName.indexOf('.') > -1) {
    fileName = fileName.split('.').slice(0, -1).join('-')
  }
  bodyFormData.append('file', image.blob, `${fileName}.jpg`);
  return axios({
    method: 'post',
    url: `${baseURL}/containers/imageContainer/upload`,
    data: bodyFormData,
    config: {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    }
  })
    .then(function (response) {
      let imageUrl = `/containers/${imageContainer}/download/` + _.get(response, 'data.result.files.file.0.name', null);
      if (imageUrl === `/containers/${imageContainer}/download/`) {
        imageUrl = '/containers/defaultContainer/download/defaultBook.png'
      }
      return imageUrl
    })
    .catch(function (response) {
      //handle error
      return response
    });
}

export {
  uploadImage,
  uploadImagePromise
}