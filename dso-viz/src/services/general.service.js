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

  updateCurrentDocId (token, details) {
    this.request.setHeader(token)
    return this.request.put('/users/me/currentdoc/', details)
  }

  updateCurrentSelectedDocsId (token, details) {
    this.request.setHeader(token)
    return this.request.put('/users/me/currentselecteddocs/', details)
  }
}

export default new GeneralService()
