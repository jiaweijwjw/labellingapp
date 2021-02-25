import ApiService from './api.service'

class AuthService {
  constructor () {
    this.request = ApiService
  }

  login (data) {
    this.request.removeHeader()
    const config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
    return this.request.post('/token', data, config)
  }
  register (data) {
    this.request.removeHeader()
    return this.request.post('/users/register/', data)
  }
}

export default new AuthService()
