import ApiService from './api.service'

class UserService {
  constructor () {
    this.request = ApiService
  }

  getMe (token) {
    this.request.setHeader(token)
    return this.request.get('/users/me/')
  }

  getUserList (query) {
    return this.request.get(`/users?q=${query}`)
  }
}

export default new UserService()
