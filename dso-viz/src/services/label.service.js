import ApiService from './api.service'

class LabelService {
  constructor () {
    this.request = ApiService
  }

  createLabel (token, newLabel) {
    this.request.setHeader(token)
    return this.request.post('/labels/', newLabel)
  }

  getLabelList (token) {
    this.request.setHeader(token)
    return this.request.get(`/labels/`)
  }

  addLabel (projectId, payload) {
    return this.request.post(`/projects/${projectId}/labels`, payload)
  }

  deleteLabel (projectId, labelId) {
    return this.request.delete(`/projects/${projectId}/labels/${labelId}`)
  }

  updateLabel (projectId, labelId, payload) {
    return this.request.patch(`/projects/${projectId}/labels/${labelId}`, payload)
  }

  uploadFile (projectId, payload, config = {}) {
    return this.request.post(`/projects/${projectId}/label-upload`, payload, config)
  }
}

export default new LabelService()
