import Vue from 'vue'
import axios from 'axios'
import TokenService from '../services/token.service'
import { helperFunctions } from './helpers'

Vue.prototype.$axios = axios

let api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8000'
})

export default ({ Vue, store, router }) => {
  api.interceptors.request.use(req => {
    const token = TokenService.getToken()
    if (!req.url.includes('token') && !req.url.includes('register')) {
      req.headers = { 'Authorization': `Bearer ${token}` }
    }
    console.log(`${req.method} ${req.url}`)
    return req
  })

  api.interceptors.response.use(res => {
    return res
  }, error => {
    const originalRequest = error.config
    const status = error.response.status
    const message = error.response.data.detail
    console.log('error msg: ' + message)
    console.log(status === 401 && message !== ('Access token has expired.' || 'Access token is null.'))
    console.log('should be false')
    if (status !== 401) {
      return Promise.reject(error)
    } else if (status === 401 && message !== ('Access token has expired.' || 'Access token is null.')) {
      console.log('api logout')
      if (store.getters['general/getLoggedIn']) {
        helperFunctions.logout()
      } else {
        return Promise.reject(error)
      }
    } else if (status === 401 && message === ('Access token has expired.' || 'Access token is null.') && !originalRequest._retry) {
      console.log('Access token expired or null')
      return store.dispatch('general/renewAccessToken')
        .then(res => {
          originalRequest.baseURL = undefined
          originalRequest._retry = true
          return (api(originalRequest))
        })
    } else {
      return Promise.reject(error)
    }
  })
}

export { api }
