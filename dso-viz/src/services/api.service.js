import axios from 'axios'
import TokenService from './token.service'
// import { store } from '../store/index'

class ApiService {
  constructor () {
    this.instance = axios.create({
      withCredentials: true,
      baseURL: 'http://localhost:8000'
    })
    this.instance.interceptors.request.use(req => {
      console.log(req)
      const token = TokenService.getToken()
      if (!req.url.includes('token') && !req.url.includes('register')) {
        req.headers = { 'Authorization': `Bearer ${token}` }
      }
      console.log(`${req.method} ${req.url}`)
      return req
    })
    // const interceptor =
    // this.instance.interceptors.response.use(res => res,
    //   async function (error) {
    //     if (error.response.status !== 401) {
    //       return Promise.reject(error)
    //     } else if (error.response.status === 401 && error.response.data.detail !== 'Access token has expired.') {
    //       console.log('Implement a logout.')
    //       // logout everywhere
    //     }
    //     // const originalRequest = error.config
    //     // this.instance.interceptors.response.eject(interceptor) // FINALLY PUT THIS BACK
    //     // if (error.response.status === 401 && error.response.data.detail === 'Access token has expired.' && !originalRequest._retry) {
    //     //   store.dispatch('auth/refreshAccessToken')
    //     //     .then(res => {
    //     //       console.log(res)
    //     //       originalRequest._retry = true
    //     //       this.instance.request(originalRequest)
    //     //         .then(res => { return Promise.resolve(res) })
    //     //         .catch(/* logout here also */)
    //     //     })
    //     //     .catch(/* error in getting new refresh token. EXIT  */)

    //     //   // const accessToken = await

    //     //   // refreshAccessToken() {
    //     //   //   let projectId = store.getters['general/currentUserId']
    //     //   //   return this.request.get(`/users/${projectId}/refresh/`)
    //     //   // }
    //     //   // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    //     //   // return this.instance(originalRequest)
    //     // }
    //     return Promise.reject(error)
    //   }
    // )
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
