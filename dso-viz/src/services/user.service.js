import ApiService from './api.service'

class UserService {
  constructor () {
    this.request = ApiService
  }

  getMe () {
    return this.request.get('/users/me/')
  }
}

export default new UserService()
