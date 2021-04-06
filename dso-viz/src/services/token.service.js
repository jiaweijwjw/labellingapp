
class TokenService {
  constructor () {
    this.accessToken = ''
    // this.accessTokenExpiry = null
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
