// import ApiService from './api.service'
import ApiService from './api.service'

class GeneralService {
  constructor () {
    this.request = ApiService
  }

  updateCurrentProjId (details) {
    return this.request.put('/users/me/currentproj/', details)
  }
}

export default new GeneralService()
