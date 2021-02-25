import ApiService from './api.service'

class AnnotationService {
  constructor () {
    this.request = ApiService
  }

  getAnnotationList (projectId, docId) {
    return this.request.get(`/projects/${projectId}/docs/${docId}/annotations`)
  }

  addAnnotation (projectId, docId, payload) {
    return this.request.post(`/projects/${projectId}/docs/${docId}/annotations`, payload)
  }

  deleteAnnotation (projectId, docId, annotationId) {
    return this.request.delete(`/projects/${projectId}/docs/${docId}/annotations/${annotationId}`)
  }

  clearAnnotations (projectId, docid) {
    return this.request.delete(`/projects/${projectId}/docs/${docid}/annotations`)
  }

  updateAnnotation (projectId, docId, annotationId, payload) {
    return this.request.patch(`/projects/${projectId}/docs/${docId}/annotations/${annotationId}`, payload)
  }
}

export default new AnnotationService()
