import ApiService from './api.service'

class AuthService {
  constructor () {
    this.request = ApiService
  }

  login (credentials) {
    this.request.removeHeader()
    const config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
    return this.request.post('/token', credentials, config)
  }

  register (credentials) {
    this.request.removeHeader()
    return this.request.post('/users/register/', credentials)
  }

  renewAccessToken (userId) {
    return this.request.get(`/users/${userId}/refresh/`)
  }
}

export default new AuthService()
