import axios from 'axios'
import TokenService from '../services/token.service'

class ApiService {
  constructor () {
    // let token = TokenService.getToken()
    this.instance = axios.create({
      withCredentials: true,
      baseURL: 'http://localhost:8000'
    })
    this.instance.interceptors.request.use(req => {
      if (!req.url.includes('token') && !req.url.includes('register')) {
        req.headers = { 'Authorization': 'Bearer ' + TokenService.getToken() }
      }
      console.log(`${req.method} ${req.url} ${req.headers.Authorization}`)
      // console.log(generalStore.getters.getAccessToken)
      // req.headers = { 'Authorization': generalStore.getters }
      // console.log(req.headers.Authorization = `Bearer ${storeGeneral.state.getters.access_token}`)
      return req
    })
  }

  setHeader (token) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  removeHeader () {
    this.instance.defaults.headers.common = {}
  }

  request (method, url, data = {}, config = {}) {
    return this.instance({
      method,
      url,
      data,
      ...config
    })
  }

  get (url, config = {}) {
    return this.request('GET', url, {}, config)
  }

  post (url, data, config = {}) {
    return this.request('POST', url, data, config)
  }

  put (url, data, config = {}) {
    return this.request('PUT', url, data, config)
  }

  patch (url, data, config = {}) {
    return this.request('PATCH', url, data, config)
  }

  delete (url, config = {}) {
    return this.request('DELETE', url, {}, config)
  }
}

export default new ApiService()
