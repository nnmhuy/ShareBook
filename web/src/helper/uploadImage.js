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
      let imageUrl = baseURL + `/containers/${imageContainer}/download/` + _.get(response, 'data.result.files.file.0.name', 'ImageError.jpg');  
      callback(null, imageUrl)
    })
    .catch(function (response) {
      //handle error
      console.log(response);
      callback(response);
    });
}

export default uploadImage