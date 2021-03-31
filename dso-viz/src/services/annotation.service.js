import ApiService from './api.service'

class AnnotationService {
  constructor () {
    this.request = ApiService
  }

  addAnnotation (payload, token, documentId) {
    return this.request.post(`/documents/${documentId}/annotations/`, payload)
  }

  deleteAnnotation (token, documentId, annotationId) {
    return this.request.delete(`/documents/${documentId}/annotations/${annotationId}/`)
  }

  updateAnnotation (token, documentId, annotationId, newLabelId) {
    let data = { id: newLabelId }
    return this.request.patch(`/documents/${documentId}/annotations/${annotationId}/`, data)
  }

  getAnnotationList (projectId, docId) {
    return this.request.get(`/projects/${projectId}/docs/${docId}/annotations`)
  }

  clearAnnotations (projectId, docid) {
    return this.request.delete(`/projects/${projectId}/docs/${docid}/annotations`)
  }
}

export default new AnnotationService()
