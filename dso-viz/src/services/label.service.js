// import ApiService from './api.service'
import ApiService from './api.service'

class LabelService {
  constructor () {
    this.request = ApiService
  }

  createLabel (token, newLabel) {
    return this.request.post('/labels/', newLabel)
  }

  getLabelList (token) {
    return this.request.get(`/labels/`)
  }

  deleteLabels (token, selectedLabelsId) {
    return this.request.put(`/labels/`, selectedLabelsId)
  }
}

export default new LabelService()
