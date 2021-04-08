import ApiService from './api.service'

class LabelService {
  constructor () {
    this.request = ApiService
  }

  createLabel (newLabel) {
    return this.request.post('/labels/', newLabel)
  }

  getLabelList () {
    return this.request.get(`/labels/`)
  }

  deleteLabels (selectedLabelsId) {
    return this.request.put(`/labels/`, selectedLabelsId)
  }
}

export default new LabelService()
