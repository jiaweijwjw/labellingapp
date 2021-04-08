class TokenService {
  constructor () {
    this.accessToken = ''
  }
  setToken (token) {
    this.accessToken = token
  }
  clearToken () {
    this.accessToken = ''
  }
  getToken () {
    return this.accessToken
  }
  // If use expire to do refresh
  // setTokenExpiry (expiryDate) {
  //   this.accessTokenExpiry = new Date(expiryDate)
  // }
  // clearTokenExpiry () {
  //   this.accessTokenExpiry = null
  // }
  // getTokenExpiry () {
  //   return this.accessTokenExpiry
  // }
}

export default new TokenService()
