import axios from 'axios'
import { baseURL } from '../constants/constants'

function uploadImage(blob, callback) {
  var bodyFormData = new FormData();
  bodyFormData.append('file', blob, 'superCuteFileNam.jpg');
  axios({
    method: 'post',
    url: `${baseURL}/containers/imageContainer/upload`,
    data: bodyFormData,
    config: { 
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true 
    }
  })
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}

export default uploadImage