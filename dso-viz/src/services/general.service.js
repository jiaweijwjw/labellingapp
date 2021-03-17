import ApiService from './api.service'
// import storeGeneral from '../store/store-general'

class GeneralService {
  constructor () {
    this.request = ApiService
  }

  updateCurrentProjId (token, details) {
    this.request.setHeader(token)
    return this.request.put('/users/me/currentproj/', details)
  }
}

export default new GeneralService()
