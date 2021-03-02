import ApiService from './api.service'
// import storeGeneral from '../store/store-general'

class UserService {
  constructor () {
    this.request = ApiService
  }

  getMe (token) {
    // console.log(`Bearer ${storeGeneral.state.access_token}`)
    // console.log('Bearer ' + storeGeneral.state.access_token)
    this.request.setHeader(token)
    return this.request.get('/users/me/')
  }

  getUserList (query) {
    return this.request.get(`/users?q=${query}`)
  }
}

export default new UserService()
