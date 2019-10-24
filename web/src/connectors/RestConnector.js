import axios from 'axios'
import Cookies from 'js-cookie'
import { baseURL } from '../constants/constants'
import get from 'lodash/get'
// import { warnAlert } from '../components/alert'

const RestConnector = () => {
  const instance = axios.create({ baseURL, withCredentials: true})

  instance.interceptors.response.use(
    function (response) {
      return response
    },
    function (err) {
      err.code = get(err, 'response.status', 404)
      err.message = get(err, 'response.data.error.message', 'Có lỗi xảy ra!')
      if (err.code === 401 && err.config.url !== `${baseURL}/users/me` && !err.config.url.include(`${baseURL}/account`)) {
        // warnAlert('Bạn cần phải đăng nhập trước')
        delete instance.defaults.headers.access_token
        Cookies.remove('userId')
        Cookies.remove('access_token')
        localStorage.clear()
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