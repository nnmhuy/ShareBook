import axios from 'axios'
import { baseURL } from '../constants/constants'
import { warnAlert } from '../components/alert'

const RestConnector = () => {
  const instance = axios.create({ baseURL, withCredentials: true})

  instance.interceptors.response.use(
    function (response) {
      return response
    },
    function (err) {
      err.code = err.response.status
      err.message = err.response.data.message
      if (err.code === 401 && err.config.url !== `${baseURL}/users/me`) {
        // warnAlert('Bạn cần phải đăng nhập trước')
        window.location = '/account'
      }
      return Promise.reject(err)
    }
  )

  /**
   * On browser, restConnector (axios) doesn't need to care about access_token anymore as we hacked around to let server set
   * access_token to browser on successful login.
   * @param token
   */
  instance.setAccessToken = function (token) {
    instance.defaults.headers['access_token'] = token
  }

  instance.removeAccessToken = function () {
    delete instance.defaults.headers.access_token
  }
  return instance
}

export default RestConnector()