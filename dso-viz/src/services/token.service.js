class TokenService {
  constructor () {
    this.ACCESS_TOKEN = ''
  }
  setToken (token) {
    this.ACCESS_TOKEN = token
  }
  clearToken () {
    this.ACCESS_TOKEN = ''
  }
  getToken () {
    return this.ACCESS_TOKEN
  }
}

export default new TokenService()
