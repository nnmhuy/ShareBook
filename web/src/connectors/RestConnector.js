import axios from 'axios'
import { baseURL } from '../constants/constants'

const RestConnector = () => {
  const instance = axios.create({ baseURL })

  instance.interceptors.response.use(
    function (response) {
      return response
    },
    function (err) {
      err.code = err.response.status
      err.message = err.response.data.message
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